"""Investment routes, mounted under api/v1/."""

from rest_framework.routers import DefaultRouter

from .views import InvestmentViewSet

router = DefaultRouter()
router.register("investments", InvestmentViewSet, basename="investment")

urlpatterns = router.urls
