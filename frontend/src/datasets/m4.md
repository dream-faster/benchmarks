---
title: "Drift"
date: "2023-01-01"
github_link: "https://github.com/dream-faster/drift"
description: "Continuous validation and model composition for non-stationary Time Series"
tag: "timeseries,uncertainity"
favorite: true
---

# Drift

Drift is a Nowcasting continuous evaluation/deployment library. (also known as walk-forward evaluation)

It supports both univariate and (soon) multivariate time series. It is from the ground-up extensible and lightweight.

Avoid the mistakes people make with time series ML:

ignoring useful features otherwise available in production (value in T-1)
accidentally using information that wouldn't otherwise be available at the time of training/evaluation (lookahead bias)
It can train models without lookahead bias:

- with expanding window
- with rolling window
- even with a single train/test split, if you really want it
It can also help you with creating complex blended models:

Ensembling: (weighted) averaging the predictions of multiple models or pipelines
Stacking: feed multiple model's predictions into a model