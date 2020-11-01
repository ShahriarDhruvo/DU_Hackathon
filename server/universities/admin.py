from django.contrib import admin


from .models import (
    Course,
    University,
    Department,
)

admin.site.register(Course)
admin.site.register(University)
admin.site.register(Department)
