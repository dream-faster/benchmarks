import io
from copy import deepcopy

import yaml

with open("benchmarks_template.yaml", "r") as stream:
    benchmark_template = yaml.safe_load(stream)


models_to_benchmark = ["BaselineNaive", "BaselineNaive"]
datasets_to_benchmark = ["m4", "m4"]

workflows = []
for model_name in models_to_benchmark:
    for dataset_name in datasets_to_benchmark:
        benchmark_template_copy = deepcopy(benchmark_template)
        benchmark_template_copy["jobs"]["run-tests"]["steps"][3]["run"] = (
            benchmark_template_copy["jobs"]["run-tests"]["steps"][3]["run"]
            .replace("{model_names}", model_name)
            .replace("{dataset_names}", dataset_name)
        )
        workflows.append((f"{model_name}-{dataset_name}", benchmark_template_copy))

for workflow_name, workflow in workflows:
    with io.open(
        f".github/workflows/{workflow_name}.yaml", "w", encoding="utf8"
    ) as outfile:
        yaml.dump(workflow, outfile, default_flow_style=False, allow_unicode=True)
