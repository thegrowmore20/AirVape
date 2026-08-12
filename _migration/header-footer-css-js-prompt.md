# PROMPT — Port custom Header & Footer CSS/JS onto the new store

> Paste below the line into a Claude Code session on the new store's Essence 4.2 theme.

---

You are on a Shopify **Essence** 4.2 theme. I'm porting custom **header/footer CSS & JS** from my Essence 4.1.0 store. These custom styles target (a) my theme's custom header/footer **markup** and (b) the **XB Wishlist** app markup. 

**Rules:**
- Add the CSS/JS below **without removing** any of 4.2's own header/footer styles. Insert into the existing inline `<style>`/`<script>` regions of the matching section files.
- These styles reference custom classes/markup. **Verify each target exists** in the new theme's `header.liquid`/`footer.liquid`; if a class/element/snippet is missing (because 4.2's stock header/footer differs), **port that markup/snippet too** (tell me which ones you had to add).
- Gold accent used throughout is `#FBBC05`. Body/heading font is `Montserrat` (already the theme font).

## 1) `sections/header.liquid` — add to the section's inline `<style>` (keep 4.2's own logo-width vars & transparent-header styles):
```css
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background-color: #FBBC05;
  transition: width 0.25s ease;
  z-index: 10001;
}
.header .xb-product-quantity.show {
  background-color: #fbbc05;
  color: #000;
  font-size: 12px;
  font-weight: bold;
}
.header .xb-wishlist-header__icon svg {
  fill: white;
  width: 1.75rem;
  height: 1.75rem;
}
.header .product-name {
  font-size: 14px;
  min-height: 20px;
  -webkit-line-clamp: 1;
  text-align: left;
}
.header .product-card .price { font-size: 13px; }
.header .xb-wishlist-header__btn,
.header .xb-wishlist-header__btn:hover,
.wishtlist-wrapper { width: 1.75rem; height: 1.75rem; }
.header .xb-wishlist__header:hover svg { fill: #fbbc05; }
.header .xb-wishlist__header { height: auto; }
.header .xb-product-quantity.show {
  width: 1.125rem;
  height: 1.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 768px) {
  .hidden--mobile { display: none; }
}
```

## 2) `sections/header.liquid` — add this `<script>` (scroll-progress bar):
```html
<script>
  window.addEventListener('load', () => {
    const progressBar = document.querySelectorAll('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;
      progressBar.forEach(element => { element.style.width = scrollPercent + '%'; });
    });
  })
</script>
```
> The JS needs a `<div class="scroll-progress-bar"></div>` element in the header markup. If it isn't present in the new header, add it (just inside the header wrapper). Without the element the script is a harmless no-op.

## 3) `sections/footer.liquid` — add to its inline `<style>`:
```css
.brand-short-brief { max-width: 30rem; text-align: left; }
.privacy-navs a:hover,
.copyright-block a:hover { color: #fff; }
.growmore-link:hover { color: #FBBC05 !important; }
.vape-chil { display: inline-block; margin-top: -1px; }
.styled-links a:hover .vape-chil {
  filter: brightness(0) saturate(100%) invert(78%) sepia(6%) saturate(7478%) hue-rotate(358deg) brightness(100%) contrast(109%);
}
@media screen and (max-width: 480px) {
  .vape-chil { height: 13px; width: 13px; }
}
.heading-custom { font-style: italic; font-weight: 500; font-family: 'Montserrat'; }
{% if section.settings.background_image != blank %}
  .background-image-properties::before {
    position: absolute;
    content: '';
    top: 0; bottom: 0; left: 0; right: 0;
    background-color: rgba(0, 0, 0, .3);
  }
{% endif %}
```
> These target **custom footer markup**: `.brand-short-brief`, `.growmore-link` (a "Powered by GrowMore" style link), `.vape-chil` (a small icon tinted gold on hover via CSS `filter`), `.heading-custom`, `.privacy-navs`, `.copyright-block`, `.background-image-properties` (footer background overlay). If the new 4.2 footer lacks this markup, port those elements from my footer too and tell me which.

## 4) Custom snippets used by the footer/header — copy/verify these
- **`snippets/contact-info.liquid`** — a custom footer contact snippet (the footer `contact` block renders it). It carries its own `<style>`: `.list-contact_item a:hover svg { transform: scale(1.1); }`. Copy it wholesale if the new theme doesn't have my version.
- Verify these referenced snippets exist and match (port my versions if they're custom/changed): `footer-social-icons`, `mega-menu-products`, `mega-menu-horizontal`, `mega-menu-col-pills`, `mega-menu-categories`, `mega-menu-drawer`, plus icons `icon-whatsapp`, `icon-external-link`, `icon-phone`, `icon-email-address`, `icon-location`, and `external-url`.

## Dependencies / caveats
- The header CSS styles the **XB Wishlist** app UI (`.xb-wishlist-header__*`, `.xb-product-quantity`, `.wishtlist-wrapper`) — that app must be installed on the new store or those rules match nothing.
- `header.liquid` also contains two **JSON-LD** structured-data scripts (Organization + WebSite/SearchAction, built from theme settings). Essence 4.2 likely already ships equivalent SEO — check and don't duplicate.
- Best practice: since this CSS is coupled to custom markup, the safest port is to bring over my whole `header.liquid`/`footer.liquid` + the custom snippets as part of the full theme-code merge, then reconcile against 4.2. If you only patch CSS, confirm every targeted class actually exists in the new markup.

## Report back
- Which targeted classes/snippets already existed vs. which you had to port.
- Confirmation no 4.2 stock header/footer styles were removed.
- Any markup you added (e.g. the `.scroll-progress-bar` div) and where.
