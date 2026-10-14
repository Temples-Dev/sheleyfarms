"""Investment admin: commitment oversight screens."""

from django.contrib import admin

from .models import Investment


@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "farm", "amount", "status", "invested_at")
    list_filter = ("status",)
    search_fields = ("user__username", "user__email", "farm__name")
    readonly_fields = ("invested_at",)
