from typing import List

from fold.models.baseline import BaselineNaive
from fold.transformations.base import BlocksOrWrappable


def get_all_models() -> List[BlocksOrWrappable]:
    return [BaselineNaive(), BaselineNaive()]


def get_models(model_names: List[str]) -> List[BlocksOrWrappable]:
    models: List[BlocksOrWrappable] = []
    for model_name in model_names:
        if model_name == "BaselineNaive":
            models.append(BaselineNaive())
        elif model_name == "ARIMA":
            models.append(BaselineNaive())
        else:
            models.append(BaselineNaive())
    return models
