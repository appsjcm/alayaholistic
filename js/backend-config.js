// ======================================================
// ALAYA HOLISTICS · CONFIGURACIÓN ONLINE
// ======================================================
// Por defecto está en modo local para que la web funcione sin tocar nada.
// Cuando quieras conectar Firebase, cambia mode: "local" por mode: "firebase"
// y rellena firebaseConfig con tus datos reales.
//
// Importante: no compartas claves privadas de servidor.
// La configuración pública de Firebase Web no es una contraseña,
// pero las reglas de Firestore deben estar bien protegidas.
// ======================================================

window.ALAYA_BACKEND = {
  mode: "local", // "local" o "firebase"
  provider: "firebase",

  firebaseConfig: {
    apiKey: "PEGA_AQUI_TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:0000000000000000000000"
  },

  collections: {
    settings: "alaya_settings",
    services: "alaya_services",
    eventos: "alaya_eventos",
    productos: "alaya_productos",
    reservas: "alaya_reservas",
    audit: "alaya_audit_log",
    blocks: "alaya_agenda_blocks",
    notifications: "alaya_notifications",
    astralCharts: "alaya_astral_charts"
  },

  auth: {
    enabled: true,
    provider: "email-password",
    // Añade aquí el email admin que crearás en Firebase Authentication.
    // También debes copiarlo en firebase/firestore.rules si usas reglas por email.
    adminEmails: [
      "admin@alayaholistics.com"
    ],
    editorEmails: [
      "editor@alayaholistics.com"
    ],
    viewerEmails: [
      "viewer@alayaholistics.com"
    ]
  }
};
