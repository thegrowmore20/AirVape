# Migration Prompt — Skin-Shop Collection Template (`collection.skin-shop.json`) — FULL EXPORT

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisite: run **`collection-prompt.md`** (the standard `collection.json` migration) FIRST and keep it open — this prompt only documents what's **different** on the skin-shop alternate template; it assumes the customized `snippets/breadcrumbs.liquid`, `snippets/collection-grid.liquid`, `snippets/facets.liquid`, `snippets/category-filter-values.liquid`, and the customized `product-card` are already ported.
> This prompt contains the **complete `templates/collection.skin-shop.json` verbatim** + every setting + dependencies — nothing skipped.

---

Recreate my **Skin-Shop Collection** alternate template (`templates/collection.skin-shop.json`) exactly. All 3 sections are **stock Essence types** (`main-collection-banner`, `main-collection-grid`, `video`) — there is **no custom CSS, no custom snippet, and no metafield-driven banner** on this template (unlike the standard `collection.json`). What makes it different is purely **settings**: the grid has **filters, sort, and results-count all turned off**, a higher per-page count, and a full-width promo **video** section appended after the grid. This template is a **template *suffix*** — it only renders on whichever collection has it assigned in Admin.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/collection.skin-shop.json` — preserve section order and every setting, including the empty-string ones (`video_url`'s default is used, `subheading`/`heading`/`content` are intentionally blank).
2. For any setting that doesn't exist in the 4.2 section schema, **skip it and list it back to me** — do not invent settings.
3. **No CSS, no metafields, no custom snippets are required by this template itself.** Its only dependencies are the shared collection-grid snippets already ported by `collection-prompt.md`, plus the collection assignment + video file below.
4. Keep valid JSON; run a validity check and report.

## 1. Sections in the template (all stock 4.2 — verify each exists, keep my settings)
| Order | Section key | Type | Purpose |
|---|---|---|---|
| 1 | `main-banner` | `main-collection-banner` | stock title/description/image banner — **enabled** (unlike the standard `collection.json`, where the equivalent section is disabled in favor of a metafield banner) |
| 2 | `main-product-grid` | `main-collection-grid` | product grid — **filters/sort/results-count OFF**, 32 per page |
| 3 | `video_FKw3cT` | `video` | full-width promo video below the grid — reuses the `core_web_skins.webm` clip |

So the **visible** skin-shop page = banner #1 (stock, uses `collection.image`/`collection.title`/`collection.description` directly, no metafields) → grid #2 (bare product grid, no sidebar/sort/count UI) → video #3.

## 2. Banner (`main-banner`) — diff vs standard `collection.json`
This is the **stock** `main-collection-banner` section (see `sections/main-collection-banner.liquid`) — it renders `collection.title` / `collection.description` / `collection.image` straight through `snippets/page-banner.liquid`, no metafields involved. Settings:
```
full_width: true
enable_transparent_header: false
show_collection_title: true
show_collection_description: true
show_collection_image: true
use_original_media_size: false
banner_spacing: 400            (px — standard collection.json's disabled instance also uses 400; 4.2 schema default is 300)
heading_size: "h0"
text_alignment: "md:content-bottom-left"
text_alignment_mobile: "content-bottom-left"
background_color / text_color / heading_color: "rgba(0,0,0,0)"   (transparent — falls through to theme defaults)
overlay_color: "#000000"
overlay_opacity: 45
overlay_type: "gradient"
heading_html_tag: "h1"
```
No `image` / `image_mobile` setting is set on this section — it falls back to `collection.image` (set per-collection in Admin). **Cross-reference:** in the standard `collection.json`, the equivalent `main-banner` section exists too but is `"disabled": true` (replaced by a metafield-driven `image-with-text-overlay` banner). Here it is the **only** banner and is **enabled** — do not disable it.

## 3. Product grid (`main-product-grid`) — diff vs standard `collection.json`
```
products_per_row: 4
products_per_row_mobile: "products-collection-grid--mobile-two-col"   (2-up on mobile)
space_between_products: "block-spacing-normal"
include_collection_url: false
products_per_page: 32          (standard collection.json uses 24)
pagination_type: "load-more"
filter_type: "drawer"          (standard collection.json uses "vertical")
show_filters: false            (standard collection.json: true)
show_filter_match_count: false (standard collection.json: true)
show_filter_values_with_no_matches: false  (standard collection.json: true)
enable_color_swatches: false   (standard collection.json: true)
show_selected_filter_type: false (standard collection.json: true)
show_sort_by: false            (standard collection.json: true)
show_results_count: false      (standard collection.json: true)
default_open_filters: 4
category_filters: — NOT SET (blank/absent; standard collection.json sets "Parts &amp; Accessories,Vaporizers")
background_color: "rgba(0,0,0,0)"
text_color: "rgba(0,0,0,0)"
```
**Net effect (verify this renders identically on 4.2):** because `show_filters` is `false`, the entire facets block in `snippets/collection-grid.liquid` — including the drawer trigger — is skipped by its `{% if section.settings.show_filters %}` guard, so **`filter_type: "drawer"` has no visible effect**; there is no filter button, sidebar, or drawer at all. Because `category_filters` is blank, the mobile Devices/Accessories tab bar and the desktop `category-filters-wrapper` (both gated on `section.settings.category_filters != blank` in `collection-grid.liquid` / `facets.liquid`) also don't render. Because `show_sort_by` and `show_results_count` are both `false`, no sort dropdown and no "X results" text render either. **The page is intentionally just: breadcrumb + bare product grid** — no faceting UI of any kind. This is the customized `collection-grid.liquid`/`facets.liquid` from `collection-prompt.md` §7 still doing the rendering (same snippets, same file) — nothing new to port, only these settings differ. The breadcrumb (`snippets/breadcrumbs.liquid`) still renders since it isn't gated by any of these settings.
> If 4.2 renamed any of these setting keys, map them and report.

## 4. Video section (`video_FKw3cT`) — new vs standard `collection.json` (which has no video section)
Stock Essence `video` section (see `sections/video.liquid`), full-width, no heading/subheading/content copy — it's a bare video block:
```
full_width: true
video: "shopify://files/videos/core_web_skins.webm"
video_url: "https://www.youtube.com/watch?v=_9VUPq3SxOc"   (fallback if the uploaded video is unset)
image_size: "media--ratio-16-9"
subheading: ""
heading: ""
heading_size: "h2"
content: ""
text_alignment: "text-center"
background_color: "" / text_color: "" / heading_color: ""
heading_html_tag: "p"
```
The `core_web_skins.webm` file is **already a cross-store dependency** — it's also used (disabled) in `index-homepage-prompt.md` and (enabled) in `product-core-prompt.md`. If you migrated either of those already, this file is already uploaded to Content → Files; just confirm the filename matches exactly. No poster image (`video_poster`) is set.

## 5. Custom CSS / snippets — NONE new
Unlike the standard `collection.json` (which needs `.sales-end-pe` / `.bundle-collection-badge` CSS + 4 customized snippets), **this template introduces nothing new**. It's a pure settings variant of sections that either are stock (`main-collection-banner`, `video`) or whose customized snippet (`main-collection-grid` → `collection-grid.liquid`/`facets.liquid`) is already required by `collection-prompt.md`. Do not create a new CSS asset for this template.

## 6. What's hidden/disabled — quick reference
| Element | State here | State in standard `collection.json` |
|---|---|---|
| Sidebar/drawer filters | **off** (`show_filters: false`) | on (vertical sidebar) |
| Sort dropdown | **off** | on |
| Results count | **off** | on |
| Color swatches on cards | **off** | on |
| Devices/Accessories category nav (mobile tabs + desktop groups) | **off** (`category_filters` blank) | on |
| Metafield-driven banner + sale `custom_liquid` blocks | **not present** — plain stock banner instead | present (separate enabled section) |
| Trailing video section | **present** | not present |
| Products per page | 32 | 24 |

## 7. Dependencies
- **Collection assignment (REQUIRED):** this file only renders when a collection has **Theme template → `collection.skin-shop`** assigned in Admin. The strongest candidate is the collection with handle **`legacy-skin-shop`** — it's the target of the "SHOP Skins" button in `product-core-prompt.md` (`shopify://collections/legacy-skin-shop`) and of the "Change the Skin, keep the CORE" banner. **Confirm with me which collection handle should carry the `skin-shop` template suffix** before assigning it — do not assume the handle matches the suffix name.
- **Video file:** `core_web_skins.webm` → Content → Files (shared with `index-homepage-prompt.md` / `product-core-prompt.md`; upload once).
- **Collection's own Image** (Admin → Collection → Image) — the banner uses `collection.image` directly, so it must be set per-collection or the banner renders with no image.
- **Shared snippets** (already required by `collection-prompt.md`, no new work here): `breadcrumbs`, `collection-grid`, `facets`, `facets-drawer`, `collection-sort`, `collection-facets-active`, `collection-grid-page`, `category-filter-values`, `filter-values`, `filter-price-range`, plus the customized `product-card` the grid renders.
- **Storefront filters** (Admin → Settings → Search & Discovery) — not needed for this template since `show_filters` is off, but keep them enabled globally since `collection.json` still needs them.
- **Apps:** none required directly by this template (Loox stars come via the product-card, same as the standard collection).

## 8. Report back
- Confirm all 3 sections resolved as stock 4.2 types (report any renamed/removed settings) and JSON is valid.
- Confirm the banner (`main-banner`) is **enabled** and uses `collection.image`/`collection.title`/`collection.description` — no metafields.
- Confirm the grid renders **without** any filter sidebar/drawer, sort dropdown, results count, or category tabs — just breadcrumb + product cards, 32 per page, load-more pagination.
- Confirm the trailing **video** section renders full-width with the `core_web_skins.webm` file (or the YouTube fallback if not yet uploaded).
- Confirm which collection (handle) has the `skin-shop` template suffix assigned, and that its own Image is set in Admin.
- Flag if any setting key differs from 4.2's `main-collection-banner` / `main-collection-grid` / `video` schemas.

---

## FULL `templates/collection.skin-shop.json` — copy verbatim

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
    "main-banner": {
      "type": "main-collection-banner",
      "settings": {
        "full_width": true,
        "enable_transparent_header": false,
        "show_collection_title": true,
        "show_collection_description": true,
        "show_collection_image": true,
        "use_original_media_size": false,
        "banner_spacing": 400,
        "heading_size": "h0",
        "text_alignment": "md:content-bottom-left",
        "text_alignment_mobile": "content-bottom-left",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "rgba(0,0,0,0)",
        "heading_color": "rgba(0,0,0,0)",
        "overlay_color": "#000000",
        "overlay_opacity": 45,
        "overlay_type": "gradient",
        "heading_html_tag": "h1"
      }
    },
    "main-product-grid": {
      "type": "main-collection-grid",
      "settings": {
        "products_per_row": 4,
        "products_per_row_mobile": "products-collection-grid--mobile-two-col",
        "space_between_products": "block-spacing-normal",
        "include_collection_url": false,
        "products_per_page": 32,
        "pagination_type": "load-more",
        "filter_type": "drawer",
        "show_filters": false,
        "show_filter_match_count": false,
        "show_filter_values_with_no_matches": false,
        "enable_color_swatches": false,
        "show_selected_filter_type": false,
        "show_sort_by": false,
        "show_results_count": false,
        "default_open_filters": 4,
        "background_color": "rgba(0,0,0,0)",
        "text_color": "rgba(0,0,0,0)"
      }
    },
    "video_FKw3cT": {
      "type": "video",
      "name": "t:sections.video.presets__0.name",
      "settings": {
        "full_width": true,
        "video": "shopify://files/videos/core_web_skins.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "image_size": "media--ratio-16-9",
        "subheading": "",
        "heading": "",
        "heading_size": "h2",
        "content": "",
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": "",
        "heading_html_tag": "p"
      }
    }
  },
  "order": [
    "main-banner",
    "main-product-grid",
    "video_FKw3cT"
  ]
}
```
