# Generated by Django 4.2.6 on 2023-11-06 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock_tracker_app', '0002_delete_financeapi_stock_max_price_stock_min_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock',
            name='period',
            field=models.DecimalField(decimal_places=0, default=30, max_digits=10),
        ),
    ]
