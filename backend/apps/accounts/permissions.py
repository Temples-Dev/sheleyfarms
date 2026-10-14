"""Role checks. Staff always pass; farmers manage catalogue content."""

from rest_framework.permissions import BasePermission


def user_role(user):
    if user.is_staff:
        return "staff"
    profile = getattr(user, "profile", None)
    return profile.role if profile else "patron"


class IsFarmerOrStaff(BasePermission):
    """Farmers and staff manage farms; patrons read."""

    message = "Only farmers and staff can perform this action."

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated or not user.is_active:
            return False
        return user_role(user) in ("farmer", "staff")
