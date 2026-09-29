/* Comportamiento común de todas las páginas: menú, copiar WhatsApp, animaciones al hacer scroll */
(function () {
  /* Portafolio: los videos cargan y se reproducen en silencio solo cuando están en pantalla; un toque activa el sonido */
  const reels = document.querySelectorAll(".reel");
  if (reels.length && "IntersectionObserver" in window) {
    const vo = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target.querySelector("video");
      if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); }
      else { v.pause(); }
    }), { threshold: .35 });
    reels.forEach(r => {
      vo.observe(r);
      const v = r.querySelector("video");
      r.querySelector(".snd").addEventListener("click", () => {
        v.muted = !v.muted; r.classList.toggle("on", !v.muted);
        if (!v.muted) reels.forEach(o => { if (o !== r) { o.querySelector("video").muted = true; o.classList.remove("on"); } });
        if (!v.src) v.src = v.dataset.src; v.play().catch(() => {});
      });
    });
  }
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counted = new WeakSet();

  function countUp(el) {
    const end = +el.dataset.count, suf = el.dataset.suffix || "";
    if (reduce) { el.textContent = end + suf; return; }
    const t0 = performance.now(), d = 1200;
    (function step(t) {
      const p = Math.min(1, (t - t0) / d);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  const io = ("IntersectionObserver" in window) ? new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.remove("pre");
    el.querySelectorAll("[data-count]").forEach(n => { if (!counted.has(n)) { counted.add(n); countUp(n); } });
    io.unobserve(el);
  }), { threshold: .12, rootMargin: "0px 0px -40px 0px" }) : null;

  const SEL = ".sechead,.goals,.includes,.steps,.cal,.weekends,.prof .stats,.forum,.allies,.skills,.quote,.contact,.facts,.faq,.seo-block,.svc-grid,.work,.svc,.process,.why,.ctaband,.tp-main,.tp-side";
  function watch() {
    document.querySelectorAll(SEL).forEach(el => {
      if (el.dataset.rv) return; el.dataset.rv = 1; el.classList.add("rv");
      const r = el.getBoundingClientRect();
      if (io && !reduce && r.top > window.innerHeight && !el.closest("[hidden]")) el.classList.add("pre");
      if (io) io.observe(el);
    });
  }
  window.VRAnim = { init: watch, watch };

  /* menú móvil */
  const tog = document.getElementById("navtoggle"), menu = document.getElementById("sitenav");
  if (tog && menu) tog.addEventListener("click", () => {
    const open = tog.getAttribute("aria-expanded") !== "true";
    tog.setAttribute("aria-expanded", open); menu.classList.toggle("open", open);
  });

  /* copiar WhatsApp */
  const cb = document.getElementById("copywa");
  if (cb) cb.addEventListener("click", async e => {
    const b = e.currentTarget;
    try { await navigator.clipboard.writeText("95691481"); b.textContent = "Copiado"; }
    catch (err) { const r = document.createRange(); r.selectNodeContents(document.getElementById("wanum")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selecciónalo"; }
    setTimeout(() => b.textContent = "Copiar", 1800);
  });

  /* encabezado con sombra al hacer scroll */
  const hdr = document.querySelector(".sitehead");
  if (hdr) { const f = () => hdr.classList.toggle("scrolled", scrollY > 10); addEventListener("scroll", f, { passive: true }); f(); }

  /* Píxel de Meta: cada clic a WhatsApp cuenta como cliente potencial (Lead) */
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href*="wa.me/"]');
    if (!a || !window.fbq) return;
    const card = a.closest("[data-id]");
    const name = a.dataset.name || (card && card.dataset.id) || (document.querySelector("h1") || {}).textContent || "WhatsApp";
    const data = { content_name: String(name).trim().slice(0, 80), currency: "HNL" };
    if (a.dataset.value) data.value = +a.dataset.value;
    try { fbq("track", "Lead", data); fbq("track", "Contact"); } catch (err) {}
  });

  watch();
})();
