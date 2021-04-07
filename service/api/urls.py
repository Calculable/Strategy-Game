from django.urls import path
#from .views import PlayerView
from .views import current_user, UserList

urlpatterns = [
    #path('', PlayerView.as_view())
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
]