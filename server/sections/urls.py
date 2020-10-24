from django.urls import path, include

from .views import (
    SectionList,
    SectionCreate,
    SectionUpdate,
    SectionDelete,
    SectionDetails,
)

urlpatterns = [
    path('<str:rpk>/list/', SectionList.as_view(), name="sections-list"),
    path('<str:rpk>/create/', SectionCreate.as_view(), name="section-create"),
    path('<str:rpk>/delete/<str:pk>', SectionDelete.as_view(), name="section-delete"),
    path('<str:rpk>/update/<str:pk>', SectionUpdate.as_view(), name="section-update"),
    path('<str:rpk>/details/<str:pk>', SectionDetails.as_view(), name="section-details"),
]
