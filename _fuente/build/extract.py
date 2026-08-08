# -*- coding: utf-8 -*-
"""List the translatable strings in saas.html.

Replacement strategy (shared with build_i18n.py):
  - text between tags       ->  anchored as  >TEXT<
  - attributes              ->  anchored as  attr="TEXT"
  - orbit-card JS fields    ->  anchored as  key:'TEXT'
Anchoring stops a short string ("Activo") from being replaced inside a longer word.
"""
import io, os, re, sys, json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, '_fuente', 'saas.html')
h = open(SRC, encoding='utf-8').read()

head, body = h.split('<body>', 1)

# ── zones that are NOT translated literally (handled separately) ──
def blank(m):
    return ' ' * len(m.group(0))

scrub = re.sub(r'<script.*?</script>', blank, body, flags=re.S)
scrub = re.sub(r'<style.*?</style>', blank, scrub, flags=re.S)
scrub = re.sub(r'<svg.*?</svg>', blank, scrub, flags=re.S)
scrub = re.sub(r'<!--.*?-->', blank, scrub, flags=re.S)

# ── 1. text between tags ──
SKIP = re.compile(r'^(?:[\s·—→←\-–|/•©+%]*|\d[\d\s.,%/–—-]*|[A-Z0-9]{2,10})$')
texts = []
for m in re.finditer(r'>([^<>]+)<', scrub):
    t = m.group(1).strip()
    if not t or SKIP.match(t):
        continue
    if t.startswith('&') and t.endswith(';'):
        continue
    texts.append(t)

# ── 2. attributes ──
attrs = []
for m in re.finditer(r'(placeholder|aria-label|alt|title|data-label|data-title)="([^"]{3,})"', scrub):
    attrs.append((m.group(1), m.group(2)))

# ── 3. orbit-card fields in the inline JS data ──
js_data = []
for m in re.finditer(r"(fase|rol|desc|dato):'([^']+)'", body):
    js_data.append((m.group(1), m.group(2)))

# ── 4. <title> and head meta ──
meta = []
for pat, key in [(r'<title>([^<]+)</title>', 'title'),
                 (r'<meta name="description" content="([^"]+)"', 'description'),
                 (r'<meta property="og:title" content="([^"]+)"', 'og:title'),
                 (r'<meta property="og:image:alt" content="([^"]+)"', 'og:image:alt')]:
    mm = re.search(pat, head)
    if mm:
        meta.append((key, mm.group(1)))

uniq_txt = sorted(set(texts), key=len, reverse=True)
uniq_att = sorted(set(a[1] for a in attrs), key=len, reverse=True)
uniq_js = sorted(set(s[1] for s in js_data), key=len, reverse=True)

out = {'text': uniq_txt, 'attributes': uniq_att, 'js_data': uniq_js,
       'meta': dict(meta)}

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--json':
        print(json.dumps(out, ensure_ascii=False, indent=1))
    else:
        print(f'unique text      : {len(uniq_txt)}')
        print(f'unique attributes: {len(uniq_att)}')
        print(f'unique js fields : {len(uniq_js)}')
        print(f'meta             : {len(meta)}')
        print(f'total words      : {sum(len(t.split()) for t in uniq_txt)}')
