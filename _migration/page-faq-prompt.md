# Migration Prompt — FAQ Page

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.

---

Recreate my **FAQ** page (`templates/page.faq.json`) onto this Essence 4.2 theme. The page is tiny in structure but has **one important non-obvious dependency**: the FAQ content is driven by **Shopify metaobjects**, not by section settings.

## 1. Sections used
| Section | Type | Notes |
|---|---|---|
| image-with-text-overlay | stock | **banner/hero at top** (see §2 — add this) |
| faq-page ⚑ | **custom** | metaobject-driven FAQ accordion (see §3) |
| featured-collection | shared ⚑ | "OUR SIGNATURE MODELS" signature-models carousel |
| main-page | stock | disabled |

## 2. Add an image-with-text-overlay banner at the top
My original FAQ template had no hero. Add the same **`image-with-text-overlay` banner** that the other pages use (e.g. the hero in `templates/page.wholesale.json`) as the **first** rendered section, so the FAQ page opens with a title banner. Insert this section into `templates/page.faq.json` and put it first in the `order` array (before `faq_page_…`):

```json
"image_with_text_overlay_faqbanner": {
  "type": "image-with-text-overlay",
  "blocks": {
    "heading_faq": {
      "type": "heading",
      "settings": { "heading": "{{ page.title }}", "heading_size": "h2", "heading_html_tag": "h1" }
    },
    "text_faq": {
      "type": "text",
      "settings": { "text": "<p>Answers to the questions we hear most.</p>" }
    }
  },
  "block_order": ["heading_faq", "text_faq"],
  "settings": {
    "custom_class": "",
    "full_width": true,
    "fit_image": true,
    "enable_transparent_header": false,
    "use_original_media_size": false,
    "image": "shopify://shop_images/Whole_Sale.webp",
    "image_mobile": "shopify://shop_images/Whole_Sale_Mob.webp",
    "content_alignment": "md:content-middle-left",
    "content_alignment_mobile": "content-middle-left",
    "link": "",
    "min_height": 300,
    "text_color": "#ffffff",
    "overlay_color": "#000000",
    "overlay_opacity": 0,
    "overlay_type": "solid"
  }
}
```
Resulting `order`: `["image_with_text_overlay_faqbanner", "faq_page_…", "featured_collection_…", "main"]`.

> This is copied from the wholesale hero pattern. **Set a FAQ-appropriate banner image** — the example reuses `Whole_Sale.webp` / `Whole_Sale_Mob.webp` as a placeholder; swap in a dedicated FAQ banner image (desktop + mobile) if you have one, and both must exist in Content → Files.

## 3. Port `sections/faq-page.liquid` (custom, self-contained)
Copy my `sections/faq-page.liquid` verbatim. It's fully self-contained:
- Inline `<style>` (`.faq-page`, `.faq-heading`, `.faq-subheading`, `.faq-item`, `.faq-question` with rotating chevron, `.faq-answer` max-height accordion, `.faq-group-addtional-info a` button styling using theme `--button-*` vars). **No CSS in `main.css`** — nothing to add there.
- Inline `<script>` — accordion open/close + smooth-scroll-into-view (`HEADER_OFFSET = 70`).
- Renders the stock `icon-chevron` snippet (confirm it exists in 4.2).
- Schema is empty (`"settings": []`) with `enabled_on: templates: ["page"]` — all content comes from metaobjects.

## 4. CRITICAL — recreate the Metaobjects (the FAQ content lives here, not in the theme)
The section reads `shop.metaobjects.faq_group.values | sort: 'sort_order'`. Without these metaobject definitions **and entries**, the FAQ page renders **empty**. On the new store, in **Settings → Custom data → Metaobjects**, recreate:

- **`faq_group`** (definition), with fields:
  - `heading` — single-line text
  - `sort_order` — integer (used for ordering)
  - `direct_answers` — a **list** of a Q&A metaobject (each with `question` [text] + `answer` [rich text])
  - `sections` — a **list** of a "FAQ section" metaobject, each with `subheading` [text] + `answers` (a list of the same Q&A metaobject: `question` + `answer`)
  - `additional_information` — rich text (rendered as a CTA/button area)
- The referenced child metaobject definitions (a **Q&A** type with `question` + `answer`, and a **FAQ-section** type with `subheading` + `answers`).
- Then recreate the **entries** (the actual FAQ questions/answers/groups). This is content/data — it does **not** transfer with the theme. Export from my store's metaobjects and import, or recreate manually.

> The exact child metaobject type handles must match what the parent's list fields reference. Inspect my store's `faq_group` definition to mirror the field types and the referenced metaobject-definition handles precisely. Report the metaobject definitions you created and confirm `shop.metaobjects.faq_group` resolves.

## 5. Signature-models featured collection
The `featured-collection` here is the shared **"OUR SIGNATURE MODELS"** section. To guarantee an identical product set/config across pages, you may **copy the `featured-collection` section block from `templates/page.wholesale.json`** and use it here. (Note: the wholesale copy uses `carousel: false`; this FAQ page uses `carousel: true` — keep whichever carousel behavior you prefer, but keep the same product handles.) It needs the `custom_class` setting from the product-card/featured-collection prompt.

## 6. Store-specific dependencies
- **Page + template:** create a Page with handle **`faq`** using the **`page.faq`** template.
- **Banner image** (§2): a desktop + mobile image in Content → Files for the `image-with-text-overlay` hero.
- **Metaobjects:** the `faq_group` (+ child) definitions and entries from §4 — the single most important item.
- **Products** (featured-collection): `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.

## 7. Report back
- Confirm the `image-with-text-overlay` banner was added as the first section (§2).
- Confirm `sections/faq-page.liquid` ported and `icon-chevron` exists.
- **Confirm the metaobject definitions + entries were recreated and the FAQ page renders content** (this is the make-or-break item).
- JSON validity of `templates/page.faq.json`; `main` stays disabled.
- "Must create" checklist: `faq` page, `faq_group` metaobjects (+ entries), product handles.
