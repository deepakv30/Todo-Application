# Spec 01 — GitHub Pages + CI

## Outcome

`Todo-Application` deploys its static site to GitHub Pages via Actions on every push to `main`, and pull requests / pushes run a cheap static sanity check (required files + localStorage / unique-id patterns) so regressions in persistence or checkbox IDs are caught early.

## Context

- Default branch: `main`.
- Static assets at repo root: `index.html`, `script.js`, `style.css`.
- Recent fixes: unique `todo-N` checkbox IDs with associated labels; `localStorage` persistence under key `todo-application-items`.
- Pages was not enabled; no repo homepage set.
- Target live URL: `https://deepakv30.github.io/Todo-Application/`.

## Scope (In / Out)

**In**
- `docs/specs/` index entry for this delivery.
- `.github/workflows/ci.yml` (PR + push to `main`).
- `.github/workflows/pages.yml` (Actions-based Pages deploy).
- README with live URL, CI, and Pages deploy notes.
- Enable Pages (`build_type=workflow`) and set repo homepage when API permits.

**Out**
- Legacy branch-based Pages.
- Merging this PR (leave for human when CI is green).
- Changing todo UX beyond what CI asserts (covered by earlier a11y/persist specs).
- Node unit-test suite (none exists; static greps only).

## Constraints

- HTTPS-only clone/push/`gh`.
- Never push directly to `main`/`master`; feature branch + PR only.
- Author commits as `DeepakV <deepakv.knit@gmail.com>`.
- Use current action majors: `actions/checkout@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`.
- Prefer copying only site files into `_site/` for the Pages artifact.

## Invariants

- **I1** CI workflow exists and runs static sanity on PR/push to `main`.
  - Check: `test -f .github/workflows/ci.yml && grep -q localStorage .github/workflows/ci.yml`
- **I2** Pages workflow deploys via Actions (not legacy branch source).
  - Check: `grep -q deploy-pages@v4 .github/workflows/pages.yml && grep -q upload-pages-artifact@v3 .github/workflows/pages.yml`
- **I3** README documents `https://deepakv30.github.io/Todo-Application/`.
  - Check: `grep -F 'https://deepakv30.github.io/Todo-Application/' README.md`
- **I4** Artifact payload contains the three static site files and excludes `.git`.
  - Check: workflow copies `index.html`, `script.js`, `style.css` into `_site/` before upload.

## Prior decisions

- **D1:** Host from this repo via Actions Pages at the canonical `Todo-Application` path.
- **D2:** Upload a curated `_site/` directory (omit `docs/` and workflows from the published root).
- **D3:** CI asserts file presence plus `localStorage` and `todo-` id patterns from the recent persist/a11y fix.
- **D4:** Concurrency group `pages` with `cancel-in-progress: false`.

## Task breakdown

1. Add this spec and update `docs/specs/README.md`.
2. Add `ci.yml` (checkout + static sanity).
3. Add `pages.yml` (build → `_site/` → upload-pages-artifact → deploy-pages).
4. Create README with Pages URL and CI/Pages notes.
5. Push branch `chore/github-pages-ci`, open PR (do not merge).
6. Enable Pages (`build_type=workflow`) and set homepage via `gh`; if 403, document Settings clicks.

## Acceptance criteria

- **Given** a pull request against `main`, **When** CI runs, **Then** required static files exist and `script.js` contains `localStorage` and `todo-` id patterns.
- **Given** a push to `main` after merge, **When** `pages.yml` completes, **Then** the site is served at `https://deepakv30.github.io/Todo-Application/`.
- **Given** the repo Website field is updated, **When** a visitor opens the repo page, **Then** homepage is `https://deepakv30.github.io/Todo-Application/`.
- **Given** Pages is configured for Actions, **When** Settings → Pages is inspected, **Then** source is GitHub Actions (not a branch).

## Implementation notes

- `ci.yml` triggers: `pull_request` and `push` to `main`.
- `pages.yml` triggers: `push` to `main` and `workflow_dispatch`.
- Permissions on Pages workflow: `contents: read`, `pages: write`, `id-token: write`.
- Deploy job `environment: github-pages`; use `actions/deploy-pages@v4`.
- Site copy example: `mkdir -p _site && cp index.html style.css script.js _site/`.
- Enabling Pages via API may require `pages` admin scope; document manual path on 403.
