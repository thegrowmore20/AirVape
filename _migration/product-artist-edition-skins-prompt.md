# Migration Prompt — Product Template: Artist Edition Skins (`product.artist-edition-skins.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-core** prompt (structural reference) and the **product-mycustom-skin-studio** prompt (sibling skins/upload product — read it for contrast, see §3.3 below). Assign this template (suffix **`artist-edition-skins`**) to the Artist Edition Skins product in Admin. This is one of three "skins" product templates (base family `skins` per the master migration doc — siblings: `product.fabric-texture-skins.json`, `product.signature-skins.json`).
> This documents **every section, every block, every behavior** (what shows, the horizontal media carousel, the standalone image-uploader section with NO consent gate — a deliberate contrast with `mycustom-skin-studio`), embeds the **custom PDP CSS** verbatim (shared `main-product.css`), and includes the **full `product.artist-edition-skins.json`** at the bottom.

---

Recreate my **Artist Edition Skins product** page (`templates/product.artist-edition-skins.json`) so it looks and behaves identically. It's a customized `main-product` PDP (horizontal media carousel, no sticky-media-gallery vertical rail) with a lean buy box (no upload/consent gate in the buy box itself, no share button), followed by **two separate `apps` sections** (Loox reviews, then a bare Mighty Image Uploader widget with no heading and no consent gating), an "about the skins program" image-with-text, Shopify-native related products, a manual featured-collection carousel, and FAQs. Copy the JSON verbatim, port the section files + CSS, create the metafields, install/re-add the apps, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.artist-edition-skins.json` — preserve section order, all block settings, and the header comment. Note: **nothing in this template is `"disabled": true`** — every section and block listed is live.
2. Port the section files and `assets/main-product.css` (embedded in §5) — identical file already ported for `product.core.json` / `product.mycustom-skin-studio.json`; do not re-diff it, just confirm it's present. For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — the buy-box hook text and the FAQs section are **empty without them**.
4. Install/re-add the **apps** (§7) — Loox and **Mighty Image Uploader**. **Do NOT port the `customskin-checkbox.liquid` consent-gate snippet or the `customskin_checkboxes` / `separator` block types onto this template's `main` section blocks** — this product's JSON does not use them (see §3.3).
5. Re-upload **images** (§7) and assign the **`artist-edition-skins`** template to the Artist Edition Skins product.
6. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (7) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (horizontal-carousel media gallery + lean buy box + sticky ATC) — §3 |
| 2 | `177511064336521a37` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews, limit **10** |
| 3 | `17652927324f1226fc` | apps (Mighty Image Uploader) | on | **bare, headingless** section hosting only the image-upload widget — §4 |
| 4 | `image_with_text_njxmwc` | image-with-text | on | "Curated by Creators. Chosen by the Community." — narrow content-width section |
| 5 | `related_products_mbNMhG` | related-products | on | "YOU MAY ALSO LIKE" — Shopify-native automatic related products carousel |
| 6 | `featured_collection_7qGdVH` | featured-collection ⚑ | on | "OUR SIGNATURE MODELS" — manual product-list carousel |
| 7 | `product_faqs_kKpgGG` | product-faqs ⚑ | on | "FAQS" accordion |

**No sections and no blocks are disabled in this template** — everything is live. This template has **no** `custom-section`, `pdp-aplus-comparison`, `slideshow`, image-slider, or video sections, and (unlike `mycustom-skin-studio`) **no consent-gate blocks anywhere**.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5, identical file used across every PDP template) — loads via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `sections/apps.liquid` ⚑ — the generic app-embed wrapper. Renders a `section-header` (heading/link) **only if `section.settings.heading` is non-blank**, then loops `section.blocks` and `{% render block %}`s each. Section `17652927324f1226fc` has `heading: ""`, so **it renders no heading/eyebrow at all** — just the bare Mighty Image Uploader widget inside `.section-body`. Confirm this "headingless apps section" behavior exists in 4.2 stock `apps.liquid` (it should — it's the same file as the Loox apps section, just with blank heading settings).
- `sections/featured-collection.liquid` (shared customized featured collection).
- `sections/product-faqs.liquid` ⚑ (FAQ accordion from `product.metafields.custom.faqs.value`).
- `sections/image-with-text.liquid` (stock; `full_width: false` narrow layout).
- `sections/related-products.liquid` (stock Shopify-native related products, no custom file expected).
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**).
- Buy-box block snippets (all stock, rendered by `product-info.liquid`): `title`, `price`, `rich_text_block`, `payment_installments`, `variant_picker`(+radio/`radio-image`), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`.
- **Do not port**: `snippets/customskin-checkbox.liquid`, the `customskin_checkboxes` block type, or the `separator` block type onto **this** product's blocks — they exist in the theme (needed for `mycustom-skin-studio`) but are **not used** by `product.artist-edition-skins.json`. Also **no `share_button` block** on this template (contrast with `product.core.json` and `product.mycustom-skin-studio.json`, both of which include one).

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          → media column is 50% of page width on desktop (same as mycustom-skin-studio, narrower than core's 56%)
media_size: ""                   → adaptive media aspect ratio (not fixed)
media_layout_desktop: "carousel_horizontal"   → ⚠️ HORIZONTAL layout — differs from both product.core.json and product.mycustom-skin-studio.json, which use "carousel_vertical"
media_mobile_indicator: "thumbnails"          → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: true
media_enable_video_looping: true
media_fit_height: true           → media column stretches to fill row height
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Media layout — the key structural difference from the sibling PDPs:** `media_layout_desktop` has 4 stock option values in the 4.2 `main-product.liquid` schema: `carousel_vertical`, `carousel_horizontal`, `grid`, `grid_main`. This template is the only one of the three documented so far using **`carousel_horizontal`** — confirm in 4.2 what that renders as (expected: a large main stage with a **horizontal thumbnail strip below/beside it**, rather than the vertical side-rail used by `product.core.json`/`product.mycustom-skin-studio.json`). It should still be a stock Essence layout mode — do not custom-build it, just apply the setting and verify the rendered layout matches 4.1.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom, centered, when the main Add-to-Cart scrolls out of view. Full spec in the **sticky-add-to-cart** prompt. **No consent-gate script exists on this template**, so (unlike `mycustom-skin-studio`) there is nothing extra to verify about button-disabling here — the sticky ATC and main ATC buttons behave stock.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order`. Nothing here is disabled. This is the **leanest** buy box of the three documented skins/upload templates — no trust-icon-adjacent metafield accordions, no upload widget, no consent gate, no share button.
1. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent (→ inherits default). Shows the product name.
2. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`, opens floating widget on click, shows empty-rating widget. Same CSS-hidden-on-mobile rule applies (`main-product.css`, §5).
3. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
4. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product **hook/tagline** (heading size `text-h6 md:text-h5`, left-aligned). Empty if `custom.hook_text` missing.
5. `payment_installments` — Shop Pay installments messaging. **Positioned before the variant picker** here (unlike core/skin-studio, where it sits after) — preserve this order.
6. `variant_picker` — `type: radio`, `color_picker_type: radio-image` (color swatches as images), `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
7. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (no Buy-it-now/express buttons), `show_gift_card_recipient: false`, button colors default.
8. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5` → "Receive by …" business-day estimate.
9. **`icon_text_block` (`icon-text-pdp`, inline)** — the same 5 trust icons in one row (80px) as every other PDP: `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`.
10. **`description` — `collapse_content: true`, `collapse_open: true`** — the stock description accordion, **shown and OPEN by default** (same as `mycustom-skin-studio`; differs from `product.core.json`, where `description` is disabled entirely).
11. **`collapsible_content`** — "Why Choose AirVape?" → **hardcoded HTML** (identical long-form copy used on the other two PDP templates — no metafield), **closed** by default (`collapse_open: false`). This is the only accordion on this template.

**No `share_button` block** — confirm its omission is intentional and don't add one when porting.

### 3.3 What this template deliberately does NOT have (contrast with `product.mycustom-skin-studio.json`)
Both templates embed the **same** Mighty Image Uploader app-block type (`shopify://apps/mighty-image-uploader/blocks/app-block/1fd42d45-f36c-4cd4-a281-183fed7894d3`), but they use it completely differently:
| | `product.mycustom-skin-studio.json` | `product.artist-edition-skins.json` |
|---|---|---|
| Uploader placement | Inside the **buy box**, between `rich_text_block` and the consent gate | Its **own standalone `apps` section** (`17652927324f1226fc`), positioned in the page order *after* the Loox reviews section, *before* the image-with-text section — outside the buy box entirely |
| Consent gate (`customskin_checkboxes` + `separator` + `customskin-checkbox.liquid`) | **Present** — 3-checkbox copyright/consent gate disables ATC/Buy-Now buttons until checked + image uploaded | **Absent** — no gating blocks anywhere in this JSON |
| Product tag requirement | Must be tagged `custom-upload` or the gate silently disappears | **No tag requirement** — nothing depends on product tags |
| `#custom-checkout-button-pdp` / consent-stamping script | Required | **Not applicable** — do not add it |

**Do not carry the consent-gate mechanism over to this template.** If the new 4.2 store's Mighty Image Uploader app version behaves differently when *not* paired with the consent-gate script (e.g., it expects to always be gated), flag this — but the 4.1 source for this specific template has no gating, so replicate it ungated.

## 4. The two `apps` sections
1. **`177511064336521a37`** — Loox dynamic reviews, heading **"WHY DO PEOPLE LOVE AIRVAPE?"**, block `shopify://apps/loox-reviews/blocks/loox-dynamic-section/5c3b337f-fd14-4df5-b1d6-80ec13e6e28e`, `limit: 10`, not aggregated, `default_tab: "automatic"`, `hide_thumbnails: false`, `maxwidth: 1080`. Same app-block type used on the other PDPs; re-add after installing/confirming Loox on the new store (block id will differ).
2. **`17652927324f1226fc`** — Mighty Image Uploader, **`heading: ""`** (blank → `sections/apps.liquid` renders no `section-header` at all, just the bare widget in `.section-body`), block `shopify://apps/mighty-image-uploader/blocks/app-block/1fd42d45-f36c-4cd4-a281-183fed7894d3` with empty `settings: {}` (it self-renders its own UI, same as on `mycustom-skin-studio`). This is where the customer uploads their custom artwork for an Artist Edition skin — **standalone**, not tied to the buy box, not gated by checkboxes, not tied to a Buy-Now button id. Install the app, re-add this exact block into this exact bare `apps` section (empty heading/link/text-alignment settings otherwise stock defaults). **Store-specific: the app-block id will differ on the new store** — just re-add the block from the app after installing it.

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
> Same shared PDP stylesheet used by every product template. Only the `.icon-text-block--inline` (trust-row) rules and the mobile Loox-hide rule are exercised on this template — no `homepage-usps-info` vertical layout, no A+/comparison classes, no upload/consent CSS needed here. Port as-is (it's already on the store from the earlier PDP prompts).

## 6. Metafields to create (Admin → Settings → Custom data → Products) — namespace `custom`
Without these, the matching block/section is **empty**:
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `faqs` | (per product-faqs schema) | FAQS accordion |

Note: this template does **not** reference `description`, `specifications`, `what_s_in_the_box`, `how_to_use`, `parts_accessories`, `lifetime_waranty`, `product_short_videos`, `user_guide`, or the comparison metafields used by `product.core.json` — only the two above (same minimal set as `product.mycustom-skin-studio.json`).

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `CORE_signature_skins_3.449.png` (image-with-text). Grep the JSON for `shopify://shop_images` to catch all. **No CDN-hosted or external image URLs found in this JSON** — all image references use the `shopify://shop_images/…` scheme, so nothing needs re-hosting from an external CDN, only re-uploading to Files.
- **Videos:** none referenced (no `shopify://files/videos` in this template — unlike `product.core.json`/`product.mycustom-skin-studio.json`, this PDP has no video sections).
- **Apps:**
  - **Loox** — buy-box rating app-block + the dynamic-reviews app-block (section 2). Re-add both after installing Loox; app-block IDs will differ on the new store.
  - **Mighty Image Uploader** — the standalone widget in section 3 (`shopify://apps/mighty-image-uploader/blocks/app-block/…`). Install the app, re-add its block into the bare `apps` section in the same page position. **No DOM-id dependency to preserve** (no `#ImageUploaderContainer` / `#picture-card-text-wrapper-id` consumers on this template) — so app-version/DOM differences matter far less here than on `mycustom-skin-studio`.
- **Collections:** none directly referenced (related-products is Shopify-native automatic; the featured-collection uses a manual product list, `collection: ""`).
- **Products (featured-collection manual list):** `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus` — identical list to the other two PDP templates. **Note:** per the master migration doc (commit `0587b15`), Breathelet was removed from the live store — confirm with me whether to keep or drop this product from the list before porting, consistent with whatever call was made on the other PDP templates' featured collections.
- **Product setup (store-specific, not in the JSON):** no tag requirement, no dedicated Buy-Now button id needed for this template (contrast with `mycustom-skin-studio`'s `custom-upload` tag + `#custom-checkout-button-pdp` requirement).

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections:** none.
- **Disabled blocks:** none — every section/block in this template is live.
- **Structurally absent (not "hidden," simply not present in this JSON):** `share_button`, `customskin_checkboxes`, `separator`, any `text` placeholder block, any video/slideshow section, any `custom-section`/image-slider block, any A+ comparison section.
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px), same shared rule as every other PDP.
- **Accordion default states:** `description` (block 10) starts **OPEN** (`collapse_open: true`); the "Why Choose AirVape?" `collapsible_content` starts **closed**.
- **Media layout:** `carousel_horizontal` — the one PDP template (of the three documented) using this option instead of `carousel_vertical`.
Keep all of the above exactly.

## 9. Report back
- Confirm the `artist-edition-skins` template is assigned to the Artist Edition Skins product and JSON is valid.
- Confirm `main-product.css` loads and the buy-box Loox rating hides on mobile.
- Confirm the **horizontal media carousel** (`carousel_layout_desktop: carousel_horizontal`, 50%-width column, adaptive aspect, autoplay video, fit-height) + lightbox zoom render correctly, and the **centered sticky add-to-cart** slides in on scroll (ungated — no consent script involved).
- Confirm the buy-box block order exactly (`title` → `loox_rating` → `price` → `rich_text_block` → `payment_installments` → `variant_picker` → `qty_btn_selector` → `delivery` → `icon_text_block` → `description` [open] → `collapsible_content` [closed]) — **no share button, no upload widget, no consent blocks inside the buy box**.
- Confirm the **two `apps` sections** are separate and correctly ordered: Loox reviews (with heading) first, then the bare headingless Mighty Image Uploader section second — **not** merged into one section, and **not** placed inside `main`.
- Explicitly flag whether the consent-gate omission was intentional in the source (it is, per the 4.1 JSON) so nobody "fixes" this template by copying the `mycustom-skin-studio` gate onto it.
- Confirm `custom.hook_text` and `custom.faqs` metafields exist, Loox + Mighty Image Uploader installed with blocks re-added, and the featured-collection product list + `CORE_signature_skins_3.449.png` image exist.

---

## FULL `templates/product.artist-edition-skins.json` — copy verbatim

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
        "loox_reviews_loox_rating_Hdc673": {
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
        "rich_text_block_FXUMhq": {
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
        "qty_btn_selector_4wpHV7": {
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
        "delivery_t3D3HP": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_EfmKHQ": {
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
        "description_Fqi8Qw": {
          "type": "description",
          "settings": {
            "collapse_content": true,
            "collapse_open": true,
            "heading": "Description"
          }
        },
        "collapsible_content_AyPDL8": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        }
      },
      "block_order": [
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_Hdc673",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "rich_text_block_FXUMhq",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "qty_btn_selector_4wpHV7",
        "delivery_t3D3HP",
        "icon_text_block_EfmKHQ",
        "description_Fqi8Qw",
        "collapsible_content_AyPDL8"
      ],
      "settings": {
        "show_breadcrumbs": false,
        "desktop_media_width": 50,
        "media_size": "",
        "media_layout_desktop": "carousel_horizontal",
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
    "177511064336521a37": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_6L7K7d": {
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
        "loox_reviews_loox_dynamic_section_6L7K7d"
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
            "heading": "Curated by Creators. Chosen by the Community.",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_jeET9a": {
          "type": "text",
          "settings": {
            "text": "<h5><strong>Wear Art. Not Just a Skin.</strong><br/>Discover limited designs made by  artists and voted into the shop by users like you. Every skin is professionally printed in high detail, built to fit perfectly, and made to turn your device into a piece of art.<br/><br/><br/></h5>"
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
    "related_products_mbNMhG": {
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
    "featured_collection_7qGdVH": {
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
    "product_faqs_kKpgGG": {
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
    "177511064336521a37",
    "17652927324f1226fc",
    "image_with_text_njxmwc",
    "related_products_mbNMhG",
    "featured_collection_7qGdVH",
    "product_faqs_kKpgGG"
  ]
}
```
