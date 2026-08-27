# Migration Prompt — Collection Template (`collection.json`) — FULL EXPORT

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.
> Prerequisite: the **product-card / featured-collection** customization prompt (the collection grid renders the customized `product-card`).
> This prompt contains the **complete `templates/collection.json` verbatim** + every setting, the custom CSS, the metafields, and dependencies — nothing skipped.

---

Recreate my **Collection** template (`templates/collection.json`) exactly. The section **types** are stock Essence (`image-with-text-overlay`, `main-collection-banner`, `main-collection-grid`), but the page carries: specific settings, **metafield-driven banners**, two **`custom_liquid`** sale blocks, two **custom CSS classes**, and — most importantly — **heavily customized grid snippets** (`collection-grid.liquid`, `facets.liquid`, `category-filter-values.liquid`, `breadcrumbs.liquid`) that render the **breadcrumb**, the **Devices/Accessories category navigation with product counts**, the **In-stock/Sold-out availability counts**, and the **price min/max range**. Those snippets depend on **navigation menus** (linklists). The product-card customization that the grid renders lives in a separate prompt.

## ⚠️ Rules
1. **Copy the JSON at the bottom verbatim** into `templates/collection.json` — preserve section order, every `"disabled": true` flag (there are several), all block settings, and the leading auto-generated comment block.
2. For any setting that doesn't exist in the 4.2 section schema, **skip it and list it back to me** — do not invent settings.
3. Re-upload images, create the collection **metafields**, and ensure the customized **product-card** + custom CSS classes are in place (below).
4. Keep valid JSON; run a validity check and report.

## 1. Sections in the template (all stock 4.2 — verify each exists, keep my settings)
| Order | Section key | Type | Enabled? | Purpose |
|---|---|---|---|---|
| 1 | `image_with_text_overlay_9AKAKX` | `image-with-text-overlay` | **disabled** | default placeholder banner ("Talk about your brand") — kept but off |
| 2 | `main-banner` | `main-collection-banner` | **disabled** | the stock collection title/description/image banner — off (the metafield banner below replaces it) |
| 3 | `image_with_text_overlay_XJWPRP` | `image-with-text-overlay` | **enabled** | **the live banner** — metafield-driven title/description + 2 sale `custom_liquid` blocks |
| 4 | `image_with_text_overlay_iybzTj` | `image-with-text-overlay` | **disabled** | alt banner (Charging_2.png) — off |
| 5 | `image_with_text_overlay_wxCXtb` | `image-with-text-overlay` | **disabled** | alt banner (Charging-2.png) — off |
| 6 | `main-product-grid` | `main-collection-grid` | **enabled** | the product grid + facets/filters/sort (renders the customized `product-card`) |

So the **visible** collection page = banner #3 (metafield-driven) + the product grid #6. Everything else is disabled but preserved.

## 2. The live banner (`image_with_text_overlay_XJWPRP`) — how it works
- `image: "{{ collection.image }}"` — uses the collection's own image (set per-collection in Admin).
- `image_mobile: "{{ collection.metafields.custom.mobile_banner.value }}"` — a **collection metafield** for the mobile banner image.
- Heading block: `"{{ collection.metafields.custom.title.value }}"` (h2 size, `h1` tag).
- Text block: `"{{ collection.metafields.custom.short_description | metafield_tag }}"`.
- Two `custom_liquid` blocks that only render on the `fathers-day-sale` collection:
  - `custom_liquid_7h8tQF`: `{% if collection.handle contains 'fathers-day-sale' %}<p … class="text-sm mb-2 sales-end-pe"> Sale ends June 21 at 11;59 PM.</p>{% endif %}`
  - `custom_liquid_EpVRGW`: `{% if collection.handle contains 'fathers-day-sale' %}<p … class="text-sm bundle-collection-badge"> Not into bundles? Use code DAD15 at checkout for 15% off any signature device.</p>{% endif %}`
  (both verbatim in the JSON below — the `.sales-end-pe` / `.bundle-collection-badge` classes are styled in §4.)

## 3. Product grid (`main-product-grid`) — every setting explained
```
products_per_row: 4
products_per_row_mobile: "products-collection-grid--mobile-two-col"   (2-up on mobile)
space_between_products: "block-spacing-normal"
include_collection_url: false
products_per_page: 24
pagination_type: "load-more"
filter_type: "vertical"
show_filters: true
show_filter_match_count: true
show_filter_values_with_no_matches: true
enable_color_swatches: true
show_selected_filter_type: true
show_sort_by: true
show_results_count: true
default_open_filters: 4
category_filters: "Parts &amp; Accessories,Vaporizers"
background_color: "rgba(0,0,0,0)"
text_color: "rgba(0,0,0,0)"
```
Note `category_filters` value is HTML-escaped (`&amp;`) — keep it exactly. If 4.2 renamed any of these keys, map them and report.

## 4. Custom CSS — add/verify in `assets/main.css` (these are the only custom bits; the grid CSS itself is stock)

**Custom classes used by the sale `custom_liquid` blocks (add verbatim):**
```css
.bundle-collection-badge{
  color: #e8443c;
  background-color: rgba(0, 0, 0, 0.1);
  display: inline-block;
}
.sales-end-pe{
  color: #FBBC05;
}
```

**Relevant STOCK grid CSS (already in Essence 4.2 — verify present, values should match; only patch if 4.2 differs):**
```css
.block-spacing-normal {
  --block-spacing-const: clamp(16px, calc(1rem + ((1vw - 3.6px) * 0.6452)), 24px);
  --block-spacing: var(--block-spacing-const);
}
.products-collection-grid {
  transition: opacity 150ms;
  --collection-grid-width: calc(var(--container-inner-width) - var(--collection-grid-sidebar-width-actual));
  /* … stock definition … */
}
@media (min-width: 576px) { .products-collection-grid { row-gap: 2.5rem; } }
@media not all and (min-width: 576px) { .products-collection-grid { row-gap: 2rem; } }
.products-collection-grid.product-card-container--diff-bg { row-gap: var(--collection-grid-column-gap); }
@media not all and (min-width: 576px) {
  .products-collection-grid--mobile-one-col { --block-spacing: 1.5rem; grid-template-columns: 1fr; }
  .products-collection-grid--mobile-two-col { --collection-grid-column-gap: 0.75rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .products-collection-grid--mobile-two-col.product-card-container--diff-bg { --collection-grid-column-gap: 0.5rem; margin: 0 calc(var(--container-padding) * -1 + 0.5rem); }
}
.product-card-container--diff-bg .product-card .media { border-bottom-right-radius: 0; border-bottom-left-radius: 0; }
.product-card-container--diff-bg .product-card__info { padding: 1rem; padding-top: 1.5rem; }
@media (min-width: 768px) { .product-card-container--diff-bg .product-card__info { padding: 1.5rem; } }
```
> `main-collection-grid.liquid` does **not** load a separate CSS asset — all grid styling is in the compiled `main.css`. Don't create a new stylesheet for it.

## 5. Collection metafields to create (Admin → Settings → Custom data → Collections)
The live banner reads these — without them the banner is empty:
| Namespace.key | Type | Used for |
|---|---|---|
| `custom.title` | single-line text | banner heading |
| `custom.short_description` | rich text (or multi-line) | banner description (`metafield_tag`) |
| `custom.mobile_banner` | file/image reference | mobile banner image |
Also set each collection's own **Image** (Admin → Collection → Image) since the banner uses `{{ collection.image }}`.

## 6. Product-card dependency (separate prompt)
The grid renders the customized **`snippets/product-card.liquid`** (Loox rating, `pdp-redirect` tag branch, custom "Add to cart" with `icon-product-cart-black`, XB wishlist button) + its CSS. Run the **product-card prompt** first, or the grid falls back to stock cards.

## 7. Grid customizations — breadcrumb, category navigation, availability counts, price range
These are **NOT** stock. The `main-collection-grid` section renders customized snippets. Port all of them verbatim (each carries its own inline `<style>`/`<script>` — copy those too), and verify the stock helpers they call exist in 4.2.

### 7.1 `snippets/collection-grid.liquid` (custom — breadcrumb + mobile category tabs + facets/sort/grid)
Renders `{% render 'breadcrumbs' %}`, the **mobile** Devices/Accessories tab bar (with counts + sub-category pills), then `{% render 'facets' %}` (desktop sidebar), `{% render 'collection-sort' %}`, `{% render 'collection-facets-active' %}`, results count, and the paginated grid via `{% render 'collection-grid-page' %}`. Copy verbatim:
```liquid
{% liquid
  assign products_per_page = products_per_page | default: section.settings.products_per_page
  assign filter_type = filter_type | default: section.settings.filter_type

  assign enable_sticky_sidebar = true

  case filter_type
    when 'horizontal'
      assign filter_type_class = 'horizontal-filters'
    when 'vertical'
      assign filter_type_class = 'vertical-filters'
    when 'drawer'
      assign filter_type_class = 'desktop-drawer'
  endcase
%}

  {% if section.settings.category_filters != blank %}
    <style>
      .category-fitlers-mobile:has(.current-category) [data-tab="accessories"]{
        color: rgb(var(--color-background));
        background: rgb(var(--color-foreground));
        border-radius: 8px;
      }
      .category-fitlers-mobile {
        display: flex;
        align-items: center;
        padding-bottom: 14px;
        position: relative;
        transition: all 0.3s ease;
      }
      .category-fitlers-mobile:has(.open) {
        padding-bottom: 3rem;
        transition: all 0.3s ease;
        margin-bottom: 1rem;
      }
      @media (min-width: 992px) {
        .category-fitlers-mobile {
          display: none
        }
      }
      .category-filter-tab {
        width: 100%;
        text-align: center;
        padding: 8px 0;
        cursor: pointer;
      }
      .category-filter-tab:first-of-type {
        border-left: 1px solid;
        order: 1;
      }
      .category-filter-tab.active{
        color: rgb(var(--color-background));
        background: rgb(var(--color-foreground));
        border-radius: 8px;
      }
      .category-fitlers-mobile:has(.active) .category-filter-tab:first-of-type {
        border: 0;
      }
      .mobile-category-facets {
        display: flex;
        white-space: nowrap;
        width: 100%;
        overflow-x: auto;
        margin: 1.2rem 0rem 0;
        gap: 8px;
        position: absolute;
        bottom: 0rem;
        background: #fff;
        scrollbar-width: 0;
      }
      .mobile-category-facets::-webkit-scrollbar {
        display: none;
      }
      ul.facets-layout.mobile-category-facets label.facets__label {
        border: 1.5px solid gray;
        border-radius: 40px;
        padding: 4px 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: max-content;
        font-size: 12px;
        cursor: pointer;
      }
      ul.facets-layout.mobile-category-facets label.facets__label.current-category {
          font-weight: 600;
          border-color: #fbbc05;
          border-width: 2px
      }
      ul.facets-layout.mobile-category-facets label.facets__label img {
        width: 100%;
        max-width: 24px;
        border-radius: 4px;
        object-fit: contain;
        max-height: 24px;
      }
      .mobile-category-facets.hidden {
        display: none
      }
    </style>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var filterMobileSubCategories = document.querySelectorAll('.mobile-category-facets');
        var filterMobileTabs = document.querySelectorAll('.category-filter-tab');

        filterMobileTabs.forEach(function(tab) {
          tab.addEventListener('click', function() {
            filterMobileTabs.forEach(function(other) {
              if (other !== tab) {
                other.classList.remove('active');
                other.style.color = '';
                other.style.background = '';
                other.style.borderRadius = '';
              }
            });
            tab.classList.add('active');
            var targetClass = tab.dataset.tab;
            var targetList = document.querySelector('.mobile-category-facets.' + targetClass);
            filterMobileSubCategories.forEach(function(list) {
              list.classList.add('hidden');
              list.classList.remove('open');
            });
            if (targetList) {
              targetList.classList.remove('hidden');
              targetList.classList.add('open');
            }
          });
        });
      });
    </script>
  <div class="category-fitlers-mobile lg:hidden">
    {% assign collection_navigations = section.settings.category_filters | split: ',' %}
      {% for collection_filter in collection_navigations %}
        {% assign collection_filter_nav = collection_filter | handle | replace: '-amp', '' %}
        {% assign col_title_handle = collection.title | handle %}

        {% assign get_match_col = collections[collection_filter_nav] %}
        {% for get_match_col in collections %}
          {% assign get_match_col_handle = get_match_col.title | handle %}
          {% if get_match_col_handle == collection_filter_nav %}
            {% assign matched_col_count = get_match_col.products_count %}
          {% endif %}
        {% endfor %}

        {% liquid
          assign total_collection_products = 0

          if linklists['parts-accessories'].links.size > 0
            for link in linklists['parts-accessories'].links
              if link.type == 'collection_link'
                unless link.object.handle == 'replacement-parts'
                  assign collection_count = link.object.all_products_count | default: 0
                  assign total_collection_products = total_collection_products | plus: collection_count
                endunless
              endif
            endfor
          endif

          assign has_active_collection = false
          if linklists[collection_filter_nav].links.size > 0
            for link in linklists[collection_filter_nav].links
              if link.handle == col_title_handle or collection.handle == 'replacement-parts'
                assign has_active_collection = true
              endif
            endfor
          endif

          assign tab_is_active = false
          if col_title_handle contains collection_filter_nav or has_active_collection
            assign tab_is_active = true
          endif
        %}

        <div {% if linklists[collection_filter_nav].links.size == 0 %}onclick="window.location.href='{{ routes.collections_url }}/airvape-2025'"{%endif%} class="category-filter-tab {% if tab_is_active %}active{% endif %}" data-tab="{{ linklists[collection_filter_nav].title | handle }}">
          {{ linklists[collection_filter_nav].title | replace: 'Vaporizers', 'Devices' }}
           {% if collection_filter_nav contains 'parts-accessories'  %}
                      ({{ total_collection_products }})
            {% else %}
            ({{ matched_col_count }})
          {% endif %}
        </div>
        {% if linklists[collection_filter_nav].links.size > 0 %}
        <ul class="facets-layout mobile-category-facets {% if has_active_collection %}open has_active_collection{% else %}hidden{% endif %} list-unstyled {{ linklists[collection_filter_nav].title | handle }}" role="list">

          {% for link in linklists[collection_filter_nav].links %}
            {%- if link.type == 'collection_link' -%}
              {% assign col_image = link.object.products.first.featured_image %}
              {% assign col_products_count = link.object.products_count %}
            {%- endif -%}
            <li class="list-menu__item facets__item">
              <label for="collection-filter-{{ forloop.index }}" class="facets__label {% if link.handle == 'all-accessories' and collection.handle == 'replacement-parts' %} current-category {% elsif link.handle == col_title_handle %}current-category{% endif %} facet-checkbox">
                <input
                  type="checkbox"
                  id="collection-filter-{{ forloop.index }}"
                  name="collection-filter"
                  value="{{ col.handle }}"
                  onclick="window.location.href='{{ link.url }}';"
                  {% if link.url contains collection.handle  %}
                    checked
                  {% endif %}
                  style="display:none;"
                >
                <img src="{{ col_image | image_url: width: 24 }}" loading="lazy"
                width="" height="" alt="{{ col.title }} image"/>
                <span class="facet-checkbox__text" aria-hidden="true">
                  <span class="facet-checkbox__text-label">{{ link.title }} ({{- col_products_count -}})</span>
                </span>
              </label>
            </li>
          {% endfor %}
        </ul>
        {% endif %}
      {% endfor %}
  </div>
  {% endif %}

<div class="collection-grid {{ filter_type_class }}">
  <div class="collection-grid__breadcrumb">
    {% render 'breadcrumbs' %}
  </div>

  {% if section.settings.show_filters %}
    <div class="collection-grid__facets">
      {% if filter_type != 'drawer' %}
        {% if filter_type == 'vertical' and enable_sticky_sidebar %}
          {% echo '<sticky-sidebar id="CollectionGrid-StickySidebar" class="max-lg:hidden" disable-below="992" bottom-offset="0" data-preserve-state>' %}
        {% endif %}

        <div class="max-lg:hidden self-start w-full" id="facets-sidebar">
          {% render 'facets', results: results, filter_type: filter_type %}
        </div>

        {% if filter_type == 'vertical' and enable_sticky_sidebar %}
          {% echo '</sticky-sidebar> ' %}
        {% endif %}
      {% endif %}

      <div class="{% if filter_type != "drawer" %}lg:hidden{% endif %}" id="facets-drawer-wrapper">
        {% render 'facets-drawer', results: results %}
      </div>
    </div>
    <script>
      ;(function () {
        var sidebar = document.getElementById('facets-sidebar');
        var drawer = document.getElementById('facets-drawer-wrapper');
        if (!sidebar && !drawer) return;
        function sync() {
          var lg = window.innerWidth >= 1024;
          if (sidebar) sidebar.setAttribute('aria-hidden', lg ? 'false' : 'true');
          if (drawer && sidebar) drawer.setAttribute('aria-hidden', lg ? 'true' : 'false');
        }
        sync();
        window.addEventListener('resize', sync, { passive: true });
      })();
    </script>
  {% endif %}

  {% if section.settings.show_sort_by %}
    <div class="collection-grid__sort">
      {% render 'collection-sort', results: results %}
    </div>
  {% endif %}

  <div class="collection-grid__facets-active">
    {% render 'collection-facets-active', results: results, results_url: results_url %}
  </div>

  {% if section.settings.show_results_count %}
    <div class="collection-grid__results-count">
      <div class="text-sm">
        {{ 'products.facets.results_count' | t: count: results_count }}
      </div>
    </div>
  {% endif %}

  <div class="collection-grid__products">
    {% liquid
      if search.results
        paginate search.results by products_per_page
          render 'collection-grid-page', current_results: search.results, paginate: paginate, results_url: results_url
        endpaginate
      elsif results.products
        paginate results.products by products_per_page
          render 'collection-grid-page', current_results: results.products, paginate: paginate, results_url: results_url
        endpaginate
      endif
    %}
  </div>
</div>
```

### 7.2 `snippets/facets.liquid` (custom — desktop Devices/Accessories groups + counts, then availability/price filters)
The custom `category-filters-wrapper` renders the desktop **Devices (n)** / **Accessories (n)** groups from the same linklists; the standard `{% for filter in results.filters %}` loop below renders **Availability (In stock / Sold out with counts)** via `filter-values` and **Price min/max** via `filter-price-range`. Copy verbatim:
```liquid
{% comment %}
  Renders the filtering and sorting for a collection or set of search results.
{% endcomment %}
<style>
  .collection-product-count{
    opacity: 0.5;
    font-size: var(--size-text-sm);
  }
  </style>
<facet-filters-form
  type="filters"
  {% if manual %}
    manual
  {% endif %}
>
  {% unless skip_category_nav %}
  {% if section.settings.category_filters != blank %}
    <style>
      @media (min-width: 992px){
        .category-filters-wrapper {
          display: grid;
        }
      }
      .category-navigation-single {
        order: -1;
      }
      .category-navigation-single a {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .category-navigation-single a svg.icon-chevron {
        width: 16px;
        display: block;
      }
    </style>
    <div class="category-filters-wrapper max-lg:hidden">
      {% assign collection_navigations = section.settings.category_filters | split: ',' %}
      {% for collection_filter in collection_navigations %}
        {% assign collection_filter_nav = collection_filter | handle | replace: '-amp', '' %}

        {% assign get_match_col = collections[collection_filter_nav] %}
        {% for get_match_col in collections %}
          {% assign get_match_col_handle = get_match_col.title | handle %}
          {% if get_match_col_handle == collection_filter_nav %}
            {% assign matched_col_count = get_match_col.products_count %}
          {% endif %}
        {% endfor %}

        {% liquid
          assign total_collection_products = 0

          if linklists['parts-accessories'].links.size > 0
            for link in linklists['parts-accessories'].links
              if link.type == 'collection_link'
                unless link.object.handle == 'replacement-parts'
                  assign collection_count = link.object.all_products_count | default: 0
                  assign total_collection_products = total_collection_products | plus: collection_count
                endunless
              endif
            endfor
          endif
        %}

        {% if linklists[collection_filter_nav].links.size > 0 %}
          <smooth-collapse class="border-b last:border-0"
            id="collection-filter-{{ scope }}-{{ filter.param_name }}"
            data-preserve-state
          >
            <details {% if filter_index <= section.settings.default_open_filters or has_active_values %} {% endif %} open>
              <summary class="flex items-center justify-between cursor-pointer py-4">
                <span class="font-accordion text-h6">
                  {{ linklists[collection_filter_nav].title }}  
                  <span class="collection-product-count" {{ matched_col_count | handle }}>
                  {% if collection_filter_nav contains 'parts-accessories'  %}
                      ({{ total_collection_products }})
                    {% else %}
                    ({{ matched_col_count }})
                     {% endif %}
                  </span>
                </span>

                <div class="collapse-chevron">
                  {% render 'icon-chevron' %}
                </div>
              </summary>
              <div>
                <div class="pt-2 pb-8">
                  {% render 'category-filter-values', filter: filter, scope: scope %}
                </div>
              </div>
            </details>
          </smooth-collapse>
        {% else %}
          <div class="category-navigation-single">
            <summary class="flex items-center justify-between cursor-pointer py-4">
              <a href="{{ routes.collections_url }}/airvape-2025" class="font-accordion text-h6">
                <span>{{ linklists[collection_filter_nav].title | replace: 'Vaporizers', 'Devices' }}<span class="collection-product-count"> ({{ matched_col_count }})</span></span>
                {% render 'icon-chevron' %} 
              </a>
            </summary>
          </div>
        {% endif %}  
      {% endfor %}
    </div>
  {% endif %}
  {% endunless %}

  <form id="FacetFiltersForm-{{ scope }}">
    <div
      class="
        filters-wrapper flex flex-wrap
        {% if filter_type == "vertical" %}
          flex-col
        {% elsif filter_type == "horizontal" %}
          gap-4
        {% endif %}
      "
    >
      {% unless results.terms == null %}
        <input type="hidden" name="q" value="{{ results.terms }}">
        <input type="hidden" name="type" value="{{ results.types | join: ',' }}">
        <input name="options[prefix]" type="hidden" value="last">
      {% endunless %}

      {% if results.current_vendor or results.current_type %}
        <input type="hidden" name="q" value="{{ results.current_vendor }}{{ results.current_type }}">
      {% endif %}

      {% for filter in results.filters %}
        {% liquid
          assign show_filter = true
          if section.settings.show_filter_values_with_no_matches == false and filter.type == 'boolean' or filter.type == 'list'
            assign show_filter = false
            for value in filter.values
              if value.active
               assign has_active_values = true
              endif
              if value.count != 0 or value.active
                assign show_filter = true
                break
              endif
            endfor
          endif

          if filter.type == 'price_range' and filter.min_value.value or filter.max_value.value
            assign has_active_values = true
          endif

          if show_filter == false
            continue
          endif

          assign filter_index = filter_index | plus: 1
        %}

        {% if filter_type == 'horizontal' %}
          <dropdown-element max-width="384" id="filter-{{ scope }}-{{ filter.param_name }}" data-preserve-state>
            <details>
              <summary class="button button-light button-filter gap-2">
                {{ filter.label | escape }}

                <div class="collapse-chevron w-3">
                  {% render 'icon-chevron' %}
                </div>
              </summary>
              <div class="dropdown-menu dropdown-filters styled-links">
                {% case filter.type %}
                  {% when 'boolean', 'list' %}
                    {% render 'filter-values', filter: filter, scope: scope %}
                  {% when 'price_range' %}
                    <div class="w-64">
                      {% render 'filter-price-range', filter: filter, scope: scope %}
                    </div>
                {% endcase %}
              </div>
            </details>
          </dropdown-element>
        {% elsif filter_type == 'vertical' %}
          <smooth-collapse
            class="border-b last:border-0"
            id="filter-{{ scope }}-{{ filter.param_name }}"
            data-preserve-state
          >
            <details
              {% if filter_index <= section.settings.default_open_filters or has_active_values %}
                open
              {% endif %}
            >
              <summary class="flex items-center justify-between cursor-pointer py-4">
                <span class="font-accordion text-h6">
                  {{ filter.label | escape }}
                </span>

                <div class="collapse-chevron">
                  {% render 'icon-chevron' %}
                </div>
              </summary>
              <div>
                <div class="pt-2 pb-8">
                  {% case filter.type %}
                    {% when 'boolean', 'list' %}
                      {% render 'filter-values', filter: filter, scope: scope %}
                    {% when 'price_range' %}
                      {% render 'filter-price-range', filter: filter, scope: scope %}
                  {% endcase %}
                </div>
              </div>
            </details>
          </smooth-collapse>
        {% endif %}
      {% endfor %}
    </div>
  </form>
</facet-filters-form>
```

### 7.3 `snippets/category-filter-values.liquid` (custom — the Accessories sub-collection checkboxes with counts)
Renders the `parts-accessories` linklist as collection-link checkboxes, each with `({{ link.object.products_count }})`. Copy verbatim:
```liquid
{% liquid
	assign checkbox_class = 'checkbox'
	assign list_class = 'list-unstyled flex flex-wrap gap-4 flex-col'
%}

<fieldset>
	<legend class="visually-hidden">{{ linklists['parts-accessories'].title }}</legend>
	<ul class="{{ list_class }}" role="list">
		{% for link in linklists['parts-accessories'].links %}
			<li class="{{ checkbox_class }} {% if value.count == 0 and value.active == false %}disabled{% endif %}">
				<input
					type="checkbox"
					name="collection-filter"
					value="{{ link.url }}"
					id="collection-filter-{{ forloop.index }}"
					onclick="window.location.href='{{ link.url }}';"
					{% if link.url contains collection.handle  %}
						checked
					{% endif %}
				>
				<label for="collection-filter-{{ forloop.index }}" type="{{ link.object.handle }}"> 
					{{ link.title | escape -}}
					{%- if link.type == 'collection_link' -%}
						<span class="filter-label-count">({{ link.object.products_count }})</span>
					{%- endif -%}
				</label>
			</li>
		{% endfor %}
	</ul>
</fieldset>
```

### 7.4 `snippets/breadcrumbs.liquid` (breadcrumb — Home › Collection). Copy verbatim:
```liquid
{% capture separator %}
<span aria-hidden="true" class="em:w-3 block" style="--icon-stroke-width:1.25">{% render 'icon-chevron' %}</span>
{% endcapture %}

{% unless template == 'index' or template == 'cart' or template == 'list-collections' %}
  <nav
    class="breadcrumb flex flex-wrap items-center gap-y-1 gap-x-2 text-xs md:text-sm styled-links"
    role="navigation"
    aria-label="{{ 'accessibility.breadcrumbs' | t }}"
  >
    <a href="{{ routes.root_url }}" title="Home">{{ 'general.breadcrumbs.home' | t }}</a>

    {% if template contains 'page' %}
      {{ separator }}
      <span>{{ page.title }}</span>
    {% elsif template contains 'product' %}
      {% if collection.url %}
        {{ separator }}
        {{ collection.title | link_to: collection.url }}
      {% endif %}
      {{ separator }}
      <span class="text-foreground/75">{{ product.title }}</span>
    {% elsif template contains 'collection' and collection.handle %}
      {{ separator }}
      {% if current_tags %}
        {% capture url %}/collections/{{ collection.handle }}{% endcapture %}
        {{ collection.title | link_to: url }}
        {{ separator }}
        <span>{{ current_tags | join: ' + ' }}</span>
      {% else %}
        <span>{{ collection.title }}</span>
      {% endif %}
    {% elsif template == 'blog' %}
      {{ separator }}
      {% if current_tags %}
        {{ blog.title | link_to: blog.url }}
        {{ separator }}
        <span>{{ current_tags | join: ' + ' }}</span>
      {% else %}
        <span>{{ blog.title }}</span>
      {% endif %}
    {% elsif template == 'article' %}
      {{ separator }}
      {{ blog.title | link_to: blog.url }}
      {{ separator }}
      <span>{{ article.title }}</span>
    {% else %}
      {{ separator }}
      <span>{{ page_title }}</span>
    {% endif %}
  </nav>
{% endunless %}
```

### 7.5 Availability counts + Price min/max
- **Availability (In stock / Sold out with counts):** rendered by the stock `snippets/filter-values.liquid` (called from `facets.liquid` for `boolean`/`list` filters). The `(7)` / `(1)` come from `filter.values[].count`.
- **Price min/max:** rendered by the stock `snippets/filter-price-range.liquid` (called for the `price_range` filter). The `$49.99` / `$420` are `filter.min_value` / `filter.max_value` from the collection's price bounds.
- **These are Shopify storefront filters** — enable them in **Admin → Settings → Search & Discovery → Filters** (Availability + Price, plus any product-taxonomy filters you want). Without those filters enabled, the sidebar shows only the category navigation.

### 7.6 Stock helper snippets these call (verify they exist in 4.2; port mine if they differ)
`breadcrumbs`, `facets`, `facets-drawer`, `collection-sort`, `collection-facets-active`, `collection-grid-page`, `filter-values`, `filter-price-range`, `category-filter-values`, `icon-chevron`, and the `sticky-sidebar` / `smooth-collapse` / `facet-filters-form` / `dropdown-element` web components.

## 8. Navigation menus (linklists) — REQUIRED for the category navigation
The Devices/Accessories navigation + counts are driven by **navigation menus**, not product tags. Create these in **Admin → Online Store → Navigation** with the exact handles:
| Menu handle | Title | Contents |
|---|---|---|
| `parts-accessories` | "Parts & Accessories" (renders as **Accessories**) | **Collection links** to every accessory collection (e.g. `all-accessories`, `enso-accessories`, `legacy-accessories`, `airvape-x-accessories`, `xs-go-accessories`, `om-accessories`, `chargers`, `wearables`, `grinders`). The code sums their product counts (excluding `replacement-parts`) for the "Accessories (n)" total. |
| `vaporizers` | "Vaporizers" (renders as **Devices** via `replace: 'Vaporizers','Devices'`) | If it has **collection links**, it renders as an expandable Devices group; if it's **empty**, the Devices tab becomes a single link to `/collections/airvape-2025`. Match my setup. |

The section setting `category_filters: "Parts &amp; Accessories,Vaporizers"` maps (via `| handle`) to those two menu handles. If you rename a menu, update `category_filters` to match.
Special-cased handles in the code: **`airvape-2025`** (the "all devices" target), **`replacement-parts`** (excluded from the accessories count; treated as active), **`all-accessories`** (marked current when on `replacement-parts`). Create/rename these collections to match, or adjust the snippet.

## 9. Other dependencies
- **Images → Content → Files** (grep the JSON for `shopify://shop_images`): `Charging_2.png`, `Charging_Mob_2.png`, `Charging-2.png`, `Charging_Mob_-2.png` (used by the disabled alt banners — only needed if you re-enable them). The live banner uses per-collection image + metafield, not a hardcoded file. The mobile category pills also pull each collection's first product image (`link.object.products.first.featured_image`).
- **Apps:** none required by this template (Loox stars come via the product-card).
- **`custom_liquid` sale blocks:** only render on a collection whose handle contains `fathers-day-sale`; harmless elsewhere. Keep verbatim.

## 10. Report back
- Confirm all 6 sections resolved as stock 4.2 (report any renamed/removed settings) and JSON is valid.
- Confirm the two custom classes (`.sales-end-pe`, `.bundle-collection-badge`) were added to `main.css`.
- Confirm the customized snippets were ported: `collection-grid.liquid`, `facets.liquid`, `category-filter-values.liquid`, `breadcrumbs.liquid` (each with its inline `<style>`/`<script>`), and that the stock helpers they call (§7.6) exist.
- Confirm the **breadcrumb** renders (Home › Collection) and the **Devices/Accessories** category navigation shows with product counts on both desktop (sidebar) and mobile (tab bar).
- Confirm the **`parts-accessories`** and **`vaporizers`** navigation menus exist with the right collection links, and the special collections (`airvape-2025`, `replacement-parts`, `all-accessories`) exist.
- Confirm **Availability (In stock / Sold out with counts)** and **Price (min/max)** filters appear — i.e. those storefront filters are enabled in Search & Discovery.
- Confirm the `custom.title` / `custom.short_description` / `custom.mobile_banner` metafields exist and the customized `product-card` is present.
- List any images that need re-uploading.

---

## FULL `templates/collection.json` — copy verbatim

```json
/*
 * ------------------------------------------------------------
 * IMPORTANT: The contents of this file are auto-generated.
 *
 * This file may be updated by the Shopify admin theme editor
 * or related systems. Please exercise caution as any changes
 * made to this file may be overwritten.
 * ------------------------------------------------------------
 */
{
  "sections": {
    "image_with_text_overlay_9AKAKX": {
      "type": "image-with-text-overlay",
      "blocks": {
        "subheading_NyFYqL": {
          "type": "subheading",
          "settings": {
            "text": "Subheading"
          }
        },
        "heading_FTcgdH": {
          "type": "heading",
          "settings": {
            "heading": "Talk about your brand",
            "heading_size": "h1",
            "heading_html_tag": "p"
          }
        },
        "text_TKzjmh": {
          "type": "text",
          "settings": {
            "text": "<p>Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.</p>"
          }
        },
        "button_FRYjPg": {
          "type": "button",
          "settings": {
            "button_text": "Button",
            "button_link": "",
            "button_style": "",
            "button_size": "text-sm md:text-base",
            "button_background_color": "",
            "button_text_color": ""
          }
        }
      },
      "block_order": [
        "subheading_NyFYqL",
        "heading_FTcgdH",
        "text_TKzjmh",
        "button_FRYjPg"
      ],
      "disabled": true,
      "name": "t:sections.image-with-text-overlay.presets__0.name",
      "settings": {
        "custom_class": "",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "content_alignment": "md:content-middle-center",
        "content_alignment_mobile": "content-middle-center",
        "link": "",
        "min_height": 500,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 35,
        "overlay_type": "solid"
      }
    },
    "main-banner": {
      "type": "main-collection-banner",
      "disabled": true,
      "settings": {
        "full_width": true,
        "enable_transparent_header": false,
        "show_collection_title": true,
        "show_collection_description": true,
        "show_collection_image": true,
        "use_original_media_size": false,
        "banner_spacing": 400,
        "heading_size": "h0",
        "text_alignment": "md:content-bottom-left",
        "text_alignment_mobile": "content-bottom-left",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "rgba(0,0,0,0)",
        "heading_color": "rgba(0,0,0,0)",
        "overlay_color": "#000000",
        "overlay_opacity": 45,
        "overlay_type": "gradient",
        "heading_html_tag": "h1"
      }
    },
    "image_with_text_overlay_XJWPRP": {
      "type": "image-with-text-overlay",
      "blocks": {
        "heading_fa7UM3": {
          "type": "heading",
          "settings": {
            "heading": "{{ collection.metafields.custom.title.value }}",
            "heading_size": "h2",
            "heading_html_tag": "h1"
          }
        },
        "text_HAendn": {
          "type": "text",
          "settings": {
            "text": "{{ collection.metafields.custom.short_description | metafield_tag }}"
          }
        },
        "custom_liquid_7h8tQF": {
          "type": "custom_liquid",
          "settings": {
            "custom_liquid": "{% if collection.handle contains 'fathers-day-sale' %}\n<p data-animation=\"block\"\ndata-animation-group=\"{{ section.id }}-collection-blocks\" class=\"text-sm mb-2 sales-end-pe\"> Sale ends June 21 at 11;59 PM.</p>\n{% endif %}"
          }
        },
        "custom_liquid_EpVRGW": {
          "type": "custom_liquid",
          "settings": {
            "custom_liquid": "{% if collection.handle contains 'fathers-day-sale' %}\n<p data-animation=\"block\"\ndata-animation-group=\"{{ section.id }}-collection-blocks\" class=\"text-sm bundle-collection-badge\"> Not into bundles? Use code DAD15 at checkout for 15% off any signature device.  </p>\n{% endif %}"
          }
        }
      },
      "block_order": [
        "heading_fa7UM3",
        "text_HAendn",
        "custom_liquid_7h8tQF",
        "custom_liquid_EpVRGW"
      ],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "image": "{{ collection.image }}",
        "image_mobile": "{{ collection.metafields.custom.mobile_banner.value }}",
        "content_alignment": "md:content-middle-left",
        "content_alignment_mobile": "content-middle-left",
        "link": "",
        "min_height": 300,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 0,
        "overlay_type": "solid"
      }
    },
    "image_with_text_overlay_iybzTj": {
      "type": "image-with-text-overlay",
      "blocks": {
        "heading_NkiMxz": {
          "type": "heading",
          "disabled": true,
          "settings": {
            "heading": "{{ collection.title }}",
            "heading_size": "h2",
            "heading_html_tag": "h1"
          }
        },
        "text_KcBCmD": {
          "type": "text",
          "disabled": true,
          "settings": {
            "text": "{{ collection.metafields.custom.short_description | metafield_tag }}"
          }
        }
      },
      "block_order": [
        "heading_NkiMxz",
        "text_KcBCmD"
      ],
      "disabled": true,
      "settings": {
        "custom_class": "",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "image": "shopify://shop_images/Charging_2.png",
        "image_mobile": "shopify://shop_images/Charging_Mob_2.png",
        "content_alignment": "md:content-middle-left",
        "content_alignment_mobile": "content-top-center",
        "link": "",
        "min_height": 300,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 0,
        "overlay_type": "gradient"
      }
    },
    "image_with_text_overlay_wxCXtb": {
      "type": "image-with-text-overlay",
      "blocks": {
        "heading_hXd3Kb": {
          "type": "heading",
          "disabled": true,
          "settings": {
            "heading": "{{ collection.title }}",
            "heading_size": "h2",
            "heading_html_tag": "h1"
          }
        },
        "text_dBEf8N": {
          "type": "text",
          "disabled": true,
          "settings": {
            "text": "{{ collection.metafields.custom.short_description | metafield_tag }}"
          }
        }
      },
      "block_order": [
        "heading_hXd3Kb",
        "text_dBEf8N"
      ],
      "disabled": true,
      "settings": {
        "custom_class": "",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "image": "shopify://shop_images/Charging-2.png",
        "image_mobile": "shopify://shop_images/Charging_Mob_-2.png",
        "content_alignment": "md:content-middle-left",
        "content_alignment_mobile": "content-top-center",
        "link": "",
        "min_height": 300,
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 0,
        "overlay_type": "solid"
      }
    },
    "main-product-grid": {
      "type": "main-collection-grid",
      "settings": {
        "products_per_row": 4,
        "products_per_row_mobile": "products-collection-grid--mobile-two-col",
        "space_between_products": "block-spacing-normal",
        "include_collection_url": false,
        "products_per_page": 24,
        "pagination_type": "load-more",
        "filter_type": "vertical",
        "show_filters": true,
        "show_filter_match_count": true,
        "show_filter_values_with_no_matches": true,
        "enable_color_swatches": true,
        "show_selected_filter_type": true,
        "show_sort_by": true,
        "show_results_count": true,
        "default_open_filters": 4,
        "category_filters": "Parts &amp; Accessories,Vaporizers",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "rgba(0,0,0,0)"
      }
    }
  },
  "order": [
    "image_with_text_overlay_9AKAKX",
    "main-banner",
    "image_with_text_overlay_XJWPRP",
    "image_with_text_overlay_iybzTj",
    "image_with_text_overlay_wxCXtb",
    "main-product-grid"
  ]
}
```
