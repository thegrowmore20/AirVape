# Migration Prompt — List Collections Template (`list-collections.json`)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.

---

Recreate my **List Collections** page (`templates/list-collections.json`). This is the simplest template — it contains a **single stock Essence section** and no custom code.

## 1. Section
| Section | Type | Notes |
|---|---|---|
| main | `main-list-collections` | stock Essence — renders the grid of all/selected collections |

## 2. Steps
- Copy `templates/list-collections.json` verbatim (preserves its settings).
- Confirm the stock `main-list-collections` section exists in 4.2 (it does) and that its settings/enums are unchanged; report any drift.

## 3. Dependencies
- None custom. The page renders your store's collections, so the collections themselves must exist (they will once products/collections are set up).

## 4. Report back
- Confirm `main-list-collections` resolved as stock and JSON is valid.
