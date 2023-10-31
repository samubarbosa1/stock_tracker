FROM python:3.11

WORKDIR /app/django


ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt /app/django/requirements.txt
RUN pip install -r requirements.txt

COPY . /app/django/
RUN python manage.py makemigrations
RUN python manage.py migrate

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "--noreload", "0.0.0.0:8000"]