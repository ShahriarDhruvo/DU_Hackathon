from django.db import models
from rooms.models import Room
from django.conf import settings
from sections.models import Section
from notifications.models import Notification


class Item(models.Model):

    date = models.DateField()
    time = models.TimeField()
    content = models.TextField(null=True)
    post_datetime = models.DateTimeField(auto_now=True)
    section = models.ForeignKey(
        'sections.section', null=True, on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)

    def save(self, *args, **kwargs):

        if self._state.adding:
            # Room.objects.filter(section__id=self.section)

            #section = Section.objects.filter(id=self.section)
            #room = section.room
            """
            check this:
            https://stackoverflow.com/questions/18732111/django-bulk-create-for-models-with-multiple-required-fields
            """
            room = self.section.room
            students = room.students.all()  # values_list(flat=True)
            # print(room.owner)
            print(students)
            # print(room.teachers.all())

            #Notification.objects.create(user=room.owner, content='Test', content_type='item_1')

            content = "Someone has posted an item in room " + \
                room.course.title + " section " + self.section.title + "."
            content_type = 'item'

            members = students

            Notification.objects.bulk_create(
                [Notification(user=user, content=content,
                              content_type=content_type) for user in members]
            )

        super().save(*args, **kwargs)


class Comment(models.Model):

    item = models.ForeignKey(Item, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             null=True, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    comment_datetime = models.DateTimeField(auto_now=True)
    vote = models.IntegerField(default=0, blank=True)
