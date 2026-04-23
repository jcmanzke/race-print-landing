# RacePrint — Agent Instructions

This is the authoritative reference for AI agents working on this project. It describes what the site is, how it works, and how every UI and UX decision should be made. **Before making any significant change to logic, layout, copy, or design, read this document.** After making such a change, update the relevant section here so the document always reflects the current state of the site.

This is not a changelog. Delete outdated information when you replace it with new information.

---

## 1. Purpose of the Site

RacePrint is a direct-to-consumer e-commerce landing page for a personalized marathon art print business. Visitors land on the homepage, browse four product styles, click through to a dedicated product page, customize their print with a live preview, and place an order.

The product is a physical, museum-quality art print mailed to the customer. The emotional hook is celebratory and personal: turning a runner's achievement into permanent wall art.

**Primary conversion goal:** Get visitors to choose a product, fill in the customizer form, and submit an order.

**Secondary goal:** Build trust through testimonials, example gallery prints, and transparent pricing before the visitor reaches a product page.

---

## 2. File Structure

```
race-print-landing/
├── index.html            # Homepage. Products grid, gallery, testimonials, pricing.
├── thank-you.html        # Post-order confirmation page.
├── css/
│   └── style.css         # Shared styles for all pages. No preprocessor.
├── js/
│   └── main.js           # Homepage JS: nav scroll + fade-in observer only.
├── products/
│   ├── product.html      # Product sub-page shell. JS populates from ?id= param.
│   ├── css/
│   │   └── product.css   # Product-page-specific styles only (no duplication of style.css).
│   └── js/
│       └── product.js    # All product page logic: config, form builder, live previews, form submit.
└── agents.md             # This file.
```

The site is intentionally dependency-free: no build step, no npm, no framework. All changes must stay within this structure unless there is a strong reason to expand it — and that reason must be documented here.

---

## 3. Page Structure & Section Order

### 3.1 Homepage (`index.html`)

Sections flow top to bottom in this fixed order. Do not reorder without a clear conversion reason documented here.

| Order | Section | ID / Class | Purpose |
|-------|---------|------------|---------|
| 1 | Navigation | `nav` | Brand anchor + scroll links + Products dropdown |
| 2 | Hero | `.hero` | First impression, emotional hook |
| 3 | Banner strip | `.banner-strip` | Trust signals scrolling in a marquee |
| 4 | How it works | `#how-it-works` | Reduce friction by explaining the 3-step process |
| 5 | Products grid | `#products` | 2×2 grid of product cards linking to product sub-pages |
| 6 | Gallery | `#gallery` | Social proof — clickable, links to matching product pages |
| 7 | Testimonials | `.testimonials` | Social proof through customer quotes |
| 8 | Pricing | `#pricing` | Remove price uncertainty before final CTA |
| 9 | Final CTA | `.cta-section` | Last push to the products grid |
| 10 | Footer | `footer` | Nav links + copyright |

### 3.2 Product Sub-Page (`products/product.html`)

A single static shell populated entirely by JS from the `?id=` query param. Supports four product IDs: `marathon-classic`, `elevation-profile`, `split-times`, `bib-art`.

Layout: two-column (reuses `.customizer-layout` from `style.css`) — form left, live preview right. On tablet/mobile the preview stacks above the form.

The nav is always visible (white, with shadow) on product pages — it does not require scrolling to appear. This is achieved by applying `class="scrolled"` directly to `<nav>` in the HTML and overriding nav styles in `product.css`.

---

## 4. Design System

### 4.1 Color Palette

All colors are defined as CSS custom properties in `:root` inside `style.css`. Never hardcode hex values in markup or inline styles — always use the variable.

| Variable | Hex | Usage |
|----------|-----|-------|
| `--black` | `#0a0a0a` | Primary text, dark backgrounds (hero, gallery, footer, CTA) |
| `--white` | `#ffffff` | Body background, card backgrounds, text on dark sections |
| `--gray-100` | `#f5f5f5` | Alternate section backgrounds (How it works, Testimonials) |
| `--gray-200` | `#e8e8e8` | Borders, dividers, input borders at rest |
| `--gray-400` | `#999999` | Secondary/muted text, stat labels, placeholder-level info |
| `--gray-600` | `#555555` | Body copy, descriptions, captions |
| `--gray-800` | `#222222` | Dark card backgrounds, hover states |
| `--accent` | `#c8a96e` | Gold. Brand color. CTAs, highlights, section labels, decorative lines |
| `--accent-dark` | `#a8893e` | Gold hover state for buttons and interactive elements |

**Alternating section pattern (homepage):** black (hero) → light (banner) → light (how-it-works) → white (products) → black (gallery) → light (testimonials) → white (pricing) → black (CTA) → black (footer).

### 4.2 Typography

Two Google Fonts are loaded. Do not add a third font without removing one of these.

| Font | Variable | Usage |
|------|----------|-------|
| Inter | `--font-sans` | All UI text: body, labels, buttons, nav, captions, prices |
| Playfair Display | `--font-display` | Runner names on prints only. Also used for italic display headlines in hero (`<em>` inside `<h1>`). |

**Type scale:**

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| h1 | `clamp(2.8rem, 7vw, 5.5rem)` | 700 | Fluid, responds to viewport |
| h2 | `clamp(2rem, 4vw, 3rem)` | 700 | Fluid |
| h3 | `1.25rem` | 700 | Card titles, step titles |
| Body | `1rem` / `0.95rem` | 400 | Line-height 1.6–1.8 |
| `.label` | `0.7rem` | 700 | `letter-spacing: 0.18em`, uppercase, `--accent` color. Used as section eyebrows above every `h2`. |
| Buttons | `0.85rem` | 600 | `letter-spacing: 0.08em`, uppercase |
| Micro labels | `0.55–0.72rem` | 400–700 | Print stat labels, footer copy, input labels |

**Italic serif rule:** Playfair Display italic is reserved exclusively for runner names in print previews and the `<em>` word(s) in the hero `h1`. Nowhere else.

### 4.3 Spacing

No spacing scale variables are defined yet — spacing is applied directly in rem units. Follow this convention when adding new components:

- Section top/bottom padding: `8rem 0`
- Section header bottom margin: `5rem`
- Card internal padding: `2–2.5rem`
- Form group bottom margin: `1.5rem`
- Inline gap between related elements: `0.5–0.75rem`
- Gap between independent items: `1.25–2rem`
- Gap between grid columns: `2rem` (standard), `4–6rem` (two-column feature layout)

### 4.4 Borders & Radius

- `--radius: 4px` — applied to all cards, buttons, inputs, and badges. Do not use larger or rounder values unless intentionally differentiating a new component type.
- Borders are always `1px solid var(--gray-200)` in light sections and `1px solid rgba(255,255,255,0.06–0.1)` in dark sections.
- The print preview uses a double-border trick: outer card border + an inner `::before` pseudo-element inset 8px — this mimics a matted frame. Preserve this pattern for all print preview elements.

### 4.5 Buttons

Three button variants. Use exactly these — do not invent new ones without updating this document.

| Class | Background | Text | Border | Used for |
|-------|-----------|------|--------|---------|
| `.btn-primary` | `--accent` | `--black` | `--accent` | Primary CTA on dark and light backgrounds |
| `.btn-outline` | transparent | `--white` | `--white` | Secondary CTA on dark backgrounds only |
| `.btn-dark` | `--black` | `--white` | `--black` | Secondary CTA on light backgrounds |

All buttons use the base `.btn` class plus one variant class. Base properties: `padding: 0.85rem 2rem`, `font-size: 0.85rem`, `font-weight: 600`, `letter-spacing: 0.08em`, `text-transform: uppercase`, `border-radius: var(--radius)`, `border: 2px solid transparent`.

### 4.6 Grid & Layout

- **Max content width:** `1200px` via `.container` (with `padding: 0 2rem`)
- **Two-column feature layout:** `grid-template-columns: 1fr 1fr` with `gap: 4rem` — used in the product customizer
- **Two-column products grid:** `grid-template-columns: repeat(2, 1fr)` with `gap: 2rem` — homepage products section
- **Three-column card grid:** `grid-template-columns: repeat(3, 1fr)` with `gap: 2rem` — How it works, Testimonials, Pricing
- **Four-column gallery grid:** `grid-template-columns: repeat(4, 1fr)` with `gap: 1.5rem`
- Breakpoints: tablet at `1024px` (collapses two-column layouts to single), mobile at `768px` (collapses three- and four-column grids to one or two columns, hides nav links)

### 4.7 Animation & Motion

- **Scroll fade-in:** All non-hero content that needs animation uses `.fade-in` (and optionally `.fade-in-delay-1/2/3` for staggered children). The IntersectionObserver in `main.js` (homepage) and `product.js` (product pages) adds `.visible` when the element enters the viewport at `threshold: 0.15`. Transition: `opacity 0.6s ease`, `transform: translateY(20px → 0)`.
- **Marquee banner:** `.banner-track` uses `@keyframes marquee` over 25s linear infinite. The track contains items duplicated so the loop is seamless.
- **Nav scroll state (homepage only):** `nav.scrolled` class is toggled by JS at `window.scrollY > 60`. It changes background to `rgba(255,255,255,0.97)` and text to dark. On product pages the nav is always in the scrolled/white state — no JS toggle needed.
- **Hover transitions:** All interactive elements use `transition: var(--transition)` which is `0.25s ease`. Cards add `box-shadow` and `translateY(-4px)` on hover.

### 4.8 Section Labels (Eyebrows)

Every `h2` section heading is preceded by a `.label` element (e.g. `<span class="label">Simple Process</span>`). This is a strict pattern. The label is always gold, always uppercase, always small caps. Do not omit it for new sections.

### 4.9 Print Preview Design

The print preview is the hero product visual — keep it clean and art-directed. On product pages the preview frame is wider than on the homepage (max-width 480px, full-column width) to make better use of the dedicated page layout.

Anatomy of a print preview:
1. **Race name** — micro label, uppercase, `--gray-400`, widely spaced letters
2. **Route art / chart** — SVG specific to each product type (see section 5)
3. **Runner name** — Playfair Display italic, large, color depends on theme
4. **Divider line** — `2–2.5rem` wide, `1px`, `--accent`
5. **Stats row** — key metrics side by side. Value in bold, label in micro uppercase `--gray-400`
6. **Bib badge** (classic only) — absolute-positioned top-right, black square, white text

The double-border frame (outer card + inner `::before` inset) must be preserved on all standalone preview frames.

---

## 5. Product Pages & Customizer Logic

### 5.1 Four Products

| ID | Name | Preview theme | Key fields |
|----|------|---------------|-----------|
| `marathon-classic` | Marathon Classic | White, gold accents | runner-name, race-name, bib-number, finish-time, pace |
| `elevation-profile` | Elevation Profile | Black background | race-name, start-elevation, peak-elevation, total-ascent, finish-time |
| `split-times` | Split Times | White, table layout | runner-name, race-name, split-1…split-8, finish-time |
| `bib-art` | Finisher Bib Art | Near-black (#111) | runner-name, race-name, bib-number, finish-time, motto |

### 5.2 JS Architecture (`products/js/product.js`)

- `PRODUCTS` config object maps each `id` to name, tagline, field definitions, and `buildPreview` function
- `init()` reads `?id=` param, populates page title/breadcrumb/label, calls `buildFormFields()` and `updatePreview()`
- `buildFormFields()` dynamically injects `.customizer-form-group` divs. The `split-times` product generates a group of 8 split inputs automatically.
- Every `input` event on any product field calls `updatePreview()` → calls the product's `buildPreview()` function → re-renders `#preview-container` via `innerHTML`
- `escHtml()` is used on all user-supplied strings injected into the preview to prevent XSS
- `onSubmit()` validates required product fields (adds `.error` class, prevents submit if any are empty), then JSON-serializes the customization summary into `#field-summary` before letting the native form POST proceed

### 5.3 Order Submission

The order form POSTs to `/api/order` (custom backend — to be implemented). No third-party form service is used. On success the backend should redirect to `../thank-you.html`. The hidden field `customization_summary` contains a JSON string of all product-specific field values.

### 5.4 Live Preview Rendering

Each `buildXxxPreview(container, values)` function completely replaces `container.innerHTML`. Fallback display values are used when fields are empty (e.g. `"Your Name"`, `"#"`, `"—"`). The elevation preview uses a dynamically calculated SVG `<polyline>` based on the elevation inputs.

---

## 6. Navigation

The nav bar has two states:

- **Homepage:** transparent over the hero (dark text/logo hidden), becomes white with shadow after scrolling 60px. Toggled by JS in `main.js`.
- **Product pages:** always white with shadow. Set via `class="scrolled"` on `<nav>` in `product.html` and CSS overrides in `product.css`. No JS toggle on product pages.

The nav contains a Products dropdown (`.nav-dropdown`) that reveals links to all four product pages on hover. The dropdown is pure CSS — no JS required.

---

## 7. Copy & Voice

- Tone: Warm, celebratory, and slightly premium. Not sporty-aggressive, not overly corporate.
- Headlines: Short, punchy, often two or three short lines broken for rhythm (e.g. "Your race. / Your story. / On your wall.")
- The italic serif word in the hero `h1` is a deliberate visual accent — always exactly one `<em>` phrase per hero headline.
- Prices are in EUR (€). Shipping thresholds are in EUR. If this site expands to other markets, document the currency/locale handling here.
- Business name throughout: **RacePrint** (one word, capital R and P)
- Contact email placeholder: `hello@raceprint.de` — replace with real address before launch

---

## 8. What Requires a Document Update

Update the relevant section of this file whenever you make any of the following changes:

- Add, remove, or reorder a page section
- Change a color, font, or spacing value in `:root` or globally
- Add a new button variant, card type, or reusable component
- Add a new product or change field definitions in `PRODUCTS`
- Change the customizer input/output field mapping or validation logic
- Change the order submission flow or backend target
- Add interactivity or a new JS behavior
- Add a new page or route
- Change the pricing, product sizes, or currency
- Change the section alternating background pattern
- Change breakpoints or responsive behavior

Do not update this file for: copy tweaks, color value micro-adjustments within the same token, adding a new testimonial card or gallery item that follows existing patterns exactly.
