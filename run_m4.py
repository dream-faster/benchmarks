#%%

# import os
# os.system("wget https://github.com/Mcompetitions/M4-methods/raw/master/Dataset/Train/Monthly-train.csv")
# os.system("wget https://github.com/Mcompetitions/M4-methods/raw/master/Dataset/Test/Monthly-test.csv")

from numpy import average
import pandas as pd

def preprocess_m4(data):
    data = data.rename(columns={'V1':'unique_id'})
    data = pd.wide_to_long(data, stubnames=["V"], i="unique_id", j="ds").reset_index()
    data = data.rename(columns={'V':'y'})
    data = data.dropna()
    data['ds'] = data['ds']-1
    return data

data = preprocess_m4(pd.read_csv('Monthly-train.csv', nrows=100))
# data_test = preprocess_m4(pd.read_csv('Monthly-test.csv', nrows=100))
# merge train & test sets


from drift.transformations.base import BlocksOrWrappable
from drift.models.baseline import BaselineNaiveContinuous
from drift.loop import train, backtest
from drift.splitters import SlidingWindowSplitter
from krisi import score

def run_drift_on_each_series(
    data: pd.DataFrame,
    blocks: BlocksOrWrappable
):
    ids = data["unique_id"].unique()
    smapes = []
    weights = []

    for id in ids:
        X = data[data["unique_id"] == id].set_index("ds")["y"]
        y = X.shift(-1)[:-1]
        X = X[:-1].to_frame()
        splitter = SlidingWindowSplitter(100, 20)
        blocks_over_time = train(blocks, X, y, splitter)
        _, preds = backtest(blocks_over_time, X, y, splitter)
        smapes.append(score(y[preds.index], preds.squeeze())["smape"])
        weights.append(len(y))
    return average(smapes, weights=weights)


a = run_drift_on_each_series(data, BaselineNaiveContinuous())
