# Generated by Django 3.1.5 on 2021-02-04 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edu', '0033_auto_20210203_1934'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='section',
            field=models.CharField(max_length=4, null=True),
        ),
    ]
