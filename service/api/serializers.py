from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Player, Woodcutters, Mine, Townhall, ArmyCenter
from datetime import datetime, timezone
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class WoodcuttersSerializer(serializers.ModelSerializer):
    amountWood = serializers.SerializerMethodField()
    levelUpCost = serializers.SerializerMethodField()
    woodPerMinute = serializers.SerializerMethodField()
    woodSellPrice = serializers.SerializerMethodField()

    def get_amountWood(self, obj):
        return obj.getActualAmountWood()

    def get_levelUpCost(self, obj):
        return obj.getLevelupCost()
    
    def get_woodPerMinute(self, obj):
        return obj.getWoodPerMinute()

    def get_woodSellPrice(self, obj):
        return obj.getWoodPrice()

    class Meta:
        model = Woodcutters
        fields = ('amountWood', 'amountDedicatedWorkers', 'buildinglevel', 'levelUpCost', 'woodPerMinute', 'woodSellPrice')

class MineSerializer(serializers.ModelSerializer):
    amountCoal = serializers.SerializerMethodField()
    amountIronOre = serializers.SerializerMethodField()
    levelUpCost = serializers.SerializerMethodField()
    coalPerMinute = serializers.SerializerMethodField()
    ironOrePerMinute = serializers.SerializerMethodField()
    coalSellPrice = serializers.SerializerMethodField()
    ironOreSellPrice = serializers.SerializerMethodField()

    def get_amountCoal(self, obj):
        return obj.getActualAmountCoal()

    def get_amountIronOre(self, obj):
        return obj.getActualAmountIronOre()

    def get_levelUpCost(self, obj):
        return obj.getLevelupCost()

    def get_coalPerMinute(self, obj):
        return obj.getCoalPerMinute()
    
    def get_ironOrePerMinute(self, obj):
        return obj.getIronOrePerMinute()

    def get_coalSellPrice(self, obj):
        return obj.getCoalPrice()

    def get_ironOreSellPrice(self, obj):
        return obj.getIronOrePrice()

    class Meta:
        model = Mine
        fields = ('amountCoal', 'amountIronOre', 'amountDedicatedWorkers', 'buildinglevel', 'levelUpCost', 'coalPerMinute', 'ironOrePerMinute', 'coalSellPrice', 'ironOreSellPrice')

class TownhallSerializer(serializers.ModelSerializer):
    levelUpCost = serializers.SerializerMethodField()
    workerCost = serializers.SerializerMethodField()

    def get_levelUpCost(self, obj):
        return obj.getLevelupCost()
    
    def get_workerCost(self, obj):
        return obj.getWorkerCost()

    class Meta:
        model = Townhall
        fields = ('amountWorkersFree', 'money', 'buildinglevel', 'levelUpCost', 'workerCost')

class ArmySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArmyCenter
        fields = ('amountArchers', 'archerLevel', 'amountBlockers', 'blockerLevel', 'amountSwordsman', 'swordsmanLevel', 'buildinglevel')

class GameSerializer(serializers.ModelSerializer):
    woodcutters = WoodcuttersSerializer()
    mine = MineSerializer()
    townhall = TownhallSerializer()
    armyCenter = ArmySerializer()

    class Meta:
        model = Player
        fields = ('woodcutters', 'mine', 'townhall', 'armyCenter')

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        wood = Woodcutters.objects.create(user=instance)
        mine = Mine.objects.create(user=instance)
        town = Townhall.objects.create(user=instance)
        army = ArmyCenter.objects.create(user=instance)
        Player.objects.create(user=instance, woodcutters=wood, mine=mine, townhall=town, armyCenter=army)
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')