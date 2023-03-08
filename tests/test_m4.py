from datasets.m4.preprocess import preprocess
from main import run_pipeline
from models.get_models import get_all_models


def test_m4():
    run_pipeline([preprocess], get_all_models())
