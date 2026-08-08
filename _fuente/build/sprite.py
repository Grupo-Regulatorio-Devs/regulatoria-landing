# -*- coding: utf-8 -*-
"""3D SVG sprite for the RegulatorIA agents.

Recipe per icon (consistent 3D look, inherits the brand/phase color):
  1. body   -> fill="currentColor"        (brand or phase color)
  2. gloss  -> same path with url(#agGloss): white on top, dark below
  3. detail -> white, the glyph that identifies the agent
+ a CSS drop-shadow on .agi for depth.
"""

GLOSS = 'url(#agGloss)'


def sym(name, body, detail=''):
    """body: list of open tags using {F} as the fill/stroke placeholder."""
    fill = ''.join(p.replace('{F}', 'currentColor') for p in body)
    gloss = ''.join(p.replace('{F}', GLOSS) for p in body)
    return f'<symbol id="ic-{name}" viewBox="0 0 48 48">{fill}{gloss}{detail}</symbol>'


ICONS = []

# COMPASS — compass
ICONS.append(sym('compass',
    ['<circle cx="24" cy="24" r="18" fill="{F}"/>'],
    '<circle cx="24" cy="24" r="13.2" fill="#0F1A0A" opacity=".14"/>'
    '<path d="M33.4 14.6 27.1 27.1 14.6 33.4 20.9 20.9Z" fill="#fff" opacity=".95"/>'
    '<path d="M33.4 14.6 27.1 27.1 24 24Z" fill="#fff" opacity=".55"/>'
    '<circle cx="24" cy="24" r="1.9" fill="#0F1A0A" opacity=".35"/>'))

# PREDICT — lab flask
ICONS.append(sym('predict',
    ['<path d="M19.4 6h9.2v11.4l8.7 17.3A5.2 5.2 0 0 1 32.6 42.4H15.4a5.2 5.2 0 0 1-4.7-7.7L19.4 17.4Z" fill="{F}"/>',
     '<rect x="16.6" y="3.2" width="14.8" height="4.8" rx="2.4" fill="{F}"/>'],
    '<path d="M13.4 30.8h21.2l2.6 5.2A3.4 3.4 0 0 1 34.2 41H13.8a3.4 3.4 0 0 1-3-5Z" fill="#fff" opacity=".9"/>'
    '<circle cx="20" cy="35.4" r="1.9" fill="currentColor" opacity=".5"/>'
    '<circle cx="27.4" cy="37.4" r="1.4" fill="currentColor" opacity=".5"/>'))

# GENESIS — DNA helix (strands cross at 1/4 and 3/4; the rungs sit at the wide
# points: top, middle and bottom)
ICONS.append(sym('genesis',
    ['<path d="M16 5C16 14 32 16 32 24C32 32 16 34 16 43" fill="none" stroke="{F}" stroke-width="5" stroke-linecap="round"/>',
     '<path d="M32 5C32 14 16 16 16 24C16 32 32 34 32 43" fill="none" stroke="{F}" stroke-width="5" stroke-linecap="round"/>'],
    '<path d="M17.6 9.4h12.8M17.6 24h12.8M17.6 38.6h12.8" stroke="#fff" stroke-width="2.9" stroke-linecap="round" opacity=".92"/>'))

# SCOUT — magnifier / radar
ICONS.append(sym('scout',
    ['<path d="M31.4 36.4a3.6 3.6 0 0 1 5.1-5.1l7.5 7.5a3.6 3.6 0 0 1-5.1 5.1Z" fill="{F}"/>',
     '<circle cx="20.4" cy="20.4" r="15.4" fill="{F}"/>'],
    '<circle cx="20.4" cy="20.4" r="9.6" fill="#fff" opacity=".92"/>'
    '<circle cx="20.4" cy="20.4" r="4.1" fill="currentColor" opacity=".5"/>'))

# BINDER — dossier folder
ICONS.append(sym('binder',
    ['<path d="M5 12.6A4.6 4.6 0 0 1 9.6 8h9.2a3 3 0 0 1 2.4 1.2l2.6 3.6a3 3 0 0 0 2.4 1.2h12.2A4.6 4.6 0 0 1 43 18.6v16.8A4.6 4.6 0 0 1 38.4 40H9.6A4.6 4.6 0 0 1 5 35.4Z" fill="{F}"/>'],
    '<rect x="14" y="19.4" width="20" height="13.2" rx="2.4" fill="#fff" opacity=".92"/>'
    '<path d="M17.6 23.6h12.8M17.6 27.8h9" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" opacity=".5"/>'))

# AUDITOR — shield with check
ICONS.append(sym('auditor',
    ['<path d="M24 4.4 40.6 10.4v13.1c0 10.4-7.3 17.5-16.6 20.1-9.3-2.6-16.6-9.7-16.6-20.1V10.4Z" fill="{F}"/>'],
    '<path d="M16.4 24.2 21.6 29.4 32 19" fill="none" stroke="#fff" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>'))

# DEFENDER — scales (pans as bowls hanging from the beam, not triangles: at
# 15px the triangles read like a "T")
ICONS.append(sym('defender',
    ['<circle cx="24" cy="7.6" r="3.8" fill="{F}"/>',
     '<rect x="21.5" y="9" width="5" height="28" rx="2.5" fill="{F}"/>',
     '<rect x="13" y="35.6" width="22" height="5.2" rx="2.6" fill="{F}"/>',
     '<rect x="6.5" y="12" width="35" height="4.6" rx="2.3" fill="{F}"/>'],
    '<path d="M5.4 19.4h13.2a6.6 6.6 0 0 1-13.2 0Z" fill="#fff" opacity=".92"/>'
    '<path d="M29.4 19.4h13.2a6.6 6.6 0 0 1-13.2 0Z" fill="#fff" opacity=".92"/>'))

# SCRIBE — label / tag
ICONS.append(sym('scribe',
    ['<path d="M26.6 4H10.4A6.4 6.4 0 0 0 4 10.4v16.2a5 5 0 0 0 1.5 3.6l16 16a5 5 0 0 0 7.1 0l13.4-13.4a5 5 0 0 0 0-7.1l-16-16A5 5 0 0 0 26.6 4Z" fill="{F}"/>'],
    '<circle cx="14.6" cy="14.6" r="4.5" fill="#fff" opacity=".94"/>'))

# BRIDGE — globe / multi-country
ICONS.append(sym('bridge',
    ['<circle cx="24" cy="24" r="18" fill="{F}"/>'],
    '<ellipse cx="24" cy="24" rx="8.3" ry="18" fill="none" stroke="#fff" stroke-width="2.7" opacity=".92"/>'
    '<path d="M7.2 17.6h33.6M7.2 30.4h33.6" stroke="#fff" stroke-width="2.7" opacity=".92" stroke-linecap="round"/>'))

# GUARD — alert bell
ICONS.append(sym('guard',
    ['<path d="M24 3.4a3.4 3.4 0 0 1 3.4 3.4v1.6a13.6 13.6 0 0 1 10 13.1v7.6l3.5 5.4A2.2 2.2 0 0 1 39 38H9a2.2 2.2 0 0 1-1.9-3.5l3.5-5.4v-7.6a13.6 13.6 0 0 1 10-13.1V6.8A3.4 3.4 0 0 1 24 3.4Z" fill="{F}"/>',
     '<path d="M18.5 40.2h11a5.5 5.5 0 0 1-11 0Z" fill="{F}"/>'],
    '<path d="M17.6 21.8A6.6 6.6 0 0 1 24 15.2" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".88"/>'))

# ORCHESTRATOR — hub / central node
ICONS.append(sym('orq',
    ['<path d="M24 11.4v5.2M35.2 17.8l-4.5 2.6M35.2 30.2l-4.5-2.6M24 36.6v-5.2M12.8 30.2l4.5-2.6M12.8 17.8l4.5 2.6" stroke="{F}" stroke-width="2.7" stroke-linecap="round"/>',
     '<circle cx="24" cy="6.6" r="4.6" fill="{F}"/><circle cx="39.2" cy="15.3" r="4.6" fill="{F}"/>'
     '<circle cx="39.2" cy="32.7" r="4.6" fill="{F}"/><circle cx="24" cy="41.4" r="4.6" fill="{F}"/>'
     '<circle cx="8.8" cy="32.7" r="4.6" fill="{F}"/><circle cx="8.8" cy="15.3" r="4.6" fill="{F}"/>',
     '<circle cx="24" cy="24" r="8.6" fill="{F}"/>'],
    '<circle cx="24" cy="24" r="3.7" fill="#fff" opacity=".92"/>'))

# CHART — real-time dashboard
ICONS.append(sym('chart',
    ['<rect x="4" y="40.6" width="40" height="4.4" rx="2.2" fill="{F}"/>',
     '<rect x="8" y="25.6" width="8.4" height="15" rx="2.6" fill="{F}"/>',
     '<rect x="19.8" y="14.6" width="8.4" height="26" rx="2.6" fill="{F}"/>',
     '<rect x="31.6" y="20.6" width="8.4" height="20" rx="2.6" fill="{F}"/>']))

# BOT — agents working 24/7
ICONS.append(sym('bot',
    ['<circle cx="24" cy="4.8" r="3.4" fill="{F}"/>',
     '<rect x="21.8" y="5" width="4.4" height="9" rx="2.2" fill="{F}"/>',
     '<rect x="6.6" y="13.6" width="34.8" height="27.4" rx="8.4" fill="{F}"/>'],
    '<circle cx="17.4" cy="25.6" r="3.7" fill="#fff" opacity=".94"/>'
    '<circle cx="30.6" cy="25.6" r="3.7" fill="#fff" opacity=".94"/>'
    '<rect x="17" y="33" width="14" height="3.3" rx="1.65" fill="#fff" opacity=".78"/>'))

# LINK — integrations
ICONS.append(sym('link',
    ['<path d="M19.4 14.6 24.4 9.6a9.9 9.9 0 0 1 14 14l-5 5" fill="none" stroke="{F}" stroke-width="5.4" stroke-linecap="round"/>',
     '<path d="M28.6 33.4 23.6 38.4a9.9 9.9 0 0 1-14-14l5-5" fill="none" stroke="{F}" stroke-width="5.4" stroke-linecap="round"/>'],
    '<path d="M18.4 29.6 29.6 18.4" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".92"/>'))

# MAIL — filing with the authority (managed-service step 3)
ICONS.append(sym('mail',
    ['<rect x="4" y="9" width="40" height="30" rx="5.2" fill="{F}"/>'],
    '<path d="M8.4 15 24 26.6 39.6 15" fill="none" stroke="#fff" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round" opacity=".94"/>'))

SPRITE = (
    '<svg class="ag-sprite" aria-hidden="true" focusable="false" '
    'style="position:absolute;width:0;height:0;overflow:hidden" xmlns="http://www.w3.org/2000/svg">'
    '<defs>'
    '<linearGradient id="agGloss" x1="0" y1="0" x2="0" y2="1">'
    '<stop offset="0" stop-color="#ffffff" stop-opacity=".44"/>'
    '<stop offset=".42" stop-color="#ffffff" stop-opacity=".08"/>'
    '<stop offset="1" stop-color="#000000" stop-opacity=".22"/>'
    '</linearGradient>'
    '</defs>'
    + ''.join(ICONS) +
    '</svg>'
)

if __name__ == '__main__':
    import io, sys
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    print(SPRITE)
