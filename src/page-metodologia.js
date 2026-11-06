/* Curso gratuito: Metodología VECTOR de atención y ventas por WhatsApp · /metodologia-vector/
 * El curso corre en el navegador (assets/js/metodologia.js). Los registros y resultados se envían
 * al endpoint de config.json → academia.endpoint, que guarda en Supabase y avisa por correo. */
module.exports = function buildMetodologia(c) {
  const { head, ICON, esc, SITE, ORG, ORG_ID, PERSON_ID, faqLD, crumbsLD, faqHTML, siteHeader, siteFooter, write, V, waText, endpoint } = c;
  const EV = require("./evidencia-vector.json");
  const slug = "metodologia-vector";
  const url = `${SITE}/${slug}/`;
  const pdf = `/${slug}/metodologia-vector.pdf`;
  const waCap = waText("Hola Vector Academy, quiero capacitar a mi equipo de ventas con la Metodología VECTOR.");

  const LETRAS = [
    ["V", "Vincular", "Saludar con su nombre y el del negocio, y reconocer la pregunta del cliente."],
    ["E", "Explorar", "Preguntar qué necesita resolver, una pregunta por mensaje."],
    ["C", "Conocer", "Nombre, ciudad y el impacto: para cuándo y por qué ahora."],
    ["T", "Transparentar", "Dar la solución con precio y forma de pago, en contexto."],
    ["O", "Ofrecer", "Cerrar con dos opciones concretas, nunca con \"me avisa\"."],
    ["R", "Retener", "Guardar, etiquetar, dar seguimiento y publicar historias."]
  ];
  const FAQ = [
    ["¿Qué es la Metodología VECTOR?", "Es el método de Vector Marketing &amp; Academy para atender y vender por WhatsApp y redes sociales. Tiene seis pasos: Vincular, Explorar, Conocer, Transparentar, Ofrecer y Retener. Su idea central es entender la necesidad del cliente antes de hablar de precio, sin esconder el precio."],
    ["¿Cuánto cuesta el curso en línea?", "El curso en línea es gratuito. Dura unos 12 minutos, incluye un examen de 13 casos, varios de ellos escritos para su tipo de negocio en particular, y un certificado en Atención al Cliente, Método VECTOR, en alta resolución para imprimir y enmarcar. Para empezar solo se piden tres datos: su nombre, su empresa y el tipo de negocio."],
    ["¿Para quién es?", "Para vendedores, recepcionistas, community managers y cualquier persona que atienda mensajes de clientes en clínicas, tiendas, restaurantes, ferreterías, talleres, servicios profesionales y cualquier otro negocio. El curso adapta los ejemplos al tipo de negocio que usted elige."],
    ["¿Pueden capacitar a todo mi equipo de ventas?", `Sí. Vector Academy imparte la Metodología VECTOR en capacitaciones presenciales en San Pedro Sula, en su empresa en cualquier ciudad de Honduras o en línea, con práctica de casos reales de su negocio. Escríbanos por <a href="${waCap}" target="_blank" rel="noopener">WhatsApp al 9569-1481</a>.`],
    ["¿En qué estudios se basa?", "Cada consejo está respaldado por investigación publicada: velocidad de respuesta (Harvard Business Review), preguntas de seguimiento (Journal of Personality and Social Psychology), venta consultiva (SPIN Selling), uso del nombre (Journal of Consumer Research), precio primero (Journal of Marketing Research), tiempo frente a dinero (Journal of Consumer Research), planes concretos (metaanálisis de 94 pruebas), recordatorios (revisión Cochrane) y mera exposición (Psychological Bulletin), entre otros. En la sección <a href=\"#respaldo\">Respaldo científico</a> cada consejo muestra el hallazgo, cómo se aplica, su límite y la cita completa. Donde un consejo es una práctica de Vector sin estudio directo, se indica."]
  ];
  const LET = { V: "Vincular", E: "Explorar", C: "Conocer", T: "Transparentar", O: "Ofrecer", R: "Retener" };
  const evCard = it => {
    const [nn, nd] = EV.niveles[it.nivel];
    return `<details class="mv-ev" id="ev-${it.id}" data-l="${it.l}">
        <summary><b class="mv-evl">${it.l}</b><span class="mv-evc">${esc(it.consejo)}</span><span class="mv-lvl lv-${it.nivel}">${nn}</span></summary>
        <div class="mv-evb">
          <div class="mv-evr"><h4>Qué encontró la investigación</h4><p>${esc(it.hallazgo)}</p></div>
          <div class="mv-evr"><h4>Cómo se aplica en el chat</h4><p>${esc(it.aplica)}</p></div>
          <div class="mv-evr lim"><h4>Límite que debe conocer</h4><p>${esc(it.limite)}</p></div>
          ${it.citas.length ? `<div class="mv-evr cite"><h4>Cómo citarlo</h4>${it.citas.map(([c, u]) => `<p>${esc(c)} <a href="${u}" target="_blank" rel="noopener">Ver fuente</a></p>`).join("")}</div>` : ""}
          <p class="mv-evn"><span class="mv-lvl lv-${it.nivel}">${nn}</span> ${nd} <a href="#curso">Volver al curso ↑</a></p>
        </div>
      </details>`;
  };
  const BIBLIO = [...new Map(EV.items.flatMap(it => it.citas.map(([c, u]) => [c, [c, u, it.l]]))).values()].sort((a, b) => a[0].localeCompare(b[0], "es"));

  const graph = [ORG,
    { "@type": "Course", "@id": url + "#curso", name: "Metodología VECTOR: atención y ventas por WhatsApp", description: "Curso en línea gratuito de Vector Marketing & Academy para vendedores: seis pasos para atender y cerrar ventas por WhatsApp entendiendo la necesidad del cliente antes del precio.", url, inLanguage: "es", provider: { "@id": ORG_ID }, isAccessibleForFree: true, educationalLevel: "Principiante", timeRequired: "PT10M", teaches: LETRAS.map(l => l[0] + " · " + l[1] + ": " + l[2]), hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT10M", instructor: { "@id": PERSON_ID } }, offers: { "@type": "Offer", price: "0", priceCurrency: "HNL", category: "Free", availability: "https://schema.org/InStock" } },
    faqLD(FAQ), crumbsLD([["Inicio", "/"], ["Metodología VECTOR", `/${slug}/`]])
  ];

  const body = `${siteHeader("metodologia")}
<main class="mvpage" id="contenido">
  <section class="mv-hero">
    <div class="mv-hero-in">
      <div class="mv-hero-tx">
        <span class="eyebrow">Vector Marketing &amp; Academy · Curso gratuito</span>
        <h1>Bienvenido a la <span class="g">Metodología VECTOR</span></h1>
        <p class="lead">El protocolo de atención y ventas por WhatsApp para personas que atienden clientes. Hágalo usted solo, o lance el reto a todo su equipo. Aprenda en menos de 10 minutos a llevar a un cliente desde el primer "¿cuánto cuesta?" hasta la venta cerrada, con ejemplos de su tipo de negocio. Empieza con tres datos, sin formularios largos. Usted escribe cada respuesta, el cliente se enfría o se calienta según lo que conteste, y al final se lleva un certificado listo para imprimir.</p>
        <p class="mv-contador" id="mvContador" hidden></p>
        <div class="mv-facts"><div><b>6</b><span>letras</span></div><div><b>3</b><span>clientes difíciles</span></div><div><b>8</b><span>insignias</span></div><div><b>1</b><span>certificado imprimible</span></div></div>
        <div class="mv-cta">
          <a class="btn" href="#curso">${ICON.arrow}Empezar el curso gratis</a>
          <a class="btn light" href="${pdf}" download>${ICON.pdf}Descargar la metodología</a>
        </div>
        <p class="mv-jefe"><a href="#equipo">¿Es dueño o jefe? Lance el <b>reto empresarial</b> a todo su equipo →</a></p>
        <div class="shareline"><button class="sharebtn" type="button" data-share data-title="Metodología VECTOR · Vector Academy" data-text="Curso gratuito de atención y ventas por WhatsApp para vendedores. Dura menos de 10 minutos.">${ICON.share}<span>Compartir con mi equipo</span></button></div>
      </div>
      <div class="mv-word" aria-hidden="true">${LETRAS.map(([l, n], i) => `<div class="mv-wl" style="--i:${i}"><b>${l}</b><small>${n}</small></div>`).join("")}</div>
    </div>
  </section>

  <div class="wrap mv-wrap">
    <section id="curso" class="mv-course" aria-label="Curso Metodología VECTOR">
      <div class="mv-player" id="mvPlayer" data-endpoint="${esc(endpoint)}">
        <div class="mv-top" id="mvTop">
          <div class="mv-barrow">
            <a class="mv-home" href="/">← <span class="lg">Inicio del sitio</span><span class="sm">Inicio</span></a>
            <span class="mv-step" id="mvStep">Paso 1</span>
            <button class="mv-snd" type="button" id="mvSnd" aria-pressed="true" title="Sonido del curso">🔊</button>
            <button class="mv-exit" type="button" id="mvExit" hidden title="Borrar el avance y registrar a otra persona"><span class="lg">Registrar a otra persona</span><span class="sm">Otra persona</span></button>
          </div>
          <div class="mv-bar"><i id="mvBar"></i></div>
          <div class="mv-toprow">
            <div class="mv-letters" id="mvLetters">${LETRAS.map(([l]) => `<span data-l="${l}">${l}</span>`).join("")}</div>
            <div class="mv-stats">
              <span class="mv-temp" id="mvTemp" title="Temperatura del cliente"><i></i><b>Frío</b></span>
              <span class="mv-pill med" id="mvBadges">🏅 0</span>
              <span class="mv-pill xp" id="mvXp">0 XP</span>
            </div>
          </div>
        </div>
        <div class="mv-screen" id="mvScreen" aria-live="polite"><noscript><p>Active JavaScript para tomar el curso, o descargue la metodología en PDF.</p></noscript></div>
      </div>
      <canvas id="mvConfetti" aria-hidden="true"></canvas>
      <div class="mv-toast" id="mvToast" role="status" hidden></div>
    </section>

    <section class="mv-sec" aria-labelledby="mv-que">
      <span class="eyebrow">El método</span>
      <h2 id="mv-que" class="sectitle">Seis pasos para vender sin presionar</h2>
      <p class="mv-lead">La mayoría de vendedores responde "¿cuánto cuesta?" con un número, y el cliente se va a comparar. Con VECTOR, el precio se da con contexto: primero se entiende qué necesita la persona, luego se ofrece la solución y se cierra con una cita o pedido concreto.</p>
      <div class="mv-grid6">${LETRAS.map(([l, n, d]) => `<article class="mv-card"><b class="mv-cl">${l}</b><h3>${n}</h3><p>${d}</p></article>`).join("")}</div>
    </section>

    <section class="mv-sec eqcrear" id="equipo" aria-labelledby="eq-t">
      <span class="eyebrow">Para dueños y jefes</span>
      <h2 id="eq-t" class="sectitle">Reto empresarial: ponga a competir a su equipo</h2>
      <p class="mv-lead">El mismo curso, pero su gente compite entre sí en una tabla de posiciones. Cree el reto de su empresa, reparta un enlace y reciba en su correo el resultado de cada quien. Es gratis y no necesita cuenta.</p>
      <div class="eq-pasos">
        <div><b>1</b><span>Cree el reto con el nombre de su empresa y su correo</span></div>
        <div><b>2</b><span>Reparta el enlace por WhatsApp a su gente</span></div>
        <div><b>3</b><span>Cada quien escribe su nombre y compite</span></div>
        <div><b>4</b><span>Usted ve el tablero y quién va ganando</span></div>
      </div>
      <form class="mv-form eqform" id="eqForm" novalidate>
        <div class="mv-f"><label for="e-empresa">Nombre de su empresa <i>*</i></label><input id="e-empresa" autocomplete="organization" maxlength="100" placeholder="Ej. Comercial Los Pinos"></div>
        <div class="mv-f"><label for="e-rubro">Tipo de negocio <i>*</i></label><select id="e-rubro"><option value="">Seleccione…</option></select></div>
        <div class="mv-f full" id="e-otro" hidden><label for="e-prod">¿Qué producto o servicio les preguntan más?</label><input id="e-prod" maxlength="50" placeholder="Ej. el plan de internet"></div>
        <div class="mv-f"><label for="e-nombre">Su nombre <i>*</i></label><input id="e-nombre" autocomplete="name" maxlength="80" placeholder="Ej. Edgardo López"></div>
        <div class="mv-f"><label for="e-correo">Su correo <small>(ahí llegan los resultados)</small> <i>*</i></label><input id="e-correo" type="email" autocomplete="email" inputmode="email" maxlength="120" placeholder="nombre@empresa.com"></div>
        <div class="mv-f full"><label for="e-tel">Su WhatsApp <small>(opcional)</small></label><input id="e-tel" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" placeholder="Ej. 9876-5432"></div>
        <p class="mv-err" id="eqErr" hidden></p>
        <button class="btn" type="submit" id="eqGo">Crear el reto de mi empresa →</button>
      </form>
      <div id="eqListo" hidden></div>
      <p class="mv-note">No se publica nada ni se cobra. Sus empleados solo escriben su nombre; el tipo de negocio y los ejemplos ya vienen de su empresa, y al terminar cada quien ve en qué lugar quedó.</p>
    </section>

    <section class="ctaband">
      <div class="wm logo-img"></div>
      <div><h2>Capacite a todo su equipo de ventas</h2><p>Llevamos la Metodología VECTOR a su empresa: presencial en Vector Academy (San Pedro Sula), en sus instalaciones en cualquier ciudad de Honduras o en línea, con práctica de casos reales de su negocio.</p></div>
      <a class="btn light" href="${waCap}" target="_blank" rel="noopener">${ICON.wa}Cotizar capacitación</a>
    </section>

    <section class="mv-sec" id="respaldo" aria-labelledby="mv-src">
      <span class="eyebrow">Respaldo científico</span>
      <h2 id="mv-src" class="sectitle">Cada consejo, con su estudio</h2>
      <p class="mv-lead">Si alguien le pregunta en qué se basa un consejo de la Metodología VECTOR, aquí está la respuesta: qué encontró la investigación, cómo se aplica en el chat, qué límite tiene y la cita completa para mencionarla. Donde no existe un estudio directo, lo decimos.</p>
      <div class="mv-legend">${Object.entries(EV.niveles).map(([k, [n, d]]) => `<div><span class="mv-lvl lv-${k}">${n}</span><small>${d}</small></div>`).join("")}</div>
      <div class="mv-filter" role="group" aria-label="Filtrar por letra"><button type="button" data-f="" aria-pressed="true">Todas</button>${Object.entries(LET).map(([l, n]) => `<button type="button" data-f="${l}" aria-pressed="false"><b>${l}</b> ${n}</button>`).join("")}</div>
      <div class="mv-evs">${EV.items.map(evCard).join("")}</div>
      <details class="mv-biblio"><summary>Bibliografía completa (${BIBLIO.length} referencias)</summary><ol>${BIBLIO.map(([c, u, l]) => `<li>${esc(c)} <a href="${u}" target="_blank" rel="noopener">Ver fuente</a></li>`).join("")}</ol></details>
    </section>

    ${faqHTML(FAQ, "Preguntas sobre la Metodología VECTOR")}
    ${siteFooter()}
  </div>
</main>`;

  const html = head({
    title: "Metodología VECTOR: curso gratuito de atención y ventas por WhatsApp | Vector Academy",
    desc: "Curso en línea gratuito para vendedores: aprenda en menos de 10 minutos a atender y cerrar ventas por WhatsApp con la Metodología VECTOR de Vector Marketing & Academy. Incluye examen, certificado y PDF descargable.",
    keywords: "curso de ventas por WhatsApp, atención al cliente WhatsApp, capacitación de vendedores Honduras, metodología de ventas, cómo responder cuánto cuesta, capacitación equipo de ventas San Pedro Sula, Vector Academy",
    canonical: url, ldGraph: graph
  }).replace(`<link rel="stylesheet" href="/assets/css/site.css?v=${V}">`, `<link rel="stylesheet" href="/assets/css/site.css?v=${V}">\n<link rel="stylesheet" href="/assets/css/metodologia.css?v=${V}">`)
    + "\n" + body + `
<script src="/assets/js/render.js?v=${V}"></script>
<script src="/assets/js/site.js?v=${V}"></script>
<script src="/assets/js/metodologia.js?v=${V}"></script>
</body>
</html>
`;
  write(`${slug}/index.html`, html);
};
