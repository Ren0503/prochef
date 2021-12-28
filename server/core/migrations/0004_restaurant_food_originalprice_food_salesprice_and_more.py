# Generated by Django 4.0 on 2021-12-28 02:54

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('core', '0003_order_iscanceled'),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('openedAt', models.CharField(blank=True, max_length=200, null=True)),
                ('closedAt', models.CharField(blank=True, max_length=200, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='auth.user')),
            ],
        ),
        migrations.AddField(
            model_name='food',
            name='originalPrice',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=7, null=True),
        ),
        migrations.AddField(
            model_name='food',
            name='salesPrice',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=7, null=True),
        ),
        migrations.DeleteModel(
            name='Menu',
        ),
        migrations.AddField(
            model_name='food',
            name='restaurant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.restaurant'),
        ),
    ]