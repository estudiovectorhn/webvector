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
| Páginas por tipo de negocio (marketing para restaurantes, ferreterías, médicos, etc.): texto, consejos, servicios, logos y preguntas frecuentes; los trabajos salen de la categoría del mismo `id` en `galeria.json` | `src/rubros.json` |
| Portafolio por tipo de negocio (`/portafolio/`): categorías y qué piezas van en cada una | `src/galeria.json` |
| Servicios: 4 pilares y una página por servicio (texto, trabajos, logos, preguntas frecuentes, palabras clave) | `src/paginas.json` |
| Trabajos: videos (en `video/`), fotos y artes (en `img/trabajos/`). `"home": true` = sale en el carrusel de la portada; `"kind": "arte"` = arte de diseño (no sale en "Fotografía que vende") | `src/trabajos.json` |
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
- `/portafolio/` galería de reels, videos, fotos y artes por tipo de negocio, con filtro (enlace directo: `/portafolio/#restaurantes`)
- `/servicios/` índice de servicios por pilar (Marketing · Contenido · Eventos · Capacitación)
- `/<slug>/` una página por servicio, por ejemplo `/produccion-audiovisual-san-pedro-sula/` o `/publicidad-meta-ads-honduras/` (se generan desde `src/paginas.json`)
- `/talleres-octubre-2026.pdf` programa del mes para compartir con interesados (enlaces a cada taller y a WhatsApp)
- `/llms.txt` resumen del sitio para asistentes de IA
- `/sitemap.xml`, `/robots.txt` (permite GPTBot, ClaudeBot, PerplexityBot, Google-Extended y otros)

Cada página lleva datos estructurados schema.org (organización, persona, curso, evento, servicio, preguntas frecuentes).

## Publicación

Hostinger despliega automáticamente cada push a `main` (archivo de entrada `server.js`, sin comando de build).
Trabajamos en la rama `desarrollo` y pasamos a `main` cuando está aprobado.

## Avisar a Bing de los cambios (IndexNow)

Después de publicar (cuando Hostinger ya subió los cambios), corre `node indexnow.js` para avisar a Bing de todas las URL del sitemap, o `node indexnow.js /ruta/` para avisar solo de algunas. ChatGPT usa el índice de Bing, así que esto acelera que las páginas nuevas aparezcan en sus respuestas. La clave está en `0b03397bbb82a948a6dcb14e8ae830ec.txt` (no la borres).

## Rendimiento: vistas previas de video y fotos livianas

Los carruseles y la galería reproducen una **vista previa** de cada video (`video/p/<id>.mp4`: 7 s, sin audio, 360×640) con un **póster webp** (`img/p/<id>.webp`); el video completo con sonido solo se descarga al abrirlo en el visor. Las fotos también se sirven en webp desde `img/p/`. Al agregar un video o una foto nueva, genera su versión en `video/p/` o `img/p/`; si no existe, el sitio usa el archivo original (funciona igual, solo pesa más). En el celular se reproducen como máximo 2 videos a la vez (5 en computadora) y los carruseles se detienen cuando no están en pantalla.
