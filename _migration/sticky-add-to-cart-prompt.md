# Migration Prompt — Sticky Add-to-Cart (product page)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisite: the **product-card / PDP (`main-product`)** prompt (this renders inside `main-product`, and reuses the custom `icon-product-cart-black` + `quick-add-button`).
> This contains the **complete verbatim snippet**, its inline CSS/JS, the exact `main.css` rules (incl. the show/hide keyframes), the section wiring + settings, and every dependency — so the sticky bar behaves identically on the other store.

---

Recreate my **product-page sticky Add-to-Cart bar** exactly. It's a fixed bar pinned to the bottom of the viewport on product pages that slides in when the main Add-to-Cart button scrolls out of view. It shows the product **thumbnail**, **vendor + title** (desktop), and a **"Add to cart — $price"** button with a cart icon, plus a **close (×) button** that hides the bar. Position (left/center/right) is a section setting.

## 0. Files involved (port every one)
| File | Role |
|---|---|
| `snippets/product-sticky-add-to-cart.liquid` ⚑ | the whole bar — markup + inline `<style>` (close btn) + inline `<script>` (close behavior) |
| `sections/main-product.liquid` | renders it when `show_sticky_add_to_cart` is on; defines the 2 settings |
| `assets/main.css` | the `.sticky-add-to-cart-wrapper` / `sticky-add-to-cart` CSS + show/hide **keyframes** (§4) |
| stock JS (`assets/main.mjs`) | the `<sticky-add-to-cart>` + `<quick-add-button>` web components (scroll show/hide + AJAX add) — already in Essence 4.2 |
| helper snippets (verify): `icon-product-cart-black` ⚑, `placeholder`, and image `icon-close.webp` |

## 1. How it works
- `main-product.liquid` renders `{% render 'product-sticky-add-to-cart' %}` **only when** `section.settings.show_sticky_add_to_cart` is true (after `product-media` + `product-info`).
- The bar markup is a `<sticky-add-to-cart>` **web component** (stock Essence, defined in `main.mjs`). Its JS watches the main PDP Add-to-Cart button and toggles `.show` / `.hide` classes on the element → the CSS `@keyframes showStickyAddToCart` / `hideStickyAddToCart` animate it in/out. On mobile it uses a separate `showStickyAddToCartMobile` keyframe (slides up from the bottom).
- The **position** (`--left` / `--center` / `--right`) comes from `section.settings.sticky_add_to_cart_position`, applied as a class on the wrapper (`justify-content` flex-start/center/flex-end).
- The **Add-to-cart button** is a `<quick-add-button>` (stock component) that adds the current variant via AJAX without leaving the page. It shows the custom `icon-product-cart-black` + "Add to cart — $price".
- The **close (×)** button (custom) adds `.hidden` to the wrapper to dismiss the bar (hidden on mobile via CSS).
- The **thumbnail** uses the selected/first-available variant image (falls back to `product.featured_media`, then a placeholder).

## 2. Snippet — `snippets/product-sticky-add-to-cart.liquid` (copy verbatim)
```liquid
<style>
  .sticky-cart-close {
    position: absolute;
    content: '';
    top: 5px;
    right: 5px;
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ececec;
    cursor: pointer;    
}

@media screen and (max-width: 767px){
  .sticky-cart-close {
    height: 1rem;
    width: 1rem;
    padding: 4px;
    display: none;
}
}
</style>
<script>
  document.addEventListener("DOMContentLoaded", () => {
  const stickyCartClose = document.querySelector(".sticky-cart-close");
  stickyCartClose?.addEventListener("click", function() {
    this.closest(".sticky-add-to-cart-wrapper").classList.add("hidden");
  }); 
});
</script>
{% liquid
  assign product_image = product.selected_or_first_available_variant.featured_media | default: product.featured_media
%}

<div class="sticky-add-to-cart-wrapper --{{ section.settings.sticky_add_to_cart_position }}">
  <sticky-add-to-cart>
    <span class="sticky-cart-close"> 
      <img src="{{ 'icon-close.webp' | file_url }}" height="8" width="8" alt="close icon" loading="lazy"> </span>
    {% if product_image %}
      {{ product_image | image_url: width: 192 | image_tag: class: 'product-thumbnail-shade product-thumbnail sticky-product-image' }}
    {% else %}
      {% render 'placeholder', type: 'image', class: 'product-thumbnail placeholder' %}
    {% endif %}
    <div class="product-title hidden-desktop">
      <div class="product-vendor text-foreground/75 tracking-wider text-xs md:text-sm mb-1">
        {{ product.vendor }}
      </div>
      <p class="heading text-h6/h6">
        {{ product.title }}
      </p>
    </div>
    <quick-add-button
      class="product-card-quick-button"  
      product-id="{{ product.id }}"
      handle="{{ product.handle }}"      
        variant-id="{{ product.selected_or_first_available_variant.id }}"      
    >
      <button
        type="button"
        class="button button-secondary whitespace-nowrap flex justify-center items-center"
      >
        {% render 'icon-product-cart-black' %}
          <span>
            {{ 'products.product.add_to_cart' | t }}
            &mdash; <span class="sticky-product-price"> {{ product.price | money }} </span>
          </span>
      </button>
    </quick-add-button>
  </sticky-add-to-cart>
</div>
```
> ⚠️ Note the class name is `hidden-desktop` on the title block (so the title shows on **mobile**, hidden on desktop) — that's how mine is; keep it. The close-button's inline `<style>`/`<script>` are part of this snippet — copy them too.

## 3. Section wiring + settings (`sections/main-product.liquid`)
**Render hook** (place after `{% render 'product-info' %}`):
```liquid
{% if section.settings.show_sticky_add_to_cart %}
  {% render 'product-sticky-add-to-cart' %}
{% endif %}
```
**Schema settings** (add under a "Sticky add to cart" header if not present in 4.2):
```json
{
  "type": "header",
  "content": "t:sections.main-product.settings.header.sticky_add_to_cart"
},
{
  "type": "checkbox",
  "id": "show_sticky_add_to_cart",
  "label": "t:sections.main-product.settings.show_sticky_add_to_cart.label",
  "default": true
},
{
  "type": "select",
  "id": "sticky_add_to_cart_position",
  "label": "t:sections.main-product.settings.sticky_add_to_cart_position.label",
  "options": [
    { "value": "left",   "label": "t:sections.main-product.settings.sticky_add_to_cart_position.options__0.label" },
    { "value": "center", "label": "t:sections.main-product.settings.sticky_add_to_cart_position.options__1.label" },
    { "value": "right",  "label": "t:sections.main-product.settings.sticky_add_to_cart_position.options__2.label" }
  ],
  "default": "right"
}
```
If 4.2's `main-product` already ships a sticky-add-to-cart, keep its stock settings/keys and only swap in **my snippet** (the custom close button + price button). Confirm the `t:` keys exist in `locales/*.schema.json`; if not, hardcode the labels.

## 4. CSS — add/verify in `assets/main.css` (exact, 1:1 — includes the keyframes)
Most is stock Essence; the custom bits are the `.sticky-cart-close` (in the snippet, §2) and the `hidden-desktop`/`hidden-mobile` helpers. Diff against 4.2 and patch to match:
```css
.sticky-add-to-cart-wrapper {
  pointer-events: none;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 300;
  display: flex;
}

.hidden-mobile{ display: block; }
.hidden-desktop{ display: none; }
@media screen and (max-width: 767px){
  .hidden-mobile{ display: none; }
  .hidden-desktop{ display: block; }
}

@media (min-width: 992px) {
  .sticky-add-to-cart-wrapper { padding: 1rem; }
}
.sticky-add-to-cart-wrapper.--left   { justify-content: flex-start; }
.sticky-add-to-cart-wrapper.--center { justify-content: center; }
.sticky-add-to-cart-wrapper.--right  { justify-content: flex-end; }
@media (min-width: 992px) {
  body.no-scroll .sticky-add-to-cart-wrapper { right: var(--scrollbar-width); }
}

sticky-add-to-cart { display: flex; width: 100%; }
sticky-add-to-cart {
  padding-left: var(--container-outer-width);
  padding-right: var(--container-outer-width);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
@media (min-width: 768px) {
  sticky-add-to-cart {
    max-width: 27rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .75rem;
    padding-bottom: .75rem;
  }
}
sticky-add-to-cart {
  align-items: center;
  overflow: hidden;
  --tw-bg-opacity: 1;
  background-color: rgb(var(--color-background) / var(--tw-bg-opacity));
}
@media (min-width: 992px) {
  sticky-add-to-cart { border-radius: var(--block-corner-radius); }
}
sticky-add-to-cart {
  pointer-events: none;
  opacity: 0;
  box-shadow:
  0 0 8px rgba(0 0 0 / 5%),
  0 0 24px rgba(0 0 0 / 7.5%),
  0 0 48px rgba(0 0 0 / 10%);
}
sticky-add-to-cart.hide {
  animation: hideStickyAddToCart 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}
sticky-add-to-cart.show {
  animation: showStickyAddToCart 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  pointer-events: all;
}
@media not all and (min-width: 768px) {
  sticky-add-to-cart.show {
    animation: showStickyAddToCartMobile 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  }
}
sticky-add-to-cart .product-thumbnail {
  margin-inline-end: 1rem;
  height: 2.9rem;
  width: auto;
  border-radius: var(--block-sm-corner-radius);
}
@media (min-width: 768px) {
  sticky-add-to-cart .product-thumbnail {
    margin-inline-end: 1.25rem;
    height: 3.5rem;
    border-radius: var(--block-sm-corner-radius);
  }
}
@media (min-width: 992px) {
  sticky-add-to-cart .product-thumbnail {
    margin-inline-end: 0rem;
    height: 3.5rem;
  }
}
@media not all and (min-width: 768px) {
  sticky-add-to-cart .product-title { display: none; }
}
@media (min-width: 992px) {
  sticky-add-to-cart .product-title { margin-inline-end: 2rem; }
}
sticky-add-to-cart .button { gap: 0.5rem; }
@media not all and (min-width: 768px) {
  sticky-add-to-cart .button {
    flex-grow: 1;
    font-size: var(--size-text-sm);
  }
}
@media screen and (max-width: 480px){
  sticky-add-to-cart .button{ padding: .9em; }
}
@media (min-width: 768px) {
  sticky-add-to-cart .button {
    margin-inline-start: auto;
    margin-inline-end: auto;
  }
}
sticky-add-to-cart .button svg { width: 1rem; flex-shrink: 0; }
@media (min-width: 768px) {
  sticky-add-to-cart .button svg { width: 1.25rem; }
}
sticky-add-to-cart quick-add-button { display: contents; }

@keyframes hideStickyAddToCart {
  from { transform: none; opacity: 1; }
  to   { transform: translateY(1rem); opacity: 0; }
}
@keyframes showStickyAddToCart {
  from { transform: translateY(3rem); opacity: 0; }
  to   { transform: none; opacity: 1; }
}
@keyframes showStickyAddToCartMobile {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
```

## 5. Saved settings values (from my product templates)
- Schema **default**: `show_sticky_add_to_cart: true`, `sticky_add_to_cart_position: "right"`.
- On **`templates/product.json`** I override to **`sticky_add_to_cart_position: "center"`** (and `show_sticky_add_to_cart: true`). Other PDP templates (`product.enso.json`, `product.core.json`, `product.pro-2-_po.json`, etc.) each carry their own `main-product` settings — set the same on the matching template so every product page matches. If you copy my product templates verbatim (per the product-template prompts), these come across automatically.

## 6. Dependencies
- **`icon-close.webp`** → upload to **Content → Files** (the × button image). Same file the Hulk modal uses.
- **`icon-product-cart-black`** snippet ⚑ — my custom cart icon used on the button (also used by the product-card). Port it (from the product-card prompt) or the button shows no icon.
- **`placeholder`** snippet (stock) — fallback when the product has no image.
- **`product-thumbnail-shade` / `product-thumbnail`** classes — image styling shared with the product card (already in `main.css`).
- **Web components (stock Essence JS, in `main.mjs`):** `<sticky-add-to-cart>` (the scroll-driven show/hide) and `<quick-add-button>` (AJAX add). **These already exist in 4.2** — do **not** rewrite them. If, and only if, the sticky bar never slides in on the new store, compare my `main.mjs` `sticky-add-to-cart` component to 4.2's and reconcile.
- **Rendered inside `main-product`** — the sticky bar only appears on product templates that use the `main-product` section with `show_sticky_add_to_cart` on.

## 7. Report back
- Confirm `product-sticky-add-to-cart.liquid` was ported (with its inline `<style>` + `<script>`), the `main-product` render hook + the 2 settings exist, and the CSS incl. the 3 `@keyframes` is present.
- Confirm the bar **slides in when the main Add-to-Cart scrolls out of view**, sits at the chosen position (right by default / center on `product.json`), shows thumbnail + title (mobile) + "Add to cart — $price" with the cart icon, adds to cart via AJAX, and the × dismisses it (desktop).
- Confirm `icon-close.webp` exists in Files and `icon-product-cart-black` is present.
- Note any product templates where `show_sticky_add_to_cart` / `sticky_add_to_cart_position` still need setting.
