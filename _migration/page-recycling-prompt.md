# Migration Prompt — Recycle Program Page

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> No prerequisites — this page uses only stock sections (no Hulk popup, no custom section files).

---

Recreate my **Recycle Program** page (`templates/page.recycling-page.json`) onto this Essence 4.2 theme. This page is built **entirely from stock Essence sections + the shared `featured-collection` section** — there are **no page-specific custom section files and no CSS in `main.css`** (no custom classes are used anywhere on this page). The work is the template + store-specific assets.

## 1. Sections used (all stock/shared — verify present in 4.2, no code changes)
Enabled flow (in order):

| Section | Type | Notes |
|---|---|---|
| image-with-text-overlay | stock | hero "Save the planet" (gradient overlay 55%) |
| multicolumn | stock | timeline 2016→2021, 5 `column` blocks (last one disabled), 2-col desktop, grey `#eaeaea` bg |
| video | stock | YouTube embed `https://youtu.be/qoJomv4pyGo` + poster image |
| slideshow | stock | 5 `slide` blocks = sustainability certificates (desktop + mobile images), autoplay, dots |
| custom-liquid | stock | **Typeform embed** — see §2 |
| featured-collection | shared ⚑ | product carousel (needs the `custom_class` setting from the product-card/featured-collection prompt) |

**Disabled** (copy preserves; doesn't render): `main` (main-page), and the 5th multicolumn column (`2021`).

## 2. Typeform embed (account-specific — must update)
The `custom-liquid` section contains a Typeform live embed:
```html
<div data-tf-live="01J6CB1VZ7CV4P2KEXGH4A3DVZ"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```
The ID **`01J6CB1VZ7CV4P2KEXGH4A3DVZ`** belongs to my **Typeform account**. On the new store, replace it with the new form's `data-tf-live` ID (from the new store's Typeform), or keep it only if the same Typeform account is used. The `<script>` loader is generic and stays as-is. (No theme app-embed needed — it's a self-contained script.)

## 3. Template `templates/page.recycling-page.json`
Copy it verbatim from my theme (preserves order, block order, and `disabled` flags), then fix the store-specific references in §4.

## 4. Store-specific dependencies to set up
- **Page + template:** create a Page with handle **`recycling-page`** using the **`page.recycling-page`** template.
- **Images → Content → Files** (re-upload every `shopify://shop_images/…` — the references break otherwise):
  - Hero: `attachment_3B_20filename_3Dbd2f6f6e-1196-480d-9af8-040f08521b0e.png` (odd URL-encoded filename — keep the exact name or repoint the `image` setting after upload)
  - Timeline icons: `Recycle_icons-01.png`, `Recycle_icons-02.png`, `Recycle_icons-03.png`, `Recycle_icons-04.png`, `Recycle_icons-05.png`
  - Video poster: `thumbnail.png`
  - Slideshow (desktop): `CertificateAV1.png`, `CertificateAV2.png`, `CertificateAV3.png`, `CertificateAV4.png`, `CertificateAV5.png`
  - Slideshow (mobile): `CertificateAV1Mbl-01.png`, `CertificateAV1Mbl-03.png`, `CertificateAV1Mbl-05.png`, `CertificateAV1Mbl-04.png` (note some are reused across slides)
- **Video:** the `video` section uses the public YouTube URL `https://youtu.be/qoJomv4pyGo` (works as-is if the video stays public) plus the `thumbnail.png` poster above.
- **Typeform:** the `data-tf-live` ID from §2.
- **Products** (featured-collection): `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.

## 5. Report back
- Confirm all sections resolved as stock 4.2 sections (nothing custom needed) and `featured-collection` carries the `custom_class` setting.
- JSON validity of the template; order + `disabled` states preserved.
- "Must create" checklist: `recycling-page` page, all image files (esp. the odd-named hero + the certificate set), the new Typeform ID substitution, and any missing product handles.
