from django.urls import path, include

from .views import (
    SectionList,
    SectionCreate,
    SectionUpdate,
    SectionDelete,
    SectionDetails,
)

urlpatterns = [
    path('<str:room_pk>/list/', SectionList.as_view(), name="section-list"),
    path('<str:room_pk>/create/', SectionCreate.as_view(), name="section-create"),
    path('<str:room_pk>/delete/<str:section_pk>/', SectionDelete.as_view(), name="section-delete"),
    path('<str:room_pk>/update/<str:section_pk>/', SectionUpdate.as_view(), name="section-update"),
    path('<str:room_pk>/details/<str:section_pk>/', SectionDetails.as_view(), name="section-details"),

    path('items/', include('items.urls'))
]
