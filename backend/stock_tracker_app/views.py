from django.http import JsonResponse
from .models import FinanceApi, Stock
from functools import wraps
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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
        return JsonResponse({'resposta':'Ocorreu um erro.'}, status=status.HTTP_404_NOT_FOUND)
    
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
    
@api_view(['POST'])
def register_stock(request):
    data = request.data
    try:
        if(Stock.objects.filter(name=data.get("stock")).exists()):
            stock = Stock.objects.get(name=data.get("stock"))
        else:
            stock = Stock(name=data.get("stock"))
        stock.min_price=data.get("min_price")
        stock.max_price=data.get("max_price")
        stock.save()
    except Exception as exp:
        print(exp)
        return JsonResponse({'detail':f'Exceção: {exp}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'message': f'Ação {data["stock"]} registrada com sucesso.'}, status=status.HTTP_201_CREATED)
