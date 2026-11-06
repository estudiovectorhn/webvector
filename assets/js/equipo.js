/* Tablero del jefe de equipo · /metodologia-vector/equipo/?t=TOKEN */
(function () {
"use strict";
const box = document.getElementById("eqPanel"); if (!box) return;
const EP = box.dataset.endpoint || "";
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const token = new URLSearchParams(location.search).get("t") || "";
const LET = { V: "Vincular", E: "Explorar", C: "Conocer", T: "Transparentar", O: "Ofrecer", R: "Retener" };
const dia = f => { try { return new Date(f).toLocaleDateString("es-HN", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return ""; } };
const aviso = (t, d) => (box.innerHTML = `<div class="eq-aviso"><h1>${esc(t)}</h1><p>${esc(d)}</p><a class="btn" href="/metodologia-vector/">Ir al curso</a></div>`);

if (!token || !EP) { aviso("Enlace incompleto", "Abra el tablero desde el enlace que le llegó por correo al crear su equipo."); return; }

fetch(EP, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tipo: "equipo_panel", token, origen: location.href }) })
  .then(r => r.json())
  .then(j => { if (!j || !j.ok) throw new Error((j && j.error) || "No se pudo cargar"); pinta(j); })
  .catch(e => aviso("No pudimos abrir su tablero", String(e.message || e) + ". Revise que esté usando el enlace completo que le enviamos por correo."));

function pinta(j) {
  const eq = j.equipo, gente = j.personas || [], porLetra = j.porLetra || {};
  const certificados = gente.filter(p => p.mejor != null && p.mejor >= 70).length;
  const conExamen = gente.filter(p => p.mejor != null);
  const prom = conExamen.length ? Math.round(conExamen.reduce((a, p) => a + p.mejor, 0) / conExamen.length) : 0;
  const flojas = Object.entries(porLetra).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const enlace = location.origin + "/metodologia-vector/?equipo=" + eq.codigo;
  const wa = "https://wa.me/?text=" + encodeURIComponent(`Les comparto el curso gratuito de atención y ventas por WhatsApp de ${eq.empresa}. Toma unos 12 minutos y da certificado: ${enlace}`);

  box.innerHTML = `
  <header class="eq-head">
    <span class="eyebrow">Tablero de equipo · Vector Academy</span>
    <h1>${esc(eq.empresa)}</h1>
    <p>Responsable: ${esc(eq.jefe)} · Equipo creado el ${dia(eq.desde)} · Código <b>${esc(eq.codigo)}</b></p>
  </header>

  <div class="eq-nums">
    <div><b>${gente.length}</b><span>se registraron</span></div>
    <div><b>${certificados}</b><span>certificados</span></div>
    <div><b>${conExamen.length ? prom + "%" : "—"}</b><span>promedio</span></div>
    <div><b>${flojas.length ? flojas[0][0] : "—"}</b><span>letra más floja</span></div>
  </div>

  <section class="eq-sec">
    <h2>Reparta el enlace</h2>
    <p class="eq-p">Quien lo abra entra directo al equipo de ${esc(eq.empresa)}: solo escribe su nombre y empieza.</p>
    <div class="eq-link"><input id="eqUrl" readonly value="${esc(enlace)}"><button class="btn" type="button" id="eqCopy">Copiar</button></div>
    <a class="btn light" href="${wa}" target="_blank" rel="noopener">Compartir por WhatsApp</a>
  </section>

  <section class="eq-sec">
    <h2>Su gente</h2>
    ${gente.length ? `<div class="eq-tabla"><table>
      <thead><tr><th>Nombre</th><th>Cargo</th><th>Resultado</th><th>Nivel</th><th>Fecha</th></tr></thead>
      <tbody>${gente.map(p => {
        const est = p.mejor == null ? `<span class="eq-tag pend">Sin terminar</span>` : p.mejor >= 70 ? `<span class="eq-tag ok">${p.mejor}%</span>` : `<span class="eq-tag no">${p.mejor}%</span>`;
        return `<tr><td data-l="Nombre"><b>${esc(p.nombre)}</b></td><td data-l="Cargo">${esc(p.cargo || "—")}</td><td data-l="Resultado">${est}</td><td data-l="Nivel">${esc(p.nivel || "—")}</td><td data-l="Fecha">${p.fecha ? dia(p.fecha) : (p.registrado ? "Empezó el " + dia(p.registrado) : "—")}</td></tr>`;
      }).join("")}</tbody></table></div>`
      : `<p class="eq-p">Todavía nadie ha entrado con el enlace. En cuanto alguien empiece, aparece aquí.</p>`}
  </section>

  ${flojas.length ? `<section class="eq-sec">
    <h2>En qué falla su equipo</h2>
    <p class="eq-p">Las letras donde más se equivocaron en el examen. Aquí es donde se están yendo los clientes.</p>
    <div class="eq-letras">${flojas.map(([l, n]) => `<div><b>${esc(l)}</b><span>${esc(LET[l] || "")}</span><small>${n} ${n === 1 ? "persona falló" : "personas fallaron"}</small></div>`).join("")}</div>
  </section>` : ""}

  <section class="ctaband">
    <div class="wm logo-img"></div>
    <div><h2>Lleve esto a una capacitación real</h2><p>Con estos resultados en la mano, Vector Academy arma una sesión práctica con los chats de ${esc(eq.empresa)}: inspección de conversaciones reales, corrección en vivo y plan de mejora por persona.</p></div>
    <a class="btn light" href="https://wa.me/50495691481?text=${encodeURIComponent(`Hola Vector Academy, soy ${eq.jefe} de ${eq.empresa}. Mi equipo está haciendo la Metodología VECTOR y quiero cotizar una capacitación.`)}" target="_blank" rel="noopener">Cotizar capacitación</a>
  </section>

  <p class="eq-pie">Este enlace es privado: con él se ven los resultados de su equipo. No lo comparta con su gente; a ellos repártales el enlace de arriba.</p>`;

  const c = document.getElementById("eqCopy");
  c.onclick = async () => {
    const i = document.getElementById("eqUrl");
    try { await navigator.clipboard.writeText(i.value); } catch (e) { i.select(); try { document.execCommand("copy"); } catch (x) {} }
    c.textContent = "¡Copiado!"; setTimeout(() => (c.textContent = "Copiar"), 1800);
  };
}
})();
