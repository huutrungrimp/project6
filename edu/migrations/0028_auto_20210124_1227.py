# Generated by Django 3.1.2 on 2021-01-24 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edu', '0027_auto_20210124_1221'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='periods',
        ),
        migrations.AddField(
            model_name='day',
            name='periods',
            field=models.ManyToManyField(null=True, to='edu.Period'),
        ),
        migrations.AlterField(
            model_name='period',
            name='period',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
