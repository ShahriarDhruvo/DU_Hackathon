from rest_framework.exceptions import (
    NotFound,
    APIException,
    NotAcceptable,
    PermissionDenied,
)
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)

from ..serializers import (
    RoomSerializer,
    RoomListSerializer,
    RoomCreateSerializer,
    RoomUpdateSerializer,
)
from ..models import Room
from universities.models import Course
from django.db.models import Q


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class RoomList(ListAPIView):
    serializer_class = RoomListSerializer

    def get_queryset(self):
        # user_id = self.request.user.id

        # queryset = Room.objects.filter(
        #     Q(teachers=user_id) | Q(students=user_id)).order_by('id')
        queryset = Room.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound('No room has been created yet!')


class RoomCreate(CreateAPIView):
    serializer_class = RoomCreateSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id
        user_department = request.user.department
        selected_course_id = request.POST['course']
        is_authenticated = request.user.status in (0, 1)

        if not is_authenticated:
            raise PermissionDenied('You are not authorized to create a room')

        if user_department != Course.objects.filter(department_id=selected_course_id):
            raise PermissionDenied(
                "This course doesn't belong to your department!")

        request.data._mutable = True
        request.data['owner'] = user_id
        request.data['teachers'] = user_id
        request.data._mutable = False

        return super(RoomCreate, self).create(request, *args, **kwargs)


class RoomDelete(DestroyAPIView):
    lookup_url_kwarg = 'room_pk'

    def get_queryset(self):
        user_id = self.request.user.id

        is_owner = Room.objects.filter(owner=user_id)

        if is_owner:
            return is_owner
        else:
            raise NotAcceptable(
                'Room does not exist or only the owner of this room is authorized for deletion')


class RoomUpdate(UpdateAPIView):
    serializer_class = RoomUpdateSerializer
    lookup_url_kwarg = 'room_pk'

    def get_queryset(self):
        user_id = self.request.user.id
        queryset = Room.objects.filter(teachers=user_id)

        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Room does not exist or you are not authorized for this action')


class RoomDetails(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        room_pk = self.kwargs.get('room_pk', None)

        queryset = Room.objects.filter(
            Q(teachers=user_id) | Q(students=user_id), id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Room does not exist or you are not authorized!')