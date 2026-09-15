# Todo Application

A simple client-side todo list with accessible checkbox labels and `localStorage` persistence.

## Live demo

**Website:** [https://deepakv30.github.io/Todo-Application/](https://deepakv30.github.io/Todo-Application/)

GitHub Pages deploys this repository from **GitHub Actions** on every push to `main` (see [`.github/workflows/pages.yml`](.github/workflows/pages.yml)). You can also trigger a deploy manually via **Actions → Deploy GitHub Pages → Run workflow**.

## Features

- Add / remove / remove-all todos
- Unique checkbox IDs with associated labels
- Persist text + checked state in `localStorage`
- Confirm before Remove All

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server.

## CI

Pull requests and pushes to `main` run [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. Checkout
2. Static sanity (required files present; `script.js` still contains `localStorage` and `todo-` id patterns)

## Specs

AI-native SDD specs live under [`docs/specs/`](docs/specs/).
