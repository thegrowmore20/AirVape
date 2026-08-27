# Migration Prompt — Product Template: Custom Skin Studio (`product.mycustom-skin-studio.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt. Assign this template (suffix **`mycustom-skin-studio`**) to the Custom Skin Studio product in Admin, and make sure that product carries the tag **`custom-upload`** (see §3.2 block 7 — the consent block renders nothing without it).
> This documents **every section, every block, every behavior** (what shows, the upload/consent gate, the sticky add-to-cart), embeds the **custom PDP CSS** verbatim, and includes the **full `product.mycustom-skin-studio.json`** at the bottom.

---

Recreate my **Custom Skin Studio product** page (`templates/product.mycustom-skin-studio.json`) so it looks and behaves identically. It's a customized `main-product` PDP with a **custom-image-upload + copyright-consent gate** in the buy box (no A+ comparison, no image slider, no custom-section blocks), followed by a how-to video, an "about" image-with-text, related products, a manual featured-collection carousel, and FAQs. Copy the JSON verbatim, port the custom snippets/sections + CSS, create the metafields, install/re-add the apps, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.mycustom-skin-studio.json` — preserve section order, all block settings, and the header comment. Note: **nothing in this template is `"disabled": true`** — every section and block listed is live.
2. Port the custom section/snippet files and `assets/main-product.css` (embedded in §4). For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafield** (§6) — the FAQ section and the buy-box hook text are **empty without it**.
4. Install/re-add the **apps** (§7) — Loox and **Mighty Image Uploader** — the upload gate depends on the latter's DOM output.
5. Re-upload **images/videos** (§7) and assign the **`mycustom-skin-studio`** template to the Custom Skin Studio product; tag it **`custom-upload`**.
6. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (7) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box with the upload/consent configurator + sticky ATC) — §3 |
| 2 | `1775111980d1302f70` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews, limit **10** |
| 3 | `video_with_text_kizb7E` | video-with-text | on | "HOW TO — Upload your images" split video (image left) |
| 4 | `image_with_text_njxmwc` | image-with-text | on | "Make it Personal" narrow content-width section |
| 5 | `related_products_a4nELt` | related-products | on | "YOU MAY ALSO LIKE" — Shopify-native related products carousel |
| 6 | `featured_collection_TYF3gw` | featured-collection ⚑ | on | "OUR SIGNATURE MODELS" — manual product-list carousel |
| 7 | `product_faqs_U3PEPK` | product-faqs ⚑ | on | "FAQS" accordion |

**No sections and no blocks are disabled in this template** — unlike the other PDP templates, everything here is live. This template deliberately has **no** `custom-section`, `pdp-aplus-comparison`, `slideshow`, or image-slider sections.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5, identical file used across all PDP templates — it loads via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `snippets/product-info.liquid` — renders every buy-box block by `block.type` in a `{% case %}`. Two entries matter for this template:
  - `{% when 'customskin_checkboxes' %} {% render 'customskin-checkbox' %}`
  - `{% when 'separator' %} <hr class="my-6" {{ block.shopify_attributes }}>`
  - `{% when '@app' %} {% render block %}` — this is how the **Mighty Image Uploader** app block renders; it's a plain Shopify app-embed block, no custom liquid needed, just install the app and re-add the block.
- `snippets/customskin-checkbox.liquid` ⚑ — the **copyright-consent gate** (see §3.2 block 7 for full behavior). **Must be ported verbatim**, including its inline `<script>` — it is the load-bearing piece of the "configurator."
- Block-type schema addition in `sections/main-product.liquid`: `{"type": "customskin_checkboxes", "name": "Custom Skin Checkbox", "limit": 1}` and `{"type": "separator", "name": "t:sections.main-product.blocks.separator.name"}` — confirm both block types are registered in the 4.2 section schema (they may already exist stock; if not, add them).
- `sections/product-faqs.liquid` ⚑ (FAQ accordion from `product.metafields.custom.faqs.value`).
- `sections/featured-collection.liquid` (shared customized featured collection).
- `snippets/product-sticky-add-to-cart.liquid` (see the dedicated **sticky-add-to-cart** prompt — here `sticky_add_to_cart_position` = **center**).
- Buy-box block snippets (mostly stock, rendered by `product-info.liquid`): `title`, `text`, `price`, `rich_text_block`, `variant_picker`(+radio/`radio-image`), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`.

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          → media column is 50% of page width on desktop (narrower than Legacy CORE's 56%)
media_size: ""                   → adaptive media aspect (NOT fixed — differs from core's "1")
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: true            → media videos in the gallery autoplay (differs from core's false)
media_enable_video_looping: true
media_fit_height: true           → media column stretches to fill the row height (differs from core's false)
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** same mechanism as the other PDPs — `carousel_vertical` renders a `<scroll-carousel vertical>` thumbnail rail + sticky `<media-carousel>` main stage, wrapped in `<media-lightbox>` for zoom. Mobile is a swipeable carousel with thumbnail indicator; product title+reviews render above the gallery on mobile. Don't rewrite — stock behavior, just apply the settings above (note the three deltas vs. `product.core.json`: narrower media column, adaptive aspect ratio, video autoplay on, fit-height on).
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom, centered, when the main Add-to-Cart scrolls out of view. Full spec in the **sticky-add-to-cart** prompt. **Important:** because the copyright-consent gate (block 7) can disable the Add-to-Cart/Buy-Now buttons, verify the sticky ATC button is also covered by the gate's `.product-info-inner button` selector — it targets buttons **inside `.product-info-inner`**, so confirm the sticky bar's button lives in that container in 4.2, or the gate may not disable it.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order`. **Bold = custom/metafield-driven or unique to this template.** Nothing here is disabled.
1. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent (→ inherits default). Shows the product name.
2. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`, opens floating widget on click, shows empty-rating widget. Same CSS-hidden-on-mobile rule applies (`main-product.css`, §5).
3. **`text` — empty (`content: ""`)** — enabled but blank; renders no visible content. Kept as a placeholder block; port it as-is (empty) rather than deleting it, in case content is added later.
4. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
5. **`rich_text_block`** — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product **hook/tagline** (heading size `text-h6 md:text-h5`, left). Empty if `custom.hook_text` missing.
6. **`shopify://apps/mighty-image-uploader/blocks/app-block/…` (app block, `@app`)** — the **Mighty Image Uploader** widget. This is where the customer uploads their front/back skin artwork; it renders its own UI into (and manages) a container with id **`#ImageUploaderContainer`**, and once an image is attached it inserts an element with id **`#picture-card-text-wrapper-id`** inside that container (the consent gate below polls for this element to know an upload is "ready"). No custom settings on this block — install the app, re-add the block, it self-renders. **Store-specific: the app-block id (`1fd42d45-…`) will differ on the new store** — just re-add the block from the app after installing it.
7. **`customskin_checkboxes` → renders `snippets/customskin-checkbox.liquid` — THE CONFIGURATOR/CONSENT GATE.** Full mechanism (port verbatim):
   - **Gated entirely on the product itself:** `{%- if product.tags contains 'custom-upload' -%}` — if the product doesn't carry that tag, this block renders **nothing at all** (not even a placeholder). **The Custom Skin Studio product must be tagged `custom-upload` on the new store.**
   - Renders a "Copyright and content responsibility" panel with **3 checkboxes** the customer must all tick:
     1. confirms ownership/permission for the uploaded image,
     2. confirms no third-party trademarks/logos/copyrighted characters/celebrity likenesses,
     3. accepts the Custom Print Terms (`/pages/custom-print-terms`) and Content Policy (`/pages/content-policy`) and agrees to indemnify the shop.
   - A hidden notice (`#cc-notice`, "Please tick all three boxes to continue.") appears if the customer tries to submit without checking all three.
   - **Button gating logic (inline `<script>`):**
     - Every `<button>`/`<input type=submit>` inside `.product-info-inner` (except the dedicated Buy-Now button, see below) is disabled (`disabled` attr + `.cc-blocked` class, 55% opacity, no pointer events) whenever **not all 3 checkboxes are checked**.
     - The dedicated **Buy-Now button** (`#custom-checkout-button-pdp`) additionally requires the **image uploader to be ready** — i.e. `#ImageUploaderContainer` must contain `#picture-card-text-wrapper-id` (meaning an image was actually uploaded via the Mighty Image Uploader block above). It stays disabled until **both** conditions are true.
     - A `MutationObserver` watches `document.body` for the uploader container to appear, then observes that container's subtree so `apply()` re-runs whenever the uploader's DOM changes (e.g. after an upload completes).
     - Re-checked on checkbox `change` events, plus safety re-checks at page load, +500ms, and +2000ms.
     - Clicking a disabled/gated button (matched by DOM id, or by visible text "add to cart"/"buy it now") is intercepted at the document level (`preventDefault` + `stopImmediatePropagation`), scrolls the notice into view.
   - **Post-purchase consent stamping:** on a successful click of a wired button (after boxes are checked), waits 400ms and 1500ms then `fetch('/cart.js')`, finds the most recently added line matching `product.id`, and `POST /cart/change.js` merging these **line-item properties** onto that line: `_consent_ownership`, `_consent_no_infringement`, `_consent_terms`, `_consent_version` ("1.0"), `_consent_at` (ISO timestamp), `_consent_ua` (truncated user agent). This is how consent is captured/recorded — **not** via the standard Shopify line-item-property inputs, but via a follow-up `cart/change.js` PATCH after add-to-cart.
   - There is a commented-out (`{% comment %}`) earlier version of this same script left in the file for reference — **do not port the commented block**, only the live `<script>` below it.
8. **`separator`** — `<hr class="my-6" {{ block.shopify_attributes }}>`. A simple horizontal divider between the upload/consent stack above and the variant/purchase controls below. Trivial to port — it's a one-line case branch in `product-info.liquid`; add the `separator` block type to the 4.2 `main-product.liquid` schema if not already present.
9. `variant_picker` — `type: radio`, `color_picker_type: radio-image` (color swatches as images), `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
10. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (**no Buy-it-now/express buttons** from this block — the Buy-Now the consent script references, `#custom-checkout-button-pdp`, must come from elsewhere, e.g. a custom liquid section not present in this JSON, or the app itself; flag if not found in 4.2 and report), `show_gift_card_recipient: false`, button colors default.
11. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5` → "Receive by …" business-day estimate.
12. **`icon_text_block` (`icon-text-pdp`, inline)** — same 5 trust icons in one row (80px) as the other PDPs: `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`.
13. **`description` — `collapse_content: true`, `collapse_open: true`** — the stock description accordion, **shown and OPEN by default** (⚠️ this differs from `product.core.json`, where `description` is disabled entirely — here it's live and expanded).
14. **`collapsible_content`** — "Why Choose AirVape?" → **hardcoded HTML** (long copy, in the JSON — no metafield), **closed** by default (`collapse_open: false`). This is the *only* accordion on this template — no metafield-driven Description/Specifications/What's-in-the-box/etc. accordions like the core template has.
15. `share_button` — native share.

## 4. Content sections below the PDP — behaviors
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — Loox review carousel, **limit 10** (higher than core's 4), not aggregated.
- **video-with-text** "HOW TO — Upload your images" — subheading "HOW TO"; text: "Make sure to select the back and front skins separately from the dropdown menu and upload them both."; video `doggy_final.webm` (autoplay + loop), `image_size: media--ratio-1-1`, `image_position: left`, 50% width, text left-aligned, `remove_bottom_spacing: true`.
- **image-with-text** "Make it Personal" — `full_width: false` (narrower content-width section, not full bleed), image `CS_1.372.png`, `image_position: right`, 50% width, text left-aligned. Copy: "Upload your own image, artwork, or photo and turn it into a perfectly fitted premium skin. Printed in high definition and made to last — it's your creativity, wrapped around your device."
- **related-products** "YOU MAY ALSO LIKE" — Shopify-native automatic related-products carousel (not a manual list), 8 slots, 4-col desktop / 2-col mobile grid.
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
> This is the same PDP-specific stylesheet used by every product template (`product.core.json` included). Only the `.icon-text-block--inline` (trust-row) rules and the mobile Loox-hide rule are exercised on this template — this PDP doesn't use the `homepage-usps-info` vertical layout or the A+/comparison classes, but the file is shared, so port it as-is.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — namespace `custom`
Without these, the matching block/section is **empty**:
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `faqs` | (per product-faqs schema) | FAQS accordion |

Note: this template does **not** reference `description`, `specifications`, `what_s_in_the_box`, `how_to_use`, `parts_accessories`, `lifetime_waranty`, `product_short_videos`, `user_guide`, or the comparison metafields used by `product.core.json` — only the two above.

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `CS_1.372.png`. (Grep the JSON for `shopify://shop_images` to catch all.)
- **Videos → Content → Files:** `doggy_final.webm` (video-with-text "HOW TO"). Grep for `shopify://files/videos`.
- **Apps:**
  - **Loox** — buy-box rating app-block + the dynamic-reviews app-block. Re-add both after installing Loox; app-block IDs will differ on the new store.
  - **Mighty Image Uploader** — the buy-box upload widget (`shopify://apps/mighty-image-uploader/blocks/app-block/…`). Install the app, re-add its block in the same buy-box position (between `rich_text_block` and `customskin_checkboxes`), and confirm it still outputs `#ImageUploaderContainer` / `#picture-card-text-wrapper-id` so the consent-gate script keeps working. **If the new store uses a different upload app or a newer version with different DOM ids, the consent-gate script in `customskin-checkbox.liquid` must be updated to match — report this if the ids differ.**
- **Collections:** none directly referenced (the two carousels use automatic related-products and a manual product list, not a collection handle).
- **Products (featured-collection manual list):** `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.
- **Product setup (store-specific, not in the JSON):** the Custom Skin Studio product must carry the tag **`custom-upload`** (or the consent block silently disappears) and must have a **Buy-Now button with id `custom-checkout-button-pdp`** somewhere in `.product-info-inner` for the upload-readiness gate to apply to it — confirm this button exists in the ported theme (it isn't one of the standard `qty_btn_selector` buttons since `show_dynamic_checkout_buttons: false`); flag if it's missing.

## 8. What is hidden / disabled (quick reference to preserve)
- **Disabled sections:** none.
- **Disabled blocks:** none — every section/block in this template is live (contrast with `product.core.json`, which has several disabled sections/blocks).
- **Effectively-empty block:** `text_wBwRjk` — enabled but `content: ""`, renders nothing visible; keep it as an empty block rather than deleting.
- **CSS-hidden:** buy-box `.loox-rating` on mobile (≤767px), same shared rule as the other PDPs.
- **Accordion default states:** `description` (block 13) starts **OPEN** (`collapse_open: true`); the "Why Choose AirVape?" `collapsible_content` starts **closed**.
Keep all of the above exactly.

## 9. Report back
- Confirm the `mycustom-skin-studio` template is assigned to the Custom Skin Studio product, the product is tagged `custom-upload`, and JSON is valid.
- Confirm `customskin_checkboxes` + `separator` blocks exist in the 4.2 `main-product` schema and are ported/added; confirm `snippets/customskin-checkbox.liquid` is ported **verbatim** (including the live `<script>`, excluding the commented-out legacy version).
- Confirm the **consent-gate mechanism** matches: 3 checkboxes required to enable buttons in `.product-info-inner`; the dedicated `#custom-checkout-button-pdp` Buy-Now button additionally requires `#ImageUploaderContainer #picture-card-text-wrapper-id` to exist (i.e., an uploaded image) before it enables; consent is stamped as **line-item properties** via a `cart/change.js` PATCH ~400ms/1500ms after a successful add-to-cart, not via standard property inputs. Flag anything you couldn't reproduce (especially if the Mighty Image Uploader app's DOM ids differ on the new store, or if `#custom-checkout-button-pdp` doesn't exist in the ported theme).
- Confirm `main-product.css` loads and the buy-box Loox rating hides on mobile.
- Confirm the **sticky vertical media gallery** (50%-width column, adaptive aspect, autoplay video, fit-height) + lightbox zoom work, and the **centered sticky add-to-cart** slides in on scroll and is also covered by the consent gate.
- Confirm custom sections ported: `product-faqs`, `featured-collection`. Confirm `custom.hook_text` and `custom.faqs` metafields exist, Loox + Mighty Image Uploader installed with blocks re-added, and media/products created.

---

## FULL `templates/product.mycustom-skin-studio.json` — copy verbatim

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
        "loox_reviews_loox_rating_AdYP6a": {
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
        "text_wBwRjk": {
          "type": "text",
          "settings": {
            "content": ""
          }
        },
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e": {
          "type": "price",
          "settings": {
            "show_taxes_notice": false,
            "use_bold_font": true
          }
        },
        "rich_text_block_FkPLNA": {
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
        "mighty_image_uploader_app_block_HmDf4R": {
          "type": "shopify://apps/mighty-image-uploader/blocks/app-block/1fd42d45-f36c-4cd4-a281-183fed7894d3",
          "settings": {}
        },
        "customskin_checkboxes_iz3PMj": {
          "type": "customskin_checkboxes",
          "settings": {}
        },
        "separator_9P4Lpp": {
          "type": "separator",
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
        "qty_btn_selector_LiLmBB": {
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
        "delivery_EMfBqg": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_eygc9t": {
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
        "description_UWAqMi": {
          "type": "description",
          "settings": {
            "collapse_content": true,
            "collapse_open": true,
            "heading": "Description"
          }
        },
        "collapsible_content_mF3JHE": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "share_button_3w794W": {
          "type": "share_button",
          "settings": {}
        }
      },
      "block_order": [
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_AdYP6a",
        "text_wBwRjk",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "rich_text_block_FkPLNA",
        "mighty_image_uploader_app_block_HmDf4R",
        "customskin_checkboxes_iz3PMj",
        "separator_9P4Lpp",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "qty_btn_selector_LiLmBB",
        "delivery_EMfBqg",
        "icon_text_block_eygc9t",
        "description_UWAqMi",
        "collapsible_content_mF3JHE",
        "share_button_3w794W"
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
    "1775111980d1302f70": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_HBb9RV": {
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
        "loox_reviews_loox_dynamic_section_HBb9RV"
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
    "video_with_text_kizb7E": {
      "type": "video-with-text",
      "blocks": {
        "subheading_zPyqWg": {
          "type": "subheading",
          "settings": {
            "text": "HOW TO"
          }
        },
        "heading_q4kwTG": {
          "type": "heading",
          "settings": {
            "heading": "Upload your images",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_y7Wyxp": {
          "type": "text",
          "settings": {
            "text": "<p>Make sure to select the back and front skins separately from the dropdown menu and upload them both.</p>"
          }
        }
      },
      "block_order": [
        "subheading_zPyqWg",
        "heading_q4kwTG",
        "text_y7Wyxp"
      ],
      "name": "t:sections.video-with-text.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": true,
        "autoplay": true,
        "loop": true,
        "video": "shopify://files/videos/doggy_final.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "image_size": "media--ratio-1-1",
        "image_position": "left",
        "image_width": 50,
        "text_alignment": "text-left",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "image_with_text_njxmwc": {
      "type": "image-with-text",
      "blocks": {
        "heading_ERaQTE": {
          "type": "heading",
          "settings": {
            "heading": "Make it Personal",
            "heading_size": "h2",
            "heading_html_tag": "h2"
          }
        },
        "text_jeET9a": {
          "type": "text",
          "settings": {
            "text": "<p>Upload <strong>your own image</strong>, artwork, or photo and turn it into a perfectly fitted premium skin. Printed in high definition and made to last — it’s your creativity, wrapped around your device.<br/><br/></p>"
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
        "image": "shopify://shop_images/CS_1.372.png",
        "image_size": "",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-left",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "related_products_a4nELt": {
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
        "heading_html_tag": "h2"
      }
    },
    "featured_collection_TYF3gw": {
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
    "product_faqs_U3PEPK": {
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
    "1775111980d1302f70",
    "video_with_text_kizb7E",
    "image_with_text_njxmwc",
    "related_products_a4nELt",
    "featured_collection_TYF3gw",
    "product_faqs_U3PEPK"
  ]
}
```
