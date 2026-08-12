# Migration Prompt — Brand Story / About Us Page

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Optional prerequisite: `button-block-prompt.md` (the timeline buttons carry the button-block's Hulk fields, but none use the popup — plain product links only).

---

Recreate my **Brand Story** (About Us) page (`templates/page.brand-story.json`) onto this Essence 4.2 theme. This page is built **entirely from stock Essence sections + the shared `featured-collection` section** — there are **no page-specific custom section files and no CSS in `main.css`**. It's a long visual timeline of the brand (2013 → 2025).

## 1. Sections used (all stock/shared — verify present in 4.2, no code changes)
- `image-with-text-overlay` — hero "{{ page.title }}" (`About_Us_2.webp` / `About_Us_Mob_2.webp`)
- `rich-text` — "About Us" intro
- **~18 `image-with-text` sections** — the year-by-year brand timeline (2013, 2014, 2015 ×3, 2016, 2017 ×2, 2018, 2019 ×2, 2020 ×2, 2021, 2022, 2025). Alternating image position left/right. Several carry a stock `button` block linking to product handles (see §3).
- `rich-text` — closing note
- `rich-text` — "To contact us by Mail" (**disabled**)
- `custom-liquid` — a Hulk form embed (**disabled**, see §2)
- `featured-collection` — "OUR SIGNATURE MODELS" (see §4)
- `main-page` — disabled

## 2. Disabled Hulk `custom-liquid` (note only)
There's a **disabled** `custom-liquid` section holding `<div class="pxFormGenerator" id="412J8y-6QuI3v4OZ3ex_cw"></div>` — that's the **old store's contact Hulk form ID**. It's disabled and doesn't render. If you ever enable it, swap in the new store's Hulk form ID and ensure the Hulk app-embed is on. Otherwise ignore.

## 3. Timeline buttons → product handles must exist
Several `image-with-text` sections have a `button` block (plain link, `enable_form_popup: false`) pointing at products via `shopify://products/…`. These product handles must exist on the new store (some button blocks are disabled):
- `airvape-xs-go`, `x-shell-for-airvape-x`, `airvape-x`, `legacy-pro-2`
If a handle differs on the new store, repoint the `button_link`. (The button blocks include the `enable_form_popup`/`hulk_form_id_block`/`hulk_form_popup_class` keys from my button-block customization, but all are off here — a stock 4.2 button block also works; unknown keys are ignored.)

## 4. Signature-models featured collection
The `featured-collection` here is the shared **"OUR SIGNATURE MODELS"** section. To keep the product set/config identical across pages, you may **copy the `featured-collection` section block from `templates/page.wholesale.json`** and use it here. (Wholesale uses `carousel: false`; this page uses `carousel: true` — keep whichever carousel behavior you prefer, same product handles.) It needs the `custom_class` setting from the product-card/featured-collection prompt.

## 5. Template `templates/page.brand-story.json`
Copy it verbatim (preserves order, block order, `disabled` flags), then fix store-specific references (§6).

## 6. Store-specific dependencies
- **Page + template:** create a Page with handle **`brand-story`** using the **`page.brand-story`** template.
- **Images → Content → Files** — re-upload every `shopify://shop_images/…`. After copying the template, **grep it for `shopify://shop_images` and re-upload each**. Known set includes: `About_Us_2.webp`, `About_Us_Mob_2.webp`, `IMG_4404_copy.jpg`, `IMG_4777.PNG`, `IMG_5359.jpg`, `1stairvape-01.png`, `IMG_7385.JPG`, `next-01.png`, `IMG_3094.jpg`, `airxs_shell12.png`, `AVX_both_1.png`, `X_Shell.jpg`, `Untitled-1-01_2cea2cb0-…png`, `Screen_Shot_2023-12-29_at_3.02.57_PM.png`, `AV_enso_pr_main_f3bd962a-…png`, `h2.png`, `sustain1-01.png`, `PRO2cc_15125c55-…png`, `Newscreen_PRO2.52.png`. Re-point any that get new filename hashes.
- **Product handles** for timeline buttons (§3) + featured-collection products (§4).

## 7. Report back
- Confirm all sections resolved as stock 4.2 sections; `featured-collection` carries the `custom_class` setting.
- JSON validity of the template; order + `disabled` states preserved (esp. the disabled `custom-liquid` and the "contact by Mail" rich-text).
- "Must create" checklist: `brand-story` page, all timeline images, timeline-button product handles, featured-collection product handles.
