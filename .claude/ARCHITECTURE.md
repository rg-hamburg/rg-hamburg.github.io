# RG Hamburg Website — Architecture Summary

## Project purpose

Static HTML/CSS/JS prototype of the **Radsport-Gemeinschaft Hamburg von 1893 e.V.** website.
Built directly from `RG-Hamburg_Website_Update04.fig` (Figma), it serves as a pixel-accurate
reference for a future **WordPress** conversion. All images and design tokens originate from
the Figma source of truth.

---

## Tech stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Markup     | Semantic HTML5                                  |
| Framework  | Bootstrap 5.3.3 (jsDelivr CDN)                  |
| Custom CSS | `assets/css/style.css` — brand overrides only   |
| Font       | Kanit 400 & 600 — Google Fonts CDN              |
| JavaScript | Vanilla JS — `assets/js/main.js`                |

No build step, no package manager — open `index.html` directly in a browser.

---

## File structure

```
website/
├── index.html                        # Single-page document, all sections inline
├── assets/
│   ├── css/
│   │   └── style.css                 # Brand tokens + component styles
│   ├── js/
│   │   └── main.js                   # Hero carousel tab behaviour
│   └── images/
│       ├── logo.png                  # Nav bar logo
│       ├── footer-logo.png           # Footer logo (different crop)
│       ├── hero-road.png             # Hero slide 1 — road racing
│       ├── hero-bmx.png              # Hero slide 2 — BMX
│       ├── hero-gravel.png           # Hero slide 3 — gravel / MTB
│       ├── discipline-rennsport.png
│       ├── discipline-bmx.png
│       ├── discipline-gravel.png
│       ├── probetraining.png         # Split-layout left panel
│       ├── news-1..4.png             # Aktuelles card thumbnails
│       ├── event-1..2.png            # Veranstaltungen card images
│       ├── sponsor-sparkasse.png
│       ├── sponsor-activecity.png
│       ├── sponsor-mgf.png
│       ├── sponsor-velux.png
│       ├── social-1..6.png           # Instagram grid photos
│       └── kontakt.png               # Kontakt-Teaser left panel
├── .claude/
│   └── ARCHITECTURE.md              # ← this file
└── RG-Hamburg_Website_Update04.fig  # Figma source
```

---

## Brand design system

All tokens are CSS custom properties in `:root` inside `assets/css/style.css`.

### Colour palette

| Token             | Hex       | Usage                               |
|-------------------|-----------|-------------------------------------|
| `--rg-dark`       | `#000812` | Nav & footer background             |
| `--rg-red`        | `#e30613` | Primary CTA buttons, event badges   |
| `--rg-blue`       | `#004dff` | Secondary buttons, discipline titles|
| `--rg-light`      | `#eef2f5` | Section backgrounds (light grey)    |
| `--rg-text-grey`  | `#626f78` | Body copy, labels, section headers  |

### Gradients

| Token                         | Stops                              | Usage                       |
|-------------------------------|------------------------------------|-----------------------------|
| `--rg-gradient-rainbow`       | Red → orange → yellow → cyan → navy| 10 px nav top stripe        |
| `--rg-gradient-yellow-orange` | `#ffed00` → `#f17a0a`              | Hero & kontakt headings     |
| `--rg-gradient-blue`          | `#004dff` → `#0077ff`              | Discipline card titles      |

Apply gradient text via `.gradient-yellow-orange` or `.gradient-blue` (both use
`background-clip: text` + `-webkit-text-fill-color: transparent`).

### Typography

Font: **Kanit** — loaded at weights 400 (regular) and 600 (semibold).
Overrides Bootstrap via `--bs-font-sans-serif` and `--bs-body-font-family`.

| Role                 | Size    | Weight |
|----------------------|---------|--------|
| Hero / section headings | 48–50 px | 600 |
| Discipline card titles | 30 px  | 600    |
| Body / paragraphs    | 17–22 px | 400   |
| Nav links            | 18 px   | 600    |
| Section labels       | 18 px   | 400    |
| News / event body    | 14–15 px | 400   |

### Buttons

| Class         | Colour     | Shape                  |
|---------------|------------|------------------------|
| `.btn-rg-red` | `--rg-red` | Pill — `border-radius: 32px` |
| `.btn-rg-blue`| `--rg-blue`| Pill — same            |

Both extend Bootstrap's `.btn` base with `font-size: 20px` and `height: 46px`.

### Utility classes

| Class                     | Effect                                        |
|---------------------------|-----------------------------------------------|
| `.bg-rg-dark`             | Dark background (`--rg-dark`)                 |
| `.bg-rg-light`            | Light grey background (`--rg-light`)          |
| `.gradient-yellow-orange` | Gradient text for headings on dark sections   |
| `.gradient-blue`          | Gradient text for discipline card titles      |
| `.py-section`             | `padding: 80px 0` — standard section padding  |
| `.mb-section-head`        | `margin-bottom: 48px` — below section header  |

### Container width

Bootstrap's `.container` is overridden to `max-width: 1440 px` at ≥ 1400 px,
matching the Figma canvas width (1920 px − 240 px side padding × 2 = 1440 px).

---

## Page sections

| # | Section            | HTML id / landmark  | Background       | Notes                            |
|---|--------------------|---------------------|------------------|----------------------------------|
| 1 | Navigation         | `<header>`          | `--rg-dark`      | Sticky; rainbow stripe on top    |
| 2 | Hero               | `<section.hero>`    | Full-bleed image | Bootstrap carousel, 3 slides     |
| 3 | Unsere Disziplinen | `#disziplinen`      | `--rg-light`     | 3-column Bootstrap grid          |
| 4 | Probetraining      | (no id)             | Split: img + white | Full-bleed row, no `.container`|
| 5 | Aktuelles          | `#aktuelles`        | `--rg-light`     | 4-column news card grid          |
| 6 | Veranstaltungen    | `#veranstaltungen`  | `--rg-light`     | 2-column event card grid         |
| 7 | Unsere Partner     | `#partner`          | `--rg-light`     | Sponsor logos row                |
| 8 | Social Media       | (no id)             | `--rg-light`     | 6-column Instagram photo grid    |
| 9 | Kontakt-Teaser     | `#kontakt`          | `--rg-light`     | Split layout, no `.container`    |
| 10| Footer             | `<footer #verein>`  | `--rg-dark`      | Address + nav links + IG icon    |

### Section header pattern

Every content section uses this header structure:

```html
<div class="section-header mb-section-head">
  <span class="section-label">Section Name</span>
  <a href="#" class="section-link ms-auto">Link →</a>  <!-- optional -->
  <div class="section-line"></div>                     <!-- used when no link -->
</div>
```

`.section-line` is a 1 px grey rule that fills remaining horizontal space via `flex: 1`.

### Full-bleed split layouts

**Probetraining** and **Kontakt-Teaser** use `row g-0` with no wrapping `.container`,
so the image column bleeds to the viewport edge. Text columns use generous padding
via `.probetraining-content` / `.kontakt-content` (80–100 px).

---

## JavaScript (`assets/js/main.js`)

Wires the three hero pagination tabs (`.hero-pagi-item`) to the Bootstrap carousel:

1. **Click handler** — calls `bsCarousel.to(i)` to jump to the matching slide.
   Uses `Carousel.getOrCreateInstance()` rather than `getInstance()` to avoid a
   timing race where `DOMContentLoaded` fires before Bootstrap auto-initialises
   the carousel from its `data-bs-ride` attribute.

2. **`slid.bs.carousel` listener** — moves the `.active` class to the correct tab
   after each transition. Removing and re-adding `.active` restarts the
   `@keyframes pagiProgress` CSS animation on the progress fill bar.

---

## Hero carousel

- **3 slides:** `hero-road.png` → `hero-bmx.png` → `hero-gravel.png`
- **Transition:** `carousel-fade` crossfade, interval 5 000 ms
- **Touch:** enabled via `data-bs-touch="true"`
- **Controls:** Bootstrap prev/next arrow buttons (`.hero-control`, `z-index: 10`)
- **Indicators:** the three discipline tabs at the bottom of the hero — not
  Bootstrap's default dots. The active tab animates its progress bar from
  0 → 100 % over 5 s (`pagiProgress` keyframe), matching the carousel interval.

---

## Image naming conventions

| Prefix           | Content                               |
|------------------|---------------------------------------|
| `hero-`          | Full-bleed carousel background images |
| `discipline-`    | Discipline card square images         |
| `news-`          | Aktuelles card thumbnails             |
| `event-`         | Veranstaltungen card images           |
| `sponsor-`       | Partner / sponsor logos               |
| `social-`        | Instagram grid photos                 |
| `kontakt`        | Kontakt-Teaser left-panel photo       |
| `logo` / `footer-logo` | Club logo variants              |

---

## Known constraints

- **Desktop-first** — `body` has `min-width: 1200 px`; no responsive breakpoints yet.
- **No build step** — all dependencies from CDN; open `index.html` directly in a browser.
- **Static content** — all text and images are hard-coded; dynamic content will be
  handled by WordPress in the production build.
- **Figma images** — exported from the Figma local dev server (`localhost:3845`) during
  prototyping and committed to `assets/images/`.
