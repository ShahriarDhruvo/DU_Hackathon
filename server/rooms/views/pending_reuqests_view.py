from rest_framework.exceptions import (
    NotFound,
    APIException,
    NotAcceptable,
    PermissionDenied,
)
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    DestroyAPIView
)

from ..serializers import (
    PendingRequestSerializer
)
from ..models import (
    Room,
    PendingRequests
)
from django.db.models import Q


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class PendingRequestList(ListAPIView):
    serializer_class = PendingRequestSerializer

    def get_queryset(self):

        user_id = self.request.user.id
        room_pk = self.kwargs.get('room_pk', None)

        if not (Room.objects.filter(Q(teachers=user_id) | Q(class_representatives=user_id)).order_by('id')):
            raise PermissionDenied("You are not authorized to view this list!")

        queryset = PendingRequests.objects.filter(room_id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotFound("No pending requests!")


class PendingRequestCreate(CreateAPIView):
    serializer_class = PendingRequestSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id
        room_pk = self.kwargs.get('room_pk', None)

        if PendingRequests.objects.filter(user_id=user_id, room_id=room_pk):
            raise Conflict("The user already has a pending request in this room!")

        request.data._mutable = True
        request.data['user'] = user_id
        request.data['room'] = room_pk
        request.data._mutable = False

        return super(PendingRequestCreate, self).create(request, *args, **kwargs)


class PendingRequestDelete(DestroyAPIView):
    lookup_url_kwarg = 'pending_request_pk'

    def get_queryset(self):
        user_id = self.request.user.id

        if not (Room.objects.filter(Q(teachers=user_id) | Q(class_representatives=user_id)).order_by('id')):
            raise PermissionDenied("You are not authorized to delete request!")

        queryset = PendingRequests.objects.filter(user_id=user_id)

        if queryset:
            return queryset
        else:
            raise NotAcceptable("Request does not exist!")
