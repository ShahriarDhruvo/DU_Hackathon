from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import (
    NotFound,
    APIException,
    PermissionDenied,
)
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    UpdateAPIView
)

from .serializers import (
    ItemSerializer,
    ItemUpdateSerializer
)
from .models import Item
from rooms.models import Room
from sections.models import Section

class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class ItemList(ListAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):

        user_id = self.request.user.id

        room_pk = self.kwargs.get('rpk', None)
        section_pk = self.kwargs.get('spk', None)

        is_teacher = Room.objects.filter((Q(teachers=user_id) | Q(students=user_id)), id=room_pk)

        #if not is_authenticated:
        if not is_teacher:
            raise PermissionDenied("You are not authorized to view this list!")

        queryset = Item.objects.filter(section_id=section_pk).order_by('id')#, section__room__id='rpk').order_by('id')

        if queryset:
            return queryset
        else:
            raise NotFound("No item has been created yet!")


class ItemCreate(CreateAPIView):
    serializer_class = ItemSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id

        room_pk = self.kwargs.get('rpk', None)
        section_pk = self.kwargs.get('spk', None)

        #is_authenticated = request.user.is_staff
        is_teacher = Room.objects.filter(teachers=user_id, id=room_pk)

        #if not is_authenticated:
        if not is_teacher:
            raise PermissionDenied("You are not authorized to create this item!")

        request.data._mutable = True
        request.data['section'] = section_pk
        request.data._mutable = False

        return super(ItemCreate, self).create(request, *args, **kwargs)


class ItemDelete(DestroyAPIView):
    def get_queryset(self):

        user_id = request.user.id

        room_pk = self.kwargs.get('rpk', None)
        section_pk = self.kwargs.get('spk', None)

        #is_authenticated = request.user.is_staff
        is_teacher = Room.objects.filter(teachers=user_id, id=room_pk)

        #if not is_authenticated:
        if not is_teacher:
            raise PermissionDenied("You are not authorized to create this item!")

        queryset = Item.objects.filter(id=pk)
        
        if queryset:
            return queryset
        else:
            raise NotFound("Item not found")


class ItemUpdate(UpdateAPIView):
    
    serializer_class = ItemUpdateSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        
        room_pk = self.kwargs.get('rpk', None)
        section_pk = self.kwargs.get('spk', None)

        #is_authenticated = request.user.is_staff
        is_teacher = Room.objects.filter(teachers=user_id, id=room_pk)

        #if not is_authenticated:
        if not is_teacher:
            raise PermissionDenied("You are not authorized to create this item!")

        queryset = Item.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Item not found")

class ItemDetails(ListAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        
        user_id = self.request.user.id
        
        room_pk = self.kwargs.get('rpk', None)
        section_pk = self.kwargs.get('spk', None)

        is_teacher = Room.objects.filter((Q(teachers=user_id) | Q(students=user_id)), id=room_pk)

        if not is_teacher:
            raise PermissionDenied("You are not authorized to view this item!")

        queryset = Item.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Item not found")



