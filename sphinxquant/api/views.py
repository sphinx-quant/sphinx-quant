from django.shortcuts import render
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.response import Response
from .models import StrategyCode, Backtest, Strategy
from .serializers import StrategyCodeSerializer, BacktestSerializer, StrategySerializer, StrategyDetailSerializer
from .tasks import add, backtest


class CeleryTestView(APIView):
    """Celery Test"""

    def get(self, request, format=None):
        result = add.delay(1, 2).get()
        return Response({'result': result})


class BacktestView(APIView):
    """Celery Test"""

    def get(self, request, format=None):
        strategy_id = self.request.query_params.get('id', None)
        strategy_obj = Strategy.objects.get(id=strategy_id)
        code_text = strategy_obj.strategy_code.code_text
        # print('code_text', code_text)
        # backtest.delay(code_text, 'AtrRsiStrategy')
        backtest.delay(code_text, 'AtrRsiStrategy', 'IF88.CFFEX', '1m',
                       datetime(2018, 1, 1), datetime(2019, 1, 1), 3.0 / 10000,
                       0.2, 300, 0.2, 1_000_000)
        return Response({'result': ''})


class StrategyCreateAPIView(CreateAPIView):
    """创建策略"""
    queryset = StrategyCode.objects.all()
    serializer_class = StrategyDetailSerializer


class StrategyUpdateAPIView(RetrieveUpdateDestroyAPIView):
    """查询，修改，删除Strategy详情"""
    queryset = Strategy.objects.all()
    serializer_class = StrategyDetailSerializer
    lookup_field = 'id'


class StrategyCodeView(APIView):
    """根据code查询代码"""

    def get(self, request, format=None):
        code_id = self.request.query_params.get('id', None)
        code = StrategyCode.objects.get(id=code_id)
        serializer = StrategyCodeSerializer(code)
        return Response(serializer.data)


# Create your views here.
class StrategyListView(ListAPIView):
    """ 策略列表 """
    queryset = Strategy.objects.all()
    serializer_class = StrategySerializer


class BacktestListView(ListAPIView):
    """ 回测列表 """
    queryset = Backtest.objects.all()
    serializer_class = BacktestSerializer
