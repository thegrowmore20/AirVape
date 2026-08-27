# Migration Prompt — Product Template: Signature Skins (`product.signature-skins.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt, the **sticky-add-to-cart** prompt, and the **mycustom-skin-studio** prompt (shares the buy-box CSS file and most block types). Assign this template (suffix **`signature-skins`**) to the Signature Skins product in Admin.
> This documents **every section, every block, every behavior** (what shows, what's hidden/disabled, the sticky media gallery, the sticky add-to-cart, the two separate `apps` sections), embeds the **custom PDP CSS** verbatim, and includes the **full `product.signature-skins.json`** at the bottom.
> **Note:** this is one of a family of near-identical "skins" product templates — `product.artist-edition-skins.json` and `product.fabric-texture-skins.json` share the same section skeleton (main-product → apps/Loox → apps/Mighty Image Uploader → image-with-text → related-products → featured-collection → product-faqs). If those are being migrated too, this file is a good reference for the shared pieces; only the copy/settings called out below differ per product.

---

Recreate my **Signature Skins product** page (`templates/product.signature-skins.json`) so it looks and behaves identically. It's a customized `main-product` PDP (buy box + sticky ATC, **no consent-gate checkboxes**, native Shopify `description` block shown open) followed by a Loox reviews section, a **standalone Mighty Image Uploader `apps` section** (not embedded inside the buy box), an "about the skins" image-with-text section, Shopify-native related products, a manual featured-collection carousel, and FAQs. Copy the JSON verbatim, port the shared snippets/sections + CSS, create the metafields, install/re-add the apps, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.signature-skins.json` — preserve section order, all block settings (including the one `"disabled": true` block), and the header comment.
2. Port the shared section/snippet files and `assets/main-product.css` (embedded in §5) — these are the **same files** used by `product.core.json` and `product.mycustom-skin-studio.json`; do not duplicate them if already ported for those templates. For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — the buy-box hook text and the FAQs section are **empty without them**.
4. Install/re-add the **apps** (§7) — Loox and **Mighty Image Uploader** (the uploader is a plain `@app` block in its own section here, not gated by any consent script).
5. Re-upload **images** (§7) and assign the **`signature-skins`** template to the Signature Skins product.
6. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (7) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `177511237522457b5b` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews, limit **10** |
| 3 | `17652927324f1226fc` | apps (Mighty Image Uploader) | on | standalone section hosting only the upload-widget app block, no heading |
| 4 | `image_with_text_njxmwc` | image-with-text | on | "Designed to be Seen" — about the printed skins, narrow content-width |
| 5 | `related_products_HnxePf` | related-products | on | "YOU MAY ALSO LIKE" — Shopify-native related products carousel |
| 6 | `featured_collection_xwPNcb` | featured-collection ⚑ | on | "OUR SIGNATURE MODELS" — manual product-list carousel |
| 7 | `product_faqs_7aB4g8` | product-faqs ⚑ | on | "FAQS" accordion |

**Only one block is disabled anywhere in this template** (`text_9Ltg9L`, the "high demand" notice in the buy box — see §3.2). Every section and every other block is live. This template has **no** `custom-section`, `pdp-aplus-comparison`, `slideshow`, `video-with-text`, or image-slider sections, and — unlike `product.mycustom-skin-studio.json` — **no `customskin_checkboxes` consent-gate block and no `separator` block**: the Mighty Image Uploader here is just a plain app-embed section with nothing gating the buy buttons.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5, identical file shared across all PDP templates). Loads via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `sections/apps.liquid` — stock Shopify app-block host section; used twice here (once for Loox, once solo for the Mighty Image Uploader). No customization needed beyond the section existing.
- `sections/product-faqs.liquid` ⚑ (FAQ accordion from `product.metafields.custom.faqs.value`).
- `sections/featured-collection.liquid` (shared customized featured collection).
- `sections/related-products.liquid` / `sections/image-with-text.liquid` — stock Essence sections, no customization needed.
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**).
- Buy-box block snippets (all stock, rendered by `snippets/product-info.liquid`): `title`, `text`, `price`, `rich_text_block`, `payment_installments`, `variant_picker` (+radio/`radio-image`), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.
- The Mighty Image Uploader here renders via the stock `{% when '@app' %} {% render block %}` branch inside the **`apps`** section (not `main-product`/`product-info`) — no custom liquid required, just install the app and re-add its block into section `17652927324f1226fc`.

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
These settings are **identical to `product.mycustom-skin-studio.json`** (narrower 50% column, adaptive aspect, autoplay video, fit-height) except `media_layout_desktop` — here it's `carousel_vertical`, matching `product.fabric-texture-skins.json` (the sibling `product.artist-edition-skins.json` instead uses `carousel_horizontal` — flag if the wrong variant gets copied).
**Sticky media gallery behavior (stock Essence — exists in 4.2):** `carousel_vertical` renders a `<scroll-carousel vertical>` thumbnail rail + sticky `<media-carousel>` main stage, wrapped in `<media-lightbox>` for zoom. Mobile is a swipeable carousel with a thumbnail indicator; product title+reviews render above the gallery on mobile. Don't rewrite — stock behavior, just apply the settings above.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom, centered, when the main Add-to-Cart scrolls out of view. Full spec in the **sticky-add-to-cart** prompt. Unlike `product.mycustom-skin-studio.json`, there is **no consent-gate script** here, so no extra button-disabling logic to verify.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order`. **Bold = custom/metafield-driven or notably different from siblings. ⛔ = disabled (hidden).**
1. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent (→ inherits default). Shows the product name.
2. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`. **`looxOpenFloatingWidget: false`** — ⚠️ this differs from `product.core.json`/`product.mycustom-skin-studio.json`/`product.artist-edition-skins.json`/`product.fabric-texture-skins.json`, all of which have it `true`. Clicking the rating here does **not** open Loox's floating reviews widget. Preserve this setting exactly. `emptyRatingWidget: true`. Same CSS-hidden-on-mobile rule applies (`main-product.css`, §5).
3. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
4. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product **hook/tagline** (heading size `text-h6 md:text-h5`, left). Empty if `custom.hook_text` missing.
5. **`text` "Due to high demand…" ⛔ disabled** (`text_9Ltg9L`) — the only disabled block in this template. Hidden.
6. `payment_installments` — Shop Pay installments messaging. ⚠️ Note the order: here it comes **right after** the disabled "high demand" text and **before** `variant_picker` — differs from `product.core.json` where it sits after the variant picker. Preserve this position.
7. `variant_picker` — `type: radio`, `color_picker_type: radio-image` (color swatches as images), `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
8. `qty_btn_selector` — quantity stepper + Add-to-Cart. `show_dynamic_checkout_buttons: false` (no Buy-it-now/express buttons). **`show_gift_card_recipient: true`** — ⚠️ differs from every sibling template (`product.core.json`, `product.mycustom-skin-studio.json`, `product.artist-edition-skins.json`, `product.fabric-texture-skins.json` all have this `false`). Preserve `true` here.
9. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5` → "Receive by …" business-day estimate.
10. **`icon_text_block` (`icon-text-pdp`, inline)** — 5 trust icons in one row (80px): `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`. (No `homepage-usps-info` vertical icon block on this template.)
11. **`description` — `collapse_content: true`, `collapse_open: true`** — the **stock native** Shopify description accordion (not a metafield), shown and **OPEN** by default.
12. **`collapsible_content`** — "Why Choose AirVape?" → **hardcoded HTML** (long copy, in the JSON — no metafield), **closed** by default (`collapse_open: false`). This is the only accordion besides the native description.
13. `share_button` — native share.

No `customskin_checkboxes`, `separator`, or Mighty Image Uploader block appears in this `block_order` — the uploader lives in its own standalone `apps` section (§4), completely outside the buy box.

## 4. Content sections below/around the PDP — behaviors
- **apps (Loox dynamic)** `177511237522457b5b` "WHY DO PEOPLE LOVE AIRVAPE?" — Loox review carousel, **limit 10**, not aggregated, `maxwidth: 1080`.
- **apps (Mighty Image Uploader)** `17652927324f1226fc` — a second, separate `apps` section immediately after the Loox one. `heading: ""` (no heading rendered), contains only the `shopify://apps/mighty-image-uploader/blocks/app-block/1fd42d45-f36c-4cd4-a281-183fed7894d3` block with empty settings — it self-renders the upload widget. **Store-specific: the app-block id will differ on the new store** — re-add the block from the app after installing it. Unlike `product.mycustom-skin-studio.json`, nothing here reads the uploader's output or gates any button — it's presentational/functional only, standing on its own between the buy box and the "Designed to be Seen" content section.
- **image-with-text** `image_with_text_njxmwc` "Designed to be Seen" — `full_width: false` (narrower content-width section, not full bleed), image `CORE_signature_skins_3.449.png`, `image_position: right`, 50% width, `text_alignment: text-center`. Copy: "Each printed skin features detailed, high-resolution artwork applied to precision-fit front and back plates—so your device stands out without compromising its premium feel. From clean graphic patterns to intricate, statement-making prints, every design is created to bring personality into your everyday ritual."
- **related-products** `related_products_HnxePf` "YOU MAY ALSO LIKE" — Shopify-native automatic related-products carousel (not a manual list), 8 slots, 4-col desktop / 2-col mobile grid.
- **featured-collection** `featured_collection_xwPNcb` "OUR SIGNATURE MODELS" — carousel, 8 slots, **manual product list** (`collection: ""`, no collection handle).
- **product-faqs** `product_faqs_7aB4g8` "FAQS" — accordion from `custom.faqs`. Empty without the metafield.

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
> Same shared PDP stylesheet as `product.core.json` and `product.mycustom-skin-studio.json`. Only the `.icon-text-block--inline` (trust-row) rules and the mobile Loox-hide rule are exercised on this template — no `homepage-usps-info` vertical layout or A+/comparison classes here, but port the file as-is since it's shared across templates.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — namespace `custom`
Without these, the matching block/section is **empty**:
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `faqs` | (per product-faqs schema) | FAQS accordion |

Note: this template does **not** reference `description`, `specifications`, `what_s_in_the_box`, `how_to_use`, `parts_accessories`, `lifetime_waranty`, `product_short_videos`, `user_guide`, or the comparison metafields used by `product.core.json` — only the two above (same as `product.mycustom-skin-studio.json`).

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `CORE_signature_skins_3.449.png`. (Grep the JSON for `shopify://shop_images` to catch all — no `shopify://files/videos` references in this template.) The `CORE_signature_skins_3.449.png` filename is shared byte-for-byte across all three sibling "skins" templates for the `image_with_text_njxmwc` block — confirm it's the correct art for Signature Skins specifically when re-uploading (the artist-edition and fabric-texture templates reference different images for the same section: `CORE_signature_skins_3.449.png` is also used by `artist-edition-skins`, while `fabric-texture-skins` uses a different file `CORE_fabric_skins.451.png` — double-check the intended image with the client if this looks like a possible mix-up in the source theme).
- **Apps:**
  - **Loox** — buy-box rating app-block (`looxOpenFloatingWidget: false` — see §3.2) + the dynamic-reviews app-block (limit 10). Re-add both after installing Loox; app-block IDs will differ on the new store.
  - **Mighty Image Uploader** — standalone app-block in its own `apps` section (§4). Install the app, re-add its block into that section. No DOM-id dependency to preserve here (unlike `product.mycustom-skin-studio.json`, nothing polls its output).
- **Collections:** none directly referenced (related-products is automatic/native; featured-collection uses a manual product list, not a collection handle).
- **Products (featured-collection manual list):** `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.
- **Menus/metaobjects:** none referenced in this template.
- **Product media:** upload the Signature Skins gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections:** none.
- **Disabled blocks:** only `text_9Ltg9L` ("Due to high demand…", buy box block 5).
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px), same shared rule as the other PDPs.
- **Accordion default states:** native `description` block starts **OPEN** (`collapse_open: true`); the "Why Choose AirVape?" `collapsible_content` starts **closed**.
- **Notable non-default settings to preserve exactly:** `looxOpenFloatingWidget: false` on the rating block, `show_gift_card_recipient: true` on `qty_btn_selector`, `payment_installments` positioned before `variant_picker`.
Keep all of the above exactly.

## 9. Diff against 4.2 stock — what to check before/after porting
- Confirm 4.2's stock `apps` section supports being used **twice on one template** with different block contents (it should — it's a generic app-block host) — nothing custom needed, just two section instances.
- Confirm 4.2's `main-product`/`product-info` block schema already registers `title`, `text`, `price`, `rich_text_block`, `payment_installments`, `variant_picker`, `qty_btn_selector`, `delivery`, `icon_text_block`, `description`, `collapsible_content`, `share_button` — all stock, should already exist; report any missing.
- Confirm `related-products` and `image-with-text` are stock 4.2 sections (no custom liquid expected).
- Confirm the shared `product-faqs` and `featured-collection` sections are ported once and reused (same files as the other PDP templates) rather than duplicated per-product.

## 10. Report back
- Confirm the `signature-skins` template is assigned to the Signature Skins product and JSON is valid.
- Confirm the buy box shows: title, Loox rating (floating widget **disabled** on click), price, hook text, quantity/ATC with **gift-card-recipient field enabled**, delivery estimate, inline trust-icon row, **open** native description, closed "Why Choose AirVape?" accordion, share button — and that the disabled "high demand" text stays hidden.
- Confirm the **two separate `apps` sections** render in order: Loox dynamic reviews (limit 10) first, then the standalone Mighty Image Uploader section (no heading) — and that the uploader is **not** gated by any consent script (contrast with `product.mycustom-skin-studio.json`).
- Confirm the **sticky vertical media gallery** (50%-width column, adaptive aspect, autoplay video, fit-height) + lightbox zoom work, and the **centered sticky add-to-cart** slides in on scroll.
- Confirm `main-product.css` loads and the buy-box Loox rating hides on mobile.
- Confirm `custom.hook_text` and `custom.faqs` metafields exist, Loox + Mighty Image Uploader installed with blocks re-added, and the correct art (`CORE_signature_skins_3.449.png` or the client-confirmed replacement) + products/media are in place.

---

## FULL `templates/product.signature-skins.json` — copy verbatim

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
        "loox_reviews_loox_rating_peTNMJ": {
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
        "rich_text_block_XL4Byk": {
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
        "text_9Ltg9L": {
          "type": "text",
          "disabled": true,
          "settings": {
            "content": "<p>Due to high demand, shipping times may be longer than usual.</p>"
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
        "qty_btn_selector_gzRTyb": {
          "type": "qty_btn_selector",
          "settings": {
            "show_dynamic_checkout_buttons": false,
            "show_gift_card_recipient": true,
            "add_to_cart_background_color": "",
            "add_to_cart_text_color": "",
            "buy_it_now_background_color": "",
            "buy_it_now_text_color": ""
          }
        },
        "delivery_U3AYBM": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_Eh4GKr": {
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
        "description_VnycjW": {
          "type": "description",
          "settings": {
            "collapse_content": true,
            "collapse_open": true,
            "heading": "Description"
          }
        },
        "collapsible_content_wB8GhN": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "share_button_i3gREm": {
          "type": "share_button",
          "settings": {}
        }
      },
      "block_order": [
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_peTNMJ",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "rich_text_block_XL4Byk",
        "text_9Ltg9L",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "qty_btn_selector_gzRTyb",
        "delivery_U3AYBM",
        "icon_text_block_Eh4GKr",
        "description_VnycjW",
        "collapsible_content_wB8GhN",
        "share_button_i3gREm"
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
    "177511237522457b5b": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_n4hQxG": {
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
        "loox_reviews_loox_dynamic_section_n4hQxG"
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
            "heading": "Designed to be Seen",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_jeET9a": {
          "type": "text",
          "settings": {
            "text": "<p>Each printed skin features detailed, high-resolution artwork applied to precision-fit front and back plates—so your device stands out without compromising its premium feel.</p><p>From clean graphic patterns to intricate, statement-making prints, every design is created to bring personality into your everyday ritual.</p>"
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
        "image": "shopify://shop_images/CORE_signature_skins_3.449.png",
        "image_size": "",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "related_products_HnxePf": {
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
    "featured_collection_xwPNcb": {
      "type": "featured-collection",
      "settings": {
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
    "product_faqs_7aB4g8": {
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
    "177511237522457b5b",
    "17652927324f1226fc",
    "image_with_text_njxmwc",
    "related_products_HnxePf",
    "featured_collection_xwPNcb",
    "product_faqs_7aB4g8"
  ]
}
```
