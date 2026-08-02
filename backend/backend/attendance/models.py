from django.db import models
from members.models import Member


class Attendance(models.Model):

    STATUS_CHOICES = [
        ("Check In", "Check In"),
        ("Check Out", "Check Out"),
    ]

    member = models.ForeignKey(
        Member,
        on_delete=models.CASCADE,
        related_name="attendance"
    )

    date = models.DateField(auto_now_add=True)

    time = models.TimeField(auto_now_add=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Check In"
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.member} - {self.date}"