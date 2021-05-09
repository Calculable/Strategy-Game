from django.shortcuts import render
from rest_framework import generics
from .models import Woodcutters, Mine, Townhall, ArmyCenter, Player
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, GameSerializer, WoodcuttersSerializer, MineSerializer
from django.conf import settings
from datetime import datetime, timezone

#class PlayerView(generics.ListAPIView):
#    queryset = Player.objects.all()
#    serializer_class = PlayerSerializer

@api_view(['GET', 'PUT'])
def mineRequests(request):
    """
    GET:
        - Gets all informations about your Mine.
    
    PUT:
        - amountCoal has to be 0
        - amountIronOre has to be 0
        - amountDedicatedWorkers has to be 0 or above
        - buildinglevel has to be the current level or if you want to levelup: current level + 1
    """
    if request.method == 'GET':
        serializer = MineSerializer(Mine.objects.get(user=request.user))
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = MineSerializer(Mine.objects.get(user=request.user), data=request.data)
        if serializer.is_valid():
            if 'amountCoal' in request.data and request.data['amountCoal'] != 0:
                return Response('You cant set amountCoal manually', status=status.HTTP_400_BAD_REQUEST)
            if 'amountIronOre' in request.data and request.data['amountIronOre'] != 0:
                return Response('You cant set amountIronOre manually', status=status.HTTP_400_BAD_REQUEST)
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] - Mine.objects.get(user=request.user).amountDedicatedWorkers > Townhall.objects.get(user=request.user).amountWorkersFree:
                return Response('Not enough workers available', status=status.HTTP_400_BAD_REQUEST)
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] + Mine.objects.get(user=request.user).amountDedicatedWorkers < 0:
                return Response('Its not possible to go below zero workers', status=status.HTTP_400_BAD_REQUEST)
            if 'buildinglevel' in request.data and not (request.data['buildinglevel'] == Mine.objects.get(user=request.user).buildinglevel + 1 or request.data['buildinglevel'] == Mine.objects.get(user=request.user).buildinglevel):
                return Response('Its not possible to skip levels', status=status.HTTP_400_BAD_REQUEST)
            if 'buildinglevel' in request.data and Townhall.objects.get(user=request.user).money < Mine.objects.get(user=request.user).buildinglevel * settings.MINE_BUILDING_COST_MULTIPLIER:
                return Response('Not enough money for level up', status=status.HTTP_400_BAD_REQUEST)
            
            if 'buildinglevel' in request.data and request.data['buildinglevel'] == Mine.objects.get(user=request.user).buildinglevel + 1:
                townhall = Townhall.objects.get(user=request.user)
                townhall.money = townhall.money - Mine.objects.get(user=request.user).buildinglevel * settings.MINE_BUILDING_COST_MULTIPLIER
                townhall.save()
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] != Mine.objects.get(user=request.user).amountDedicatedWorkers:
                freeWorkers = Townhall.objects.get(user=request.user)
                if Mine.objects.get(user=request.user).amountDedicatedWorkers > request.data['amountDedicatedWorkers']:
                    freeWorkers.amountWorkersFree = freeWorkers.amountWorkersFree + Mine.objects.get(user=request.user).amountDedicatedWorkers - request.data['amountDedicatedWorkers']
                else:
                    freeWorkers.amountWorkersFree = freeWorkers.amountWorkersFree - request.data['amountDedicatedWorkers'] - Mine.objects.get(user=request.user).amountDedicatedWorkers
                freeWorkers.save()

            current = Mine.objects.get(user=request.user)
            timedeltaValue = datetime.now(timezone.utc) - current.lastUpdate
            amountCoalToSave = current.amountCoal + int(((timedeltaValue.seconds//60)%60) * (current.buildinglevel * current.amountDedicatedWorkers * settings.MINE_COAL_MULTIPLIER))
            amountIronToSave = current.amountIronOre + int(((timedeltaValue.seconds//60)%60) * (current.buildinglevel * current.amountDedicatedWorkers * settings.MINE_IRON_MULTIPLIER))


            serializer.save()

            current = Mine.objects.get(user=request.user)
            current.amountCoal = amountCoalToSave
            current.amountIronOre = amountIronToSave
            current.lastUpdate = datetime.now(timezone.utc)
            current.save()
            return Response(MineSerializer(current).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def woodcuttersRequests(request):
    """
    GET:
        - Gets all informations about your Woodcutters
    PUT: 
        - amountWood has to be 0
        - amountDedicatedWorkers has to be 0 or above
        - buildinglevel has to be the current level or if you want to levelup: current level + 1
    """
    if request.method == 'GET':
        serializer = WoodcuttersSerializer(Woodcutters.objects.get(user=request.user))
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = WoodcuttersSerializer(Woodcutters.objects.get(user=request.user), data=request.data)
        if serializer.is_valid():
            if 'amountWood' in request.data and request.data['amountWood'] != 0:
                return Response('You cant set amountWood manually', status=status.HTTP_400_BAD_REQUEST)
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] - Woodcutters.objects.get(user=request.user).amountDedicatedWorkers > Townhall.objects.get(user=request.user).amountWorkersFree:
                return Response('Not enough workers available', status=status.HTTP_400_BAD_REQUEST)
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] + Woodcutters.objects.get(user=request.user).amountDedicatedWorkers < 0:
                return Response('Its not possible to go below zero workers', status=status.HTTP_400_BAD_REQUEST)
            if 'buildinglevel' in request.data and not (request.data['buildinglevel'] == Woodcutters.objects.get(user=request.user).buildinglevel + 1 or request.data['buildinglevel'] == Woodcutters.objects.get(user=request.user).buildinglevel):
                return Response('Its not possible to skip levels', status=status.HTTP_400_BAD_REQUEST)
            if 'buildinglevel' in request.data and Townhall.objects.get(user=request.user).money < Woodcutters.objects.get(user=request.user).buildinglevel * settings.WOODCUTTERS_BUILDING_COST_MULTIPLIER:
                return Response('Not enough money for level up', status=status.HTTP_400_BAD_REQUEST)
            
            if 'buildinglevel' in request.data and request.data['buildinglevel'] == Woodcutters.objects.get(user=request.user).buildinglevel + 1:
                townhall = Townhall.objects.get(user=request.user)
                townhall.money = townhall.money - Woodcutters.objects.get(user=request.user).buildinglevel * settings.WOODCUTTERS_BUILDING_COST_MULTIPLIER
                townhall.save()
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] != Woodcutters.objects.get(user=request.user).amountDedicatedWorkers:
                freeWorkers = Townhall.objects.get(user=request.user)
                if Woodcutters.objects.get(user=request.user).amountDedicatedWorkers > request.data['amountDedicatedWorkers']:
                    freeWorkers.amountWorkersFree = freeWorkers.amountWorkersFree + Woodcutters.objects.get(user=request.user).amountDedicatedWorkers - request.data['amountDedicatedWorkers']
                else:
                    freeWorkers.amountWorkersFree = freeWorkers.amountWorkersFree - request.data['amountDedicatedWorkers'] - Woodcutters.objects.get(user=request.user).amountDedicatedWorkers
                freeWorkers.save()

            current = Woodcutters.objects.get(user=request.user)
            timedeltaValue = datetime.now(timezone.utc) - current.lastUpdate
            amountWoodToSave = current.amountWood + int(((timedeltaValue.seconds//60)%60) * (current.buildinglevel * current.amountDedicatedWorkers * settings.WOODCUTTERS_MULTIPLIER))

            serializer.save()

            current = Woodcutters.objects.get(user=request.user)
            current.amountWood = amountWoodToSave
            current.lastUpdate = datetime.now(timezone.utc)
            current.save()
            return Response(WoodcuttersSerializer(current).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
def getBuildingInformation(request):
    serializer = GameSerializer(Player.objects.get(user=request.user))
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