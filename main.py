from typing import Callable, List, Optional

import pandas as pd
from fold.transformations.base import BlocksOrWrappable

from datasets.get_datasets import get_all_datasets, get_datasets
from models.get_models import get_all_models, get_models
from run import run_datasets_on_models


def save_results(results: pd.DataFrame):
    for col in results.columns:
        results[col].to_csv(f"results/{col}.csv")


def run_pipeline(
    preprocess_functions: List[Callable[[], pd.DataFrame]],
    models: List[BlocksOrWrappable],
) -> pd.DataFrame:
    datasets = [preprocess() for preprocess in preprocess_functions]
    return run_datasets_on_models(datasets, models)


def main(
    dataset_names: Optional[List[str]] = None,
    model_names: Optional[List[str]] = None,
):
    model_objects = get_all_models() if model_names is None else get_models(model_names)

    preprocess_functions = (
        get_all_datasets() if dataset_names is None else get_datasets(dataset_names)
    )

    results = run_pipeline(preprocess_functions, model_objects)
    save_results(results)


if __name__ == "__main__":
    main(dataset_names=["m4"], model_names=["BaselineNaive"])
