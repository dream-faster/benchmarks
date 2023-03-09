with open("benchmarks_template.yaml", "r") as stream:
    benchmark_template = stream.read()


models_to_benchmark = ["BaselineNaive", "BaselineNaive"]
datasets_to_benchmark = ["m4", "m4"]

benchmark_template = (
    benchmark_template.replace("{model_names}", ",".join(models_to_benchmark))
    .replace("{dataset_names}", ",".join(datasets_to_benchmark))
    .replace("{dataset_list}", '"\n        - "'.join(datasets_to_benchmark))
    .replace("{model_list}", '"\n        - "'.join(models_to_benchmark))
)


with open(".github/workflows/benchmarks.yaml", "w") as stream:
    stream.write(benchmark_template)
