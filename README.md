# 🌍 RG Hamburg Website

These are the sources for the RG Hamburg website. The website
is built as a static website and can be hosted on GitHub.

## Adding / modifying content

### Bilder für einen Beitrag hochladen

Bilder für News-Beiträge gehören in den Ordner `assets/images/news/`.

#### Option 1 – Bilder an ein GitHub-Issue anhängen (empfohlen)

Wenn du einen neuen Beitrag als GitHub-Issue erstellst, kannst du Bilder direkt im Textfeld des Issues per Drag & Drop oder über den Büroklammer-Button anhängen. Der KI-Assistent lädt die Bilder automatisch herunter und legt sie im richtigen Ordner ab.

#### Option 2 – Bilder direkt über die GitHub-Oberfläche hochladen

1. Navigiere im Repository zu **`assets/images/news/`**.
2. Klicke auf **„Add file" → „Upload files"**.
3. Ziehe deine Bilder per Drag & Drop in das Upload-Feld oder wähle sie über den Datei-Dialog aus.
4. Vergib einen sprechenden Dateinamen (z. B. `vereinsfeier-2026.jpg` statt `IMG_1234.jpg`).
5. Bestätige den Upload mit **„Commit changes"**.

#### Bild im Beitrag referenzieren

Nach dem Upload trägst du den Dateinamen im Front Matter des Beitrags ein:

```yaml
---
title: "Titel des Beitrags"
date: YYYY-MM-DD
image: news/vereinsfeier-2026.jpg   # Pfad relativ zu assets/images/
alt: "Beschreibender Alt-Text auf Deutsch"
tag: verein
---
```

Für mehrere Bilder (Galerie) kannst du zusätzlich das `gallery`-Feld verwenden:

```yaml
gallery:
  - file: news/vereinsfeier-2026-2.jpg
    alt: "Zweites Bild der Vereinsfeier"
  - file: news/vereinsfeier-2026-3.jpg
    alt: "Drittes Bild der Vereinsfeier"
```

Das erste Bild (`image`) erscheint als Hero-Bild, die Galerie-Bilder werden als Carousel unterhalb des ersten Absatzes dargestellt.

**Unterstützte Formate:** `.jpg`, `.jpeg`, `.png`, `.webp`

## Running locally

```bash
docker compose up
```
