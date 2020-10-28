from django.db import models
from django.conf import settings

class Item(models.Model):

    section = models.ForeignKey('sections.section', null=True, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    date = models.DateField()
    time = models.TimeField()
    post_datetime = models.DateTimeField(auto_now=True)


class Comment(models.Model):

    item = models.ForeignKey(Item, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    #post_datetime = models.DateTimeField(auto_now=True)
