import pandas as pd


def preprocess() -> pd.DataFrame:
    data = pd.read_csv("datasets/m4/Monthly-train.csv")
    # y = pd.read_csv('./m4/Monthly-test.csv')

    data = data.rename(columns={"V1": "m4"})
    data = data.set_index("m4").transpose().reset_index(drop=True)
    data = data.dropna()

    data = data[:50]
    return data
