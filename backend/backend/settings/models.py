from django.db import models


class GymSettings(models.Model):
    gym_name = models.CharField(max_length=150)
    owner_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    address = models.TextField()

    logo = models.ImageField(
        upload_to="gym_logo/",
        blank=True,
        null=True
    )

    opening_time = models.TimeField()
    closing_time = models.TimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.gym_name