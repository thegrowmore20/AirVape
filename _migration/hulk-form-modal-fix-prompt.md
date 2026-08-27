# Migration / Fix Prompt — Hulk Form Custom Modal (popup not working)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> This is a **debug + reproduce** prompt: the Hulk-form popup modal is misbehaving on the new theme. Work through the diagnostic checklist **in order** (top = most likely), then confirm the 4 files match the reference source at the bottom.

---

My **Hulk Form popup modal** isn't working right on this theme. A "button" block with *Enable Form Popup* on is supposed to open a centered modal containing a Hulk Form Builder embed. Diagnose and fix it. The whole feature is 4 files + one loader block in `layout/theme.liquid`:

- `snippets/button.liquid` — renders the trigger button + injects the modal
- `snippets/hulk-form-custom-modal.liquid` — the modal markup
- `assets/custom-hulk-modal.css` — modal styling (hidden-by-default + `.active` show)
- `assets/custom-hulk-modal.js` — open/close wiring
- `layout/theme.liquid` — conditionally loads the CSS/JS **only on listed page handles**

## How it's supposed to work (the mechanics — verify each link in the chain)
1. A `button` block with `enable_form_popup = true` outputs a `<button>` (NOT `<a>`) whose class list includes **`hulk-form-modal-custom-trigger`** (from the `hulk_form_popup_class` setting), and right after it renders `hulk-form-custom-modal.liquid` with the pasted Hulk embed in `hulk_form_id_block`.
2. The modal is `#hulk-form-modal-custom-overlay`, **hidden by default**. It's hidden two ways: an inline `<style>.hulk-form-modal-custom-overlay{display:none}</style>` (printed in `<head>` only on matching page handles) AND the `display:none` in `custom-hulk-modal.css`.
3. `custom-hulk-modal.js` finds the overlay, grabs all `.hulk-form-modal-custom-trigger` buttons, and on click adds `.active` to the overlay (which flips it to `display:flex; opacity:1; visibility:visible`). Close = X button, click-on-backdrop, or Escape.
4. The CSS + JS are loaded **only** when `page.handle` is in the `hulk_handles` list in `theme.liquid`.

## Diagnostic checklist — check in this order and report what you find

### ① Is the page handle in the `hulk_handles` loader list? (most common cause)
Open `layout/theme.liquid` and find:
```liquid
{% assign hulk_handles = 'premium-vaporizer-guide,upgrade-experience,wholesale,dropshipping' | split: ',' %}
{% if hulk_handles contains page.handle %}
  <style>.hulk-form-modal-custom-overlay{display:none}</style>
  <link rel="preload" href="{{ 'custom-hulk-modal.css' | asset_url }}" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>{{ 'custom-hulk-modal.css' | asset_url | stylesheet_tag }}</noscript>
  <script src="{{ 'custom-hulk-modal.js' | asset_url }}" defer="defer"></script>
{% endif %}
```
- If the page you're testing has a handle **not** in that list → the CSS/JS **never load**, so:
  - the modal has **no `display:none`** → the Hulk form renders **visible inline on the page** (looks like "the form is just sitting there, not a popup"), and
  - clicking the button does nothing (no JS).
  **Fix:** add the page's handle to the `hulk_handles` string. Confirm the **exact** handle (Shopify handle, e.g. `wholesale`, not the title). This is the #1 reason "the modal is broken."
- ⚠️ This loader is **page-handle only** — it does **not** fire on product templates, collection, blog, or the home page. If you put a popup button on a product/collection/home section, the assets won't load. If you need it there, broaden the condition (see §⑥).

### ② Does the trigger button actually have the `hulk-form-modal-custom-trigger` class?
Inspect the rendered button in the browser. It must carry `hulk-form-modal-custom-trigger`.
- That class comes from the block setting `hulk_form_popup_class` (default `hulk-form-modal-custom-trigger`). If the block schema is missing that setting, or its default was lost in migration, the class is absent → JS finds **zero triggers** → nothing opens.
- Confirm `snippets/button.liquid` adds `{{ hulk_form_popup_class }}` into the class list AND renders as `<button>` when `hulk_form_id_block` is present (a stock `<a>` won't be picked up the same way and may navigate instead).

### ③ Multiple popup buttons on one page → duplicate `#hulk-form-modal-custom-overlay` (real bug)
The modal uses a **fixed, hardcoded ID** (`hulk-form-modal-custom-overlay`) and the close button uses `hulk-form-modal-custom-close-btn`. If a page has **two or more** button blocks with popups:
- The DOM gets **duplicate IDs**. `document.getElementById('hulk-form-modal-custom-overlay')` returns only the **first** one, and `getElementById('hulk-form-modal-custom-close-btn')` also only the first.
- Every trigger opens the **same (first) modal**, so buttons 2+ show the **wrong form** (or the first form), and the close button on later modals won't be wired.
**Check:** does the failing page render more than one popup button? If so this is the bug.
**Fix options (pick one, tell me which):**
  - **(a) One-modal-per-page:** keep a single modal on the page and have all triggers open it (fine only if every button should show the *same* form).
  - **(b) Unique IDs per instance (recommended if forms differ):** scope the modal + trigger by the block id. Change the snippet to build ids like `hulk-form-modal-custom-overlay-{{ id }}` and give each trigger a `data-hulk-target="#...-{{ id }}"`; rewrite the JS to open the modal referenced by each trigger's `data-hulk-target` instead of a single global `getElementById`. (Ask me and I'll provide the per-instance version.)

### ④ Is the Hulk embed actually populating? (empty modal)
The modal body prints `{{ hulk_form_id_block }}` — the raw Hulk `pxFormGenerator` embed code pasted into the block's HTML setting.
- If the modal **opens but is empty**, the Hulk **Form Builder app** isn't installed on the new store, or its **app embed** is disabled, so the `pxFormGenerator` div never hydrates. Install Hulk Form Builder + enable the app embed in Theme Editor → App embeds.
- Each page's popup uses **its own Hulk form ID** — confirm the pasted embed is the correct form for that page (form IDs from the old store won't exist on the new store; re-create/copy the forms in Hulk and paste the new embed).

### ⑤ Is `icon-close.webp` present? (broken/missing X)
The close button is `<img src="{{ 'icon-close.webp' | file_url }}">`. If that file isn't uploaded, the X is a broken image (modal still closes via backdrop/Escape, but looks broken). Upload **`icon-close.webp`** to **Content → Files**, or swap the `<img>` for an inline `{% render 'icon-times' %}` / SVG.

### ⑥ Are the theme utility classes present? (modal not centered / not full-screen)
The markup relies on Tailwind utilities from the theme build: overlay `fixed top-0 left-0 w-full h-full justify-center items-center`, content `relative w-full`, close btn `sticky flex items-center justify-center rounded-full`. Essence 4.2 ships these, but if this theme's `main.css` was purged/rebuilt and any are missing, the overlay won't cover the screen or center its content. Confirm those utilities resolve; if not, add the equivalent rules to `custom-hulk-modal.css`.
- Related: to load the modal on non-page templates (product/collection/home), replace the `hulk_handles`/`page.handle` gate with a broader condition, e.g. also load when `template.name == 'product'` or gate on `request.page_type`, or just always load the (tiny) assets.

### ⑦ z-index / theme modal conflicts
The overlay is `z-index: 99999`. If a sticky header or another app sits above it, raise it. If the theme's own drawer/modal JS also listens on the same elements, confirm no double-binding.

## Reference source — the 4 files should match this exactly

### `snippets/hulk-form-custom-modal.liquid`
```liquid
<div class="hulk-form-modal-custom-overlay fixed top-0 left-0 w-full h-full justify-center items-center" id="hulk-form-modal-custom-overlay">
  <div class="hulk-form-modal-custom-content relative w-full">
    <button class="hulk-form-modal-custom-close-btn sticky flex items-center justify-center rounded-full" id="hulk-form-modal-custom-close-btn"><img src="{{ 'icon-close.webp' | file_url }}" height="10" width="10" loading="lazy"></button>
    <div class="modal-body-text">
      {{ hulk_form_id_block }}
    </div>
  </div>
</div>
```

### `assets/custom-hulk-modal.css`
```css
/* 1. Body Scroll Lock */
body.hulk-form-modal-custom-open { overflow: hidden; }

/* 2. Overlay — hidden by default; centering via theme utilities */
.hulk-form-modal-custom-overlay {
  background: rgba(0, 0, 0, 0.7);
  z-index: 99999;
  padding: 20px;
  box-sizing: border-box;
  display: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

/* 3. Show state (JS toggles .active) */
.hulk-form-modal-custom-overlay.active { display: flex; opacity: 1; visibility: visible; }

/* 4. Content box */
.hulk-form-modal-custom-content {
  background: #fff;
  max-width: 650px;
  max-height: 92vh;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  overflow-y: auto;
  transform: scale(0.8) translateY(30px);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hulk-form-modal-custom-overlay.active .hulk-form-modal-custom-content { transform: scale(1) translateY(0); }

/* 5. Close button (sticky while scrolling) */
.hulk-form-modal-custom-close-btn {
  top: -10px;
  float: right;
  background: #f1f1f1;
  border: none;
  width: 35px;
  height: 35px;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: -35px;
  z-index: 10;
}
.hulk-form-modal-custom-close-btn:hover { background: #e0e0e0; }

/* Custom scrollbar */
.hulk-form-modal-custom-content::-webkit-scrollbar { width: 6px; }
.hulk-form-modal-custom-content::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }

@media screen and (max-width: 480px){
  .hulk-form-modal-custom-content { padding: 1.25rem; }
  .hulk-form-modal-custom-close-btn { width: 1.5rem; height: 1.5rem; }
  .hulk-form-modal-custom-overlay { padding: .75rem; }
}
```

### `assets/custom-hulk-modal.js`
```js
(function () {
  const overlay = document.getElementById('hulk-form-modal-custom-overlay');
  // No modal on this page — bail out so nothing else throws.
  if (!overlay) return;

  const triggers = document.querySelectorAll('.hulk-form-modal-custom-trigger');
  const closeBtn = document.getElementById('hulk-form-modal-custom-close-btn');
  const body = document.body;

  const openModal = () => {
    overlay.classList.add('active');
    body.classList.add('hulk-form-modal-custom-open');
  };
  const closeModal = () => {
    overlay.classList.remove('active');
    body.classList.remove('hulk-form-modal-custom-open');
  };

  triggers.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && overlay.classList.contains('active')) closeModal();
  });
})();
```

### `snippets/button.liquid` (the Hulk bits — must be merged into 4.2's stock button)
```liquid
{% liquid
  assign target = target | default: section
  unless defaults == false
    assign link = link | default: target.settings.button_link
    assign style = style | default: target.settings.button_style
    assign size = size | default: target.settings.button_size
    assign text = text | default: target.settings.button_text
    assign hulk_form_popup_class = hulk_form_popup_class | default: target.settings.hulk_form_popup_class
    assign hulk_form_id_block = hulk_form_id_block | default: target.settings.hulk_form_id_block
    assign background_color = background_color | default: target.settings.button_background_color
    assign text_color = text_color | default: target.settings.button_text_color
  endunless
  assign tag = 'button'
  unless hulk_form_id_block != blank
    if link != blank and section.settings.link == blank
      assign tag = 'a'
    endif
  endunless
%}
<{{ tag }}
  {% if link != blank %}href="{{ link }}" data-instant{% endif %}
  class="button {{ style }} {{ size }} {{ hulk_form_popup_class }}"
  style="{% render 'button-vars', background: background_color, text: text_color %}"
  {{ attrs }}
>
  {{ text }}
</{{ tag }}>
{% if hulk_form_id_block != blank %}
  {% render 'hulk-form-custom-modal', hulk_form_id_block: hulk_form_id_block %}
{% endif %}
```

### Button-block schema settings (per section that has a `"type": "button"` block)
```json
{ "type": "checkbox", "id": "enable_form_popup", "label": "Enable Form Popup", "default": false },
{ "type": "html", "id": "hulk_form_id_block", "label": "Hulk Form Code", "visible_if": "{{ block.settings.enable_form_popup }}" },
{ "type": "text", "id": "hulk_form_popup_class", "label": "Hulk Form Button Class", "default": "hulk-form-modal-custom-trigger", "visible_if": "{{ block.settings.enable_form_popup }}" }
```
And add to the existing `button_link` setting: `"visible_if": "{{ block.settings.enable_form_popup == false }}"`.

## Report back
- The **exact symptom** you reproduced (form shows inline / button click does nothing / modal empty / broken X / wrong form on 2nd button / not centered) and which checklist item (①–⑦) it maps to.
- Whether the failing page's **handle is in `hulk_handles`** (paste the current list) and whether the CSS/JS actually loaded (Network tab).
- Whether the rendered button has the **`hulk-form-modal-custom-trigger`** class.
- Whether the page has **multiple** popup buttons (the duplicate-ID bug ③) — and if so, which fix option (a/b) you want.
- Whether **Hulk Form Builder** app + app embed is enabled and **`icon-close.webp`** exists in Content → Files.
- Confirm the 4 files match the reference and the modal opens/closes via X, backdrop, and Escape.
