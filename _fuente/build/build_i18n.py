# -*- coding: utf-8 -*-
"""Generate the three published versions from saas.html (single Spanish source).

    _fuente/saas.html  ──>  index.html      (es, root)
                            en/index.html
                            pt/index.html

Replacements are ANCHORED (>text<  ·  attr="text"  ·  key:"text"  ·  key:'text')
so a short string like "Activo" is never substituted inside a longer word. The
JSON-LD graph is translated separately by walking the object, because its anchors
are "key":"value" and the HTML rules above do not match them.
"""
import io, os, re, sys, json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dict_i18n import T

# Repo root is two levels above this build/ directory (_fuente/build/ -> repo).
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, '_fuente', 'saas.html')
BASE = 'https://www.gruporegulatorio.cl/'

LANGS = {
    # `short` shows in the nav (the full names were 266px wide and wrapped the
    # CTA button onto two lines); `name` stays in the title/aria attributes.
    'es': dict(code='es', hreflang='es', path='', locale='es_CL',
               name='Español', short='ES'),
    'en': dict(code='en', hreflang='en', path='en/', locale='en_US',
               name='English', short='EN'),
    'pt': dict(code='pt', hreflang='pt-BR', path='pt/', locale='pt_BR',
               name='Português', short='PT'),
}
IDX = {'en': 0, 'pt': 1}   # position in the dictionary tuple

# Aria label of the language switcher, per language.
SWITCHER_ARIA = {'es': 'Seleccionar idioma', 'en': 'Select language', 'pt': 'Selecionar idioma'}


def translate(html, lang, counter):
    """Apply the dictionary over the whole HTML, using anchors."""
    if lang == 'es':
        return html
    i = IDX[lang]
    # Longest strings first: prevents a short string from breaking a longer one
    # that contains it.
    for es in sorted(T, key=len, reverse=True):
        dest = T[es][i]
        if not dest or dest == es:
            continue
        esc = re.escape(es)
        before = html
        # 1. text node between tags
        html = re.sub(r'(>\s*)' + esc + r'(\s*<)',
                      lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                      html)
        # 2. translatable attributes
        html = re.sub(r'((?:placeholder|aria-label|alt|title|data-label|data-title|content)=")'
                      + esc + r'(")',
                      lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                      html)
        # 3. double-quoted JS object strings  ->  key:"text"
        html = re.sub(r'((?:name|phase|desc):")' + esc + r'(")',
                      lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                      html)
        # 3b. single-quoted orbit-card fields  ->  key:'text'
        #     (the rule above only reaches double quotes)
        html = re.sub(r"((?:fase|rol|desc|dato):')" + esc + r"(')",
                      lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                      html)
        # 4. <title>
        html = re.sub(r'(<title>)' + esc + r'(</title>)',
                      lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                      html)
        if html != before:
            counter[0] += 1
    return html


def language_selector(current_lang):
    """Language switcher markup for the navigation bar."""
    options = ''
    for code, cfg in LANGS.items():
        current = ' aria-current="true"' if code == current_lang else ''
        # Root-relative so it works the same in production and in local preview.
        # (the head's <link hreflang> tags stay absolute, Google requires that)
        href = '/' + cfg['path']
        options += (f'<a href="{href}" hreflang="{cfg["hreflang"]}" lang="{cfg["code"]}"'
                    f' title="{cfg["name"]}" aria-label="{cfg["name"]}"'
                    f'{current}>{cfg["short"]}</a>')
    # No globe icon: ES/EN/PT reads clearly on its own, and those ~26px were part
    # of why the bar felt cramped against the logo.
    return (f'<div class="lang-switch" role="group" aria-label="{SWITCHER_ARIA[current_lang]}">'
            f'{options}</div>')


def build(lang):
    cfg = LANGS[lang]
    h = open(SRC, encoding='utf-8').read()
    n = [0]

    # ── 1. translate ──
    h = translate(h, lang, n)

    # ── 2. document lang attribute ──
    h = h.replace('<html lang="es">', f'<html lang="{cfg["code"]}">', 1)

    # ── 3. canonical + hreflang + og:locale ──
    url = BASE + cfg['path']
    alts = ''.join(
        f'<link rel="alternate" hreflang="{c["hreflang"]}" href="{BASE + c["path"]}">'
        for c in LANGS.values())
    alts += f'<link rel="alternate" hreflang="x-default" href="{BASE}">'

    h = re.sub(r'<link rel="canonical" href="[^"]*">',
               f'<link rel="canonical" href="{url}">' + alts, h, count=1)
    h = re.sub(r'<meta property="og:url" content="[^"]*">',
               f'<meta property="og:url" content="{url}">', h, count=1)
    h = re.sub(r'<meta property="og:locale" content="[^"]*">',
               f'<meta property="og:locale" content="{cfg["locale"]}">', h, count=1)

    # ── 4. JSON-LD: url, inLanguage and TRANSLATED text ──
    # Step 1 does not touch the JSON-LD (its anchors are "key":"value", not
    # >text< or key:"text"). It must be translated by walking the object, or the
    # schema would stay in Spanish and contradict the visible content — exactly
    # what Google penalises in FAQ rich results.
    def translate_value(v):
        if lang == 'es' or not isinstance(v, str):
            return v
        if v in T and T[v][IDX[lang]]:
            return T[v][IDX[lang]]
        return v

    def walk(o):
        if isinstance(o, dict):
            return {k: (walk(v) if k not in ('@type', '@id', '@context') else v)
                    for k, v in o.items()}
        if isinstance(o, list):
            return [walk(x) for x in o]
        return translate_value(o)

    def retarget(o):
        """Per-version rewrite of the schema @id and url values.

        Without this the three pages declared the SAME WebPage and breadcrumb
        (all pointing at the Spanish root), so for Google /en/ and /pt/ had no
        entity of their own. Organization and WebSite are global: their @id is
        left anchored to the root so all three versions point at the same
        company and the same site.
        """
        t = o.get('@type')
        if t in ('WebPage', 'BreadcrumbList'):
            if '@id' in o:
                o['@id'] = o['@id'].replace(BASE + '#', url + '#')
            if 'url' in o:
                o['url'] = url
            for it in o.get('itemListElement', []):
                if it.get('item') == BASE:
                    it['item'] = url
        if t in ('Organization', 'SoftwareApplication'):
            o['url'] = url
        return o

    def fix_jsonld(m):
        obj = retarget(walk(json.loads(m.group(1))))
        obj['inLanguage'] = cfg['hreflang']
        return ('<script type="application/ld+json">'
                + json.dumps(obj, ensure_ascii=False, separators=(',', ':'))
                + '</script>')

    h = re.sub(r'<script type="application/ld\+json">(.*?)</script>', fix_jsonld, h, flags=re.S)

    # ── 5. inject the language switcher into the nav ──
    #     (the .lang-switch styles live permanently in styles.css)
    anchor = '      <a href="#demo" class="nav-cta">'
    assert h.count(anchor) == 1, 'nav-cta anchor not found'
    h = h.replace(anchor, '      ' + language_selector(lang) + '\n' + anchor, 1)

    dest = os.path.join(ROOT, cfg['path'], 'index.html')
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    open(dest, 'w', encoding='utf-8').write(h)
    return dest, n[0], len(h)


if __name__ == '__main__':
    print(f'Dictionary: {len(T)} entries\n')
    for lang in ('es', 'en', 'pt'):
        path, applied, size = build(lang)
        rel = os.path.relpath(path, ROOT)
        extra = f'{applied} translations' if lang != 'es' else 'source (untranslated)'
        print(f'  {lang}  ->  {rel:<16} {size:>7,} bytes   {extra}')
