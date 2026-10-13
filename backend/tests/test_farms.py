"""Tests for the farm catalogue."""

import pytest
from django.contrib.auth.models import User

from apps.farms.models import Farm


@pytest.fixture
def user(db):
    return User.objects.create_user(username="staff", password="x", is_active=True)


@pytest.fixture
def authed_client(api_client, user):
    api_client.force_authenticate(user=user)
    return api_client


def farm_payload(**overrides):
    payload = {
        "name": "Green Valley Poultry Farm",
        "slug": "green-valley-poultry-farm",
        "location": "Northern Region",
        "farm_type": "Poultry",
        "status": "open",
        "description": "Free-range chicken production.",
        "duration_months": 12,
        "expected_return_rate": "14.00",
        "min_investment": "500.00",
        "max_investment": "10000.00",
        "total_funding_goal": "100000.00",
        "amount_raised": "65000.00",
    }
    payload.update(overrides)
    return payload


def test_unauthenticated_create_is_rejected(api_client):
    response = api_client.post("/api/v1/farms/", farm_payload(), format="json")
    assert response.status_code == 403
    assert response.data["error"]["code"] == "permission_denied"


def test_create_and_retrieve_farm(authed_client):
    created = authed_client.post("/api/v1/farms/", farm_payload(), format="json")
    assert created.status_code == 201, created.data
    assert created.data["slug"] == "green-valley-poultry-farm"
    assert float(created.data["funding_progress"]) == 65.0

    retrieved = authed_client.get(f"/api/v1/farms/{created.data['id']}/")
    assert retrieved.status_code == 200
    assert retrieved.data["location"] == "Northern Region"


def test_duplicate_slug_is_rejected(authed_client):
    assert authed_client.post("/api/v1/farms/", farm_payload(), format="json").status_code == 201
    duplicate = authed_client.post("/api/v1/farms/", farm_payload(name="Clone"), format="json")
    assert duplicate.status_code == 400
    assert duplicate.data["error"]["code"] == "validation_error"


def test_unknown_status_is_rejected(authed_client):
    response = authed_client.post("/api/v1/farms/", farm_payload(status="sold-out"), format="json")
    assert response.status_code == 400
    assert response.data["error"]["code"] == "validation_error"


def test_min_above_max_is_rejected(authed_client):
    response = authed_client.post(
        "/api/v1/farms/", farm_payload(min_investment="20000.00"), format="json"
    )
    assert response.status_code == 400
    assert response.data["error"]["code"] == "validation_error"


def test_funding_progress_zero_without_goal(authed_client):
    created = authed_client.post(
        "/api/v1/farms/",
        farm_payload(total_funding_goal="0.00", amount_raised="0.00"),
        format="json",
    )
    assert created.status_code == 201
    assert float(created.data["funding_progress"]) == 0


def test_farm_cannot_be_deleted(authed_client):
    created = authed_client.post("/api/v1/farms/", farm_payload(), format="json")
    response = authed_client.delete(f"/api/v1/farms/{created.data['id']}/")
    assert response.status_code == 405
    assert response.data["error"]["code"] == "method_not_allowed"
    assert Farm.objects.filter(pk=created.data["id"]).exists()


def test_list_filters_and_envelope(authed_client):
    authed_client.post("/api/v1/farms/", farm_payload(), format="json")
    authed_client.post(
        "/api/v1/farms/",
        farm_payload(
            name="Blue Lake Fishery",
            slug="blue-lake-fishery",
            location="Coastal Region",
            farm_type="Fishery",
            status="funded",
        ),
        format="json",
    )

    listed = authed_client.get("/api/v1/farms/")
    assert listed.status_code == 200
    assert set(listed.data) == {"count", "next", "previous", "results"}
    assert listed.data["count"] == 2

    assert authed_client.get("/api/v1/farms/?search=poultry").data["count"] == 1
    assert authed_client.get("/api/v1/farms/?status=funded").data["count"] == 1
    assert authed_client.get("/api/v1/farms/?location=Coastal Region").data["count"] == 1
    assert authed_client.get("/api/v1/farms/?farm_type=Fishery").data["count"] == 1


def test_status_transition(authed_client):
    created = authed_client.post("/api/v1/farms/", farm_payload(), format="json")
    patched = authed_client.patch(
        f"/api/v1/farms/{created.data['id']}/", {"status": "funded"}, format="json"
    )
    assert patched.status_code == 200
    assert patched.data["status"] == "funded"
