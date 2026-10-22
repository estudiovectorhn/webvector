/*
 * Ilustraciones de las interfaces que se usan en cada taller.
 * Son dibujos propios en la paleta de Vector: no son capturas ni imágenes de terceros,
 * así que pueden usarse en material de venta sin problemas de derechos.
 * Se incrustan como SVG, de modo que no pesan y se ven nítidas a cualquier tamaño.
 */
const G = `<defs>
  <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3A0CC9"/><stop offset=".5" stop-color="#7B4DFF"/><stop offset="1" stop-color="#E0169B"/></linearGradient>
  <linearGradient id="vg2" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#7B4DFF"/><stop offset="1" stop-color="#E0169B"/></linearGradient>
</defs>`;
const BOX = (x, y, w, h, r, f) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"/>`;
const LINE = (x, y, w, h, f) => BOX(x, y, w, h, h / 2, f);

/* Grabación y edición en el celular */
const celular = () => `<svg viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Edición de video en el celular con línea de tiempo">${G}
  <rect x="0" y="0" width="920" height="520" rx="34" fill="#F4EFFF"/>
  <!-- teléfono -->
  <rect x="62" y="40" width="250" height="440" rx="34" fill="#160A3A"/>
  <rect x="76" y="54" width="222" height="412" rx="24" fill="url(#vg)"/>
  <circle cx="187" cy="252" r="46" fill="#fff" opacity=".92"/>
  <path d="M174 230l38 22-38 22z" fill="#2C02A4"/>
  ${LINE(104, 398, 120, 12, "rgba(255,255,255,.85)")}
  ${LINE(104, 422, 76, 12, "rgba(255,255,255,.5)")}
  <rect x="160" y="44" width="76" height="12" rx="6" fill="#160A3A"/>
  <!-- línea de tiempo -->
  ${BOX(356, 96, 500, 64, 18, "#fff")}
  ${BOX(372, 110, 150, 36, 10, "#7B4DFF")}
  ${BOX(530, 110, 110, 36, 10, "#B36BFF")}
  ${BOX(648, 110, 192, 36, 10, "#E0169B")}
  <text x="356" y="76" font-family="Manrope,sans-serif" font-size="22" font-weight="800" fill="#5E5484">CORTES</text>
  <!-- pistas -->
  ${BOX(356, 196, 500, 52, 16, "#fff")}
  ${LINE(376, 214, 240, 16, "#C9B6FF")}
  <text x="356" y="178" font-family="Manrope,sans-serif" font-size="22" font-weight="800" fill="#5E5484">SUBTÍTULOS</text>
  ${BOX(356, 288, 500, 52, 16, "#fff")}
  <g fill="#6A3BF5">${Array.from({ length: 22 }, (_, i) => `<rect x="${378 + i * 20}" y="${314 - (6 + ((i * 7) % 16))}" width="8" height="${12 + ((i * 7) % 32)}" rx="4"/>`).join("")}</g>
  <text x="356" y="270" font-family="Manrope,sans-serif" font-size="22" font-weight="800" fill="#5E5484">AUDIO Y MÚSICA</text>
  <!-- exportar -->
  ${BOX(356, 384, 236, 72, 20, "url(#vg2)")}
  <text x="474" y="429" text-anchor="middle" font-family="Anton,sans-serif" font-size="30" fill="#fff">EXPORTAR</text>
  ${BOX(616, 384, 240, 72, 20, "#fff")}
  <text x="736" y="421" text-anchor="middle" font-family="Manrope,sans-serif" font-size="21" font-weight="800" fill="#2C02A4">9:16 · 4:5 · 1:1</text>
  <text x="736" y="445" text-anchor="middle" font-family="Manrope,sans-serif" font-size="18" font-weight="700" fill="#8C83AF">formatos por red</text>
</svg>`;

/* Administrador de anuncios */
const meta = () => `<svg viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Panel de campañas con públicos, presupuesto y resultados">${G}
  <rect x="0" y="0" width="920" height="520" rx="34" fill="#F4EFFF"/>
  ${BOX(48, 40, 824, 440, 28, "#fff")}
  <rect x="48" y="40" width="824" height="58" rx="28" fill="#EEE6FF"/>
  <rect x="48" y="70" width="824" height="28" fill="#EEE6FF"/>
  <circle cx="84" cy="69" r="8" fill="#E0169B"/><circle cx="110" cy="69" r="8" fill="#B36BFF"/><circle cx="136" cy="69" r="8" fill="#C9B6FF"/>
  <!-- estructura de campaña -->
  <text x="84" y="146" font-family="Manrope,sans-serif" font-size="21" font-weight="800" fill="#8C83AF">CAMPAÑA</text>
  ${BOX(84, 160, 300, 48, 14, "url(#vg)")}
  <text x="104" y="190" font-family="Manrope,sans-serif" font-size="21" font-weight="800" fill="#fff">Mensajes a WhatsApp</text>
  ${BOX(114, 220, 270, 44, 14, "#F4EFFF")}
  <text x="134" y="248" font-family="Manrope,sans-serif" font-size="20" font-weight="700" fill="#2C02A4">Público · SPS, 25-45</text>
  ${BOX(144, 276, 240, 44, 14, "#F4EFFF")}
  <text x="164" y="304" font-family="Manrope,sans-serif" font-size="20" font-weight="700" fill="#2C02A4">Anuncio · video</text>
  ${BOX(84, 344, 300, 96, 18, "#F7F4FF")}
  <text x="104" y="376" font-family="Manrope,sans-serif" font-size="19" font-weight="800" fill="#8C83AF">PRESUPUESTO DIARIO</text>
  <text x="104" y="416" font-family="Anton,sans-serif" font-size="38" fill="#2C02A4">L 150</text>
  <!-- resultados -->
  <text x="444" y="146" font-family="Manrope,sans-serif" font-size="21" font-weight="800" fill="#8C83AF">RESULTADOS</text>
  ${BOX(444, 160, 392, 160, 20, "#F7F4FF")}
  <g>${[46, 72, 58, 96, 84, 122, 110].map((h, i) => `<rect x="${472 + i * 52}" y="${300 - h}" width="30" height="${h}" rx="8" fill="${i === 5 ? "#E0169B" : "#7B4DFF"}" opacity="${i === 5 ? 1 : .55}"/>`).join("")}</g>
  ${BOX(444, 344, 188, 96, 18, "url(#vg2)")}
  <text x="466" y="378" font-family="Manrope,sans-serif" font-size="16" font-weight="800" fill="rgba(255,255,255,.85)">COSTO/RESULTADO</text>
  <text x="466" y="418" font-family="Anton,sans-serif" font-size="36" fill="#fff">L 18</text>
  ${BOX(648, 344, 188, 96, 18, "#F7F4FF")}
  <text x="670" y="378" font-family="Manrope,sans-serif" font-size="18" font-weight="800" fill="#8C83AF">MENSAJES</text>
  <text x="670" y="418" font-family="Anton,sans-serif" font-size="36" fill="#2C02A4">34</text>
</svg>`;

/* Canva con apoyo de IA */
const canva = () => `<svg viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Editor de diseño con texto generado por inteligencia artificial">${G}
  <rect x="0" y="0" width="920" height="520" rx="34" fill="#F4EFFF"/>
  ${BOX(48, 40, 824, 440, 28, "#fff")}
  <!-- barra de herramientas -->
  ${BOX(48, 40, 104, 440, 28, "#EEE6FF")}
  <rect x="128" y="40" width="24" height="440" fill="#EEE6FF"/>
  ${BOX(74, 84, 52, 52, 14, "#7B4DFF")}
  ${BOX(74, 150, 52, 52, 14, "#C9B6FF")}
  ${BOX(74, 216, 52, 52, 14, "#C9B6FF")}
  ${BOX(74, 282, 52, 52, 14, "#C9B6FF")}
  <!-- lienzo -->
  ${BOX(186, 80, 400, 360, 20, "#F7F4FF")}
  ${BOX(210, 104, 352, 150, 14, "url(#vg)")}
  <text x="236" y="166" font-family="Anton,sans-serif" font-size="38" fill="#fff">2x2 GRATIS</text>
  <text x="236" y="206" font-family="Manrope,sans-serif" font-size="22" font-weight="700" fill="rgba(255,255,255,.9)">Solo este viernes</text>
  ${BOX(210, 274, 168, 142, 14, "#C9B6FF")}
  ${BOX(394, 274, 168, 142, 14, "#EEE6FF")}
  ${LINE(414, 302, 128, 14, "#B36BFF")}
  ${LINE(414, 328, 92, 14, "#C9B6FF")}
  <circle cx="478" cy="382" r="26" fill="url(#vg2)"/>
  <!-- burbuja de IA -->
  ${BOX(620, 112, 228, 196, 22, "#160A3A")}
  <path d="M620 250l-26 22 26 4z" fill="#160A3A"/>
  <text x="646" y="152" font-family="Manrope,sans-serif" font-size="18" font-weight="800" fill="#FF9AD2">TITULAR CON IA</text>
  ${LINE(646, 172, 176, 14, "rgba(255,255,255,.9)")}
  ${LINE(646, 198, 142, 14, "rgba(255,255,255,.55)")}
  ${LINE(646, 224, 164, 14, "rgba(255,255,255,.55)")}
  ${LINE(646, 250, 108, 14, "rgba(255,255,255,.35)")}
  <!-- kit de marca -->
  ${BOX(620, 340, 228, 100, 20, "#F7F4FF")}
  <text x="644" y="374" font-family="Manrope,sans-serif" font-size="18" font-weight="800" fill="#8C83AF">KIT DE MARCA</text>
  <circle cx="658" cy="406" r="16" fill="#2C02A4"/><circle cx="696" cy="406" r="16" fill="#7B4DFF"/><circle cx="734" cy="406" r="16" fill="#E0169B"/><circle cx="772" cy="406" r="16" fill="#FF9AD2"/>
</svg>`;

/* Automatizaciones con IA */
const ia = () => `<svg viewBox="0 0 920 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Una tarea repetitiva pasa por un agente y sale resuelta">${G}
  <rect x="0" y="0" width="920" height="520" rx="34" fill="#F4EFFF"/>
  <!-- tarea -->
  ${BOX(56, 150, 236, 220, 24, "#fff")}
  <text x="84" y="196" font-family="Manrope,sans-serif" font-size="19" font-weight="800" fill="#8C83AF">TAREA REPETITIVA</text>
  ${LINE(84, 216, 180, 14, "#C9B6FF")}
  ${LINE(84, 242, 148, 14, "#C9B6FF")}
  ${LINE(84, 268, 168, 14, "#C9B6FF")}
  ${BOX(84, 300, 120, 44, 12, "#F4EFFF")}
  <text x="104" y="329" font-family="Manrope,sans-serif" font-size="20" font-weight="800" fill="#5E5484">3 horas</text>
  <path d="M300 260h56M344 248l16 12-16 12z" stroke="#7B4DFF" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- agente -->
  ${BOX(378, 110, 236, 300, 28, "url(#vg)")}
  <text x="496" y="164" text-anchor="middle" font-family="Manrope,sans-serif" font-size="19" font-weight="800" fill="rgba(255,255,255,.85)">AGENTE</text>
  <circle cx="496" cy="250" r="62" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="6"/>
  <circle cx="496" cy="250" r="26" fill="#fff"/>
  <g stroke="rgba(255,255,255,.75)" stroke-width="6" stroke-linecap="round">
    <path d="M496 162v26M496 312v26M408 250h26M558 250h26M434 188l18 18M540 294l18 18M558 188l-18 18M452 294l-18 18"/>
  </g>
  <text x="496" y="358" text-anchor="middle" font-family="Manrope,sans-serif" font-size="19" font-weight="800" fill="rgba(255,255,255,.9)">objetivo · permisos</text>
  <text x="496" y="384" text-anchor="middle" font-family="Manrope,sans-serif" font-size="19" font-weight="800" fill="rgba(255,255,255,.9)">y límites</text>
  <path d="M636 260h56M680 248l16 12-16 12z" stroke="#E0169B" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- resultado -->
  ${BOX(712, 150, 152, 220, 24, "#160A3A")}
  <text x="788" y="196" text-anchor="middle" font-family="Manrope,sans-serif" font-size="19" font-weight="800" fill="#FF9AD2">LISTO</text>
  <path d="M756 252l22 22 42-44" stroke="#5BE2A8" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${BOX(738, 300, 100, 44, 12, "rgba(255,255,255,.1)")}
  <text x="788" y="329" text-anchor="middle" font-family="Manrope,sans-serif" font-size="20" font-weight="800" fill="#fff">12 min</text>
</svg>`;

module.exports = { celular, meta, canva, ia };
