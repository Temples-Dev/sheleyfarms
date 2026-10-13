"""Farm catalogue endpoints. Reads, creates, and updates only; nothing here deletes."""

from rest_framework import filters, viewsets

from common.permissions import ActiveUserPermission

from .models import Farm
from .serializers import FarmSerializer


class FarmViewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = [ActiveUserPermission]
    http_method_names = ["get", "post", "patch", "head", "options"]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description", "location", "farm_type"]
    ordering_fields = ["name", "expected_return_rate", "created_at"]
    ordering = ["name"]

    def get_queryset(self):
        queryset = super().get_queryset()
        params = self.request.query_params
        for field in ("status", "location", "farm_type"):
            value = params.get(field)
            if value:
                queryset = queryset.filter(**{field: value})
        return queryset
