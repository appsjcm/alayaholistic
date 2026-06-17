// Alaya Holistics · backend-config.example.js
// Copia este archivo como js/backend-config.js y rellena tus datos reales de Firebase.

window.ALAYA_BACKEND_CONFIG = {
  firebaseEnabled: false,

  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },

  adminEmails: [
    // "admin@alaya.es"
  ],

  firestore: {
    cmsCollection: "alayaCms",
    cmsDocument: "public",
    reservationsCollection: "reservas",
    auditCollection: "auditLog"
  }
};
