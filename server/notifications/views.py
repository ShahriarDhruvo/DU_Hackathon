from rest_framework.exceptions import (
    NotFound,
)
from rest_framework.generics import (
    DestroyAPIView,
    ListAPIView,
)

from .serializers import NotificationSerializer
from .models import Notification

class NotificationList(ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):

        user_id = self.request.user.id

        #queryset = Notification.objects.filter(user_id=user_id)

        """
        https://stackoverflow.com/questions/57167237/how-to-delete-first-n-items-from-queryset-in-django
        """
        notification_size = Notification.objects.filter(user_id=user_id).count()
        notification_limit = 2
        if(notification_size > notification_limit):
            #queryset = Notification.objects.filter(user_id=user_id)[:1].values_list("id", flat=True)
            #Notification.objects.exclude(pk__in=list(queryset)).delete()
            Notification.objects.filter(pk__in=list(Notification.objects.filter(user_id=user_id).values_list('id', flat=True)[:notification_size - notification_limit])).delete()

        #print(Notification.objects.filter(user_id=user_id).values_list('id', flat=True)[:notification_size - notification_limit])
        queryset = Notification.objects.filter(user_id=user_id)

        if queryset:
            return queryset
        else:
            raise NotFound("No new notifications!")

class NotificationDelete(DestroyAPIView):
    lookup_url_kwarg = 'notification_pk'
    
    def get_queryset(self):
        user_id = self.request.user.id

        queryset = Notification.objects.filter(user_id=user_id)

        if queryset:
            return queryset
        else:
            raise NotFound("Notification not found!")
