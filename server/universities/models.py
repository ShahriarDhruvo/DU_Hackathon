from django.db import models

class University(models.Model):

    name = models.CharField(max_length=100, null=True, blank=False, unique=True)

    def __str__(self):
        return self.name

class Department(models.Model):

    university = models.ForeignKey(University, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=True, blank=False, unique=True)

    def __str__(self):
        return self.name

class Course(models.Model):

    department = models.ForeignKey(Department, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=10, null=True, blank=False, unique=True)
    details = models.CharField(max_length=30, null=True, blank=False)

    def __str__(self):
        return '%s, %s' % (self.title, self.details)
