from django.urls import path, include

from .views import (
    RoomList,
    RoomCreate,
    RoomUpdate,
    RoomDelete,
    RoomDetails,
    RoomAddUser,
    RoomRemoveUser
)

urlpatterns = [
    path('list/', RoomList.as_view(), name="room-list"),
    path('create/', RoomCreate.as_view(), name="room-create"),
    path('delete/<str:room_pk>/', RoomDelete.as_view(), name="room-delete"),
    path('update/<str:room_pk>/', RoomUpdate.as_view(), name="room-update"),
    path('details/<str:room_pk>/', RoomDetails.as_view(), name="room-details"),
    path('add/<str:room_pk>/<str:user>/<str:username>/', RoomAddUser.as_view(), name="room-add-user"),
    path('remove/<str:room_pk>/<str:user>/<str:username>/', RoomRemoveUser.as_view(), name="room-remove-user"),

    path('sections/', include('sections.urls'))
]
