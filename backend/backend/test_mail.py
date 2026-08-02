from django.core.mail import send_mail
from django.conf import settings
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django
django.setup()

send_mail(
    "Test Mail",
    "Hello Vijay",
    settings.DEFAULT_FROM_EMAIL,
    ["vijayakumar709202@gmail.com"],
    fail_silently=False,
)

print("Mail sent")