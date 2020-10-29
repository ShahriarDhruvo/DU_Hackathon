from django.urls import path, include

from .views import (
    ItemList,
    ItemCreate,
    ItemUpdate,
    ItemDelete,
    ItemDetails,

    CommentList,
    CommentCreate,
    CommentDelete,
    CommentUpdate
)

urlpatterns = [
    path('<str:room_pk>/<str:section_pk>/list/', ItemList.as_view(), name="Item-list"),
    path('<str:room_pk>/<str:section_pk>/create/', ItemCreate.as_view(), name="Item-create"),
    # path('<str:room_pk>/<str:section_pk>/delete/<str:item_pk>/', ItemDelete.as_view(), name="Item-delete"),
    # path('<str:room_pk>/<str:section_pk>/update/<str:item_pk>/', ItemUpdate.as_view(), name="Item-update"),
    # path('<str:room_pk>/<str:section_pk>/details/<str:item_pk>/', ItemDetails.as_view(), name="Item-details"),
    path('<str:room_pk>/delete/<str:item_pk>/', ItemDelete.as_view(), name="Item-delete"),
    path('<str:room_pk>/update/<str:item_pk>/', ItemUpdate.as_view(), name="Item-update"),
    path('<str:room_pk>/details/<str:item_pk>/', ItemDetails.as_view(), name="Item-details"),

    # path('comments/<str:room_pk>/<str:section_pk>/<str:item_pk>/list/', CommentList.as_view(), name="Comment-list"),
    # path('comments/<str:room_pk>/<str:section_pk>/<str:item_pk>/create/', CommentCreate.as_view(), name="Comment-create"),
    # path('comments/<str:room_pk>/<str:section_pk>/<str:item_pk>/delete/<str:comment_pk>/', CommentDelete.as_view(), name="Comment-delete"),
    # path('comments/<str:room_pk>/<str:section_pk>/<str:item_pk>/update/<str:comment_pk>/', CommentUpdate.as_view(), name="Comment-update")
    path('comments/<str:room_pk>/<str:item_pk>/list/', CommentList.as_view(), name="Comment-list"),
    path('comments/<str:room_pk>/<str:item_pk>/create/', CommentCreate.as_view(), name="Comment-create"),
    path('comments/<str:room_pk>/delete/<str:comment_pk>/', CommentDelete.as_view(), name="Comment-delete"),
    path('comments/<str:room_pk>/update/<str:comment_pk>/', CommentUpdate.as_view(), name="Comment-update")
]
