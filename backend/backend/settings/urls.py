from rest_framework.routers import DefaultRouter
from .views import GymSettingsViewSet

router = DefaultRouter()
router.register("settings", GymSettingsViewSet)

urlpatterns = router.urls