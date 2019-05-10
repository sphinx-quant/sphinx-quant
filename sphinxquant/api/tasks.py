# Create your tasks here
# from __future__ import absolute_import, unicode_literals
import os
import sys
import tempfile
from contextlib import contextmanager
from datetime import datetime

from celery import shared_task
from vnpy.app.cta_strategy.backtesting import BacktestingEngine

from .models import Backtest, SourceCode, Strategy
from utils.const import BacktestStatusType


@contextmanager
def capture():
    import sys
    from io import StringIO

    oldout, olderr = sys.stdout, sys.stderr
    try:
        out = [StringIO(), StringIO()]
        sys.stdout, sys.stderr = out
        yield out
    finally:
        sys.stdout, sys.stderr = oldout, olderr
        out[0] = out[0].getvalue()
        out[1] = out[1].getvalue()


@shared_task
def add(x, y):
    return x + y


@shared_task
def backtest(
    strategy_id: str,
    code_text: str,
    class_name: str,
    vt_symbol: str,
    interval: str,
    start_date: datetime,
    end_date: datetime,
    rate: float,
    slippage: float,
    size: float,
    pricetick: float,
    capital: float,
):
    tmpf = tempfile.NamedTemporaryFile(suffix=".py", delete=True)
    # 新建回测对象
    strategy = Strategy.objects.get(id=strategy_id)
    bt_obj = Backtest.objects.create(
        name=strategy.name,
        start_date=datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S"),
        end_date=datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%S"),
        status=BacktestStatusType.PROCESS.value,
        total_profit_percent=0.0,
        year_profit_percent=0.0,
        max_dropdown_percent=0.0,
        source_code=SourceCode.objects.create(code_text=code_text or ""),
        strategy=strategy,
    )
    bt_obj.save()
    with capture() as out:
        try:
            tmpf.write(code_text.encode("utf8"))
            tmpf.flush()
            tmpmodule_path, tmpmodule_file_name = os.path.split(tmpf.name)
            tmpmodule_name = tmpmodule_file_name[:-3]
            sys.path.append(tmpmodule_path)
            tmpmodule = __import__(tmpmodule_name)
            tmpclass = getattr(tmpmodule, class_name)
            print(tmpclass)
            # backtest
            engine = BacktestingEngine()
            engine.set_parameters(
                vt_symbol=vt_symbol,
                interval=interval,
                start=start_date,
                end=end_date,
                rate=rate,
                slippage=slippage,
                size=size,
                pricetick=pricetick,
                capital=capital,
            )
            engine.add_strategy(tmpclass, {})
            engine.load_data()
            engine.run_backtesting()
            df = engine.calculate_result()
            engine.calculate_statistics()
            # 完成回测
            bt_obj.status = BacktestStatusType.DONE.value
        except Exception as e:
            print(e)
            # 中途发生错误
            bt_obj.status = BacktestStatusType.ERROR.value
        finally:
            tmpf.close()
    bt_obj.logs = out[0]
    bt_obj.save()
