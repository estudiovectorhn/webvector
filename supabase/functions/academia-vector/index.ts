// Función pública: registra participantes y resultados del curso Metodología VECTOR
// (estudiovector.com/metodologia-vector/) y avisa por correo a Vector Marketing & Academy.
//
// Correos que se envían (y solo estos dos por persona):
//   1. Registro: la primera vez que ese correo se inscribe. Si vuelve a registrarse, se guarda pero no avisa.
//   2. Curso completado: la primera vez que ese correo aprueba (70% o más) y recibe su certificado.
// Los exámenes reprobados y los intentos repetidos se guardan en la base pero no generan correo.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const ALLOWED = ["https://estudiovector.com", "https://www.estudiovector.com"];
const TO = "estudiovectorhn@gmail.com";
const FROM = "Vector Academy <resultados@vcloudhn.com>";
const APROBADO = 70;

function cors(origin: string | null) {
  const o = origin && ALLOWED.includes(origin) ? origin : ALLOWED[0];
  return { "Access-Control-Allow-Origin": o, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type", "Vary": "Origin" };
}
const s = (v: unknown, n = 120) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const esc = (v: unknown) => String(v ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
async function hash(t: string) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t + "vector-academia")); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("").slice(0, 32); }
const fecha = (d = new Date()) => d.toLocaleString("es-HN", { timeZone: "America/Tegucigalpa", dateStyle: "full", timeStyle: "short" });
/* Pruebas locales o desde cualquier otro sitio: no se guardan ni avisan por correo */
const esPrueba = (u: string) => { try { const host = new URL(u).hostname; return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local") || !/(^|\.)estudiovector\.com$/.test(host); } catch { return true; } };

function shell(titulo: string, chip: string, inner: string) {
  return `<div style="background:#F7F4FF;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#160A3A"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#0E0630;background-image:linear-gradient(120deg,#3A0CC9,#7B4DFF 45%,#E0169B);padding:24px"><div style="font-size:12px;letter-spacing:2px;color:#fff;opacity:.85;text-transform:uppercase">Metodología VECTOR · Vector Academy</div><div style="font-size:22px;font-weight:bold;color:#fff;margin-top:6px">${titulo}</div><div style="margin-top:10px"><span style="display:inline-block;background:#fff;color:#2C02A4;font-weight:bold;font-size:13px;padding:6px 12px;border-radius:999px">${chip}</span></div></td></tr>
<tr><td style="padding:24px">${inner}</td></tr>
<tr><td style="background:#0E0630;color:#C9C0F2;font-size:12px;padding:16px 24px;text-align:center">Vector Marketing &amp; Academy · estudiovector.com</td></tr></table></div>`;
}
const row = (k: string, v: unknown, hi = false) => v ? `<tr><td style="padding:5px 0;color:#5E5484;width:160px;vertical-align:top">${k}</td><td style="padding:5px 0">${hi ? `<span style="background:#FDE7F2;color:#C4107C;font-weight:bold;padding:3px 8px;border-radius:6px">${esc(v)}</span>` : `<b>${esc(v)}</b>`}</td></tr>` : "";
const sec = (t: string) => `<div style="font-size:12px;letter-spacing:1.5px;color:#6A3BF5;text-transform:uppercase;font-weight:bold;margin:18px 0 6px">${t}</div>`;

async function sendMail(subject: string, html: string, text: string, replyTo?: string, key?: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY no configurada");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", ...(key ? { "Idempotency-Key": key } : {}) },
    body: JSON.stringify({ from: FROM, to: [TO], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
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
  if (esPrueba(origen || req.headers.get("origin") || "")) return json({ ok: true, prueba: true });

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  const ipHash = await hash(ip || "sin-ip");
  const desde = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await db.from("academia_registros").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", desde);
  if ((count ?? 0) >= 12) return json({ error: "Demasiados envíos seguidos. Intente en unos minutos." }, 429);

  const tipo = b.tipo === "examen" ? "examen" : "registro";
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
      const { data, error } = await db.from("academia_registros").insert({ tipo, ...p, origen, ip_hash: ipHash }).select("id").single();
      if (error) throw error;
      if ((regPrevios ?? 0) > 0) return json({ ok: true, id: data.id, aviso: false });
      const inner = sec("Participante") + `<table role="presentation" width="100%" style="font-size:15px">${row("Nombre", p.nombre)}${row("Cargo", p.cargo)}${row("Teléfono / WhatsApp", p.telefono, true)}${row("Correo", p.correo)}</table>`
        + sec("Empresa") + `<table role="presentation" width="100%" style="font-size:15px">${row("Empresa", p.empresa)}${row("Tipo de negocio", p.rubro)}${row("Ciudad", p.ciudad)}${row("Personas en ventas", p.vendedores)}${row("Le interesa", p.interes, true)}</table>`
        + `<p style="font-size:13px;color:#5E5484;margin-top:18px">Registrado el ${fecha()}. Responda este correo para escribirle directo.</p>`;
      await sendMail(`Nuevo registro VECTOR: ${p.nombre} · ${p.empresa}`, shell(`${esc(p.nombre)} se registró en el curso`, esc(p.empresa), inner),
        `Nuevo registro en la Metodología VECTOR\n${p.nombre} (${p.cargo})\nTel: ${p.telefono}\nCorreo: ${p.correo}\nEmpresa: ${p.empresa} · ${p.rubro} · ${p.ciudad}\nEn ventas: ${p.vendedores}\nInterés: ${p.interes}\n${fecha()}`, p.correo, "reg-" + data.id);
      return json({ ok: true, id: data.id, aviso: true });
    }

    const correctas = Math.max(0, Math.min(50, Number(b.correctas) || 0)), total = Math.max(1, Math.min(50, Number(b.total) || 1));
    const porcentaje = Math.round(correctas / total * 100), nivel = s(b.nivel, 40), segundos = Math.max(0, Math.min(36000, Number(b.segundos) || 0));
    const falladas = (Array.isArray(b.falladas) ? b.falladas : []).slice(0, 20).map((f: any) => ({ pregunta: s(f?.pregunta, 300), situacion: s(f?.situacion, 300), eligio: s(f?.eligio, 400), consecuencia: s(f?.consecuencia, 400), correcta: s(f?.correcta, 400), comoMejorar: s(f?.comoMejorar, 400), letra: s(f?.letra, 2) }));
    const regId = typeof b.registro_id === "string" && /^[0-9a-f-]{36}$/.test(b.registro_id) ? b.registro_id : null;
    const { count: previos } = await db.from("academia_registros").select("id", { count: "exact", head: true }).eq("tipo", "examen").eq("correo", p.correo);
    /* Solo avisa la primera vez que esta persona aprueba y obtiene su certificado */
    const { count: aprobadosPrevios } = await db.from("academia_registros").select("id", { count: "exact", head: true }).eq("tipo", "examen").eq("correo", p.correo).gte("porcentaje", APROBADO);
    const { data, error } = await db.from("academia_registros").insert({ tipo, registro_id: regId, ...p, correctas, total, porcentaje, nivel, segundos, falladas, origen, ip_hash: ipHash }).select("id").single();
    if (error) throw error;
    if (porcentaje < APROBADO || (aprobadosPrevios ?? 0) > 0) return json({ ok: true, id: data.id, aviso: false });

    const mejora = falladas.length ? falladas.map((f, i) => `<div style="margin-top:10px;border:1px solid #E4DBFB;border-left:4px solid #E0169B;border-radius:10px;padding:12px"><div style="font-weight:bold">${i + 1}. ${f.letra ? `[${esc(f.letra)}] ` : ""}${esc(f.pregunta)}</div>${f.situacion ? `<div style="font-size:13px;color:#5E5484;margin-top:4px">${esc(f.situacion)}</div>` : ""}<div style="font-size:14px;margin-top:6px"><span style="color:#C0264B">✗ Respondió:</span> ${esc(f.eligio)}</div>${f.consecuencia ? `<div style="font-size:14px;margin-top:4px;color:#C0264B">Resultado: ${esc(f.consecuencia)}</div>` : ""}<div style="font-size:14px;margin-top:4px"><span style="color:#0E9A60">✓ Correcta:</span> ${esc(f.correcta)}</div><div style="font-size:14px;margin-top:6px;background:#F4EFFF;padding:8px;border-radius:8px"><b>Cómo mejorar:</b> ${esc(f.comoMejorar)}</div></div>`).join("") : `<p><b>Sin puntos de mejora:</b> respondió todo correctamente.</p>`;
    const inner = sec("Participante") + `<table role="presentation" width="100%" style="font-size:15px">${row("Nombre", p.nombre)}${row("Teléfono / WhatsApp", p.telefono, true)}${row("Correo", p.correo)}${row("Empresa", p.empresa)}${row("Tipo de negocio", p.rubro)}${row("Le interesa", p.interes)}</table>`
      + sec("Resultado") + `<table role="presentation" width="100%" style="font-size:15px">${row("Puntaje", `${correctas}/${total} (${porcentaje}%)`)}${row("Nivel", nivel)}${row("Certificado", "Emitido a nombre de " + p.nombre)}${row("Tiempo", `${Math.floor(segundos / 60)} min ${segundos % 60} s`)}${row("Intento número", String((previos ?? 0) + 1))}${row("Fecha", fecha())}</table>`
      + sec(`Puntos de mejora (${falladas.length})`) + mejora;
    await sendMail(`Curso completado: ${p.nombre} (${p.empresa}) obtuvo ${correctas}/${total} y su certificado`, shell(`${esc(p.nombre)} completó el curso`, `Certificado · ${esc(nivel)} · ${porcentaje}%`, inner),
      `Curso Metodología VECTOR completado\n${p.nombre} · Tel ${p.telefono} · ${p.correo}\nEmpresa: ${p.empresa} (${p.rubro})\nResultado: ${correctas}/${total} (${porcentaje}%) · ${nivel}\nCertificado emitido.\nPuntos de mejora:\n${falladas.map(f => "- " + f.pregunta + " → " + f.comoMejorar).join("\n") || "Ninguno"}`, p.correo, "exa-" + data.id);
    return json({ ok: true, id: data.id, aviso: true });
  } catch (e) {
    console.error("academia-vector", e);
    return json({ error: "No se pudo registrar en este momento." }, 500);
  }
});
