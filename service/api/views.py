from django.shortcuts import render
from rest_framework import generics
#from .models import Player
#from .serializers import PlayerSerializer
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken

#class PlayerView(generics.ListAPIView):
#    queryset = Player.objects.all()
#    serializer_class = PlayerSerializer

#@api_view(['GET', 'POST'])
#def players_list(request):
#    if request.method == 'GET':
#        data = Player.objects.all()
#
#        serializer = PlayerSerializer(data, context={'request': request}, many=True)
#
#        return Response(serializer.data)
#
#    elif request.method == 'POST':
#        serializer = PlayerSerializer(data=request.data)
#        if serializer.is_valid():
#            serializer.save()
#            return Response(status=status.HTTP_201_CREATED)
#            
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)