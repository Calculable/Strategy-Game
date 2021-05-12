from django.urls import path
#from .views import PlayerView
from .views import current_user, UserList, getBuildingInformation, woodcuttersRequests, mineRequests, townhallRequests

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('buildingInformation/', getBuildingInformation),
    path('woodcutters', woodcuttersRequests),
    path('mine', mineRequests),
    path('townhall', townhallRequests),
]