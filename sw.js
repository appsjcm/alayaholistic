const CACHE_NAME = "alaya-holistics-v4-3-talleres-cursos-pro";
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
  "./docs/TALLERES-CURSOS-PRO.md"
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
