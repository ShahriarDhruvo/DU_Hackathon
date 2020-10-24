from django.db import models

# Can only be added by the admin


class Section(models.Model):
    # What this section is about, ex: Class Recording
    room = models.ForeignKey('rooms.Room', on_delete=models.CASCADE, null=True, blank=False)
    title = models.CharField(max_length=50)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    items = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.title
