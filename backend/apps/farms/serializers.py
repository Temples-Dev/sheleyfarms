"""Farm serializers."""

from rest_framework import serializers

from .models import Farm


class FarmSerializer(serializers.ModelSerializer):
    funding_progress = serializers.ReadOnlyField()

    class Meta:
        model = Farm
        fields = [
            "id",
            "name",
            "slug",
            "location",
            "farm_type",
            "status",
            "description",
            "detailed_description",
            "size",
            "farm_manager",
            "duration_months",
            "expected_return_rate",
            "min_investment",
            "max_investment",
            "total_funding_goal",
            "amount_raised",
            "funding_progress",
            "payout_schedule",
            "expected_returns",
            "key_features",
            "farm_activities",
            "risk_factors",
            "gallery",
            "banner_image",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "funding_progress", "created_at", "updated_at"]

    def validate(self, attrs):
        minimum = attrs.get("min_investment", getattr(self.instance, "min_investment", None))
        maximum = attrs.get("max_investment", getattr(self.instance, "max_investment", None))
        if minimum is not None and maximum is not None and minimum > maximum:
            raise serializers.ValidationError(
                {"min_investment": "Minimum investment cannot exceed maximum investment."}
            )
        return attrs
