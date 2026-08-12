# PROMPT — Replicate AirVape Header & Footer groups onto the new store

> Paste everything below the line into a Claude Code session opened on the **new store's Essence 4.2 theme**.

---

You are working on a Shopify **Essence** theme (Alloy Themes) v**4.2** on a new store. Replicate the **Header group** and **Footer group** from my existing Essence **4.1.0** store. These live in **`sections/header-group.json`** and **`sections/footer-group.json`** (the global header/footer that render on every page).

## Ground rules (read first)
1. Work on `sections/header-group.json` and `sections/footer-group.json` in this new theme.
2. Essence 4.2 may have renamed/added/removed settings on the `header`, `announcement-bar`, `promotion-bar`, and `footer` sections. For every setting and block below, **confirm the key/type exists** in the matching section's `{% schema %}` (`sections/header.liquid`, `sections/announcement-bar.liquid`, `sections/footer.liquid`, etc.) in THIS theme. If a key/block type doesn't exist or an enum value is invalid, **skip it and list it back to me** — do not invent settings.
3. **Preserve every `"disabled": true` flag** exactly as shown.
4. **Do NOT copy the old store's `app-optimization` section** in the footer — see the note in the Footer section. Its script URLs are hardcoded to my old store `apollo440.myshopify.com`.
5. Keep valid JSON; leave the auto-generated header comment block intact. After editing, run a JSON validity check on both files and report results.
6. These files reference **menus, product/collection handles, images, and pages** that must exist on the new store — see the **Dependencies checklist** at the end. Where a referenced resource might not exist yet, leave the reference as-is and add it to a "to verify" list you report back.

---

## A) `sections/header-group.json`
Set the file to represent this structure (reconcile each key against the 4.2 schemas per rule 2). Three sections in `order`: `announcement-bar`, `header`, then the promotion-bar.

### Section `announcement-bar` — **disabled**
- `"disabled": true`
- Blocks (type `announcement`), in this order:
  - `announcement_Ymk49r` → `text`: `<p>Prices are at their lowest this month</p>`
  - `announcement_GL9UYp` → `text`: `<p>All AirVape prices will be revised on July 7th</p>`
- Settings: `text_size: "announcement-bar--text-sm"`, `transition: "slide-y"`, `autoplay: true`, `change_message_every: 5`, `background_color: "#c62828"`, `text_color: "#ffffff"`

### Section `header` — the main header (enabled)
- Blocks, in this order:
  - `mega_menu_products_dHFkzP` (type `mega_menu_products`): `menu_item: "Shop Devices"`, `type: "horizontal"`, `products`: `["enso","legacy-core","legacy-pro-2","airvape-x-royal-edition","airvape-x","airvape-xs-go","airvape-om-keychain-waxpen","breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus","breathelet-onefit-classic-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus"]`
  - `mega_menu_categories_V8Ft6k` (type `mega_menu_categories`) — **disabled**: `menu_item: "Shop Accessories"`, `type: "horizontal"`, `collections`: `["enso-accessories","legacy-accessories","airvape-x-accessories","xs-go-accessories","om-accessories","breathelet","chargers","wearables","grinders"]`
  - `mega_menu_col_pills_PWXeP7` (type `mega_menu_col_pills`): `menu_item: "Shop Accessories"`, `collections`: same 9 handles as above
- Settings:
  - `sticky_header_mode: "scroll-up"`
  - `logo: "shopify://shop_images/Header_LogoText.png"`
  - `logo_width: 184`, `logo_width_mobile: 132`
  - `menu: "header-menu"`, `menu_mobile: "header-menu-mobile"`
  - `desktop_layout: "logo-left-nav-center"`, `mobile_layout: "logo-center"`
  - `open_dropdowns_on: "hover"`
  - `text_color_header_transparent: "#ffffff"`
  - `logo_header_transparent: "shopify://shop_images/Header_LogoText_6fb28304-74f6-4912-9628-1b0f0a6b2443.png"`
  - `enable_country_selector: false`, `country_selector_show_country_flag: false`, `country_selector_show_country_name: false`, `country_selector_show_currency: false`
  - `enable_language_selector: false`
  - `enable_search: true`
  - `enable_h1_on_index: true`

### Section `9e2ab7e9-ef20-4927-a77f-7d8d1f2e7b7d` (type `promotion-bar`) — **disabled**
- `"disabled": true`
- Settings: `show_only_on_homepage: false`, `content: "<p>Winter Holiday Deals</p>"`, `url: "shopify://pages/winter-promotions"`, `text_size: "text-base md:text-lg"`, `section_height: "py-2"`, `background_color: "#0a0a0a"`, `text_color: "#ffffff"`, `heading_color: ""`

`order`: `["announcement-bar", "header", "9e2ab7e9-ef20-4927-a77f-7d8d1f2e7b7d"]`

---

## B) `sections/footer-group.json`

> **Skip the old store's `app-optimization` section entirely.** My old file has a disabled `app_optimization_Mg9HYK` section containing ~16 "app" script blocks (One Click Upsell 1–12, Verifypass, Route, Awin, Loox) whose URLs are **hardcoded to `apollo440.myshopify.com`** (the old store) and would be wrong here. It is disabled anyway. Leave whatever `app-optimization` the new theme ships with as-is (or omit it). I will reconfigure that via the app on the new store if needed.

So the footer group should contain just the **`footer`** section:

### Section `footer` (enabled)
- Blocks, in this order:
  - `689184a1-06d4-4242-ab02-4034a441ffa6` (type `text`): `heading: "Where innovation meets elegance"`, `add_url: true`, `image_url: "/"`, `content: "<p>AirVape creates sleek, high-performance vaporizers and accessories for smooth sessions, premium style, and everyday portability</p>"`, `image: "shopify://shop_images/Header_LogoText.png"`, `image_width: 240`
  - `26d3e25a-ebab-4ae2-9e89-6630440b8500` (type `links`): `show_heading: true`, `heading: "Shop"`, `menu: "shop"`, `heading_1: ""`, `menu_1: "partnership"`
  - `links_KYGzJX` (type `links`): `show_heading: true`, `heading: "Support"`, `menu: "support"`, `heading_1: ""`, `menu_1: ""`
  - `contact_MUEErb` (type `contact`): `heading: "Contact"`, `contact_link_text: "Get In Touch"`, `contact_url: "shopify://pages/contact"`, `open_new_contact: false`, `whatsapp_number: ""`, `whatsapp_url: "tel:+1 424 789 6016"`, `open_new_whatsapp: false`, `phone_number: ""`, `call_url: "tel:+1 424 789 6016"`, `open_new_call: false`, `email_address: "cs@airvapeusa.com"`, `email_url: "mailto:cs@airvapeusa.com"`, `open_new_email: false`, `location: "Apollo Design & Tech Inc. 16133 Ventura Blvd., Floor 7, Encino CA 91436"`, `address_url: "https://maps.app.goo.gl/t6hB2zv2AivNDs9i9"`, `open_new_address: true`
- Footer section settings:
  - `background_image: "shopify://shop_images/Footer_Background_Image.webp"`
  - `full_width: true`
  - `heading: "Where innovation meets elegance"`
  - `content: "<p>AirVape creates sleek, high-performance vaporizers and accessories for smooth sessions, premium style, and everyday portability</p>"`
  - `image: "shopify://shop_images/airvape_logo.png"`, `image_width: 240`
  - `show_social: true`, `show_payment: true`
  - `enable_country_selector: false`, `country_selector_show_country_flag: true`, `country_selector_show_country_name: false`, `country_selector_show_currency: true`
  - `enable_language_selector: false`
  - `enable_follow_on_shop: true`

`order`: `["footer"]` (plus the theme's own app-optimization if you keep it — but keep it disabled)

---

## C) Mobile bottom nav (`fix-footer-mobile`)
My footer experience also includes a **custom section** `sections/fix-footer-mobile.liquid` (a mobile bottom bar: Home / Products / Email us / Wishlist) that renders globally via `settings_data.json` → `current.sections`. That's part of the **theme-code migration** (a `.liquid` file), not this group JSON. Two things to fix in it when it's ported:
- Two icons are hardcoded to my old store's CDN (`cdn.shopify.com/s/files/1/0777/8339/files/home-icon.svg` and `products-grid-icon.svg`) — re-upload those to the new store and repoint, or they'll 404-load from the old store.
- It targets the **XB Wishlist** app markup (`.wishtlist-wrapper`, `.xb-wishlist-header__icon`) — that app must be installed on the new store for the Wishlist item to populate.

---

## Dependencies checklist — these must exist on the NEW store or the header/footer render empty/broken
Report which of these you can and cannot verify from the theme code, and flag the rest for me to create in Admin.

**Navigation menus (Online Store → Navigation), referenced by handle:**
- `header-menu`, `header-menu-mobile` (main + mobile nav)
- `shop`, `partnership`, `support` (footer link columns)

**Products** (used by `mega_menu_products` "Shop Devices") — handles must match:
`enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`, `breathelet-onefit-classic-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`

**Collections** (used by `mega_menu_categories` / `mega_menu_col_pills` "Shop Accessories") — handles must match:
`enso-accessories`, `legacy-accessories`, `airvape-x-accessories`, `xs-go-accessories`, `om-accessories`, `breathelet`, `chargers`, `wearables`, `grinders`

**Pages** (referenced by handle):
- `contact` (footer "Get In Touch")
- `winter-promotions` (promotion-bar — disabled, low priority)

**Images to upload to Content → Files (same filenames so `shopify://shop_images/...` resolves):**
- `Header_LogoText.png` (header logo + footer text-block image)
- `Header_LogoText_6fb28304-74f6-4912-9628-1b0f0a6b2443.png` (transparent-header logo)
- `Footer_Background_Image.webp` (footer background)
- `airvape_logo.png` (footer logo image)
- `home-icon.svg`, `products-grid-icon.svg` (mobile bottom-nav icons)

**Apps that the footer/mobile nav depend on:** XB Wishlist (mobile nav), Follow on Shop (footer, native), plus any One-Click-Upsell/Route/Awin/Loox/Verifypass optimization you want — but reconfigure those in the app, NOT by copying the old `app-optimization` URLs.

## After you're done, report:
- JSON validity for both files.
- Any settings/blocks/enum values not valid in this 4.2 theme's schemas.
- Confirmation that all `disabled` flags were preserved and the old `apollo440` `app-optimization` URLs were NOT copied.
- The consolidated "must create on the new store" list (menus, products, collections, pages, images, apps) drawn from the Dependencies checklist.
