from enum import Enum
from typing import List

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


def get_all_models() -> List[BlocksOrWrappable]:
    return get_models(get_values(AllModels))


def get_models(model_names: List[str]) -> List[BlocksOrWrappable]:
    models: List[BlocksOrWrappable] = []
    for model_name in model_names:
        if model_name == AllModels.BaselineNaive.value:
            models.append(BaselineNaive())
        elif model_name == AllModels.BaselineNaiveSeasonal.value:
            models.append(BaselineNaiveSeasonal(seasonal_length=5))
        elif model_name == AllModels.StatsModelARIMAOne.value:
            models.append(
                WrapStatsModels(
                    StatsModelARIMA,
                    init_args=dict(order=(1, 1, 0)),
                    use_exogenous=False,
                )
            )
        elif model_name == AllModels.StatsForecastARIMAOne.value:
            models.append(
                WrapStatsForecast(
                    StatsForecastARIMA,
                    init_args=dict(order=(1, 1, 0)),
                    use_exogenous=False,
                )
            )
    return models
