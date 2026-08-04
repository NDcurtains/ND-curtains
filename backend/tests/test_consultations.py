"""Backend API tests for ND Curtains consultation endpoints (expanded schema)."""
import os
import uuid
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL") or open(
    "/app/frontend/.env"
).read().split("REACT_APP_BACKEND_URL=")[1].splitlines()[0].strip()
API = f"{BASE_URL.rstrip('/')}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Root ----
def test_api_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("message") == "ND Curtains API"


# ---- POST /consultations valid expanded payload ----
def test_create_consultation_full_payload(client):
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": unique,
        "email": "test@example.com",
        "phone": "0400000000",
        "suburb": "Officer South 3809",
        "product": "Sheer Curtains",
        "windows": "4",
        "style": "S-Fold / Wave",
        "measurements": "Living room 2.4m x 2.1m",
        "budget": "$3,000 – $6,000",
        "message": "hello",
        "attachments": [],
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == unique
    assert data["email"] == "test@example.com"
    assert data["suburb"] == "Officer South 3809"
    assert data["product"] == "Sheer Curtains"
    assert data["photo_count"] == 0
    assert isinstance(data["id"], str) and len(data["id"]) > 10
    assert "created_at" in data and "T" in data["created_at"]

    # GET verification
    time.sleep(0.3)
    r2 = client.get(f"{API}/consultations")
    assert r2.status_code == 200
    items = r2.json()
    assert any(x["id"] == data["id"] and x["name"] == unique for x in items)


# ---- POST invalid email -> 422 ----
def test_create_consultation_invalid_email(client):
    payload = {
        "name": "TEST_bademail",
        "email": "not-an-email",
        "phone": "0400000000",
        "suburb": "x",
        "product": "Blinds",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 422



# ---- Empty string email should NOT 422 (frontend posts email:"") ----
def test_create_consultation_empty_string_email(client):
    unique = f"TEST_emptyemail_{uuid.uuid4().hex[:6]}"
    r = client.post(f"{API}/consultations", json={
        "name": unique, "phone": "0400111333", "service": "Blinds",
        "email": "", "budget": "", "message": ""
    })
    assert r.status_code == 200, r.text
    assert r.json()["email"] == ""

# ---- POST missing required -> 422 ----
def test_create_consultation_missing_fields(client):
    r = client.post(f"{API}/consultations", json={"name": "x"})
    assert r.status_code == 422


# ---- Honeypot: 'company' set -> 200 but not stored ----
def test_honeypot_dropped(client):
    unique = f"TEST_HONEY_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": unique,
        "email": "bot@example.com",
        "phone": "0400000000",
        "suburb": "x",
        "product": "Blinds",
        "company": "spammer-co",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 200
    # Should NOT be persisted
    time.sleep(0.3)
    r2 = client.get(f"{API}/consultations")
    assert r2.status_code == 200
    assert not any(x.get("name") == unique for x in r2.json()), "Honeypot record leaked into DB"


# ---- GET sorted desc, no _id leak ----
def test_list_consultations_sorted_desc(client):
    for i in range(2):
        r = client.post(f"{API}/consultations", json={
            "name": f"TEST_sort_{uuid.uuid4().hex[:6]}",
            "email": f"a{i}@example.com",
            "phone": "0400000000",
            "suburb": "x",
            "product": "Blinds",
        })
        assert r.status_code == 200
        time.sleep(1.05)

    r = client.get(f"{API}/consultations")
    assert r.status_code == 200
    items = r.json()
    assert len(items) >= 2
    created_list = [x["created_at"] for x in items]
    assert created_list == sorted(created_list, reverse=True)
    for x in items[:5]:
        assert "_id" not in x


# ---- NEW: simplified quote payload (service field, email optional) ----
def test_create_consultation_simplified_no_email(client):
    unique = f"TEST_simple_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": unique,
        "phone": "0400111222",
        "service": "Sheer Curtains",
        "product": "Sheer Curtains",
        "budget": "Under $1,000",
        "message": "please contact me",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == unique
    assert data["service"] == "Sheer Curtains"
    assert data["email"] == ""  # email omitted -> empty
    assert data["phone"] == "0400111222"


def test_create_consultation_only_required(client):
    unique = f"TEST_req_{uuid.uuid4().hex[:8]}"
    r = client.post(f"{API}/consultations", json={
        "name": unique, "phone": "0400111222", "service": "Blinds"
    })
    assert r.status_code == 200, r.text
    assert r.json()["service"] == "Blinds"


def test_missing_phone_rejected(client):
    r = client.post(f"{API}/consultations", json={"name": "TEST_x", "service": "Blinds"})
    assert r.status_code == 422


# ---- Attachments echoed as photo_count ----
def test_create_with_attachments(client):
    # 1x1 transparent PNG base64
    b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    payload = {
        "name": f"TEST_att_{uuid.uuid4().hex[:6]}",
        "email": "att@example.com",
        "phone": "0400000000",
        "suburb": "Officer South",
        "product": "Blinds",
        "attachments": [
            {"filename": "a.jpg", "content": b64, "contentType": "image/jpeg"},
            {"filename": "b.jpg", "content": b64, "contentType": "image/jpeg"},
        ],
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["photo_count"] == 2
