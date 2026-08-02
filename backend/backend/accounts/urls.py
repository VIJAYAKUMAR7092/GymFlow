from django.urls import path

from .views import (
    LoginView,
    RegisterView,
    PendingUsersView,
    ApproveUserView,
    RejectUserView,
)

urlpatterns = [
    # Authentication
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),

    # Admin Approval
    path(
        "pending-users/",
        PendingUsersView.as_view(),
        name="pending-users",
    ),

    path(
        "approve/<int:pk>/",
        ApproveUserView.as_view(),
        name="approve-user",
    ),

    path(
        "reject/<int:pk>/",
        RejectUserView.as_view(),
        name="reject-user",
    ),
]