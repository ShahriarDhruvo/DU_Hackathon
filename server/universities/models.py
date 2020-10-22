from django.db import models

class University(models.Model):

    name = models.CharField(max_length=100, null=True, blank=False)

    def __str__(self):
        return self.name

class Department(models.Model):

    university = models.ForeignKey(University, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=True, blank=False)

    def __str__(self):
        return self.name

