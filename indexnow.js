/* Avisa a Bing (y a los buscadores que usan IndexNow) que las páginas del sitio cambiaron.
 * Uso: node indexnow.js            → envía todas las URL del sitemap
 *      node indexnow.js /ruta/ ... → envía solo esas rutas
 * Correrlo después de publicar (cuando Hostinger ya subió los cambios). */
const fs = require("fs");
const https = require("https");
const SITE = "https://estudiovector.com";
const KEY = "0b03397bbb82a948a6dcb14e8ae830ec";
const args = process.argv.slice(2);
const urls = args.length
  ? args.map(a => SITE + (a.startsWith("/") ? a : "/" + a))
  : [...fs.readFileSync("sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const body = JSON.stringify({ host: "estudiovector.com", key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls });
const req = https.request({ hostname: "api.indexnow.org", path: "/indexnow", method: "POST", headers: { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(body) } }, res => {
  let out = ""; res.on("data", d => out += d);
  res.on("end", () => console.log(`IndexNow: ${res.statusCode} (${urls.length} URL)`, res.statusCode < 300 ? "· recibido" : out));
});
req.on("error", e => console.error("IndexNow:", e.message));
req.end(body);
