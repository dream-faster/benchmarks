import os

import pandas as pd
import wget


def download_data() -> None:
    if not os.path.exists("frontend/data_snippets"):
        os.makedirs("datasets/m4/original")

    wget.download(
        "https://github.com/Mcompetitions/M4-methods/raw/master/Dataset/Train/Monthly-train.csv",
        out="datasets/m4/original",
    )


def preprocess() -> pd.DataFrame:
    download_data()
    data = pd.read_csv("datasets/m4/original/Monthly-train.csv")

    data = data.rename(columns={"V1": "m4"})
    data = data.set_index("m4").transpose().reset_index(drop=True)
    data = data.dropna()

    data = data[data.columns[:50]]
    return data
