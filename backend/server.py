from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="ND Curtains API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Optional email (Resend) - only active if key present
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', 'info@ndcurtains.com.au')


# ---------- Models ----------
class ConsultationCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=3, max_length=40)
    service: str = Field(..., max_length=80)
    message: Optional[str] = Field(default="", max_length=2000)


class Consultation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    message: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Email helper ----------
async def send_notification_email(c: Consultation):
    if not RESEND_API_KEY:
        logger.info("RESEND_API_KEY not set; skipping email notification.")
        return
    try:
        import resend
        resend.api_key = RESEND_API_KEY
        html = f"""
        <div style='font-family:Arial,sans-serif;color:#1A1A1A'>
          <h2 style='color:#C5A059'>New Consultation Request — ND Curtains</h2>
          <table style='border-collapse:collapse'>
            <tr><td style='padding:6px 12px'><b>Name</b></td><td style='padding:6px 12px'>{c.name}</td></tr>
            <tr><td style='padding:6px 12px'><b>Email</b></td><td style='padding:6px 12px'>{c.email}</td></tr>
            <tr><td style='padding:6px 12px'><b>Phone</b></td><td style='padding:6px 12px'>{c.phone}</td></tr>
            <tr><td style='padding:6px 12px'><b>Service</b></td><td style='padding:6px 12px'>{c.service}</td></tr>
            <tr><td style='padding:6px 12px'><b>Message</b></td><td style='padding:6px 12px'>{c.message}</td></tr>
          </table>
        </div>
        """
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFY_EMAIL],
            "subject": f"New consultation request from {c.name}",
            "html": html,
        }
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Notification email sent.")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "ND Curtains API"}


@api_router.post("/consultations", response_model=Consultation)
async def create_consultation(payload: ConsultationCreate):
    consult = Consultation(**payload.model_dump())
    await db.consultations.insert_one(consult.model_dump())
    await send_notification_email(consult)
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
