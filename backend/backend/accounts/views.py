from django.conf import settings
from django.core.mail import send_mail

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.authtoken.models import Token
from rest_framework import status

from .models import User
from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    UserSerializer,
)


# ==========================
# Register
# ==========================

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user = serializer.instance

        try:
            send_mail(
                subject="🏋️ New Gym Registration",
                message=f"""
A new gym owner has registered.

Username : {user.username}
Email : {user.email}
Phone : {user.phone}

Please approve this account.
""",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[
                    "vijayakumar709202@gmail.com",
                ],
                fail_silently=False,
            )

        except Exception as e:
            print("Registration Mail Error:", e)

        return Response(
            {
                "message": "Registration successful. Waiting for approval."
            },
            status=status.HTTP_201_CREATED,
        )


# ==========================
# Login
# ==========================

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {
                "token": token.key,
                "username": user.username,
                "role": user.role,
            }
        )


# ==========================
# Pending Users
# ==========================

class PendingUsersView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):

        users = User.objects.filter(is_approved=False)

        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)


# ==========================
# Approve User
# ==========================

class ApproveUserView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):

        try:
            user = User.objects.get(pk=pk)

        except User.DoesNotExist:
            return Response(
                {"message": "User Not Found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        user.is_approved = True
        user.save()

        try:
            send_mail(
                subject="🎉 GymFlow Account Approved",
                message=f"""
Hello {user.username},

Congratulations!

Your GymFlow account has been approved.

You can now login and start using GymFlow.

Email:
{user.email}

Thank you,
GymFlow Team
""",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

        except Exception as e:
            print("Approval Mail Error:", e)

        return Response(
            {"message": "User Approved Successfully"}
        )


# ==========================
# Reject User
# ==========================

class RejectUserView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):

        try:
            user = User.objects.get(pk=pk)

        except User.DoesNotExist:
            return Response(
                {"message": "User Not Found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        user.delete()

        return Response(
            {"message": "User Rejected Successfully"}
        )