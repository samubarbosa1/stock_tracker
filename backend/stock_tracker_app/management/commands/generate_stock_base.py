import csv
from django.core.management.base import BaseCommand
from stock_tracker_app.models import Stock

class Command(BaseCommand):
    help = 'Populate the Stock model with B3 stock tickers'

    def handle(self, *args, **kwargs):
        csv_file_path = 'acoes-listadas-b3.csv'  # Update this path

        with open(csv_file_path, mode='r') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                ticker = row['Ticker'] + '.SA'
                if not Stock.objects.filter(name=ticker).exists():
                    Stock.objects.create(name=ticker, price=0, min_price=0, max_price=0)
                    self.stdout.write(self.style.SUCCESS(f'Successfully added stock {ticker}'))
                else:
                    self.stdout.write(self.style.WARNING(f'Stock {ticker} already exists'))

        self.stdout.write(self.style.SUCCESS('Finished populating B3 stocks'))
