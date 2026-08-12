# PROMPT — Replicate AirVape global theme settings onto the new store

> Paste everything below this line into a Claude Code session opened on the **new store's Essence 4.2 theme**.

---

You are working on a Shopify **Essence** theme by Alloy Themes, version **4.2**, on a new store. I need you to replicate the **global theme settings** from my existing store, which runs Essence **4.1.0**. Do this by editing **`config/settings_data.json`** — specifically the `current` object — plus the follow-up steps for images and apps.

## Ground rules (read first)
1. Only touch the `current` object in `config/settings_data.json`. Do **not** edit `presets`.
2. Before writing each key below, confirm the key **exists in this theme's `config/settings_schema.json`**. Essence 4.2 may have renamed, added, or removed setting IDs vs 4.1.0. For any key that does **not** exist in 4.2's schema, **skip it and list it back to me** so I can handle it manually — do not invent settings.
3. For each `select`/enum value, confirm the value is still a valid option in 4.2's schema. If an option value changed, list it back to me rather than guessing.
4. Keep valid JSON. Preserve the existing `sections`, `blocks`, and `content_for_index` structure already in the new theme — see the App embeds and Sections notes below; **do not** paste my store's app-block UUIDs.
5. After editing, run a JSON validity check on `config/settings_data.json` and report the result.

## 1) Set these exact values in `current`

### Appearance
| Key | Value |
|---|---|
| `block_corner_radius` | `12` |
| `button_corner_radius` | `64` |
| `input_corner_radius` | `10` |
| `dropdown_corner_radius` | `10` |
| `input_style` | `"outline"` |
| `icons_corner_style` | `"round"` |
| `icons_line_thickness` | `"thin"` |

### Colors
| Key | Value |
|---|---|
| `colors_background` | `"#FFFFFF"` |
| `colors_text` | `"#000000"` |
| `colors_headings` | `"#000000"` |
| `colors_primary_button_background` | `"#000000"` |
| `colors_primary_button_text` | `"#ffffff"` |
| `colors_secondary_button_background` | `"#fbbc05"` |
| `colors_secondary_button_text` | `"#000000"` |
| `colors_header_background` | `"#000000"` |
| `colors_header_text` | `"#ffffff"` |
| `colors_footer_background` | `"#000000"` |
| `colors_footer_text` | `"#ffffff"` |
| `colors_product_card_background` | `"#ffffff"` |
| `colors_product_card_text` | `"#000000"` |
| `colors_product_sale_price` | `"#000000"` |
| `colors_product_sale_badge` | `"#ea4335"` |
| `colors_product_sold_out_badge` | `"#000000"` |
| `colors_custom_badge` | `"#ea4335"` |
| `colors_product_rating_star` | `"#fbbc05"` |
| `colors_in_stock_text` | `"#34a853"` |
| `colors_low_stock_text` | `"#ea4335"` |
| `colors_free_shipping_bar` | `"#34a853"` |
| `colors_modal_foreground` | `"#000000"` |
| `colors_article_category_badge` | `"#000000"` |
| `colors_alerts_success` | `"#34a853"` |
| `colors_alerts_warning` | `"#fbbc05"` |
| `colors_alerts_danger` | `"#ea4335"` |

> Not set on my store (leave at the 4.2 default): `colors_modal_background`, and all **Colors (extra)** settings (`colors_active_filter_pill`, `colors_filter_button`, `colors_input_accent`, `colors_progress_bar`, `colors_range_slider`, `colors_selected_dropdown_item`, `colors_cart_badge`, `colors_text_selection`).

### Typography
| Key | Value |
|---|---|
| `type_heading_font` | `"montserrat_n4"` |
| `type_heading_letter_spacing` | `25` |
| `type_body_font` | `"montserrat_n4"` |
| `type_body_base_size` | `16` |
| `type_button_font` | `"heading"` |
| `type_label_font` | `"body_bold"` |
| `type_navigation_font` | `"heading"` |
| `type_product_card_font` | `"body_bold"` |
| `type_accordion_font` | `"heading"` |
| `type_heading_text_style` | `"normal"` |
| `type_button_text_style` | `"normal"` |
| `type_label_text_style` | `"uppercase"` |
| `type_navigation_text_style` | `"normal"` |

> `montserrat_n4` is a Shopify font-library handle and works on any store. (Note: my current store *also* self-hosts Montserrat via `@font-face` in `layout/theme.liquid` for performance — that's a code-level change handled separately in the theme-file migration, not a global setting.)

### Layout
| Key | Value |
|---|---|
| `page_width` | `1280` |
| `layout_space_between_sections` | `"section-spacing-small"` |
| `layout_space_between_blocks` | `"block-spacing-small"` |

### Product card
| Key | Value |
|---|---|
| `product_card_vendor` | `false` |
| `product_card_quick_add_to_cart` | `true` |
| `product_card_sold_out_badge` | `true` |
| `product_card_custom_badges` | `true` |
| `product_card_product_rating` | `false` |
| `product_card_size_preview` | `false` |
| `product_card_show_empty_rating` | `false` |
| `product_card_thumbnail_proportions` | `"square"` |
| `product_card_color_display` | `"image"` |

### Cart
| Key | Value |
|---|---|
| `cart_type` | `"drawer"` |
| `added_to_cart_notification` | `"drawer"` |
| `cart_free_shipping_bar_enabled` | `true` |
| `cart_free_shipping_bar_threshold` | `100` |

### Color swatches
| Key | Value |
|---|---|
| `color_swatches` | `"rosegold: #9b5e37\nGreen: #06402B"` (keep the literal `\n` newline between the two entries) |

### Social media
| Key | Value |
|---|---|
| `social_facebook_link` | `"https://www.facebook.com/AirVapeUSA/"` |
| `social_instagram_link` | `"https://www.instagram.com/airvape.usa/"` |
| `social_youtube_link` | `"https://www.youtube.com/@AirvapeusaOfficial"` |
| `social_tiktok_link` | `"https://www.tiktok.com/@airvapeusa_official?_t=8pDld4TgzrN&_r=1"` |
| `social_twitter_link` | `"https://x.com/airvapeusa"` |

## 2) Image settings — need re-upload, don't just paste the URL
These three settings point at files via `shopify://shop_images/<filename>`. Those references only resolve if a file **with the same name** exists in the new store's **Content → Files**. So: I will upload these exact images to the new store; you set the settings to the same reference (they'll resolve once the file exists), OR I'll set them via the theme editor's image picker.

| Key | Value on my store | Editor location |
|---|---|---|
| `popup_logo` | `"shopify://shop_images/AirVape_White_Logo.webp"` | Theme settings → Age Verification Popup → Logo |
| `favicon` | `"shopify://shop_images/Favicon_1.webp"` | Theme settings → Favicon |
| `whatsapp_connect_icon` | `"shopify://shop_images/pngwing.com_4.webp"` | Theme settings → Whatsapp → Whatsapp Icon |

> Age Verification Popup: `enable_popup` is **not** set on my store (defaults to **off**), and `popup_text` is left at default. Leave both at default unless I say otherwise.

## 3) App embeds — install the apps, DON'T copy my block IDs
My `settings_data.json` `current.blocks` contains app-embed blocks with store-specific UUIDs that will **not** work on the new store. Leave the new theme's `current.blocks` as-is. Instead, I will install these apps on the new store; the list below tells me which to install and which embed state to match:

| App | Embed | State on my store |
|---|---|---|
| Klaviyo Email Marketing & SMS | onsite embed | **Enabled** |
| Loox Reviews | loox-inject | **Enabled** |
| Hulk Form Builder | app embed | **Enabled** |
| Mighty Image Uploader | app embed | **Enabled** |
| One-Click Upsell | app-embed (`allowed_templates: "page, blog"`) | **Enabled** |
| One-Click Upsell | cart-drawer | **Disabled** |
| Rez Preorder / Notify Me | rez | **Enabled** |
| Appstle Loyalty | appstle-loyalty | **Enabled** |
| Microsoft Clarity | clarity_js | **Enabled** |
| Microsoft Clarity | brandAgents_js | **Disabled** |
| AccessPro Accessibility | accesspro-widget | **Disabled** |
| GSC Instagram Feed | embed | **Enabled** |
| XB Wishlist | xo-wishlist | **Enabled** |

## 4) Theme sections in settings
My `current.sections` has two global entries:
- `password-header` → `logo: "{{ shop.brand.logo }}"` (dynamic — fine to keep as-is; resolves per store)
- `fix-footer-mobile` → `{}` — this is a **custom theme section**. Ensure `sections/fix-footer-mobile.liquid` exists in the migrated theme code before relying on this entry.

## 5) After you're done, report:
- The JSON validity result for `config/settings_data.json`.
- Any keys or enum values from Section 1 that **don't exist / aren't valid** in this 4.2 theme's schema (so I can decide manually).
- Confirmation that you did **not** modify `current.blocks` (app UUIDs) or `presets`.
- A reminder list of the 3 images I still need to upload and the apps I still need to install.
