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
})();
