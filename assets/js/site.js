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
      /* portadas diferidas (galería): se cargan poco antes de entrar en pantalla */
      const poster = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const v = e.target.querySelector("video[data-poster]"); if (v && !v.getAttribute("poster")) v.poster = v.dataset.poster;
        poster.unobserve(e.target);
      }), { rootMargin: "300px 0px" });
      items.forEach(el => { if (el.querySelector("video[data-poster]")) poster.observe(el); });
      /* Solo reproducen los videos bien visibles y como máximo unos pocos a la vez (2 en celular, 5 en computadora):
       * así el teléfono no descarga ni decodifica decenas de videos al mismo tiempo */
      const MAXP = matchMedia("(max-width: 759px)").matches ? 2 : 5;
      const vis = new Set();
      const sync = () => {
        let n = 0;
        [...vis].sort((a, b) => (a.compareDocumentPosition(b) & 4 ? -1 : 1)).forEach(el => {
          const v = el.querySelector("video");
          if (n < MAXP && !document.hidden) { load(v); if (v.paused) v.play().catch(() => {}); n++; }
          else if (!v.paused) v.pause();
        });
      };
      const play = new IntersectionObserver(es => {
        es.forEach(e => {
          const v = e.target.querySelector("video"); if (!v) return;
          if (e.intersectionRatio >= .6) vis.add(e.target); else { vis.delete(e.target); v.pause(); }
        });
        sync();
      }, { threshold: [0, .6] });
      document.addEventListener("visibilitychange", () => { if (document.hidden) vis.forEach(el => el.querySelector("video").pause()); else sync(); });
      /* portadas de los carruseles: se cargan poco antes de entrar por el costado */
      document.querySelectorAll(".reels.loop").forEach(box => {
        const io = new IntersectionObserver(es => es.forEach(e => {
          if (!e.isIntersecting) return;
          const v = e.target.querySelector("video[data-poster]"); if (v && !v.getAttribute("poster")) v.poster = v.dataset.poster;
          io.unobserve(e.target);
        }), { root: box, rootMargin: "0px 900px" });
        box.querySelectorAll(".reel").forEach(el => { if (el.querySelector("video[data-poster]")) io.observe(el); });
      });
      items.forEach(el => { seen.observe(el); if (el.classList.contains("reel")) play.observe(el); });
      dups.forEach(el => { seen.observe(el); play.observe(el); });
    } else [...items, ...dups].forEach(el => { el.classList.add("in"); const v = el.querySelector("video"); if (v && v.dataset.poster) v.poster = v.dataset.poster; load(v); });

    /* Visor */
    const X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
    const L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>';
    const R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>';
    let lb = null, cur = -1, lastFocus = null;
    /* siguiente o anterior visible (la galería oculta las categorías filtradas) */
    const step = d => { let i = cur; for (let n = 0; n < items.length; n++) { i = (i + d + items.length) % items.length; if (!items[i].closest("[hidden]")) break; } render(i); };
    function render(i) {
      const el = items[i], v = el.querySelector("video"), img = el.querySelector("img");
      const box = lb.querySelector(".lb-box");
      box.classList.toggle("wide", el.classList.contains("wide"));
      box.innerHTML = (v
        ? `<video src="${v.dataset.full || v.dataset.src}" poster="${v.dataset.poster || v.poster}" controls autoplay playsinline loop></video>`
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
        lb.querySelector(".prev").addEventListener("click", () => step(-1));
        lb.querySelector(".next").addEventListener("click", () => step(1));
        document.addEventListener("keydown", e => {
          if (lb.hidden) return;
          if (e.key === "Escape") close();
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
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
    /* fuera de pantalla no se mueve (ahorra batería y procesador) */
    let onscreen = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(es => { onscreen = es[0].isIntersecting; if (onscreen) pos = box.scrollLeft; }).observe(box);
    const SPEED = 80; /* píxeles por segundo */
    let last = 0;
    if (!still) (function step(now) {
      const dt = last ? Math.min(50, now - last) : 16; last = now;
      if (!paused && onscreen && half > 0) { pos += SPEED * dt / 1000; if (pos >= half) pos -= half; if (Math.abs(box.scrollLeft - pos) > 3 && Math.abs(box.scrollLeft - pos) < half - 3) { stop(); go(); } else box.scrollLeft = pos; }
      requestAnimationFrame(step);
    })(0);
  });
  /* Galería: filtro por tipo de negocio (con enlace directo: /portafolio/#restaurantes) */
  const chips = [...document.querySelectorAll(".gal-chips button")];
  if (chips.length) {
    const secs = [...document.querySelectorAll(".gal-sec")];
    const pick = (cat, scroll) => {
      if (!secs.some(s => s.dataset.cat === cat)) cat = "todos";
      chips.forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === cat));
      secs.forEach(s => { s.hidden = cat !== "todos" && s.dataset.cat !== cat; });
      const on = chips.find(b => b.dataset.cat === cat); if (on) on.scrollIntoView({ block: "nearest", inline: "center" });
      if (scroll) {
        const bar = document.querySelector(".gal-bar"), hdr = document.querySelector(".sitehead");
        const top = bar.getBoundingClientRect().top + scrollY - (hdr ? hdr.offsetHeight : 0) - 8;
        if (scrollY > top) window.scrollTo({ top, behavior: "smooth" });
      }
    };
    chips.forEach(b => b.addEventListener("click", () => {
      pick(b.dataset.cat, true);
      try { history.replaceState(null, "", b.dataset.cat === "todos" ? location.pathname : "#" + b.dataset.cat); } catch (e) {}
    }));
    if (location.hash) pick(location.hash.slice(1), false);
  }
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

  /* Visitas que llegan desde asistentes de IA (ChatGPT, Perplexity, Gemini, Copilot, Claude…): evento ai_referral, una vez por visita */
  const AI = [["chatgpt.com", "ChatGPT"], ["openai.com", "ChatGPT"], ["perplexity.ai", "Perplexity"], ["copilot.microsoft.com", "Copilot"], ["gemini.google.com", "Gemini"], ["bard.google.com", "Gemini"], ["claude.ai", "Claude"], ["deepseek.com", "DeepSeek"], ["meta.ai", "Meta AI"], ["grok.com", "Grok"], ["x.ai", "Grok"], ["chat.mistral.ai", "Le Chat"], ["you.com", "You.com"], ["poe.com", "Poe"]];
  let aiSource = "";
  try {
    aiSource = sessionStorage.getItem("ai_source") || "";
    if (!aiSource) {
      const ref = document.referrer, utm = (new URLSearchParams(location.search).get("utm_source") || "").toLowerCase();
      const hit = AI.find(([d]) => (ref && new URL(ref).hostname.endsWith(d)) || utm.includes(d));
      if (hit) {
        aiSource = hit[1]; sessionStorage.setItem("ai_source", aiSource);
        if (window.gtag) gtag("event", "ai_referral", { ai_source: aiSource, landing_page: location.pathname });
      }
    }
  } catch (err) {}

  /* Cada clic a WhatsApp cuenta como cliente potencial: Lead en el píxel de Meta y generate_lead en Google Analytics */
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href*="wa.me/"]');
    if (!a) return;
    const card = a.closest("[data-id]");
    const name = String(a.dataset.name || (card && card.dataset.id) || (document.querySelector("h1") || {}).textContent || "WhatsApp").trim().slice(0, 80);
    const value = a.dataset.value ? +a.dataset.value : undefined;
    if (window.fbq) {
      const data = { content_name: name, currency: "HNL" };
      if (value) data.value = value;
      try { fbq("track", "Lead", data); fbq("track", "Contact"); } catch (err) {}
    }
    if (window.gtag) {
      const where = a.closest(".cta-bar") ? "barra inferior" : a.closest(".sitehead") ? "menú" : a.closest(".tv-card") ? "catálogo de pantallas" : a.closest("footer") ? "pie" : "contenido";
      const data = { method: "WhatsApp", content_name: name, link_location: where, page_path: location.pathname };
      if (aiSource) data.ai_source = aiSource;
      if (value) { data.value = value; data.currency = "HNL"; }
      try { gtag("event", "generate_lead", data); } catch (err) {}
    }
  });
  /* Google Analytics: videos abiertos en el visor */
  document.addEventListener("click", e => {
    const r = e.target.closest(".reel[data-title]");
    if (r && window.gtag) try { gtag("event", "video_open", { content_name: r.dataset.title, page_path: location.pathname }); } catch (err) {}
  });

  watch();
})();
