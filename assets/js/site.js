/* Comportamiento común de todas las páginas: menú, copiar WhatsApp, animaciones al hacer scroll */
(function () {
  /* Portafolio: entrada animada, reproducción en silencio al estar en pantalla y visor centrado al tocar */
  const items = [...document.querySelectorAll(".reel:not([data-dup]),.shot")];
  const dups = [...document.querySelectorAll(".reel[data-dup]")];
  if (items.length) {
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const load = v => { if (v && !v.src) v.src = v.dataset.src; };
    if ("IntersectionObserver" in window) {
      const seen = new IntersectionObserver(es => es.forEach((e, n) => {
        if (!e.isIntersecting) return;
        const el = e.target, idx = [...el.parentNode.children].indexOf(el);
        el.style.transitionDelay = reduce ? "0s" : Math.min(idx, 8) * 70 + "ms";
        el.classList.add("in"); seen.unobserve(el);
      }), { threshold: .15 });
      const play = new IntersectionObserver(es => es.forEach(e => {
        const v = e.target.querySelector("video"); if (!v) return;
        if (e.isIntersecting) { load(v); v.play().catch(() => {}); } else v.pause();
      }), { threshold: .4 });
      items.forEach(el => { seen.observe(el); if (el.classList.contains("reel")) play.observe(el); });
      dups.forEach(el => { seen.observe(el); play.observe(el); });
    } else [...items, ...dups].forEach(el => { el.classList.add("in"); load(el.querySelector("video")); });

    /* Visor */
    const X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
    const L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>';
    const R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>';
    let lb = null, cur = -1, lastFocus = null;
    function render(i) {
      const el = items[i], v = el.querySelector("video"), img = el.querySelector("img");
      const box = lb.querySelector(".lb-box");
      box.classList.toggle("wide", el.classList.contains("wide"));
      box.innerHTML = (v
        ? `<video src="${v.dataset.src}" poster="${v.poster}" controls autoplay playsinline loop></video>`
        : `<img src="${img.src}" alt="${img.alt}">`) +
        `<div class="lb-cap"><b>${el.dataset.title || ""}</b><span>${el.dataset.cap || ""}</span></div>`;
      const nv = box.querySelector("video"); if (nv) { nv.muted = false; nv.play().catch(() => {}); }
      cur = i;
    }
    function open(i) {
      lastFocus = document.activeElement;
      if (!lb) {
        lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Visor de trabajos");
        lb.innerHTML = `<button class="lb-x" type="button" aria-label="Cerrar">${X}</button><button class="lb-nav prev" type="button" aria-label="Anterior">${L}</button><div class="lb-box"></div><button class="lb-nav next" type="button" aria-label="Siguiente">${R}</button>`;
        document.body.appendChild(lb);
        lb.addEventListener("click", e => { if (e.target === lb) close(); });
        lb.querySelector(".lb-x").addEventListener("click", close);
        lb.querySelector(".prev").addEventListener("click", () => render((cur - 1 + items.length) % items.length));
        lb.querySelector(".next").addEventListener("click", () => render((cur + 1) % items.length));
        document.addEventListener("keydown", e => {
          if (lb.hidden) return;
          if (e.key === "Escape") close();
          if (e.key === "ArrowLeft") render((cur - 1 + items.length) % items.length);
          if (e.key === "ArrowRight") render((cur + 1) % items.length);
        });
      }
      lb.hidden = false; render(i);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add("on")));
      lb.querySelector(".lb-x").focus({ preventScroll: true });
    }
    function close() {
      lb.classList.remove("on"); document.body.style.overflow = "";
      setTimeout(() => { lb.hidden = true; lb.querySelector(".lb-box").innerHTML = ""; }, 260);
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    dups.forEach(el => el.addEventListener("click", () => { const i = items.findIndex(x => x.dataset.id === el.dataset.id); if (i >= 0) open(i); }));
    items.forEach((el, i) => {
      el.tabIndex = 0; el.setAttribute("role", "button");
      el.addEventListener("click", () => open(i));
      el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); } });
    });
  }
  /* Carruseles: avanzan solos en bucle; se pueden deslizar con el dedo, arrastrar con el ratón, usar el trackpad o las flechas.
   * Se pausan al pasar el cursor o al tocarlos y retoman solos después. */
  const still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".reels.loop").forEach(box => {
    let pos = 0, paused = false, resume = null, half = 0, hover = false, drag = null, dragged = false;
    const measure = () => { half = box.scrollWidth / 2; };
    const wrap = () => { if (half > 0) { if (box.scrollLeft >= half) box.scrollLeft -= half; else if (box.scrollLeft < 1) box.scrollLeft += half; } };
    const stop = () => { paused = true; clearTimeout(resume); };
    const go = () => { clearTimeout(resume); resume = setTimeout(() => { if (hover) return; pos = box.scrollLeft; paused = false; }, 2500); };
    /* táctil */
    box.addEventListener("touchstart", stop, { passive: true });
    box.addEventListener("touchend", go, { passive: true });
    box.addEventListener("touchcancel", go, { passive: true });
    /* cursor: pausa mientras está encima; arrastre con el ratón */
    box.addEventListener("pointerenter", e => { if (e.pointerType !== "mouse") return; hover = true; stop(); });
    box.addEventListener("pointerleave", e => { if (e.pointerType !== "mouse") return; hover = false; if (drag) endDrag(); go(); });
    function endDrag() { drag = null; box.classList.remove("dragging"); setTimeout(() => { dragged = false; }, 50); }
    box.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse" || e.button !== 0) return; drag = { x: e.clientX, left: box.scrollLeft }; dragged = false; stop(); });
    box.addEventListener("pointermove", e => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!dragged && Math.abs(dx) > 6) { dragged = true; box.classList.add("dragging"); }
      if (dragged) { box.scrollLeft = drag.left - dx; wrap(); if (box.scrollLeft !== drag.left - dx) { drag.left = box.scrollLeft + dx; } }
    });
    window.addEventListener("pointerup", () => { if (drag) endDrag(); });
    box.addEventListener("click", e => { if (dragged) { e.stopPropagation(); e.preventDefault(); } }, true);
    /* cualquier desplazamiento que no sea nuestro (dedo, inercia, trackpad) pausa el avance y lo reanuda después */
    box.addEventListener("scroll", () => { if (paused) { wrap(); if (!hover && !drag) go(); } else if (Math.abs(box.scrollLeft - pos) > 2) { stop(); go(); } }, { passive: true });
    /* flechas */
    const wrapEl = box.parentElement;
    wrapEl.querySelectorAll(".rnav").forEach(btn => btn.addEventListener("click", () => {
      const tile = box.querySelector(".reel"); const w = tile ? tile.getBoundingClientRect().width + 14 : 260;
      stop(); box.scrollBy({ left: btn.classList.contains("next") ? w : -w, behavior: "smooth" }); go();
    }));
    window.addEventListener("resize", measure);
    measure(); setTimeout(measure, 800);
    if (!still) (function step() {
      if (!paused && half > 0) { pos += 0.55; if (pos >= half) pos -= half; if (Math.abs(box.scrollLeft - pos) > 2 && Math.abs(box.scrollLeft - pos) < half - 2) { stop(); go(); } else box.scrollLeft = pos; }
      requestAnimationFrame(step);
    })();
  });
  /* Enlaces antiguos al inicio (#calendario, #talleres, #instructor) siguen funcionando */
  if (location.pathname === "/" && location.hash) {
    const h = location.hash.slice(1);
    if (h === "calendario" || h === "talleres") location.replace("/talleres/#" + h);
    if (h === "instructor") location.replace("/director-creativo/");
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

  const SEL = ".sechead,.goals,.includes,.steps,.cal,.weekends,.prof .stats,.forum,.allies,.skills,.quote,.contact,.facts,.faq,.seo-block,.svc-grid,.work,.home-svc,.home-dir,.svc,.process,.why,.ctaband,.tp-main,.tp-side";
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
