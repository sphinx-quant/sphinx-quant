from enum import Enum


def enum_to_choices(enum: Enum):
    """ cover enum to choice """
    return tuple([(tag.name, tag.value) for tag in enum])


class BacktestStatusType(Enum):
    """ 回测状态 """

    START = "START"
    PROCESS = "PROCESS"
    DONE = "DONE"
    ERROR = "ERROR"
    ABORT = "ABORT"


class StrategyType(Enum):
    """ 策略类型 """

    STOCK = "STOCK"
    FUTURES = "FUTURES"
    CRYPTO_CURRENCY = "CRYPTO_CURRENCY"
    OTHER = "OTHER"


class BarType(Enum):
    """ Bar类型 """

    TICK = "TICK"
    MINUTE = "MINUTE"
    DAY = "DAY"
