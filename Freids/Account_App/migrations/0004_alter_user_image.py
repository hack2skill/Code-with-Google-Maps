# Generated by Django 4.2.6 on 2023-10-25 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account_App', '0003_remove_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='user_images/'),
        ),
    ]
