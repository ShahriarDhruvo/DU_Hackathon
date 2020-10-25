from django.db import models

class Item(models.Model):

    section = models.ForeignKey('sections.section', null=True)

    content = models.TextField(null=True)

    date = models.DateField()

    time = models.TimeField()

    post_datetime = models.DateTimeField(auto_now=True)