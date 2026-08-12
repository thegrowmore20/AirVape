# Migration Prompt — Dropshipping Page

> **Prerequisites (run these FIRST):**
> - `button-block-prompt.md` — the "Apply for Dropshipping" popups depend on the customized `button` block/snippet.
> - `page-affiliate-prompt.md` — this page is built mostly from the **`affiliate-why-join`** custom section.
> - `page-wholesale-prompt.md` — reuses the **`wholesale-who-can-apply`** custom section.
>
> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.

---

Recreate my **Dropshipping page** from my Essence 4.1 store onto this Essence 4.2 theme. It's a page template (`templates/page.dropshipping.json`) built almost entirely from **custom sections that are shared with the affiliate and wholesale pages** — so if those pages are already ported, no new section files are needed here. There is **one small page-specific CSS block**.

## 1. Custom sections used (should already exist if affiliate + wholesale were ported)
Confirm these exist and match my versions; report any drift:
- `sections/affiliate-why-join.liquid` — **used 5 times** on this page with different configs. Make sure the ported version supports ALL of these features (the dropshipping page exercises every one):
  - `columns_desktop` = 2 / 3 / 4
  - `color_scheme` = `light` / `dark`
  - `card_layout` = `stacked` / `inline`
  - benefit `tag_1`…`tag_5` chips
  - `bottom_note`
  - `brand_yellow_color`, `accent_color`, `icon_background_color`, `icon_color`, `card_background_color`
  - benefit `icon_type: svg` where `custom_svg` may be a **full inline SVG**, a short **number string** like `"01"…"06"` (rendered as a step number), or **empty**.
- `sections/wholesale-who-can-apply.liquid` — one instance ("Who Can Apply?").
- `sections/faq-accordion.liquid` (+ `faqs` blocks).
- `sections/featured-collection.liquid` (with the `custom_class` setting).
- Shared snippet dependency: the **preset-icon** snippet used by affiliate-why-join, and the customized **`button`** snippet/block (Hulk popup).

## 2. Page-specific CSS → do NOT add to `main.css`
One stock `image-with-text` section on this page carries `custom_class: dropshipping-orderflow-imgtext`, which turns its bullet list into a checkmark checklist. Put this in a **dedicated asset** (e.g. `assets/dropshipping-page.css`) loaded only on the dropshipping page, OR fold it into `sections/image-with-text.liquid`'s inline style (it's `.dropshipping-orderflow-imgtext`-scoped, so safe either way). Recommended: dedicated file.

```css
.dropshipping-orderflow-imgtext ul {
  margin-block: 8px;
  padding-left: 0;
}
.dropshipping-orderflow-imgtext li {
  list-style: none;
  padding: 4px 0 4px 35px;
  position: relative;
  font-size: 14px;
  border-bottom: 1px solid var(--awj-card-border, rgba(0,0,0,.1));
}
.dropshipping-orderflow-imgtext li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #ffbc05;
  transform: translateY(-50%);
  background-image: url('data:image/svg+xml,<svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.9865 6.8196L9.75033 19.0558L4.55575 13.8612" stroke="currentColor" stroke-width="2" /></svg>');
  background-repeat: no-repeat;
  background-size: 14px;
  background-position: center;
}
```

Load conditionally in `layout/theme.liquid` `<head>`:
```liquid
{% if template.suffix == 'dropshipping' %}
  {{ 'dropshipping-page.css' | asset_url | stylesheet_tag }}
{% endif %}
```

> **Fix I applied above:** in my original theme the `li` border used `var(--awj-card-border)` with no fallback. That variable is defined only inside `affiliate-why-join` sections, so on the image-with-text section it resolves to nothing and the border silently disappears. I added a fallback `rgba(0,0,0,.1)` so the border actually renders. Keep the fallback.

## 3. Template `templates/page.dropshipping.json`
**Copy it verbatim from my theme** (large inline SVGs in the affiliate-why-join / wholesale blocks — don't retype). Copying preserves order, all `disabled` flags, and one section-level inline `custom_css` (on the "Become an AirVape Dropshipping Partner" image-with-text block: `.section--block {margin-top: calc(var(--section-vertical-spacing) * 1);}`).

Enabled section flow (order array; ⚑ = custom section):

| # | Section | Notes |
|---|---|---|
| 1 | image-with-text-overlay | hero (`Whole_Sale.webp` / `_Mob`) |
| 2 | image-with-text | "Sell AirVape Products…" + Hulk popup (`Sell_AirVape_Products.webp`) |
| 3 | image-with-text | "How AirVape Dropshipping Works" (`How_AirVape_Dropshipping_Works.webp`) |
| 4 | affiliate-why-join ⚑ | "Dropshipping Process" — 6 numbered steps (`custom_svg` = `01`…`06`), 3 cols |
| 5 | image-with-text ⚑class | "Order Flow…" — `custom_class: dropshipping-orderflow-imgtext` (`Order_Flow_From_Placement.webp`) |
| 6 | affiliate-why-join ⚑ | "Why Partner…" — 4 cols, **dark** scheme |
| 7 | affiliate-why-join ⚑ | "Shipping Information" — 2 cols, tag chips |
| 8 | affiliate-why-join ⚑ | "Returns and Refunds" — 2 cols |
| 9 | wholesale-who-can-apply ⚑ | "Who Can Apply?" |
| 10 | affiliate-why-join ⚑ | "Important Program Conditions" — 2 cols, **dark**, `inline` layout, `bottom_note` |
| 11 | image-with-text | "Become an AirVape Dropshipping Partner" + Hulk popup (`Become_an_AirVape_Dropshipping_Partner.webp`) |
| 12 | faq-accordion ⚑ | 9 FAQs |
| 13 | featured-collection ⚑ | product grid |

Plus `main` and a set of **disabled** `rich-text` duplicates (plain-text fallbacks of the custom sections) — copy preserves them; they don't render.

After copying, fix the store-specific references below.

## 4. Store-specific dependencies to set up on the new store
- **Page + template:** create a Page with handle **`dropshipping`** using the **`page.dropshipping`** template (so `template.suffix == 'dropshipping'` and the CSS loads).
- **Images → Content → Files** (same filenames):
  - `Whole_Sale.webp`, `Whole_Sale_Mob.webp` (hero — shared with wholesale page)
  - `Sell_AirVape_Products.webp`
  - `How_AirVape_Dropshipping_Works.webp`
  - `Order_Flow_From_Placement.webp`
  - `Become_an_AirVape_Dropshipping_Partner.webp`
  - (One wholesale-who-can-apply block references `Businesses.svg` as `custom_image`, but `icon_type` is `svg` with inline `custom_svg`, so the file isn't actually required.)
  - Re-upload every `shopify://shop_images/…` ref or it will break.
- **Hulk form:** all "Apply for Dropshipping" buttons use Hulk form ID **`2hYTel6_YFW8geyn4J9Yxg`** (note: this is **different** from the wholesale form). Replace with the **new store's** dropshipping Hulk form ID, and confirm the Hulk Form Builder app-embed is enabled.
- **theme.liquid Hulk handle list:** ensure **`dropshipping`** is included in the `hulk_handles` list from the button-block prompt so the modal CSS/JS load here.
- **Products** (featured-collection) — handles must exist: `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.

## 5. Report back
- Which custom sections already existed vs. created; confirm `affiliate-why-join` supports all features listed in §1 (tags, inline layout, dark scheme, numbered custom_svg, bottom_note).
- Confirmation `assets/dropshipping-page.css` was created (not added to `main.css`) and loads only on `template.suffix == 'dropshipping'`, with the `--awj-card-border` fallback kept.
- JSON validity of `templates/page.dropshipping.json`; `disabled` states, order, and the section-level `custom_css` preserved.
- The "must create" checklist: `dropshipping` page, the 5 image files, the new Hulk form ID substitution, `dropshipping` added to the Hulk handle list, and any missing product handles.
