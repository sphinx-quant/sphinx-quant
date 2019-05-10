import uuid
from django.db import models
from utils.const import (
    enum_to_choices,
    BacktestStatusType,
    StrategyType,
    BarType,
)

# Create your models here.


class BaseModel(models.Model):
    """通用Model"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]


class SourceCode(BaseModel):
    """策略代码"""

    code_text = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.id)


class Strategy(BaseModel):
    """策略"""

    # foreign
    source_code = models.ForeignKey(SourceCode, on_delete=models.CASCADE)
    # self
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    type = models.CharField(
        max_length=127, choices=enum_to_choices(StrategyType)
    )

    def __str__(self):
        return self.name


class Backtest(BaseModel):
    """"回测"""

    # self
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(
        max_length=127, choices=enum_to_choices(BacktestStatusType)
    )
    bar_type = models.CharField(
        max_length=127, choices=enum_to_choices(BarType)
    )
    logs = models.TextField(blank=True, null=True)
    total_profit_percent = models.FloatField(
        max_length=15, blank=True, null=True
    )
    year_profit_percent = models.FloatField(
        max_length=15, blank=True, null=True
    )
    max_dropdown_percent = models.FloatField(
        max_length=15, blank=True, null=True
    )
    # daily_capital = models.TextField()
    # daily_result = models.TextField()
    # foreign
    strategy = models.ForeignKey(Strategy, on_delete=models.CASCADE)
    source_code = models.ForeignKey(SourceCode, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
