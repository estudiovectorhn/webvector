/* Página /anuncios: cuenta regresiva y eventos del píxel */
(function () {
  const track = (ev, data) => { try { if (window.fbq) fbq("track", ev, data || {}); } catch (e) {} };

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

})();
