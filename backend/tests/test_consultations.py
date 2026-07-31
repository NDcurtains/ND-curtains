"""Backend API tests for ND Curtains consultation endpoints."""
import os
import uuid
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL") or open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].splitlines()[0].strip()
API = f"{BASE_URL.rstrip('/')}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Root
def test_api_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("message") == "ND Curtains API"


# POST /consultations valid
def test_create_consultation_valid(client):
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": unique,
        "email": "test@example.com",
        "phone": "0400000000",
        "service": "Custom Curtains",
        "message": "hello",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == unique
    assert data["email"] == "test@example.com"
    assert isinstance(data["id"], str) and len(data["id"]) > 10
    assert "created_at" in data and "T" in data["created_at"]

    # GET verification
    time.sleep(0.3)
    r2 = client.get(f"{API}/consultations")
    assert r2.status_code == 200
    items = r2.json()
    assert any(x["id"] == data["id"] and x["name"] == unique for x in items)


# POST invalid email -> 422
def test_create_consultation_invalid_email(client):
    payload = {
        "name": "TEST_bademail",
        "email": "not-an-email",
        "phone": "0400000000",
        "service": "Blinds",
    }
    r = client.post(f"{API}/consultations", json=payload)
    assert r.status_code == 422


# POST missing required -> 422
def test_create_consultation_missing_fields(client):
    r = client.post(f"{API}/consultations", json={"name": "x"})
    assert r.status_code == 422


# GET sorted desc
def test_list_consultations_sorted_desc(client):
    # create two entries
    ids = []
    for i in range(2):
        r = client.post(f"{API}/consultations", json={
            "name": f"TEST_sort_{uuid.uuid4().hex[:6]}",
            "email": f"a{i}@example.com",
            "phone": "0400000000",
            "service": "Blinds",
        })
        assert r.status_code == 200
        ids.append(r.json()["created_at"])
        time.sleep(1.05)  # ensure distinct created_at seconds

    r = client.get(f"{API}/consultations")
    assert r.status_code == 200
    items = r.json()
    assert len(items) >= 2
    created_list = [x["created_at"] for x in items]
    assert created_list == sorted(created_list, reverse=True)
    # No mongo _id leakage
    for x in items[:5]:
        assert "_id" not in x


# Email send should not break request (resend key configured)
def test_email_send_does_not_break(client):
    r = client.post(f"{API}/consultations", json={
        "name": "TEST_email_ok",
        "email": "user@example.com",
        "phone": "0400111222",
        "service": "Sheer Curtains",
        "message": "email path test",
    })
    assert r.status_code == 200
