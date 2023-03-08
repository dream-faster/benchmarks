from typing import Callable, List


def get_all_datasets() -> List[Callable]:
    from .m4.preprocess import preprocess as preprocess_m4

    return [preprocess_m4]
