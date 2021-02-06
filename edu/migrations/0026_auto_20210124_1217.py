# Generated by Django 3.1.2 on 2021-01-24 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edu', '0025_auto_20210124_1155'),
    ]

    operations = [
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('days', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Period',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('periods', models.CharField(max_length=10)),
            ],
        ),
        migrations.RemoveField(
            model_name='course',
            name='day',
        ),
        migrations.RemoveField(
            model_name='course',
            name='period',
        ),
        migrations.AddField(
            model_name='course',
            name='days',
            field=models.ManyToManyField(to='edu.Day'),
        ),
        migrations.AddField(
            model_name='course',
            name='periods',
            field=models.ManyToManyField(to='edu.Period'),
        ),
    ]
