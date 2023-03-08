from typing import Callable, List

import pandas as pd
from fold.models.baseline import BaselineNaive
from fold.transformations.base import BlocksOrWrappable

from datasets.m4.preprocess import preprocess
from run import run_datasets_on_models


def run_pipeline(
    preprocess_functions: List[Callable[[], pd.DataFrame]],
    models: List[BlocksOrWrappable],
) -> None:
    datasets = [preprocess() for preprocess in preprocess_functions]
    run_datasets_on_models(datasets, models)


if __name__ == "__main__":
    run_pipeline([preprocess], [BaselineNaive, BaselineNaive])
