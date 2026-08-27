# Migration Prompt — Product Template: Legacy PRO 2 (`product.pro-2-_po.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt, the **sticky-add-to-cart** prompt, and the **image-slider (ai_gen_block_657f32b)** notes. Assign this template (suffix **`pro-2-_po`** — the unusual filename, keep it EXACTLY) to the Legacy PRO 2 product in Admin.
> This documents **every section, every block, every behavior** (what shows, what's hidden/disabled, the sticky media gallery, the sticky add-to-cart, the accordions, the repeated video→image fallback pattern), embeds the **custom PDP CSS** verbatim, and includes the **full `product.pro-2-_po.json`** at the bottom.

---

Recreate my **Legacy PRO 2 product** page (`templates/product.pro-2-_po.json`) — the flagship PDP — so it looks and behaves identically. It's a customized `main-product` PDP followed by custom + stock content sections (including a rich-text feature block and several **disabled video sections each paired with an enabled image fallback**), a spec-comparison, and FAQs. Copy the JSON verbatim, port the custom snippets/sections + CSS, create the metafields, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.pro-2-_po.json` — keep the exact filename (note the unusual `-_po` suffix), preserve section order, every `"disabled": true`, all block settings, and the header comment.
2. Port the custom section/snippet files and `assets/main-product.css` (embedded in §5 — **identical, shared file** with the CORE template; do not create a second copy). For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — many blocks/sections are **empty without them**.
4. Re-upload **images/videos** (§7) and assign the **`pro-2-_po`** template to the Legacy PRO 2 product.
5. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (19) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `custom_section_eaLVtN` | custom-section ⚑ | on | "FOLLOW US ON YOUTUBE" → **product-meta-shorts** video carousel |
| 3 | `1759505359de5a7814` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews |
| 4 | `slideshow_gpnHad` | slideshow | **disabled** | "Just you, your vibe, and the Legacy PRO 2" video slide (hidden) |
| 5 | `image_with_text_overlay_CbfRb6` | image-with-text-overlay | on | "Just you, your vibe, and the Legacy PRO 2" — **image fallback of #4** |
| 6 | `text_with_icons_tqLMpf` | text-with-icons | on | 3 feature columns (Updated Heating, Industry Leading, Easy to Clean) |
| 7 | `rich_text_THk6gf` | **rich-text** | on | "Major UpGrades" eyebrow + heading + long feature copy (ONEPATH, cork/gold flakes, color display) |
| 8 | `video_with_text_cbmaUp` | video-with-text | **disabled** | "Simply PRO" video (hidden) |
| 9 | `image_with_text_zrXTcP` | **image-with-text** | on | "Simply PRO" — **image fallback of #8** |
| 10 | `video_with_text_overlay_DTHfhk` | video-with-text-overlay | **disabled** | "Pure Bliss with Every Puff" video (hidden) |
| 11 | `image_with_text_overlay_ipUg8e` | image-with-text-overlay | on | "Pure Bliss with Every Puff" — **image fallback of #10** |
| 12 | `video_with_text_YjAd6V` | video-with-text | **disabled** | "From Herb to Wax / From Beginner to PRO" video (hidden) |
| 13 | `image_with_text_94HDtX` | **image-with-text** | on | "From Herb to Wax / From Beginner to PRO" — **image fallback of #12** |
| 14 | `video_nrLrNt` | **video** | on | full-width video, no heading/text (`pro2_inside_web.webm`) |
| 15 | `custom_section_ggzpUX` | custom-section ⚑ | on | "USER GUIDE" → **ai_gen_block_657f32b** image slider |
| 16 | `featured_collection_WqWJcP` | featured-collection ⚑ | on | "LEGACY PRO ACCESSORIES" carousel |
| 17 | `pdp_aplus_comparison_kkT36X` | pdp-aplus-comparison ⚑ | on | "CHOOSE WHAT SUITS YOU BEST" spec comparison |
| 18 | `featured_collection_CHmD3T` | featured-collection ⚑ | on | "OUR SIGNATURE MODELS" carousel |
| 19 | `product_faqs_3dLD86` | product-faqs ⚑ | on | "FAQS" accordion |

**Notable pattern — this template disables 4 media-heavy sections and shows an image-based equivalent right after each one** (#4→#5, #8→#9, #10→#11, #12→#13). Keep every one of those 4 sections **disabled** in the JSON (don't delete them — they're wired up and ready to re-enable) and keep their image siblings **enabled**. This is different from the CORE template, which only has this pattern once.
**Disabled = present in JSON but not rendered** (keep the flags).

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5 — this is the **exact same file** used by the CORE template; confirmed byte-identical). It loads `main-product.css` via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `sections/custom-section.liquid` (generic wrapper: heading + link + hosts blocks) — used **twice** here (YouTube shorts + USER GUIDE slider).
- `blocks/product-meta-shorts.liquid` (YouTube/short-video carousel from a product metafield).
- `blocks/ai_gen_block_657f32b.liquid` (image slider; self-contained scoped CSS/JS; **Auto aspect-ratio = natural size, no crop** — see the image-slider fix notes).
- `sections/pdp-aplus-comparison.liquid` (spec comparison table; self-contained inline CSS; renders the customized product-card).
- `sections/product-faqs.liquid` (FAQ accordion from a product metafield).
- `sections/featured-collection.liquid` (shared customized featured collection) — used **twice**.
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**, same as CORE).
- **Stock sections used here that don't appear on CORE — verify they exist in 4.2:** `rich-text` (with a `custom_liquid` sub-block), `video-with-text`, `image-with-text`, `video-with-text-overlay`, and the plain `video` section.
- Buy-box block snippets (mostly stock, rendered by `product-info.liquid`): `custom_badges`, `title`, `price`, `text`, `rich_text_block`, `custom_liquid`, `variant_picker`(+radio/`radio-image`), `payment_installments`, `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.

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
media_fit_height: true           ⚠️ DIFFERS FROM CORE (core = false) — media stretches/crops to fill the gallery height on this template
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** with `carousel_vertical`, desktop renders a `<scroll-carousel vertical>` thumbnail rail + a `<media-carousel>` main stage; the whole **media column is sticky** (stays in view while the buy-box column scrolls). `media_zoom: lightbox` wraps it in `<media-lightbox>` so clicking a slide opens fullscreen zoom. `media_fit_height: true` means the gallery media is forced to fill the available height (crop as needed) rather than showing at natural aspect — **keep this true**, it's an intentional deviation from CORE. On mobile the gallery is a swipeable carousel with a **thumbnail** indicator. The mobile product title+reviews render **above** the gallery (`product-title-reviews`, `hidden-desktop`). Don't rewrite these — they're stock; just keep the settings above.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom when the main Add-to-Cart scrolls out of view, centered. Full spec in the **sticky-add-to-cart** prompt.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order`. **Bold = custom/metafield-driven. ⛔ = disabled (hidden).**
1. **`custom_badges`** — product badge row. ⚠️ **DIFFERS FROM CORE — ENABLED here** (CORE has this block disabled). Keep it enabled; it renders whatever badges are on the product.
2. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent (→ inherits default). Shows the product name.
3. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`, opens floating widget on click, shows empty-rating widget. **⚠️ Hidden on mobile inside the buy box** by `main-product.css` (`.section-main-product .product-info-inner .loox-rating { display:none }` ≤767px) — on mobile the rating shows in the `product-title-reviews` block above the gallery instead.
4. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
5. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product **hook/tagline** (heading size `text-h6 md:text-h5`, left). Empty if `custom.hook_text` missing.
6. **`text`** "For European Orders click **HERE**" → links to `https://airvape.eu/product/legacy-pro-2-pre-sale/` (new tab). ⚠️ **Different URL than CORE** (which links to `legacy-core`) — keep the PRO-2-specific URL. **Shown.**
7. **`custom_liquid`** — inline `<style>.promo-text-block{background:#ececec;border-radius:12px;border:1px solid #E1E1E1}</style>` + a grey rounded pill: "**NY Times Wirecutter** nominated AirVape for best portable vaporizers". **Shown.** (Identical markup to CORE.)
8. `variant_picker` — `type: radio`, `color_picker_type: radio-image` (color swatches as images), `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
9. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (**no Buy-it-now/express buttons**), `show_gift_card_recipient: false`, button colors default.
10. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5` → "Receive by …" business-day estimate.
11. **`icon_text_block` (`icon-text-pdp`, inline)** — 5 trust icons in one row (80px): `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`. (Identical to CORE.)
12. **`text` "The Legacy PRO 2 is estimated to ship in 2-3 weeks" ⛔ disabled** (hidden). Note: unlike CORE, there is **no** separate "Due to high demand…" disabled text block on this template — this is the only pre-order/shipping-notice text and it's disabled.
13. `payment_installments` — Shop Pay installments messaging. ⚠️ **Position differs from CORE**: here it sits *after* the trust-icon row and the disabled shipping text (just before `description`), not right after `variant_picker`. Keep the order exactly as listed.
14. **`description` ⛔ disabled** (the stock description accordion is hidden; the metafield ones below replace it).
15–21. **`collapsible_content` ×7 — accordions, ALL closed by default (`collapse_open: false`; click to expand):**
    - "Description" → `custom.description`
    - "Specifications" → `custom.specifications`
    - "What's in the box?" → `custom.what_s_in_the_box`
    - "How to use?" → `custom.how_to_use`
    - "Accessories" → `custom.parts_accessories`
    - "Warranty and Support" → `custom.lifetime_waranty`
    - "Why Choose AirVape?" → **hardcoded HTML** (identical long copy to CORE, in the JSON — no metafield).
    Each metafield accordion is **empty if its metafield is missing**.
22. **`icon_text_block` (`homepage-usps-info`, vertical)** — 5 USP items (FAST HEAT-UP / PURE FLAVOUR / EASY TO USE / EASY TO USE / LASTS LONGER) at 30px; `main-product.css` lays them out as a **2-column wrapped row** with grey circular icon backgrounds and greyscale-filtered icons. (Identical to CORE.)
23. `share_button` — native share.

**Buy-box total: 23 blocks** (vs CORE's 24 — this template drops the "Due to high demand" text block and includes 1 fewer `custom_liquid`/`text` combination up front).

## 4. Content sections below the PDP — behaviors & hidden bits
- **`custom-section` "FOLLOW US ON YOUTUBE"** → `product-meta-shorts` block: horizontal **video carousel** from metafield `custom.product_short_videos`. Settings identical to CORE: `muted: true`, red play button (48px, `#ff0000`), radius 12, **4/3/2** slides desktop/medium/mobile, gap 20, arrows + dots (black arrows 40px, dots 8px). Heading is a YouTube SVG + "@AirvapeusaOfficial" linking to the channel.
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — Loox review carousel, limit 4, not aggregated.
- **slideshow ⛔ disabled** — "Just you, your vibe, and the Legacy PRO 2" video slide (`airvape_girl_web.webm`); no body text, no button (`button_style: button-outline` but blank text/link). Has `custom_css` min-height 500px mobile, `height: 640`. Hidden; the image-overlay below (#5) shows instead.
- **image-with-text-overlay** "Just you, your vibe, and the Legacy PRO 2" — `Legacy-PRO2-Product_Page2.webp`, **heading-only block** (no text/button block present, unlike CORE's equivalent which also has body copy + a button). Overlay 30% solid.
- **text-with-icons** — **3** `column` blocks (Updated Heating / Industry Leading / Easy to Clean), each with a `custom_icon` PNG + fallback icon, circle background, 64px, 1-col mobile, centered. ⚠️ **Only 3 columns here vs CORE's 4** — there is no "Swappable" column (PRO 2 doesn't have swappable skins like CORE).
- **rich-text "Major UpGrades"** — eyebrow heading (`h6`) "Major UpGrades" + main heading (`h3`→rendered `h2`) "The Legacy PRO 2 is packed with all the features you asked for - and we listened." + a `custom_liquid` block that's just a spacer paragraph (`<p class="pb-2"></p>`) + a `text` block with a bullet list (ONEPATH air-path cleaning brush, black cork with gold flakes, new color display) followed by paragraphs about the new dark grey finish and hybrid convection/conduction heating, rapid heat-up, precision temp control, removable battery + wireless charging. `full_width: false`, `content_width: "full-width"`, `text_alignment: "text-left"`. **This section type/content does not exist on CORE** — it's PRO-2-specific.
- **video-with-text ⛔ disabled** — "Simply PRO" (`Finalk_no_smoke0.webm`), text about packing/heat-up/refined design. Hidden; the image-with-text section right after (#9) shows the same heading+text over an image instead.
- **image-with-text** "Simply PRO" — `Legacy_Pro_2_Page_Image.webp`, image right 50%, same heading/text as the disabled video-with-text above it.
- **video-with-text-overlay ⛔ disabled** — "Pure Bliss with Every Puff" (`airvape_pro2_web.webm`), subheading "Simply PRO", text about advanced technology. Hidden; the image-with-text-overlay right after (#11) shows the same content over an image instead.
- **image-with-text-overlay** "Pure Bliss with Every Puff" — `Legacy-PRO2-Product_Page.webp`, subheading "Simply PRO", overlay 30%, same heading/text as the disabled video overlay above it.
- **video-with-text ⛔ disabled** — "From Herb to Wax" / "From Beginner to PRO" (`legacy2.0_smoky_ss.webm`), `image_size: media--ratio-4-3`, image left, text "The only vape you'll ever need". Hidden; the image-with-text right after (#13) shows the same headings/text over an image instead.
- **image-with-text** "From Herb to Wax" / "From Beginner to PRO" — `Legacy-PRO2_a2bf20ad-e702-41f8-abe1-6456ceab794f.webp`, image left 50%, same headings/text as the disabled video-with-text above it.
- **video (stock, enabled)** — full-width, `pro2_inside_web.webm`, **no heading/text/subheading** (all blank) — just plays the video full-bleed. This is the one video section on the page that's actually visible.
- **custom-section "USER GUIDE"** → `ai_gen_block_657f32b` **image slider** from metafield `custom.user_guide`; `aspect_ratio: "auto"` (natural size, **no cropping** — this is the fixed behavior), **3/3/2** slides desktop/tablet/mobile (⚠️ differs from CORE's 4/4/2), gap 16, radius 6, arrows + dots, no autoplay, no infinite loop.
- **featured-collection "LEGACY PRO ACCESSORIES"** — carousel, 4 products, from collection `legacy-accessories`, "View all" → `airvape-x-accessories`. (Same manual product fallback list as CORE.)
- **pdp-aplus-comparison "CHOOSE WHAT SUITS YOU BEST"** — spec comparison table driven by metafields (§6). Renders the customized product-card per compared product. Empty without metafields.
- **featured-collection "OUR SIGNATURE MODELS"** — carousel, 8 slots, manual product list (no collection). Excludes `legacy-pro-2` itself (self-exclusion, same pattern CORE uses to exclude itself), includes `legacy-core` instead.
- **product-faqs "FAQS"** — accordion from `custom.faqs`. Empty without the metafield.

## 5. `assets/main-product.css` — the custom PDP CSS (copy verbatim — SAME file as the CORE template)
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
> This is the only PDP-specific stylesheet, shared verbatim between CORE and PRO 2 — **do not create a second copy**, both templates load the same `assets/main-product.css`. It styles the two `icon_text_block` layouts (`icon-text-pdp` inline trust-row + `homepage-usps-info` 2-col USP grid with greyscale icons), the qty pill (`.qty-wrap`), the delivery-date weight, the comparison-card Loox rating, the payment list, the restock-notify button, and **hides the buy-box Loox rating on mobile**.

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
| `user_guide` | list of images (or the block's expected source) | ai_gen_block_657f32b slider |
| `comparison_features` | (per pdp-aplus schema) | comparison table rows |
| `comparison_products` | product list | comparison table columns |
| `compare_key` | text | comparison matching — **also set on every compared product** |
| `faqs` | (per product-faqs schema) | FAQS accordion |

These are the **same metafield definitions used by the CORE template** — if you already created them for CORE, you only need to populate PRO 2's own metafield **values**, not redefine the metafields.

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `FAST_HEAT-UP.webp`, `PURE_FLAVOUR.webp`, `EASY_TO_USE.webp`, `LONG_BATTERY_LIFE.webp`, `Icons_all-08.png`, `Icons_all-15.png`, `Icons_all-16.png`, `Legacy-PRO2-Product_Page2.webp`, `Legacy_Pro_2_Page_Image.webp`, `Legacy-PRO2-Product_Page.webp`, `Legacy-PRO2_a2bf20ad-e702-41f8-abe1-6456ceab794f.webp`. (Grep the JSON for `shopify://shop_images` to catch all.)
- **Videos → Content → Files:** `airvape_girl_web.webm` (disabled slideshow), `Finalk_no_smoke0.webm` (disabled video-with-text "Simply PRO"), `airvape_pro2_web.webm` (disabled video-with-text-overlay "Pure Bliss with Every Puff"), `legacy2.0_smoky_ss.webm` (disabled video-with-text "From Herb to Wax"), `pro2_inside_web.webm` (**enabled**, plain `video` section). Grep for `shopify://files/videos`.
- **Apps:** **Loox** (the buy-box rating app-block + the dynamic reviews app-block). Re-add both blocks after installing Loox; their app-block IDs will differ on the new store.
- **Collections:** `legacy-accessories`, `airvape-x-accessories`.
- **Products (featured + comparison):** `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.
- **Product media:** upload the Legacy PRO 2 gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections (4):** `slideshow_gpnHad`, `video_with_text_cbmaUp`, `video_with_text_overlay_DTHfhk`, `video_with_text_YjAd6V` — each one has an **enabled image-based sibling** immediately after it that shows the same heading/copy. Keep all 4 disabled and all 4 siblings enabled.
- **Disabled buy-box blocks (2):** `text_QRbAxC` ("estimated to ship in 2-3 weeks"), `description_FETxLT` (stock accordion).
- **Enabled (⚠️ differs from CORE):** `custom_badges_pdp` is **enabled** here (CORE has it disabled) — keep it enabled.
- **No block-level sub-disables** inside the 4 disabled sections (unlike CORE's slideshow, which also individually disables its `subheading` block — here the subheading/text blocks inside the disabled sections carry no separate `disabled` flag, only the parent section is disabled).
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px) — intentional (rating shown above gallery on mobile instead).
- **All 7 `collapsible_content` accordions start CLOSED** (`collapse_open: false`).
- **`media_fit_height: true`** on `main` — differs from CORE (`false`); keep as-is.
Keep all of the above exactly.

## 9. Report back
- Confirm the `pro-2-_po` template is assigned; JSON valid; all `disabled` flags + closed accordions preserved (especially the 4 disabled video/slideshow sections and their enabled image siblings).
- Confirm `main-product.css` loads (same shared file as CORE) and the two `icon_text_block` layouts render (inline trust row + 2-col USP grid), and the buy-box Loox rating hides on mobile.
- Confirm the **sticky vertical media gallery** + lightbox zoom work, `media_fit_height: true` behavior (crop-to-fill) renders correctly, and the **centered sticky add-to-cart** slides in on scroll.
- Confirm custom sections/blocks ported: `product-meta-shorts`, `ai_gen_block_657f32b` (Auto = no crop, 3/3/2 slides), `pdp-aplus-comparison`, `product-faqs`, both `featured-collection`s, and the stock `rich-text` / `video-with-text` / `image-with-text` / `video-with-text-overlay` / `video` section types.
- Confirm all `custom.*` metafields exist (else hook, accordions, shorts, user-guide, comparison, FAQs are empty), Loox installed + both blocks re-added, and media/collections/products created.
- Flag any block/section/setting from the JSON below that doesn't exist in the 4.2 theme rather than inventing a substitute.

---

## FULL `templates/product.pro-2-_po.json` — copy verbatim

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
        "custom_liquid_wWw7VR": {
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
            "heading": "Specifications",
            "content": "{{ product.metafields.custom.specifications | metafield_tag }}"
          }
        },
        "collapsible_content_LncXge": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "What's in the box?",
            "content": "{{ product.metafields.custom.what_s_in_the_box | metafield_tag }}"
          }
        },
        "collapsible_content_f4yahV": {
          "type": "collapsible_content",
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
        "custom_liquid_wWw7VR",
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
      "disabled": true,
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
    "image_with_text_overlay_CbfRb6": {
      "type": "image-with-text-overlay",
      "blocks": {
        "heading_ipcGbR": {
          "type": "heading",
          "settings": {
            "heading": "Just you, your vibe, and the Legacy PRO 2",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        }
      },
      "block_order": [
        "heading_ipcGbR"
      ],
      "name": "t:sections.image-with-text-overlay.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "image": "shopify://shop_images/Legacy-PRO2-Product_Page2.webp",
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
    "rich_text_THk6gf": {
      "type": "rich-text",
      "blocks": {
        "heading_n4etEe": {
          "type": "heading",
          "settings": {
            "heading": "Major UpGrades",
            "heading_size": "h6",
            "heading_html_tag": "h6"
          }
        },
        "heading_NtwPVX": {
          "type": "heading",
          "settings": {
            "heading": "The Legacy PRO 2 is packed with all the features you asked for - and we listened.",
            "heading_size": "h3",
            "heading_html_tag": "h2"
          }
        },
        "custom_liquid_zBcmXg": {
          "type": "custom_liquid",
          "settings": {
            "custom_liquid": "<p class=\"pb-2\"></p>"
          }
        },
        "text_4ybmnE": {
          "type": "text",
          "settings": {
            "text": "<ul><li>Easier cleaning featuring <strong>ONEPATH</strong>- the Pro 2’s unique air path from chamber to mouthpiece that can be cleaned all the way with one long brush included in the kit.</li><li>⁠Black cork with gold flakes gives not only upgraded aesthetics but a premium feel and better heat insulation</li><li>⁠New color display for more detailed session info</li></ul><p>The Legacy PRO 2 comes in an elegant <strong>new dark grey finish.</strong></p><p>Under the hood, Legacy PRO 2 maintains its signature <strong>hybrid convection/conduction heating system</strong>, <strong>rapid heat-up</strong>, <strong>precision temperature control</strong>, and <strong>removable battery</strong> with <strong>wireless charging support</strong>—all wrapped in a form that’s both portable and environmentally conscious.</p><p>Whether you're a connoisseur or a newcomer, the <strong>Legacy PRO 2</strong> redefines what a luxury vaporizer can be—powerful, practical, and absolutely unforgettable.</p>"
          }
        }
      },
      "block_order": [
        "heading_n4etEe",
        "heading_NtwPVX",
        "custom_liquid_zBcmXg",
        "text_4ybmnE"
      ],
      "name": "t:sections.rich-text.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": false,
        "content_alignment": "mx-auto",
        "text_alignment": "text-left",
        "content_width": "full-width",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
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
      "disabled": true,
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
    "image_with_text_zrXTcP": {
      "type": "image-with-text",
      "blocks": {
        "heading_QMict3": {
          "type": "heading",
          "settings": {
            "heading": "Simply PRO",
            "heading_size": "h3",
            "heading_html_tag": "h2"
          }
        },
        "text_QPdntg": {
          "type": "text",
          "settings": {
            "text": "<p>Packing is effortless, and heat-up happens in seconds — but the PRO 2 doesn’t stop there. Engineered for maximum performance, its refined design and high-grade materials make it the clear choice for those who demand power and precision in every session.</p>"
          }
        }
      },
      "block_order": [
        "heading_QMict3",
        "text_QPdntg"
      ],
      "name": "t:sections.image-with-text.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": false,
        "image": "shopify://shop_images/Legacy_Pro_2_Page_Image.webp",
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
      "disabled": true,
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
    "image_with_text_overlay_ipUg8e": {
      "type": "image-with-text-overlay",
      "blocks": {
        "subheading_GKb3a6": {
          "type": "subheading",
          "settings": {
            "text": "Simply PRO"
          }
        },
        "heading_UriirK": {
          "type": "heading",
          "settings": {
            "heading": "Pure Bliss with Every Puff",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_DRbFwF": {
          "type": "text",
          "settings": {
            "text": "<p>The Legacy PRO 2’s advanced technology ensures top-notch performance, making every moment shared with friends more enjoyable and satisfying.</p>"
          }
        }
      },
      "block_order": [
        "subheading_GKb3a6",
        "heading_UriirK",
        "text_DRbFwF"
      ],
      "name": "t:sections.image-with-text-overlay.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "image": "shopify://shop_images/Legacy-PRO2-Product_Page.webp",
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
    "video_with_text_YjAd6V": {
      "type": "video-with-text",
      "blocks": {
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
        "heading_xMFJy3",
        "heading_Emcc3n",
        "text_rh7yMX"
      ],
      "disabled": true,
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
    "image_with_text_94HDtX": {
      "type": "image-with-text",
      "blocks": {
        "heading_Eck4gh": {
          "type": "heading",
          "settings": {
            "heading": "From Herb to Wax",
            "heading_size": "h3",
            "heading_html_tag": "h2"
          }
        },
        "heading_Mf9weX": {
          "type": "heading",
          "settings": {
            "heading": "From Beginner to PRO",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_wTMDeB": {
          "type": "text",
          "settings": {
            "text": "<p>The only vape you'll ever need</p>"
          }
        }
      },
      "block_order": [
        "heading_Eck4gh",
        "heading_Mf9weX",
        "text_wTMDeB"
      ],
      "name": "t:sections.image-with-text.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": false,
        "image": "shopify://shop_images/Legacy-PRO2_a2bf20ad-e702-41f8-abe1-6456ceab794f.webp",
        "image_size": "",
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
    "pdp_aplus_comparison_kkT36X": {
      "type": "pdp-aplus-comparison",
      "name": "Aplus comparison",
      "settings": {
        "subheading": "",
        "heading": "CHOOSE WHAT SUITS YOU BEST",
        "heading_size": "h2",
        "content": "",
        "text_alignment": "text-center"
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
          "enso",
          "legacy-core",
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
    "product_faqs_3dLD86": {
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
    "image_with_text_overlay_CbfRb6",
    "text_with_icons_tqLMpf",
    "rich_text_THk6gf",
    "video_with_text_cbmaUp",
    "image_with_text_zrXTcP",
    "video_with_text_overlay_DTHfhk",
    "image_with_text_overlay_ipUg8e",
    "video_with_text_YjAd6V",
    "image_with_text_94HDtX",
    "video_nrLrNt",
    "custom_section_ggzpUX",
    "featured_collection_WqWJcP",
    "pdp_aplus_comparison_kkT36X",
    "featured_collection_CHmD3T",
    "product_faqs_3dLD86"
  ]
}
```
