# Migration Prompt — Product Template: AirVape X BUNDLE (`product.avx-bundle.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt, the **sticky-add-to-cart** prompt, the **image-slider (ai_gen_block_657f32b)** notes, and ideally the **`avx` (AirVape X)** product prompt for comparison. Assign this template (suffix **`avx-bundle`**) to the AirVape X Bundle product in Admin.
> This documents **every section, every block, every behavior** (what shows, what's hidden/disabled, the sticky media gallery, the sticky add-to-cart, the accordions), embeds the **custom PDP CSS** verbatim, and includes the **full `product.avx-bundle.json`** at the bottom.

---

Recreate my **AirVape X Bundle product** page (`templates/product.avx-bundle.json`) so it looks and behaves identically. It's the same customized `main-product` PDP pattern as the other device templates, followed by content sections and FAQs — but it is **NOT a simple clone of the `avx` template**: it drops the A+ comparison table and both static image-overlay replacements, and instead shows the **video overlay and the image slideshow directly** (both of which are hidden/disabled on the base AVX template), swaps in two **animated GIFs**, and points its closing carousel at an entirely different, bundle/accessory-kit product list. Copy the JSON verbatim, port the custom snippets/sections + CSS, create the metafields, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.avx-bundle.json` — preserve section order, every `"disabled": true`, all block settings, and the header comment.
2. Port the custom section/snippet files and `assets/main-product.css` (embedded in §5 — **identical file**, shared across all product templates). For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — many blocks/sections are **empty without them**. Note: this template does **not** use the `comparison_*` metafields (no A+ comparison section here).
4. Re-upload **images/videos** (§7) and assign the **`avx-bundle`** template to the AirVape X Bundle product.
5. Keep valid JSON; run a validity check and report.
6. **Do not copy this template's structure onto other products by assumption** — note the ⚠️ differences from the base `avx` template as you build; they're intentional to the bundle SKU, not omissions. In particular: **no `pdp-aplus-comparison` section exists here at all.**

## 1. Page structure — section order (12) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `custom_section_ttwdUz` | custom-section ⚑ | on | "FOLLOW US ON YOUTUBE" → **product-meta-shorts** video carousel |
| 3 | `1775027402f323ad93` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews |
| 4 | `video_with_text_overlay_DTHfhk` | video-with-text-overlay | **on ⚠️** | "X marks the spot" / "One of the World's leading vape models" video — **enabled here** (disabled on the base `avx` template) |
| 5 | `text_with_icons_KkHLhA` | text-with-icons | on | 3 feature columns (Full temperature control / Thinnest Design / 1.3 Inch Display) |
| 6 | `image_with_text_76bibF` | **image-with-text** | on | "Never settle for less." split image/text — image is an **animated GIF ⚠️** |
| 7 | `slideshow_ygAcAw` | slideshow | **on ⚠️** | 3-slide **image** slideshow (Thin. Thinner. X. / X=ultimate features² / Quality above all else) — **enabled here** (disabled on the base `avx` template) |
| 8 | `image_with_text_9Vxk9p` | **image-with-text** | on | "Now with X Shell included" split image/text — image is an **animated GIF ⚠️** |
| 9 | `featured_collection_WcHzab` | featured-collection ⚑ | on | "AIRVAPE X ACCESSORIES" carousel |
| 10 | `custom_section_7BJbQz` | custom-section ⚑ | on | "USER GUIDE" → **ai_gen_block_657f32b** image slider |
| 11 | `featured_collection_jJyw4y` | featured-collection ⚑ | on | "COMPLETE YOUR MEMORIAL DAY COLLECTION" carousel — **entirely different product list from `avx` ⚠️** |
| 12 | `product_faqs_LXeDrp` | product-faqs ⚑ | on | "FAQS" accordion |

**No section in this template is `disabled`** — only individual **blocks** are disabled (see §3.2). This is a structural departure from the `core`/`avx` templates, which use disabled sections + a static image-overlay "replacement" pattern; here the video overlay and the slideshow are simply left live, and there is **no A+ comparison section, no `image-with-text-overlay` "Power you can feel"/"Thin Thinner X" replacement, and no `pdp-aplus-comparison` section at all**. Total section count is **12**, vs. 15 on the base `avx` template.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5, **byte-identical** to the CORE/AVX templates' copy — this is the one shared PDP stylesheet). It loads `main-product.css` via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `sections/custom-section.liquid` (generic wrapper: heading + link + hosts blocks — confirmed **not bundle-specific**; see §4 note). Used twice here (YouTube shorts + USER GUIDE slider).
- `blocks/product-meta-shorts.liquid` (YouTube/short-video carousel from a product metafield).
- `blocks/ai_gen_block_657f32b.liquid` (image slider; self-contained scoped CSS/JS; **Auto aspect-ratio = natural size, no crop** — see the image-slider fix notes).
- `sections/product-faqs.liquid` (FAQ accordion from a product metafield).
- `sections/featured-collection.liquid` (shared customized featured collection). Used twice here.
- `sections/image-with-text.liquid` (stock split image/text section — verify it exists). Used twice here, both with **GIF** images (⚠️ verify the 4.2 section supports `.gif` sources the same way it does `.webp`/`.jpg`, including any lazy-load/aspect-ratio behavior that could break GIF animation).
- `sections/video-with-text-overlay.liquid`, `sections/text-with-icons.liquid`, `sections/slideshow.liquid` (stock sections — verify in 4.2).
- **Not needed for this template:** `sections/pdp-aplus-comparison.liquid`, `sections/image-with-text-overlay.liquid` — neither is referenced anywhere in `product.avx-bundle.json`. Don't add them; if 4.2's shared theme still ships them that's fine, just don't wire settings for them here.
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**).
- Buy-box block snippets (mostly stock, rendered by `product-info.liquid`): `custom_badges`, `title`, `price`, `rich_text_block`, `payment_installments`, `custom_liquid`, `variant_picker`(+radio/`radio-image`), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          ⚠️ DIFFERENT from avx (56) — media column is 50% of page width on desktop
media_size: ""                   ⚠️ DIFFERENT from avx ("1") — blank/adaptive instead of fixed aspect
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: false
media_enable_video_looping: true
media_fit_height: true           → media stage is forced to fit/crop to the column height (same as avx)
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** with `carousel_vertical`, desktop renders a `<scroll-carousel vertical>` thumbnail rail + a `<media-carousel>` main stage; the whole **media column is sticky** (stays in view while the buy-box column scrolls). `media_zoom: lightbox` wraps it in `<media-lightbox>` so clicking a slide opens fullscreen zoom. On mobile the gallery is a swipeable carousel with a **thumbnail** indicator. `media_fit_height: true` + blank `media_size` means the media stage is height-constrained and adaptive rather than a fixed aspect ratio — confirm this renders as intended vs the other templates. The mobile product title+reviews render **above** the gallery (`product-title-reviews`, `hidden-desktop`). Don't rewrite these — they're stock; just keep the settings above.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom when the main Add-to-Cart scrolls out of view, centered. Full spec in the **sticky-add-to-cart** prompt.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order`. **Bold = custom/metafield-driven. ⛔ = disabled (hidden). ⚠️ = differs from the base `avx` template.**
1. `custom_badges` — **ENABLED** (same as `avx`; product badge row shows if badges are configured on the product).
2. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent (→ inherits default). Shows the product name.
3. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`, `looxOpenFloatingWidget: false` (clicking the rating does **not** auto-open the floating reviews widget), `emptyRatingWidget: true`. **⚠️ Hidden on mobile inside the buy box** by `main-product.css` (`.section-main-product .product-info-inner .loox-rating { display:none }` ≤767px) — on mobile the rating shows in the `product-title-reviews` block above the gallery instead.
4. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
5. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product **hook/tagline** (heading size `text-h6 md:text-h5`, left). Empty if `custom.hook_text` missing.
6. `payment_installments` — Shop Pay installments messaging.
7. **No "For X Royal Blue click HERE" text block here ⚠️** — the `avx` template has a `text` block linking to the Royal Blue variant page right after `payment_installments`; **this bundle template omits it entirely** (not disabled — simply not present in `block_order`).
8. **`custom_liquid`** — inline `<style>.promo-text-block{background:#ececec;border-radius:12px;border:1px solid #E1E1E1}</style>` + a grey rounded pill: "**NY Times Wirecutter** nominated AirVape for best portable vaporizers". **Shown.** (Identical markup to the CORE/AVX templates' promo pill.)
9. `variant_picker` — `type: radio`, `color_picker_type: radio-image` (color swatches as images), `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
10. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (**no Buy-it-now/express buttons**), `show_gift_card_recipient: false`, button colors default.
11. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5` → "Receive by …" business-day estimate.
12. **`icon_text_block` (`icon-text-pdp`, inline)** — 5 trust icons in one row (80px): `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`. (Identical to CORE/AVX.)
13. **`description` ⛔ disabled** (the stock description accordion is hidden; the metafield ones below replace it).
14–20. **`collapsible_content` ×7 — accordions, ALL closed by default (`collapse_open: false`; click to expand); TWO are additionally disabled here ⚠️:**
    - "Description" → `custom.description` — **enabled**
    - **"Key Features" ⚠️** (heading text differs from the base `avx` template's "Specifications") → `custom.specifications` — **enabled**
    - "What's in the box?" → `custom.what_s_in_the_box` — **enabled**
    - "How to use?" **⛔ disabled ⚠️** (enabled on the base `avx` template) → `custom.how_to_use`
    - "Accessories" **⛔ disabled ⚠️** (enabled on the base `avx` template) → `custom.parts_accessories`
    - "Warranty and Support" → `custom.lifetime_waranty` — **enabled**
    - "Why Choose AirVape?" → **hardcoded HTML** (long copy, in the JSON — no metafield; identical text to the CORE/AVX templates' block) — **enabled**
    Each metafield accordion is **empty if its metafield is missing**.
21. **`icon_text_block` (`homepage-usps-info`, vertical)** — 5 USP items (FAST HEAT-UP / PURE FLAVOUR / EASY TO USE / EASY TO USE / LASTS LONGER) at 30px; `main-product.css` lays them out as a **2-column wrapped row** with grey circular icon backgrounds and greyscale-filtered icons. (Identical to CORE/AVX.)
22. `share_button` — native share.

## 4. Content sections below the PDP — behaviors & hidden bits
- **`custom-section` "FOLLOW US ON YOUTUBE"** → `product-meta-shorts` block: horizontal **video carousel** from metafield `custom.product_short_videos`. Settings: `muted: true`, red play button (**68px ⚠️** — the CORE/AVX templates use 48px here), radius 12, **4/3/2** slides desktop/medium/mobile, gap 20, arrows + dots (black arrows 40px, dots 8px). Heading is a YouTube SVG + "@AirvapeusaOfficial" linking to the channel. This section — despite its wrapper being the generic `custom-section` type — is **not** bundle-pricing/contents markup; there is no bundle-specific block type anywhere in this template (verified: no `bundle` string in the JSON at all). Treat both `custom-section` instances here exactly like the CORE/AVX templates' equivalents.
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — Loox review carousel, limit 4, not aggregated.
- **video-with-text-overlay — ENABLED ⚠️** "X marks the spot" (subheading) / "One of the World's leading vape models" (heading, h2) — `video: X_final_2_short1.webm`, overlay 35% solid, `custom_class: video-text-overlay-section`. Its body-text sub-block (`text_46VhEg`) is **disabled** (same "subheading + heading only, body hidden" pattern the CORE/AVX templates use), but **the section itself is live here** — on the base `avx` template this whole section is disabled and a static `image-with-text-overlay` shows in its place; **that replacement section does not exist in this bundle template**, so the video is the only thing shown in this slot.
- **text-with-icons** — **3** `column` blocks (Full temperature control / Thinnest Design / 1.3 Inch Display) each with a `custom_icon` PNG + fallback icon, circle background, **48px**, 1-col mobile, centered. None of these columns has body `content` text (all blank). Identical to the base `avx` template.
- **image-with-text** "Never settle for less." — image **`Heating1.gif` ⚠️** (an animated GIF — the base `avx` template uses the static `AirVape-X_Royal-Product_Page.webp` in this slot), image right, 50% width, centered text. Same copy as `avx`.
- **slideshow — ENABLED ⚠️** — 3 **image** slides: "Thin. Thinner. X." (`finger_blue.jpg`, dark bg `#242424`), "X = ultimate features² Here's the math." (`oval_blue.png`), "Quality above all else" (`AirVape_TrippyTreez-0349.jpg`); all overlay 30% solid, `button_style: button-outline` (empty button text/link on all three — buttons are effectively invisible). Has `custom_css` min-height 500px mobile. **This section is disabled on the base `avx` template** (with a static `image-with-text-overlay` "Thin. Thinner. X." shown instead); **here it is live and that image-overlay replacement does not exist**, so all 3 slides are visible in rotation.
- **image-with-text** "Now with X Shell included" — image **`WaterShell.gif` ⚠️** (an animated GIF — the base `avx` template uses the static `AirVape-X_Royal-Product_Page2.webp` in this slot), image right 50%, `heading_html_tag: p`. Same copy as `avx`.
- **featured-collection "AIRVAPE X ACCESSORIES"** — carousel, 4 products (`enso`, `legacy-core`, `legacy-pro-2`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`), from collection `airvape-x-accessories`, "View all" → same collection. **Identical to the base `avx` template**, including the `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus` product reference — ⚠️ **flag for verification**: recent site changes removed Breathelet from the storefront, so confirm whether this product handle still exists on the new store before assuming this carousel slot resolves.
- **custom-section "USER GUIDE"** → `ai_gen_block_657f32b` **image slider** from metafield `custom.user_guide`; `aspect_ratio: "auto"` (natural size, **no cropping** — fixed behavior), **3/3/2** slides desktop/tablet/mobile, gap 16, radius 6, arrows + dots, no autoplay, no infinite loop. Identical settings to the base `avx` template.
- **featured-collection "COMPLETE YOUR MEMORIAL DAY COLLECTION" ⚠️** — carousel, 8 slots, **entirely different manual product list** from the base `avx` template's "OUR SIGNATURE MODELS" (which lists devices): `enso-travel-ritual-kit`, `festival-pack`, `2x-air-bubble-dosing-capsules-for-legacy-pro-6-piece`, `legacy-pro-2-stealth-carry-kit`, `breathelet-power-pack`, `airbubble-dosing-capsules-for-legacy-pro-6-piece`, `enso-adventure-kit`, `legacy-core-capsule-kit` — these are accessory/kit bundle products, no `collection` set, empty `link_url`. ⚠️ **`breathelet-power-pack` flagged for verification** for the same reason as above — Breathelet was recently removed from the storefront; confirm this handle resolves on the new store or report it as a dangling reference. The heading itself ("MEMORIAL DAY") also reads like a **seasonal/promo leftover** — flag to the user in case it should be refreshed before launch rather than ported verbatim.
- **product-faqs "FAQS"** — accordion from `custom.faqs`. Empty without the metafield.

## 5. `assets/main-product.css` — the custom PDP CSS (copy verbatim — shared/identical file across product templates)
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
> This is the only PDP-specific stylesheet, shared verbatim across all product templates (CORE, AVX, AVX Bundle, and others). It styles the two `icon_text_block` layouts (`icon-text-pdp` inline trust-row + `homepage-usps-info` 2-col USP grid with greyscale icons), the qty pill (`.qty-wrap`), the delivery-date weight, the comparison-card Loox rating (unused on this template but still present in the shared file), the payment list, the restock-notify button, and **hides the buy-box Loox rating on mobile**.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — all namespace `custom`
Without these, the matching block/section is **empty**. Note: **`comparison_features` / `comparison_products` / `compare_key` are NOT used by this template** (no `pdp-aplus-comparison` section here) — skip them unless another template on the same product needs them.
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `description` | rich text | "Description" accordion |
| `specifications` | rich text | "Key Features" accordion |
| `what_s_in_the_box` | rich text | "What's in the box?" accordion |
| `how_to_use` | rich text | "How to use?" accordion (block is disabled — populate anyway, ready for re-enable) |
| `parts_accessories` | rich text | "Accessories" accordion (block is disabled — populate anyway, ready for re-enable) |
| `lifetime_waranty` | rich text | "Warranty and Support" accordion |
| `product_short_videos` | list / rich text | product-meta-shorts carousel |
| `user_guide` | list of images (or the block's expected source) | ai_gen_block_657f32b slider |
| `faqs` | (per product-faqs schema) | FAQS accordion |

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `FAST_HEAT-UP.webp`, `PURE_FLAVOUR.webp`, `EASY_TO_USE.webp`, `LONG_BATTERY_LIFE.webp`, `Icons_all-08_515e1bfc-faeb-4f64-bdc2-8d95c6461349.png`, `Icons_all-09.png`, `Icons_all-10.png`, `finger_blue.jpg`, `oval_blue.png`, `AirVape_TrippyTreez-0349.jpg`, and the **two animated GIFs ⚠️** `Heating1.gif`, `WaterShell.gif` (confirm the new store's CDN/image pipeline serves GIFs unmodified — no WebP re-encode that would kill the animation). (Grep the JSON for `shopify://shop_images` to catch all.) Note `finger_blue.webp` (used by the base `avx` template's disabled-slideshow replacement) is **not** used here — don't port it for this template.
- **Videos → Content → Files:** `X_final_2_short1.webm` (now-enabled video overlay). Grep for `shopify://files/videos`.
- **Apps:** **Loox** (the buy-box rating app-block + the dynamic reviews app-block). Re-add both blocks after installing Loox; their app-block IDs will differ on the new store.
- **Collections:** `airvape-x-accessories`.
- **Products (featured collections):**
  - "AIRVAPE X ACCESSORIES": `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus` ⚠️ (verify Breathelet handle still exists).
  - "COMPLETE YOUR MEMORIAL DAY COLLECTION": `enso-travel-ritual-kit`, `festival-pack`, `2x-air-bubble-dosing-capsules-for-legacy-pro-6-piece`, `legacy-pro-2-stealth-carry-kit`, `breathelet-power-pack` ⚠️ (verify Breathelet handle still exists), `airbubble-dosing-capsules-for-legacy-pro-6-piece`, `enso-adventure-kit`, `legacy-core-capsule-kit`.
- **Product media:** upload the AirVape X Bundle gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections:** none — all 12 sections in this template are enabled.
- **Disabled buy-box blocks:** `description` (stock accordion), `collapsible_content_qjVFny` ("How to use?"), `collapsible_content_TXqjjb` ("Accessories").
- **Disabled sub-blocks:** `text_46VhEg` (body text inside the enabled `video-with-text-overlay` — subheading + heading show, body text hidden).
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px) — intentional (rating shown above gallery on mobile instead).
- **All 7 `collapsible_content` accordions start CLOSED** (`collapse_open: false`), regardless of their individual enabled/disabled state.
- **Not present at all (not merely disabled):** `pdp-aplus-comparison` section, both `image-with-text-overlay` replacement sections ("Power you can feel"-style and "Thin Thinner X"-style), and the "For X Royal Blue click HERE" buy-box text block.
Keep all of the above exactly.

## 9. Report back
- Confirm the `avx-bundle` template is assigned; JSON valid; all `disabled` flags + closed accordions preserved.
- Confirm `main-product.css` loads and the two `icon_text_block` layouts render (inline trust row + 2-col USP grid), and the buy-box Loox rating hides on mobile.
- Confirm the **sticky vertical media gallery** + lightbox zoom work (note `desktop_media_width: 50`, blank `media_size`, `media_fit_height: true` here — all differ from the base `avx` template), and the **centered sticky add-to-cart** slides in on scroll.
- Confirm custom sections/blocks ported: `product-meta-shorts` (68px play button), `ai_gen_block_657f32b` (Auto = no crop, 3/3/2 slides), `product-faqs`, both `featured-collection`s, and both `image-with-text` sections rendering their **GIF** images with animation intact.
- Confirm the **video-with-text-overlay and slideshow render live** (not swapped for a static image-overlay) — this is the main structural departure from the base `avx` template.
- Flag any ⚠️ items above that could not be reproduced: the two GIF assets, the missing "Royal Blue" text link, the "Key Features" heading rename, the two newly-disabled accordions, the 68px play button, and — most importantly — whether `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus` and `breathelet-power-pack` still exist as products on the new store (Breathelet was recently discontinued on the live site).
- Confirm all `custom.*` metafields exist (else hook, accordions, shorts, user-guide, FAQs are empty) — note `comparison_*` metafields are **not needed** for this template — Loox installed + both blocks re-added, and media/collections/products created.
- Flag the "MEMORIAL DAY" heading on the closing carousel as a possible seasonal leftover worth confirming with the user before launch.

---

## FULL `templates/product.avx-bundle.json` — copy verbatim

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
        "loox_reviews_loox_rating_K9PTC6": {
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
            "looxOpenFloatingWidget": false,
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
        "rich_text_block_QwEKWk": {
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
        "4923f5c8-62d3-42db-a835-6e0613c4a182": {
          "type": "payment_installments",
          "settings": {}
        },
        "custom_liquid_Jqkb7z": {
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
        "qty_btn_selector_in8mCz": {
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
        "delivery_LnFb3T": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_jUxtqK": {
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
        "collapsible_content_HGCaDq": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Key Features",
            "content": "{{ product.metafields.custom.specifications | metafield_tag }}"
          }
        },
        "collapsible_content_RLBztH": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "What's in the box?",
            "content": "{{ product.metafields.custom.what_s_in_the_box | metafield_tag }}"
          }
        },
        "collapsible_content_qjVFny": {
          "type": "collapsible_content",
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "How to use?",
            "content": "{{ product.metafields.custom.how_to_use | metafield_tag }}"
          }
        },
        "collapsible_content_TXqjjb": {
          "type": "collapsible_content",
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "Accessories",
            "content": "{{ product.metafields.custom.parts_accessories | metafield_tag }}"
          }
        },
        "collapsible_content_eC8gXV": {
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
        "icon_text_block_XQNJVE": {
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
        "loox_reviews_loox_rating_K9PTC6",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "rich_text_block_QwEKWk",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "custom_liquid_Jqkb7z",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "qty_btn_selector_in8mCz",
        "delivery_LnFb3T",
        "icon_text_block_jUxtqK",
        "description_FETxLT",
        "collapsible_content_7eB3pL",
        "collapsible_content_HGCaDq",
        "collapsible_content_RLBztH",
        "collapsible_content_qjVFny",
        "collapsible_content_TXqjjb",
        "collapsible_content_eC8gXV",
        "collapsible_content_87nC68",
        "icon_text_block_XQNJVE",
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
    "custom_section_ttwdUz": {
      "type": "custom-section",
      "blocks": {
        "product_meta_shorts_6wwkij": {
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
        "product_meta_shorts_6wwkij"
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
    "1775027402f323ad93": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_KGNyKk": {
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
        "loox_reviews_loox_dynamic_section_KGNyKk"
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
    "video_with_text_overlay_DTHfhk": {
      "type": "video-with-text-overlay",
      "blocks": {
        "subheading_WHiEEy": {
          "type": "subheading",
          "settings": {
            "text": "X marks the spot"
          }
        },
        "heading_74fQ4A": {
          "type": "heading",
          "settings": {
            "heading": "One of the World’s leading vape models",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_46VhEg": {
          "type": "text",
          "disabled": true,
          "settings": {
            "text": "<p><strong>The AirVape X uses a combination of conduction and convection technology to achieve the best heating in just 20 seconds to an optimal level. The X is the ultimate personal dry herb vaporizer featuring outstanding performance and the highest level of discreteness.</strong></p>"
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
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "video": "shopify://files/videos/X_final_2_short1.webm",
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
    "text_with_icons_KkHLhA": {
      "type": "text-with-icons",
      "blocks": {
        "column_WXtDLY": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-08_515e1bfc-faeb-4f64-bdc2-8d95c6461349.png",
            "icon": "package-check",
            "heading": "Full temperature control",
            "content": ""
          }
        },
        "column_y7GDKe": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-09.png",
            "icon": "message-chat-circle",
            "heading": "Thinnest Design",
            "content": ""
          }
        },
        "column_YDLnC4": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-10.png",
            "icon": "return",
            "heading": "1.3 Inch Display",
            "content": ""
          }
        }
      },
      "block_order": [
        "column_WXtDLY",
        "column_y7GDKe",
        "column_YDLnC4"
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
        "icon_width": 48,
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
    "image_with_text_76bibF": {
      "type": "image-with-text",
      "blocks": {
        "heading_akb8kp": {
          "type": "heading",
          "settings": {
            "heading": "Never settle for less.",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_qTyhcp": {
          "type": "text",
          "settings": {
            "text": "<p>The AirVape X uses a combination of conduction and convection technology to achieve the best heating in just 20 seconds to an optimal level. The X is the ultimate personal dry herb vaporizer featuring outstanding performance and the highest level of discreteness.</p>"
          }
        }
      },
      "block_order": [
        "heading_akb8kp",
        "text_qTyhcp"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": false,
        "image": "shopify://shop_images/Heating1.gif",
        "image_size": "",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "slideshow_ygAcAw": {
      "type": "slideshow",
      "blocks": {
        "slide_HdVfL3": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/finger_blue.jpg",
            "content_width_maximum": 600,
            "desktop_content_position": "middle-center",
            "mobile_content_position": "middle-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "Thin. Thinner. X.",
            "heading_size": "h3",
            "text": "AirVape X is the most portable option to vaporize substance with its perfectly designed pocket fit and the vibrating function discretely warns you when X reached the temperature and when automatic shutoff timer goes off.",
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
            "background_color": "#242424",
            "color_text": "#ffffff",
            "overlay_color": "#000000",
            "overlay_opacity": 30,
            "overlay_type": "solid",
            "heading_html_tag": "h2"
          }
        },
        "slide_7CBKm4": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/oval_blue.png",
            "content_width_maximum": 640,
            "desktop_content_position": "middle-center",
            "mobile_content_position": "middle-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "X = ultimate features² Here’s the math.",
            "heading_size": "h3",
            "text": "The perfectly sized, oval-shaped ceramic chamber, plus the compartment underneath that accumulates hot air, serves for extra smooth, original vapor and even heating.",
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
            "overlay_opacity": 30,
            "overlay_type": "solid",
            "heading_html_tag": "h2"
          }
        },
        "slide_LiNqh4": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/AirVape_TrippyTreez-0349.jpg",
            "content_width_maximum": 640,
            "desktop_content_position": "middle-center",
            "mobile_content_position": "middle-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "Quality above all else",
            "heading_size": "h3",
            "text": "Made from the highest grade materials, and equipped with state-of-the-art super-fast heating technology, AirVape X’s quality is backed up by a lifetime warranty.",
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
            "overlay_opacity": 30,
            "overlay_type": "solid",
            "heading_html_tag": "h2"
          }
        }
      },
      "block_order": [
        "slide_HdVfL3",
        "slide_7CBKm4",
        "slide_LiNqh4"
      ],
      "custom_css": [
        "@media screen and (max-width: 767px) {.slideshow-slide {min-height: 500px; }}"
      ],
      "settings": {
        "full_width": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "autoplay": true,
        "speed": 4,
        "height": 600,
        "controls": "arrows",
        "background_animation": "ZoomOut",
        "content_animation": "AppearLineByLine",
        "background_color": "#262626"
      }
    },
    "image_with_text_9Vxk9p": {
      "type": "image-with-text",
      "blocks": {
        "heading_dcbfaV": {
          "type": "heading",
          "settings": {
            "heading": "Now with X Shell included",
            "heading_size": "h2",
            "heading_html_tag": "p"
          }
        },
        "text_xcEkpH": {
          "type": "text",
          "settings": {
            "text": "<p>The X Shell is a one-of-a-kind accessory that makes the X smell-proof and water-resistant, and it only adds to its discreteness, without taking away the thinness of the best pocket-fit device.</p>"
          }
        }
      },
      "block_order": [
        "heading_dcbfaV",
        "text_xcEkpH"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": false,
        "image": "shopify://shop_images/WaterShell.gif",
        "image_size": "",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "featured_collection_WcHzab": {
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
        "collection": "airvape-x-accessories",
        "subheading": "",
        "heading": "AIRVAPE X ACCESSORIES",
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
    "custom_section_7BJbQz": {
      "type": "custom-section",
      "blocks": {
        "ai_gen_block_657f32b_eqEBVy": {
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
        "ai_gen_block_657f32b_eqEBVy"
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
        "heading_html_tag": "h2",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "featured_collection_jJyw4y": {
      "type": "featured-collection",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "products": [
          "enso-travel-ritual-kit",
          "festival-pack",
          "2x-air-bubble-dosing-capsules-for-legacy-pro-6-piece",
          "legacy-pro-2-stealth-carry-kit",
          "breathelet-power-pack",
          "airbubble-dosing-capsules-for-legacy-pro-6-piece",
          "enso-adventure-kit",
          "legacy-core-capsule-kit"
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
    "product_faqs_LXeDrp": {
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
    "custom_section_ttwdUz",
    "1775027402f323ad93",
    "video_with_text_overlay_DTHfhk",
    "text_with_icons_KkHLhA",
    "image_with_text_76bibF",
    "slideshow_ygAcAw",
    "image_with_text_9Vxk9p",
    "featured_collection_WcHzab",
    "custom_section_7BJbQz",
    "featured_collection_jJyw4y",
    "product_faqs_LXeDrp"
  ]
}
```
