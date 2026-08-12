# PROMPT — Contact page with a dedicated Hulk-form section (`page.contact.json` + `contact-hulk` section)

> Paste everything below the line into a Claude Code session on the new store's Essence 4.2 theme.

---

You're on a Shopify **Essence 4.2** theme. Recreate my **Contact page**. It uses a **Hulk Form Builder** form (NOT Shopify's native contact form), so instead of reusing the stock `contact-form` section (which carries native-form field blocks + button settings I don't use), **create a new, purpose-built section `contact-hulk`** that has only the content/column/disclaimer settings plus a single Hulk-form-ID setting. Then build the page template that uses it.

## 0) Verify these section types exist (port/create as noted)
- `main-page` — stock Essence (disabled on this page).
- `image-with-text-overlay` — stock Essence (hero).
- **`contact-hulk` — CREATE THIS NEW SECTION** (full file in step 1).
- `custom-liquid` — stock Essence (Google Maps iframe).
- `featured-collection` — stock Essence (product carousel).

## 1) Create `sections/contact-hulk.liquid` with exactly this content
> This is my custom contact layout (heading + 4 black contact-info columns + social + disclaimer) with the form rendered by a Hulk `pxFormGenerator` embed whose ID is a **setting** (not hardcoded). Reconcile the `{% render %}` snippets (`section-bg-number-vars`, `section-attrs`, `section-content`, `footer-social-icons`) against 4.2 — they're stock Essence snippets and should exist.

```liquid
{% render 'section-bg-number-vars' %}

<style>
  .contact-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .contact-column {
    background: #000;
    color: #fff;
    padding: 1.25rem;
    border-radius: .75rem;
    transition: all 0.2s ease;
  }
  .contact-column * { color: #fff; }
  .contact-column svg { color: #fff; width: 40px; }
  .contact-column:hover { scale: 1.01; transition: all 0.4s ease; }

  @media screen and (max-width: 480px) {
    .contact-column { padding: 1rem; }
    .contact-columns { grid-template-columns: 1fr; }
  }
</style>

<div {% render 'section-attrs' %}>
  <div
    class="
      grid gap-x-16 gap-y-12
      {% if section.settings.text_position == 'left' or section.settings.text_position == 'right' %}
        lg:grid-cols-2
      {% else %}
        text-center prose-align
      {% endif %}
    "
  >
    <div class="section-content-spacing">
      {% render 'section-content' %}

      <div class="contact-columns mt-4">
        {% for i in (1..4) %}
          {% capture icon %}column_icon_{{ i }}{% endcapture %}
          {% capture title %}column_title_{{ i }}{% endcapture %}
          {% capture subtext %}column_subtext_{{ i }}{% endcapture %}
          {% if section.settings[icon] != blank and section.settings[title] %}
            <div
              data-animation="paragraph"
              data-animation-group="{{ section.id }}"
              class="contact-column">
              <div class="col-top d-flex flex gap-2 sm:gap:4 items-center mb-2">
                {% if section.settings[icon] != blank %}
                  <div class="col-icon">{{ section.settings[icon] }}</div>
                {% endif %}
                {% if section.settings[title] != blank %}
                  <h3 class="h4 m-0">{{ section.settings[title] }}</h3>
                {% endif %}
              </div>
              {% if section.settings[subtext] != blank %}
                <div class="col-text">{{ section.settings[subtext] }}</div>
              {% endif %}
            </div>
          {% endif %}
        {% endfor %}
      </div>

      {% if section.settings.show_social %}
        <div class="contact-social-media mt-4">
          <div class="contact-social-media-heading">
            <h2 class="font-bold">{{ section.settings.social_heading | default: 'OUR SOCIAL MEDIA' }}</h2>
          </div>
          <div class="contactsocial-media-list">
            {% render 'footer-social-icons' %}
          </div>
        </div>
      {% endif %}

      {% if section.settings.disclaimer != blank %}
        <div class="mt-4 md:mt-8 contact-disclaimer"
             data-animation="paragraph"
             data-animation-group="{{ section.id }}">
          {{ section.settings.disclaimer }}
        </div>
      {% endif %}
    </div>

    <div
      class="
        contact-form-wrapper w-full text-left
        {% if section.settings.text_position == 'center' %} max-w-3xl mx-auto {% endif %}
        {% if section.settings.text_position == 'right' %} xl:col-start-1 xl:row-start-1 {% endif %}
      "
    >
      {% if section.settings.hulk_form_id != blank %}
        <div style="margin:0 auto;" class="pxFormGenerator" id="{{ section.settings.hulk_form_id }}"></div>
      {% endif %}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Contact · Hulk form",
  "tag": "section",
  "class": "section",
  "settings": [
    { "type": "checkbox", "id": "full_width", "label": "t:sections.all.full_width.label", "default": true },
    { "type": "text", "id": "subheading", "label": "t:sections.all.subheading.label" },
    { "type": "text", "id": "heading", "label": "t:sections.all.heading.label", "default": "Contact us" },
    { "type": "richtext", "id": "content", "label": "t:sections.all.content.label" },
    { "type": "richtext", "id": "disclaimer", "label": "Disclaimer" },
    {
      "type": "select", "id": "heading_size", "label": "t:sections.all.heading_size.label",
      "options": [
        { "value": "h0", "label": "t:sections.all.heading_size.options__0.label" },
        { "value": "h1", "label": "t:sections.all.heading_size.options__1.label" },
        { "value": "h2", "label": "t:sections.all.heading_size.options__2.label" },
        { "value": "h3", "label": "t:sections.all.heading_size.options__3.label" },
        { "value": "h4", "label": "t:sections.all.heading_size.options__4.label" },
        { "value": "h5", "label": "t:sections.all.heading_size.options__5.label" },
        { "value": "h6", "label": "t:sections.all.heading_size.options__6.label" }
      ],
      "default": "h2"
    },
    {
      "type": "select", "id": "text_position", "label": "Text position",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "right", "label": "Right" }
      ],
      "default": "center"
    },
    { "type": "header", "content": "Hulk form" },
    {
      "type": "text", "id": "hulk_form_id", "label": "Hulk form ID",
      "info": "The pxFormGenerator ID from the form's embed code in the Hulk Form Builder app (e.g. 412J8y-6QuI3v4OZ3ex_cw). Create the contact form in the app on THIS store first, then paste its ID here."
    },
    { "type": "checkbox", "id": "show_social", "label": "Show social media", "default": true },
    { "type": "text", "id": "social_heading", "label": "Social heading", "default": "OUR SOCIAL MEDIA" },
    { "type": "header", "content": "Contact Column 1" },
    { "id": "column_icon_1", "type": "liquid", "label": "Icon" },
    { "id": "column_title_1", "type": "text", "label": "Title" },
    { "id": "column_subtext_1", "type": "inline_richtext", "label": "Content" },
    { "type": "header", "content": "Contact Column 2" },
    { "id": "column_icon_2", "type": "liquid", "label": "Icon" },
    { "id": "column_title_2", "type": "text", "label": "Title" },
    { "id": "column_subtext_2", "type": "inline_richtext", "label": "Content" },
    { "type": "header", "content": "Contact Column 3" },
    { "id": "column_icon_3", "type": "liquid", "label": "Icon" },
    { "id": "column_title_3", "type": "text", "label": "Title" },
    { "id": "column_subtext_3", "type": "inline_richtext", "label": "Content" },
    { "type": "header", "content": "Contact Column 4" },
    { "id": "column_icon_4", "type": "liquid", "label": "Icon" },
    { "id": "column_title_4", "type": "text", "label": "Title" },
    { "id": "column_subtext_4", "type": "inline_richtext", "label": "Content" },
    { "type": "header", "content": "t:sections.all.headers.colors" },
    { "type": "color", "label": "t:sections.all.background_color.label", "id": "background_color" },
    { "type": "color", "label": "t:sections.all.text_color.label", "id": "text_color" },
    { "type": "color", "label": "t:sections.all.heading_color.label", "id": "heading_color" },
    { "type": "header", "content": "t:sections.all.headers.seo" },
    {
      "type": "select", "id": "heading_html_tag", "label": "t:sections.all.heading_html_tag.label",
      "options": [
        { "value": "h1", "label": "h1" }, { "value": "h2", "label": "h2" }, { "value": "h3", "label": "h3" },
        { "value": "h4", "label": "h4" }, { "value": "h5", "label": "h5" }, { "value": "h6", "label": "h6" },
        { "value": "p", "label": "p" }, { "value": "span", "label": "span" }, { "value": "div", "label": "div" }
      ],
      "default": "p",
      "info": "t:sections.all.heading_html_tag.info"
    }
  ],
  "presets": [ { "name": "Contact · Hulk form" } ]
}
{% endschema %}
```

## 2) Create `templates/page.contact.json`
Reconcile each section's settings against 4.2 schemas; keep `main` disabled. Set `hulk_form_id` to the NEW store's Hulk form ID.

```json
{
  "sections": {
    "main": {
      "type": "main-page",
      "disabled": true,
      "settings": {
        "full_width": true,
        "show_page_title": true,
        "custom_page_title": false,
        "custom_heading": "",
        "content_width": "normal",
        "content_text_size": "prose md:prose-lg",
        "heading_size": "h2",
        "heading_alignment": "text-center",
        "background_color": "",
        "text_color": "",
        "heading_color": ""
      }
    },
    "212a3c16-6c50-4d61-942b-fdadda48f9e7": {
      "type": "image-with-text-overlay",
      "blocks": {
        "template--19974638960932__212a3c16-6c50-4d61-942b-fdadda48f9e7-heading-1": {
          "type": "heading",
          "settings": { "heading": "Contact Us", "heading_size": "h2", "heading_html_tag": "h1" }
        }
      },
      "block_order": ["template--19974638960932__212a3c16-6c50-4d61-942b-fdadda48f9e7-heading-1"],
      "settings": {
        "custom_class": "",
        "full_width": true,
        "fit_image": true,
        "enable_transparent_header": false,
        "use_original_media_size": false,
        "image": "shopify://shop_images/Contact_Us-1.webp",
        "image_mobile": "shopify://shop_images/Contact_Us_Mob_-1.webp",
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
    "form": {
      "type": "contact-hulk",
      "settings": {
        "full_width": true,
        "hulk_form_id": "PASTE_NEW_STORE_HULK_FORM_ID_HERE",
        "subheading": "Got Any Questions?",
        "heading": "GET IN TOUCH",
        "content": "<p>Your feedback is important to us. Whatever your needs, please don't hestiate to reach out. Our customer support team will be happy to assist you!</p>",
        "disclaimer": "<p>The above-mentioned location is an office only; we do not store products or process transactions at this address.<br/><br/><strong>**Please contact our customer support team via email at cs@airvapeusa.com before shipping any returns or faulty items as the result in this could cause significant delays in receiving a refund or a replacement unit.**</strong></p><p><br/>Our Hours of Operation are Monday-Friday, 9am-5pm PST.</p>",
        "heading_size": "h2",
        "text_position": "left",
        "show_social": true,
        "social_heading": "OUR SOCIAL MEDIA",
        "column_icon_1": "<svg id=\"Icons\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 512 512\">\n  <defs>\n    <style>\n      .st0 {\n        fill: #fff;\n      }\n    </style>\n  </defs>\n  <path class=\"st0\" d=\"M391.26,159.13c-10.65-53.99-50.27-99.01-104.16-111.68-44.21-10.39-88.86,7.04-119.24,39.19-34.7,36.72-49.92,92.79-31.3,141.14,4.49,11.67,9.55,22.34,16.08,33.03l33.08,54.12,35.35,57.8,31.96,51.76c1.84,2.98,5.81,4.43,8.4,4.34,2.18-.07,6.02-1.73,7.46-4.06l24.72-39.98,30.8-50.24,39.63-64.42c7.09-11.53,13.12-22.7,18.63-35.04,10.76-24.11,13.73-49.92,8.6-75.95ZM267.49,238.77c-33.6,3.48-63.46-20.88-67.09-53.95-3.69-33.67,20.6-64.36,55.12-67.56,34.16-3.17,63.16,22.2,66.35,55.08,3.23,33.33-21.52,63.03-54.39,66.43Z\"/>\n  <path class=\"st0\" d=\"M284.08,406.99l-10.54,17.02c-2.87,4.64-6.75,8.23-12.53,8.6-4.67-.41-8.94-3.13-11.43-7.13l-11.52-18.51c-11.17,1.4-26.25,4.78-34.3,12.58-3.82,3.7-3.53,9.18.48,12.7,4.44,3.9,9.93,6.66,16.06,8.35,26.82,7.41,55.36,7.42,82.11-.18,6.13-1.74,21.73-8.42,18.33-17.03-4.19-10.61-26.74-15.42-36.65-16.39Z\"/>\n</svg>",
        "column_title_1": "Location",
        "column_subtext_1": "<a href=\"https://maps.app.goo.gl/t6hB2zv2AivNDs9i9\" target=\"_blank\" title=\"https://maps.app.goo.gl/t6hB2zv2AivNDs9i9\">Apollo Design & Tech Inc. 16133 Ventura Blvd., Floor 7, Encino CA 91436</a>",
        "column_icon_2": "",
        "column_title_2": "",
        "column_subtext_2": "",
        "column_icon_3": "<svg id=\"Icons\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 512 512\">\n  <defs>\n    <style>\n      .st0 {\n        fill: #fff;\n      }\n    </style>\n  </defs>\n  <path class=\"st0\" d=\"M281.99,285.86c-16.95,15.15-35.56,15.72-52.06.91L58.24,132.69c-2.83-2.54,2.21-7.81,5.73-7.81l384.16.06c1.76,0,4.99,1.92,5.29,3.21.37,1.61-.96,5.34-2.59,6.79l-168.83,150.92Z\"/>\n  <path class=\"st0\" d=\"M449.31,389.81c2.32,2.09,4.11,4.8,3.97,6.35s-3.98,4.17-5.73,4.17l-379.68.23c-4,0-10.99-3.05-10.12-6.87l134.31-121.11,35.03,29.99c17.03,14.58,41.91,13.36,58.48-1.1l33.44-29.17,130.31,117.51Z\"/>\n  <polygon class=\"st0\" points=\"463.9 382.68 330.15 262.38 464.02 143.05 463.9 382.68\"/>\n  <polygon class=\"st0\" points=\"181.28 262.74 48.07 382.17 47.98 143.54 181.28 262.74\"/>\n</svg>",
        "column_title_3": "Email",
        "column_subtext_3": "<a href=\"mailto:cs@airvapeusa.com\" target=\"_blank\" title=\"mailto:cs@airvapeusa.com\">cs@airvapeusa.com</a>",
        "column_icon_4": "",
        "column_title_4": "",
        "column_subtext_4": "",
        "background_color": "rgba(0,0,0,0)",
        "text_color": "",
        "heading_color": "",
        "heading_html_tag": "h2"
      }
    },
    "custom_liquid_GpUpMU": {
      "type": "custom-liquid",
      "name": "t:sections.custom-liquid.presets.name",
      "settings": {
        "full_width": true,
        "remove_horizontal_space": false,
        "remove_vertical_space": false,
        "custom_liquid": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.5885071879693!2d-118.4872226238193!3d34.15686831219781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29789954b704b%3A0xc2edfdc58021753!2s16133%20Ventura%20Blvd%2C%20Encino%2C%20CA%2091436%2C%20USA!5e0!3m2!1sen!2s!4v1773394161396!5m2!1sen!2s\" width=\"100%\" height=\"400\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        "background_color": "",
        "text_color": ""
      }
    },
    "featured_collection_UP6inp": {
      "type": "featured-collection",
      "settings": {
        "full_width": true,
        "carousel": true,
        "products_count": 8,
        "grid_columns": 4,
        "grid_columns_mobile": "2",
        "products": [
          "enso",
          "legacy-core",
          "legacy-pro-2",
          "airvape-x-royal-edition",
          "airvape-x",
          "airvape-xs-go",
          "airvape-om-keychain-waxpen",
          "breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus"
        ],
        "collection": "",
        "subheading": "",
        "heading": "OUR SIGNATURE MODELS",
        "heading_size": "h2",
        "text_alignment": "text-center",
        "link_text": "View all",
        "link_url": "",
        "background_color": "",
        "text_color": "",
        "heading_color": "",
        "heading_html_tag": "h2"
      }
    }
  },
  "order": ["main", "212a3c16-6c50-4d61-942b-fdadda48f9e7", "form", "custom_liquid_GpUpMU", "featured_collection_UP6inp"]
}
```

## 3) Dependencies to set up on the new store (report which are missing)
- **Page + template:** create a Shopify **Page** with handle **`contact`** and assign the **`page.contact`** template (my header/footer link to `shopify://pages/contact`).
- **Hulk form:** install **Hulk Form Builder** + enable its app-embed, **recreate the contact form inside the app on the new store**, copy the new form's `pxFormGenerator` **embed ID**, and set it as `hulk_form_id` in the template (replace `PASTE_NEW_STORE_HULK_FORM_ID_HERE`). The old ID `412J8y-6QuI3v4OZ3ex_cw` will not work.
- **Images (Content → Files, same filenames):** `Contact_Us-1.webp` (hero desktop), `Contact_Us_Mob_-1.webp` (hero mobile).
- **Products** (featured-collection) — handles must exist: `enso`, `legacy-core`, `legacy-pro-2`, `airvape-x-royal-edition`, `airvape-x`, `airvape-xs-go`, `airvape-om-keychain-waxpen`, `breathelet-adjustable-mindful-bracelet-with-gentle-vibration-for-refocus`.
- **Google Maps** iframe is self-contained (Encino, CA office) — update if the new store's address differs.
- The **Location** pin + **Email** envelope icons are inline SVGs stored in the template settings (`fill:#fff`) — they travel with the JSON; nothing to upload.

## 4) Report back
- Validity of `sections/contact-hulk.liquid` schema and `templates/page.contact.json`.
- Any snippet (`section-content`, `footer-social-icons`, etc.) or setting/enum not present in 4.2.
- The "must create" list: the `contact` page (`page.contact` template), the Hulk form (+ its embed ID), the 2 hero images, and any missing product handles.
