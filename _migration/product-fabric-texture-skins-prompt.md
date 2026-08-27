# Migration Prompt — Product Template: Fabric Texture Skins (`product.fabric-texture-skins.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt, the **sticky-add-to-cart** prompt. Assign this template (suffix **`fabric-texture-skins`**) to the Fabric Texture Skins product in Admin.
> This documents **every section, every block, every behavior** (what shows, the two `apps` sections, the standalone image-uploader section with no consent gate), embeds the **custom PDP CSS** verbatim, and includes the **full `product.fabric-texture-skins.json`** at the bottom.

---

Recreate my **Fabric Texture Skins product** page (`templates/product.fabric-texture-skins.json`) so it looks and behaves identically. It's a customized `main-product` PDP (no A+ comparison, no image slider, no custom-section blocks, no consent-checkbox gate) followed by **two separate `apps` sections** (Loox dynamic reviews, then a standalone Mighty Image Uploader block), an "about the material" image-with-text, related products, a manual featured-collection carousel, and FAQs. Copy the JSON verbatim, port the custom snippets/sections + CSS, create the metafields, install/re-add the apps, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.fabric-texture-skins.json` — preserve section order, all block settings, the two `apps` sections, and the header comment. Note: **nothing in this template is `"disabled": true`** — every section and block listed is live.
2. Port the custom section/snippet files and `assets/main-product.css` (embedded in §5). For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafield** (§6) — the FAQ section and the buy-box hook text are **empty without it**.
4. Install/re-add the **apps** (§7) — Loox and **Mighty Image Uploader**.
5. Re-upload **images** (§7) and assign the **`fabric-texture-skins`** template to the Fabric Texture Skins product.
6. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (7) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `17751117233800687b` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews, limit **10** |
| 3 | `17652927324f1226fc` | **apps (Mighty Image Uploader)** | on | standalone image-upload widget section — **no heading, no consent gate** — §4 |
| 4 | `image_with_text_njxmwc` | image-with-text | on | "Pure Texture. No Print." narrow content-width section |
| 5 | `related_products_jHyK3H` | related-products | on | "YOU MAY ALSO LIKE" — Shopify-native related products carousel |
| 6 | `featured_collection_Urpzxj` | featured-collection ⚑ | on | "OUR SIGNATURE MODELS" — manual product-list carousel |
| 7 | `product_faqs_nVVynp` | product-faqs ⚑ | on | "FAQS" accordion |

**No sections and no blocks are disabled in this template** — everything here is live. This template deliberately has **no** `custom-section`, `pdp-aplus-comparison`, `slideshow`, `video-with-text`, `text-with-icons`, or image-slider sections, and **no** `customskin_checkboxes`/`separator` consent-gate blocks in the buy box.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5, identical file used across all PDP templates) — loads via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `sections/apps.liquid` — the **generic stock "apps" section** (loops `section.blocks`, renders each via `{% when '@app' %} {% render block %}`, only prints the heading row if `section.settings.heading != blank`). This template uses it **twice**: once for the Loox dynamic-reviews block (with a heading), once for the Mighty Image Uploader block (with **no heading** — the section prints no heading markup at all since `heading: ""`). This is stock — no customization needed, just confirm it exists in 4.2.
- `sections/product-faqs.liquid` ⚑ (FAQ accordion from `product.metafields.custom.faqs.value`).
- `sections/featured-collection.liquid` (shared customized featured collection).
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**).
- Buy-box block snippets (all stock, rendered by `product-info.liquid`): `title`, `price`, `rich_text_block`, `payment_installments`, `variant_picker`(+radio/`radio-image`), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.
- **No** `customskin-checkbox.liquid` consent-gate snippet is used here (unlike `product.mycustom-skin-studio.json`) — do **not** port/wire the copyright-consent script for this template.

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          → media column is 50% of page width on desktop
media_size: ""                   → adaptive media aspect (not fixed)
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: true            → media videos in the gallery autoplay
media_enable_video_looping: true
media_fit_height: true           → media column stretches to fill the row height
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** `carousel_vertical` renders a `<scroll-carousel vertical>` thumbnail rail + sticky `<media-carousel>` main stage, wrapped in `<media-lightbox>` for zoom. Mobile is a swipeable carousel with thumbnail indicator; product title+reviews render above the gallery on mobile. Don't rewrite — stock behavior, just apply the settings above.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom, centered, when the main Add-to-Cart scrolls out of view. Full spec in the **sticky-add-to-cart** prompt. Unlike `product.mycustom-skin-studio.json`, there is **no consent gate** disabling these buttons here — they behave as plain stock Add-to-Cart / no dynamic checkout buttons.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order`. **Bold = metafield-driven.** Nothing here is disabled.
1. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent (→ inherits default). Shows the product name.
2. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`, opens floating widget on click, shows empty-rating widget. Same CSS-hidden-on-mobile rule applies (`main-product.css`, §5).
3. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
4. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product **hook/tagline** (heading size `text-h6 md:text-h5`, left). Empty if `custom.hook_text` missing.
5. `payment_installments` — Shop Pay installments messaging.
6. `variant_picker` — `type: radio`, `color_picker_type: radio-image` (color swatches as images), `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
7. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (**no Buy-it-now/express buttons**), `show_gift_card_recipient: false`, button colors default.
8. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5` → "Receive by …" business-day estimate.
9. **`icon_text_block` (`icon-text-pdp`, inline)** — same 5 trust icons in one row (80px) as the other PDPs: `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`.
10. **`description` — `collapse_content: true`, `collapse_open: true`** — the stock description accordion, **shown and OPEN by default**.
11. **`collapsible_content`** — "Why Choose AirVape?" → **hardcoded HTML** (long copy, in the JSON — no metafield), **closed** by default (`collapse_open: false`). This is the *only* accordion on this template.
12. `share_button` — native share.

## 4. Content sections below the PDP — behaviors
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — Loox review carousel, **limit 10**, not aggregated.
- **apps (Mighty Image Uploader, section `17652927324f1226fc`)** — a **standalone section** hosting only `shopify://apps/mighty-image-uploader/blocks/app-block/1fd42d45-f36c-4cd4-a281-183fed7894d3` (empty `settings: {}`, no options on the block itself). Section settings: `heading: ""` (renders **no heading row** — `sections/apps.liquid` only prints the header block when `heading != blank`), `text_alignment: text-center`, `full_width: true`. **This is materially different from `product.mycustom-skin-studio.json`:** there the uploader block lives *inside* the buy box, wired to a 3-checkbox copyright-consent gate (`customskin_checkboxes` + inline `<script>` disabling Add-to-Cart/Buy-Now until checked + upload-ready). **Here the uploader is its own page section below the reviews, with no consent checkboxes, no `separator` block, and no gating script anywhere in the JSON.** Port it as a plain app-embed section — do not add the consent-gate logic unless asked. Note the **same app-block id** (`1fd42d45-f36c-4cd4-a281-183fed7894d3`) and **same section id** (`17652927324f1226fc`) are reused verbatim across the sibling skins templates (`product.artist-edition-skins.json`, `product.signature-skins.json`) on the old theme — this is a shared/duplicated section, not unique to this product; keep the id as given (Shopify will re-key it on save regardless).
- **image-with-text** "Pure Texture. No Print." — `full_width: false` (narrower content-width section, not full bleed), image `CORE_fabric_skins.451.png`, `image_position: right`, 50% width, `text_alignment: text-center`. Copy: "Crafted from woven materials, leather, and cork, these skins focus on material beauty. Subtle colors. Natural texture. A premium tactile experience."
- **related-products** "YOU MAY ALSO LIKE" — Shopify-native automatic related-products carousel (not a manual list), 8 slots, 4-col desktop / 2-col mobile grid, `heading_html_tag: "p"`.
- **featured-collection** "OUR SIGNATURE MODELS" — carousel, 8 slots, **manual product list** (`collection: ""`, no collection handle).
- **product-faqs** "FAQS" — accordion from `custom.faqs`. Empty without the metafield.

## 5. `assets/main-product.css` — the custom PDP CSS (copy verbatim, shared file across all PDP templates)
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
> This is the same PDP-specific stylesheet used by every product template. Only the `.icon-text-block--inline` (trust-row) rules and the mobile Loox-hide rule are exercised on this template — no `homepage-usps-info` vertical layout or A+/comparison classes are used here, but the file is shared, so port it as-is.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — namespace `custom`
Without these, the matching block/section is **empty**:
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `faqs` | (per product-faqs schema) | FAQS accordion |

Note: this template does **not** reference `description`, `specifications`, `what_s_in_the_box`, `how_to_use`, `parts_accessories`, `lifetime_waranty`, `product_short_videos`, `user_guide`, or the comparison metafields used by `product.core.json` — only the two above.

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `CORE_fabric_skins.451.png`. (Grep the JSON for `shopify://shop_images` to catch all.) **No CDN URLs found** in this template — every image reference is a `shopify://shop_images/…` handle; no direct `cdn.shopify.com` asset URLs to flag.
- **Videos:** none referenced in this template.
- **Apps:**
  - **Loox** — buy-box rating app-block + the dynamic-reviews app-block. Re-add both after installing Loox; app-block IDs will differ on the new store.
  - **Mighty Image Uploader** — the standalone-section upload widget (`shopify://apps/mighty-image-uploader/blocks/app-block/…`). Install the app, re-add its block into the `17652927324f1226fc` (or equivalent) `apps` section. **No DOM-id dependency to preserve here** (unlike `mycustom-skin-studio`, there's no consent script polling for `#ImageUploaderContainer`/`#picture-card-text-wrapper-id`) — just confirm the block renders.
- **Collections:** none directly referenced (both carousels use automatic related-products and a manual product list, not a collection handle).
- **Products (featured-collection manual list):** `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections:** none.
- **Disabled blocks:** none — every section/block in this template is live.
- **No consent-gate blocks at all:** no `customskin_checkboxes`, no `separator`, no gating `<script>` — contrast with `product.mycustom-skin-studio.json`.
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px), same shared rule as the other PDPs.
- **Accordion default states:** `description` starts **OPEN** (`collapse_open: true`); the "Why Choose AirVape?" `collapsible_content` starts **closed**.
- **Second `apps` section has no heading** (`heading: ""`) — confirm `sections/apps.liquid` in 4.2 correctly omits the heading row rather than rendering an empty one.
Keep all of the above exactly.

## 9. Report back
- Confirm the `fabric-texture-skins` template is assigned to the Fabric Texture Skins product and JSON is valid.
- Confirm the **two `apps` sections** render in order: Loox dynamic reviews (limit 10, heading "WHY DO PEOPLE LOVE AIRVAPE?") then the Mighty Image Uploader block alone with no heading.
- Confirm **no consent-gate logic was added** — Add-to-Cart/Buy-Now buttons behave as plain stock buttons, not gated by checkboxes or upload state.
- Confirm `main-product.css` loads and the buy-box Loox rating hides on mobile.
- Confirm the **sticky vertical media gallery** (50%-width column, adaptive aspect, autoplay video, fit-height) + lightbox zoom work, and the **centered sticky add-to-cart** slides in on scroll.
- Confirm `custom.hook_text` and `custom.faqs` metafields exist, Loox + Mighty Image Uploader installed with blocks re-added, and media/products created.

---

## FULL `templates/product.fabric-texture-skins.json` — copy verbatim

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
        "loox_reviews_loox_rating_UzHLqa": {
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
        "text_G7eEhj": {
          "type": "text",
          "disabled": true,
          "settings": {
            "content": "<p>Due to high demand, shipping times may be longer than usual.</p>"
          }
        },
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e": {
          "type": "price",
          "settings": {
            "show_taxes_notice": false,
            "use_bold_font": true
          }
        },
        "rich_text_block_3mrUtD": {
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
        "qty_btn_selector_K7xmQq": {
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
        "delivery_zx6PRk": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_DPdbEX": {
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
        "description_bUrBmK": {
          "type": "description",
          "settings": {
            "collapse_content": true,
            "collapse_open": true,
            "heading": "Description"
          }
        },
        "collapsible_content_jWVxAN": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "share_button_8mTQx8": {
          "type": "share_button",
          "settings": {}
        }
      },
      "block_order": [
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_UzHLqa",
        "text_G7eEhj",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "rich_text_block_3mrUtD",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "qty_btn_selector_K7xmQq",
        "delivery_zx6PRk",
        "icon_text_block_DPdbEX",
        "description_bUrBmK",
        "collapsible_content_jWVxAN",
        "share_button_8mTQx8"
      ],
      "settings": {
        "show_breadcrumbs": false,
        "desktop_media_width": 50,
        "media_size": "",
        "media_layout_desktop": "carousel_vertical",
        "media_mobile_indicator": "thumbnails",
        "media_zoom": "lightbox",
        "media_enable_video_autoplay": true,
        "media_enable_video_looping": true,
        "media_fit_height": true,
        "show_sticky_add_to_cart": true,
        "sticky_add_to_cart_position": "center",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "",
        "heading_color": ""
      }
    },
    "17751117233800687b": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_QRANfX": {
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
        "loox_reviews_loox_dynamic_section_QRANfX"
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
    "17652927324f1226fc": {
      "type": "apps",
      "blocks": {
        "mighty_image_uploader_app_block_HEiEHk": {
          "type": "shopify://apps/mighty-image-uploader/blocks/app-block/1fd42d45-f36c-4cd4-a281-183fed7894d3",
          "settings": {}
        }
      },
      "block_order": [
        "mighty_image_uploader_app_block_HEiEHk"
      ],
      "settings": {
        "full_width": true,
        "remove_horizontal_space": false,
        "remove_vertical_space": false,
        "subheading": "",
        "heading": "",
        "heading_size": "h2",
        "text_alignment": "text-center",
        "link_text": "View all",
        "link_url": "",
        "new_tab": false,
        "background_color": "",
        "text_color": ""
      }
    },
    "image_with_text_njxmwc": {
      "type": "image-with-text",
      "blocks": {
        "heading_ERaQTE": {
          "type": "heading",
          "settings": {
            "heading": "Pure Texture. No Print.",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_jeET9a": {
          "type": "text",
          "settings": {
            "text": "<p>Crafted from woven materials, leather, and cork, these skins focus on material beauty. Subtle colors. Natural texture. A premium tactile experience.<br/><br/></p>"
          }
        }
      },
      "block_order": [
        "heading_ERaQTE",
        "text_jeET9a"
      ],
      "name": "t:sections.image-with-text.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": false,
        "remove_bottom_spacing": false,
        "image": "shopify://shop_images/CORE_fabric_skins.451.png",
        "image_size": "",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "related_products_jHyK3H": {
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
    "featured_collection_Urpzxj": {
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
    "product_faqs_nVVynp": {
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
    "17751117233800687b",
    "17652927324f1226fc",
    "image_with_text_njxmwc",
    "related_products_jHyK3H",
    "featured_collection_Urpzxj",
    "product_faqs_nVVynp"
  ]
}
```
