# Migration Prompt — Quantity Selector (everywhere: PDP + Cart page + Cart drawer)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> This makes the `−` / input / `+` quantity stepper look identical in **all three** places it appears:
> **1)** the product page (`product.json` / `main-product`), **2)** the cart page (`cart.json` / cart table), **3)** the cart drawer (`cart-modal`).

---

Reproduce my **quantity selector** exactly, in every context it renders. It's one shared snippet (`snippets/qty-selector.liquid`) styled by scoped CSS in `assets/main.css`. Depending on where it's rendered, the button size changes — port **all** the scopes so it resolves everywhere.

## 1. Where the quantity selector is rendered (verify each exists on 4.2)

| Context | File that renders it | CSS scope that governs button size |
|---|---|---|
| **Product page (PDP)** — `templates/product.*.json` → `sections/main-product.liquid` → `snippets/product-info.liquid` → `snippets/product-buy-with-quantity.liquid` | `{% render 'qty-selector', product_form_id: … %}` (inside `.qty-selector-wrapper` / `.qty-with-add`) | base `.qty-selector__button` |
| **Cart page** — `templates/cart.json` → cart section → `snippets/cart-table.liquid` | `{% render 'qty-selector', item: item %}` (desktop cell) and `{% render 'qty-selector', item: item, name: false %}` (mobile) | base `.qty-selector__button` (see note in §4 about `.cart-page`) |
| **Cart drawer** — `sections/cart-modal.liquid` → `snippets/cart-modal-item.liquid` | `{% render 'qty-selector', item: item %}` | `.cart-modal-item .qty-selector__button` |

The PDP block that outputs it is `qty_btn_selector` (a `main-product` block). The cart page and drawer output it per line item. **No section setting toggles the size** — sizing is 100% CSS, so porting the CSS below fixes it everywhere at once.

## 2. Snippet source — `snippets/qty-selector.liquid` (copy verbatim)

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

> The buttons carry `button button-light` (theme classes for base bg/hover) plus `qty-selector__button` (size/shape). The web component `<qty-selector>` is stock in Essence — verify the custom element + its JS exist on 4.2; if mine differs, port it. Icons `icon-minus` / `icon-plus` are stock.

## 3. CSS — add/patch these in `assets/main.css` (1:1 values)

```css
/* ---- Container (pill) ---- */
.qty-selector {
  display: inline-flex;
  align-items: stretch;
  background-color: #f9f9f9;   /* hardcoded, not a theme token */
  border-radius: 40px;
  border: 1px solid #f5f5f5;
}

/* ---- Number input ---- */
.qty-selector > input {
  text-align: center;
  margin: -2px 0.5rem;
  flex-grow: 1;
  background: transparent;
  width: 2rem;
  border-radius: var(--input-corner-radius);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-inset: inset;
  --tw-ring-color: transparent;
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
@media not all and (min-width: 768px) { .qty-selector > input { font-size: var(--size-text-sm); } }
@media screen and (max-width: 520px)  { .qty-selector > input { margin: -2px 0.1rem; } }
@media (min-width: 768px)             { .qty-selector > input { width: 2.5rem; } }
.qty-selector > input:hover { --tw-ring-color: rgb(var(--color-foreground) / 0.3); }
.qty-selector > input:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(var(--color-input-accent) / var(--tw-ring-opacity));
  outline: 0;
}

/* ---- Buttons: BASE (governs PDP + cart page) ---- */
.qty-selector__button {
  height: 2.5rem;
  width: 2.5rem;
  flex-shrink: 0;
  touch-action: manipulation;
  padding: 0px;
}

/* ---- Buttons: CART DRAWER override ---- */
.cart-modal-item .qty-selector__button {
  height: 2rem;
  width: 2rem;
}

/* ---- Mobile ≤520px: cart page + drawer shrink to 1.5rem ---- */
@media screen and (max-width: 520px) {
  .cart-page .qty-selector__button,
  .cart-modal-item .qty-selector__button {
    height: 1.5rem;
    width: 1.5rem;
  }
  .cart-page .grow.image-trash-content { width: calc(100% - 1.5rem); }
}

/* ---- Desktop ≥768px: base grows to 3rem; drawer stays 1.5rem ---- */
@media (min-width: 768px) {
  .qty-selector__button { height: 3rem; width: 3rem; }
  .cart-modal-item .qty-selector__button { height: 1.5rem; width: 1.5rem; }
}

/* ---- Icon size inside buttons ---- */
.qty-selector__button > svg { width: 0.75rem; height: 0.75rem; }
@media not all and (min-width: 768px) {
  .qty-selector__button > svg { width: 0.5rem; height: 0.5rem; }
}
```

### Size summary (what each context ends up at)

| Context | ≤520px | 521–767px | ≥768px |
|---|---|---|---|
| **PDP** (base) | 2.5rem | 2.5rem | **3rem** |
| **Cart page** (base) | 2.5rem\* | 2.5rem | **3rem** |
| **Cart drawer** | **1.5rem** | 2rem | **1.5rem** |

\* The `.cart-page` selector (see §4) shrinks the cart-page button to 1.5rem at ≤520px **only if** a `.cart-page` wrapper class is present. In my theme no element outputs that class, so the cart page uses the base 2.5rem at ≤520px. Match my behavior (leave the rule in — it's harmless), or add a `cart-page` class to the cart section wrapper if you actually want the smaller mobile size on the cart page.

## 4. Notes / dependencies
- **`.cart-page` is currently a no-op scope** in my theme: `main.css` references `.cart-page .qty-selector__button` and `.cart-page .grow.image-trash-content`, but **no Liquid file outputs a `cart-page` class** (it may have been JS-added in an older version, or is dead). Keep the rules verbatim for parity; the base `.qty-selector__button` is what actually styles the cart page. Don't spend time hunting for a `.cart-page` element — there isn't one.
- **Pill colors are hardcoded** (`#f9f9f9` bg, `#f5f5f5` border, `40px` radius) — copy the literal values, not theme tokens.
- Theme variables used (already exist in Essence, don't redefine): `--input-corner-radius`, `--color-input-accent`, `--color-foreground`, `--size-text-sm`.
- The buttons' base background/hover comes from the `button button-light` classes in the snippet — keep them.

## 5. Report back
- Confirm `qty-selector.liquid` + the `<qty-selector>` web component/JS exist on 4.2 (ported if different).
- Confirm the selector renders and is sized correctly in **all three** contexts: PDP (3rem desktop), cart page (3rem desktop / base), cart drawer (2rem → 1.5rem mobile & desktop).
- Confirm the pill styling (`#f9f9f9` / `40px` / `#f5f5f5` border) and the input focus ring (`--color-input-accent`) render.
- Note whether a `.cart-page` wrapper exists on the new store (if so, the ≤520px cart-page rule will additionally apply).
