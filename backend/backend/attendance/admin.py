from django.contrib import admin
from .models import Attendance


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):

    list_display = (
        "member",
        "date",
        "time",
        "status",
    )

    list_filter = (
        "date",
        "status",
    )

    search_fields = (
        "member__first_name",
        "member__phone",
    )