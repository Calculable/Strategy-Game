from django.urls import path
#from .views import PlayerView
from .views import current_user, UserList, getBuildingInformation, woodcuttersRequests, mineRequests

urlpatterns = [
    #path('', PlayerView.as_view())
    path('current_user/', current_user),
    path('buildingInformation/', getBuildingInformation),
    path('users/', UserList.as_view()),
    #path('buildings/', BuildingsList.asview())
    path('woodcutters', woodcuttersRequests),
    path('mine', mineRequests),
]