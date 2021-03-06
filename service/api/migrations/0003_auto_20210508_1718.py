# Generated by Django 3.1.7 on 2021-05-08 15:18

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210506_0002'),
    ]

    operations = [
        migrations.RenameField(
            model_name='townhall',
            old_name='amountWorkersOwned',
            new_name='amountWorkersFree',
        ),
        migrations.AlterField(
            model_name='armycenter',
            name='lastUpdate',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 8, 15, 18, 23, 186979, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='mine',
            name='lastUpdate',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 8, 15, 18, 23, 184984, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='townhall',
            name='lastUpdate',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 8, 15, 18, 23, 185981, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='woodcutters',
            name='lastUpdate',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 8, 15, 18, 23, 183988, tzinfo=utc)),
        ),
    ]
