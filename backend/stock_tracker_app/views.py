from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import FinanceApi, Stock, StockPriceThreshold
from functools import wraps
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from stock_tracker_project.settings import EMAIL_HOST_USER
from datetime import datetime
    
@api_view(['GET'])
def get_stock_historical(request):
    data = request.GET
    try: 
        api = FinanceApi
        stock_name = data.get('stock')
        period = data.get('period')

        historical = api.get_stock_historical(stock=stock_name, period=period)
        historical_dates = historical.index.strftime('%Y-%m-%d').tolist()
        historical_prices = historical['Close'].tolist()

        stock = get_object_or_404(Stock, name=stock_name)
        thresholds = StockPriceThreshold.objects.filter(stock=stock).order_by('date_set')

        min_values,max_values = calculate_threshold_list(thresholds, historical_dates)

        below_min_count = sum(price < min_val for price, min_val in zip(historical_prices, min_values))
        above_max_count = sum(price > max_val for price, max_val in zip(historical_prices, max_values))

        data = {
            "dates": historical_dates,
            "prices": historical_prices,
            "min_values": min_values,
            "max_values": max_values,
            "below_min_count": below_min_count,
            "above_max_count": above_max_count
        }

        return JsonResponse(data)
    except Exception as exp:
        print(exp)
        return Response({'detail':f'Exceção: {exp}'}, status=status.HTTP_404_NOT_FOUND)
    

def calculate_threshold_list(thresholds, historical_dates):
    list_size = len(historical_dates)
    thresholds_size = len(thresholds)

    min_values = [None] * list_size
    max_values = [None] * list_size

    thresholds_dates = [threshold.date_set.strftime('%Y-%m-%d') for threshold in thresholds]

    is_min_date = False
    j = 0

    for i, date in enumerate(historical_dates):
        while j < thresholds_size:
            if(date >= thresholds_dates[j]):
                if(not is_min_date):
                    is_min_date = True
                    if(j>0):
                        for k in range (0, i):
                            min_values[k] = thresholds[j-1].min_price
                            max_values[k] = thresholds[j-1].max_price
                min_values[i] = thresholds[j].min_price
                max_values[i] = thresholds[j].max_price
                j = j+1
                break
            else:
                if(is_min_date):
                    min_values[i] = thresholds[j].min_price
                    max_values[i] = thresholds[j].max_price
                    break

    return min_values, max_values

@api_view(['GET'])
def get_stock_current_value(request):
    data = request.query_params
    try:
        api = FinanceApi
        current_value = api.get_stock_current_value(data.get('stock'))
        return JsonResponse({'data': {'value':current_value}}, status=status.HTTP_200_OK)
    except Exception as exp:
        print(exp)
        return JsonResponse({'detail':f'Exceção: {exp}'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def get_stocks(request):
    try:
        stocks = Stock.objects.all()
        data = {
        'stocks': list(stocks.values())
        }
        return JsonResponse(data, status=status.HTTP_200_OK)
    except Exception as exp:
        print(exp)
        return JsonResponse({'detail':f'Exceção: {exp}'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def register_stock(request):
    data = request.data
    try:
        price = FinanceApi.get_stock_current_value(data.get("stock"))
        if(Stock.objects.filter(name=data.get("stock")).exists()):
            stock = Stock.objects.get(name=data.get("stock"))
        else:
            stock = Stock(name=data.get("stock"))
        stock.min_price=data.get("min_price")
        stock.max_price=data.get("max_price")
        stock.period=data.get("period")
        stock.price = price
        stock.save()
        stock_threshold = StockPriceThreshold(stock = stock)
        stock_threshold.min_price = stock.min_price
        stock_threshold.max_price = stock.max_price
        stock_threshold.date_set = datetime.now()
        stock_threshold.save()

    except Exception as exp:
        print(exp)
        return JsonResponse({'detail':f'Exceção: {exp}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return JsonResponse({'message': f'Ação {data["stock"]} registrada com sucesso.'}, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def delete_stock(request):
    data = request.data
    print(data)
    try:
        stock_name = data.get('stock')
        print(stock_name)
        stock = Stock.objects.get(name=stock_name)
        stock.delete()
        return Response({'message': f'Stock com nome {stock_name} deletado com sucesso'}, status=status.HTTP_200_OK)
    except Stock.DoesNotExist:
        return Response({'detail': f'Stock com nome {stock_name} não foi encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def send_email(request):
    data = request.data
    print(EMAIL_HOST_USER)
    try:
        message = data.get('message')
        email = data.get('email')
        name = data.get('name')
        send_mail(
        name, #title
        message, #message
        'settings.EMAIL_HOST_USER', #sender
        [email], #lista de emails
        fail_silently=False)
    except Exception as exp:
        print(exp)
        return JsonResponse({'detail':f'Exceção: {exp}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return JsonResponse({'message': 'email enviado'}, status=status.HTTP_200_OK)
