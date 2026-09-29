/* Página de talleres: filtros, calendario, ficha y animaciones */
(function () {
  const { ICON, fmt, dowOf, waLink, coverHTML, cardHTML, detailHTML } = window.VR;
  const T = window.TALLERES || [];
  const $ = id => document.getElementById(id);
  let goal = null, filter = "all";

  /* ---------- LISTA ---------- */
  function renderList() {
    let f = T.filter(t => filter === "all" || (filter === "sab" || filter === "dom" ? t.dw === filter : t.mode === filter));
    if (goal) f = f.filter(t => t.goals.includes(goal));
    $("list").innerHTML = f.map(t => cardHTML(t, goal)).join("") || '<p class="resultline">No hay talleres con esa combinación. Prueba otro filtro.</p>';
    const gname = goal ? document.querySelector(`.goal[data-g="${goal}"] b`).textContent : "";
    $("resultline").innerHTML = goal
      ? `<b>${f.length} taller${f.length !== 1 ? "es" : ""}</b> para: ${gname}. Toca el objetivo otra vez para ver todos.`
      : `${f.length} talleres disponibles`;
    stagger($("list"));
  }
  document.querySelectorAll(".goal").forEach(g => g.addEventListener("click", () => {
    goal = goal === g.dataset.g ? null : g.dataset.g;
    document.querySelectorAll(".goal").forEach(x => x.setAttribute("aria-pressed", x.dataset.g === goal));
    renderList();
  }));
  document.querySelectorAll(".chip").forEach(c => c.addEventListener("click", () => {
    filter = c.dataset.f;
    document.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === c));
    renderList();
  }));
  function cardClick(e) {
    const a = e.target.closest(".card");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    openSheet(a.dataset.id);
  }
  $("list").addEventListener("click", cardClick);

  /* ---------- CALENDARIO ---------- */
  const byDay = {};
  T.forEach(t => t.days.forEach(x => { if (x.m === 10) (byDay[x.d] = byDay[x.d] || []).push(t); }));
  let selDay = 3;
  function renderCal() {
    const heads = ["L", "M", "M", "J", "V", "S", "D"].map((h, i) => `<div class="dow${i > 4 ? " we" : ""}">${h}</div>`).join("");
    const start = (dowOf(1, 10) + 6) % 7;
    let cells = "";
    for (let i = 0; i < start; i++) cells += '<div class="day empty"></div>';
    for (let d = 1; d <= 31; d++) {
      const w = dowOf(d, 10), we = w === 0 || w === 6, ts = byDay[d] || [];
      const cls = ["day", we ? "we" : "", ts.length ? "has" : "", d === selDay ? "sel" : ""].join(" ");
      const dots = ts.map(t => `<i class="${t.live ? "live" : ""}"></i>`).join("");
      cells += ts.length
        ? `<button class="${cls}" data-d="${d}" id="day-${d}" aria-label="${d} de octubre, ${ts.length} taller${ts.length > 1 ? "es" : ""}">${d}<span class="dots">${dots}</span></button>`
        : `<div class="${cls}">${d}<span class="dots"></span></div>`;
    }
    $("calgrid").innerHTML = heads + cells;
    const ts = byDay[selDay] || [];
    $("daypanel").innerHTML = `<h4>${dowOf(selDay, 10) === 6 ? "Sábado" : "Domingo"} ${selDay} de octubre</h4><div class="list">${ts.map(t => cardHTML(t)).join("")}</div>`;
    stagger($("daypanel"));
  }
  $("calgrid").addEventListener("click", e => { const b = e.target.closest("button.day"); if (b) { selDay = +b.dataset.d; renderCal(); } });
  $("daypanel").addEventListener("click", cardClick);

  /* ---------- FICHA ---------- */
  const sheet = $("sheet"), scrim = $("scrim");
  let lastFocus = null;
  function openSheet(id) {
    const t = T.find(x => x.id === id); if (!t) return;
    lastFocus = document.activeElement;
    $("shscroll").innerHTML = `
     <div style="position:relative">${coverHTML(t, "sh-cover", false)}<span class="grab"></span><button class="close" id="shclose" aria-label="Cerrar">${ICON.x}</button></div>
     <div class="sh-in">
       <h2 class="sh-title" id="sh-title">${t.title}</h2>
       <div class="sh-tl">${t.tagline} · ${t.level}</div>
       <p class="sh-sub">${t.sub}</p>
       ${detailHTML(t)}
       <a class="pagelink" href="/talleres/${t.slug}/">${ICON.link}Abrir la página de este taller</a>
     </div>`;
    $("shcta").innerHTML = `<a class="btn" href="${waLink(t)}" target="_blank" rel="noopener">${ICON.wa}${t.live ? "Consultar disponibilidad" : "Reservar mi cupo · " + fmt(t.price)}</a><small>o escríbenos al <b>9569-1481</b></small>`;
    $("shscroll").scrollTop = 0;
    scrim.hidden = false; sheet.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => { scrim.classList.add("on"); sheet.classList.add("on"); }));
    document.body.style.overflow = "hidden";
    $("shclose").addEventListener("click", closeSheet);
    $("shclose").focus({ preventScroll: true });
  }
  function closeSheet() {
    scrim.classList.remove("on"); sheet.classList.remove("on");
    document.body.style.overflow = "";
    setTimeout(() => { scrim.hidden = true; sheet.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  scrim.addEventListener("click", closeSheet);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !sheet.hidden) closeSheet(); });
  let y0 = null;
  sheet.addEventListener("touchstart", e => { if ($("shscroll").scrollTop <= 0) y0 = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener("touchend", e => { if (y0 !== null && e.changedTouches[0].clientY - y0 > 90) closeSheet(); y0 = null; }, { passive: true });

  /* ---------- PESTAÑAS ---------- */
  function show(v) {
    document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t.dataset.v === v));
    ["talleres", "calendario"].forEach(k => $("v-" + k).hidden = k !== v);
    const nav = document.querySelector(".tabs");
    const hh = (document.querySelector(".sitehead") || { offsetHeight: 0 }).offsetHeight;
    const y = nav.getBoundingClientRect().top + window.scrollY - hh;
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" });
    setTimeout(watchReveal, 30);
  }
  document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => {
    show(t.dataset.v);
    try { history.replaceState(null, "", t.dataset.v === "talleres" ? location.pathname : "#" + t.dataset.v); } catch (e) {}
  }));
  window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (["talleres", "calendario"].includes(h)) show(h); });

  /* ---------- ANIMACIONES ---------- */
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function stagger(root) { (root || document).querySelectorAll(".list .card").forEach((c, i) => c.style.animationDelay = (Math.min(i, 8) * 70) + "ms"); }
  window.VRAnim.init();
  function watchReveal() { window.VRAnim.watch(); }

  renderList(); renderCal();
  const h = (location.hash || "").slice(1);
  if (["talleres", "calendario"].includes(h)) show(h);
})();
