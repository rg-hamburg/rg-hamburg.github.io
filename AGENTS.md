# RG Hamburg Website

Static site for [rg-hamburg.de](https://rg-hamburg.de), built with **Jekyll 4.3**.

## Running locally

```bash
docker compose up        # → http://localhost:4000
```

## Tech stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Generator  | Jekyll 4.3 (Docker image `jekyll/jekyll:4.3`) |
| Framework  | Bootstrap 5.3 (jsDelivr CDN)                  |
| Custom CSS | `assets/css/style.css`                        |
| Font       | Kanit 400 & 600 — Google Fonts CDN            |
| JavaScript | Vanilla JS — `assets/js/main.js`              |

---

## Layouts

| Layout | File | Used for |
|--------|------|----------|
| `default` | `_layouts/default.html` | Base layout (nav, footer, scripts) |
| `discipline` | `_layouts/discipline.html` | Disziplinen pages — reads `site.data[page.data_key]` |
| `aktuelles` | `_layouts/aktuelles.html` | Aktuelles listing page — page-hero, events, news, pagination, probetraining |
| `post` | `_layouts/post.html` | Single news post — page-hero (uses `page.image`), prose content, probetraining |
| `prose` | `_layouts/prose.html` | Info/legal pages — pure Markdown, no HTML boilerplate |

### `prose` layout

Add `layout: prose` and `section_label: <Chip Text>` to front matter. The layout renders the section header chip and wraps `{{ content }}` — no HTML needed in the `.md` file.

---

## Content editing

### News (`_posts/`)

News articles are Jekyll posts. Create a file `_posts/YYYY-MM-DD-slug.md` with:

```yaml
---
title: "Article title"
date: YYYY-MM-DD
image: news-1.png       # image from assets/images/
alt: "Image alt text"
---

Article body in Markdown. The first paragraph becomes the card excerpt automatically.
```

Posts are automatically available at `/aktuelles/YYYY/slug/`. The `_includes/news.html` renders cards from `site.posts` (newest first).

### Other data files in `_data/`:

| File | Controls |
|------|----------|
| `site.yaml` | Nav links, footer links, social URLs, **hero carousel**, **discipline cards**, **partner logos**, **kontakt teaser**, **tags**, **Instagram feed** |
| `events.yaml` | Veranstaltungen cards |
| `probetraining.yaml` | Probetraining section |
| `bmx.yaml` | BMX discipline page content |

Hero, disciplines, partners, kontakt, tags, and Instagram are embedded in `site.yaml` under `hero:`, `disciplines:`, `partners:`, `kontakt:`, `tags:`, and `instagram:` keys so editors can find all core content in one file.

### Pages

| URL | File |
|-----|------|
| `/` | `index.html` |
| `/aktuelles/` | `aktuelles.md` |
| `/aktuelles/YYYY/slug/` | `_posts/YYYY-MM-DD-slug.md` |
| `/disziplinen/bmx/` | `disziplinen/bmx.md` |
| `/disziplinen/rennsport/` | `disziplinen/rennsport.md` |
| `/disziplinen/gravel/` | `disziplinen/gravel.md` |
| `/verein/` | `verein.md` |
| `/impressum/` | `impressum.md` |
| `/datenschutzerklaerung/` | `datenschutzerklaerung.md` |
| `/mitgliedschaft/` | `mitgliedschaft.md` |
| `/satzung/` | `satzung.md` |

---

## Adding a new discipline page

1. Create `_data/<slug>.yaml` with keys: `hero_image`, `hero_title`, `section_label`, `intro_*`, `faq[]`, `training{}`, `impressions[]`
2. Create `disziplinen/<slug>.md`:
   ```yaml
   ---
   layout: discipline
   data_key: <slug>
   active_nav: disziplinen
   ---
   ```
3. Add a card entry under `disciplines:` in `_data/site.yaml` for the homepage

---

## Design system

CSS custom properties (`:root` in `style.css`):

| Token | Value | Usage |
|-------|-------|-------|
| `--rg-dark` | `#000812` | Nav & footer background |
| `--rg-red` | `#e30613` | Primary CTA buttons |
| `--rg-blue` | `#004dff` | Secondary buttons, discipline titles |
| `--rg-light` | `#eef2f5` | Section backgrounds |
| `--rg-text-grey` | `#626f78` | Body copy, labels |

Key utility classes: `.py-section`, `.mb-section-head`, `.section-label`, `.section-line`, `.gradient-yellow-orange`, `.gradient-blue`, `.btn-rg-red`, `.btn-rg-blue`, `.btn-rg-outline`

### Active nav link

Set `active_nav: <id>` in page front matter, where `<id>` matches a nav entry's `id` field in `_data/site.yaml`. The nav include adds `.text-rg-yellow` to the matching link.

---

## Instagram / Instafeed

`instafeed.js` is CDN-loaded only on pages with `load_instafeed: true` in front matter (homepage only). Keep Instagram calls commented out until an access token is configured.
