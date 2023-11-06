from celery import Celery
from celery.schedules import crontab
import os
from kombu import Queue

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock_tracker_project.settings')

app = Celery("stock_tracker_project", timezone = 'America/Sao_Paulo')
app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.task_queues = (
    Queue('email_tasks', routing_key='email_tasks'),
)

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'add-every-30-seconds': {
        'task': 'stock_tracker_app.tasks.update_values',
        'schedule': crontab(minute='*/3',hour='8-17',day_of_week='1-6'),
    },
}