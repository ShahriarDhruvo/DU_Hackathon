from django.db import models

# Can only be added by the admin


class Section(models.Model):
    # What is this section is about, ex: Class Recording
    title = models.CharField(max_length=50)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    items = models.CharField(blank=True, null=True)

    def __str__(self):
        return self.title
