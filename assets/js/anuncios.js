/* Página /anuncios: test, cuentas regresivas, modalidad desde el anuncio y eventos del píxel */
(function () {
  const $ = s => document.querySelector(s);
  const track = (ev, data) => { try { if (window.fbq) fbq("track", ev, data || {}); } catch (e) {} };
  const trackC = (ev, data) => { try { if (window.fbq) fbq("trackCustom", ev, data || {}); } catch (e) {} };

  /* Modalidad que viene del anuncio: /anuncios/?modalidad=online o #presencial */
  const params = new URLSearchParams(location.search);
  const pref = (params.get("modalidad") || location.hash.slice(1) || "").toLowerCase();
  if (pref === "online" || pref === "presencial") {
    const card = document.getElementById(pref), box = $(".an-opts");
    if (card && box) { box.prepend(card); card.classList.add("pref"); }
  }
  track("ViewContent", { content_name: "Taller Meta Ads", content_category: "Talleres", currency: "HNL" });

  /* Cuenta regresiva */
  function tick() {
    document.querySelectorAll(".an-count").forEach(el => {
      const ms = new Date(el.dataset.start) - new Date();
      if (ms <= 0) { el.innerHTML = "<span>¡Es hoy o ya inició! Escríbenos para consultar.</span>"; return; }
      el.querySelector('[data-u="d"]').textContent = Math.floor(ms / 864e5);
      el.querySelector('[data-u="h"]').textContent = Math.floor(ms / 36e5) % 24;
    });
  }
  tick(); setInterval(tick, 60000);

  /* Test */
  const steps = [...document.querySelectorAll(".q-step")];
  const score = { o: 0, p: 0 };
  let i = 0;
  function bar() { $("#qbar").style.width = (i / steps.length * 100) + "%"; }
  bar();
  steps.forEach(st => st.addEventListener("click", e => {
    const b = e.target.closest(".q-opt"); if (!b) return;
    b.classList.add("picked");
    if (b.dataset.v) score[b.dataset.v]++;
    setTimeout(() => {
      st.hidden = true; i++; bar();
      if (steps[i]) { steps[i].hidden = false; steps[i].querySelector(".q-opt").focus({ preventScroll: true }); }
      else result();
    }, 260);
  }));
  function result() {
    const k = score.p > score.o ? "presencial" : "online";
    const card = document.getElementById(k);
    const why = k === "presencial"
      ? "Te conviene el <b>presencial del domingo 11 de octubre</b>: el instructor te acompaña en tu propia laptop y sales con todo configurado."
      : "Te conviene el <b>online del sábado 3 de octubre</b>: aprendes en vivo desde donde estés y te quedas con la grabación.";
    const btn = card.querySelector(".wa-go");
    $("#qres").innerHTML = `<span class="q-tag">Tu recomendación</span><h3>${k === "presencial" ? "Taller presencial" : "Taller online"}</h3><p>${why}</p>
      <div class="q-actions"><a class="btn wa-go" data-name="Test → ${k}" data-value="${btn.dataset.value}" href="${btn.href}" target="_blank" rel="noopener">Reservar ${k}</a><a class="btn ghost" href="#${k}">Ver detalles</a><button type="button" class="q-again" id="qagain">Repetir test</button></div>`;
    $("#qres").hidden = false;
    trackC("TestCompletado", { recomendacion: k });
    $("#qagain").addEventListener("click", () => {
      score.o = score.p = 0; i = 0; $("#qres").hidden = true;
      steps.forEach((s, n) => { s.hidden = n > 0; s.querySelectorAll(".picked").forEach(x => x.classList.remove("picked")); });
      bar();
    });
  }
})();
