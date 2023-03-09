from enum import Enum
from typing import List

from fold.models.baseline import BaselineNaive, BaselineNaiveSeasonal
from fold.transformations.base import BlocksOrWrappable

from utils.iterable_helpers import get_values


class all_model_names(Enum):
    BaselineNaive = "BaselineNaive"
    BaselineNaiveSeasonal = "BaselineNaiveSeasonal"


def get_all_models() -> List[BlocksOrWrappable]:
    return get_models(get_values(all_model_names))


def get_models(model_names: List[str]) -> List[BlocksOrWrappable]:
    models: List[BlocksOrWrappable] = []
    for model_name in model_names:
        if model_name == "BaselineNaive":
            models.append(BaselineNaive())
        elif model_name == "BaselineNaiveSeasonal":
            models.append(BaselineNaiveSeasonal(seasonal_length=5))
    return models
