# Migration Prompt — Product Template: Legacy PRO (`product.legacy-pro.json`) — FULL / EXHAUSTIVE

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisites: the **product-card/featured-collection** prompt and the **sticky-add-to-cart** prompt (this template does **not** use the image-slider `ai_gen_block_657f32b`, so that prompt is not required here). Assign this template (suffix **`legacy-pro`**) to the Legacy PRO product in Admin.
> This documents **every section, every block, every behavior**. Unlike the CORE and PRO 2 templates, **nothing in this template is disabled** and it does **not** use any product metafields except the FAQs. It embeds the **custom PDP CSS** verbatim (shared file — already ported if you did CORE/PRO 2), and includes the **full `product.legacy-pro.json`** at the bottom.

---

Recreate my **Legacy PRO product** page (`templates/product.legacy-pro.json`) so it looks and behaves identically. It's a leaner, older `main-product` PDP (no hook text, no metafield-driven accordions, no comparison table, no shorts carousel, no user-guide slider) followed by a live hero video section, a 3-icon feature row, an image-with-text block, two featured-collection carousels, a **live 3-slide image slideshow**, a stock "related products" section, and FAQs. Copy the JSON verbatim, confirm the shared custom snippets/CSS are already ported, and re-upload media.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/product.legacy-pro.json` — preserve section order, all block settings, and the header comment. **There are no `"disabled": true` flags anywhere in this file — do not add any.**
2. Confirm `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5) are already ported — this is the **exact same shared file** used by CORE and PRO 2. Do not create a second copy. For any block/setting that doesn't exist in 4.2, **skip it and report** — don't invent.
3. Create the **`custom.faqs` metafield** (§6) if not already created for CORE/PRO 2 — the FAQs section is **empty without it**. This template needs **no other metafields**.
4. Re-upload **images/video** (§7) and assign the **`legacy-pro`** template to the Legacy PRO product.
5. **⚠️ Read §7's image-dependency note carefully** — despite this migration batch following a commit titled "upgraded the legacy pro image," that commit actually touched `product.pro-2-_po.json` (the **Legacy PRO 2** template), not this file. This template's `image-with-text` image (`HandPro_9f95193d-5245-47ca-b929-ece49dd83689.png`) is **unchanged**. Don't confuse the two — re-upload the correct file for **this** template.
6. Keep valid JSON; run a validity check and report.

## 1. Page structure — section order (9) + state
| # | Section | Type | State | What it is |
|---|---|---|---|---|
| 1 | `main` | **main-product** ⚑ | on | the PDP (media gallery + buy box + sticky ATC) — §3 |
| 2 | `video_with_text_overlay_DTHfhk` | video-with-text-overlay | **on (live)** | "Pure Bliss with Every Puff" hero video |
| 3 | `text_with_icons_tqLMpf` | text-with-icons | on | 3 feature columns (Updated Heating, Industry Leading, Easy to Clean) |
| 4 | `image_with_text_76bibF` | image-with-text | on | "Herb to Wax / Beginner to PRO" |
| 5 | `featured_collection_kWtgdc` | featured-collection ⚑ | on | "Legacy PRO Accessories" carousel |
| 6 | `slideshow_ygAcAw` | slideshow | **on (live)** | 3-slide **image** slideshow ("Simply Elegant / Effortless / PRO") |
| 7 | `related-products` | **related-products** (stock) | on | "YOU MAY ALSO LIKE" — Shopify's native product-recommendations engine |
| 8 | `featured_collection_AJbw8X` | featured-collection ⚑ | on | "OUR SIGNATURE MODELS" carousel |
| 9 | `product_faqs_EDQHrJ` | product-faqs ⚑ | on | "FAQS" accordion |

**⚠️ Every section above is enabled.** There is no `"disabled": true` anywhere in this template's JSON — no hidden slideshow, no hidden video, no hidden buy-box blocks. This is a meaningful difference from the CORE and PRO 2 templates, both of which hide one or more video sections behind an enabled image fallback. Here, `video_with_text_overlay_DTHfhk` (a hero video) and `slideshow_ygAcAw` (an image slideshow) are **both genuinely live and rendered**.

## 2. Custom files to port (⚑) — verify each exists in 4.2, port mine where different
- `sections/main-product.liquid` + **`assets/main-product.css`** (embedded §5) — **identical, shared file** with CORE and PRO 2. If you've already ported it for either of those templates, nothing new to do here.
- `sections/featured-collection.liquid` (shared customized featured collection) — used **twice** (`legacy-accessories` carousel + signature-models carousel).
- `sections/product-faqs.liquid` (FAQ accordion; sources `product.metafields.custom.faqs.value` internally — not passed as a JSON setting, so it won't show up if you grep this template's JSON for "metafield").
- **No** `custom-section`, `product-meta-shorts`, `ai_gen_block_657f32b`, `pdp-aplus-comparison`, or Loox `apps` block on this template — do **not** port/wire those up here; they belong to CORE/PRO 2 only.
- **Stock section types used here — verify they exist in 4.2:** `video-with-text-overlay`, `text-with-icons`, `image-with-text`, `slideshow`, **`related-products`** (renders `<product-recommendations intent="related">` off `product.recommendations` — Shopify's native engine, not a manual product list — confirm the 4.2 theme still ships this section type and snippet).
- Buy-box block snippets (all stock, rendered by `product-info.liquid`): `title`, `loox_rating` (Loox app block), `price`, `payment_installments`, `variant_picker`(+radio/`radio-image`), `qty_btn_selector`, `delivery` (→ `product-delivery-dates`), `icon_text_block`, `description`, `collapsible_content`, `share_button`. **No** `custom_badges`, `rich_text_block`, `text`, or `custom_liquid` blocks appear on this template's buy box (they're simply absent from `block_order`, not disabled).

## 3. The `main-product` section — settings & behaviors
### 3.1 Section settings (media gallery, zoom, sticky ATC)
```
show_breadcrumbs: false
desktop_media_width: 50          → media column is 50% of page width on desktop (⚠️ differs from CORE/PRO-2's 56)
media_size: ""                   → empty/adaptive (⚠️ differs from CORE's "1")
media_layout_desktop: "carousel_vertical"   → VERTICAL thumbnail strip beside a large main image
media_mobile_indicator: "thumbnails"         → mobile shows a horizontal thumbnail strip
media_zoom: "lightbox"           → click image opens a full-screen lightbox
media_enable_video_autoplay: false
media_enable_video_looping: true
media_fit_height: true           → media crops/stretches to fill gallery height (same as PRO-2, differs from CORE's false)
show_sticky_add_to_cart: true
sticky_add_to_cart_position: "center"
background_color: rgba(0,0,0,0)  (transparent), text_color/heading_color: default
```
**Sticky media gallery behavior (stock Essence — exists in 4.2):** same mechanism as CORE/PRO-2 — `<scroll-carousel vertical>` thumbnail rail + `<media-carousel>` sticky main stage, wrapped in `<media-lightbox>` for zoom. On mobile, swipeable carousel with thumbnail indicator; the mobile product title+reviews render above the gallery (`product-title-reviews`, `hidden-desktop`). Don't rewrite these — they're stock; just keep the settings above.
**Sticky add-to-cart:** rendered because `show_sticky_add_to_cart: true`; slides in from the bottom, centered. Full spec in the **sticky-add-to-cart** prompt.

### 3.2 Buy-box blocks — order, behavior, what's shown/hidden
Rendered by `product-info.liquid` in this `block_order`. **All 13 blocks below are enabled — nothing hidden.**
1. `title` — `heading_size h4` / mobile `h5`; `content: {{ product.title }}`; `text_color` transparent. Shows the product name.
2. `loox_rating` (Loox **app block**) — star rating + count, `contentSize 16`, `[rating] ([count])`, floating widget on click, empty-rating widget shown. **Hidden on mobile inside the buy box** by `main-product.css` (`.section-main-product .product-info-inner .loox-rating { display:none }` ≤767px) — rating shows above the gallery on mobile instead. (Same rule as CORE/PRO-2.)
3. `price` — `use_bold_font: true`, `show_taxes_notice: false`.
4. `payment_installments` — Shop Pay installments messaging. ⚠️ **Position differs from CORE/PRO-2**: here it sits immediately after `price`, *before* `variant_picker` (CORE/PRO-2 place it after the variant picker / trust-icon row). Keep this order.
5. `variant_picker` — `type: radio`, `color_picker_type: radio-image`, `block_style: outlined`, rounded. `hide_sold_out_variants: false`. Size-chart page blank.
6. `qty_btn_selector` — quantity stepper + Add-to-Cart; `show_dynamic_checkout_buttons: false` (no Buy-it-now/express buttons), `show_gift_card_recipient: false`.
7. `delivery` — renders `product-delivery-dates` with `delivery_from: 3` / `delivery_to: 5`.
8. `icon_text_block` (`icon-text-pdp`, inline) — 5 trust icons in one row (80px): `icon-02.svg` "30 Days Return", `icon-01.svg` "Lifetime Warranty Ltd.", `icon_Delivery-1.svg` "Free Delivery 100+ USD", `icon_Delivery-1.svg` "Hassle-Free Shipping", `icon_Secure.svg` "Secure Transaction". Styled by `main-product.css` `.icon-text-block--inline`. **⚠️ There is no second `icon_text_block` (`homepage-usps-info` vertical USP grid) on this template** — CORE/PRO-2 both have one, this one doesn't.
9. `description` — **ENABLED here** (⚠️ differs from CORE/PRO-2, where the stock `description` block is disabled in favor of a metafield accordion). `collapse_content: true`, `collapse_open: false`, heading "Description". Renders the **stock Shopify product description** (`product.description`), not a metafield.
10. `collapsible_content` "SPECS" — **hardcoded HTML bullet list** (not a metafield): used-for loose-leaf/oil, vibration signal, removable battery, USB-C/wireless charging, heat-up time, two-button temp control, ceramic mouthpiece, removable glass airpath, gold-plated chamber, measurements, materials. `collapse_open: false`.
11. `collapsible_content` "WHATS IN THE BOX" — **hardcoded HTML bullet list**: AirVape Legacy PRO+, 18650/3200mAh removable battery, concentrates pad insert, USB-C charger cable, cleaning/loading tools, replacement filter screens. `collapse_open: false`.
12. `collapsible_content` "Why Choose AirVape?" — **hardcoded long-copy HTML** (identical text to the CORE and PRO-2 templates' equivalent block — 10 bolded feature paragraphs about design, quiet operation, materials, safety, charging, warranty, price, support). `collapse_open: false`.
13. `share_button` — native share.

**⚠️ Notably absent vs CORE/PRO-2:** no `custom_badges`, no `rich_text_block` hook (`custom.hook_text`), no "For European Orders click HERE" `text` block, no `custom_liquid` NY-Times-Wirecutter promo pill, no `custom.description`/`custom.specifications`/`custom.what_s_in_the_box`/`custom.how_to_use`/`custom.parts_accessories`/`custom.lifetime_waranty` metafield accordions, no second (vertical USP) `icon_text_block`. This buy box is **13 blocks** vs CORE's 24 / PRO-2's 23 — a much simpler, older layout. **Do not add any of the missing CORE/PRO-2 blocks here** — copy only what's in the JSON below.

## 4. Content sections below the PDP — behaviors
- **video-with-text-overlay "Pure Bliss with Every Puff"** — **live/enabled** (not hidden, unlike the same section type on CORE/PRO-2). Video `PRO_short1.webm`, fallback `video_url` a generic YouTube placeholder link (`https://www.youtube.com/watch?v=_9VUPq3SxOc` — the same placeholder ID reused across all product templates in this theme; treat it as a non-functional default, not real content). Subheading "Simply PRO", heading "Pure Bliss with Every Puff" (`heading_size h1`, rendered as `<p>`), body text about "The Legacy PRO's advanced technology…". `content_alignment: md:content-top-left` (⚠️ differs from CORE/PRO-2's middle-center), `min_height: 500` (⚠️ differs from their 640), `overlay_opacity: 35` (⚠️ differs from their 20/30). This section **must actually render and autoplay/loop the video** on the new store — it's the page's hero.
- **text-with-icons** — **3** `column` blocks (Updated Heating / Industry Leading / Easy to Clean and Pack), each with a `custom_icon` PNG + fallback icon, circle background, 64px, 1-col mobile, centered. Identical content/IDs to the PRO-2 template's version (3 columns, no "Swappable" — that's CORE-only).
- **image-with-text** "Herb to Wax" / "Beginner to PRO" — `HandPro_9f95193d-5245-47ca-b929-ece49dd83689.png`, image right 50%, text "The only vape you'll ever need." centered. **See §7 — this is the unchanged, original image; it was NOT touched by the recent "upgraded legacy pro image" commit (that commit affected the PRO-2 template instead).**
- **featured-collection "Legacy PRO Accessories"** — carousel, 8 slots, `products: []` (empty — relies entirely on the `legacy-accessories` collection, no manual fallback list), subheading "Enhance your vaping experience with", `link_text: "View all"` with `link_url: ""` (blank — ⚠️ differs from CORE/PRO-2 which point "View all" at `airvape-x-accessories`). `heading_html_tag: "p"`.
- **slideshow "Simply Elegant / Effortless / PRO"** — **live/enabled, image-based** (not video, unlike CORE/PRO-2's disabled video slideshows). 3 slides, each `heading: "Simply"` + a one-word `text` ("Elegant" / "Effortless" / "PRO"), images `airvape_180423_-32t.jpg` (bottom-left), `airvape_180423_-28t.jpg` (bottom-center), `IMG_0449.png` (bottom-right). `autoplay: true`, `speed: 4`, `height: 600`, `controls: arrows`, `background_animation: ZoomOut`, `content_animation: AppearLineByLine`, `background_color: #262626`, each slide `overlay_opacity: 50`.
- **related-products "YOU MAY ALSO LIKE"** (stock section) — renders `<product-recommendations intent="related" product-id="{{ product.id }}" limit="8">`, i.e. **Shopify's automatic recommendation engine**, not a manually curated product list. `carousel: true`, `grid_columns: 4` / mobile `2`. Confirm this stock section/snippet exists in 4.2 (it's not one of the customized sections carried over from CORE/PRO-2's prompts).
- **featured-collection "OUR SIGNATURE MODELS"** — carousel, 8 slots, manual product list (no collection): `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`. **⚠️ See §7 — the Breathelet handle in this list may be stale** (a same-batch commit on the old theme is titled "Breathelet removed from the website"). Verify whether that product still exists before assigning this template; if not, drop the handle or report back rather than leaving a dead reference.
- **product-faqs "FAQS"** — accordion from `product.metafields.custom.faqs` (read internally by the section file, not exposed as a JSON setting). Empty without the metafield.

## 5. `assets/main-product.css` — the custom PDP CSS (copy verbatim — SAME shared file as CORE/PRO-2)
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
> This is the only PDP-specific stylesheet, shared verbatim across CORE, PRO-2, and this Legacy PRO template — **do not create a second copy**. On this specific template only a subset of it actually applies (the `.icon-text-block--inline` trust row, `.qty-wrap` pill, delivery-date weight, mobile Loox-rating hide, and payment list) since this template has **no** `homepage-usps-info` block and **no** `.aplus-data-column`/comparison-card markup — those rules simply sit unused, which is expected and fine.

## 6. Metafields to create (Admin → Settings → Custom data → Products) — namespace `custom`
| Key | Type | Used by |
|---|---|---|
| `faqs` | (per product-faqs schema) | FAQS accordion |

**This is the only metafield this template depends on.** If you already created `custom.faqs` for the CORE or PRO-2 migration, you don't need to redefine it — just make sure the Legacy PRO product has its own FAQ values populated. **Do not create** `hook_text`, `description`, `specifications`, `what_s_in_the_box`, `how_to_use`, `parts_accessories`, `lifetime_waranty`, `product_short_videos`, `user_guide`, `comparison_features`, `comparison_products`, or `compare_key` **for this template** — none of them are referenced anywhere in `product.legacy-pro.json` (confirmed by grep — the JSON contains zero occurrences of the string "metafield").

## 7. Media, apps, collections, products
- **Images → Content → Files:** `icon-01.svg`, `icon-02.svg`, `icon_Delivery-1.svg`, `icon_Secure.svg`, `Icons_all-08.png`, `Icons_all-15.png`, `Icons_all-16.png`, `HandPro_9f95193d-5245-47ca-b929-ece49dd83689.png`, `airvape_180423_-32t.jpg`, `airvape_180423_-28t.jpg`, `IMG_0449.png`. (Grep the JSON for `shopify://shop_images` to catch all.)
  - **⚠️ Image-dependency note (read this carefully):** the task briefing for this migration flagged a recent commit "upgraded the legacy pro image" as a reason to double-check image dependencies here. Having checked the actual git history: that commit (`0587b15`, "Breathelet removed from the website, upgraded the legacy pro image and image-slider auto issue resolved") only modified **`templates/product.pro-2-_po.json`**, swapping `Legacy-PRO2-Product_Page3.webp` → `Legacy_Pro_2_Page_Image.webp` on the **Legacy PRO 2** template's `image-with-text` "Simply PRO" section. **`templates/product.legacy-pro.json` (this file) was not touched by that commit or any commit since 4e1ab98 (23 June 2026).** Its `image-with-text` image is still the original `HandPro_9f95193d-5245-47ca-b929-ece49dd83689.png`. Re-upload that exact file for **this** template — don't substitute the PRO-2 template's newer image.
- **Videos → Content → Files:** `PRO_short1.webm` — **live/required**, this is the enabled hero `video-with-text-overlay` section, not a hidden fallback like the equivalent video sections on CORE/PRO-2. Grep for `shopify://files/videos`.
- **Apps:** **Loox** — only the buy-box rating app-block (`loox_rating`) is used here. There is **no** Loox dynamic-reviews `apps` section on this template (unlike CORE/PRO-2, which both have a "WHY DO PEOPLE LOVE AIRVAPE?" Loox carousel section — don't add one here, it's not in the JSON).
- **Collections:** `legacy-accessories`.
- **Products (featured collections):** `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.
  - **⚠️ Stale-reference check:** the same commit referenced above (`0587b15`) is titled in part "Breathelet removed from the website." That product's handle (`breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`) still appears in this template's "OUR SIGNATURE MODELS" `featured_collection_AJbw8X` product list (§4). Before assigning this template, verify whether the Breathelet product exists on the new 4.2 store/catalog. If it was genuinely discontinued, drop that handle from the list (or report back for a decision) rather than shipping a dead product reference.
- **Product media:** upload the Legacy PRO gallery images/videos to the product itself (the media gallery uses `product.media`).

## 8. What is hidden / disabled (quick reference)
**Nothing.** There is no `"disabled": true` anywhere in `product.legacy-pro.json` — not at the section level, not at the block level. Every section in §1 and every block in §3.2 renders. This is the one thing to double check against the "what's hidden" habit from the CORE/PRO-2 migrations: **do not disable anything here that the source JSON has enabled**, and don't go looking for a hidden video/slideshow pair to preserve — there isn't one on this template.

## 9. Report back
- Confirm the `legacy-pro` template is assigned; JSON valid; confirm **no** `disabled` flags were introduced.
- Confirm `main-product.css` loads (same shared file as CORE/PRO-2) and the single `icon-text-pdp` inline trust row renders; confirm the buy-box Loox rating hides on mobile.
- Confirm the **sticky vertical media gallery** (`media_fit_height: true` crop-to-fill, `desktop_media_width: 50`) + lightbox zoom work, and the **centered sticky add-to-cart** slides in on scroll.
- Confirm the **live hero video** (`video-with-text-overlay`, `PRO_short1.webm`) and the **live 3-slide image slideshow** actually render and aren't accidentally left disabled.
- Confirm `custom.faqs` exists (else FAQs section is empty) — and confirm you did **not** create any of the CORE/PRO-2-only metafields for this product.
- Confirm the **image-dependency note in §7** was read: `HandPro_9f95193d-…png` (unchanged) was uploaded for this template, not the newer PRO-2 image.
- Flag the Breathelet product-handle stale-reference question from §7 rather than silently resolving it.
- Confirm `related-products` (stock, native recommendations) renders distinctly from the two manual `featured-collection` carousels.
- Flag any block/section/setting from the JSON below that doesn't exist in the 4.2 theme rather than inventing a substitute.

---

## FULL `templates/product.legacy-pro.json` — copy verbatim

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
        "loox_reviews_loox_rating_WiF7kG": {
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
        "qty_btn_selector_i66xD9": {
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
        "delivery_eFqMHf": {
          "type": "delivery",
          "settings": {
            "delivery_from": 3,
            "delivery_to": 5
          }
        },
        "icon_text_block_JykQDL": {
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
            "heading": "SPECS",
            "content": "<ul><li>Used for Loose-leaf and Oil Concentrates</li><li>Vibration signal</li><li>Removable battery</li><li>USB-C or Wireless charging</li><li>Heat-up Time: 15 Seconds to Optimal Vaping Temp</li><li>Two-button precise temperature control ↑↓ from 212°F to 464°F</li><li>Ceramic Mouthpiece</li><li>Removable glass AirPath</li><li>Gold-plated heating Chamber </li><li>Measurements: 119 mm x 52 mm x 21</li><li>Materials: Hemp-based textile, Vegan leather, Black ceramic, 24K gold plating, Glass</li></ul>"
          }
        },
        "collapsible_content_87nC68": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "WHATS IN THE BOX",
            "content": "<ul><li>AirVape Legacy PRO + </li><li>18650/3200 mAh Legacy PRO Removable Battery</li><li>Concentrates Pad Insert</li><li>USB-C Charger Cable</li><li>Cleaning, Loading Tools</li><li>Replacement Filter Screens</li></ul>"
          }
        },
        "collapsible_content_UHKqWa": {
          "type": "collapsible_content",
          "settings": {
            "collapse_open": false,
            "heading": "Why Choose AirVape?",
            "content": "<p><strong>Sleek, Portable, and Travel-Friendly Design –</strong> AirVape combines a modern, sleek, and discreet design with a compact and lightweight build, making it the perfect portable vaporizer for on-the-go use, whether you're traveling or out for the day.<br/><br/><strong>Quiet Operation – </strong>Vape discreetly with minimal noise, making it suitable for use in public or shared spaces.<br/><br/><strong>High-Quality Materials –</strong> Made with durable, high-quality materials, AirVape is built to last and withstand regular use.<br/><br/><strong>Easy to Clean – </strong>The vaporizer is designed for easy maintenance, with a simple cleaning process that keeps it functioning optimally.<br/><br/><strong>Non-Toxic Materials –</strong> Made with non-toxic, food-grade materials for a clean, healthy, and safe vaping experience.<br/><br/><strong>Advanced Safety Features –</strong> Built-in safety features like automatic shut-off and temperature control to ensure a safe vaping experience.<br/><br/><strong>Easy Charging – </strong>AirVape uses USB-C charging for fast, efficient, and convenient recharging.<br/><br/><strong>Long Warranty –</strong> Comes with a reliable warranty, ensuring long-term performance and peace of mind.<br/><br/><strong>Affordable Price – </strong>Get premium quality without breaking the bank, as AirVape offers competitive pricing compared to other vaporizers on the market.<br/><br/><strong>Customer-Focused Brand – </strong>AirVape is committed to providing excellent customer service and offers product support to ensure complete satisfaction.</p>"
          }
        },
        "share_button_KkRM8f": {
          "type": "share_button",
          "settings": {}
        }
      },
      "block_order": [
        "07b2f4eb-d5bd-46bf-8ef7-7c3a9dbff7b7",
        "loox_reviews_loox_rating_WiF7kG",
        "c0b62d1f-e562-4b86-84cb-fc22c849e93e",
        "4923f5c8-62d3-42db-a835-6e0613c4a182",
        "5a84f252-bc58-4ca7-8b59-5a727a61c21f",
        "qty_btn_selector_i66xD9",
        "delivery_eFqMHf",
        "icon_text_block_JykQDL",
        "description_FETxLT",
        "collapsible_content_7eB3pL",
        "collapsible_content_87nC68",
        "collapsible_content_UHKqWa",
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
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_46VhEg": {
          "type": "text",
          "settings": {
            "text": "<p>The Legacy PRO’s advanced technology ensures top-notch performance, making every moment shared with friends more enjoyable and satisfying.</p>"
          }
        }
      },
      "block_order": [
        "subheading_WHiEEy",
        "heading_74fQ4A",
        "text_46VhEg"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "video": "shopify://files/videos/PRO_short1.webm",
        "video_url": "https://www.youtube.com/watch?v=_9VUPq3SxOc",
        "content_alignment": "md:content-top-left",
        "content_alignment_mobile": "content-middle-center",
        "link": "",
        "min_height": 500,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 35,
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
    "image_with_text_76bibF": {
      "type": "image-with-text",
      "blocks": {
        "heading_DcAnEd": {
          "type": "heading",
          "settings": {
            "heading": "Herb to Wax",
            "heading_size": "h3",
            "heading_html_tag": "p"
          }
        },
        "heading_akb8kp": {
          "type": "heading",
          "settings": {
            "heading": "Beginner to PRO",
            "heading_size": "h2",
            "heading_html_tag": "p"
          }
        },
        "text_qTyhcp": {
          "type": "text",
          "settings": {
            "text": "<p>The only vape you’ll ever need.</p>"
          }
        }
      },
      "block_order": [
        "heading_DcAnEd",
        "heading_akb8kp",
        "text_qTyhcp"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "remove_bottom_spacing": false,
        "image": "shopify://shop_images/HandPro_9f95193d-5245-47ca-b929-ece49dd83689.png",
        "image_size": "",
        "image_position": "right",
        "image_width": 50,
        "text_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "featured_collection_kWtgdc": {
      "type": "featured-collection",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "products": [],
        "collection": "legacy-accessories",
        "subheading": "Enhance your vaping experience with",
        "heading": "Legacy PRO Accessories",
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
    "slideshow_ygAcAw": {
      "type": "slideshow",
      "blocks": {
        "slide_HdVfL3": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/airvape_180423_-32t.jpg",
            "content_width_maximum": 720,
            "desktop_content_position": "bottom-left",
            "mobile_content_position": "bottom-left",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "Simply",
            "heading_size": "h1",
            "text": "Elegant",
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
            "overlay_opacity": 50,
            "overlay_type": "solid",
            "heading_html_tag": "p"
          }
        },
        "slide_7CBKm4": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/airvape_180423_-28t.jpg",
            "content_width_maximum": 640,
            "desktop_content_position": "bottom-center",
            "mobile_content_position": "bottom-center",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "Simply",
            "heading_size": "h1",
            "text": "Effortless",
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
            "overlay_opacity": 50,
            "overlay_type": "solid",
            "heading_html_tag": "p"
          }
        },
        "slide_LiNqh4": {
          "type": "slide",
          "settings": {
            "image": "shopify://shop_images/IMG_0449.png",
            "content_width_maximum": 640,
            "desktop_content_position": "bottom-right",
            "mobile_content_position": "bottom-right",
            "desktop_text_alignment": "default",
            "subheading": "",
            "heading": "Simply",
            "heading_size": "h1",
            "text": "PRO",
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
            "overlay_opacity": 50,
            "overlay_type": "solid",
            "heading_html_tag": "p"
          }
        }
      },
      "block_order": [
        "slide_HdVfL3",
        "slide_7CBKm4",
        "slide_LiNqh4"
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
    "featured_collection_AJbw8X": {
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
    "product_faqs_EDQHrJ": {
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
    "video_with_text_overlay_DTHfhk",
    "text_with_icons_tqLMpf",
    "image_with_text_76bibF",
    "featured_collection_kWtgdc",
    "slideshow_ygAcAw",
    "related-products",
    "featured_collection_AJbw8X",
    "product_faqs_EDQHrJ"
  ]
}
```
