from django.db import models
from rooms.models import Room
from django.conf import settings
from sections.models import Section
from notifications.models import Notification


class Item(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    date = models.DateField()
    time = models.TimeField()
    content = models.TextField(null=True)
    post_datetime = models.DateTimeField(auto_now=True)
    section = models.ForeignKey(
        'sections.section', null=True, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):

        if self._state.adding:
            """
            check this:
            https://stackoverflow.com/questions/18732111/django-bulk-create-for-models-with-multiple-required-fields
            """

            content = "Someone has posted an item in room "
        
        else:
            content = "Someone has updated an item in room "

        super().save(*args, **kwargs)

        room = self.section.room

        students = room.students.all()
        teachers = room.teachers.all()

        members = students | teachers

        content = content + room.course.title + ", " + room.course.details + " section " + self.section.title + "."
        content_type = "item, " + str(room.id) + ", " + str(self.id)

        Notification.objects.bulk_create(
            [Notification(user=user, content=content, content_type=content_type) for user in members])
            

class Comment(models.Model):

    item = models.ForeignKey(Item, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             null=True, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    comment_datetime = models.DateTimeField(auto_now=True)
    vote = models.IntegerField(default=0, blank=True)

    def save(self, *args, **kwargs):

        if self._state.adding:
            
            content = "Someone has posted a comment in room "
        
        else:
            content = "Someone has updated a comment in room "

        super().save(*args, **kwargs)

        section = self.item.section
        room = section.room

        students = room.students.all()
        teachers = room.teachers.all()

        members = students | teachers

        item_content = self.item.content
        if(len(item_content) > 12):
            item_content = item_content[0 : 12]
            item_content += "... "

        content = content + room.course.title + ", " + room.course.details + " section " + section.title + " item " + item_content
        content_type = "comment, " + str(room.id) + ", " + str(self.item.id)

        Notification.objects.bulk_create(
            [Notification(user=user, content=content, content_type=content_type) for user in members])
