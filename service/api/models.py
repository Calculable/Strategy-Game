from django.db import models

# Create your models here.
class Player(models.Model):
    name = models.CharField(max_length=25, unique=True)
    number_of_gold = models.IntegerField(default=0)

    def __str__(self):
        return self.name