# Migration Prompt — Sticky Add-to-Cart **Styling** (all CSS, everywhere)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Companion to `sticky-add-to-cart-prompt.md` (which covers the Liquid/markup + settings + JS). **This file is the complete STYLING** — every sticky-add-to-cart rule that exists in the theme.

---

Reproduce the **sticky Add-to-Cart bar styling** exactly. All of its CSS lives in **two** places:
1. **`assets/main.css`** — one contiguous block (`.sticky-add-to-cart-wrapper` + `sticky-add-to-cart` element rules + the 3 `@keyframes`). This is where positioning, the bar look, the show/hide animations, thumbnail, title, and button styling live.
2. **`snippets/product-sticky-add-to-cart.liquid`** — a small inline `<style>` for the **close (×) button** (`.sticky-cart-close`).

Add both, verbatim, exactly as below. (There are **no other** sticky-add-to-cart styles anywhere in the theme — I checked every `assets/*.css`.)

## 1. `assets/main.css` — the full sticky-add-to-cart block (copy verbatim)
> Diff against 4.2 first: some of these (the element `sticky-add-to-cart` base rules, keyframes) may already exist as stock; the **`--left/--center/--right` position variants**, the `.hidden-mobile/.hidden-desktop` helpers, the box-shadow, and the thumbnail/title/button tweaks are the customized bits. Where 4.2 differs, patch to these values.
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

.hidden-mobile{
  display: block;
}

.hidden-desktop{
  display: none;
}

@media screen and (max-width: 767px){
  .hidden-mobile{
    display: none;
  }
  .hidden-desktop{
    display: block;
  }
}

@media (min-width: 992px) {
  .sticky-add-to-cart-wrapper {
    padding: 1rem;
  }
}
.sticky-add-to-cart-wrapper.--left {
  justify-content: flex-start;
}
.sticky-add-to-cart-wrapper.--center {
  justify-content: center;
}
.sticky-add-to-cart-wrapper.--right {
  justify-content: flex-end;
}
@media (min-width: 992px) {
  body.no-scroll .sticky-add-to-cart-wrapper {
    right: var(--scrollbar-width);
  }
}
sticky-add-to-cart {
  display: flex;
  width: 100%;
}

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
  sticky-add-to-cart {
    border-radius: var(--block-corner-radius);
  }
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
  sticky-add-to-cart .product-title {
    display: none;
  }
}
@media (min-width: 992px) {
  sticky-add-to-cart .product-title {
    margin-inline-end: 2rem;
  }
}
sticky-add-to-cart .button {
  gap: 0.5rem;
}
@media not all and (min-width: 768px) {
  sticky-add-to-cart .button {
    flex-grow: 1;
    font-size: var(--size-text-sm);    
  }
}
@media screen and (max-width: 480px){
  sticky-add-to-cart .button{
    padding: .9em;
  }
}
@media (min-width: 768px) {
  sticky-add-to-cart .button {
    margin-inline-start: auto;
    margin-inline-end: auto;
  }
}
sticky-add-to-cart .button svg {
  width: 1rem;
  flex-shrink: 0;
}
@media (min-width: 768px) {
  sticky-add-to-cart .button svg {
    width: 1.25rem;
  }
}
sticky-add-to-cart quick-add-button {
  display: contents;
}
@keyframes hideStickyAddToCart {
  from {
    transform: none;
    opacity: 1;
  }
  to {
    transform: translateY(1rem);
    opacity: 0;
  }
}
@keyframes showStickyAddToCart {
  from {
    transform: translateY(3rem);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
@keyframes showStickyAddToCartMobile {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## 2. `snippets/product-sticky-add-to-cart.liquid` — the inline `<style>` for the close button (copy verbatim)
This lives at the top of the snippet (not in main.css). It styles the round grey **×** dismiss button:
```html
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
```
(The dismiss `<script>` toggling `.hidden` on `.sticky-add-to-cart-wrapper` is in the same snippet — see the full `sticky-add-to-cart-prompt.md`.)

## 3. What each part does (so you can verify)
- **`.sticky-add-to-cart-wrapper`** — full-width `position: fixed; bottom:0`, `z-index:300`, `pointer-events:none` (only the inner bar is interactive when shown). `padding:1rem` on desktop. `--left/--center/--right` set `justify-content` so the bar sits left / center / right (this store uses **center** on the CORE PDP). `body.no-scroll … { right: var(--scrollbar-width) }` keeps it aligned when a modal locks scroll on desktop.
- **`.hidden-mobile` / `.hidden-desktop`** — generic show/hide helpers used inside the bar (the product title block is `hidden-desktop` = shows on mobile only).
- **`sticky-add-to-cart`** (the web component element) — the visible bar: `max-width:27rem` on desktop, white background, rounded (`--block-corner-radius`) ≥992px, layered soft `box-shadow`, starts `opacity:0; pointer-events:none`.
- **`.show` / `.hide`** — the JS toggles these classes; they run `@keyframes showStickyAddToCart` (slide up 3rem + fade in) / `hideStickyAddToCart` (slide down 1rem + fade out). Below 768px `.show` uses `showStickyAddToCartMobile` (slides up from 100% — full-width bottom sheet).
- **`.product-thumbnail`** — 2.9rem (→3.5rem ≥768px) rounded product image with trailing margin.
- **`.product-title`** — hidden on mobile (`display:none` <768px); 2rem trailing margin ≥992px.
- **`.button`** — `gap:.5rem`; full-width-ish on mobile (`flex-grow:1`, smaller font, `.9em` padding ≤480px); centered with auto side margins ≥768px. `.button svg` = 1rem (→1.25rem ≥768px) — the cart icon. `quick-add-button { display: contents }` so the add-button component doesn't add a box.
- **`.sticky-cart-close`** — absolute round grey (`#ececec`) close button top-right (1.4rem); **hidden on mobile** (`display:none` ≤767px, so mobile users dismiss by scrolling/adding, not an ×).

## 4. Report back
- Confirm the full main.css block was added/patched (positioning, `--left/--center/--right`, box-shadow, the 3 `@keyframes`, thumbnail/title/button rules) and the inline `.sticky-cart-close` style is in the snippet.
- Confirm the bar: sits at the chosen position (center), slides up on show / down on hide (bottom-sheet on mobile), thumbnail + button size correctly, and the × shows on desktop only.
- Report any rule that already existed in 4.2 with a different value (and whether you patched it to match).
