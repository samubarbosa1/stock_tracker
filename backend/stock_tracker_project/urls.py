from django.contrib import admin
from django.urls import path
from stock_tracker_app.views import get_stock_historical, register_stock, send_email

urlpatterns = [
    path('admin/', admin.site.urls),
    path('get_stock_historical', get_stock_historical, name='get_stock_historical'),
    path('register_stock',register_stock, name='register_stock'),
    path('send_email', send_email, name='send_email')
]
