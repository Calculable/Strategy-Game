from django.db import models
from django.contrib.auth.models import User

class Woodcutters(models.Model):
    player = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountWood = models.IntegerField(default=0)
    amountDedicatedWorkers = models.IntegerField(default=0)
    buildinglevel = models.IntegerField(default=0)

class Mine(models.Model):
    player = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountCoal = models.IntegerField(default=0)
    amountIronOre = models.IntegerField(default=0)
    amountDedicatedWorkers = models.IntegerField(default=0)
    buildinglevel = models.IntegerField(default=0)

class Townhall(models.Model):
    player = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountWorkersOwned = models.IntegerField(default=0)
    money = models.IntegerField(default=0)
    buildinglevel = models.IntegerField(default=0)

class ArmyCenter(models.Model):
    player = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountArchersLevel1 = models.IntegerField(default=0)
    amountArchersLevel2 = models.IntegerField(default=0)
    amountArchersLevel3 = models.IntegerField(default=0)
    archerLevel = models.IntegerField(default=0)
    amountBlockersLevel1 = models.IntegerField(default=0)
    amountBlockersLevel2 = models.IntegerField(default=0)
    amountBlockersLevel3 = models.IntegerField(default=0)
    blockerLevel = models.IntegerField(default=0)
    amountSwordsmanLevel1 = models.IntegerField(default=0)
    amountSwordsmanLevel2 = models.IntegerField(default=0)
    amountSwordsmanLevel3 = models.IntegerField(default=0)
    swordsmanLevel = models.IntegerField(default=0)
    buildinglevel = models.IntegerField(default=0)