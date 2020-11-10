from django.db import models
from django.conf import settings

class Notification(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    content = models.CharField(max_length=200, null=True, blank=True)
    content_type = models.CharField(max_length=100, null=True, blank=True)
