# Migration Prompt — Sticky Product Media Gallery (vertical thumbnails + lightbox)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisite: the PDP (`main-product`) prompt (this is the media column of that section).

---

Reproduce my **product media gallery** so it behaves identically: on desktop a **vertical thumbnail rail** beside a large main image, the whole media column **sticky** (stays pinned while the buy-box scrolls), with **lightbox** click-to-zoom; on mobile a **swipeable carousel** with a **thumbnail** strip indicator.

## ⚠️ Read this first — it's STOCK Essence, driven by settings
The sticky gallery is **not custom code** in my theme. It's built into Essence's `main-product` section + `product-media.liquid` + `main.css` + the `main.mjs` web components — all of which **already exist in 4.2**. So the way to get "the same experience" is to **match the `main-product` section settings** (§1). You do **not** need to write new CSS/JS. §3–§4 include the exact CSS/JS **for reference / parity-checking only** — apply a rule only if your 4.2 `main.css`/`main.mjs` genuinely differs from mine.

## 1. The settings that control it (this is the real lever) — set these on `main-product`
```
media_layout_desktop: "carousel_vertical"   ← vertical thumbnail rail + main stage (THE sticky-gallery layout)
media_zoom: "lightbox"                        ← click main image → full-screen zoom
media_mobile_indicator: "thumbnails"          ← mobile shows a horizontal thumbnail strip
desktop_media_width: 56                        ← media column = 56% of page width
media_size: "1"                                ← fixed media aspect (blank = adaptive-height)
media_fit_height: false                        ← true would cap media to viewport height
media_enable_video_autoplay: false
media_enable_video_looping: true
show_breadcrumbs: false
```
- `media_layout_desktop` options: `carousel_vertical` (mine), `carousel_horizontal`, `grid`, `grid_main`. Only the two `carousel_*` layouts get the sticky column + thumbnail rail; `grid` layouts stack all media.
- `media_mobile_indicator` options: `thumbnails` (mine), `dots`, `bar`.
- `media_zoom` options: `lightbox` (mine), `none`.
Match these and the sticky gallery works — the rest is the stock machinery below.

## 2. Render chain (stock — verify each exists in 4.2; port mine only if different)
`sections/main-product.liquid` → `{% render 'product-media' %}` → which renders:
- `snippets/product-media.liquid` — the gallery markup (layout logic, carousel, thumbnails, mobile indicator, lightbox wrapper). **Full source in §5.**
- `snippets/product-thumbnails.liquid` → `snippets/product-thumbnail.liquid` — the thumbnail rail items.
- `snippets/media.liquid` — each image/video/3D slide.
- `snippets/product-title-reviews.liquid` — mobile title+rating shown **above** the gallery (`hidden-desktop`).
- `snippets/wishtlist-button.liquid`, `snippets/spinner.liquid`, `snippets/icon-chevron.liquid` — wishlist heart, loader, arrows.
**Web components (stock Essence JS in `assets/main.mjs`) — these make it interactive; they already exist in 4.2:**
`media-carousel` (main scroll stage + lightbox trigger + video autoplay), `scroll-carousel` (thumbnail rail scroller + prev/next), `product-thumbnails` / `product-thumbnail` (click-to-activate), `media-lightbox` (full-screen zoom), `media-carousel-dots`, `media-carousel-bar` (mobile indicators). **Do not rewrite these.** If the gallery is inert on the new store, diff my `main.mjs` for these components and reconcile.

## 3. THE STICKY CODE (the part you asked about) — `assets/main.css`
The gallery is pinned by `position: sticky` on `.product-media` at ≥992px, inside a 2-column grid whose columns are `align-items: start` (so the short media column can stick while the tall buy-box scrolls):
```css
/* the sticky rule */
@media (min-width: 992px) {
  main.product-grid .product-media {
    margin-bottom: 3rem;
    padding-inline-end: 0px;
    position: sticky;
    top: 0;
  }
}

/* the 2-column PDP grid that lets it stick */
.product-grid {
  --product-grid-gap-x: 5rem;
  --product-grid-py: 3rem;
  display: block;
}
.product-grid-section {
  display: grid;
  align-items: start;
  grid-template-columns: minmax(auto, calc(var(--product-media-column-width) - var(--product-grid-gap-x) / 2)) minmax(360px, 1fr);
  grid-template-rows: auto 1fr;
  column-gap: var(--product-grid-gap-x);
}
@media (min-width: 992px) {
  .product-grid .product-info { grid-row: span 2; }   /* buy box spans both rows → it's the column that scrolls */
}
@media not all and (min-width: 992px) {
  .product-grid, .product-grid-section { display: block; }  /* below 992px: normal stacked layout, NOT sticky */
}
.product-media {
  --thumbnails-button-size: 2.5rem;
  --product-media-max-height: calc(var(--viewport-height) - var(--header-height) - 4rem);
}
```
- `--product-media-column-width` is set **inline** by `product-media.liquid` from `desktop_media_width` (56% here): `.product-grid { --product-media-column-width: 56%; }`.
- `top: 0` pins it flush to the top of the viewport; `--product-media-max-height` keeps the gallery within the viewport while stuck.
- Sticky is **desktop-only** (≥992px); below that the layout is a normal block and the media just sits above the buy box.

## 4. Gallery / thumbnails / carousel / lightbox CSS (stock — reference for parity)
```css
/* main stage */
.product-gallery-wrapper { grid-area: gallery; }
@media (min-width: 992px) { .product-gallery-wrapper { overflow: hidden; height: 100%; } }
.product-gallery {
  display: grid;
  grid: auto / auto-flow 100%;
  align-items: start;
  transition: max-height 200ms;
  column-gap: 2rem;
  border-radius: var(--block-corner-radius);
}
@media (min-width: 768px) { .product-gallery { column-gap: 4rem; } }
.product-gallery__slide {
  position: relative; display: flex; justify-content: center;
  scroll-snap-align: start; scroll-snap-stop: always;
}
.product-media-item {
  --ratio-percent: calc(1 / var(--ratio, 1) * 100%);
  width: 100%; position: relative; overflow: hidden;
  padding-top: var(--ratio-percent);
  border-radius: var(--block-corner-radius);
}
.product-media-item > .product-gallery-shade img { border-radius: var(--block-corner-radius); height: 100%; width: 100%; object-fit: cover; }
.product-media-item > :where(video, iframe) { position: absolute; inset: 0; width: 100%; height: 100%; }
.product-media--fit-height .product-media-item {
  --constrained-height: var(--product-media-max-height);
  --contained-width: calc(var(--constrained-height) * var(--ratio, 1));
  width: min(100%, calc(var(--contained-width)));
  padding-top: min(var(--constrained-height), var(--ratio-percent));
}
.product-gallery__loader { display:flex; align-items:center; justify-content:center; position:absolute; inset:0; background: rgb(var(--color-background)); pointer-events:none; opacity:0; transition: opacity 133ms; }
.js .product-media-item:not([data-loaded="true"]) .product-gallery__loader { opacity: 1; }
.product-gallery__slide:first-child .product-gallery__loader { display: none; }
@media (min-width: 992px) {
  media-carousel.scroll-area-x.\!scroll-auto.product-gallery { min-height: 100%; align-items: start; }
}

/* carousel grid areas — vertical vs horizontal thumbnails */
.product-media-carousel {
  --thumbnail-size: 5rem;
  display: grid;
  grid-template-areas: "gallery";
}
.product-media-carousel .product-gallery-mobile-indicator { grid-area: mobile-indicator; display: none; }
@media not all and (min-width: 992px) { .product-media-carousel { grid-template-areas: "gallery" "mobile-indicator"; } }
.product-media-carousel.thumbs-vertical {
  grid-template-areas: "thumbnails gallery";
  grid-template-columns: var(--thumbnail-size) 1fr;
  gap: 1.5rem; align-items: start;
}
@media (min-width: 992px) { .product-media-carousel.thumbs-vertical { --thumbnail-size: 4rem; } }
.product-media-carousel.thumbs-vertical .product-media-thumbnails-wrapper .button-prev { top: calc(var(--thumbnails-button-size) / -2); left: calc(50% - var(--thumbnails-button-size) / 2); }
.product-media-carousel.thumbs-vertical .product-media-thumbnails-wrapper .button-next { bottom: calc(var(--thumbnails-button-size) / -2); left: calc(50% - var(--thumbnails-button-size) / 2); }
.product-media-carousel.thumbs-vertical .product-media-thumbnails-wrapper .button-prev svg { transform: rotate(-90deg); }
.product-media-carousel.thumbs-vertical .product-media-thumbnails-wrapper .button-next svg { transform: rotate(90deg); }
.product-media-carousel.thumbs-vertical .product-media-thumbnails-wrapper scroll-carousel { padding-bottom: 6px; max-height: min(45rem, var(--product-media-max-height)); }
.product-media-carousel.thumbs-horizontal {
  grid-template-areas: "gallery" "thumbnails";
  grid-template-rows: auto var(--thumbnail-size);
  gap: 3rem;
}
@media not all and (min-width: 992px) {
  .product-media-carousel.thumbs-horizontal,
  .product-media-carousel.thumbs-vertical {
    gap: 0; grid-template-columns: auto; grid-template-rows: auto;
    grid-template-areas: "gallery" "mobile-indicator";
  }
  .product-media-carousel.thumbs-horizontal .product-gallery-mobile-indicator,
  .product-media-carousel.thumbs-vertical .product-gallery-mobile-indicator { display: grid; }
}

/* thumbnails */
.product-media-thumbnails { display: flex; flex-direction: column; gap: 1rem; }
@media not all and (min-width: 992px) { .product-media-thumbnails { --thumbnail-size: 4rem; gap: 0.5rem; } }
.product-media-thumbnails > * { flex-shrink: 0; }
.product-media-thumbnails .play-icon { position: absolute; inset: 0; pointer-events: none; }
.product-media-thumbnails .play-icon svg { width: 1.25rem; height: 1.25rem; filter: none; }
.product-media-thumbnails.product-media-thumbnails--horizontal { display: grid; grid: auto / auto-flow max-content; }
.product-media-thumbnails.product-media-thumbnails--horizontal .media { height: var(--thumbnail-size); }
.product-media-thumbnails.product-media-thumbnails--horizontal .media :where(img, svg, lqip-element) { width: auto; height: 100%; }
.product-thumbnail { position: relative; }
.product-thumbnail .media { border-radius: var(--block-xs-corner-radius); background-color: rgb(var(--color-background)); max-width: var(--thumbnail-size); }
.product-thumbnail img { pointer-events: none; }
/* active thumbnail indicator (mine uses 'underline' style) */
.product-media-thumbnails--active-underline .product-thumbnail.active::before { content: ""; display: block; position: absolute; /* underline bar */ }
.product-media-thumbnails-wrapper { grid-area: thumbnails; display: grid; position: relative; }
@media not all and (min-width: 992px) { .product-media-thumbnails-wrapper.thumbnails-wrapper--desktop { display: none; } }
.product-media-thumbnails-wrapper .button-prev,
.product-media-thumbnails-wrapper .button-next {
  position: absolute; display: none; align-items: center; justify-content: center;
  width: var(--thumbnails-button-size); height: var(--thumbnails-button-size);
  border-radius: 100px; border-width: 1.25px; border-color: rgb(var(--color-foreground) / 0.05);
  box-shadow: 0 0 8px rgb(0 0 0 / 8%); background: rgb(var(--white)); color: rgb(var(--black));
  z-index: 100; transition: transform 200ms;
}
.product-media-thumbnails-wrapper .button-prev.is-hidden,
.product-media-thumbnails-wrapper .button-next.is-hidden { transform: scale(0); pointer-events: none; }

/* lightbox / zoom */
.product-media--lightbox [data-media-type="image"] { cursor: pointer; }
.product-media:not(.product-media--lightbox) .button-zoom-in { display: none; }
.button-zoom-in { display: flex; align-items: center; justify-content: center; width: 2.75rem; /* bottom-right zoom button */ }
.product-media-item:hover .button-zoom-in { transform: scale(1); transition-delay: 0ms; }

/* mobile dots indicator (if you switch media_mobile_indicator to 'dots') */
.dots-indicator-filled .dots-indicator { background: rgb(var(--color-foreground) / 5%); padding: 0 0.125rem; border-radius: 100rem; }
.dots-indicator-filled .dots-indicator .dots-indicator__dot.active::before { background-color: rgb(var(--color-base-accent)); }
```

## 5. `snippets/product-media.liquid` (stock — full source for reference/port)
```liquid
{% liquid
  assign gallery_layout_desktop = section.settings.media_layout_desktop
  assign carousel_indicator_mobile = section.settings.media_mobile_indicator
  assign thumbnails_active_style = 'underline'
  assign carousel_class = ''

  assign featured_media = product.selected_or_first_available_variant.featured_media
  assign variant_images = product.images | where: 'attached_to_variant?', true | map: 'src'
  assign media_count = product.media.size
  if section.settings.hide_variants and media_count > 1
    assign media_count = media_count | minus: variant_images.size | plus: 1
  endif
  assign first_3d_model = product.media | where: 'media_type', 'model' | first

  if media_count > 1
    assign show_indicator = true
  endif

  case gallery_layout_desktop
    when 'carousel_horizontal'
      assign is_carousel = true
      assign scroll_area_class = 'scroll-area-x scroll-shadow-horizontal -mb-2'
      assign thumbnails_direction_desktop = 'horizontal'
      if show_indicator
        assign carousel_class = carousel_class | append: ' thumbs-horizontal '
      endif
    when 'carousel_vertical'
      assign is_carousel = true
      assign scroll_area_class = 'scroll-area-y scroll-shadow-vertical'
      assign thumbnails_direction_desktop = 'vertical'
      if show_indicator
        assign carousel_class = carousel_class | append: ' thumbs-vertical '
      endif
    when 'grid', 'grid_main'
      assign is_grid = true
      assign carousel_class = ' lg:hidden thumbs-horizontal '
    when 'grid_main'
      if media_count != 2
        assign media_grid_class = ' first:child:col-span-2 '
      endif
  endcase

  if section.settings.media_zoom == 'lightbox'
    assign lightbox = true
  else
    assign lightbox = false
  endif
%}

{% capture media_image_sizes -%}
(min-width: 992px) min({{ settings.page_width | times: section.settings.desktop_media_width | divided_by: 100.0 }}px, {{ section.settings.desktop_media_width }}vw), calc(100vw - 20px)
{%- endcapture %}

{% capture media_image_half_sizes -%}
(min-width: 992px) min({{ settings.page_width | times: section.settings.desktop_media_width | divided_by: 200.0 }}px, {{ section.settings.desktop_media_width | divided_by: 2.0 }}vw), calc(100vw - 20px)
{%- endcapture %}

{% liquid
  if gallery_layout_desktop == 'grid_main'
    assign grid_first_image_sizes = media_image_sizes
  elsif gallery_layout_desktop == 'grid'
    assign grid_first_image_sizes = media_image_half_sizes
  endif
%}

<style>
  .product-grid, #shopify-section-{{ section.id }} {
    --product-media-column-width: {{ section.settings.desktop_media_width }}%;
  }
</style>

{% if section.settings.show_breadcrumbs %}
  <div class="product-breadcrumbs col-[1/-1] container mt-4 mb-4 md:mb-6 relative">
    {% render 'breadcrumbs' %}
  </div>
{% endif %}

{% if product.media == empty or product == null %}
  {% assign placeholder_type = 'image' %}
  {% if product == null %}
    {% assign placeholder_type = 'product-1' %}
  {% endif %}
  <div class="product-media">
    {% render 'placeholder', type: placeholder_type, class: 'placeholder rounded-block' %}
  </div>
  {% continue %}
{% endif %}

<div
  class="
    product-media color
    {% if lightbox %} product-media--lightbox {% endif %}
    {% if section.settings.show_breadcrumbs %} !pt-0 {% endif %}
  "
  style="{%- render 'apply-color-var', var: '--color-background', color: section.settings.gallery_background_color -%}"
>

<div class="hidden-desktop">
    {% render 'product-title-reviews', product: product %}
</div>

  {% if is_grid %}
    {% capture grid_inner %}
      <media-grid class="product-media-grid grid grid-cols-2 gap-6 items-start max-lg:hidden {{ media_grid_class }}">
        {% liquid
          if featured_media
            render 'media', media: featured_media, preload: true, sizes: grid_first_image_sizes, loader: false
          endif
          for media in product.media
            if featured_media == blank
              if forloop.first
                assign sizes = grid_first_image_sizes
                assign is_lazy = false
                assign is_preload = true
              else
                assign sizes = media_image_half_sizes
                assign is_lazy = true
                assign is_preload = false
              endif
              render 'media', media: media, lazy: is_lazy, preload: is_preload, sizes: sizes, loader: false
            else
              unless media.id == featured_media.id
                render 'media', media: media, lazy: true, sizes: media_image_half_sizes, loader: false
              endunless
            endif
          endfor
        %}
      </media-grid>
    {% endcapture %}

    {% if lightbox %}
      <media-lightbox class="contents">
        {{ grid_inner }}
      </media-lightbox>
    {% else %}
      {{ grid_inner }}
    {% endif %}
  {% endif %}

  <div class="product-media-carousel {{ carousel_class }}">
    {% if show_indicator and is_carousel %}
      <div class="product-media-thumbnails-wrapper thumbnails-wrapper--desktop">
        <button class="button-prev is-hidden" data-carousel-prev aria-label="{{ 'accessibility.previous' | t }}">
          {% render 'icon-chevron' %}
        </button>

        <scroll-carousel
          {{ thumbnails_direction_desktop }}
          class="{{ scroll_area_class }} block"
          item-selector=".product-thumbnail"
        >
          <product-thumbnails
            class="
              product-media-thumbnails product-media-thumbnails--active-{{ thumbnails_active_style }}
              product-media-thumbnails--{{ thumbnails_direction_desktop }}
            "
          >
            {% render 'product-thumbnails', product: product, media: media, featured_media: featured_media %}
          </product-thumbnails>

          <div class="scroll-shadow-start"></div>
          <div class="scroll-shadow-end"></div>
        </scroll-carousel>

        <button class="button-next is-hidden" data-carousel-next aria-label="{{ 'accessibility.next' | t }}">
          {% render 'icon-chevron' %}
        </button>
      </div>
    {% endif %}

    <div class="relative product-gallery-wrapper overflow-hidden max-lg:-mx-co">
      {% render 'wishtlist-button', card_product: product %}
      <media-carousel
        class="
          scroll-area-x !scroll-auto product-gallery max-lg:px-co max-lg:scroll-pl-co
          {% if section.settings.media_fit_height %}
            product-media--fit-height
          {% endif %}
        "
        item-selector="[data-media-id]"
        lightbox="{{ lightbox }}"
        video-autoplay="{{ section.settings.media_enable_video_autoplay }}"
        {% if section.settings.media_size == blank %}
          adaptive-height
        {% endif %}
      >
        {% if featured_media %}
          <div class="product-gallery__slide">
            {% render 'media', media: featured_media, preload: true, fetchpriority: 'high', sizes: media_image_sizes %}
          </div>
        {% endif %}

        {% for media in product.media %}
          {% if featured_media == blank %}
            {% if forloop.first %}
              {% assign is_lazy = false %}
              {% assign is_preload = true %}
            {% else %}
              {% assign is_lazy = true %}
              {% assign is_preload = false %}
            {% endif %}
            <div class="product-gallery__slide">
              {% render 'media', media: media, lazy: is_lazy, preload: is_preload, sizes: media_image_sizes %}
            </div>
          {% else %}
            {% unless media.id == featured_media.id %}
              <div class="product-gallery__slide">
                {% render 'media', media: media, lazy: true, sizes: media_image_sizes %}
              </div>
            {% endunless %}
          {% endif %}
        {% endfor %}

        <div class="product-gallery__loader" data-media-carousel-loading-overlay>
          {% render 'spinner' %}
        </div>
      </media-carousel>

      {% if first_3d_model %}
        <div class="container lg:hidden">
          <button
            class="button button-light w-full mt-2"
            type="button"
            aria-label="{{ 'products.product.xr_button_label' | t }}"
            data-shopify-xr
            data-shopify-model3d-id="{{ first_3d_model.id }}"
            data-shopify-title="{{ product.title | escape }}"
            data-shopify-xr-hidden
          >
            <div class="icon-xs mr-3">
              {% render 'icon-3d-model' %}
            </div>
            {{ 'products.product.xr_button' | t }}
          </button>
        </div>
      {% endif %}
    </div>

    {% if show_indicator %}
      <div class="product-gallery-mobile-indicator">
        {% case carousel_indicator_mobile %}
          {% when 'bar' %}
            <media-carousel-bar class="block mt-2" media-count="{{ product.media.size }}"></media-carousel-bar>
          {% when 'dots' %}
            <media-carousel-dots class="dots-indicator-filled justify-self-center mt-2" item-count="{{ product.media.size }}"></media-carousel-dots>
          {% when 'thumbnails' %}
            <scroll-carousel class="scroll-area-x grid bleed pt-8 md:pt-12 pb-2 -my-2" item-selector=".product-thumbnail">
              <product-thumbnails
                class="
                  product-media-thumbnails product-media-thumbnails--active-{{ thumbnails_active_style }}
                  product-media-thumbnails--horizontal
                "
              >
                {% render 'product-thumbnails', product: product, media: media, featured_media: featured_media %}
              </product-thumbnails>
            </scroll-carousel>
        {% endcase %}
      </div>
    {% endif %}
  </div>

  {% if first_3d_model %}
    <link id="ModelViewerStyle" rel="stylesheet" href="https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css" media="print" onload="this.media='all'">
    <style>
      .shopify-model-viewer-ui { display: block; position: absolute; inset: 0; }
      .shopify-model-viewer-ui model-viewer { position: absolute; width: 100%; height: 100%; }
    </style>
    <script type="application/json" id="Product-JSON-{{ product.id }}">
      {{ product.media | where: 'media_type', 'model' | json }}
    </script>
  {% endif %}
</div>
```
`snippets/product-thumbnails.liquid` (renders each thumbnail via `product-thumbnail`):
```liquid
{% liquid
  assign index = 1
  if featured_media
    render 'product-thumbnail', media: featured_media, active: true, index: index
    assign index = index | plus: 1
  endif
  for media in product.media
    if featured_media == blank
      render 'product-thumbnail', media: media, active: forloop.first, index: index
      assign index = index | plus: 1
    else
      unless media.id == featured_media.id
        render 'product-thumbnail', media: media, index: index
        assign index = index | plus: 1
      endunless
    endif
  endfor
%}
```

## 6. Behavior summary
- **Desktop (≥992px):** vertical thumbnail rail (`thumbs-vertical`) on the left of a large main stage; clicking a thumbnail scrolls the `media-carousel` to that slide (active thumbnail gets the underline indicator); prev/next chevrons appear on the rail when it overflows. The whole `.product-media` column is **`position: sticky; top:0`** so it stays visible while the buy box scrolls. Hovering the image shows the bottom-right **zoom** button; clicking opens the **lightbox** full-screen.
- **Mobile (<992px):** the grid collapses to a normal stack (media above buy box, **not** sticky). The gallery is a horizontal swipe carousel; the `thumbnails` indicator renders a scrollable thumbnail strip below it. Mobile product title + rating render **above** the gallery (`product-title-reviews`, `hidden-desktop`).
- **Videos:** autoplay off, looping on (per settings). **3D models:** an AR button appears on mobile.

## 7. Report back
- Confirm the `main-product` media settings match §1 (`media_layout_desktop: carousel_vertical`, `media_zoom: lightbox`, `media_mobile_indicator: thumbnails`, `desktop_media_width: 56`).
- Confirm the media column is **sticky on desktop** (verify `main.css` has `main.product-grid .product-media { position: sticky; top: 0 }` at ≥992px and the `.product-grid-section` grid with `align-items: start` + `.product-info { grid-row: span 2 }`).
- Confirm the `media-carousel` / `scroll-carousel` / `product-thumbnails` / `media-lightbox` web components exist in 4.2's `main.mjs` (gallery is interactive) — reconcile only if inert.
- Confirm desktop vertical thumbnails + lightbox zoom work and mobile shows the swipe carousel + thumbnail strip.
