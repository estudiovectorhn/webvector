# Estudio Vector · estudiovector.com

Sitio de Estudio Vector (Vector Marketing): portafolio de la agencia, talleres del mes y servicios de marketing digital.
HTML estático pre-renderizado, optimizado para buscadores y asistentes de IA (ChatGPT, Claude, Gemini, Perplexity).

## Probar en tu computadora

Necesitas [Node.js](https://nodejs.org) 18 o superior.

```bash
node build.js     # genera las páginas a partir de src/
node server.js    # abre http://localhost:3000
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Talleres (fechas, precios, contenido, apps que se usan: campo `tools`; cámaras u otro equipo en PNG sin fondo: campo `gear` con imágenes en `img/gear/`) | `src/talleres.json` |
| Iconos de las apps (Meta, Facebook, Instagram, WhatsApp, ChatGPT, Claude, Canva, CapCut, TikTok, Zoom, Supabase, YouTube) | `img/tools/*.svg`, nombres y notas en `assets/js/render.js` (`TOOLS`) |
| Programa del mes en PDF (portada con calendario + lista con precios y botones) | `build-pdf.js` → `talleres-octubre-2026.pdf` |
| Servicios: 4 pilares y una página por servicio (texto, trabajos, logos, preguntas frecuentes, palabras clave) | `src/paginas.json` |
| Portafolio de la página de inicio (videos en `video/`, fotos y pósters en `img/trabajos/`) | `src/trabajos.json` |
| Estructura de la página de inicio | `src/home.body.html` |
| Estructura de la página de talleres | `src/talleres.body.html` |
| Página del Director Creativo (carrusel "Algunas capacitaciones brindadas": videos y fotos en `src/eventos.json`) | `src/director.body.html` |
| Sección "Así trabajamos" de la portada (detrás de cámaras: videos y fotos) | `src/backstage.json` |
| Cintillo de marcas (logos de clientes en `img/clientes/`) en portada y servicios | `src/clientes.json` |
| Encabezado, pie, preguntas frecuentes, página de taller y de servicios | `build.js` |
| Estilos | `assets/css/site.css` |
| Interacción (filtros, calendario, ficha) | `assets/js/app.js`, `assets/js/render.js` |

Después de editar, corre `node build.js` y sube los cambios. Para regenerar el PDF del programa corre `node build-pdf.js` (necesita Playwright con Chromium: `npm i -g playwright && npx playwright install chromium`); el archivo se sirve en `/talleres-octubre-2026.pdf`. **No edites a mano** `index.html`, `talleres/`, `servicios/`, las carpetas de cada servicio, `sitemap.xml`, `robots.txt` ni `llms.txt`: se generan solos.

## Páginas generadas

- `/` inicio de la agencia: videos y fotos de trabajos, servicios, director y botón a los talleres
- `/talleres/` talleres del mes (calendario, filtros, preguntas frecuentes)
- `/director-creativo/` perfil de Edgardo A. López
- `/talleres/<taller>/` una página por taller
- `/servicios/` índice de servicios por pilar (Marketing · Contenido · Eventos · Capacitación)
- `/<slug>/` una página por servicio, por ejemplo `/produccion-audiovisual-san-pedro-sula/` o `/publicidad-meta-ads-honduras/` (se generan desde `src/paginas.json`)
- `/talleres-octubre-2026.pdf` programa del mes para compartir con interesados (enlaces a cada taller y a WhatsApp)
- `/llms.txt` resumen del sitio para asistentes de IA
- `/sitemap.xml`, `/robots.txt` (permite GPTBot, ClaudeBot, PerplexityBot, Google-Extended y otros)

Cada página lleva datos estructurados schema.org (organización, persona, curso, evento, servicio, preguntas frecuentes).

## Publicación

Hostinger despliega automáticamente cada push a `main` (archivo de entrada `server.js`, sin comando de build).
Trabajamos en la rama `desarrollo` y pasamos a `main` cuando está aprobado.
