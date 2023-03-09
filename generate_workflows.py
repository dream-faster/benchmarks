from copy import deepcopy

with open("benchmarks_template.yaml", "r") as stream:
    benchmark_template = stream.read()


models_to_benchmark = ["BaselineNaive", "BaselineNaive"]
datasets_to_benchmark = ["m4", "m4"]

workflows = []
for model_name in models_to_benchmark:
    for dataset_name in datasets_to_benchmark:
        benchmark_template_copy = deepcopy(benchmark_template)
        benchmark_template_copy = benchmark_template_copy.replace(
            "{model_names}", model_name
        ).replace("{dataset_names}", dataset_name)
        workflows.append((f"{dataset_name}-{model_name}", benchmark_template_copy))

for workflow_name, workflow in workflows:
    with open(f".github/workflows/{workflow_name}.yaml", "w") as stream:
        stream.write(workflow)
