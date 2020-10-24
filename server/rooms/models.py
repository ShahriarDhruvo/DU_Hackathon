from django.db import models
from django.conf import settings
#from django.contrib.auth import get_user_model

# Can only be added by the admin

######task = section, work = room
class Room(models.Model):
    # Every year the students and teacher changes of a course.
    year = models.CharField(max_length=4)
    # Subject names, ex: SWE-305W
    title = models.CharField(max_length=50)
    details = models.CharField(max_length=100)
    admin = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='admin')#, null=True, on_delete=models.CASCADE)
    teachers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='teachers')#, null=True, on_delete=models.CASCADE)
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='students')#, null=True, on_delete=models.CASCADE)
    # sections = models.ManyToManyField(section, related_name='sections')

    def __str__(self):
        return self.title + '_(' + self.year + ')'
