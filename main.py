import os
from typing import Callable, List, Optional

import pandas as pd
from fold.transformations.base import BlocksOrWrappable

from datasets.get_datasets import get_all_datasets, get_datasets
from models.get_models import get_all_models, get_models
from run import run_datasets_on_models


def copy_file(base_path_from: str, base_path_to: str, folder_name: str):
    file_path_to_copy = f"{base_path_from}/{folder_name}/description.md"
    if not os.path.exists(file_path_to_copy):
        return

    with open(file_path_to_copy, "r") as stream:
        file_to_copy = stream.read()

    path_to_save = f"{base_path_to}/{folder_name}"
    if not os.path.exists(path_to_save):
        os.makedirs(path_to_save)

    with open(f"{path_to_save}/description.md", "w") as f:
        f.write(file_to_copy)


def save_metadata(
    dataset_names: Optional[List[str]] = None, model_names: Optional[List[str]] = None
) -> None:
    for name, object_list in [("datasets", dataset_names), ("models", model_names)]:
        if object_list is not None:
            for object_names in object_list:
                copy_file(
                    base_path_from=name,
                    base_path_to=f"frontend/src/{name}",
                    folder_name=object_names,
                )


def save_results(results: pd.DataFrame):
    if not os.path.exists("frontend/results"):
        os.makedirs("frontend/results")
    for col in results.columns:
        results[col].to_csv(f"frontend/results/{col}.csv")


def save_data_snippets(datasets: List[pd.DataFrame]):
    for dataset in datasets:
        path = f"frontend/src/datasets/{dataset.columns.name}"
        if not os.path.exists(path):
            os.makedirs(path)
        file_path = f"{path}/snippet.csv"
        if os.path.exists(file_path):
            continue
        else:
            dataset[dataset.columns[:5]][:50].to_csv(file_path)


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
    save_metadata(dataset_names, model_names)


if __name__ == "__main__":
    main(dataset_names=["m4"], model_names=["BaselineNaive"])
