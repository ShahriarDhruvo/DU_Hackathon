from django.urls import path, include
from .views import apiOverview

urlpatterns = [
    path('', apiOverview, name="api-overview"),

    path('accounts/', include('accounts.urls')),

    path('rooms/', include('rooms.urls')),

    path('university/', include('universities.urls')),

    path('notifications/', include('notifications.urls'))
]
