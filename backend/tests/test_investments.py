"""Tests for patron investment commitments."""

import pytest
from django.contrib.auth.models import User

from apps.farms.models import Farm
from apps.investments.models import Investment


@pytest.fixture
def patron(db):
    return User.objects.create_user(username="patron", password="x", is_active=True)


@pytest.fixture
def other_patron(db):
    return User.objects.create_user(username="other", password="x", is_active=True)


@pytest.fixture
def staff(db):
    return User.objects.create_user(username="staff", password="x", is_active=True, is_staff=True)


@pytest.fixture
def authed_client(api_client, patron):
    api_client.force_authenticate(user=patron)
    return api_client


@pytest.fixture
def farm(db):
    return Farm.objects.create(
        name="Green Valley Poultry Farm",
        slug="green-valley-poultry-farm",
        location="Northern Region",
        farm_type="Poultry",
        status="open",
        duration_months=12,
        expected_return_rate="14.00",
        min_investment="500.00",
        max_investment="10000.00",
    )


def test_unauthenticated_create_is_rejected(api_client, farm):
    response = api_client.post(
        "/api/v1/investments/", {"farm_id": str(farm.id), "amount": "1000.00"}, format="json"
    )
    assert response.status_code == 403
    assert response.data["error"]["code"] == "permission_denied"


def test_create_snapshots_farm_terms(authed_client, farm):
    created = authed_client.post(
        "/api/v1/investments/", {"farm_id": str(farm.id), "amount": "1000.00"}, format="json"
    )
    assert created.status_code == 201, created.data
    assert created.data["expected_return_rate"] == "14.00"
    assert created.data["duration_months"] == 12
    assert created.data["current_value"] == "1000.00"
    assert created.data["status"] == "active"
    assert created.data["farm"]["slug"] == "green-valley-poultry-farm"


def test_amount_outside_farm_bounds_is_rejected(authed_client, farm):
    too_small = authed_client.post(
        "/api/v1/investments/", {"farm_id": str(farm.id), "amount": "10.00"}, format="json"
    )
    assert too_small.status_code == 400
    assert too_small.data["error"]["code"] == "validation_error"

    too_large = authed_client.post(
        "/api/v1/investments/", {"farm_id": str(farm.id), "amount": "99999.00"}, format="json"
    )
    assert too_large.status_code == 400


def test_patron_sees_only_own_commitments(api_client, patron, other_patron, farm):
    Investment.objects.create(
        user=other_patron,
        farm=farm,
        amount="1000.00",
        expected_return_rate="14.00",
        duration_months=12,
        current_value="1000.00",
    )
    mine = Investment.objects.create(
        user=patron,
        farm=farm,
        amount="2000.00",
        expected_return_rate="14.00",
        duration_months=12,
        current_value="2000.00",
    )

    api_client.force_authenticate(user=patron)
    listed = api_client.get("/api/v1/investments/")
    assert listed.data["count"] == 1
    assert listed.data["results"][0]["id"] == str(mine.id)

    others = Investment.objects.exclude(user=patron).get()
    hidden = api_client.get(f"/api/v1/investments/{others.id}/")
    assert hidden.status_code == 404
    assert hidden.data["error"]["code"] == "not_found"


def test_staff_sees_all_commitments(api_client, staff, patron, farm):
    Investment.objects.create(
        user=patron,
        farm=farm,
        amount="1000.00",
        expected_return_rate="14.00",
        duration_months=12,
        current_value="1000.00",
    )
    api_client.force_authenticate(user=staff)
    listed = api_client.get("/api/v1/investments/")
    assert listed.data["count"] == 1
    filtered = api_client.get(f"/api/v1/investments/?user_id={patron.id}")
    assert filtered.data["count"] == 1


def test_patron_cancels_own_commitment(authed_client, patron, farm):
    created = authed_client.post(
        "/api/v1/investments/", {"farm_id": str(farm.id), "amount": "1000.00"}, format="json"
    )
    patched = authed_client.patch(
        f"/api/v1/investments/{created.data['id']}/", {"status": "cancelled"}, format="json"
    )
    assert patched.status_code == 200
    assert patched.data["status"] == "cancelled"


def test_investment_cannot_be_deleted(authed_client, patron, farm):
    created = authed_client.post(
        "/api/v1/investments/", {"farm_id": str(farm.id), "amount": "1000.00"}, format="json"
    )
    response = authed_client.delete(f"/api/v1/investments/{created.data['id']}/")
    assert response.status_code == 405
    assert Investment.objects.filter(pk=created.data["id"]).exists()
