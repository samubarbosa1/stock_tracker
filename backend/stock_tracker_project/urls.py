from django.contrib import admin
from django.urls import path, include
from stock_tracker_app import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('auth.urls')),  # Include your app URLs
    path('get_stock_historical', views.get_stock_historical, name='get_stock_historical'),
    path('register_stock', views.register_stock, name='register_stock'),
    path('send_email', views.send_email, name='send_email'),
    path('get_stock_current_value', views.get_stock_current_value, name='get_stock_current_value'),
    path('get_stocks', views.get_stocks, name='get_stocks'),
    path('delete_stock', views.delete_stock, name='delete_stock'),

]
