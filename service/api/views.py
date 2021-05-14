from django.shortcuts import render
from rest_framework import generics
from .models import Woodcutters, Mine, Townhall, ArmyCenter, Player
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, GameSerializer, WoodcuttersSerializer, MineSerializer, TownhallSerializer, ArmySerializer
from datetime import datetime, timezone

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
        currentMine = Mine.objects.get(user=request.user)
        currentTownhall = Townhall.objects.get(user=request.user)

        serializer = MineSerializer(currentMine, data=request.data)
        if serializer.is_valid():
            if 'amountCoal' in request.data and request.data['amountCoal'] != 0:
                return Response('You cant set amountCoal manually', status=status.HTTP_400_BAD_REQUEST)
            if 'amountIronOre' in request.data and request.data['amountIronOre'] != 0:
                return Response('You cant set amountIronOre manually', status=status.HTTP_400_BAD_REQUEST)
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] - currentMine.amountDedicatedWorkers > currentTownhall.amountWorkersFree:
                return Response('Not enough workers available', status=status.HTTP_400_BAD_REQUEST)
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] + currentMine.amountDedicatedWorkers < 0:
                return Response('Its not possible to go below zero workers', status=status.HTTP_400_BAD_REQUEST)
            if 'buildinglevel' in request.data and not (request.data['buildinglevel'] == currentMine.buildinglevel + 1 or request.data['buildinglevel'] == currentMine.buildinglevel):
                return Response('Its not possible to skip levels', status=status.HTTP_400_BAD_REQUEST)
            if 'buildinglevel' in request.data and request.data['buildinglevel'] == currentMine.buildinglevel + 1 and currentTownhall.money < currentMine.getLevelupCost():
                return Response('Not enough money for level up', status=status.HTTP_400_BAD_REQUEST)
            
            if 'buildinglevel' in request.data and request.data['buildinglevel'] == currentMine.buildinglevel + 1:
                currentTownhall.money = currentTownhall.money - currentMine.getLevelupCost()
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] != currentMine.amountDedicatedWorkers:
                if currentMine.amountDedicatedWorkers > request.data['amountDedicatedWorkers']:
                    currentTownhall.amountWorkersFree = currentTownhall.amountWorkersFree + currentMine.amountDedicatedWorkers - request.data['amountDedicatedWorkers']
                else:
                    currentTownhall.amountWorkersFree = currentTownhall.amountWorkersFree - request.data['amountDedicatedWorkers'] - currentMine.amountDedicatedWorkers
            
            currentTownhall.save()

            currentMine.amountCoal = currentMine.getActualAmountCoal()
            currentMine.amountIronOre = currentMine.getActualAmountIronOre()
            currentMine.lastUpdate = datetime.now(timezone.utc)

            currentMine.save()
            serializer.save()
            return Response(MineSerializer(Mine.objects.get(user=request.user)).data)
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
        currentWootcutter = Woodcutters.objects.get(user=request.user)
        currentTownhall = Townhall.objects.get(user=request.user)

        serializer = WoodcuttersSerializer(currentWootcutter, data=request.data)
        if serializer.is_valid():
            if 'amountWood' in request.data and request.data['amountWood'] != 0:
                return Response('You cant set amountWood manually', status=status.HTTP_400_BAD_REQUEST)
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] - currentWootcutter.amountDedicatedWorkers > currentTownhall.amountWorkersFree:
                return Response('Not enough workers available', status=status.HTTP_400_BAD_REQUEST)
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] + currentWootcutter.amountDedicatedWorkers < 0:
                return Response('Its not possible to go below zero workers', status=status.HTTP_400_BAD_REQUEST)
            if 'buildinglevel' in request.data and not (request.data['buildinglevel'] == currentWootcutter.buildinglevel + 1 or request.data['buildinglevel'] == currentWootcutter.buildinglevel):
                return Response('Its not possible to skip levels', status=status.HTTP_400_BAD_REQUEST)
            if 'buildinglevel' in request.data and request.data['buildinglevel'] == currentWootcutter.buildinglevel + 1 and currentTownhall.money < currentWootcutter.getLevelupCost():
                return Response('Not enough money for level up', status=status.HTTP_400_BAD_REQUEST)
            
            if 'buildinglevel' in request.data and request.data['buildinglevel'] == currentWootcutter.buildinglevel + 1:
                currentTownhall.money = currentTownhall.money - currentWootcutter.getLevelupCost()
            if 'amountDedicatedWorkers' in request.data and request.data['amountDedicatedWorkers'] != currentWootcutter.amountDedicatedWorkers:
                if currentWootcutter.amountDedicatedWorkers > request.data['amountDedicatedWorkers']:
                    currentTownhall.amountWorkersFree = currentTownhall.amountWorkersFree + currentWootcutter.amountDedicatedWorkers - request.data['amountDedicatedWorkers']
                else:
                    currentTownhall.amountWorkersFree = currentTownhall.amountWorkersFree - request.data['amountDedicatedWorkers'] - currentWootcutter.amountDedicatedWorkers
            
            currentTownhall.save()

            currentWootcutter.amountWood = currentWootcutter.getActualAmountWood()
            currentWootcutter.lastUpdate = datetime.now(timezone.utc)

            currentWootcutter.save()
            serializer.save()
            return Response(WoodcuttersSerializer(Woodcutters.objects.get(user=request.user)).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def townhallRequests(request):
    """
    GET:
        - Gets all informations about your Townhall.
    
    PUT:
        - amountWoodToSell (gives 1 gold per wood)
        - amountCoalToSell (gives 1 gold per coal)
        - amountIronOreToSell (gives 2 gold per iron Ore)
        - amountWorkersToBuy (cost: 100 gold per worker)
        - buildinglevel has to be the current level or if you want to levelup: current level + 1
    """
    if request.method == 'GET':
        serializer = TownhallSerializer(Townhall.objects.get(user=request.user))
        return Response(serializer.data)

    if request.method == 'PUT':
        currentTownhall = Townhall.objects.get(user=request.user)
        serializer = TownhallSerializer(currentTownhall, data=request.data)
        if serializer.is_valid():
            currentWoodcutters = Woodcutters.objects.get(user=request.user)
            currentMine = Mine.objects.get(user=request.user)

            totalAmountWood = currentWoodcutters.getActualAmountWood()
            totalAmountCoal = currentMine.getActualAmountCoal()
            totalAmountIronOre= currentMine.getActualAmountIronOre()

            if 'amountWoodToSell' in request.data and request.data['amountWoodToSell'] < 0:
                return Response('amountWoodToSell cant be below 0', status=status.HTTP_400_BAD_REQUEST)
            elif('amountWoodToSell' in request.data  and request.data['amountWoodToSell'] > totalAmountWood):
                return Response('You cant sell wood you dont have.', status=status.HTTP_400_BAD_REQUEST)
            elif('amountWoodToSell' in request.data):
                currentWoodcutters.amountWood = totalAmountWood - request.data['amountWoodToSell']
                currentWoodcutters.lastUpdate = datetime.now(timezone.utc)
                currentTownhall.money = currentTownhall.money + request.data['amountWoodToSell'] * currentWoodcutters.getWoodPrice()
            
            if 'amountCoalToSell' in request.data and request.data['amountCoalToSell'] < 0:
                return Response('amountCoalToSell cant be below 0', status=status.HTTP_400_BAD_REQUEST)
            elif('amountCoalToSell' in request.data  and request.data['amountCoalToSell'] > totalAmountCoal):
                return Response('You cant sell coal you dont have.', status=status.HTTP_400_BAD_REQUEST)
            elif('amountCoalToSell' in request.data):
                currentMine.amountCoal = totalAmountCoal - request.data['amountCoalToSell']
                currentMine.lastUpdate = datetime.now(timezone.utc)
                currentTownhall.money = currentTownhall.money + request.data['amountCoalToSell'] * currentMine.getCoalPrice()

            if 'amountIronOreToSell' in request.data and request.data['amountIronOreToSell'] < 0:
                return Response('amountIronOreToSell cant be below 0', status=status.HTTP_400_BAD_REQUEST)
            elif('amountIronOreToSell' in request.data  and request.data['amountIronOreToSell'] > totalAmountIronOre):
                return Response('You cant sell iron ore you dont have.', status=status.HTTP_400_BAD_REQUEST)
            elif('amountIronOreToSell' in request.data):
                currentMine.amountIronOre = totalAmountIronOre - request.data['amountIronOreToSell']
                currentMine.lastUpdate = datetime.now(timezone.utc)
                currentTownhall.money = currentTownhall.money + request.data['amountIronOreToSell'] * currentMine.getIronOrePrice()

            if 'buildinglevel' in request.data and not (request.data['buildinglevel'] == currentTownhall.buildinglevel + 1 or request.data['buildinglevel'] == currentTownhall.buildinglevel):
                return Response('Its not possible to skip levels', status=status.HTTP_400_BAD_REQUEST)
            elif 'buildinglevel' in request.data and request.data['buildinglevel'] == currentTownhall.buildinglevel + 1 and currentTownhall.money < currentTownhall.getLevelupCost():
                return Response('Not enough money for level up', status=status.HTTP_400_BAD_REQUEST)
            elif 'buildinglevel' in request.data and request.data['buildinglevel'] == currentTownhall.buildinglevel + 1:
                currentTownhall.money = currentTownhall.money - currentTownhall.getLevelupCost()
                currentTownhall.buildinglevel = currentTownhall.buildinglevel + 1
            
            if 'amountWorkersToBuy' in request.data and request.data['amountWorkersToBuy'] < 0:
                return Response('You cant sell workers', status=status.HTTP_400_BAD_REQUEST)
            elif 'amountWorkersToBuy' in request.data and request.data['amountWorkersToBuy'] * currentTownhall.getWorkerCost() > currentTownhall.money:
                return Response('Youre too poor to buy such many workers - so much bad for you', status=status.HTTP_400_BAD_REQUEST)
            elif 'amountWorkersToBuy' in request.data:
                currentTownhall.money = currentTownhall.money - request.data['amountWorkersToBuy'] * currentTownhall.getWorkerCost()
                currentTownhall.amountWorkersFree = currentTownhall.amountWorkersFree + request.data['amountWorkersToBuy']

            currentWoodcutters.save()
            currentMine.save()
            currentTownhall.save()
            return Response(TownhallSerializer(Townhall.objects.get(user=request.user)).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def armyCenterRequests(request):
    """
    GET:
        - Gets all informations about your ArmyCenter.
    
    PUT:
        - amountArchersToBuy
        - amountBlockersToBuy
        - amountSwordsmanToBuy
        - buildinglevel has to be the current level or if you want to levelup: current level + 1
    """
    if request.method == 'GET':
        serializer = ArmySerializer(ArmyCenter.objects.get(user=request.user))
        return Response(serializer.data)

    if request.method == 'PUT':
        currentArmyCenter = ArmyCenter.objects.get(user=request.user)
        serializer = ArmySerializer(currentArmyCenter, data=request.data)
        if serializer.is_valid():
            currentTownhall = Townhall.objects.get(user=request.user)

            if 'amountArchersToBuy' in request.data and request.data['amountArchersToBuy'] < 0:
                return Response('amountArchersToBuy cant be below 0', status=status.HTTP_400_BAD_REQUEST)
            elif 'amountArchersToBuy' in request.data  and request.data['amountArchersToBuy'] * currentArmyCenter.getArcherCost() > currentTownhall.money:
                return Response('Youre too poor to buy so many archers', status=status.HTTP_400_BAD_REQUEST)
            elif 'amountArchersToBuy' in request.data:
                currentArmyCenter.amountArchers = currentArmyCenter.amountArchers + request.data['amountArchersToBuy']
                currentTownhall.money = currentTownhall.money - request.data['amountArchersToBuy'] * currentArmyCenter.getArcherCost()

            if 'amountBlockersToBuy' in request.data and request.data['amountBlockersToBuy'] < 0:
                return Response('amountBlockersToBuy cant be below 0', status=status.HTTP_400_BAD_REQUEST)
            elif 'amountBlockersToBuy' in request.data  and request.data['amountBlockersToBuy'] * currentArmyCenter.getBlockerCost() > currentTownhall.money:
                return Response('Youre too poor to buy so many blockers', status=status.HTTP_400_BAD_REQUEST)
            elif 'amountBlockersToBuy' in request.data:
                currentArmyCenter.amountBlockers = currentArmyCenter.amountBlockers + request.data['amountBlockersToBuy']
                currentTownhall.money = currentTownhall.money - request.data['amountBlockersToBuy'] * currentArmyCenter.getBlockerCost()

            if 'amountSwordsmanToBuy' in request.data and request.data['amountSwordsmanToBuy'] < 0:
                return Response('amountSwordsmanToBuy cant be below 0', status=status.HTTP_400_BAD_REQUEST)
            elif 'amountSwordsmanToBuy' in request.data  and request.data['amountSwordsmanToBuy'] * currentArmyCenter.getSwordsmanCost() > currentTownhall.money:
                return Response('Youre too poor to buy so many swordsman', status=status.HTTP_400_BAD_REQUEST)
            elif 'amountSwordsmanToBuy' in request.data:
                currentArmyCenter.amountSwordsman = currentArmyCenter.amountSwordsman + request.data['amountSwordsmanToBuy']
                currentTownhall.money = currentTownhall.money - request.data['amountSwordsmanToBuy'] * currentArmyCenter.getSwordsmanCost()

            if 'buildinglevel' in request.data and not (request.data['buildinglevel'] == currentArmyCenter.buildinglevel + 1 or request.data['buildinglevel'] == currentArmyCenter.buildinglevel):
                return Response('Its not possible to skip levels', status=status.HTTP_400_BAD_REQUEST)
            elif 'buildinglevel' in request.data and request.data['buildinglevel'] == currentArmyCenter.buildinglevel + 1 and currentTownhall.money < currentArmyCenter.getLevelupCost():
                return Response('Not enough money for level up', status=status.HTTP_400_BAD_REQUEST)
            elif 'buildinglevel' in request.data and request.data['buildinglevel'] == currentArmyCenter.buildinglevel + 1:
                currentTownhall.money = currentTownhall.money - currentArmyCenter.getLevelupCost()
                currentArmyCenter.buildinglevel = currentArmyCenter.buildinglevel + 1

            currentTownhall.save()
            currentArmyCenter.save()
            return Response(ArmySerializer(ArmyCenter.objects.get(user=request.user)).data)
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