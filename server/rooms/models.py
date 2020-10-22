from django.db import models

# Can only be added by the admin


class Room(models.Model):
    # Every year the students and teacher changes of a course.
    year = models.IntegerField(max_length=4)
    # Subject names, ex: SWE-305W
    title = models.CharField(max_length=50)
    # teachers = models.ManyToManyField(User, related_name='teachers')
    # students = models.ManyToManyField(User, related_name='students')
    # sections = models.ManyToManyField(section, related_name='sections')

    def __str__(self):
        return self.title + '_(' + self.year + ')'
