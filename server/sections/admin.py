from django.contrib import admin
from .models import Section


class SectionAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


admin.site.register(Section, SectionAdmin)
