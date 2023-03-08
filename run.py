from typing import List, Tuple

import pandas as pd
from fold.loop import backtest, train
from fold.splitters import SlidingWindowSplitter
from fold.transformations.base import BlocksOrWrappable
from krisi import score
from numpy import average


def run_dataset_on_model(data: pd.DataFrame, blocks: BlocksOrWrappable) -> float:
    ids = data["unique_id"].unique()
    smapes = []
    weights = []

    for id in ids:
        X = data[data["unique_id"] == id].set_index("ds")["y"]
        y = X.shift(-1)[:-1]
        X = X[:-1].to_frame()
        splitter = SlidingWindowSplitter(0.2, 20)
        blocks_over_time = train(blocks, X, y, splitter)
        preds = backtest(blocks_over_time, X, y, splitter)
        smapes.append(score(y[preds.index], preds.squeeze())["smape"].result)
        weights.append(len(y))
    return float(average(smapes, weights=weights))


def run_datasets_on_models(
    datasets: List[pd.DataFrame], models: List[BlocksOrWrappable]
) -> List[Tuple[str, float]]:
    return [
        (
            f"{model.__class__.__name__}-{data.name if hasattr(data, 'name') else str(i)}",
            float(run_dataset_on_model(data, model)),
        )
        for i, data in enumerate(datasets)
        for model in models
    ]
