# Generated by Django 3.1.5 on 2021-02-02 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edu', '0031_auto_20210202_1246'),
    ]

    operations = [
        migrations.AddField(
            model_name='period',
            name='time_end',
            field=models.TimeField(null=True),
        ),
        migrations.AddField(
            model_name='period',
            name='time_start',
            field=models.TimeField(null=True),
        ),
        migrations.AlterField(
            model_name='period',
            name='period',
            field=models.CharField(max_length=8, null=True),
        ),
    ]
