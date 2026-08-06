# -*- coding: utf-8 -*-
"""Extrae los strings traducibles de saas.html.

Estrategia de reemplazo (la usa también build_i18n.py):
  - texto entre etiquetas  ->  se ancla como  >TEXTO<
  - atributos              ->  se ancla como  attr="TEXTO"
  - strings en el JS de agentes -> se ancla como  clave:"TEXTO"
Anclar evita que un string corto ("Activo") se reemplace dentro de otra palabra.
"""
import io, re, sys, json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
SRC = '/Users/cvrussu1/Documents/GitHub/regulatoria-landing/saas.html'
h = open(SRC, encoding='utf-8').read()

head, body = h.split('<body>', 1)

# ── zonas que NO se traducen literalmente (se tratan aparte) ──
def blank(m):
    return ' ' * len(m.group(0))

scrub = re.sub(r'<script.*?</script>', blank, body, flags=re.S)
scrub = re.sub(r'<style.*?</style>', blank, scrub, flags=re.S)
scrub = re.sub(r'<svg.*?</svg>', blank, scrub, flags=re.S)
scrub = re.sub(r'<!--.*?-->', blank, scrub, flags=re.S)

# ── 1. texto entre etiquetas ──
SKIP = re.compile(r'^(?:[\s·—→←\-–|/•©+%]*|\d[\d\s.,%/–—-]*|[A-Z0-9]{2,10})$')
textos = []
for m in re.finditer(r'>([^<>]+)<', scrub):
    t = m.group(1).strip()
    if not t or SKIP.match(t):
        continue
    if t.startswith('&') and t.endswith(';'):
        continue
    textos.append(t)

# ── 2. atributos ──
attrs = []
for m in re.finditer(r'(placeholder|aria-label|alt|title|data-label|data-title)="([^"]{3,})"', scrub):
    attrs.append((m.group(1), m.group(2)))

# ── 3. datos de agentes en JS ──
js_agents = re.search(r'var agents=\{(.*?)\n\};', body, re.S)
js_strings = []
if js_agents:
    for m in re.finditer(r'(name|phase|desc):"([^"]+)"', js_agents.group(1)):
        js_strings.append((m.group(1), m.group(2)))

# ── 4. <title> y meta del head ──
meta = []
for pat, key in [(r'<title>([^<]+)</title>', 'title'),
                 (r'<meta name="description" content="([^"]+)"', 'description'),
                 (r'<meta property="og:title" content="([^"]+)"', 'og:title'),
                 (r'<meta property="og:image:alt" content="([^"]+)"', 'og:image:alt')]:
    mm = re.search(pat, head)
    if mm:
        meta.append((key, mm.group(1)))

uniq_txt = sorted(set(textos), key=len, reverse=True)
uniq_att = sorted(set(a[1] for a in attrs), key=len, reverse=True)
uniq_js = sorted(set(s[1] for s in js_strings), key=len, reverse=True)

out = {'texto': uniq_txt, 'atributos': uniq_att, 'js_agentes': uniq_js,
       'meta': dict(meta)}

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--json':
        print(json.dumps(out, ensure_ascii=False, indent=1))
    else:
        print(f'texto único      : {len(uniq_txt)}')
        print(f'atributos únicos : {len(uniq_att)}')
        print(f'js agentes únicos: {len(uniq_js)}')
        print(f'meta             : {len(meta)}')
        print(f'palabras totales : {sum(len(t.split()) for t in uniq_txt)}')
