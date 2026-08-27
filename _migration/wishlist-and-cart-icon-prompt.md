# Migration Prompt — Wishlist Heart (on product media) + Cart Icon in "Add to cart" button

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisite: the PDP (`main-product`) prompt. **Part A** needs the **XB Wishlist** app installed.
> This contains the **complete verbatim** Liquid + CSS + the SVG icons + behavior for both features, so the structure is identical on the other store.

---

Reproduce two things exactly:
- **A) The wishlist heart** overlaid on the product **media gallery** (and on product cards) — with my exact **colors** (black outline when not saved, red filled when saved) and position.
- **B) The cart icon inside the "Add to cart" button** (a custom cart-with-plus SVG before the label).

---

## PART A — Wishlist heart on the product media

### A1. Where it renders
`snippets/product-media.liquid` renders it **inside** `.product-gallery-wrapper` (top-right over the main image):
```liquid
<div class="relative product-gallery-wrapper overflow-hidden max-lg:-mx-co">
  {% render 'wishtlist-button', card_product: product %}
  <media-carousel …>
```
It's the same snippet used by `snippets/product-card.liquid` (grid cards). Keep both call sites.

### A2. `snippets/wishtlist-button.liquid` (copy verbatim)
```liquid

<div class="custom-wishlist-button absolute right-0 top-0 hidden">
    
    <div class='xb-wishlist__btn-custom'>
  <div
    class='xb-wishlist__add'
    xb-product-id='{{card_product.id}}'
    xb-product-title='{{ card_product.title }}'
    xb-product-variant='{{ card_product.selected_or_first_available_variant.id }}'
    xb-is-in-stock='{{ card_product.available }}'
    xb-product-handle='{{ card_product.handle }}'
  >
    <button aria-label="Add/Remove wishlist button">
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#FF4A71'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  </div>
  {% comment %}
     - optional
    <div class="xb-wishlist__loading" xb-product-id="{{product.id}}">Loading...</div>
  {% endcomment %}
  <div class='xb-wishlist__remove' xb-product-id='{{card_product.id}}' xb-is-in-stock='{{ card_product.available }}' xb-product-variant="{{ card_product.selected_or_first_available_variant.id }}">
    <button>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='#FF4A71'
        stroke='#FF4A71'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  </div>
</div>
</div>
```

### A3. Behavior (what's hidden / what shows / colors)
- The wrapper starts **`hidden`** (Tailwind) and `absolute right-0 top-0`. The **XB Wishlist app JS reveals it** and toggles between the two inner blocks:
  - `.xb-wishlist__add` → shown when the product is **NOT** in the wishlist → **outline** heart.
  - `.xb-wishlist__remove` → shown when the product **IS** in the wishlist → **filled** heart.
- The inline SVG `stroke="#FF4A71"` is **overridden by my CSS** (A4) so the resting heart is **black outline**, and the saved heart is **red `#EA4335`**. (Keep the inline `#FF4A71` — it's just the fallback; the CSS wins.)
- Clicking toggles add/remove via the app; the heart must sit **above** the gallery (z-index 99) at **10px/10px** inset inside the gallery wrapper.

### A4. CSS — add to `assets/main.css` (exact colors — copy verbatim)
```css
.custom-wishlist-button{
  z-index: 99;        
}
.mobile-bottom-nav .xb-wishlist__btn-custom svg{
  stroke : #000; 
}

.mobile-bottom-nav .xb-wishlist__remove svg {
  fill: #000; 
}

.custom-wishlist-button svg{
  stroke: #000;                 /* resting heart = BLACK outline (overrides inline #FF4A71) */
}


.custom-wishlist-button .xb-wishlist__remove svg{
  fill: #EA4335;                /* saved heart = RED fill */
}

.product-gallery-wrapper .custom-wishlist-button {
  right: 10px;                  /* position over the gallery */
  top: 10px;
}

.custom-wishlist-button .xb-wishlist__remove svg{
  stroke: #EA4335;             /* saved heart = RED outline too */
}
```
**Color summary:** resting (not saved) = **black outline heart** (`stroke:#000`, `fill:none`); saved = **red heart** (`fill:#EA4335; stroke:#EA4335`); the mobile-bottom-nav copy of the same button uses **black** (`stroke/fill:#000`). The SVG is **20×20**.

### A5. Part A dependencies
- **XB Wishlist app** installed + its app-embed enabled. The `xb-wishlist__add` / `xb-wishlist__remove` markup is **its** contract; the app's JS is what un-hides the button and wires add/remove. Without the app the heart stays `hidden`.
- Confirm `product-media.liquid` and `product-card.liquid` both `{% render 'wishtlist-button', card_product: … %}` (product on PDP, card_product on cards).

---

## PART B — Cart icon inside the "Add to cart" button

### B1. Where it renders
`snippets/product-page-buy-buttons.liquid` (rendered by the `qty_btn_selector` block of `main-product`). The button label is a flex row that renders a **cart SVG then the text**:
```liquid
<span class="flex justify-center items-center gap-1.5">
  {%- if product.selected_or_first_available_variant == null -%}
    {{ 'products.product.unavailable' | t }}
  {%- elsif product.selected_or_first_available_variant.available -%}
    {% if show_dynamic_checkout %}
     {% render 'icon-product-cart' %}          {# white icon — used on the PRIMARY (dynamic checkout) button #}
    {% else %}
      {% render 'icon-product-cart-black' %}    {# black icon — used on the SECONDARY button (my default) #}
    {% endif %}
     <span class="add-to-cart-text-btn"> {{ 'products.product.add_to_cart' | t }} </span>
  {%- else -%}
    {{ 'products.product.sold_out' | t }}
  {%- endif -%}
</span>
```
- `show_dynamic_checkout` is true only when the block setting `show_dynamic_checkout_buttons` is on. **On my PDPs it's OFF**, so the button is `button-secondary` (my yellow) and uses the **black** icon (`icon-product-cart-black`) — matching the screenshot (black cart on a yellow button).
- The **same** button also drives the sticky-add-to-cart styling via the `<style>` at the top of this snippet (`button-vars` for `.button-add-to-cart` and `sticky-add-to-cart .button`).

### B2. `snippets/product-page-buy-buttons.liquid` — the relevant parts (merge into 4.2's stock buy-buttons)
```liquid
{% liquid
  assign gift_card_recipient_feature_active = false
  if block.settings.show_gift_card_recipient and product.gift_card?
    assign gift_card_recipient_feature_active = true
  endif

  assign show_dynamic_checkout = false
  if block.settings.show_dynamic_checkout_buttons and gift_card_recipient_feature_active == false
    assign show_dynamic_checkout = true
  endif
%}

<style>
  #shopify-section-{{ section.id }} :where(.button-add-to-cart, sticky-add-to-cart .button) {
    {% render 'button-vars',
      background: block.settings.add_to_cart_background_color,
      text: block.settings.add_to_cart_text_color
    %}
  }

  #shopify-section-{{ section.id }} .shopify-payment-button__button--unbranded {
    {% render 'button-vars',
      background: block.settings.buy_it_now_background_color,
      text: block.settings.buy_it_now_text_color
    %}
  }

  @media screen and (min-width: 600px){
    .add-to-cart-text-btn{
      margin-bottom: -3px;
    }
  }
</style>

… (stock product-form / form 'product' / hidden id input / gift-card-recipient) …

    <div class="trim-margins buy-buttons">
      <button
        data-variant-info="add_to_cart"
        type="submit"
        name="add"
        class="
          button button-add-to-cart w-full min-w-fit
          {%- if show_dynamic_checkout %}
            button-primary 
          {% else %}
            button-secondary dynamic-btton grow
          {% endif -%}
        "
        {% if product.selected_or_first_available_variant == null
          or product.selected_or_first_available_variant.available == false %}
          disabled
        {% endif %}
      >
        <span class="flex justify-center items-center gap-1.5">
          {%- if product.selected_or_first_available_variant == null -%}
            {{ 'products.product.unavailable' | t }}
          {%- elsif product.selected_or_first_available_variant.available -%}
            {% if show_dynamic_checkout %}
             {% render 'icon-product-cart' %}
            {% else %}
              {% render 'icon-product-cart-black' %}
            {% endif %}
             <span class="add-to-cart-text-btn"> {{ 'products.product.add_to_cart' | t }} </span>
          {%- else -%}
            {{ 'products.product.sold_out' | t }}
          {%- endif -%}
        </span>
      </button>

      {% if show_dynamic_checkout %}
        {{ form | payment_button }}
      {% endif %}
    </div>
```

### B3. The icon snippets (copy verbatim — both are the same cart-with-plus glyph, one white / one black)
`snippets/icon-product-cart.liquid` (**white** — for the primary/dynamic-checkout button):
```liquid
<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" class="icon icon-add-cart icon-sm" data-name="Layer 1" viewBox="0 0 566.93 566.93">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
        stroke: #fff;
        stroke-miterlimit: 10;
        stroke-width: 3px;
      }
    </style>
  </defs>
  <path class="cls-1" d="M193.67,173.07l-.55,46.83c-.1,8.82-6.8,14.09-14.27,14.31-7.92.23-12.91-7.2-12.55-15.71l-.31-45.36-72.17-.09-27.79,327.68,273.25.17c7.84,0,12.71,5.11,13.12,11.65.28,4.48-1.84,14.34-9.36,14.34l-286.83.04c-11.5,0-18.28-8.57-17.31-19.57l8.69-98.8,20.58-246.82c.71-8.5,7.51-15.08,16.65-15.14l81.21-.47.61-35.08c.89-51.04,48.31-88.61,99.33-86.19,48.14,2.29,89.27,38.53,90.23,86.58l.7,34.77,82.13.29c19.14.07,16.99,25.48,18.34,39.78l13.76,146.31c.53,5.62-6.68,12.12-10.86,12.91-4.98.95-14.14-4.07-14.81-10.11l-5.79-52.32-9.92-109.93-72.98-.08-.36,46.89c-.06,8.18-5.3,14.2-12.38,14.11-6.28-.08-13.98-4.55-14.03-12.77l-.33-48.24h-135.98ZM329.76,146.2l.16-28.36c-1-30.01-20.59-55.68-49.36-63.38-35.39-9.48-71.91,8.04-83.62,43.21-5.16,15.51-3.72,32.32-3.01,48.66l135.83-.13Z"/>
  <path class="cls-1" d="M454.9,520.37c-.08,6.95-9.43,12.08-14.1,12.26-5.46.21-14.86-4.89-14.93-12.47l-.6-56.94-60.54-.58c-7.77-.07-13.52-8.59-13.43-15.29.07-5.79,6.7-13.8,13.95-13.88l60.04-.6.29-54.34c.05-9.18,5.73-15.72,13.68-16.16,9.66-.53,16.06,5.2,16.12,16.04l.29,54.59,57.85.3c7.82.04,13.66,6.2,14.47,12.48.97,7.44-3.61,16.77-12.53,16.86l-59.89.59-.68,57.14Z"/>
</svg>
```
`snippets/icon-product-cart-black.liquid` (**black** — for the secondary button, my default):
```liquid
<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" class="icon icon-add-cart icon-sm" data-name="Layer 1" viewBox="0 0 566.93 566.93">
  <defs>
    <style>
      .cls-1 {
        fill: #000;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 3px;
      }
    </style>
  </defs>
  <path class="cls-1" d="M193.67,173.07l-.55,46.83c-.1,8.82-6.8,14.09-14.27,14.31-7.92.23-12.91-7.2-12.55-15.71l-.31-45.36-72.17-.09-27.79,327.68,273.25.17c7.84,0,12.71,5.11,13.12,11.65.28,4.48-1.84,14.34-9.36,14.34l-286.83.04c-11.5,0-18.28-8.57-17.31-19.57l8.69-98.8,20.58-246.82c.71-8.5,7.51-15.08,16.65-15.14l81.21-.47.61-35.08c.89-51.04,48.31-88.61,99.33-86.19,48.14,2.29,89.27,38.53,90.23,86.58l.7,34.77,82.13.29c19.14.07,16.99,25.48,18.34,39.78l13.76,146.31c.53,5.62-6.68,12.12-10.86,12.91-4.98.95-14.14-4.07-14.81-10.11l-5.79-52.32-9.92-109.93-72.98-.08-.36,46.89c-.06,8.18-5.3,14.2-12.38,14.11-6.28-.08-13.98-4.55-14.03-12.77l-.33-48.24h-135.98ZM329.76,146.2l.16-28.36c-1-30.01-20.59-55.68-49.36-63.38-35.39-9.48-71.91,8.04-83.62,43.21-5.16,15.51-3.72,32.32-3.01,48.66l135.83-.13Z"/>
  <path class="cls-1" d="M454.9,520.37c-.08,6.95-9.43,12.08-14.1,12.26-5.46.21-14.86-4.89-14.93-12.47l-.6-56.94-60.54-.58c-7.77-.07-13.52-8.59-13.43-15.29.07-5.79,6.7-13.8,13.95-13.88l60.04-.6.29-54.34c.05-9.18,5.73-15.72,13.68-16.16,9.66-.53,16.06,5.2,16.12,16.04l.29,54.59,57.85.3c7.82.04,13.66,6.2,14.47,12.48.97,7.44-3.61,16.77-12.53,16.86l-59.89.59-.68,57.14Z"/>
</svg>
```
> Both carry class `icon icon-add-cart icon-sm`; the color is baked into the SVG's `.cls-1` (`#fff` vs `#000`) — so which snippet you render decides the icon color, independent of the button. The **sticky add-to-cart** button (separate prompt) renders `icon-product-cart-black` too.

### B4. Button / icon CSS — add to `assets/main.css`
```css
/* Add-to-cart (and quick-add) hover = amber */
.product-page .button.button-add-to-cart:hover,
quick-add-button .button:hover{
  background: #eba80b;
}

/* icon+text spacing used on product-card add-to-cart */
.add-to-cart-span { gap: 5px; }
.add-to-cart-span span{ margin-bottom: -3px; }
.add-to-cart-span svg { height: 1.2rem; width: 1.2rem; }

@media screen and (max-width:400px){
  .product-card .button{ padding: .8em 1.1em; }
  .add-to-cart-span svg { height: 1.1rem; width: 1.1rem; }
}
```
- The button label row uses Tailwind `flex justify-center items-center gap-1.5` (in the markup) + `.add-to-cart-text-btn { margin-bottom:-3px }` (≥600px, in the snippet's inline `<style>`) for optical alignment.
- **Button background color:** the yellow comes from the theme's **secondary** button color (because the button is `button-secondary` and the block's `add_to_cart_background_color` is blank). If your buy button should be yellow like mine, set the theme's secondary button color (or set `add_to_cart_background_color` on the `qty_btn_selector` block). Hover is the hardcoded `#eba80b` above.
- `icon-sm` sizes the SVG (theme util). On the buy button the icon renders at the button's font size; `.add-to-cart-span svg` (1.2rem) governs the **card** variant.

### B5. Part B dependencies
- Snippets: `product-page-buy-buttons.liquid`, `icon-product-cart.liquid`, `icon-product-cart-black.liquid`, and `button-vars` (stock). These are also used by the **sticky add-to-cart** and the **product-card** — keep them consistent.
- The `qty_btn_selector` block settings that drive it: `show_dynamic_checkout_buttons` (off = secondary + black icon), `show_gift_card_recipient`, and the 4 button colors (blank = inherit theme).

## Report back
- **A:** wishlist heart renders top-right over the gallery (10px/10px, z-index 99), starts **black outline**, turns **red `#EA4335`** when saved; XB Wishlist app installed + un-hides/toggles it; same on product cards.
- **B:** the "Add to cart" button shows the **cart-with-plus icon before the label** — **black** icon on the secondary (yellow) button (dynamic checkout off), **white** icon if dynamic checkout is on; hover amber `#eba80b`; icon sizing correct on desktop, cards, and the sticky bar.
- List anything missing (XB Wishlist app, the icon snippets, theme secondary button color).
