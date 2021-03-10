from django.contrib import admin
from .models import Room


class RoomAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


admin.site.register(Room, RoomAdmin)