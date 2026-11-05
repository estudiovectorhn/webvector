#!/usr/bin/env node
/*
 * Genera la Metodología VECTOR en PDF (tamaño carta) para compartir por WhatsApp:
 * portada, qué es, las 6 letras con ejemplos de chat, reglas y seguimiento, fuentes y contacto.
 *
 * Uso:  node build-metodologia-pdf.js  → escribe metodologia-vector/metodologia-vector.pdf
 * Requiere Playwright con Chromium:  npm i -g playwright && npx playwright install chromium
 */
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const OUT = "metodologia-vector/metodologia-vector.pdf";
const file = p => pathToFileURL(path.resolve(p)).href;
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const mark = t => esc(t).replace(/\[([^\]]+)\]/g, "<mark>[$1]</mark>");
const WA = "https://wa.me/50495691481?text=" + encodeURIComponent("Hola Vector Academy, quiero capacitar a mi equipo de ventas con la Metodología VECTOR.");
const CURSO = "https://estudiovector.com/metodologia-vector/";

const L = [
  { l: "V", t: "Vincular", temp: "Frío", d: "El cliente llega frío: pregunta el precio y no sabe quién le responde. Su primer trabajo es que sienta que habla con una persona.",
    do: ["Responda en menos de 5 minutos.", "Salude con su nombre y el del negocio.", "Reconozca la pregunta del precio. Nunca la ignore ni la esquive."],
    ch: [["in", "Hola, ¿qué precio tiene el servicio?"], ["out", "¡Buen día! Le atiende María de [su negocio] 😊 Con gusto le comparto el precio."]],
    f: "Responder en la primera hora hace 7 veces más probable concretar (Harvard Business Review, 2011)." },
  { l: "E", t: "Explorar", temp: "Frío → tibio", d: "Antes de dar un número, descubra qué necesita resolver el cliente con una sola pregunta abierta.",
    do: ["Pregunte por la necesidad, no por datos personales todavía.", "Una pregunta por mensaje.", "Escuche: su respuesta le dice qué ofrecer."],
    ch: [["out", "Para darle el dato correcto, ¿qué necesita resolver o para qué lo busca?"], ["in", "Lo necesito para mi negocio, pero no sé cuál me conviene 🤔"]],
    f: "Los vendedores exitosos preguntan por el problema antes de ofrecer (Rackham, SPIN Selling: 35,000 llamadas)." },
  { l: "C", t: "Conocer", temp: "Tibio → caliente", d: "Conozca a la persona: nombre, ciudad y el impacto. ¿Desde cuándo? ¿Para cuándo? Ahí aparece la razón real para comprar.",
    do: ["Valide lo que siente: \"le entiendo\".", "Pida nombre y ciudad; use el nombre 2 o 3 veces.", "Pregunte por el impacto o la fecha que le importa."],
    ch: [["out", "Le entiendo 😊 ¿Me regala su nombre y desde qué ciudad nos escribe?"], ["in", "Soy Andrea, de San Pedro Sula."], ["out", "Mucho gusto, Andrea. ¿Para cuándo lo necesita?"], ["in", "Para este mes. ¿Y cuánto cuesta?"]],
    f: "Escuchar el propio nombre activa regiones específicas del cerebro (Carmody y Lewis, 2006)." },
  { l: "T", t: "Transparentar", temp: "Caliente", d: "Ahora sí, el precio: conéctelo con lo que el cliente contó, dé el precio o rango y la forma de pago. Si pregunta por segunda vez, se da en ese mismo mensaje.",
    do: ["Repita su motivo con sus palabras.", "Precio o rango claro, sin rodeos.", "Mencione formas de pago."],
    ch: [["out", "Andrea, para lo que me cuenta le recomiendo [opción]. Tiene un valor de L [precio] y puede pagarlo con [forma de pago]."]],
    f: "Ver el precio primero lleva a evaluar si \"vale lo que cuesta\"; ver el beneficio primero, a desearlo (Karmarkar, Shiv y Knutson, 2015)." },
  { l: "O", t: "Ofrecer", temp: "Cierre", d: "No deje la decisión en el aire. Ofrezca dos opciones concretas y confirme todo por escrito.",
    do: ["Dos opciones, nunca \"cuando usted guste\".", "Confirme día, hora y lugar por escrito.", "Si hay anticipo, explíquelo con calma como reserva."],
    ch: [["out", "¿Le queda mejor el jueves en la mañana o el sábado temprano?"], ["in", "¡El jueves! 🙌"], ["out", "¡Listo, Andrea! Queda para el jueves a las 9:00 a. m. Un día antes le escribo para confirmar 😊"]],
    f: "Con 6 opciones compró el 30%; con 24, el 3% (Iyengar y Lepper, 2000). Un plan con día y hora se cumple más (Gollwitzer y Sheeran, 2006)." },
  { l: "R", t: "Retener", temp: "Después", d: "La venta no termina en el chat. Guarde y etiquete el contacto, recuerde la cita, dé seguimiento a quien no decidió y publique historias.",
    do: ["Guarde: nombre · interés · ciudad · fecha.", "Recordatorio un día antes; seguimiento de días 1, 3, 7 y 30.", "De 1 a 3 historias al día, sin saturar."],
    ch: [["ctx", "Contacto guardado: Andrea · servicio · SPS · 05/11"], ["out", "Guárdenos como [su negocio] para que le lleguen nuestras novedades 😊"]],
    f: "Los recordatorios por mensaje aumentan la asistencia (Cochrane, 2013). La familiaridad aumenta la preferencia (Zajonc, 1968)." }
];
const FUENTES = [
  "Oldroyd, McElheran y Elkington (2011). The Short Life of Online Sales Leads. Harvard Business Review.",
  "Revisión sobre empatía en la relación profesional-paciente (2014). PubMed 25265748.",
  "Rackham, N. (1988). SPIN Selling. McGraw-Hill.",
  "Gong Labs. Análisis de preguntas en llamadas de descubrimiento.",
  "Carmody y Lewis (2006). Brain activation when hearing one's own and others' names. Brain Research.",
  "Karmarkar, Shiv y Knutson (2015). Cost Conscious? The Neural and Behavioral Impact of Price Primacy. Journal of Marketing Research.",
  "Mogilner y Aaker (2009). The Time vs. Money Effect. Journal of Consumer Research.",
  "Iyengar y Lepper (2000). When Choice is Demotivating. Journal of Personality and Social Psychology.",
  "Gollwitzer y Sheeran (2006). Implementation intentions and goal achievement: a meta-analysis.",
  "Zajonc (1968); Bornstein (1989); Montoya y col. (2017). Efecto de mera exposición.",
  "Gurol-Urganci y col. (2013). Mobile phone messaging reminders for attendance at healthcare appointments. Cochrane."
];
const chat = ch => `<div class="ph"><div class="ph-h"><span>V</span><b>Su negocio · WhatsApp</b></div><div class="th">${ch.map(([w, t]) => w === "ctx" ? `<div class="ctx">${mark(t)}</div>` : `<div class="b ${w}">${mark(t)}</div>`).join("")}</div></div>`;
const letra = x => `<section class="lt"><div class="lt-l"><b>${x.l}</b><div><h3>${x.t}</h3><span class="chip">Temperatura: ${x.temp}</span></div></div><p>${esc(x.d)}</p><div class="lt-g"><ul>${x.do.map(d => `<li>${esc(d)}</li>`).join("")}</ul>${chat(x.ch)}</div><div class="fact">${esc(x.f)}</div></section>`;
const foot = n => `<div class="pf"><span>Metodología VECTOR · Vector Marketing &amp; Academy</span><span>estudiovector.com/metodologia-vector · ${n}</span></div>`;

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
@page{size:Letter;margin:0}
*{box-sizing:border-box}body{margin:0;font-family:Manrope,Arial,sans-serif;color:#160A3A;font-size:12.5px;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:8.5in;height:11in;position:relative;overflow:hidden;padding:.55in .6in .7in;page-break-after:always;background:#F7F4FF}
.pg.dark{background:radial-gradient(70% 50% at 100% 0%,rgba(224,22,155,.5),transparent 60%),radial-gradient(60% 50% at 0% 100%,rgba(106,59,245,.55),transparent 60%),#0E0630;color:#fff}
h1,h2,.disp{font-family:Anton,Impact,sans-serif;font-weight:400;text-transform:uppercase;line-height:.95;margin:0}
.eb{font-size:10px;letter-spacing:.24em;text-transform:uppercase;font-weight:800;color:#E0169B}
.dark .eb{color:#FF9AD2}
.g{color:#C4107C}
.dark .g{color:#FF6FB5}
.word div:nth-child(odd) b{color:#B9A4FF}
.cov-logo{width:150px}
.cov h1{font-size:96px;margin-top:70px}
.cov .sub{font-size:20px;color:#D6CCF5;max-width:5.6in;margin-top:18px}
.word{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:60px}
.word div{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);border-radius:16px;padding:14px 8px;text-align:center}
.word b{display:block;font-family:Anton;font-size:56px;line-height:1}.word span{font-weight:800;font-size:11px}
.cov-f{position:absolute;left:.6in;right:.6in;bottom:.6in;display:flex;justify-content:space-between;align-items:flex-end;color:#C9C0F2;font-size:12px}
.cov-f b{color:#fff;font-size:14px;display:block}
h2{font-size:40px;margin:6px 0 12px}
.lead{font-size:14px;color:#5E5484;max-width:6.6in}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px}
.card{background:#fff;border:1px solid #E4DBFB;border-radius:16px;padding:14px}
.card b.l{font-family:Anton;font-size:40px;line-height:1;color:#6A3BF5}.card h3{margin:4px 0 2px;font-size:15px}.card p{margin:0;color:#5E5484;font-size:12px}
.vs{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
.box{border-radius:16px;padding:14px;background:#fff;border:1px solid #E4DBFB}
.box h4{margin:0 0 8px;font-size:11px;letter-spacing:.14em;text-transform:uppercase}
.bad h4{color:#E0169B}.good h4{color:#0E9A60}
.therm{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px}
.therm div{border-radius:14px;padding:12px;color:#fff}.therm b{display:block;font-size:14px}.therm span{font-size:11px}
.lt{background:#fff;border:1px solid #E4DBFB;border-radius:20px;padding:16px 18px;margin-bottom:14px}
.lt-l{display:flex;gap:14px;align-items:center}.lt-l>b{font-family:Anton;font-size:64px;line-height:.85;color:#6A3BF5}
.lt h3{font-family:Anton;font-weight:400;text-transform:uppercase;font-size:26px;margin:0}
.chip{display:inline-block;font-size:10px;font-weight:800;background:#F4EFFF;color:#2C02A4;border-radius:99px;padding:3px 9px;margin-top:3px}
.lt p{margin:8px 0;color:#5E5484}
.lt-g{display:grid;grid-template-columns:1fr 1.1fr;gap:12px;align-items:start}
.lt ul{list-style:none;padding:0;margin:0;display:grid;gap:6px}.lt li{padding:7px 10px 7px 30px;border-radius:10px;background:#F4EFFF;font-weight:700;position:relative;font-size:12px}
.lt li::before{content:"✓";position:absolute;left:9px;color:#0E9A60;font-weight:800}
.ph{border-radius:14px;overflow:hidden;border:1px solid #E4DBFB;background:#EFE7DD}
.ph-h{display:flex;gap:8px;align-items:center;background:#075E54;color:#fff;padding:7px 10px;font-size:11px}.ph-h span{width:20px;height:20px;border-radius:50%;background:#E0169B;display:grid;place-items:center;font-weight:800;font-size:10px}
.th{display:flex;flex-direction:column;gap:5px;padding:9px}
.b{max-width:90%;padding:6px 9px;border-radius:9px;font-size:11px;line-height:1.4}.b.in{background:#fff;align-self:flex-start}.b.out{background:#DCF8C6;align-self:flex-end}
.ctx{align-self:center;background:#FFF5C4;font-size:10px;padding:3px 8px;border-radius:6px}
mark{background:rgba(106,59,245,.14);color:#2C02A4;border-radius:4px;padding:0 3px}
.fact{margin-top:10px;font-size:11.5px;background:#0E0630;color:#fff;border-radius:12px;padding:8px 12px}
.fact::before{content:"Respaldo · ";color:#FF9AD2;font-weight:800}
.two{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.tl div{display:flex;gap:10px;margin-bottom:8px}.tl b{flex:none;width:58px;font-size:11px;color:#6A3BF5}
.tags div{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:12px}.tags i{width:12px;height:12px;border-radius:3px;display:inline-block}
ol.src{padding-left:18px;display:grid;gap:7px;font-size:12px}
.cta{border-radius:22px;padding:22px;background:linear-gradient(120deg,#3A0CC9,#7B4DFF 45%,#E0169B);color:#fff;margin-top:16px}
.cta h2{font-size:34px;margin:0 0 6px}
.btnp{display:inline-block;background:#fff;color:#2C02A4;font-weight:800;border-radius:12px;padding:10px 16px;text-decoration:none;margin-top:10px}
.qr{display:flex;gap:18px;align-items:center;margin-top:18px;background:#fff;border:1px solid #E4DBFB;border-radius:20px;padding:16px}
.qr img{width:130px;height:130px}
.pf{position:absolute;left:.6in;right:.6in;bottom:.35in;display:flex;justify-content:space-between;font-size:9.5px;color:#8C83AF;border-top:1px solid #E4DBFB;padding-top:6px}
.dark .pf{border-color:rgba(255,255,255,.15);color:#B9B0E3}
a{color:inherit}
</style></head><body>

<div class="pg dark cov">
  <img class="cov-logo" src="${file("img/logo-blanco.png")}" alt="">
  <p class="eb" style="margin-top:46px">Vector Marketing &amp; Academy presenta</p>
  <h1>Metodología<br><span class="g">VECTOR</span></h1>
  <p class="sub">Protocolo de atención y ventas por WhatsApp para personas que atienden clientes. Seis pasos para pasar del "¿cuánto cuesta?" a la venta cerrada, sin presionar.</p>
  <div class="word">${L.map(x => `<div><b class="g">${x.l}</b><span>${x.t}</span></div>`).join("")}</div>
  <div class="cov-f"><div><b>Curso gratuito en línea con certificado</b>estudiovector.com/metodologia-vector</div><div style="text-align:right"><b>WhatsApp 9569-1481</b>San Pedro Sula, Honduras</div></div>
</div>

<div class="pg">
  <p class="eb">Por qué existe</p>
  <h2>Un precio sin contexto se compara.<br><span class="g">Una necesidad escuchada se resuelve.</span></h2>
  <p class="lead">Cuando alguien pregunta "¿cuánto cuesta?" y solo recibe un número, se pone a comparar y casi nunca vuelve. La Metodología VECTOR enseña a entender primero qué necesita la persona, dar el precio con contexto y cerrar con una cita o pedido concreto. El precio nunca se esconde: se da en el momento correcto.</p>
  <div class="vs"><div class="box bad"><h4>Así se pierde</h4>${chat([["in", "Hola, ¿qué precio tiene?"], ["out", "Cuesta L ____ 👍"], ["ctx", "Visto ✓✓ · no vuelve a escribir"]])}</div>
  <div class="box good"><h4>Así se conecta</h4>${chat([["in", "Hola, ¿qué precio tiene?"], ["out", "¡Buen día! Le atiende María de [su negocio] 😊 Con gusto le comparto el precio. ¿Para qué lo necesita?"], ["in", "Es para mi boda, me caso en un año 💍"]])}</div></div>
  <div class="cards">${L.map(x => `<div class="card"><b class="l g">${x.l}</b><h3>${x.t}</h3><p>${esc(x.d.split(". ")[0])}.</p></div>`).join("")}</div>
  <p class="eb" style="margin-top:18px">El termómetro del cliente</p>
  <div class="therm"><div style="background:#38BDF8"><b>Frío</b><span>Solo pregunta precio · V + E</span></div><div style="background:#F5A524"><b>Tibio</b><span>Contó su necesidad · C</span></div><div style="background:#F43F5E"><b>Caliente</b><span>Pregunta horarios o pagos · T + O</span></div><div style="background:#0E9A60"><b>Cliente</b><span>Compró o agendó · R</span></div></div>
  ${foot(2)}
</div>

<div class="pg">${letra(L[0])}${letra(L[1])}${foot(3)}</div>
<div class="pg">${letra(L[2])}${letra(L[3])}${foot(4)}</div>
<div class="pg">${letra(L[4])}${letra(L[5])}${foot(5)}</div>

<div class="pg">
  <p class="eb">Reglas de oro y seguimiento</p>
  <h2>Lo que todo vendedor debe <span class="g">recordar</span></h2>
  <div class="two">
    <div class="box good"><h4>Siempre</h4><ul style="margin:0;padding-left:16px;display:grid;gap:6px"><li>Responder en menos de 5 minutos en horario.</li><li>Una sola pregunta por mensaje (de 3 a 5 en total).</li><li>Si preguntan el precio por segunda vez, darlo en ese mensaje.</li><li>Si piden "solo el precio", darlo de inmediato con una pregunta útil.</li><li>Cerrar con dos opciones concretas y confirmar por escrito.</li></ul></div>
    <div class="box bad"><h4>Nunca</h4><ul style="margin:0;padding-left:16px;display:grid;gap:6px"><li>Mandar solo el precio y quedarse callado.</li><li>"Para precios venga en persona".</li><li>Diagnosticar, prometer resultados o asegurar existencias sin verificar.</li><li>Hablar mal de la competencia.</li><li>Presionar con urgencias falsas o pedir pago antes de aclarar la solución.</li></ul></div>
  </div>
  <div class="two">
    <div class="box"><h4>Calendario de seguimiento</h4><div class="tl"><div><b>Día 0</b><span>Respuesta con VECTOR en menos de 5 minutos.</span></div><div><b>Día 1</b><span>"¿Pudo revisar lo que conversamos? Quedo pendiente."</span></div><div><b>Día 3</b><span>Algo de valor sin vender: un consejo o un caso parecido.</span></div><div><b>Día 7</b><span>"Esta semana tenemos espacio el jueves y el sábado."</span></div><div><b>Día 30</b><span>Reactivación amable. Tras 3 mensajes sin respuesta, se deja descansar.</span></div></div></div>
    <div class="box tags"><h4>Etiquetas en WhatsApp Business</h4><div><i style="background:#38BDF8"></i><b>Nuevo / frío</b> · solo preguntó precio</div><div><i style="background:#F5A524"></i><b>Tibio</b> · contó su necesidad</div><div><i style="background:#F43F5E"></i><b>Caliente</b> · pidió horarios o pagos</div><div><i style="background:#0E9A60"></i><b>Agendado / vendido</b> · recordatorio un día antes</div><div><i style="background:#6A3BF5"></i><b>Cliente frecuente</b> · pedir reseña y referidos</div><p style="margin:10px 0 0;color:#5E5484;font-size:11.5px">Guarde cada contacto así: <b>Nombre · interés · ciudad · fecha</b>. Los estados de WhatsApp normalmente solo los ve quien tiene guardado el número del negocio.</p></div>
  </div>
  ${foot(6)}
</div>

<div class="pg">
  <p class="eb">Respaldo científico</p>
  <h2>Fuentes de la <span class="g">Metodología VECTOR</span></h2>
  <ol class="src">${FUENTES.map(f => `<li>${esc(f)}</li>`).join("")}</ol>
  <p style="color:#5E5484;font-size:11.5px">Varios estudios vienen de ventas entre empresas, consumo general o salud: muestran el mecanismo. El resultado en cada negocio se mide comparando mensajes recibidos, ventas o citas cerradas y clientes que regresan, antes y después de aplicar la metodología.</p>
  <div class="qr"><img src="${file("img/qr-metodologia-vector.png")}" alt=""><div><p class="eb">Curso gratuito · 8 minutos</p><h2 style="font-size:28px;margin:4px 0">Tome el curso y obtenga su certificado</h2><p style="margin:0;color:#5E5484">Escanee el código o entre a <a href="${CURSO}"><b>estudiovector.com/metodologia-vector</b></a>. Los ejemplos se adaptan a su tipo de negocio.</p></div></div>
  <div class="cta"><p class="eb" style="color:#fff;opacity:.85">Para equipos de venta</p><h2>Capacite a todo su equipo con Vector Academy</h2><p style="margin:0">Presencial en Vector Academy (San Pedro Sula), en sus instalaciones en cualquier ciudad de Honduras o en línea. Práctica con casos reales de su negocio, inspección de chats y plan de mejora.</p><a class="btnp" href="${WA}">Cotizar por WhatsApp · 9569-1481</a></div>
  ${foot(7)}
</div>
</body></html>`;

(async () => {
  let chromium;
  try { ({ chromium } = require("playwright")); }
  catch (e) { try { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); } catch (e2) { console.error("Falta Playwright: npm i -g playwright && npx playwright install chromium"); process.exit(1); } }
  const tmp = path.resolve(".metodologia-pdf.html");
  fs.writeFileSync(tmp, html);
  const launch = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  const browser = await chromium.launch(launch);
  const page = await browser.newPage();
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: OUT, format: "Letter", printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close();
  fs.unlinkSync(tmp);
  console.log("✓ " + OUT);
})();
