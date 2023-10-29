from django.db import models
import yfinance as yf
from django.db.models import JSONField


"""classe para centralizar os métodos referentes a API"""
class FinanceApi():

    @classmethod
    def get_stock_historical(self, stock, start, end, interval):
        ticker = yf.Ticker(stock)
        stock_historical = ticker.history(start = start, end=end, interval=interval)
        return stock_historical
    
    @classmethod
    def get_stock_current_value(self, stock):
        print(f'{stock=}')
        ticker = yf.Ticker(stock)
        stock_price = ticker.history(period='1d')['Close'].iloc[-1]
        return stock_price


"""model para representar uma ação que será monitorada"""
class Stock(models.Model):
    name = models.CharField(max_length=20, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    min_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    max_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        self.set_price()
        super(Stock, self).save(*args, **kwargs)

    def set_price(self):
        api = FinanceApi
        self.price = api.get_stock_current_value(stock=self.name)

    class Meta:
        app_label = 'stock_tracker_app'


"""model para gerenciar as ações que serão monitoradas"""
class StocksManager(models.Model):
    stock_list = JSONField(default=list, blank=True, null=True)

    def load_stock_list(self):
        stocks = []
        for stock in Stock.objects.all():
            stocks.append(stock)
        self.stock_list = stocks

    