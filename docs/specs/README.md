# Todo-Application — Spec index (AI-Native SDD)

Specs for this repository. Implement to satisfy each file’s **Acceptance criteria** and **Invariants**.

| Spec | Outcome |
|------|---------|
| [01-github-pages-ci.md](./01-github-pages-ci.md) | GitHub Pages via Actions + static CI sanity |
| [01-a11y-labels-meta.md](./01-a11y-labels-meta.md) | Unique checkbox IDs + associated labels; clearer title + meta |
| [02-localstorage-persist.md](./02-localstorage-persist.md) | Persist todos in localStorage; confirm before Remove All |

## Delivery order (Pages + CI)

1. Write/commit this Pages/CI spec and refresh the index.
2. Add `ci.yml` and `pages.yml`.
3. Create README pointing at `https://deepakv30.github.io/Todo-Application/`.
4. Open PR on `chore/github-pages-ci` (do not merge until CI is green).
5. Enable Pages (`build_type=workflow`) and set repo homepage.
