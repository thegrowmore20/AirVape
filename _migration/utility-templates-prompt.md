# Migration Prompt — Utility Templates (`search.json`, `404.json`, `gift_card.liquid`, `password.json`)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> These four are the simplest templates in the theme — three are **100% stock Essence**, verify-only. Only **`404.json`** carries anything to reproduce, and even that is data (product handles + a small shared section customization), not custom code.

---

Recreate my four **utility templates**: `templates/search.json`, `templates/404.json`, `templates/gift_card.liquid`, `templates/password.json`. I audited each against its section file(s) in the old theme — none of the four templates contain custom Liquid, CSS, or JS of their own. The only things that need reproducing are: (a) the exact JSON settings values below, and (b) for `404.json`, the featured-collection product handle list plus a small shared `custom_class` setting that the `featured-collection` section type carries theme-wide (documented in §3).

## ⚠️ Rules
1. Copy each template's JSON verbatim into the matching file — preserve the leading auto-generated `/* ... */` comment block, section order, and every setting.
2. For any setting/section type that doesn't exist in the 4.2 schema, **skip it and list it back to me** — do not invent settings.
3. `gift_card.liquid` is a one-line Liquid template (`{% section 'main-gift-card' %}`) — copy it verbatim, not JSON.
4. Keep valid JSON where applicable; run a validity check and report.

## 1. Summary table

| Template | Section(s) | Section type(s) | Stock or custom? | What to do |
|---|---|---|---|---|
| `templates/search.json` | `main-search` | `main-search` | **Stock** — verify only, no changes | Copy JSON verbatim; confirm section type + settings exist in 4.2 |
| `templates/404.json` | `main` | `main-404` | **Stock** — verify only, no changes | Copy JSON verbatim; confirm section type + settings exist in 4.2 |
| `templates/404.json` | `featured_collection_mBU3nz` | `featured-collection` | **Stock section**, but carries **store data to reproduce**: 8 hardcoded product handles + the `custom_class` setting (shared theme customization, blank here) | Copy JSON verbatim; ensure the 8 products exist under those handles (§3); ensure the section's `custom_class` setting exists in 4.2's `featured-collection` schema (§3.1) |
| `templates/gift_card.liquid` | `main-gift-card` (via `{% section %}`) | n/a (full Liquid template) | **Stock** — verify only, no changes | Copy the one-liner verbatim; confirm a `main-gift-card` section exists in 4.2 |
| `templates/password.json` | `main` | `password-page` | **Stock** — verify only, no changes | Copy JSON verbatim; confirm section type + settings exist in 4.2 |

## 2. `search.json` — stock, verify only
`sections/main-search.liquid` in the old theme is unmodified stock Essence: it renders a heading, a search input form, and (on results) `{% render 'collection-grid', results: search, ... %}` — the same stock `collection-grid` snippet used elsewhere, no site-specific markup. No inline `<style>`/`<script>` in the section.

Notable non-default settings to preserve exactly (rest match Essence defaults):
- `pagination_type: "load-more"` (stock default is `"classic"`)
- `default_open_filters: 4` (stock default is `3`)

No dependencies (apps, images, product/collection handles) — the page just renders live search results.

## 3. `404.json` — stock sections; product-handle data to reproduce
Both sections (`main` / `main-404`, `featured_collection_mBU3nz` / `featured-collection`) are stock Essence section **types** with no template-level customization. `sections/main-404.liquid` is pure stock (`section-attrs` + `section-content` snippets only, no custom markup).

### 3.1 `featured-collection` section — shared `custom_class` setting (theme-wide customization)
The `featured-collection` section type in this theme has **one added setting** beyond stock Essence: a `custom_class` text setting, wired into the wrapper div:
```liquid
<div {% render 'section-attrs', class: section.settings.custom_class %} {% if section.settings.custom_class != blank %}class="{{ section.settings.custom_class }}"{% endif %}>
```
```json
{
  "type": "text",
  "id": "custom_class",
  "label": "Custom Class"
}
```
(placed as the first setting in the schema, before `full_width`). This is a **shared, theme-wide customization** used across several pages (not specific to 404) — if you're migrating other pages that also use `featured-collection`, only add this once. On the 404 template it's present in the settings block but left **blank** (`""` — not explicitly set, so it just needs to exist in the schema; no value to carry over for this template specifically).

### 3.2 Featured-collection block — "OUR SIGNATURE MODELS" — product handles
The `featured_collection_mBU3nz` block on 404 is heading `"OUR SIGNATURE MODELS"`, `products_count: 8`, `grid_columns: 4`, carousel enabled, and hardcodes these **8 product handles** (in order):
1. `enso`
2. `legacy-core`
3. `legacy-pro-2`
4. `airvape-x-royal-edition`
5. `airvape-x`
6. `airvape-xs-go`
7. `airvape-om-keychain-waxpen`
8. `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`

**Flag:** the old theme's git history shows a recent commit *"Breathelet removed from the website"* — the `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus` handle may no longer be an active/sellable product on the live store even though it's still referenced in this template's JSON (and in several other templates' file names, e.g. `templates/product.breathelet.json` still exists). **Verify with the user whether to keep, drop, or replace this 8th handle** before recreating the section on the new store — don't assume it should be ported as-is.

This exact 8-product "OUR SIGNATURE MODELS" featured-collection block is reused verbatim across several pages in this theme (e.g. it also appears in `templates/page.wholesale.json`) — if you're migrating those pages too, this is the same block.

## 4. `gift_card.liquid` — stock, verify only
The full old-theme file is:
```liquid
{% section 'main-gift-card' %}
```
`sections/main-gift-card.liquid` (not part of this template file, but rendered by it) is unmodified stock Essence — standard gift-card-issued markup (balance, code, copy button, QR code via `vendor/qrcode.js`, Apple Wallet pass link, print styles), all driven by translation keys and the `gift_card`/`shop` Liquid objects. No AirVape-specific branding, CSS, or JS beyond stock. Nothing to reproduce beyond confirming the `main-gift-card` section exists in 4.2.

## 5. `password.json` — stock, verify only
`sections/password-page.liquid` is unmodified stock Essence: `shop.password_message`, `section-header` snippet, and a stock `newsletter-signup-form` render. No custom markup.
Settings to preserve: `heading: "Opening soon"`, `content: "<p>Be the first to know when we launch.</p>"`.
Note this template sets `"layout": "password"` at the top level (not just a `sections`/`order` pair) — keep that key.

## 6. Dependencies
- **Apps:** none required by any of these four templates.
- **Images (Content → Files):** none — no `shopify://shop_images` references in any of the four templates or their section files.
- **Product handles to verify exist** (only from §3.2): `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus` (flagged above — confirm before porting).
- **Collections/menus:** none referenced directly by these templates.

## 7. Diff against 4.2
For each of the 4 section types (`main-search`, `main-404`, `featured-collection`, `password-page`) and `main-gift-card`:
- Confirm the section type exists in Essence 4.2 with the same settings schema.
- Diff the setting IDs used in the JSON below against the 4.2 section's `{% schema %}` — flag any renamed, removed, or added settings rather than guessing.
- Confirm `featured-collection` in 4.2 either already has the `custom_class` setting or needs it added per §3.1 (only if you're also porting other pages that rely on it — for 404 alone it's optional since the value is blank).

## 8. Report back
- Confirm all 5 sections (`main-search`, `main-404`, `featured-collection`, `main-gift-card`, `password-page`) resolved as stock 4.2 section types, and list any renamed/removed/added settings found.
- Confirm the 3 pure-stock templates (`search.json`, `404.json`'s `main` section, `gift_card.liquid`, `password.json`) needed no changes beyond pasting the JSON/Liquid.
- Confirm the 8 product handles in `404.json`'s featured-collection exist on the new store (or report which don't), and confirm with the user on the Breathelet handle before including it.
- Confirm whether `featured-collection`'s `custom_class` setting needs to be added to 4.2's schema (only relevant if other pages using it are also being migrated).
- Confirm all 3 JSON files are valid JSON and `password.json` retains its `"layout": "password"` key.

---

## FULL template contents — copy verbatim

### `templates/search.json`
```json
/*
 * ------------------------------------------------------------
 * IMPORTANT: The contents of this file are auto-generated.
 *
 * This file may be updated by the Shopify admin theme editor
 * or related systems. Please exercise caution as any changes
 * made to this file may be overwritten.
 * ------------------------------------------------------------
 */
{
  "sections": {
    "main-search": {
      "type": "main-search",
      "settings": {
        "products_per_row": 3,
        "products_per_row_mobile": "products-collection-grid--mobile-two-col",
        "space_between_products": "block-spacing-default",
        "products_per_page": 24,
        "pagination_type": "load-more",
        "filter_type": "vertical",
        "show_filters": true,
        "show_filter_match_count": true,
        "show_filter_values_with_no_matches": false,
        "enable_color_swatches": true,
        "show_selected_filter_type": false,
        "show_sort_by": true,
        "show_results_count": true,
        "default_open_filters": 4,
        "background_color": "",
        "text_color": ""
      }
    }
  },
  "order": [
    "main-search"
  ]
}
```

### `templates/404.json`
```json
/*
 * ------------------------------------------------------------
 * IMPORTANT: The contents of this file are auto-generated.
 *
 * This file may be updated by the Shopify admin theme editor
 * or related systems. Please exercise caution as any changes
 * made to this file may be overwritten.
 * ------------------------------------------------------------
 */
{
  "sections": {
    "main": {
      "type": "main-404",
      "settings": {
        "full_width": true,
        "subheading": "404",
        "heading": "Page not found",
        "content": "",
        "heading_size": "h2",
        "text_alignment": "text-center",
        "button_text": "Continue shopping",
        "button_url": "shopify://collections/all",
        "button_style": "",
        "background_color": "",
        "text_color": "",
        "heading_color": "",
        "button_background_color": "",
        "button_text_color": ""
      }
    },
    "featured_collection_mBU3nz": {
      "type": "featured-collection",
      "settings": {
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "products": [
          "enso",
          "legacy-core",
          "legacy-pro-2",
          "airvape-x-royal-edition",
          "airvape-x",
          "airvape-xs-go",
          "airvape-om-keychain-waxpen",
          "breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus"
        ],
        "collection": "",
        "subheading": "",
        "heading": "OUR SIGNATURE MODELS",
        "heading_size": "h2",
        "text_alignment": "text-center",
        "link_text": "View all",
        "link_url": "",
        "background_color": "",
        "text_color": "",
        "heading_color": "",
        "heading_html_tag": "h2"
      }
    }
  },
  "order": [
    "main",
    "featured_collection_mBU3nz"
  ]
}
```

### `templates/gift_card.liquid`
```liquid
{% section 'main-gift-card' %}
```

### `templates/password.json`
```json
/*
 * ------------------------------------------------------------
 * IMPORTANT: The contents of this file are auto-generated.
 *
 * This file may be updated by the Shopify admin theme editor
 * or related systems. Please exercise caution as any changes
 * made to this file may be overwritten.
 * ------------------------------------------------------------
 */
{
  "layout": "password",
  "sections": {
    "main": {
      "type": "password-page",
      "settings": {
        "heading": "Opening soon",
        "content": "<p>Be the first to know when we launch.</p>"
      }
    }
  },
  "order": [
    "main"
  ]
}
```
