# Migration Prompt — Product Template: AirVape OM (`product.airvape-om.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: none of the other PDP prompts are required here — this template does **not** use the customized `main-product.liquid`/`main-product.css`, the sticky-add-to-cart snippet, the image-slider block, or the pdp-aplus-comparison section. It is a **fully custom, self-contained legacy landing page** rendered by one `custom-liquid` block, plus a stock `product-faqs` section. Assign this template (suffix **`airvape-om`**) to the AirVape OM product in Admin.
> ⚠️ **Unusual page**: both `main` (main-product) and `related-products` are **disabled**. The real page content — hero, feature callouts, "does size matter", "what's so special", accessories toggle list, "in the box" tabs, and a hand-rolled variant/cap selector with its own Add-to-Cart JS — all lives inside the `custom_liquid_m9qCxF` block's HTML/CSS/JS string, followed by a stock `product-faqs` accordion. This documents that exactly, embeds the **full custom-liquid payload** (summarized + quoted, with every hardcoded CDN URL and variant ID flagged), and includes the **full `product.airvape-om.json`** at the bottom.

---

Recreate my **AirVape OM product** page (`templates/product.airvape-om.json`) so it looks and behaves identically. Unlike the other PDP templates in this store, this one does **not** rely on the theme's PDP media/buy-box UI at all — the main-product section is turned off and the entire page is a single custom-liquid landing page with its own inline `<style>`/`<script>`, followed by an FAQ accordion. Copy the JSON verbatim, port/re-upload the external CSS+JS+image assets it references, remap the hardcoded product/variant IDs, and create the FAQ metafield.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.airvape-om.json` — preserve section order, the `"disabled": true` flags on `main` and `related-products` (and on every block inside `main`), all settings, and the header comment.
2. **Do not try to "fix" or re-enable `main` or `related-products`** — they are intentionally disabled on the live store; the custom-liquid block *is* the page. Only re-enable them if the user explicitly asks for that as a follow-up change.
3. The `custom_liquid_m9qCxF` block's `custom_liquid` setting contains **hardcoded absolute CDN URLs** (images, a CSS file, a JS file) and **hardcoded numeric Shopify variant/product IDs** that all belong to the *old* store (`cdn.shopify.com/s/files/1/0777/8339/...`). None of these will resolve on the new store. You must:
   - Re-upload every referenced image/CSS/JS file to the new store's Content → Files, and
   - Re-map every hardcoded variant ID (§4.4) to the equivalent variant on the new store's AirVape OM product, and every hardcoded "accessory" product `data-id` (§4.4) to the equivalent product/variant on the new store,
   - then update the URLs/IDs inside the copied `custom_liquid` string accordingly. **Report exactly what you changed** (old → new) so it can be verified.
4. Create the **`custom.faqs` metafield** (§6) — the `product-faqs` section is empty without it.
5. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (4) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | main-product | **DISABLED** | stock buy-box blocks (title/rating/price/payment/variant-picker/qty/buy-buttons) — not rendered at all, see §2 |
| 2 | `related-products` | related-products | **DISABLED** | stock "You may also like" carousel — not rendered |
| 3 | `custom_liquid_m9qCxF` | custom-liquid | on | **the entire real page** — hero, feature icons, product diagram, "Does Size Matter?", "What's so special", Accessories toggle-list, "In the box" tabs, hand-rolled variant selector + Buy Now — see §3 |
| 4 | `product_faqs_9DCHEz` | product-faqs | on | "FAQS" accordion from `custom.faqs` metafield |

**This page renders almost nothing from the stock theme PDP.** No media gallery, no stock buy box, no sticky add-to-cart, no breadcrumbs (the custom-liquid CSS even force-hides `#MainContent .breadcrumbs`). Everything visual is inside section 3.

## 2. The disabled `main` (main-product) section — documented for completeness only
This section is present in the JSON with `"disabled": true` at the section level, **and every block inside it is individually marked `"disabled": true` too** (belt-and-suspenders — both the section and its blocks are off). It uses the **stock/default** Essence main-product block set — **not** the customized blocks seen on the other AirVape PDP templates (no Loox app-block, no metafield-driven `collapsible_content` accordions, no `icon_text_block` trust rows, no `custom_liquid` promo pill):
1. `title` (disabled) — `heading_size: h3`, mobile `h5`, transparent text color.
2. `rating` (disabled) — stock rating block, `show_empty_rating: false`, `star_size: 20`. **Not Loox** — this is the theme's native rating block.
3. `price` (disabled) — `use_bold_font: true`, `show_taxes_notice: false`.
4. `payment_installments` (disabled).
5. `variant_picker` (disabled) — `type: radio`, `color_picker_type: radio-swatch` ⚠️ (differs from CORE/om-wax-pen's `radio-image`).
6. `quantity_selector` (disabled) — stock quantity stepper (note: **not** `qty_btn_selector` — a different block type than the other templates use).
7. `buy_buttons` (disabled) — `show_dynamic_checkout_buttons: true`, `show_gift_card_recipient: true` (both **true** here, unlike the other templates' add-to-cart blocks).

Section settings (inert since disabled): `desktop_media_width: 50`, `media_layout_desktop: carousel_horizontal` ⚠️ (differs from CORE/om-wax-pen's `carousel_vertical`), `media_zoom: lightbox`, `media_fit_height: true`, `show_sticky_add_to_cart: true`, `sticky_add_to_cart_position: right` ⚠️ (differs — the other templates use `center`).

**Port this block exactly as-is (all disabled) — don't enable it, don't upgrade it to the customized block set used elsewhere.** It may be historical/legacy leftover from before this product got its custom landing page.

## 3. The disabled `related-products` section — documented for completeness only
Stock related-products carousel, `"disabled": true`. Settings: `products_count: 8`, `grid_columns: 4`, `grid_columns_mobile: 2`, heading "You may also like", carousel enabled. Not rendered. Port as-is, keep disabled.

## 4. The `custom_liquid_m9qCxF` section — the real page (summarized, with every external dependency flagged)
This is a single `custom-liquid` section/block whose `custom_liquid` setting is one long string containing a `<style>` block, several `<section>`s of hardcoded HTML, then a `<script src>` tag plus an inline `<script>` with custom JS. Section wrapper settings: `full_width: true`, no horizontal/vertical space removal.

### 4.1 The `<style>` block
A minified CSS blob (ends with `/*# sourceMappingURL=style.min.css.map */`, confirming it was pasted in from a compiled/minified source file). It:
- `@import`s Google Fonts **Rubik** (`fonts.googleapis.com/css2?family=Rubik:...`) and an external stylesheet `productToggle.css` hosted on the **old shop's CDN** (see §4.4).
- Force-hides the theme breadcrumbs: `#MainContent .breadcrumbs{display:none !important}`.
- Styles a custom `.buy-button` (bordered/outline style, `#c36f32` brand color, hover-fill, `.disabled` state).
- Lays out ~9 hand-built `<section>`s: `.first-section` (hero, full-viewport-height background image + 2 `<select>` dropdowns + a live price + Buy Now), `.om-sweet` (3-icon feature row with decorative "mustache" pseudo-elements), `.products` (exploded product diagram image + 2 labeled callouts), `.does-size-matter` (spec list + CTA), `.what-is-so-special` (copy + image), `.more-items` (2-item accessories list with toggle switches), `.in-the-box` (image) + `.in-the-box-text` (tabbed "Battery / Short-long cap / Atomizer" contents list), each with bespoke background images, decorative arrows/curves, and responsive breakpoints at `450px`.
- **Every background-image URL, and every `<img src>` in the HTML below, is an absolute link to the old store's CDN** — see §4.4 for the full list.

### 4.2 The HTML sections (in order)
1. `.first-section` — "AirVape OM / The world's first keychain vape" hero, `#color-select` (Choose color: Chrome / RoseGold / GunMetal) and `#cap-select` (Choose cap/atomizer: Long Cap / Short Cap / Atomizer-cover [hidden unless GunMetal chosen]) dropdowns, a live `.price` span (starts at `$0.00`), and a `.buy-button` "Buy Now" (disabled until both dropdowns are set).
2. `.om-sweet` — "OM, sweet OM" heading + intro paragraph + 3 icon/label pairs (Changeable Voltage / Led Indicator / Keychain size).
3. `.products` — exploded diagram image (`products111.png`) with 2 absolutely-positioned callouts: "Atomizer package" / glass mouthpiece / "Fully protected by 2 twist-off caps".
4. `.does-size-matter` — "Does Size Matter?" heading + arrow image + copy ("Don't let the appearance of the AirVape OM fool you…") + spec list (Weighs 1.6 oz / Measurements 4.5" L, .5" W / Sturdy Metal & Leather Body) + "Select options and buy" button.
5. `.what-is-so-special` — "What's so special about the Airvape OM?" heading + copy ("the OM is powerful, discreet and inexpensive… Everything connects magnetically…") + product image.
6. `.more-items` — "Accessories" mini-list: **Dual quartz Atomizer** (toggle `data-id="45764995338"`) and **Water bong With adapter** (toggle `data-id="40592123396166"`) — each with an "Add to cart" toggle switch driven by the inline JS's `productToggle.js`.
7. `.in-the-box` — box-contents image.
8. `.in-the-box-text` — "In the box:" 3-tab selector (Battery / Short/long cap / Atomizer) that swaps a description list below it, + "Select options and buy" button.

### 4.3 The inline `<script>` (after `productToggle.js` is loaded)
- Defines a hardcoded `products` array of **10 variant records** (id + name + price) covering 3 colors (chrome / rose-gold / gun-metal) × battery/long-cap/short-cap, plus one `gun-metal-atomizer` entry. See §4.4 for the exact IDs — **all belong to the old store and must be remapped**.
- A `Proxy`-based `selectedProducts` state object recalculates `.price` and enables/disables every `.buy-button` whenever the color/cap dropdowns change.
- `#color-select` change handler: reveals the "Atomizer/cover" cap option only for `gun-metal`, sets `selectedProducts.battery`/`batteryId` by looking up the hardcoded `products` array.
- `#cap-select` change handler: sets `selectedProducts.cap`/`capId` the same way.
- Each `.buy-button` click: if disabled, smooth-scrolls to top; otherwise POSTs `{ items: [{id: batteryId, quantity:1}, {id: capId, quantity:1}] }` to `/cart/add.js`, then opens the cart drawer (`.header__btn-cart` click) and manually increments the header cart-count `<span>`s (`data-js-cart-count-desktop` / `data-js-cart-count-mobile`) — **this bypasses the theme's normal cart-update event/AJAX flow entirely**, so if the new store's header markup/selectors differ, this count-bump logic will silently no-op.
- The "In the box" tab list (`.selector li[data-id]`) toggles `.active` and shows/hides the matching `.description` list (`#battery` / `#cap` / `#atomizer`).

### 4.4 Hardcoded dependencies to flag/remap (all under the old shop path `cdn.shopify.com/s/files/1/0777/8339/...`)
**External CSS/JS files (re-upload as theme assets or Files, then repoint the URLs):**
- `https://cdn.shopify.com/s/files/1/0777/8339/t/41/assets/productToggle.css`
- `https://cdn.shopify.com/s/files/1/0777/8339/t/41/assets/productToggle.js?v=8`

**Background/decorative images referenced from CSS (`url(...)`):**
- `.../t/50/assets/om-keychain-first-section-background.png?v=1693237850` (mobile hero bg, <450px)
- `.../t/50/assets/OM_product%20page_desktop2.png` (desktop hero bg, ≥450px)
- `.../t/50/assets/left-mustache.png`, `.../t/50/assets/right-mustache.png` (`.om-sweet h4` decorations)
- `.../t/50/assets/changable-voltage.png`, `.../t/50/assets/led-indicator.png`, `.../t/50/assets/keychain-size.png` (`.om-sweet` icons)
- `.../t/50/assets/curve.png` (`.what-is-so-special h4::after`)
- `.../t/50/assets/om-down-arrow.png?v=1694115886` (`.in-the-box-text ul.with-arrow::after`)

**`<img src>` images in the HTML body:**
- `.../t/50/assets/products111.png`
- `.../t/50/assets/glass-mouthpiece.png`
- `.../t/50/assets/twist-off-caps.png`
- `.../t/50/assets/does-size-matter-with-arrow.png`
- `.../t/50/assets/oms-cropped.png`
- `.../files/Atomizer_quartz111.png`
- `.../files/Bubbler_adapter111.png`
- `.../t/50/assets/om-in-the-box.png`

**Hardcoded numeric variant IDs in the `products` JS array (old store only — must be remapped to the new store's AirVape OM variants):**
| id | name | price |
|---|---|---|
| `40414016241734` | chrome-battery | $13.00 |
| `40414029807686` | chrome-long-cap | $6.99 |
| `40414031249478` | chrome-short-cap | $6.99 |
| `40414016208966` | rose-gold-battery | $23.00 |
| `40414029774918` | rose-gold-long-cap | $6.99 |
| `40414031216710` | rose-gold-short-cap | $6.99 |
| `40414016176198` | gun-metal-battery | $23.00 |
| `40414029742150` | gun-metal-long-cap | $6.99 |
| `40414031183942` | gun-metal-short-cap | $6.99 |
| `40414050779206` | gun-metal-atomizer | $21.99 |

**Hardcoded `data-id` toggle IDs in the Accessories section (old store product/variant IDs — must be remapped):**
- `45764995338` — "Dual quartz Atomizer" toggle
- `40592123396166` — "Water bong With adapter" toggle

**Note the prices above are hardcoded in JS, independent of Shopify's actual variant prices** — if prices changed on the old store since this was written, the JS total shown to the customer could already have been stale; carry the values over as-is unless told otherwise, and flag this to the user.

## 5. What is hidden / disabled (quick reference to preserve)
- **`main` (main-product) — entire section disabled**, plus every block inside it individually disabled (title, rating, price, payment_installments, variant_picker, quantity_selector, buy_buttons). This is the stock/default block set, not the customized one used by other AirVape PDP templates — port it verbatim but keep it off.
- **`related-products` — entire section disabled** ("You may also like" stock carousel).
- Theme breadcrumbs are force-hidden via CSS (`#MainContent .breadcrumbs{display:none !important}`) inside the custom-liquid block, independent of the `show_breadcrumbs` setting on the disabled `main` section.
- Everything else (hero, feature sections, accessories, in-the-box tabs, FAQs) is **on** and is the actual page.
Keep all of the above exactly.

## 6. Metafields to create (Admin → Settings → Custom data → Products)
| Key | Type | Used by |
|---|---|---|
| `custom.faqs` | (per product-faqs schema) | "FAQS" accordion (`product_faqs_9DCHEz`) — empty without it |

No other metafields are needed for this template — the disabled `main` section's blocks aren't metafield-driven (they're all stock/native blocks), and the entire visible page is hardcoded HTML/JS in the custom-liquid block, not metafield-sourced.

## 7. Media, apps, collections, products
- **Files to re-upload** (Content → Files or theme assets, then repoint URLs in the copied `custom_liquid` string): the 2 external CSS/JS files and the 15 images listed in §4.4.
- **Apps:** none used by this template (no Loox blocks — the disabled `main`/`rating` block is the stock native rating, not an app block).
- **Collections:** none referenced.
- **Products/variants:** the AirVape OM product itself, with variants covering the 3 colors × battery/caps combos referenced in §4.4's `products` array, plus the 2 accessory products/variants referenced by the toggle `data-id`s. Confirm the new store's variant IDs and remap them into the copied JS.
- **Header markup dependency:** the "Buy Now" JS assumes selectors `.header__btn-cart`, `[data-js-cart-count-desktop]`, `[data-js-cart-count-mobile]` exist in the new theme's header — verify these match Essence 4.2's header markup, or the cart-drawer-open/count-bump behavior will silently fail even though the actual `/cart/add.js` call still succeeds.

## 8. Diff against 4.2 / report back
- Confirm the `airvape-om` template is assigned to the correct product; JSON is valid; `main` and `related-products` remain disabled (section-level **and** every block inside `main`); `product_faqs_9DCHEz` and `custom_liquid_m9qCxF` remain enabled.
- Confirm `custom.faqs` metafield exists and the FAQ accordion renders.
- Confirm every file in §4.4 has been re-uploaded and every URL inside the copied `custom_liquid` string now points at the **new** store instead of `cdn.shopify.com/s/files/1/0777/8339/...`. List old → new for each.
- Confirm every hardcoded variant ID in the `products` JS array (§4.4 table) and every accessory toggle `data-id` has been remapped to the new store's real variant/product IDs — **report the old → new mapping used**.
- Confirm the header selectors (`.header__btn-cart`, cart-count spans) exist in the 4.2 header, or flag the mismatch.
- Confirm the color/cap dropdown → price → Buy Now flow, the Accessories add-to-cart toggles, and the "In the box" tab switcher all still work after the ID remap — this page's checkout path is entirely custom JS hitting `/cart/add.js` directly, not the theme's standard product form, so it needs manual testing rather than assuming it "just works" because the JSON is correct.

---

## FULL `templates/product.airvape-om.json` — copy verbatim

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
          "disabled": true,
          "settings": {
            "heading_size": "h3",
            "mobile_heading_size": "h5",
            "content": "{{ product.title }}",
            "text_color": "rgba(0,0,0,0)"
          }
        },
        "946375dc-aa95-407e-a9cd-35be355f8dc4": {
          "type": "rating",
          "disabled": true,
          "settings": {
            "show_empty_rating": false,
            "star_size": 20
          }
        },
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e": {
          "type": "price",
          "disabled": true,
          "settings": {
            "show_taxes_notice": false,
            "use_bold_font": true
          }
        },
        "4923f5c8-62d3-42db-a835-6e0613c4a182": {
          "type": "payment_installments",
          "disabled": true,
          "settings": {}
        },
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f": {
          "type": "variant_picker",
          "disabled": true,
          "settings": {
            "hide_sold_out_variants": false,
            "type": "radio",
            "color_picker_type": "radio-swatch",
            "block_style_rounded": true,
            "block_style": "outlined",
            "size_chart_page": "",
            "size_chart_option_name": "Size"
          }
        },
        "0f473fb4-422c-40a7-8c15-2fd164440f80": {
          "type": "quantity_selector",
          "disabled": true,
          "settings": {}
        },
        "a730fe0e-baa3-47bc-90c9-21c5a5d75f2d": {
          "type": "buy_buttons",
          "disabled": true,
          "settings": {
            "show_dynamic_checkout_buttons": true,
            "show_gift_card_recipient": true,
            "add_to_cart_background_color": "rgba(0,0,0,0)",
            "add_to_cart_text_color": "rgba(0,0,0,0)",
            "buy_it_now_background_color": "rgba(0,0,0,0)",
            "buy_it_now_text_color": "rgba(0,0,0,0)"
          }
        }
      },
      "block_order": [
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "946375dc-aa95-407e-a9cd-35be355f8dc4",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "0f473fb4-422c-40a7-8c15-2fd164440f80",
        "a730fe0e-baa3-47bc-90c9-21c5a5d75f2d"
      ],
      "disabled": true,
      "settings": {
        "show_breadcrumbs": false,
        "desktop_media_width": 50,
        "media_size": "",
        "media_layout_desktop": "carousel_horizontal",
        "media_mobile_indicator": "thumbnails",
        "media_zoom": "lightbox",
        "media_enable_video_autoplay": false,
        "media_enable_video_looping": true,
        "media_fit_height": true,
        "show_sticky_add_to_cart": true,
        "sticky_add_to_cart_position": "right",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "",
        "heading_color": ""
      }
    },
    "related-products": {
      "type": "related-products",
      "disabled": true,
      "settings": {
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "subheading": "",
        "heading": "You may also like",
        "heading_size": "h2",
        "content": "",
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": "",
        "heading_html_tag": "p"
      }
    },
    "custom_liquid_m9qCxF": {
      "type": "custom-liquid",
      "settings": {
        "full_width": true,
        "remove_horizontal_space": false,
        "remove_vertical_space": false,
        "custom_liquid": "<style>\n@import\"https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap\";@import\"https://cdn.shopify.com/s/files/1/0777/8339/t/41/assets/productToggle.css\";#MainContent .breadcrumbs{display:none !important}.hidden{display:none !important}.buy-button{background:rgba(0,0,0,0);border:1px solid #c36f32;padding:5px 10px;color:#c36f32;text-transform:uppercase;font-weight:500;font-size:18px;font-family:\"Rubik\";cursor:pointer}.buy-button:hover{background:#c36f32;color:#f2ebe2}.buy-button.disabled{opacity:.6;cursor:not-allowed}section{font-family:\"Rubik\";padding:0 10px;overflow-x:hidden;display:flex;flex-direction:column;align-items:center}section .content-container{max-width:500px}section *{line-height:1.5}select{background:rgba(255,255,255,.2);color:#714f4a;padding:5px;overflow-x:hidden}ul{list-style:none !important;padding:0 !important}ul li::before{content:none !important;padding:0 !important}.first-section{background:url(https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/om-keychain-first-section-background.png?v=1693237850) no-repeat;background-size:cover;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;position:relative;box-shadow:inset 0 0 0 1000px rgba(242,235,226,.4)}@media screen and (min-width: 450px){.first-section{background:url(https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/OM_product%20page_desktop2.png) no-repeat;background-size:cover}}.first-section h1{font-weight:400;color:#714f4a;font-size:40px;text-align:center;margin-bottom:30px}.first-section h2{font-weight:400;color:#c36f32;font-size:50px;text-align:center;margin-bottom:30px}.first-section h2 strong{text-transform:uppercase}.first-section .content-container{display:flex;flex-direction:column;align-items:center;position:relative;padding:30px 0;margin-top:45vh}@media screen and (min-width: 450px){.first-section .content-container{margin-top:20vh}}.first-section .content-container *{z-index:10}.first-section .content-container::before{content:\"\";box-shadow:inset 0 0 0 1000px rgba(242,235,226,.4);width:calc(100% + 20px);height:100%;position:absolute;top:0;left:-10px}.first-section .content-container select{margin:5px 0}@media screen and (max-width: 450px){.first-section .content-container select{width:50vw}}.first-section .content-container .buy-container{margin-top:30px;display:flex;align-items:center}.first-section .content-container .buy-container .price{color:#714f4a;font-size:18px;margin-right:30px}.om-sweet{background:#ebe3db;padding:30px 10px}.om-sweet h4{text-align:center;font-size:35px;font-weight:bold;color:#000;position:relative;display:block}.om-sweet h4:before{content:\"\";background:url(https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/left-mustache.png);background-size:contain;background-repeat:no-repeat;width:50px;height:50px;display:block;position:absolute;left:-50px;top:50%;transform:translateY(-50%)}.om-sweet h4:after{content:\"\";background:url(https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/right-mustache.png);background-size:contain;background-repeat:no-repeat;width:50px;height:50px;display:block;position:absolute;right:-65px;top:50%;transform:translateY(-50%)}.om-sweet p{text-align:center;margin-top:30px;color:#000;font-size:16px;font-family:\"Rubik\";font-weight:500}.om-sweet ul{display:flex;align-items:center;justify-content:center;margin-top:30px}.om-sweet ul li{margin:0 20px;display:flex;flex-direction:column;align-items:center}.om-sweet ul li .icon{width:40px;height:40px;margin-bottom:10px}.om-sweet ul li .icon.voltage{background:url(https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/changable-voltage.png) no-repeat center center;background-size:contain}.om-sweet ul li .icon.led{background:url(https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/led-indicator.png) no-repeat center center;background-size:contain}.om-sweet ul li .icon.key-chain{background:url(https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/keychain-size.png) no-repeat center center;background-size:contain}.om-sweet ul li span{color:#c36f32;font-weight:bold;text-transform:uppercase;font-size:12px;text-align:center}.products{padding:30px 10px;background:#f2ebe2;display:flex;align-items:center;flex-direction:column}.products img{max-width:100%;position:relative;z-index:10}.products .product-container{background:#d9e1eb;margin-top:-60px;width:100%;height:400px;position:relative}@media screen and (min-width: 450px){.products .product-container{width:490px}}.products .product-container .atomizer-label{color:#687c95;font-size:18px;text-transform:uppercase;text-align:center;position:absolute;right:10px;top:80px;font-weight:bold}.products .product-container .mouthpiece{position:absolute;top:-30px;left:10px;width:100px}.products .product-container .mouthpiece span{text-transform:uppercase;font-weight:bold;font-size:16px}.products .product-container .mouthpiece img{width:100%}.products .product-container .twist-off{position:absolute;bottom:-30px;right:-10px;width:150px}.products .product-container .twist-off span{text-transform:uppercase;font-weight:bold;font-size:16px;position:absolute;right:100px;top:40%;width:180px}.products .product-container .twist-off img{width:100%}.does-size-matter{padding:300px 10px 80px 10px;background:#f2ebe2;position:relative}.does-size-matter img{max-width:100%}@media screen and (max-width: 450px){.does-size-matter img{position:absolute;top:0;right:-10px}}.does-size-matter .title-container{display:flex;align-items:center;justify-content:center;margin-top:-40px}.does-size-matter .title-container h4{font-size:35px;font-weight:bold;text-align:left;line-height:1}.does-size-matter p{text-align:center;margin:30px 0;font-weight:400;font-size:16px}.does-size-matter ul{margin:30px 0}.does-size-matter ul li{font-weight:300;font-size:14;text-align:center;margin:15px 0}.does-size-matter .button-container{display:flex;justify-content:center}.what-is-so-special{padding:50px 10px;background:#ebe3db}.what-is-so-special h4{font-size:35px;font-weight:bold;text-align:center;position:relative;margin-bottom:80px}.what-is-so-special h4::after{content:\"\";background:url(https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/curve.png) no-repeat center center;background-size:contain;position:absolute;bottom:-70px;left:50%;transform:translateX(-50%);width:90px;height:90px;display:block}.what-is-so-special p{text-align:center;margin:30px 0;line-height:2;font-weight:300}.what-is-so-special .image-container{display:flex;align-items:center;justify-content:center;margin:30px 0}.what-is-so-special .image-container img{width:200px;max-width:100%}.more-items{background:#ecf2e4 !important;padding-top:50px !important;padding-bottom:150px !important}.more-items h4{color:#9ba789}.more-items .items{background:rgba(0,0,0,0) !important;box-shadow:none !important}.more-items .items .item{margin:30px 0 !important}.more-items .items .item img{width:130px !important;margin-right:30px}.more-items .items .item .title{text-align:left !important;margin:0 !important;font-weight:bold}.more-items .items .item .toggle-container{display:flex;align-items:center;margin-top:10px}.more-items .items .item .toggle-container .add-to-cart{color:#9ba789;font-size:12px}.more-items .items .item .toggle-container .toggle{margin-right:10px}.in-the-box{padding:50px 10px;background:#f2ebe2;position:relative}.in-the-box::after{content:\"\";background:#fff;width:100%;height:200px;position:absolute;bottom:0;left:0;z-index:10}.in-the-box .content-container img{max-width:100%;position:relative;z-index:20}.in-the-box-text{background:#fff;padding:100px 0;margin-top:-50px}.in-the-box-text .content-container{overflow-x:hidden;width:100%}.in-the-box-text .content-container h4{font-size:20px;font-weight:bold;margin-bottom:30px;margin-left:50px}.in-the-box-text .content-container ul{border-bottom:1px solid #707070;width:100%;margin-left:50px;padding-bottom:30px}.in-the-box-text .content-container ul.with-arrow{position:relative}.in-the-box-text .content-container ul.with-arrow::after{content:\"\";background:url(https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/om-down-arrow.png?v=1694115886) no-repeat center center;background-size:contain;height:80px;width:50px;display:block;position:absolute;left:-50px;bottom:-40px}.in-the-box-text .content-container ul li{font-size:20px;font-weight:bold;margin:15px 0}.in-the-box-text .content-container ul li span{position:relative;z-index:10}.in-the-box-text .content-container ul li.active{position:relative;color:#fff}.in-the-box-text .content-container ul li.active::before{content:\"\" !important;background:#be9694;width:110%;height:100%;position:absolute;left:-50px;top:0;border-radius:0 !important}.in-the-box-text .content-container ul.thin{padding-top:30px;border-bottom:none}.in-the-box-text .content-container ul.thin li{font-weight:300}.in-the-box-text .content-container .button-container{display:flex;align-items:center;justify-content:center}/*# sourceMappingURL=style.min.css.map */\n</style>\n\n<section class=\"first-section\">\n    <div class=\"content-container\">\n        <h1>AirVape <strong>OM</strong></h1>\n        <h2>The world’s first<br>\n            <strong>\n                keychain<br>\n                vape\n            </strong>\n        </h2>\n        <select name=\"\" id=\"color-select\">\n            <option value=\"\">Choose color</option>\n            <option value=\"chrome\">Chrome</option>\n            <option value=\"rose-gold\">RoseGold</option>\n            <option value=\"gun-metal\">GunMetal</option>\n        </select>\n        <select name=\"\" id=\"cap-select\">\n            <option value=\"\">Choose cap/atomizer</option>\n            <option value=\"long-cap\">Long Cap</option>\n            <option value=\"short-cap\">Short Cap</option>\n            <option class=\"hidden\" value=\"atomizer\">Atomizer/cover</option>\n        </select>\n        <div class=\"buy-container\">\n            <span class=\"price\">$0.00</span>\n            <button class=\"buy-button\">Buy Now</button>\n        </div>\n    </div>\n</section>\n<section class=\"om-sweet\">\n    <h4>OM, sweet OM</h4>\n    <p>\n        The most innovative oil/concentrate vaporizer enjoyed such popularity, we thought it well deserved an\n        upgrade and a fresh new look.\n    </p>\n    <ul class=\"icons\">\n        <li>\n            <div class=\"icon voltage\"></div>\n            <span>\n                Changeable<br>\n                Voltage\n            </span>\n        </li>\n        <li>\n            <div class=\"icon led\"></div>\n            <span>\n                Led<br>\n                Indicator\n            </span>\n        </li>\n        <li>\n            <div class=\"icon key-chain\"></div>\n            <span>\n                Keychain<br>\n                size\n            </span>\n        </li>\n    </ul>\n</section>\n<section class=\"products\">\n    <img src=\"https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/products111.png\" alt=\"\">\n    <div class=\"product-container\">\n        <span class=\"atomizer-label\">Atomizer<br> package</span>\n        <div class=\"mouthpiece\">\n            <img src=\"https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/glass-mouthpiece.png\" alt=\"\">\n            <span>Glass<br>mouthpiece</span>\n        </div>\n\n        <div class=\"twist-off\">\n            <img src=\"https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/twist-off-caps.png\" alt=\"\">\n            <span>Fully protected by <br>2 twist-off caps</span>\n        </div>\n    </div>\n</section>\n<section class=\"does-size-matter\">\n    <div class=\"content-container\">\n        <img src=\"https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/does-size-matter-with-arrow.png\" alt=\"\" />\n        <div class=\"title-container\">\n            <h4>Does Size<br> Matter?</h4>\n        </div>\n        <p>\n            Don’t let the appearance of the AirVape OM fool you, it might look like a keychain and well, it is a\n            keychain, but nonetheless it is a lean, mean vaping machine that hits like a dream yet is discreet as a\n            whisper.\n        </p>\n        <ul>\n            <li>Weighs 1.6 oz</li>\n            <li>Measurements: 4.5” L, .5” W</li>\n            <li>Sturdy Metal & Leather Body</li>\n        </ul>\n        <div class=\"button-container\">\n            <button class=\"buy-button\">Select options and buy</button>\n        </div>\n    </div>\n</section>\n<section class=\"what-is-so-special\">\n    <div class=\"content-container\">\n        <h4>What’s so special about the Airvape OM?</h4>\n        <p>\n            <strong>\n                The quick answer is this: the OM is powerful, discreet and inexpensive! Want to hear the best part?\n            </strong>\n        </p>\n        <p>\n            <strong>Everything connects magnetically.</strong>\n        </p>\n        <div class=\"image-container\">\n            <img src=\"https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/oms-cropped.png\" alt=\"\">\n        </div>\n        <p>\n            Super Easy USB charging with the OM magnetic\n            charger adapter YOU just SNAP and PLUG.\n        </p>\n        <p>\n            The perfect companion for your on-the-go\n            experience, AirVape OM comes with elegant leather\n            or carbon fiber finish.\n        </p>\n        <p>\n            User Friendly: with the the click of just one button you\n            can Power ON or OFF or choose your preferred voltage\n            settings, guided by a tactful little led indicator.\n        </p>\n        <p>\n            The 3 interchangeable caps allow you to use\n            different size cartridges whilst keeping your unit\n            sleek, elegant and protected.\n        </p>\n    </div>\n</section>\n<section class=\"more-items\">\n    <div class=\"items\">\n        <h4>Accessories</h4>\n        <div class=\"item\">\n            <img src=\"https://cdn.shopify.com/s/files/1/0777/8339/files/Atomizer_quartz111.png\" alt=\"\">\n            <div>\n                <span class=\"title\">Dual quartz<br>Atomizer</span>\n                <div class=\"toggle-container\">\n                    <div class=\"toggle\" data-id=\"45764995338\">\n                        <span class=\"point\"></span>\n                    </div>\n                    <span class=\"add-to-cart\">Add to cart</span>\n                </div>\n            </div>\n        </div>\n        <div class=\"item\">\n            <img src=\"https://cdn.shopify.com/s/files/1/0777/8339/files/Bubbler_adapter111.png\" alt=\"\">\n            <div>\n                <span class=\"title\">Water bong<br>With adapter</span>\n                <div class=\"toggle-container\">\n                    <div class=\"toggle\" data-id=\"40592123396166\">\n                        <span class=\"point\"></span>\n                    </div>\n                    <span class=\"add-to-cart\">Add to cart</span>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n<section class=\"in-the-box\">\n    <div class=\"content-container\">\n        <img src=\"https://cdn.shopify.com/s/files/1/0777/8339/t/50/assets/om-in-the-box.png\" alt=\"\">\n    </div>\n</section>\n<section class=\"in-the-box-text\">\n    <div class=\"content-container\">\n        <h4>In the box:</h4>\n        <ul class=\"with-arrow selector\">\n            <li class=\"active\" data-id=\"battery\"><span>Battery</span></li>\n            <li data-id=\"cap\"><span>Short/long cap</span></li>\n            <li data-id=\"atomizer\"><span>Atomizer</span></li>\n        </ul>\n        <ul class=\"thin description\" id=\"battery\">\n            <li>\n                OM Battery\n            </li>\n            <li>\n                USB Charger\n            </li>\n        </ul>\n        <ul class=\"thin description hidden\" id=\"cap\">\n            <li>\n                Short or Long Cover cap\n            </li>\n        </ul>\n        <ul class=\"thin description hidden\" id=\"atomizer\">\n            <li>\n                Quartz Atomizer\n            </li>\n            <li>\n                Cover cap\n            </li>\n            <li>\n                Mouthpiece cap\n            </li>\n        </ul>\n        <div class=\"button-container\">\n            <button class=\"buy-button\">Select options and buy</button>\n        </div>\n    </div>\n</section>\n<script src=\"https://cdn.shopify.com/s/files/1/0777/8339/t/41/assets/productToggle.js?v=8\"></script>\n\n<script>\n    const products = [\n        {\n            id: 40414016241734,\n            name: 'chrome-battery',\n            price: 13.00,\n        },\n        {\n            id: 40414029807686,\n            name: 'chrome-long-cap',\n            price: 6.99,\n        },\n        {\n            id: 40414031249478,\n            name: 'chrome-short-cap',\n            price: 6.99,\n        },\n        {\n            id: 40414016208966,\n            name: 'rose-gold-battery',\n            price: 23.00,\n        },\n        {\n            id: 40414029774918,\n            name: 'rose-gold-long-cap',\n            price: 6.99,\n        },\n        {\n            id: 40414031216710,\n            name: 'rose-gold-short-cap',\n            price: 6.99,\n        },\n        {\n            id: 40414016176198,\n            name: 'gun-metal-battery',\n            price: 23.00,\n        },\n        {\n            id: 40414029742150,\n            name: 'gun-metal-long-cap',\n            price: 6.99,\n        },\n        {\n            id: 40414031183942,\n            name: 'gun-metal-short-cap',\n            price: 6.99,\n        },\n        {\n            id: 40414050779206,\n            name: 'gun-metal-atomizer',\n            price: 21.99,\n        },\n    ];\n\n    const selectedProducts = new Proxy({\n        battery: '',\n        batteryId: '',\n        cap: '',\n        capId: '',\n    }, {\n        set: (obj, name, value) => {\n            obj[name] = value;\n\n            calculatePrice();\n\n            return true;\n        }\n    });\n\n    function calculatePrice() {\n        const battery = products.find((item) => item.name === selectedProducts.battery + '-battery')?.price ?? 0;\n        const cap = products.find((item) => item.name === selectedProducts.battery + '-' + selectedProducts.cap)?.price ?? 0;\n\n        document.querySelector('.buy-container .price').innerHTML = '$' + parseFloat(Number.parseFloat(battery) + Number.parseFloat(cap)).toFixed(2);\n\n        enableOrDisableBuyButtons();\n    }\n\n    enableOrDisableBuyButtons();\n\n    function enableOrDisableBuyButtons() {\n        document.querySelectorAll('.buy-button').forEach(button => {\n            if (selectedProducts.battery === '' || selectedProducts.cap === '') {\n                button.classList.add('disabled');\n            } else {\n                button.classList.remove('disabled');\n            }\n        });\n    }\n\n    // In the box toggle\n    document.querySelectorAll('.in-the-box-text .selector li').forEach((element) => {\n        element.addEventListener('click', function () {\n            const id = this.getAttribute('data-id');\n\n            document.querySelectorAll('.in-the-box-text .selector li').forEach((item) => item.classList.remove('active'));\n\n            this.classList.add('active');\n\n            document.querySelectorAll('.in-the-box-text .description').forEach((description) => description.classList.add('hidden'));\n\n            document.getElementById(id)?.classList.remove('hidden');\n        });\n    });\n\n    // Color select \n    document.getElementById('color-select').addEventListener('change', function () {\n        if (this.value === 'gun-metal') {\n            document.querySelector('#cap-select option[value=\"atomizer\"]').classList.remove('hidden');\n        } else {\n            document.querySelector('#cap-select option[value=\"atomizer\"]').classList.add('hidden');\n        }\n\n        selectedProducts.battery = this.value;\n        selectedProducts.batteryId = products.find(item => item.name === this.value + '-battery')?.id ?? '';\n    });\n\n    // Cap select \n    document.getElementById('cap-select').addEventListener('change', function () {\n        selectedProducts.cap = this.value;\n        selectedProducts.capId = products.find(item => item.name === selectedProducts.battery + '-' + this.value)?.id ?? '';\n    });\n\n    // Buy button\n    document.querySelectorAll('.buy-button').forEach(button => {\n        button.addEventListener('click', function () {\n            if (this.classList.contains('disabled')) {\n                window.scroll({\n                    top: 0,\n                    left: 0,\n                    behavior: 'smooth',\n                });\n\n                return;\n            }\n\n            addProductsToCart([\n                {\n                    id: selectedProducts.batteryId,\n                    quantity: 1\n                },\n                {\n                    id: selectedProducts.capId,\n                    quantity: 1\n                }\n            ]);\n        });\n    });\n\n    function openCart() {\n        document.querySelector('.header__btn-cart').click();\n    }\n\n    function updateItemsCount(add = false) {\n        if (add) {\n            document.querySelectorAll('.header__btn-cart span').forEach(span => {\n                if (span.hasAttribute('data-js-cart-count-desktop')) {\n                    let current = span.getAttribute('data-js-cart-count-desktop');\n                    span.setAttribute('data-js-cart-count-desktop', parseInt(current) + 1);\n                    span.innerHTML = `Bag (${parseInt(current) + 1})`;\n                }\n\n                if (span.hasAttribute('data-js-cart-count-mobile')) {\n                    let current = span.getAttribute('data-js-cart-count-mobile');\n                    span.setAttribute('data-js-cart-count-mobile', parseInt(current) + 1);\n                    span.innerHTML = `${parseInt(current) + 1}`;\n                }\n            });\n        } else {\n            document.querySelectorAll('.header__btn-cart span').forEach(span => {\n                if (span.hasAttribute('data-js-cart-count-desktop')) {\n                    let current = span.getAttribute('data-js-cart-count-desktop');\n                    span.setAttribute('data-js-cart-count-desktop', parseInt(current) - 1);\n                    span.innerHTML = `Bag (${parseInt(current) - 1})`;\n                }\n\n                if (span.hasAttribute('data-js-cart-count-mobile')) {\n                    let current = span.getAttribute('data-js-cart-count-mobile');\n                    span.setAttribute('data-js-cart-count-mobile', parseInt(current) - 1);\n                    span.innerHTML = `${parseInt(current) - 1}`;\n                }\n            });\n        }\n    }\n\n    function addProductsToCart(items) {\n        const request = JSON.stringify({\n            items: items\n        });\n\n        fetch('/cart/add.js', {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json'\n            },\n            body: request,\n        }).then(response => response.json())\n            .then(data => {\n                openCart();\n                updateItemsCount(true);\n            });\n    }\n\n</script>",
        "background_color": "",
        "text_color": ""
      }
    },
    "product_faqs_9DCHEz": {
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
    "related-products",
    "custom_liquid_m9qCxF",
    "product_faqs_9DCHEz"
  ]
}
```
