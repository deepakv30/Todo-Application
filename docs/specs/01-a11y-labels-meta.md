# Spec 01 — Accessibility labels and document meta (Issue #1)

## Outcome

Every todo checkbox has a unique `id`, its label is associated via `for`/`id` (static HTML and items created in `script.js`), and the document has an improved `<title>` plus a meta description.

## Context

- Static list uses three duplicate `id="check"` checkboxes with bare `<label>` text — invalid HTML and broken label-click / AT association.
- Dynamic `addItem()` also sets `id="check"` and `for="item"` (mismatched), and incorrectly uses `createElement('list')`.
- CSS targets `#check`, which only styles the first duplicate ID in practice.
- Title is generic “MY TODO”; no meta description. Live mirror: https://deepakv30.github.io/Todo-Application/.

## Scope (In / Out)

**In**
- Unique checkbox IDs in static `index.html` and for every dynamically created item.
- Wire `<label for="…">` to each checkbox `id`.
- Improve `<title>` and add `<meta name="description" …>`.
- Update CSS so checkbox styling does not depend on a single `#check` id.

**Out**
- Full WCAG audit / keyboard roving tabindex redesign.
- Visual redesign beyond selector fixes needed for unique IDs.
- Backend / auth.

## Constraints

- Keep the existing three-button control UX and list layout.
- Zero new dependencies; plain static HTML/CSS/JS.
- Apply the same ID/label pattern to both static markup and `script.js` creation path.

## Invariants

- **I1** No duplicate `id` attributes among checkboxes (or elsewhere) in the rendered list.
  - Check: after load and after adding N items, all checkbox `id`s are unique.
- **I2** Every todo checkbox has an associated label.
  - Check: each checkbox `id` matches a `label[for]` (or the label wraps the input — prefer explicit `for`).
- **I3** Clicking a todo’s label toggles that todo’s checkbox only.
  - Check: manual — label click flips the matching input.
- **I4** Document head has a descriptive title and meta description.
  - Check: `grep` `<title>` and `meta name="description"` in `index.html`.
- **I5** Dynamically added items follow the same unique-id + `for` pattern as static ones.
  - Check: inspect DOM after “Add Todo”.

## Prior decisions

- **D1:** ID scheme `todo-<n>` with a monotonic counter (also used when hydrating from storage).
- **D2:** Title: `Todo Application — Deepak Vishwakarma`; one-sentence meta description for the portfolio demo.
- **D3:** Replace CSS `#check` rules with `input[type="checkbox"]` (or a shared class) so unique IDs still get checkmark styling.
- **D4:** Fix `createElement('list')` → `createElement('li')` as part of making dynamic items valid list items with proper structure.

## Task breakdown

1. Update `index.html` head (title + meta description).
2. Give static checkboxes unique IDs and matching `label for`.
3. Refactor `addItem` / item factory to assign unique IDs and associate labels; use `li` elements.
4. Retarget checkbox CSS off `#check`.
5. Smoke-test label click and add flow.

## Acceptance criteria

- **Given** the static list in `index.html`, **When** inspected, **Then** each checkbox has a unique `id` and a label with matching `for`.
- **Given** a user adds a new todo, **When** the item appears, **Then** its checkbox ID is unique among all list checkboxes and its label is associated.
- **Given** focus/click on a todo label, **When** activated, **Then** only that todo’s checked state toggles.
- **Given** page `<head>`, **When** inspected, **Then** an improved title and meta description are present.

## Implementation notes

- Prefer a small `nextTodoId()` helper shared by static seed repair (if JS rewrites the list) and `addItem`.
- Keep class `mycheck` on `<li>` for existing opacity/layout CSS.
- Structure: `<li class="mycheck"><input type="checkbox" id="todo-N"><label for="todo-N">text</label></li>` so adjacent-sibling `input:checked + label` strike-through CSS keeps working.
