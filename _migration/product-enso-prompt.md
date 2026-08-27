# Migration Prompt — Product Template: ENSŌ (`product.enso.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt, the **sticky-add-to-cart** prompt, the **sticky-media-gallery** prompt, the **image-slider (ai_gen_block_657f32b)** notes, and the **hulk-form-modal-fix** prompt (one buy button uses the Hulk form-popup trigger class). Assign this template (suffix **`enso`**) to the ENSŌ product in Admin.
> This documents **every section, every block, every behavior** (what shows, what's hidden/disabled, the sticky media gallery, the sticky add-to-cart, the accordions, the **TWO image sliders**, and the **hardcoded comparison table**), and includes the **full `product.enso.json`** at the bottom.

---

Recreate my **ENSŌ product** page (`templates/product.enso.json`) so it looks and behaves identically. It's a customized `main-product` PDP followed by the **richest** set of content sections of any PDP on the site (award callouts, a hardcoded comparison table, a before/after slider, a logo list, six video/image-with-text blocks, and **two separate image-slider sections**), then featured collections and FAQs. Copy the JSON verbatim, port the custom snippets/sections + CSS, create the metafields, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.enso.json` — preserve section order, every `"disabled": true`, all block settings, and the header comment.
2. Port the custom section/snippet files and `assets/main-product.css` (shared/identical to the file embedded in the **product-core** prompt §5 — do not re-embed here, just confirm it's the same file already ported). For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — many blocks/sections are **empty without them**.
4. Re-upload **images/videos** (§7) and assign the **`enso`** template to the ENSŌ product.
5. **ENSŌ does NOT use `pdp-aplus-comparison`.** Its "why it wins" comparison is a **hardcoded `custom-liquid` section** (see §1 row 6, §4) — port that block's HTML/CSS verbatim as-is, don't substitute the `pdp-aplus-comparison` section.
6. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (25) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `custom_section_PzPGnU` | custom-section ⚑ | on | "FOLLOW US ON YOUTUBE" → **product-meta-shorts** video carousel |
| 3 | `177485716168cc23cb` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews (limit **5**, maxwidth 1200) |
| 4 | `image_with_text_MwCXKV` | image-with-text | on | "Award-Winning Performance" — Best Hookah, 2025 Frankfurt Shisha Messe |
| 5 | `image_with_text_cCn7Jt` | image-with-text | on | "Red Dot Design Award 2026 Winner" |
| 6 | `custom_liquid_tPwXGU` | **custom-liquid** ⚑(hardcoded) | on | "WHY ENSO WINS?" — **hardcoded comparison table** (self-contained inline CSS+HTML; NOT the `pdp-aplus-comparison` section) |
| 7 | `video_with_text_overlay_h6aGCA` | video-with-text-overlay | **disabled** | "A revolutionary new way to elevate your herb experience" video (hidden) |
| 8 | `image_with_text_overlay_xkykE8` | image-with-text-overlay | on | same heading/copy as #7 — **image fallback shown instead** |
| 9 | `text_with_icons_a8YfK9` | text-with-icons | on | 4 feature columns (Crafted for Exploration, etc.) |
| 10 | `image_before_after_NAGAWD` | image-before-after | on | "What difference a few minutes can make" before/after slider |
| 11 | `logo_list_xeE8AU` | logo-list | on | 6 award/press logos |
| 12 | `video_with_text_N4kN6G` | video-with-text | on | "Coal-Free Comfort" |
| 13 | `video_with_text_ERViGG` | video-with-text | on | "Cordless Convenience" |
| 14 | `video_with_text_tg9GRm` | video-with-text | **disabled** | "Magnetic Simplicity" video (hidden) |
| 15 | `image_with_text_D9Un9f` | image-with-text | on | same heading/copy as #14 — **image fallback shown instead** |
| 16 | `video_with_text_w9UM3m` | video-with-text | **disabled** | "Formidable Clouds" video (hidden) |
| 17 | `image_with_text_rzfQHU` | image-with-text | on | same heading/copy as #16 — **image fallback shown instead** |
| 18 | `image_with_text_xfbNRK` | image-with-text | on | "Ceramic cups" |
| 19 | `image_with_text_AJaKtP` | image-with-text | on | "For Wax…" + **"Buy Wax Pad"** button → `wax-pad-for-enso` product (Hulk form trigger class present but popup disabled) |
| 20 | `image_with_text_overlay_4xRpQF` | image-with-text-overlay | on | "Why Choose ENSŌ" — 5 sub-blocks **disabled** (the "How to use your ENSŌ" User-Guide CTA half is hidden; only the "Why Choose ENSŌ" copy shows) |
| 21 | `featured_collection_yimCUa` | featured-collection ⚑ | on | "ENSŌ ACCESSORIES" carousel |
| 22 | `custom_section_YRfa83` | custom-section ⚑ | on | "USER GUIDE" → **ai_gen_block_657f32b** image slider **#1** (metafield-driven, portrait) |
| 23 | `custom_section_Rrg6pT` | custom-section ⚑ | on | "HOW TO USE" → **ai_gen_block_657f32b** image slider **#2** (manual images + YouTube links, auto ratio) |
| 24 | `featured_collection_9g4PBk` | featured-collection ⚑ | on | "OUR SIGNATURE MODELS" carousel |
| 25 | `product_faqs_jLzbm7` | product-faqs ⚑ | on | "FAQS" accordion |

**Disabled = present in JSON but not rendered** (keep the flags). Note the **three video→image fallback pairs** (#7/#8, #14/#15, #16/#17): each disabled `video-with-text(-overlay)` is paired with an enabled `image-with-text(-overlay)` carrying identical heading/copy — same pattern as other PDPs, just more instances here. **No `pdp-aplus-comparison` section exists anywhere in this template** — confirmed absent from both `sections` and `order`.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (shared/identical to the CORE template's — already documented + embedded in `product-core-prompt.md` §5; don't re-embed, just confirm it's ported). It loads `main-product.css` via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `sections/custom-section.liquid` (generic wrapper: heading + link + hosts blocks). Used **3×** here: once for `product-meta-shorts`, twice for `ai_gen_block_657f32b` (two separate sliders).
- `blocks/product-meta-shorts.liquid` (YouTube/short-video carousel from a product metafield).
- `blocks/ai_gen_block_657f32b.liquid` (image slider; self-contained scoped CSS/JS). **Used twice on this template** — see §4 for how the two instances differ (aspect ratio, data source, slide counts).
- `sections/product-faqs.liquid` (FAQ accordion from a product metafield).
- `sections/featured-collection.liquid` (shared customized featured collection). Used ×2.
- **`custom_liquid_tPwXGU`'s content is a stock `custom-liquid` section** — no custom section file needed, just port the block's `custom_liquid` setting string verbatim (huge inline `<style>` + HTML comparison table). It renders the current product via `{% render 'product-card', card_product: product %}` plus two **hardcoded** competitor columns (image + label, no metafields). It also carries **leftover dead Liquid** (`{% for cp in compare_products %}…{% endfor %}`, `selected_features`) copied from the `pdp-aplus-comparison` section's logic — in a plain `custom-liquid` block these variables are never assigned, so that loop is a no-op; don't try to "fix" it, just copy it as-is per Rule 1.
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**, same as CORE).
- Buy-box block snippets (mostly stock, rendered by `product-info.liquid`): `custom_badges`, `title`, `price`, `text`, `rich_text_block`, `variant_picker`(+radio/`radio-image`), `payment_installments`, `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.
- **Hulk form modal**: `image_with_text_AJaKtP`'s "Buy Wax Pad" button carries `hulk_form_popup_class: "hulk-form-modal-custom-trigger"` with `enable_form_popup: false` and blank `hulk_form_id_block` — the button links straight to the product (`shopify://products/wax-pad-for-enso`); the Hulk trigger class is present but inert. See the **hulk-form-modal-fix** prompt for what that class does if/when the popup is re-enabled.

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 56          → media column is 56% of page width on desktop
media_size: "1"                  → fixed media aspect (not adaptive)
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: false
media_enable_video_looping: true
media_fit_height: true           ⚠️ DIFFERS FROM CORE (core = false) — media stage fits/crops to a fixed height here
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** identical mechanism to CORE — `carousel_vertical` renders a `<scroll-carousel vertical>` thumbnail rail + `<media-carousel>` main stage, sticky media column, `media_zoom: lightbox` fullscreen zoom, mobile swipeable carousel with thumbnail indicator, mobile title+reviews render above the gallery. The one behavioral difference is `media_fit_height: true` (vs CORE's `false`) — verify this crops/fits the media stage to a fixed height on this template. Full mechanics in the **sticky-media-gallery** prompt.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; centered; same as CORE. Full spec in the **sticky-add-to-cart** prompt.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order` (24 blocks). **Bold = custom/metafield-driven. ⛔ = disabled (hidden).**
1. **`custom_badges`** — product badge row. **⚠️ ENABLED here** (unlike CORE, where the equivalent block is disabled) — confirm this is intentional and the badge row actually shows on ENSŌ.
2. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`. Shows the product name.
3. `loox_rating` (Loox **app block**) — same settings as CORE (`contentSize 16`, `[rating] ([count])`, floating widget, empty-rating widget). **Hidden on mobile inside the buy box** by shared `main-product.css` (same rule as CORE).
4. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
5. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product hook/tagline. Empty if `custom.hook_text` missing.
6. **`text`** "Customers outside the US and Canada **visit ensoshisha.eu**" → links to `https://ensoshisha.eu/`. **Shown.** (ENSŌ-specific EU redirect — different text/URL from CORE's "For European Orders click HERE".)
7. `payment_installments` — Shop Pay installments messaging.
8. `variant_picker` — `type: radio`, `color_picker_type: radio-image`, `block_style: outlined`, rounded. `hide_sold_out_variants: false`.
9. **`text`** "**UpGrade to the ENSŌ**" → `/pages/upgrade-experience` (new tab). **Shown** — ENSŌ-specific upsell link (see the **page-upgrade** prompt for that landing page).
10. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (no Buy-it-now/express buttons), `show_gift_card_recipient: false`.
11. `delivery` — `delivery_from: 3` / `delivery_to: 5` → "Receive by …" estimate.
12. **`icon_text_block` (`icon-text-pdp`, inline)** — same 5 trust icons as CORE: "30 Days Return", "Lifetime Warranty Ltd.", "Free Delivery 100+ USD", "Hassle-Free Shipping", "Secure Transaction".
13. **`text` "Due to high demand, expect ENSŌ's shipping to take approximately 3 weeks" ⛔ disabled** (hidden).
14. **`description` ⛔ disabled** (stock description accordion hidden; metafield accordions below replace it — note its JSON has `collapse_open: true`, irrelevant since disabled).
15–21. **`collapsible_content` ×7 — accordions, ALL closed by default (`collapse_open: false`):**
    - "Description" → `custom.description`
    - "Specifications" → `custom.specifications`
    - "What's in the box?" → `custom.what_s_in_the_box`
    - "How to use?" → `custom.how_to_use`
    - "Accessories" → `custom.parts_accessories`
    - "Warranty and Support" → `custom.lifetime_waranty`
    - "Why Choose AirVape?" → **hardcoded HTML** (identical long copy to CORE's — no metafield).
    Each metafield accordion is **empty if its metafield is missing**.
22. **`collapsible_content` "The Stōry" ⛔ disabled** — **ENSŌ-specific hardcoded accordion** (no metafield): "We started this project in 2020 by collaborating with the ENSŌ Team…". Hidden; keep the flag.
23. **`icon_text_block` (`homepage-usps-info`, vertical)** — same 5 USP items as CORE (FAST HEAT-UP / PURE FLAVOUR / EASY TO USE ×2 / LASTS LONGER), same 2-column layout via shared CSS.
24. `share_button` — native share.

> No `custom_liquid` "NY Times Wirecutter" promo pill block in the buy box here (that's CORE-only).

## 4. Content sections below the PDP — behaviors & hidden bits
- **`custom-section` "FOLLOW US ON YOUTUBE"** → `product-meta-shorts` block: identical settings to CORE (metafield `custom.product_short_videos`, muted, red 48px play button, radius 12, 4/3/2 slides, arrows + dots).
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — limit **5** (CORE uses 4), `maxwidth: 1200` (CORE uses 1080), not aggregated.
- **image-with-text** "Award-Winning Performance" — icon `SM_Logo-1.webp` (96px), image `ENSO_Award_Winning.webp` right, `image_size: media--ratio-4-3`, `remove_bottom_spacing: true`. Copy: "Best Hookah at the 2025 Frankfurt Shisha Messe event…".
- **image-with-text** "Red Dot Design Award 2026 Winner" — icon `red-dot-logo_….webp` (96px), image `PD2026_RD_white_t_….webp` left, `remove_bottom_spacing: true`.
- **custom-liquid "WHY ENSO WINS?"** — self-contained `<style>` (sticky first column, sticky "active" comparison column, responsive breakpoints at 992px/768px) + a hardcoded 3-column table: **current product** (via `{% render 'product-card', card_product: product %}`) vs. two static competitor columns — **"Coal hookah"** (hardcoded CDN image `…71Bhm4vc2SL._SX679.webp`) and **"Home vape"** (hardcoded CDN image `…51z90B1mVTL…jpg`) — comparing Category, Heat style, What you use, Flavor quality, Cloud style, Session vibe, Session time, Setup, Portability, Best for. **⚠️ The two competitor images are absolute `cdn.shopify.com/s/files/1/0777/8339/…` URLs pointing at the OLD store's CDN** — these will 404 on the new store unless re-hosted; re-upload them as Files on the new store and swap the `src` in this block's `custom_liquid` HTML. Ends with the tagline "Pure flavor. Big clouds. Modern hookah sessions without coal, flame, or the mess."
- **video-with-text-overlay ⛔ disabled** — "A revolutionary new way to elevate your herb experience" (`web_enso_taste_v1_smaller.webm`); its `subheading` sub-block ("ENSŌ") is also disabled. Hidden; image-overlay #8 shows the same copy instead.
- **image-with-text-overlay** "A revolutionary new way to elevate your herb experience" — `Enso-2.webp`, overlay 30% solid.
- **text-with-icons** — 4 `column` blocks (Crafted for Exploration / 45 minutes sessions of Enjoyment / Modern Meets Timeless / Easy to use/Easy to clean) each with an `ICON_E150-0#` PNG, circle background, 64px, 1-col mobile. Carries its own `custom_css`: `@media (max-width:480px) { .inline-block p { font-size:14px } }`.
- **image-before-after** "What difference a few minutes can make" — `before_357us_web.jpg` / `after_420us_web.jpg`, subheading "Use the slider, left and right, to see", white handle color.
- **logo-list** — 6 `logo` blocks (`Icons-01.webp` through `Icons-06.webp`, plus `Icons_enso-04.webp` in the 4th slot), each width 100, no links, `logo_opacity: 100`.
- **video-with-text** "Coal-Free Comfort" — autoplay+loop `881118a7195845919250bb1bb8d1af0a.HD-720p-4.5Mbps-77491262.webm`, image right 50%, `image_size: media--ratio-4-3`.
- **video-with-text** "Cordless Convenience" — autoplay+loop `ab3eb3b3a4e74553991a274732af51b9.HD-720p-4.5Mbps-77492579.webm`, image left 50%.
- **video-with-text ⛔ disabled** — "Magnetic Simplicity" (`da6f5b12bd4140049bb0a9473dd6d095.HD-720p-4.5Mbps-79892443.webm`). Hidden; image-with-text below shows the same copy instead.
- **image-with-text** "Magnetic Simplicity" — `Enso-Product_Page-1.webp` right 50%, `media--ratio-4-3` — **shows instead of the disabled video above.**
- **video-with-text ⛔ disabled** — "Formidable Clouds" (`928b86f2b2c54f409d83866a94dee497.HD-1080p-7.2Mbps-33843180.webm`), subheading "ENSŌ's custom Heating algorythm ensures". Hidden.
- **image-with-text** "Formidable Clouds" — same subheading, `Enso-Product_Page-circut.webp` left 50% — **shows instead of the disabled video above.**
- **image-with-text** "Ceramic cups" — subheading "Your ENSŌ works amazingly with loose-leaf", `tobaco-nicotine-free-ceramic.png` right 50%, `remove_bottom_spacing: true`, `custom_class: image-with-text-section`.
- **image-with-text** "For Wax - use the ceramic cups with the ENSŌ wax pad" — `WaxPad_enso_pr_img_cup.png` left 50%, two text blocks + **"Buy Wax Pad"** button → `shopify://products/wax-pad-for-enso` (Hulk trigger class present but `enable_form_popup: false`, see §2).
- **image-with-text-overlay** "Why Choose ENSŌ" — `Enso-1_edd0f1ee-….webp`, overlay 50% solid, `enable_transparent_header: true`. **5 sub-blocks disabled**: `subheading` "FIND OUT", `heading` "How to use your ENSŌ", intro `text`, and buttons "User Guide" (→ `/pages/enso-user-guide`) + "How to Videos" (→ `/pages/enso-how-to-videos`) — this whole User-Guide CTA half is hidden. Only the **enabled** `heading` "Why Choose ENSŌ" + `text` show.
- **featured-collection "ENSŌ ACCESSORIES"** — carousel, 4 products, from collection `enso-accessories`, "View all" → `airvape-x-accessories`.
- **custom-section "USER GUIDE"** → `ai_gen_block_657f32b` **image slider #1** — `data_source: metafield`, `custom.user_guide`, **`aspect_ratio: "portrait"`** (fixed portrait crop — differs from CORE's `auto`), **3/3/2** slides desktop/tablet/mobile, gap 16, radius 6, arrows + dots, no autoplay, no infinite loop.
- **custom-section "HOW TO USE"** → `ai_gen_block_657f32b` **image slider #2** — `data_source: manual`, 3 hardcoded images with YouTube links: `Unboxing-01.webp` → "ENSŌ Unboxing" (youtube.com/watch?v=kAVGefMbILA), `Quick_setup-01.webp` → "ENSŌ Quick Setup" (…hm01ZbaWdpY), `Cleaning-01.webp` → "ENSŌ Cleaning" (…gAHT4Sp2tOM), all `new_image_link: true` (open in new tab). **`aspect_ratio: "auto"`** (natural size, no crop), **3/3/1** slides, gap 16, radius 12.
- **featured-collection "OUR SIGNATURE MODELS"** — carousel, 8 slots, manual product list (note: unlike CORE's equivalent list, this one does **not** include `enso` itself — starts with `legacy-core`).
- **product-faqs "FAQS"** — accordion from `custom.faqs`. Empty without the metafield.

## 5. `assets/main-product.css`
Shared/identical file to the one embedded verbatim in `product-core-prompt.md` §5 — same `.icon-text-block--inline`/`--vertical` layouts, `.qty-wrap`, buy-box `.loox-rating` mobile-hide rule, comparison-card rating weight, payment list, restock-notify button styling. No ENSŌ-specific override exists in this template's JSON (no section-level `custom_css` on `main`). Port that one file; do not duplicate it.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — all namespace `custom`
Without these, the matching block/section is **empty**:
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `description` | rich text | "Description" accordion |
| `specifications` | rich text | "Specifications" accordion |
| `what_s_in_the_box` | rich text | "What's in the box?" accordion |
| `how_to_use` | rich text | "How to use?" accordion |
| `parts_accessories` | rich text | "Accessories" accordion |
| `lifetime_waranty` | rich text | "Warranty and Support" accordion |
| `product_short_videos` | list / rich text | product-meta-shorts carousel |
| `user_guide` | list of images (or the block's expected source) | image slider **#1** ("USER GUIDE", portrait) only — slider #2 ("HOW TO USE") is manual/hardcoded, no metafield needed |
| `faqs` | (per product-faqs schema) | FAQS accordion |

> `compare_key` is **not** functionally required here — it's referenced inside the dead `{% for cp in compare_products %}` loop in the hardcoded `custom_liquid_tPwXGU` block (§4), but `compare_products`/`selected_features` are never assigned in a plain `custom-liquid` block scope, so that branch never executes. No need to create it for this template.

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `FAST_HEAT-UP.webp`, `PURE_FLAVOUR.webp`, `EASY_TO_USE.webp`, `LONG_BATTERY_LIFE.webp`, `SM_Logo-1.webp`, `ENSO_Award_Winning.webp`, `red-dot-logo_267589e5-….webp`, `PD2026_RD_white_t_1e9ae56c-….webp`, `Enso-2.webp`, `ICON_E150-01_….png`, `ICON_E150-02_….png`, `ICON_E150-03_….png`, `ICON_E150-04_….png`, `before_357us_web.jpg`, `after_420us_web.jpg`, `Icons-01.webp`…`Icons-06.webp`, `Icons_enso-04.webp`, `Enso-Product_Page-1.webp`, `Enso-Product_Page-circut.webp`, `tobaco-nicotine-free-ceramic.png`, `WaxPad_enso_pr_img_cup.png`, `Enso-1_edd0f1ee-….webp`, `Unboxing-01.webp`, `Quick_setup-01.webp`, `Cleaning-01.webp`. (Grep the JSON for `shopify://shop_images` to catch all.)
- **Extra images (hardcoded inside `custom_liquid_tPwXGU`, not `shopify://` refs — grep the block's HTML for `cdn.shopify.com`):** the two comparison-table competitor photos (coal-hookah image, home-vape image) — currently absolute URLs on the **old** store's CDN; re-upload to the new store and update the `src` attributes.
- **Videos → Content → Files:** `web_enso_taste_v1_smaller.webm` (disabled overlay), `881118a7195845919250bb1bb8d1af0a.HD-720p-4.5Mbps-77491262.webm` (Coal-Free Comfort), `ab3eb3b3a4e74553991a274732af51b9.HD-720p-4.5Mbps-77492579.webm` (Cordless Convenience), `da6f5b12bd4140049bb0a9473dd6d095.HD-720p-4.5Mbps-79892443.webm` (disabled Magnetic Simplicity), `928b86f2b2c54f409d83866a94dee497.HD-1080p-7.2Mbps-33843180.webm` (disabled Formidable Clouds). Grep for `shopify://files/videos`.
- **Apps:** **Loox** (buy-box rating app-block + dynamic reviews app-block). Re-add both after installing Loox; app-block IDs will differ on the new store.
- **Collections:** `enso-accessories`, `airvape-x-accessories`.
- **Products (featured + buttons):** `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`, `wax-pad-for-enso` (Buy Wax Pad button target — must exist).
- **Pages:** `/pages/upgrade-experience` (buy-box "UpGrade to the ENSŌ" link), `shopify://pages/enso-user-guide` and `shopify://pages/enso-how-to-videos` (both buttons currently **disabled** in `image_with_text_overlay_4xRpQF`, but create the pages for parity in case they're re-enabled).
- **Product media:** upload the ENSŌ gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections:** `video_with_text_overlay_h6aGCA`, `video_with_text_tg9GRm`, `video_with_text_w9UM3m` (each paired with an enabled image-with-text/-overlay fallback carrying the same copy — see §1).
- **Disabled buy-box blocks:** `text_xQ6jUh` ("high demand… 3 weeks"), `description_jfp4NG` (stock accordion), `collapsible_content_bFwQxc` ("The Stōry").
- **Disabled sub-blocks:** `subheading_6yPpJh` ("ENSŌ", inside disabled video overlay #7); `subheading_NHmnFx`, `heading_gMNmnB`, `text_9nNryy`, `button_qjUwVB`, `button_RRHWrG` (all inside `image_with_text_overlay_4xRpQF` — the "How to use your ENSŌ" User-Guide CTA half, hidden; only "Why Choose ENSŌ" shows).
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px) — shared rule from `main-product.css`, same as CORE.
- **All 8 `collapsible_content` accordions (7 enabled + 1 disabled "The Stōry") start CLOSED** (`collapse_open: false`), except the disabled `description` stock block whose JSON has `collapse_open: true` (irrelevant — it's hidden).
- **No `pdp-aplus-comparison` section** anywhere — the comparison UI here is the hardcoded `custom_liquid_tPwXGU` block instead (§1 row 6, §4).
Keep all of the above exactly.

## 9. Report back
- Confirm the `enso` template is assigned; JSON valid; all `disabled` flags + closed accordions preserved.
- Confirm `main-product.css` (shared with CORE) loads and both `icon_text_block` layouts render; buy-box Loox rating hides on mobile.
- Confirm the **sticky vertical media gallery** + lightbox zoom work (note `media_fit_height: true` here, unlike CORE), and the **centered sticky add-to-cart** slides in on scroll.
- Confirm custom sections/blocks ported: `product-meta-shorts`, **both** `ai_gen_block_657f32b` instances (portrait/metafield "USER GUIDE" slider #1 vs. auto/manual "HOW TO USE" slider #2 with YouTube links), both `featured-collection`s.
- Confirm the **hardcoded comparison table** (`custom_liquid_tPwXGU`) renders — current product via `product-card`, plus the two competitor columns with their images **re-hosted on the new store's CDN** (flag if still pointing at the old CDN).
- Confirm the "Buy Wax Pad" button's Hulk trigger class is present (inert unless the popup is re-enabled) and it links to the `wax-pad-for-enso` product.
- Confirm all `custom.*` metafields exist (else hook, accordions, shorts, "USER GUIDE" slider, FAQs are empty), Loox installed + both blocks re-added, and media/collections/products/pages created.

---

## FULL `templates/product.enso.json` — copy verbatim

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
        "custom_badges_pdp": {
          "type": "custom_badges",
          "settings": {}
        },
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7": {
          "type": "title",
          "settings": {
            "heading_size": "h4",
            "mobile_heading_size": "h5",
            "content": "{{ product.title }}",
            "text_color": "rgba(0,0,0,0)"
          }
        },
        "loox_reviews_loox_rating_h9rNxK": {
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
        "rich_text_block_8zq4Ma": {
          "type": "rich_text_block",
          "settings": {
            "icon": "",
            "icon_width": 24,
            "heading": "",
            "content": "{{ product.metafields.custom.hook_text | metafield_tag }}",
            "heading_size": "heading text-h6 md:text-h5",
            "text_alignment": "text-left",
            "button_text": "",
            "button_url": "",
            "button_style": "",
            "background_color": "",
            "text_color": "",
            "heading_color": "",
            "button_background_color": "",
            "button_text_color": ""
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
            "color_picker_type": "radio-image",
            "block_style_rounded": true,
            "block_style": "outlined",
            "size_chart_page": "",
            "size_chart_option_name": "Size"
          }
        },
        "text_aJyH9A": {
          "type": "text",
          "settings": {
            "content": "<p><a href=\"/pages/upgrade-experience\" target=\"_blank\" title=\"Upgrade experience\">UpGrade to the ENSŌ</a></p>"
          }
        },
        "qty_btn_selector_UyqkWa": {
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
        "delivery_teYKgG": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_mKKDhm": {
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
        "text_xQ6jUh": {
          "type": "text",
          "disabled": true,
          "settings": {
            "content": "<p>Due to high demand, expect ENSŌ's shipping to take approximately <strong>3 weeks</strong></p>"
          }
        },
        "description_jfp4NG": {
          "type": "description",
          "disabled": true,
          "settings": {
            "collapse_content": true,
            "collapse_open": true,
            "heading": "Description"
          }
        },
        "collapsible_content_NHrX7k": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Description",
            "content": "{{ product.metafields.custom.description | metafield_tag }}"
          }
        },
        "collapsible_content_QcyVFA": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Specifications",
            "content": "{{ product.metafields.custom.specifications | metafield_tag }}"
          }
        },
        "collapsible_content_F6YAeW": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "What's in the box?",
            "content": "{{ product.metafields.custom.what_s_in_the_box | metafield_tag }}"
          }
        },
        "collapsible_content_jgDBXh": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "How to use?",
            "content": "{{ product.metafields.custom.how_to_use | metafield_tag }}"
          }
        },
        "collapsible_content_Bt6YhB": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Accessories",
            "content": "{{ product.metafields.custom.parts_accessories | metafield_tag }}"
          }
        },
        "collapsible_content_QPVTpM": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Warranty and Support",
            "content": "{{ product.metafields.custom.lifetime_waranty | metafield_tag }}"
          }
        },
        "collapsible_content_c3xXMy": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "collapsible_content_bFwQxc": {
          "type": "collapsible_content",
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "The Stōry",
            "content": "<p>We started this project in 2020 by <strong>collaborating with the ENSŌ Team</strong> to create a full electronic heating device.<strong> </strong>Leveraging our decade-long experience in heating technology,we were able to make the <strong>ENSŌ  </strong>the <strong>ultimate desktop vaporizer </strong>for flower and wax. </p>"
          }
        },
        "icon_text_block_zrGfWY": {
          "type": "icon_text_block",
          "settings": {
            "icon_text_class": "homepage-usps-info",
            "layout": "vertical",
            "icon_1": "shopify://shop_images/FAST_HEAT-UP.webp",
            "text_1": "<p><strong>FAST HEAT-UP</strong><br/>Ready to go in seconds</p>",
            "icon_2": "shopify://shop_images/PURE_FLAVOUR.webp",
            "text_2": "<p><strong>PURE FLAVOUR</strong><br/>Crisp vapor with precision</p>",
            "icon_3": "shopify://shop_images/EASY_TO_USE.webp",
            "text_3": "<p><strong>EASY TO USE</strong><br/>Effortless enjoyment</p>",
            "icon_4": "shopify://shop_images/EASY_TO_USE.webp",
            "text_4": "<p><strong>EASY TO USE</strong><br/>Effortless enjoyment</p>",
            "icon_5": "shopify://shop_images/LONG_BATTERY_LIFE.webp",
            "text_5": "<p><strong>LASTS LONGER</strong><br/>Enjoy more sessions</p>",
            "icon_size": 30,
            "text_size": 14,
            "text_color": "#000000"
          }
        },
        "share_button_Nqt3nE": {
          "type": "share_button",
          "settings": {}
        }
      },
      "block_order": [
        "custom_badges_pdp",
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_h9rNxK",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "rich_text_block_8zq4Ma",
        "text_r6YQPE",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "text_aJyH9A",
        "qty_btn_selector_UyqkWa",
        "delivery_teYKgG",
        "icon_text_block_mKKDhm",
        "text_xQ6jUh",
        "description_jfp4NG",
        "collapsible_content_NHrX7k",
        "collapsible_content_QcyVFA",
        "collapsible_content_F6YAeW",
        "collapsible_content_jgDBXh",
        "collapsible_content_Bt6YhB",
        "collapsible_content_QPVTpM",
        "collapsible_content_c3xXMy",
        "collapsible_content_bFwQxc",
        "icon_text_block_zrGfWY",
        "share_button_Nqt3nE"
      ],
      "settings": {
        "show_breadcrumbs": false,
        "desktop_media_width": 56,
        "media_size": "1",
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
    "custom_section_PzPGnU": {
      "type": "custom-section",
      "blocks": {
        "product_meta_shorts_7cpKTB": {
          "type": "product-meta-shorts",
          "name": "Product Shorts",
          "settings": {
            "metafield_namespace": "custom",
            "metafield_key": "product_short_videos",
            "muted": true,
            "play_button_size": 48,
            "play_button_color": "#ff0000",
            "video_border_radius": 12,
            "slides_desktop": 4,
            "slides_medium": 3,
            "slides_mobile": 2,
            "slide_gap": 20,
            "desktop_width_percent": 100,
            "section_padding": 0,
            "show_arrows": true,
            "show_dots": true,
            "controls_spacing": 25,
            "arrow_size": 40,
            "arrow_background": "#000000",
            "arrow_color": "#ffffff",
            "arrow_hover_background": "#333333",
            "arrow_hover_color": "#ffffff",
            "dot_size": 8,
            "dot_color": "#cccccc",
            "dot_active_color": "#000000"
          },
          "blocks": {}
        }
      },
      "block_order": [
        "product_meta_shorts_7cpKTB"
      ],
      "name": "Custom Section",
      "settings": {
        "full_width": true,
        "remove_horizontal_space": false,
        "remove_vertical_space": false,
        "content_width": "normal",
        "subheading": "",
        "heading": "FOLLOW US ON YOUTUBE",
        "heading_size": "h2",
        "text_alignment": "text-center",
        "link_text": "<svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"25\" height=\"25\" viewbox=\"0 0 48 48\"><path fill=\"#FF3D00\" d=\"M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z\"></path><path fill=\"#FFF\" d=\"M20 31L20 17 32 24z\"></path></svg>@AirvapeusaOfficial",
        "link_url": "https://www.youtube.com/@AirvapeusaOfficial",
        "new_tab": true,
        "heading_html_tag": "h2",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "177485716168cc23cb": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_PxmwF8": {
          "type": "shopify://apps/loox-reviews/blocks/loox-dynamic-section/5c3b337f-fd14-4df5-b1d6-80ec13e6e28e",
          "settings": {
            "reviews_to_display": "",
            "default_tab": "automatic",
            "only_photos": false,
            "aggregated": false,
            "limit": 5,
            "hide_thumbnails": false,
            "maxwidth": 1200,
            "is_sample": true
          }
        }
      },
      "block_order": [
        "loox_reviews_loox_dynamic_section_PxmwF8"
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
    "image_with_text_MwCXKV": {
      "type": "image-with-text",
      "blocks": {
        "icon_YMgmCi": {
          "type": "icon",
          "settings": {
            "custom_icon": "shopify://shop_images/SM_Logo-1.webp",
            "icon": "message-chat-circle",
            "icon_background": "",
            "icon_width": 96,
            "icon_background_color": "",
            "icon_color": ""
          }
        },
        "heading_aHyeCj": {
          "type": "heading",
          "settings": {
            "heading": "Award-Winning Performance",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_VqhBqm": {
          "type": "text",
          "settings": {
            "text": "<p>ENSŌ recognized as Best Hookah at the 2025 Frankfurt Shisha Messe event, stands out as a modern alternative to traditional setups, combining clean electric heat, premium design, and a refined session experience.</p>"
          }
        }
      },
      "block_order": [
        "icon_YMgmCi",
        "heading_aHyeCj",
        "text_VqhBqm"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": true,
        "image": "shopify://shop_images/ENSO_Award_Winning.webp",
        "image_size": "media--ratio-4-3",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "image_with_text_cCn7Jt": {
      "type": "image-with-text",
      "blocks": {
        "icon_EpPbLt": {
          "type": "icon",
          "settings": {
            "custom_icon": "shopify://shop_images/red-dot-logo_267589e5-2902-4976-afd4-8eae503eff58.webp",
            "icon": "message-chat-circle",
            "icon_background": "",
            "icon_width": 96,
            "icon_background_color": "",
            "icon_color": ""
          }
        },
        "heading_93Amkd": {
          "type": "heading",
          "settings": {
            "heading": "Red Dot Design Award 2026 Winner",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_GAyhyB": {
          "type": "text",
          "settings": {
            "text": "<p>ENSŌ received the Red Dot Design Award 2026 in Product Design - a third party validation of the direction the brand has held from day one: a modern, international, ritual-focused object. Award-winning design, now refined for better performance in 2026.</p>"
          }
        }
      },
      "block_order": [
        "icon_EpPbLt",
        "heading_93Amkd",
        "text_GAyhyB"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": true,
        "image": "shopify://shop_images/PD2026_RD_white_t_1e9ae56c-e03c-4e41-8563-ae53c438d7bb.webp",
        "image_size": "",
        "image_position": "left",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "custom_liquid_tPwXGU": {
      "type": "custom-liquid",
      "name": "t:sections.custom-liquid.presets.name",
      "settings": {
        "full_width": true,
        "remove_horizontal_space": false,
        "remove_vertical_space": false,
        "custom_liquid": "<style>\n\t.aplus-v2.desktop {\n\t\tmin-width: 800px;\n\t\tmargin-left: auto;\n\t\tmargin-right: auto;\n\t\tword-wrap: break-word;\n\t\toverflow-wrap: break-word;\n\t\tword-break: break-word;\n\t}\n\t.aplus-v2 .aplus-container-3 {\n\t\tpadding: 40px 0 0;\n\t}\n\t.aplus-v2 .premium-aplus .aplus-h1 {\n\t\tfont-size: 32px;\n\t\tline-height: 1.2em;\n\t\tfont-weight: 500;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 .table-container {\n\t\tposition: relative;\n\t\topacity: 1;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 .table-slider {\n\t\toverflow-x: auto;\n\t\toverflow-y: visible;\n\t\twidth: 100%;\n\t\t{% comment %} border: 1px solid #d5d9d9; {% endcomment %}\n\t\tborder-radius: 8px;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 table.a-bordered {\n\t\tborder-width: 0px;\n\t\tborder-color: #d5d9d9;\n\t\tborder-style: solid;\n\t\tborder-radius: 8px;\n\t\tmargin-left: auto;\n\t\tmargin-right: auto;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 table.a-bordered tr:last-child {\n\t\tborder-bottom-left-radius: 8px;\n\t\tborder-bottom-right-radius: 8px;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 table.a-bordered tr:last-child td {\n\t\t{% comment %} border-bottom: 0; {% endcomment %}\n\t}\n\t.aplus-v2 .premium-aplus-module-5 table.a-bordered tr:last-child td:first-child {\n\t\tborder-bottom-left-radius: 8px;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 table.a-bordered tr:last-child td:last-child {\n\t\tborder-bottom-right-radius: 8px;\n\t}\n\tth.aplus-data-column.top-header {\n    \tborder: 0;\n\t}\n\ttd.attribute.a-text-bold.column-cell-1 {\n    \tborder-top-left-radius: 8px;\n\t}\n\ttr.first-content-row td:last-child {\n\t\tborder-top-right-radius: 8px;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 .scroll-width {\n\t\toverflow-x: scroll;\n\t\toverflow-y: visible;\n\t}\n\ttable.a-bordered {\n\t\tborder-start-start-radius: var(--__TxpmBlwIJ, .5rem);\n\t\tborder-start-end-radius: var(--__TxpmBlwIJ, .5rem);\n\t\tborder-end-start-radius: var(--__TxpmBlwIJ, .5rem);\n\t\tborder-end-end-radius: var(--__TxpmBlwIJ, .5rem);\n\t\tborder-width: var(--__TxpzNygdu, .0625rem);\n\t\tmargin-bottom: 22px;\n\t\tborder-style: solid;\n\t\tborder-color: var(--__dChNmAmGoMXsTxp, #d5d9d9);\n\t\tborder-collapse: separate;\n\t\tborder-spacing: 0;\n\t\toverflow: hidden;\n\t}\n\ttd, th {\n\t\tpadding: .1875rem;\n\t\tvertical-align: top;\n\t}\n\ttable.a-bordered td, table.a-bordered th {\n\t\tborder-bottom: 1px solid #d5d9d9;\n\t\tborder-right: 1px solid #d5d9d9;\n\t\tborder-color: #dfd9d9;\n\t\tpadding-block-start: 8px;\n\t\tpadding-inline-start: .75rem;\n\t\tpadding-inline-end: .75rem;\n\t\tpadding-block-end: 8px;\n\t\tbackground-color: var(--__dChNmAmGoMXsPxT, #fff);\n\t}\n\t.aplus-v2 .premium-aplus-module-5 table.a-bordered td, .aplus-v2 .premium-aplus-module-5 table.a-bordered th {\n\t\tbackground-color: #fff;\n\t\tvertical-align: middle;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 td.attribute.empty {\n\t\theight: 300px;\n\t\tborder-top-left-radius: 8px;\n\t\tborder: 0;\n\t}\n\ttr.first-content-row td {\n\t\tborder-top: 1px solid #d5d9d9;\n\t}\n\t.aplus-v2 .premium-aplus-module-5.enso-comparison td.attribute.empty {\n\t\theight: 250px;\n\t}\n\ttd.aplus-data-column.secondary-content-column:last-of-type,\n\tth.aplus-data-column.top-header:last-child {\n    \t{% comment %} border-right: 0; {% endcomment %}\n\t}\n\tth.aplus-data-column.top-header:last-child {\n    border-top-right-radius: 8px;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 .attribute, .aplus-v2 .premium-aplus-module-5 .active-item {\n\t\tposition: sticky;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 td.attribute {\n\t\tmin-width: 230px;\n\t\ttop: auto;\n\t\tleft: 0;\n\t\tz-index: 100;\n\t}\n\t.aplus-v2 .premium-aplus-module-5 td.attribute:not(.empty) {\n\t\tbackground-color: #f8f8f8;\n\t\tborder-left: 1px solid #d5d9d9;\n\t}\n\t\n\t.aplus-v2 .premium-aplus-module-5 table.a-bordered td, .aplus-v2 .premium-aplus-module-5 table.a-bordered th {\n\t\tbackground-color: #fff;\n\t}\n.aplus-v2 .premium-aplus-module-5 table.a-bordered th.active-item {\n    border: 1px solid #d5d9d9;\n    border-bottom: 0;\n    border-top-left-radius: 12px;\n    border-top-right-radius: 12px;\n}\n\t.aplus-v2 .aplus-review-right-padding {\n\t\tpadding-right: 0.1rem;\n\t}\n\t\n\t.aplus-v2 .premium-aplus-module-5 td.active-item, \n\t.aplus-v2 .premium-aplus-module-5 th.active-item {\n\t\ttop: auto;\n\t\tleft: 230px;\n\t\tz-index: 100;\n\t}\n\t.comparison-metric-name {\n\t\tfont-weight: 600;\n\t\tfont-size: 14px;\n\t}\n\ttd.aplus-data-column {\n\t\tfont-size: 14px;\n\t\ttext-align: center;\n\t\tpadding: 9px !important;\n\t}\n\t.comparison-product-card .product-card {\n\t\tborder: 0;\n\t\tpadding: 0;\n\t}\n\t.comparison-product-card .custom-wishlist-button,\n\t.comparison-product-card .product-badges-container,\n  .comparison-product-card .info-badge,\n\t.comparison-product-card .mt-4.empty\\:hidden {\n\t\tdisplay: none\n\t}\n\t.comparison-product-card .group\\/media:hover .group-hover\\/media\\:opacity-100 {\n\t\topacity: 0;\n\t}\n\t.comparison-product-card .product-card:hover {\n\t\ttransform: translateY(0)\n\t}\n\t.comparison-product-card h2.product-name {\n\t\t-webkit-line-clamp: 1;\n\t\tmin-height: 25px;\n\t\tfont-size: 14px;\n\t}\n\t.comparison-product-card .add-to-cart-span {\n\t\tfont-size: 14px;\n\t}\n\t.enso-comparison .comparison-product-card quick-add-button,\n\t.enso-comparison .comparison-product-card .product-card__info {\n\t\tdisplay: none;\n\t}\n\n\t.enso-comparison .comparison-product-card .product-card-media.media.rounded-block {\n    padding-bottom: 0;\n\t}\n\ttd.aplus-data-column.active.active-item.second-sticky-column,\n\tth.aplus-data-column.top-header,\n\ttd.aplus-data-column.secondary-content-column {\n\t\tmax-width: 230px;\n\t\twidth: 230px;\n\t\tmin-width: 230px;\n\t}\n\t@media (max-width: 992px) {\n\t\t[data-aplus-section-container] {\n\t\t\tpadding: 0;\n\t\t}\n\t\t.aplus-v2.desktop {\n\t\t\tmin-width: 100%;\n\t\t}\n\t\t.aplus-v2 .premium-aplus-module-5 td.attribute {\n\t\t\tmin-width: 170px;\n\t\t\tleft: -1px;\n\t\t}\n\t\t.aplus-v2 .premium-aplus-module-5 td.active-item, \n\t\t.aplus-v2 .premium-aplus-module-5 th.active-item {\n\t\t\tleft: 169px;\n\t\t\tz-index: 3;\n\t\t}\n\t}\n\t\n\t/* mobile design */\n\t@media (max-width: 768px){\n\t\t.aplus-v2 .premium-aplus-module-5 table.a-bordered {\n\t\t\twidth: 100%;\n\t\t}\n\t\ttd.aplus-data-column.active.active-item.second-sticky-column {\n\t\t\tleft: 0;\n\t\t\ttext-align: left;\n\t\t\tdisplay: inline-flex;\n\t\t\theight: 85px;\n\t\t\talign-items: end;\n\t\t}\n\t\ttd.attribute.empty.first-sticky-column,\n\t\t.aplus-v2 .premium-aplus-module-5.enso-comparison td.attribute.empty {\n\t\t\tdisplay: none !important;\n\t\t}\n\t\ttd.aplus-data-column.secondary-content-column {\n    \tvertical-align: bottom;\n\t\t}\n\t\t.aplus-v2 .premium-aplus-module-5 td.active-item, .aplus-v2 .premium-aplus-module-5 th.active-item {\n\t\t\tleft: 0px;\n\t\t\tz-index: 3;\n\t\t\tposition: relative;\n    \t}\n\t\t.aplus-v2 .premium-aplus-module-5 td.attribute {\n\t\t\tmin-width: 170px;\n\t\t\tleft: -1px;\n\t\t\tposition: absolute;\n\t\t\tbackground: transparent;\t\tbackground-color: transparent !important;\nheight: 85px;\t\t\tpointer-events: none;\n    \t}\n\t\ttd.aplus-data-column.active.active-item.second-sticky-column {\n    \tleft: 0;\n    \ttext-align: left;\n    \tdisplay: inline-flex;\n    \theight: 85px;\n    \talign-items: end;\n\t\t}\n\t\ttable.a-bordered td, table.a-bordered th {\n\t\t\tborder-right: 0;\n\t\t}\n\t\t.aplus-v2 .premium-aplus-module-5 table.a-bordered td,\n\t\t.aplus-v2 .premium-aplus-module-5 table.a-bordered th {\n\t\t\tvertical-align: bottom;\n\t\t}\n\t\ttd.aplus-data-column.active.active-item.second-sticky-column, th.aplus-data-column.top-header, td.aplus-data-column.secondary-content-column {\n\t\t\tmax-width: 150px;\n\t\t\twidth: 150px;\n\t\t\tmin-width: 150px;\n\t}\n\t}\n</style>\n\n<div data-aplus-section-container>\n\t<div class=\"aplus-v2 desktop\">\n<div class=\"premium-aplus premium-aplus-module-5 aplus-container-3 comparison-table enso-comparison\">\n<div class=\"\n        section-header\n        section-content-spacing\n        rfs:mb-10\n        \n        prose-align\n        text-center\n      \">\n      \n\n\n  \n  <p class=\"heading h2\">\n  WHY ENSO WINS?\n  </p>\n\n\n\n\n\n\n    </div>   \n\t\t\t<div id=\"comparison-table-container-6\" data-comparison-name=\"comparison-table-container-6\" class=\"a-section a-spacing-none table-container\">  \n\t\t\t<div class=\"table-slider scroll-wrapper-bottom\">\n\t\t\t\t<table class=\"a-bordered a-horizontal-stripes scroll-width\">\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<tr class=\"header-row\">\n\t\t\t\t\t\t\t<td class=\"attribute empty\"></td>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<th class=\"aplus-data-column top-header active active-item\">\n\t\t\t\t\t\t\t\t<div class=\"comparison-product-card\">\n\t\t\t\t\t\t\t\t\t{% render 'product-card', card_product: product %}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<th class=\"aplus-data-column top-header\">\n\t\t\t\t\t\t\t\t<div class=\"relative overflow-hidden group/media\">\n\t\t\t\t\t\t\t\t\t<a href=\"{{ url }}\" tabindex=\"-1\" data-instant aria-label=\"{{ card_product.title | default: 'Product' }}\">\n\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\tclass=\"product-card-media media rounded-block [--aspect-ratio:--product-card-image-aspect] md:pb-6\"\n\t\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t<lqip-element class=\"image-loader h-full\">\n\t\t\t\t\t\t\t\t\t\t\t\t<img src=\"https://cdn.shopify.com/s/files/1/0777/8339/files/71Bhm4vc2SL._SX679.webp?v=1777371233&width=450\"\n\t\t\t\t\t\t\t\t\t\twidths=\"200, 360, 450\" loading=\"lazy\" width=\"\" height=\"\" alt=\"coal hookah image\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"product-card__image product-thumbnail-shade\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</lqip-element>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<th class=\"aplus-data-column top-header\">\n\t\t\t\t\t\t\t\t\t<div class=\"relative overflow-hidden group/media\">\n\t\t\t\t\t\t\t\t\t\t<a href=\"{{ url }}\" tabindex=\"-1\" data-instant aria-label=\"{{ card_product.title | default: 'Product' }}\">\n\t\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\t\tclass=\"product-card-media media rounded-block [--aspect-ratio:--product-card-image-aspect] md:pb-6\"\n\t\t\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t\t<lqip-element class=\"image-loader h-full\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src=\"https://cdn.shopify.com/s/files/1/0777/8339/files/51z90B1mVTL._AC_SY300_SX300_QL70_ML2.jpg?v=1775046681&width=450\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\twidths=\"200, 360, 450\" loading=\"lazy\" width=\"\" height=\"\" alt=\"home vape\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"product-card__image product-thumbnail-shade\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</lqip-element>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t{% for entry in selected_features %}{% endfor %}\n\t\t\t\t\t\t\t\t<tr class=\"first-content-row\">\n\t\t\t\t\t\t\t\t\t<td class=\"attribute a-text-bold column-cell-1\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"a-text-bold\"> Category </span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t{%- comment -%} Current product value {%- endcomment -%}\n\t\t\t\t\t\t\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t\t\t\t\t\t\tElectric hookah\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t\t\t\t\t\t\tCoal hookah\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t\t\t\t\t\t\tHome vape\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t{%- comment -%} Compared products values {%- endcomment -%}\n\t\t\t\t\t\t\t\t\t{% for cp in compare_products %}\n\t\t\t\t\t\t\t\t\t\t{% unless cp.id == product.id %}\n\t\t\t\t\t\t\t\t\t\t\t{% assign cp_compare_key = cp.metafields.custom.compare_key.value %}\n\t\t\t\t\t\t\t\t\t\t\t{% if cp_compare_key == blank %}\n\t\t\t\t\t\t\t\t\t\t\t\t{% assign cp_compare_key = cp.handle | replace: '-', '_' %}\n\t\t\t\t\t\t\t\t\t\t\t{% endif %}\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t{% assign cp_value = entry[cp_compare_key] | metafield_tag %}\n\t\t\t\t\t\t\t\t\t\t\t<td class=\"aplus-data-column\" style=\"min-width: 230px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t{% if cp_value != blank %}\n\t\t\t\t\t\t\t\t\t\t\t\t\t{{ cp_value.value | default: cp_value }}\n\t\t\t\t\t\t\t\t\t\t\t\t{% else %}\n\t\t\t\t\t\t\t\t\t\t\t\t\t—\n\t\t\t\t\t\t\t\t\t\t\t\t{% endif %}\n\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t{% endunless %}\n\t\t\t\t\t\t\t\t\t{% endfor %}\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<tr>   \n\t\t\t\t\t\t\t\t<td class=\"attribute a-text-bold\">\n\t\t\t\t\t\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"a-text-bold\"> Heat style </span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t\t\t\t\t\t<span class=\"description\">\n\t\t\t\t\t\t\t\t\t\tClean electric\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</td>      \n\t\t\t\t\t\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t\t\t\t\t\t<span class=\"description\">\n\t\t\t\t\t\t\t\t\t\tBurning coal\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</td>           \n\t\t\t\t\t\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t\t\t\t\t\t<span class=\"description\">\n\t\t\t\t\t\t\t\t\t\tDry heat\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</td>      \n\t\t\t\t\t\t\t</tr> \n\t\t\t\t\t\t\t\n\t\t<tr>   \n\t\t\t<td class=\"attribute a-text-bold\">\n\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t<span class=\"a-text-bold\"> What you use </span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t<span class=\"description\">\n\t\t\t\t\tMolasses + dry herb\n\t\t\t\t</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">\n\t\t\t\t\tShisha molasses\n\t\t\t\t</span>\n\t\t\t</td>           \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">\n\t\t\t\t\tDry herb\n\t\t\t\t</span>\n\t\t\t</td>      \n\n\t\t</tr> \n\t\t\t\t\t\t\n\t\t<tr>   \n\t\t\t<td class=\"attribute a-text-bold\">\n\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t<span class=\"a-text-bold\"> Flavor quality </span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t<span class=\"description\">\n\t\t\t\t\tPure flavor\n\t\t\t\t</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">\n\t\t\t\t\tCoal-tainted\n\t\t\t\t</span>\n\t\t\t</td>           \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">\n\t\t\t\t\tHerb taste\n\t\t\t\t</span>\n\t\t\t</td>      \n\n\t\t</tr>\n\t\t\t\t\t\n\t\t<tr>  \n\t\t\t<td class=\"attribute a-text-bold\">\n\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t<span class=\"a-text-bold\"> Cloud style </span> \n\t\t\t\t</div>\n\t\t\t</td>\n\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t<span class=\"description\">Big clouds</span>\n\t\t\t</td>\n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Heavy smoke</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Light vapor</span>\n\t\t\t</td> \n\t\t\n\t\t</tr>\n\t\t\t\t\n\t\t\t\t\n\t\t<tr>  \n\t\t\t<td class=\"attribute a-text-bold\">\n\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t<span class=\"a-text-bold\">Session vibe</span>\n\t\t\t\t</div>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t<span class=\"description\">Party or solo ritual</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Old-school ritual</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Solo sessions</span>\n\t\t\t</td> \n\t\t</tr> \n\t\t\t\n\t\t<tr>   \n\t\t\t<td class=\"attribute a-text-bold\">\n\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t<span class=\"a-text-bold\">Session time</span>\n\t\t\t\t</div>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t<span class=\"description\">Long sessions</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Long sessions</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Short sessions</span>\n\t\t\t</td> \n\t\t\n\t\t</tr>\n\t\t\n\t\t\n\t\t<tr>  \n\t\t\t<td class=\"attribute a-text-bold\">\n\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t<span class=\"a-text-bold\">Setup</span>\n\t\t\t\t</div>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t<span class=\"description\">Fast setup</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Messy prep</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Simple use</span>\n\t\t\t</td>\n\t\t\n\n\t\t</tr>  \n\t\n\t\t<tr>  \n\t\t\t<td class=\"attribute a-text-bold\">\n\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t<span class=\"a-text-bold\"> Portability </span>\n\t\t\t\t</div>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t<span class=\"description\">Cord-free</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Bulky setup</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Plug-in only</span>\n\t\t\t</td>\n\t\t\n\t\t</tr>\n\n\t\t<tr>  \n\t\t\t<td class=\"attribute a-text-bold\">\n\t\t\t\t<div class=\"comparison-metric-name \" data-inline-content=\"\" data-position=\"triggerRight\">\n\t\t\t\t\t<span class=\"a-text-bold\"> Best for </span>\n\t\t\t\t</div>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column active active-item second-sticky-column\">\n\t\t\t\t<span class=\"description\">Modern hookah</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Traditional smokers</span>\n\t\t\t</td>      \n\t\t\t<td class=\"aplus-data-column secondary-content-column\">\n\t\t\t\t<span class=\"description\">Personal vaping</span>\n\t\t\t</td>\n\n\t\t</tr>\n\n\t</tbody>\n</table>\n</div>\n</div>\n<div class=\"text-center\">\n\t<strong>Pure flavor. Big clouds. Modern hookah sessions without coal, flame, or the mess</strong>\n</div> \n</div>\n</div>\n</div>",
        "background_color": "",
        "text_color": ""
      }
    },
    "video_with_text_overlay_h6aGCA": {
      "type": "video-with-text-overlay",
      "blocks": {
        "subheading_6yPpJh": {
          "type": "subheading",
          "disabled": true,
          "settings": {
            "text": "ENSŌ"
          }
        },
        "heading_8wEkit": {
          "type": "heading",
          "settings": {
            "heading": "A revolutionary new way to elevate your herb experience",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_m9gQAi": {
          "type": "text",
          "settings": {
            "text": "<p>With <strong>ENSŌ </strong>you can now prolong your vaping session and enjoy amazing clouds in the process by mixing your favorite herb with nicotine-free herbal molasses. This method allows you to have full control over your herb dosage over longer vaping sessions while enjoying, pure, flavorful clouds.</p>"
          }
        }
      },
      "block_order": [
        "subheading_6yPpJh",
        "heading_8wEkit",
        "text_m9gQAi"
      ],
      "disabled": true,
      "settings": {
        "custom_class": "video-text-overlay-section",
        "full_width": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "video": "shopify://files/videos/web_enso_taste_v1_smaller.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "content_alignment": "md:content-middle-center",
        "content_alignment_mobile": "content-middle-center",
        "link": "",
        "min_height": 640,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 35,
        "overlay_type": "solid"
      }
    },
    "image_with_text_overlay_xkykE8": {
      "type": "image-with-text-overlay",
      "blocks": {
        "heading_3nJwwr": {
          "type": "heading",
          "settings": {
            "heading": "A revolutionary new way to elevate your herb experience",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_UiQgEN": {
          "type": "text",
          "settings": {
            "text": "<p>With <strong>ENSŌ </strong>you can now prolong your vaping session and enjoy amazing clouds in the process by mixing your favorite herb with nicotine-free herbal molasses. This method allows you to have full control over your herb dosage over longer vaping sessions while enjoying, pure, flavorful clouds.</p>"
          }
        }
      },
      "block_order": [
        "heading_3nJwwr",
        "text_UiQgEN"
      ],
      "name": "t:sections.image-with-text-overlay.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "image": "shopify://shop_images/Enso-2.webp",
        "content_alignment": "md:content-middle-center",
        "content_alignment_mobile": "content-middle-center",
        "link": "",
        "min_height": 640,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 30,
        "overlay_type": "solid"
      }
    },
    "text_with_icons_a8YfK9": {
      "type": "text-with-icons",
      "blocks": {
        "column_nmrm4V": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/ICON_E150-01_837259cd-43e2-4bbe-9f1a-9327bb3c37be.png",
            "icon": "package-check",
            "heading": "Crafted for Exploration",
            "content": "<p>Mix, match, and experiment with endless flavor and herb combinations to find your personal favorite. ENSŌ turns every session into a journey of discovery.</p>"
          }
        },
        "column_dnX7Pm": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/ICON_E150-02_debadcea-dcf3-4918-8e67-3d667256a003.png",
            "icon": "message-chat-circle",
            "heading": "45 minutes sessions of Enjoyment",
            "content": "<p>Enjoy pure, consistent flavor and long-lasting sessions with ENSŌ. Experience rich clouds, smooth performance, and lasting durability—perfect for elevating your downtime.</p>"
          }
        },
        "column_R93rwb": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/ICON_E150-03_318a2fa7-cf65-4f21-bbb6-84c305facdd7.png",
            "icon": "return",
            "heading": "Modern Meets Timeless",
            "content": "<p>Blend the timeless ritual of hookah with the modern lifestyle of herb vaping. Enso redefines how you unwind.</p>"
          }
        },
        "column_VmhR79": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/ICON_E150-04_8125116a-c00f-4faa-a366-9ffaa277b235.png",
            "icon": "credit-card-shield",
            "heading": "Easy to use / Easy to clean",
            "content": "<p>Effortless quick setup, easy to use, easy to clean, and always ready when you are. Have up to 2.5 hours of battery on one charge.</p>"
          }
        }
      },
      "block_order": [
        "column_nmrm4V",
        "column_dnX7Pm",
        "column_R93rwb",
        "column_VmhR79"
      ],
      "custom_css": [
        "@media screen and (max-width: 480px) {.inline-block p {font-size: 14px; }}"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "enable_swipe_on_mobile": false,
        "columns_mobile": "1",
        "item_heading_size": "h5",
        "item_text_alignment": "text-center",
        "item_text_alignment_mobile": "",
        "icon_background": "circle",
        "icon_width": 64,
        "heading": "",
        "heading_size": "h2",
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": "",
        "icon_background_color": "",
        "icon_color": "",
        "heading_html_tag": "h2"
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
    "logo_list_xeE8AU": {
      "type": "logo-list",
      "blocks": {
        "logo_CjcJ3X": {
          "type": "logo",
          "settings": {
            "image": "shopify://shop_images/Icons-01.webp",
            "link": "",
            "width": 100
          }
        },
        "logo_pQ8M9h": {
          "type": "logo",
          "settings": {
            "image": "shopify://shop_images/Icons-02.webp",
            "link": "",
            "width": 100
          }
        },
        "logo_yzn9C7": {
          "type": "logo",
          "settings": {
            "image": "shopify://shop_images/Icons-03.webp",
            "link": "",
            "width": 100
          }
        },
        "logo_E7xcCY": {
          "type": "logo",
          "settings": {
            "image": "shopify://shop_images/Icons_enso-04.webp",
            "link": "",
            "width": 100
          }
        },
        "logo_A8wEa6": {
          "type": "logo",
          "settings": {
            "image": "shopify://shop_images/Icons-06.webp",
            "link": "",
            "width": 100
          }
        },
        "logo_DiP8bT": {
          "type": "logo",
          "settings": {
            "image": "shopify://shop_images/Icons-05.webp",
            "link": "",
            "width": 100
          }
        }
      },
      "block_order": [
        "logo_CjcJ3X",
        "logo_pQ8M9h",
        "logo_yzn9C7",
        "logo_E7xcCY",
        "logo_A8wEa6",
        "logo_DiP8bT"
      ],
      "name": "t:sections.logo-list.presets__0.name",
      "settings": {
        "full_width": true,
        "logo_opacity": 100,
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
    },
    "video_with_text_N4kN6G": {
      "type": "video-with-text",
      "blocks": {
        "heading_6Kw947": {
          "type": "heading",
          "settings": {
            "heading": "Coal-Free Comfort",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_rYk9Xj": {
          "type": "text",
          "settings": {
            "text": "<p>Enjoy pure, flavorful, nicotine-free vapors without the risks. ENSŌ's fully electric design eliminates most toxic carbon monoxide and harmful chemicals associated with burning coal.</p>"
          }
        }
      },
      "block_order": [
        "heading_6Kw947",
        "text_rYk9Xj"
      ],
      "name": "t:sections.video-with-text.presets__0.name",
      "settings": {
        "custom_class": "video-with-text-section",
        "full_width": true,
        "remove_bottom_spacing": false,
        "autoplay": true,
        "loop": true,
        "video": "shopify://files/videos/881118a7195845919250bb1bb8d1af0a.HD-720p-4.5Mbps-77491262.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "image_size": "media--ratio-4-3",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "video_with_text_ERViGG": {
      "type": "video-with-text",
      "blocks": {
        "heading_7azPXD": {
          "type": "heading",
          "settings": {
            "heading": "Cordless Convenience",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_V9jmTJ": {
          "type": "text",
          "settings": {
            "text": "<p>Enjoy the best shisha moments with friends anywhere. The ENSŌ features a swap-out battery for easy, on-the-go use.</p>"
          }
        }
      },
      "block_order": [
        "heading_7azPXD",
        "text_V9jmTJ"
      ],
      "name": "t:sections.video-with-text.presets__0.name",
      "settings": {
        "custom_class": "video-with-text-section",
        "full_width": true,
        "remove_bottom_spacing": false,
        "autoplay": true,
        "loop": true,
        "video": "shopify://files/videos/ab3eb3b3a4e74553991a274732af51b9.HD-720p-4.5Mbps-77492579.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "image_size": "media--ratio-4-3",
        "image_position": "left",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "video_with_text_tg9GRm": {
      "type": "video-with-text",
      "blocks": {
        "heading_3JzCaE": {
          "type": "heading",
          "settings": {
            "heading": "Magnetic Simplicity",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_QMcBjM": {
          "type": "text",
          "settings": {
            "text": "<p>The magnetically attachable mouthpieces effortlessly eliminate the clutter and hassle of awkwardly hanging shisha pipes.</p>"
          }
        }
      },
      "block_order": [
        "heading_3JzCaE",
        "text_QMcBjM"
      ],
      "disabled": true,
      "name": "t:sections.video-with-text.presets__0.name",
      "settings": {
        "custom_class": "video-with-text-section",
        "full_width": true,
        "remove_bottom_spacing": false,
        "autoplay": true,
        "loop": true,
        "video": "shopify://files/videos/da6f5b12bd4140049bb0a9473dd6d095.HD-720p-4.5Mbps-79892443.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "image_size": "media--ratio-4-3",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "image_with_text_D9Un9f": {
      "type": "image-with-text",
      "blocks": {
        "heading_ptdxbh": {
          "type": "heading",
          "settings": {
            "heading": "Magnetic Simplicity",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_BGnLxe": {
          "type": "text",
          "settings": {
            "text": "<p>The magnetically attachable mouthpieces effortlessly eliminate the clutter and hassle of awkwardly hanging shisha pipes.</p>"
          }
        }
      },
      "block_order": [
        "heading_ptdxbh",
        "text_BGnLxe"
      ],
      "name": "t:sections.image-with-text.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": false,
        "image": "shopify://shop_images/Enso-Product_Page-1.webp",
        "image_size": "media--ratio-4-3",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "video_with_text_w9UM3m": {
      "type": "video-with-text",
      "blocks": {
        "subheading_U98VpF": {
          "type": "subheading",
          "settings": {
            "text": "ENSŌ's custom Heating algorythm ensures"
          }
        },
        "heading_fN4GfY": {
          "type": "heading",
          "settings": {
            "heading": "Formidable Clouds",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_WRLyDB": {
          "type": "text",
          "settings": {
            "text": "<p>ENSŌ delivers rich, smooth vapor and dense clouds for a better non-nicotine herbal shisha experience.</p>"
          }
        }
      },
      "block_order": [
        "subheading_U98VpF",
        "heading_fN4GfY",
        "text_WRLyDB"
      ],
      "disabled": true,
      "name": "t:sections.video-with-text.presets__0.name",
      "settings": {
        "custom_class": "video-with-text-section",
        "full_width": true,
        "remove_bottom_spacing": false,
        "autoplay": true,
        "loop": true,
        "video": "shopify://files/videos/928b86f2b2c54f409d83866a94dee497.HD-1080p-7.2Mbps-33843180.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "image_size": "media--ratio-4-3",
        "image_position": "left",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "image_with_text_rzfQHU": {
      "type": "image-with-text",
      "blocks": {
        "subheading_dYtQrG": {
          "type": "subheading",
          "settings": {
            "text": "ENSŌ's custom Heating algorythm ensures"
          }
        },
        "heading_HhQfay": {
          "type": "heading",
          "settings": {
            "heading": "Formidable Clouds",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_P3NMfb": {
          "type": "text",
          "settings": {
            "text": "<p>ENSŌ delivers rich, smooth vapor and dense clouds for a better non-nicotine herbal shisha experience.</p>"
          }
        }
      },
      "block_order": [
        "subheading_dYtQrG",
        "heading_HhQfay",
        "text_P3NMfb"
      ],
      "name": "t:sections.image-with-text.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": false,
        "image": "shopify://shop_images/Enso-Product_Page-circut.webp",
        "image_size": "media--ratio-4-3",
        "image_position": "left",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
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
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_FJxNdH": {
          "type": "text",
          "settings": {
            "text": "<p><strong>Ceramic cups</strong> <em>(included in the kit) </em>are a great way to use your ENSŌ to vaporize dry herbs. Just insert the mesh screen on the bottom and pack with your preferred type of nicotine-free herbal molasses mixed with loose-leaf. Vaping sessions can be as long as 45 minutes independent of your preference of dry herb dosage.</p>"
          }
        }
      },
      "block_order": [
        "subheading_h7hNDd",
        "heading_iPgaff",
        "text_FJxNdH"
      ],
      "settings": {
        "custom_class": "image-with-text-section",
        "full_width": true,
        "remove_bottom_spacing": true,
        "image": "shopify://shop_images/tobaco-nicotine-free-ceramic.png",
        "image_size": "media--ratio-4-3",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
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
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_gtgeT6": {
          "type": "text",
          "settings": {
            "text": "<p>You can you the <strong>ENSŌ wax pad</strong> for waxes and  oils/concentrates <em>(not included in the kit).</em></p>"
          }
        },
        "text_F3B3dt": {
          "type": "text",
          "settings": {
            "text": "<p>Or if you prefer a glass chamber for your wax we suggest the Glass Wax cup for ENSŌ </p>"
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
            "button_style": "",
            "button_size": "text-sm md:text-base",
            "button_background_color": "",
            "button_text_color": ""
          }
        }
      },
      "block_order": [
        "subheading_3aVWrD",
        "heading_hNffVk",
        "text_gtgeT6",
        "text_F3B3dt",
        "button_Ukrc6A"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": true,
        "image": "shopify://shop_images/WaxPad_enso_pr_img_cup.png",
        "image_size": "",
        "image_position": "left",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "image_with_text_overlay_4xRpQF": {
      "type": "image-with-text-overlay",
      "blocks": {
        "subheading_NHmnFx": {
          "type": "subheading",
          "disabled": true,
          "settings": {
            "text": "FIND OUT"
          }
        },
        "heading_gMNmnB": {
          "type": "heading",
          "disabled": true,
          "settings": {
            "heading": "How to use your ENSŌ",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_9nNryy": {
          "type": "text",
          "disabled": true,
          "settings": {
            "text": "<p>Browse the User Guide to get all the necessary information about your ENSŌ and how to use it or watch the tutorial videos.</p>"
          }
        },
        "button_qjUwVB": {
          "type": "button",
          "disabled": true,
          "settings": {
            "button_text": "User Guide",
            "button_link": "shopify://pages/enso-user-guide",
            "button_style": "button-outline",
            "button_size": "text-sm md:text-base",
            "button_background_color": "#ffffff",
            "button_text_color": "#000000"
          }
        },
        "button_RRHWrG": {
          "type": "button",
          "disabled": true,
          "settings": {
            "button_text": "How to Videos",
            "button_link": "shopify://pages/enso-how-to-videos",
            "button_style": "button-outline",
            "button_size": "text-sm md:text-base",
            "button_background_color": "#ffffff",
            "button_text_color": "#000000"
          }
        },
        "heading_FhBdLT": {
          "type": "heading",
          "settings": {
            "heading": "Why Choose ENSŌ",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_jMeEJf": {
          "type": "text",
          "settings": {
            "text": "<p>ENSŌ combines smooth vapor & modular design to give you a better non-nicotine herbal shisha experience. Enjoy a cleaner way to relax without compromising on style.</p>"
          }
        }
      },
      "block_order": [
        "subheading_NHmnFx",
        "heading_gMNmnB",
        "text_9nNryy",
        "button_qjUwVB",
        "button_RRHWrG",
        "heading_FhBdLT",
        "text_jMeEJf"
      ],
      "settings": {
        "custom_class": "image-text-overlay-section",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": true,
        "use_original_media_size": false,
        "image": "shopify://shop_images/Enso-1_edd0f1ee-5138-4f33-a96f-1ac710f5df7a.webp",
        "content_alignment": "md:content-middle-center",
        "content_alignment_mobile": "content-middle-center",
        "link": "",
        "min_height": 640,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 50,
        "overlay_type": "solid"
      }
    },
    "featured_collection_yimCUa": {
      "type": "featured-collection",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "carousel": true,
        "products_count": 4,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "products": [
          "enso",
          "legacy-core",
          "legacy-pro-2",
          "airvape-x",
          "airvape-xs-go",
          "airvape-om-keychain-waxpen",
          "breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus"
        ],
        "collection": "enso-accessories",
        "subheading": "",
        "heading": "ENSŌ ACCESSORIES",
        "heading_size": "h2",
        "text_alignment": "text-center",
        "link_text": "View all",
        "link_url": "shopify://collections/airvape-x-accessories",
        "background_color": "",
        "text_color": "",
        "heading_color": "",
        "heading_html_tag": "h2"
      }
    },
    "custom_section_YRfa83": {
      "type": "custom-section",
      "blocks": {
        "ai_gen_block_657f32b_yxxajR": {
          "type": "ai_gen_block_657f32b",
          "name": "Image slider",
          "settings": {
            "data_source": "metafield",
            "metafield_namespace": "custom",
            "metafield_key": "user_guide",
            "image_text_1": "",
            "image_link_1": "",
            "new_image_link_1": false,
            "image_text_2": "",
            "image_link_2": "",
            "new_image_link_2": false,
            "image_text_3": "",
            "image_link_3": "",
            "new_image_link_3": false,
            "image_text_4": "",
            "image_link_4": "",
            "new_image_link_4": false,
            "image_text_5": "",
            "image_link_5": "",
            "new_image_link_5": false,
            "image_text_6": "",
            "image_link_6": "",
            "new_image_link_6": false,
            "image_text_7": "",
            "image_link_7": "",
            "new_image_link_7": false,
            "image_text_8": "",
            "image_link_8": "",
            "new_image_link_8": false,
            "aspect_ratio": "portrait",
            "slides_desktop": 3,
            "slides_tablet": 3,
            "slides_mobile": 2,
            "slide_gap": 16,
            "slide_border_radius": 6,
            "show_arrows": true,
            "show_dots": true,
            "arrow_color": "#ffffff",
            "arrow_background": "#000000",
            "dot_color": "#000000",
            "autoplay": false,
            "autoplay_speed": 3000,
            "infinite_loop": false
          },
          "blocks": {}
        }
      },
      "block_order": [
        "ai_gen_block_657f32b_yxxajR"
      ],
      "name": "Custom Section",
      "settings": {
        "full_width": true,
        "remove_horizontal_space": false,
        "remove_vertical_space": false,
        "content_width": "normal",
        "subheading": "",
        "heading": "USER GUIDE",
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
    },
    "custom_section_Rrg6pT": {
      "type": "custom-section",
      "blocks": {
        "ai_gen_block_657f32b_6ciKcf": {
          "type": "ai_gen_block_657f32b",
          "settings": {
            "data_source": "manual",
            "metafield_namespace": "custom",
            "metafield_key": "user_guide",
            "image_1": "shopify://shop_images/Unboxing-01.webp",
            "image_text_1": "ENSŌ Unboxing",
            "image_link_1": "https://www.youtube.com/watch?v=kAVGefMbILA",
            "new_image_link_1": true,
            "image_2": "shopify://shop_images/Quick_setup-01.webp",
            "image_text_2": "ENSŌ Quick Setup",
            "image_link_2": "https://www.youtube.com/watch?v=hm01ZbaWdpY",
            "new_image_link_2": true,
            "image_3": "shopify://shop_images/Cleaning-01.webp",
            "image_text_3": "ENSŌ Cleaning",
            "image_link_3": "https://www.youtube.com/watch?v=gAHT4Sp2tOM",
            "new_image_link_3": true,
            "image_text_4": "",
            "image_link_4": "",
            "new_image_link_4": false,
            "image_text_5": "",
            "image_link_5": "",
            "new_image_link_5": false,
            "image_text_6": "",
            "image_link_6": "",
            "new_image_link_6": false,
            "image_text_7": "",
            "image_link_7": "",
            "new_image_link_7": false,
            "image_text_8": "",
            "image_link_8": "",
            "new_image_link_8": false,
            "aspect_ratio": "auto",
            "slides_desktop": 3,
            "slides_tablet": 3,
            "slides_mobile": 1,
            "slide_gap": 16,
            "slide_border_radius": 12,
            "show_arrows": true,
            "show_dots": true,
            "arrow_color": "#ffffff",
            "arrow_background": "#000000",
            "dot_color": "#000000",
            "autoplay": false,
            "autoplay_speed": 3000,
            "infinite_loop": false
          },
          "blocks": {}
        }
      },
      "block_order": [
        "ai_gen_block_657f32b_6ciKcf"
      ],
      "name": "Custom Section",
      "settings": {
        "full_width": true,
        "remove_horizontal_space": false,
        "remove_vertical_space": false,
        "content_width": "normal",
        "subheading": "",
        "heading": "HOW TO USE",
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
    },
    "featured_collection_9g4PBk": {
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
        "heading_html_tag": "p"
      }
    },
    "product_faqs_jLzbm7": {
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
    "custom_section_PzPGnU",
    "177485716168cc23cb",
    "image_with_text_MwCXKV",
    "image_with_text_cCn7Jt",
    "custom_liquid_tPwXGU",
    "video_with_text_overlay_h6aGCA",
    "image_with_text_overlay_xkykE8",
    "text_with_icons_a8YfK9",
    "image_before_after_NAGAWD",
    "logo_list_xeE8AU",
    "video_with_text_N4kN6G",
    "video_with_text_ERViGG",
    "video_with_text_tg9GRm",
    "image_with_text_D9Un9f",
    "video_with_text_w9UM3m",
    "image_with_text_rzfQHU",
    "image_with_text_xfbNRK",
    "image_with_text_AJaKtP",
    "image_with_text_overlay_4xRpQF",
    "featured_collection_yimCUa",
    "custom_section_YRfa83",
    "custom_section_Rrg6pT",
    "featured_collection_9g4PBk",
    "product_faqs_jLzbm7"
  ]
}
```
