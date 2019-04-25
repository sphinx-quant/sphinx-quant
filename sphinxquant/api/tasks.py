# Create your tasks here
# from __future__ import absolute_import, unicode_literals
import sys
import os
import tempfile
from celery import shared_task
from vnpy.app.cta_strategy.backtesting import BacktestingEngine
from datetime import datetime
from contextlib import contextmanager

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
def backtest(code_text, class_name, vt_symbol, interval, start_date, end_date, rate,
             slippage, size, pricetick, capital):
    tmpf = tempfile.NamedTemporaryFile(suffix='.py', delete=True)

    with capture() as out:
        try:
            tmpf.write(code_text.encode('utf8'))
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
        except Exception as e:
            print(e)
        finally:
            tmpf.close()
    print(out)