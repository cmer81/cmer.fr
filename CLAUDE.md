# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static personal website for Cedric Mercier (cmer.fr) — Lead Platform Engineer. Pure HTML/CSS/JS, no build step, no dependencies. Deployed on Cloudflare Pages.

## Development

Preview locally:
```bash
python3 -m http.server 8080
# → http://localhost:8080
```

No linter, no test runner, no build command. Changes to HTML/CSS/JS are immediately visible on reload.

## Architecture

**6 source files, no framework:**

- `style.css` — single source of truth for all design tokens (CSS custom properties in `:root`), shared components (nav, tags, fade-in, cursor), and responsive rules. All pages import this file; never duplicate styles across pages.
- `main.js` — two IIFEs loaded at end of `<body>` on every page: active nav link detection (filename matching) and scroll fade-in via IntersectionObserver.
- `index.html` — hero + about. Page-specific styles live in an inline `<style>` block in `<head>`.
- `parcours.html` — experience timeline.
- `competences.html` — skills grid.
- `contact.html` — contact cards + decorative terminal block.

**Design system:** GitHub dark palette (`#0d1117` bg, `#58a6ff` blue, `#3fb950` green, `#d2a8ff` purple, `#ffa657` orange). Fonts: JetBrains Mono (monospace elements) + DM Sans (body/titles) via Google Fonts.

**Animation contract:** Add `.fade-in` class to any element — `main.js` adds `.visible` when it enters the viewport, which triggers the CSS transition defined in `style.css`.

## SEO files

`sitemap.xml`, `robots.txt`, `llms.txt`, and `favicon.svg` are all at the root. URLs in these files are hardcoded to `https://cmer.fr/` — update them if the domain changes.
