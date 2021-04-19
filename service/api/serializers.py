from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Player, Woodcutters, Mine, Townhall, ArmyCenter

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class WoodcuttersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Woodcutters
        fields = ('amountWood', 'amountDedicatedWorkers', 'buildinglevel')

class MineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mine
        fields = ('amountCoal', 'amountIronOre', 'amountDedicatedWorkers', 'buildinglevel')

class TownhallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Townhall
        fields = ('amountWorkersOwned', 'money', 'buildinglevel')

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