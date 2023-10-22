from django.db import models
import yfinance as yf
from django.db.models import JSONField


"""model para centralizar as informação e métodos referentes a API"""
class FinanceApi(models.Model):

    def getStockHistoricalByName(self, stock, start, end, interval):
        ticker = yf.Ticker(stock)
        stock_historical = ticker.history(start = start, end=end, interval=interval)
        return stock_historical

    class Meta:
        app_label = 'stock_tracker_app'

"""model para representar uma ação que será monitorada"""
class Stock(models.Model):
    name = models.CharField(max_length=20, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

"""model para gerenciar as ações que serão monitoradas"""
class StocksManager(models.Model):
    stock_list = JSONField(default=list, blank=True, null=True)

    def load_stock_list(self):
        stocks = []
        for stock in Stock.objects.all():
            stocks.append(stock)
        self.stock_list = stocks

    