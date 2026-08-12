# Migration Prompt — Upgrade Experience Page

> **Prerequisite (run FIRST):** `button-block-prompt.md` — the "Apply for Upgrade" popups depend on the customized `button` block/snippet.
>
> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.

---

Recreate my **Upgrade Experience** page (`templates/page.upgrade.json`) onto this Essence 4.2 theme. Good news: this page uses **only stock Essence sections + the shared `featured-collection` section** — there are **no page-specific custom section files and no CSS in `main.css`** to port. The work is mostly the template + store-specific dependencies.

## 1. Sections used (all stock/shared — verify present in 4.2, no code changes)
Enabled flow (in order):

| Section | Type | Notes |
|---|---|---|
| image-with-text-overlay | stock | hero (`Upgrade_Program_1.webp` / `_Mob_1`) |
| rich-text | stock | "UpGrade Program" + **Hulk popup button** |
| collapsible-content | stock | "How it Works" upgrade paths (5 blocks) |
| image-with-text | stock | "Stay up to date" + **Hulk popup button** (`Upgrade_image_tech-01.png`) |
| video-with-text-overlay | stock | `custom_class: video-text-overlay-section` (no CSS exists for it — cosmetic hook, ignore) |
| featured-collection | shared ⚑ | product carousel (needs the `custom_class` setting from the product-card/featured-collection prompt) |

**Disabled** (copy preserves them; they don't render): `main` (main-page), a `multicolumn`, and a `custom-liquid` interactive widget (see §4).

## 2. Hulk popup buttons
The rich-text and image-with-text buttons use the **Hulk form popup** (`enable_form_popup: true`) with Hulk form ID **`aZnhGjcI6jVLLhlj-HA3_Q`**. This requires:
- The **button-block Hulk-popup customization** applied first (button-block-prompt.md).
- **`upgrade`** included in the `hulk_handles` list in `layout/theme.liquid` (it already is in that prompt's default list — keep it).
- Replace the Hulk form ID with the **new store's** upgrade form ID, and confirm the Hulk Form Builder app-embed is enabled.
- The buttons also have a `button_link: shopify://pages/upgrade-form` fallback — see §5 for that page handle.

## 3. Template `templates/page.upgrade.json`
Copy it verbatim from my theme (preserves order + `disabled` flags), then fix store-specific references (§5).

## 4. The disabled `custom-liquid` interactive widget (optional — decide before copying)
The template contains a **disabled** `custom-liquid` section (`custom_liquid_KEJpp8`) holding a self-contained interactive "Choose the AirVape you own" widget — inline `<style>` (`.upgrade-page …`, animated dots/lines, discount reveal) + inline `<script>` (click-to-select logic). It is **currently disabled and does not render**, but if you ever enable it, note these hard dependencies baked into the markup, all pointing at the **OLD store**:
- Google Fonts `@import` for Raleway (external — fine).
- Background + product images from the old store's theme-asset CDN: `https://cdn.shopify.com/s/files/1/0777/8339/t/41/assets/…` (`experience-circle-bg.svg`, `LPROboth.png`, `Legacy-manual-pic.png`, `AVX2.png`, `XSgo.png`). Store `0777/8339` is the OLD store — these must be **re-uploaded to the new theme's assets and the URLs updated**, or they'll 404.
- Absolute old-domain links: `https://airvapeusa.com/pages/upgrade-form/` and `/pages/upgrade-info` — change to the new store's page URLs (or `shopify://pages/…`).

Recommendation: leave it **disabled** on copy (the visible page uses the rich-text + collapsible-content instead). Only rehost the assets if you plan to turn it on.

## 5. Store-specific dependencies to set up
- **Page + template:** create a Page with handle **`upgrade`** using the **`page.upgrade`** template.
- **`upgrade-form` page:** the buttons link to `shopify://pages/upgrade-form` — create that page (handle `upgrade-form`) or repoint the `button_link`s. (The disabled widget also references `upgrade-info`.)
- **Images → Content → Files** (re-upload every `shopify://shop_images/…`): `Upgrade_Program_1.webp`, `Upgrade_Program_Mob_1.webp`, `Upgrade_image_tech-01.png`, and (for the disabled multicolumn, if you enable it) `up3-01.png`…`up3-04.png`.
- **Video:** the video-with-text-overlay uses `shopify://files/videos/AV_allprod_sc.webm` (with a YouTube fallback `https://www.youtube.com/watch?v=_9VUPq3SxOc`). Re-upload the `.webm` to the new store's Content → Files, or rely on the YouTube URL.
- **Products** (featured-collection): `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.

## 6. Report back
- Confirm all sections resolved as stock 4.2 sections (nothing custom needed) and `featured-collection` carries the `custom_class` setting.
- Confirm the Hulk button-block customization is in place and the new upgrade Hulk form ID was substituted.
- JSON validity of the template; order + `disabled` states preserved (esp. the widget/multicolumn stay disabled unless you chose to enable them).
- "Must create" checklist: `upgrade` page, `upgrade-form` page, the images, the `.webm` video, the new Hulk form ID, and any missing product handles.
