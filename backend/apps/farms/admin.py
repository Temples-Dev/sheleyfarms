"""Farm admin: catalogue maintenance screens."""

from django.contrib import admin

from .models import Farm


@admin.register(Farm)
class FarmAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "farm_type", "status")
    list_filter = ("status", "farm_type")
    search_fields = ("name", "slug", "location")
    prepopulated_fields = {"slug": ("name",)}
