"""Celery application. Task modules land here as features deliver them."""

import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")

app = Celery("sheleyfarms")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
