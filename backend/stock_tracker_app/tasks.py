from stock_tracker_project.celery import app
from .models import FinanceApi, Stock
from django.core.mail import send_mail
from stock_tracker_project.settings import EMAIL_RECEIVER
from datetime import datetime
import pytz

@app.task(queue = "email_tasks")
def update_values():
    stocks = Stock.objects.all()
    stocks_to_sell = []
    stocks_to_buy = []
    saopaulo_timezone = pytz.timezone('America/Sao_Paulo')
    current_time = datetime.now(saopaulo_timezone)
    for stock in stocks:
        try:
            time_in_minutes = current_time.hour * 60 + current_time.minute
            if(time_in_minutes % stock.period == 0):
                stock.set_price()
                stock = Stock.objects.get(name = stock.name)
                if stock.min_price > stock.price:
                    stocks_to_buy.append(stock.name)
                if stock.max_price < stock.price:
                    stocks_to_sell.append(stock.name)
        except Exception as exp:
            print(exp)
    if(stocks_to_buy or stocks_to_sell):
        send_email.delay(stocks_to_buy,stocks_to_sell)


@app.task(queue = "email_tasks")
def send_email(stocks_to_buy, stocks_to_sell):
    message = "Olá,\nNós da Stock Tracker percebemos que houveram alterações que podem ser do seu agrado.\n\n"
    if(stocks_to_buy):
        message = message + "Ações cuja compra é recomendada:\n"
        for stock in stocks_to_buy:
            stock_obj = Stock.objects.get(name=stock)
            message = message + f'{stock}  -  R${stock_obj.price}\n'
        message = message + "\n"
    if(stocks_to_sell):
        message = message + "Ações cuja venda é recomendada:\n"
        for stock in stocks_to_sell:
            stock_obj = Stock.objects.get(name=stock)
            message = message + f'{stock}  -  R${stock_obj.price}\n'
    message = message + '\nA Stock Tracker agradece a sua confiança'
    try:
        email = EMAIL_RECEIVER
        name = 'Ações Monitoradas'
        send_mail(
        name, #title
        message, #message
        'settings.EMAIL_HOST_USER', #sender
        [email], #lista de emails
        fail_silently=False)
    except Exception as exp:
        print(exp)
        raise