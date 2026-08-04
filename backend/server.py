from fastapi import FastAPI, APIRouter, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import time
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="ND Curtains API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'ND Curtains <onboarding@resend.dev>')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', 'info@ndcurtains.com.au')

# ---- naive in-memory rate limiter (best-effort spam protection) ----
_rate = {}
def rate_limited(ip: str, limit: int = 6, window: int = 600) -> bool:
    now = time.time()
    hits = [t for t in _rate.get(ip, []) if now - t < window]
    hits.append(now)
    _rate[ip] = hits
    return len(hits) > limit


class Attachment(BaseModel):
    filename: str
    content: str  # base64
    contentType: Optional[str] = "image/jpeg"


class ConsultationCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=3, max_length=40)
    suburb: Optional[str] = Field(default="", max_length=120)
    product: Optional[str] = Field(default="", max_length=80)
    windows: Optional[str] = Field(default="", max_length=20)
    style: Optional[str] = Field(default="", max_length=80)
    measurements: Optional[str] = Field(default="", max_length=500)
    budget: Optional[str] = Field(default="", max_length=80)
    message: Optional[str] = Field(default="", max_length=2000)
    company: Optional[str] = Field(default="", max_length=200)  # honeypot
    attachments: Optional[List[Attachment]] = []


class Consultation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    suburb: str = ""
    product: str = ""
    windows: str = ""
    style: str = ""
    measurements: str = ""
    budget: str = ""
    message: str = ""
    photo_count: int = 0
    photo_names: List[str] = []
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def _row(label, value):
    if not value:
        return ""
    safe = str(value).replace("<", "&lt;")
    return f"<tr><td style='padding:6px 14px 6px 0;vertical-align:top'><b>{label}</b></td><td style='padding:6px 0'>{safe}</td></tr>"


async def send_notification_email(c: Consultation, attachments: List[Attachment]):
    if not RESEND_API_KEY:
        logger.info("RESEND_API_KEY not set; skipping email notification.")
        return
    try:
        import resend
        resend.api_key = RESEND_API_KEY
        rows = "".join([
            _row("Name", c.name), _row("Email", c.email), _row("Phone", c.phone),
            _row("Suburb/Postcode", c.suburb), _row("Product", c.product),
            _row("No. of Windows", c.windows), _row("Preferred Style", c.style),
            _row("Measurements", c.measurements), _row("Budget", c.budget),
            _row("Message", c.message), _row("Photos", c.photo_count or ""),
        ])
        html = f"""
        <div style='font-family:Arial,Helvetica,sans-serif;color:#1A1A1A'>
          <h2 style='color:#C5A059'>New Quote Request — ND Curtains</h2>
          <table style='border-collapse:collapse'>{rows}</table>
        </div>"""
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFY_EMAIL],
            "reply_to": c.email,
            "subject": f"New quote request from {c.name} ({c.suburb or 'Melbourne'})",
            "html": html,
        }
        if attachments:
            params["attachments"] = [
                {"filename": a.filename, "content": a.content} for a in attachments[:5]
            ]
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Quote notification email sent (%d attachments).", len(attachments or []))
    except Exception as e:
        logger.error(f"Failed to send email: {e}")


@api_router.get("/")
async def root():
    return {"message": "ND Curtains API"}


@api_router.post("/consultations", response_model=Consultation)
async def create_consultation(payload: ConsultationCreate, request: Request):
    # honeypot: pretend success, do nothing
    if payload.company:
        logger.info("Honeypot triggered; dropping submission.")
        return Consultation(name=payload.name, email=payload.email, phone=payload.phone)

    ip = request.client.host if request.client else "unknown"
    if rate_limited(ip):
        logger.warning("Rate limit hit for %s", ip)
        return Consultation(name=payload.name, email=payload.email, phone=payload.phone)

    attachments = payload.attachments or []
    consult = Consultation(
        name=payload.name, email=payload.email, phone=payload.phone,
        suburb=payload.suburb or "", product=payload.product or "",
        windows=payload.windows or "", style=payload.style or "",
        measurements=payload.measurements or "", budget=payload.budget or "",
        message=payload.message or "",
        photo_count=len(attachments),
        photo_names=[a.filename for a in attachments],
    )
    await db.consultations.insert_one(consult.model_dump())
    await send_notification_email(consult, attachments)
    return consult


@api_router.get("/consultations", response_model=List[Consultation])
async def list_consultations():
    docs = await db.consultations.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Consultation(**d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
