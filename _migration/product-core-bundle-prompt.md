# Migration Prompt — Product Template: Legacy CORE BUNDLE (`product.core-bundle.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-core** prompt (this is a variant of it — read that one too for the shared custom snippets/CSS), the **sticky-add-to-cart** prompt, and the **image-slider (ai_gen_block_657f32b)** notes. Assign this template (suffix **`core-bundle`**) to whichever Legacy CORE bundle/kit product uses it in Admin.
> This is a **leaner 11-section variant** of the CORE template: no A+ spec-comparison, no `image-with-text-overlay` fallback slides, and the slideshow + video-overlay sections are **live** here (not disabled). Copy the JSON verbatim, port the custom snippets/sections + CSS, create the metafields, and re-upload media.

---

Recreate my **Legacy CORE BUNDLE product** page (`templates/product.core-bundle.json`) so it looks and behaves identically. It's a customized `main-product` PDP (original-size media, badges + a "How to use?"/"Accessories" accordion pair turned off) followed by a YouTube shorts carousel, Loox reviews, a **live** skins slideshow, feature icons, a **live** video-with-text-overlay, a split video section, a user-guide image slider, two featured-collection carousels, and FAQs.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.core-bundle.json` — preserve section order, every `"disabled": true`, all block settings, and the header comment.
2. Port the custom section/snippet files and `assets/main-product.css` (embedded in §5) — same shared files as the product-core prompt. For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — many blocks/sections are **empty without them**.
4. Re-upload **images/videos** (§7) and assign the **`core-bundle`** template to the correct product.
5. Keep valid JSON; run a validity check and report.
6. **Flag but do not silently "fix":** the last `featured-collection` section's heading reads **"COMPLETE YOUR MEMORIAL DAY COLLECTION"** — a seasonal heading that looks stale/copy-pasted from an old promo. Copy it verbatim as instructed by rule 1, but call it out in your report so the merchant can update the copy.

## 1. Page structure — section order (11) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `custom_section_fYczAN` | custom-section ⚑ | on | "FOLLOW US ON YOUTUBE" → **product-meta-shorts** video carousel |
| 3 | `1759505359de5a7814` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews |
| 4 | `slideshow_gpnHad` | slideshow | **on (not disabled)** | "Change the Skin, keep the CORE" video slide — **actually renders here** |
| 5 | `text_with_icons_tqLMpf` | text-with-icons | on | 4 feature columns (Hybrid Heating, etc.) |
| 6 | `video_with_text_overlay_DTHfhk` | video-with-text-overlay | **on (not disabled)** | "Power you can feel, style you can own." video — **actually renders here** |
| 7 | `video_with_text_YjAd6V` | video-with-text | on | "Trusted Legacy. Custom core." split video |
| 8 | `featured_collection_gVmzNA` | featured-collection ⚑ | on | "LEGACY CORE ACCESSORIES" carousel |
| 9 | `custom_section_AeYVGV` | custom-section ⚑ | on | "USER GUIDE" → **ai_gen_block_657f32b** image slider |
| 10 | `featured_collection_dez6gW` | featured-collection ⚑ | on | "COMPLETE YOUR MEMORIAL DAY COLLECTION" carousel (bundle/kit products) ⚠ see rule 6 |
| 11 | `product_faqs_D7FqrC` | product-faqs ⚑ | on | "FAQS" accordion |

**Compared to the sibling `product.core.json` template, this bundle variant is structurally lighter:**
- **No `image-with-text-overlay` sections at all** — in the CORE template those two sections exist specifically as the *visible fallback* for the disabled slideshow/video-overlay. Here there's no fallback because the slideshow and video-overlay are **not disabled** — they render directly.
- **No `pdp-aplus-comparison` section** (the "CHOOSE WHAT SUITS YOU BEST" spec table) — this template has no product-comparison content at all.
- 14 sections → 11 sections.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different (shared with product-core)
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5, identical shared stylesheet — not template-specific). It loads `main-product.css` via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `sections/custom-section.liquid` (generic wrapper: heading + link + hosts blocks). Schema confirmed identical to the product-core prompt: settings are `full_width`, `remove_horizontal_space`, `remove_vertical_space`, `content_width` (small/normal/large/extra-large/full-width), `subheading`, `heading`, `heading_size`, `text_alignment`, `link_text` (html), `link_url`, `new_tab`, `heading_html_tag`, `background_color`, `text_color`, `heading_color`; blocks accept `@app` and `@theme`. No hardcoded content — everything comes from block settings/metafields.
- `blocks/product-meta-shorts.liquid` (YouTube/short-video carousel from a product metafield). Confirmed: the only hardcoded URLs inside this block are third-party embed endpoints (`i.ytimg.com` thumbnail images, `player.vimeo.com`, `www.youtube.com/embed`) — these are generic embed infrastructure, **not per-product CDN assets**, so nothing to re-upload here.
- `blocks/ai_gen_block_657f32b.liquid` (image slider; self-contained scoped CSS/JS; **Auto aspect-ratio = natural size, no crop** — see the image-slider fix notes). No hardcoded URLs found in this block.
- `sections/product-faqs.liquid` (FAQ accordion from a product metafield).
- `sections/featured-collection.liquid` (shared customized featured collection).
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**, same as product-core).
- Buy-box block snippets (mostly stock, rendered by `product-info.liquid`): `custom_badges`, `title`, `price`, `text`, `rich_text_block`, `custom_liquid`, `variant_picker`(+radio/`radio-image`), `payment_installments`, `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.
- **Grep confirmed no hardcoded `cdn.shopify.com` or bare `https://` image/video URLs anywhere in `templates/product.core-bundle.json` itself** — all media references use the portable `shopify://shop_images/…` and `shopify://files/videos/…` protocol, so §7 below is the complete media dependency list.

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC) — **differs from product-core**
```
show_breadcrumbs: false
desktop_media_width: 50          → media column is 50% of page width on desktop (core template used 56%)
media_size: ""                   → "Original media size" — natural aspect, NOT cropped to square (core template used "1" = Square 1:1)
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: false
media_enable_video_looping: true
media_fit_height: false
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** identical mechanism to product-core — `<scroll-carousel vertical>` thumbnail rail + `<media-carousel>` main stage, sticky media column, `<media-lightbox>` zoom. The only difference here is the media isn't force-cropped to square, so images/videos of varying aspect ratios display at their natural size. Don't rewrite these — they're stock; just keep the settings above.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom when the main Add-to-Cart scrolls out of view, centered. Full spec in the **sticky-add-to-cart** prompt.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden — **differs from product-core**
Rendered by `product-info.liquid` in this `block_order`. **Bold = custom/metafield-driven. ⛔ = disabled (hidden).**
1. **`custom_badges` — enabled here** (⚠ in product-core this block was `disabled: true`; here it is NOT disabled and will render whatever product-badge system the theme uses — has no configurable settings itself, `limit: 1`, purely presentational based on product tags/metafields per the theme's badge logic).
2. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent (→ inherits default). Shows the product name.
3. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`, opens floating widget on click, shows empty-rating widget. **⚠️ Hidden on mobile inside the buy box** by `main-product.css` (`.section-main-product .product-info-inner .loox-rating { display:none }` ≤767px) — on mobile the rating shows in the `product-title-reviews` block above the gallery instead.
4. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
5. **`text` "Due to high demand…" ⛔ disabled** (hidden).
6. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product **hook/tagline** (heading size `text-h6 md:text-h5`, left). Empty if `custom.hook_text` missing.
7. **`text`** "For European Orders click **HERE**" → links to `https://airvape.eu/product/legacy-core` (new tab). **Shown.** (⚠ note: URL still points at the `/legacy-core` product path — verify this is the intended EU link for whichever bundle product gets this template, or update it.)
8. **`text` "Legacy PRO 2 estimated to ship…" ⛔ disabled** (hidden).
9. **`custom_liquid`** (block id `custom_liquid_NdqTjV` — cosmetic ID difference from product-core's `custom_liquid_AaYLDe`, identical content) — inline `<style>.promo-text-block{background:#ececec;border-radius:12px;border:1px solid #E1E1E1}</style>` + a grey rounded pill: "**NY Times Wirecutter** nominated AirVape for best portable vaporizers". **Shown.**
10. `variant_picker` — `type: radio`, `color_picker_type: radio-image` (color swatches as images), `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
11. `payment_installments` — Shop Pay installments messaging.
12. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (**no Buy-it-now/express buttons**), `show_gift_card_recipient: false`, button colors default.
13. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5` → "Receive by …" business-day estimate.
14. **`icon_text_block` (`icon-text-pdp`, inline)** — 5 trust icons in one row (80px): `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`.
15. **`description` ⛔ disabled** (the stock description accordion is hidden; the metafield ones below replace it).
16–22. **`collapsible_content` ×7 — accordions, ALL closed by default (`collapse_open: false`; click to expand). Two are disabled here that were enabled in product-core:**
    - "Description" → `custom.description`
    - **"Key Features"** → `custom.specifications` — ⚠ heading text changed from "Specifications" (product-core) to **"Key Features"**, but it still pulls from the *same* `custom.specifications` metafield. Copy the heading text exactly as-is.
    - "What's in the box?" → `custom.what_s_in_the_box`
    - **"How to use?" ⛔ disabled here** → `custom.how_to_use` (enabled in product-core; hidden in this bundle variant)
    - **"Accessories" ⛔ disabled here** → `custom.parts_accessories` (enabled in product-core; hidden in this bundle variant)
    - "Warranty and Support" → `custom.lifetime_waranty`
    - "Why Choose AirVape?" → **hardcoded HTML** (long copy, in the JSON — no metafield).
    Each metafield accordion is **empty if its metafield is missing**.
23. **`icon_text_block` (`homepage-usps-info`, vertical)** — 5 USP items (FAST HEAT-UP / PURE FLAVOUR / EASY TO USE / EASY TO USE / LASTS LONGER) at 30px; `main-product.css` lays them out as a **2-column wrapped row** with grey circular icon backgrounds and greyscale-filtered icons.
24. `share_button` — native share.

## 4. Content sections below the PDP — behaviors & differences from product-core
- **`custom-section` "FOLLOW US ON YOUTUBE"** → `product-meta-shorts` block: horizontal **video carousel** from metafield `custom.product_short_videos`. Settings: `muted: true`, red play button (**68px** — ⚠ larger than product-core's 48px, `#ff0000`), radius 12, **4/3/2** slides desktop/medium/mobile, gap 20, arrows + dots (black arrows 40px, dots 8px). Heading is a YouTube SVG + "@AirvapeusaOfficial" linking to the channel.
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — Loox review carousel, limit 4, not aggregated.
- **slideshow — LIVE (not disabled)** — "Change the Skin, keep the CORE" video slide (`core_web_skins.webm`), button "SHOP Skins" → `legacy-skin-shop` collection. Has `custom_css` min-height 500px on mobile. **This is a functional difference from product-core, where the identical section exists but is disabled** — here it actually shows to shoppers as section #4.
- **text-with-icons** — 4 `column` blocks (Hybrid Heating / Industry Leading / Easy to Clean / Swappable) each with a `custom_icon` PNG + fallback icon, circle background, 64px, 1-col mobile, centered. *(Section file carries a scoped `.breathelet-text-icons` image filter that only applies when `custom_class` is `breathelet-text-icons` — not used here (`custom_class` is empty), but port the section as-is.)*
- **video-with-text-overlay — LIVE (not disabled)** — "Power you can feel, style you can own." (`core_web_main_20s.webm`), `custom_class: video-text-overlay-section`, `enable_transparent_header: true`, overlay 20% solid. Its `subheading` sub-block ("Meet the CORE") **is** disabled/hidden even though the section itself is live. **This is a functional difference from product-core**, where the same section+subheading exist but the whole section is disabled — here it renders as section #6.
- **video-with-text** "Trusted Legacy. / Custom core." — split layout, autoplay+loop `CORE_color_splash_your_style.webm`, image right 50%, centered text. `custom_class: video-with-text-section`. Identical to product-core.
- **featured-collection "LEGACY CORE ACCESSORIES"** — carousel, 4 products, from collection `legacy-accessories`, "View all" → `airvape-x-accessories`. Identical to product-core.
- **custom-section "USER GUIDE"** → `ai_gen_block_657f32b` **image slider** from metafield `custom.user_guide`; `aspect_ratio: "auto"` (natural size, **no cropping** — this is the fixed behavior), **4/4/2** slides, gap 16, radius 6, arrows + dots, no autoplay, no infinite loop. Identical to product-core.
- **featured-collection "COMPLETE YOUR MEMORIAL DAY COLLECTION"** — carousel, 9 products, manual product list (no collection), **all bundle/kit-style handles**: `om-essentials-bundle`, `breathelet-power-pack`, `airvape-x-waterflow-kit`, `enso-adventure-kit`, `xperience-kit`, `festival-pack`, `legacy-pro-2-stealth-carry-kit`, `enso-travel-ritual-kit`, `x-royal-edition-premium-carry-kit`. ⚠ **See rule 6** — the "MEMORIAL DAY" heading is seasonal copy that doesn't match the general bundle/kit product mix; flag for the merchant rather than editing. ⚠ **Also verify each handle still exists** — this repo's git history shows the "Breathelet" product line was recently removed from the site (see commit "Breathelet removed from the website"), so `breathelet-power-pack` may be a stale reference; confirm before/after migrating.
- **product-faqs "FAQS"** — accordion from `custom.faqs`. Empty without the metafield. Identical to product-core.

**No `pdp-aplus-comparison` section in this template** — do not port the spec-comparison metafields (`comparison_features`, `comparison_products`, `compare_key`) for this template; they belong only to `product.core.json`.

## 5. `assets/main-product.css` — the custom PDP CSS (shared file, copy verbatim — same as product-core)
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
> This is the only PDP-specific stylesheet, shared across every `main-product` template (including `product.core.json`). It styles the two `icon_text_block` layouts (`icon-text-pdp` inline trust-row + `homepage-usps-info` 2-col USP grid with greyscale icons), the qty pill (`.qty-wrap`), the delivery-date weight, the comparison-card Loox rating (unused by this template since it has no comparison section — harmless dead rule), the payment list, the restock-notify button, and **hides the buy-box Loox rating on mobile**.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — all namespace `custom`
Without these, the matching block/section is **empty**:
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `description` | rich text | "Description" accordion |
| `specifications` | rich text | "Key Features" accordion (heading renamed, same metafield key) |
| `what_s_in_the_box` | rich text | "What's in the box?" accordion |
| `how_to_use` | rich text | "How to use?" accordion — **block is disabled in this template**, metafield not strictly required unless re-enabled |
| `parts_accessories` | rich text | "Accessories" accordion — **block is disabled in this template**, metafield not strictly required unless re-enabled |
| `lifetime_waranty` | rich text | "Warranty and Support" accordion |
| `product_short_videos` | list / rich text | product-meta-shorts carousel |
| `user_guide` | list of images (or the block's expected source) | ai_gen_block_657f32b slider |
| `faqs` | (per product-faqs schema) | FAQS accordion |

**Not needed for this template** (only relevant to `product.core.json`): `comparison_features`, `comparison_products`, `compare_key` — this template has no `pdp-aplus-comparison` section.

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `FAST_HEAT-UP.webp`, `PURE_FLAVOUR.webp`, `EASY_TO_USE.webp`, `LONG_BATTERY_LIFE.webp`, `Icons_all-08.png`, `Icons_all-15.png`, `Icons_all-16.png`, `Icons_all-28_3e4ec976-….png`. (Grep the JSON for `shopify://shop_images` to catch all — confirmed no hardcoded raw CDN URLs.) Note: unlike `product.core.json`, this template has **no** `Legacy-Core-Product_page2.webp` / `Legacy-Core.webp` references (those belonged to the image-with-text-overlay sections, which don't exist here).
- **Videos → Content → Files:** `core_web_skins.webm` (**live** slideshow, not disabled here), `core_web_main_20s.webm` (**live** video overlay, not disabled here), `CORE_color_splash_your_style.webm` (video-with-text). Grep for `shopify://files/videos`.
- **Apps:** **Loox** (the buy-box rating app-block + the dynamic reviews app-block). Re-add both blocks after installing Loox; their app-block IDs will differ on the new store.
- **Collections:** `legacy-skin-shop` (slideshow button target), `legacy-accessories`, `airvape-x-accessories`.
- **Products (featured, manual lists):**
  - `featured_collection_gVmzNA` fallback pool: `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.
  - `featured_collection_dez6gW` manual list: `om-essentials-bundle`, `breathelet-power-pack`, `airvape-x-waterflow-kit`, `enso-adventure-kit`, `xperience-kit`, `festival-pack`, `legacy-pro-2-stealth-carry-kit`, `enso-travel-ritual-kit`, `x-royal-edition-premium-carry-kit`. ⚠ Verify all 9 exist on the new store — several are named after seasonal/bundle campaigns and the Breathelet line was recently pulled from the site per this repo's git log.
- **Product media:** upload the relevant Legacy CORE bundle gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled buy-box blocks:** `text_rDgqe7` ("high demand"), `text_QRbAxC` ("PRO 2 ship"), `description` (stock accordion), `collapsible_content_Kmp6mk` ("How to use?"), `collapsible_content_LNMWdr` ("Accessories").
- **Disabled sub-blocks:** `subheading_WHiEEy` ("Meet the CORE", inside the *enabled* video-with-text-overlay section — the section shows, the subheading line does not).
- **Nothing disabled at the section level** — all 11 sections in `order` render. (This is the key structural difference from `product.core.json`, where the slideshow and video-overlay sections are section-level disabled.)
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px) — intentional (rating shown above gallery on mobile instead).
- **5 of 7** `collapsible_content` accordions are enabled and start CLOSED (`collapse_open: false`); 2 (`How to use?`, `Accessories`) are disabled entirely.
Keep all of the above exactly.

## 9. Report back
- Confirm the `core-bundle` template is assigned; JSON valid; all `disabled` flags preserved (both block-level; note there are **no section-level disables** in this template).
- Confirm `main-product.css` loads and the two `icon_text_block` layouts render (inline trust row + 2-col USP grid), and the buy-box Loox rating hides on mobile.
- Confirm the **sticky vertical media gallery** (natural aspect, not square-cropped) + lightbox zoom work, and the **centered sticky add-to-cart** slides in on scroll.
- Confirm custom sections/blocks ported: `product-meta-shorts` (68px play button), `ai_gen_block_657f32b` (Auto = no crop), both `featured-collection`s, `product-faqs`.
- Confirm the **slideshow** and **video-with-text-overlay** sections actually render (they are live here, unlike in `product.core.json`) and that `custom_badges` shows on this template.
- Confirm all `custom.*` metafields exist (hook, description, specifications, what's-in-box, warranty, shorts, user-guide, FAQs — `how_to_use`/`parts_accessories` optional since disabled), Loox installed + both blocks re-added, and media/collections/products created.
- **Flag back to the merchant** (don't silently change): the "COMPLETE YOUR MEMORIAL DAY COLLECTION" heading and the `breathelet-power-pack` handle in §7/§4 — both look like they may be stale/seasonal leftovers.

---

## FULL `templates/product.core-bundle.json` — copy verbatim

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
        "custom_badges_qTDpM3": {
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
        "loox_reviews_loox_rating_Er7tQW": {
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
        "text_rDgqe7": {
          "type": "text",
          "disabled": true,
          "settings": {
            "content": "<p>Due to high demand, shipping times may be longer than usual.</p>"
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
            "content": "<p><a href=\"https://airvape.eu/product/legacy-core\" target=\"_blank\" title=\"https://airvape.eu/product/legacy-core\">For European Orders click HERE</a></p>"
          }
        },
        "text_QRbAxC": {
          "type": "text",
          "disabled": true,
          "settings": {
            "content": "<p>The Legacy PRO 2 is estimated to ship in 2-3 weeks</p>"
          }
        },
        "custom_liquid_NdqTjV": {
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
        "4923f5c8-62d3-42db-a835-6e0613c4a182": {
          "type": "payment_installments",
          "settings": {}
        },
        "qty_btn_selector_impL7A": {
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
        "delivery_b87E8F": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_PrMKB7": {
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
        "collapsible_content_87nC68": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Key Features",
            "content": "{{ product.metafields.custom.specifications | metafield_tag }}"
          }
        },
        "collapsible_content_n4CTxt": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "What's in the box?",
            "content": "{{ product.metafields.custom.what_s_in_the_box | metafield_tag }}"
          }
        },
        "collapsible_content_Kmp6mk": {
          "type": "collapsible_content",
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "How to use?",
            "content": "{{ product.metafields.custom.how_to_use | metafield_tag }}"
          }
        },
        "collapsible_content_LNMWdr": {
          "type": "collapsible_content",
          "disabled": true,
          "settings": {
            "collapse_open": false,
            "heading": "Accessories",
            "content": "{{ product.metafields.custom.parts_accessories | metafield_tag }}"
          }
        },
        "collapsible_content_p8ca6A": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Warranty and Support",
            "content": "{{ product.metafields.custom.lifetime_waranty | metafield_tag }}"
          }
        },
        "collapsible_content_JkHcG7": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "icon_text_block_MFfP4b": {
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
        "custom_badges_qTDpM3",
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_Er7tQW",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "text_rDgqe7",
        "rich_text_block_xyg6GB",
        "text_jaUh6c",
        "text_QRbAxC",
        "custom_liquid_NdqTjV",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "qty_btn_selector_impL7A",
        "delivery_b87E8F",
        "icon_text_block_PrMKB7",
        "description_FETxLT",
        "collapsible_content_7eB3pL",
        "collapsible_content_87nC68",
        "collapsible_content_n4CTxt",
        "collapsible_content_Kmp6mk",
        "collapsible_content_LNMWdr",
        "collapsible_content_p8ca6A",
        "collapsible_content_JkHcG7",
        "icon_text_block_MFfP4b",
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
        "media_fit_height": false,
        "show_sticky_add_to_cart": true,
        "sticky_add_to_cart_position": "center",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "",
        "heading_color": ""
      }
    },
    "custom_section_fYczAN": {
      "type": "custom-section",
      "blocks": {
        "product_meta_shorts_RGPzjc": {
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
        "product_meta_shorts_RGPzjc"
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
        "loox_reviews_loox_dynamic_section_nriAUx": {
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
        "loox_reviews_loox_dynamic_section_nriAUx"
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
            "video": "shopify://files/videos/core_web_skins.webm",
            "content_width_maximum": 640,
            "desktop_content_position": "middle-center",
            "mobile_content_position": "middle-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "Change the Skin, keep the CORE",
            "heading_size": "h2",
            "text": "Swap the front and back skins to match your style — choose from different colors, textures, or even custom designs. One device, endless looks.",
            "hide_text_on_mobile": false,
            "button_size": "text-sm md:text-base",
            "custom_liquid": "",
            "button_link": "shopify://collections/legacy-skin-shop",
            "button_text": "SHOP Skins",
            "button_style": "",
            "button_background_color": "#ffffff",
            "button_text_color": "#000000",
            "button2_link": "",
            "button2_text": "",
            "button2_style": "",
            "button2_background_color": "rgba(0,0,0,0)",
            "button2_text_color": "rgba(0,0,0,0)",
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
        "height": 700,
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
            "heading": "Hybrid Heating",
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
        },
        "column_YqjECN": {
          "type": "column",
          "settings": {
            "custom_icon": "shopify://shop_images/Icons_all-28_3e4ec976-06d0-46d3-8dcf-be31c7c864c1.png",
            "icon": "return",
            "heading": "Swappable",
            "content": "<p>Custom skins</p>"
          }
        }
      },
      "block_order": [
        "column_chrnQL",
        "column_6TWpYm",
        "column_wXBeVL",
        "column_YqjECN"
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
    "video_with_text_overlay_DTHfhk": {
      "type": "video-with-text-overlay",
      "blocks": {
        "subheading_WHiEEy": {
          "type": "subheading",
          "disabled": true,
          "settings": {
            "text": "Meet the CORE"
          }
        },
        "heading_74fQ4A": {
          "type": "heading",
          "settings": {
            "heading": "Power you can feel, style you can own.",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_46VhEg": {
          "type": "text",
          "settings": {
            "text": "<p><strong>The Legacy CORE</strong>’s advanced technology ensures top-notch performance, making every moment shared with friends more enjoyable and satisfying.</p><p><strong>Swap skins in seconds</strong>, match your mood, and make it unmistakably yours — without compromising power, flavor, or control.</p>"
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
        "video": "shopify://files/videos/core_web_main_20s.webm",
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
            "heading": "Trusted Legacy.",
            "heading_size": "h3",
            "heading_html_tag": "p"
          }
        },
        "heading_Emcc3n": {
          "type": "heading",
          "settings": {
            "heading": "Custom core.",
            "heading_size": "h2",
            "heading_html_tag": "p"
          }
        },
        "text_rh7yMX": {
          "type": "text",
          "settings": {
            "text": "<p>The CORE gives you the same high-performance heating as the PRO2, and 3 vibrant new colors.</p>"
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
        "video": "shopify://files/videos/CORE_color_splash_your_style.webm",
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
    "featured_collection_gVmzNA": {
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
        "heading": "LEGACY CORE ACCESSORIES",
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
    "custom_section_AeYVGV": {
      "type": "custom-section",
      "blocks": {
        "ai_gen_block_657f32b_PBi6hG": {
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
            "slides_desktop": 4,
            "slides_tablet": 4,
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
        "ai_gen_block_657f32b_PBi6hG"
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
    "featured_collection_dez6gW": {
      "type": "featured-collection",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "products": [
          "om-essentials-bundle",
          "breathelet-power-pack",
          "airvape-x-waterflow-kit",
          "enso-adventure-kit",
          "xperience-kit",
          "festival-pack",
          "legacy-pro-2-stealth-carry-kit",
          "enso-travel-ritual-kit",
          "x-royal-edition-premium-carry-kit"
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
    "product_faqs_D7FqrC": {
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
    "custom_section_fYczAN",
    "1759505359de5a7814",
    "slideshow_gpnHad",
    "text_with_icons_tqLMpf",
    "video_with_text_overlay_DTHfhk",
    "video_with_text_YjAd6V",
    "featured_collection_gVmzNA",
    "custom_section_AeYVGV",
    "featured_collection_dez6gW",
    "product_faqs_D7FqrC"
  ]
}
```
