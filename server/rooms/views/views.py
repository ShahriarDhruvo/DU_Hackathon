from rest_framework.exceptions import (
    NotFound,
    APIException,
    NotAcceptable,
    PermissionDenied,
)
from rest_framework import permissions
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
    RoomMemberListSerializer,
    UserPendingRequestRoomListSerializer
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
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        department_pk = self.kwargs.get('department_pk', None)
        # user_id = self.request.user.id

        # queryset = Room.objects.filter(
        #     Q(teachers=user_id) | Q(students=user_id)).order_by('id')
        queryset = Room.objects.filter(course__department_id=department_pk)

        if queryset:
            return queryset
        else:
            raise NotFound('No room has been created yet!')

class UserRoomList(ListAPIView):
    serializer_class = RoomListSerializer

    def get_queryset(self):
        user = self.request.user

        if (user.status == 1):
            queryset = user.room_teachers.all()
        else:
            queryset = user.room_students.all()

        if queryset:
            return queryset
        else:
            raise NotFound("Your room list is empty!")

class UserPendingRequestRoomList(ListAPIView):
    serializer_class = UserPendingRequestRoomListSerializer

    def get_queryset(self):
        user_id = self.request.user.id

        queryset = Room.objects.filter(pendingrequests__user_id=user_id)

        if queryset:
            return queryset
        else:
            raise NotFound("The user has not pending requests!")


class RoomCreate(CreateAPIView):
    serializer_class = RoomCreateSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id
        user_department = request.user.department.id
        selected_course_id = request.POST['course']
        selected_year = request.POST['year']
        selected_group = request.POST['group']
        #is_authenticated = request.user.status in (0, 1)
        is_authenticated = (request.user.status == 1)

        if not is_authenticated:
            raise PermissionDenied('You are not authorized to create a room')

        selected_course = Course.objects.get(id=selected_course_id)

        #if user_department != Course.objects.filter(department_id=selected_course_id):
        if user_department != selected_course.department_id:
            raise PermissionDenied(
                "This course doesn't belong to your department!")

        if Room.objects.filter(course_id=selected_course_id, year=selected_year, group=selected_group):
            raise Conflict("The selected group already exists for the same course and year!")

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

class RoomMemberList(ListAPIView):
    serializer_class = RoomMemberListSerializer

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

class RoomCheckCR(ListAPIView):
    serializer_class = RoomUpdateSerializer

    def get_queryset(self):

        user_id = self.request.user.id
        room_pk = self.kwargs.get('room_pk', None)

        queryset = Room.objects.filter(id=room_pk, class_representatives=user_id)

        if queryset:
            return queryset
        else:
            raise PermissionDenied("You are not the cr of this room!")





