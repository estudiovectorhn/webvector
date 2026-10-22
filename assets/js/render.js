/* Plantillas compartidas: las usa el navegador (window.VR) y el generador (build.js) */
(function (root) {
  const WA = "50495691481";
  const S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const ICON = {
    clock: `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" ${S}><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
    zoom: `<svg viewBox="0 0 24 24" ${S}><rect x="2" y="5" width="20" height="13" rx="2"/><path d="M8 21h8"/></svg>`,
    level: `<svg viewBox="0 0 24 24" ${S}><path d="M4 20v-5M10 20V10M16 20V6M22 20V3"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4.5 4.5L19 7"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" ${S}><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    trophy: `<svg viewBox="0 0 24 24" ${S}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3a3 3 0 0 1-3 4M7 5H4a3 3 0 0 0 3 4"/></svg>`,
    cal: `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
    link: `<svg viewBox="0 0 24 24" ${S}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`,
    share: `<svg viewBox="0 0 24 24" ${S}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.6 6.8-4M8.6 13.4l6.8 4"/></svg>`,
    img: `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="m5 16 4.5-4.5 3 3L16 11l3 3"/><circle cx="9" cy="9" r="1.4"/><path d="M12 20v2M9 22h6"/></svg>`,
    pdf: `<svg viewBox="0 0 24 24" ${S}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M12 11v6M9.5 14.5 12 17l2.5-2.5"/></svg>`,
    wa: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.8-1.1-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.7-.1 1.3z"/></svg>`
  };
  const L = 'fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  const ART = {
    video: `<svg viewBox="0 0 120 90" ${L}><rect x="6" y="14" width="108" height="62" rx="8"/><path d="M50 32v26l22-13z" fill="currentColor"/><path d="M6 66h108M22 66v10M44 66v10M66 66v10M88 66v10"/></svg>`,
    anuncios: `<svg viewBox="0 0 120 90" ${L}><path d="M14 36v18h14l30 16V20L28 36z"/><path d="M70 32a16 16 0 0 1 0 26M80 24a28 28 0 0 1 0 42"/><path d="M28 54l6 22h10l-4-18"/></svg>`,
    celular: `<svg viewBox="0 0 120 90" ${L}><rect x="40" y="4" width="40" height="72" rx="7"/><circle cx="60" cy="40" r="10"/><path d="M54 12h12"/><path d="M60 76v10M46 86h28"/><circle cx="98" cy="30" r="14"/><circle cx="98" cy="30" r="7"/></svg>`,
    ia: `<svg viewBox="0 0 120 90" ${L}><rect x="34" y="20" width="52" height="52" rx="10"/><rect x="48" y="34" width="24" height="24" rx="4"/><path d="M46 20V8M60 20V8M74 20V8M46 84V72M60 84V72M74 84V72M34 34H22M34 46H22M34 58H22M98 34H86M98 46H86M98 58H86"/></svg>`,
    meta: `<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 58c0-20 10-34 20-34 14 0 22 22 30 34s12 18 20 18c10 0 16-10 16-24S94 24 84 24c-12 0-20 18-26 28S42 76 32 76c-10 0-18-8-18-18z"/></svg>`,
    whatsapp: `<svg viewBox="0 0 120 90" ${L}><path d="M96 44a36 36 0 0 1-54 31L22 82l7-19A36 36 0 1 1 96 44z"/><path d="m44 44 10 10 20-20"/></svg>`,
    canva: `<svg viewBox="0 0 120 90" ${L}><rect x="10" y="10" width="64" height="70" rx="6"/><path d="M10 58l18-16 16 14 10-8 20 18"/><circle cx="52" cy="30" r="7"/><path d="M84 70l22-44 6 4-20 44-10 6z"/></svg>`,
    foto: `<svg viewBox="0 0 120 90" ${L}><path d="M10 28h22l8-12h40l8 12h22v52H10z"/><circle cx="60" cy="52" r="18"/><circle cx="60" cy="52" r="8"/><path d="M94 38h6"/></svg>`,
    power: `<svg viewBox="0 0 120 90" ${L}><rect x="8" y="10" width="72" height="56" rx="6"/><path d="M8 24h72M28 42l-8 6 8 6M60 42l8 6-8 6M48 38l-8 20"/><path d="M92 20l-8 26h14l-10 34 24-38H98l8-22z"/></svg>`,
    redes: `<svg viewBox="0 0 120 90" ${L}><rect x="20" y="8" width="44" height="74" rx="8"/><path d="M34 16h16"/><rect x="28" y="26" width="28" height="24" rx="3"/><path d="M28 58h28M28 66h18"/><circle cx="90" cy="26" r="12"/><path d="M84 26l4 4 8-8"/><path d="M76 56h28M76 66h20"/></svg>`,
    pauta: `<svg viewBox="0 0 120 90" ${L}><path d="M10 80h100"/><rect x="18" y="52" width="14" height="28" rx="2"/><rect x="42" y="38" width="14" height="42" rx="2"/><rect x="66" y="26" width="14" height="54" rx="2"/><path d="M14 40l30-18 22 10 34-22"/><path d="M88 10h12v12"/></svg>`,
    diseno: `<svg viewBox="0 0 120 90" ${L}><path d="M60 8l40 72H20z"/><circle cx="60" cy="56" r="12"/><path d="M8 20h24M88 20h24"/><circle cx="20" cy="20" r="4" fill="currentColor"/><circle cx="100" cy="20" r="4" fill="currentColor"/></svg>`,
    asesoria: `<svg viewBox="0 0 120 90" ${L}><circle cx="40" cy="30" r="12"/><path d="M18 76a22 22 0 0 1 44 0"/><path d="M70 14h40v28H86l-10 10V42h-6z"/><path d="M80 24h20M80 32h14"/></svg>`,
    empresa: `<svg viewBox="0 0 120 90" ${L}><rect x="10" y="10" width="100" height="56" rx="6"/><path d="M34 80h52M60 66v14"/><path d="M26 50l18-18 14 12 24-22"/><circle cx="92" cy="26" r="4" fill="currentColor"/></svg>`,
    podcast: `<svg viewBox="0 0 120 90" ${L}><rect x="46" y="6" width="28" height="46" rx="14"/><path d="M34 40a26 26 0 0 0 52 0M60 66v16M44 82h32"/><path d="M16 32v16M24 26v28M96 26v28M104 32v16"/></svg>`,
    menu: `<svg viewBox="0 0 120 90" ${L}><rect x="6" y="10" width="34" height="50" rx="3"/><rect x="43" y="10" width="34" height="50" rx="3"/><rect x="80" y="10" width="34" height="50" rx="3"/><path d="M13 20h20M13 28h14M50 20h20M50 28h14M87 20h20M87 28h14"/><circle cx="23" cy="44" r="7"/><circle cx="60" cy="44" r="7"/><circle cx="97" cy="44" r="7"/><path d="M23 60v10M97 60v10M14 80h92"/></svg>`,
    eventos: `<svg viewBox="0 0 120 90" ${L}><path d="M8 82h104"/><rect x="18" y="30" width="84" height="36" rx="4"/><path d="M30 30L20 8M90 30l10-22"/><circle cx="20" cy="8" r="3" fill="currentColor"/><circle cx="100" cy="8" r="3" fill="currentColor"/><path d="M40 66v16M80 66v16M36 48h48"/></svg>`
  };
  const DOW = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const MON = { 1: "ENE", 2: "FEB", 3: "MAR", 4: "ABR", 5: "MAY", 6: "JUN", 7: "JUL", 8: "AGO", 9: "SEP", 10: "OCT", 11: "NOV", 12: "DIC" };
  const AV = "/img/edgardo-avatar.jpg";
  const fmt = n => "L " + n.toLocaleString("en-US");
  const YEAR = 2026;
  const dowOf = (d, m) => new Date(YEAR, m - 1, d).getDay();
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const waLink = t => "https://wa.me/" + WA + "?text=" + encodeURIComponent("Hola Vector, quiero reservar mi cupo en el taller: " + t.title + " (" + t.dayLabel + ").");
  const waText = txt => "https://wa.me/" + WA + "?text=" + encodeURIComponent(txt);

  /* Badge de fecha de la portada: una sola fecha, o todas cuando el taller ocupa varios días */
  function dateBadge(t) {
    const ds = t.days;
    const dw = DOW[dowOf(ds[0].d, ds[0].m)].toUpperCase();
    const meses = [...new Set(ds.map(d => MON[d.m]))].join("·");
    const nums = ds.map(d => ds.length > 1 ? String(d.d) : String(d.d).padStart(2, "0")).join("·");
    return `<div class="datebadge${ds.length > 1 ? " multi n" + Math.min(ds.length, 3) : ""}"><div class="dw">${dw}</div><div class="dn">${nums}</div><div class="dm">${meses}</div></div>`;
  }

  function coverHTML(t, cls, withDate, goal) {
    const nd = t.days[0];
    const tags = [];
    if (goal && t.goals.includes(goal)) tags.push('<span class="tag rec">Recomendado</span>');
    if (t.live) tags.push('<span class="tag live">En curso</span>');
    if (t.isNew) tags.push('<span class="tag new">Nuevo</span>');
    if (t.days.length > 1) tags.push(`<span class="tag multi">${t.days.length} fechas</span>`);
    tags.push(`<span class="tag">${t.mode === "Online" ? "Online · Zoom" : "Presencial"}</span>`);
    const img = t.img ? `<img class="bgimg" src="${t.img}" alt="${esc(t.seoTitle || t.title)}" loading="lazy" width="1280" height="720">` : "";
    return `<div class="cover ${cls || ""} ${img ? "hasimg" : ""}" style="background:${t.grad}">${img}
    <div class="wm logo-img"></div>
    ${img ? "" : `<div class="bigico">${ART[t.id]}</div>`}
    ${withDate ? dateBadge(t) : ""}
    <div class="covertags">${tags.join("")}</div>
    <div class="coverfoot"><div class="by"><span class="av"><img src="${AV}" alt="" width="30" height="30"></span><span class="byt"><small>Instructor</small><b>Edgardo López</b></span></div>${toolsStrip(t)}</div></div>`;
  }

  function cardHTML(t, goal) {
    return `<a class="card" href="/talleres/${t.slug}/" data-id="${t.id}" id="card-${t.id}">
    ${coverHTML(t, "", true, goal)}
    <div class="cbody">
      <h3>${t.title} <em>· ${t.tagline}</em></h3>
      <div class="meta"><span class="when">${ICON.cal}${t.dayLabel}</span><span>${ICON.clock}${t.time}</span><span>${t.mode === "Online" ? ICON.zoom : ICON.pin}${t.mode === "Online" ? "En vivo por Zoom" : "Aula Vector, SPS"}</span><span>${ICON.level}${t.level}</span></div>
      ${netsLine(t)}
      <div class="cardfoot"><div class="price">${fmt(t.price)}<small>${t.dur}${t.durNote ? " · " + t.durNote : ""}</small></div><span class="go">Ver taller ${ICON.arrow}</span></div>
    </div></a>`;
  }

  /* Redes sociales del taller: se nombran en la tarjeta para que se vea de un vistazo para qué plataformas es */
  const NETS = ["facebook", "instagram", "tiktok", "whatsapp", "youtube"];
  const netsLine = t => {
    const n = (t.tools || []).filter(k => NETS.includes(k));
    return n.length ? `<div class="netsline">${n.map(k => toolIcon(k, 18)).join("")}<span>Para ${n.map(k => TOOLS[k].name).join(", ").replace(/, ([^,]*)$/, " y $1")}</span></div>` : "";
  };

  /* Tarjeta del Programa Ejecutivo: se muestra junto a los talleres y en el calendario */
  function programaCard(P) {
    const fechas = P.sesiones ? `${P.sesiones} sesiones · ${P.horas} horas` : "";
    return `<a class="card pgcard" href="${P.url}" data-id="programa" id="card-programa">
    <div class="cover hasimg" style="background:linear-gradient(135deg,#150660,#5B21F5 45%,#E0169B)">
      <img class="bgimg" src="${P.img}" alt="${esc(P.titulo)}" loading="lazy" width="1280" height="720">
      <div class="wm logo-img"></div>
      <div class="datebadge prog"><div class="dw">INICIA</div><div class="dn">${P.diaInicio}</div><div class="dm">${P.mesInicio}</div></div>
      <div class="covertags"><span class="tag prog">Programa ejecutivo</span><span class="tag">${P.sesiones} sesiones</span></div>
      <div class="coverfoot"><div class="by"><span class="av"><img src="${AV}" alt="" width="30" height="30"></span><span class="byt"><small>${esc(P.academia)}</small><b>${esc(P.generacion)}</b></span></div></div>
    </div>
    <div class="cbody">
      <h3>${esc(P.titulo)}</h3>
      <div class="meta"><span class="when">${ICON.cal}Del ${esc(P.inicioCorto)} al ${esc(P.finCorto)}</span><span>${ICON.clock}${esc(P.dias_txt)}, ${esc(P.horario)}</span><span>${ICON.pin}Aula Vector Academy, SPS</span></div>
      <div class="netsline"><span>${fechas} · ${P.cupos} cupos</span></div>
      <div class="cardfoot"><div class="price">${fmt(P.precio)}<small>reservas con ${fmt(P.matricula)}</small></div><span class="go">Ver programa ${ICON.arrow}</span></div>
    </div></a>`;
  }

  /* Apps y plataformas que se usan en cada taller (campo "tools" en src/talleres.json). Iconos en /img/tools/. */
  const TOOLS = {
    meta: { name: "Meta Ads", note: "Administrador de anuncios" },
    facebook: { name: "Facebook", note: "Página y anuncios" },
    instagram: { name: "Instagram", note: "Feed, historias y Reels" },
    whatsapp: { name: "WhatsApp Business", note: "Catálogo, etiquetas y respuestas" },
    chatgpt: { name: "ChatGPT", note: "OpenAI" },
    claude: { name: "Claude", note: "Anthropic" },
    elevenlabs: { name: "ElevenLabs", note: "Voces con inteligencia artificial" },
    canva: { name: "Canva", note: "Diseño y kit de marca" },
    capcut: { name: "CapCut", note: "Edición de video" },
    tiktok: { name: "TikTok", note: "Formato vertical" },
    zoom: { name: "Zoom", note: "Clase en vivo" },
    supabase: { name: "Supabase", note: "Base de datos gratuita" },
    youtube: { name: "YouTube", note: "Video largo y Shorts" },
    sony: { name: "Sony", note: "Cámaras Alpha (mirrorless)" },
    canon: { name: "Canon", note: "Cámaras EOS (réflex y mirrorless)" }
  };
  const toolIcon = (k, size) => `<img src="/img/tools/${k}.svg" alt="${TOOLS[k].name}" width="${size}" height="${size}" loading="lazy">`;
  /* Tira de iconos pequeños para la portada de la tarjeta */
  const toolsStrip = t => (t.tools && t.tools.length) ? `<div class="apps" aria-label="Redes y apps del taller">${t.tools.slice(0, 4).map(k => `<span class="app" title="${TOOLS[k].name}">${toolIcon(k, 21)}</span>`).join("")}</div>` : "";
  /* Sección con iconos grandes para la ficha y la página del taller */
  const toolsHTML = (t, H) => (t.tools && t.tools.length) ? `
   <${H} class="sh-h">Herramientas que usarás</${H}>
   <div class="tools n${Math.min(t.tools.length, 4)}">${t.tools.map(k => `<div class="tool"><span class="ticon">${toolIcon(k, 64)}</span><b>${TOOLS[k].name}</b><small>${TOOLS[k].note}</small></div>`).join("")}</div>` : "";

  /* Equipo con el que se practica (campo "gear": imágenes PNG sin fondo en /img/gear/) */
  const gearHTML = (t, H) => (t.gear && t.gear.length) ? `
   <${H} class="sh-h">Cámaras con las que practicarás</${H}>
   <div class="gear">${t.gear.map(g => `<figure class="gitem"><img src="${g.img}" alt="${esc(g.name)}" loading="lazy"><figcaption><b>${esc(g.name)}</b><small>${esc(g.note)}</small></figcaption></figure>`).join("")}<p class="gnote">Puedes traer tu propia cámara o celular: el método es el mismo.</p></div>` : "";

  /* Plan de estudio por bloques (campo "plan" en src/talleres.json). Opcional: solo lo muestran los talleres que lo traen. */
  const planHTML = (t, H) => (t.plan && t.plan.bloques && t.plan.bloques.length) ? `
   <${H} class="sh-h">Plan de estudio</${H}>
   ${t.plan.lead ? `<p class="planlead">${esc(t.plan.lead)}</p>` : ""}
   <ol class="plan">${t.plan.bloques.map(b => `<li class="plan-b${/pausa|cierre|arranque/i.test(b.nivel) ? " plan-soft" : ""}">
     <div class="plan-h"><span class="plan-t">${esc(b.hora)}</span><span class="plan-n">${esc(b.nivel)}</span></div>
     <b>${esc(b.titulo)}</b>
     <ul>${b.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
   </li>`).join("")}</ol>` : "";

  const INCLUYE = t => ["Grabación de la clase", "Grupo privado de WhatsApp", "Certificado oficial Vector MKT", t.mode === "Online" ? "Clase en vivo por Zoom" : "Clase presencial en aula Vector"];

  /* Cuerpo de detalle: se usa en la ficha (modal) y en la página propia de cada taller */
  function detailHTML(t, opts) {
    opts = opts || {};
    const H = opts.page ? "h2" : "div";
    return `
   <div class="kv">
     <div><small>Fecha</small><b>${t.dayLabel}</b></div>
     <div><small>Horario</small><b>${t.time}</b></div>
     <div><small>Duración</small><b>${t.dur}${t.durNote ? " (" + t.durNote + ")" : ""}</b></div>
     <div><small>Inversión</small><b class="big">${fmt(t.price)}</b></div>
   </div>
   <div class="seats"><div class="seatbar">${"<i></i>".repeat(10)}</div><span><b style="color:var(--text)">10 cupos</b> · capacidad máxima del aula</span></div>
   <a class="inst" href="/director-creativo/"><span class="av"><img src="${AV}" alt="Edgardo A. López" width="52" height="52"></span><div><small>Imparte</small><b>Edgardo A. López</b><span>Fundador y Director Creativo de Estudio Vector · Capacitador de equipos de marketing empresarial</span></div><span class="go">Perfil ${ICON.arrow}</span></a>
   <div class="takeaway">${ICON.trophy}<div><small>Al terminar te llevas</small><b>${t.take}</b></div></div>
   ${toolsHTML(t, H)}
   ${gearHTML(t, H)}
   ${planHTML(t, H)}
   <${H} class="sh-h">Lo que aprenderás</${H}>
   <ol class="path">${t.learn.map(l => `<li><span>${l}</span></li>`).join("")}</ol>
   <${H} class="sh-h">Resultados para tu negocio</${H}>
   <div class="results">${t.results.map(r => `<div class="res">${ICON.check}<span>${r}</span></div>`).join("")}</div>
   <${H} class="sh-h">Ideal para</${H}>
   <p class="ideal">${t.ideal}</p>
   <${H} class="sh-h">Incluye</${H}>
   <div class="incl">${t.extra ? `<span class="hl">${t.extra}</span>` : ""}${INCLUYE(t).map(i => `<span>${i}</span>`).join("")}</div>
   ${t.note ? `<div class="note">${t.note}</div>` : ""}`;
  }

  const api = { WA, ICON, ART, DOW, MON, AV, TOOLS, netsLine, fmt, dowOf, esc, waLink, waText, coverHTML, cardHTML, programaCard, dateBadge, detailHTML, toolsHTML, planHTML, toolsStrip, gearHTML, INCLUYE };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.VR = api;
})(typeof window !== "undefined" ? window : globalThis);
