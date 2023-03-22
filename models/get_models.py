from __future__ import annotations

from enum import Enum
from typing import List, Union

from fold.models.baseline import BaselineNaive, BaselineNaiveSeasonal
from fold.transformations.base import BlocksOrWrappable
from fold_models.statsforecast import WrapStatsForecast
from fold_models.statsmodels import WrapStatsModels
from statsforecast.models import ARIMA as StatsForecastARIMA
from statsmodels.tsa.arima.model import ARIMA as StatsModelARIMA

from utils.iterable_helpers import get_values


class AllModels(Enum):
    BaselineNaive = "BaselineNaive"
    BaselineNaiveSeasonal = "BaselineNaiveSeasonal"
    StatsModelARIMAOne = "StatsModelARIMAOne"
    StatsForecastARIMAOne = "StatsForecastARIMAOne"

    @staticmethod
    def from_str(value: Union[str, AllModels]) -> AllModels:
        if isinstance(value, AllModels):
            return value
        for strategy in AllModels:
            if strategy.value == value:
                return strategy
        else:
            raise ValueError(f"Unknown AllModels: {value}")


def get_all_models() -> List[BlocksOrWrappable]:
    return get_models(get_values(AllModels))


def get_models(model_names: List[str]) -> List[BlocksOrWrappable]:
    models: List[BlocksOrWrappable] = []
    for model_name in model_names:
        model_name = AllModels.from_str(model_name)
        if model_name == AllModels.BaselineNaive:
            models.append(BaselineNaive())
        elif model_name == AllModels.BaselineNaiveSeasonal:
            models.append(BaselineNaiveSeasonal(seasonal_length=5))
        elif model_name == AllModels.StatsModelARIMAOne:
            models.append(
                WrapStatsModels(
                    StatsModelARIMA,
                    init_args=dict(order=(1, 1, 0)),
                    use_exogenous=False,
                )
            )
        elif model_name == AllModels.StatsForecastARIMAOne:
            models.append(
                WrapStatsForecast(
                    StatsForecastARIMA,
                    init_args=dict(order=(1, 1, 0)),
                    use_exogenous=False,
                )
            )
    return models
