from django.core.management.base import BaseCommand
from stock_tracker_app.models import Stock, StockPriceThreshold

class Command(BaseCommand):
    help = 'Clear the Stock and StockPriceThreshold tables'

    def handle(self, *args, **kwargs):
        # Clear StockPriceThreshold table
        StockPriceThreshold.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully cleared StockPriceThreshold table'))

        # Clear Stock table
        Stock.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully cleared Stock table'))

        self.stdout.write(self.style.SUCCESS('Finished clearing Stock and StockPriceThreshold tables'))
