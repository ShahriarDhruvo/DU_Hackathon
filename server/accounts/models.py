from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):

    #university = models.ForeignKey('universities.University',null=True, on_delete=models.CASCADE)
    department = models.ForeignKey('universities.Department',null=True, on_delete=models.CASCADE)
    #department = models.CharField(max_length=10, blank=True, null=True)
    university = models.CharField(max_length=10, blank=True, null=True)
    reg_no = models.CharField(max_length=10, blank=True, null=True)
