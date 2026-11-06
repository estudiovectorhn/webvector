/* Tablero privado del jefe: /metodologia-vector/equipo/?t=TOKEN
 * No se indexa ni se enlaza desde el sitio: el enlace llega por correo al crear el equipo. */
module.exports = function buildEquipo(c) {
  const { head, ICON, SITE, ORG, siteHeader, siteFooter, write, V, endpoint } = c;
  const slug = "metodologia-vector/equipo";
  const body = `${siteHeader("metodologia")}
<main class="mvpage" id="contenido">
  <div class="wrap mv-wrap">
    <section class="eqpanel" id="eqPanel" data-endpoint="${endpoint}">
      <p class="eq-cargando">Cargando su tablero…</p>
    </section>
    ${siteFooter()}
  </div>
</main>`;
  const html = head({
    title: "Tablero de su equipo · Metodología VECTOR | Vector Academy",
    desc: "Resultados de su equipo en el curso de atención y ventas por WhatsApp de Vector Academy.",
    keywords: "", canonical: `${SITE}/${slug}/`, ldGraph: [ORG]
  }).replace('content="index,follow,max-image-preview:large,max-snippet:-1"', 'content="noindex,nofollow"')
    .replace(`<link rel="stylesheet" href="/assets/css/site.css?v=${V}">`, `<link rel="stylesheet" href="/assets/css/site.css?v=${V}">\n<link rel="stylesheet" href="/assets/css/metodologia.css?v=${V}">`)
    + "\n" + body + `
<script src="/assets/js/site.js?v=${V}"></script>
<script src="/assets/js/equipo.js?v=${V}"></script>
</body>
</html>
`;
  write(`${slug}/index.html`, html);
};
