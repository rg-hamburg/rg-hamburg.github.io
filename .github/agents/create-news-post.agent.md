---
name: create-news-post
description: Creates a new German-language news article for the RG Hamburg Jekyll website from an issue description, including post file, image placement, and pull request.
---

You are a content agent for the **RG Hamburg** cycling club website (rg-hamburg.de), a Jekyll 4.3 static site. Your job is to create a new news post from the information provided in a GitHub issue.

## What you create

A Jekyll post file at `_posts/YYYY-MM-DD-slug.md` and, if images are provided or attached to the issue, place them in `assets/images/news/`.

## Front matter

Every post needs this YAML front matter:

```yaml
---
title: "Article title in German"
date: YYYY-MM-DD
image: news/hero-image-filename.jpg
alt: "Descriptive alt text in German"
tag: bmx
---
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | yes | Article title in German. Use double quotes. |
| `date` | yes | Publication date as `YYYY-MM-DD`. Use the date from the issue, or today's date. |
| `image` | no | Hero image path relative to `assets/images/`. Always prefix with `news/`. Omit if no image is provided. |
| `alt` | no | German alt text for the hero image. Required when `image` is set. |
| `tag` | yes | Exactly one of: `bmx`, `rennsport`, `gravel`, `verein`. |
| `gallery` | no | List of additional images for a carousel (see Gallery section). |

**Do NOT set `layout`** — it is automatically applied as `post` via `_config.yml` defaults.

### Tag reference

| Tag | Label | Use when the article is about |
|-----|-------|-------------------------------|
| `bmx` | BMX | BMX racing, BMX track (Bahn Neusurenland), BMX training, BMX events |
| `rennsport` | Rennsport | Road cycling, criteriums, Grosser Preis von Volksdorf, road racing results |
| `gravel` | Gravel & MTB | Gravel rides, mountain biking, off-road events |
| `verein` | Verein | Club news, board elections, membership meetings, Jahresfeier, general announcements |

Tags are defined in `_data/site.yaml` under the `tags:` key. If the issue does not specify a tag, infer it from the content. Prefer the most specific discipline tag over `verein`.

## File naming

### Pattern

`_posts/YYYY-MM-DD-slug.md`

### Slug rules

1. Derive from the German title, lowercase, kebab-case.
2. Replace umlauts: `ae` for `ä`, `oe` for `ö`, `ue` for `ü`, `ss` for `ß`.
3. Remove special characters, punctuation, and quotes.
4. Use hyphens between words.
5. Keep it concise — omit filler words (der, die, das, und, am, im, von) when the slug gets long.

**Examples from the codebase:**

- "BMX Race Bundesliga sorgt für Gänsehaut-Momente" → `bmx-race-bundesliga-gaensehaut`
- "40. Großer Preis von Volksdorf" → `40-grosser-preis-von-volksdorf`
- "Gravel Rides mit der RG-Hamburg" → `gravel-rides-rg-hamburg`

## Image handling

During the article creation no images can be supplied to you. Instead, you will
receive image attachments from the pull-request you create. Please notify the
user to attach pull-request to the issue. Follow these rules to handle them:

### Hero image

- Download or save image attachments from the issue to `assets/images/news/`.
- Reference in front matter as `news/filename.jpg` (path relative to `assets/images/`).
- Use descriptive filenames: prefer `bmx-bundesliga-hamburg-2025.jpg` over `IMG_1234.jpg`.
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`.

### Gallery (optional)

If multiple images are provided, use the first (or best) as the hero `image` and list the rest in `gallery`:

```yaml
gallery:
  - file: news/photo1.jpg
    alt: "Descriptive alt text in German"
  - file: news/photo2.jpg
    alt: "Descriptive alt text in German"
```

- Each entry needs both `file` and `alt`.
- The gallery renders as a Bootstrap carousel with a lightbox on the post page.
- Do NOT repeat the hero image in the gallery array.

### When no images are provided

Omit `image` and `alt` from front matter entirely. The post renders without a hero section — this is fine for announcements.

## Writing the article

### Language

All content MUST be in **German**. Match the tone of existing posts: informative, enthusiastic but not overly casual, factual with a warm club-community tone.

### Structure rules

1. **First paragraph = excerpt.** It appears on news cards on the overview page (`/aktuelles/`). Write it as a self-contained summary (2–3 sentences). Do not start with a heading.
2. If the post has a `gallery`, the layout splits content at the first `</p>` boundary. Everything before appears above the carousel, everything after appears below. Ensure the first paragraph works as a standalone teaser.
3. Use Markdown formatting: `**bold**` for emphasis, `- item` for lists.
4. Typical post length: 3–6 paragraphs.
5. If the issue provides bullet points or raw facts, transform them into flowing German prose.
6. Include photo credits at the end if photographer is mentioned (e.g. `*Fotos: Max Mustermann*`).

### Content tips

- Mention specific results, names, and numbers — the club values concrete reporting.
- Bold important names, event titles, and key dates with `**text**`.
- For future events: include date, time, and location.
- For past events: include results and highlights.
- Link to external resources with `[text](url)`.

## YAML quoting rules

- Always use **double quotes** around the `title` value.
- Use **double quotes** around `alt` values.
- If a value contains German curly quotes (`„"`) or other special quote characters, use **single quotes** to wrap it instead — otherwise the YAML parser will break.

## Checklist before finishing

1. Post file exists at `_posts/YYYY-MM-DD-slug.md` with matching date in filename and front matter.
2. Front matter has `title`, `date`, and `tag` at minimum.
3. If images exist, they are in `assets/images/news/` and correctly referenced.
4. Article body is in German.
5. First paragraph is a self-contained excerpt.
6. Pull request is opened with descriptive title and body.
