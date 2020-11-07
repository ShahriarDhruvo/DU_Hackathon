from django.core.validators import MaxValueValidator
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):

    Admin = 0
    Teacher = 1
    Student = 2

    STATUS_CHOICES = [
        (Admin, 'Admin'),
        (Teacher, 'Teacher'),
        (Student, 'Student')
    ]

    reg_no = models.PositiveIntegerField(
        validators=[MaxValueValidator(9999999999)], null=True, blank=True, unique=True)
    university = models.ForeignKey(
        'universities.University', null=True, blank=False, on_delete=models.CASCADE)
    department = models.ForeignKey(
        'universities.Department', null=True, blank=False, on_delete=models.CASCADE)
    status = models.PositiveSmallIntegerField(
        choices=STATUS_CHOICES, default=2)

    def __str__(self):
        return self.username
