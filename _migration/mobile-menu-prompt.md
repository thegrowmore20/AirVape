# Migration Prompt — Mobile Menu (drawer + accordion, with counts & images)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisite: the **header-group** prompt (the header renders this and defines the `header-menu-mobile` menu + mega-menu blocks).
> This contains the **complete verbatim source** of every mobile-menu file, its accordion JS, the exact CSS, the menu structure, and image dependencies — nothing skipped.

---

Recreate my **mobile navigation menu** exactly. It's the slide-in drawer opened by the header hamburger on mobile/tablet. It's **customized** beyond stock Essence: the top level is a **height-animated accordion** (not the stock slide-push), each collection item shows a **product count**, the Accessories item shows a **summed** count, sub-items render **thumbnail images** (with a special `all-devices.webp`), and deeper levels use a **slide-in sub-page** with a back button. Mega-menu promo images can appear at the bottom of a section.

## 0. Files involved (port every one)
| File | Role |
|---|---|
| `snippets/mobile-menu.liquid` ⚑ | the drawer shell + top-level loop + **the accordion `<script>`** |
| `snippets/mobile-menu-inner.liquid` ⚑ | one **accordion** top-level item (counts, images, promo images) |
| `snippets/mobile-menu-page.liquid` ⚑ | the **slide-in sub-page** for deeper nesting (back button, header image, promo images) |
| `sections/header.liquid` | wires it up: `mobile_menu` var + hamburger button + `{% render 'mobile-menu' … %}` |
| `assets/main.css` | the mobile-menu CSS (exact rules in §4) |
| helper snippets (stock, verify): `mega-menu-image`, `icon-chevron`, `icon-times`, `icon-hamburger`, `country-selector-dropdown`, `language-selector-dropdown` |

The `<mobile-menu>` and `<mobile-menu-page>` custom elements (open/close + slide-push behavior) are stock Essence web components — verify they exist in 4.2's JS; if mine differ, port them. `<mobile-menu-inner>` is just a container driven by the inline accordion script below (no registered component needed).

## 1. How it works
- **Header wiring:** `assign mobile_menu = section.settings.menu_mobile | default: section.settings.menu` → uses the **`header-menu-mobile`** menu. The hamburger `<button is="menu-hamburger" class="hamburger">` opens the drawer. Rendered at the end of `header.liquid` (see §5).
- **Top level (`mobile-menu.liquid`):** loops `links` (the menu's top links). A link **with children** → renders `mobile-menu-inner` (accordion). A link **without children** → a flat `side-menu-item` (with count for collection links).
- **Accordion (`mobile-menu-inner.liquid` + the `<script>`):** clicking the item animates its `.mobile-menu-content` height open/closed and **closes all other open accordions**. The chevron rotates. Sub-links render inline (with thumbnail + count). A sub-link that itself has children opens a **slide-in `mobile-menu-page`**.
- **Counts:**
  - Collection links show `({{ link.object.products_count }})`.
  - The **Accessories** accordion (`link.handle == 'accessories'`) shows a **summed** count of its child collections' products, **excluding `replacement-parts`**.
- **Images on sub-links:** `all-devices` handle → `all-devices.webp` (Content → Files); other collection links → the collection's **first product's featured image** (50px); product links → the product's featured image (32px). Rendered at 32px, `object-fit: contain`.
- **Mega-menu promo images:** if a header `mega_menu` block whose `menu_item` matches the link title has `show_promo_images_on_mobile` + `image1`/`image2`, they render as a horizontal carousel at the bottom of that section.
- **Footer:** country/language selectors + account link pinned to the bottom (only if enabled / multiple countries/langs).

## 2. Source — copy each file verbatim

### `snippets/mobile-menu.liquid`
```liquid
{% liquid
  assign position = 'left'
  assign modal_class = 'modal-drawer--bottom modal-mobile-menu--bottom'

  if localization.available_countries.size <= 1
    assign country_selector = false
  endif

  if localization.available_languages.size <= 1
    assign language_selector = false
  endif
%}

<mobile-menu
  append-to-body
  class="modal modal-drawer modal-mobile-menu {{ modal_class }}"
  position="{{ position }}"
  md:position="left"
  data-mobile-menu
>
  <div class="mobile-menu mobile-menu-content flex flex-col relative" slot="content" tabindex="-1">
    <div class="flex px-8 pt-8 pb-4 md:pb-6 shrink-0" data-menu-anim-in>
      <button data-button-close aria-label="{{ 'accessibility.close_modal' | t }}" class="icon-sm -ml-0.5">
        {% render 'icon-times' %}
      </button>
    </div>

    <div class="mobile-menu-inner flex flex-col grow overflow-y-auto">
      {% for link in links %}
        {% if link.links != blank %}
          <div data-menu-anim-in>
            {% render 'mobile-menu-inner', link: link, level: 1 %}
          </div>
        {% else %}
          <a href="{{ link.url }}" class="side-menu-item" data-menu-anim-in>
            {{ link.title }}
            {% if link.type == 'collection_link' and link.object != blank %}
                      ({{ link.object.products_count }})
                    {% endif %}
          </a>
        {% endif %}
      {% endfor %}

      {% if country_selector or language_selector or shop.customer_accounts_enabled %}
        <div class="grow"></div>
        {% comment %} <hr class="mt-4 mx-8"> {% endcomment %}
        <div class="menu-drawer-footer fixed left-0 right-0 bottom-0 border-t pt-4 px-8 pb-6 md:pb-8 flex flex-wrap gap-6 md:gap-8 mt-6 md:mt-8 max-md:text-sm" data-menu-anim-in>
          {% if country_selector %}
            {% render 'country-selector-dropdown',
              flag: section.settings.country_selector_show_country_flag,
              name: section.settings.country_selector_show_country_name,
              currency: section.settings.country_selector_show_currency,
              text_size_class: 'text-sm md:text-base'
            %}
          {% endif %}

          {% if language_selector %}
            {% render 'language-selector-dropdown', text_size_class: 'text-sm md:text-base' %}
          {% endif %}

          {% if shop.customer_accounts_enabled %}
            <a
              href="{{ routes.account_url }}"
              class="font-bold"
            >
              {{ 'sections.header.account' | t }}
            </a>
          {% endif %}
        </div>
      {% endif %}
    </div>
  </div>
</mobile-menu>


<script>
  document.querySelectorAll("mobile-menu-inner").forEach((menu) => {
    const button = menu.querySelector(".side-menu-accordion");
    const content = menu.querySelector(".mobile-menu-content");

    // Initial state
    content.style.height = "0px";
    content.style.overflow = "hidden";

    button.addEventListener("click", () => {
      const isOpen = menu.classList.contains("active");

      // 👉 CLOSE ALL OTHER MENUS
      document.querySelectorAll("mobile-menu-inner.active").forEach((openMenu) => {
        if (openMenu !== menu) {
          const openContent = openMenu.querySelector(".mobile-menu-content");

          openContent.style.height = openContent.scrollHeight + "px";
          requestAnimationFrame(() => {
            openContent.style.height = "0px";
          });

          openMenu.classList.remove("active");
        }
      });

      if (isOpen) {
        // 👉 CLOSE CURRENT
        content.style.height = content.scrollHeight + "px";
        requestAnimationFrame(() => {
          content.style.height = "0px";
        });

        menu.classList.remove("active");
      } else {
        // 👉 OPEN CURRENT
        content.style.height = content.scrollHeight + "px";
        menu.classList.add("active");

        // After animation → set auto
        content.addEventListener(
          "transitionend",
          function handler() {
            content.style.height = "auto";
            content.removeEventListener("transitionend", handler);
          }
        );
      }
    });
  });
</script>
```

### `snippets/mobile-menu-inner.liquid`
```liquid
{% assign child_level = level | plus: 1 %}

<mobile-menu-inner>
  <button class="w-full side-menu-item side-menu-accordion {% if level > 1 %} side-menu-item--sub {% endif %}">
    {{ link.title }}

{% liquid
  assign total_product_count = 0

  if link.handle == 'accessories' and link.links.size > 0
    for sub_link in link.links
      if sub_link.type == 'collection_link' and sub_link.object != blank
        unless sub_link.object.handle == 'replacement-parts'
          assign total_product_count = total_product_count | plus: sub_link.object.products_count
        endunless
      endif
    endfor
  endif
%}


    {% if link.type == 'collection_link' and link.object != blank %}
      <span class="collection-product-count" data-sub-object="{{ link.title }}">        
      {% if link.handle == 'accessories' %}
         ({{ total_product_count }})
      {%  else %}
           ({{ link.object.products_count }})
      {% endif %}
      </span>
    {% endif %}
    
    <div class="collapse-chevron">
      {% render 'icon-chevron' %}
    </div>
  </button>
  
  <div tabindex="-1" class="mobile-menu-content h-full">
  
  {% for sub in link.links %}
    {% if sub.links != empty %}
      <div data-menu-anim-in>
        {% render 'mobile-menu-page', link: sub, parent_link: link, level: child_level %}
      </div>
    {% else %}
      <a data-instant data-menu-anim-in href="{{ sub.url }}" link-type="{{ sub.type }}-{{ sub.object }}" class="side-menu-item side-menu-item--sub">
        {% if sub.type == 'collection_link' and sub.object != blank %}
          {% if sub.handle == 'all-devices' %}
            <img src="{{ 'all-devices.webp' | file_url }}"
            loading="lazy" alt="{{ sub.title }} image" width="32" height=""/>
          {% else %}    
          <img src="{{ sub.object.products.first.featured_image | image_url: width: 50 }}"
            loading="lazy" alt="{{ sub.title }} image" width="32" height=""/>
          {% endif %}  
          {% elsif sub.type == 'product_link' and sub.object != blank %}
            <img src="{{ sub.object.featured_image | image_url: width: 32 }}"
            loading="lazy" alt="{{ sub.title }} image" width="32" height=""/>
        {% endif %}
        {{ sub.title }}
        {% if sub.type == 'collection_link' and sub.object != blank %}
         <span class="collection-product-count" data-sub-object="{{ sub.object }}">({{ sub.object.products_count }})</span>
        {% endif %}
      </a>
    {% endif %}
  {% endfor %}
  
  {% liquid
    assign mega_menu_block = false
    for block in section.blocks
    assign block_menu_item = block.settings.menu_item | downcase
    assign link_title = link.title | downcase
    if block.type == 'mega_menu' and block_menu_item == link_title
    assign mega_menu_block = block
    endif
    endfor
  %}
  
  {% if mega_menu_block
    and mega_menu_block.settings.show_promo_images_on_mobile
    and mega_menu_block.settings.image1
    or mega_menu_block.settings.image2
  %}
  <div class="mobile-menu-promo-images grid-carousel scroll-area-x">
    {% if mega_menu_block.settings.image1 %}
      <div data-menu-anim-in>
        {% render 'mega-menu-image',
          image: mega_menu_block.settings.image1,
          url: mega_menu_block.settings.image1_url,
          heading: mega_menu_block.settings.image1_heading,
          width: 512
        %}
      </div>
    {% endif %}
    
    {% if mega_menu_block.settings.image2 %}
      <div data-menu-anim-in>
        {% render 'mega-menu-image',
          image: mega_menu_block.settings.image2,
          url: mega_menu_block.settings.image2_url,
          heading: mega_menu_block.settings.image2_heading,
          width: 512
        %}
      </div>
    {% endif %}
  </div>
{% endif %}
</div>
</mobile-menu-inner>
```

### `snippets/mobile-menu-page.liquid`
```liquid
{% assign child_level = level | plus: 1 %}

<mobile-menu-page>
  <button class="w-full side-menu-item {% if level > 1 %} side-menu-item--sub {% endif %}" slot="activator">
    {{ link.title }}
    
    {% if link.type == 'collection_link' and link.object != blank %}
      ({{ link.object.products_count }})
    {% endif %}
    
    <div class="collapse-chevron">
      {% render 'icon-chevron' %}
    </div>
  </button>
  
  <div slot="content" tabindex="-1" class="mobile-menu-content h-full">
    <div class="px-8 pt-10 pb-6">
      <button
        class="back-button label text-sm md:text-base tracking-widest flex items-center gap-3 text-foreground/75 mb-8 md:mb-12"
        data-menu-anim-in
      >
        <div class="w-3 md:w-4 icon-xs-stroke rotate-180">
          {% render 'icon-chevron' %}
        </div>
        
        {% if parent_link == null %}
          {{ 'sections.header.menu' | t }}
        {% else %}
          {{ parent_link.title }}
        {% endif %}
      </button>
      
      <a href="{{ link.url }}" class="h4 inline-block" data-menu-anim-in>
        {% if link.type == 'collection_link' and link.object != blank %}
          <img src="{{ link.object.featured_image | image_url: width: 32 }}"
            loading="lazy" alt="{{ link.title }} image" width="" height=""/>
        {% endif %}
        {{ link.title }}
        {% if link.type == 'collection_link' and link.object != blank %}
          ({{ link.object.products_count }})
        {% endif %}
    </a>
  </div>
  
  {% for sub in link.links %}
    {% if sub.links != empty %}
      <div data-menu-anim-in>
        {% render 'mobile-menu-page', link: sub, parent_link: link, level: child_level %}
      </div>
    {% else %}
      <a data-instant data-menu-anim-in href="{{ sub.url }}" class="side-menu-item side-menu-item--sub">
        {{ sub.title }}
        {% if sub.type == 'collection_link' and sub.object != blank %}
          ({{ sub.object.products_count }})
        {% endif %}
      </a>
    {% endif %}
  {% endfor %}
  
  {% liquid
    assign mega_menu_block = false
    for block in section.blocks
    assign block_menu_item = block.settings.menu_item | downcase
    assign link_title = link.title | downcase
    if block.type == 'mega_menu' and block_menu_item == link_title
    assign mega_menu_block = block
    endif
    endfor
  %}
  
  {% if mega_menu_block
    and mega_menu_block.settings.show_promo_images_on_mobile
    and mega_menu_block.settings.image1
    or mega_menu_block.settings.image2
  %}
  <div class="mobile-menu-promo-images grid-carousel scroll-area-x">
    {% if mega_menu_block.settings.image1 %}
      <div data-menu-anim-in>
        {% render 'mega-menu-image',
          image: mega_menu_block.settings.image1,
          url: mega_menu_block.settings.image1_url,
          heading: mega_menu_block.settings.image1_heading,
          width: 512
        %}
      </div>
    {% endif %}
    
    {% if mega_menu_block.settings.image2 %}
      <div data-menu-anim-in>
        {% render 'mega-menu-image',
          image: mega_menu_block.settings.image2,
          url: mega_menu_block.settings.image2_url,
          heading: mega_menu_block.settings.image2_heading,
          width: 512
        %}
      </div>
    {% endif %}
  </div>
{% endif %}
</div>
</mobile-menu-page>
```

## 3. Header wiring (`sections/header.liquid`)
Ensure these three pieces exist (merge into the 4.2 header — keep its stock code):
```liquid
{% comment %} near the top, in the {% liquid %} setup {% endcomment %}
assign mobile_menu = section.settings.menu_mobile | default: section.settings.menu
```
```liquid
{% comment %} the hamburger trigger inside .header__nav {% endcomment %}
<button is="menu-hamburger" class="hamburger" aria-label="{{ 'accessibility.open_menu' | t }}">
  <div class="icon-sm md:icon-md">
    {% render 'icon-hamburger' %}
  </div>
</button>
```
```liquid
{% comment %} at the very end of the section, after </sticky-header> {% endcomment %}
{% render 'mobile-menu',
  links: mobile_menu.links,
  country_selector: section.settings.enable_country_selector,
  language_selector: section.settings.enable_language_selector
%}
```
The header settings `menu_mobile` (= `header-menu-mobile`), `enable_country_selector`, `enable_language_selector` come from the header-group prompt.

## 4. CSS — add/verify in `assets/main.css` (exact values, 1:1)
Most of these are stock Essence, but the **accordion** rules (`mobile-menu-inner …`), the sub-item image/count rules, and the `.side-menu-item` sizing are the customized bits. Diff against 4.2 and patch to match:
```css
.side-menu-item,
.dropdown-list-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  text-decoration: none;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.dropdown-menu-item .collapse-chevron,
.side-menu-item .collapse-chevron,
.dropdown-list-item .collapse-chevron {
  margin-left: 1rem;
}
.dropdown-menu-item,
.side-menu-item {
  font-family: var(--navigation-font-family);
  font-weight: var(--navigation-font-weight);
  text-transform: var(--navigation-text-transform);
  font-style: var(--navigation-font-style);
}
.dropdown-menu-item:hover,
.side-menu-item:hover {
  background: rgb(var(--color-modal-foreground) / 2.5%);
}
.dropdown-menu-item.active,
.side-menu-item.active {
  background: var(--color-modal-active);
}

/* ---- Accordion (custom) ---- */
mobile-menu-inner .mobile-menu-content {
  overflow: hidden;
  height: 0;
  transition: height 0.35s ease;
}
button.w-full.side-menu-item.side-menu-accordion span.collection-product-count {
  font-size: var(--size-text-sm);
  opacity: 0.5;
  margin-left: 0.3rem;
  font-weight: normal;
}
mobile-menu-inner.active .side-menu-accordion .collapse-chevron svg {
  transform: rotate(270deg);
  transition: transform 0.3s ease;
}
mobile-menu-inner .side-menu-item--sub {
  gap: 0;
  padding: 0.8rem 2rem;
  font-size: var(--size-text-md);
}
mobile-menu-inner .side-menu-item--sub span.collection-product-count {
  margin-left: 0.3rem;
  font-size: var(--size-text-sm);
  opacity: 0.5;
  margin-top: 2px;
}
.side-menu-item--sub img {
  max-width: 32px;
  object-fit: contain;
  margin-right: 8px;
}

/* ---- Top-level item sizing (custom) ---- */
.side-menu-item {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  font-size: var(--size-text-lg);
  font-family: var(--navigation-font-family);
  font-weight: var(--navigation-font-weight);
  text-transform: var(--navigation-text-transform);
  font-style: var(--navigation-font-style);
}
button.w-full.side-menu-item.side-menu-accordion {
  font-weight: 600;
}
.side-menu-item .collapse-chevron {
  margin-left: auto;
}
.side-menu-item .collapse-chevron svg {
  transition: none;
  transform: none;
}
.side-menu-item.side-menu-accordion .collapse-chevron svg {
  transform: rotate(90deg);
}

/* ---- Drawer shell (stock — verify) ---- */
.mobile-menu {
  --mobile-menu-header-height: 4rem;
}
.modal-mobile-menu--bottom::part(panel) {
  min-width: 28rem;
}
@media not all and (min-width: 768px) {
  .modal-mobile-menu--bottom::part(panel) {
    min-width: 0;
    width: 100%;
    max-width: none;
    flex-grow: 1;
  }
}
.modal-mobile-menu--bottom::part(panel) {
  overflow: hidden;
}
.modal-mobile-menu--bottom::part(panel-wrapper) {
  align-items: stretch;
  justify-content: flex-start;
}
.modal-mobile-menu--bottom .mobile-menu {
  height: 100%;
}
@media not all and (min-width: 768px) {
  .modal-mobile-menu--bottom .mobile-menu {
    height: max(610px, 90vh);
    max-height: 90vh;
    max-height: 90svh;
  }
  .menu-drawer-footer {
    max-width: calc(100% - 50px)
  }
}
.modal-mobile-menu--left::part(panel) {
  overflow: hidden;
  border-radius: 0;
  width: 85vw;
  max-width: 400px;
}
.modal-mobile-menu--left .mobile-menu {
  height: 100%;
}
.mobile-menu-inner.anim-in {
  scrollbar-width: none;
}
.mobile-menu-inner.anim-in::-webkit-scrollbar {
  display: none;
}
.mobile-menu-promo-images {
  --grid-columns: 1.33;
  --grid-gap-min: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
@media (min-width: 768px) {
  .mobile-menu-promo-images {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
```

## 5. Navigation menu (linklist) — REQUIRED
Create **`header-menu-mobile`** in **Admin → Online Store → Navigation** (the header uses `menu_mobile: "header-menu-mobile"`, falling back to the desktop `menu` if absent). Structure to reproduce:
- Top-level items; any item with children becomes an **accordion**.
- An **"Accessories"** item with **handle `accessories`** containing **collection links** to your accessory collections. Its badge sums those collections' product counts, **excluding the `replacement-parts` collection** (so that collection can be in the menu without inflating the count).
- Collection-link children render a thumbnail + `(count)`. A child whose **handle is `all-devices`** uses the uploaded `all-devices.webp` image instead of a product image.
- Deep nesting (a child that itself has children) becomes a **slide-in sub-page** with a back button.

> The item **handles** matter: the code special-cases `accessories` (summed count) and `all-devices` (custom image), and excludes `replacement-parts`. Match these handles or adjust the snippets.

## 6. Images / dependencies
- **`all-devices.webp`** → upload to **Content → Files** (used for the "All Devices" menu item icon). Without it that thumbnail 404s.
- **Collection thumbnails** are automatic: each collection link shows its **first product's featured image** (so those collections need at least one product with an image). Product links show the product's featured image.
- **Mega-menu promo images:** `image1`/`image2` (+ `image1_url`/`image2_url`, `image1_heading`/`image2_heading`, `show_promo_images_on_mobile`) come from the header's **`mega_menu`** blocks — configured in the header-group prompt. They only show if that block's `menu_item` matches the menu link title (case-insensitive).
- **Helper snippets (stock — verify in 4.2, port mine if different):** `mega-menu-image`, `icon-chevron`, `icon-times`, `icon-hamburger`, `country-selector-dropdown`, `language-selector-dropdown`.
- **Web components (stock Essence JS):** `<mobile-menu>` (drawer open/close), `<mobile-menu-page>` (slide-push), and `menu-hamburger`. Confirm they exist in 4.2's compiled JS; if mine differ, port them. `<mobile-menu-inner>` needs no component — the inline accordion `<script>` in `mobile-menu.liquid` drives it.

## 7. Report back
- Confirm all three snippets ported (with the accordion `<script>`), the header wiring is in place, and the CSS (esp. the `mobile-menu-inner …` accordion rules) is present.
- Confirm the drawer opens from the hamburger, top-level items **accordion open/close** (one at a time, height-animated, chevron rotates), and sub-pages slide in with a back button.
- Confirm collection counts show, the **Accessories** item shows the **summed** count (excluding `replacement-parts`), and thumbnails render (including `all-devices.webp`).
- Confirm the **`header-menu-mobile`** menu exists with the `accessories` / `all-devices` handles, and list any collections/images that must be created.
