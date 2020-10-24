import datetime
from django.db import models
from django.conf import settings
from accounts.models import CustomUser
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator
)


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


class Room(models.Model):
    # Subject names, ex: SWE-305W
    title = models.CharField(max_length=50)
    details = models.CharField(max_length=100)
    admins = models.ManyToManyField(CustomUser, related_name='room_admins')
    teachers = models.ManyToManyField(CustomUser, related_name='room_teachers')
    students = models.ManyToManyField(CustomUser, related_name='room_students')
    owner = models.ForeignKey(
        CustomUser, related_name='room_owner', on_delete=models.CASCADE)
    # Every year the students and teacher changes of a course so we have to keep track of which year this room belongs to.
    year = models.PositiveIntegerField(default=current_year(), validators=[
                                       MinValueValidator(1984), max_value_current_year])

    def __str__(self):
        return '%s (%s)' % (self.title, str(self.year))
