#!/usr/bin/env node
/*
 * Fichas de los talleres y del Programa Ejecutivo de Vector Academy.
 *
 *   PDF  → brochure vertical (1080 x 1920, formato de celular) pensado para mandarlo por WhatsApp:
 *          portada, de qué se trata, ruta de aprendizaje, una página por par de bloques con lo que
 *          se aprende, se practica y se llevan, resultados, herramientas, requisitos, instructor,
 *          fechas e inversión, preguntas frecuentes y cómo reservar.
 *   PNG  → ficha publicitaria para feed (1080x1350) e historias (1080x1920).
 *
 * Uso:  node build-fichas-pdf.js      (o  npm run fichas)
 * Requiere Playwright con Chromium, igual que build-pdf.js.
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const { pathToFileURL } = require("url");
const VR = require("./assets/js/render.js");

const SITE = "https://estudiovector.com";
const T = JSON.parse(fs.readFileSync("src/talleres.json", "utf8"));
const PR = JSON.parse(fs.readFileSync("src/programa.json", "utf8"));
const { TOOLS, fmt, esc, waLink, waText, INCLUYE } = VR;
const file = p => pathToFileURL(path.resolve(p)).href;
const img = p => file(p.replace(/^\//, ""));
const pares = xs => xs.reduce((a, x, i) => (i % 2 ? a[a.length - 1].push(x) : a.push([x]), a), []);

const FONTS = `
@font-face{font-family:"Anton";src:url("${file("assets/fonts/anton-latin-400-normal.woff2")}") format("woff2");font-weight:400}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-400-normal.woff2")}") format("woff2");font-weight:400}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-700-normal.woff2")}") format("woff2");font-weight:700}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-800-normal.woff2")}") format("woff2");font-weight:800}`;

/* ---------------- Brochure vertical ---------------- */
const CSS = `${FONTS}
:root{--deep:#2C02A4;--violet:#6A3BF5;--violet2:#7B4DFF;--fuchsia:#E0169B;--text:#160A3A;--muted:#5E5484;--dim:#8C83AF;--line:#E4DBFB;--bg:#F7F4FF;--surface2:#F4EFFF;--ok:#0E9A60;--ink:#0E0630;--grad:linear-gradient(120deg,#3A0CC9 0%,#7B4DFF 45%,#E0169B 100%)}
@page{size:1080px 1920px;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Manrope",system-ui,sans-serif;color:var(--text);-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
li{list-style:none}
.p{position:relative;width:1080px;height:1920px;overflow:hidden;page-break-after:always;background:var(--bg);display:flex;flex-direction:column}
.p:last-child{page-break-after:auto}
.in{flex:1;min-height:0;display:flex;flex-direction:column;padding:80px 80px 40px}
.in.mid{justify-content:center}
.pasos{margin:auto 0}
.display{font-family:"Anton","Impact",sans-serif;font-weight:400;text-transform:uppercase;line-height:.95}

/* Encabezado corrido */
.hd{display:flex;align-items:center;justify-content:space-between;padding:52px 80px 0;flex:0 0 auto}
.hd img{height:52px;width:auto;display:block}
.hd span{font-size:19px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.p.dark .hd span{color:#C9B6FF}
.ft{display:flex;align-items:center;justify-content:space-between;padding:0 80px 46px;font-size:18px;font-weight:800;color:var(--dim);flex:0 0 auto}
.p.dark{background:var(--ink);color:#fff}
.p.dark .ft{color:rgba(255,255,255,.55)}

.eyebrow{font-size:21px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:var(--fuchsia)}
.p.dark .eyebrow{color:#FF9AD2}
h2.t{font-family:"Anton";text-transform:uppercase;font-size:76px;line-height:.95;margin:16px 0 22px;color:var(--deep)}
.p.dark h2.t{color:#fff}
p.lead{font-size:30px;line-height:1.5;color:var(--muted)}
.p.dark p.lead{color:#D6CCF5}

/* Portada */
.cover-ph{position:relative;flex:0 0 auto;height:980px;overflow:hidden}
.cover-ph>img.bg{width:100%;height:100%;object-fit:cover;display:block}
.cover-ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,6,48,.55) 0%,rgba(14,6,48,0) 30%,rgba(14,6,48,.3) 65%,var(--ink) 100%)}
.cover-top{position:absolute;left:0;right:0;top:0;z-index:2;display:flex;align-items:flex-start;justify-content:space-between;padding:56px 80px}
.cover-top img{height:76px;width:auto;display:block}
.pill{font-size:20px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;padding:12px 24px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.42);color:#fff}
.cover-in{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;padding:52px 80px 56px;background:var(--ink);color:#fff}
.cover-in h1{font-family:"Anton";text-transform:uppercase;font-size:92px;line-height:.92;margin:0 0 20px}
.cover-in .tl{font-size:34px;font-weight:800;color:#C9B6FF;margin-bottom:34px}
.cover-kv{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:10px}
.cover-kv div{padding:24px 28px;border-radius:22px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18)}
.cover-kv small{display:block;font-size:17px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#FF9AD2}
.cover-kv b{display:block;margin-top:8px;font-size:30px;line-height:1.2}
.cover-kv b.big{font-family:"Anton";font-size:56px;line-height:1}

/* Bloques de contenido */
.cards{display:grid;gap:22px;align-content:center;flex:1;min-height:0}
.card{background:#fff;border:1px solid var(--line);border-radius:28px;padding:34px 36px}
.card.soft{background:var(--surface2)}
.bq{display:flex;align-items:center;gap:14px;margin-bottom:12px}
.bq .h{font-size:22px;font-weight:800;color:var(--fuchsia)}
.bq .n{font-size:17px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:7px 16px;border-radius:999px;background:var(--surface2);border:1px solid var(--line);color:var(--muted)}
.card.soft .bq .n{background:#fff}
.card h3{font-size:38px;line-height:1.14;margin-bottom:18px}
.card ul li{position:relative;padding-left:32px;font-size:25px;line-height:1.45;color:var(--muted);margin-bottom:11px}
.card ul li::before{content:"";position:absolute;left:8px;top:14px;width:10px;height:10px;border-radius:50%;background:var(--violet2)}
.entrega{display:flex;gap:16px;align-items:flex-start;margin-top:22px;padding:22px 26px;border-radius:20px;background:rgba(14,154,96,.09);border:1px solid rgba(14,154,96,.28)}
.entrega svg{width:34px;height:34px;flex:0 0 auto;color:var(--ok);margin-top:2px}
.entrega small{display:block;font-size:17px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--ok)}
.entrega b{display:block;font-size:26px;line-height:1.3;margin-top:6px}

/* Ruta */
.ruta{display:grid;gap:16px;counter-reset:r}
.ruta.dos{grid-template-columns:1fr 1fr;gap:14px}
.ruta.dos li{grid-template-columns:62px 1fr;gap:16px;padding:20px 22px}
.ruta.dos li::before{font-size:36px}
.ruta.dos b{font-size:25px}
.ruta.dos span{font-size:19px;margin-top:5px}
.ruta li{counter-increment:r;display:grid;grid-template-columns:86px 1fr;gap:24px;align-items:start;background:#fff;border:1px solid var(--line);border-radius:24px;padding:26px 30px}
.ruta li.soft{background:var(--surface2)}
.ruta li::before{content:counter(r,decimal-leading-zero);font-family:"Anton";font-size:46px;line-height:1;color:transparent;background:var(--grad);-webkit-background-clip:text;background-clip:text}
.ruta b{display:block;font-size:31px;line-height:1.2}
.ruta span{display:block;font-size:22px;font-weight:700;color:var(--muted);margin-top:7px}

/* Listas y bloques sueltos */
.check{display:grid;gap:18px}
.check li{display:flex;gap:18px;align-items:flex-start;font-size:28px;line-height:1.4}
.check svg{width:34px;height:34px;flex:0 0 auto;color:var(--ok);margin-top:6px}
.p.dark .check li{color:#EDE7FF}
.chips{display:flex;flex-wrap:wrap;gap:14px}
.chips span{font-size:23px;font-weight:800;padding:14px 24px;border-radius:999px;background:#fff;border:1px solid var(--line);color:var(--muted)}
.chips span.hl{background:var(--fuchsia);border-color:var(--fuchsia);color:#fff}
.tools{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.tools.uno{grid-template-columns:1fr}
.tools.uno .tool{padding:32px 34px}
.tools.uno .tool img{width:104px;height:104px}
.tools.uno .tool b{font-size:34px}
.tools.uno .tool small{font-size:23px}
.tool{display:flex;gap:22px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:24px;padding:26px}
.tool img{width:84px;height:84px;object-fit:contain;flex:0 0 auto}
.tool b{display:block;font-size:28px}
.tool small{display:block;font-size:20px;color:var(--muted);margin-top:4px}
.note{margin-top:26px;padding:26px 30px;border-radius:22px;border:2px dashed var(--line);background:#fff;font-size:25px;line-height:1.45;color:var(--muted)}
.p.dark .note{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.26);color:#D6CCF5}

/* Datos con icono */
.datos{display:grid;gap:20px}
.datos li{display:flex;gap:24px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:24px;padding:28px 32px}
.datos .ic{width:76px;height:76px;flex:0 0 auto;border-radius:22px;background:var(--surface2);display:grid;place-items:center}
.datos .ic svg{width:40px;height:40px;color:var(--violet)}
.datos small{display:block;font-size:18px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--fuchsia)}
.datos b{display:block;font-size:32px;line-height:1.2;margin-top:5px}
.datos b.big{font-family:"Anton";font-size:52px;line-height:1;color:var(--deep)}

/* Instructor */
.inst{display:flex;gap:30px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:28px;padding:34px}
.inst img{width:190px;height:190px;border-radius:26px;object-fit:cover;flex:0 0 auto}
.inst small{display:block;font-size:19px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--fuchsia)}
.inst b{display:block;font-family:"Anton";text-transform:uppercase;font-size:50px;line-height:1;margin:8px 0 12px}
.inst p{font-size:24px;line-height:1.45;color:var(--muted)}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:26px}
.stats div{background:#fff;border:1px solid var(--line);border-radius:22px;padding:26px;text-align:center}
.stats b{display:block;font-family:"Anton";font-size:52px;line-height:1;color:transparent;background:var(--grad);-webkit-background-clip:text;background-clip:text}
.stats span{display:block;font-size:20px;font-weight:700;color:var(--muted);margin-top:8px}

/* Preguntas */
.faq{display:grid;gap:18px}
.faq li{background:#fff;border:1px solid var(--line);border-radius:24px;padding:28px 32px}
.faq b{display:block;font-size:29px;line-height:1.25;margin-bottom:10px}
.faq span{display:block;font-size:24px;line-height:1.45;color:var(--muted)}

/* Pasos y cierre */
.pasos{display:grid;gap:20px;counter-reset:s}
.pasos li{counter-increment:s;display:grid;grid-template-columns:84px 1fr;gap:24px;align-items:start}
.pasos li::before{content:counter(s);display:grid;place-items:center;width:84px;height:84px;border-radius:26px;background:var(--grad);font-family:"Anton";font-size:44px;color:#fff}
.pasos b{display:block;font-size:32px;line-height:1.2}
.pasos span{display:block;font-size:24px;line-height:1.4;color:#D6CCF5;margin-top:7px}
.cta{margin-top:auto;padding:44px;border-radius:30px;background:var(--grad);text-align:center}
.cta b{display:block;font-family:"Anton";text-transform:uppercase;font-size:58px;line-height:1;color:#fff}
.cta span{display:block;font-size:26px;color:rgba(255,255,255,.92);margin-top:12px}
.cta .wa{display:inline-block;margin-top:26px;padding:22px 42px;border-radius:20px;background:#fff;color:var(--deep);font-family:"Anton";font-size:44px;text-transform:uppercase}
`;

const IC = {
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4.5 4.5L19 7"/></svg>`,
  cal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  money: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 10v4M18 10v4"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.4"/><path d="M2.6 19.5a6.4 6.4 0 0 1 12.8 0"/><circle cx="17.5" cy="9.5" r="2.4"/><path d="M16.2 14.4A5 5 0 0 1 21.6 19"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3a3 3 0 0 1-3 4M7 5H4a3 3 0 0 0 3 4"/></svg>`
};

const hd = txt => `<header class="hd"><img src="${img("/img/logo-morado.png")}" alt="Vector MKT"><span>${esc(txt)}</span></header>`;
const hdDark = txt => `<header class="hd"><img src="${img("/img/logo-blanco.png")}" alt="Vector MKT"><span>${esc(txt)}</span></header>`;
const ft = (izq, der) => `<footer class="ft"><span>${esc(izq)}</span><span>${esc(der)}</span></footer>`;

/* Páginas del brochure. `d` es el modelo común que arman tallerModelo() y programaModelo(). */
const paginas = d => {
  const P = [];
  const marca = `${d.academia} · San Pedro Sula`;

  /* 1 · Portada */
  P.push(`<section class="p dark">
  <div class="cover-ph">
    <img class="bg" src="${d.img}" alt="">
    <div class="cover-top"><img src="${img("/img/logo-blanco.png")}" alt=""><span class="pill">${esc(d.pill)}</span></div>
  </div>
  <div class="cover-in">
    <div class="eyebrow">${esc(d.eyebrow)}</div>
    <h1>${esc(d.titulo)}</h1>
    <div class="tl">${esc(d.tagline)}</div>
    <div class="cover-kv">
      <div><small>${esc(d.kv1.k)}</small><b>${esc(d.kv1.v)}</b></div>
      <div><small>Horario</small><b>${esc(d.horario)}</b></div>
      <div><small>Duración</small><b>${esc(d.duracion)}</b></div>
      <div><small>Inversión</small><b class="big">${esc(d.precio)}</b></div>
    </div>
  </div>
  ${ft(marca, "estudiovector.com")}
</section>`);

  /* 2 · De qué se trata */
  P.push(`<section class="p">
  ${hd("De qué se trata")}
  <div class="in">
    <div class="eyebrow">Antes de inscribirte</div>
    <h2 class="t">De qué se trata</h2>
    <p class="lead">${esc(d.sub)}</p>
    <div class="card" style="margin-top:44px">
      <div class="bq"><span class="n">Al terminar te llevas</span></div>
      <h3>${esc(d.take)}</h3>
    </div>
    <h2 class="t" style="font-size:52px;margin:46px 0 20px">Ideal para</h2>
    <p class="lead">${esc(d.ideal)}</p>
    ${d.publico ? `<ul class="check" style="margin-top:30px">${d.publico.map(x => `<li>${IC.check}<span>${esc(x)}</span></li>`).join("")}</ul>` : ""}
    ${d.learn ? `<h2 class="t" style="font-size:52px;margin:46px 0 20px">Lo que aprenderás</h2>
    <ul class="check">${d.learn.map(x => `<li>${IC.check}<span>${esc(x)}</span></li>`).join("")}</ul>` : ""}
  </div>
  ${ft(marca, "2")}
</section>`);

  /* 3 · Ruta de aprendizaje */
  const bl = d.bloques;
  P.push(`<section class="p">
  ${hd("Ruta de aprendizaje")}
  <div class="in">
    <div class="eyebrow">${bl.length} bloques · ${esc(d.duracion)}</div>
    <h2 class="t">Ruta de aprendizaje</h2>
    <p class="lead">${esc(d.planLead)}</p>
    <ul class="ruta${bl.length > 7 ? " dos" : ""}" style="margin-top:38px">${bl.map(b => `<li${/pausa/i.test(b.nivel) ? ' class="soft"' : ""}><div><b>${esc(b.titulo)}</b><span>${esc(b.hora)}${b.nivel ? " · " + esc(b.nivel) : ""}</span></div></li>`).join("")}</ul>
  </div>
  ${ft(marca, "3")}
</section>`);

  /* 4..N · Dos bloques por página, con lo que se practica y lo que se llevan */
  let n = 4;
  pares(bl).forEach((par, i) => {
    P.push(`<section class="p">
  ${hd(`Contenido ${i + 1} de ${pares(bl).length}`)}
  <div class="in">
    <div class="cards">${par.map(b => `<article class="card${/pausa/i.test(b.nivel) ? " soft" : ""}">
      <div class="bq"><span class="h">${esc(b.hora)}</span><span class="n">${esc(b.nivel)}</span></div>
      <h3>${esc(b.titulo)}</h3>
      <ul>${b.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      ${b.entrega ? `<div class="entrega">${IC.trophy}<div><small>Te llevas</small><b>${esc(b.entrega)}</b></div></div>` : ""}
    </article>`).join("")}</div>
  </div>
  ${ft(marca, String(n++))}
</section>`);
  });

  /* Resultados + herramientas */
  P.push(`<section class="p">
  ${hd("Resultados")}
  <div class="in mid">
    <div class="eyebrow">Para qué te sirve</div>
    <h2 class="t">Lo que cambia en tu negocio</h2>
    <ul class="check">${d.resultados.map(r => `<li>${IC.check}<span>${esc(r)}</span></li>`).join("")}</ul>
    ${d.tools.length ? `<h2 class="t" style="font-size:52px;margin:52px 0 22px">Herramientas que usarás</h2>
    <div class="tools${d.tools.length < 3 ? " uno" : ""}">${d.tools.map(k => `<div class="tool"><img src="${img("/img/tools/" + k + ".svg")}" alt=""><div><b>${esc(TOOLS[k].name)}</b><small>${esc(TOOLS[k].note)}</small></div></div>`).join("")}</div>` : ""}
  </div>
  ${ft(marca, String(n++))}
</section>`);

  /* Qué incluye + requisitos + instructor */
  P.push(`<section class="p">
  ${hd("Qué incluye")}
  <div class="in">
    <div class="eyebrow">Tu cupo incluye</div>
    <h2 class="t">Qué incluye</h2>
    <div class="chips">${d.incluye.map((x, i) => `<span${i === 0 && d.destacado ? ' class="hl"' : ""}>${esc(x)}</span>`).join("")}</div>
    ${d.note ? `<div class="note">${esc(d.note)}</div>` : ""}
    <h2 class="t" style="font-size:52px;margin:52px 0 22px">Quién lo imparte</h2>
    <div class="inst">
      <img src="${img("/img/edgardo.jpg")}" alt="">
      <div><small>Imparte</small><b>Edgardo A. López</b><p>Fundador y Director Creativo de Estudio Vector. Capacitador empresarial en marketing digital e inteligencia artificial y asesor publicitario de empresas en Honduras.</p></div>
    </div>
    <div class="stats"><div><b>500+</b><span>alumnos capacitados</span></div><div><b>15+</b><span>años en marketing</span></div><div><b>IA</b><span>Forum Ruta Copán 2026</span></div></div>
  </div>
  ${ft(marca, String(n++))}
</section>`);

  /* Fechas e inversión */
  P.push(`<section class="p">
  ${hd("Fechas e inversión")}
  <div class="in">
    <div class="eyebrow">Lo práctico</div>
    <h2 class="t">Fechas e inversión</h2>
    <ul class="datos">
      <li><span class="ic">${IC.cal}</span><div><small>${esc(d.kv1.k)}</small><b>${esc(d.kv1.v)}</b></div></li>
      <li><span class="ic">${IC.clock}</span><div><small>Horario</small><b>${esc(d.horario)} · ${esc(d.duracion)}</b></div></li>
      <li><span class="ic">${IC.pin}</span><div><small>Dónde</small><b>${esc(d.lugar)}</b></div></li>
      <li><span class="ic">${IC.users}</span><div><small>Grupo</small><b>Máximo ${d.cupos} participantes</b></div></li>
      <li><span class="ic">${IC.money}</span><div><small>Inversión</small><b class="big">${esc(d.precio)}</b>${d.precioNota ? `<span style="display:block;font-size:23px;font-weight:700;color:var(--muted);margin-top:6px">${esc(d.precioNota)}</span>` : ""}</div></li>
    </ul>
    ${d.politica ? `<div class="note">${esc(d.politica)}</div>` : ""}
  </div>
  ${ft(marca, String(n++))}
</section>`);

  /* Preguntas frecuentes */
  P.push(`<section class="p">
  ${hd("Preguntas frecuentes")}
  <div class="in">
    <div class="eyebrow">Antes de reservar</div>
    <h2 class="t">Preguntas frecuentes</h2>
    <ul class="faq">${d.faq.map(([q, a]) => `<li><b>${esc(q)}</b><span>${esc(a)}</span></li>`).join("")}</ul>
  </div>
  ${ft(marca, String(n++))}
</section>`);

  /* Cómo reservar */
  P.push(`<section class="p dark">
  ${hdDark("Cómo reservar")}
  <div class="in">
    <div class="eyebrow">Tres pasos</div>
    <h2 class="t">Cómo reservar tu cupo</h2>
    <ul class="pasos">
      <li><div><b>Escríbenos por WhatsApp</b><span>Al 9569-1481, mencionando ${esc(d.titulo)}.</span></div></li>
      <li><div><b>Te confirmamos disponibilidad</b><span>Te decimos cuántos cupos quedan y te enviamos los datos de pago.</span></div></li>
      <li><div><b>Con tu pago quedas inscrito</b><span>Entras al grupo privado de WhatsApp y recibes la ubicación exacta.</span></div></li>
    </ul>
    <div class="cta">
      <b>${esc(d.ctaTitulo)}</b>
      <span>Solo ${d.cupos} cupos · Se asignan por orden de pago</span>
      <span class="wa">WhatsApp 9569-1481</span>
    </div>
  </div>
  ${ft("estudiovector.com", String(n++))}
</section>`);

  return P;
};

const doc = (titulo, P) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(titulo)}</title><style>${CSS}</style></head><body>${P.join("\n")}</body></html>`;

/* ---------------- Modelos ---------------- */
const tallerModelo = t => ({
  academia: "Vector Academy", pill: t.mode === "Online" ? "Taller online" : "Taller presencial",
  eyebrow: "Desglose del taller", titulo: t.title, tagline: t.tagline, img: img(t.img),
  kv1: { k: t.days.length > 1 ? "Fechas" : "Fecha", v: t.dayLabel },
  horario: t.time, duracion: t.dur + (t.durNote ? " · " + t.durNote : ""),
  precio: fmt(t.price), precioNota: "por persona",
  sub: t.sub, take: t.take, ideal: t.ideal, publico: null, learn: t.learn,
  planLead: (t.plan && t.plan.lead) || "", bloques: (t.plan && t.plan.bloques) || [],
  resultados: t.results, tools: t.tools || [],
  incluye: [t.extra, ...INCLUYE(t)].filter(Boolean), destacado: !!t.extra,
  note: t.note || null, lugar: t.mode === "Online" ? "En vivo por Zoom, desde donde estés" : "Aula de Vector Academy, San Pedro Sula",
  cupos: 10, politica: "Los cupos se asignan por orden de pago. Si no puedes asistir a una sesión, coordinamos contigo la forma de ponerte al día; el certificado requiere completar el taller.",
  ctaTitulo: "Reserva tu cupo",
  faq: [
    [`¿Necesito saber del tema para entrar?`, `No. ${/todos/i.test(t.level) ? "El taller recibe todos los niveles" : "El taller es de nivel " + t.level.toLowerCase()} y se avanza paso a paso, en grupos de máximo 10 personas para que a nadie se le pase una duda.`],
    [`¿Qué pasa si falto a una sesión?`, `La clase queda grabada y se entrega a los participantes, así que puedes repasar o ponerte al día. Además quedas en el grupo privado de WhatsApp del taller.`],
    [`¿Me dan certificado?`, `Sí, certificado oficial de Vector MKT al completar el taller, más la grabación de la clase y el grupo privado de WhatsApp.`],
    [`¿Dónde es exactamente?`, t.mode === "Online" ? `Es en línea, en vivo por Zoom. El enlace se envía al confirmar tu reserva.` : `En el aula de Vector Academy, en San Pedro Sula. La dirección exacta se comparte al confirmar tu reserva.`],
    [`¿Cómo aparto mi cupo?`, `Escríbenos por WhatsApp al 9569-1481 mencionando el taller. Te confirmamos disponibilidad y con tu pago quedas inscrito.`]
  ]
});

const programaModelo = () => ({
  academia: PR.academia, pill: PR.generacion, eyebrow: `${PR.academia} · ${PR.ciudad}`,
  titulo: PR.h1, tagline: PR.nombre, img: img(PR.heroImg),
  kv1: { k: "Fechas", v: `Del ${PR.inicioTexto.replace(/^\S+ /, "").replace(/ de \d{4}$/, "")} al ${PR.finTexto.replace(/^\S+ /, "")}` },
  horario: `${PR.dias}, ${PR.horario}`, duracion: `${PR.sesiones} sesiones · ${PR.horas} horas`,
  precio: fmt(PR.precio), precioNota: `Reservas tu cupo con ${fmt(PR.matricula)}, aplicada al total. Saldo de ${fmt(PR.saldo)}.`,
  sub: PR.sub, take: "Tu negocio con contenido propio, campañas activas y la operación ordenada: lo que construyes en el programa queda funcionando.",
  ideal: PR.dirigido, publico: PR.publico.map(([a, b]) => `${a}: ${b.toLowerCase()}`), learn: null,
  planLead: `Ocho clases de tres horas, ${PR.dias.toLowerCase()}. Cada una cierra con algo hecho por ti y aplicado a tu propio negocio.`,
  bloques: PR.clases.map(k => ({ hora: k.dia, nivel: `Clase ${String(k.n).padStart(2, "0")}`, titulo: k.titulo, items: [k.resumen], entrega: null })),
  resultados: PR.resultados.map(([a, b]) => `${a}. ${b}`),
  tools: ["chatgpt", "claude", "capcut", "meta", "facebook", "whatsapp"],
  incluye: [`${PR.sesiones} sesiones presenciales`, `${PR.horas} horas de formación`, "Práctica en el Executive Classroom y el Content Lab", "Coffee experience en cada sesión", `Grupo de máximo ${PR.cupos} participantes`, PR.certificado],
  destacado: false,
  note: `${PR.certificado}. No es un título con aval universitario ni reconocimiento estatal.`,
  lugar: `Executive Classroom y Content Lab de ${PR.academia}, ${PR.ciudad}`,
  cupos: PR.cupos,
  politica: `Las formas de pago se confirman por WhatsApp al reservar. El cupo queda apartado cuando la matrícula está confirmada, y solo hay ${PR.cupos} por generación.`,
  ctaTitulo: `Reserva con ${fmt(PR.matricula)}`,
  faq: PR.faq.slice(0, 5)
});
/* ---------------- Ficha publicitaria en imagen (PNG) ---------------- */
const MESCORTO = { 1: "ENE", 2: "FEB", 3: "MAR", 4: "ABR", 5: "MAY", 6: "JUN", 7: "JUL", 8: "AGO", 9: "SEP", 10: "OCT", 11: "NOV", 12: "DIC" };
const DOWC = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

const PROMO_CSS = `${FONTS}
:root{--deep:#2C02A4;--violet:#6A3BF5;--fuchsia:#E0169B;--text:#160A3A;--muted:#5E5484;--line:#E4DBFB}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Manrope",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.promo{position:relative;overflow:hidden;background:#0E0630;color:#fff;display:flex;flex-direction:column}
.ph{position:relative;flex:0 0 auto;overflow:hidden}
.ph>img.bg{width:100%;height:100%;object-fit:cover;display:block}
.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,6,48,.55) 0%,rgba(14,6,48,0) 32%,rgba(14,6,48,.25) 62%,#0E0630 100%)}
.top{position:absolute;left:0;right:0;top:0;z-index:2;display:flex;align-items:flex-start;justify-content:space-between}
.top .logo{display:block;width:auto}
.pill{font-weight:800;letter-spacing:.16em;text-transform:uppercase;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.4);backdrop-filter:blur(6px)}
.fecha{position:absolute;z-index:2;border-radius:22px;background:var(--grad,linear-gradient(120deg,#3A0CC9,#7B4DFF 45%,#E0169B));text-align:center;box-shadow:0 24px 50px -20px rgba(0,0,0,.8)}
.fecha .dw{font-weight:800;letter-spacing:.18em;opacity:.95}
.fecha .dn{font-family:"Anton";line-height:.9}
.fecha .dm{font-weight:800;letter-spacing:.18em;opacity:.95}
.body{position:relative;z-index:2;flex:1;min-height:0;display:flex;flex-direction:column;background:#0E0630}
.barra{flex:0 0 auto}
.eyebrow{font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:#FF9AD2}
h1{font-family:"Anton";text-transform:uppercase;line-height:.94;color:#fff}
.tl{font-weight:800;color:#C9B6FF}
.facts{display:flex;flex-wrap:wrap}
.facts span{font-weight:700;color:#D6CCF5;border:1px solid rgba(255,255,255,.22);border-radius:999px;background:rgba(255,255,255,.07)}
.apps{display:flex;align-items:center}
.apps img{background:#fff;border-radius:50%;object-fit:contain;display:block}
.pay{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:auto}
.pay .p b{display:block;font-family:"Anton";line-height:.9;color:#fff}
.pay .p small{display:block;font-weight:700;color:#C9B6FF}
.pay .w{text-align:right}
.pay .w b{display:block;font-family:"Anton";color:#fff;line-height:1}
.pay .w small{display:block;font-weight:700;color:#C9B6FF}
.barra{display:flex;align-items:center;justify-content:space-between;flex:0 0 auto;background:var(--grad,linear-gradient(120deg,#3A0CC9,#7B4DFF 45%,#E0169B));font-weight:800;color:#fff}
`;

/* Medidas por formato: feed 4:5 y story 9:16 */
const FORMATOS = {
  feed: { w: 1080, h: 1350, ph: 620, pad: 56, logo: 86, h1: 72, tl: 30, eyebrow: 20, fecha: { t: 34, l: 34, w: 170, p: 18, dw: 17, dn: 62, dm: 17 }, pill: 18, fact: 21, app: 54, price: 92, wa: 34, barra: 24 },
  story: { w: 1080, h: 1920, ph: 980, pad: 64, logo: 96, h1: 84, tl: 34, eyebrow: 22, fecha: { t: 44, l: 40, w: 196, p: 22, dw: 19, dn: 72, dm: 19 }, pill: 20, fact: 23, app: 60, price: 108, wa: 38, barra: 26 }
};

const promoHTML = (d, F) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${PROMO_CSS}
.promo{width:${F.w}px;height:${F.h}px}
.ph{height:${F.ph}px}
.top{padding:${F.pad}px ${F.pad}px 0}
.top .logo{height:${F.logo}px}
.pill{font-size:${F.pill}px;padding:${Math.round(F.pill * .55)}px ${F.pill}px}
.fecha{left:${F.pad}px;top:${F.ph - F.fecha.w * .62}px;width:${F.fecha.w}px;padding:${F.fecha.p}px 10px}
.fecha .dw{font-size:${F.fecha.dw}px}
.fecha .dn{font-size:${F.fecha.dn}px;margin:${Math.round(F.fecha.p * .25)}px 0}
.fecha .dm{font-size:${F.fecha.dm}px}
.body{padding:${Math.round(F.pad * .9)}px ${F.pad}px ${F.pad}px}
.eyebrow{font-size:${F.eyebrow}px}
h1{font-size:${F.h1}px;margin:${Math.round(F.pad * .28)}px 0 ${Math.round(F.pad * .2)}px}
.tl{font-size:${F.tl}px}
.facts{gap:${Math.round(F.pad * .2)}px;margin-top:${Math.round(F.pad * .5)}px}
.facts span{font-size:${F.fact}px;padding:${Math.round(F.fact * .5)}px ${Math.round(F.fact * .9)}px}
.apps{gap:${Math.round(F.app * .22)}px;margin-top:${Math.round(F.pad * .45)}px}
.apps img{width:${F.app}px;height:${F.app}px;padding:${Math.round(F.app * .17)}px}
.pay{padding-top:${Math.round(F.pad * .6)}px}
.pay .p b{font-size:${F.price}px}
.pay .p small{font-size:${F.fact}px;margin-top:6px}
.pay .w b{font-size:${F.wa}px}
.pay .w small{font-size:${Math.round(F.fact * .9)}px;margin-top:6px}
.barra{font-size:${F.barra}px;padding:${Math.round(F.barra * .8)}px ${F.pad}px;letter-spacing:.04em}
</style></head><body>
<div class="promo">
  <div class="ph">
    <img class="bg" src="${d.img}" alt="">
    <div class="top"><img class="logo" src="${img("/img/logo-blanco.png")}" alt=""><span class="pill">${esc(d.pill)}</span></div>
    <div class="fecha"><div class="dw">${esc(d.dw)}</div><div class="dn">${esc(d.dn)}</div><div class="dm">${esc(d.dm)}</div></div>
  </div>
  <div class="body">
    <div class="eyebrow">${esc(d.eyebrow)}</div>
    <h1>${esc(d.titulo)}</h1>
    <div class="tl">${esc(d.tagline)}</div>
    <div class="facts">${d.facts.map(f => `<span>${esc(f)}</span>`).join("")}</div>
    ${d.apps.length ? `<div class="apps">${d.apps.map(k => `<img src="${img("/img/tools/" + k + ".svg")}" alt="">`).join("")}</div>` : ""}
    <div class="pay">
      <div class="p"><b>${esc(d.precio)}</b><small>${esc(d.precioNota)}</small></div>
      <div class="w"><b>WhatsApp 9569-1481</b><small>Cupos por orden de pago</small></div>
    </div>
  </div>
  <div class="barra"><span>${esc(d.barra)}</span><span>estudiovector.com</span></div>
</div>
</body></html>`;

const promoTaller = t => {
  const ds = t.days, d0 = ds[0];
  const dow = DOWC[new Date(2026, d0.m - 1, d0.d).getDay()];
  return {
    img: img(t.img), pill: t.mode === "Online" ? "Online" : "Presencial",
    dw: dow, dn: ds.map(x => ds.length > 1 ? String(x.d) : String(x.d).padStart(2, "0")).join("·"),
    dm: [...new Set(ds.map(x => MESCORTO[x.m]))].join("·"),
    eyebrow: "Vector Academy · San Pedro Sula",
    titulo: t.title, tagline: t.tagline,
    facts: [t.time, t.dur + (t.durNote ? " · " + t.durNote : ""), "Máximo 10 cupos", t.extra || "Certificado incluido"].filter(Boolean),
    apps: (t.tools || []).slice(0, 6),
    precio: fmt(t.price), precioNota: "por persona",
    barra: t.dayLabel
  };
};

const promoPrograma = () => {
  const ini = PR.inicio.split("-").map(Number);
  return {
    img: img(PR.heroImg), pill: PR.generacion,
    dw: "INICIA", dn: String(ini[2]).padStart(2, "0"), dm: MESCORTO[ini[1]],
    eyebrow: `${PR.academia} · ${PR.ciudad}`,
    titulo: PR.h1, tagline: PR.nombre,
    facts: [`${PR.sesiones} sesiones · ${PR.horas} horas`, `${PR.dias}, ${PR.horario}`, `${PR.cupos} cupos`, "Certificado de aprobación"],
    apps: ["chatgpt", "claude", "capcut", "meta", "facebook", "whatsapp"],
    precio: fmt(PR.precio), precioNota: `reservas con ${fmt(PR.matricula)}`,
    barra: `Del ${ini[2]} de noviembre al 10 de diciembre de ${ini[0]}`
  };
};


(async () => {
  let chromium;
  try { ({ chromium } = require("playwright")); }
  catch (e) { try { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); } catch (e2) { console.error("Falta Playwright: npm i -g playwright && npx playwright install chromium"); process.exit(1); } }
  const launch = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  const browser = await chromium.launch(launch);

  /* Brochure en PDF: cada página se encoge lo justo si el contenido se pasa */
  const brochure = async (html, out) => {
    const tmp = path.join(os.tmpdir(), "ficha-" + path.basename(out) + ".html");
    fs.writeFileSync(tmp, html);
    const pg = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
    await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
    await pg.evaluate(() => document.fonts.ready);
    const ajustes = await pg.evaluate(() => {
      const out = [];
      document.querySelectorAll(".p").forEach((el, i) => {
        const inner = el.querySelector(".in");
        if (!inner) return;
        let z = 1;
        while (inner.scrollHeight > inner.clientHeight + 1 && z > 0.6) {
          z -= 0.01;
          inner.style.zoom = z;
        }
        if (z < 1) out.push((i + 1) + "→" + Math.round(z * 100) + "%");
      });
      return out;
    });
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await pg.pdf({ path: out, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await pg.close();
    const n = (html.match(/<section class="p[ "]/g) || []).length;
    console.log("  ✓", out, `${n} págs · ${(fs.statSync(out).size / 1024).toFixed(0)} KB`, ajustes.length ? "· escala " + ajustes.join(" ") : "");
    fs.unlinkSync(tmp);
  };

  /* Ficha publicitaria en imagen */
  const shot = async (datos, out, formato) => {
    const F = FORMATOS[formato];
    const tmp = path.join(os.tmpdir(), "promo-" + path.basename(out) + ".html");
    fs.writeFileSync(tmp, promoHTML(datos, F));
    const pg = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 1 });
    await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
    await pg.evaluate(() => document.fonts.ready);
    await pg.evaluate(() => {
      const body = document.querySelector(".body");
      const hijos = [...body.children];
      const alto = () => hijos.reduce((a, el) => a + el.getBoundingClientRect().height, 0);
      const cs = getComputedStyle(body);
      const libre = body.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      let z = 1;
      while (alto() > libre && z > 0.62) { z -= 0.02; body.style.zoom = z; }
    });
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await pg.locator(".promo").screenshot({ path: out });
    await pg.close();
    console.log("  ✓", out, (fs.statSync(out).size / 1024).toFixed(0) + " KB");
    fs.unlinkSync(tmp);
  };

  console.log("Fichas en PDF (brochure vertical)…");
  for (const t of T) await brochure(doc(`${t.title} · Estudio Vector`, paginas(tallerModelo(t))), path.join("talleres", t.slug, t.slug + ".pdf"));
  await brochure(doc(`${PR.nombre} · ${PR.academia}`, paginas(programaModelo())), path.join(PR.slug, PR.slug + ".pdf"));

  console.log("Fichas publicitarias en PNG…");
  for (const t of T) {
    await shot(promoTaller(t), path.join("talleres", t.slug, t.slug + ".png"), "feed");
    await shot(promoTaller(t), path.join("talleres", t.slug, t.slug + "-story.png"), "story");
  }
  await shot(promoPrograma(), path.join(PR.slug, PR.slug + ".png"), "feed");
  await shot(promoPrograma(), path.join(PR.slug, PR.slug + "-story.png"), "story");

  await browser.close();
  console.log("Listo.");
})().catch(e => { console.error(e); process.exit(1); });
