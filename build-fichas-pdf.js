#!/usr/bin/env node
/*
 * Genera una ficha en PDF por cada taller y por el Programa Ejecutivo, con la marca de Estudio Vector.
 * Son las fichas que se le mandan a un prospecto por WhatsApp: portada con la fecha y el precio,
 * lo que aprenderá, el plan de estudio si el taller lo trae, lo que incluye y cómo reservar.
 *
 * Uso:  node build-fichas-pdf.js
 *   → talleres/<slug>/<slug>.pdf  y  <slug-del-programa>/<slug>.pdf
 * Requiere Playwright con Chromium (igual que build-pdf.js).
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

const FONTS = `
@font-face{font-family:"Anton";src:url("${file("assets/fonts/anton-latin-400-normal.woff2")}") format("woff2");font-weight:400}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-400-normal.woff2")}") format("woff2");font-weight:400}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-700-normal.woff2")}") format("woff2");font-weight:700}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-800-normal.woff2")}") format("woff2");font-weight:800}`;

const CSS = `${FONTS}
:root{--deep:#2C02A4;--violet:#6A3BF5;--fuchsia:#E0169B;--text:#160A3A;--muted:#5E5484;--dim:#8C83AF;--line:#E4DBFB;--bg:#F7F4FF;--ok:#0E9A60}
@page{size:Letter;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:"Manrope",system-ui,sans-serif;color:var(--text);font-size:9.5pt;line-height:1.38;-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
.page{width:8.5in;height:11in;position:relative;page-break-after:always;background:var(--bg);overflow:hidden}
.pgin{height:auto;min-height:11in;padding:.4in .5in .34in;display:flex;flex-direction:column}
.page.flow,.page.flow .pgin{height:auto;min-height:11in}
.page:last-child{page-break-after:auto}

.display{font-family:"Anton","Impact",sans-serif;font-weight:400;text-transform:uppercase;line-height:.95}

.hero{margin:-.4in -.5in .18in;padding:.34in .5in .26in;color:#fff;background:radial-gradient(70% 60% at 100% 0%,rgba(224,22,155,.6),transparent 60%),radial-gradient(60% 50% at 0% 40%,rgba(123,77,255,.5),transparent 60%),linear-gradient(160deg,#12063F 0%,#2C02A4 55%,#4B14C8 100%)}
.hero .top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.16in}
.hero .logo{height:.42in}
.hero .pill{font-size:8pt;font-weight:800;letter-spacing:.18em;text-transform:uppercase;padding:6px 13px;border:1px solid rgba(255,255,255,.34);border-radius:99px;background:rgba(255,255,255,.08)}
.hero .eyebrow{font-size:8.5pt;letter-spacing:.26em;text-transform:uppercase;font-weight:800;color:#FF9AD2}
.hero h1{font-size:27pt;margin:4px 0 0;color:#fff;max-width:6.6in}
.hero .tl{margin-top:5px;font-size:10pt;font-weight:800;color:#FF9AD2}
.hero .lead{max-width:6.2in;margin:.09in 0 0;font-size:9pt;color:#D6CCF5}
.kv{display:flex;gap:.08in;margin-top:.16in;flex-wrap:wrap}
.kv div{flex:1;min-width:1.3in;padding:7px 10px;border-radius:12px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.17)}
.kv small{display:block;font-size:7pt;letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:#FF9AD2}
.kv b{display:block;margin-top:2px;font-size:9.5pt;line-height:1.2}
.kv b.big{font-family:"Anton";font-size:17pt;line-height:1}

h2.s{font-family:"Anton";text-transform:uppercase;font-size:13.5pt;color:var(--deep);margin:.15in 0 .07in;line-height:1}
.two{display:grid;grid-template-columns:1fr 1fr;gap:.1in}
.card{background:#fff;border:1px solid var(--line);border-radius:13px;padding:.11in .13in;break-inside:avoid}
ul.clean{list-style:none;margin:0;padding:0}
ul.clean li{position:relative;padding-left:15px;margin-bottom:3px;font-size:9pt;line-height:1.35}
ul.clean li::before{content:"";position:absolute;left:3px;top:6px;width:5px;height:5px;border-radius:50%;background:var(--violet)}
.res li::before{background:var(--ok)}
.chips{display:flex;flex-wrap:wrap;gap:5px}
.chips span{font-size:8pt;font-weight:800;padding:4px 9px;border-radius:99px;background:#fff;border:1px solid var(--line);color:var(--muted)}
.chips span.hl{background:var(--fuchsia);border-color:var(--fuchsia);color:#fff}
.tools{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:.08in}
.tools img{width:.22in;height:.22in;object-fit:contain;background:#fff;border:1px solid var(--line);border-radius:7px;padding:3px}
.tools small{font-size:8.5pt;color:var(--muted);font-weight:700}
.note{margin-top:.1in;padding:8px 11px;border:1px dashed var(--line);border-radius:12px;font-size:9pt;color:var(--muted);background:#fff}

.plan{display:grid;gap:6px}
.pb{background:#fff;border:1px solid var(--line);border-left:4px solid var(--violet);border-radius:12px;padding:8px 11px;break-inside:avoid}
.pb.soft{border-left-color:var(--line);background:#F4EFFF}
.pb .ph2{display:flex;gap:8px;align-items:center;margin-bottom:3px}
.pb .t{font-size:8.5pt;font-weight:800;color:var(--fuchsia)}
.pb .n{font-size:7pt;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:2px 7px;border-radius:99px;background:#F4EFFF;border:1px solid var(--line);color:var(--muted)}
.pb b{display:block;font-size:10pt;margin-bottom:3px}
.pb ul{margin:0;padding-left:15px}
.pb li{font-size:8.5pt;line-height:1.34;color:var(--muted);margin-bottom:1px}

.inst{display:flex;gap:11px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:13px;padding:.1in}
.inst img{width:.52in;height:.52in;border-radius:50%;object-fit:cover}
.inst small{display:block;font-size:7.5pt;letter-spacing:.16em;text-transform:uppercase;color:var(--fuchsia);font-weight:800}
.inst b{display:block;font-size:10.5pt}
.inst span{display:block;font-size:8.5pt;color:var(--muted)}

.cta{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:.16in;padding:.14in .18in;border-radius:15px;color:#fff;background:linear-gradient(120deg,#3A0CC9 0%,#7B4DFF 45%,#E0169B 100%)}
.cta b{display:block;font-family:"Anton";text-transform:uppercase;font-size:15.5pt;line-height:1}
.cta span{display:block;font-size:9pt;color:rgba(255,255,255,.88);max-width:3.8in;margin-top:3px}
.cta .btns{display:flex;flex-direction:column;gap:6px;align-items:flex-end}
.cta a{white-space:nowrap;font-weight:800;font-size:10pt;padding:9px 15px;border-radius:11px;background:#fff;color:var(--deep)}
.cta a.g{background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.4)}
.foot{margin-top:.11in;display:flex;justify-content:space-between;font-size:8pt;color:var(--dim);font-weight:700}
`;

const toolsRow = t => !t.tools || !t.tools.length ? "" :
  `<div class="tools">${t.tools.map(k => `<img src="${img("/img/tools/" + k + ".svg")}" alt="">`).join("")}<small>${t.tools.map(k => TOOLS[k].name).join(" · ")}</small></div>`;

const planBloques = plan => `<div class="plan">${plan.bloques.map(b => `<div class="pb${/pausa|cierre|arranque/i.test(b.nivel) ? " soft" : ""}">
  <div class="ph2"><span class="t">${esc(b.hora)}</span><span class="n">${esc(b.nivel)}</span></div>
  <b>${esc(b.titulo)}</b><ul>${b.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>`;

const instructor = `<div class="inst"><img src="${img("/img/edgardo-avatar.jpg")}" alt=""><div><small>Imparte</small><b>Edgardo A. López</b><span>Fundador y Director Creativo de Estudio Vector · Capacitador de más de 500 alumnos · Forum Ruta Copán 2026</span></div></div>`;

const cierre = (titulo, texto, waURL, pagina) => `<div class="cta"><div><b>${esc(titulo)}</b><span>${esc(texto)}</span></div>
  <div class="btns"><a href="${waURL}">WhatsApp 9569-1481</a><a class="g" href="${pagina}">Ver la página</a></div></div>
  <div class="foot"><span>Estudio Vector · Vector Academy · San Pedro Sula, Honduras</span><span>estudiovector.com</span></div>`;

/* ---------------- Ficha de un taller ---------------- */
const fichaTaller = t => `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(t.title)} · Estudio Vector</title><style>${CSS}</style></head><body>
<section class="page"><div class="pgin">
  <div class="hero">
    <div class="top"><img class="logo" src="${img("/img/logo-blanco.png")}" alt="Vector MKT"><span class="pill">${t.mode === "Online" ? "Taller online" : "Taller presencial"}</span></div>
    <div class="eyebrow">Vector Academy · San Pedro Sula</div>
    <h1 class="display">${esc(t.title)}</h1>
    <div class="tl">${esc(t.tagline)}</div>
    <p class="lead">${esc(t.sub)}</p>
    <div class="kv">
      <div><small>Fecha</small><b>${esc(t.dayLabel)}</b></div>
      <div><small>Horario</small><b>${esc(t.time)}</b></div>
      <div><small>Duración</small><b>${esc(t.dur)}${t.durNote ? " · " + esc(t.durNote) : ""}</b></div>
      <div><small>Inversión</small><b class="big">${fmt(t.price)}</b></div>
    </div>
  </div>

  <h2 class="s">Lo que aprenderás</h2>
  <div class="card"><ul class="clean">${t.learn.map(l => `<li>${esc(l)}</li>`).join("")}</ul>${toolsRow(t)}</div>

  <div class="two" style="margin-top:.14in">
    <div><h2 class="s" style="margin-top:0">Resultados para tu negocio</h2><div class="card"><ul class="clean res">${t.results.map(r => `<li>${esc(r)}</li>`).join("")}</ul></div></div>
    <div><h2 class="s" style="margin-top:0">Ideal para</h2><div class="card"><p style="margin:0;font-size:9.5pt">${esc(t.ideal)}</p>
      <div class="chips" style="margin-top:10px">${t.extra ? `<span class="hl">${esc(t.extra)}</span>` : ""}${INCLUYE(t).map(i => `<span>${esc(i)}</span>`).join("")}</div></div></div>
  </div>
  ${t.note ? `<div class="note">${esc(t.note)}</div>` : ""}
  <div style="margin-top:.16in">${instructor}</div>
  ${cierre("Reserva tu cupo", `Solo 10 cupos. Al terminar te llevas: ${t.take}`, waLink(t), `${SITE}/talleres/${t.slug}/`)}
</div></section>
${t.plan ? `<section class="page flow"><div class="pgin">
  <div class="hero" style="padding-bottom:.26in">
    <div class="top"><img class="logo" src="${img("/img/logo-blanco.png")}" alt="Vector MKT"><span class="pill">Plan de estudio</span></div>
    <h1 class="display" style="font-size:26pt">${esc(t.title)}</h1>
    <p class="lead">${esc(t.plan.lead || "")}</p>
  </div>
  ${planBloques(t.plan)}
  ${cierre("Aparta tu lugar", "Los cupos se asignan por orden de pago.", waLink(t), `${SITE}/talleres/${t.slug}/`)}
</div></section>` : ""}
</body></html>`;

/* ---------------- Ficha del Programa Ejecutivo ---------------- */
const fichaPrograma = () => `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(PR.nombre)} · ${esc(PR.academia)}</title><style>${CSS}</style></head><body>
<section class="page"><div class="pgin">
  <div class="hero">
    <div class="top"><img class="logo" src="${img("/img/logo-blanco.png")}" alt="Vector MKT"><span class="pill">${esc(PR.generacion)}</span></div>
    <div class="eyebrow">${esc(PR.academia)} · ${esc(PR.ciudad)}</div>
    <h1 class="display">${esc(PR.h1)}</h1>
    <div class="tl">${esc(PR.nombre)}</div>
    <p class="lead">${esc(PR.sub)}</p>
    <div class="kv">
      <div><small>Inicia</small><b>${esc(PR.inicioTexto)}</b></div>
      <div><small>Termina</small><b>${esc(PR.finTexto)}</b></div>
      <div><small>Horario</small><b>${esc(PR.dias)}, ${esc(PR.horario)}</b></div>
      <div><small>Inversión</small><b class="big">${fmt(PR.precio)}</b></div>
    </div>
  </div>

  <div class="two">
    <div><h2 class="s" style="margin-top:0">Al terminar el programa</h2><div class="card"><ul class="clean res">${PR.resultados.map(([a, b]) => `<li><b>${esc(a)}.</b> ${esc(b)}</li>`).join("")}</ul></div></div>
    <div><h2 class="s" style="margin-top:0">Dónde vas a estudiar</h2><div class="card">${PR.espacios.map(e => `<p style="margin:0 0 8px;font-size:9.5pt"><b>${esc(e.nombre)}.</b> ${esc(e.lead)}</p>`).join("")}</div>
      <h2 class="s">Inversión</h2><div class="card"><p style="margin:0;font-size:9.5pt">Reservas tu cupo con una matrícula de <b>${fmt(PR.matricula)}</b>, que se aplica al total y deja un saldo de <b>${fmt(PR.saldo)}</b>. ${PR.cupos} cupos.</p>
      <div class="chips" style="margin-top:9px"><span class="hl">${PR.sesiones} sesiones</span><span>${PR.horas} horas presenciales</span><span>${PR.semanas} semanas</span><span>Coffee experience</span><span>Certificado de aprobación</span></div></div></div>
  </div>
  <div class="note">${esc(PR.certificado)}. No es un título con aval universitario ni reconocimiento estatal.</div>
  <div style="margin-top:.14in">${instructor}</div>
  ${cierre("Reserva tu cupo", `Dirigido a ${PR.dirigido.toLowerCase()}`, waText(`Hola Vector Academy, quiero reservar mi cupo en el ${PR.nombre} (${PR.generacion}).`), `${SITE}/${PR.slug}/`)}
</div></section>
<section class="page flow"><div class="pgin">
  <div class="hero" style="padding-bottom:.26in">
    <div class="top"><img class="logo" src="${img("/img/logo-blanco.png")}" alt="Vector MKT"><span class="pill">Temario · ${PR.sesiones} clases</span></div>
    <h1 class="display" style="font-size:26pt">${esc(PR.nombre)}</h1>
    <p class="lead">${esc(PR.dias)}, de ${esc(PR.horario)}. ${PR.semanas} semanas, ${PR.horas} horas presenciales.</p>
  </div>
  <div class="plan">${PR.clases.map(k => `<div class="pb"><div class="ph2"><span class="t">${esc(k.dia)}</span><span class="n">Clase ${String(k.n).padStart(2, "0")}</span></div><b>${esc(k.titulo)}</b><ul><li>${esc(k.resumen)}</li></ul></div>`).join("")}</div>
  ${cierre("Aparta tu lugar", `Matrícula de ${fmt(PR.matricula)} aplicada al total de ${fmt(PR.precio)}.`, waText(`Hola Vector Academy, quiero reservar mi cupo en el ${PR.nombre}.`), `${SITE}/${PR.slug}/`)}
</div></section>
</body></html>`;

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
  const page = await browser.newPage();

  const render = async (html, out) => {
    const tmp = path.join(os.tmpdir(), "ficha-" + path.basename(out) + ".html");
    fs.writeFileSync(tmp, html);
    await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    /* Las páginas de altura fija se encogen lo justo para no desbordar, sin importar cuánto texto traiga el taller */
    const ajustes = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll(".page:not(.flow)").forEach((el, i) => {
        const inner = el.querySelector(".pgin");
        if (!inner) return;
        let z = 1;
        while (inner.getBoundingClientRect().height > el.clientHeight + 1 && z > 0.72) {
          z -= 0.01;
          inner.style.zoom = z;
        }
        if (z < 1) out.push([i + 1, Math.round(z * 100) + "%"]);
      });
      /* Las páginas que fluyen (plan de estudio, temario) se ajustan para no dejar una hoja casi vacía al final */
      document.querySelectorAll(".page.flow").forEach((el, i) => {
        const inner = el.querySelector(".pgin");
        if (!inner) return;
        const H = parseFloat(getComputedStyle(inner).minHeight);
        const alto = () => inner.getBoundingClientRect().height;
        const hojas = Math.ceil(alto() / H);
        const sobra = alto() - (hojas - 1) * H;
        if (hojas < 2 || sobra > H * 0.35) return;
        let z = 1;
        const meta = (hojas - 1) * H;
        while (alto() > meta + 1 && z > 0.72) { z -= 0.01; inner.style.zoom = z; }
        if (z < 1) out.push(["flujo " + (i + 1), Math.round(z * 100) + "%"]);
      });
      return out;
    });
    if (ajustes.length) console.log("    · ajuste de escala:", ajustes.map(([p, z]) => `pág ${p} → ${z}`).join(", "));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await page.pdf({ path: out, format: "Letter", printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    console.log("  ✓", out, (fs.statSync(out).size / 1024).toFixed(0) + " KB");
    fs.unlinkSync(tmp);
  };

  const shot = async (datos, out, formato) => {
    const F = FORMATOS[formato];
    const tmp = path.join(os.tmpdir(), "promo-" + path.basename(out) + ".html");
    fs.writeFileSync(tmp, promoHTML(datos, F));
    const pg = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 1 });
    await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
    await pg.evaluate(() => document.fonts.ready);
    const z = await pg.evaluate(() => {
      const body = document.querySelector(".body");
      const hijos = [...body.children];
      const alto = () => hijos.reduce((a, el) => a + el.getBoundingClientRect().height, 0);
      const cs = getComputedStyle(body);
      const libre = body.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      let z = 1;
      while (alto() > libre && z > 0.62) { z -= 0.02; body.style.zoom = z; }
      return z;
    });
    if (z < 1) console.log("    · ajuste del texto:", Math.round(z * 100) + "%");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await pg.locator(".promo").screenshot({ path: out });
    await pg.close();
    console.log("  ✓", out, (fs.statSync(out).size / 1024).toFixed(0) + " KB");
    fs.unlinkSync(tmp);
  };

  console.log("Generando fichas en PDF…");
  for (const t of T) await render(fichaTaller(t), path.join("talleres", t.slug, t.slug + ".pdf"));
  await render(fichaPrograma(), path.join(PR.slug, PR.slug + ".pdf"));
  console.log("Generando fichas publicitarias en PNG…");
  for (const t of T) {
    await shot(promoTaller(t), path.join("talleres", t.slug, t.slug + ".png"), "feed");
    await shot(promoTaller(t), path.join("talleres", t.slug, t.slug + "-story.png"), "story");
  }
  await shot(promoPrograma(), path.join(PR.slug, PR.slug + ".png"), "feed");
  await shot(promoPrograma(), path.join(PR.slug, PR.slug + "-story.png"), "story");
  await browser.close();
  console.log("Listo.");
})().catch(e => { console.error(e); process.exit(1); });
