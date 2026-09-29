// Servidor estático sin dependencias para Hostinger (Node.js) y para probar en localhost.
// Uso local:  node server.js   →  http://localhost:3000
const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};
// Carpetas y archivos internos que no se publican
const PRIVATE = /^\/(src|node_modules|\.git)(\/|$)|^\/(server\.js|build\.js|build-pdf\.js|package\.json|package-lock\.json|README\.md|\.gitignore)$/;

function send(req, res, status, file, extraHeaders) {
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(500); return res.end("Error"); }
    const ext = path.extname(file).toLowerCase();
    const type = TYPES[ext] || "application/octet-stream";
    const headers = Object.assign({
      "Content-Type": type,
      "Cache-Control": ext === ".html" || ext === ".txt" || ext === ".xml" ? "no-cache" : "public, max-age=2592000",
      "X-Content-Type-Options": "nosniff",
    }, extraHeaders || {});
    const compressible = /text|javascript|json|xml|svg/.test(type);
    if (compressible && /\bgzip\b/.test(req.headers["accept-encoding"] || "")) {
      headers["Content-Encoding"] = "gzip";
      headers["Vary"] = "Accept-Encoding";
      data = zlib.gzipSync(data);
    }
    res.writeHead(status, headers);
    res.end(req.method === "HEAD" ? undefined : data);
  });
}

http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(req.url.split("?")[0]); } catch (e) { res.writeHead(400); return res.end(); }
  if (PRIVATE.test(urlPath)) return send(req, res, 404, path.join(ROOT, "404.html"));
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }

  fs.stat(file, (err, st) => {
    if (!err && st.isDirectory()) {
      if (!urlPath.endsWith("/")) { // /servicios → /servicios/
        res.writeHead(301, { Location: urlPath + "/" + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "") });
        return res.end();
      }
      const idx = path.join(file, "index.html");
      return fs.access(idx, e => e ? send(req, res, 404, path.join(ROOT, "404.html")) : send(req, res, 200, idx));
    }
    if (!err && st.isFile()) return send(req, res, 200, file);
    send(req, res, 404, path.join(ROOT, "404.html"));
  });
}).listen(PORT, () => console.log("Estudio Vector en http://localhost:" + PORT));
