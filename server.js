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
  ".mp4": "video/mp4",
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
  const ext = path.extname(file).toLowerCase();
  const type = TYPES[ext] || "application/octet-stream";
  const headers = Object.assign({
    "Content-Type": type,
    "Cache-Control": ext === ".html" || ext === ".txt" || ext === ".xml" ? "no-cache" : "public, max-age=2592000",
    "X-Content-Type-Options": "nosniff",
  }, extraHeaders || {});
  const compressible = /text|javascript|json|xml|svg/.test(type);
  if (compressible) {
    return fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(500); return res.end("Error"); }
      if (/\bgzip\b/.test(req.headers["accept-encoding"] || "")) {
        headers["Content-Encoding"] = "gzip";
        headers["Vary"] = "Accept-Encoding";
        data = zlib.gzipSync(data);
      }
      res.writeHead(status, headers);
      res.end(req.method === "HEAD" ? undefined : data);
    });
  }
  /* Binarios (video, imágenes, PDF): se envían en flujo y con soporte de rangos (Range),
   * que Safari/iOS exige para reproducir video y que permite adelantar sin descargar todo. */
  fs.stat(file, (err, st) => {
    if (err) { res.writeHead(500); return res.end("Error"); }
    headers["Accept-Ranges"] = "bytes";
    const range = status === 200 && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || "");
    let start = 0, end = st.size - 1, code = status;
    if (range && (range[1] !== "" || range[2] !== "")) {
      if (range[1] === "") { start = Math.max(0, st.size - Number(range[2])); }
      else { start = Number(range[1]); if (range[2] !== "") end = Math.min(Number(range[2]), st.size - 1); }
      if (start > end || start >= st.size) {
        res.writeHead(416, { "Content-Range": `bytes */${st.size}` });
        return res.end();
      }
      code = 206;
      headers["Content-Range"] = `bytes ${start}-${end}/${st.size}`;
    }
    headers["Content-Length"] = end - start + 1;
    res.writeHead(code, headers);
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(file, { start, end }).on("error", () => res.destroy()).pipe(res);
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
