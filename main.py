from typing import Callable, List

import pandas as pd
from fold.transformations.base import BlocksOrWrappable

from run import run_datasets_on_models


def run_pipeline(
    preprocess_functions: List[Callable[[], pd.DataFrame]],
    models: List[BlocksOrWrappable],
) -> None:
    datasets = [preprocess() for preprocess in preprocess_functions]
    run_datasets_on_models(datasets, models)
