"""Tests for token auth: register, login, logout, and the current user."""

from django.contrib.auth.models import User


def register_payload(**overrides):
    payload = {
        "first_name": "Ama",
        "last_name": "Mensah",
        "email": "ama@example.com",
        "password": "s3cure-password",
    }
    payload.update(overrides)
    return payload


def test_register_creates_patron_and_token(api_client, db):
    response = api_client.post("/api/v1/auth/register/", register_payload(), format="json")
    assert response.status_code == 201, response.data
    assert response.data["user"]["email"] == "ama@example.com"
    assert response.data["user"]["role"] == "patron"
    assert response.data["user"]["is_staff"] is False
    assert len(response.data["token"]) > 20

    user = User.objects.get(username="ama@example.com")
    assert user.profile.role == "patron"
    assert user.check_password("s3cure-password")


def test_register_rejects_duplicate_email(api_client, db):
    assert (
        api_client.post("/api/v1/auth/register/", register_payload(), format="json").status_code
        == 201
    )
    duplicate = api_client.post("/api/v1/auth/register/", register_payload(), format="json")
    assert duplicate.status_code == 400
    assert duplicate.data["error"]["code"] == "validation_error"


def test_register_rejects_short_password(api_client, db):
    response = api_client.post(
        "/api/v1/auth/register/", register_payload(password="short"), format="json"
    )
    assert response.status_code == 400


def test_login_returns_token_and_role(api_client, db):
    api_client.post("/api/v1/auth/register/", register_payload(), format="json")
    response = api_client.post(
        "/api/v1/auth/token/",
        {"email": "ama@example.com", "password": "s3cure-password"},
        format="json",
    )
    assert response.status_code == 200, response.data
    assert response.data["user"]["role"] == "patron"
    assert len(response.data["token"]) > 20


def test_login_rejects_wrong_password(api_client, db):
    api_client.post("/api/v1/auth/register/", register_payload(), format="json")
    response = api_client.post(
        "/api/v1/auth/token/", {"email": "ama@example.com", "password": "wrong"}, format="json"
    )
    assert response.status_code == 400
    assert response.data["error"]["code"] == "validation_error"


def test_me_requires_token(api_client, db):
    response = api_client.get("/api/v1/auth/me/")
    assert response.status_code in (401, 403)


def test_me_returns_current_user(api_client, db):
    registered = api_client.post("/api/v1/auth/register/", register_payload(), format="json")
    api_client.credentials(HTTP_AUTHORIZATION=f"Token {registered.data['token']}")
    response = api_client.get("/api/v1/auth/me/")
    assert response.status_code == 200
    assert response.data["email"] == "ama@example.com"
    assert response.data["role"] == "patron"


def test_logout_invalidates_token(api_client, db):
    registered = api_client.post("/api/v1/auth/register/", register_payload(), format="json")
    api_client.credentials(HTTP_AUTHORIZATION=f"Token {registered.data['token']}")
    assert api_client.post("/api/v1/auth/logout/").status_code == 204
    assert api_client.get("/api/v1/auth/me/").status_code in (401, 403)


def test_farmer_role_reported(api_client, db):
    from apps.accounts.models import UserProfile

    registered = api_client.post("/api/v1/auth/register/", register_payload(), format="json")
    user = User.objects.get(username="ama@example.com")
    user.profile.role = UserProfile.FARMER
    user.profile.save()

    api_client.credentials(HTTP_AUTHORIZATION=f"Token {registered.data['token']}")
    assert api_client.get("/api/v1/auth/me/").data["role"] == "farmer"
