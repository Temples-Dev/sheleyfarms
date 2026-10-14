"""Account serializers."""

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)

    def validate_email(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def create(self, validated_data):
        email = validated_data["email"]
        name = f"{validated_data['first_name']} {validated_data.get('last_name', '')}".strip()
        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data.get("last_name", ""),
        )
        token = Token.objects.create(user=user)
        return {"user": user, "token": token, "name": name}


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(username=attrs["email"], password=attrs["password"])
        if user is None:
            raise serializers.ValidationError("Invalid email or password.")
        if not user.is_active:
            raise serializers.ValidationError("This account is deactivated.")
        attrs["user"] = user
        return attrs


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.SerializerMethodField()
    email = serializers.EmailField(read_only=True)
    role = serializers.SerializerMethodField()
    is_staff = serializers.BooleanField(read_only=True)

    def get_name(self, user):
        full = f"{user.first_name} {user.last_name}".strip()
        return full or user.username

    def get_role(self, user):
        if user.is_staff:
            return "staff"
        profile = getattr(user, "profile", None)
        return profile.role if profile else "patron"
