from django.contrib import admin
from .models import Item, Comment


class ItemAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


admin.site.register(Item, ItemAdmin)


class CommentAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)


admin.site.register(Comment, CommentAdmin)
