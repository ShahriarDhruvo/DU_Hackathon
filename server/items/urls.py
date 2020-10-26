from django.urls import path, include

from .views import (
    ItemList,
    ItemCreate,
    ItemUpdate,
    ItemDelete,
    ItemDetails,
)

urlpatterns = [
    path('<str:room_pk>/<str:section_pk>/list/', ItemList.as_view(), name="Item-list"),
    path('<str:room_pk>/<str:section_pk>/create/', ItemCreate.as_view(), name="Item-create"),
    path('<str:room_pk>/<str:section_pk>/delete/<str:item_pk>/', ItemDelete.as_view(), name="Item-delete"),
    path('<str:room_pk>/<str:section_pk>/update/<str:item_pk>/', ItemUpdate.as_view(), name="Item-update"),
    path('<str:room_pk>/<str:section_pk>/details/<str:item_pk>/', ItemDetails.as_view(), name="Item-details")
]
