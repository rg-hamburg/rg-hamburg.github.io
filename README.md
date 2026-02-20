# 🌍 RG Hamburg Website

These are the sources for the RG Hamburg website. The website
is built as a static website and can be hosted on GitHub.

## Running locally

```bash
docker run -it -v $(pwd):/srv/jekyll \
    -p 4000:4000 jekyll/jekyll:3.8 \
    jekyll serve --watch
```
