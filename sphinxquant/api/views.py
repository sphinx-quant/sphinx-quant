from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.response import Response
from .models import StrategyCode, Backtest, Strategy
from .serializers import StrategyCodeSerializer, BacktestSerializer, StrategySerializer, StrategyDetailSerializer
from .tasks import add

class CeleryTestView(APIView):
    """Celery Test"""
    def get(self, request, format=None):
        result = add.delay(1, 2).get()
        return Response({ 'result': result })

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
        code_id  = self.request.query_params.get('id', None)
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
