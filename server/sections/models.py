from django.db import models

# Can only be added by the admin


class Section(models.Model):
    # What this section is about, ex: Class Recording
    title = models.CharField(max_length=50)
    room = models.ForeignKey('rooms.Room', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title
