/* Página de campaña: /anuncios/  (tráfico de Meta Ads "aprende a hacer tus anuncios") */
module.exports = function buildAnuncios(c) {
  const { head, ICON, fmt, T, SITE, ORG, PERSON, tallerLD, faqLD, crumbsLD, faqHTML, siteFooter, write, V, waText, MESNOM, MESCAP, MESYA, MESYACAP } = c;
  const pr = T.find(t => t.id === "meta");
  const url = SITE + "/anuncios/";
  const MESABR = MESCAP.slice(0, 3).toUpperCase();
  const waPr = waText(`Hola Vector, vengo del anuncio. Quiero reservar mi cupo en el taller de Meta Ads presencial del ${pr.dayLabel.toLowerCase()}.`);

  const outcomes = [
    "Crear tu portafolio comercial y tu cuenta publicitaria sin errores",
    "Lanzar una campaña que mande clientes directo a tu WhatsApp",
    "Elegir a quién le sale tu anuncio: edad, zona e intereses",
    "Decidir cuánto invertir y no gastar de más",
    "Hacer anuncios con imagen o video que detengan el scroll",
    "Leer los resultados y saber qué ajustar"
  ];

  const faq = [
    ["No sé nada de tecnología, ¿puedo tomar el taller?", "Sí. El taller está pensado para dueños de negocio que empiezan de cero. Vamos paso a paso, en grupos de máximo 10 personas, el instructor te acompaña en tu propia computadora y te llevas la grabación para repasar."],
    ["¿Cuánto tengo que invertir en anuncios después del taller?", "Tú decides. En el taller aprendes a empezar con presupuestos pequeños, medir los resultados y subir la inversión solo cuando ves que te llegan clientes. El costo por resultado depende de tu rubro y tu público, y aprendes a leerlo."],
    ["¿Necesito llevar laptop?", "Sí, lleva tu laptop con cargador; ahí mismo configuramos tu cuenta publicitaria. Un celular no es suficiente para trabajar en el Administrador de anuncios."],
    ["¿Qué pasa si no puedo asistir ese día?", "Las clases quedan grabadas y se entregan a los participantes, así que puedes repasar o ponerte al día. Además quedas en el grupo privado de WhatsApp del taller para resolver dudas."],
    [`¿Dónde es el taller?`, `En el aula de Vector Academy, el centro de capacitación de Estudio Vector en San Pedro Sula. Es un aula climatizada para grupos de máximo 10 personas; la ubicación exacta se comparte al confirmar la reserva.`],
    ["¿Cómo aparto mi cupo?", "Tocas el botón de Reservar y nos escribes por WhatsApp al 9569-1481. Te confirmamos disponibilidad y te enviamos los datos para el pago. Los cupos se asignan por orden de pago porque solo hay 10 por taller."],
    ["¿Me dan certificado?", "Sí, certificado oficial de Vector MKT, más la grabación del taller y el grupo privado de WhatsApp."],
    ["¿Quién da el taller?", "Edgardo A. López, fundador y Director Creativo de la agencia Estudio Vector, asesor publicitario de empresas en Honduras y capacitador de más de 500 alumnos. Fue el capacitador del Forum Ruta Copán 2026, organizado por la Cámara de Comercio e Industrias de Copán con el patrocinio de Banco de Occidente."]
  ];

  const body = `<header class="sitehead an-head">
  <div class="sh-row">
    <a class="brand" href="/" aria-label="Estudio Vector"><span class="logo-img logo-dark"></span><span class="brand-t"><b>Estudio Vector</b><small>Talleres de Meta Ads</small></span></a>
    <a class="btn an-hbtn wa-go" data-name="Encabezado" href="${waText("Hola Vector, vengo del anuncio. Quiero información del taller de Meta Ads.")}" target="_blank" rel="noopener">${ICON.wa}<span>Escríbenos</span></a>
  </div>
</header>
<main class="wrap anpage" id="contenido">
  <section class="an-hero">
    <span class="eyebrow">Taller de Meta Ads para dueños de negocio · ${MESYACAP}</span>
    <h1>Aprende a crear tus propios <span class="g">anuncios en Facebook e Instagram</span></h1>
    <p class="lead">Deja de depender de terceros o de “promocionar” publicaciones sin saber si funcionan. En un solo día sales con tu cuenta configurada y una campaña lista para que te escriban clientes a WhatsApp.</p>
    <div class="an-nets" aria-label="Plataformas del taller">
      <span class="an-net"><img src="/img/tools/facebook.svg" alt="Facebook" width="26" height="26" loading="lazy"></span>
      <span class="an-net"><img src="/img/tools/instagram.svg" alt="Instagram" width="26" height="26" loading="lazy"></span>
      <span class="an-net"><img src="/img/tools/meta.svg" alt="Meta Ads" width="26" height="26" loading="lazy"></span>
      <span class="an-net"><img src="/img/tools/whatsapp.svg" alt="WhatsApp" width="26" height="26" loading="lazy"></span>
    </div>
    <div class="an-trust">
      <span class="av"><img src="/img/edgardo-avatar.jpg" alt="Edgardo A. López" width="44" height="44"></span>
      <span>Con <b>Edgardo A. López</b>, capacitador de <b>+500 alumnos</b> y del <b>Forum Ruta Copán 2026</b></span>
    </div>
    <a class="an-scroll" href="#opciones">Ver fecha y cupos ${ICON.arrow}</a>
  </section>

  <section class="an-opts solo" id="opciones" aria-label="Fecha del taller">
    <article class="an-opt" id="presencial" data-key="presencial">
      <div class="an-opt-top" style="background:${pr.grad}">
        <img src="${pr.img}" alt="${pr.seoTitle}" width="960" height="640" loading="eager">
        <div class="wm logo-img"></div>
        <span class="an-badge">Presencial · Refrigerio incluido</span>
        <div class="an-date"><b>${pr.sched[0].date.slice(8)}</b><span>${MESABR}</span></div>
      </div>
      <div class="an-opt-body">
        <h3>Presencial<small>${pr.dayLabel}</small></h3>
        <ul class="an-facts">
          <li>${ICON.clock}<span>${pr.time} · ${pr.dur}</span></li>
          <li>${ICON.pin}<span>Aula Vector Academy, San Pedro Sula</span></li>
          <li>${ICON.check}<span>Acompañamiento en tu propia laptop</span></li>
          <li>${ICON.check}<span>Refrigerio incluido</span></li>
          <li>${ICON.check}<span>Certificado, grupo de WhatsApp y clases grabadas</span></li>
        </ul>
        <div class="an-count" data-start="${pr.sched[0].date}T${pr.sched[0].start}:00-06:00"><span>Empieza en</span><b data-u="d">–</b><i>días</i><b data-u="h">–</b><i>horas</i></div>
        <div class="an-price"><b>${fmt(pr.price)}</b><span>por persona · máximo 10 cupos</span></div>
        <a class="btn wa-go" data-name="${pr.title} (presencial)" data-value="${pr.price}" href="${waPr}" target="_blank" rel="noopener">${ICON.wa}Reservar mi cupo</a>
      </div>
    </article>
  </section>

  <section class="an-out" aria-labelledby="out-t">
    <h2 id="out-t" class="sectitle">Al terminar el taller vas a poder</h2>
    <ul class="an-grid">${outcomes.map((o, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span>${o}</li>`).join("")}</ul>
  </section>

  <section class="an-learn" aria-labelledby="learn-t">
    <h2 id="learn-t" class="sectitle">Lo que vamos a ver</h2>
    <ol class="path">${pr.learn.map(l => `<li><span>${l}</span></li>`).join("")}</ol>
  </section>

  <section class="an-inst" aria-labelledby="inst-t">
    <div class="an-inst-ph"><img src="/img/edgardo.jpg" alt="Edgardo A. López, instructor" width="640" height="640" loading="lazy"><div class="wm logo-img"></div></div>
    <div>
      <span class="eyebrow">Tu instructor</span>
      <h2 id="inst-t">Edgardo A. López</h2>
      <p>Fundador y Director Creativo de la agencia <b>Estudio Vector</b>. Maneja campañas de Meta Ads para empresas en Honduras, es asesor publicitario y capacita equipos de marketing empresarial. No enseña teoría: enseña lo que usa todos los días con clientes reales.</p>
      <div class="stats">
        <div class="stat"><b data-count="500" data-suffix="+">500+</b><span>alumnos capacitados</span></div>
        <div class="stat"><b data-count="20" data-suffix="+">20+</b><span>marcas a cargo de la agencia</span></div>
        <div class="stat"><b>IA</b><span>capacitador del Forum Ruta Copán 2026</span></div>
      </div>
    </div>
  </section>

  <section class="includes an-inc">
    <div class="wm logo-img"></div>
    <h3>Qué incluye tu cupo</h3>
    <div class="inc">
      <div>${ICON.check}Grabación del taller para repasar</div>
      <div>${ICON.check}Grupo privado de WhatsApp</div>
      <div>${ICON.check}Certificado oficial Vector MKT</div>
      <div>${ICON.check}Grupos de máximo 10 personas</div>
      <div>${ICON.check}Refrigerio durante el taller</div>
    </div>
  </section>

  ${faqHTML(faq, "Preguntas antes de reservar")}

  <section class="ctaband an-final">
    <div class="wm logo-img"></div>
    <div><h2>Aparta tu cupo hoy</h2><p>Solo 10 personas por taller. Te respondemos por WhatsApp al 9569-1481.</p></div>
    <div class="an-final-btns">
      <a class="btn light wa-go" data-name="${pr.title} (presencial)" data-value="${pr.price}" href="${waPr}" target="_blank" rel="noopener">Reservar · ${fmt(pr.price)}</a>
    </div>
  </section>
  <p class="an-more">¿Te interesan otros temas? Mira <a href="/talleres/">todos los talleres de ${MESNOM}</a> o nuestros <a href="/servicios/">servicios de marketing</a>.</p>
  ${siteFooter()}
</main>
<div class="cta-bar an-bar"><a class="btn wa-go" data-name="Barra inferior" href="#opciones">${ICON.wa}Reservar mi cupo</a></div>`;

  const graph = [ORG, PERSON, ...tallerLD(pr), faqLD(faq), crumbsLD([["Talleres", "/"], ["Taller de Meta Ads", "/anuncios/"]])];
  const html = head({
    title: "Aprende a Crear Anuncios en Facebook e Instagram | Taller de Meta Ads en Honduras",
    desc: `Taller práctico y presencial de Meta Ads para dueños de negocio en San Pedro Sula: ${pr.dayLabel}, ${pr.time}, ${fmt(pr.price)} con refrigerio incluido. Sales con tu campaña a WhatsApp lista. Solo 10 cupos.`,
    keywords: "aprender Meta Ads, curso de anuncios en Facebook, taller de publicidad en Instagram, cómo hacer anuncios para mi negocio, curso Meta Ads Honduras, San Pedro Sula",
    canonical: url, image: SITE + "/img/meta.jpg", ldGraph: graph
  }) + "\n" + body + `
<script src="/assets/js/render.js?v=${V}"></script>
<script src="/assets/js/site.js?v=${V}"></script>
<script src="/assets/js/anuncios.js?v=${V}"></script>
</body>
</html>
`;
  write("anuncios/index.html", html);
};
