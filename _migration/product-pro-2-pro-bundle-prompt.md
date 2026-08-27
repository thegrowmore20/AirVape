# Migration Prompt — Product Template: Legacy PRO 2 PRO Bundle (`product.pro-2-_pro-bundle.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-core** prompt and the **product-pro-2 (`pro-2-_po`)** prompt (this template shares almost all buy-box block types, the `main-product.css`, and the custom section files with those two — port them first if you haven't), the **product-card/featured-collection** prompt, the **sticky-add-to-cart** prompt, and the **image-slider (ai_gen_block_657f32b)** notes. Assign this template (suffix **`pro-2-_pro-bundle`**) to the Legacy PRO 2 PRO Bundle product in Admin.
> This documents **every section, every block, every behavior** — including the ways this template deliberately **diverges** from the base Legacy PRO 2 (`pro-2-_po`) template it was cloned from (live video instead of disabled-video-with-image-fallback, an accordion instead of a rich-text block, no spec-comparison section, a bundle-focused cross-sell collection) — embeds the **custom PDP CSS** verbatim (shared, unchanged), and includes the **full `product.pro-2-_pro-bundle.json`** at the bottom.

---

Recreate my **Legacy PRO 2 PRO Bundle product** page (`templates/product.pro-2-_pro-bundle.json`) so it looks and behaves identically. It's a customized `main-product` PDP followed by custom + stock content sections — **all 14 sections enabled, none disabled** (unlike the CORE and base PRO-2 templates, which each hide 2–4 sections). Copy the JSON verbatim, port the custom snippets/sections + CSS (shared with CORE/PRO-2 — do not duplicate), create the metafields, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.pro-2-_pro-bundle.json` — preserve section order, all block settings, and the header comment. Note: **no section or block in this template carries a `"disabled": true` flag** — if your port introduces one, that's a bug.
2. Port the custom section/snippet files and `assets/main-product.css` (embedded in §5 — **identical, shared file** with CORE and base PRO-2; do not create a third copy). For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — many blocks/sections are **empty without them**. This template does **not** use the comparison-table metafields (`comparison_features`, `comparison_products`, `compare_key`) — there is no `pdp-aplus-comparison` section here.
4. Re-upload **images/videos** (§7) and assign the **`pro-2-_pro-bundle`** template to the Legacy PRO 2 PRO Bundle product.
5. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (14) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `custom_section_eaLVtN` | custom-section ⚑ | on | "FOLLOW US ON YOUTUBE" → **product-meta-shorts** video carousel |
| 3 | `1759505359de5a7814` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews |
| 4 | `slideshow_gpnHad` | slideshow | **on** ⚠️ | "Just you, your vibe, and the Legacy PRO 2" video slide — **LIVE here** (this same section is disabled on both CORE and base PRO-2) |
| 5 | `text_with_icons_tqLMpf` | text-with-icons | on | 3 feature columns (Updated Heating, Industry Leading, Easy to Clean) |
| 6 | `collapsible_content_HdNgNc` | **collapsible-content** ⚠️ | on | "Major UpGrades" → "Features" accordion, **open by default** — replaces the base PRO-2's `rich-text` section with the same copy |
| 7 | `video_with_text_cbmaUp` | video-with-text | **on** ⚠️ | "Simply PRO" — **LIVE here** (disabled on base PRO-2, which shows an `image-with-text` fallback instead — that fallback section does **not exist** in this template) |
| 8 | `video_with_text_overlay_DTHfhk` | video-with-text-overlay | **on** ⚠️ | "Pure Bliss with Every Puff" — **LIVE here** (disabled on base PRO-2; its `image-with-text-overlay` fallback does **not exist** in this template) |
| 9 | `video_with_text_YjAd6V` | video-with-text | **on** ⚠️ | "From Herb to Wax" / "From Beginner to PRO" — **LIVE here** (disabled on base PRO-2; its `image-with-text` fallback does **not exist** in this template) |
| 10 | `video_nrLrNt` | **video** | on | full-width video, no heading/text/subheading (`pro2_inside_web.webm`) — same as base PRO-2 |
| 11 | `featured_collection_WqWJcP` | featured-collection ⚑ | on | "LEGACY PRO ACCESSORIES" carousel |
| 12 | `custom_section_ggzpUX` | custom-section ⚑ | on | "USER GUIDE" → **ai_gen_block_657f32b** image slider — ⚠️ **order swapped**: comes AFTER `featured_collection_WqWJcP` here, whereas on base PRO-2 the USER GUIDE slider comes BEFORE the accessories carousel |
| 13 | `featured_collection_CHmD3T` | featured-collection ⚑ | on | **"COMPLETE YOUR MEMORIAL DAY COLLECTION"** — a bundle/kit cross-sell carousel, entirely different product list from base PRO-2's "OUR SIGNATURE MODELS" |
| 14 | `product_faqs_WxJYCt` | product-faqs ⚑ | on | "FAQS" accordion |

**Zero disabled sections.** This is the headline structural difference from both sibling templates: CORE disables 2 sections, base PRO-2 disables 4 (each with an enabled image fallback right after it) — this bundle template disables **none**, and the 3 image-fallback sections that exist on base PRO-2 (`image_with_text_overlay_CbfRb6`, `image_with_text_zrXTcP`, `image_with_text_overlay_ipUg8e`, `image_with_text_94HDtX` — actually 4) **are not present in this JSON at all**, not even disabled. There is also **no `pdp-aplus-comparison` section** — the spec-comparison table that both CORE and base PRO-2 have is absent from this bundle template.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different (shared with CORE/PRO-2 — do not duplicate)
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5 — the **same file** used by CORE and base PRO-2; confirmed byte-identical here too).
- `sections/custom-section.liquid` (generic wrapper: heading + link + hosts blocks) — used **twice** (YouTube shorts + USER GUIDE slider).
- `blocks/product-meta-shorts.liquid` (YouTube/short-video carousel from a product metafield) — ⚠️ **`play_button_size: 68`** here vs `48` on both CORE and base PRO-2; keep this larger play button.
- `blocks/ai_gen_block_657f32b.liquid` (image slider; self-contained scoped CSS/JS; **Auto aspect-ratio = natural size, no crop**).
- `sections/product-faqs.liquid` (FAQ accordion from a product metafield).
- `sections/featured-collection.liquid` (shared customized featured collection) — used **twice**.
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — `sticky_add_to_cart_position` = **center**, same as CORE/PRO-2).
- **Stock section types used here, verify they exist in 4.2:** `slideshow`, `text-with-icons`, `collapsible-content`, `video-with-text`, `video-with-text-overlay`, and the plain `video` section. **Not used here** (unlike base PRO-2): `rich-text`, `image-with-text`, `image-with-text-overlay`, `pdp-aplus-comparison`.
- Buy-box block snippets (mostly stock, rendered by `product-info.liquid`): `custom_badges`, `title`, `price`, `text`, `rich_text_block`, `custom_liquid`, `variant_picker` (+radio/`radio-image`), `payment_installments`, `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          ⚠️ DIFFERS FROM CORE and base PRO-2 (both = 56) → media column is only 50% of page width on desktop, buy box gets more room
media_size: ""                   ⚠️ DIFFERS FROM CORE and base PRO-2 (both = "1") → EMPTY = adaptive media aspect (not forced 1:1)
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: false
media_enable_video_looping: true
media_fit_height: true           → same as base PRO-2 (differs from CORE's false) — media stretches/crops to fill the gallery height
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** same mechanics as CORE/PRO-2 — `<scroll-carousel vertical>` thumbnail rail + `<media-carousel>` main stage, sticky media column, `<media-lightbox>` zoom wrapper. The **narrower 50% desktop media width + adaptive `media_size`** are the two settings that differ here — keep them exactly as listed, don't copy CORE/PRO-2's values.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; centered, slides in on scroll-past. Full spec in the **sticky-add-to-cart** prompt.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order` (**23 blocks total**, same count as base PRO-2, but with 2 additional accordions disabled — see below). **Bold = custom/metafield-driven. ⛔ = disabled (hidden). ⚠️ = differs from base PRO-2.**
1. `custom_badges` (id `custom_badges_pdp`) — **enabled**, product badge row. Same as base PRO-2 (CORE has this disabled).
2. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent.
3. `loox_rating` (Loox **app block**, id `loox_reviews_loox_rating_4MxHdf`) — star rating + count, `contentSize 16`, `[rating] ([count])`, floating widget on click, empty-rating widget shown. **Hidden on mobile inside the buy box** via `main-product.css` (same rule as CORE/PRO-2).
4. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
5. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → product hook/tagline. Empty if `custom.hook_text` missing.
6. **`text`** "For European Orders click **HERE**" → links to `https://airvape.eu/product/legacy-pro-2-pre-sale/` (new tab). Same URL as base PRO-2 (different from CORE's `legacy-core` URL). **Shown.**
7. **`custom_liquid`** (id `custom_liquid_AkMLae` — different block ID than base PRO-2's `custom_liquid_wWw7VR`, identical markup) — grey rounded "NY Times Wirecutter" promo pill. **Shown.**
8. `variant_picker` — `type: radio`, `color_picker_type: radio-image`, `block_style: outlined`, rounded. `hide_sold_out_variants: false`.
9. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false`, `show_gift_card_recipient: false`.
10. `delivery` — `delivery_from: 3` / `delivery_to: 5`.
11. **`icon_text_block` (`icon-text-pdp`, inline)** — same 5 trust icons as CORE/PRO-2 (80px): 30 Days Return, Lifetime Warranty Ltd., Free Delivery 100+ USD, Hassle-Free Shipping, Secure Transaction.
12. **`text` "The Legacy PRO 2 is estimated to ship in 2-3 weeks" ⛔ disabled** — same as base PRO-2.
13. `payment_installments` — sits after the trust-icon row and the disabled shipping text, before `description` (same position as base PRO-2; differs from CORE's position).
14. **`description` ⛔ disabled** — stock description accordion hidden in favor of the metafield accordions below.
15. `collapsible_content_7eB3pL` — "Description" → `custom.description`.
16. **`collapsible_content_Mjr3Ge` — heading is "Key Features" ⚠️** (base PRO-2 and CORE both label this "Specifications") — still sourced from `custom.specifications`. **Only the visible heading text changed, not the metafield key.**
17. **`collapsible_content_LncXge` — "What's in the box?" ⛔ disabled ⚠️** — DIFFERS from base PRO-2, where this accordion is enabled. Content still wired to `custom.what_s_in_the_box`; it's just hidden here.
18. **`collapsible_content_f4yahV` — "How to use?" ⛔ disabled ⚠️** — DIFFERS from base PRO-2, where this accordion is enabled. Content still wired to `custom.how_to_use`; hidden here.
19. `collapsible_content_VVt4f3` — "Accessories" → `custom.parts_accessories`.
20. `collapsible_content_t8ELUD` — "Warranty and Support" → `custom.lifetime_waranty`.
21. `collapsible_content_87nC68` — "Why Choose AirVape?" → **hardcoded HTML** (identical long copy to CORE/PRO-2 — no metafield).
22. **`icon_text_block` (`homepage-usps-info`, vertical)** — same 5 USP items as CORE/PRO-2 (30px), 2-column wrapped row with greyscale icons.
23. `share_button` — native share.

**Net effect vs base PRO-2:** two more accordions ("What's in the box?", "How to use?") are hidden here, and "Specifications" is relabeled "Key Features" — so the buy box surfaces fewer, differently-framed accordions even though the underlying metafields and block count are unchanged.

## 4. Content sections below the PDP — behaviors & hidden bits
- **`custom-section` "FOLLOW US ON YOUTUBE"** → `product-meta-shorts` block: horizontal video carousel from metafield `custom.product_short_videos`. Settings match CORE/PRO-2 except **`play_button_size: 68`** (vs 48 elsewhere): `muted: true`, red play button `#ff0000`, radius 12, **4/3/2** slides desktop/medium/mobile, gap 20, arrows + dots.
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — Loox review carousel, limit 4, not aggregated. Identical to CORE/PRO-2.
- **slideshow "Just you, your vibe, and the Legacy PRO 2" — ENABLED, LIVE video** (`airvape_girl_web.webm`), no body text, `button_style: button-outline` with blank text/link (so no visible button renders), `custom_css` sets `min-height: 500px` on mobile, `height: 640`. ⚠️ **This exact same section is `"disabled": true` on both CORE and base PRO-2** — here it plays for real, and there is no image-overlay sibling section following it (base PRO-2 has `image_with_text_overlay_CbfRb6` right after; that section simply doesn't exist in this JSON).
- **text-with-icons** — **3** `column` blocks (Updated Heating / Industry Leading / Easy to Clean), same icons/copy as base PRO-2 (3 columns, not CORE's 4 — no "Swappable" column since PRO 2 doesn't have swappable skins).
- **collapsible-content "Major UpGrades"** (`collapsible_content_HdNgNc`) — section-level `subheading: "Major UpGrades"`, `heading: "The Legacy PRO 2 is packed with all the features you asked for - and we listened."`, and a single `block` (id `block_nMM8ct`) titled **"Features"** with `open: true` (expanded by default — unlike every buy-box `collapsible_content`, which starts closed) containing the ONEPATH/cork-gold-flakes/color-display bullet list + the dark-grey-finish and hybrid-heating paragraphs. ⚠️ **This is a different section type than base PRO-2's `rich-text` "Major UpGrades" section**, but it renders essentially the same copy inside an accordion shell instead of static rich text. `text_position: "left"`.
- **video-with-text "Simply PRO" — ENABLED, LIVE video** (`Finalk_no_smoke0.webm`), heading "Simply PRO" + the same "Packing is effortless…" body copy as base PRO-2, image/video right at 50% width. ⚠️ **This exact same section is `"disabled": true` on base PRO-2** (which instead shows an enabled `image-with-text` twin with the same copy over a static image — that twin section, `image_with_text_zrXTcP`, is **not present** in this JSON).
- **video-with-text-overlay "Pure Bliss with Every Puff" — ENABLED, LIVE video** (`airvape_pro2_web.webm`), subheading "Simply PRO", same body copy as base PRO-2, 20% solid overlay. ⚠️ **Disabled on base PRO-2**, whose `image-with-text-overlay` twin (`image_with_text_overlay_ipUg8e`) is **not present** here.
- **video-with-text "From Herb to Wax" / "From Beginner to PRO" — ENABLED, LIVE video** (`legacy2.0_smoky_ss.webm`), `image_size: media--ratio-4-3`, image/video left 50%, text "The only vape you'll ever need". ⚠️ **Disabled on base PRO-2**, whose `image-with-text` twin (`image_with_text_94HDtX`) is **not present** here.
- **video (stock, enabled)** — full-width, `pro2_inside_web.webm`, no heading/text/subheading — plays full-bleed. Identical to base PRO-2's only always-visible video section.
- **featured-collection "LEGACY PRO ACCESSORIES"** — carousel, 4 products, from collection `legacy-accessories`, "View all" → `airvape-x-accessories`. Same product fallback list as CORE/PRO-2. ⚠️ Note this section now renders **before** the USER GUIDE slider in page order (swapped vs base PRO-2).
- **custom-section "USER GUIDE"** → `ai_gen_block_657f32b` image slider from metafield `custom.user_guide`; `aspect_ratio: "auto"` (natural size, no cropping), **3/3/2** slides desktop/tablet/mobile (matches base PRO-2, differs from CORE's 4/4/2), gap 16, radius 6, arrows + dots, no autoplay, no infinite loop, `heading_html_tag: "p"`.
- **featured-collection "COMPLETE YOUR MEMORIAL DAY COLLECTION" ⚠️** — carousel, 8 slots (`grid_columns: 4`, `grid_columns_mobile: 2`), **no `collection`** (manual list only), heading is a **promo/campaign name**, not "OUR SIGNATURE MODELS". Product list is entirely different from CORE/PRO-2's device lineup: `x-royal-edition-premium-carry-kit`, `airvape-x-waterflow-kit`, `breathelet-power-pack`, `enso-adventure-kit`, `legacy-core-capsule-kit`, `legacy-core-waterflow-kit`, `festival-pack`, `enso-travel-ritual-kit`, `legacy-core-stealth-carry-kit` — these read as **bundle/kit SKUs**, likely specific to this product page's cross-sell strategy; **verify each product handle exists on the new store** (they don't appear on any other migrated template so far) and check whether "MEMORIAL DAY" is a stale seasonal heading that should be refreshed.
- **product-faqs "FAQS"** — accordion from `custom.faqs`. Empty without the metafield. Same pattern as CORE/PRO-2.

## 5. `assets/main-product.css` — the custom PDP CSS (copy verbatim — SAME file as CORE and base PRO-2, do not duplicate)
```css
.qty-wrap{
	background-color: #f9f9f9;
	border-radius: 40px;
}
.product-name-wrapper h1{
	text-wrap: unset;
}

.product-delivery-dates .caption-large{
	font-weight: 600;
}

.aplus-data-column .loox-rating,
.comparison-product-card .loox-rating {
	font-weight: normal;
}

.aplus-data-column .product-name + a{
	pointer-events: none;
	cursor: default; 
}

.icon-text-block--vertical.homepage-usps-info .icon-wrapper img{
	filter: brightness(0) saturate(100%) invert(43%) sepia(0%) saturate(1647%) hue-rotate(175deg) brightness(87%) contrast(94%);
}

.icon-text-block--vertical.homepage-usps-info .icon-text strong {
	display: inline-block;
	margin-bottom: 3px;
}

.rez-stock-notification-button {
	padding: 12px 20px !important;
	margin-top: .5rem !important;
	font-weight: 500 !important;
}


@media (max-width: 767px) {
	.section-main-product .product-info-inner  .loox-rating {
		display: none;
	}
}

@media (max-width: 520px) {
	.section-main-product .icon-text-block--inline {
		gap: 5px;
		grid-template-columns: repeat(4, 1fr);
	}
	
	
	.section-main-product .icon-text-block--inline .icon-wrapper img{
		width: 50px !important;    
	}
	.icon-text-block--vertical.homepage-usps-info .icon-wrapper img{
		width: 40px !important;        
	}
	.icon-text-block--vertical.homepage-usps-info .icon-wrapper{        
		padding: 5px;
	}
	
	.icon-text-block--vertical.homepage-usps-info .icon-text,
	.section-main-product .icon-text-block--inline .icon-text {
		font-size: 12px !important;
		line-height: normal;
	}
	
	.product-info-inner .product-rich-text .prose .metafield-rich_text_field :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){
		font-size: 1rem;
	}
	.rez-stock-notification-button {   
		margin-top: 0rem !important; 
		padding: 8px 20px !important;
	}
	
}
.icon-text-block {
	width: 100%;
}

/* INLINE (all items in one row, icon top, text below) */
.icon-text-block--inline {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.icon-text-block--inline .icon-text-item {
	flex: 1 1 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 1rem;
}

/* VERTICAL (each item row, icon left, text right) */
.icon-text-block--vertical {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.icon-text-block--vertical .icon-text-item {
	display: flex;
	align-items: center;
	gap: 12px;
}

.icon-wrapper img {
	display: block;
	height: auto;
	aspect-ratio: 1 / 1;
}

.icon-wrapper{
	background-color: #f9f9f9;
	padding: 10px;
	border-radius: 50%;
}

.icon-text {
	line-height: 1.4;
}

.icon-text-block--vertical.homepage-usps-info .icon-text-item {
	width: calc(50% - 12px);
}

.icon-text-block--vertical.homepage-usps-info {
	flex-direction: row;
	flex-wrap: wrap;
}

@media (max-width: 520px) {
	.icon-text-block--inline {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}    
	
	.icon-text-block--vertical.homepage-usps-info .icon-text-item {
		align-items: flex-start;
	}
}

.main-product__payment .list-payment {
	display: flex;
	justify-content: flex-start;
	margin-top: 8px;
	list-style: none;
}
.main-product__payment .list-payment .list-payment__item {
	align-items: center;
	display: flex;
	padding: 5px;
}
```
> This is the only PDP-specific stylesheet, shared verbatim across CORE, base PRO-2, and this PRO Bundle template — **do not create a third copy**. It styles the two `icon_text_block` layouts, the qty pill, the delivery-date weight, the comparison-card Loox rating (unused CSS here since there's no comparison section, but keep the rule — it's shared file), the payment list, the restock-notify button, and hides the buy-box Loox rating on mobile.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — all namespace `custom`
Without these, the matching block/section is **empty**. These are the **same metafield definitions used by CORE and base PRO-2** — if already created, only populate this product's own metafield **values**.
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `description` | rich text | "Description" accordion |
| `specifications` | rich text | "Key Features" accordion (relabeled heading, same key as CORE/PRO-2's "Specifications") |
| `what_s_in_the_box` | rich text | "What's in the box?" accordion — **disabled here**, so wire the metafield anyway in case it's re-enabled |
| `how_to_use` | rich text | "How to use?" accordion — **disabled here** |
| `parts_accessories` | rich text | "Accessories" accordion |
| `lifetime_waranty` | rich text | "Warranty and Support" accordion |
| `product_short_videos` | list / rich text | product-meta-shorts carousel |
| `user_guide` | list of images (or the block's expected source) | ai_gen_block_657f32b slider |
| `faqs` | (per product-faqs schema) | FAQS accordion |

**Not used by this template** (present on CORE/PRO-2 for the comparison table, but this template has no `pdp-aplus-comparison` section): `comparison_features`, `comparison_products`, `compare_key`. Don't bother wiring these for this product unless a comparison section gets added later.

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `FAST_HEAT-UP.webp`, `PURE_FLAVOUR.webp`, `EASY_TO_USE.webp`, `LONG_BATTERY_LIFE.webp`, `Icons_all-08.png`, `Icons_all-15.png`, `Icons_all-16.png`. **No `Legacy-PRO2*` product-photography images are referenced** — because none of the image-with-text / image-with-text-overlay fallback sections exist in this template, only the live videos below. (Grep the JSON for `shopify://shop_images` to re-verify.)
- **Videos → Content → Files (all 5 are LIVE/enabled in this template):** `airvape_girl_web.webm` (slideshow), `Finalk_no_smoke0.webm` (video-with-text "Simply PRO"), `airvape_pro2_web.webm` (video-with-text-overlay "Pure Bliss"), `legacy2.0_smoky_ss.webm` (video-with-text "From Herb to Wax"), `pro2_inside_web.webm` (plain video section). Grep for `shopify://files/videos`. **No hardcoded CDN URLs found in this template** — every media reference uses the `shopify://shop_images/…` or `shopify://files/videos/…` scheme; the only raw `https://` links present are the EU-orders link (`airvape.eu`), the YouTube channel link, and 4 `video_url` YouTube-fallback fields (standard section settings, not hardcoded assets) — confirmed via grep, nothing to flag as a hardcoded CDN dependency.
- **Apps:** **Loox** (buy-box rating app-block + dynamic reviews app-block). Re-add both after installing Loox; app-block IDs will differ on the new store.
- **Collections:** `legacy-accessories` (source for LEGACY PRO ACCESSORIES), `airvape-x-accessories` (its "View all" link). The bundle carousel (`featured_collection_CHmD3T`) has **no collection** — manual product list only.
- **Products (featured collections):**
  - `featured_collection_WqWJcP`: `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.
  - `featured_collection_CHmD3T` ⚠️ **verify these handles exist / get created on the new store — they're bundle/kit SKUs not seen on any other migrated template**: `x-royal-edition-premium-carry-kit`, `airvape-x-waterflow-kit`, `breathelet-power-pack`, `enso-adventure-kit`, `legacy-core-capsule-kit`, `legacy-core-waterflow-kit`, `festival-pack`, `enso-travel-ritual-kit`, `legacy-core-stealth-carry-kit`.
- **Product media:** upload the Legacy PRO 2 PRO Bundle gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections: NONE.** All 14 sections are enabled — this is the key structural difference from CORE (2 disabled) and base PRO-2 (4 disabled).
- **Disabled buy-box blocks (4):** `text_QRbAxC` ("estimated to ship in 2-3 weeks"), `description_FETxLT` (stock accordion), `collapsible_content_LncXge` ("What's in the box?" ⚠️ enabled on base PRO-2), `collapsible_content_f4yahV` ("How to use?" ⚠️ enabled on base PRO-2).
- **Enabled (matches base PRO-2, differs from CORE):** `custom_badges_pdp` is enabled.
- **Relabeled (⚠️ not disabled, just renamed):** `collapsible_content_Mjr3Ge` shows "Key Features" instead of "Specifications" — still reads `custom.specifications`.
- **Sections present on base PRO-2 but entirely ABSENT from this template's JSON** (not disabled — just not there): `image_with_text_overlay_CbfRb6`, `rich_text_THk6gf` (replaced by `collapsible_content_HdNgNc`), `image_with_text_zrXTcP`, `image_with_text_overlay_ipUg8e`, `image_with_text_94HDtX`, `pdp_aplus_comparison_kkT36X`.
- **Video sections LIVE here that are `disabled: true` on base PRO-2:** `slideshow_gpnHad`, `video_with_text_cbmaUp`, `video_with_text_overlay_DTHfhk`, `video_with_text_YjAd6V` — all four play for real on this template.
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px) — same intentional rule as CORE/PRO-2.
- **Accordion open-state split:** all 5 buy-box `collapsible_content` accordions that ARE enabled start **CLOSED** (`collapse_open: false`), but the content-section `collapsible_content_HdNgNc` ("Major UpGrades" → "Features") starts **OPEN** (`open: true`) — don't invert these.
- **`media_fit_height: true`, `desktop_media_width: 50`, `media_size: ""`** on `main` — the width/size values differ from both CORE and base PRO-2; keep exactly as listed.
Keep all of the above exactly.

## 9. Diff against 4.2 + report back
- Confirm the `pro-2-_pro-bundle` template is assigned; JSON valid; confirm **no** `disabled` flags exist anywhere in the ported JSON (if the 4.2 editor auto-adds one on save, treat that as a bug to fix, not a feature to keep).
- Confirm `main-product.css` loads (same shared file as CORE/PRO-2) and both `icon_text_block` layouts render; buy-box Loox rating hides on mobile.
- Confirm the sticky vertical media gallery + lightbox zoom work at the **50% desktop width / adaptive `media_size`** settings (visually narrower media column than CORE/PRO-2), `media_fit_height: true` crop-to-fill behavior, and the centered sticky add-to-cart.
- Confirm all 4 video sections (`slideshow`, both `video-with-text`, `video-with-text-overlay`) actually autoplay/loop as live content — don't silently disable them to match the sibling templates.
- Confirm `collapsible_content_HdNgNc` renders as an accordion (not rich text) and starts **expanded**.
- Confirm `product-meta-shorts` play button renders at **68px** (not 48px).
- Confirm `featured_collection_CHmD3T` shows the bundle/kit product list under the "COMPLETE YOUR MEMORIAL DAY COLLECTION" heading — flag to the user if that heading reads as a stale seasonal campaign name that should be updated, and flag any of the 9 kit product handles that don't exist on the new store rather than silently dropping them.
- Confirm there is **no** spec-comparison section on this page (no `pdp-aplus-comparison`) — don't add one by habit from the CORE/PRO-2 prompts.
- Confirm all `custom.*` metafields exist (hook, Description, Key Features, Accessories, Warranty, shorts, user-guide, FAQs empty otherwise), Loox installed + both blocks re-added, and media/collections/products created.
- Flag any block/section/setting from the JSON below that doesn't exist in the 4.2 theme rather than inventing a substitute — report it, don't skip silently.

---

## FULL `templates/product.pro-2-_pro-bundle.json` — copy verbatim

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
        "loox_reviews_loox_rating_4MxHdf": {
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
        "rich_text_block_xyg6GB": {
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
        "text_jaUh6c": {
          "type": "text",
          "settings": {
            "content": "<p><a href=\"https://airvape.eu/product/legacy-pro-2-pre-sale/\" target=\"_blank\" title=\"https://airvape.eu/product/legacy-pro-2-pre-sale/\">For European Orders click HERE</a></p>"
          }
        },
        "custom_liquid_AkMLae": {
          "type": "custom_liquid",
          "settings": {
            "custom_liquid": "<style>\n  .promo-text-block {\n    background-color: #ececec;\n    border-radius: 12px;\n    border: 1px solid #E1E1E1;\n  }\n</style>\n\n<p class=\"my-4 py-2 px-4 text-sm promo-text-block\">\n  <strong>NY Times Wirecutter</strong> nominated AirVape for best portable vaporizers\n</p>",
            "collapse_content": false,
            "collapse_open": false,
            "heading": ""
          }
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
        "qty_btn_selector_w6p6Ud": {
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
        "delivery_4UWPCg": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_Ez4GRq": {
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
        "text_QRbAxC": {
          "type": "text",
          "disabled": true,
          "settings": {
            "content": "<p>The Legacy PRO 2 is estimated to ship in 2-3 weeks</p>"
          }
        },
        "4923f5c8-62d3-42db-a835-6e0613c4a182": {
          "type": "payment_installments",
          "settings": {}
        },
        "description_FETxLT": {
          "type": "description",
          "disabled": true,
          "settings": {
            "collapse_content": true,
            "collapse_open": false,
            "heading": "Description"
          }
        },
        "collapsible_content_7eB3pL": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Description",
            "content": "{{ product.metafields.custom.description | metafield_tag }}"
          }
        },
        "collapsible_content_Mjr3Ge": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Key Features",
            "content": "{{ product.metafields.custom.specifications | metafield_tag }}"
          }
        },
        "collapsible_content_LncXge": {
          "type": "collapsible_content",
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "What's in the box?",
            "content": "{{ product.metafields.custom.what_s_in_the_box | metafield_tag }}"
          }
        },
        "collapsible_content_f4yahV": {
          "type": "collapsible_content",
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "How to use?",
            "content": "{{ product.metafields.custom.how_to_use | metafield_tag }}"
          }
        },
        "collapsible_content_VVt4f3": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Accessories",
            "content": "{{ product.metafields.custom.parts_accessories | metafield_tag }}"
          }
        },
        "collapsible_content_t8ELUD": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Warranty and Support",
            "content": "{{ product.metafields.custom.lifetime_waranty | metafield_tag }}"
          }
        },
        "collapsible_content_87nC68": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "icon_text_block_RbF4pg": {
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
        "share_button_KkRM8f": {
          "type": "share_button",
          "settings": {}
        }
      },
      "block_order": [
        "custom_badges_pdp",
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_4MxHdf",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "rich_text_block_xyg6GB",
        "text_jaUh6c",
        "custom_liquid_AkMLae",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "qty_btn_selector_w6p6Ud",
        "delivery_4UWPCg",
        "icon_text_block_Ez4GRq",
        "text_QRbAxC",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "description_FETxLT",
        "collapsible_content_7eB3pL",
        "collapsible_content_Mjr3Ge",
        "collapsible_content_LncXge",
        "collapsible_content_f4yahV",
        "collapsible_content_VVt4f3",
        "collapsible_content_t8ELUD",
        "collapsible_content_87nC68",
        "icon_text_block_RbF4pg",
        "share_button_KkRM8f"
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
    "custom_section_eaLVtN": {
      "type": "custom-section",
      "blocks": {
        "product_meta_shorts_btP3fn": {
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
        "product_meta_shorts_btP3fn"
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
    "1759505359de5a7814": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_RtKXbN": {
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
        "loox_reviews_loox_dynamic_section_RtKXbN"
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
    "slideshow_gpnHad": {
      "type": "slideshow",
      "blocks": {
        "slide_XyKr3r": {
          "type": "slide",
          "settings": {
            "video": "shopify://files/videos/airvape_girl_web.webm",
            "content_width_maximum": 640,
            "desktop_content_position": "middle-center",
            "mobile_content_position": "middle-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "Just you, your vibe, and the Legacy PRO 2",
            "heading_size": "h2",
            "text": "",
            "hide_text_on_mobile": false,
            "button_size": "text-sm md:text-base",
            "custom_liquid": "",
            "button_link": "",
            "button_text": "",
            "button_style": "button-outline",
            "button_background_color": "#ffffff",
            "button_text_color": "",
            "button2_link": "",
            "button2_text": "",
            "button2_style": "",
            "button2_background_color": "",
            "button2_text_color": "",
            "background_color": "",
            "color_text": "#ffffff",
            "overlay_color": "#000000",
            "overlay_opacity": 0,
            "overlay_type": "solid",
            "heading_html_tag": "h2"
          }
        }
      },
      "block_order": [
        "slide_XyKr3r"
      ],
      "custom_css": [
        "@media screen and (max-width: 767px) {.slideshow-slide {min-height: 500px; }}"
      ],
      "name": "t:sections.slideshow.presets__0.name",
      "settings": {
        "full_width": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "autoplay": true,
        "speed": 5,
        "height": 640,
        "controls": "arrows",
        "background_animation": "ZoomOut",
        "content_animation": "AppearLineByLine",
        "background_color": "#262626"
      }
    },
    "text_with_icons_tqLMpf": {
      "type": "text-with-icons",
      "blocks": {
        "column_chrnQL": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-08.png",
            "icon": "package-check",
            "heading": "Updated Heating",
            "content": "<p>Still super fast</p>"
          }
        },
        "column_6TWpYm": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-15.png",
            "icon": "message-chat-circle",
            "heading": "Industry Leading",
            "content": "<p>In material use</p>"
          }
        },
        "column_wXBeVL": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-16.png",
            "icon": "return",
            "heading": "Easy to",
            "content": "<p>Clean and Pack</p>"
          }
        }
      },
      "block_order": [
        "column_chrnQL",
        "column_6TWpYm",
        "column_wXBeVL"
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
        "heading_html_tag": "p"
      }
    },
    "collapsible_content_HdNgNc": {
      "type": "collapsible-content",
      "blocks": {
        "block_nMM8ct": {
          "type": "block",
          "settings": {
            "title": "Features",
            "content": "<ul><li>Easier cleaning featuring <strong>ONEPATH</strong>- the Pro 2’s unique air path from chamber to mouthpiece that can be cleaned all the way with one long brush included in the kit.</li></ul><p></p><ul><li>⁠Black cork with gold flakes gives not only upgraded aesthetics but a premium feel and better heat insulation</li></ul><p></p><ul><li>⁠New color display for more detailed session info</li></ul><p>The Legacy PRO 2 comes in an elegant <strong>new dark grey finish.</strong></p><p>Under the hood, Legacy PRO 2 maintains its signature <strong>hybrid convection/conduction heating system</strong>, <strong>rapid heat-up</strong>, <strong>precision temperature control</strong>, and <strong>removable battery</strong> with <strong>wireless charging support</strong>—all wrapped in a form that’s both portable and environmentally conscious.</p><p>Whether you're a connoisseur or a newcomer, the <strong>Legacy PRO 2</strong> redefines what a luxury vaporizer can be—powerful, practical, and absolutely unforgettable.</p>",
            "content_from_page": "",
            "open": true,
            "heading_html_tag": "h3"
          }
        }
      },
      "block_order": [
        "block_nMM8ct"
      ],
      "settings": {
        "full_width": true,
        "subheading": "Major UpGrades",
        "heading": "The Legacy PRO 2 is packed with all the features you asked for - and we listened.",
        "content": "",
        "heading_size": "h3",
        "text_position": "left",
        "background_color": "",
        "text_color": "",
        "heading_color": "",
        "accordion_background_color": "",
        "accordion_title_color": "",
        "accordion_text_color": "",
        "heading_html_tag": "h2"
      }
    },
    "video_with_text_cbmaUp": {
      "type": "video-with-text",
      "blocks": {
        "heading_NxmdbD": {
          "type": "heading",
          "settings": {
            "heading": "Simply PRO",
            "heading_size": "h3",
            "heading_html_tag": "p"
          }
        },
        "text_RVMkDY": {
          "type": "text",
          "settings": {
            "text": "<p>Packing is effortless, and heat-up happens in seconds — but the PRO 2 doesn’t stop there. Engineered for maximum performance, its refined design and high-grade materials make it the clear choice for those who demand power and precision in every session.<br/></p>"
          }
        }
      },
      "block_order": [
        "heading_NxmdbD",
        "text_RVMkDY"
      ],
      "name": "t:sections.video-with-text.presets__0.name",
      "settings": {
        "custom_class": "video-with-text-section",
        "full_width": true,
        "remove_bottom_spacing": false,
        "autoplay": true,
        "loop": true,
        "video": "shopify://files/videos/Finalk_no_smoke0.webm",
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
    "video_with_text_overlay_DTHfhk": {
      "type": "video-with-text-overlay",
      "blocks": {
        "subheading_WHiEEy": {
          "type": "subheading",
          "settings": {
            "text": "Simply PRO"
          }
        },
        "heading_74fQ4A": {
          "type": "heading",
          "settings": {
            "heading": "Pure Bliss with Every Puff",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_46VhEg": {
          "type": "text",
          "settings": {
            "text": "<p>The Legacy PRO 2’s advanced technology ensures top-notch performance, making every moment shared with friends more enjoyable and satisfying.</p>"
          }
        }
      },
      "block_order": [
        "subheading_WHiEEy",
        "heading_74fQ4A",
        "text_46VhEg"
      ],
      "settings": {
        "custom_class": "video-text-overlay-section",
        "full_width": true,
        "enable_transparent_header": true,
        "use_original_media_size": false,
        "video": "shopify://files/videos/airvape_pro2_web.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "content_alignment": "md:content-middle-center",
        "content_alignment_mobile": "content-middle-center",
        "link": "",
        "min_height": 640,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 20,
        "overlay_type": "solid"
      }
    },
    "video_with_text_YjAd6V": {
      "type": "video-with-text",
      "blocks": {
        "subheading_z8aK4C": {
          "type": "subheading",
          "settings": {
            "text": ""
          }
        },
        "heading_xMFJy3": {
          "type": "heading",
          "settings": {
            "heading": "From Herb to Wax",
            "heading_size": "h3",
            "heading_html_tag": "h2"
          }
        },
        "heading_Emcc3n": {
          "type": "heading",
          "settings": {
            "heading": "From Beginner to PRO",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_rh7yMX": {
          "type": "text",
          "settings": {
            "text": "<p>The only vape you'll ever need</p>"
          }
        }
      },
      "block_order": [
        "subheading_z8aK4C",
        "heading_xMFJy3",
        "heading_Emcc3n",
        "text_rh7yMX"
      ],
      "name": "t:sections.video-with-text.presets__0.name",
      "settings": {
        "custom_class": "video-with-text-section",
        "full_width": true,
        "remove_bottom_spacing": false,
        "autoplay": true,
        "loop": true,
        "video": "shopify://files/videos/legacy2.0_smoky_ss.webm",
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
    "video_nrLrNt": {
      "type": "video",
      "settings": {
        "full_width": true,
        "video": "shopify://files/videos/pro2_inside_web.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "image_size": "",
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
    "featured_collection_WqWJcP": {
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
        "collection": "legacy-accessories",
        "subheading": "",
        "heading": "LEGACY PRO ACCESSORIES",
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
    "custom_section_ggzpUX": {
      "type": "custom-section",
      "blocks": {
        "ai_gen_block_657f32b_8AitDQ": {
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
        "ai_gen_block_657f32b_8AitDQ"
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
    "featured_collection_CHmD3T": {
      "type": "featured-collection",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "products": [
          "x-royal-edition-premium-carry-kit",
          "airvape-x-waterflow-kit",
          "breathelet-power-pack",
          "enso-adventure-kit",
          "legacy-core-capsule-kit",
          "legacy-core-waterflow-kit",
          "festival-pack",
          "enso-travel-ritual-kit",
          "legacy-core-stealth-carry-kit"
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
    "product_faqs_WxJYCt": {
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
    "custom_section_eaLVtN",
    "1759505359de5a7814",
    "slideshow_gpnHad",
    "text_with_icons_tqLMpf",
    "collapsible_content_HdNgNc",
    "video_with_text_cbmaUp",
    "video_with_text_overlay_DTHfhk",
    "video_with_text_YjAd6V",
    "video_nrLrNt",
    "featured_collection_WqWJcP",
    "custom_section_ggzpUX",
    "featured_collection_CHmD3T",
    "product_faqs_WxJYCt"
  ]
}
```
