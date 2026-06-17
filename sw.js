const CACHE_NAME = "alaya-holistics-v8-5-centro-confirmaciones-admin-pro";
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/backend-config.js",
  "./js/cloud-adapter.js",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "assets/apple-touch-icon.png",
  "assets/favicon.png",
  "assets/logos/alaya-astrologia-logo.png",
  "assets/logos/alaya-herbolario-logo.png",
  "assets/logos/alaya-holistics-logo.png",
  "./assets/hero-pattern.svg",
  "./robots.txt",
  "./sitemap.xml",
  "./firebase/firestore.rules",
  "./firebase/firebase.json",
  "./docs/FIREBASE-PASO-A-PASO.md",
  "./docs/FIREBASE-AUTH.md",
  "./docs/FIREBASE-CHECKER.md",
  "./docs/AUTH-UX-PRO.md",
  "./docs/ADMIN-SECURITY-GUARD.md",
  "./docs/ADMIN-AUDIT-LOG.md",
  "./docs/ONLINE-AUDIT-TRAIL.md",
  "./docs/RESERVAS-PRO.md",
  "./docs/DISPONIBILIDAD-PRO.md",
  "./docs/AGENDA-INTELIGENTE.md",
  "./docs/CALENDARIO-PRO.md",
  "./docs/BLOQUEOS-AGENDA.md",
  "./docs/BLOQUEOS-ONLINE.md",
  "./docs/MULTI-ADMIN.md",
  "./docs/ROLE-GUARD-UX.md",
  "./docs/CENTRO-NOTIFICACIONES.md",
  "./docs/NOTIFICACIONES-ONLINE.md",
  "./docs/PLANTILLAS-MENSAJES.md",
  "./docs/PLANTILLAS-POR-SERVICIO.md",
  "./docs/BRANDING-PRO.md",
  "./docs/ALAYA-HERBOLARIO-PRO.md",
  "./docs/HERBOLARIO-CATALOGO-PRO.md",
  "./docs/ALAYA-HOLISTICS-SERVICIOS-PRO.md",
  "./docs/TALLERES-CURSOS-PRO.md",
  "./docs/SERVICIOS-EJEMPLO-PRO.md"
  "./alaya-astral/index.html",
  "./docs/ALAYA-ASTRAL-INTEGRADO.md",
  "./docs/DISENO-ASTRAL-GLOBAL.md",
  "./docs/LANDING-ASTRAL-PREMIUM.md",
  "./docs/ASTRAL-ADMIN-PRO.md",
  "./docs/ASTRAL-ADMIN-PLUS.md",
  "./docs/ASTRAL-CLIENT-HUB.md",
  "./docs/PRIVACIDAD-ASTRAL-PRO.md",
  "./docs/ASTRAL-CLOUD-SYNC-PRO.md",
  "./docs/SEGUIMIENTO-ASTRAL-PRO.md",
  "./docs/INFORMES-ASTRALES-PRO.md",
  "./offline.html",
  "./docs/WEB-PUBLICA-PRO.md",
  "./docs/CENTRO-LANZAMIENTO-PRO.md",
  "./legal.html",
  "./privacidad.html",
  "./cookies.html",
  "./docs/LEGAL-CONFIANZA-WEB-PRO.md",
  "./docs/CONTACTO-CONVERSION-PRO.md",
  "./docs/CANALES-REDES-PRO.md",
  "./docs/CONTENIDO-PUBLICO-PRO.md",
  "./docs/NOVEDADES-BLOG-PRO.md",
  "./docs/BUSCADOR-PUBLICO-PRO.md",
  "./docs/METRICAS-LOCALES-PRO.md",
  "./docs/ACCESIBILIDAD-UX-PRO.md",
  "./docs/ASISTENTE-PUBLICO-PRO.md",
  "./docs/PWA-INSTALACION-MANTENIMIENTO-PRO.md",
  "./docs/BACKUP-TOTAL-MIGRACION-PRO.md",
  "./404.html",
  "./.nojekyll",
  "./docs/PUBLICACION-GITHUB-PAGES-PRO.md",
  "./VERSION.json",
  "./CHANGELOG.md",
  "./docs/RELEASE-CANDIDATE-PRO.md",
  "./docs/SEO-COMPARTIR-PRO.md",
  "./docs/RENDIMIENTO-CALIDAD-PRO.md",
  "./docs/AVISOS-GLOBALES-PRO.md",
  "./docs/MODO-LANZAMIENTO-MANTENIMIENTO-PRO.md",
  "./docs/CENTRO-AYUDA-MANUAL-PRO.md",
  "./docs/CLIENTES-ADMIN-SEPARADOS-PRO.md",
  "./admin.html",
  "./docs/ACCESO-ADMIN-SEPARADO-PRO.md",
  "./guia-clientes.html",
  "./manual-admin.html",
  "./docs/DOCUMENTACION-CLIENTE-ADMIN-PRO.md",
  "./docs/NAVEGACION-CLIENTE-LIMPIA-PRO.md",
  "./docs/EXPERIENCIA-CLIENTE-PRO.md",
  "./docs/SELECTOR-SERVICIO-CLIENTE-PRO.md",
  "./docs/PRERESERVA-GUIADA-CLIENTE-PRO.md",
  "./docs/CONSULTA-RESERVA-CLIENTE-PRO.md",
  "./docs/CONFIRMACION-ADMIN-OBLIGATORIA-PRO.md",
  "./docs/CENTRO-CONFIRMACIONES-ADMIN-PRO.md",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))
    )
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});


// v5.6 fallback offline seguro
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("./offline.html"))
    );
  }
});
