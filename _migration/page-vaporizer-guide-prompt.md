# Migration Prompt — Premium Vaporizer Guide Page

> **Prerequisites (run these FIRST if not already done):**
> - `page-affiliate-prompt.md` — this page reuses `affiliate-why-join`, `affiliate-how-it-works`, `faq-accordion`, and the `affiliate-preset-icon` snippet, AND depends on the `.affiliate-img-text-section` CSS from `affiliate-page.css`.
> - `button-block-prompt.md` — optional here (no Hulk popup on this page, but the `button` block must exist).
>
> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.

---

Recreate my **Premium Vaporizer Guide** page from my Essence 4.1 store onto this Essence 4.2 theme. Template: `templates/page.premium-vaporizer-guide.json` (large — ~1,350 lines). It's built from **2 page-specific custom sections + shared custom sections + stock sections**. All styling is inline in the section/snippet files — **there is no vaporizer-guide CSS in `main.css`**.

## 1. Page-specific custom sections + snippet (port these)
- **`sections/vaporizer-guide-table.liquid`** ⚑ — a wrapper (section header + button) that renders the snippet below via `{% render 'vaporizer-guide-table' %}`. Schema has: content_width, subheading/heading/heading_size/heading_html_tag, text_alignment, link_text (html) + link_url + new_tab, `button` (text) + `button_link` (url), colors. `enabled_on: templates: ["page"]`.
- **`snippets/vaporizer-guide-table.liquid`** ⚑ — **CRITICAL, don't miss this.** Holds the actual **hardcoded comparison table** (Legacy PRO 2 / Legacy CORE / XS GO / OM Keychain Waxpen across 8 spec rows) plus its own inline `<style>` (`.cmp-wrap` / `.cmp-table` / `.cmp-sticky-left` / `.cmp-sticky-top` — sticky first column + header, horizontal-scroll on mobile, black header row, hover row highlight). Copy it verbatim.
- **`sections/vaporizer-guide-trusted-by.liquid`** ⚑ — "Trusted By" press-endorsement section. Fully self-contained inline CSS (`.tb-*`, black surface, `--tb-accent` gold). Blocks: **`endorsement`** (quote, source_name, source_meta, logo image_picker) and **`logo`** (image). Section settings include `accent_color` (default `#FBBC05`) + standard heading/colors. Has presets.

## 2. Shared custom sections used here (should already exist from other page prompts)
Confirm these exist & match; report drift:
- `sections/affiliate-why-join.liquid` ⚑ (used **twice** — a 6-benefit block and a 10-benefit block)
- `sections/affiliate-how-it-works.liquid` ⚑
- `sections/faq-accordion.liquid` ⚑ (+ `faqs` blocks; 10 FAQs)
- `sections/featured-collection.liquid` (with the `custom_class` setting)
- `snippets/affiliate-preset-icon.liquid` (shared preset-icon library)
- Shared stock snippets they render: `section-bg-number-vars`, `get-content-width`, `section-attrs`, `section-header`.

## 3. Stock sections used (verify present in 4.2 — no changes needed)
`main-page`, `image-with-text-overlay`, `image-with-text`, `rich-text`, `custom-liquid`, `collapsible-content`, `apps`.

## 4. Cross-page CSS dependency
One `image-with-text` block carries `custom_class: section--no-padding affiliate-img-text-section`. That styling comes from **`assets/affiliate-page.css`** (created in the affiliate-page prompt) — but that file is loaded only on `template.suffix == 'affiliate-program'`. Since this page also uses `.affiliate-img-text-section`, do ONE of:
- **(Recommended)** also load `affiliate-page.css` on this page — change the conditional in `layout/theme.liquid` to include this template, e.g.
  ```liquid
  {% if template.suffix == 'affiliate-program' or template.suffix == 'premium-vaporizer-guide' %}
    {{ 'affiliate-page.css' | asset_url | stylesheet_tag }}
  {% endif %}
  ```
- **or** fold the `.affiliate-img-text-section` rules into `sections/image-with-text.liquid`'s inline style (they're class-scoped, so safe globally).

There is also a cosmetic `custom_class: vap-guide-richtext` on the last rich-text — no CSS exists for it (unused hook); nothing to port.

## 5. Template `templates/page.premium-vaporizer-guide.json`
**Copy it verbatim from my theme** (it's large; retyping risks errors). Copying preserves order, all `disabled` flags, and two section-level inline `custom_css` arrays. Enabled section flow (⚑ = custom):

| Section | Notes |
|---|---|
| image-with-text-overlay | hero (`Whole_Sale.webp` / `_Mob`) |
| image-with-text | "How to Choose…" — `custom_class: section--no-padding affiliate-img-text-section` (`Image.webp`) |
| vaporizer-guide-table ⚑ | the comparison table (renders the snippet) |
| affiliate-why-join ⚑ | 6 benefits |
| collapsible-content | stock FAQ-style accordion |
| custom-liquid | (enabled instance in the flow) |
| affiliate-why-join ⚑ | 10 benefits |
| faq-accordion ⚑ | 10 FAQs |
| image-with-text ×2 | with buttons |
| affiliate-how-it-works ⚑ | |
| custom-liquid + rich-text | |
| apps (Loox) ⚑app | **see §6** |
| vaporizer-guide-trusted-by ⚑ | press endorsements |
| featured-collection ⚑ | product grid |

Also present but **disabled** (plain-text / alternate fallbacks — copy preserves them, they don't render): `main`, several `rich-text`, and **two `custom-liquid` comparison tables** (3-column `pLedMR` and 4-column `X8aUww`) that duplicate the `vaporizer-guide-table` snippet. Leave them disabled.

## 6. IMPORTANT — Loox app block will NOT port automatically
The `apps` section (`id: 17558708901c5ba160`) contains a **Loox Reviews** testimonial-carousel app block:
`shopify://apps/loox-reviews/blocks/loox-testimonial-carousel-section/5c3b337f-fd14-4df5-b1d6-80ec13e6e28e`
App block references are tied to the app install on the original store and **will not resolve on the new store**. After installing **Loox** on the new store, **re-add this app block via the theme editor** (Loox → Testimonial Carousel) in the same position and re-enter the settings (maxWidth 1100, desktop font 32 / mobile 20, quote icon `style-4`, autoplay 4s, pagination on, colors `#000`). If the copied template throws on the unresolved block, delete just that block and re-add it through the editor.

## 7. Store-specific dependencies to set up
- **Page + template:** create a Page with handle **`premium-vaporizer-guide`** using the **`page.premium-vaporizer-guide`** template.
- **Loox Reviews app** installed (for §6, and product-card Loox ratings elsewhere).
- **Collection handle `airvape-2025`** must exist (the table button + rich-text buttons link to `shopify://collections/airvape-2025`).
- **Images → Content → Files:** re-upload every `shopify://shop_images/…` reference. Known ones: `Whole_Sale.webp`, `Whole_Sale_Mob.webp`, `Image.webp`, plus the images in the two lower `image-with-text` sections and the Trusted-By logos. **After copying the template, grep it for `shopify://shop_images` and re-upload each file**, then re-point any that got new filename hashes.
- **Products** (featured-collection) — verify the product handles in the copied `featured-collection` section exist (same signature-models set used on the other pages: `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-…`).
- **Hulk popup:** NOT used on this page (all buttons are normal links). The `premium-vaporizer-guide` handle is in the Hulk-handle list from the button-block prompt but harmless; you can drop it from that list since no popup renders here.

## 8. Report back
- Which sections/snippets already existed vs. created — **explicitly confirm BOTH `sections/vaporizer-guide-table.liquid` AND `snippets/vaporizer-guide-table.liquid` were ported** (the section is empty-looking without the snippet).
- How you handled the Loox app block (§6).
- Confirmation `.affiliate-img-text-section` styling loads on this page (§4).
- JSON validity of the template; order/disabled states + section-level `custom_css` preserved.
- The "must create" checklist: `premium-vaporizer-guide` page, Loox install, `airvape-2025` collection, all `shop_images` files, and any missing product handles.
