import jwt
from django.shortcuts import render
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import StrategyCode, Backtest, Strategy
from .serializers import StrategyCodeSerializer, BacktestSerializer, StrategySerializer, StrategyDetailSerializer, UserSerializer
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

        backtest.delay(
            code_text=code_text,
            class_name='AtrRsiStrategy',
            vt_symbol='IF88.CFFEX',
            interval='1m',
            start_date=datetime(2018, 1, 1),
            end_date=datetime(2019, 1, 1),
            rate=3.0 / 10000,
            slippage=0.2,
            size=300,
            pricetick=0.2,
            capital=1_000_000,
        )

        return Response({'status': 'Process'})


class CurrentUserAPIView(APIView):
    """当前登录用户"""

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


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
