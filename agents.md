# RacePrint — Agent Instructions

This is the authoritative reference for AI agents working on this project. It describes what the site is, how it works, and how every UI and UX decision should be made. **Before making any significant change to logic, layout, copy, or design, read this document.** After making such a change, update the relevant section here so the document always reflects the current state of the site.

This is not a changelog. Delete outdated information when you replace it with new information.

---

## 1. Purpose of the Site

RacePrint is a direct-to-consumer e-commerce landing page for a personalized marathon art print business. Visitors land on the page, enter their race details (name, bib number, finish time, pace, race name), preview a personalized print, and place an order.

The product is a physical, museum-quality art print mailed to the customer. The emotional hook is celebratory and personal: turning a runner's achievement into permanent wall art.

**Primary conversion goal:** Get visitors to fill in the customizer form and click "Order This Print."

**Secondary goal:** Build trust through testimonials, example gallery prints, and transparent pricing before the visitor reaches the customizer.

---

## 2. File Structure

```
race-print-landing/
├── index.html        # All markup. One page, no framework.
├── css/
│   └── style.css     # All styles. Single stylesheet, no preprocessor.
├── js/
│   └── main.js       # All JavaScript. Vanilla JS only, no dependencies.
└── agents.md         # This file.
```

The site is intentionally dependency-free: no build step, no npm, no framework. All changes must stay within this structure unless there is a strong reason to expand it — and that reason must be documented here.

---

## 3. Page Structure & Section Order

The page flows top to bottom in this fixed order. Do not reorder sections without a clear conversion reason documented here.

| Order | Section | ID / Class | Purpose |
|-------|---------|------------|---------|
| 1 | Navigation | `nav` | Brand anchor + scroll links + primary CTA |
| 2 | Hero | `.hero` | First impression, emotional hook, animated print preview |
| 3 | Banner strip | `.banner-strip` | Trust signals scrolling in a marquee |
| 4 | How it works | `#how-it-works` | Reduce friction by explaining the 3-step process |
| 5 | Customizer | `#customize` | Core conversion unit: form + live print preview |
| 6 | Gallery | `#gallery` | Social proof through example prints |
| 7 | Testimonials | `.testimonials` | Social proof through customer quotes |
| 8 | Pricing | `#pricing` | Remove price uncertainty before final CTA |
| 9 | Final CTA | `.cta-section` | Last push to order |
| 10 | Footer | `footer` | Nav links + copyright |

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

**Alternating section pattern:** Sections alternate between `--black` backgrounds and light (`--white` / `--gray-100`) backgrounds to create visual rhythm and prevent the page from feeling flat. The current alternation is: black (hero) → light (banner) → light (how-it-works) → white (customizer) → black (gallery) → light (testimonials) → white (pricing) → black (CTA) → black (footer).

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
- Gap between grid columns: `2rem` (standard), `6rem` (two-column feature layout)

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
- **Two-column feature layout:** `grid-template-columns: 1fr 1fr` with `gap: 6rem` — used in the customizer section
- **Three-column card grid:** `grid-template-columns: repeat(3, 1fr)` with `gap: 2rem` — used in How it works, Testimonials, and Pricing
- **Four-column gallery grid:** `grid-template-columns: repeat(4, 1fr)` with `gap: 1.5rem`
- Breakpoints: tablet at `1024px` (collapses two-column layouts to single), mobile at `768px` (collapses three- and four-column grids to one or two columns, hides nav links)

### 4.7 Animation & Motion

- **Scroll fade-in:** All non-hero content that needs animation uses `.fade-in` (and optionally `.fade-in-delay-1/2/3` for staggered children). The IntersectionObserver in `main.js` adds `.visible` when the element enters the viewport at `threshold: 0.15`. Transition: `opacity 0.6s ease`, `transform: translateY(20px → 0)`.
- **Hero card float:** The animated print card in the hero uses `@keyframes floatCard` — a subtle `translateY(-10px)` oscillation over 4s, combined with a fixed `rotate(-2deg)` tilt.
- **Marquee banner:** `.banner-track` uses `@keyframes marquee` over 25s linear infinite. The track contains items duplicated so the loop is seamless.
- **Nav scroll state:** `nav.scrolled` class is toggled by JS at `window.scrollY > 60`. It changes background to `rgba(255,255,255,0.97)` and text to dark.
- **Hover transitions:** All interactive elements use `transition: var(--transition)` which is `0.25s ease`. Cards add `box-shadow` and `translateY(-4px)` on hover.

### 4.8 Section Labels (Eyebrows)

Every `h2` section heading is preceded by a `.label` element (e.g. `<span class="label">Simple Process</span>`). This is a strict pattern. The label is always gold, always uppercase, always small caps. Do not omit it for new sections.

### 4.9 Print Preview Design

The print preview is the hero product visual — keep it clean and art-directed.

Anatomy of a print preview (customizer or hero card):
1. **Race name** — micro label, uppercase, `--gray-400`, widely spaced letters
2. **Route art** — SVG illustration of the course. Uses `--black` for the primary path and `--accent` for the secondary/dashed path. Start dot is `--accent`, finish dot is `--black` with an `--accent` ring.
3. **Runner name** — Playfair Display italic, large, `--black`
4. **Divider line** — `2–2.5rem` wide, `1px`, `--accent`
5. **Stats row** — finish time and average pace side by side. Value in bold, label in micro uppercase `--gray-400`
6. **Bib badge** — absolute-positioned top-right, black square, white text, bold, small

The double-border frame (outer card + inner `::before` inset) must be preserved on all standalone preview frames.

---

## 5. Customizer Logic

The live preview customizer is the conversion centrepiece. Current behavior in `main.js`:

- Inputs: `#runner-name`, `#race-name`, `#bib-number`, `#finish-time`, `#pace`, `#print-size`
- Outputs (in preview frame): `#preview-name`, `#preview-race`, `#preview-bib`, `#preview-time`, `#preview-pace`
- Every `input` event on any field calls `updatePreview()`, which reads all field values and writes them to the corresponding preview elements
- Pace is displayed with `/km` appended automatically
- Fallback display values when fields are empty: name → `"Your Name"`, bib → `"#"`, time → `"—"`, pace → `"—"`, race → `"MARATHON 2025"`
- The order button (`#order-btn`) validates that `#runner-name` is not empty. If empty, it focuses the field and briefly turns its border red (`#e05`). If valid, it shows an alert (placeholder — to be replaced with real checkout/form submission logic)
- No backend or payment integration exists yet. The alert is a stub.

**When adding order flow:** Replace the `alert()` in `main.js` with a real form submission or redirect. Document the new flow here.

---

## 6. Copy & Voice

- Tone: Warm, celebratory, and slightly premium. Not sporty-aggressive, not overly corporate.
- Headlines: Short, punchy, often two or three short lines broken for rhythm (e.g. "Your race. / Your story. / On your wall.")
- The italic serif word in the hero `h1` is a deliberate visual accent — always exactly one `<em>` phrase per hero headline.
- Prices are in EUR (€). Shipping thresholds are in EUR. If this site expands to other markets, document the currency/locale handling here.
- Business name throughout: **RacePrint** (one word, capital R and P)
- Contact email placeholder: `hello@raceprint.de` — replace with real address before launch

---

## 7. What Requires a Document Update

Update the relevant section of this file whenever you make any of the following changes:

- Add, remove, or reorder a page section
- Change a color, font, or spacing value in `:root` or globally
- Add a new button variant, card type, or reusable component
- Change the customizer input/output field mapping or validation logic
- Change the order flow (the `#order-btn` handler)
- Add interactivity or a new JS behavior
- Add a new page or route (if the site ever grows beyond a single page)
- Change the pricing, product sizes, or currency
- Change the section alternating background pattern
- Change breakpoints or responsive behavior

Do not update this file for: copy tweaks, color value micro-adjustments within the same token, adding a new testimonial card or gallery item that follows existing patterns exactly.
