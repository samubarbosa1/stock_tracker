from django.http import JsonResponse
from .models import FinanceApi
import json

def get_stock_historical(request):
    data = request.GET
    try: 
        api = FinanceApi
        historical = api.getStockHistoricalByName(data.get('stock', None), data.get('start', None), data.get('end', None), data.get('interval', None))
        json_data = historical.to_json(orient='table')
        parsed_json = json.loads(json_data)
        data_field = parsed_json['data']
        return JsonResponse({'data':data_field}, status=200)
    except Exception as exp:
        print(exp)
        return JsonResponse({'resposta':'Ocorreu um erro'}, status=404)
