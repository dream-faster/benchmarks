import argparse

from main import main


def run():
    parser = argparse.ArgumentParser()

    # Add one special argument for deciding what pipeline to run
    parser.add_argument("--datasets", type=str, default=None)
    parser.add_argument("--models", type=str, default=None)
    args = parser.parse_args()

    model_names = args.models.split(",") if args.models is not None else None

    dataset_names = args.datasets.split(",") if args.datasets is not None else None

    main(dataset_names, model_names)


if __name__ == "__main__":
    run()
