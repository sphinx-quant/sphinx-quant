from datetime import datetime
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
)
from rest_framework.response import Response
from .models import SourceCode, Backtest, Strategy
from .serializers import (
    SourceCodeSerializer,
    BacktestSerializer,
    StrategySerializer,
    StrategyDetailSerializer,
    UserSerializer,
)
from .tasks import add, backtest


class CeleryTestView(APIView):
    """Celery Test"""

    def get(self, request, format=None):
        result = add.delay(1, 2).get()
        return Response({"result": result})


class BacktestView(APIView):
    """异步回测"""

    def get(self, request, id, format=None):
        strategy_id = id
        if strategy_id:
            strategy_obj = Strategy.objects.get(id=strategy_id)
            code_text = strategy_obj.source_code.code_text

            backtest.delay(
                strategy_id=strategy_id,
                code_text=code_text,
                class_name="DoubleMaStrategy",
                vt_symbol="IF88.CFFEX",
                interval="1m",
                start_date=datetime(2016, 1, 1),
                end_date=datetime(2019, 1, 1),
                rate=3.0 / 10000,
                slippage=0.2,
                size=300,
                pricetick=0.2,
                capital=1_000_000,
            )
            return Response({"status": "Process"})
        return Response({"status": "Error"})


class CurrentUserAPIView(APIView):
    """当前登录用户"""

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class StrategyCreateAPIView(CreateAPIView):
    """创建策略"""

    queryset = SourceCode.objects.all()
    serializer_class = StrategyDetailSerializer


class StrategyUpdateAPIView(RetrieveUpdateDestroyAPIView):
    """查询，修改，删除Strategy详情"""

    queryset = Strategy.objects.all()
    serializer_class = StrategyDetailSerializer
    lookup_field = "id"


class BacktestUpdateAPIView(RetrieveUpdateDestroyAPIView):
    """查询，修改，删除Backtest详情"""

    queryset = Backtest.objects.all()
    serializer_class = BacktestSerializer
    lookup_field = "id"


class SourceCodeView(APIView):
    """根据code查询代码"""

    serializer_class = SourceCodeSerializer

    def get_queryset(self):
        id = self.request.id
        return Strategy.objects.filter(source_code=id)


# Create your views here.
class StrategyListView(ListAPIView):
    """ 策略列表 """

    queryset = Strategy.objects.all()
    serializer_class = StrategySerializer


class BacktestListView(ListAPIView):
    """ 回测列表 """

    queryset = Backtest.objects.all()
    serializer_class = BacktestSerializer
