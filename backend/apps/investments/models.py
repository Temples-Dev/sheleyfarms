"""Patron investment commitments against farm listings."""

import uuid

from django.conf import settings
from django.db import models

from apps.farms.models import Farm


class Investment(models.Model):
    ACTIVE = "active"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    STATUS_CHOICES = [
        (ACTIVE, "Active"),
        (COMPLETED, "Completed"),
        (CANCELLED, "Cancelled"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="investments"
    )
    farm = models.ForeignKey(Farm, on_delete=models.PROTECT, related_name="investments")
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=ACTIVE, db_index=True)
    expected_return_rate = models.DecimalField(max_digits=5, decimal_places=2)
    duration_months = models.PositiveIntegerField()
    current_value = models.DecimalField(max_digits=14, decimal_places=2)
    invested_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-invested_at"]

    def __str__(self):
        return f"{self.user} → {self.farm.name} ({self.status})"
