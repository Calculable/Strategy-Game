from django.urls import path
#from .views import PlayerView
from .views import current_user, UserList, current_stuff

urlpatterns = [
    #path('', PlayerView.as_view())
    path('current_user/', current_user),
    path('current_stuff/', current_stuff),
    path('users/', UserList.as_view()),
    #path('buildings/', BuildingsList.asview())
]