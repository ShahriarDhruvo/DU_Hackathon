from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    department = models.CharField(max_length=5)
    university = models.CharField(max_length=100)
    reg_no = models.CharField(max_length=10, blank=True, null=True)
