from django.db.models import Sum
from django.db.models.functions import TruncMonth

from rest_framework.decorators import api_view
from rest_framework.response import Response

from members.models import Member
from plans.models import MembershipPlan
from payments.models import Payment
from attendance.models import Attendance


@api_view(["GET"])
def dashboard_report(request):

    total_members = Member.objects.count()

    total_plans = MembershipPlan.objects.count()

    total_revenue = (
        Payment.objects.filter(status="Paid")
        .aggregate(total=Sum("amount"))["total"] or 0
    )

    today_attendance = Attendance.objects.filter(
        status="Check In"
    ).count()

    monthly_revenue = (
        Payment.objects.filter(status="Paid")
        .annotate(month=TruncMonth("payment_date"))
        .values("month")
        .annotate(revenue=Sum("amount"))
        .order_by("month")
    )

    chart = []

    for item in monthly_revenue:
        chart.append({
            "month": item["month"].strftime("%b"),
            "revenue": float(item["revenue"]),
        })

    return Response({
        "total_members": total_members,
        "total_plans": total_plans,
        "total_revenue": total_revenue,
        "today_attendance": today_attendance,
        "chart": chart,
    })