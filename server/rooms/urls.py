from django.urls import path, include

from .views import (
    RoomList,
    RoomCreate,
    RoomUpdate,
    RoomDelete,
    RoomDetails,
    RoomAddStudent
)

urlpatterns = [
    path('list/', RoomList.as_view(), name="room-list"),
    path('create/', RoomCreate.as_view(), name="room-create"),
    path('delete/<str:pk>', RoomDelete.as_view(), name="room-delete"),
    path('update/<str:pk>', RoomUpdate.as_view(), name="room-update"),
    path('details/<str:pk>', RoomDetails.as_view(), name="room-details"),
    path('add/student/<str:pk>/<str:student>', RoomAddStudent.as_view(), name="room-add-student")
]
