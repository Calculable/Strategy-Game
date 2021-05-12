from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timezone

from django.conf import settings

class Woodcutters(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountWood = models.IntegerField(default=0)
    amountDedicatedWorkers = models.IntegerField(default=0)
    buildinglevel = models.IntegerField(default=1)
    lastUpdate = models.DateTimeField(default=datetime.now(timezone.utc))
    
    def getLevelupCost(self):
        return (self.buildinglevel + 1) * settings.WOODCUTTERS_BUILDING_COST_MULTIPLIER

    def getWoodPrice(self):
        return settings.WOODCUTTERS_WOOD_PRICE
    
    def getWoodPerMinute(self):
        return self.buildinglevel * self.amountDedicatedWorkers * settings.WOODCUTTERS_MULTIPLIER

    def getActualAmountWood(self):
        timedeltaValue = datetime.now(timezone.utc) - self.lastUpdate
        return self.amountWood + int(((timedeltaValue.seconds//60)%60) * self.getWoodPerMinute())

class Mine(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountCoal = models.IntegerField(default=0)
    amountIronOre = models.IntegerField(default=0)
    amountDedicatedWorkers = models.IntegerField(default=0)
    buildinglevel = models.IntegerField(default=1)
    lastUpdate = models.DateTimeField(default=datetime.now(timezone.utc))

    def getLevelupCost(self):
        return (self.buildinglevel + 1) * settings.MINE_BUILDING_COST_MULTIPLIER
    
    def getCoalPrice(self):
        return settings.MINE_COAL_PRICE

    def getIronOrePrice(self):
        return settings.MINE_IRON_PRICE

    def getCoalPerMinute(self):
        return self.buildinglevel * self.amountDedicatedWorkers * settings.MINE_COAL_MULTIPLIER
    
    def getActualAmountCoal(self):
        timedeltaValue = datetime.now(timezone.utc) - self.lastUpdate
        return self.amountCoal + int(((timedeltaValue.seconds//60)%60) * self.getCoalPerMinute())

    def getIronOrePerMinute(self):
        return self.buildinglevel * self.amountDedicatedWorkers * settings.MINE_IRON_MULTIPLIER
    
    def getActualAmountIronOre(self):
        timedeltaValue = datetime.now(timezone.utc) - self.lastUpdate
        return self.amountIronOre + int(((timedeltaValue.seconds//60)%60) * self.getIronOrePerMinute())

class Townhall(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountWorkersFree = models.IntegerField(default=2)
    money = models.IntegerField(default=5)
    buildinglevel = models.IntegerField(default=1)

    def getLevelupCost(self):
        return (self.buildinglevel + 1) * settings.TOWNHALL_BUILDING_COST_MULTIPLIER
    
    def getWorkerCost(self):
        return settings.TOWNHALL_WORKER_PRICE

class ArmyCenter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    amountArchers = models.IntegerField(default=0)
    amountBlockers = models.IntegerField(default=0)
    amountSwordsman = models.IntegerField(default=0)
    buildinglevel = models.IntegerField(default=1)

    def getLevelupCost(self):
        return (self.buildinglevel + 1) * settings.ARMYCENTER_BUILDING_COST_MULTIPLIER

    def getArcherCost(self):
        return settings.ARMYCENTER_ARCHER_COST
    
    def getBlockerCost(self):
        return settings.ARMYCENTER_BLOCKER_COST
    
    def getSwordsmanCost(self):
        return settings.ARMYCENTER_SWORDSMAN_COST

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    woodcutters = models.OneToOneField(Woodcutters, on_delete=models.CASCADE)
    mine = models.OneToOneField(Mine, on_delete=models.CASCADE)
    townhall = models.OneToOneField(Townhall, on_delete=models.CASCADE)
    armyCenter = models.OneToOneField(ArmyCenter, on_delete=models.CASCADE)