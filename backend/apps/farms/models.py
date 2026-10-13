"""Farm catalogue: the listings behind /farms and the farm detail pages."""

import uuid

from django.db import models


class Farm(models.Model):
    DRAFT = "draft"
    OPEN = "open"
    FUNDED = "funded"
    CLOSED = "closed"
    STATUS_CHOICES = [
        (DRAFT, "Draft"),
        (OPEN, "Open"),
        (FUNDED, "Funded"),
        (CLOSED, "Closed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    location = models.CharField(max_length=255)
    farm_type = models.CharField(max_length=100)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default=DRAFT, db_index=True)
    description = models.TextField(blank=True, default="")
    detailed_description = models.TextField(blank=True, default="")
    size = models.CharField(max_length=255, blank=True, default="")
    farm_manager = models.CharField(max_length=255, blank=True, default="")
    duration_months = models.PositiveIntegerField()
    expected_return_rate = models.DecimalField(max_digits=5, decimal_places=2)
    min_investment = models.DecimalField(max_digits=14, decimal_places=2)
    max_investment = models.DecimalField(max_digits=14, decimal_places=2)
    total_funding_goal = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    amount_raised = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    payout_schedule = models.CharField(max_length=255, blank=True, default="")
    expected_returns = models.TextField(blank=True, default="")
    key_features = models.JSONField(default=list, blank=True)
    farm_activities = models.JSONField(default=list, blank=True)
    risk_factors = models.JSONField(default=list, blank=True)
    gallery = models.JSONField(default=list, blank=True)
    banner_image = models.URLField(max_length=500, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.status})"

    @property
    def funding_progress(self):
        """Raised amount as a percentage of the goal, 0 when there is no goal."""
        if not self.total_funding_goal:
            return 0
        return round((self.amount_raised / self.total_funding_goal) * 100, 2)
