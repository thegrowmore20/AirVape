# Migration Prompt — Blog & Article Templates

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> No prerequisites — both templates use only stock sections (no custom section files, no Hulk popup).

---

Recreate my **Blog listing** (`templates/blog.json`) and **Article** (`templates/article.json`) templates onto this Essence 4.2 theme. Both are built **entirely from stock Essence sections + the shared `featured-collection` section**. There are **no custom section files**. The only custom code is **two small CSS rules** (article page) that currently live in `main.css` — see §3.

## 1. `templates/blog.json` — sections (all stock/shared)
Copy the template verbatim (preserves block settings + order). Sections in order:

| Section | Type | Notes |
|---|---|---|
| banner | `main-blog-banner` | heading `{{ blog.title }}`, solid overlay 35%, h1 |
| main | `main-blog` | blocks: **`tags`** (disabled) + **`posts`** (3-col layout, 12/page, classic pagination, featured first post, show tag/excerpt/date) |
| featured_collection | `featured-collection` (shared ⚑) | "OUR SIGNATURE MODELS" carousel |
| email-signup | `email-signup` | "Subscribe to our newsletter" |

## 2. `templates/article.json` — sections (all stock/shared)
Copy verbatim. Sections in order:

| Section | Type | Notes |
|---|---|---|
| main | `main-article` | `content_width: 768`; blocks in order: **`title`** (show tag/date/author/comment count, h1, left) · **`featured_image`** · **`content`** · **`share-button`** · **`previous-next-articles`** · **`comments`** (5/page) |
| featured_collection | `featured-collection` (shared ⚑) | **`custom_class: article-page-featured-collection`** — needs the CSS in §3 |

## 3. Custom CSS → do NOT add to `main.css`
On my store these two rules live in the compiled `main.css`. On the new theme, put them in a **dedicated asset** (e.g. `assets/blog-article.css`) and load it only on blog/article pages. Rules:

```css
/* Narrows the article-page featured collection to a tighter width */
.section--full-width.article-page-featured-collection {
  --container-outer-width: calc(
    40vw - var(--container-inner-width) / 2 - var(--scrollbar-width) / 2
  );
}

/* Tighter line-height for article body on mobile */
@media not all and (min-width: 768px) {
  .section-main-article .prose {
    line-height: 1.4;
  }
}
```

Load conditionally in `layout/theme.liquid` `<head>`:
```liquid
{% if request.page_type == 'article' or request.page_type == 'blog' %}
  {{ 'blog-article.css' | asset_url | stylesheet_tag }}
{% endif %}
```
> Only the article page uses these rules today (`.article-page-featured-collection` + `.section-main-article`); the blog listing has no custom CSS. The `request.page_type` guard above covers both safely. Alternatively, if the 4.2 `main.css`/`base.css` is where you keep such rules, you may keep them there — but a dedicated file avoids touching the compiled bundle.

## 4. Signature-models featured collection
The `featured-collection` on both templates is the shared **"OUR SIGNATURE MODELS"** section. To keep the product set/config identical across pages, you may **copy the `featured-collection` section block from `templates/page.wholesale.json`** and reuse it here — but keep the article one's `custom_class: article-page-featured-collection` so §3's CSS applies. Both use `carousel: true`. Needs the `custom_class` setting from the product-card/featured-collection prompt.

## 5. Store-specific dependencies
- **Stock sections** — confirm these exist in 4.2 (they should, all standard): `main-blog-banner`, `main-blog` (+ `tags`/`posts` blocks), `main-article` (+ `title`/`featured_image`/`content`/`share-button`/`previous-next-articles`/`comments` blocks), `email-signup`, `featured-collection`. Report any block/setting renamed or dropped under 4.2.
- **Blog(s):** these are the theme's default `blog` and `article` templates — they apply to your Online Store → Blog posts. Ensure at least one Blog exists and posts are published so the listing renders.
- **Newsletter:** `email-signup` posts to Shopify's customer form / your marketing app — confirm signup capture is set up (Klaviyo/Shopify Email).
- **Products** (featured-collection): `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.

## 6. Report back
- Confirm all sections/blocks resolved as stock 4.2 (nothing custom needed); `featured-collection` carries the `custom_class` setting.
- Confirm `assets/blog-article.css` created (not added to `main.css`) and loaded on blog/article page types, with the article-page rules intact.
- JSON validity of both templates; block order + disabled `tags` block preserved.
- "Must create" checklist: a Blog with published posts, newsletter capture, and the featured-collection product handles.
