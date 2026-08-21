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
index.html          Spanish   (root)      https://regulatoria.gruporegulatorio.cl/
en/index.html       English                https://regulatoria.gruporegulatorio.cl/en/
pt/index.html       Português              https://regulatoria.gruporegulatorio.cl/pt/
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

- `contacto.php` — demo-form receiver, **currently dormant**. Amplify serves the
  site as static files and does not execute PHP, so `amplify.yml` keeps this file
  out of the published artifact (served statically it would leak its own source)
  and the form in `main.js` opens a `mailto:` to info@gruporegulatorio.cl
  instead of posting here. Its `$_POST` field names (`nombre`, `cargo`,
  `empresa`, `email`, `website`) still match what the form collects, so the file
  works as-is the day the site moves back to a host with PHP.
- `agentes/*.webp` — the 11 agent icons. **This folder must not be renamed
  `icons/`:** Apache reserves `/icons/` as its own alias, so files there return
  404 even when uploaded correctly. Verified in production.
- `blog/` — SEO articles (not linked from the landing nav).
- `llms.txt`, `robots.txt`, `sitemap.xml`, `favicon.*`, `apple-touch-icon.png`,
  `og-image.png` — SEO / crawler assets.

## Deploy

AWS Amplify Hosting, app `regulatoria-landing` (`dw620j818cy6b`, region
`sa-east-1`, account 382975714696), serving
https://regulatoria.gruporegulatorio.cl. The app is connected to this repo:
**every push to `main` deploys itself** — there is nothing to upload by hand.

`amplify.yml` is the build spec. Nothing is compiled: `index.html`, `en/` and
`pt/` are the committed output of `build_i18n.py`, so the build only copies the
repo into `dist/` minus `_fuente/`, `docs/`, `contacto.php` and `CLAUDE.md`.
Regenerate the pages locally and commit them — the build will not run
`build_i18n.py` for you.

The apex and `www` are a separate Amplify app (`gruporegulatorio-landing`,
`d2liqgsvfy7ywo`) whose only job is a 301 to `regulatoria.gruporegulatorio.cl`.
