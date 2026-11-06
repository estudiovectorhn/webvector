// Función pública: registra participantes y resultados del curso Metodología VECTOR
// (estudiovector.com/metodologia-vector/) y avisa por correo a Vector Marketing & Academy.
//
// Correos que se envían (y solo estos dos por persona):
//   1. Registro: la primera vez que ese correo se inscribe. Si vuelve a registrarse, se guarda pero no avisa.
//   2. Curso completado: la primera vez que ese correo aprueba (70% o más) y recibe su certificado.
// El tipo "paso" no manda ningún correo: es el pulso anónimo del embudo (tabla academia_pasos).
//
// Reto empresarial: una empresa crea su reto (tipo "equipo"), reparte un enlace con el código y, cada
// vez que alguien de ese reto aprueba, el correo va al JEFE, no a Vector. Vector solo recibe un aviso
// cuando se crea el reto, para no llenarle la bandeja con cada empleado.
// Los exámenes reprobados y los intentos repetidos se guardan en la base pero no generan correo.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

/* Orígenes a los que se les deja LEER la respuesta. Que localhost esté aquí no permite
   escribir nada: lo que guarda y lo que manda correos lo bloquea esPrueba() más abajo. */
const ALLOWED = ["https://estudiovector.com", "https://www.estudiovector.com", "http://localhost:3000"];
const TO = "estudiovectorhn@gmail.com";
const FROM = "Vector Academy <resultados@vcloudhn.com>";
const APROBADO = 70;

function cors(origin: string | null) {
  const o = origin && ALLOWED.includes(origin) ? origin : ALLOWED[0];
  return { "Access-Control-Allow-Origin": o, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type, authorization, apikey", "Vary": "Origin" };
}
const s = (v: unknown, n = 120) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const esc = (v: unknown) => String(v ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
async function hash(t: string) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t + "vector-academia")); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("").slice(0, 32); }
const fecha = (d = new Date()) => d.toLocaleString("es-HN", { timeZone: "America/Tegucigalpa", dateStyle: "full", timeStyle: "short" });
/* Pruebas locales o desde cualquier otro sitio: no se guardan ni avisan por correo */
const ALFA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin letras ni números que se confundan al dictarlos
const nuevoCodigo = () => Array.from(crypto.getRandomValues(new Uint8Array(6))).map(n => ALFA[n % ALFA.length]).join("");
const nuevoToken = () => Array.from(crypto.getRandomValues(new Uint8Array(16))).map(n => n.toString(16).padStart(2, "0")).join("");
const esPrueba = (u: string) => { try { const host = new URL(u).hostname; return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local") || !/(^|\.)estudiovector\.com$/.test(host); } catch { return true; } };

function shell(titulo: string, chip: string, inner: string) {
  return `<div style="background:#F7F4FF;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#160A3A"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#0E0630;background-image:linear-gradient(120deg,#3A0CC9,#7B4DFF 45%,#E0169B);padding:24px"><div style="font-size:12px;letter-spacing:2px;color:#fff;opacity:.85;text-transform:uppercase">Metodología VECTOR · Vector Academy</div><div style="font-size:22px;font-weight:bold;color:#fff;margin-top:6px">${titulo}</div><div style="margin-top:10px"><span style="display:inline-block;background:#fff;color:#2C02A4;font-weight:bold;font-size:13px;padding:6px 12px;border-radius:999px">${chip}</span></div></td></tr>
<tr><td style="padding:24px">${inner}</td></tr>
<tr><td style="background:#0E0630;color:#C9C0F2;font-size:12px;padding:16px 24px;text-align:center">Vector Marketing &amp; Academy · estudiovector.com</td></tr></table></div>`;
}
const row = (k: string, v: unknown, hi = false) => v ? `<tr><td style="padding:5px 0;color:#5E5484;width:160px;vertical-align:top">${k}</td><td style="padding:5px 0">${hi ? `<span style="background:#FDE7F2;color:#C4107C;font-weight:bold;padding:3px 8px;border-radius:6px">${esc(v)}</span>` : `<b>${esc(v)}</b>`}</td></tr>` : "";
const sec = (t: string) => `<div style="font-size:12px;letter-spacing:1.5px;color:#6A3BF5;text-transform:uppercase;font-weight:bold;margin:18px 0 6px">${t}</div>`;

async function sendMail(to: string, subject: string, html: string, text: string, replyTo?: string, key?: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY no configurada");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", ...(key ? { "Idempotency-Key": key } : {}) },
    body: JSON.stringify({ from: FROM, to: [to], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!r.ok) throw new Error("Resend " + r.status + " " + (await r.text()).slice(0, 200));
}

Deno.serve(async (req) => {
  const h = cors(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers: h });
  const json = (b: unknown, st = 200) => new Response(JSON.stringify(b), { status: st, headers: { ...h, "Content-Type": "application/json" } });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  let b: Record<string, unknown>;
  try { const raw = await req.text(); if (raw.length > 20000) return json({ error: "Solicitud muy grande" }, 413); b = JSON.parse(raw); } catch { return json({ error: "Datos inválidos" }, 400); }
  if (s(b.web)) return json({ ok: true }); // campo trampa para robots
  const origen = s(b.origen, 200);
  /* Las lecturas (información pública del reto, tabla de posiciones y tablero del jefe) no escriben
     nada ni mandan correos, así que se permiten desde cualquier parte. Todo lo que escribe sí queda
     restringido al sitio en vivo, para que una prueba no genere filas ni avisos. */
  const soloLee = b.tipo === "equipo_info" || b.tipo === "equipo_panel" || b.tipo === "equipo_ranking";
  if (!soloLee && esPrueba(origen || req.headers.get("origin") || "")) return json({ ok: true, prueba: true });

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  const ipHash = await hash(ip || "sin-ip");
  /* Pulso anónimo de avance: sin datos personales, solo para ver dónde abandona la gente. */
  if (b.tipo === "paso") {
    const paso = s(b.paso, 24), sesion = s(b.sesion, 24);
    if (!paso || !sesion) return json({ ok: true });
    const { count: pasos } = await db.from("academia_pasos").select("id", { count: "exact", head: true }).eq("sesion", sesion);
    if ((pasos ?? 0) >= 120) return json({ ok: true });
    await db.from("academia_pasos").insert({ sesion, paso, indice: Number(b.indice) || 0, total: Number(b.total) || 0, rubro: s(b.rubro, 40), origen });
    return json({ ok: true });
  }

  /* Datos públicos del reto, para que el enlace del jefe llene empresa y rubro */
  if (b.tipo === "equipo_info") {
    const codigo = s(b.equipo, 12).toUpperCase();
    if (!codigo) return json({ error: "Falta el código." }, 400);
    const { data } = await db.from("academia_equipos").select("codigo, empresa, rubro, prod, jefe_nombre").eq("codigo", codigo).maybeSingle();
    if (!data) return json({ error: "Ese código de equipo no existe." }, 404);
    return json({ ok: true, equipo: data });
  }

  /* Tabla de posiciones del reto. La ve cualquiera del equipo: esa es la gracia del reto.
     Devuelve nombre de pila e inicial, nunca correo ni teléfono. */
  if (b.tipo === "equipo_ranking") {
    const codigo = s(b.equipo, 12).toUpperCase();
    if (!codigo) return json({ error: "Falta el código." }, 400);
    const { data: eq } = await db.from("academia_equipos").select("codigo, empresa").eq("codigo", codigo).maybeSingle();
    if (!eq) return json({ error: "Ese reto no existe." }, 404);
    const { data: filas } = await db.from("academia_registros")
      .select("tipo, nombre, porcentaje, insignias, segundos, created_at").eq("equipo_codigo", codigo);
    const mejor = new Map<string, any>();
    let inscritos = 0;
    (filas || []).forEach(f => {
      const k = (f.nombre || "").toLowerCase();
      if (f.tipo === "registro") { if (!mejor.has(k)) { mejor.set(k, null); inscritos++; } return; }
      const corto = (f.nombre || "").trim().split(/\s+/);
      const visible = corto[0] + (corto[1] ? " " + corto[1][0].toUpperCase() + "." : "");
      const v = mejor.get(k);
      if (!v || f.porcentaje > v.porcentaje || (f.porcentaje === v.porcentaje && (f.insignias || 0) > v.insignias))
        mejor.set(k, { nombre: visible, porcentaje: f.porcentaje, insignias: f.insignias || 0, segundos: f.segundos, fecha: f.created_at });
    });
    const tabla = [...mejor.values()].filter(Boolean).sort((a, b2) => b2.porcentaje - a.porcentaje || b2.insignias - a.insignias || a.segundos - b2.segundos);
    return json({ ok: true, empresa: eq.empresa, inscritos: Math.max(inscritos, mejor.size), tabla });
  }

  /* Tablero del jefe. La llave es el token privado, no el código que reparte. */
  if (b.tipo === "equipo_panel") {
    const token = s(b.token, 40);
    if (token.length < 24) return json({ error: "Enlace de tablero inválido." }, 400);
    const { data: eq } = await db.from("academia_equipos").select("codigo, empresa, rubro, jefe_nombre, jefe_correo, created_at").eq("token", token).maybeSingle();
    if (!eq) return json({ error: "Ese tablero no existe." }, 404);
    const { data: filas } = await db.from("academia_registros")
      .select("tipo, nombre, cargo, correctas, total, porcentaje, nivel, segundos, insignias, falladas, created_at")
      .eq("equipo_codigo", eq.codigo).order("created_at", { ascending: true });
    /* Al jefe se le muestran nombre, cargo y resultado. El correo y el teléfono de cada
       empleado no se devuelven: no hacen falta para ver quién se capacitó. */
    const personas = new Map<string, any>();
    (filas || []).forEach(f => {
      const k = (f.nombre || "").toLowerCase();
      const v = personas.get(k) || { nombre: f.nombre, cargo: f.cargo, registrado: null, examenes: 0, mejor: null, nivel: "", insignias: 0, segundos: 0, fecha: null, falla: [] as string[] };
      if (f.tipo === "registro") { v.registrado = v.registrado || f.created_at; v.cargo = v.cargo || f.cargo; }
      else {
        v.examenes++;
        if (v.mejor === null || f.porcentaje > v.mejor) { v.mejor = f.porcentaje; v.nivel = f.nivel; v.insignias = f.insignias || 0; v.segundos = f.segundos; v.fecha = f.created_at; v.falla = (Array.isArray(f.falladas) ? f.falladas : []).map((x: any) => x?.letra).filter(Boolean); }
      }
      personas.set(k, v);
    });
    const lista = [...personas.values()];
    const porLetra: Record<string, number> = {};
    lista.forEach(p2 => (p2.falla || []).forEach((l: string) => (porLetra[l] = (porLetra[l] || 0) + 1)));
    return json({ ok: true, equipo: { empresa: eq.empresa, rubro: eq.rubro, jefe: eq.jefe_nombre, codigo: eq.codigo, desde: eq.created_at }, personas: lista, porLetra });
  }

  /* Crear un reto: devuelve el enlace para repartir y el del tablero */
  if (b.tipo === "equipo") {
    const q = { empresa: s(b.empresa, 100), rubro: s(b.rubro, 40), prod: s(b.prod, 50), jefe_nombre: s(b.nombre, 80), jefe_correo: s(b.correo, 120).toLowerCase(), jefe_telefono: s(b.telefono, 30) };
    if (q.empresa.length < 2 || !q.rubro || q.jefe_nombre.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.jefe_correo))
      return json({ error: "Revise el nombre de la empresa, su nombre y su correo." }, 400);
    let codigo = "", intentos = 0;
    while (intentos++ < 6) { const c = nuevoCodigo(); const { data: ya } = await db.from("academia_equipos").select("id").eq("codigo", c).maybeSingle(); if (!ya) { codigo = c; break; } }
    if (!codigo) return json({ error: "No se pudo generar el código. Intente de nuevo." }, 500);
    const token = nuevoToken();
    const { error } = await db.from("academia_equipos").insert({ ...q, codigo, token, origen, ip_hash: ipHash });
    if (error) throw error;
    const enlace = `https://estudiovector.com/metodologia-vector/?equipo=${codigo}`;
    /* el enlace del reto es el mismo del curso: quien lo abre entra directo al reto de esa empresa */
    const panel = `https://estudiovector.com/metodologia-vector/equipo/?t=${token}`;
    const inner = sec("Empresa") + `<table role="presentation" width="100%" style="font-size:15px">${row("Empresa", q.empresa)}${row("Tipo de negocio", q.rubro)}${row("Responsable", q.jefe_nombre)}${row("Correo", q.jefe_correo)}${row("Teléfono", q.jefe_telefono, true)}</table>`
      + sec("Su reto") + `<table role="presentation" width="100%" style="font-size:15px">${row("Código", codigo)}</table>`
      + `<p style="font-size:15px;margin-top:14px">Reparta este enlace a su gente:</p><p style="font-size:15px;word-break:break-all"><a href="${enlace}">${enlace}</a></p>`
      + `<p style="font-size:15px;margin-top:14px">Y guarde este, que es su tablero de resultados. No lo comparta con el equipo:</p><p style="font-size:15px;word-break:break-all"><a href="${panel}">${panel}</a></p>`
      + `<p style="font-size:13px;color:#5E5484;margin-top:18px">Cada vez que alguien de su equipo apruebe, le llega un correo con su resultado. ${fecha()}</p>`;
    await sendMail(q.jefe_correo, `Su reto de ${q.empresa} ya puede empezar · código ${codigo}`,
      shell(`El reto de ${esc(q.empresa)} está listo`, `Código ${esc(codigo)}`, inner),
      `Reto creado: ${q.empresa}\nCódigo: ${codigo}\nEnlace para su gente: ${enlace}\nSu tablero de resultados: ${panel}\n${fecha()}`, TO, "eq-" + codigo);
    await sendMail(TO, `Nueva empresa con reto VECTOR: ${q.empresa}`,
      shell(`${esc(q.empresa)} creó su reto`, `${esc(q.jefe_nombre)} · ${esc(codigo)}`, inner),
      `Nueva empresa en la Metodología VECTOR\n${q.empresa} (${q.rubro})\nResponsable: ${q.jefe_nombre} · ${q.jefe_correo} · ${q.jefe_telefono}\nCódigo: ${codigo}\nTablero: ${panel}\n${fecha()}`, q.jefe_correo, "eqv-" + codigo);
    return json({ ok: true, codigo, token, enlace, panel });
  }

  const desde = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await db.from("academia_registros").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", desde);
  if ((count ?? 0) >= 12) return json({ error: "Demasiados envíos seguidos. Intente en unos minutos." }, 429);

  const tipo = b.tipo === "examen" ? "examen" : "registro";
  const equipo = s(b.equipo, 12).toUpperCase() || null;
  const p = {
    nombre: s(b.nombre, 80), empresa: s(b.empresa, 100), cargo: s(b.cargo, 80), correo: s(b.correo, 120).toLowerCase(),
    telefono: s(b.telefono, 30), ciudad: s(b.ciudad, 60), rubro: s(b.rubro, 80), vendedores: s(b.vendedores, 30), interes: s(b.interes, 80),
  };
  if (p.nombre.length < 3 || p.empresa.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.correo) || p.telefono.replace(/\D/g, "").length < 8)
    return json({ error: "Revise nombre, empresa, correo y teléfono." }, 400);

  try {
    if (tipo === "registro") {
      /* ¿Ya se había registrado antes con este correo? Entonces se guarda pero no se avisa. */
      const { count: regPrevios } = await db.from("academia_registros").select("id", { count: "exact", head: true }).eq("tipo", "registro").eq("correo", p.correo);
      const { data, error } = await db.from("academia_registros").insert({ tipo, ...p, equipo_codigo: equipo, origen, ip_hash: ipHash }).select("id").single();
      if (error) throw error;
      if (equipo || (regPrevios ?? 0) > 0) return json({ ok: true, id: data.id, aviso: false });
      const inner = sec("Participante") + `<table role="presentation" width="100%" style="font-size:15px">${row("Nombre", p.nombre)}${row("Cargo", p.cargo)}${row("Teléfono / WhatsApp", p.telefono, true)}${row("Correo", p.correo)}</table>`
        + sec("Empresa") + `<table role="presentation" width="100%" style="font-size:15px">${row("Empresa", p.empresa)}${row("Tipo de negocio", p.rubro)}${row("Ciudad", p.ciudad)}${row("Personas en ventas", p.vendedores)}${row("Le interesa", p.interes, true)}</table>`
        + `<p style="font-size:13px;color:#5E5484;margin-top:18px">Registrado el ${fecha()}. Responda este correo para escribirle directo.</p>`;
      await sendMail(TO, `Nuevo registro VECTOR: ${p.nombre} · ${p.empresa}`, shell(`${esc(p.nombre)} se registró en el curso`, esc(p.empresa), inner),
        `Nuevo registro en la Metodología VECTOR\n${p.nombre} (${p.cargo})\nTel: ${p.telefono}\nCorreo: ${p.correo}\nEmpresa: ${p.empresa} · ${p.rubro} · ${p.ciudad}\nEn ventas: ${p.vendedores}\nInterés: ${p.interes}\n${fecha()}`, p.correo, "reg-" + data.id);
      return json({ ok: true, id: data.id, aviso: true });
    }

    const correctas = Math.max(0, Math.min(50, Number(b.correctas) || 0)), total = Math.max(1, Math.min(50, Number(b.total) || 1));
    const porcentaje = Math.round(correctas / total * 100), nivel = s(b.nivel, 40), segundos = Math.max(0, Math.min(36000, Number(b.segundos) || 0));
    const insignias = Math.max(0, Math.min(20, Number(b.insignias) || 0));
    const falladas = (Array.isArray(b.falladas) ? b.falladas : []).slice(0, 20).map((f: any) => ({ pregunta: s(f?.pregunta, 300), situacion: s(f?.situacion, 300), eligio: s(f?.eligio, 400), consecuencia: s(f?.consecuencia, 400), correcta: s(f?.correcta, 400), comoMejorar: s(f?.comoMejorar, 400), letra: s(f?.letra, 2) }));
    const regId = typeof b.registro_id === "string" && /^[0-9a-f-]{36}$/.test(b.registro_id) ? b.registro_id : null;
    const { count: previos } = await db.from("academia_registros").select("id", { count: "exact", head: true }).eq("tipo", "examen").eq("correo", p.correo);
    /* Solo avisa la primera vez que esta persona aprueba y obtiene su certificado */
    const { count: aprobadosPrevios } = await db.from("academia_registros").select("id", { count: "exact", head: true }).eq("tipo", "examen").eq("correo", p.correo).gte("porcentaje", APROBADO);
    const { data, error } = await db.from("academia_registros").insert({ tipo, registro_id: regId, ...p, equipo_codigo: equipo, correctas, total, porcentaje, nivel, segundos, insignias, falladas, origen, ip_hash: ipHash }).select("id").single();
    if (error) throw error;
    if (porcentaje < APROBADO || (aprobadosPrevios ?? 0) > 0) return json({ ok: true, id: data.id, aviso: false });
    /* Si viene de un reto, el resultado es para el jefe de esa empresa, no para Vector. */
    let destino = TO, panelJefe = "";
    if (equipo) {
      const { data: eq } = await db.from("academia_equipos").select("jefe_correo, token, empresa").eq("codigo", equipo).maybeSingle();
      if (eq) { destino = eq.jefe_correo; panelJefe = `https://estudiovector.com/metodologia-vector/equipo/?t=${eq.token}`; }
    }

    const mejora = falladas.length ? falladas.map((f, i) => `<div style="margin-top:10px;border:1px solid #E4DBFB;border-left:4px solid #E0169B;border-radius:10px;padding:12px"><div style="font-weight:bold">${i + 1}. ${f.letra ? `[${esc(f.letra)}] ` : ""}${esc(f.pregunta)}</div>${f.situacion ? `<div style="font-size:13px;color:#5E5484;margin-top:4px">${esc(f.situacion)}</div>` : ""}<div style="font-size:14px;margin-top:6px"><span style="color:#C0264B">✗ Respondió:</span> ${esc(f.eligio)}</div>${f.consecuencia ? `<div style="font-size:14px;margin-top:4px;color:#C0264B">Resultado: ${esc(f.consecuencia)}</div>` : ""}<div style="font-size:14px;margin-top:4px"><span style="color:#0E9A60">✓ Correcta:</span> ${esc(f.correcta)}</div><div style="font-size:14px;margin-top:6px;background:#F4EFFF;padding:8px;border-radius:8px"><b>Cómo mejorar:</b> ${esc(f.comoMejorar)}</div></div>`).join("") : `<p><b>Sin puntos de mejora:</b> respondió todo correctamente.</p>`;
    const inner = sec("Participante") + `<table role="presentation" width="100%" style="font-size:15px">${row("Nombre", p.nombre)}${row("Teléfono / WhatsApp", p.telefono, true)}${row("Correo", p.correo)}${row("Empresa", p.empresa)}${row("Tipo de negocio", p.rubro)}${row("Le interesa", p.interes)}</table>`
      + sec("Resultado") + `<table role="presentation" width="100%" style="font-size:15px">${row("Puntaje", `${correctas}/${total} (${porcentaje}%)`)}${row("Nivel", nivel)}${row("Insignias", insignias + " de 8")}${row("Certificado", "Emitido a nombre de " + p.nombre)}${row("Tiempo", `${Math.floor(segundos / 60)} min ${segundos % 60} s`)}${row("Intento número", String((previos ?? 0) + 1))}${row("Fecha", fecha())}</table>`
      + sec(`Puntos de mejora (${falladas.length})`) + mejora
      + (panelJefe ? `<p style="font-size:14px;margin-top:18px">Vea a todo su equipo y la tabla de posiciones en su tablero:<br><a href="${panelJefe}" style="word-break:break-all">${panelJefe}</a></p>` : "");
    await sendMail(destino, `Curso completado: ${p.nombre} (${p.empresa}) obtuvo ${correctas}/${total} y su certificado`, shell(`${esc(p.nombre)} completó el curso`, `Certificado · ${esc(nivel)} · ${porcentaje}%`, inner),
      `Curso Metodología VECTOR completado\n${p.nombre} · Tel ${p.telefono} · ${p.correo}\nEmpresa: ${p.empresa} (${p.rubro})\nResultado: ${correctas}/${total} (${porcentaje}%) · ${nivel}\nInsignias: ${insignias} de 8\nCertificado emitido.\nPuntos de mejora:\n${falladas.map(f => "- " + f.pregunta + " → " + f.comoMejorar).join("\n") || "Ninguno"}`, p.correo, "exa-" + data.id);
    return json({ ok: true, id: data.id, aviso: true });
  } catch (e) {
    console.error("academia-vector", e);
    return json({ error: "No se pudo registrar en este momento." }, 500);
  }
});
