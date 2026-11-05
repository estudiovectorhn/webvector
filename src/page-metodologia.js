/* Curso gratuito: Metodología VECTOR de atención y ventas por WhatsApp · /metodologia-vector/
 * El curso corre en el navegador (assets/js/metodologia.js). Los registros y resultados se envían
 * al endpoint de config.json → academia.endpoint, que guarda en Supabase y avisa por correo. */
module.exports = function buildMetodologia(c) {
  const { head, ICON, esc, SITE, ORG, ORG_ID, PERSON_ID, faqLD, crumbsLD, faqHTML, siteHeader, siteFooter, write, V, waText, endpoint } = c;
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
    ["¿Cuánto cuesta el curso en línea?", "El curso en línea es gratuito. Dura entre 5 y 10 minutos, incluye un examen y un certificado digital de aprobación de Vector Academy."],
    ["¿Para quién es?", "Para vendedores, recepcionistas, community managers y cualquier persona que atienda mensajes de clientes en clínicas, tiendas, restaurantes, ferreterías, talleres, servicios profesionales y cualquier otro negocio. El curso adapta los ejemplos al tipo de negocio que usted elige."],
    ["¿Pueden capacitar a todo mi equipo de ventas?", `Sí. Vector Academy imparte la Metodología VECTOR en capacitaciones presenciales en San Pedro Sula, en su empresa en cualquier ciudad de Honduras o en línea, con práctica de casos reales de su negocio. Escríbanos por <a href="${waCap}" target="_blank" rel="noopener">WhatsApp al 9569-1481</a>.`],
    ["¿En qué estudios se basa?", "En investigación sobre velocidad de respuesta (Harvard Business Review), venta consultiva (SPIN Selling de Neil Rackham), efecto del precio primero (Karmarkar, Shiv y Knutson), tiempo frente a dinero (Mogilner y Aaker), exceso de opciones (Iyengar y Lepper), intenciones de implementación (Gollwitzer y Sheeran), mera exposición (Zajonc) y recordatorios por mensaje (Cochrane). Las fuentes completas están en esta página y en el PDF."]
  ];
  const FUENTES = [
    ["V", "Oldroyd, McElheran y Elkington (2011). The Short Life of Online Sales Leads. Harvard Business Review.", "https://scholarsarchive.byu.edu/facpub/9711"],
    ["V", "Revisión sobre empatía en la relación profesional-paciente (2014). PubMed 25265748.", "https://pubmed.ncbi.nlm.nih.gov/25265748/"],
    ["E · C", "Rackham, N. (1988). SPIN Selling. McGraw-Hill.", "https://www.schweitzer-online.de/en/buch/Rackham/SPIN-R-Selling/9780566076893/A2525143/"],
    ["E", "Gong Labs. Análisis de preguntas en llamadas de descubrimiento.", "https://www.gong.io/blog/deal-closing-discovery-call/"],
    ["C", "Carmody y Lewis (2006). Brain activation when hearing one's own and others' names. Brain Research.", "https://pmc.ncbi.nlm.nih.gov/articles/PMC1647299/"],
    ["T", "Karmarkar, Shiv y Knutson (2015). Cost Conscious? The Neural and Behavioral Impact of Price Primacy. Journal of Marketing Research.", "https://hbswk.hbs.edu/item/how-our-brain-determines-if-the-product-is-worth-the-price"],
    ["T", "Mogilner y Aaker (2009). The Time vs. Money Effect. Journal of Consumer Research.", "https://www.gsb.stanford.edu/insights/jennifer-aaker-happiness-time-connection"],
    ["O", "Iyengar y Lepper (2000). When Choice is Demotivating. Journal of Personality and Social Psychology.", "https://www.psychologicalscience.org/observer/being-choosy-about-choosing"],
    ["O", "Gollwitzer y Sheeran (2006). Implementation intentions and goal achievement: a meta-analysis.", "https://cancercontrol.cancer.gov/brp/research/constructs/implementation-intentions"],
    ["R", "Zajonc (1968); Bornstein (1989); Montoya y col. (2017). Efecto de mera exposición.", "https://www.simplypsychology.org/mere-exposure-effect.html"],
    ["R", "Gurol-Urganci y col. (2013). Mobile phone messaging reminders for attendance at healthcare appointments. Cochrane.", "https://pubmed.ncbi.nlm.nih.gov/24310741/"]
  ];

  const graph = [ORG,
    { "@type": "Course", "@id": url + "#curso", name: "Metodología VECTOR: atención y ventas por WhatsApp", description: "Curso en línea gratuito de Vector Marketing & Academy para vendedores: seis pasos para atender y cerrar ventas por WhatsApp entendiendo la necesidad del cliente antes del precio.", url, inLanguage: "es", provider: { "@id": ORG_ID }, isAccessibleForFree: true, educationalLevel: "Principiante", timeRequired: "PT10M", teaches: LETRAS.map(l => l[0] + " · " + l[1] + ": " + l[2]), hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT10M", instructor: { "@id": PERSON_ID } }, offers: { "@type": "Offer", price: "0", priceCurrency: "HNL", category: "Free", availability: "https://schema.org/InStock" } },
    faqLD(FAQ), crumbsLD([["Inicio", "/"], ["Metodología VECTOR", `/${slug}/`]])
  ];

  const body = `${siteHeader("")}
<main class="mvpage" id="contenido">
  <section class="mv-hero">
    <div class="mv-hero-in">
      <div class="mv-hero-tx">
        <span class="eyebrow">Vector Marketing &amp; Academy · Curso gratuito</span>
        <h1>Bienvenido a la <span class="g">Metodología VECTOR</span></h1>
        <p class="lead">El protocolo de atención y ventas por WhatsApp para personas que atienden clientes. Aprenda en menos de 10 minutos a llevar a un cliente desde el primer "¿cuánto cuesta?" hasta la venta cerrada, con ejemplos de su tipo de negocio.</p>
        <div class="mv-facts"><div><b>8</b><span>minutos</span></div><div><b>6</b><span>pasos</span></div><div><b>12</b><span>preguntas</span></div><div><b>1</b><span>certificado</span></div></div>
        <div class="mv-cta">
          <a class="btn" href="#curso">${ICON.arrow}Empezar el curso gratis</a>
          <a class="btn light" href="${pdf}" download>${ICON.pdf}Descargar la metodología</a>
        </div>
        <div class="shareline"><button class="sharebtn" type="button" data-share data-title="Metodología VECTOR · Vector Academy" data-text="Curso gratuito de atención y ventas por WhatsApp para vendedores. Dura menos de 10 minutos.">${ICON.share}<span>Compartir con mi equipo</span></button></div>
      </div>
      <div class="mv-word" aria-hidden="true">${LETRAS.map(([l, n], i) => `<div class="mv-wl" style="--i:${i}"><b>${l}</b><small>${n}</small></div>`).join("")}</div>
    </div>
  </section>

  <div class="wrap mv-wrap">
    <section id="curso" class="mv-course" aria-label="Curso Metodología VECTOR">
      <div class="mv-player" id="mvPlayer" data-endpoint="${esc(endpoint)}">
        <div class="mv-top" id="mvTop" hidden>
          <div class="mv-bar"><i id="mvBar"></i></div>
          <div class="mv-toprow">
            <div class="mv-letters" id="mvLetters">${LETRAS.map(([l]) => `<span data-l="${l}">${l}</span>`).join("")}</div>
            <div class="mv-stats"><span class="mv-pill" id="mvPct">0%</span><span class="mv-pill xp" id="mvXp">0 XP</span></div>
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

    <section class="ctaband">
      <div class="wm logo-img"></div>
      <div><h2>Capacite a todo su equipo de ventas</h2><p>Llevamos la Metodología VECTOR a su empresa: presencial en Vector Academy (San Pedro Sula), en sus instalaciones en cualquier ciudad de Honduras o en línea, con práctica de casos reales de su negocio.</p></div>
      <a class="btn light" href="${waCap}" target="_blank" rel="noopener">${ICON.wa}Cotizar capacitación</a>
    </section>

    <section class="mv-sec" aria-labelledby="mv-src">
      <span class="eyebrow">Respaldo</span>
      <h2 id="mv-src" class="sectitle">Estudios que respaldan cada letra</h2>
      <ol class="mv-src">${FUENTES.map(([l, t, u]) => `<li><b>${l}</b><span>${esc(t)} <a href="${u}" target="_blank" rel="noopener">Ver fuente</a></span></li>`).join("")}</ol>
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
