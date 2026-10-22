#!/usr/bin/env node
/*
 * Planes de estudio de capacitaciones a empresas, con la marca de Estudio Vector
 * y la del cliente. Cada plan es un JSON en src/planes/ y sale un PDF vertical
 * (1080 x 1920, formato de celular) listo para mandar por WhatsApp o correo.
 *
 * Uso:  node build-plan.js [slug]     (o  npm run plan)
 * Requiere Playwright con Chromium.
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const { pathToFileURL } = require("url");
const ILU = require("./src/planes/ilustraciones-tiktok.js");

const SITE = "https://estudiovector.com";
const WA = "50495691481";
const file = p => pathToFileURL(path.resolve(p)).href;
const img = p => file(p.replace(/^\//, ""));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const FONTS = `
@font-face{font-family:"Anton";src:url("${file("assets/fonts/anton-latin-400-normal.woff2")}") format("woff2");font-weight:400}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-400-normal.woff2")}") format("woff2");font-weight:400}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-700-normal.woff2")}") format("woff2");font-weight:700}
@font-face{font-family:"Manrope";src:url("${file("assets/fonts/manrope-latin-800-normal.woff2")}") format("woff2");font-weight:800}`;

/* Paleta: morado de Vector con el rosa del cliente como acento */
const CSS = `${FONTS}
:root{--deep:#2C02A4;--violet:#6A3BF5;--violet2:#7B4DFF;--rosa:#E0169B;--rosa2:#FF6FB5;--text:#2A0F24;--muted:#6E5566;--dim:#9B7D8E;--line:#F3DCE8;--bg:#FFF6FA;--card:#fff;--ink:#1B0718;--ok:#0E9A60;--grad:linear-gradient(120deg,#3A0CC9 0%,#B026E0 50%,#FF4FB8 100%)}
@page{size:1080px 1920px;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
li{list-style:none}
body{font-family:"Manrope",system-ui,sans-serif;color:var(--text);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.p{position:relative;width:1080px;height:1920px;overflow:hidden;page-break-after:always;background:var(--bg);display:flex;flex-direction:column}
.p:last-child{page-break-after:auto}
.in{flex:1;min-height:0;display:flex;flex-direction:column;padding:76px 80px 56px}
.in.mid{justify-content:center}
.display{font-family:"Anton","Impact",sans-serif;font-weight:400;text-transform:uppercase;line-height:.95}

/* Encabezado co-marcado */
.hd{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:48px 80px 0;flex:0 0 auto}
.hd .marcas{display:flex;align-items:center;gap:22px}
.hd .marcas img{height:54px;width:auto;display:block}
.hd .chip{display:grid;place-items:center;padding:10px 18px;border-radius:18px;background:var(--ink)}
.hd .chip img{height:46px}
.p.dark .hd .chip{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2)}
.hd .x{font-size:26px;font-weight:800;color:var(--line)}
.hd span.sec{font-size:21px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);text-align:right}
.ft{display:flex;align-items:center;justify-content:space-between;padding:0 80px 44px;font-size:20px;font-weight:800;color:var(--dim);flex:0 0 auto}
.p.dark{background:var(--ink);color:#fff}
.p.dark .ft{color:rgba(255,255,255,.5)}
.p.dark .hd .x{color:rgba(255,255,255,.3)}
.p.dark .hd span.sec{color:rgba(255,255,255,.55)}

.eyebrow{font-size:25px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:var(--rosa)}
.p.dark .eyebrow{color:var(--rosa2)}
h2.t{font-family:"Anton";text-transform:uppercase;font-size:88px;line-height:.94;margin:18px 0 26px;color:var(--deep)}
.p.dark h2.t{color:#fff}
h3.s{font-family:"Anton";text-transform:uppercase;font-size:50px;line-height:1;margin:48px 0 20px;color:var(--deep)}
p.lead{font-size:38px;line-height:1.45;color:var(--muted)}
p.par{font-size:31px;line-height:1.5;color:var(--muted);margin-bottom:22px}

/* Portada */
.cov{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;padding:0 80px;background:var(--ink);color:#fff;position:relative;overflow:hidden}
.cov h1{font-family:"Anton";text-transform:uppercase;font-size:94px;line-height:.98;margin:0 0 14px}
.cov .sub{font-family:"Anton";text-transform:uppercase;font-size:56px;line-height:1.02;color:var(--rosa2);margin-bottom:30px}
.cov .para{font-size:30px;font-weight:800;color:#E8D6E4;margin-bottom:46px}
.cov-kv{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.cov-kv div{padding:26px 30px;border-radius:22px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18)}
.cov-kv small{display:block;font-size:21px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--rosa2)}
.cov-kv b{display:block;margin-top:9px;font-size:34px;line-height:1.18}
.cov .flores{position:absolute;inset:0;pointer-events:none}

/* Bloques y listas */
.cards{display:grid;gap:22px}
.card{background:var(--card);border:1px solid var(--line);border-radius:30px;padding:40px 44px}
.bq{display:flex;align-items:center;gap:16px;margin-bottom:14px}
.bq .m{font-family:"Anton";font-size:40px;line-height:1;color:transparent;background:var(--grad);-webkit-background-clip:text;background-clip:text}
.bq .n{font-size:20px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:9px 20px;border-radius:999px;background:var(--bg);border:1px solid var(--line);color:var(--muted)}
.card h4{font-size:46px;line-height:1.12;margin-bottom:18px}
.card .det{font-size:30px;line-height:1.42;color:var(--muted)}
.pract{display:flex;gap:18px;align-items:flex-start;margin-top:22px;padding:24px 28px;border-radius:20px;background:var(--bg);border:1px solid var(--line)}
.pract svg{width:42px;height:42px;flex:0 0 auto;color:var(--violet2);margin-top:3px}
.pract small{display:block;font-size:19px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--violet2)}
.pract b{display:block;font-size:28px;line-height:1.3;margin-top:7px;font-weight:700;color:var(--text)}
.entrega{display:flex;gap:20px;align-items:flex-start;margin-top:16px;padding:24px 28px;border-radius:20px;background:rgba(14,154,96,.08);border:1px solid rgba(14,154,96,.26)}
.entrega svg{width:40px;height:40px;flex:0 0 auto;color:var(--ok);margin-top:2px}
.entrega small{display:block;font-size:19px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--ok)}
.entrega b{display:block;font-size:30px;line-height:1.28;margin-top:7px}
.check{display:grid;gap:20px}
.check li{display:flex;gap:22px;align-items:flex-start;font-size:34px;line-height:1.36}
.check svg{width:42px;height:42px;flex:0 0 auto;color:var(--ok);margin-top:6px}
.p.dark .check li{color:#F0E4EE}
.num{display:grid;gap:18px;counter-reset:q}
.num li{counter-increment:q;display:grid;grid-template-columns:76px 1fr;gap:24px;align-items:start;background:var(--card);border:1px solid var(--line);border-radius:24px;padding:28px 32px;font-size:30px;line-height:1.38;color:var(--muted)}
.num li::before{content:counter(q);display:grid;place-items:center;width:76px;height:76px;border-radius:24px;background:var(--grad);font-family:"Anton";font-size:40px;color:#fff}
.nota{margin-top:26px;padding:30px 34px;border-radius:24px;border:2px dashed var(--line);background:var(--card);font-size:28px;line-height:1.42;color:var(--muted)}
.p.dark .nota{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.24);color:#E8D6E4}
.ilu{margin-top:auto;padding-top:34px}
.ilu svg{width:100%;height:auto;display:block;border-radius:30px}
.ilu figcaption{margin-top:18px;font-size:24px;font-weight:700;color:var(--dim);text-align:center}
.resu{margin-top:26px;padding:34px 38px;border-radius:26px;background:var(--grad);color:#fff}
.resu small{display:block;font-size:21px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.8)}
.resu b{display:block;font-size:34px;line-height:1.28;margin-top:10px}
.jor{display:flex;align-items:baseline;gap:26px;margin-bottom:10px}
.jor b{font-family:"Anton";font-size:150px;line-height:.8;color:transparent;background:var(--grad);-webkit-background-clip:text;background-clip:text}
.jor span{font-size:26px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}
.cta{margin-top:auto;padding:46px;border-radius:32px;background:var(--grad);text-align:center}
.cta b{display:block;font-family:"Anton";text-transform:uppercase;font-size:66px;line-height:1;color:#fff}
.cta span{display:block;font-size:30px;color:rgba(255,255,255,.92);margin-top:14px}
.cta .wa{display:inline-block;margin-top:30px;padding:26px 48px;border-radius:24px;background:#fff;color:var(--deep);font-family:"Anton";font-size:50px}
`;

const IC = {
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4.5 4.5L19 7"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3a3 3 0 0 1-3 4M7 5H4a3 3 0 0 0 3 4"/></svg>`,
  mano: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 11V4.5a1.5 1.5 0 0 1 3 0V12"/><path d="M9 12V6.5a1.5 1.5 0 0 1 3 0V11"/><path d="M15 12V7.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-6-6v-3a1.5 1.5 0 0 1 3 0v2"/></svg>`
};

const paginas = d => {
  const P = [];
  const marca = `Estudio Vector × ${d.cliente.nombre}`;
  const logos = dark => `<div class="marcas"><img src="${img(dark ? "/img/logo-blanco.png" : "/img/logo-morado.png")}" alt="Estudio Vector"><span class="x">×</span><span class="chip"><img src="${img(d.cliente.logo)}" alt="${esc(d.cliente.nombre)}"></span></div>`;
  const hd = (sec, dark) => `<header class="hd">${logos(dark)}<span class="sec">${esc(sec)}</span></header>`;
  const ft = n => `<footer class="ft"><span>${esc(marca)}</span><span>${esc(String(n))}</span></footer>`;
  let n = 2;

  /* Portada */
  P.push(`<section class="p dark">
  ${hd(d.modalidad, true)}
  <div class="cov">
    <div class="flores">${ILU.flor(940, 300, 150, "#FF4FB8", .13)}${ILU.flor(140, 1180, 120, "#B026E0", .12)}${ILU.flor(880, 980, 90, "#FF6FB5", .1)}</div>
    <div class="eyebrow">Plan de estudios</div>
    <h1>${esc(d.titulo)}</h1>
    <div class="sub">${esc(d.cliente.nombre)}</div>
    <div class="para">Capacitación impartida por Estudio Vector para el equipo de ${esc(d.cliente.nombre)}</div>
    <div class="cov-kv">
      <div><small>Modalidad</small><b>${esc(d.modalidad)}</b></div>
      <div><small>Duración</small><b>${d.dias} días · ${d.horasDia} h por día</b></div>
      <div><small>Total</small><b>${d.horasTotal} horas de formación</b></div>
      <div><small>Lugar</small><b>${esc(d.lugar)}</b></div>
    </div>
  </div>
  ${ft(1)}
</section>`);

  /* Introducción y objetivo */
  P.push(`<section class="p">
  ${hd("Introducción")}
  <div class="in">
    <div class="eyebrow">De qué se trata</div>
    <h2 class="t">Introducción</h2>
    ${d.introduccion.map(x => `<p class="par">${esc(x)}</p>`).join("")}
    <h3 class="s">Objetivo general</h3>
    <p class="lead">${esc(d.objetivo)}</p>
    <h3 class="s">Metodología</h3>
    <p class="par">${esc(d.metodologia)}</p>
  </div>
  ${ft(n++)}
</section>`);

  /* Al finalizar podrán */
  P.push(`<section class="p">
  ${hd("Resultados de aprendizaje")}
  <div class="in">
    <div class="eyebrow">Al finalizar, las participantes podrán</div>
    <h2 class="t">Lo que van a saber hacer</h2>
    <ul class="check">${d.logros.map(x => `<li>${IC.check}<span>${esc(x)}</span></li>`).join("")}</ul>
  </div>
  ${ft(n++)}
</section>`);

  /* Jornadas */
  d.jornadas.forEach(j => {
    P.push(`<section class="p">
  ${hd(`Día ${j.n}`)}
  <div class="in mid">
    <div class="jor"><b>${String(j.n).padStart(2, "0")}</b><span>Día ${j.n} de ${d.dias} · ${d.horasDia} horas</span></div>
    <h2 class="t">${esc(j.titulo)}</h2>
    <p class="lead">Meta del día: ${esc(j.meta)}</p>
    <ul class="num" style="margin-top:40px">${j.bloques.map(b => `<li><span><b style="color:var(--text);font-size:34px;display:block;margin-bottom:6px">${esc(b.titulo)}</b>${b.min} minutos</span></li>`).join("")}</ul>
    ${j.ilustracion && ILU[j.ilustracion] ? `<figure class="ilu">${ILU[j.ilustracion]()}</figure>` : ""}
  </div>
  ${ft(n++)}
</section>`);

    j.bloques.forEach((b, i) => {
      P.push(`<section class="p">
  ${hd(`Día ${j.n} · bloque ${i + 1} de ${j.bloques.length}`)}
  <div class="in mid">
    <article class="card">
      <div class="bq"><span class="m">${b.min} MIN</span><span class="n">Día ${j.n}</span></div>
      <h4>${esc(b.titulo)}</h4>
      <p class="det">${esc(b.detalle)}</p>
      <div class="pract">${IC.mano}<div><small>Práctica</small><b>${esc(b.practica)}</b></div></div>
      ${b.entrega ? `<div class="entrega">${IC.trophy}<div><small>Producto del bloque</small><b>${esc(b.entrega)}</b></div></div>` : ""}
    </article>
  </div>
  ${ft(n++)}
</section>`);
    });

    P.push(`<section class="p">
  ${hd(`Día ${j.n} · cierre`)}
  <div class="in mid">
    <div class="eyebrow">Día ${j.n}</div>
    <h2 class="t">Resultado del día</h2>
    <div class="resu"><small>Al terminar la jornada</small><b>${esc(j.resultado)}</b></div>
    <ul class="check" style="margin-top:36px">${j.bloques.filter(b => b.entrega).map(b => `<li>${IC.check}<span>${esc(b.entrega)}</span></li>`).join("")}</ul>
  </div>
  ${ft(n++)}
</section>`);
  });

  /* Materiales y requisitos */
  P.push(`<section class="p">
  ${hd("Materiales y requisitos")}
  <div class="in">
    <div class="eyebrow">Lo práctico</div>
    <h2 class="t">Materiales y requisitos</h2>
    <p class="par">${esc(d.materiales)}</p>
    <h3 class="s">Requisitos de participación</h3>
    <ul class="check">${d.requisitos.map(x => `<li>${IC.check}<span>${esc(x)}</span></li>`).join("")}</ul>
    ${d.notaCuenta ? `<div class="nota">${esc(d.notaCuenta)}</div>` : ""}
  </div>
  ${ft(n++)}
</section>`);

  /* Cierre */
  P.push(`<section class="p dark">
  ${hd("Coordinación", true)}
  <div class="in">
    <div class="eyebrow">Siguiente paso</div>
    <h2 class="t">Coordinemos la fecha</h2>
    <p class="lead">${esc(d.fechaNota)}. La capacitación se imparte en ${esc(d.lugar.toLowerCase())}, en ${d.dias} jornadas de ${d.horasDia} horas.</p>
    <div class="nota">Imparte Estudio Vector · Dirigido al equipo de ${esc(d.cliente.nombre)}</div>
    <div class="cta">
      <b>Estudio Vector</b>
      <span>Agencia de marketing y centro de capacitación · San Pedro Sula</span>
      <span class="wa">WhatsApp 9569-1481</span>
    </div>
  </div>
  ${ft(n++)}
</section>`);

  return P;
};

(async () => {
  let chromium;
  try { ({ chromium } = require("playwright")); }
  catch (e) { try { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); } catch (e2) { console.error("Falta Playwright: npm i -g playwright && npx playwright install chromium"); process.exit(1); } }
  const dir = "src/planes";
  const pedido = process.argv[2];
  const planes = fs.readdirSync(dir).filter(f => f.endsWith(".json")).filter(f => !pedido || f.includes(pedido));
  if (!planes.length) { console.error("No hay planes que coincidan."); process.exit(1); }
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  console.log("Planes de estudio…");
  for (const f of planes) {
    const d = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    const P = paginas(d);
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(d.titulo)} · ${esc(d.cliente.nombre)}</title><style>${CSS}</style></head><body>${P.join("\n")}</body></html>`;
    const tmp = path.join(os.tmpdir(), d.slug + ".html");
    fs.writeFileSync(tmp, html);
    const pg = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
    await pg.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
    await pg.evaluate(() => document.fonts.ready);
    const ajustes = await pg.evaluate(() => {
      const out = [];
      document.querySelectorAll(".p").forEach((el, i) => {
        const inner = el.querySelector(".in") || el.querySelector(".cov");
        if (!inner) return;
        let z = 1;
        while (inner.scrollHeight > inner.clientHeight + 1 && z > 0.6) { z -= 0.01; inner.style.zoom = z; }
        if (z < 1) out.push((i + 1) + "→" + Math.round(z * 100) + "%");
      });
      return out;
    });
    const out = `planes/${d.slug}.pdf`;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await pg.pdf({ path: out, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await pg.close();
    fs.unlinkSync(tmp);
    console.log("  ✓", out, `${P.length} págs · ${(fs.statSync(out).size / 1024).toFixed(0)} KB`, ajustes.length ? "· escala " + ajustes.join(" ") : "");
  }
  await browser.close();
  console.log("Listo.");
})().catch(e => { console.error(e); process.exit(1); });
