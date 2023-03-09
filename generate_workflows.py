from datasets.get_datasets import all_dataset_names
from models.get_models import all_model_names
from utils.iterable_helpers import get_values

with open("benchmarks_template.yaml", "r") as stream:
    benchmark_template = stream.read()


datasets_to_benchmark = get_values(all_dataset_names)
models_to_benchmark = get_values(all_model_names)

benchmark_template = (
    benchmark_template.replace("{model_names}", ",".join(models_to_benchmark))
    .replace("{dataset_names}", ",".join(datasets_to_benchmark))
    .replace("{dataset_list}", '"\n        - "'.join(datasets_to_benchmark))
    .replace("{model_list}", '"\n        - "'.join(models_to_benchmark))
)


with open(".github/workflows/benchmarks.yaml", "w") as stream:
    stream.write(benchmark_template)
