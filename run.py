from typing import List

import pandas as pd
from fold.loop import backtest, train
from fold.splitters import SlidingWindowSplitter
from fold.transformations.base import BlocksOrWrappable
from krisi import score
from numpy import average


def run_dataset_on_model(data: pd.DataFrame, blocks: BlocksOrWrappable) -> float:
    # ids = data["unique_id"].unique()
    smapes = []
    weights = []

    for column in data.columns:
        # X = data[data["unique_id"] == id].set_index("ds")["y"]
        X = data[[column]]
        y = X[column].shift(-1)[:-1]
        X = X[:-1]
        splitter = SlidingWindowSplitter(0.2, 20)
        blocks_over_time = train(blocks, X, y, splitter)
        preds = backtest(blocks_over_time, X, y, splitter)
        smapes.append(score(y[preds.index], preds.squeeze())["smape"].result)
        weights.append(len(y))
    return float(average(smapes, weights=weights))


def run_datasets_on_models(
    datasets: List[pd.DataFrame], models: List[BlocksOrWrappable]
) -> pd.DataFrame:
    dfs = []
    for i, dataset in enumerate(datasets):
        ds = pd.Series([])
        ds.name = dataset.name + f"_{str(i)}" if hasattr(dataset, "name") else str(i)
        for j, model in enumerate(models):
            ds[model.__class__.__name__ + f"_{str(j)}"] = float(
                run_dataset_on_model(dataset, model)
            )
        dfs.append(ds)

    return pd.concat(dfs, axis=1)
