# Migration Prompt — Wholesale Page

> **Prerequisite:** run `button-block-prompt.md` FIRST — the "Apply for Wholesale" popups depend on the customized `button` block/snippet.
> Paste everything below (from the `---` line) into the Claude Code session running on the **new Essence 4.2 store**.

---

Recreate my **Wholesale page** from my Essence 4.1 store onto this Essence 4.2 theme. It's a page template (`templates/page.wholesale.json`) built from **4 custom wholesale sections** + shared/stock sections. All section styling is inline in each section's `{% style %}` / `<style>` — **there is no wholesale CSS in `main.css`**, so nothing to add there.

## 1. Port these custom sections (each carries its own inline CSS)
Create/verify these against 4.2; report any schema issues:

- `sections/wholesale-partner.liquid` — "Why Partner With AirVape?" benefit grid (2-per-row, 5th centered). `benefit` blocks with `icon_image` (SVG file) + `icon_width` + title + text.
- `sections/wholesale-process.liquid` — numbered steps; `step` blocks have `number`, **`heading`**, `title`, `text`. Section has `number_bg_color` + `accent_color`.
- `sections/wholesale-who-can-apply.liquid` — used **twice** (eligibility grid + "Documents Required"). `partner_type` blocks with the flexible **icon_type** selector (`preset` / `image` / `svg`), `icon_size` + `icon_size_custom`, plus a footer CTA (`show_footer`, `footer_heading`, Hulk-form popup button via the shared `button` snippet), `show_note` / `note_text`, `small_line`. Renders `{% render 'section-header', button: false %}` and `{% render 'button', target: section %}`.
- `sections/wholesale-requirement.liquid` — "Wholesale Requirements" cards; `requirement` blocks with `number`, `title`, `content`, `chips` (newline-separated), `note`, `badge`.

**Also required (shared, likely already ported for other pages):**
- `sections/faq-accordion.liquid` (+ `faqs` blocks) — same section used on the affiliate page.
- `sections/featured-collection.liquid` — with the `custom_class` setting (covered in the product-card / featured-collection prompt).

## 2. Shared snippet dependencies
These sections all render stock Essence snippets — confirm they exist in 4.2 (they should): `section-bg-number-vars`, `get-content-width`, `section-attrs`, `section-header`, `section-content`.

**Critical:** they also use the customized **`button` snippet + `button` block** that supports the **Hulk form popup** (`enable_form_popup`, `hulk_form_id_block`, `hulk_form_popup_class`). This is the same customization from the button-block prompt — make sure that's applied **first**, or the "Apply for Wholesale" popup buttons won't work. The button block is used inside `image-with-text`, `rich-text`, and the wholesale-who-can-apply footer.

## 3. Template `templates/page.wholesale.json`
**Copy it verbatim from my theme** (it has large inline SVGs in the `partner_type` blocks — don't retype). Copying preserves section order and all `disabled` flags. Structure (order array):

| # | Section | Type | State |
|---|---|---|---|
| 1 | image-with-text-overlay | stock | hero (`Whole_Sale.webp` / `_Mob`) |
| 2 | image-with-text | stock | intro + Hulk popup button (`wholesale_anim…gif`) |
| 3 | wholesale-partner ⚑ | custom | 5 benefits (SVG icon files) |
| 4 | wholesale-process ⚑ | custom | 3 steps, dark bg |
| 5 | featured-collection | custom | product carousel |
| 6 | wholesale-who-can-apply ⚑ | custom | "Who Can Apply?" |
| 7 | wholesale-requirement ⚑ | custom | requirements cards |
| 8 | wholesale-who-can-apply ⚑ | custom | "Documents Required" + footer CTA |
| 9–15 | main + 5 rich-text + faq-accordion + rich-text | mixed | `main` and the 5 rich-text duplicates are **`disabled: true`** (plain-text fallbacks of the custom sections); `faq-accordion` + final `rich-text` CTA are enabled |

After copying, fix the store-specific references below.

## 4. Store-specific dependencies to set up on the new store
- **Page + template:** create a Page with handle **`wholesale`** using the **`page.wholesale`** template.
- **Images → Content → Files** (same filenames):
  - Hero: `Whole_Sale.webp`, `Whole_Sale_Mob.webp`
  - Intro animation: `wholesale_anim_82844121-d17a-4edb-af89-a01d00fd64b0.gif` (re-upload; the filename hash will differ — update the `image` ref to the new file)
  - wholesale-partner SVG icons: `Premium_Product_Range.svg`, `Competitive_Wholesale_Pricing.svg`, `Volume-Based_Pricing.svg`, `International_Shipping_Support.svg`, `Marketing_Support.svg`
  - (who-can-apply blocks use **inline** `custom_svg`, so no icon files needed there.)
  - All `shopify://shop_images/…` refs must be re-uploaded to the new store's Files or they'll break.
- **Hulk form:** every "Apply for Wholesale" button uses Hulk form ID **`5SFE79Cjl2RbLpVX9hGo4A`** (in `hulk_form_id_block`). Replace with the **new store's** Hulk form ID, and confirm the **Hulk Form Builder** app + app-embed is installed/enabled.
- **Products** (featured-collection) — handles must exist: `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.

## 5. Report back
- Which custom sections/snippets already existed vs. were created; any setting/enum invalid under 4.2.
- Confirmation the **button block Hulk-popup** customization is in place (buttons depend on it).
- JSON validity of `templates/page.wholesale.json` and that `disabled` states / order were preserved.
- The "must create" checklist: `wholesale` page, the 7 image/SVG files, the new Hulk form ID substitution, and any missing product handles.

---

## Notes (for you, not part of the paste)
1. **Order the button-block prompt before this one** — the wholesale "Apply" buttons and the intro-section CTA all ride on that customized `button` block/snippet.
2. The template keeps **5 disabled `rich-text` duplicates** that mirror the custom sections in plain text (a fallback if a custom section ever fails). They're harmless and copy over automatically.
