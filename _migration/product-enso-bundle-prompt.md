# Migration Prompt — Product Template: ENSŌ BUNDLE (`product.enso-bundle.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-enso** prompt (this template is a trimmed/re-themed variant of it — read that prompt first, it documents the shared `main-product.css`, the sticky media gallery, the sticky add-to-cart, and the Hulk form-modal trigger), the **product-core** prompt (§5 embeds the shared `main-product.css` verbatim), the **product-card/featured-collection** prompt, and the **image-slider (ai_gen_block_657f32b)** notes. Assign this template (suffix **`enso-bundle`**) to whichever ENSŌ bundle/kit product uses it in Admin.
> This documents **every section, every block, every behavior** and includes the **full `product.enso-bundle.json`** at the bottom.

---

Recreate my **ENSŌ BUNDLE product** page (`templates/product.enso-bundle.json`) so it looks and behaves identically. It's a **trimmed variant of the ENSŌ template**: same PDP shell, same core content blocks (award-comparison hardware, before/after slider, logo list, 4 video-with-text blocks, ceramic-cups/wax-pad blocks, two image-slider sections), but with the **hardcoded "WHY ENSO WINS?" comparison table and the two award-badge sections removed**, all **four video-with-text(-overlay) sections switched ON** (no disabled video→image fallback pairs left), a couple of buy-box accordions disabled, and the final featured-collection swapped to a **bundle/kit product list** under a different heading. Copy the JSON verbatim, port the custom snippets/sections + CSS (shared with ENSŌ/CORE — don't re-embed), create the metafields, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.enso-bundle.json` — preserve section order, every `"disabled": true`, all block settings, and the header comment.
2. Port the custom section/snippet files and `assets/main-product.css` (shared/identical to the file embedded in the **product-core** prompt §5 — do not re-embed here, just confirm it's already ported). For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — many blocks/sections are **empty without them**.
4. Re-upload **images/videos** (§7) and assign the **`enso-bundle`** template to the target product.
5. **This template does NOT contain the "WHY ENSO WINS?" hardcoded comparison table** (`custom_liquid_tPwXGU` from the base ENSŌ template) — confirmed absent from both `sections` and `order`. Do not add it. It also drops the two award-badge `image-with-text` sections ("Award-Winning Performance", "Red Dot Design Award") that precede it on the base ENSŌ template.
6. **All four `video-with-text`/`video-with-text-overlay` sections are ENABLED here** (unlike the base ENSŌ template, where 3 of the 4 are `disabled` and paired with an enabled image-with-text fallback carrying identical copy). This template has **no such fallback sections** — verify all four videos actually play.
7. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (19) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `custom_section_PzPGnU` | custom-section ⚑ | on | "FOLLOW US ON YOUTUBE" → **product-meta-shorts** video carousel |
| 3 | `177485716168cc23cb` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews (limit **4**, maxwidth 1080 — matches CORE, not base ENSŌ's 5/1200) |
| 4 | `video_with_text_overlay_h6aGCA` | video-with-text-overlay | **on** ⚠️ | "A revolutionary new way to elevate your herb experience" — **enabled here** (disabled on base ENSŌ); its `subheading` sub-block ("ENSŌ") stays disabled |
| 5 | `text_with_icons_a8YfK9` | text-with-icons | on | 4 feature columns (Crafted for Exploration, etc.) |
| 6 | `image_before_after_NAGAWD` | image-before-after | on | "What difference a few minutes can make" before/after slider |
| 7 | `logo_list_xeE8AU` | logo-list | on | 6 award/press logos |
| 8 | `video_with_text_N4kN6G` | video-with-text | on | "Coal-Free Comfort" |
| 9 | `video_with_text_ERViGG` | video-with-text | on | "Cordless Convenience" |
| 10 | `video_with_text_tg9GRm` | video-with-text | **on** ⚠️ | "Magnetic Simplicity" — **enabled here** (disabled on base ENSŌ) |
| 11 | `video_with_text_w9UM3m` | video-with-text | **on** ⚠️ | "Formidable Clouds" — **enabled here** (disabled on base ENSŌ) |
| 12 | `image_with_text_xfbNRK` | image-with-text | on | "Ceramic cups" |
| 13 | `image_with_text_AJaKtP` | image-with-text | on | "For Wax…" + **"Buy Wax Pad"** button → `wax-pad-for-enso` product (Hulk form trigger class present but popup disabled) |
| 14 | `image_with_text_overlay_UQAiCG` | image-with-text-overlay | on | "Why Choose ENSŌ" — 5 sub-blocks **disabled** (the "How to use your ENSŌ" User-Guide CTA half is hidden; only the "Why Choose ENSŌ" copy shows) |
| 15 | `featured_collection_yimCUa` | featured-collection ⚑ | on | "ENSŌ ACCESSORIES" carousel |
| 16 | `custom_section_YRfa83` | custom-section ⚑ | on | "USER GUIDE" → **ai_gen_block_657f32b** image slider **#1** (metafield-driven) |
| 17 | `custom_section_pKMTXJ` | custom-section ⚑ | on | "HOW TO USE" → **ai_gen_block_657f32b** image slider **#2** (manual images + YouTube links) |
| 18 | `featured_collection_9g4PBk` | featured-collection ⚑ | on | "COMPLETE YOUR MEMORIAL DAY COLLECTION" carousel — **bundle/kit products**, not the ENSŌ base's "OUR SIGNATURE MODELS" device list |
| 19 | `product_faqs_3giXY3` | product-faqs ⚑ | on | "FAQS" accordion |

**Disabled = present in JSON but not rendered** (keep the flags). **No sections are disabled at the top level in this template** — everything in the `order` array renders. Only sub-blocks inside `main` and `image_with_text_overlay_UQAiCG` carry `disabled: true` (see §8). Confirmed absent from both `sections` and `order`: `image_with_text_MwCXKV` (Award-Winning Performance), `image_with_text_cCn7Jt` (Red Dot Design Award), `custom_liquid_tPwXGU` (WHY ENSO WINS? comparison table), and all three video→image fallback sections from the base ENSŌ template (`image_with_text_overlay_xkykE8`, `image_with_text_D9Un9f`, `image_with_text_rzfQHU`).

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (shared/identical to the CORE/ENSŌ templates' — already documented + embedded in `product-core-prompt.md` §5; don't re-embed, just confirm it's ported).
- `sections/custom-section.liquid` — generic wrapper: heading + link + hosts blocks (`{% content_for 'blocks' %}`, blocks typed `@app`/`@theme`). Used **3×** here:
  1. `custom_section_PzPGnU` "FOLLOW US ON YOUTUBE" → hosts a `product-meta-shorts` block.
  2. `custom_section_YRfa83` "USER GUIDE" → hosts an `ai_gen_block_657f32b` block (slider #1, metafield-driven).
  3. `custom_section_pKMTXJ` "HOW TO USE" → hosts an `ai_gen_block_657f32b` block (slider #2, manual/YouTube-linked).
- `blocks/product-meta-shorts.liquid` (YouTube/short-video carousel from a product metafield). **`play_button_size: 68`** here (base CORE/ENSŌ use 48 — bigger play button, verify this is intentional).
- `blocks/ai_gen_block_657f32b.liquid` (image slider; self-contained scoped CSS/JS). **Used twice** — see §4 for the two instances' settings.
- `sections/product-faqs.liquid` (FAQ accordion from a product metafield).
- `sections/featured-collection.liquid` (shared customized featured collection). Used ×2.
- `snippets/product-sticky-add-to-cart.liquid` (see the **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**, same as CORE/ENSŌ).
- Buy-box block snippets (mostly stock, rendered by `product-info.liquid`): `custom_badges`, `title`, `price`, `text`, `rich_text_block`, `payment_installments`, `variant_picker`(+radio/`radio-image`), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.
- **Hulk form modal**: `image_with_text_AJaKtP`'s "Buy Wax Pad" button carries `hulk_form_popup_class: "hulk-form-modal-custom-trigger"` with `enable_form_popup: false` and blank `hulk_form_id_block` — identical inert setup to the base ENSŌ template. See the **hulk-form-modal-fix** prompt for what that class does if/when the popup is re-enabled.
- **No custom-liquid section file needed** — unlike the base ENSŌ template, this one has **no** hardcoded `custom_liquid_tPwXGU` comparison-table block. Nothing to port for it. **No hardcoded old-store CDN URLs exist anywhere in this template's JSON** (grepped for `cdn.shopify.com` — zero hits; all media references are `shopify://shop_images/…` or `shopify://files/videos/…`, i.e. portable).

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          ⚠️ DIFFERS FROM ENSŌ (56) AND CORE (56) — narrower media column
media_size: ""                   ⚠️ DIFFERS FROM ENSŌ/CORE ("1") — empty/adaptive instead of fixed
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: false
media_enable_video_looping: true
media_fit_height: true           (same as ENSŌ; CORE uses false)
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** same mechanism as CORE/ENSŌ — `carousel_vertical` renders a `<scroll-carousel vertical>` thumbnail rail + `<media-carousel>` main stage, sticky media column, `media_zoom: lightbox` fullscreen zoom, mobile swipeable carousel with thumbnail indicator, mobile title+reviews render above the gallery. Verify the narrower `desktop_media_width: 50` and empty `media_size` (adaptive aspect, not the fixed `"1"` used elsewhere) render correctly — flag if 4.2's schema doesn't support an empty `media_size` value.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; centered; same as CORE/ENSŌ.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order` (24 blocks — same block set/order as the base ENSŌ template). **Bold = custom/metafield-driven. ⛔ = disabled (hidden). ⚠️ = differs from base ENSŌ.**
1. **`custom_badges`** — product badge row. Enabled (same as base ENSŌ).
2. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`. Shows the product name.
3. `loox_rating` (Loox **app block**) — same settings as CORE/ENSŌ (`contentSize 16`, `[rating] ([count])`, floating widget, empty-rating widget). Hidden on mobile inside the buy box via shared `main-product.css`.
4. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
5. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product hook/tagline. Empty if `custom.hook_text` missing.
6. **`text`** "Customers outside the US and Canada **visit ensoshisha.eu**" → `https://ensoshisha.eu/`. Same as base ENSŌ.
7. `payment_installments` — Shop Pay installments messaging.
8. `variant_picker` — `type: radio`, `color_picker_type: radio-image`, `block_style: outlined`, rounded. `hide_sold_out_variants: false`.
9. **`text`** "**UpGrade to the ENSŌ**" → `/pages/upgrade-experience` (new tab). Same as base ENSŌ.
10. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false`, `show_gift_card_recipient: false`.
11. `delivery` — `delivery_from: 3` / `delivery_to: 5`.
12. **`icon_text_block` (`icon-text-pdp`, inline)** — same 5 trust icons as CORE/ENSŌ.
13. **`text` "Due to high demand, expect ENSŌ's shipping to take approximately 3 weeks" ⛔ disabled** (hidden).
14. **`description` ⛔ disabled** (stock accordion hidden; metafield accordions below replace it; `collapse_open: true` in JSON is irrelevant since disabled).
15–22. **`collapsible_content` ×8 — accordions:**
    - "Description" → `custom.description` — **enabled**, closed (`collapse_open: false`)
    - **"Key Features"** ⚠️ *(relabeled from ENSŌ's "Specifications" — same metafield `custom.specifications`)* → **enabled**, closed
    - "What's in the box?" → `custom.what_s_in_the_box` — **enabled**, closed
    - **"How to use?" ⛔ disabled** ⚠️ *(enabled on base ENSŌ)* → `custom.how_to_use`
    - **"Accessories" ⛔ disabled** ⚠️ *(enabled on base ENSŌ)* → `custom.parts_accessories`
    - "Warranty and Support" → `custom.lifetime_waranty` — **enabled**, closed
    - "Why Choose AirVape?" → hardcoded HTML (identical long copy to CORE/ENSŌ — no metafield) — **enabled**, closed
    - "The Stōry" ⛔ disabled — hardcoded ENSŌ origin-story copy (no metafield), same as base ENSŌ
23. **`icon_text_block` (`homepage-usps-info`, vertical)** — same 5 USP items as CORE/ENSŌ.
24. `share_button` — native share.

## 4. Content sections below the PDP — behaviors & hidden bits
- **`custom-section` "FOLLOW US ON YOUTUBE"** → `product-meta-shorts` block: metafield `custom.product_short_videos`, muted, red play button **68px** ⚠️ (CORE/ENSŌ use 48px), radius 12, 4/3/2 slides, arrows + dots.
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — `limit: 4`, `maxwidth: 1080` (matches CORE; base ENSŌ uses 5/1200).
- **video-with-text-overlay** "A revolutionary new way to elevate your herb experience" — `web_enso_taste_v1_smaller.webm`, overlay 35% solid, `custom_class: video-text-overlay-section`. **⚠️ ENABLED** (disabled on base ENSŌ template). Its `subheading` sub-block ("ENSŌ") stays `disabled: true`. **There is no `image_with_text_overlay_xkykE8` fallback section in this template** — don't add one.
- **text-with-icons** — 4 `column` blocks (Crafted for Exploration / 45 minutes sessions of Enjoyment / Modern Meets Timeless / Easy to use/Easy to clean), identical to base ENSŌ, including the scoped `custom_css`: `@media (max-width:480px) { .inline-block p { font-size:14px } }`.
- **image-before-after** "What difference a few minutes can make" — `before_357us_web.jpg` / `after_420us_web.jpg`, identical to base ENSŌ.
- **logo-list** — 6 `logo` blocks (`Icons-01.webp`…`Icons-03.webp`, `Icons_enso-04.webp`, `Icons-06.webp`, `Icons-05.webp`), identical to base ENSŌ.
- **video-with-text** "Coal-Free Comfort" — autoplay+loop `881118a7195845919250bb1bb8d1af0a…webm`, image right 50%, **`image_size: ""`** ⚠️ (base ENSŌ uses `media--ratio-4-3`).
- **video-with-text** "Cordless Convenience" — autoplay+loop `ab3eb3b3a4e74553991a274732af51b9…webm`, image left 50%, `image_size: ""` ⚠️ (base ENSŌ uses `media--ratio-4-3`).
- **video-with-text** "Magnetic Simplicity" — `da6f5b12bd4140049bb0a9473dd6d095…webm`, image right 50%, `image_size: ""`. **⚠️ ENABLED** (disabled on base ENSŌ). **No `image_with_text_D9Un9f` fallback section exists here** — don't add one.
- **video-with-text** "Formidable Clouds" — subheading "ENSŌ's custom Heating algorythm ensures", `928b86f2b2c54f409d83866a94dee497…webm`, image left 50%, `image_size: ""`. **⚠️ ENABLED** (disabled on base ENSŌ). **No `image_with_text_rzfQHU` fallback section exists here** — don't add one.
- **image-with-text** "Ceramic cups" — subheading "Your ENSŌ works amazingly with loose-leaf", `tobaco-nicotine-free-ceramic.png` right 50%, `remove_bottom_spacing: true`, `custom_class: image-with-text-section`. Identical to base ENSŌ.
- **image-with-text** "For Wax - use the ceramic cups with the ENSŌ wax pad" — `WaxPad_enso_pr_img_cup.png` left 50%, two text blocks + **"Buy Wax Pad"** button → `shopify://products/wax-pad-for-enso` (Hulk trigger class present but `enable_form_popup: false`). Identical to base ENSŌ.
- **image-with-text-overlay** "Why Choose ENSŌ" — **image swapped** ⚠️ to `web_support-6290_430x_bd914f99-8fd9-40c9-9bea-d59b7911fae8.png` (base ENSŌ uses `Enso-1_edd0f1ee-….webp`), overlay 50% solid, `enable_transparent_header: true`, `custom_class: image-text-overlay-section`. **5 sub-blocks disabled**: `subheading` "FIND OUT", `heading` "How to use your ENSŌ", intro `text`, buttons "User Guide" (→ `/pages/enso-user-guide`) + "How to Videos" (→ `/pages/enso-how-to-videos`) — same as base ENSŌ, this whole User-Guide CTA half stays hidden. Only the **enabled** `heading` "Why Choose ENSŌ" + `text` show.
- **featured-collection "ENSŌ ACCESSORIES"** — carousel, 4 products, from collection `enso-accessories`, "View all" → `airvape-x-accessories`. Identical to base ENSŌ.
- **custom-section "USER GUIDE"** → `ai_gen_block_657f32b` **image slider #1** — `data_source: metafield`, `custom.user_guide`. **`aspect_ratio: "auto"`** ⚠️ (base ENSŌ uses `"portrait"` — fixed crop; here it's natural size, no crop). **`slides_desktop: 3`** ⚠️ (base ENSŌ uses 4), `slides_tablet: 3`, `slides_mobile: 2`, gap 16, radius 6, arrows + dots, no autoplay, no infinite loop, `heading_html_tag: "p"` ⚠️ (base ENSŌ uses `"h2"`).
- **custom-section "HOW TO USE"** → `ai_gen_block_657f32b` **image slider #2** — `data_source: manual`, 3 hardcoded images with YouTube links: `Unboxing-01.webp` → "ENSŌ Unboxing" (youtube.com/watch?v=kAVGefMbILA), `Quick_setup-01.webp` → "ENSŌ Quick Setup" (…hm01ZbaWdpY), `Cleaning-01.webp` → "ENSŌ Cleaning" (…gAHT4Sp2tOM), all `new_image_link: true`. `aspect_ratio: "auto"`, 3/3/1 slides, gap 16, radius 12. Identical to base ENSŌ.
- **featured-collection "COMPLETE YOUR MEMORIAL DAY COLLECTION"** ⚠️ — carousel, 8 slots, manual product list: `xperience-kit`, `airvape-x-waterflow-kit`, `breathelet-power-pack`, `festival-pack`, `legacy-core-capsule-kit`, `legacy-core-stealth-carry-kit`, `legacy-core-waterflow-kit`, `legacy-pro-2-stealth-carry-kit`. **Completely different heading and product list from base ENSŌ's "OUR SIGNATURE MODELS"** (which lists standalone devices, not kits) — this is a bundle/kit-specific cross-sell.
- **product-faqs "FAQS"** — accordion from `custom.faqs`. Empty without the metafield.

## 5. `assets/main-product.css`
Shared/identical file to the one embedded verbatim in `product-core-prompt.md` §5 and referenced (not re-embedded) by `product-enso-prompt.md` §5 — same `.icon-text-block--inline`/`--vertical` layouts, `.qty-wrap`, buy-box `.loox-rating` mobile-hide rule, comparison-card rating weight, payment list, restock-notify button styling. No section-level `custom_css` on `main` in this template's JSON. Port that one file; do not duplicate it.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — all namespace `custom`
Without these, the matching block/section is **empty**:
| Key | Type | Used by | Note |
|---|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` | |
| `description` | rich text | "Description" accordion | |
| `specifications` | rich text | "Key Features" accordion | relabeled here, same key |
| `what_s_in_the_box` | rich text | "What's in the box?" accordion | |
| `how_to_use` | rich text | (accordion **disabled** here) | keep the metafield for parity in case re-enabled |
| `parts_accessories` | rich text | (accordion **disabled** here) | keep the metafield for parity in case re-enabled |
| `lifetime_waranty` | rich text | "Warranty and Support" accordion | |
| `product_short_videos` | list / rich text | product-meta-shorts carousel | |
| `user_guide` | list of images (or the block's expected source) | image slider #1 ("USER GUIDE") only — slider #2 ("HOW TO USE") is manual/hardcoded | |
| `faqs` | (per product-faqs schema) | FAQS accordion | |

> No `compare_key` metafield needed — this template carries no comparison-table logic at all (unlike base ENSŌ, which has an unused dead reference to it).

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `FAST_HEAT-UP.webp`, `PURE_FLAVOUR.webp`, `EASY_TO_USE.webp`, `LONG_BATTERY_LIFE.webp`, `ICON_E150-01_837259cd-….png`, `ICON_E150-02_debadcea-….png`, `ICON_E150-03_318a2fa7-….png`, `ICON_E150-04_8125116a-….png`, `before_357us_web.jpg`, `after_420us_web.jpg`, `Icons-01.webp`…`Icons-03.webp`, `Icons_enso-04.webp`, `Icons-05.webp`, `Icons-06.webp`, `tobaco-nicotine-free-ceramic.png`, `WaxPad_enso_pr_img_cup.png`, `web_support-6290_430x_bd914f99-8fd9-40c9-9bea-d59b7911fae8.png`, `Unboxing-01.webp`, `Quick_setup-01.webp`, `Cleaning-01.webp`. (Grep the JSON for `shopify://shop_images` to catch all — confirmed no absolute/hardcoded CDN URLs exist in this template.)
- **Videos → Content → Files:** `web_enso_taste_v1_smaller.webm` (now-enabled overlay), `881118a7195845919250bb1bb8d1af0a…webm` (Coal-Free Comfort), `ab3eb3b3a4e74553991a274732af51b9…webm` (Cordless Convenience), `da6f5b12bd4140049bb0a9473dd6d095…webm` (now-enabled Magnetic Simplicity), `928b86f2b2c54f409d83866a94dee497…webm` (now-enabled Formidable Clouds). Grep for `shopify://files/videos`. **All four are needed/visible now** (unlike base ENSŌ where 3 of these were hidden) — verify all four upload cleanly and autoplay+loop correctly since they're no longer optional.
- **Apps:** **Loox** (buy-box rating app-block + dynamic reviews app-block). Re-add both after installing Loox; app-block IDs will differ on the new store.
- **Collections:** `enso-accessories` (the other featured-collection has no `collection` set — manual product list only).
- **Products (featured + buttons):** `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus` (ENSŌ ACCESSORIES carousel); `xperience-kit`, `airvape-x-waterflow-kit`, `breathelet-power-pack`, `festival-pack`, `legacy-core-capsule-kit`, `legacy-core-stealth-carry-kit`, `legacy-core-waterflow-kit`, `legacy-pro-2-stealth-carry-kit` (COMPLETE YOUR MEMORIAL DAY COLLECTION carousel — verify these bundle/kit products exist on the new store); `wax-pad-for-enso` (Buy Wax Pad button target).
- **Pages:** `/pages/upgrade-experience` (buy-box "UpGrade to the ENSŌ" link), `shopify://pages/enso-user-guide` and `shopify://pages/enso-how-to-videos` (both buttons currently **disabled**, create for parity in case re-enabled).
- **Product media:** upload this product's gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections:** none at the top level — every section in `order` renders (this is the key structural difference from base ENSŌ, which disables 3 of its video sections).
- **Disabled buy-box blocks:** `text_xQ6jUh` ("high demand… 3 weeks"), `description_jfp4NG` (stock accordion), `collapsible_content_jgDBXh` ("How to use?" ⚠️ new vs. base ENSŌ), `collapsible_content_Bt6YhB` ("Accessories" ⚠️ new vs. base ENSŌ), `collapsible_content_bFwQxc` ("The Stōry").
- **Disabled sub-blocks:** `subheading_6yPpJh` ("ENSŌ", inside the now-**enabled** video overlay); `subheading_zXgU7M`, `heading_DkHdhq`, `text_Ry4Hx8`, `button_UQQmgX`, `button_dBaV7V` (all inside `image_with_text_overlay_UQAiCG` — the "How to use your ENSŌ" User-Guide CTA half, hidden; only "Why Choose ENSŌ" shows).
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px) — shared rule from `main-product.css`, same as CORE/ENSŌ.
- **6 enabled `collapsible_content` accordions all start CLOSED** (`collapse_open: false`); the 2 newly-disabled ones ("How to use?", "Accessories") and "The Stōry" stay hidden; the disabled stock `description` block's `collapse_open: true` is irrelevant since it's hidden.
- **No `pdp-aplus-comparison` and no hardcoded `custom-liquid` comparison table** anywhere in this template.
Keep all of the above exactly.

## 9. Report back
- Confirm the `enso-bundle` template is assigned; JSON valid; all `disabled` flags + closed accordions preserved.
- Confirm `main-product.css` (shared with CORE/ENSŌ) loads and both `icon_text_block` layouts render; buy-box Loox rating hides on mobile.
- Confirm the media gallery renders correctly with the narrower `desktop_media_width: 50` and empty `media_size` (adaptive, not fixed `"1"`) — flag if 4.2 needs a non-empty value here.
- Confirm **all four** `video-with-text`/`video-with-text-overlay` sections actually play (Coal-Free Comfort, Cordless Convenience, Magnetic Simplicity, Formidable Clouds, plus the overlay "revolutionary new way…") — none should fall back to a static image since no fallback sections exist in this template.
- Confirm custom sections/blocks ported: `product-meta-shorts` (68px play button), **both** `ai_gen_block_657f32b` instances (slider #1 now `auto`/3-wide metafield-driven vs. base ENSŌ's `portrait`/4-wide; slider #2 unchanged manual/YouTube-linked).
- Confirm the "Buy Wax Pad" button's Hulk trigger class is present (inert unless the popup is re-enabled) and links to the `wax-pad-for-enso` product.
- Confirm the final featured-collection shows the **bundle/kit product list** under "COMPLETE YOUR MEMORIAL DAY COLLECTION" (not the base ENSŌ device list) — verify all 8 kit products exist on the new store.
- Confirm **no** "WHY ENSO WINS?" comparison table and **no** award-badge sections render (they're absent by design here, not a migration gap).
- Confirm all `custom.*` metafields exist (else hook, accordions, shorts, "USER GUIDE" slider, FAQs are empty), Loox installed + both blocks re-added, and media/collections/products/pages created.

---

## FULL `templates/product.enso-bundle.json` — copy verbatim

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
            "heading": "Key Features",
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
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "How to use?",
            "content": "{{ product.metafields.custom.how_to_use | metafield_tag }}"
          }
        },
        "collapsible_content_Bt6YhB": {
          "type": "collapsible_content",
          "disabled": true,
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
            "play_button_size": 68,
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
            "limit": 4,
            "hide_thumbnails": false,
            "maxwidth": 1080,
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
        "image_size": "",
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
        "image_size": "",
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
      "name": "t:sections.video-with-text.presets__0.name",
      "settings": {
        "custom_class": "video-with-text-section",
        "full_width": true,
        "remove_bottom_spacing": false,
        "autoplay": true,
        "loop": true,
        "video": "shopify://files/videos/da6f5b12bd4140049bb0a9473dd6d095.HD-720p-4.5Mbps-79892443.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "image_size": "",
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
      "name": "t:sections.video-with-text.presets__0.name",
      "settings": {
        "custom_class": "video-with-text-section",
        "full_width": true,
        "remove_bottom_spacing": false,
        "autoplay": true,
        "loop": true,
        "video": "shopify://files/videos/928b86f2b2c54f409d83866a94dee497.HD-1080p-7.2Mbps-33843180.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "image_size": "",
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
    "image_with_text_overlay_UQAiCG": {
      "type": "image-with-text-overlay",
      "blocks": {
        "subheading_zXgU7M": {
          "type": "subheading",
          "disabled": true,
          "settings": {
            "text": "FIND OUT"
          }
        },
        "heading_DkHdhq": {
          "type": "heading",
          "disabled": true,
          "settings": {
            "heading": "How to use your ENSŌ",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_Ry4Hx8": {
          "type": "text",
          "disabled": true,
          "settings": {
            "text": "<p>Browse the User Guide to get all the necessary information about your ENSŌ and how to use it or watch the tutorial videos.</p>"
          }
        },
        "button_UQQmgX": {
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
        "button_dBaV7V": {
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
        "heading_JqUnir": {
          "type": "heading",
          "settings": {
            "heading": "Why Choose ENSŌ",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_etz4WT": {
          "type": "text",
          "settings": {
            "text": "<p>ENSŌ combines smooth vapor & modular design to give you a better non-nicotine herbal shisha experience. Enjoy a cleaner way to relax without compromising on style.</p>"
          }
        }
      },
      "block_order": [
        "subheading_zXgU7M",
        "heading_DkHdhq",
        "text_Ry4Hx8",
        "button_UQQmgX",
        "button_dBaV7V",
        "heading_JqUnir",
        "text_etz4WT"
      ],
      "settings": {
        "custom_class": "image-text-overlay-section",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": true,
        "use_original_media_size": false,
        "image": "shopify://shop_images/web_support-6290_430x_bd914f99-8fd9-40c9-9bea-d59b7911fae8.png",
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
            "aspect_ratio": "auto",
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
    "custom_section_pKMTXJ": {
      "type": "custom-section",
      "blocks": {
        "ai_gen_block_657f32b_bNk4UE": {
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
        "ai_gen_block_657f32b_bNk4UE"
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
          "xperience-kit",
          "airvape-x-waterflow-kit",
          "breathelet-power-pack",
          "festival-pack",
          "legacy-core-capsule-kit",
          "legacy-core-stealth-carry-kit",
          "legacy-core-waterflow-kit",
          "legacy-pro-2-stealth-carry-kit"
        ],
        "collection": "",
        "subheading": "",
        "heading": "COMPLETE YOUR MEMORIAL DAY COLLECTION",
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
    "product_faqs_3giXY3": {
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
    "video_with_text_overlay_h6aGCA",
    "text_with_icons_a8YfK9",
    "image_before_after_NAGAWD",
    "logo_list_xeE8AU",
    "video_with_text_N4kN6G",
    "video_with_text_ERViGG",
    "video_with_text_tg9GRm",
    "video_with_text_w9UM3m",
    "image_with_text_xfbNRK",
    "image_with_text_AJaKtP",
    "image_with_text_overlay_UQAiCG",
    "featured_collection_yimCUa",
    "custom_section_YRfa83",
    "custom_section_pKMTXJ",
    "featured_collection_9g4PBk",
    "product_faqs_3giXY3"
  ]
}
```
