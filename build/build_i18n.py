# -*- coding: utf-8 -*-
"""Genera las 3 versiones del sitio desde saas.html (fuente única en español).

    saas.html  ──>  index.html   (es, raíz)
                    en/index.html
                    pt/index.html

Los reemplazos van ANCLADOS (>texto<  ·  attr="texto"  ·  clave:"texto") para que
un string corto como "Activo" no se sustituya dentro de otra palabra.
"""
import io, os, re, sys, json, html as H

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dict_i18n import T

ROOT = '/Users/cvrussu1/Documents/GitHub/regulatoria-landing'
SRC = os.path.join(ROOT, 'saas.html')
BASE = 'https://www.gruporegulatorio.cl/'

LANGS = {
    # `corto` va visible en la nav (los nombres completos ocupaban 266px y
    # partían el botón de CTA en dos líneas); `nombre` queda en el title/aria.
    'es': dict(code='es', hreflang='es', path='', locale='es_CL',
               nombre='Español', corto='ES'),
    'en': dict(code='en', hreflang='en', path='en/', locale='en_US',
               nombre='English', corto='EN'),
    'pt': dict(code='pt', hreflang='pt-BR', path='pt/', locale='pt_BR',
               nombre='Português', corto='PT'),
}
IDX = {'en': 0, 'pt': 1}   # posición en la tupla del diccionario

UI = {  # textos del propio selector
    'es': dict(aria='Seleccionar idioma', faq='FAQ'),
    'en': dict(aria='Select language', faq='FAQ'),
    'pt': dict(aria='Selecionar idioma', faq='FAQ'),
}


def traducir(texto_html, lang, contador):
    """Aplica el diccionario sobre el HTML completo, con anclas."""
    if lang == 'es':
        return texto_html
    i = IDX[lang]
    # los strings largos primero: evita que uno corto rompa a uno que lo contiene
    for es in sorted(T, key=len, reverse=True):
        dest = T[es][i]
        if not dest or dest == es:
            continue
        esc = re.escape(es)
        antes = texto_html
        # 1. nodo de texto entre etiquetas
        texto_html = re.sub(r'(>\s*)' + esc + r'(\s*<)',
                            lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                            texto_html)
        # 2. atributos traducibles
        texto_html = re.sub(r'((?:placeholder|aria-label|alt|title|data-label|data-title|content)=")'
                            + esc + r'(")',
                            lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                            texto_html)
        # 3. strings del objeto agents del JS  ->  clave:"texto"
        texto_html = re.sub(r'((?:name|phase|desc):")' + esc + r'(")',
                            lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                            texto_html)
        # 3b. fichas del panel de la órbita del hero -> clave:'texto'
        #     (van con comillas simples, la regla anterior no las alcanzaba)
        texto_html = re.sub(r"((?:fase|rol|desc|dato):')" + esc + r"(')",
                            lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                            texto_html)
        # 4. <title>
        texto_html = re.sub(r'(<title>)' + esc + r'(</title>)',
                            lambda m: m.group(1) + dest.replace('\\', '\\\\') + m.group(2),
                            texto_html)
        if texto_html != antes:
            contador[0] += 1
    return texto_html


def selector(lang_actual):
    """Selector de idioma para la barra de navegación."""
    opciones = ''
    for code, cfg in LANGS.items():
        activo = ' aria-current="true"' if code == lang_actual else ''
        # relativo a la raíz: funciona igual en producción y en el preview local.
        # (los <link hreflang> del head sí van absolutos, Google los exige así)
        href = '/' + cfg['path']
        opciones += (f'<a href="{href}" hreflang="{cfg["hreflang"]}" lang="{cfg["code"]}"'
                     f' title="{cfg["nombre"]}" aria-label="{cfg["nombre"]}"'
                     f'{activo}>{cfg["corto"]}</a>')
    # Sin icono de globo: ES/EN/PT ya se entiende solo, y esos ~26px eran parte
    # de por qué la barra quedaba apretada contra el logo.
    return (f'<div class="lang-switch" role="group" aria-label="{UI[lang_actual]["aria"]}">'
            f'{opciones}</div>')


CSS_LANG = '''
/* ══ Selector de idioma ══ */
.lang-switch{display:flex;align-items:center;gap:2px;padding:3px;
  background:rgba(43,90,20,.05);border:1px solid var(--border);border-radius:50px}
.lang-switch a{font-size:.7rem;font-weight:800;letter-spacing:.03em;color:var(--text-dim);
  padding:5px 9px;border-radius:50px;transition:background .25s,color .25s;white-space:nowrap}
.lang-switch a:hover{color:var(--green-dark);background:rgba(90,173,45,.1)}
.lang-switch a[aria-current="true"]{background:linear-gradient(135deg,var(--green-dark),var(--green));
  color:#fff}
/* la nav lleva 8 enlaces + selector + CTA: apretamos el gap antes de que rompa.
   El CTA nunca debe partirse — en PT "Solicitar Demo" caía en dos líneas. */
.nav-cta{white-space:nowrap}
.nav-links>a{white-space:nowrap}
@media(max-width:1100px){
  .lang-switch{margin:10px auto 0;justify-content:center}
  .lang-switch a{padding:8px 15px;font-size:.82rem}
}
'''


def construir(lang):
    cfg = LANGS[lang]
    h = open(SRC, encoding='utf-8').read()
    n = [0]

    # ── 1. traducir ──
    h = traducir(h, lang, n)

    # ── 2. atributo lang del documento ──
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

    # ── 4. JSON-LD: url, inLanguage y TEXTO traducido ──
    # Ojo: el paso 1 no toca el JSON-LD (sus anclas son  "clave":"valor",  no
    # >texto< ni clave:"texto"). Hay que traducirlo recorriendo el objeto, o el
    # schema quedaría en castellano contradiciendo el contenido visible —
    # justo lo que Google penaliza en los rich results de FAQ.
    def tr_valor(v):
        if lang == 'es' or not isinstance(v, str):
            return v
        if v in T and T[v][IDX[lang]]:
            return T[v][IDX[lang]]
        return v

    def recorrer(o):
        if isinstance(o, dict):
            return {k: (recorrer(v) if k not in ('@type', '@id', '@context') else v)
                    for k, v in o.items()}
        if isinstance(o, list):
            return [recorrer(x) for x in o]
        return tr_valor(o)

    def reapuntar(o):
        """Los @id y las url del schema se reescriben por versión.

        Sin esto las tres páginas declaraban el MISMO WebPage y el mismo
        breadcrumb (todos con la raíz española), así que para Google /en/ y /pt/
        no tenían entidad propia. Organization y WebSite sí son globales: su @id
        se deja anclado a la raíz para que las tres versiones apunten a la misma
        empresa y al mismo sitio.
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

    def fix_ld(m):
        obj = reapuntar(recorrer(json.loads(m.group(1))))
        obj['inLanguage'] = cfg['hreflang']
        return ('<script type="application/ld+json">'
                + json.dumps(obj, ensure_ascii=False, separators=(',', ':'))
                + '</script>')

    h = re.sub(r'<script type="application/ld\+json">(.*?)</script>', fix_ld, h, flags=re.S)

    # ── 5. CSS + selector en la nav ──
    h = h.replace('/* ══ FAQ ══ */', CSS_LANG + '\n/* ══ FAQ ══ */', 1)
    marca = '      <a href="#demo" class="nav-cta">'
    assert h.count(marca) == 1, 'ancla del nav-cta no encontrada'
    h = h.replace(marca, '      ' + selector(lang) + '\n' + marca, 1)

    # ── 6. las anclas internas deben quedar relativas a la versión ──
    #     (el selector usa URLs absolutas, el resto de la nav son #ancla: no cambian)

    destino = os.path.join(ROOT, cfg['path'], 'index.html')
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    open(destino, 'w', encoding='utf-8').write(h)
    return destino, n[0], len(h)


if __name__ == '__main__':
    print(f'Diccionario: {len(T)} entradas\n')
    for lang in ('es', 'en', 'pt'):
        ruta, aplicadas, tam = construir(lang)
        rel = os.path.relpath(ruta, ROOT)
        extra = f'{aplicadas} traducciones' if lang != 'es' else 'fuente (sin traducir)'
        print(f'  {lang}  ->  {rel:<16} {tam:>7,} bytes   {extra}')
