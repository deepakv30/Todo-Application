# Todo-Application — Spec index (AI-Native SDD)

Specs driving the `fix/todo-a11y-persist` delivery. Implement to satisfy each file’s **Acceptance criteria** and **Invariants**.

| Spec | Issue | Outcome |
|------|-------|---------|
| [01-a11y-labels-meta.md](./01-a11y-labels-meta.md) | #1 | Unique checkbox IDs + associated labels; clearer title + meta description |
| [02-localstorage-persist.md](./02-localstorage-persist.md) | #2 | Persist todos (text + checked) in localStorage; confirm before Remove All |

## Delivery order

1. Write/commit specs (this folder).
2. Implement a11y labels/meta in `index.html`, `script.js`, and checkbox CSS selectors.
3. Implement localStorage hydrate/save + Remove All confirm in `script.js`.
4. Open one PR closing #1–#2; mirror the same app files to portfolio `Todo-Application/` on a separate HTTPS feature-branch PR when possible.
