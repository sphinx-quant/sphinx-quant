from django.contrib.auth.models import User
from .models import StrategyCode, Backtest, Strategy
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer



class UserSerializer(ModelSerializer):
    """用户Serializer"""

    class Meta:
        model = User
        fields =  [
            "id",
            "last_login",
            "is_superuser",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_staff",
            "is_active",
        ]

class StrategyCodeSerializer(ModelSerializer):
    """策略代码Serializer"""

    class Meta:
        model = StrategyCode
        fields = '__all__'


class BacktestSerializer(ModelSerializer):
    """回测Serializer"""
    strategy_code = StrategyCodeSerializer()

    class Meta:
        model = Backtest
        fields = '__all__'


class StrategySerializer(ModelSerializer):
    """策略Serializer"""
    bt_length = serializers.SerializerMethodField('get_backtest_length')

    def get_backtest_length(self, obj):
        return len(Backtest.objects.filter(strategy=obj.id))

    class Meta:
        model = Strategy
        fields = '__all__'


class StrategyDetailSerializer(ModelSerializer):
    """策略详情Serializer Detail"""

    strategy_code = StrategyCodeSerializer()

    def create(self, validated_data):
        """ 如果数据合法就创建并返回一个Strategy实例 """

        return Strategy.objects.create(
            name=validated_data.get('name'),
            type=validated_data.get('type'),
            description=validated_data.get('description'),
            strategy_code=StrategyCode.objects.create(
                code_text=validated_data.get('strategy_code')['code_text']
                or ''),
        )

    def update(self, instance, validated_data):
        """ 如果数据合法就更新并返回一个存在的Strategy实例 """
        instance.description = validated_data.get('description',
                                                  instance.description)
        instance.name = validated_data.get('name', instance.name)
        instance.type = validated_data.get('type', instance.type)
        instance.save()
        strategy_code = instance.strategy_code
        strategy_code.code_text = validated_data.pop(
            'strategy_code')['code_text']
        strategy_code.save()
        return instance

    class Meta:
        model = Strategy
        fields = '__all__'