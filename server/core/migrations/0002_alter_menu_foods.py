# Generated by Django 4.0 on 2021-12-25 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='foods',
            field=models.ManyToManyField(blank=True, to='core.Food'),
        ),
    ]
