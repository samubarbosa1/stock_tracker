from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock_tracker_project.settings')

app = Celery("stock_tracker_project")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.broker_transport_options = {
    "priority_steps": list(range(10)),
    "sep": ":",
    "queue_order_strategy": "priority",
}
app.autodiscover_tasks()