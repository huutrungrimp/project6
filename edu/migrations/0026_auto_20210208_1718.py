# Generated by Django 3.1.6 on 2021-02-08 22:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('edu', '0025_auto_20210124_1155'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='day',
        ),
        migrations.RemoveField(
            model_name='course',
            name='period',
        ),
    ]
