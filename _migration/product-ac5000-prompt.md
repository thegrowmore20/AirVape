# Migration Prompt — Product Template: AC5000 (`product.ac5000.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt and the **sticky-add-to-cart** prompt. This is a **core-family** product template (suffix **`ac5000`**) — structurally close to the default `product.json` template but leaner (no `specifications`/`what's in the box` accordions) plus one extra product-specific accessory block. Assign this template to the **AC5000** product in Admin.
> This documents **every section, every block, every behavior** (what shows — nothing here is hidden/disabled), references the shared custom PDP CSS, and includes the **full `product.ac5000.json`** at the bottom.

---

Recreate my **AC5000 product** page (`templates/product.ac5000.json`) so it looks and behaves identically. It's a customized `main-product` PDP (leaner buy-box, native description **open by default**, plus an Android magnetic-adapter cross-sell block) followed by Loox reviews, native product recommendations, a manual "signature models" carousel, and FAQs. Copy the JSON verbatim, port the custom snippet/section + CSS, create the metafields, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.ac5000.json` — preserve section order, exact `block_order`, and all block settings. **Nothing in this template is `disabled`** — every section and block defined renders.
2. Port `sections/main-product.liquid` and `assets/main-product.css` (shared across every PDP template in this theme — don't re-embed it if you've already ported it for another template, e.g. from the `product-core` or default `product` migration prompts). For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **metafields** (§6) — the hook text and FAQs are **empty without them**. Note this template uses **fewer metafields** than the CORE/default templates (no `custom.description`, `custom.specifications`, or `custom.what_s_in_the_box` here).
4. Re-upload the **5 trust-row icons** + the **magnetic-sticker icon** (§7), and make sure the **magnetic adapter product** exists on the new store at the exact handle referenced (§7 — this one is a hardcoded relative link, not a `shopify://` reference, so it will NOT auto-remap).
5. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (5), all enabled
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `17751104805cfd7db3` | apps (Loox) | on | "WHY DO PEOPLE LOVE AIRVAPE?" Loox dynamic reviews, limit **10** |
| 3 | `related-products` | related-products | on (stock) | "YOU MAY ALSO LIKE" — Shopify **native product recommendations** (`intent="related"`), not a manual list |
| 4 | `featured_collection_BW3pVw` | featured-collection ⚑ | on | "OUR SIGNATURE MODELS" carousel, manual product list |
| 5 | `product_faqs_V9QtqT` | product-faqs ⚑ | on | "FAQS" accordion |

**No disabled sections, blocks, or sub-blocks anywhere in this template** — verified by grepping the JSON for `"disabled"` (zero matches). If anything renders hidden after migration, that's a bug, not an intentional match. Compare against `product.core.json` (richer, has hidden content sections) or the default `product.json` (closest structural sibling) if you need reference for other PDP variants — neither applies here beyond the shared buy-box block types.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (shared across all PDP templates — full CSS documented in the `product-core` migration prompt §5; port it once). It loads `main-product.css` via `<link rel="preload" … onload swap>` + `<noscript>`, then renders `product-media` → `product-info` → `product-sticky-add-to-cart` (if enabled) → `product-rich-snippets`.
- `sections/featured-collection.liquid` (shared customized featured collection — carousel, manual product list here).
- `sections/product-faqs.liquid` (self-contained FAQ accordion driven by the `custom.faqs` metaobject-list metafield; renders empty `{% if faqs_items != blank %}` gate, so the whole section vanishes without the metafield). Custom accordion JS closes all other panels on open; emits `FAQPage` JSON-LD.
- `sections/related-products.liquid` is **stock** — it wraps Shopify's native `<product-recommendations intent="related">` web component and only renders `{% if recommendations.performed and recommendations.products_count > 0 %}`, i.e. it's populated automatically by Shopify's recommendation engine, not by a hand-picked product list. Nothing to configure beyond `products_count`/`grid_columns`.
- Buy-box block snippets (all stock, rendered by `product-info.liquid`): `title`, `price`, `rich_text_block` (used twice — hook text and the Android cross-sell block), `payment_installments`, `variant_picker` (+radio/`radio-image`), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description` (→ `product-description`), `collapsible_content` (→ `product-collapsible-content`), `share_button`.

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          → media column is 50% of page width on desktop (matches the default template, narrower than CORE's 56%)
media_size: ""                   → adaptive media aspect (NOT the fixed "1" used on the CORE template)
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: false
media_enable_video_looping: true
media_fit_height: true           → ⚠️ DIFFERS from both the CORE and default templates (both false) — media stage fits/crops to a fixed height on this product
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** with `carousel_vertical`, desktop renders a `<scroll-carousel vertical>` thumbnail rail + a `<media-carousel>` main stage; the whole **media column is sticky** (stays in view while the buy-box column scrolls). `media_zoom: lightbox` wraps it in `<media-lightbox>` so clicking a slide opens fullscreen zoom. On mobile the gallery is a swipeable carousel with a **thumbnail** indicator. The mobile product title+reviews render **above** the gallery (`product-title-reviews`, `hidden-desktop`). Don't rewrite these — they're stock; just keep the settings above, including `media_fit_height: true` which is specific to this template.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom when the main Add-to-Cart scrolls out of view, centered. Full spec in the **sticky-add-to-cart** prompt.

### 3.2 Buy-box blocks — order, behavior, what's shown
Rendered by `product-info.liquid` in this exact `block_order`. **Bold = custom/metafield-driven.** Nothing in this list is disabled.
1. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent (→ inherits default). Shows the product name.
2. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`, opens floating widget on click, shows empty-rating widget. **⚠️ Hidden on mobile inside the buy box** by `main-product.css` (`.section-main-product .product-info-inner .loox-rating { display:none }` ≤767px) — on mobile the rating shows in the `product-title-reviews` block above the gallery instead.
3. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
4. **`rich_text_block`** (`rich_text_block_ELMnPJ`) — `content: {{ product.metafields.custom.hook_text | metafield_tag }}` → the product **hook/tagline** (heading size `text-h6 md:text-h5`, left, no icon). Empty if `custom.hook_text` missing.
5. `payment_installments` — Shop Pay installments messaging.
6. `variant_picker` — `type: radio`, `color_picker_type: radio-image` (color swatches as images), `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
7. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (**no Buy-it-now/express buttons**), `show_gift_card_recipient: false`, button colors default.
8. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5` → "Receive by …" business-day estimate.
9. **`icon_text_block` (`icon-text-pdp`, inline)** — 5 trust icons in one row (80px): `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`. (Same icon set/copy as every other PDP template.)
10. **`description` — `collapse_content: true`, `collapse_open: true`.** Renders the **stock native `product.description`** in a collapsible accordion, heading "Description", **open/expanded by default**. ⚠️ **DIFFERS from both the CORE template (disabled entirely) and the default template (`collapse_open: false`, closed)** — on this product the native description shows expanded on page load.
11. **`collapsible_content`** (`collapsible_content_aLVGEM`) — heading "Why Choose AirVape?" → **hardcoded HTML** (long copy, in the JSON — no metafield; identical copy block used on the CORE and default templates). Starts **closed** (`collapse_open: false`). This is the **only** `collapsible_content` block on this template — no "Specifications" or "What's in the box" accordions, and no `custom.description`-metafield accordion (unlike the default template, which has both a native description block AND a separate metafield "Description" accordion).
12. `share_button` — native share.
13. **`rich_text_block`** (`rich_text_block_mhBAfi`) — ⚠️ **placed AFTER `share_button` in `block_order`** — preserve this exact position, don't move it up with the other rich-text blocks. Settings: `custom_icon: shopify://shop_images/magsticker2.png`, `icon_width: 64`, `heading: "For android users"`, `content: <p><a href="/products/magnetic-adapter-for-the-ac5000-power-bank" title="Magnetic adapter for the AC5000 Power bank">Click here to purchase magnetic sticker</a></p>`, `heading_size: heading text-h6 md:text-h5`, `text_alignment: text-left`. **⚠️ This link is a hardcoded relative URL (`/products/...`), not a `shopify://products/...` reference** — see §7, it will NOT auto-remap to the new store's product and will 404 if the product doesn't exist at that exact handle.

## 4. Content sections below the PDP — behaviors
- **apps (Loox dynamic)** "WHY DO PEOPLE LOVE AIRVAPE?" — Loox review carousel, `limit: 10`, not aggregated, not photos-only. (Same limit as the default template; the CORE template uses limit 4.)
- **related-products** "YOU MAY ALSO LIKE" — stock Shopify native recommendations (`intent="related"`), `products_count: 8`, `grid_columns: 4` / mobile `2`, carousel. No manual product list — populated automatically.
- **featured-collection** "OUR SIGNATURE MODELS" — carousel, `products_count: 8`, `grid_columns: 4` / mobile `2`, **manual product list** (`collection: ""`): `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`. **⚠️ Store-specific check:** per recent site history, Breathelet was removed from this store's live catalog — verify whether the Breathelet handle should still be included on the new store, or dropped, before pasting the JSON.
- **product-faqs** "FAQS" — accordion from `custom.faqs` (list-of-metaobjects). Whole section is skipped without the metafield.

## 5. `assets/main-product.css` — shared PDP CSS (reference, don't re-embed if already ported)
This is the same stylesheet documented in full in the **product-core** migration prompt (§5) — port it once, it's shared across every PDP template in this theme. The rules this template actually exercises:
- `.qty-wrap` grey pill background/radius on the quantity stepper.
- `.product-delivery-dates .caption-large` bold weight.
- `.icon-text-block--inline` (the trust-icon row layout, gap 20px desktop / grid 4-col ≤520px) and its icon/text sizing rules.
- `@media (max-width: 767px) .section-main-product .product-info-inner .loox-rating { display: none }` — hides the buy-box Loox rating on mobile (rating shows above the gallery instead).
This template does **not** use the `.icon-text-block--vertical.homepage-usps-info` rules (no vertical USP block here) or the `.aplus-data-column`/comparison rules (no comparison table on this template) — port the full shared file anyway since other templates need those rules.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — all namespace `custom`
Without these, the matching block/section is **empty**:
| Key | Type | Used by |
|---|---|---|
| `hook_text` | rich text | buy-box hook `rich_text_block` |
| `faqs` | list of metaobjects (question/answer) | product-faqs section — whole section is skipped without it |

Note: `custom.description`, `custom.specifications`, `custom.what_s_in_the_box`, `custom.how_to_use`, `custom.parts_accessories`, `custom.lifetime_waranty` (used on the CORE and/or default templates) are **not** referenced by this template at all — the "Description" shown here is the stock native `product.description`, not a metafield.

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg` (the trust-icon row, same as every PDP template), plus **`magsticker2.png`** (the Android cross-sell block's icon — unique to this template).
- **Apps:** **Loox** — the buy-box `loox_rating` app block and the `loox-dynamic-section` reviews app block (limit **10**). Re-add both blocks after installing Loox; their app-block IDs will differ on the new store.
- **Collections:** none referenced by handle — `related-products` uses Shopify's automatic recommendation engine (no collection to configure) and `featured_collection_BW3pVw` uses a manual product list, not a collection (`"collection": ""`).
- **Products (`featured_collection_BW3pVw` manual list, "OUR SIGNATURE MODELS"):** `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`. Flag the Breathelet handle per §4.
- **⚠️ Hardcoded product link (not `shopify://`, will NOT auto-remap):** the Android cross-sell block (`rich_text_block_mhBAfi`) links to `/products/magnetic-adapter-for-the-ac5000-power-bank` as a plain relative href inside its rich-text content. Confirm this exact product handle exists on the new store before go-live, or the link 404s — Shopify's theme-editor content migration only remaps `shopify://` protocol references, not raw hrefs embedded in HTML/richtext content.
- **Product media:** upload the AC5000's own gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference to preserve)
**Nothing.** Zero `"disabled"` keys anywhere in this JSON — every section and every block renders. The only "hidden" behavior is the CSS-driven one shared by every PDP template: buy-box `.loox-rating` is hidden on mobile (≤767px) because the rating already shows above the gallery on mobile via `product-title-reviews`. Keep that CSS rule; don't disable any block to "fix" it.

## 9. Report back
- Confirm the `ac5000` template is assigned to the AC5000 product; JSON valid; no `disabled` flags introduced anywhere.
- Confirm `main-product.css` loads (shared file — same as other PDP templates) and the buy-box Loox rating hides on mobile.
- Confirm the **sticky vertical media gallery** + lightbox zoom work, `media_fit_height: true` behaves correctly (crops/fits to fixed height, unlike other PDP templates), and the **centered sticky add-to-cart** slides in on scroll.
- Confirm block order is preserved exactly, especially the Android `rich_text_block` sitting **after** `share_button` at the very end of the buy box, and that the native `description` block starts **open** (`collapse_open: true`) — both intentional deviations from the other PDP templates.
- Confirm `related-products` renders via Shopify's native recommendation engine (no manual product list needed) and `featured-collection` "OUR SIGNATURE MODELS" shows the manual product list.
- Confirm `custom.hook_text` and `custom.faqs` metafields exist (else the hook and FAQs are empty/missing); Loox installed + both blocks re-added (rating + dynamic-section, limit 10); the 5 trust icons + `magsticker2.png` uploaded; the `magnetic-adapter-for-the-ac5000-power-bank` product exists at that exact handle so the hardcoded link resolves; and flag whether the Breathelet product handle should stay in the "OUR SIGNATURE MODELS" list.

---

## FULL `templates/product.ac5000.json` — copy verbatim

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
        "loox_reviews_loox_rating_xUXMdj": {
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
        "rich_text_block_ELMnPJ": {
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
        "qty_btn_selector_9g6pK4": {
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
        "delivery_WizhBj": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_q97bUb": {
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
        "description_aqMUFD": {
          "type": "description",
          "settings": {
            "collapse_content": true,
            "collapse_open": true,
            "heading": "Description"
          }
        },
        "collapsible_content_aLVGEM": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "share_button_UyzaEJ": {
          "type": "share_button",
          "settings": {}
        },
        "rich_text_block_mhBAfi": {
          "type": "rich_text_block",
          "settings": {
            "custom_icon": "shopify://shop_images/magsticker2.png",
            "icon": "",
            "icon_width": 64,
            "heading": "For android users",
            "content": "<p><a href=\"/products/magnetic-adapter-for-the-ac5000-power-bank\" title=\"Magnetic adapter for the AC5000 Power bank\">Click here to purchase magnetic sticker</a></p>",
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
        }
      },
      "block_order": [
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_xUXMdj",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "rich_text_block_ELMnPJ",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "qty_btn_selector_9g6pK4",
        "delivery_WizhBj",
        "icon_text_block_q97bUb",
        "description_aqMUFD",
        "collapsible_content_aLVGEM",
        "share_button_UyzaEJ",
        "rich_text_block_mhBAfi"
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
    "17751104805cfd7db3": {
      "type": "apps",
      "blocks": {
        "loox_reviews_loox_dynamic_section_3befHd": {
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
        "loox_reviews_loox_dynamic_section_3befHd"
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
    "related-products": {
      "type": "related-products",
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
    "featured_collection_BW3pVw": {
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
    "product_faqs_V9QtqT": {
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
    "17751104805cfd7db3",
    "related-products",
    "featured_collection_BW3pVw",
    "product_faqs_V9QtqT"
  ]
}
```
