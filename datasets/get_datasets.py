from enum import Enum
from importlib import import_module
from typing import Callable, List


class all_dataset_names(Enum):
    m4 = "m4"


def get_values(obj):
    return [e.value for e in obj]


def get_all_datasets() -> List[Callable]:
    return get_datasets(get_values(all_dataset_names))


def get_datasets(dataset_names: List[str]) -> List[Callable]:
    preprocess_functions: List[Callable] = []
    for dataset_name in dataset_names:
        if dataset_name in get_values(all_dataset_names):
            preprocess_functions.append(
                import_module(f"datasets.{dataset_name}.preprocess").preprocess
            )

    return preprocess_functions
