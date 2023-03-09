from typing import List

import pandas as pd
from fold.loop import backtest, train
from fold.splitters import SlidingWindowSplitter
from fold.transformations.base import BlocksOrWrappable
from krisi import score
from numpy import average


def run_dataset_on_model(dataset: pd.DataFrame, model: BlocksOrWrappable) -> pd.Series:
    dss = []
    weights = []

    for column in dataset.columns:
        X = dataset[[column]]
        y = X[column].shift(-1)[:-1]
        X = X[:-1]
        splitter = SlidingWindowSplitter(0.2, 20)
        blocks_over_time = train(model, X, y, splitter)
        preds = backtest(blocks_over_time, X, y, splitter)
        # smapes.append(score(y[preds.index], preds.squeeze())["smape"].result)
        dss.append(score(y[preds.index], preds.squeeze()).get_ds())
        weights.append(len(y))

    df = pd.concat(dss, axis=1)
    ds = pd.Series(average(df, axis=1, weights=weights), index=df.index)
    ds_with_meta = pd.concat(
        [
            pd.Series(
                [model.__class__.__name__, dataset.columns.name],
                index=["model", "dataset"],
            ),
            ds,
        ]
    )
    return ds_with_meta


def run_datasets_on_models(
    datasets: List[pd.DataFrame], models: List[BlocksOrWrappable]
) -> pd.DataFrame:
    dfs = []
    for i, dataset in enumerate(datasets):
        for j, model in enumerate(models):
            ds = run_dataset_on_model(dataset, model)
            ds.name = (
                model.__class__.__name__ + " - " + dataset.columns.name
                if hasattr(dataset.columns, "name")
                else str(i)
            )

            dfs.append(ds)

    df_summary = pd.concat(dfs, axis=1)  # .transpose()
    df_summary.index = df_summary.index.rename("model_dataset_name")
    return df_summary
