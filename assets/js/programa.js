/* Formulario de inscripción del Programa Ejecutivo: validación, estados y envío.
 * Sin backend: si window.PROGRAMA.endpoint está vacío, la solicitud se entrega por WhatsApp.
 * Si se configura un endpoint, se envía por POST y se muestran los estados de la respuesta. */
(function () {
  const form = document.getElementById("pgform");
  if (!form) return;
  const P = window.PROGRAMA || {};
  const WA = "50495691481";
  const state = document.getElementById("pgstate");
  const btn = document.getElementById("pgsend");
  const btnHTML = btn.innerHTML;

  const campos = [
    { id: "nombre", msg: "Escribe tu nombre completo.", ok: v => v.trim().length >= 3 && v.trim().includes(" ") },
    { id: "telefono", msg: "Escribe un teléfono válido, con al menos 8 dígitos.", ok: v => (v.match(/\d/g) || []).length >= 8 },
    { id: "correo", msg: "Escribe un correo electrónico válido.", ok: v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) },
    { id: "actividad", msg: "Cuéntanos a qué se dedica tu negocio.", ok: v => v.trim().length >= 3 }
  ];

  const err = (id, msg) => {
    const p = document.getElementById("err-" + id), el = document.getElementById(id);
    if (!p) return;
    p.textContent = msg || "";
    p.hidden = !msg;
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    el.classList.toggle("bad", !!msg);
  };

  campos.forEach(c => {
    const el = document.getElementById(c.id);
    el.addEventListener("blur", () => { if (el.value.trim()) err(c.id, c.ok(el.value) ? "" : c.msg); });
    el.addEventListener("input", () => { if (el.classList.contains("bad") && c.ok(el.value)) err(c.id, ""); });
  });

  function validar() {
    let primero = null;
    campos.forEach(c => {
      const el = document.getElementById(c.id);
      const malo = !c.ok(el.value);
      err(c.id, malo ? c.msg : "");
      if (malo && !primero) primero = el;
    });
    const cd = document.getElementById("cdatos");
    const faltaConsentimiento = !cd.checked;
    err("cdatos", faltaConsentimiento ? "Necesitamos tu autorización para tratar tus datos y gestionar la inscripción." : "");
    if (faltaConsentimiento && !primero) primero = cd;
    return primero;
  }

  const datos = () => ({
    programa: P.nombre || "Programa Ejecutivo",
    generacion: P.generacion || "",
    nombre: document.getElementById("nombre").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    empresa: document.getElementById("empresa").value.trim(),
    actividad: document.getElementById("actividad").value.trim(),
    consentimientoDatos: document.getElementById("cdatos").checked,
    consentimientoComercial: document.getElementById("ccom").checked
  });

  const resumen = d => [
    `Hola Vector Academy, quiero reservar mi cupo en el ${d.programa} (${d.generacion}).`,
    "",
    `Nombre: ${d.nombre}`,
    `Teléfono / WhatsApp: ${d.telefono}`,
    `Correo: ${d.correo}`,
    d.empresa ? `Empresa: ${d.empresa}` : null,
    `Actividad comercial: ${d.actividad}`,
    "",
    "Autorizo el tratamiento de mis datos para gestionar esta inscripción.",
    d.consentimientoComercial ? "También acepto recibir comunicaciones comerciales." : null
  ].filter(Boolean).join("\n");

  const aviso = (msg, tipo) => {
    state.textContent = msg;
    state.className = "pg-state " + (tipo || "");
    state.hidden = false;
  };

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const malo = validar();
    if (malo) {
      aviso("Revisa los campos marcados para poder enviar tu solicitud.", "bad");
      malo.focus({ preventScroll: false });
      return;
    }
    const d = datos();
    btn.disabled = true;
    btn.textContent = "Enviando…";
    aviso("Enviando tu solicitud…", "");

    if (P.endpoint) {
      try {
        const r = await fetch(P.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(d)
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || "No se pudo registrar la solicitud.");
        form.reset();
        aviso("¡Listo! Recibimos tu solicitud. Te escribimos por WhatsApp para confirmar tu cupo y coordinar la matrícula. Tu lugar queda apartado cuando la matrícula esté confirmada.", "ok");
        if (window.fbq) try { fbq("track", "Lead", { content_name: d.programa }); } catch (x) {}
        btn.disabled = false;
        btn.innerHTML = btnHTML;
        return;
      } catch (x) {
        aviso("No pudimos registrar tu solicitud en línea. Te abrimos WhatsApp para enviarla directo.", "bad");
      }
    }

    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(resumen(d)), "_blank", "noopener");
    aviso("Te abrimos WhatsApp con tus datos. Envía el mensaje y te confirmamos la disponibilidad del cupo; nadie queda inscrito hasta confirmar la matrícula. Si no se abrió, escríbenos al 9569-1481.", "ok");
    if (window.fbq) try { fbq("track", "Lead", { content_name: d.programa }); } catch (x) {}
    btn.disabled = false;
    btn.innerHTML = btnHTML;
  });
})();
