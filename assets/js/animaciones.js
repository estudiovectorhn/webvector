/* Estudio Vector — revelado al hacer scroll con escalonado.
   Mejora progresiva: sin JS (o con "reducir movimiento") todo queda visible. */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var objetivos = document.querySelectorAll(
    'section .card, section details, section h2, section .etiqueta, section .section-intro, .perfil > *, .vacio, footer.site .cols > *'
  );
  if (!objetivos.length) return;

  var porPadre = new Map();
  objetivos.forEach(function (el) {
    el.classList.add('revelar');
    var padre = el.parentElement;
    var n = porPadre.get(padre) || 0;
    el.style.transitionDelay = Math.min(n * 90, 450) + 'ms';
    porPadre.set(padre, n + 1);
  });

  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  objetivos.forEach(function (el) { obs.observe(el); });

  // Barra de progreso de lectura
  var barra = document.createElement('div');
  barra.className = 'progreso-lectura';
  barra.setAttribute('aria-hidden', 'true');
  document.body.appendChild(barra);

  // Parallax sutil de los brillos de fondo + progreso, en un solo frame
  var pendiente = false;
  function alDesplazar() {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      var alto = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.width = (alto > 0 ? (y / alto) * 100 : 0) + '%';
      document.body.style.backgroundPosition =
        'calc(88% + ' + (y * 0.02) + 'px) ' + (-180 + y * 0.06) + 'px, ' +
        (-160 - y * 0.02) + 'px ' + (300 + y * 0.04) + 'px, 0 0, 0 0';
      pendiente = false;
    });
  }
  window.addEventListener('scroll', alDesplazar, { passive: true });
  alDesplazar();
})();
