/* Página de campaña: /anuncios/  (tráfico de Meta Ads "aprende a hacer tus anuncios") */
module.exports = function buildAnuncios(c) {
  const { head, ICON, fmt, T, SITE, ORG, PERSON, tallerLD, faqLD, crumbsLD, faqHTML, siteFooter, write, V, waText, ART } = c;
  const on = T.find(t => t.id === "anuncios");
  const pr = T.find(t => t.id === "meta");
  const url = SITE + "/anuncios/";

  const opt = (t, key, badge, bullets) => `
    <article class="an-opt" id="${key}" data-key="${key}">
      <div class="an-opt-top" style="background:${t.grad}">
        <img src="${t.img}" alt="${t.seoTitle}" width="960" height="640" loading="eager">
        <div class="wm logo-img"></div>
        <span class="an-badge">${badge}</span>
        <div class="an-date"><b>${t.sched[0].date.slice(8)}</b><span>OCT</span></div>
      </div>
      <div class="an-opt-body">
        <h3>${key === "online" ? "Online en vivo" : "Presencial"}<small>${t.dayLabel}</small></h3>
        <ul class="an-facts">
          <li>${ICON.clock}<span>${t.time} · ${t.dur}</span></li>
          <li>${key === "online" ? ICON.zoom : ICON.pin}<span>${key === "online" ? "En vivo por Zoom, desde cualquier parte de Honduras" : "Aula Estudio Vector, San Pedro Sula"}</span></li>
          ${bullets.map(b => `<li>${ICON.check}<span>${b}</span></li>`).join("")}
        </ul>
        <div class="an-count" data-start="${t.sched[0].date}T${t.sched[0].start}:00-06:00"><span>Empieza en</span><b data-u="d">–</b><i>días</i><b data-u="h">–</b><i>horas</i></div>
        <div class="an-price"><b>${fmt(t.price)}</b><span>por persona · máximo 10 cupos</span></div>
        <a class="btn wa-go" data-name="${t.title} (${key})" data-value="${t.price}" href="${waText(`Hola Vector, vengo del anuncio. Quiero reservar mi cupo en el taller de Meta Ads ${key === "online" ? "ONLINE del sábado 3" : "PRESENCIAL del domingo 11"} de octubre.`)}" target="_blank" rel="noopener">${ICON.wa}Reservar ${key === "online" ? "online" : "presencial"}</a>
      </div>
    </article>`;

  const outcomes = [
    "Crear tu portafolio comercial y tu cuenta publicitaria sin errores",
    "Lanzar una campaña que mande clientes directo a tu WhatsApp",
    "Elegir a quién le sale tu anuncio: edad, zona e intereses",
    "Decidir cuánto invertir y no gastar de más",
    "Hacer anuncios con imagen o video que detengan el scroll",
    "Leer los resultados y saber qué ajustar"
  ];

  const quiz = [
    { q: "¿Alguna vez has pagado anuncios en Facebook o Instagram?", a: [["Nunca, empiezo de cero", "p"], ["Sí, con el botón de Promocionar", "o"], ["Sí, en el Administrador de anuncios", "o"]] },
    { q: "¿Cómo aprendes mejor?", a: [["Con alguien a la par que me guíe", "p"], ["Desde mi casa u oficina", "o"], ["Me da igual", ""]] },
    { q: "¿Dónde estás?", a: [["En San Pedro Sula o cerca", "p"], ["En otra ciudad de Honduras", "o"], ["Fuera de Honduras", "o"]] }
  ];

  const faq = [
    ["No sé nada de tecnología, ¿puedo tomar el taller?", "Sí. El taller está pensado para dueños de negocio que empiezan de cero. Vamos paso a paso, en grupos de máximo 10 personas, y te llevas la grabación para repasar. Si te preocupa, el presencial es ideal porque el instructor te acompaña en tu propia computadora."],
    ["¿Cuánto tengo que invertir en anuncios después del taller?", "Tú decides. En el taller aprendes a empezar con presupuestos pequeños, medir los resultados y subir la inversión solo cuando ves que te llegan clientes. El costo por resultado depende de tu rubro y tu público, y aprendes a leerlo."],
    ["¿Necesito llevar laptop?", "Sí, para el presencial lleva tu laptop con cargador; ahí configuramos tu cuenta. Para el online necesitas computadora e internet estable para conectarte a Zoom. Un celular no es suficiente para trabajar en el Administrador de anuncios."],
    ["¿Qué pasa si no puedo asistir ese día?", "Todas las clases quedan grabadas y se entregan a los participantes, así que puedes repasar o ponerte al día. Además quedas en el grupo privado de WhatsApp del taller para resolver dudas."],
    ["¿Qué diferencia hay entre el online y el presencial?", `El online es por Zoom, el sábado 3 de octubre de 1:00 a 6:00 p.m., por ${fmt(on.price)}. El presencial es en San Pedro Sula, el domingo 11 de octubre de 10:00 a.m. a 3:00 p.m., por ${fmt(pr.price)} e incluye refrigerio. En el presencial el instructor revisa tu cuenta en persona; en el online aprendes desde donde estés.`],
    ["¿Cómo aparto mi cupo?", "Tocas el botón de Reservar y nos escribes por WhatsApp al 9569-1481. Te confirmamos disponibilidad y te enviamos los datos para el pago. Los cupos se asignan por orden de pago porque solo hay 10 por taller."],
    ["¿Me dan certificado?", "Sí, certificado oficial de Vector MKT, más la grabación del taller y el grupo privado de WhatsApp."],
    ["¿Quién da el taller?", "Edgardo A. López, fundador y Director Creativo de la agencia Estudio Vector, asesor publicitario de empresas en Honduras y capacitador de más de 500 alumnos. Fue el capacitador del Forum Ruta Copán 2026, organizado por la Cámara de Comercio e Industrias de Copán con el patrocinio de Banco de Occidente."]
  ];

  const learn = [...new Set([...pr.learn, ...on.learn.slice(3, 5)])];

  const body = `<header class="sitehead an-head">
  <div class="sh-row">
    <a class="brand" href="/" aria-label="Estudio Vector"><span class="logo-img logo-dark"></span><span class="brand-t"><b>Estudio Vector</b><small>Talleres de Meta Ads</small></span></a>
    <a class="btn an-hbtn wa-go" data-name="Encabezado" href="${waText("Hola Vector, vengo del anuncio. Quiero información del taller de Meta Ads.")}" target="_blank" rel="noopener">${ICON.wa}<span>Escríbenos</span></a>
  </div>
</header>
<main class="wrap anpage" id="contenido">
  <section class="an-hero">
    <span class="eyebrow">Taller de Meta Ads para dueños de negocio · Octubre 2026</span>
    <h1>Aprende a crear tus propios <span class="g">anuncios en Facebook e Instagram</span></h1>
    <p class="lead">Deja de depender de terceros o de “promocionar” publicaciones sin saber si funcionan. En un día sales con tu cuenta configurada y una campaña lista para que te escriban clientes a WhatsApp.</p>
    <div class="an-trust">
      <span class="av"><img src="/img/edgardo-avatar.jpg" alt="Edgardo A. López" width="44" height="44"></span>
      <span>Con <b>Edgardo A. López</b>, capacitador de <b>+500 alumnos</b> y del <b>Forum Ruta Copán 2026</b></span>
    </div>
    <a class="an-scroll" href="#opciones">Elige tu modalidad ${ICON.arrow}</a>
  </section>

  <section class="an-opts" id="opciones" aria-label="Modalidades">
    ${opt(on, "online", "Online · Zoom", ["Haces tus preguntas en vivo", "Sin moverte de tu casa u oficina"])}
    ${opt(pr, "presencial", "Presencial · Refrigerio", ["Acompañamiento en tu propia laptop", "Refrigerio incluido"])}
  </section>

  <section class="an-quiz" id="test" aria-labelledby="quiz-t">
    <div class="q-head">
      <span class="eyebrow">Test de 30 segundos</span>
      <h2 id="quiz-t">¿Cuál taller es para ti?</h2>
      <p>Responde 3 preguntas y te recomendamos la modalidad que más te conviene.</p>
    </div>
    <div class="q-card">
      <div class="q-prog"><i id="qbar"></i></div>
      <div id="qbox">
        ${quiz.map((x, i) => `<fieldset class="q-step" data-i="${i}"${i ? " hidden" : ""}><legend><small>Pregunta ${i + 1} de ${quiz.length}</small>${x.q}</legend>${x.a.map(([t, v], j) => `<button type="button" class="q-opt" data-v="${v}" id="q${i}-${j}">${t}</button>`).join("")}</fieldset>`).join("")}
        <div class="q-res" id="qres" hidden></div>
      </div>
    </div>
  </section>

  <section class="an-out" aria-labelledby="out-t">
    <h2 id="out-t" class="sectitle">Al terminar el taller vas a poder</h2>
    <ul class="an-grid">${outcomes.map((o, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span>${o}</li>`).join("")}</ul>
  </section>

  <section class="an-cmp" aria-labelledby="cmp-t">
    <h2 id="cmp-t" class="sectitle">Online o presencial</h2>
    <div class="cmp-wrap"><table class="cmp">
      <thead><tr><th></th><th>Online</th><th>Presencial</th></tr></thead>
      <tbody>
        <tr><th>Fecha</th><td>Sáb 3 de octubre</td><td>Dom 11 de octubre</td></tr>
        <tr><th>Horario</th><td>1:00 a 6:00 p.m.</td><td>10:00 a.m. a 3:00 p.m.</td></tr>
        <tr><th>Lugar</th><td>Zoom, en vivo</td><td>San Pedro Sula</td></tr>
        <tr><th>Acompañamiento en tu cuenta</th><td>Por pantalla</td><td>En persona</td></tr>
        <tr><th>Refrigerio</th><td>—</td><td>Incluido</td></tr>
        <tr><th>Grabación, grupo de WhatsApp y certificado</th><td>Sí</td><td>Sí</td></tr>
        <tr><th>Inversión</th><td><b>${fmt(on.price)}</b></td><td><b>${fmt(pr.price)}</b></td></tr>
      </tbody>
    </table></div>
  </section>

  <section class="an-learn" aria-labelledby="learn-t">
    <h2 id="learn-t" class="sectitle">Lo que vamos a ver</h2>
    <ol class="path">${learn.map(l => `<li><span>${l}</span></li>`).join("")}</ol>
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
    <h3>Incluido en las dos modalidades</h3>
    <div class="inc">
      <div>${ICON.check}Grabación del taller para repasar</div>
      <div>${ICON.check}Grupo privado de WhatsApp</div>
      <div>${ICON.check}Certificado oficial Vector MKT</div>
      <div>${ICON.check}Grupos de máximo 10 personas</div>
    </div>
  </section>

  ${faqHTML(faq, "Preguntas antes de reservar")}

  <section class="ctaband an-final">
    <div class="wm logo-img"></div>
    <div><h2>Aparta tu cupo hoy</h2><p>Solo 10 personas por taller. Te respondemos por WhatsApp al 9569-1481.</p></div>
    <div class="an-final-btns">
      <a class="btn light wa-go" data-name="${on.title} (online)" data-value="${on.price}" href="${waText("Hola Vector, vengo del anuncio. Quiero reservar mi cupo en el taller de Meta Ads ONLINE del sábado 3 de octubre.")}" target="_blank" rel="noopener">Online · ${fmt(on.price)}</a>
      <a class="btn light wa-go" data-name="${pr.title} (presencial)" data-value="${pr.price}" href="${waText("Hola Vector, vengo del anuncio. Quiero reservar mi cupo en el taller de Meta Ads PRESENCIAL del domingo 11 de octubre.")}" target="_blank" rel="noopener">Presencial · ${fmt(pr.price)}</a>
    </div>
  </section>
  <p class="an-more">¿Te interesan otros temas? Mira <a href="/talleres/">todos los talleres de octubre</a> o nuestros <a href="/servicios/">servicios de marketing</a>.</p>
  ${siteFooter()}
</main>
<div class="cta-bar an-bar"><a class="btn wa-go" data-name="Barra inferior" href="#opciones">${ICON.wa}Reservar mi cupo</a></div>`;

  const graph = [ORG, PERSON, ...tallerLD(on), ...tallerLD(pr), faqLD(faq), crumbsLD([["Talleres", "/"], ["Taller de Meta Ads", "/anuncios/"]])];
  const html = head({
    title: "Aprende a Crear Anuncios en Facebook e Instagram | Taller de Meta Ads en Honduras",
    desc: "Taller práctico de Meta Ads para dueños de negocio: online por Zoom (sáb 3 oct, L 1,500) o presencial en San Pedro Sula (dom 11 oct, L 1,900). Sales con tu campaña a WhatsApp lista. Solo 10 cupos.",
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
