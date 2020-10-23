from django.db import models
from django.contrib.auth.models import User

# Can only be added by the admin

######task = section, work = room
class Room(models.Model):
    # Every year the students and teacher changes of a course.
    year = models.CharField(max_length=4)
    # Subject names, ex: SWE-305W
    title = models.CharField(max_length=50)
    details = models.CharField(max_length=100)
    admin = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='admin')
    teachers = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='teachers')
    students = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='students')
    # sections = models.ManyToManyField(section, related_name='sections')

    def __str__(self):
        return self.title + '_(' + self.year + ')'
