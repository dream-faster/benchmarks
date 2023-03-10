import os

import pandas as pd
import wget


def download_data() -> None:
    download_location = "datasets/m4/original"

    if not os.path.exists(download_location):
        os.makedirs(download_location)

    file_name = "Monthly-train.csv"
    if not os.path.exists(f"{download_location}/{file_name}"):
        wget.download(
            f"https://github.com/Mcompetitions/M4-methods/raw/master/Dataset/Train/{file_name}",
            out=download_location,
        )


def preprocess() -> pd.DataFrame:
    download_data()
    data = pd.read_csv("datasets/m4/original/Monthly-train.csv")

    data = data.rename(columns={"V1": "m4"})
    data = data.set_index("m4").transpose().reset_index(drop=True)
    data = data.dropna()

    data = data[data.columns[:50]]
    return data
