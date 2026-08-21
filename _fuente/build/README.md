# Pipeline de build — gruporegulatorio.cl

`saas.html` es la **única fuente de verdad** (en español). Las tres versiones
publicadas se generan desde ahí. **Nunca editar `index.html`, `en/` ni `pt/` a
mano** — se sobrescriben en cada build.

## Regenerar las 3 versiones

```bash
python3 build/build_i18n.py
```

Produce:

| Archivo         | Idioma     | URL publicada                        |
|-----------------|------------|--------------------------------------|
| `index.html`    | Español    | https://regulatoria.gruporegulatorio.cl/     |
| `en/index.html` | English    | https://regulatoria.gruporegulatorio.cl/en/  |
| `pt/index.html` | Português  | https://regulatoria.gruporegulatorio.cl/pt/  |

Cada una lleva su `canonical`, los cuatro `hreflang` recíprocos (es / en / pt-BR
/ x-default), `og:locale` y el JSON-LD traducido e `inLanguage` correcto.

## Archivos

- **`build_i18n.py`** — generador. Traduce con anclas (`>texto<`,
  `attr="texto"`, `clave:"texto"`) para que un string corto como *Activo* no se
  sustituya dentro de otra palabra. El JSON-LD se traduce aparte, recorriendo el
  objeto: sus anclas son `"clave":"valor"` y no las capturan las reglas del HTML.
- **`dict_i18n.py`** — diccionario ES → (EN, PT). No traduce siglas (SAG, ANVISA,
  GLP, OECD…), nombres de agentes, códigos ni productos. `LMR` → *MRL* en inglés
  y se mantiene en portugués; `FDS` → *SDS* / *FISPQ*.
- **`sprite.py`** — genera el sprite de los 15 iconos 3D. Al cambiarlo hay que
  reinyectarlo en `saas.html` y volver a construir.
- **`extract.py`** — lista los strings traducibles de `saas.html`. Útil tras
  añadir contenido nuevo, para ver qué falta en el diccionario.

## Al añadir texto nuevo a `saas.html`

1. `python3 build/extract.py --json > /tmp/strings.json`
2. Añadir las entradas que falten a `dict_i18n.py`.
3. `python3 build/build_i18n.py`
4. Comprobar que ninguna versión quedó con castellano residual.

## Publicar

Suben cuatro rutas, no una: `index.html`, `en/index.html`, `pt/index.html` y los
archivos SEO (`robots.txt`, `sitemap.xml`, `og-image.png`). Ver
`deploy-gruporegulatorio-ftps` en memoria — se usa **lftp**, nunca `curl -T`.

## Por qué los iconos viven en `/agentes/` y no en `/icons/`

Apache reserva `/icons/` como alias propio (lo usa para los iconos del listado
de directorios), así que esa ruta **nunca llega al document root**: los archivos
se suben bien por FTP y aun así el servidor devuelve 404. Comprobado en
producción — un `.png` dentro de `/icons/` daba 404 y el mismo archivo en
`/agentes/` daba 200. No renombrar esa carpeta de vuelta.
