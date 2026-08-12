# Migration Prompt — Button Block + Hulk-Form Popup

> **Run this FIRST**, before the wholesale / affiliate / any Hulk-popup page prompts.
> Paste everything below (from the `---` line) into the Claude Code session running on the **new Essence 4.2 store**.

---

I need to add a **Hulk-form popup** capability to the theme's **`button` block** and **`button` snippet**. This is an **additive** customization on top of Essence's stock button — so **do not blindly create or overwrite**. Work in this order.

## Step 0 — Check what already exists (report before changing anything)
1. Does `snippets/button.liquid` exist? Read it. Essence 4.2 almost certainly ships a stock one — I need to **extend** it, not replace it.
2. Which sections define a `button` **block**? Search section schemas for `"type": "button"` (at minimum `sections/rich-text.liquid` and `sections/image-with-text.liquid`). List them and their current block settings.
3. Do `snippets/hulk-form-custom-modal.liquid`, `assets/custom-hulk-modal.css`, `assets/custom-hulk-modal.js` already exist?

Report findings. If a button block/snippet already exists, keep all its stock settings/translation keys and only add what's described below.

## Step 1 — `snippets/button.liquid` (extend, preserve stock behavior)
Ensure the snippet supports an optional Hulk popup. It must:
- Read these from the target's settings (in addition to the stock `button_link` / `button_style` / `button_size` / `button_text` / colors): `hulk_form_popup_class`, `hulk_form_id_block`.
- Render as a `<button>` (not `<a>`) when `hulk_form_id_block` is present; otherwise keep the stock `<a>`/link behavior.
- Add `{{ hulk_form_popup_class }}` into the element's class list.
- After the button, if `hulk_form_id_block != blank`, render the modal: `{% render 'hulk-form-custom-modal', hulk_form_id_block: hulk_form_id_block %}`.

Reference implementation (merge the Hulk bits into the 4.2 snippet — don't drop any stock params it already handles):

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

Confirm the `button-vars` snippet exists in 4.2 (stock). If the 4.2 snippet uses a different var-render name, keep 4.2's.

## Step 2 — `snippets/hulk-form-custom-modal.liquid` (create if missing)

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

> Dependency: **`icon-close.webp`** must exist in **Content → Files** on the new store.

## Step 3 — Add the popup settings to each `button` block schema
For every section that has a `"type": "button"` block (rich-text, image-with-text, and any others found in Step 0), **add these three settings** and **add a `visible_if` to the existing `button_link`** — keep all other stock settings and their `t:` translation keys untouched:

```json
{ "type": "checkbox", "id": "enable_form_popup", "label": "Enable Form Popup", "default": false },
{ "type": "html", "id": "hulk_form_id_block", "label": "Hulk Form Code", "visible_if": "{{ block.settings.enable_form_popup }}" },
{ "type": "text", "id": "hulk_form_popup_class", "label": "Hulk Form Button Class", "default": "hulk-form-modal-custom-trigger", "visible_if": "{{ block.settings.enable_form_popup }}" }
```

And on the existing `button_link` setting add:

```json
"visible_if": "{{ block.settings.enable_form_popup == false }}"
```

(So when popup is on, the URL field hides and the Hulk fields show.)

## Step 4 — `assets/custom-hulk-modal.css` (create if missing)

```css
body.hulk-form-modal-custom-open { overflow: hidden; }
.hulk-form-modal-custom-overlay {
  background: rgba(0,0,0,0.7); z-index: 99999; padding: 20px; box-sizing: border-box;
  display: none; opacity: 0; visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.hulk-form-modal-custom-overlay.active { display: flex; opacity: 1; visibility: visible; }
.hulk-form-modal-custom-content {
  background: #fff; max-width: 650px; max-height: 92vh; border-radius: 12px; padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3); box-sizing: border-box; overflow-y: auto;
  transform: scale(0.8) translateY(30px);
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.hulk-form-modal-custom-overlay.active .hulk-form-modal-custom-content { transform: scale(1) translateY(0); }
.hulk-form-modal-custom-close-btn {
  top: -10px; float: right; background: #f1f1f1; border: none; width: 35px; height: 35px;
  font-size: 20px; cursor: pointer; margin-bottom: -35px; z-index: 10;
}
.hulk-form-modal-custom-close-btn:hover { background: #e0e0e0; }
.hulk-form-modal-custom-content::-webkit-scrollbar { width: 6px; }
.hulk-form-modal-custom-content::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
@media screen and (max-width: 480px){
  .hulk-form-modal-custom-content { padding: 1.25rem; }
  .hulk-form-modal-custom-close-btn { width: 1.5rem; height: 1.5rem; }
  .hulk-form-modal-custom-overlay { padding: .75rem; }
}
```

## Step 5 — `assets/custom-hulk-modal.js` (create if missing)

```js
(function () {
  const overlay = document.getElementById('hulk-form-modal-custom-overlay');
  if (!overlay) return;
  const triggers = document.querySelectorAll('.hulk-form-modal-custom-trigger');
  const closeBtn = document.getElementById('hulk-form-modal-custom-close-btn');
  const body = document.body;
  const openModal = () => { overlay.classList.add('active'); body.classList.add('hulk-form-modal-custom-open'); };
  const closeModal = () => { overlay.classList.remove('active'); body.classList.remove('hulk-form-modal-custom-open'); };
  triggers.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === "Escape" && overlay.classList.contains('active')) closeModal(); });
})();
```

## Step 6 — Load the modal assets conditionally in `layout/theme.liquid`
Add inside `<head>` (adjust the handle list to the pages that actually use popup buttons on the new store — **`wholesale`** is required; add others like `premium-vaporizer-guide`, `upgrade-experience`, `dropshipping` only if those pages exist and use the popup):

```liquid
{% assign hulk_handles = 'wholesale,premium-vaporizer-guide,upgrade-experience,dropshipping' | split: ',' %}
{% if hulk_handles contains page.handle %}
  <style>.hulk-form-modal-custom-overlay{display:none}</style>
  <link rel="preload" href="{{ 'custom-hulk-modal.css' | asset_url }}" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>{{ 'custom-hulk-modal.css' | asset_url | stylesheet_tag }}</noscript>
  <script src="{{ 'custom-hulk-modal.js' | asset_url }}" defer="defer"></script>
{% endif %}
```

## How it works (so you can verify)
A button block with **Enable Form Popup = on** renders as a `<button>` carrying the class `hulk-form-modal-custom-trigger` and injects a hidden modal containing the pasted Hulk `pxFormGenerator` embed. The JS opens the modal on click. The CSS/JS load **only** on the listed page handles. Buttons **without** the popup behave exactly like the stock Essence button.

## Dependencies / report back
- **`icon-close.webp`** in Content → Files.
- **Hulk Form Builder** app installed + app-embed enabled (so the `pxFormGenerator` div actually populates).
- Report: whether `button.liquid` / the button blocks / the modal assets already existed; exactly which section schemas you added the 3 settings to; and confirm the stock button (no popup) still renders unchanged.
