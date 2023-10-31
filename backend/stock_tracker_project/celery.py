from celery import Celery
import os
from kombu import Queue

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock_tracker_project.settings')

app = Celery("stock_tracker_project")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.timezone = 'America/Sao_Paulo'
app.conf.task_queues = (
    Queue('email_tasks', routing_key='email_tasks'),
)

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'add-every-30-seconds': {
        'task': 'stock_tracker_app.tasks.update_values',
        'schedule': 30.0,
    },
}