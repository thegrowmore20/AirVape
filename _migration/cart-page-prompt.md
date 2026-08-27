# Migration Prompt — Cart Page (`templates/cart.json`)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> This covers the **standalone `/cart` page** only. It **shares files** with the cart drawer and the quantity
> selector — do NOT duplicate that work. If you haven't already run those two prompts in this same session,
> run them first (or at least read them), then come back to this one:
> - `_migration/cart-drawer-prompt.md` — free-shipping bar (country-gated), `line-item-price`, `button-vars`, perf fixes
> - `_migration/quantity-selector-prompt.md` — `qty-selector` snippet + sizing CSS (already documents the "Cart page" context explicitly)

---

Recreate my **cart page** (`templates/cart.json` → `sections/main-cart.liquid`) exactly. Read the two prompts named above first — the cart page **reuses** their snippets verbatim, so apply those before this one and then only handle the page-specific pieces below.

## 1. Page structure — `templates/cart.json` (2 sections, in order)

| # | Section id | Type | Role |
|---|---|---|---|
| 1 | `main-cart` | `main-cart` | The cart itself — item table + summary sidebar (blocks: heading, free_shipping_bar, totals, shipping_estimator, cart_note, checkout_button) |
| 2 | `featured_collection_Rb3dRa` | `featured-collection` | "OUR SIGNATURE MODELS" product carousel below the cart |

## 2. `main-cart` section — verdict: **STOCK** (no custom markup/CSS of its own)

I read `sections/main-cart.liquid`, `snippets/cart-table.liquid`, and `snippets/cart-side-inner.liquid` in full. None of them contain hardcoded colors, custom Liquid math, extra markup, or anything beyond the section's own schema — they are unmodified Essence 4.1 files. **All of my customization on this page comes from shared snippets that are documented in the other two prompts**, not from the page template itself. Specifically:

| Shared piece rendered on this page | Where it's documented | Note |
|---|---|---|
| `{% render 'free-shipping-indicator', class: 'my-6', attrs: block.shopify_attributes %}` (via the `free_shipping_bar` block) | `cart-drawer-prompt.md` §A5.1 + Part B | **Same file** as the drawer's bar — my country-restriction feature (Part B of that prompt) applies here too. Do that port once; it covers both surfaces. |
| `{% render 'qty-selector', item: item %}` (desktop cell) and `{% render 'qty-selector', item: item, name: false %}` (mobile, `.md:hidden`) | `quantity-selector-prompt.md` | That prompt's table **already has a "Cart page" row** — sizing resolves to the **base** `.qty-selector__button` scope (2.5rem → 3rem desktop), *not* the smaller drawer scope. Also carries the dead/no-op `.cart-page` CSS scope note — don't chase a `.cart-page` element, there isn't one. |
| `{% render 'line-item-price', item: item %}` | `cart-drawer-prompt.md` §A1 (full source given there) | Byte-identical file, renders `product-save-badge` for the sale badge. |
| `{% render 'button-vars', background: block.settings.button_background_color, text: block.settings.button_text_color %}` on the checkout button | `cart-drawer-prompt.md` §A1 | Byte-identical file; my `checkout_button` block colors are blank → button inherits theme primary color. |
| `{% render 'cart-policy-text' %}` (tax/shipping line, inside the `totals` block) | `cart-drawer-prompt.md` §A1 | Stock snippet; output depends on Settings → Taxes + Shipping policy, same as the drawer. |

Everything else on the page (`line-item-properties.liquid`, `line-level-discount-allocations.liquid`, `apply-color-vars.liquid`, `has-diff-bg-class.liquid`, `section-bg-number-vars.liquid`, `section-attrs.liquid`, icons `icon-trash`/`icon-pencil`/`icon-truck`/`icon-discount`) is **stock Essence** — verify they exist on 4.2 (they should, unmodified) rather than porting custom code.

### 2a. `sections/main-cart.liquid` — full source (for reference/diff only, expect it to match 4.2 stock)

```liquid
{% render 'section-bg-number-vars' %}

<style>
  #shopify-section-{{ section.id }} .cart-side {
    --color-background: var(--color-foreground) / 2.5%;

    {% render 'apply-color-vars',
      background: section.settings.summary_background_color,
      text: section.settings.summary_text_color,
      heading: section.settings.summary_heading_color
    %}
  }
</style>

<div {% render 'section-attrs' %}>
  {% if cart == empty %}
    <div class="text-center py-8">
      <p class="text-h4">{{ 'sections.cart.empty' | t }}</p>
      <a class="button button-primary mt-8" href="{{ settings.cart_empty_button_link }}">
        {{ 'general.continue_shopping' | t }}
      </a>
    </div>

  {% else %}
    <h1 class="h2 mb-12 md:mb-16 {{ section.settings.text_alignment }}">{{ 'sections.cart.title' | t }}</h1>

    <cart-form class="cart-form">
      <form action="{{ routes.cart_url }}" method="post" id="Cart" data-id="{{ section.id }}" data-form-button-loading>
        <div class="main-cart-grid js-contents">
          <div class="cart-main">
            {% render 'cart-table' %}
          </div>

          <div
            class="cart-side color p-6 sm:p-8 cart-side--sticky rounded-block border data-[has-diff-bg]:border-0"
            {% if section.settings.summary_background_color == blank
              or section.settings.summary_background_color.rgba == '0 0 0 / 0.0'
            %}
              data-has-diff-bg
            {% else %}
              {% render 'has-diff-bg-class',
                class: 'data-has-diff-bg',
                item_color: section.settings.summary_background_color
              %}
            {% endif %}
          >
            {% render 'cart-side-inner' %}
          </div>
        </div>

        <p class="visually-hidden" id="Cart-LiveRegionText" aria-live="polite" role="status"></p>
        <p class="visually-hidden" id="Cart-LineItemStatus" aria-live="polite" aria-hidden="true" role="status">
          {{ 'accessibility.loading' | t }}
        </p>
      </form>
    </cart-form>
  {% endif %}
</div>

<x-modal class="modal bottom-modal shipping-estimator-modal" position="center-center">
  <div slot="content" class="p-8 md:p-12" tabindex="-1">
    <div class="flex justify-between mb-6">
      <h3 class="h5">
        {{ 'sections.shipping_estimator.title' | t }}
      </h3>

      <button class="modal-close -mt-1" data-button-close aria-label="{{ 'accessibility.close_modal' | t }}">
        {% render 'icon-times' %}
      </button>
    </div>

    {% render 'shipping-estimator' %}
  </div>
</x-modal>

{% schema %}
{
  "name": "t:sections.main-cart.name",
  "class": "section-main-cart",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_vendor",
      "label": "t:sections.main-cart.settings.show_vendor.label",
      "default": true
    },
    {
      "type": "select",
      "id": "text_alignment",
      "label": "t:sections.all.heading_alignment.label",
      "options": [
        {
          "value": "text-left",
          "label": "t:sections.all.heading_alignment.options.text_left.label"
        },
        {
          "value": "text-center",
          "label": "t:sections.all.heading_alignment.options.text_center.label"
        },
        {
          "value": "text-right",
          "label": "t:sections.all.heading_alignment.options.text_right.label"
        }
      ],
      "default": "text-center"
    },
    {
      "type": "header",
      "content": "t:sections.all.headers.colors"
    },
    {
      "type": "color",
      "label": "t:sections.all.background_color.label",
      "id": "background_color"
    },
    {
      "type": "color",
      "label": "t:sections.all.text_color.label",
      "id": "text_color"
    },
    {
      "type": "color",
      "label": "t:sections.all.heading_color.label",
      "id": "heading_color"
    },
    {
      "type": "color",
      "id": "summary_background_color",
      "label": "t:sections.main-cart.settings.summary_background_color.label"
    },
    {
      "type": "color",
      "id": "summary_text_color",
      "label": "t:sections.main-cart.settings.summary_text_color.label"
    },
    {
      "type": "color",
      "id": "summary_heading_color",
      "label": "t:sections.main-cart.settings.summary_heading_color.label"
    }
  ],
  "blocks": [
    {
      "type": "@app"
    },
    {
      "type": "heading",
      "name": "t:sections.main-cart.blocks.heading.name",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "t:sections.all.heading.label",
          "default": "Heading"
        },
        {
          "type": "select",
          "id": "heading_size",
          "label": "t:sections.all.heading_size.label",
          "options": [
            {
              "value": "h0",
              "label": "t:sections.all.heading_size.options__0.label"
            },
            {
              "value": "h1",
              "label": "t:sections.all.heading_size.options__1.label"
            },
            {
              "value": "h2",
              "label": "t:sections.all.heading_size.options__2.label"
            },
            {
              "value": "h3",
              "label": "t:sections.all.heading_size.options__3.label"
            },
            {
              "value": "h4",
              "label": "t:sections.all.heading_size.options__4.label"
            },
            {
              "value": "h5",
              "label": "t:sections.all.heading_size.options__5.label"
            },
            {
              "value": "h6",
              "label": "t:sections.all.heading_size.options__6.label"
            }
          ],
          "default": "h5"
        }
      ]
    },
    {
      "type": "text",
      "name": "t:sections.main-cart.blocks.text.name",
      "settings": [
        {
          "type": "richtext",
          "id": "content",
          "label": "t:sections.all.content.label"
        }
      ]
    },
    {
      "type": "free_shipping_bar",
      "name": "t:sections.main-cart.blocks.free_shipping_bar.name",
      "limit": 1,
      "settings": [
        {
          "type": "paragraph",
          "content": "t:sections.main-cart.paragraph__0.content"
        }
      ]
    },
    {
      "type": "totals",
      "name": "t:sections.main-cart.blocks.totals.name",
      "limit": 1,
      "settings": [
        {
          "type": "checkbox",
          "id": "show_shipping_taxes_message",
          "label": "t:sections.main-cart.blocks.totals.settings.show_shipping_taxes_message.label",
          "default": true
        },
        {
          "type": "checkbox",
          "id": "show_order_weight",
          "label": "t:sections.main-cart.blocks.totals.settings.show_order_weight.label",
          "default": false
        }
      ]
    },
    {
      "type": "shipping_estimator",
      "name": "t:sections.main-cart.blocks.shipping_estimator.name",
      "limit": 1
    },
    {
      "type": "cart_note",
      "name": "t:sections.main-cart.blocks.cart_note.name",
      "limit": 1
    },
    {
      "type": "checkout_button",
      "name": "t:sections.main-cart.blocks.checkout_button.name",
      "limit": 1,
      "settings": [
        {
          "type": "checkbox",
          "id": "show_dynamic_checkout_buttons",
          "label": "t:sections.all.show_dynamic_checkout_buttons.label",
          "default": true,
          "info": "t:sections.all.show_dynamic_checkout_buttons.info"
        },
        {
          "type": "select",
          "id": "button_style",
          "label": "t:sections.all.button_style.label",
          "options": [
            {
              "value": "",
              "label": "t:sections.all.button_style.options.filled"
            },
            {
              "value": "button-outline",
              "label": "t:sections.all.button_style.options.outline"
            }
          ],
          "default": ""
        },
        {
          "type": "header",
          "content": "t:sections.all.headers.colors"
        },
        {
          "type": "color",
          "label": "t:sections.all.button_background_color.label",
          "id": "button_background_color"
        },
        {
          "type": "color",
          "label": "t:sections.all.button_text_color.label",
          "id": "button_text_color"
        }
      ]
    }
  ]
}
{% endschema %}
```

### 2b. `snippets/cart-table.liquid` and `snippets/cart-side-inner.liquid`

Also read in full — both stock. Not reproduced again here to avoid duplication; verify their behavior on 4.2 matches:
- **`cart-table.liquid`**: desktop 4-column table (product / qty / total / remove), mobile collapses to stacked rows with qty selector under the price and a remove icon next to the title. Renders `line-item-price`, `qty-selector`, `line-item-properties`, `line-level-discount-allocations` per item.
- **`cart-side-inner.liquid`**: loops `section.blocks` — heading, free_shipping_bar, totals (subtotal, cart-level discounts, total, tax/shipping message), shipping_estimator trigger (opens the `.shipping-estimator-modal` at the bottom of `main-cart.liquid`), cart_note (toggleable textarea), checkout_button (+ `additional-checkout-buttons` for dynamic checkout).

### 2c. Page-specific CSS (from my compiled `assets/main.css`) — **STOCK values, port for parity**

```css
.main-cart-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}
@media not all and (min-width: 1200px) {
  .main-cart-grid { grid-template-columns: auto; }   /* stacks sidebar under table below 1200px */
}
@media not all and (min-width: 768px) {
  .main-cart-grid { gap: 3rem; }
}
@media not all and (min-width: 576px) {
  .main-cart-grid { gap: 2rem; }
}

.cart-items th {
  padding: 0 1rem;
  padding-bottom: 1rem;
  color: rgb(var(--color-foreground) / 0.75);
}
.cart-items th:first-child { padding-left: 0; }
.cart-items th:last-child { padding-right: 0; }
.cart-items td {
  vertical-align: top;
  padding: 2rem 1rem;
  border-bottom-width: 1.25px;
  border-color: rgb(var(--color-foreground) / 6%);
}
.cart-items td:first-child { padding-left: 0; }
.cart-items td:last-child { padding-right: 0; }
@media not all and (min-width: 576px) {
  .cart-items td { padding-left: 0; padding-right: 0; }
}
.cart-items tr:last-child td { padding-bottom: 0; border-bottom: 0; }
@media not all and (min-width: 768px) {
  .cart-items tr:first-child td { padding-top: 0; }
}

.cart-side.cart-side--sticky {
  position: sticky;
  top: calc(1.5rem + var(--header-height-sticky));
  transition: top 250ms;
}
.cart-side .additional-checkout-buttons { margin-top: 0.5rem; }

.shopify-payment-button__more-options {
  text-decoration: underline;
  text-underline-offset: 0.25rem;
  color: rgb(var(--color-foreground) / 75%);
}
#additional-checkout-buttons [role="button"] {
  border-radius: var(--button-corner-radius) !important;
}
shopify-accelerated-checkout-cart {
  --shopify-accelerated-checkout-button-block-size: 56px;
  --shopify-accelerated-checkout-button-border-radius: var(--button-corner-radius);
}
@media not all and (min-width: 768px) {
  shopify-accelerated-checkout-cart { --shopify-accelerated-checkout-button-block-size: 54px; }
}
```
> **Do NOT re-port** `.cart-modal .heading + .cart-modal-buttons` or any `.qty-selector__button` / `.free-shipping-indicator` / `.progress-bar` rules here — those are already covered verbatim in `cart-drawer-prompt.md` (§A2) and `quantity-selector-prompt.md` (§3). Porting them twice risks duplicate/conflicting rules.

## 3. `featured_collection_Rb3dRa` section — "OUR SIGNATURE MODELS"

Stock `featured-collection` section type. **Same block also appears on the homepage** (see `_migration/index-homepage-prompt.md`, section `featured_collection_MJVwFm`) with nearly identical settings — if you already ported that one in this session, this is the same product list, just a different instance/heading config. Settings for this cart-page instance:

| Setting | Value |
|---|---|
| `full_width` | `true` |
| `carousel` | `true` |
| `products_count` | `8` |
| `grid_columns` | `4` |
| `grid_columns_mobile` | `"2"` |
| `collection` | `""` (blank — uses the explicit `products` list, not a collection resource) |
| `heading` | `"OUR SIGNATURE MODELS"` |
| `heading_size` | `h2` |
| `heading_html_tag` | `h2` |
| `text_alignment` | `text-center` |
| `link_text` | `"View all"` |
| `link_url` | `""` (blank) |
| `subheading` / `background_color` / `text_color` / `heading_color` | blank |

**Product handles** (8, in order):
```
enso
legacy-core
legacy-pro-2
airvape-x-royal-edition
airvape-x
airvape-xs-go
airvape-om-keychain-waxpen
breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus
```
⚠️ **Stale reference**: per this repo's git history, "Breathelet removed from the website" (commit `0587b15`). The `breathelet-…` handle is still saved in this section's `products` list here (and on the homepage instance) even though the product/collection may no longer be published. On the new 4.2 store, either (a) recreate the product if it still exists in the catalog, or (b) drop that handle from the list and use only the remaining 7 — confirm with whoever owns the store before deciding. Don't silently include a dead handle if the product genuinely doesn't exist on 4.2.

## 4. Dependency checklist

**Snippets rendered (verify exist on 4.2, all expected stock unless noted):**
`cart-table`, `cart-side-inner`, `line-item-price`⚑(full source in cart-drawer-prompt), `line-item-properties`, `line-level-discount-allocations`, `qty-selector`⚑(full source in quantity-selector-prompt), `placeholder`, `free-shipping-indicator`⚑(full source + country feature in cart-drawer-prompt Part B), `cart-policy-text`, `button-vars`⚑(full source in cart-drawer-prompt), `shipping-estimator`, `apply-color-vars`, `has-diff-bg-class`, `section-bg-number-vars`, `section-attrs`, icons `icon-times`, `icon-trash`, `icon-pencil`, `icon-truck`, `icon-discount`.

**Apps:** none detected in this template (only the standard `{% type: "@app" %}` block slot in `main-cart`'s block list — no app block instances are present in `templates/cart.json`).

**Images:** none — this page renders product images from `item.image` (cart line items) dynamically; no static/CDN image URLs are hardcoded in the template or its sections.

**Product handles referenced:** the 8 handles listed in §3 above (via `featured_collection_Rb3dRa`).

**Theme (global) settings this page depends on** — already covered in `cart-drawer-prompt.md` §A3/A4, don't re-derive: `cart_empty_button_link`, `cart_free_shipping_bar_enabled`, `cart_free_shipping_bar_threshold`, `cart_free_shipping_threshold_per_currency`, `cart_free_shipping_countries` (new, Part B), `colors_free_shipping_bar`, `colors_progress_bar`. Note: `cart_type` (drawer vs page) does **not** disable this template — `/cart` renders `main-cart` regardless of that setting; `cart_type` only controls whether adding an item *also* opens the drawer automatically.

## 5. What's hidden/disabled (quick reference)

- `show_order_weight` on the `totals` block is **`false`** → order weight row is not shown.
- `checkout_button.button_style` is **`""`** (filled), not outline.
- `checkout_button` colors are blank → button uses theme primary color (same as the drawer's checkout button, per `cart-drawer-prompt.md`).
- `main-cart` section-level `background_color`/`text_color`/`heading_color`/`summary_*` colors are all blank/transparent → page uses default page background and theme foreground/heading colors, no custom summary sidebar tint.
- `show_vendor` is **`true`** → vendor name shows above each product title in the cart table (unlike some themes where this defaults off — confirm this stays `true` on 4.2).
- No `text` block and no extra app blocks are present, even though the schema allows them.

## 6. Full `templates/cart.json` — verbatim (byte-for-byte, comment header preserved)

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
    "main-cart": {
      "type": "main-cart",
      "blocks": {
        "4b0e6fb0-d2b1-4aaf-b9a4-874fe9b01a56": {
          "type": "heading",
          "settings": {
            "heading": "Summary",
            "heading_size": "h4"
          }
        },
        "76f0998a-7fb2-4f09-82b1-e872d2b6a878": {
          "type": "free_shipping_bar",
          "settings": {}
        },
        "f9be1730-8650-49f1-9b01-f29726e91d5e": {
          "type": "totals",
          "settings": {
            "show_shipping_taxes_message": true,
            "show_order_weight": false
          }
        },
        "1aefc2c3-1341-4830-b785-f60c4e04ac07": {
          "type": "shipping_estimator",
          "settings": {}
        },
        "43802bd7-5fb9-4cc4-9984-1b388883bf3f": {
          "type": "cart_note",
          "settings": {}
        },
        "e0dc43fd-ae20-4b7d-a8bb-39017f8ffccd": {
          "type": "checkout_button",
          "settings": {
            "show_dynamic_checkout_buttons": true,
            "button_style": "",
            "button_background_color": "",
            "button_text_color": ""
          }
        }
      },
      "block_order": [
        "4b0e6fb0-d2b1-4aaf-b9a4-874fe9b01a56",
        "76f0998a-7fb2-4f09-82b1-e872d2b6a878",
        "f9be1730-8650-49f1-9b01-f29726e91d5e",
        "1aefc2c3-1341-4830-b785-f60c4e04ac07",
        "43802bd7-5fb9-4cc4-9984-1b388883bf3f",
        "e0dc43fd-ae20-4b7d-a8bb-39017f8ffccd"
      ],
      "settings": {
        "show_vendor": true,
        "text_alignment": "text-center",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "",
        "heading_color": "",
        "summary_background_color": "rgba(0,0,0,0)",
        "summary_text_color": "",
        "summary_heading_color": ""
      }
    },
    "featured_collection_Rb3dRa": {
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
    }
  },
  "order": [
    "main-cart",
    "featured_collection_Rb3dRa"
  ]
}
```

## 7. Diff-against-4.2 checklist (do this first, before porting anything)

1. Diff `sections/main-cart.liquid`, `snippets/cart-table.liquid`, `snippets/cart-side-inner.liquid` against 4.2 stock. Expect **no differences** (or only harmless 4.2 refactors) — this page carries no page-specific customization. If 4.2's stock versions differ meaningfully, keep 4.2's version (newer stock) rather than force-porting mine, since none of my changes live here.
2. Confirm `free-shipping-indicator.liquid` on 4.2 either already has, or gets (via `cart-drawer-prompt.md` Part B), the country-gated logic — this page renders the **same** snippet via the `free_shipping_bar` block.
3. Confirm `qty-selector.liquid` + its CSS scopes are ported per `quantity-selector-prompt.md` — this page uses the **base** (non-drawer) size scope.
4. Diff the CSS in §2c above against 4.2's compiled `main.css`; add/patch only what's missing.
5. Recreate `templates/cart.json` exactly as in §6 (paste verbatim, comment header included) — adjust only the `featured_collection_Rb3dRa` block's `products` array if the Breathelet handle (§3 warning) needs to be dropped.

## Report back
- Confirm `main-cart.liquid` / `cart-table.liquid` / `cart-side-inner.liquid` matched 4.2 stock (or note any real diffs found).
- Confirm the free-shipping bar, quantity selector, and checkout button on this page inherit correctly from the drawer/qty-selector prompts (no double-porting, no conflicting CSS).
- Confirm `main-cart-grid` layout (2fr/1fr desktop, stacks <1200px) and the `.cart-items` table spacing render identically.
- Confirm the 8-product "OUR SIGNATURE MODELS" carousel renders; flag whether the Breathelet handle exists on 4.2's catalog and what you decided to do with it.
- Confirm `templates/cart.json` was saved byte-for-byte (comment header intact, block IDs unchanged).
