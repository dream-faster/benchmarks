from typing import List

from fold.models.baseline import BaselineNaive
from fold.transformations.base import BlocksOrWrappable


def get_all_models() -> List[BlocksOrWrappable]:
    return [BaselineNaive(), BaselineNaive()]
