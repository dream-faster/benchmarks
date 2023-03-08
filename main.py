from typing import Callable, List

import pandas as pd
from fold.transformations.base import BlocksOrWrappable

from datasets.m4.preprocess import preprocess
from models.get_models import get_all_models
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


def main():
    results = run_pipeline([preprocess, preprocess], get_all_models())
    save_results(results)


if __name__ == "__main__":
    main()
