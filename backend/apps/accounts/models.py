"""Account roles. Patrons invest, farmers manage farms, staff administer."""

from django.conf import settings
from django.db import models


class UserProfile(models.Model):
    PATRON = "patron"
    FARMER = "farmer"
    ROLE_CHOICES = [
        (PATRON, "Patron"),
        (FARMER, "Farmer"),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile"
    )
    role = models.CharField(max_length=16, choices=ROLE_CHOICES, default=PATRON, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} ({self.role})"

    @property
    def is_farmer(self):
        return self.role == self.FARMER
