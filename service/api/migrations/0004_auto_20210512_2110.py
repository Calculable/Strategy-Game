# Generated by Django 3.1.7 on 2021-05-12 19:10

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210508_1718'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='townhall',
            name='lastUpdate',
        ),
        migrations.AlterField(
            model_name='armycenter',
            name='lastUpdate',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 12, 19, 9, 56, 772005, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='mine',
            name='lastUpdate',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 12, 19, 9, 56, 769014, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='woodcutters',
            name='lastUpdate',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 12, 19, 9, 56, 768016, tzinfo=utc)),
        ),
    ]
