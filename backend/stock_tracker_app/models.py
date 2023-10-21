from django.db import models
import yfinance as yf


"""model para centralizar as informação e métodos referentes a API"""
class FinanceApi(models.Model):

    def getStockHistoricalByName(stock, start, end, interval):
        ticker = yf.Ticker(stock)
        stock_historical = ticker.history(start = start, end=end, interval=interval)
        return stock_historical

    class Meta:
        app_label = 'stock_tracker_app'

"""model para gerenciar as ações que serão monitoradas"""
class StocksManager(models.Model):
    pass

"""model para representar uma ação que será monitorada"""
class Stock(models.Model):
    pass