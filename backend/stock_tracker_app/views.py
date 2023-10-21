from django.http import JsonResponse
from .models import FinanceApi
import json

def get_stock_historical(request):
    data = request.GET
    try: 
        api = FinanceApi
        historical = api.getStockHistoricalByName(data.get('stock', None), data.get('start', None), data.get('end', None), data.get('interval', None))
        print(historical.get('Open')[0])
        return JsonResponse({'resposta':'deu bom mlk'}, status=200)
    except Exception as exp:
        print(exp)
        return JsonResponse({'resposta':'deu ruim otário'}, status=404)
