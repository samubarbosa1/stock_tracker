from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from .models import FinanceApi, Stock
from functools import wraps
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from stock_tracker_project.settings import EMAIL_HOST_USER
    
@api_view(['GET'])
def get_stock_historical(request):
    data = request.query_params
    try: 
        api = FinanceApi
        historical = api.get_stock_historical(stock=data.get('stock', None), start=data.get('start', None), end=data.get('end', None), interval=data.get('interval', None))
        json_data = historical.to_json(orient='table')
        parsed_json = json.loads(json_data)
        data_field = parsed_json['data']
        return JsonResponse({'data':data_field}, status=status.HTTP_200_OK)
    except Exception as exp:
        print(exp)
        return JsonResponse({'detail':f'Exceção: {exp}'}, status=status.HTTP_404_NOT_FOUND)
    

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
