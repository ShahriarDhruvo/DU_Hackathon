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
    PendingRequestListSerializer,
    PendingRequestCreateSerializer
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
    serializer_class = PendingRequestListSerializer

    def get_queryset(self):

        user_id = self.request.user.id
        room_pk = self.kwargs.get('room_pk', None)

        if not (Room.objects.filter(Q(teachers=user_id) | Q(class_representatives=user_id))):
            raise PermissionDenied("You are not authorized to view this list!")

        queryset = PendingRequests.objects.filter(room_id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotFound("No pending requests!")


class PendingRequestCreate(CreateAPIView):
    serializer_class = PendingRequestCreateSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id
        room_pk = self.kwargs.get('room_pk', None)

        if PendingRequests.objects.filter(user_id=user_id, room_id=room_pk):
            raise Conflict("The user already has a pending request in this room!")
        if Room.objects.filter(Q(teachers=user_id) | Q(students=user_id)):
            raise Conflict("The user is already a member of this room!")
            

        request.data._mutable = True
        request.data['user'] = user_id
        request.data['room'] = room_pk
        if(request.user.status == 1):
            request.data['user_status'] = 'teacher'
        else:
            request.data['user_status'] = 'student'
        request.data._mutable = False

        return super(PendingRequestCreate, self).create(request, *args, **kwargs)


class PendingRequestDelete(DestroyAPIView):
    lookup_url_kwarg = 'pending_request_pk'

    def get_queryset(self):
        user_id = self.request.user.id

        if not (Room.objects.filter(Q(teachers=user_id) | Q(class_representatives=user_id))):
            raise PermissionDenied("You are not authorized to delete request!")

        queryset = PendingRequests.objects.filter()

        if queryset:
            return queryset
        else:
            raise NotAcceptable("Request does not exist!")
