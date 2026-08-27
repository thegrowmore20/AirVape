# Migration Prompt — Product Template: OM Wax Pen Bundle (`product.om-wax-pen-bundle.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt, the **sticky-add-to-cart** prompt, the **image-slider (ai_gen_block_657f32b)** notes, and the **product-om-wax-pen** prompt (this is a sibling template — same buy-box family, different content mix). Assign this template (suffix **`om-wax-pen-bundle`**) to the OM Keychain Waxpen **bundle** product/variant page in Admin.
> This documents **every section, every block, every behavior** (what shows, what's hidden/disabled, the sticky media gallery, the sticky add-to-cart, the accordions), embeds the **custom PDP CSS** verbatim, and includes the **full `product.om-wax-pen-bundle.json`** at the bottom.

---

Recreate my **OM Wax Pen Bundle product** page (`templates/product.om-wax-pen-bundle.json`) so it looks and behaves identically. It's a customized `main-product` PDP followed by custom + stock content sections and FAQs (**no spec-comparison section on this template**). Copy the JSON verbatim, port the custom snippets/sections + CSS, create the metafields, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.om-wax-pen-bundle.json` — preserve section order, every `"disabled": true`, all block settings, and the header comment.
2. Port the custom section/snippet files and `assets/main-product.css` (embedded in §5, byte-identical to the CORE/OM-wax-pen templates' file). For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — many blocks/sections are **empty without them**.
4. Re-upload **images/videos** (§7) and assign the **`om-wax-pen-bundle`** template to the bundle product.
5. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (10) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `custom_section_fiFigX` | custom-section ⚑ | on | "FOLLOW US ON YOUTUBE" → **product-meta-shorts** video carousel |
| 3 | `1774934113c38840b9` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews (limit **10**) |
| 4 | `video_with_text_overlay_xxcGW7` | video-with-text-overlay | **on** ⚠️ | "Don't let the appearance of the AirVape OM fool you" — **enabled here** (unlike the base om-wax-pen template, where the equivalent section is disabled in favor of a static-image fallback) |
| 5 | `text_with_icons_C8jJBL` | text-with-icons | on | 3 feature columns (Changeable Voltage, LED Indicator, Keychain Size) |
| 6 | `image_with_text_YeCgkp` | image-with-text | on | "What's so special about the Airvape OM?" split image+text |
| 7 | `featured_collection_3Ppf9N` | featured-collection ⚑ | on | "OM ACCESSORIES" carousel |
| 8 | `custom_section_PAbbkY` | custom-section ⚑ | on | "USER GUIDE" → **ai_gen_block_657f32b** image slider |
| 9 | `featured_collection_kRGhHr` | featured-collection ⚑ | on | "COMPLETE YOUR MEMORIAL DAY COLLECTION" carousel (bundle/kit products) |
| 10 | `product_faqs_zJKmzR` | product-faqs ⚑ | on | "FAQS" accordion |

**Disabled = present in JSON but not rendered** (keep the flags). Note several **sub-blocks inside `main`** are disabled (see §3.2).

**⚠️ Structural differences vs the sibling `product.om-wax-pen.json` template — verified by direct diff, do not "correct" these to match the other template:**
- **No `pdp-aplus-comparison` section anywhere in this template.** The base om-wax-pen template has one (`pdp_aplus_comparison_4ndTmA`, "CHOOSE WHAT SUITS YOU BEST"); this bundle template omits it entirely. Do not add a comparison section here.
- **No `image-with-text-overlay` fallback section.** In the base template, `video_with_text_overlay_xxcGW7` is disabled and a companion `image_with_text_overlay_AKe8PX` (same copy, static image) renders instead. Here the **video section itself is enabled** and there is no image fallback — the video actually plays live on this page.
- Section id `1774934113c38840b9` (apps/Loox) is identical between templates but the **review limit is 10** here vs 5 on the base template.
- `custom_section_PAbbkY` (USER GUIDE slider) and `featured_collection_3Ppf9N` (OM ACCESSORIES) are settings-identical to the base template.
- `featured_collection_kRGhHr` has a **different heading, different manual product list, and no `collection` value** — see §4.
- Two of the seven `collapsible_content` buy-box accordions are **disabled** here that are enabled on the base template (How to use?, Accessories) — see §3.2.
- `main.settings.desktop_media_width` is **50** here vs **56** on base/CORE; `media_size` is **empty string** here vs `"1"` on base/CORE (adaptive vs fixed aspect).

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5, byte-identical to the CORE and om-wax-pen templates' file — it's the shared PDP CSS across all product templates, do not fork it). It loads `main-product.css` via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `sections/custom-section.liquid` — generic wrapper confirmed by direct read: renders `section-header` (heading/subheading/link) then `{% content_for 'blocks' %}` inside `.section-body-wrapper`; schema accepts `@app`/`@theme` blocks only (no built-in block types — `product-meta-shorts` and `ai_gen_block_657f32b` are theme app/custom blocks hosted inside it). No hardcoded CDN or asset URLs in this file.
- `blocks/product-meta-shorts.liquid` (YouTube/short-video carousel from a product metafield).
- `blocks/ai_gen_block_657f32b.liquid` (image slider; self-contained scoped CSS/JS; **Auto aspect-ratio = natural size, no crop** — see the image-slider fix notes).
- `sections/product-faqs.liquid` (FAQ accordion from a product metafield).
- `sections/featured-collection.liquid` (shared customized featured collection).
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**).
- Buy-box block snippets (mostly stock, rendered by `product-info.liquid`): `title`, `price`, `rich_text_block`, `payment_installments`, `custom_liquid`, `variant_picker`(+radio), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `collapsible_content`, `share_button`, `image`.
- **Not used on this template:** `sections/pdp-aplus-comparison.liquid` is not referenced — don't create/assign a comparison section for this product.

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          ⚠️ differs from base om-wax-pen (56) and CORE (56) — media column is 50% of page width on desktop
media_size: ""                   ⚠️ differs from base om-wax-pen ("1") and CORE ("1") — adaptive aspect, not fixed
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: false
media_enable_video_looping: true
media_fit_height: true           → same as base om-wax-pen (differs from CORE's false) — media column height fits content
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** with `carousel_vertical`, desktop renders a `<scroll-carousel vertical>` thumbnail rail + a `<media-carousel>` main stage; the whole **media column is sticky** (stays in view while the buy-box column scrolls). `media_zoom: lightbox` wraps it in `<media-lightbox>` so clicking a slide opens fullscreen zoom. On mobile the gallery is a swipeable carousel with a **thumbnail** indicator. The mobile product title+reviews render **above** the gallery (`product-title-reviews`, `hidden-desktop`). Don't rewrite these — they're stock; just keep the settings above (note the `desktop_media_width: 50` / `media_size: ""` differences from the other two templates).
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom when the main Add-to-Cart scrolls out of view, centered. Full spec in the **sticky-add-to-cart** prompt.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order`. **Bold = custom/metafield-driven. ⛔ = disabled (hidden).** Same as the base om-wax-pen template: **no `custom_badges` block at all** (not even disabled), and **no stock `description` block, no "high demand"/"EU orders"/"PRO 2 ship" `text` blocks** — this template is leaner, matching its sibling.
1. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent (→ inherits default). Shows the product name.
2. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`, opens floating widget on click, shows empty-rating widget. **⚠️ Hidden on mobile inside the buy box** by `main-product.css` (`.section-main-product .product-info-inner .loox-rating { display:none }` ≤767px) — on mobile the rating shows in the `product-title-reviews` block above the gallery instead.
3. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
4. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product **hook/tagline** (heading size `text-h6 md:text-h5`, left). Empty if `custom.hook_text` missing. **Shown.**
5. `payment_installments` — Shop Pay installments messaging.
6. **`custom_liquid`** — inline `<style>.promo-text-block{background:#ececec;border-radius:12px;border:1px solid #E1E1E1}</style>` + a grey rounded pill: "**NY Times Wirecutter** nominated AirVape for best portable vaporizers". **Shown.**
7. `variant_picker` — `type: radio`, `color_picker_type: radio-image` (color swatches as images), `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
8. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (**no Buy-it-now/express buttons**), `show_gift_card_recipient: false`, button colors default.
9. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5` → "Receive by …" business-day estimate.
10. **`icon_text_block` (`icon-text-pdp`, inline)** — 5 trust icons in one row (80px): `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`.
11–17. **`collapsible_content` ×7 — accordions, ALL closed by default (`collapse_open: false`); TWO are disabled here that are enabled on the sibling template:**
    - "Description" → `custom.description` — **shown**
    - "Key Features" ⚠️ (heading text differs from base template's "Specifications") → `custom.specifications` — **shown**
    - "What's in the box?" → `custom.what_s_in_the_box` — **shown**
    - **"How to use?" → `custom.how_to_use` — ⛔ disabled (hidden)**, unlike the base om-wax-pen template where it's shown
    - **"Accessories" → `custom.parts_accessories` — ⛔ disabled (hidden)**, unlike the base om-wax-pen template where it's shown
    - "Warranty and Support" → `custom.lifetime_waranty` — **shown**
    - "Why Choose AirVape?" → **hardcoded HTML** (long copy, in the JSON — no metafield; identical text to the CORE/om-wax-pen templates' block) — **shown**
    Each metafield accordion is **empty if its metafield is missing**.
18. **`icon_text_block` (`homepage-usps-info`, vertical)** — 5 USP items (FAST HEAT-UP / PURE FLAVOUR / EASY TO USE / EASY TO USE / LASTS LONGER) at 30px; `main-product.css` lays them out as a **2-column wrapped row** with grey circular icon backgrounds and greyscale-filtered icons.
19. `share_button` — native share.
20. **`rich_text_block` ⛔ disabled** ("The world's first keychain WaxPen") — heading + hardcoded HTML content: *"The perfect companion for your on-the-go experience, AirVape OM comes with an elegant gunmetal finish. Super Easy USB charging with the OM charger adapter YOU just twist and PLUG. User Friendly: with the the click of just one button you can Power ON or OFF or choose your preferred voltage settings, guided by a tactful little LED indicator."* Hidden — not rendered. (Same as base template.)
21. **`image` ⛔ disabled** — `shopify://shop_images/airvape_180423_-45t.jpg`, `width: 500`, left-aligned, no heading/link. Hidden — not rendered. (Same as base template.)

## 4. Content sections below the PDP — behaviors & hidden bits
- **`custom-section` "FOLLOW US ON YOUTUBE"** → `product-meta-shorts` block: horizontal **video carousel** from metafield `custom.product_short_videos`. Settings: `muted: true`, red play button (**68px** ⚠️ differs from CORE/om-wax-pen's 48px), radius 12, **4/3/2** slides desktop/medium/mobile, gap 20, arrows + dots (black arrows 40px, dots 8px). Heading is a YouTube SVG + "@AirvapeusaOfficial" linking to the channel.
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — Loox review carousel, **limit 10** ⚠️ (CORE uses 4, base om-wax-pen uses 5), not aggregated.
- **video-with-text-overlay — ENABLED (not disabled)** ⚠️ — subheading "Airvape om keychain wax pen", heading "Don't let the appearance of the AirVape OM fool you", text "It might look like a keychain and well, it is a keychain, but nonetheless it is a lean, mean vaping machine that hits like a dream yet is discreet as a whisper." Video `shopify://files/videos/Om_final_short.webm`, `video_url` (YouTube fallback) `https://www.youtube.com/watch?v=_9VUPq3SxOc`, overlay 35% solid black, `custom_class: video-text-overlay-section`. **This actually renders and plays on the page** — unlike the base om-wax-pen template where the equivalent section is disabled and a static image substitutes. **No image-with-text-overlay companion section exists in this template at all.**
- **text-with-icons** — 3 `column` blocks (Changeable Voltage / LED Indicator / Keychain Size), each with a `custom_icon` PNG (`Icons_all-27.png`, `Icons_all-26.png`, `Icons_all-25.png`) and empty `content`, circle background, 64px, 1-col mobile, centered. Identical to base om-wax-pen template.
- **image-with-text** "What's so special about the Airvape OM?" — split layout, text: *"The quick answer is this: the OM is powerful, discreet, and inexpensive!"*, image `shopify://shop_images/airvape_180423_-20t.jpg`, image right 50%, centered text alignment. Identical to base om-wax-pen template.
- **featured-collection "OM ACCESSORIES"** — carousel, 8 products, from collection `om-accessories`, "View all" → `airvape-x-accessories`. Manual product fallback list includes `airvape-om-keychain-waxpen` itself. Identical settings to base om-wax-pen template.
- **custom-section "USER GUIDE"** → `ai_gen_block_657f32b` **image slider** from metafield `custom.user_guide`; `aspect_ratio: "auto"` (natural size, **no cropping**), **3/3/2** slides desktop/tablet/mobile, gap 16, radius 12, arrows + dots, no autoplay, no infinite loop. Identical settings to base om-wax-pen template.
- **featured-collection "COMPLETE YOUR MEMORIAL DAY COLLECTION"** ⚠️ — carousel, 8 slots, **no `collection` assigned** (manual product list only), heading and product list **differ from every other template**: `festival-pack`, `legacy-core-capsule-kit`, `legacy-essentials-kit`, `enso-adventure-kit`, `airvape-x-waterflow-kit`, `breathelet-power-pack`, `legacy-pro-2-stealth-carry-kit`, `xperience-kit`. This is a **bundle/kit-specific promo carousel** — all 8 entries are kit/bundle-style products, not the standard "signature models" list seen on other templates. Confirm these products exist (or create equivalents) on the new store before assigning.
- **product-faqs "FAQS"** — accordion from `custom.faqs`. Empty without the metafield.

## 5. `assets/main-product.css` — the custom PDP CSS (shared file, copy verbatim)
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
> This is the only PDP-specific stylesheet, **shared with every other product template** (byte-identical to the file backing CORE and the base om-wax-pen template — do not fork it per-template). It styles the two `icon_text_block` layouts (`icon-text-pdp` inline trust-row + `homepage-usps-info` 2-col USP grid with greyscale icons), the qty pill (`.qty-wrap`), the delivery-date weight, the comparison-card Loox rating (unused on this template since there's no comparison section, but keep the rule — it's shared), the payment list, the restock-notify button, and **hides the buy-box Loox rating on mobile**.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — all namespace `custom`
Without these, the matching block/section is **empty**. **Note: this template does not use `comparison_features`/`comparison_products`/`compare_key` since it has no pdp-aplus-comparison section** — you can skip those three if this is the only template on the product.
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `description` | rich text | "Description" accordion |
| `specifications` | rich text | "Key Features" accordion |
| `what_s_in_the_box` | rich text | "What's in the box?" accordion |
| `how_to_use` | rich text | "How to use?" accordion (block is disabled — populate only if you plan to re-enable it) |
| `parts_accessories` | rich text | "Accessories" accordion (block is disabled — populate only if you plan to re-enable it) |
| `lifetime_waranty` | rich text | "Warranty and Support" accordion |
| `product_short_videos` | list / rich text | product-meta-shorts carousel |
| `user_guide` | list of images (or the block's expected source) | ai_gen_block_657f32b slider |
| `faqs` | (per product-faqs schema) | FAQS accordion |

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `FAST_HEAT-UP.webp`, `PURE_FLAVOUR.webp`, `EASY_TO_USE.webp`, `LONG_BATTERY_LIFE.webp`, `airvape_180423_-45t.jpg` (disabled image block), `Icons_all-27.png`, `Icons_all-26.png`, `Icons_all-25.png`, `airvape_180423_-20t.jpg`. (Grep of the JSON for `shopify://shop_images` confirms this is exhaustive — **no hardcoded `cdn.shopify.com` or other absolute CDN URLs anywhere in this template**; every asset reference uses the portable `shopify://shop_images/...` / `shopify://files/videos/...` scheme, so nothing needs manual URL-rewriting, only re-uploading with matching filenames.)
- **Videos → Content → Files:** `Om_final_short.webm` — ⚠️ **this must actually be re-uploaded and will be visible**, since `video_with_text_overlay_xxcGW7` is **enabled** on this template (unlike the base om-wax-pen template, where the same file backs a disabled section and is effectively unused). Grep for `shopify://files/videos` confirms it's the only video reference.
- **Apps:** **Loox** (the buy-box rating app-block + the dynamic reviews app-block, limit **10** here). Re-add both blocks after installing Loox; their app-block IDs will differ on the new store.
- **Collections:** `om-accessories` (featured_collection_3Ppf9N), `airvape-x-accessories` (the "View all" link target on OM ACCESSORIES). `featured_collection_kRGhHr` ("COMPLETE YOUR MEMORIAL DAY COLLECTION") has **no `collection` value** — it's a manual product list only.
- **Products (featured):**
  - OM ACCESSORIES fallback list: `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.
  - COMPLETE YOUR MEMORIAL DAY COLLECTION list (all manual, no collection): `festival-pack`, `legacy-core-capsule-kit`, `legacy-essentials-kit`, `enso-adventure-kit`, `airvape-x-waterflow-kit`, `breathelet-power-pack`, `legacy-pro-2-stealth-carry-kit`, `xperience-kit`. **These are bundle/kit product handles** — verify they exist on the new store (they may be seasonal/promo products specific to this bundle template) and create/report any missing.
- **Product media:** upload the bundle product's gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections:** none. All 10 sections in the `order` array render (this differs from the base om-wax-pen template, which has one disabled section).
- **Disabled buy-box blocks:** `collapsible_content_dzpUzt` ("How to use?"), `collapsible_content_DUpcBn` ("Accessories"), `rich_text_block_UkbaMJ` ("The world's first keychain WaxPen" — hardcoded copy), `image_hVkC78` (disabled image block, `airvape_180423_-45t.jpg`).
- **No disabled sub-blocks anywhere** — every block inside every enabled section (including the video-with-text-overlay's `subheading`/`heading`/`text`) is itself enabled.
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px) — intentional (rating shown above gallery on mobile instead).
- **5 of 7 `collapsible_content` accordions render** (Description, Key Features, What's in the box?, Warranty and Support, Why Choose AirVape?), all start **CLOSED** (`collapse_open: false`); the other 2 (How to use?, Accessories) are disabled and don't render at all.
- **No `pdp-aplus-comparison` section, no `custom_badges` block, no stock `description` block** — confirmed by direct inspection; do not add them.
Keep all of the above exactly.

## 9. Report back
- Confirm the `om-wax-pen-bundle` template is assigned; JSON valid; all `disabled` flags + closed accordions preserved (including the two disabled accordions that differ from the sibling om-wax-pen template).
- Confirm `main-product.css` loads (shared file — verify it matches the CORE/om-wax-pen templates' copy byte-for-byte) and the two `icon_text_block` layouts render (inline trust row + 2-col USP grid), and the buy-box Loox rating hides on mobile.
- Confirm the **sticky media gallery** (note `desktop_media_width: 50` + `media_size: ""` — adaptive, not the 56%/fixed used elsewhere) + lightbox zoom work, and the **centered sticky add-to-cart** slides in on scroll.
- Confirm the **video-with-text-overlay actually plays** (it's enabled here, unlike the sibling template) and that there is **no** image-with-text-overlay fallback section on this template.
- Confirm custom sections/blocks ported: `product-meta-shorts` (68px play button), `ai_gen_block_657f32b` (Auto = no crop, 3/3/2 slides, radius 12), `product-faqs`, both `featured-collection`s — and confirm **no** pdp-aplus-comparison section was added.
- Confirm all `custom.*` metafields exist (else hook, accordions, shorts, user-guide, FAQs are empty), Loox installed + both blocks re-added (dynamic-reviews limit **10**), and the bundle/kit products for "COMPLETE YOUR MEMORIAL DAY COLLECTION" exist or are flagged as missing.

---

## FULL `templates/product.om-wax-pen-bundle.json` — copy verbatim

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
        "loox_reviews_loox_rating_tBKpxd": {
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
        "rich_text_block_zjTCjy": {
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
        "custom_liquid_bT9ei6": {
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
        "qty_btn_selector_MBKAch": {
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
        "delivery_fmQ9ba": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_wNkHJX": {
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
        "collapsible_content_JypDGX": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Description",
            "content": "{{ product.metafields.custom.description | metafield_tag }}"
          }
        },
        "collapsible_content_FnYw7F": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Key Features",
            "content": "{{ product.metafields.custom.specifications | metafield_tag }}"
          }
        },
        "collapsible_content_Jgy6HX": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "What's in the box?",
            "content": "{{ product.metafields.custom.what_s_in_the_box | metafield_tag }}"
          }
        },
        "collapsible_content_dzpUzt": {
          "type": "collapsible_content",
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "How to use?",
            "content": "{{ product.metafields.custom.how_to_use | metafield_tag }}"
          }
        },
        "collapsible_content_DUpcBn": {
          "type": "collapsible_content",
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "Accessories",
            "content": "{{ product.metafields.custom.parts_accessories | metafield_tag }}"
          }
        },
        "collapsible_content_ib4FNr": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Warranty and Support",
            "content": "{{ product.metafields.custom.lifetime_waranty | metafield_tag }}"
          }
        },
        "collapsible_content_iCiTPz": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "icon_text_block_pdNJdf": {
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
        "share_button_k8keAR": {
          "type": "share_button",
          "settings": {}
        },
        "rich_text_block_UkbaMJ": {
          "type": "rich_text_block",
          "disabled": true,
          "settings": {
            "icon": "",
            "icon_width": 24,
            "heading": "The world's first keychain WaxPen",
            "content": "<p>The perfect companion for your on-the-go experience, AirVape OM comes with an elegant gunmetal finish.<br/><br/>Super Easy USB charging with the OM charger adapter YOU just twist and PLUG.<br/><br/>User Friendly: with the the click of just one button you can Power ON or OFF or choose your preferred voltage settings, guided by a tactful little LED indicator.<br/><br/></p>",
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
        "image_hVkC78": {
          "type": "image",
          "disabled": true,
          "settings": {
            "image": "shopify://shop_images/airvape_180423_-45t.jpg",
            "width": 500,
            "alignment": "text-left",
            "heading": "",
            "link": ""
          }
        }
      },
      "block_order": [
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_tBKpxd",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "rich_text_block_zjTCjy",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "custom_liquid_bT9ei6",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "qty_btn_selector_MBKAch",
        "delivery_fmQ9ba",
        "icon_text_block_wNkHJX",
        "collapsible_content_JypDGX",
        "collapsible_content_FnYw7F",
        "collapsible_content_Jgy6HX",
        "collapsible_content_dzpUzt",
        "collapsible_content_DUpcBn",
        "collapsible_content_ib4FNr",
        "collapsible_content_iCiTPz",
        "icon_text_block_pdNJdf",
        "share_button_k8keAR",
        "rich_text_block_UkbaMJ",
        "image_hVkC78"
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
    "custom_section_fiFigX": {
      "type": "custom-section",
      "blocks": {
        "product_meta_shorts_NrMzq4": {
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
        "product_meta_shorts_NrMzq4"
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
    "1774934113c38840b9": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_NGMa3d": {
          "type": "shopify://apps/loox-reviews/blocks/loox-dynamic-section/5c3b337f-fd14-4df5-b1d6-80ec13e6e28e",
          "settings": {
            "reviews_to_display": "",
            "default_tab": "automatic",
            "only_photos": false,
            "aggregated": false,
            "limit": 10,
            "hide_thumbnails": false,
            "maxwidth": 1080,
            "is_sample": true
          }
        }
      },
      "block_order": [
        "loox_reviews_loox_dynamic_section_NGMa3d"
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
    "video_with_text_overlay_xxcGW7": {
      "type": "video-with-text-overlay",
      "blocks": {
        "subheading_dBqmQM": {
          "type": "subheading",
          "settings": {
            "text": "Airvape om keychain wax pen"
          }
        },
        "heading_TbLFfE": {
          "type": "heading",
          "settings": {
            "heading": "Don’t let the appearance of the AirVape OM fool you",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_67YREQ": {
          "type": "text",
          "settings": {
            "text": "<p>It might look like a keychain and well, it is a keychain, but nonetheless it is a lean, mean vaping machine that hits like a dream yet is discreet as a whisper.</p>"
          }
        }
      },
      "block_order": [
        "subheading_dBqmQM",
        "heading_TbLFfE",
        "text_67YREQ"
      ],
      "settings": {
        "custom_class": "video-text-overlay-section",
        "full_width": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "video": "shopify://files/videos/Om_final_short.webm",
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
    "text_with_icons_C8jJBL": {
      "type": "text-with-icons",
      "blocks": {
        "column_QAkmDy": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-27.png",
            "icon": "package-check",
            "heading": "Changeable Voltage",
            "content": ""
          }
        },
        "column_T3ErBU": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-26.png",
            "icon": "message-chat-circle",
            "heading": "LED Indicator",
            "content": ""
          }
        },
        "column_mTr6cK": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-25.png",
            "icon": "return",
            "heading": "Keychain Size",
            "content": ""
          }
        }
      },
      "block_order": [
        "column_QAkmDy",
        "column_T3ErBU",
        "column_mTr6cK"
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
    "image_with_text_YeCgkp": {
      "type": "image-with-text",
      "blocks": {
        "heading_443YcL": {
          "type": "heading",
          "settings": {
            "heading": "What’s so special about the Airvape OM?",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_R89WTW": {
          "type": "text",
          "settings": {
            "text": "<p>The quick answer is this: the OM is powerful, discreet, and inexpensive! <br/><br/></p>"
          }
        }
      },
      "block_order": [
        "heading_443YcL",
        "text_R89WTW"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": false,
        "image": "shopify://shop_images/airvape_180423_-20t.jpg",
        "image_size": "",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "featured_collection_3Ppf9N": {
      "type": "featured-collection",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "carousel": true,
        "products_count": 8,
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
        "collection": "om-accessories",
        "subheading": "",
        "heading": "OM ACCESSORIES",
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
    "custom_section_PAbbkY": {
      "type": "custom-section",
      "blocks": {
        "ai_gen_block_657f32b_KhaLHG": {
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
        "ai_gen_block_657f32b_KhaLHG"
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
    "featured_collection_kRGhHr": {
      "type": "featured-collection",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "products": [
          "festival-pack",
          "legacy-core-capsule-kit",
          "legacy-essentials-kit",
          "enso-adventure-kit",
          "airvape-x-waterflow-kit",
          "breathelet-power-pack",
          "legacy-pro-2-stealth-carry-kit",
          "xperience-kit"
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
    "product_faqs_zJKmzR": {
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
    "custom_section_fiFigX",
    "1774934113c38840b9",
    "video_with_text_overlay_xxcGW7",
    "text_with_icons_C8jJBL",
    "image_with_text_YeCgkp",
    "featured_collection_3Ppf9N",
    "custom_section_PAbbkY",
    "featured_collection_kRGhHr",
    "product_faqs_zJKmzR"
  ]
}
```
