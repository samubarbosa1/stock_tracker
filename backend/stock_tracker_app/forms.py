from django import forms
from .models import StockPriceThreshold

class StockPriceThresholdForm(forms.ModelForm):
    class Meta:
        model = StockPriceThreshold
        fields = ['stock', 'min_price', 'max_price']
