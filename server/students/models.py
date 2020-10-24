from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Student(models.Model):

    registration_no = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(999999999999999)])
