def test_m4():
    from datasets.m4.preprocess import preprocess
    from main import run_pipeline
    from models.get_models import get_all_models

    run_pipeline([preprocess], get_all_models())
