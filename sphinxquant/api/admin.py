from django.contrib import admin

# Register your models here.
from .models import Strategy, Backtest, SourceCode


class StrategyAdmin(admin.ModelAdmin):
    pass


class BacktestAdmin(admin.ModelAdmin):
    pass


class SourceCodeAdmin(admin.ModelAdmin):
    pass


admin.site.register(Strategy, StrategyAdmin)
admin.site.register(Backtest, BacktestAdmin)
admin.site.register(SourceCode, SourceCodeAdmin)
