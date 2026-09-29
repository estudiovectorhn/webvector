#!/usr/bin/env node
/*
 * Genera el programa de talleres en PDF (3 páginas, tamaño carta) con la marca de Estudio Vector:
 *   1. Portada con el calendario del mes
 *   2-3. Lista de talleres con precio, botón "Más información" (abre la página del taller en el sitio)
 *        y botón de reserva por WhatsApp.
 *
 * Uso:  node build-pdf.js            → escribe talleres-octubre-2026.pdf en la raíz (se sirve en /talleres-octubre-2026.pdf)
 * Requiere Playwright con Chromium:  npm i -g playwright && npx playwright install chromium
 */
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const VR = require("./assets/js/render.js");

const SITE = "https://estudiovector.com";
const OUT = "talleres-octubre-2026.pdf";
const T = JSON.parse(fs.readFileSync("src/talleres.json", "utf8"));
const { TOOLS, fmt, esc, waLink, waText, INCLUYE } = VR;
const file = p => pathToFileURL(path.resolve(p)).href;
const img = p => file(p.replace(/^\//, ""));

/* Nombre corto de cada taller para las celdas del calendario */
const SHORT = { video: "CapCut", anuncios: "Anuncios RRSS", celular: "Video celular", ia: "IA Negocios", meta: "Meta Ads", whatsapp: "WhatsApp", canva: "Canva", foto: "Fotografía", power: "App con IA" };
const DOW = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTH = { n: 10, y: 2026, name: "Octubre 2026" };
const first = new Date(MONTH.y, MONTH.n - 1, 1).getDay();
const ndays = new Date(MONTH.y, MONTH.n, 0).getDate();

const byDay = {};
T.forEach(t => t.days.filter(d => d.m === MONTH.n).forEach(d => (byDay[d.d] = byDay[d.d] || []).push(t)));

const dateOf = t => { const d = t.days.find(x => x.m === MONTH.n) || t.days[0]; return { dw: DOW[new Date(MONTH.y, d.m - 1, d.d).getDay()], d: d.d, m: d.m === 10 ? "OCT" : "SEP" }; };
const shortTime = s => s.replace(/ a\.\s?m\./g, " am").replace(/ p\.\s?m\./g, " pm").replace(" m.", " m");

const calendar = () => {
  let cells = "";
  for (let i = 0; i < first; i++) cells += `<div class="day empty"></div>`;
  for (let d = 1; d <= ndays; d++) {
    const dow = (first + d - 1) % 7, we = dow === 0 || dow === 6;
    const ev = (byDay[d] || []).map(t => `<a class="ev" href="${SITE}/talleres/${t.slug}/" style="background:${t.grad}"><b>${SHORT[t.id]}</b><span>${shortTime(t.time.split(" a ")[0])}</span></a>`).join("");
    cells += `<div class="day${we ? " we" : ""}${ev ? " has" : ""}"><i>${d}</i>${ev}</div>`;
  }
  const tail = (7 - ((first + ndays) % 7)) % 7;
  for (let i = 0; i < tail; i++) cells += `<div class="day empty"></div>`;
  return `<div class="cal"><div class="dows">${DOW.map(d => `<span>${d}</span>`).join("")}</div><div class="grid">${cells}</div></div>`;
};

const tools = t => (t.tools || []).map(k => `<span class="tl"><img src="${img("/img/tools/" + k + ".svg")}" alt="${TOOLS[k].name}"></span>`).join("");

const card = t => {
  const d = dateOf(t);
  return `<article class="card">
  <div class="thumb"><img src="${img(t.img)}" alt=""><div class="date"><small>${d.dw}</small><b>${String(d.d).padStart(2, "0")}</b><small>${d.m}</small></div>${t.live ? `<span class="tag live">En curso</span>` : t.isNew ? `<span class="tag">Nuevo</span>` : ""}</div>
  <div class="cbody">
    <div class="eyebrow">${t.mode === "Online" ? "Online · en vivo por Zoom" : "Presencial · Aula Vector, San Pedro Sula"}</div>
    <h3>${esc(t.title)}</h3>
    <div class="tl-line">${esc(t.tagline)} · ${esc(t.level)}</div>
    <p>${esc(t.sub)}</p>
    <div class="meta"><span>${esc(t.dayLabel)}</span><span>${esc(t.time)}</span><span>${esc(t.dur)}${t.durNote ? " · " + esc(t.durNote) : ""}</span></div>
    ${t.tools && t.tools.length ? `<div class="tools">${tools(t)}<small>${t.tools.map(k => TOOLS[k].name).join(" · ")}</small></div>` : ""}
  </div>
  <div class="cside">
    <div class="price">${fmt(t.price)}</div>
    <small>por persona${t.extra ? " · " + esc(t.extra.toLowerCase()) : ""}</small>
    <a class="btn" href="${SITE}/talleres/${t.slug}/">Más información</a>
    <a class="btn ghost" href="${waLink(t)}">Reservar por WhatsApp</a>
  </div>
</article>`;
};

const pageHead = (n, total) => `<header class="ph"><img class="logo" src="${img("/img/logo-morado.png")}" alt="Vector MKT"><div><b>Talleres de ${MONTH.name.toLowerCase()}</b><span>Lista de talleres y precios · San Pedro Sula, Honduras</span></div><span class="pn">${n} / ${total}</span></header>`;

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Talleres de octubre 2026 · Estudio Vector</title>
<style>
@font-face{font-family:"Anton";src:url("${file("assets/fonts/anton-latin-400-normal.woff2")}") format("woff2");font-weight:400}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-400-normal.woff2")}") format("woff2");font-weight:400}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-700-normal.woff2")}") format("woff2");font-weight:700}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-800-normal.woff2")}") format("woff2");font-weight:800}
:root{--deep:#2C02A4;--violet:#6A3BF5;--fuchsia:#E0169B;--fuchsia-soft:#C4107C;--text:#160A3A;--muted:#5E5484;--dim:#8C83AF;--line:#E4DBFB;--bg:#F7F4FF;--surface:#fff;--grad:linear-gradient(120deg,#3A0CC9 0%,#7B4DFF 45%,#E0169B 100%)}
@page{size:Letter;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:"Manrope",system-ui,sans-serif;color:var(--text);font-size:10.5pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
.page{width:8.5in;height:11in;overflow:hidden;position:relative;page-break-after:always;background:var(--bg)}
.page:last-child{page-break-after:auto}
.display{font-family:"Anton","Impact",sans-serif;font-weight:400;text-transform:uppercase;line-height:.92}

/* ---- Portada ---- */
.cover{display:flex;flex-direction:column;background:radial-gradient(70% 55% at 100% 0%,rgba(224,22,155,.55),transparent 60%),radial-gradient(60% 50% at 0% 40%,rgba(123,77,255,.55),transparent 60%),linear-gradient(160deg,#12063F 0%,#2C02A4 55%,#4B14C8 100%);color:#fff;padding:.45in .6in .4in}
.cover .top{display:flex;align-items:center;justify-content:space-between}
.cover .logo{height:.55in}
.cover .pill{font-size:9pt;font-weight:800;letter-spacing:.2em;text-transform:uppercase;padding:6px 14px;border:1px solid rgba(255,255,255,.35);border-radius:99px;background:rgba(255,255,255,.08)}
.cover .eyebrow{margin-top:.3in;font-size:9.5pt;letter-spacing:.3em;text-transform:uppercase;font-weight:800;color:#FF9AD2}
.cover h1{font-size:48pt;margin:4px 0 0;color:#fff}
.cover h1 span{display:block;color:#FF9AD2}
.cover .lead{max-width:5.4in;margin:.12in 0 0;font-size:10.5pt;color:#D6CCF5}
.facts{display:flex;gap:.28in;margin-top:.14in}
.fact b{display:block;font-family:"Anton";font-size:21pt;line-height:1;color:#fff}
.fact span{font-size:8.5pt;color:#D6CCF5;text-transform:uppercase;letter-spacing:.1em;font-weight:700}
.calwrap{margin-top:.2in;background:#fff;color:var(--text);border-radius:18px;padding:.22in .24in .2in;box-shadow:0 30px 60px -30px rgba(0,0,0,.6)}
.calwrap .ch{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px}
.calwrap .ch b{font-family:"Anton";font-size:19pt;text-transform:uppercase;color:var(--deep)}
.calwrap .ch span{font-size:8.5pt;color:var(--muted);font-weight:700}
.dows{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:4px}
.dows span{font-size:7.5pt;letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:var(--dim);text-align:center}
.grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.day{position:relative;height:.84in;border-radius:9px;background:#F4EFFF;padding:5px 6px;font-size:8.5pt;font-weight:700;color:var(--dim)}
.day.we{background:#EEE6FF;color:var(--deep)}
.day.has{background:#fff;border:1.5px solid var(--line);color:var(--text)}
.day.empty{background:transparent}
.day i{font-style:normal}
.ev{display:block;margin-top:3px;border-radius:6px;padding:3px 5px;color:#fff;line-height:1.15}
.ev b{display:block;font-size:7.6pt;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ev span{display:block;font-size:6.8pt;opacity:.9;white-space:nowrap}
.day .ev + .ev{margin-top:2px}
.cover .foot{margin-top:auto;padding-top:.2in;display:flex;align-items:center;justify-content:space-between;gap:.2in}
.cover .inst{display:flex;align-items:center;gap:10px}
.cover .inst img{width:.5in;height:.5in;border-radius:50%;border:2px solid #FF9AD2}
.cover .inst small{display:block;font-size:7.5pt;letter-spacing:.16em;text-transform:uppercase;color:#FF9AD2;font-weight:800}
.cover .inst b{display:block;font-size:11pt}
.cover .inst span{display:block;font-size:8.5pt;color:#D6CCF5}
.cover .cta{display:flex;flex-direction:column;align-items:flex-end;gap:5px}
.cover .cta a{white-space:nowrap;font-weight:800;font-size:10pt;padding:10px 16px;border-radius:12px;background:#fff;color:var(--deep)}
.cover .cta span{font-size:8.5pt;color:#D6CCF5}

/* ---- Páginas de lista ---- */
.list{padding:.36in .5in .3in}
.ph{display:flex;align-items:center;gap:12px;padding-bottom:10px;border-bottom:1.5px solid var(--line);margin-bottom:.16in}
.ph .logo{height:.42in}
.ph b{display:block;font-family:"Anton";text-transform:uppercase;font-size:15pt;color:var(--deep);line-height:1}
.ph span{font-size:8.5pt;color:var(--muted);font-weight:700}
.ph .pn{margin-left:auto;font-size:8.5pt;color:var(--dim);font-weight:800}
.card{display:grid;grid-template-columns:1.7in 1fr 1.5in;gap:.14in;background:#fff;border:1px solid var(--line);border-radius:16px;padding:.11in;margin-bottom:.11in;break-inside:avoid;box-shadow:0 14px 30px -24px rgba(44,2,164,.5)}
.thumb{position:relative;border-radius:11px;overflow:hidden;aspect-ratio:16/10}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.thumb .date{position:absolute;left:7px;top:7px;background:rgba(8,4,26,.78);color:#fff;border-radius:9px;padding:4px 8px;text-align:center;line-height:1}
.thumb .date small{display:block;font-size:6.5pt;letter-spacing:.14em;text-transform:uppercase;color:#FF9AD2;font-weight:800}
.thumb .date b{display:block;font-family:"Anton";font-size:16pt;margin:1px 0}
.thumb .tag{position:absolute;right:7px;top:7px;background:#fff;color:var(--deep);font-size:6.8pt;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:4px 7px;border-radius:7px}
.thumb .tag.live{background:var(--fuchsia);color:#fff}
.cbody .eyebrow{font-size:7.2pt;letter-spacing:.2em;text-transform:uppercase;color:var(--fuchsia-soft);font-weight:800}
.cbody h3{font-family:"Anton";font-weight:400;text-transform:uppercase;font-size:15pt;line-height:.95;margin:2px 0 1px;color:var(--text)}
.cbody .tl-line{font-size:9pt;font-weight:800;color:var(--fuchsia)}
.cbody p{margin:3px 0 0;font-size:8.2pt;color:var(--muted);line-height:1.3}
.cbody .meta{display:flex;flex-wrap:wrap;gap:3px 10px;margin-top:5px;font-size:8pt;font-weight:700;color:var(--text)}
.cbody .meta span::before{content:"•";color:var(--fuchsia);margin-right:5px}
.tools{display:flex;align-items:center;gap:5px;margin-top:6px}
.tools .tl{width:22px;height:22px;border-radius:6px;background:#fff;border:1px solid var(--line);display:grid;place-items:center}
.tools .tl img{width:15px;height:15px;object-fit:contain}
.tools small{font-size:7.5pt;color:var(--muted);font-weight:700;margin-left:3px}
.cside{display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:5px;border-left:1px solid var(--line);padding-left:.16in}
.cside .price{font-family:"Anton";font-size:24pt;line-height:1;color:var(--violet);text-align:center}
.cside small{font-size:7.5pt;color:var(--dim);text-align:center;margin-bottom:4px}
.btn{display:block;text-align:center;font-weight:800;font-size:8.4pt;padding:7px 8px;border-radius:10px;background:var(--grad);color:#fff}
.btn.ghost{background:#fff;color:var(--deep);border:1.5px solid var(--line)}
.incl{margin-top:.1in;background:var(--grad);color:#fff;border-radius:16px;padding:.18in .24in;display:grid;grid-template-columns:1.9in 1fr;gap:.2in;align-items:center}
.incl h4{font-family:"Anton";font-weight:400;text-transform:uppercase;font-size:17pt;margin:0;line-height:1}
.incl ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,1fr);gap:5px 14px;font-size:9pt;font-weight:700}
.incl li::before{content:"✓";display:inline-block;width:16px;height:16px;border-radius:50%;background:#fff;color:var(--deep);font-size:8pt;text-align:center;line-height:16px;margin-right:7px}
.contact{margin-top:.14in;display:grid;grid-template-columns:1fr auto;align-items:center;gap:.2in;background:#fff;border:1px solid var(--line);border-radius:16px;padding:.16in .22in}
.contact b{display:block;font-family:"Anton";text-transform:uppercase;font-size:15pt;color:var(--deep);line-height:1}
.contact span{font-size:8.8pt;color:var(--muted)}
.contact a.w{font-weight:800;font-size:10.5pt;padding:10px 18px;border-radius:12px;background:#25D366;color:#fff;display:inline-block}
.contact a.s{display:block;text-align:center;font-size:8.5pt;font-weight:800;color:var(--deep);margin-top:6px}
</style></head><body>

<section class="page cover">
  <div class="top"><img class="logo" src="${img("/img/logo-blanco.png")}" alt="Vector MKT"><span class="pill">Programa de talleres</span></div>
  <div class="eyebrow">Estudio Vector · San Pedro Sula · Sábados y domingos</div>
  <h1 class="display">Talleres <span>de octubre 2026</span></h1>
  <p class="lead">Capacitaciones prácticas de marketing digital, video e inteligencia artificial para dueños de negocio, emprendedores y equipos de venta. Grupos de máximo 10 personas.</p>
  <div class="facts"><div class="fact"><b>${T.length}</b><span>talleres en el mes</span></div><div class="fact"><b>10</b><span>cupos por taller</span></div><div class="fact"><b>100%</b><span>clases grabadas</span></div></div>
  <div class="calwrap"><div class="ch"><b>${MONTH.name}</b><span>Toca un taller para ver su página</span></div>${calendar()}</div>
  <div class="foot">
    <div class="inst"><img src="${img("/img/edgardo-avatar.jpg")}" alt=""><div><small>Imparte</small><b>Edgardo A. López</b><span>Fundador de Estudio Vector · Capacitador de +500 alumnos en Honduras</span></div></div>
    <div class="cta"><a href="${waText("Hola Vector, quiero información de los talleres de octubre.")}">Reservar por WhatsApp · 9569-1481</a><span>estudiovector.com</span></div>
  </div>
</section>

<section class="page list">
  ${pageHead(2, 3)}
  ${T.slice(0, 5).map(card).join("\n")}
</section>

<section class="page list">
  ${pageHead(3, 3)}
  ${T.slice(5).map(card).join("\n")}
  <div class="incl"><h4>Todos los talleres incluyen</h4><ul>${["Grabación de la clase para repasar", "Grupo privado de WhatsApp del curso", "Certificado oficial Vector MKT", "Máximo 10 participantes por grupo"].map(i => `<li>${i}</li>`).join("")}</ul></div>
  <div class="contact"><div><b>Reserva tu cupo</b><span>Los cupos se asignan por orden de pago. Escríbenos por WhatsApp mencionando el taller que te interesa.</span></div><div><a class="w" href="${waText("Hola Vector, quiero reservar mi cupo en un taller de octubre.")}">WhatsApp 9569-1481</a><a class="s" href="${SITE}/">estudiovector.com</a></div></div>
</section>
</body></html>`;

(async () => {
  let chromium;
  try { ({ chromium } = require("playwright")); }
  catch (e) { try { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); } catch (e2) { console.error("Falta Playwright: npm i -g playwright && npx playwright install chromium"); process.exit(1); } }
  const tmp = path.join(require("os").tmpdir(), "talleres-pdf.html");
  fs.writeFileSync(tmp, html);
  const launch = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  const browser = await chromium.launch(launch);
  const page = await browser.newPage();
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: OUT, format: "Letter", printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close();
  console.log("  ✓", OUT, (fs.statSync(OUT).size / 1024).toFixed(0) + " KB");
})().catch(e => { console.error(e); process.exit(1); });
