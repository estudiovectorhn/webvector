// Servidor estático mínimo (sin dependencias) para Hostinger Node.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath.endsWith("/")) urlPath += "index.html";
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT) || path.basename(file) === "server.js") {
    res.writeHead(403); return res.end();
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      // Cualquier ruta desconocida muestra la página principal
      return fs.readFile(path.join(ROOT, "index.html"), (e2, home) => {
        res.writeHead(e2 ? 404 : 200, { "Content-Type": TYPES[".html"] });
        res.end(e2 ? "No encontrado" : home);
      });
    }
    const ext = path.extname(file).toLowerCase();
    const cache = ext === ".html" ? "no-cache" : "public, max-age=604800";
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream", "Cache-Control": cache });
    res.end(data);
  });
}).listen(PORT, () => console.log("Talleres Vector en puerto " + PORT));
