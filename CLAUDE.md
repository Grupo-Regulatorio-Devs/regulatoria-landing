# CLAUDE.md

Context for working on the RegulatorIA landing page. To understand the project,
read the whole repo — this file only points you at the moving parts.

## What this is

The public marketing site for **RegulatorIA** (Grupo Regulatorio SpA), an
AI-native platform that automates the registration of agrochemicals and
pesticides before LATAM regulatory authorities. The product is a suite of 10
specialized AI agents plus an orchestrator, with mandatory human-in-the-loop
(HITL) expert validation.

It is a static, trilingual (ES / EN / PT) landing served from standard hosting
(historically Ferozo; the site also lives behind AWS/CloudFront). Brand palette
is agro-green (`#5AAD2D`, `#2B5A14`) on white, Inter typeface. Animations use
GSAP + ScrollTrigger loaded from a CDN.

## Architecture

Single source of truth in Spanish, plus two shared static assets, feeding a
Python build that emits the three published pages:

```
_fuente/saas.html   Spanish source: HTML markup + inline translatable orbit data
styles.css          all CSS, shared by the three languages (linked as /styles.css)
main.js             all behavior, shared (linked as /main.js, deferred)
        │
        ▼  python3 _fuente/build/build_i18n.py
index.html          Spanish   (root)      https://www.gruporegulatorio.cl/
en/index.html       English                https://www.gruporegulatorio.cl/en/
pt/index.html       Português              https://www.gruporegulatorio.cl/pt/
```

- **CSS and JS are external and language-agnostic.** They are the same file for
  all three languages, referenced with absolute paths so `/en/` and `/pt/`
  resolve them too.
- **Translatable data stays inline.** The hero orbit cards live in `saas.html`
  as `window.__ORBIT_CARDS` (a small inline `<script>`) so the build can
  translate their text. `main.js` reads that global — it holds no copy of its
  own to translate. Everything else the build translates is HTML text/attributes.

## The build (`_fuente/build/`)

- **`build_i18n.py`** — generator. Translates with anchors (`>text<`,
  `attr="text"`, `key:"text"`, `key:'text'`) so a short string is never
  substituted inside a longer word. Adds `canonical` + reciprocal `hreflang`
  (es / en / pt-BR / x-default), `og:locale`, injects the language switcher into
  the nav, and translates + retargets the JSON-LD graph per version.
- **`dict_i18n.py`** — ES → (EN, PT) dictionary. Keys are the Spanish source
  strings; acronyms, agency names, agent names, codes and products are left
  untranslated on purpose. `LMR` → EN "MRL" (PT keeps "LMR"); `FDS` → EN "SDS" /
  PT "FISPQ".
- **`sprite.py`** — generates the 3D SVG icon sprite. Editing it means
  re-injecting the sprite into `saas.html`.
- **`extract.py`** — lists the translatable strings in `saas.html`; run it after
  adding new copy to see what is missing from the dictionary.

### Regenerating and adding copy

```bash
python3 _fuente/build/build_i18n.py
```

When you add new text to `saas.html`:

1. `python3 _fuente/build/extract.py --json`
2. Add the missing entries to `dict_i18n.py`.
3. `python3 _fuente/build/build_i18n.py`
4. Confirm no Spanish leaked into the EN/PT output.

## Other files

- `contacto.php` — demo-form receiver. Emails the lead, backs it up to
  `leads/leads.csv`, replies JSON. Its `$_POST` field names (`nombre`, `cargo`,
  `empresa`, `email`, `website`) are the wire contract with the form in
  `main.js` — keep them in sync.
- `agentes/*.webp` — the 11 agent icons. **This folder must not be renamed
  `icons/`:** Apache reserves `/icons/` as its own alias, so files there return
  404 even when uploaded correctly. Verified in production.
- `blog/` — SEO articles (not linked from the landing nav).
- `llms.txt`, `robots.txt`, `sitemap.xml`, `favicon.*`, `apple-touch-icon.png`,
  `og-image.png` — SEO / crawler assets.

## Deploy

Static upload of the repository root — excluding `_fuente/` and `docs/` — to the
hosting document root. The paths that ship are `index.html`, `en/index.html`,
`pt/index.html`, `styles.css`, `main.js`, `contacto.php`, `agentes/`, and the SEO
assets.
