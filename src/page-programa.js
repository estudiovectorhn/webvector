/* Página del Programa Ejecutivo de Vector Academy: /programa-ejecutivo-marketing-digital-ia/ */
module.exports = function buildPrograma(c) {
  const { head, ICON, fmt, P, SITE, ORG, ORG_ID, PERSON, PERSON_ID, PLACE, faqLD, crumbsLD, faqHTML, siteHeader, siteFooter, write, V, waText, esc, toolIcon, iso } = c;
  const url = `${SITE}/${P.slug}/`;
  const waReserva = waText(`Hola Vector Academy, quiero reservar mi cupo en el ${P.nombre} (${P.generacion}).`);
  const waInfo = waText(`Hola Vector Academy, quiero información del ${P.nombre}.`);

  const facts = [
    [P.sesiones, "sesiones"], [P.horas, "horas presenciales"], [P.semanas, "semanas"], [P.cupos, "cupos"]
  ];

  const clase = k => `
      <article class="pg-clase">
        <div class="pg-cn"><span>Clase</span><b>${String(k.n).padStart(2, "0")}</b></div>
        <div class="pg-cb">
          <span class="pg-cd">${k.dia}</span>
          <h3>${esc(k.titulo)}</h3>
          <p>${esc(k.resumen)}</p>
          <div class="pg-apps">${k.tools.map(t => `<span class="pg-logo">${toolIcon(t, 20)}</span>`).join("")}${k.apps.map(a => `<span class="pg-app">${esc(a)}</span>`).join("")}</div>
        </div>
      </article>`;

  const espacio = (e, i) => `
      <article class="pg-esp${i ? " pg-esp-alt" : ""}">
        <figure class="pg-esp-ph"><img src="${e.img}" alt="${esc(e.alt)}" width="960" height="640" loading="lazy"><div class="wm logo-img"></div>${e.pie ? `<figcaption>${esc(e.pie)}</figcaption>` : ""}</figure>
        <div class="pg-esp-tx">
          <span class="eyebrow">Espacio ${i + 1} de 2</span>
          <h3>${esc(e.nombre)}</h3>
          <p>${esc(e.lead)}</p>
          <ul class="pg-check">${e.puntos.map(p => `<li>${ICON.check}<span>${esc(p)}</span></li>`).join("")}</ul>
        </div>
      </article>`;

  const campo = (id, label, type, attrs, hint) => `
        <div class="pg-f">
          <label for="${id}">${label}</label>
          <input id="${id}" name="${id}" type="${type}" ${attrs}>
          ${hint ? `<small>${hint}</small>` : ""}
          <p class="pg-err" id="err-${id}" hidden></p>
        </div>`;

  const body = `${siteHeader("programa")}
<main class="wrap pgpage" id="contenido">

  <section class="pg-hero">
    <div class="pg-hero-tx">
      <span class="eyebrow">${esc(P.academia)} · ${esc(P.generacion)}</span>
      <h1>${esc(P.h1)}<span class="sr">: ${esc(P.nombre)} en ${esc(P.ciudad)}</span></h1>
      <p class="pg-kicker">${esc(P.nombre)}</p>
      <p class="lead">${esc(P.sub)}</p>
      <div class="pg-when">
        <div><small>Inicia</small><b>${esc(P.inicioTexto)}</b></div>
        <div><small>Termina</small><b>${esc(P.finTexto)}</b></div>
        <div><small>Horario</small><b>${esc(P.dias)}, ${esc(P.horario)}</b></div>
        <div><small>Modalidad</small><b>${esc(P.modalidad)} · ${esc(P.ciudad)}</b></div>
      </div>
      <div class="pg-facts">${facts.map(([n, l]) => `<div class="pg-fact"><b>${n}</b><span>${l}</span></div>`).join("")}</div>
      <div class="pg-cta">
        <a class="btn" href="#inscripcion">${ICON.arrow}Reserva tu cupo con ${fmt(P.matricula)}</a>
        <a class="btn ghost" href="#temario">Ver el temario</a>
      </div>
      <p class="pg-price-note">Inversión total del programa: <b>${fmt(P.precio)}</b>. La matrícula de ${fmt(P.matricula)} se aplica al total y deja un saldo de ${fmt(P.saldo)}.</p>
    </div>
    <div class="pg-hero-ph">
      <img src="${P.heroImg}" alt="${esc(P.heroAlt)}" width="1200" height="800" fetchpriority="high">
      <div class="wm logo-img"></div>
      <div class="pg-badge"><b>${P.cupos} cupos</b><span>Primera generación</span></div>
    </div>
  </section>

  <section class="pg-res" aria-labelledby="res-t">
    <div class="sechead"><h2 id="res-t">Al terminar el programa</h2><p>Cuatro resultados concretos que te llevas aplicados a tu propio negocio.</p></div>
    <div class="pg-res-grid">${P.resultados.map(([t, d], i) => `<article class="pg-res-i"><span class="pg-num">${String(i + 1).padStart(2, "0")}</span><b>${esc(t)}</b><p>${esc(d)}</p></article>`).join("")}</div>
  </section>

  <section class="pg-pub" aria-labelledby="pub-t">
    <div class="sechead"><h2 id="pub-t">¿Para quién es?</h2><p>${esc(P.dirigido)}</p></div>
    <ul class="pg-pub-grid">${P.publico.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ul>
  </section>

  <section class="pg-esps" aria-labelledby="esp-t">
    <div class="sechead"><h2 id="esp-t">Dónde vas a estudiar</h2><p>Dos espacios conectados por una puerta: se explica en el aula y se practica en el estudio, en la misma sesión.</p></div>
    ${P.espacios.map(espacio).join("")}
    <ul class="pg-dif">${P.diferenciadores.map(([t, d]) => `<li>${ICON.check}<b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ul>
  </section>

  <section class="pg-temario" id="temario" aria-labelledby="tem-t">
    <div class="sechead"><h2 id="tem-t">Temario · ${P.sesiones} clases</h2><p>Cada sesión cierra con algo hecho por ti: un guion, un video editado, una campaña configurada o tu WhatsApp Business ordenado.</p></div>
    <div class="pg-clases">${P.clases.map(clase).join("")}</div>
  </section>

  <section class="pg-cal" aria-labelledby="cal-t">
    <div class="sechead"><h2 id="cal-t">Calendario de sesiones</h2><p>${esc(P.dias)}, de ${esc(P.horario)}. ${P.semanas} semanas, ${P.horas} horas presenciales.</p></div>
    <div class="pg-cal-wrap"><table class="pg-cal-t">
      <caption class="sr">Calendario del ${esc(P.nombre)}</caption>
      <thead><tr><th scope="col">Sesión</th><th scope="col">Fecha</th><th scope="col">Tema</th><th scope="col">Horario</th></tr></thead>
      <tbody>${P.clases.map(k => `<tr><th scope="row">${String(k.n).padStart(2, "0")}</th><td>${k.dia}</td><td>${esc(k.titulo)}</td><td>${esc(P.horario)}</td></tr>`).join("")}</tbody>
    </table></div>
  </section>

  <section class="pg-inst" aria-labelledby="inst-t">
    <div class="pg-inst-ph"><img src="/img/edgardo.jpg" alt="Edgardo A. López, instructor del programa" width="640" height="640" loading="lazy"><div class="wm logo-img"></div></div>
    <div>
      <span class="eyebrow">Imparte</span>
      <h2 id="inst-t">Edgardo A. López</h2>
      <p>Fundador y Director Creativo de <b>Estudio Vector</b> y fundador de VCloud Multisystems. Capacitador empresarial en marketing digital e inteligencia artificial, asesor publicitario de empresas en Honduras y conferencista, con más de 15 años en comunicación visual y marketing y proyectos en Honduras, Panamá, México y Estados Unidos.</p>
      <div class="stats">
        <div class="stat"><b data-count="500" data-suffix="+">500+</b><span>alumnos capacitados</span></div>
        <div class="stat"><b data-count="15" data-suffix="+">15+</b><span>años en marketing y comunicación visual</span></div>
        <div class="stat"><b>IA</b><span>capacitador del Forum Ruta Copán 2026</span></div>
      </div>
      <a class="btn ghost" href="/director-creativo/">Ver su perfil completo</a>
    </div>
  </section>

  <section class="pg-inv" id="inversion" aria-labelledby="inv-t">
    <div class="pg-inv-card">
      <div class="wm logo-img"></div>
      <span class="eyebrow">Inversión</span>
      <h2 id="inv-t">${fmt(P.precio)} el programa completo</h2>
      <div class="pg-pay">
        <div class="pg-pay-i"><small>Reservas tu cupo con</small><b>${fmt(P.matricula)}</b><span>Matrícula, se aplica al total</span></div>
        <div class="pg-pay-i"><small>Saldo restante</small><b>${fmt(P.saldo)}</b><span>Se coordina al confirmar la matrícula</span></div>
      </div>
      <ul class="pg-check pg-inv-list">
        <li>${ICON.check}<span>${P.sesiones} sesiones presenciales, ${P.horas} horas de formación</span></li>
        <li>${ICON.check}<span>Práctica en el Executive Classroom y el Content Lab</span></li>
        <li>${ICON.check}<span>Coffee experience en cada sesión</span></li>
        <li>${ICON.check}<span>Grupo de máximo ${P.cupos} participantes</span></li>
        <li>${ICON.check}<span>${esc(P.certificado)}</span></li>
      </ul>
      <p class="pg-nota">El certificado es privado de Vector Academy: no es un título con aval universitario ni reconocimiento estatal. Las formas de pago se confirman por WhatsApp al reservar; el cupo queda apartado cuando la matrícula está confirmada.</p>
      <a class="btn" href="#inscripcion">${ICON.arrow}Reservar mi cupo</a>
    </div>
  </section>

  ${faqHTML(P.faq, "Preguntas frecuentes")}

  <section class="pg-form" id="inscripcion" aria-labelledby="ins-t">
    <div class="pg-form-head">
      <span class="eyebrow">Inscripción · ${esc(P.generacion)}</span>
      <h2 id="ins-t">Reserva tu cupo</h2>
      <p>Déjanos tus datos y te contactamos por WhatsApp para confirmar disponibilidad y coordinar el pago de la matrícula de ${fmt(P.matricula)}. Son solo ${P.cupos} cupos.</p>
    </div>
    <form class="pg-form-card" id="pgform" novalidate>
      <div class="pg-grid2">
        ${campo("nombre", "Nombre completo <i>*</i>", "text", 'required autocomplete="name" maxlength="80" placeholder="Tu nombre y apellido"')}
        ${campo("telefono", "Teléfono / WhatsApp <i>*</i>", "tel", 'required autocomplete="tel" inputmode="tel" maxlength="20" placeholder="9999-9999"', "Número al que te podemos escribir por WhatsApp.")}
        ${campo("correo", "Correo electrónico <i>*</i>", "email", 'required autocomplete="email" maxlength="120" placeholder="nombre@correo.com"')}
        ${campo("empresa", "Nombre de la empresa", "text", 'autocomplete="organization" maxlength="80" placeholder="Opcional"')}
      </div>
      <div class="pg-f">
        <label for="actividad">Actividad comercial <i>*</i></label>
        <input id="actividad" name="actividad" type="text" required maxlength="120" placeholder="A qué se dedica tu negocio: restaurante, ferretería, clínica, servicios…">
        <p class="pg-err" id="err-actividad" hidden></p>
      </div>
      <div class="pg-consents">
        <label class="pg-check-l"><input type="checkbox" id="cdatos" name="cdatos" required><span>Autorizo a Vector Academy a tratar mis datos personales con el fin de gestionar esta solicitud de inscripción. <i>*</i></span></label>
        <p class="pg-err" id="err-cdatos" hidden></p>
        <label class="pg-check-l"><input type="checkbox" id="ccom" name="ccom"><span>Además, quiero recibir comunicaciones comerciales de Vector Academy sobre próximos programas y talleres. <small>(opcional)</small></span></label>
      </div>
      <button class="btn" type="submit" id="pgsend">${ICON.wa}Enviar y reservar mi cupo</button>
      <p class="pg-formnote">Los campos con <i>*</i> son obligatorios. Al enviar, se abre WhatsApp con tus datos para que confirmemos tu cupo; nadie queda inscrito hasta confirmar la matrícula.</p>
      <p class="pg-state" id="pgstate" role="status" hidden></p>
    </form>
  </section>

  <section class="ctaband pg-final">
    <div class="wm logo-img"></div>
    <div><h2>${P.cupos} cupos para la primera generación</h2><p>Programa presencial en ${esc(P.ciudad)}. Inicia el ${esc(P.inicioTexto)}.</p></div>
    <a class="btn light" href="#inscripcion">Reserva tu cupo con ${fmt(P.matricula)}</a>
  </section>

  <p class="an-more">¿Prefieres un taller corto de un solo tema? Mira el <a href="/talleres/">calendario de talleres</a> o nuestros <a href="/servicios/">servicios de marketing</a>.</p>
  ${siteFooter()}
</main>
<div class="cta-bar"><a class="btn" href="#inscripcion">${ICON.arrow}Reservar cupo · ${fmt(P.matricula)}</a></div>`;

  const curso = {
    "@type": "Course", "@id": url + "#programa",
    name: P.nombre,
    description: `${P.sub} Programa presencial de ${P.semanas} semanas, ${P.sesiones} sesiones y ${P.horas} horas en ${P.ciudad}.`,
    url, inLanguage: "es", provider: { "@id": ORG_ID }, educationalLevel: "Formación ejecutiva",
    teaches: P.clases.map(k => k.titulo),
    syllabusSections: P.clases.map(k => ({ "@type": "Syllabus", name: k.titulo, description: k.resumen, position: k.n })),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      startDate: iso(P.inicio, P.horaInicio),
      endDate: iso(P.fin, P.horaFin),
      location: PLACE,
      instructor: { "@id": PERSON_ID },
      maximumAttendeeCapacity: P.cupos,
      courseWorkload: `PT${P.horas}H`,
      courseSchedule: { "@type": "Schedule", byDay: ["https://schema.org/Tuesday", "https://schema.org/Thursday"], startTime: P.horaInicio, endTime: P.horaFin, repeatCount: P.sesiones, repeatFrequency: "P1W", startDate: P.inicio, endDate: P.fin },
      offers: { "@type": "Offer", price: P.precio, priceCurrency: "HNL", availability: "https://schema.org/InStock", url, category: "Programa ejecutivo" }
    },
    offers: { "@type": "Offer", price: P.precio, priceCurrency: "HNL", availability: "https://schema.org/InStock", url }
  };

  const graph = [ORG, PERSON, curso, faqLD(P.faq), crumbsLD([["Inicio", "/"], ["Talleres", "/talleres/"], [P.nombre, `/${P.slug}/`]])];
  const html = head({
    title: `${P.nombre} | ${P.academia}, San Pedro Sula`,
    desc: `Programa ejecutivo presencial en ${P.ciudad}: ${P.sesiones} sesiones, ${P.horas} horas, martes y jueves de ${P.horario}. Del ${P.inicioTexto} al ${P.finTexto}. Inversión ${fmt(P.precio)}, reservas con ${fmt(P.matricula)}. Solo ${P.cupos} cupos.`,
    keywords: "programa ejecutivo marketing digital Honduras, curso de marketing digital San Pedro Sula, diplomado marketing digital Honduras, curso de inteligencia artificial para negocios, curso Meta Ads, curso CapCut, Vector Academy",
    canonical: url, image: SITE + "/img/meta.jpg", ldGraph: graph
  }) + "\n" + body + `
<script>window.PROGRAMA=${JSON.stringify({ nombre: P.nombre, generacion: P.generacion, matricula: P.matricula, precio: P.precio, endpoint: c.endpoint || "" }).replace(/</g, "\\u003c")};</script>
<script src="/assets/js/render.js?v=${V}"></script>
<script src="/assets/js/site.js?v=${V}"></script>
<script src="/assets/js/programa.js?v=${V}"></script>
</body>
</html>
`;
  write(`${P.slug}/index.html`, html);
};
