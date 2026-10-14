"""Investment endpoints. Patrons see only their own commitments; staff see all."""

from rest_framework import filters, viewsets

from common.permissions import ActiveUserPermission

from .models import Investment
from .serializers import InvestmentSerializer


class InvestmentViewSet(viewsets.ModelViewSet):
    serializer_class = InvestmentSerializer
    permission_classes = [ActiveUserPermission]
    http_method_names = ["get", "post", "patch", "head", "options"]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["farm__name", "farm__location"]
    ordering_fields = ["invested_at", "amount", "created_at"]
    ordering = ["-invested_at"]

    def get_queryset(self):
        queryset = Investment.objects.select_related("farm").all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(user=self.request.user)
        params = self.request.query_params
        if params.get("status"):
            queryset = queryset.filter(status=params["status"])
        if params.get("farm_id"):
            queryset = queryset.filter(farm_id=params["farm_id"])
        if self.request.user.is_staff and params.get("user_id"):
            queryset = queryset.filter(user_id=params["user_id"])
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
