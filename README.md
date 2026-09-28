# Estudio Vector · estudiovector.com

Sitio de Estudio Vector (Vector Marketing): talleres del mes y servicios de marketing digital.
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
| Talleres (fechas, precios, contenido) | `src/talleres.json` |
| Servicios | `src/servicios.json` |
| Estructura de la página de inicio | `src/index.body.html` |
| Encabezado, pie, preguntas frecuentes, página de taller y de servicios | `build.js` |
| Estilos | `assets/css/site.css` |
| Interacción (filtros, calendario, ficha) | `assets/js/app.js`, `assets/js/render.js` |

Después de editar, corre `node build.js` y sube los cambios. **No edites a mano** `index.html`, `talleres/`, `servicios/`, `sitemap.xml`, `robots.txt` ni `llms.txt`: se generan solos.

## Páginas generadas

- `/` talleres del mes (calendario, filtros, instructor, preguntas frecuentes)
- `/talleres/<taller>/` una página por taller
- `/servicios/` servicios de la agencia
- `/llms.txt` resumen del sitio para asistentes de IA
- `/sitemap.xml`, `/robots.txt` (permite GPTBot, ClaudeBot, PerplexityBot, Google-Extended y otros)

Cada página lleva datos estructurados schema.org (organización, persona, curso, evento, servicio, preguntas frecuentes).

## Publicación

Hostinger despliega automáticamente cada push a `main` (archivo de entrada `server.js`, sin comando de build).
Trabajamos en la rama `desarrollo` y pasamos a `main` cuando está aprobado.
