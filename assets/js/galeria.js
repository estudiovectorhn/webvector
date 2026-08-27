/* Estudio Vector — carruseles infinitos de fotos y videos (9:16) */
(function () {
  'use strict';

  async function cargarDatos() {
    try {
      const res = await fetch('assets/data/galeria.json', { cache: 'no-cache' });
      if (res.ok) return await res.json();
    } catch (e) { /* sin conexión */ }
    return { fotos: [], videos: [] };
  }

  // Repite la lista hasta cubrir sobradamente el ancho de pantalla,
  // luego la duplica (2 copias) para que translateX(-50%) haga bucle perfecto.
  function listaParaBucle(items) {
    const anchoTarjeta = 251; // 235px + 16px de margen
    const minimo = Math.ceil((window.innerWidth * 1.5) / anchoTarjeta);
    let lista = items.slice();
    while (lista.length < minimo) lista = lista.concat(items);
    return lista;
  }

  function montarCarrusel(contenedor, items, construir) {
    if (!contenedor || !items.length) return false;
    const base = listaParaBucle(items);
    const pista = document.createElement('div');
    pista.className = 'pista' + (contenedor.dataset.direccion === 'reversa' ? ' reversa' : '');
    for (let copia = 0; copia < 2; copia++) {
      for (const item of base) {
        const el = construir(item);
        if (copia === 1) el.setAttribute('aria-hidden', 'true');
        pista.appendChild(el);
      }
    }
    pista.style.animationDuration = Math.max(30, base.length * 6) + 's';
    contenedor.appendChild(pista);
    contenedor.hidden = false;
    return true;
  }

  // ---- Fotos ----
  const lightbox = document.getElementById('lightbox');

  function tarjetaFoto(foto) {
    const el = document.createElement('button');
    el.className = 'tarjeta-9x16';
    el.setAttribute('aria-label', 'Ampliar: ' + (foto.titulo || 'fotografía'));
    const img = document.createElement('img');
    img.src = foto.src;
    img.alt = foto.titulo || 'Trabajo de Estudio Vector';
    img.loading = 'lazy';
    el.appendChild(img);
    if (foto.titulo || foto.descripcion) {
      const info = document.createElement('div');
      info.className = 'info';
      if (foto.titulo) { const t = document.createElement('strong'); t.textContent = foto.titulo; info.appendChild(t); }
      if (foto.descripcion) { const d = document.createElement('span'); d.textContent = foto.descripcion; info.appendChild(d); }
      el.appendChild(info);
    }
    el.addEventListener('click', function () {
      if (!lightbox) return;
      document.getElementById('lightbox-img').src = foto.src;
      document.getElementById('lightbox-img').alt = foto.titulo || '';
      document.getElementById('lightbox-pie').textContent =
        [foto.titulo, foto.descripcion].filter(Boolean).join(' — ');
      lightbox.showModal();
    });
    return el;
  }

  if (lightbox) lightbox.addEventListener('click', function () { lightbox.close(); });

  // ---- Videos ----
  const videoModal = document.getElementById('video-modal');

  function tarjetaVideo(video) {
    const el = document.createElement('button');
    el.className = 'tarjeta-9x16';
    el.setAttribute('aria-label', 'Reproducir: ' + (video.titulo || 'video'));
    const img = document.createElement('img');
    img.src = 'https://i.ytimg.com/vi/' + video.youtube_id + '/oardefault.jpg';
    img.onerror = function () { this.onerror = null; this.src = 'https://i.ytimg.com/vi/' + video.youtube_id + '/hqdefault.jpg'; };
    img.alt = '';
    img.loading = 'lazy';
    el.appendChild(img);
    const play = document.createElement('span');
    play.className = 'play';
    play.textContent = '▶';
    el.appendChild(play);
    if (video.titulo || video.descripcion) {
      const info = document.createElement('div');
      info.className = 'info';
      if (video.titulo) { const t = document.createElement('strong'); t.textContent = video.titulo; info.appendChild(t); }
      if (video.descripcion) { const d = document.createElement('span'); d.textContent = video.descripcion; info.appendChild(d); }
      el.appendChild(info);
    }
    el.addEventListener('click', function () {
      if (!videoModal) return;
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + video.youtube_id + '?autoplay=1&playsinline=1';
      iframe.title = video.titulo || 'Video de Estudio Vector';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      videoModal.replaceChildren(iframe);
      videoModal.showModal();
    });
    return el;
  }

  if (videoModal) {
    videoModal.addEventListener('click', function () { videoModal.close(); });
    videoModal.addEventListener('close', function () { videoModal.replaceChildren(); });
  }

  // ---- Montaje ----
  cargarDatos().then(function (datos) {
    const fotos = Array.isArray(datos.fotos) ? datos.fotos : [];
    const videos = Array.isArray(datos.videos) ? datos.videos : [];

    const contFotos = document.getElementById('carrusel-fotos');
    if (contFotos && !montarCarrusel(contFotos, fotos, tarjetaFoto)) {
      const vacio = document.getElementById('fotos-vacio');
      if (vacio) vacio.hidden = false;
    }

    const contVideos = document.getElementById('carrusel-videos');
    if (contVideos && !montarCarrusel(contVideos, videos, tarjetaVideo)) {
      const vacio = document.getElementById('videos-vacio');
      if (vacio) vacio.hidden = false;
    }

    // Página de marca personal: solo videos con esa categoría
    const contDirector = document.getElementById('carrusel-director');
    if (contDirector) {
      montarCarrusel(contDirector, videos.filter(function (v) { return v.categoria === 'marca-personal'; }), tarjetaVideo);
    }
  });
})();
