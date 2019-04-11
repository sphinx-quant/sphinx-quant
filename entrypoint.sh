#!/bin/bash

python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
python manage.py runserver 8080
