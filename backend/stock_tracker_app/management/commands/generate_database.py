from django.core.management.base import BaseCommand
from stock_tracker_app.models import Stock, StockPriceThreshold, FinanceApi
import random
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Generate sample StockPriceThreshold data since the beginning of the year'

    def handle(self, *args, **kwargs):
        stocks = Stock.objects.all()
        start_date = datetime(datetime.now().year, 1, 1)
        end_date = datetime.now()
        api = FinanceApi()

        for stock in stocks:
            current_date = start_date
            while current_date <= end_date:
                # Fetch the historical price for the current date
                historical_data = api.get_stock_historical(stock.name, '1d')
                if historical_data.empty:
                    current_date += timedelta(days=7)
                    continue

                stock_price = historical_data['Close'].iloc[-1]
                min_price = round(stock_price * random.uniform(0.95, 1.01), 2)
                max_price = round(min_price * random.uniform(1.01, 1.05), 2)

                StockPriceThreshold.objects.create(
                    stock=stock,
                    min_price=min_price,
                    max_price=max_price,
                    date_set=current_date
                )
                print(stock.name, min_price, max_price, current_date)

                # Increment current_date by 7 days
                current_date += timedelta(days=7)

        self.stdout.write(self.style.SUCCESS('Successfully generated stock price thresholds'))
