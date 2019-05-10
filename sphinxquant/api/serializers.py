from django.contrib.auth.models import User
from .models import SourceCode, Backtest, Strategy
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    """用户Serializer"""

    class Meta:
        model = User
        fields = [
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


class SourceCodeSerializer(ModelSerializer):
    """策略代码Serializer"""

    class Meta:
        model = SourceCode
        fields = "__all__"


class BacktestSerializer(ModelSerializer):
    """回测Serializer"""

    source_code = SourceCodeSerializer()

    class Meta:
        model = Backtest
        fields = "__all__"


class StrategySerializer(ModelSerializer):
    """策略Serializer"""

    bt_length = serializers.SerializerMethodField("get_backtest_length")

    def get_backtest_length(self, obj):
        return len(Backtest.objects.filter(strategy=obj.id))

    class Meta:
        model = Strategy
        fields = "__all__"


class StrategyDetailSerializer(ModelSerializer):
    """策略详情Serializer Detail"""

    source_code = SourceCodeSerializer()

    def create(self, validated_data):
        """ 如果数据合法就创建并返回一个Strategy实例 """

        return Strategy.objects.create(
            name=validated_data.get("name"),
            type=validated_data.get("type"),
            description=validated_data.get("description"),
            source_code=SourceCode.objects.create(
                code_text=validated_data.get("source_code")["code_text"] or ""
            ),
        )

    def update(self, instance, validated_data):
        """ 如果数据合法就更新并返回一个存在的Strategy实例 """
        instance.description = validated_data.get(
            "description", instance.description
        )
        instance.name = validated_data.get("name", instance.name)
        instance.type = validated_data.get("type", instance.type)
        instance.save()
        source_code = instance.source_code
        source_code.code_text = validated_data.pop("source_code")["code_text"]
        source_code.save()
        return instance

    class Meta:
        model = Strategy
        fields = "__all__"
