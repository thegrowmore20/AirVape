# Migration Prompt — Cart Drawer (FULL, verbatim) + country-restricted free-shipping bar

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> This prompt contains the **complete verbatim source** of every file in the cart drawer so nothing is guessed.
> Do **Part A** (port + perf fix) first, then **Part B** (new country feature).

---

Recreate my customized **cart drawer** exactly, port all its settings and styling 1:1, fix a performance issue in the free-shipping bar, then add a new **country-restricted free-shipping bar** feature. Below is the **full source of every involved file** — reproduce it verbatim on 4.2, only adjusting store-specific references (product lists, metafields, locale keys) as noted. First **verify each section/snippet exists in 4.2 stock** and diff it; keep my customizations where they differ.

---

## PART A — Port the cart drawer + settings (verbatim) and fix the perf issue

### A0. Files involved (port every one)

| File | Role |
|---|---|
| `sections/cart-modal.liquid` ⚑ | The drawer section (customized) — full source below |
| `snippets/cart-modal-item.liquid` ⚑ | One cart line item — full source below |
| `snippets/qty-selector.liquid` | Quantity stepper used per item — full source below |
| `snippets/free-shipping-indicator.liquid` ⚑ | Free-shipping bar (**replaced in Part B**) — old source below |
| `snippets/product-delivery-dates.liquid` ⚑ | "Receive by …" business-day estimate — full source below |
| `snippets/cart-modal-product-recommendations.liquid` | "You may also like" carousel — full source below |
| `snippets/line-item-price.liquid` | per-item price + sale badge — full source below |
| `snippets/cart-policy-text.liquid` | tax/shipping message — full source below |
| `snippets/button-vars.liquid` ⚑ | View Cart / Checkout color vars — full source below |
| helper snippets (port/verify, stock): `product-save-badge`, `button-hover-active-vars`, `complementary-product`, `mini-product-carousel`, `shipping-estimator`, `placeholder`, and icons `icon-times`, `icon-pencil`, `icon-truck`, `icon-trash`, `icon-minus`, `icon-plus`, `icon-discount`. | rendered by the drawer |
| `assets/main.css` | compiled CSS — the exact cart rules are quoted in **A2** (add any that 4.2 lacks) |
| `config/settings_schema.json` → **Cart** group | theme cart settings — **A3** |
| `config/settings_data.json` → `current` | saved values — **A4** |

---

### A1. Exact source — copy each file verbatim

#### `sections/cart-modal.liquid`
Copy this **entire file** exactly (it includes the inline `<style>`, the savings/discount summary, delivery dates, buttons, confidence line, order-note & shipping child drawers, empty state, and the schema). The only edit vs. this is the **perf fix in A5** (remove the dead `Pakistan/UAE` line).

```liquid
<style>
  #shopify-section-{{ section.id }} .button-view-cart {
    {% render 'button-vars',
      background: section.settings.view_cart_background_color,
      text: section.settings.view_cart_text_color
    %}
  }

  #shopify-section-{{ section.id }} .button-checkout {
    {% render 'button-vars',
      background: section.settings.checkout_background_color,
      text: section.settings.checkout_text_color
    %}
  }

  .confidence-text{
    line-height: normal;
    color: #34A853;
    font-weight: 500;
  }

  .color-green{
    color: #34A853;
  }

  .save-percentage-badge .info-badge.sale-badge {
      font-size: 11px;
      padding: 3px 5px;
  }

   .custom-property-item{
    line-break: anywhere;
  }


  @media screen and (max-width: 520px){
    .total-with-discount-wrapper > * {
      font-size: 14px;
    }
    .confidence-text {
        font-size: 12px;
    }
  }

</style>

<cart-modal position="left" md:position="right" class="modal modal-drawer modal-drawer--right cart-modal" id="cart-modal">
  <div class="h-full" slot="content" tabindex="-1">
    {% if cart != empty %}
      <cart-form>
        <div class="flex flex-col h-full">
          <div
            class="flex flex-col grow pb-6 overflow-y-auto"
            id="CartModal-ScrollBody"
            data-preserve-scroll
          >
            <div class="modal-header px-[--cart-modal-px]">
              <div class="flex items-center">
                <h2 class="h4">
                  {{ 'sections.cart.title' | t }}
                </h2>

                <button
                  class="modal-close ml-auto relative -right-2"
                  data-button-close
                  aria-label="{{ 'accessibility.close_modal' | t }}"
                >
                  {% render 'icon-times' %}
                </button>
              </div>

              {% render 'free-shipping-indicator', class: 'mt-1' %}
            </div>

            <div class="">
              {% for item in cart.items %}
                {% assign index = item.index | plus: 1 %}
                {% render 'cart-modal-item',
                  item: item,
                  class: 'pt-3 px-[--cart-modal-px] mb-3 first:border-t-0 border-t border-separator gap-y-1',
                  index: index
                %}
              {% endfor %}
            </div>

            {% render 'cart-modal-product-recommendations' %}
          </div>



          <div class="mt-0 px-[--cart-modal-px] border-t">
             {% if section.settings.show_cart_note or section.settings.show_shipping_estimator %}
              <div class="flex flex-wrap gap-x-6 gap-y-4 my-2 md:my-3">
                {% if section.settings.show_cart_note %}
                  <modal-trigger class="contents" target="#cart-modal-add-order-note">
                    <button class="flex gap-3 text-xs md:text-sm hover:underline underline-offset-4">
                      <div class="icon-xs md:icon-sm">
                        {% render 'icon-pencil' %}
                      </div>
                      <span class="order-note-button-label">
                        {% if cart.note != blank %}
                          {{ 'sections.cart.edit_note' | t }}
                        {% else %}
                          {{ 'sections.cart.add_note' | t }}
                        {% endif %}
                      </span>
                    </button>
                  </modal-trigger>
                {% endif %}

                {% if section.settings.show_shipping_estimator %}
                  <modal-trigger class="contents" target="#cart-modal-estimate-shipping">
                    <button class="flex gap-3 text-xs md:text-sm hover:underline underline-offset-4">
                      <div class="icon-xs md:icon-sm">
                        {% render 'icon-truck' %}
                      </div>
                      <span>{{ 'sections.cart.estimate_shipping' | t }}</span>
                    </button>
                  </modal-trigger>
                {% endif %}
              </div>
            {% endif %}
          </div>
          <div class="mt-0 px-[--cart-modal-px] pt-4 sm:pt-2 pb-2 sm:pb-4 border-t">

            <div class="total-with-discount-wrapper">
    {% liquid

        assign compare_at_total = 0
        assign total_compare_at_savings = 0
        assign c_savings_percent = 0
        assign regular_price_total = 0
        assign discount_total = cart.total_discount

        for item in cart.items
          assign item_total_compare_price = 0
          assign quantity = item.quantity
          assign regular_price = item.variant.price
          assign compare_price = item.variant.compare_at_price
          assign item_total_regular_price = regular_price | times: quantity

          if compare_price and compare_price > regular_price
            assign item_total_compare_price = compare_price | times: quantity
           else
            assign item_total_compare_price = regular_price | times: quantity
          endif

          assign compare_at_total = compare_at_total | plus: item_total_compare_price
          assign regular_price_total = regular_price_total | plus: item_total_regular_price

           if compare_price and compare_price > regular_price
                assign single_item_save = compare_price | minus: regular_price
                assign line_item_save = single_item_save | times: quantity
                assign total_compare_at_savings = total_compare_at_savings | plus: line_item_save
          endif

          assign item_level_discount_percentage = 0
          if item.line_level_discount_allocations.size > 0
            for discount in item.line_level_discount_allocations
              assign item_level_discount_percentage = item_level_discount_percentage | plus: discount.discount_application.value | round
            endfor
          endif
        endfor

        if compare_at_total > 0 and total_compare_at_savings > 0
          assign c_savings_percent = total_compare_at_savings | times: 100.0 | divided_by: compare_at_total | round
        endif

        assign cart_level_discount_percentage = 0
        for discount in cart.cart_level_discount_applications
          assign cart_level_discount_percentage = cart_level_discount_percentage | plus: discount.value | round
        endfor

        assign grand_saving = c_savings_percent | plus: item_level_discount_percentage | plus: cart_level_discount_percentage

        assign total_line_price = compare_at_total | minus: regular_price_total
        assign total_saved_amount = total_line_price | plus: discount_total

      %}

      <style>
        #grand-saving {
          font-size: 14px;
          color: #34A853;
        }
        #grand-saving svg {
          width: 14px;
        }

      </style>

      <div class="mb-2 h6 leading-none flex items-center justify-between gap-4 flex-properties cart__summary-item cart__total summary-total-price-wrapper">
          <span class="cart__original-total-label">
            Total Price
          </span>
          <span class="summary-total-price" id="summary-total-price">
              {{ compare_at_total | money }}
          </span>
      </div>
      <div class="mb-2 h6 leading-none flex items-center justify-between gap-4 flex-properties cart__summary-item cart__total summary-total-compare-wrapper font-600 color-green">
          <span class="cart__original-total-label flex items-center gap-1">
            Discount <span id="grand-saving" class="grand-saving flex items-center whitespace-nowrap gap-1"> {% render 'icon-discount' %} {{ grand_saving | append: '%' }}  </span>
          </span>
          <span class="summary-total-compare-price" id="summary-total-compare-price">
              -{{ total_saved_amount | money }}
          </span>
      </div>

  </div>

            <div class="h6 leading-none flex items-center justify-between gap-4 font-600">
              <div>
                {{ 'sections.cart.total' | t }}
              </div>

              <div class="cart-total">{{ cart.total_price | money }}</div>
            </div>

            {% if section.settings.show_tax_and_shipping_message %}
              <div class="text-xs md:text-sm text-foreground/75 mt-2">
                {% render 'cart-policy-text' %}
              </div>
            {% endif %}


             {% render 'product-delivery-dates', block: section, class: 'my-2', text_size_delivery_class: 'text-sm font-600' %}

            <div class="cart-modal-buttons flex flex-wrap gap-2 md:gap-3 mt-2">
              {% if section.settings.show_view_cart_button or section.settings.show_checkout_button == false %}
                <a
                  data-instant
                  href="{{ routes.cart_url }}"
                  class="button button-secondary button-view-cart min-w-fit max-sm:text-xs flex-1"
                >
                  {{ 'sections.cart.view_cart' | t }}
                </a>
              {% endif %}

              {% if section.settings.show_checkout_button %}
                {% form 'cart', cart, data-form-button-loading: true, class: 'contents' %}
                  <button
                    type="submit"
                    name="checkout"
                    class="button button-primary button-checkout min-w-fit max-sm:text-xs flex-1"
                  >
                    {{ 'sections.cart.checkout' | t }}
                  </button>
                {% endform %}
              {% endif %}
            </div>
            <p class="confidence-text text-sm text-center mt-1"> Shop with confidence - 30 days easy return </p>
          </div>
        </div>
      </cart-form>

      <order-note-drawer
        class="modal modal--absolute modal-drawer modal-drawer--bottom cart-modal-child"
        position="bottom"
        id="cart-modal-add-order-note"
        animation="fade-in"
      >
        <div slot="content" tabindex="-1" class="px-8 md:px-12 py-8 md:py-10">
          <div class="flex justify-between items-center mb-6 md:mb-8">
            <div class="h5">{{ 'sections.cart.note' | t }}</div>
            <button class="modal-close" data-button-close aria-label="{{ 'accessibility.close_modal' | t }}">
              {% render 'icon-times' %}
            </button>
          </div>
          <form data-form-button-loading>
            <div class="form-floating">
              <textarea
                class="input"
                name="note"
                id="CartModal-Note"
                placeholder="{{ 'sections.cart.note' | t }}"
                rows="4"
              >{{ cart.note }}</textarea>
              <label for="CartModal-Note">{{ 'sections.cart.note' | t }}</label>
            </div>
            <button type="submit" class="button w-full mt-6 md:mt-8">
              {{ 'sections.cart.save_note_button' | t }}
            </button>
            <div class="message message-danger text-danger mt-6 hidden">
              {{ 'sections.cart.save_note_failed' | t }}
            </div>
          </form>
        </div>
      </order-note-drawer>

      <modal-drawer
        class="modal modal--absolute modal-drawer modal-drawer--bottom cart-modal-child"
        position="bottom"
        id="cart-modal-estimate-shipping"
        animation="fade-in"
      >
        <div slot="content" tabindex="-1" class="p-8 md:p-12">
          <div class="flex justify-between items-center mb-6 md:mb-8">
            <div class="heading text-lg md:text-h5">
              {{ 'sections.shipping_estimator.title' | t }}
            </div>
            <button class="modal-close" data-button-close aria-label="{{ 'accessibility.close_modal' | t }}">
              {% render 'icon-times' %}
            </button>
          </div>

          {% render 'shipping-estimator' %}
        </div>
      </modal-drawer>
    {% else %}
      <button
        class="modal-close absolute right-6 top-6 md:right-8 md:top-8"
        data-button-close
        aria-label="{{ 'accessibility.close_modal' | t }}"
      >
        {% render 'icon-times' %}
      </button>

      <div class="text-center h-full flex flex-col items-center justify-center">
        <p class="text-h4">{{ 'sections.cart.empty' | t }}</p>
        <a class="button button-primary mt-8" href="{{ settings.cart_empty_button_link }}">
          {{ 'general.continue_shopping' | t }}
        </a>
      </div>
    {% endif %}
  </div>
</cart-modal>

{% schema %}
{
  "name": "t:sections.cart-modal.name",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_tax_and_shipping_message",
      "label": "t:sections.cart-modal.settings.show_tax_and_shipping_message.label",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_cart_note",
      "label": "t:sections.cart-modal.settings.show_cart_note.label",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_shipping_estimator",
      "label": "t:sections.cart-modal.settings.show_shipping_estimator.label",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_view_cart_button",
      "label": "t:sections.cart-modal.settings.show_view_cart_button.label",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_checkout_button",
      "label": "t:sections.cart-modal.settings.show_checkout_button.label",
      "default": true
    },
    {
      "type": "header",
      "content": "t:sections.cart-modal.headers.product_recommendations"
    },
    {
      "type": "text",
      "id": "product_recommendations_heading",
      "label": "t:sections.cart-modal.settings.product_recommendations_heading.label",
      "default": "You may also like"
    },
    {
      "type": "product_list",
      "id": "product_recommendations",
      "label": "t:sections.cart-modal.settings.product_recommendations.label"
    },
    {
      "type": "header",
      "content": "t:sections.all.headers.button_colors"
    },
    {
      "type": "color",
      "id": "view_cart_background_color",
      "label": "t:sections.cart-modal.settings.view_cart_background_color.label"
    },
    {
      "type": "color",
      "id": "view_cart_text_color",
      "label": "t:sections.cart-modal.settings.view_cart_text_color.label"
    },
    {
      "type": "color",
      "id": "checkout_background_color",
      "label": "t:sections.cart-modal.settings.checkout_background_color.label"
    },
    {
      "type": "color",
      "id": "checkout_text_color",
      "label": "t:sections.cart-modal.settings.checkout_text_color.label"
    },
    {
      "type" : "header",
      "content": "Delivery Dates"
    },
    {
      "id": "delivery_from",
      "label": "Delivery From",
      "type": "range",
      "min": 2,
      "max": 14,
      "step": 1,
      "default": 3,
      "info": "Write the number of days from today for starting delivery day"
    },
    {
      "id": "delivery_to",
      "label": "Delivery To",
      "type": "range",
      "min": 2,
      "max": 14,
      "step": 1,
      "default": 5,
      "info": "Write the number of days from today for ending delivery day"
    }
  ]
}
{% endschema %}
```

#### `snippets/cart-modal-item.liquid` (verbatim)
```liquid
<div
  class="cart-modal-item grid grid-cols-[4rem_auto] sm:grid-cols-[5rem_auto] gap-3 sm:gap-2 {{ class }}"
  data-cart-item-index="{{ index }}"
>
  <div class="row-span-2">
    <a data-instant href="{{ item.url }}" tabindex="-1">
      {% if item.image %}
        <lqip-element class="image-loader">
          {{
            item.image
            | image_url: width: 192
            | image_tag:
              widths: '96, 128, 192',
              class: 'rounded-block-xs product-thumbnail-shade',
              sizes: '(min-width: 576px) 96px, 64px',
              loading: 'lazy'
          }}
        </lqip-element>
      {% else %}
        {% render 'placeholder', type: 'image', class: 'placeholder rounded-block-xs' %}
      {% endif %}
    </a>
  </div>

  <div class="flex items-start">
    <div class="grow pr-4">
      <a data-instant href="{{ item.url }}">
        <h2 class="product-name max-md:text-sm">
          {{ item.product.title }}
        </h2>
      </a>

      {% unless item.product.has_only_default_variant %}
        <div class="text-xs md:text-sm text-foreground/75">
          {{ item.variant.title }}
        </div>
      {% endunless %}

      {% unless item.properties == empty %}
        <div class="styled-links text-xs md:text-sm mt-1 text-foreground/75">
          {% for property in item.properties %}
            <div class="custom-property-item">
              {% assign property_first_char = property.first | slice: 0 %}
              {% if property.last != blank and property_first_char != '_' %}
                <span>{{ property.first }}:</span>
                {% if property.last contains '/uploads/' %}
                  <a href="{{ property.last }}" target="_blank">
                    {{ property.last | split: '/' | last }}
                  </a>
                {% else %}
                  <span>{{ property.last }}</span>
                {% endif %}
              {% endif %}
            </div>
          {% endfor %}
        </div>
      {% endunless %}
    </div>

    <a
      class="block icon-sm md:icon-md shrink-0 p-2.5 -m-2.5 box-content"
      role="button"
      href="{{ item.url_to_remove }}"
      data-button-remove
      data-index="{{ index }}"
      aria-label="{{ 'accessibility.cart_remove_item' | t: item: item.product.title }}"
    >
      {% render 'icon-trash' %}
    </a>
  </div>

  <div class="flex items-center styled-links max-md:text-sm">
    {% render 'line-item-price', item: item %}

    <div class="ml-auto">
      {% render 'qty-selector', item: item %}
    </div>
  </div>

  <div class="message message-danger text-danger text-xs md:text-sm col-start-2"></div>
</div>
```
> (I stripped the two commented-out `{% comment %}` blocks — they were dead. If you want byte-for-byte parity keep them; they render nothing.)

#### `snippets/qty-selector.liquid` (verbatim)
```liquid
<qty-selector class="qty-selector">
  <button
    type="button"
    data-dec
    class="button button-light qty-selector__button"
    aria-label="{{ 'accessibility.decrease_quantity' | t }}"
  >
    {% render 'icon-minus' %}
  </button>

  <label for="{{ id }}" class="visually-hidden">Quantity</label>
  <input
    class="hide-input-arrows"
    type="number"
    id="{{ id }}"
    {% if item %}
      {% if name != false %} name="updates[]" {% endif %}
      value="{{ item.quantity }}"
      min="0"
      aria-label="{{ 'products.quantity.input_label' | t: product: item.product.title | escape }}"
      data-index="{{ item.index | plus: 1 }}"
    {% elsif product_form_id %}
      name="quantity"
      form="{{ product_form_id }}"
      value="1"
      min="1"
    {% else %}
      value="1"
      min="1"
    {% endif %}
  >

  <button
    type="button"
    data-inc
    class="button button-light qty-selector__button"
    aria-label="{{ 'accessibility.increase_quantity' | t }}"
  >
    {% render 'icon-plus' %}
  </button>
</qty-selector>
```

#### `snippets/product-delivery-dates.liquid` (verbatim — reads `block.settings.delivery_from/to`)
```liquid
 <div class="product-delivery-dates block product-delivery-dates block pr-4 {{ class }}">
              <span class="caption-large flex free-ship-note items-center rte tax-note gap-2">
                <div class="icon-md">
                    {% render 'icon-truck' %}
                  </div>
                {% assign today = 'now' | date: '%s' %}
                {% assign one_day = 86400 %}
                {% assign start_days = block.settings.delivery_from | default: 3 %}
                {% assign end_days = block.settings.delivery_to | default: 5 %}

                {% assign start_date = today %}
                {% assign end_date = today %}
                {% assign business_days = 0 %}

                {% for i in (1..20) %}
                  {% assign start_date = start_date | plus: one_day %}
                  {% assign day_name = start_date | date: '%a' %}
                  {% if day_name != 'Sat' and day_name != 'Sun' %}
                    {% assign business_days = business_days | plus: 1 %}
                  {% endif %}
                  {% if business_days == start_days %}
                    {% break %}
                  {% endif %}
                {% endfor %}

                {% assign start_display = start_date | date: '%b %e' %}

                {% assign business_days = 0 %}
                {% assign end_date = today %}
                {% for i in (1..25) %}
                  {% assign end_date = end_date | plus: one_day %}
                  {% assign day_name = end_date | date: '%a' %}
                  {% if day_name != 'Sat' and day_name != 'Sun' %}
                    {% assign business_days = business_days | plus: 1 %}
                  {% endif %}
                  {% if business_days == end_days %}
                    {% break %}
                  {% endif %}
                {% endfor %}

                {% assign start_month = start_date | date: '%b' %}
                {% assign end_month = end_date | date: '%b' %}
                {% assign start_day = start_date | date: '%e' %}
                {% assign end_day = end_date | date: '%e' %}

                {% if start_month == end_month %}
                  <span class="{{ text_size_delivery_class }}">Receive by {{ start_month }} {{ start_day }} - {{ end_month }} {{ end_day }}</span>
                {% else %}
                  <span class="{{ text_size_delivery_class }}">Receive by {{ start_month }} {{ start_day }} - {{ end_month }} {{ end_day }}</span>
                {% endif %}
              </span>
            </div>
```
> Note: it's rendered with `block: section`, so `block.settings.delivery_from/to` resolves to the **section** settings `delivery_from` (3) / `delivery_to` (5). Keep both branches of the final `if` even though they're identical (that's how mine is).

#### `snippets/cart-modal-product-recommendations.liquid` (verbatim)
```liquid
{% liquid
  assign product_recommendations = section.settings.product_recommendations
  assign product_ids = cart.items | map: 'product_id'
%}

{% capture recommendations_html %}
  {% for item in product_recommendations %}
    {% if item.available == false or product_ids contains item.id %}
      {% continue %}
    {% endif %}
    <div class="grid-carousel-item snap-start snap-always">
      {% render 'complementary-product', product: item, borderless: true %}
    </div>
    {% assign has_recommendations = has_recommendations | plus: 1 %}
  {% endfor %}
{% endcapture %}

{% if has_recommendations > 0 %}
  <div class="mt-auto px-[--cart-modal-px] border-t pt-6">
    {% render 'mini-product-carousel',
      heading: section.settings.product_recommendations_heading,
      count: has_recommendations,
      items_html: recommendations_html,
      carousel_class: '[--bleed-distance:--cart-modal-px] bleed',
      grid_carousel_class: 'grid-carousel--pseudo-pr'
    %}
  </div>
{% endif %}
```

#### `snippets/line-item-price.liquid` (verbatim — the per-item price + sale badge)
```liquid
{% liquid
  assign original_price = item.original_price

  if original_price == item.final_price and item.fulfillment == blank and item.variant.compare_at_price > item.final_price
    assign original_price = item.variant.compare_at_price
  endif
%}

{%- if original_price != item.final_price or item.unit_price_measurement -%}
  <div>
    {%- if original_price != item.final_price -%}
      <div class="flex gap-x-2 flex-wrap line-item-price-badge">
        <div class="sale-price">
          <span class="visually-hidden">{{ 'products.product.price.sale_price' | t }}</span>
          <span>{{ item.final_price | money }}</span>
        </div>
        <div class="regular-price opacity-60">
          <span class="visually-hidden">{{ 'products.product.price.regular_price' | t }}</span>
          <s>{{ original_price | money }}</s>
        </div>
        <div class="save-percentage-badge">
        {% render 'product-save-badge' card_product: item.variant %}
        </div>
      </div>

    {%- else -%}
      <div>
        <span class="visually-hidden">{{ 'products.product.price.regular_price' | t }}</span>
        {{ original_price | money }}
      </div>
    {%- endif -%}

    {%- if item.unit_price_measurement -%}
      <div class="text-xs text-foreground/75 mt-1">
        <span class="visually-hidden">
          {{ 'products.product.price.unit_price' | t }}
        </span>
        <span class="unit-price">
          <span>{{- item.unit_price | money -}}</span>
          <span aria-hidden="true">/</span>
          <span class="visually-hidden">&nbsp;{{ 'accessibility.unit_price_separator' | t }}&nbsp;</span>
          <span>
            {%- if item.unit_price_measurement.reference_value != 1 -%}
              {{- item.unit_price_measurement.reference_value -}}
            {%- endif -%}
            {{ item.unit_price_measurement.reference_unit }}
          </span>
        </span>
      </div>
    {%- endif -%}
  </div>
{%- else -%}
  <div>{{ item.final_price | money }}</div>
{%- endif -%}
```
> Renders `{% render 'product-save-badge' card_product: item.variant %}` (the green `.save-percentage-badge` styled in the section's inline `<style>`). `product-save-badge` is stock in Essence — verify it exists on 4.2; if my version differs, port it too.

#### `snippets/cart-policy-text.liquid` (verbatim — the tax/shipping line)
```liquid
{%- if cart.taxes_included and shop.shipping_policy.body != blank -%}
  {{ 'sections.cart.taxes_included_and_shipping_policy_html' | t: link: shop.shipping_policy.url }}
{%- elsif cart.taxes_included -%}
  {{ 'sections.cart.taxes_included_but_shipping_at_checkout' | t }}
{%- elsif shop.shipping_policy.body != blank -%}
  {{ 'sections.cart.taxes_and_shipping_policy_at_checkout_html' | t: link: shop.shipping_policy.url }}
{%- else -%}
  {{ 'sections.cart.taxes_and_shipping_at_checkout' | t }}
{%- endif -%}
```
> This is stock; output depends on **Settings → Taxes** ("include tax in prices") and whether a **Shipping policy** is set on the new store. Set those the same to get identical text.

#### `snippets/button-vars.liquid` (verbatim — powers the View Cart / Checkout color vars)
```liquid
{% assign prefix = prefix | default: '--button' %}
{% assign prefix_background = prefix | append: '-background' %}

{% if background != blank and background.rgba != '0 0 0 / 0.0' %}
  {{ prefix_background }}: {{ background.rgb }};
  {% render 'button-hover-active-vars', var: prefix_background, color: background %}
{% endif %}

{% if text != blank and text.rgba != '0 0 0 / 0.0' %}
  {{ prefix }}-foreground: {{ text.rgb }};
{% endif %}
```
> Because my 4 cart button colors are **blank**, `button-vars` emits **nothing** → the buttons keep the theme's secondary/primary colors. It also renders `button-hover-active-vars` (stock) — verify that exists on 4.2.

---

### A2. Exact CSS — the cart rules from my compiled `main.css`

These are the real rules that style the drawer. In 4.2 many already exist identically; **diff and only add/patch what differs**. Values are 1:1 from my theme.

```css
/* ---- Drawer container / panel ---- */
.modal-drawer::part(panel) {
  position: relative;
  width: 28rem;
  max-width: 95vw;
  box-sizing: border-box;
  border-radius: 0;
}
.modal-drawer::part(panel-wrapper) { justify-content: flex-end; }
.modal-drawer--right::part(panel-wrapper) { justify-content: flex-end; }
.modal-drawer--left::part(panel-wrapper)  { justify-content: flex-start; }

.cart-modal { --cart-modal-px: 1rem; }               /* horizontal padding token */
@media (min-width: 576px) { .cart-modal { --cart-modal-px: 1rem; } }
@media (min-width: 768px) { .cart-modal { --cart-modal-px: 1.5rem; } }
.cart-modal::part(panel) { width: 32rem; overflow: hidden; }   /* <-- drawer is 32rem wide */

/* utility used on header/items/footer */
.px-\[--cart-modal-px\] { padding-left: var(--cart-modal-px); padding-right: var(--cart-modal-px); }

/* child drawers (order note / shipping estimate) */
.cart-modal-child { --overlay-bg: rgb(0 0 0 / 25%); }
.cart-modal-child::part(panel-wrapper) { padding: 0; }
.cart-modal-child::part(panel) { width: 100%; border-radius: 0; }

/* ---- Header ---- */
.modal-header {
  border-bottom-width: 1.25px;
  padding-left: 2rem;    /* overridden by .px-[--cart-modal-px] on the element */
  padding-right: 2rem;
  padding-bottom: .75rem;
  padding-top: 1.5rem;
}
@media (min-width: 576px) {
  .modal-header { padding-left: 2.5rem; padding-right: 2.5rem; padding-bottom: 1rem; padding-top: 1rem; }
}

/* ---- Close button ---- */
.modal-close {
  cursor: pointer; display: inline-block; line-height: 0;
  border-radius: 100rem; padding: 0.5rem; box-sizing: content-box; flex-shrink: 0;
}
.modal-close svg { width: 1.25rem; --icon-stroke-width: var(--icon-sm-stroke-width); }
@media (min-width: 768px) { .modal-close svg { width: 1.5rem; --icon-stroke-width: var(--icon-md-stroke-width); } }
.modal-close:hover { background-color: rgb(var(--color-foreground)); color: rgb(var(--color-background)); }

/* ---- Free-shipping progress bar ---- */
.progress-bar {
  background-color: rgb(var(--black) / 6%);
  height: 0.35rem;
  overflow: hidden;
  border-radius: var(--block-xs-corner-radius);
}
.progress-bar-inner {
  background-color: rgb(var(--color-progress-bar));   /* = colors_progress_bar, blank -> --color-base-accent */
  height: 100%;
}

/* ---- Line item ---- */
.cart-modal-item .product-name { min-height: 45px; font-size: 14px; }
@media (max-width: 767px) { .product-name { min-height: 40px; } }   /* (mobile variant) */
.cart-modal .icon-md { width: 1.25rem; --icon-stroke-width: var(--icon-md-stroke-width); }

/* ---- Qty stepper (smaller inside the drawer) ---- */
.qty-selector__button { height: 2.5rem; width: 2.5rem; flex-shrink: 0; touch-action: manipulation; }
.cart-modal-item .qty-selector__button { height: 2rem; width: 2rem; }
@media (max-width: 520px) { .cart-modal-item .qty-selector__button { height: 1.5rem; width: 1.5rem; } }
@media (min-width: 768px) { .cart-modal-item .qty-selector__button { height: 1.5rem; width: 1.5rem; } }
.qty-selector__button > svg { width: 0.75rem; height: 0.75rem; }
@media not all and (min-width: 768px) { .qty-selector__button > svg { width: 0.5rem; height: 0.5rem; } }

/* ---- Buttons spacing ---- */
.cart-modal .heading + .cart-modal-buttons { margin-top: 2rem; }
@media (min-width: 768px) { .cart-modal .heading + .cart-modal-buttons { margin-top: 2.5rem; } }
```

**Colors (theme color settings — carry these over in `settings_data.json`):**
- `colors_free_shipping_bar` → **`#34a853`** (my saved value; drives `--color-free-shipping-bar`, used for the free-shipping message text).
- `colors_progress_bar` → **blank** in my store → `--color-progress-bar` **falls back to `--color-base-accent`**, so the progress **fill** uses the theme accent, not the green. Keep `colors_progress_bar` blank to match, or set it if you want a specific fill color.
- The inline greens (`#34A853`) in the section's `<style>` are hardcoded (confidence text, `.color-green`, `#grand-saving`) — keep as-is.

---

### A3. Theme **Cart settings** (`config/settings_schema.json` → "Cart" group)
Ensure these exist with my values/defaults:
- `cart_type` (select drawer/page) — **drawer**
- `added_to_cart_notification` (select popup/drawer, "After adding to cart") — **drawer**
- `cart_icon` (select bag/cart) — default **bag**
- `cart_empty_button_link` (url) — default `/collections/all`
- Header **"Free shipping bar"**:
  - `cart_free_shipping_bar_enabled` (checkbox) — **true**
  - `cart_free_shipping_bar_threshold` (number) — **100**
  - `cart_free_shipping_threshold_per_currency` (textarea) — lines like `USD:100` / `EUR:90` / `CAD:80`
  - **`cart_free_shipping_countries`** (textarea) — **NEW, added in Part B**

### A4. Saved values to set (from my `settings_data.json` → `current`)

| Setting | Value |
|---|---|
| `cart_type` | **drawer** |
| `added_to_cart_notification` | **drawer** |
| `cart_icon` | default **bag** (set `cart` only if your store shows the Cart icon) |
| `cart_empty_button_link` | default **`/collections/all`** |
| `cart_free_shipping_bar_enabled` | **true** |
| `cart_free_shipping_bar_threshold` | **100** |
| `cart_free_shipping_threshold_per_currency` | blank |
| `colors_free_shipping_bar` | **`#34a853`** |
| `colors_progress_bar` | blank (→ base accent) |
| **cart-modal section** `show_tax_and_shipping_message` | **true** (default) |
| `show_cart_note` | **true** (default) |
| `show_shipping_estimator` | **true** (default) |
| `show_view_cart_button` | **true** (default) |
| `show_checkout_button` | **true** (default) |
| `product_recommendations_heading` | **"You may also like"** (default) |
| `product_recommendations` | store-specific — set the same products |
| `view_cart_background_color` / `view_cart_text_color` | **blank** → View Cart inherits theme **secondary** button colors |
| `checkout_background_color` / `checkout_text_color` | **blank** → Checkout inherits theme **primary** button colors |
| `delivery_from` / `delivery_to` | **3 / 5** (defaults) |

> The cart-modal section is a **static section** rendered in the cart section-group — its settings aren't in `settings_data.json`, so they resolve to the **schema defaults** above (all `show_*` = true, both button color pairs blank, delivery 3/5). Confirm that on 4.2.

### A5. Performance fixes (do these while porting)
1. **Free-shipping bar render-then-hide hack (main issue):** my current `free-shipping-indicator.liquid` **always** renders the bar, then hides it for every country except US via an inline `<style>`:
   ```css
   .free-shipping-indicator { display:none }
   .free-shipping-indicator.market-country-US { display:block }
   ```
   plus a `market-country-{{ localization.country.iso_code }}` class. This ships markup + an inline `<style>` on **every cart render/AJAX update** just to hide it. **Part B replaces this** with a server-side Liquid condition that renders the bar only when it should show — no inline style, no hidden markup.
2. **Dead code in `cart-modal.liquid`:** remove the no-op line `{% if localization.country == 'Pakistan' or localization.country == 'United Arab Emirates' %}{% endif %}` (empty body — it was already stripped from the verbatim copy above, so just confirm it's gone).
3. **Inline `<style>` re-injection (optional):** the drawer injects small `<style>` blocks (button vars, `#grand-saving`, confidence text, `.color-green`, `.save-percentage-badge`) that get re-parsed on each AJAX cart re-render. Prefer moving the **static** rules into a small CSS asset loaded once; keep only the dynamic `{% render 'button-vars' %}` output inline. (My store leaves them inline — do this only if you want the extra perf.)

---

## PART B — Country-restricted free-shipping bar (new feature)

**Goal:** a textarea where the merchant lists country codes (one per line, e.g. `US`, `CA`, `UK`). If the list has entries → the free-shipping progress bar shows **only** in those countries. If the list is **blank** → the bar shows in **all** countries. (Replaces the hardcoded US-only behavior from A5.1.)

### B1. Add the setting
In `config/settings_schema.json`, in the **Cart** group's "Free shipping bar" header, **after** `cart_free_shipping_threshold_per_currency`, add:
```json
{
  "id": "cart_free_shipping_countries",
  "type": "textarea",
  "label": "Show free-shipping bar only in these countries",
  "placeholder": "US\nGB\nCA",
  "info": "One ISO country code per line (e.g. US, GB, CA). Leave blank to show the bar in ALL countries. Use GB for the United Kingdom (UK is auto-mapped to GB)."
}
```

### B2. Replace `snippets/free-shipping-indicator.liquid` entirely with:
```liquid
{% if settings.cart_free_shipping_bar_enabled %}
  {% liquid
    # --- Country gate: show for all when list is blank; else only listed ISO codes ---
    assign show_bar = true
    if settings.cart_free_shipping_countries != blank
      assign show_bar = false
      assign current_country = localization.country.iso_code | upcase
      assign allowed_list = settings.cart_free_shipping_countries | newline_to_br | strip_newlines | replace: '<br />', ',' | replace: ' ', '' | upcase | split: ','
      for c in allowed_list
        assign code = c | strip
        if code == 'UK'
          assign code = 'GB'
        endif
        if code == current_country
          assign show_bar = true
          break
        endif
      endfor
    endif
  %}

  {% if show_bar %}
    {% liquid
      assign free_shipping_threshold = settings.cart_free_shipping_bar_threshold
      if settings.cart_free_shipping_threshold_per_currency != blank
        assign currency_thresholds = settings.cart_free_shipping_threshold_per_currency | newline_to_br | strip_newlines | split: '<br />'
        for currency_threshold in currency_thresholds
          assign ct = currency_threshold | split: ':'
          if ct.size == 2 and cart.currency.iso_code == ct[0]
            assign free_shipping_threshold = ct[1] | plus: 0
            break
          endif
        endfor
      endif
      assign cart_total = cart.total_price | divided_by: 100.0
      assign remaining = free_shipping_threshold | minus: cart_total
      assign remaining_text = remaining | times: 100.0 | money
    %}
    <div class="free-shipping-indicator max-md:text-sm {{ class }}" {{ attrs }}>
      <div>
        {% if remaining > 0 %}
          {{ 'sections.cart.free_shipping_message_html' | t: remaining: remaining_text }}
        {% else %}
          {{ 'sections.cart.free_shipping_qualified_html' | t }}
        {% endif %}
      </div>

      <div class="progress-bar mt-1">
        <div
          class="progress-bar-inner {% if remaining > 0 %} remaining-bar {% else %} complete-bar {% endif %}"
          style="width: {{ cart_total | times: 100.0 | divided_by: free_shipping_threshold }}%;"
        ></div>
      </div>
    </div>
  {% endif %}
{% endif %}
```
> For reference, my **old** (buggy) snippet — do NOT keep this; it's what B2 replaces:
> ```liquid
> {% if settings.cart_free_shipping_bar_enabled %}
>   {% liquid
>     assign free_shipping_threshold = settings.cart_free_shipping_bar_threshold
>     if settings.cart_free_shipping_threshold_per_currency != blank
>       assign currency_thresholds = settings.cart_free_shipping_threshold_per_currency | newline_to_br | strip_newlines | split: '<br />'
>       for currency_threshold in currency_thresholds
>         assign ct = currency_threshold | split: ':'
>         if ct.size == 2 and cart.currency.iso_code == ct[0]
>           assign free_shipping_threshold = ct[1] | plus: 0
>           break
>         endif
>       endfor
>     endif
>     assign cart_total = cart.total_price | divided_by: 100.0
>     assign remaining = free_shipping_threshold | minus: cart_total
>     assign remaining_text = remaining | times: 100.0 | money
>   %}
>   <style>
>     .free-shipping-indicator { display: none; }
>     .free-shipping-indicator.market-country-US { display: block; }
>   </style>
>   <div class="free-shipping-indicator market-country-{{ localization.country.iso_code }} max-md:text-sm {{ class }}" {{ attrs }}>
>     ...
>   </div>
> {% endif %}
> ```

### B3. Behavior notes / edge cases
- **Blank list → bar shows everywhere** (the new default). Intentionally different from the old US-only hardcoding.
- **`UK` auto-maps to `GB`** (Shopify's ISO code for the United Kingdom is `GB`). The merchant may type either.
- Parsing tolerates **newlines or commas** and stray spaces, case-insensitive.
- Uses `localization.country.iso_code` (visitor's shipping/market country). Confirm `localization.country` is available in the cart context on 4.2 (it is in Essence).
- The `.market-country-*` class and the inline `display:none` style are **removed** — search the compiled CSS/theme for any leftover `.free-shipping-indicator { display:none }` rule and remove it.

---

## Report back
- Which cart files existed in 4.2 vs. ported; confirm `cart-modal.liquid` customizations are intact: savings/discount summary (`compare_at_total`, `grand_saving`, `total_saved_amount`), delivery dates via `delivery_from/to`, confidence line, button color vars, order-note + shipping child drawers, product recommendations, empty state.
- Confirm the exact styling reproduced: drawer width **32rem**, `--cart-modal-px` 1rem/1.5rem, header border/padding, progress-bar **0.35rem**, qty buttons **2rem→1.5rem**, button spacing.
- Confirm settings/values: `cart_type: drawer`, `added_to_cart_notification: drawer`, free-shipping enabled + threshold **100**, `colors_free_shipping_bar: #34a853`, section defaults (all `show_*` true, button colors blank, delivery **3/5**), `product_recommendations` set to the same products.
- Confirm perf fixes: no render-then-hide `<style>` in the indicator, dead `Pakistan/UAE` line gone, (optional) static inline styles consolidated.
- Confirm the new `cart_free_shipping_countries` setting exists and the bar: (a) shows in all countries when blank, (b) shows only in listed countries when set, (c) maps `UK→GB`; and no stale `.free-shipping-indicator { display:none }` remains.
- Note store-specific deps: `product-delivery-dates` snippet, `cart_empty_button_link` target, and the `product_recommendations` product list.
