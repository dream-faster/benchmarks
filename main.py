import os
from typing import Callable, List, Optional

import pandas as pd
from fold.transformations.base import BlocksOrWrappable

from datasets.get_datasets import get_all_datasets, get_datasets
from models.get_models import get_all_models, get_models
from run import run_datasets_on_models


def save_results(results: pd.DataFrame):
    for col in results.columns:
        results[col].to_csv(f"frontend/results/{col}.csv")


def save_data_snippets(datasets: List[pd.DataFrame]):
    if not os.path.exists("frontend/data_snippets"):
        os.makedirs("frontend/data_snippets")

    for dataset in datasets:
        dataset[dataset.columns[:5]][:50].to_csv(
            f"frontend/data_snippets/{dataset.columns.name}.csv"
        )


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
    models = get_all_models() if model_names is None else get_models(model_names)

    preprocess_functions = (
        get_all_datasets() if dataset_names is None else get_datasets(dataset_names)
    )
    datasets = [preprocess() for preprocess in preprocess_functions]
    results_df = run_datasets_on_models(datasets, models)

    save_results(results_df)
    save_data_snippets(datasets)


if __name__ == "__main__":
    main(dataset_names=["m4"], model_names=["BaselineNaive"])
