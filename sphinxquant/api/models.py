import uuid
from django.db import models

# Create your models here.
STRATEGY_TYPE = (
    ('S', 'Stock'),
    ('F', 'Futures'),
    ('C', 'CryptoCurrency'),
    ('O', 'Other'),
)

BAR_TYPE = (
    ('T', 'Tick'),
    ('M', 'Minute'),
    ('D', 'Day'),
)

BACKTEST_STATUS_TYPE = (
    ('S', 'Start'),
    ('P', 'Process'),
    ('D', 'Done'),
    ('E', 'Error'),
    ('A', 'Abort'),
)


class BaseModel(models.Model):
    """通用Model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ['-created_at']

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
    type = models.CharField(max_length=1, choices=STRATEGY_TYPE)

    def __str__(self):
        return self.name


class Backtest(BaseModel):
    """"回测"""
    # self
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=1, choices=BACKTEST_STATUS_TYPE)
    bar_type = models.CharField(max_length=1, choices=BAR_TYPE)
    total_profit_percent = models.FloatField(max_length=15)
    year_profit_percent = models.FloatField(max_length=15)
    max_dropdown_percent = models.FloatField(max_length=15)
    # daily_capital = models.TextField()
    # daily_result = models.TextField()
    # foreign
    strategy = models.ForeignKey(Strategy, on_delete=models.CASCADE)
    source_code = models.ForeignKey(SourceCode, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
