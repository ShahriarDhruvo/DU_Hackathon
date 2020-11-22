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

from ..serializers import (
    ItemSerializer,
    ItemCreateSerializer,
    ItemUpdateSerializer
)
from django.db.models import Q
from ..models import Item
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

        room_pk = self.kwargs.get('room_pk', None)
        section_pk = self.kwargs.get('section_pk', None)

        is_authenticated = Room.objects.filter(
            (Q(teachers=user_id) | Q(students=user_id)), id=room_pk)

        if not is_authenticated:
            raise PermissionDenied("You are not authorized to view this list!")

        queryset = Item.objects.filter(
            section_id=section_pk, section__room_id=room_pk).order_by('id')

        if queryset:
            return queryset
        else:
            raise NotFound("No item has been created yet")


class ItemCreate(CreateAPIView):
    serializer_class = ItemCreateSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id

        room_pk = self.kwargs.get('room_pk', None)
        section_pk = self.kwargs.get('section_pk', None)

        #is_authenticated = request.user.is_staff
        is_teacher = Room.objects.filter(teachers=user_id, id=room_pk)

        # if not is_authenticated:
        if not is_teacher:
            raise PermissionDenied("Only teacher can create item!")

        queryset = Section.objects.filter(id=section_pk, room_id=room_pk)

        if not queryset:
            raise NotFound(
                "The section you're trying to add item to doesn't exist!")

        request.data._mutable = True
        request.data['user'] = user_id
        request.data['section'] = section_pk
        request.data._mutable = False

        return super(ItemCreate, self).create(request, *args, **kwargs)


class ItemDelete(DestroyAPIView):
    lookup_url_kwarg = 'item_pk'

    def get_queryset(self):
        user_id = self.request.user.id

        room_pk = self.kwargs.get('room_pk', None)
        #section_pk = self.kwargs.get('section_pk', None)

        is_teacher = Room.objects.filter(teachers=user_id, id=room_pk)

        if not is_teacher:
            raise PermissionDenied("Only teacher can delete item!")

        #queryset = Item.objects.filter(section_id=section_pk, section__room_id=room_pk)
        queryset = Item.objects.filter(section__room_id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Item not found")


class ItemUpdate(UpdateAPIView):
    serializer_class = ItemUpdateSerializer
    lookup_url_kwarg = 'item_pk'

    def get_queryset(self):
        user_id = self.request.user.id

        room_pk = self.kwargs.get('room_pk', None)
        #section_pk = self.kwargs.get('section_pk', None)

        is_teacher = Room.objects.filter(teachers=user_id, id=room_pk)

        if not is_teacher:
            raise PermissionDenied("Only teacher can update item!")

        #queryset = Item.objects.filter(section_id=section_pk, section__room_id=room_pk)
        queryset = Item.objects.filter(section__room_id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Item not found")


class ItemDetails(ListAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):

        user_id = self.request.user.id

        room_pk = self.kwargs.get('room_pk', None)
        item_pk = self.kwargs.get('item_pk', None)
        #section_pk = self.kwargs.get('section_pk', None)

        is_authenticated = Room.objects.filter(
            (Q(teachers=user_id) | Q(students=user_id)), id=room_pk)

        if not is_authenticated:
            raise PermissionDenied("You are not authorized to view this item!")

        #queryset = Item.objects.filter(section_id=section_pk, id=item_pk, section__room_id=room_pk)
        queryset = Item.objects.filter(id=item_pk, section__room_id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Item not found")
