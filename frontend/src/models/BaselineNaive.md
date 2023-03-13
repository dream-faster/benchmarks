---
title: "BaselineNaiveSeasonal"
date: "2023-01-01"
github_link: "https://github.com/dream-faster/drift"
description: "Continuous validation and model composition for non-stationary Time Series"
tag: "timeseries,uncertainity"
favorite: true
---

Drift is a Nowcasting continuous evaluation/deployment library. (also known as walk-forward evaluation)

It supports both univariate and (soon) multivariate time series. It is from the ground-up extensible and lightweight.

Avoid the mistakes people make with time series ML:

ignoring useful features otherwise available in production (value in T-1)
accidentally using information that wouldn't otherwise be available at the time of training/evaluation (lookahead bias)
It can train models without lookahead bias:
