# 00 — MASTER MIGRATION PROMPT (AirVape · Essence 4.1 → 4.2)

> **Paste this whole file (from the `---` line) into the Claude Code session running on the NEW store's Essence 4.2 theme FIRST**, before any individual prompt.
> It is the control document: the rules, the order, the full file inventory, the shared prerequisites, and the verification checklist. Every other `*-prompt.md` file in this folder is a *sub-task* referenced here.

---

You are migrating a heavily customized **Essence 4.1** storefront (AirVape) onto a **fresh Essence 4.2** theme. Essence themes are self-contained (precompiled Tailwind in `main.css`, web components in `main.mjs`), so this is **not** a file copy — it is a controlled, verified re-application of each customization on top of 4.2 stock.

## 0. GOLDEN RULES — read before doing anything

1. **ASK BEFORE YOU CHANGE ANYTHING.** Do not edit, create, or overwrite a single theme file until you have shown me (a) what you found, (b) what 4.2 already has, (c) the exact diff you propose, and (d) which sub-prompt it belongs to — and I have said "go". Work **one sub-task at a time**. Never batch-apply.
2. **My #1 concern is that nothing is missed in the 4.1 → 4.2 move.** When in doubt, surface it — an extra question is always cheaper than a lost customization.
3. **Diff-first, always.** For every file a sub-prompt touches, first compare the 4.1 source (embedded in the sub-prompt) against the current 4.2 stock file. Report: identical / stock-changed / custom-only. Only then propose the patch. If 4.2 stock changed the surrounding code, adapt the customization to 4.2 — do not blindly paste 4.1 over it.
4. **Never put page-specific CSS back into `main.css`.** In 4.2, section-scoped CSS travels inline in the section; page CSS that lived in 4.1's `main.css` goes into a NEW dedicated asset loaded via `template.suffix` (e.g. `dropshipping-page.css`).
5. **Only existing precompiled Tailwind utilities work.** You cannot invent new Tailwind classes in `main.css` — if a class isn't already compiled, write real CSS instead.
6. **Verify after every sub-task** against the checklist in §6 before moving to the next.
7. This document lives in the OLD repo's `_migration/` folder only for reference. **Do not modify the old theme.**

## 1. EXECUTION ORDER (do the phases top-to-bottom)

Each item links to its self-contained sub-prompt in this folder. Run them **in this order** — later items depend on earlier ones.

### Phase A — Global foundation (do first, everything depends on these)
| # | Sub-prompt | Covers |
|---|---|---|
| A1 | `global-settings-prompt.md` | `config/settings_data.json` presets: colors, typography, fonts, spacing, corner radii, buttons |
| A2 | `header-footer-prompt.md` | Header + footer sections & settings, mega-menu columns, menus |
| A3 | `header-footer-css-js-prompt.md` | Header/footer custom CSS + JS |
| A4 | `mobile-menu-prompt.md` | Mobile menu markup, accordion JS, category counts, images |
| A5 | `button-block-prompt.md` | **Hulk popup button block** — REQUIRED before any page with an "Apply"/"Contact" popup |
| A6 | `hulk-form-modal-fix-prompt.md` | Fixes the two Hulk modal bugs (page-handle gate + duplicate overlay ID) |

### Phase B — Global commerce components (reused across all product/cart pages)
| # | Sub-prompt | Covers |
|---|---|---|
| B1 | `cart-drawer-prompt.md` | Cart drawer/modal + free-shipping bar + **Part B country-gated shipping** |
| B2 | `quantity-selector-prompt.md` | Qty selector across PDP + cart page + drawer |
| B3 | `sticky-add-to-cart-prompt.md` | Sticky ATC markup + settings + JS |
| B4 | `sticky-add-to-cart-styling-prompt.md` | All sticky ATC CSS (main.css block + inline close button) |
| B5 | `sticky-media-gallery-prompt.md` | Sticky PDP media column (position:sticky) + gallery/lightbox |
| B6 | `wishlist-and-cart-icon-prompt.md` | Wishlist heart colors (XB app) + cart icon in ATC button |

### Phase C — Templates: listings & homepage
| # | Sub-prompt | Covers |
|---|---|---|
| C1 | `index-homepage-prompt.md` | Homepage `index.json` (full section export) + slideshow rules |
| C2 | `collection-prompt.md` | Collection template: JSON, CSS, facets, breadcrumb, menus, counts, price range |
| C3 | `list-collections-prompt.md` | Collections-list page |
| C4 | `blog-article-prompt.md` | Blog + article templates |

### Phase D — Product templates (product-core is the reference spec)
| # | Sub-prompt | Product template |
|---|---|---|
| D0 | `product-core-prompt.md` | `product.core.json` — **the reference**; read its structure first |
| D1 | `product-prompt.md` | `product.json` (default) |
| D2 | `product-avx-prompt.md` | `product.avx.json` |
| D3 | `product-avx-royal-prompt.md` | `product.avx-royal.json` |
| D4 | `product-enso-prompt.md` | `product.enso.json` |
| D5 | `product-om-wax-pen-prompt.md` | `product.om-wax-pen.json` |
| D6 | `product-pro-2-prompt.md` | `product.pro-2-_po.json` |
| D7 | `product-xs-go-prompt.md` | `product.xs-go.json` |
| D8 | `product-mycustom-skin-studio-prompt.md` | `product.mycustom-skin-studio.json` |

### Phase D (cont.) — Product bundles & variant templates (each reuses its base template's spec)
| # | Sub-prompt | Product template | Base |
|---|---|---|---|
| D9 | `product-ac5000-prompt.md` | `product.ac5000.json` | core-family |
| D10 | `product-airvape-om-prompt.md` | `product.airvape-om.json` | om-wax-pen |
| D11 | `product-artist-edition-skins-prompt.md` | `product.artist-edition-skins.json` | skins |
| D12 | `product-avx-bundle-prompt.md` | `product.avx-bundle.json` | avx |
| D13 | `product-avx-royal-bundle-prompt.md` | `product.avx-royal-bundle.json` | avx-royal |
| D14 | `product-core-bundle-prompt.md` | `product.core-bundle.json` | core |
| D15 | `product-enso-bundle-prompt.md` | `product.enso-bundle.json` | enso |
| D16 | `product-enso-open-box-prompt.md` | `product.enso-open-box.json` | enso |
| D17 | `product-fabric-texture-skins-prompt.md` | `product.fabric-texture-skins.json` | skins |
| D18 | `product-legacy-pro-prompt.md` | `product.legacy-pro.json` | pro |
| D19 | `product-om-wax-pen-bundle-prompt.md` | `product.om-wax-pen-bundle.json` | om-wax-pen |
| D20 | `product-pro-2-pro-bundle-prompt.md` | `product.pro-2-_pro-bundle.json` | pro-2 |
| D21 | `product-signature-skins-prompt.md` | `product.signature-skins.json` | skins |
| D22 | `product-xs-go-bundle-prompt.md` | `product.xs-go-bundle.json` | xs-go |

> **Excluded:** `product.breathelet` / `product.breathelet-bundle` — Breathelet was removed from the store (commit `0587b15`). Not migrating unless you say otherwise.

### Phase E — Content pages
| # | Sub-prompt | Page template |
|---|---|---|
| E1 | `page-wholesale-prompt.md` | `page.wholesale.json` (Hulk form) — also the source of "OUR SIGNATURE MODELS" featured-collection |
| E2 | `page-dropshipping-prompt.md` | `page.dropshipping.json` (Hulk form) |
| E3 | `page-upgrade-prompt.md` | `page.upgrade.json` (Hulk form) |
| E4 | `page-contact-prompt.md` | `page.contact.json` (Hulk form) |
| E5 | `page-brand-story-prompt.md` | `page.brand-story.json` (Hulk form) |
| E6 | `page-faq-prompt.md` | `page.faq.json` — needs `faq_group` metaobject entries |
| E7 | `page-vaporizer-guide-prompt.md` | `page.premium-vaporizer-guide.json` |
| E8 | `page-recycling-prompt.md` | `page.recycling-page.json` — Typeform embed |

### Phase F — Utility & account templates
| # | Sub-prompt | Template(s) |
|---|---|---|
| F1 | `account-templates-prompt.md` | `customers/account`, `login`, `register`, `order`, `addresses`, `reset_password`, `activate_account` |
| F2 | `cart-page-prompt.md` | `cart.json` (standalone cart PAGE — distinct from the drawer in B1) |
| F3 | `collection-skin-shop-prompt.md` | `collection.skin-shop.json` (special skin-shop collection) |
| F4 | `utility-templates-prompt.md` | `search`, `404`, `gift_card`, `password` |

## 2. SHARED PREREQUISITES (set these up on the new store BEFORE the phases that need them)

These are **store-data**, not theme code — the theme will render empty/broken without them. Confirm each exists on the new store; if not, tell me and I'll provide it.

- **Apps to install:** Loox (reviews), XB Wishlist, Klaviyo, Hulk Form Builder, Typeform (recycling), Mighty Image Uploader (skins/skin-studio), **Appstle Loyalty & Rewards** (points-balance block on `customers/account`). Match each app's embed/handle.
- **Hulk Form IDs** (each page has its own — must be recreated per new store and substituted in that page's button block):
  - wholesale `5SFE79Cjl2RbLpVX9hGo4A` · dropshipping `2hYTel6_YFW8geyn4J9Yxg` · upgrade `aZnhGjcI6jVLLhlj-HA3_Q` · contact/brand-story `412J8y-6QuI3v4OZ3ex_cw`
  - Plus the `hulk_handles` list in `theme.liquid` (page handles where the form loader is allowed to run).
- **Menus (linklists)** required by header/mobile-menu/collection nav: `header-menu-mobile`, `parts-accessories`, `vaporizers`, plus special handles `accessories`, `all-devices`, `replacement-parts`, `airvape-2025`.
- **Metaobjects:** `faq_group` (FAQ page) + any `product.metafields.custom.*` / `collection.metafields.custom.*` used across PDPs (see each product sub-prompt's metafield table).
- **Custom font:** `Montserrat-Thin.woff2/.woff` uploaded to Content → Files + the `@font-face` block in `theme.liquid`.
- **Images to re-upload to Content → Files** — every sub-prompt lists its own; the notable one is the ENSŌ "WHY ENSO WINS?" comparison table which hardcodes **absolute old-store CDN URLs** that must be re-hosted or they'll 404.
- **Product / collection / page handles** referenced in JSON must exist on the new store (create products/collections first, or the sections render empty).

## 3. FULL THEME-FILE COVERAGE MATRIX

This is the "did we miss anything" ledger. **✅ = has a dedicated sub-prompt. ⚠️ = customized but NOT yet covered (needs a decision — see §5). ⬜ = stock 4.2, verify only.**

### 3a. Assets (custom CSS/JS)
| File | Status | Note |
|---|---|---|
| `main.css` | ✅ (per-feature) | patched piecemeal by each component sub-prompt; never wholesale-copied |
| `main.mjs` | ⬜/⚠️ | web components — mostly stock; confirm no custom element edits were made in 4.1 |
| `main-product.css` | ✅ | embedded in `product-core-prompt.md` (byte-identical across product templates) |
| `custom-hulk-modal.css` / `.js` | ✅ | in `button-block-prompt.md` / `hulk-form-modal-fix-prompt.md` |
| `custom-homepage-usps.css` | ⚠️ | homepage USP layout — verify it's captured by `index-homepage-prompt.md`; if not, flag |
| `custom-categories.css` | ⚠️ | collection category tabs — verify vs `collection-prompt.md` |
| `product-metaobject-faqs.css` | ⚠️ | PDP metaobject FAQ styling — verify vs product sub-prompts |
| `custom-js.js` | ⚠️ | global custom JS — **not yet audited**; needs a dedicated pass |
| `custom-font.css` / `custom-fonts.css` | ⚠️ | likely orphan (font is inline @font-face in theme.liquid) — confirm before skipping |

### 3b. Templates WITH a sub-prompt (✅)
Products: `product.core`, `product` (default), `product.avx`, `product.avx-royal`, `product.enso`, `product.om-wax-pen`, `product.pro-2-_po`, `product.xs-go`, `product.mycustom-skin-studio`.
Other: `index`, `collection`, `list-collections`, `blog`/`article`, `cart` (drawer), pages: `wholesale`, `dropshipping`, `upgrade`, `contact`, `brand-story`, `faq`, `premium-vaporizer-guide`, `recycling-page`.

### 3c. Scope decisions (locked)
- **Product bundles / variants → COVERED** (Phase D9–D22). Excludes `breathelet`(+`-bundle`), removed from store.
- **Utility & account templates → COVERED** (Phase F1–F4).
- **Promo / seasonal pages → OUT OF SCOPE** (do NOT migrate; do NOT re-flag in the verify sweep): `420-promotions`, `black-friday`, `collabs`, `cw`, `cyberweek`, `fourth`, `halloween-deals`, `labor-day-exclusive`, `memorial-week`, `vday`, `weesha-promo`, `winter-promotion`, `xmas`.
- **Manuals / guides → OUT OF SCOPE**: `enso-manual`, `legacy-core-user-guide`, `legacy-manual`, `om-how-to`, `om-manual`, `pro-manual`, `user-manuals`, `x-manual`, `xroyal-manual`, `xs-go-manual`.
- **Other misc pages → OUT OF SCOPE unless I say otherwise**: `affiliate-program`, `airvape-exeperience`, `contact-new`, `curtis`, `fast-heat-up`, `happy-customers`, `page` (default), `store-locator`, `support`, `support1`, `warranty`.

### 3d. Known cross-cutting content issues (recurring — fix once, everywhere)
These surfaced across MANY templates during prompt generation. Treat each as a **merchant decision**, don't silently port:
- **Stale "COMPLETE YOUR MEMORIAL DAY COLLECTION" heading** on the closing featured-collection of nearly every product BUNDLE template (avx-bundle, avx-royal-bundle, core-bundle, enso-bundle, om-wax-pen-bundle, pro-2-pro-bundle, xs-go-bundle). Looks like leftover seasonal copy — confirm the intended heading.
- **`breathelet-*` handles** still appear in "OUR SIGNATURE MODELS" / featured-collection lists on product.json (default), ac5000, core-bundle, avx-bundle, legacy-pro, cart page, and 404. Breathelet was removed from the store (commit `0587b15`) — these are likely dead links.
- **Bundle templates enable live video where the base template hid it behind an image fallback.** Every bundle (avx, avx-royal, core, enso, om-wax-pen, pro-2, xs-go) has its slideshow/video-with-text(-overlay) sections ENABLED with NO image-fallback section — so those videos actually play. Verify each video file is re-uploaded, or the section renders empty.
- **Animated GIFs** (`Heating1.gif`, `WaterShell.gif` on avx/avx-royal bundles; `Temp_settings.gif` placeholder on xs-go-bundle) replace static `.webp` stills — preserve animation through re-upload; confirm `Temp_settings.gif` isn't a stray placeholder.
- **Hardcoded absolute URLs to re-host:** ENSŌ base "WHY ENSO WINS?" table (old-store CDN images) and `product.airvape-om` (~17 CDN URLs + 10 hardcoded variant IDs + a custom `/cart/add.js` flow that pokes header markup directly — needs manual verification against 4.2 header, not just a JSON diff). Bundle templates themselves use portable `shopify://` refs (no CDN URLs).
- **`product.airvape-om` has main-product + related-products fully DISABLED** — the entire page is one legacy `custom-liquid` block. Unusual; document before touching.

## 4. VERIFY-EVERYTHING SWEEP (run this to prove nothing was missed)

Before declaring the migration done, run a full reconciliation — don't trust the matrix alone:
1. **List every template** in the old theme and the new theme; diff the two lists. Any old template with no new counterpart = missed.
2. **For every customized file** (sections/snippets/blocks/assets that differ from 4.2 stock in the old theme), confirm the customization exists on the new store or is intentionally dropped. Ask me about each "dropped."
3. **Grep the old theme for app hooks** (`loox`, `xb-wishlist`, `hulk`, `klaviyo`, `typeform`, `mighty`) and confirm each is wired on the new store.
4. **Grep for hardcoded absolute URLs** (old myshopify/CDN domains) and re-host/repoint them.
5. Produce a final "covered / dropped / needs-attention" report for my sign-off.

## 5. SCOPE — RESOLVED
- **In scope:** all Phase A–F sub-prompts (foundation, commerce components, listings, all product templates + bundles/variants, the 8 content pages, utility & account templates).
- **Out of scope:** promo/seasonal pages, manuals/guides, misc pages listed in §3c (leave at 4.2 stock; don't re-flag).
- **`custom-js.js` + the other orphan CSS assets:** not individually prompted — audit them during the §4 verify sweep and report anything still referenced before dropping (§3a).

## 6. PER-SUB-TASK VERIFICATION CHECKLIST (apply after each phase item)
- [ ] Diffed the 4.1 source against 4.2 stock; reported identical / changed / custom.
- [ ] Applied only the custom delta (adapted to 4.2 where stock moved).
- [ ] All referenced assets/snippets/blocks exist (no missing includes → no Liquid errors).
- [ ] All store-data prerequisites for this item exist (apps, menus, metaobjects, handles, images).
- [ ] Rendered the page on the new store; visually matches the old store (desktop + mobile).
- [ ] No console errors; web components hydrate; sticky/drawer/gallery behave.
- [ ] Reported back what changed, what was already stock, and anything I had to drop or defer.

## 7. Report back
After you read this file, DO NOT start editing. Instead:
1. Confirm you have every `*-prompt.md` file referenced in Phases A–F above and can open each one.
2. Tell me which 4.2 stock files already match vs differ for **Phase A** (the foundation) so we start there.
3. List anything in §3c you can already see is live on the new store vs retired.
4. Wait for my "go" on the first sub-task.
