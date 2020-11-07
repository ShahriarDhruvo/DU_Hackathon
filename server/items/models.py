from django.db import models
from rooms.models import Room
from sections.models import Section
from notifications.models import Notification
from django.conf import settings

class Item(models.Model):

    section = models.ForeignKey('sections.section', null=True, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    date = models.DateField()
    time = models.TimeField()
    post_datetime = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):

        if self._state.adding:
            #Room.objects.filter(section__id=self.section)

            #section = Section.objects.filter(id=self.section)
            #room = section.room
            """
            check this:
            https://stackoverflow.com/questions/18732111/django-bulk-create-for-models-with-multiple-required-fields
            """
            room = self.section.room
            students = room.students.values_list(flat=True)
            print(room.owner)
            print(students)
            print(room.teachers.all())

            Notification.objects.create(user=room.owner, content='Test', content_type='item_1')

        super().save(*args, **kwargs)



            


class Comment(models.Model):

    item = models.ForeignKey(Item, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    #post_datetime = models.DateTimeField(auto_now=True)
