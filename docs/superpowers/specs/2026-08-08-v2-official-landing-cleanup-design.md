# Design — Promote v2 to the official RegulatorIA landing

Date: 2026-08-08
Status: Approved (pending spec review)

## Goal

Make the trilingual `v2/` site the single official landing at the repository
root, delete the legacy one-page site, and leave the codebase clean and
modular: CSS and behavioral JS extracted to their own files, all code comments
and identifiers in English, and a `CLAUDE.md` that orients any reader.

## Context (current state)

- Repo root today holds the **legacy** one-page `index.html` (~57 KB, GSAP agent
  diagram), `blog/` (6 SEO articles), GSAP skill packs under `.agents/` and
  `.claude/skills`, and `skills-lock.json`.
- `v2/` is the newer **trilingual** (ES/EN/PT) site — the last version published
  in production (Ferozo hosting). It is the keeper.
- `v2/` is built from a single source of truth: `_fuente/saas.html` (Spanish,
  ~1981 lines, ~193 KB) with **all CSS and JS inline**. `_fuente/build/build_i18n.py`
  generates `index.html`, `en/index.html`, `pt/index.html` via anchored text
  replacement, adding canonical/hreflang and a translated JSON-LD graph.
- Supporting build files: `dict_i18n.py` (ES→EN/PT dictionary), `sprite.py`
  (3D icon sprite), `extract.py` (lists translatable strings). Backend:
  `contacto.php`. Assets: `agentes/*.webp` (11 icons — the folder must NOT be
  named `icons/`, Apache reserves that path and returns 404).

### Known issues in the current build

- `build_i18n.py` hardcodes `ROOT = '/Users/cvrussu1/.../regulatoria-landing'`
  and `SRC = ROOT/saas.html`, but the source actually lives in `_fuente/`. The
  script does not run as-is against this layout and must be fixed.
- All comments and several Python function names are in Spanish (`traducir`,
  `construir`, `selector`, `recorrer`, `reapuntar`).

## Decisions (agreed with user)

1. **Modularization:** extract CSS and behavioral JS to standalone shared files;
   keep the static-output + Python i18n build. No framework migration.
2. **Legacy content:** delete the root `index.html`, `.agents/`, `.claude/skills`,
   `skills-lock.json`. Keep `blog/` for its SEO value. Move `v2/` to the root.
3. **Language:** all code comments **and identifiers** (CSS/JS/Python) in English.
4. Delete `LEEME.txt`. Do **not** create a `README.md`.
5. `CLAUDE.md` is descriptive, not prescriptive: it tells the reader to read the
   whole repo to understand it, and documents what RegulatorIA is, the
   source-of-truth + i18n build architecture, how to regenerate, and how it
   deploys. It does **not** carry a "never edit the generated files" rule.

## Target repository structure

```
/                     (repo root = document root)
  index.html          generated (ES)
  en/index.html       generated
  pt/index.html       generated
  styles.css          NEW — CSS extracted from saas.html, shared by all 3 langs
  main.js             NEW — behavioral JS extracted, shared by all 3 langs
  contacto.php
  agentes/*.webp
  favicon.*, apple-touch-icon.png, og-image.png
  llms.txt, robots.txt, sitemap.xml
  blog/…              kept
  _fuente/
    saas.html         source of truth (ES): HTML + inline translatable data only
    build/
      build_i18n.py
      dict_i18n.py
      sprite.py
      extract.py
  CLAUDE.md           NEW
  docs/superpowers/specs/…   this spec
```

Deleted: root legacy `index.html`, `.agents/`, `.claude/skills`, `skills-lock.json`,
`v2/LEEME.txt`, `v2/.DS_Store`.

## Component design

### 1. `styles.css` (extracted, shared)

- Move the entire `<style>` block (saas.html lines 44–652) to `/styles.css`.
- `saas.html` references it with an absolute path: `<link rel="stylesheet" href="/styles.css">`
  so all three languages (root, `/en/`, `/pt/`) resolve the same file.
- The `.lang-switch` CSS that `build_i18n.py` injects today (`CSS_LANG`) is
  **identical across languages**, so it moves permanently into `styles.css` and
  the injection step is removed from the build.

### 2. `main.js` (extracted behavior, shared)

- Move the behavioral scripts to `/main.js`, referenced with `<script src="/main.js" defer></script>`:
  - mobile nav close-on-click (saas.html 676–681)
  - GSAP safety-net reveal (1667–1675)
  - the main GSAP block (1676–1979): dashboard panel switching, lazy YouTube
    embeds, hero mockup auto-demo, single-open FAQ, hero agent orbit, particles,
    scroll animations, contact-form handler.
- GSAP CDN `<script>` tags stay in the HTML `<head>`/pre-body as today; `main.js`
  keeps its `typeof gsap === 'undefined'` guard.

### 3. Translatable data stays inline (the critical constraint)

The i18n build only rewrites `saas.html`. Any translatable string moved into the
shared `main.js` would stop being translated and regress EN/PT. Therefore the
**data** is separated from the **behavior**:

- The two translatable data objects stay inline in `saas.html`, each in its own
  small `<script>` exposing a global (e.g. `window.__ORBIT_CARDS`, `window.__AGENTS`):
  - the hero orbit `FICHA` object (anchors `fase:'…'`, `rol:'…'`, `desc:'…'`, `dato:'…'`)
  - the agents object carrying `name:"…"`, `phase:"…"`, `desc:"…"`
- `main.js` reads these globals instead of defining them.
- The build's existing anchor regexes (`(fase|rol|desc|dato):'…'` and
  `(name|phase|desc):"…"`) keep matching unchanged, so translation still works.
- Identifiers inside these inline objects that are **not** visible copy (the
  `f:'pre'` phase key, DOM `data-hp` keys) stay as-is to avoid touching build
  anchors; visible-copy values remain the translated strings.

### 4. `build_i18n.py` fixes

- Replace the hardcoded `ROOT` with a repo-relative path derived from the
  script's own location (`__file__` → repo root two levels up).
- Point `SRC` at `_fuente/saas.html`; keep outputs at root, `en/`, `pt/`.
- Remove the now-unneeded `CSS_LANG` injection (moved to `styles.css`).
- Rename Spanish functions/vars to English (`translate`, `build`, `language_selector`,
  `walk`, `retarget`, etc.), comments to English, preserving each production
  lesson (Apache `/icons/`, CTA must not wrap, JSON-LD `@id` retargeting).
- Verify output is byte-reasonable and no residual Spanish leaks into EN/PT.

### 5. Comment & identifier cleanup

- Translate every remaining comment (CSS, JS, Python) to English, keeping the
  lesson each documents. Drop redundant/obvious comments and any dead code.
- Rename Spanish identifiers in JS (`orbita`, `panel`, `campo`, `puntos`, `nodos`,
  `FICHA` → `orbit`, `cards`, `fields`, `dots`, `nodes`, `ORBIT_CARDS`, etc.).

### 6. `CLAUDE.md`

Descriptive orientation for future agents/readers. Contents:
- What RegulatorIA is (AI-native regulatory platform for agrochemical
  registration in Chile/LATAM; 10 specialized agents plus an orchestrator;
  HITL validation). Confirm the exact count against the source before writing.
- "To understand the project, read the whole repo." (no never-edit rule)
- Architecture: `_fuente/saas.html` is the source; `styles.css` + `main.js` are
  shared; `build/build_i18n.py` generates the ES/EN/PT `index.html` files.
- How to regenerate: `python3 _fuente/build/build_i18n.py`.
- Why `/agentes/` and not `/icons/` (Apache 404).
- Deploy: static upload of the root (excluding `_fuente/` and `docs/`) to the
  hosting document root.

## Verification

- Run `python3 _fuente/build/build_i18n.py`; confirm it regenerates all three
  `index.html` files without error and reports translation counts.
- Diff the regenerated ES `index.html` rendering against the pre-change version:
  same sections, same visible copy, external `styles.css`/`main.js` linked.
- Spot-check EN and PT for residual Spanish in agent cards and orbit fichas
  (the data that moved into inline globals).
- Open the ES page locally and confirm: nav, orbit hover, dashboard auto-demo,
  FAQ single-open, lazy video embeds, and particles all still work.

## Out of scope

- No visual/content redesign of the landing.
- No framework migration, bundler, or minification pipeline.
- No changes to `contacto.php` behavior beyond comment/identifier language.
- No changes to the blog articles' content.
```
