# Migration Prompt — Product Template: ENSŌ Open Box / Refurb (`product.enso-open-box.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt, the **sticky-add-to-cart** prompt, the **sticky-media-gallery** prompt, and the **hulk-form-modal-fix** prompt (three buy buttons use the Hulk form-popup trigger class). Also port the base **ENSŌ** template first (`product-enso-prompt.md`) — this variant reuses its shared `assets/main-product.css`, its Loox app blocks, and several of the same media files (e.g. `web_enso_taste_v1_smaller.webm`). Assign this template (suffix **`enso-open-box`**) to the ENSŌ Open Box / Refurbished product in Admin.
> This is the **open-box / refurb** variant of the ENSŌ PDP: a **simplified buy box** (no metafield-driven accordions, no hook text), a **cosmetic-damage disclaimer + slideshow**, a run of accessory cross-sell blocks (herb cup, wax pad, glass wax cup), a **fully-enabled** "How to use your ENSŌ" CTA, Shopify's native **related-products** recommendations, a featured collection, and FAQs. **Every section and block in this template is enabled — there are zero `"disabled": true` flags anywhere in the JSON** (confirmed by grep), which is a real behavioral difference from the base ENSŌ and CORE templates (both of which carry several disabled fallback sections/blocks). Copy the JSON verbatim, port the shared CSS, create the one metafield it needs, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.enso-open-box.json` — preserve section order, all block settings, and the header comment. (There are no `"disabled": true` flags to preserve here — don't add any.)
2. Port `sections/main-product.liquid` + **`assets/main-product.css`** — this is the **same shared file** already documented/embedded verbatim in `product-core-prompt.md` §5 and confirmed identical for `product-enso-prompt.md` §5. Don't re-embed it here; just confirm it's already ported. For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **one metafield** this template needs (§6) — `custom.faqs`, or the FAQS section is empty. Unlike CORE/ENSŌ, **this buy box does not read any product metafields** — no hook text, no metafield-driven accordions.
4. Re-upload **images/video** (§7) and assign the **`enso-open-box`** template to the ENSŌ Open Box product.
5. This template uses Shopify's native **`related-products`** section (§1 row 12) — a different mechanism from the manual-list `featured-collection` sections used elsewhere on the site. It pulls Shopify's own product-recommendations, not a hardcoded product list. Don't substitute a `featured-collection` for it.
6. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (14) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + simplified buy box + sticky ATC) — §3 |
| 2 | `177511110279703fb7` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews (limit **20**, maxwidth 1080) |
| 3 | `rich_text_78rfQd` | rich-text | on | disclaimer heading: "See some examples of the cosmetic damages in the slideshow BELOW" — §4 |
| 4 | `slideshow_ft8bWp` | slideshow | on | 4-image slideshow of cosmetic-damage examples (no text/buttons) |
| 5 | `video_with_text_overlay_h6aGCA` | video-with-text-overlay | on | "A Modern Twist on a Classic Ritual" — **enabled**, no fallback pair (differs from base ENSŌ) |
| 6 | `image_before_after_NAGAWD` | image-before-after | on | "What difference a few minutes can make" before/after slider (identical to base ENSŌ) |
| 7 | `image_with_text_xfbNRK` | image-with-text | on | "Ceramic cups" |
| 8 | `image_with_text_qqVEgb` | image-with-text | on | "Herb Cup for ENSŌ" → **Buy Herb Cup** button (open-box-only section, not in base ENSŌ) |
| 9 | `image_with_text_AJaKtP` | image-with-text | on | "For Wax…" → **Buy Wax Pad** button |
| 10 | `image_with_text_R8h4eM` | image-with-text | on | "Glass Wax cup" → **Buy Glass Wax Cup** button (open-box-only section, not in base ENSŌ) |
| 11 | `image_with_text_overlay_UQAiCG` | image-with-text-overlay | on | "How to use your ENSŌ" — **all 5 sub-blocks enabled**, both CTA buttons live (differs from base ENSŌ, where this half is disabled) |
| 12 | `related_products_pTDqkt` | **related-products** (native) | on | "YOU MAY ALSO LIKE" — Shopify product recommendations, not a manual list |
| 13 | `featured_collection_4YxahJ` | featured-collection ⚑ | on | "OUR SIGNATURE MODELS" carousel (manual product list) |
| 14 | `product_faqs_nrKCWd` | product-faqs ⚑ | on | "FAQS" accordion |

**No disabled sections or blocks exist anywhere in this template** — confirmed by grepping the full JSON for `"disabled"` (zero matches). Preserve that: don't disable anything, and don't add fallback pairs that don't exist here.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (shared/identical file — already embedded verbatim in `product-core-prompt.md` §5; confirm it's ported, don't re-embed). It loads `main-product.css` via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- **No `custom-section` wrapper, `product-meta-shorts`, or `ai_gen_block_657f32b` image slider is used anywhere in this template** — unlike CORE and base ENSŌ, this variant has no custom video-carousel or image-slider blocks. The "slideshow" of cosmetic-damage photos (§1 row 4) is the **stock Essence `slideshow` section**, not a custom block.
- `sections/rich-text.liquid` (stock) — hosts the disclaimer heading (§4).
- `sections/product-faqs.liquid` (FAQ accordion from a product metafield).
- `sections/featured-collection.liquid` (shared customized featured collection).
- `sections/related-products.liquid` — **confirm this stock Shopify section exists in 4.2** (native product-recommendations, distinct from the customized `featured-collection`).
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**, same as CORE/ENSŌ).
- Buy-box block snippets (all stock, rendered by `product-info.liquid`): `custom_badges`, `title`, `price`, `text`, `payment_installments`, `variant_picker`(+radio/**`radio-swatch`** — ⚠️ note this, not `radio-image` as in CORE/ENSŌ), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.
- **Hulk form modal**: three buttons (`image_with_text_qqVEgb`'s "Buy Herb Cup", `image_with_text_AJaKtP`'s "Buy Wax Pad", `image_with_text_R8h4eM`'s "Buy Glass Wax Cup") all carry `hulk_form_popup_class: "hulk-form-modal-custom-trigger"` with `enable_form_popup: false` and blank `hulk_form_id_block` — each button links straight to its product. The Hulk trigger class is present but inert on all three, same pattern as base ENSŌ. See the **hulk-form-modal-fix** prompt for what that class does if/when any popup is re-enabled.

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          ⚠️ DIFFERS FROM CORE/ENSŌ (both 56) — media column is only 50% of page width on desktop
media_size: ""                   ⚠️ DIFFERS FROM CORE/ENSŌ ("1") — media size setting is blank/unset here
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image (same as CORE/ENSŌ)
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: false
media_enable_video_looping: true
media_fit_height: true           (same as ENSŌ; CORE uses false)
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** same mechanism as CORE/ENSŌ — `carousel_vertical` renders a `<scroll-carousel vertical>` thumbnail rail + `<media-carousel>` main stage, sticky media column, `media_zoom: lightbox` fullscreen zoom, mobile swipeable carousel with thumbnail indicator, mobile title+reviews render above the gallery. Verify the narrower `desktop_media_width: 50` (vs. 56 elsewhere) and blank `media_size` render correctly — flag if `media_size: ""` behaves differently from `"1"` in 4.2's schema (may just mean "use theme default"). Full mechanics in the **sticky-media-gallery** prompt.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; centered; same as CORE/ENSŌ. Full spec in the **sticky-add-to-cart** prompt.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order` (14 blocks — **far fewer than CORE's 24 or ENSŌ's 24**). **Bold = custom/notable. No block in this list is disabled.**
1. `custom_badges` — product badge row. Enabled (same as base ENSŌ; CORE disables the equivalent block).
2. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`. Shows the product name.
3. `loox_rating` (Loox **app block**) — same settings as CORE/ENSŌ (`contentSize 16`, `[rating] ([count])`, floating widget, empty-rating widget). Hidden on mobile inside the buy box by shared `main-product.css` (same rule as CORE/ENSŌ).
4. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
5. **`text`** "Customers outside the US and Canada **visit ensoshisha.eu**" → `https://ensoshisha.eu/`. **Shown** — identical copy/link to base ENSŌ's EU redirect.
6. `payment_installments` — Shop Pay installments messaging.
7. `variant_picker` — `type: radio`, **`color_picker_type: "radio-swatch"`** ⚠️ (CORE/ENSŌ use `"radio-image"` — this template shows plain color swatches, not image swatches), `block_style: outlined`, rounded. `hide_sold_out_variants: false`.
8. **`text`** "Due to high demand, expect ENSŌ's shipping to take approximately **3 weeks**" — **⚠️ ENABLED here** (the identical-copy block is `disabled` in base ENSŌ). Confirm this is intentional for the open-box variant.
9. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (no Buy-it-now/express buttons), `show_gift_card_recipient: false`.
10. `delivery` — `delivery_from: 3` / `delivery_to: 5` → "Receive by …" estimate.
11. **`icon_text_block` (`icon-text-pdp`, inline)** — same 5 trust icons as CORE/ENSŌ: "30 Days Return", "Lifetime Warranty Ltd.", "Free Delivery 100+ USD", "Hassle-Free Shipping", "Secure Transaction".
12. **`description`** — **⚠️ ENABLED here** (`collapse_content: true`, `collapse_open: true` — starts **OPEN**, unlike every closed accordion elsewhere on the site). This is the **stock product-description accordion**, not a metafield block — it renders `product.description`. Both the enabled state and the open-by-default state differ from CORE (disabled) and base ENSŌ (disabled, and its JSON `collapse_open: true` was moot while hidden — here it's live).
13. **`collapsible_content`** "Why Choose AirVape?" → **hardcoded HTML** (identical long copy to CORE/ENSŌ — no metafield). `collapse_open: false` (closed).
14. `share_button` — native share.

**What's absent vs. CORE/ENSŌ:** no `rich_text_block` hook-text metafield block, no "UpGrade to the ENSŌ" upsell text link, and **none** of the six metafield-driven `collapsible_content` accordions (Description/Specifications/What's in the box/How to use/Accessories/Warranty and Support) or the disabled "The Stōry" accordion — this buy box is metafield-free aside from the FAQs section below it.

## 4. Content sections below the PDP — behaviors & hidden bits
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — `limit: 20` ⚠️ (much higher than CORE's 4 or ENSŌ's 5), `maxwidth: 1080`, not aggregated, thumbnails shown.
- **rich-text** — a single `heading` block, **verbatim**: `"See some examples of the cosmetic damages in the slideshow BELOW"` (`heading_size: h3`, `heading_html_tag: p`, `text_alignment: text-center mx-auto`, `content_alignment: mx-auto`, `content_width: normal`). This is the open-box disclaimer copy — it sets up the slideshow immediately below. **Keep this text exactly as-is; it's the only disclaimer/condition-notice copy in the template.**
- **slideshow** — 4 slide blocks, **images only, no heading/text/buttons on any slide**: `MCD_h1.png`, `WhatsApp_Image_2024-10-17_at_17.05.43_a696a88e.jpg`, `MCD_h2.png`, `WhatsApp_Image_2024-10-17_at_17.05.43_2a2629fd.jpg`. `autoplay: true`, `speed: 5`, `height: 700`, `controls: arrows`, `background_animation: ZoomOut`, `content_animation: AppearLineByLine`, `background_color: #262626`, each slide `overlay_opacity: 30` (solid black) even though there's no text to protect. These are the actual "cosmetic damage" reference photos the rich-text section points to.
- **video-with-text-overlay** "A Modern Twist on a Classic Ritual" — **enabled**, subheading "ENSŌ" (also enabled — unlike base ENSŌ where the matching subheading is disabled). Video `shopify://files/videos/web_enso_taste_v1_smaller.webm` (same file as base ENSŌ's disabled video-with-text-overlay — already needs uploading from that migration). `min_height: 500`, `overlay_opacity: 35`. Copy is **open-box-specific**, not the base ENSŌ copy: *"Embracing the future means embracing the electric revolution. This modern twist on a centuries-old tradition offers not only coal-free heating but also enhanced convenience and a sleek, minimalist design."* **There is no paired fallback image-with-text-overlay section here** — the video plays directly with no disabled counterpart, unlike every other video/image fallback pair seen on CORE and base ENSŌ.
- **image-before-after** "What difference a few minutes can make" — `before_357us_web.jpg` / `after_420us_web.jpg`, subheading "Use the slider, left and right, to see", white handle color. **Identical settings to base ENSŌ's equivalent section** (same images).
- **image-with-text** "Ceramic cups" — subheading "Your ENSŌ works amazingly with loose-leaf", image **`Mesh_screen_enso_pr_img_cup.png`** ⚠️ (a *different* image than base ENSŌ's `tobaco-nicotine-free-ceramic.png` for the same heading/copy), `image_position: left`, `image_width: 50`, `text_alignment: text-right`, `remove_bottom_spacing: true`. Text: *"Ceramic cups (included in the kit) are a great way to use your ENSŌ to vaporize dry herbs. Just insert the mesh screen on the bottom and pack with ground herbs. Suggested for medium and heroic doses (up to 3 grams). For metal chamber enthusiast who prefer the gold-plated chamber we suggest the Herb cup for ENSŌ (for medium doses up to 1.5 grams) ***Not included in the kit."*
- **image-with-text** "Herb Cup for ENSŌ" — **section not present in base ENSŌ; open-box-only.** Image `Gold_herb_cup_pr_img_mesh.png`, `image_position: right`. Text: *"The Herb cup (not included in the kit) is suggested for medium doses up to 1.5 grams)."* Button **"Buy Herb Cup"** (`button-outline`) → `shopify://products/enso-herb-cup` (Hulk trigger class present, inert).
- **image-with-text** "For Wax - use the ceramic cups with the ENSŌ wax pad" — image `WaxPad_enso_pr_img_cup.png`, `image_position: left`. Text 1: *"You can you the ENSŌ wax pad for waxes and oils/concentrates (not included in the kit)."* Button **"Buy Wax Pad"** (`button-outline`) → `shopify://products/wax-pad-for-enso` (Hulk trigger class present, inert). Text 2 (after the button): *"Or if you prefer a glass chamber for your wax we suggest the Glass Wax cup for ENSŌ."*
- **image-with-text** "Glass Wax cup" — **section not present in base ENSŌ; open-box-only.** Image `Glass_wax_cup1.png`, `image_position: right`. Text: *"You can you the ENSŌ glass wax cup for waxes and oils/concentrates (not included in the kit)."* Button **"Buy Glass Wax Cup"** (`button-outline`) → `shopify://products/enso-glass-wax-cup` (Hulk trigger class present, inert).
- **image-with-text-overlay** "How to use your ENSŌ" — **all 5 sub-blocks enabled** (⚠️ differs from base ENSŌ, where this identical CTA content exists but is entirely disabled): subheading "FIND OUT", heading "How to use your ENSŌ", text *"Browse the User Guide to get all the necessary information about your ENSŌ and how to use it or watch the tutorial videos."*, and two live buttons — **"User Guide"** → `shopify://pages/enso-user-guide` and **"how to videos"** → `shopify://pages/enso-how-to-videos` (both `button-outline`, white background). Settings: `fit_image: true`, `enable_transparent_header: true`, `use_original_media_size: true`, image `web_support-6290_430x_bd914f99-8fd9-40c9-9bea-d59b7911fae8.png`, `content_alignment: md:content-middle-left` / `content-middle-left`, `min_height: 500`, `overlay_opacity: 50`. **Because these buttons are live here, the two target pages must actually exist and be published** (they were optional/dormant in the base ENSŌ migration).
- **related-products** "YOU MAY ALSO LIKE" — Shopify's **native product-recommendations** section (`related-products`, not `featured-collection`). `carousel: true`, `products_count: 8`, `grid_columns: 4`, `grid_columns_mobile: 2`. No manual product list or collection setting — recommendations are computed by Shopify (or the app powering `product-recommendations`) at render time; nothing to seed here besides confirming the section type exists in 4.2 and renders with these display settings.
- **featured-collection** "OUR SIGNATURE MODELS" — carousel, 8 slots, manual product list: `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus` (7 products; does **not** include `enso` itself — same list as base ENSŌ's equivalent section). `collection: ""`.
- **product-faqs** "FAQS" — accordion from `custom.faqs`. Empty without the metafield.

## 5. `assets/main-product.css`
Shared/identical file to the one embedded verbatim in `product-core-prompt.md` §5 — same `.icon-text-block--inline`/`--vertical` layouts, `.qty-wrap`, buy-box `.loox-rating` mobile-hide rule, comparison-card rating weight, payment list, restock-notify button styling. No open-box-specific override exists in this template's JSON (no section-level `custom_css` anywhere — confirmed by grep). Port that one file; do not duplicate it.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — namespace `custom`
Without this, the matching section is **empty**:
| Key | Type | Used by |
|---|---|---|
| `faqs` | (per product-faqs schema) | FAQS accordion |

That's the **only** metafield this template depends on. Unlike CORE/ENSŌ, this buy box has **no** `hook_text`, `description`, `specifications`, `what_s_in_the_box`, `how_to_use`, `parts_accessories`, or `lifetime_waranty` metafield references anywhere — every buy-box block here is either stock (`title`, `price`, `description` = `product.description`) or hardcoded text.

## 7. Media, apps, collections, products, pages
- **Images → Content → Files:** `MCD_h1.png`, `MCD_h2.png`, `WhatsApp_Image_2024-10-17_at_17.05.43_a696a88e.jpg`, `WhatsApp_Image_2024-10-17_at_17.05.43_2a2629fd.jpg` (cosmetic-damage slideshow), `Mesh_screen_enso_pr_img_cup.png`, `Gold_herb_cup_pr_img_mesh.png`, `WaxPad_enso_pr_img_cup.png`, `Glass_wax_cup1.png`, `web_support-6290_430x_bd914f99-8fd9-40c9-9bea-d59b7911fae8.png`, plus the shared buy-box icons `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg` (likely already uploaded from the CORE/ENSŌ migrations). Grep the JSON for `shopify://shop_images` to catch all.
- **Hardcoded/old-CDN URLs: none found.** Grepped the full template JSON for `cdn.shopify.com` and `http` — the only external URLs present are the `https://ensoshisha.eu/` link (buy-box text block) and a `https://www.youtube.com/watch?v=_9VUPq3SxOc` `video_url` reference on the video-with-text-overlay section (standard YouTube fallback link pattern used across all PDPs, not a media asset). **Unlike base ENSŌ's `custom_liquid_tPwXGU` comparison block, this template has no absolute old-store CDN image URLs to re-host.**
- **Videos → Content → Files:** `web_enso_taste_v1_smaller.webm` — same filename as base ENSŌ's (disabled) video-with-text-overlay; if that migration already uploaded it, reuse it here (it's **enabled and visible** on this template, so verify it actually plays).
- **Apps:** **Loox** (buy-box rating app-block + dynamic reviews app-block, limit 20 here). Re-add both after installing Loox; app-block IDs will differ on the new store.
- **Collections:** none referenced by this template (the `related-products` section has no collection setting; `featured-collection` here uses a manual product list with `collection: ""`).
- **Products (buttons + featured collection):** `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`, `enso-herb-cup` (Buy Herb Cup target), `wax-pad-for-enso` (Buy Wax Pad target), `enso-glass-wax-cup` (Buy Glass Wax Cup target) — all must exist.
- **Pages:** `shopify://pages/enso-user-guide` and `shopify://pages/enso-how-to-videos` — **both buttons are LIVE on this template** (unlike base ENSŌ where the equivalent buttons are disabled), so both pages **must exist and be published**, not just created for parity.
- **Product media:** upload the ENSŌ Open Box product's own gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
- **Nothing is disabled anywhere in this template** — no disabled sections, no disabled blocks, no disabled sub-blocks. Confirmed by grepping the full JSON for `"disabled"` (zero matches). This is a deliberate contrast with CORE and base ENSŌ, both of which hide several video sections behind enabled image fallbacks and disable multiple buy-box accordions.
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px) — shared rule from `main-product.css`, same as CORE/ENSŌ. This is the only "hidden" behavior anywhere on this template, and it comes from the shared stylesheet, not this template's own JSON.
- The single `collapsible_content` accordion ("Why Choose AirVape?") starts **closed** (`collapse_open: false`); the stock `description` block starts **open** (`collapse_open: true`) — don't normalize these to match each other, they're intentionally different defaults.
Keep all of the above exactly.

## 9. Report back
- Confirm the `enso-open-box` template is assigned; JSON valid; confirm **zero** disabled flags exist (don't accidentally disable anything while porting).
- Confirm `main-product.css` (shared with CORE/ENSŌ) loads, the buy-box `.loox-rating` hides on mobile, and the `icon-text-pdp` inline trust row renders — note there is **no** `homepage-usps-info` vertical block on this template (unlike CORE/ENSŌ).
- Confirm the **sticky vertical media gallery** + lightbox zoom work with the narrower `desktop_media_width: 50` and blank `media_size` setting, and the **centered sticky add-to-cart** slides in on scroll.
- Confirm the `variant_picker` renders **plain color swatches** (`radio-swatch`), not image swatches — this differs from CORE/ENSŌ.
- Confirm the rich-text disclaimer + slideshow render together as the intended "see the cosmetic damage examples" flow, and that the video-with-text-overlay plays (it has no fallback image if the video fails to load, unlike other PDPs).
- Confirm all three Hulk-trigger buttons (Buy Herb Cup / Buy Wax Pad / Buy Glass Wax Cup) link to their respective products, and the trigger class is present but inert.
- Confirm both "User Guide" and "how to videos" buttons work and both target pages are published (they're live here, not dormant).
- Confirm the native `related-products` section renders recommendations (distinct from the manual `featured-collection` below it), and that `custom.faqs` exists so FAQS isn't empty.

---

## FULL `templates/product.enso-open-box.json` — copy verbatim

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
      "type": "main-product",
      "blocks": {
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7": {
          "type": "title",
          "settings": {
            "heading_size": "h4",
            "mobile_heading_size": "h5",
            "content": "{{ product.title }}",
            "text_color": "rgba(0,0,0,0)"
          }
        },
        "loox_reviews_loox_rating_JDFnCq": {
          "type": "shopify://apps/loox-reviews/blocks/loox-rating/5c3b337f-fd14-4df5-b1d6-80ec13e6e28e",
          "settings": {
            "contentSize": 16,
            "pattern": "[rating] ([count])",
            "hideText": false,
            "alignment": "",
            "layout": "",
            "textColor": "",
            "starColor": "",
            "showAllReviews": false,
            "looxOpenFloatingWidget": true,
            "emptyRatingWidget": true
          }
        },
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e": {
          "type": "price",
          "settings": {
            "show_taxes_notice": false,
            "use_bold_font": true
          }
        },
        "text_r6YQPE": {
          "type": "text",
          "settings": {
            "content": "<p>Customers outside the US and Canada <a href=\"https://ensoshisha.eu/\" title=\"https://ensoshisha.eu/\">visit ensoshisha.eu</a></p>"
          }
        },
        "4923f5c8-62d3-42db-a835-6e0613c4a182": {
          "type": "payment_installments",
          "settings": {}
        },
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f": {
          "type": "variant_picker",
          "settings": {
            "hide_sold_out_variants": false,
            "type": "radio",
            "color_picker_type": "radio-swatch",
            "block_style_rounded": true,
            "block_style": "outlined",
            "size_chart_page": "",
            "size_chart_option_name": "Size"
          }
        },
        "text_xQ6jUh": {
          "type": "text",
          "settings": {
            "content": "<p>Due to high demand, expect ENSŌ's shipping to take approximately <strong>3 weeks</strong></p>"
          }
        },
        "qty_btn_selector_GVRPCt": {
          "type": "qty_btn_selector",
          "settings": {
            "show_dynamic_checkout_buttons": false,
            "show_gift_card_recipient": false,
            "add_to_cart_background_color": "",
            "add_to_cart_text_color": "",
            "buy_it_now_background_color": "",
            "buy_it_now_text_color": ""
          }
        },
        "delivery_xRecdf": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_kHAtNg": {
          "type": "icon_text_block",
          "settings": {
            "icon_text_class": "icon-text-pdp",
            "layout": "inline",
            "icon_1": "shopify://shop_images/icon-02.svg",
            "text_1": "<p>30 Days<br/>Return</p>",
            "icon_2": "shopify://shop_images/icon-01.svg",
            "text_2": "<p>Lifetime<br/>Warranty Ltd.</p>",
            "icon_3": "shopify://shop_images/icon_Delivery-1.svg",
            "text_3": "<p>Free Delivery<br/>100+ USD</p>",
            "icon_4": "shopify://shop_images/icon_Delivery-1.svg",
            "text_4": "<p>Hassle-Free<br/>Shipping</p>",
            "icon_5": "shopify://shop_images/icon_Secure.svg",
            "text_5": "<p>Secure<br/>Transaction</p>",
            "icon_size": 80,
            "text_size": 14,
            "text_color": "#000000"
          }
        },
        "description_jfp4NG": {
          "type": "description",
          "settings": {
            "collapse_content": true,
            "collapse_open": true,
            "heading": "Description"
          }
        },
        "collapsible_content_UnJXe3": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "share_button_VjbYte": {
          "type": "share_button",
          "settings": {}
        },
        "custom_badges_pdp": {
          "type": "custom_badges",
          "settings": {}
        }
      },
      "block_order": [
        "custom_badges_pdp",
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_JDFnCq",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "text_r6YQPE",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "text_xQ6jUh",
        "qty_btn_selector_GVRPCt",
        "delivery_xRecdf",
        "icon_text_block_kHAtNg",
        "description_jfp4NG",
        "collapsible_content_UnJXe3",
        "share_button_VjbYte"
      ],
      "settings": {
        "show_breadcrumbs": false,
        "desktop_media_width": 50,
        "media_size": "",
        "media_layout_desktop": "carousel_vertical",
        "media_mobile_indicator": "thumbnails",
        "media_zoom": "lightbox",
        "media_enable_video_autoplay": false,
        "media_enable_video_looping": true,
        "media_fit_height": true,
        "show_sticky_add_to_cart": true,
        "sticky_add_to_cart_position": "center",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "",
        "heading_color": ""
      }
    },
    "177511110279703fb7": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_BWhy99": {
          "type": "shopify://apps/loox-reviews/blocks/loox-dynamic-section/5c3b337f-fd14-4df5-b1d6-80ec13e6e28e",
          "settings": {
            "reviews_to_display": "",
            "default_tab": "automatic",
            "only_photos": false,
            "aggregated": false,
            "limit": 20,
            "hide_thumbnails": false,
            "maxwidth": 1080,
            "is_sample": true
          }
        }
      },
      "block_order": [
        "loox_reviews_loox_dynamic_section_BWhy99"
      ],
      "settings": {
        "full_width": true,
        "remove_horizontal_space": false,
        "remove_vertical_space": false,
        "subheading": "",
        "heading": "WHY DO PEOPLE LOVE AIRVAPE?",
        "heading_size": "h2",
        "text_alignment": "text-center",
        "link_text": "View all",
        "link_url": "",
        "new_tab": false,
        "background_color": "",
        "text_color": ""
      }
    },
    "rich_text_78rfQd": {
      "type": "rich-text",
      "blocks": {
        "heading_pTHBca": {
          "type": "heading",
          "settings": {
            "heading": "See some examples of the cosmetic damages in the slideshow BELOW",
            "heading_size": "h3",
            "heading_html_tag": "p"
          }
        }
      },
      "block_order": [
        "heading_pTHBca"
      ],
      "settings": {
        "full_width": true,
        "content_alignment": "mx-auto",
        "text_alignment": "text-center mx-auto",
        "content_width": "normal",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "slideshow_ft8bWp": {
      "type": "slideshow",
      "blocks": {
        "slide_BnU3Y6": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/MCD_h1.png",
            "content_width_maximum": 640,
            "desktop_content_position": "middle-center",
            "mobile_content_position": "middle-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "",
            "heading_size": "h0",
            "text": "",
            "hide_text_on_mobile": false,
            "button_size": "text-sm md:text-base",
            "custom_liquid": "",
            "button_link": "",
            "button_text": "",
            "button_style": "",
            "button_background_color": "",
            "button_text_color": "",
            "button2_link": "",
            "button2_text": "",
            "button2_style": "",
            "button2_background_color": "",
            "button2_text_color": "",
            "background_color": "",
            "color_text": "#ffffff",
            "overlay_color": "#000000",
            "overlay_opacity": 30,
            "overlay_type": "solid",
            "heading_html_tag": "p"
          }
        },
        "slide_yJJnQk": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/WhatsApp_Image_2024-10-17_at_17.05.43_a696a88e.jpg",
            "content_width_maximum": 640,
            "desktop_content_position": "middle-center",
            "mobile_content_position": "middle-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "",
            "heading_size": "h0",
            "text": "",
            "hide_text_on_mobile": false,
            "button_size": "text-sm md:text-base",
            "custom_liquid": "",
            "button_link": "",
            "button_text": "",
            "button_style": "",
            "button_background_color": "",
            "button_text_color": "",
            "button2_link": "",
            "button2_text": "",
            "button2_style": "",
            "button2_background_color": "",
            "button2_text_color": "",
            "background_color": "",
            "color_text": "#ffffff",
            "overlay_color": "#000000",
            "overlay_opacity": 30,
            "overlay_type": "solid",
            "heading_html_tag": "p"
          }
        },
        "slide_mFAxqK": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/MCD_h2.png",
            "content_width_maximum": 640,
            "desktop_content_position": "middle-center",
            "mobile_content_position": "middle-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "",
            "heading_size": "h0",
            "text": "",
            "hide_text_on_mobile": false,
            "button_size": "text-sm md:text-base",
            "custom_liquid": "",
            "button_link": "",
            "button_text": "",
            "button_style": "",
            "button_background_color": "",
            "button_text_color": "",
            "button2_link": "",
            "button2_text": "",
            "button2_style": "",
            "button2_background_color": "",
            "button2_text_color": "",
            "background_color": "",
            "color_text": "#ffffff",
            "overlay_color": "#000000",
            "overlay_opacity": 30,
            "overlay_type": "solid",
            "heading_html_tag": "p"
          }
        },
        "slide_MKhVyV": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/WhatsApp_Image_2024-10-17_at_17.05.43_2a2629fd.jpg",
            "content_width_maximum": 640,
            "desktop_content_position": "middle-center",
            "mobile_content_position": "middle-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "",
            "heading_size": "h0",
            "text": "",
            "hide_text_on_mobile": false,
            "button_size": "text-sm md:text-base",
            "custom_liquid": "",
            "button_link": "",
            "button_text": "",
            "button_style": "",
            "button_background_color": "",
            "button_text_color": "",
            "button2_link": "",
            "button2_text": "",
            "button2_style": "",
            "button2_background_color": "",
            "button2_text_color": "",
            "background_color": "",
            "color_text": "#ffffff",
            "overlay_color": "#000000",
            "overlay_opacity": 30,
            "overlay_type": "solid",
            "heading_html_tag": "p"
          }
        }
      },
      "block_order": [
        "slide_BnU3Y6",
        "slide_yJJnQk",
        "slide_mFAxqK",
        "slide_MKhVyV"
      ],
      "settings": {
        "full_width": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "autoplay": true,
        "speed": 5,
        "height": 700,
        "controls": "arrows",
        "background_animation": "ZoomOut",
        "content_animation": "AppearLineByLine",
        "background_color": "#262626"
      }
    },
    "video_with_text_overlay_h6aGCA": {
      "type": "video-with-text-overlay",
      "blocks": {
        "subheading_6yPpJh": {
          "type": "subheading",
          "settings": {
            "text": "ENSŌ"
          }
        },
        "heading_8wEkit": {
          "type": "heading",
          "settings": {
            "heading": "A Modern Twist on a Classic Ritual",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_m9gQAi": {
          "type": "text",
          "settings": {
            "text": "<p>Embracing the future means embracing the electric revolution. This modern twist on a centuries-old tradition offers not only coal-free heating but also enhanced convenience and a sleek, minimalist design.</p>"
          }
        }
      },
      "block_order": [
        "subheading_6yPpJh",
        "heading_8wEkit",
        "text_m9gQAi"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "video": "shopify://files/videos/web_enso_taste_v1_smaller.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "content_alignment": "md:content-middle-center",
        "content_alignment_mobile": "content-middle-center",
        "link": "",
        "min_height": 500,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 35,
        "overlay_type": "solid"
      }
    },
    "image_before_after_NAGAWD": {
      "type": "image-before-after",
      "settings": {
        "full_width": true,
        "before_image": "shopify://shop_images/before_357us_web.jpg",
        "after_image": "shopify://shop_images/after_420us_web.jpg",
        "subheading": "Use the slider, left and right, to see",
        "heading": "What difference a few minutes can make",
        "heading_size": "h3",
        "content": "",
        "text_position": "center",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "",
        "heading_color": "",
        "handle_color": "#ffffff",
        "heading_html_tag": "p"
      }
    },
    "image_with_text_xfbNRK": {
      "type": "image-with-text",
      "blocks": {
        "subheading_h7hNDd": {
          "type": "subheading",
          "settings": {
            "text": "Your ENSŌ works amazingly with loose-leaf"
          }
        },
        "heading_iPgaff": {
          "type": "heading",
          "settings": {
            "heading": "Ceramic cups",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_FJxNdH": {
          "type": "text",
          "settings": {
            "text": "<p><strong>Ceramic cups</strong> <em>(included in the kit) </em>are a great way to use your ENSŌ to vaporize dry herbs. Just insert the mesh screen on the bottom and pack with ground herbs. Suggested for medium and heroic doses (up to 3 grams).</p><p></p><p>For metal chamber enthusiast who prefer the <strong>gold-plated chamber</strong> we suggest the <strong>Herb cup for ENSŌ</strong> (for medium doses up to 1.5 grams)<br/><em><br/>***Not included in the kit</em></p>"
          }
        }
      },
      "block_order": [
        "subheading_h7hNDd",
        "heading_iPgaff",
        "text_FJxNdH"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": true,
        "image": "shopify://shop_images/Mesh_screen_enso_pr_img_cup.png",
        "image_size": "",
        "image_position": "left",
        "image_width": 50,
        "text_alignment": "text-right",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "image_with_text_qqVEgb": {
      "type": "image-with-text",
      "blocks": {
        "subheading_rFpka9": {
          "type": "subheading",
          "settings": {
            "text": ""
          }
        },
        "heading_ndKbVm": {
          "type": "heading",
          "settings": {
            "heading": "Herb Cup for ENSŌ",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_RAeyb3": {
          "type": "text",
          "settings": {
            "text": "<p><strong>The Herb cup</strong> <em>(not included in the kit) is suggested </em>for medium doses up to 1.5 grams)<br/><em><br/></em></p>"
          }
        },
        "button_mEJBDY": {
          "type": "button",
          "settings": {
            "enable_form_popup": false,
            "hulk_form_id_block": "",
            "hulk_form_popup_class": "hulk-form-modal-custom-trigger",
            "button_text": "Buy Herb Cup",
            "button_link": "shopify://products/enso-herb-cup",
            "button_style": "button-outline",
            "button_size": "text-xs md:text-sm",
            "button_background_color": "",
            "button_text_color": ""
          }
        }
      },
      "block_order": [
        "subheading_rFpka9",
        "heading_ndKbVm",
        "text_RAeyb3",
        "button_mEJBDY"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": true,
        "image": "shopify://shop_images/Gold_herb_cup_pr_img_mesh.png",
        "image_size": "",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-right",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "image_with_text_AJaKtP": {
      "type": "image-with-text",
      "blocks": {
        "subheading_3aVWrD": {
          "type": "subheading",
          "settings": {
            "text": ""
          }
        },
        "heading_hNffVk": {
          "type": "heading",
          "settings": {
            "heading": "For Wax - use the ceramic cups with the ENSŌ wax pad",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_gtgeT6": {
          "type": "text",
          "settings": {
            "text": "<p>You can you the <strong>ENSŌ wax pad</strong> for waxes and  oils/concentrates <em>(not included in the kit).</em></p>"
          }
        },
        "button_Ukrc6A": {
          "type": "button",
          "settings": {
            "enable_form_popup": false,
            "hulk_form_id_block": "",
            "hulk_form_popup_class": "hulk-form-modal-custom-trigger",
            "button_text": "Buy Wax Pad",
            "button_link": "shopify://products/wax-pad-for-enso",
            "button_style": "button-outline",
            "button_size": "text-xs md:text-sm",
            "button_background_color": "",
            "button_text_color": ""
          }
        },
        "text_F3B3dt": {
          "type": "text",
          "settings": {
            "text": "<p>Or if you prefer a glass chamber for your wax we suggest the Glass Wax cup for ENSŌ </p>"
          }
        }
      },
      "block_order": [
        "subheading_3aVWrD",
        "heading_hNffVk",
        "text_gtgeT6",
        "button_Ukrc6A",
        "text_F3B3dt"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": true,
        "image": "shopify://shop_images/WaxPad_enso_pr_img_cup.png",
        "image_size": "",
        "image_position": "left",
        "image_width": 50,
        "text_alignment": "text-right",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "image_with_text_R8h4eM": {
      "type": "image-with-text",
      "blocks": {
        "subheading_tYfkT6": {
          "type": "subheading",
          "settings": {
            "text": ""
          }
        },
        "heading_xAxftF": {
          "type": "heading",
          "settings": {
            "heading": "Glass Wax cup",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_9eEAx8": {
          "type": "text",
          "settings": {
            "text": "<p>You can you the <strong>ENSŌ glass wax cup</strong> for waxes and  oils/concentrates <em>(not included in the kit).</em></p>"
          }
        },
        "button_4N6gB3": {
          "type": "button",
          "settings": {
            "enable_form_popup": false,
            "hulk_form_id_block": "",
            "hulk_form_popup_class": "hulk-form-modal-custom-trigger",
            "button_text": "Buy Glass Wax Cup",
            "button_link": "shopify://products/enso-glass-wax-cup",
            "button_style": "button-outline",
            "button_size": "text-xs md:text-sm",
            "button_background_color": "",
            "button_text_color": ""
          }
        }
      },
      "block_order": [
        "subheading_tYfkT6",
        "heading_xAxftF",
        "text_9eEAx8",
        "button_4N6gB3"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": true,
        "image": "shopify://shop_images/Glass_wax_cup1.png",
        "image_size": "",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-right",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "image_with_text_overlay_UQAiCG": {
      "type": "image-with-text-overlay",
      "blocks": {
        "subheading_zXgU7M": {
          "type": "subheading",
          "settings": {
            "text": "FIND OUT"
          }
        },
        "heading_DkHdhq": {
          "type": "heading",
          "settings": {
            "heading": "How to use your ENSŌ",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_Ry4Hx8": {
          "type": "text",
          "settings": {
            "text": "<p>Browse the User Guide to get all the necessary information about your ENSŌ and how to use it or watch the tutorial videos.</p>"
          }
        },
        "button_UQQmgX": {
          "type": "button",
          "settings": {
            "button_text": "User Guide",
            "button_link": "shopify://pages/enso-user-guide",
            "button_style": "button-outline",
            "button_size": "text-sm md:text-base",
            "button_background_color": "#ffffff",
            "button_text_color": ""
          }
        },
        "button_dBaV7V": {
          "type": "button",
          "settings": {
            "button_text": "how to videos",
            "button_link": "shopify://pages/enso-how-to-videos",
            "button_style": "button-outline",
            "button_size": "text-sm md:text-base",
            "button_background_color": "#ffffff",
            "button_text_color": ""
          }
        }
      },
      "block_order": [
        "subheading_zXgU7M",
        "heading_DkHdhq",
        "text_Ry4Hx8",
        "button_UQQmgX",
        "button_dBaV7V"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": true,
        "use_original_media_size": true,
        "image": "shopify://shop_images/web_support-6290_430x_bd914f99-8fd9-40c9-9bea-d59b7911fae8.png",
        "content_alignment": "md:content-middle-left",
        "content_alignment_mobile": "content-middle-left",
        "link": "",
        "min_height": 500,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 50,
        "overlay_type": "solid"
      }
    },
    "related_products_pTDqkt": {
      "type": "related-products",
      "name": "t:sections.related-products.presets__0.name",
      "settings": {
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "subheading": "",
        "heading": "YOU MAY ALSO LIKE",
        "heading_size": "h2",
        "content": "",
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": "",
        "heading_html_tag": "p"
      }
    },
    "featured_collection_4YxahJ": {
      "type": "featured-collection",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "products": [
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
    },
    "product_faqs_nrKCWd": {
      "type": "product-faqs",
      "name": "Product Faqs",
      "settings": {
        "full_width": true,
        "remove_horizontal_space": false,
        "remove_vertical_space": false,
        "content_width": "normal",
        "subheading": "",
        "heading": "FAQS",
        "heading_size": "h2",
        "text_alignment": "text-center",
        "link_text": "View all",
        "link_url": "",
        "new_tab": false,
        "heading_html_tag": "p",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    }
  },
  "order": [
    "main",
    "177511110279703fb7",
    "rich_text_78rfQd",
    "slideshow_ft8bWp",
    "video_with_text_overlay_h6aGCA",
    "image_before_after_NAGAWD",
    "image_with_text_xfbNRK",
    "image_with_text_qqVEgb",
    "image_with_text_AJaKtP",
    "image_with_text_R8h4eM",
    "image_with_text_overlay_UQAiCG",
    "related_products_pTDqkt",
    "featured_collection_4YxahJ",
    "product_faqs_nrKCWd"
  ]
}
```
