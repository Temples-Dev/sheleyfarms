"""Investment serializers. Amounts are validated against the farm's bounds."""

from rest_framework import serializers

from apps.farms.models import Farm
from apps.farms.serializers import FarmSerializer

from .models import Investment


class InvestmentSerializer(serializers.ModelSerializer):
    farm_id = serializers.PrimaryKeyRelatedField(source="farm", queryset=Farm.objects.all())
    farm = FarmSerializer(read_only=True)

    class Meta:
        model = Investment
        fields = [
            "id",
            "farm_id",
            "farm",
            "amount",
            "status",
            "expected_return_rate",
            "duration_months",
            "current_value",
            "invested_at",
            "completed_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "farm",
            "invested_at",
            "completed_at",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {
            "expected_return_rate": {"required": False},
            "duration_months": {"required": False},
            "current_value": {"required": False},
        }

    def validate(self, attrs):
        farm = attrs.get("farm", getattr(self.instance, "farm", None))
        amount = attrs.get("amount", getattr(self.instance, "amount", None))
        if farm is not None and amount is not None:
            if amount < farm.min_investment or amount > farm.max_investment:
                raise serializers.ValidationError(
                    {
                        "amount": (
                            f"Amount must be between {farm.min_investment} "
                            f"and {farm.max_investment}."
                        )
                    }
                )
        return attrs

    def create(self, validated_data):
        farm = validated_data["farm"]
        validated_data.setdefault("expected_return_rate", farm.expected_return_rate)
        validated_data.setdefault("duration_months", farm.duration_months)
        validated_data.setdefault("current_value", validated_data["amount"])
        return super().create(validated_data)
