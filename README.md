# webvector — Sitio web de Estudio Vector

Sitio web oficial de **Estudio Vector**, agencia de marketing digital, publicidad y capacitaciones en Honduras.

## Características

- **HTML estático puro** — sin frameworks ni build step; carga instantánea.
- **Optimizado para buscadores de IA (AEO/GEO)**:
  - Datos estructurados JSON-LD (schema.org): `ProfessionalService`, `Service`, `FAQPage`, `EducationalOrganization`.
  - [`llms.txt`](llms.txt) — resumen del sitio en formato legible por LLMs.
  - [`robots.txt`](robots.txt) — permite explícitamente crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.).
  - Contenido en formato pregunta-respuesta que los asistentes de IA pueden citar directamente.
- **SEO tradicional**: sitemap.xml, canonicals, Open Graph, meta descriptions, HTML semántico.

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Inicio: presentación, servicios y FAQ |
| `servicios.html` | Detalle de servicios de marketing y publicidad |
| `capacitaciones.html` | Talleres y programas de formación |
| `nosotros.html` | Misión y forma de trabajo |
| `contacto.html` | Información de contacto |

## Publicación

El sitio está pensado para servirse con **GitHub Pages** (rama `main`, raíz). Al cambiar de dominio, actualizar las URLs absolutas en: canonicals de cada página, `sitemap.xml`, `robots.txt` y `llms.txt`.

## Contacto

Estudio Vector · estudiovectorhn@gmail.com · Honduras
