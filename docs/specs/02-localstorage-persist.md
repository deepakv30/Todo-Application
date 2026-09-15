# Spec 02 — localStorage persistence (Issue #2)

## Outcome

Todos (text + checked state) survive page refresh via `localStorage`, with an optional confirm dialog before “Remove All”, and no new dependencies.

## Context

- `script.js` only mutates the DOM; refresh loses the list.
- “Remove All Todo” clears everything with one click — easy to mis-click.
- Portfolio demo should feel usable as a small client-side app.

## Scope (In / Out)

**In**
- Serialize `{ text, checked }[]` (plus stable enough IDs if needed) to `localStorage` on add / remove / check / remove-all.
- Hydrate the list on load from storage; if empty/missing, keep or seed the default demo items then save.
- `confirm()` (or equivalent) before Remove All.
- Zero dependencies.

**Out**
- Multi-device sync, accounts, IndexedDB, service-worker offline beyond what already exists on the portfolio host.
- Undo stack / soft delete.

## Constraints

- No npm packages or CDN libs for persistence.
- HTTPS static page only; `localStorage` is fine for this demo origin.
- Do not push `main`; ship on the feature branch with issue #1.

## Invariants

- **I1** After add/check/remove/remove-all, storage reflects the current list.
  - Check: DevTools Application → localStorage key updates; or `JSON.parse(localStorage.getItem(...))` length/text/checked match DOM.
- **I2** Refresh restores text and checked flags.
  - Check: add item, check it, refresh — both remain.
- **I3** Remove All asks for confirmation; cancel leaves the list unchanged.
  - Check: manual confirm cancel → items still present and still in storage.
- **I4** No third-party persistence libraries.
  - Check: only `index.html` / `script.js` / `style.css` (+ specs); no new script tags for libs.
- **I5** Hydrated/rebuilt items still satisfy Spec 01 unique ID + label association.
  - Check: after load from storage, IDs unique and labels associated.

## Prior decisions

- **D1:** Storage key: `todo-application-items`.
- **D2:** Payload shape: `[{ "id": "todo-1", "text": "...", "checked": false }, ...]`.
- **D3:** On first visit (no key / invalid JSON), use the three default demo todos from markup (or equivalent seed), then write storage.
- **D4:** Confirm message: clear user-facing string e.g. “Remove all todos? This cannot be undone.”
- **D5:** Persist on checkbox `change` via delegation on `#list`.

## Task breakdown

1. Add `saveTodos` / `loadTodos` / `renderTodos` helpers.
2. On startup: load or seed, render, ensure counter continues past max existing id.
3. Call `saveTodos` after add, remove, remove-all, and checkbox change.
4. Gate `removeAllItem` behind `confirm`.
5. Manual test: add / check / refresh / remove-all confirm & cancel.

## Acceptance criteria

- **Given** a user adds and checks todos, **When** they refresh the page, **Then** the same texts and checked states reappear.
- **Given** the user clicks “Remove All Todo”, **When** they cancel the confirm dialog, **Then** the list and storage are unchanged.
- **Given** the user confirms Remove All, **When** the dialog closes, **Then** the list is empty and storage reflects an empty array (or equivalent cleared state).
- **Given** the implementation, **When** inspected, **Then** persistence uses `localStorage` only with no new dependencies.

## Implementation notes

- Clear `#list` and rebuild from data on hydrate so static duplicates never fight stored state after first run.
- When seeding from initial HTML once, read label text + checkbox checked, assign unique ids, save, then rely on storage thereafter.
- `removeItem` should save after deletions; keep existing “remove checked only” behavior.
- Ignore quota errors softly (try/catch) so a full disk does not break add UI.
