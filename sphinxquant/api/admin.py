from django.contrib import admin

# Register your models here.
from .models import Strategy, Backtest, StrategyCode


class StrategyAdmin(admin.ModelAdmin):
    pass


class BacktestAdmin(admin.ModelAdmin):
    pass


class StrategyCodeAdmin(admin.ModelAdmin):
    pass


admin.site.register(Strategy, StrategyAdmin)
admin.site.register(Backtest, BacktestAdmin)
admin.site.register(StrategyCode, StrategyCodeAdmin)