# Migration Prompt — Customer Account Templates (`templates/customers/*.json`)

> Paste everything below (from the `---` line) into the Claude Code session on the **new Essence 4.2 store**.

---

Recreate my customer account templates from the old Essence ~4.1 theme: `account.json`, `login.json`, `register.json`, `order.json`, `addresses.json`, `reset_password.json`, `activate_account.json` (all under `templates/customers/`). These are JSONC — the `/* ... */` header comment block in each file must be kept verbatim.

Every template is a single-section template (`"main"` only, no blocks, empty `"settings": {}`). **Six of the seven are pure stock Essence** — verify only, do not change anything. **One (`account.json` → `main-account` section) carries a real customization**: an Appstle Loyalty & Rewards points-balance block appended to the section, plus a dead/disabled leftover block. That customization lives in the **section file** (`sections/main-account.liquid`), not in the template JSON itself — the template JSON is identical/stock across all seven.

## 1. Summary table

| Template | Section type | Stock or custom | What to do |
|---|---|---|---|
| `account.json` | `main-account` | **CUSTOM** (section-level) | Copy template JSON verbatim (it's stock). Reproduce the customization inside `sections/main-account.liquid` — see §2 below. Requires the **Appstle Loyalty & Rewards** app installed + its app embed enabled. |
| `login.json` | `main-login` | Stock | Verify only, no changes. |
| `register.json` | `main-register` | Stock | Verify only, no changes. |
| `order.json` | `main-order` | Stock | Verify only, no changes. |
| `addresses.json` | `main-addresses` | Stock | Verify only, no changes. |
| `reset_password.json` | `main-reset-password` | Stock | Verify only, no changes. |
| `activate_account.json` | `main-activate-account` | Stock | Verify only, no changes. |

## 2. Per-template details

### 2.1 `account.json` → `main-account` — CUSTOM

The old theme's `sections/main-account.liquid` is the stock Essence orders-table/orders-cards markup (`{% render 'account-header' %}`, paginated orders table + mobile card list, pagination) **plus two additions appended after the stock content**:

1. A **dead/disabled block** — a stock "Account details / default address" block wrapped in `{% if false %}...{% endif %}`, i.e. permanently disabled. This was Essence's own default-address summary block, turned off by the old store. **Do not port this** unless you want it re-enabled; if 4.2 stock still ships this block, leave it as 4.2 has it (enabled or not, per stock default) — this is not something the old store customized ON, it was customized OFF.

2. An **Appstle Loyalty & Rewards points-balance block**, appended at the very end of the section, outside/after the stock content:

```liquid
  <div class="mt-12">
      <div class="grid items-center gap-y-6 sm:gap-x-8 lg:gap-x-12
      grid-cols-[1fr_auto] md:grid-cols-[auto_1fr] mb-8 pb-4 md:pb-6 border-b">  
        <h2 class="h3" tabindex="-1"> Points</h2>    
      </div>
      <div class="orders-overview points-overview">
        <div class="appstle-loyalty-point-balance-block" data-appstle-loyalty="APPSTLE_LOYALTY_POINTS_BALANCE" id="appstle-loyalty-point-balance-block">
      </div>
  </div>
```

Notes on this block:
- The heading text `Points` is **hardcoded English**, not run through `| t` — reproduce it literally (or optionally wrap it in a translation key if you want it localized on the new store; the old store did not).
- `data-appstle-loyalty="APPSTLE_LOYALTY_POINTS_BALANCE"` is the Appstle Loyalty & Rewards app's own hook attribute — the app's embedded JS finds this element and injects the customer's points balance widget into it client-side. There is no theme-side CSS for `.points-overview` (it just reuses the existing `.orders-overview` grid class); Appstle injects its own styles.
- This only works if the **Appstle Loyalty & Rewards app is installed** on the new store AND its **app embed block is enabled** in the theme editor (Theme settings → App embeds). Confirm in `config/settings_data.json` on this NEW store whether an `shopify://apps/appstle-loyalty/blocks/appstle-loyalty/...` embed block already exists; if not, install the app and enable its embed toggle.
- Note this `<div class="appstle-loyalty-point-balance-block" ...>` has an unclosed opening `<div>` tag in the old source (the inner `<div ...>` is never closed before its parent `</div>`) — this is a pre-existing markup quirk in the OLD theme. When you reproduce this, fix the malformed nesting (close the inner div properly) rather than copying the bug forward, since 4.2's HTML/CSS structure may be stricter. Functionally the important part is the outer element carrying `data-appstle-loyalty="APPSTLE_LOYALTY_POINTS_BALANCE"` must exist somewhere in the DOM on the account page.

**Action**: In 4.2's `sections/main-account.liquid`, after the stock orders block, append a `Points` heading + a container div carrying `data-appstle-loyalty="APPSTLE_LOYALTY_POINTS_BALANCE"`, matching the structure above (with the div properly closed). Do not touch anything else in the stock section markup or schema.

### 2.2 `login.json` → `main-login` — stock

Standard Essence combined "recover password" + "login" section: two forms (`recover_customer_password`, `customer_login`) with anchor-based show/hide (`#recover` / `#login`), floating-label inputs, links to register and forgot-password. No custom CSS, no custom classes beyond stock utility classes. **Verify only, no changes.**

### 2.3 `register.json` → `main-register` — stock

Standard Essence `create_customer` form (first name, last name, email, password, floating labels, `form-errors` snippet). No customization. **Verify only, no changes.**

### 2.4 `order.json` → `main-order` — stock

Standard Essence single-order view: `account-header`, order status pills, desktop table + mobile card line items via `order-line-item` snippet, order summary (subtotal/discounts/shipping/tax/duties/total), billing/shipping address panels via `format_address`. No customization. **Verify only, no changes.**

### 2.5 `addresses.json` → `main-addresses` — stock

Standard Essence address book: "Add new" in a `modal-drawer` using the `address-form` snippet, paginated address cards grid with default-address badge, edit (modal-drawer) and delete (confirm modal + `_method: delete` form) actions. No customization. **Verify only, no changes.**

### 2.6 `reset_password.json` → `main-reset-password` — stock

Standard Essence `reset_customer_password` form (new password + confirmation, floating labels, `form-errors` snippet). No customization. **Verify only, no changes.**

### 2.7 `activate_account.json` → `main-activate-account` — stock

Standard Essence `activate_customer_password` form (new password + confirmation, floating labels, `form-errors` snippet, plus a `decline` cancel button). No customization. **Verify only, no changes.**

## 3. Dependencies

- **Appstle Loyalty & Rewards** app — must be installed on the new store, with its app embed block enabled in the theme editor, for the Points block on `account.json`/`main-account` to render anything. Without it, the `data-appstle-loyalty="..."` div will sit empty (harmless, but pointless — confirm with the user whether they want this feature on the new store before wiring it up).
- No custom snippets are required beyond stock Essence ones already used here: `account-header`, `address-form`, `order-line-item`, `form-errors`, `pagination`, `pagination-classic`, `section-bg-number-vars`, `icon-lock`, `icon-discount`. These should already exist in 4.2 stock — just confirm they resolve.
- No metafields or metaobjects are involved in any of these seven templates.

## 4. Full template JSON (verbatim, comments preserved)

### `templates/customers/account.json`

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
    "main": {
      "type": "main-account",
      "settings": {}
    }
  },
  "order": [
    "main"
  ]
}
```

### `templates/customers/login.json`

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
    "main": {
      "type": "main-login",
      "settings": {}
    }
  },
  "order": [
    "main"
  ]
}
```

### `templates/customers/register.json`

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
    "main": {
      "type": "main-register",
      "settings": {}
    }
  },
  "order": [
    "main"
  ]
}
```

### `templates/customers/order.json`

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
    "main": {
      "type": "main-order",
      "settings": {}
    }
  },
  "order": [
    "main"
  ]
}
```

### `templates/customers/addresses.json`

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
    "main": {
      "type": "main-addresses",
      "settings": {}
    }
  },
  "order": [
    "main"
  ]
}
```

### `templates/customers/reset_password.json`

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
    "main": {
      "type": "main-reset-password",
      "settings": {}
    }
  },
  "order": [
    "main"
  ]
}
```

### `templates/customers/activate_account.json`

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
    "main": {
      "type": "main-activate-account",
      "settings": {}
    }
  },
  "order": [
    "main"
  ]
}
```

## 5. Diff-against-4.2 instruction

For each of the seven templates:
1. Open the equivalent stock file in the 4.2 theme (`templates/customers/<name>.json`) and diff it against the JSON blocks in §4. If 4.2's stock JSON is already identical (it should be, since these carry no customization), leave it untouched.
2. Open the corresponding stock section file in 4.2 (`sections/main-account.liquid`, `sections/main-login.liquid`, `sections/main-register.liquid`, `sections/main-order.liquid`, `sections/main-addresses.liquid`, `sections/main-reset-password.liquid`, `sections/main-activate-account.liquid`) and diff it against the descriptions in §2.
3. For the six stock ones, if 4.2's stock markup differs meaningfully from what's described in §2.2–§2.7 (setting names, classes, snippet names renamed, etc.), that's expected theme-version drift — do NOT try to force it back to the old markup. Just confirm the page still renders/functions (forms submit, addresses CRUD, order details show, pagination works).
4. For `main-account`, apply ONLY the delta described in §2.1 (the Points block, optionally re-enabling or leaving disabled the dead default-address block) on top of whatever 4.2's current stock `main-account.liquid` looks like — do not overwrite the rest of 4.2's stock section with the old theme's markup.

## 6. Report back

- Confirm all seven `main-*` section types resolve as valid section types in 4.2.
- Confirm whether the Appstle Loyalty & Rewards app is installed/embedded on the new store; if not, ask whether to still add the markup (dormant) or skip it entirely.
- Confirm the Points block was added to `main-account.liquid` with properly closed HTML (not copying the old theme's unclosed `<div>` bug).
- List any 4.2 stock section whose markup/settings differ enough from §2 that the "verify only" templates needed no changes vs. needed a note.
