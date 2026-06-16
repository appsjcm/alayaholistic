// ======================================================
// ALAYA HOLISTICS · CLOUD ADAPTER v2.1 AUTH PRO
// ======================================================
// Modo local por defecto.
// Si activas mode: "firebase" en js/backend-config.js e introduces claves reales,
// se habilita Firebase Auth + Firestore.
// ======================================================

(function () {
  let firebaseApp = null;
  let firestoreDb = null;
  let authInstance = null;
  let firebaseModules = null;
  let initPromise = null;
  let lastError = "";

  function getConfig() {
    return window.ALAYA_BACKEND || { mode: "local" };
  }

  function hasFirebaseConfig() {
    const config = getConfig();
    const firebaseConfig = config.firebaseConfig || {};

    return Boolean(
      config.mode === "firebase" &&
      firebaseConfig.apiKey &&
      !String(firebaseConfig.apiKey).includes("PEGA_AQUI") &&
      firebaseConfig.projectId &&
      !String(firebaseConfig.projectId).includes("TU_PROYECTO") &&
      firebaseConfig.appId &&
      !String(firebaseConfig.appId).includes("000000")
    );
  }

  function getCollectionName(key) {
    const config = getConfig();
    return (config.collections && config.collections[key]) || key;
  }

  function normalizeEmailList(list) {
    return Array.isArray(list)
      ? list.map(email => String(email).toLowerCase().trim()).filter(Boolean)
      : [];
  }

  function getRoleEmails() {
    const config = getConfig();
    const auth = config.auth || {};

    return {
      admin: normalizeEmailList(auth.adminEmails),
      editor: normalizeEmailList(auth.editorEmails),
      viewer: normalizeEmailList(auth.viewerEmails)
    };
  }

  function getAdminEmails() {
    return getRoleEmails().admin;
  }

  function getUserRole(email) {
    const roles = getRoleEmails();
    const safeEmail = String(email || "").toLowerCase().trim();

    if (!safeEmail) return "none";
    if (roles.admin.includes(safeEmail)) return "admin";
    if (roles.editor.includes(safeEmail)) return "editor";
    if (roles.viewer.includes(safeEmail)) return "viewer";

    return "none";
  }

  function canLoginWithRole(email) {
    return getUserRole(email) !== "none";
  }

  async function initFirebase() {
    const config = getConfig();

    if (config.mode !== "firebase") {
      return { ok: false, reason: "Modo local activo." };
    }

    if (!hasFirebaseConfig()) {
      return { ok: false, reason: "Firebase no tiene claves reales en js/backend-config.js." };
    }

    if (firestoreDb && authInstance && firebaseModules) {
      return { ok: true, db: firestoreDb, auth: authInstance };
    }

    if (initPromise) return initPromise;

    initPromise = (async () => {
      try {
        const appModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
        const firestoreModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");
        const authModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");

        firebaseModules = {
          initializeApp: appModule.initializeApp,
          getApps: appModule.getApps,

          getFirestore: firestoreModule.getFirestore,
          collection: firestoreModule.collection,
          getDocs: firestoreModule.getDocs,
          doc: firestoreModule.doc,
          getDoc: firestoreModule.getDoc,
          setDoc: firestoreModule.setDoc,
          addDoc: firestoreModule.addDoc,
          deleteDoc: firestoreModule.deleteDoc,

          getAuth: authModule.getAuth,
          signInWithEmailAndPassword: authModule.signInWithEmailAndPassword,
          signOut: authModule.signOut,
          sendPasswordResetEmail: authModule.sendPasswordResetEmail,
          onAuthStateChanged: authModule.onAuthStateChanged
        };

        firebaseApp = firebaseModules.getApps().length
          ? firebaseModules.getApps()[0]
          : firebaseModules.initializeApp(config.firebaseConfig);

        firestoreDb = firebaseModules.getFirestore(firebaseApp);
        authInstance = firebaseModules.getAuth(firebaseApp);

        lastError = "";
        return { ok: true, db: firestoreDb, auth: authInstance };
      } catch (error) {
        lastError = error && error.message ? error.message : String(error);
        return { ok: false, reason: lastError };
      }
    })();

    return initPromise;
  }

  function isAuthenticated() {
    return Boolean(authInstance && authInstance.currentUser);
  }

  function getUser() {
    if (!authInstance || !authInstance.currentUser) return null;
    return {
      uid: authInstance.currentUser.uid,
      email: authInstance.currentUser.email || ""
    };
  }

  function isConfiguredAdminEmail(email) {
    return canLoginWithRole(email);
  }

  function getStatus() {
    const config = getConfig();

    if (config.mode === "local") {
      return {
        mode: "local",
        provider: "localStorage",
        ready: false,
        authReady: false,
        authenticated: false,
        admin: false,
        message: "Modo local activo: datos guardados en este navegador."
      };
    }

    if (config.mode === "firebase") {
      const configured = hasFirebaseConfig();
      const user = getUser();

      if (!configured) {
        return {
          mode: "firebase",
          provider: "firebase",
          ready: false,
          authReady: false,
          authenticated: false,
          admin: false,
          message: "Firebase está seleccionado, pero faltan claves reales en js/backend-config.js."
        };
      }

      if (lastError) {
        return {
          mode: "firebase",
          provider: "firebase",
          ready: false,
          authReady: true,
          authenticated: Boolean(user),
          admin: user ? getUserRole(user.email) === "admin" : false,
          role: user ? getUserRole(user.email) : "none",
          userEmail: user ? user.email : "",
          message: "Firebase configurado, pero hubo un error: " + lastError
        };
      }

      return {
        mode: "firebase",
        provider: "firebase",
        ready: true,
        authReady: true,
        authenticated: Boolean(user),
        admin: user ? getUserRole(user.email) === "admin" : false,
        role: user ? getUserRole(user.email) : "none",
        userEmail: user ? user.email : "",
        message: user
          ? "Firebase configurado y sesión iniciada."
          : "Firebase configurado. Inicia sesión con Firebase Authentication."
      };
    }

    return {
      mode: config.mode || "unknown",
      provider: config.provider || "unknown",
      ready: false,
      authReady: false,
      authenticated: false,
      admin: false,
      message: "Proveedor online no reconocido."
    };
  }

  async function login(email, password) {
    const init = await initFirebase();
    if (!init.ok) return { ok: false, reason: init.reason };

    try {
      const credential = await firebaseModules.signInWithEmailAndPassword(authInstance, email, password);
      const userEmail = credential.user.email || "";

      if (!isConfiguredAdminEmail(userEmail)) {
        await firebaseModules.signOut(authInstance);
        return {
          ok: false,
          reason: "Este email no está en ninguna lista de roles de js/backend-config.js."
        };
      }

      lastError = "";
      return {
        ok: true,
        user: {
          uid: credential.user.uid,
          email: userEmail
        }
      };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, reason: lastError };
    }
  }

  async function logout() {
    const init = await initFirebase();
    if (!init.ok) return { ok: false, reason: init.reason };

    try {
      await firebaseModules.signOut(authInstance);
      return { ok: true };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, reason: lastError };
    }
  }

  async function resetPassword(email) {
    const init = await initFirebase();
    if (!init.ok) return { ok: false, reason: init.reason };

    try {
      await firebaseModules.sendPasswordResetEmail(authInstance, email);
      return { ok: true, message: "Email de recuperación enviado." };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, reason: lastError };
    }
  }

  async function requireAuth() {
    const init = await initFirebase();
    if (!init.ok) return { ok: false, reason: init.reason };

    if (!isAuthenticated()) {
      return { ok: false, reason: "Necesitas iniciar sesión con Firebase Authentication." };
    }

    return { ok: true };
  }

  async function loadCollection(key) {
    const init = await initFirebase();
    if (!init.ok) return { ok: false, mode: "local-fallback", reason: init.reason, data: null };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName(key);
      const snapshot = await m.getDocs(m.collection(firestoreDb, collectionName));
      const data = [];

      snapshot.forEach(function (docSnap) {
        data.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });

      return { ok: true, mode: "firebase", collection: collectionName, data };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError, data: null };
    }
  }

  async function saveCollection(key, items) {
    const auth = await requireAuth();
    if (!auth.ok) return { ok: false, mode: "auth-required", reason: auth.reason };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName(key);
      const safeItems = Array.isArray(items) ? items : [];

      await Promise.all(safeItems.map(function (item) {
        const id = item.id || crypto.randomUUID();
        const cleanItem = {
          ...item,
          id,
          updatedAt: new Date().toISOString()
        };

        return m.setDoc(m.doc(firestoreDb, collectionName, id), cleanItem, { merge: true });
      }));

      return { ok: true, mode: "firebase", collection: collectionName, count: safeItems.length };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function createPublicReservation(reserva) {
    const init = await initFirebase();
    if (!init.ok) return { ok: false, mode: "local-fallback", reason: init.reason };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("reservas");
      const id = reserva.id || crypto.randomUUID();
      const cleanReserva = {
        ...reserva,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await m.setDoc(m.doc(firestoreDb, collectionName, id), cleanReserva, { merge: true });

      return { ok: true, mode: "firebase", collection: collectionName, id };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function deleteItem(key, id) {
    const auth = await requireAuth();
    if (!auth.ok || !id) return { ok: false, mode: "auth-required", reason: auth.reason || "Sin ID" };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName(key);
      await m.deleteDoc(m.doc(firestoreDb, collectionName, id));
      return { ok: true, mode: "firebase", collection: collectionName, id };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function saveSettings(settings) {
    const auth = await requireAuth();
    if (!auth.ok) return { ok: false, mode: "auth-required", reason: auth.reason };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("settings");
      await m.setDoc(m.doc(firestoreDb, collectionName, "main"), {
        ...settings,
        id: "main",
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return { ok: true, mode: "firebase", collection: collectionName };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function loadSettings() {
    const result = await loadCollection("settings");
    if (!result.ok || !Array.isArray(result.data)) return result;

    const main = result.data.find(function (item) {
      return item.id === "main";
    }) || result.data[0] || null;

    return { ...result, data: main };
  }


  function getConfigCheck() {
    const config = getConfig();
    const firebaseConfig = config.firebaseConfig || {};
    const adminEmails = getAdminEmails();

    const checks = [
      {
        key: "mode",
        ok: config.mode === "firebase",
        level: config.mode === "firebase" ? "ok" : "warn",
        title: "Modo Firebase",
        text: config.mode === "firebase"
          ? "La web está en modo firebase."
          : "La web está en modo local. Funciona, pero no sincroniza online."
      },
      {
        key: "apiKey",
        ok: Boolean(firebaseConfig.apiKey && !String(firebaseConfig.apiKey).includes("PEGA_AQUI")),
        level: Boolean(firebaseConfig.apiKey && !String(firebaseConfig.apiKey).includes("PEGA_AQUI")) ? "ok" : "bad",
        title: "API Key",
        text: Boolean(firebaseConfig.apiKey && !String(firebaseConfig.apiKey).includes("PEGA_AQUI"))
          ? "API Key configurada."
          : "Falta pegar la API Key real de Firebase."
      },
      {
        key: "projectId",
        ok: Boolean(firebaseConfig.projectId && !String(firebaseConfig.projectId).includes("TU_PROYECTO")),
        level: Boolean(firebaseConfig.projectId && !String(firebaseConfig.projectId).includes("TU_PROYECTO")) ? "ok" : "bad",
        title: "Project ID",
        text: Boolean(firebaseConfig.projectId && !String(firebaseConfig.projectId).includes("TU_PROYECTO"))
          ? "Project ID configurado."
          : "Falta el Project ID real."
      },
      {
        key: "appId",
        ok: Boolean(firebaseConfig.appId && !String(firebaseConfig.appId).includes("000000")),
        level: Boolean(firebaseConfig.appId && !String(firebaseConfig.appId).includes("000000")) ? "ok" : "bad",
        title: "App ID",
        text: Boolean(firebaseConfig.appId && !String(firebaseConfig.appId).includes("000000"))
          ? "App ID configurado."
          : "Falta el App ID real."
      },
      {
        key: "auth",
        ok: Boolean(config.auth && config.auth.enabled),
        level: Boolean(config.auth && config.auth.enabled) ? "ok" : "warn",
        title: "Authentication",
        text: Boolean(config.auth && config.auth.enabled)
          ? "Auth está activado en la configuración."
          : "Auth no está activado en backend-config.js."
      },
      {
        key: "adminEmails",
        ok: Boolean(adminEmails.length && !adminEmails.includes("admin@alayaholistics.com")),
        level: Boolean(adminEmails.length && !adminEmails.includes("admin@alayaholistics.com")) ? "ok" : "warn",
        title: "Email admin",
        text: Boolean(adminEmails.length && !adminEmails.includes("admin@alayaholistics.com"))
          ? "Hay un email admin personalizado."
          : "Cambia admin@alayaholistics.com por el email real del administrador."
      }
    ];

    return {
      ok: checks.every(item => item.ok),
      mode: config.mode,
      ready: hasFirebaseConfig(),
      checks
    };
  }

  async function testConnection() {
    const init = await initFirebase();

    if (!init.ok) {
      return {
        ok: false,
        reason: init.reason || "No se pudo iniciar Firebase."
      };
    }

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("settings");
      await m.getDocs(m.collection(firestoreDb, collectionName));

      return {
        ok: true,
        message: "Conexión Firestore correcta."
      };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return {
        ok: false,
        reason: lastError
      };
    }
  }

  async function testAdminPermissions() {
    const auth = await requireAuth();

    if (!auth.ok) {
      return {
        ok: false,
        reason: auth.reason || "No hay sesión admin."
      };
    }

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("settings");
      const id = "permission_test";
      const ref = m.doc(firestoreDb, collectionName, id);

      await m.setDoc(ref, {
        id,
        test: true,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      await m.deleteDoc(ref);

      return {
        ok: true,
        message: "Permisos admin correctos: escritura y borrado funcionan."
      };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return {
        ok: false,
        reason: lastError
      };
    }
  }


  async function saveAuditEntry(entry) {
    const auth = await requireAuth();
    if (!auth.ok) return { ok: false, mode: "auth-required", reason: auth.reason };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("audit");
      const id = entry.id || crypto.randomUUID();
      const cleanEntry = {
        ...entry,
        id,
        onlineCreatedAt: new Date().toISOString()
      };

      await m.setDoc(m.doc(firestoreDb, collectionName, id), cleanEntry, { merge: true });

      return { ok: true, mode: "firebase", collection: collectionName, id };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function saveAuditLog(entries) {
    const auth = await requireAuth();
    if (!auth.ok) return { ok: false, mode: "auth-required", reason: auth.reason };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("audit");
      const safeEntries = Array.isArray(entries) ? entries : [];

      await Promise.all(safeEntries.map(function (entry) {
        const id = entry.id || crypto.randomUUID();
        const cleanEntry = {
          ...entry,
          id,
          onlineCreatedAt: entry.onlineCreatedAt || new Date().toISOString()
        };

        return m.setDoc(m.doc(firestoreDb, collectionName, id), cleanEntry, { merge: true });
      }));

      return { ok: true, mode: "firebase", collection: collectionName, count: safeEntries.length };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function loadAuditLog() {
    return loadCollection("audit");
  }

  async function testAuditWrite() {
    const entry = {
      id: "audit_test_" + Date.now(),
      type: "firebase",
      action: "Prueba auditoría online",
      detail: "Registro de prueba creado desde el panel admin.",
      actor: getUser()?.email || "admin",
      mode: "firebase",
      createdAt: new Date().toISOString()
    };

    return saveAuditEntry(entry);
  }


  async function saveAgendaBlock(block) {
    const auth = await requireAuth();
    if (!auth.ok) return { ok: false, mode: "auth-required", reason: auth.reason };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("blocks");
      const id = block.id || crypto.randomUUID();
      const cleanBlock = {
        ...block,
        id,
        onlineUpdatedAt: new Date().toISOString()
      };

      await m.setDoc(m.doc(firestoreDb, collectionName, id), cleanBlock, { merge: true });

      return { ok: true, mode: "firebase", collection: collectionName, id };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function saveAgendaBlocks(blocks) {
    const auth = await requireAuth();
    if (!auth.ok) return { ok: false, mode: "auth-required", reason: auth.reason };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("blocks");
      const safeBlocks = Array.isArray(blocks) ? blocks : [];

      await Promise.all(safeBlocks.map(function (block) {
        const id = block.id || crypto.randomUUID();
        const cleanBlock = {
          ...block,
          id,
          onlineUpdatedAt: new Date().toISOString()
        };

        return m.setDoc(m.doc(firestoreDb, collectionName, id), cleanBlock, { merge: true });
      }));

      return { ok: true, mode: "firebase", collection: collectionName, count: safeBlocks.length };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function loadAgendaBlocks() {
    return loadCollection("blocks");
  }

  async function deleteAgendaBlock(id) {
    const auth = await requireAuth();
    if (!auth.ok || !id) return { ok: false, mode: "auth-required", reason: auth.reason || "Sin ID" };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("blocks");
      await m.deleteDoc(m.doc(firestoreDb, collectionName, id));
      return { ok: true, mode: "firebase", collection: collectionName, id };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function testAgendaBlockWrite() {
    const testBlock = {
      id: "block_test_" + Date.now(),
      fecha: new Date().toISOString().slice(0, 10),
      hora: "09:00",
      motivo: "Prueba de bloqueo online",
      createdAt: new Date().toISOString(),
      onlineSynced: true
    };

    const saveResult = await saveAgendaBlock(testBlock);
    if (!saveResult.ok) return saveResult;

    const deleteResult = await deleteAgendaBlock(testBlock.id);
    if (!deleteResult.ok) return deleteResult;

    return {
      ok: true,
      mode: "firebase",
      message: "Bloqueos online correctos: escritura y borrado funcionan."
    };
  }


  async function saveNotification(notification) {
    const auth = await requireAuth();
    if (!auth.ok) return { ok: false, mode: "auth-required", reason: auth.reason };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("notifications");
      const id = notification.id || crypto.randomUUID();
      const cleanNotification = {
        ...notification,
        id,
        onlineUpdatedAt: new Date().toISOString()
      };

      await m.setDoc(m.doc(firestoreDb, collectionName, id), cleanNotification, { merge: true });

      return { ok: true, mode: "firebase", collection: collectionName, id };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function saveNotifications(notifications) {
    const auth = await requireAuth();
    if (!auth.ok) return { ok: false, mode: "auth-required", reason: auth.reason };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("notifications");
      const safeNotifications = Array.isArray(notifications) ? notifications : [];

      await Promise.all(safeNotifications.map(function (notification) {
        const id = notification.id || crypto.randomUUID();
        const cleanNotification = {
          ...notification,
          id,
          onlineUpdatedAt: new Date().toISOString()
        };

        return m.setDoc(m.doc(firestoreDb, collectionName, id), cleanNotification, { merge: true });
      }));

      return { ok: true, mode: "firebase", collection: collectionName, count: safeNotifications.length };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function loadNotifications() {
    return loadCollection("notifications");
  }

  async function deleteNotificationOnline(id) {
    const auth = await requireAuth();
    if (!auth.ok || !id) return { ok: false, mode: "auth-required", reason: auth.reason || "Sin ID" };

    try {
      const m = firebaseModules;
      const collectionName = getCollectionName("notifications");
      await m.deleteDoc(m.doc(firestoreDb, collectionName, id));
      return { ok: true, mode: "firebase", collection: collectionName, id };
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
      return { ok: false, mode: "firebase", reason: lastError };
    }
  }

  async function testNotificationWrite() {
    const testNotification = {
      id: "notification_test_" + Date.now(),
      type: "sistema",
      title: "Prueba de notificación online",
      detail: "Registro de prueba creado desde el panel admin.",
      read: false,
      createdAt: new Date().toISOString(),
      onlineSynced: true
    };

    const saveResult = await saveNotification(testNotification);
    if (!saveResult.ok) return saveResult;

    const deleteResult = await deleteNotificationOnline(testNotification.id);
    if (!deleteResult.ok) return deleteResult;

    return {
      ok: true,
      mode: "firebase",
      message: "Notificaciones online correctas: escritura y borrado funcionan."
    };
  }

  window.AlayaCloud = {
    getStatus,
    getRoleEmails,
    getUserRole,
    getConfigCheck,
    testConnection,
    testAdminPermissions,
    initFirebase,
    login,
    logout,
    resetPassword,
    requireAuth,
    isAuthenticated,
    getUser,
    loadCollection,
    saveCollection,
    createPublicReservation,
    saveAuditEntry,
    saveAuditLog,
    loadAuditLog,
    testAuditWrite,
    saveAgendaBlock,
    saveAgendaBlocks,
    loadAgendaBlocks,
    deleteAgendaBlock,
    testAgendaBlockWrite,
    saveNotification,
    saveNotifications,
    loadNotifications,
    deleteNotificationOnline,
    testNotificationWrite,
    deleteItem,
    saveSettings,
    loadSettings
  };
})();
