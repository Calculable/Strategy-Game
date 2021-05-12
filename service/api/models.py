from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timezone

class Woodcutters(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountWood = models.IntegerField(default=0)
    amountDedicatedWorkers = models.IntegerField(default=0)
    buildinglevel = models.IntegerField(default=1)
    lastUpdate = models.DateTimeField(default=datetime.now(timezone.utc))

class Mine(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountCoal = models.IntegerField(default=0)
    amountIronOre = models.IntegerField(default=0)
    amountDedicatedWorkers = models.IntegerField(default=0)
    buildinglevel = models.IntegerField(default=1)
    lastUpdate = models.DateTimeField(default=datetime.now(timezone.utc))

class Townhall(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountWorkersFree = models.IntegerField(default=2)
    money = models.IntegerField(default=100)
    buildinglevel = models.IntegerField(default=1)
    lastUpdate = models.DateTimeField(default=datetime.now(timezone.utc))

class ArmyCenter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountArchers = models.IntegerField(default=0)
    archerLevel = models.IntegerField(default=1)
    amountBlockers = models.IntegerField(default=0)
    blockerLevel = models.IntegerField(default=1)
    amountSwordsman = models.IntegerField(default=0)
    swordsmanLevel = models.IntegerField(default=1)
    buildinglevel = models.IntegerField(default=1)
    lastUpdate = models.DateTimeField(default=datetime.now(timezone.utc))

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    woodcutters = models.OneToOneField(Woodcutters, on_delete=models.CASCADE)
    mine = models.OneToOneField(Mine, on_delete=models.CASCADE)
    townhall = models.OneToOneField(Townhall, on_delete=models.CASCADE)
    armyCenter = models.OneToOneField(ArmyCenter, on_delete=models.CASCADE)