import argparse

from main import main


def run():
    parser = argparse.ArgumentParser()

    # Add one special argument for deciding what pipeline to run
    parser.add_argument("--dataset", type=str, default=None)
    parser.add_argument("--model", type=str, default=None)
    args = parser.parse_args()

    model_names = args.model.split(",") if args.model is not None else None

    dataset_names = args.dataset.split(",") if args.dataset is not None else None

    main(model_names, dataset_names)


if __name__ == "__main__":
    run()
