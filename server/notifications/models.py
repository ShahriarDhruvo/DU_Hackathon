from django.db import models
from django.conf import settings

class Notification(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    content = models.CharField(max_length=50, null=True, blank=True)
    content_type = models.CharField(max_length=10, null=True, blank=True)
    is_seen = models.BooleanField(default=False, blank=True)



