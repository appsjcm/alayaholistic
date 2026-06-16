// ======================================================
// ALAYA HOLISTICS · WEB ESTÁTICA COMPLETA
// Panel admin básico con localStorage
// Cambia aquí tus datos reales:
// ======================================================

let appSettings = JSON.parse(localStorage.getItem("alaya_settings")) || {
  businessName: "Alaya Holistics",
  tagline: "Un espacio para reconectar contigo",
  whatsapp: "34600000000",
  email: "reservas@alayaholistics.com",
  adminUser: "admin",
  adminPass: "alaya2026",
  availability: {
    openDays: ["1", "2", "3", "4", "5"],
    openStart: "10:00",
    openEnd: "20:00",
    slotMinutes: 60,
    maxPerSlot: 1,
    closedDates: []
  },
  serviceTemplates: {},
  branding: {
    preset: "cosmic",
    accent: "#c77dff",
    accent2: "#ffb3ec",
    accent3: "#b7f7e7"
  }
};

const DEFAULT_MESSAGE_TEMPLATES = {
  confirmacion: `Hola {nombre}, tu reserva en {negocio} está confirmada.

Código: {codigo}
Servicio / evento: {servicio}
Fecha: {fecha}
Hora: {hora}

Gracias por confiar en nosotros.`,

  cancelacion: `Hola {nombre}, te escribimos de {negocio}.

Tu reserva {codigo} para {servicio} queda cancelada.

Fecha: {fecha}
Hora: {hora}

Si quieres buscar otra fecha, respóndenos por aquí. Gracias.`,

  recordatorio: `Hola {nombre}, te recordamos tu reserva en {negocio}.

Código: {codigo}
Servicio / evento: {servicio}
Fecha: {fecha}
Hora: {hora}

Si necesitas cambiarla, respóndenos por aquí. Gracias.`,

  adminReserva: `Nueva reserva para {negocio}

Código:
{codigo}

Tipo:
{tipo}

Servicio / evento:
{servicio}

Fecha:
{fecha}

Hora:
{hora}

Disponibilidad:
{disponibilidad}

Datos de la persona:
Nombre: {nombre}
Teléfono: {telefono}
Email: {email}

Mensaje:
{mensaje}`
};

function getMessageTemplates() {
  return {
    ...DEFAULT_MESSAGE_TEMPLATES,
    ...(appSettings.messageTemplates || {})
  };
}



const DEFAULT_BRANDING = {
  preset: "cosmic",
  accent: "#c77dff",
  accent2: "#ffb3ec",
  accent3: "#b7f7e7",
  heroEyebrow: "Tarot · Reiki · Herbolario · Energía",
  heroPill: "Agenda abierta",
  heroDescription: "En Alaya Holistics encontrarás lectura de cartas, tarot, reiki, consultas energéticas, herbolario y talleres para acompañarte con calma, intuición y cuidado.",
  primaryCta: "Reservar cita",
  secondaryCta: "Ver servicios",
  badge1: "Horas concertadas",
  badge2: "Atención personalizada",
  badge3: "Talleres y cursos",
  cardLabel: "Reserva premium",
  cardTitle: "Tu momento empieza aquí",
  cardText: "Reserva por WhatsApp o email. Elige servicio, horario preferido y deja tu mensaje.",
  cardCta: "Quiero reservar"
};

function getBrandingSettings() {
  return {
    ...DEFAULT_BRANDING,
    ...(appSettings.branding || {})
  };
}

function getPresetColors(preset) {
  return {
    cosmic: {
      accent: "#c77dff",
      accent2: "#ffb3ec",
      accent3: "#b7f7e7"
    },
    herbal: {
      accent: "#5dcd87",
      accent2: "#dac47b",
      accent3: "#b8f2d0"
    },
    sunrise: {
      accent: "#ff9f5d",
      accent2: "#ff71a3",
      accent3: "#ffe2a8"
    },
    ocean: {
      accent: "#3ecfd7",
      accent2: "#6d8fff",
      accent3: "#bfefff"
    },
    custom: {}
  }[preset || "cosmic"] || {};
}

function getAdminConfig() {
  return {
    user: appSettings.adminUser || "admin",
    pass: appSettings.adminPass || "alaya2026"
  };
}

function getAdminWhatsapp() {
  return (appSettings.whatsapp || "34600000000").replace(/\D/g, "");
}

function getAdminEmail() {
  return appSettings.email || "reservas@alayaholistics.com";
}

// ======================================================
// Datos iniciales
// ======================================================

let defaultServices = JSON.parse(localStorage.getItem("alaya_services")) || [
  {
    id: "tarot",
    icon: "☾",
    title: "Tarot",
    category: "lecturas",
    duration: "Consulta personalizada",
    price: "Consultar",
    featured: true,
    tags: ["orientación", "intuición", "decisiones"],
    description: "Lectura simbólica e intuitiva para revisar energía, decisiones, bloqueos y caminos posibles.",
    benefits: "Aporta claridad, orden interno y una mirada simbólica sobre el momento actual.",
    preparation: "Ven con una pregunta o tema principal. No hace falta experiencia previa."
  },
  {
    id: "cartas",
    icon: "✦",
    title: "Lectura de cartas",
    category: "lecturas",
    duration: "Sesión con hora concertada",
    price: "Consultar",
    featured: false,
    tags: ["cartas", "emocional", "laboral"],
    description: "Interpretación cercana de cartas para orientación personal, emocional, laboral o espiritual.",
    benefits: "Ideal para enfocar situaciones concretas y recibir una lectura cercana y práctica.",
    preparation: "Piensa el tema que quieres trabajar y reserva un espacio tranquilo."
  },
  {
    id: "reiki",
    icon: "✧",
    title: "Reiki",
    category: "energia",
    duration: "Sesión energética",
    price: "Consultar",
    featured: true,
    tags: ["calma", "energía", "equilibrio"],
    description: "Espacio de calma y equilibrio para liberar tensión, armonizar energía y reconectar contigo.",
    benefits: "Favorece relajación, escucha interior y sensación de bienestar.",
    preparation: "Acude con ropa cómoda y evita prisas antes y después de la sesión."
  },
  {
    id: "cuantim",
    icon: "∞",
    title: "Cuantim",
    category: "energia",
    duration: "Consulta energética",
    price: "Consultar",
    featured: false,
    tags: ["vibracional", "energía", "acompañamiento"],
    description: "Acompañamiento holístico enfocado en energía, bienestar interior y lectura vibracional.",
    benefits: "Acompaña procesos personales desde una mirada energética y simbólica.",
    preparation: "Trae una intención clara o el área de vida que quieras revisar."
  },
  {
    id: "acompanamiento",
    icon: "✺",
    title: "Acompañamiento holístico",
    category: "bienestar",
    duration: "Sesión personalizada",
    price: "Consultar",
    featured: false,
    tags: ["bienestar", "autocuidado", "proceso"],
    description: "Sesión flexible para combinar orientación, escucha, energía y herramientas de autocuidado.",
    benefits: "Útil cuando no sabes qué servicio elegir y necesitas una sesión adaptada.",
    preparation: "Explica tu situación al reservar para adaptar mejor la experiencia."
  },
  {
    id: "talleres",
    icon: "♢",
    title: "Talleres y cursos",
    category: "aprendizaje",
    duration: "Agenda mensual",
    price: "Según actividad",
    featured: false,
    tags: ["formación", "grupo", "aprendizaje"],
    description: "Formaciones de tarot, reiki, astrología, herbolario, rituales y crecimiento personal.",
    benefits: "Aprendizaje práctico, acompañamiento grupal y herramientas para tu camino.",
    preparation: "Consulta agenda, plazas disponibles y material necesario."
  }
];

let eventos = JSON.parse(localStorage.getItem("alaya_eventos")) || [
  {
    id: crypto.randomUUID(),
    titulo: "Taller de Tarot Intuitivo",
    fecha: "2026-07-05",
    hora: "18:00",
    precio: "25€",
    descripcion: "Aprende a conectar con las cartas desde la intuición, el simbolismo y la energía personal."
  },
  {
    id: crypto.randomUUID(),
    titulo: "Curso de Reiki Nivel 1",
    fecha: "2026-07-12",
    hora: "10:00",
    precio: "Consultar",
    descripcion: "Formación inicial para descubrir la energía Reiki y sus bases de práctica."
  },
  {
    id: crypto.randomUUID(),
    titulo: "Encuentro de Herbolario Energético",
    fecha: "2026-07-19",
    hora: "11:30",
    precio: "18€",
    descripcion: "Taller práctico sobre plantas, aromas, intención y pequeños rituales de autocuidado."
  }
];

let productos = JSON.parse(localStorage.getItem("alaya_productos")) || [
  {
    id: crypto.randomUUID(),
    nombre: "Pack calma herbal",
    precio: "Consultar",
    categoria: "packs",
    stock: "Disponible",
    icono: "🌿",
    etiquetas: ["calma", "descanso", "autocuidado"],
    destacado: true,
    formato: "Pack",
    ingredientes: "Contenido variable según disponibilidad.",
    notas: "Consulta disponibilidad antes de comprar.",
    descripcion: "Selección de productos naturales para rituales de descanso, armonía y autocuidado.",
    uso: "Ideal para acompañar rutinas de relajación, meditación o momentos de pausa."
  },
  {
    id: crypto.randomUUID(),
    nombre: "Velas rituales",
    precio: "Desde 4€",
    categoria: "velas",
    stock: "Consultar",
    icono: "🕯️",
    etiquetas: ["ritual", "intención", "limpieza"],
    destacado: false,
    formato: "Unidad",
    ingredientes: "Velas seleccionadas según disponibilidad.",
    notas: "No dejar velas encendidas sin supervisión.",
    descripcion: "Velas para intención, limpieza energética, meditación y espacios de calma.",
    uso: "Consultar color e intención disponible antes de reservar o comprar."
  },
  {
    id: crypto.randomUUID(),
    nombre: "Minerales y amuletos",
    precio: "Consultar",
    categoria: "minerales",
    stock: "Bajo pedido",
    icono: "💎",
    etiquetas: ["energía", "amuletos", "decoración"],
    destacado: false,
    formato: "Pieza",
    ingredientes: "Minerales y piezas variables.",
    notas: "Producto decorativo/energético, no sanitario.",
    descripcion: "Piezas seleccionadas para acompañamiento energético, decoración y rituales personales.",
    uso: "Cada pieza puede variar. Pregunta por disponibilidad y recomendación personalizada."
  },
  {
    id: crypto.randomUUID(),
    nombre: "Infusión bienestar diario",
    precio: "Consultar",
    categoria: "infusiones",
    stock: "Disponible",
    icono: "🍵",
    etiquetas: ["infusión", "bienestar", "rutina"],
    destacado: false,
    formato: "Consultar",
    ingredientes: "Mezclas variables según disponibilidad.",
    notas: "No sustituye consejo profesional sanitario.",
    descripcion: "Mezclas suaves para acompañar hábitos de calma y autocuidado diario.",
    uso: "Consulta ingredientes disponibles y modo de preparación recomendado."
  }
];

const HERB_CATEGORIES = [
  { id: "todos", label: "Todo" },
  { id: "infusiones", label: "Infusiones" },
  { id: "plantas", label: "Plantas" },
  { id: "aromas", label: "Aromas" },
  { id: "minerales", label: "Minerales" },
  { id: "velas", label: "Velas" },
  { id: "packs", label: "Packs" },
  { id: "complementos", label: "Complementos" }
];

let selectedHerbCategory = "todos";
let reservas = JSON.parse(localStorage.getItem("alaya_reservas")) || [];
let editingServicioId = null;
let editingEventoId = null;
let editingProductoId = null;
let reservaEventoActualId = null;

// ======================================================
// Selectores
// ======================================================

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const servicesGrid = $("#servicesGrid");
const serviceSearch = $("#serviceSearch");
const serviceCategoryFilters = $("#serviceCategoryFilters");
const serviceHighlights = $("#serviceHighlights");
const featuredService = $("#featuredService");
const serviceDetailModal = $("#serviceDetailModal");
const serviceDetailContent = $("#serviceDetailContent");
const closeServiceDetailModal = $("#closeServiceDetailModal");
const bookingService = $("#bookingService");
const eventosGrid = $("#eventosGrid");
const eventSearch = $("#eventSearch");
const eventLevelFilter = $("#eventLevelFilter");
const eventStatusFilter = $("#eventStatusFilter");
const clearEventFiltersBtn = $("#clearEventFiltersBtn");
const eventCategoryFilters = $("#eventCategoryFilters");
const eventHighlights = $("#eventHighlights");
const featuredEvent = $("#featuredEvent");
const eventDetailModal = $("#eventDetailModal");
const eventDetailContent = $("#eventDetailContent");
const closeEventDetailModal = $("#closeEventDetailModal");
const productsGrid = $("#productsGrid");
const herbSearch = $("#herbSearch");
const herbStockFilter = $("#herbStockFilter");
const clearHerbFiltersBtn = $("#clearHerbFiltersBtn");
const herbCategoryFilters = $("#herbCategoryFilters");
const herbolarioHighlights = $("#herbolarioHighlights");
const featuredHerbProduct = $("#featuredHerbProduct");
const productDetailModal = $("#productDetailModal");
const productDetailContent = $("#productDetailContent");
const closeProductDetailModal = $("#closeProductDetailModal");
const herbolarioWhatsappBtn = $("#herbolarioWhatsappBtn");
const toast = $("#toast");

const adminModal = $("#adminModal");
const closeAdminBtn = $("#closeAdminBtn");
const adminLoginBox = $("#adminLoginBox");
const adminPanel = $("#adminPanel");
const adminLoginError = $("#adminLoginError");

const adminUser = $("#adminUser");
const adminPass = $("#adminPass");
const loginAdminBtn = $("#loginAdminBtn");
const resetFirebasePasswordBtn = $("#resetFirebasePasswordBtn");
const lockAdminBtn = $("#lockAdminBtn");
const logoutAdminBtn = $("#logoutAdminBtn");

const servicioTitulo = $("#servicioTitulo");
const servicioIcono = $("#servicioIcono");
const servicioCategoria = $("#servicioCategoria");
const servicioDuracion = $("#servicioDuracion");
const servicioPrecio = $("#servicioPrecio");
const servicioDestacado = $("#servicioDestacado");
const servicioEtiquetas = $("#servicioEtiquetas");
const servicioDescripcion = $("#servicioDescripcion");
const servicioBeneficios = $("#servicioBeneficios");
const servicioPreparacion = $("#servicioPreparacion");
const guardarServicioBtn = $("#guardarServicioBtn");
const adminServiciosList = $("#adminServiciosList");

const eventoTitulo = $("#eventoTitulo");
const eventoIcono = $("#eventoIcono");
const eventoCategoria = $("#eventoCategoria");
const eventoNivel = $("#eventoNivel");
const eventoFecha = $("#eventoFecha");
const eventoHora = $("#eventoHora");
const eventoPrecio = $("#eventoPrecio");
const eventoPlazas = $("#eventoPlazas");
const eventoFormato = $("#eventoFormato");
const eventoUbicacion = $("#eventoUbicacion");
const eventoEtiquetas = $("#eventoEtiquetas");
const eventoDestacado = $("#eventoDestacado");
const eventoDescripcion = $("#eventoDescripcion");
const eventoTemario = $("#eventoTemario");
const eventoMaterial = $("#eventoMaterial");
const eventoNotas = $("#eventoNotas");
const guardarEventoBtn = $("#guardarEventoBtn");
const adminEventosList = $("#adminEventosList");

const productoNombre = $("#productoNombre");
const productoPrecio = $("#productoPrecio");
const productoCategoria = $("#productoCategoria");
const productoStock = $("#productoStock");
const productoIcono = $("#productoIcono");
const productoFormato = $("#productoFormato");
const productoEtiquetas = $("#productoEtiquetas");
const productoDestacado = $("#productoDestacado");
const productoDescripcion = $("#productoDescripcion");
const productoUso = $("#productoUso");
const productoIngredientes = $("#productoIngredientes");
const productoNotas = $("#productoNotas");
const guardarProductoBtn = $("#guardarProductoBtn");
const adminProductosList = $("#adminProductosList");

const adminReservasList = $("#adminReservasList");
const reservationSearch = $("#reservationSearch");
const reservationStatusFilter = $("#reservationStatusFilter");
const auditSearch = $("#auditSearch");
const auditTypeFilter = $("#auditTypeFilter");
const auditSummaryGrid = $("#auditSummaryGrid");
const auditLogList = $("#auditLogList");

const settingBusinessName = $("#settingBusinessName");
const settingTagline = $("#settingTagline");
const settingWhatsapp = $("#settingWhatsapp");
const settingEmail = $("#settingEmail");
const settingAdminUser = $("#settingAdminUser");
const settingAdminPass = $("#settingAdminPass");
const settingOpenDays = $("#settingOpenDays");
const settingOpenStart = $("#settingOpenStart");
const settingOpenEnd = $("#settingOpenEnd");
const settingSlotMinutes = $("#settingSlotMinutes");
const settingMaxPerSlot = $("#settingMaxPerSlot");
const settingClosedDates = $("#settingClosedDates");
const settingBrandPreset = $("#settingBrandPreset");
const settingBrandAccent = $("#settingBrandAccent");
const settingBrandAccent2 = $("#settingBrandAccent2");
const settingBrandAccent3 = $("#settingBrandAccent3");
const settingHeroEyebrow = $("#settingHeroEyebrow");
const settingHeroPill = $("#settingHeroPill");
const settingHeroDescription = $("#settingHeroDescription");
const settingPrimaryCta = $("#settingPrimaryCta");
const settingSecondaryCta = $("#settingSecondaryCta");
const settingHeroBadge1 = $("#settingHeroBadge1");
const settingHeroBadge2 = $("#settingHeroBadge2");
const settingHeroBadge3 = $("#settingHeroBadge3");
const settingCardTitle = $("#settingCardTitle");
const settingCardText = $("#settingCardText");
const previewBrandingBtn = $("#previewBrandingBtn");
const resetBrandingBtn = $("#resetBrandingBtn");
const settingTplConfirmacion = $("#settingTplConfirmacion");
const settingTplCancelacion = $("#settingTplCancelacion");
const settingTplRecordatorio = $("#settingTplRecordatorio");
const settingTplAdminReserva = $("#settingTplAdminReserva");
const resetMessageTemplatesBtn = $("#resetMessageTemplatesBtn");
const messageTemplatePreview = $("#messageTemplatePreview");
const serviceTemplateSelect = $("#serviceTemplateSelect");
const serviceTplConfirmacion = $("#serviceTplConfirmacion");
const serviceTplCancelacion = $("#serviceTplCancelacion");
const serviceTplRecordatorio = $("#serviceTplRecordatorio");
const saveServiceTemplateBtn = $("#saveServiceTemplateBtn");
const previewServiceTemplateBtn = $("#previewServiceTemplateBtn");
const resetServiceTemplateBtn = $("#resetServiceTemplateBtn");
const serviceTemplatePreview = $("#serviceTemplatePreview");
const availabilityHint = $("#availabilityHint");
const availabilitySlots = $("#availabilitySlots");
const availabilityPreview = $("#availabilityPreview");
const guardarAjustesBtn = $("#guardarAjustesBtn");
const exportDataBtn = $("#exportDataBtn");
const downloadReservasCsvBtn = $("#downloadReservasCsvBtn");
const importDataInput = $("#importDataInput");
const installPwaBtn = $("#installPwaBtn");

const reservaModal = $("#reservaModal");
const closeReservaBtn = $("#closeReservaBtn");
const reservaEventoInfo = $("#reservaEventoInfo");
const reservaNombre = $("#reservaNombre");
const reservaTelefono = $("#reservaTelefono");
const reservaEmail = $("#reservaEmail");
const reservaMensaje = $("#reservaMensaje");
const reservaConsent = $("#reservaConsent");
const bookingConsent = $("#bookingConsent");
const reservationProSummary = $("#reservationProSummary");
const calendarMonthTitle = $("#calendarMonthTitle");
const calendarGrid = $("#calendarGrid");
const calendarDayTitle = $("#calendarDayTitle");
const calendarDaySummary = $("#calendarDaySummary");
const calendarDayList = $("#calendarDayList");
const blockDate = $("#blockDate");
const blockTime = $("#blockTime");
const blockReason = $("#blockReason");
const saveBlockBtn = $("#saveBlockBtn");
const blocksList = $("#blocksList");
const blockedSlotHint = $("#blockedSlotHint");
const blockOnlineStatus = $("#blockOnlineStatus");
const adminRoleBadge = $("#adminRoleBadge");
const roleStatusLog = $("#roleStatusLog");
const roleGuardMatrix = $("#roleGuardMatrix");
const roleGuardStatus = $("#roleGuardStatus");
const adminNotificationBadge = $("#adminNotificationBadge");
const notificationSummary = $("#notificationSummary");
const notificationList = $("#notificationList");
const browserNotificationStatus = $("#browserNotificationStatus");
const notificationOnlineStatus = $("#notificationOnlineStatus");
const enviarReservaWhatsappBtn = $("#enviarReservaWhatsappBtn");
const enviarReservaEmailBtn = $("#enviarReservaEmailBtn");

// ======================================================
// Utilidades
// ======================================================

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2600);
}

function saveEventos() {
  localStorage.setItem("alaya_eventos", JSON.stringify(eventos));
}

function saveProductos() {
  localStorage.setItem("alaya_productos", JSON.stringify(productos));
}

function normalizeProduct(producto = {}) {
  const etiquetas = Array.isArray(producto.etiquetas)
    ? producto.etiquetas
    : String(producto.etiquetas || "")
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);

  return {
    id: producto.id || crypto.randomUUID(),
    nombre: producto.nombre || "Producto sin nombre",
    precio: producto.precio || "Consultar",
    categoria: producto.categoria || "complementos",
    stock: producto.stock || "Consultar",
    icono: producto.icono || "♧",
    formato: producto.formato || "",
    destacado: Boolean(producto.destacado),
    etiquetas,
    descripcion: producto.descripcion || "",
    uso: producto.uso || "",
    ingredientes: producto.ingredientes || "",
    notas: producto.notas || ""
  };
}

function normalizeProductos() {
  productos = productos.map(normalizeProduct);
  localStorage.setItem("alaya_productos", JSON.stringify(productos));
}

function getCategoryLabel(id) {
  return HERB_CATEGORIES.find(item => item.id === id)?.label || "Complementos";
}

function getFilteredProductos() {
  const query = (herbSearch?.value || "").toLowerCase().trim();

  return productos
    .map(normalizeProduct)
    .filter(producto => {
      const matchesCategory = selectedHerbCategory === "todos" || producto.categoria === selectedHerbCategory;
      const matchesStock = !herbStockFilter?.value || producto.stock === herbStockFilter.value;
      const haystack = [
        producto.nombre,
        producto.descripcion,
        producto.uso,
        producto.precio,
        producto.stock,
        producto.categoria,
        ...(producto.etiquetas || [])
      ].join(" ").toLowerCase();

      return matchesCategory && matchesStock && (!query || haystack.includes(query));
    });
}

function saveReservas() {
  localStorage.setItem("alaya_reservas", JSON.stringify(reservas));
}

function formatFecha(fecha) {
  if (!fecha) return "Fecha pendiente";
  const date = new Date(fecha + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}




function saveAgendaBlocks() {
  localStorage.setItem("alaya_agenda_blocks", JSON.stringify(agendaBlocks));
  renderBlockOnlineStatus();
}

function renderBlockOnlineStatus(message = "") {
  if (!blockOnlineStatus) return;

  const status = window.AlayaCloud?.getStatus?.();
  const synced = agendaBlocks.filter(item => item.onlineSynced).length;
  const pending = agendaBlocks.length - synced;

  if (!status?.ready) {
    blockOnlineStatus.textContent = "Bloqueos online: Firebase no configurado.";
    return;
  }

  if (!status.authenticated || !status.admin) {
    blockOnlineStatus.textContent = `Bloqueos online: inicia sesión admin Firebase. Pendientes locales: ${pending}.`;
    return;
  }

  blockOnlineStatus.textContent = message || `Bloqueos online preparados. Sincronizados: ${synced}. Pendientes: ${pending}.`;
}

async function syncSingleAgendaBlockOnline(block) {
  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status?.authenticated || !status?.admin) {
    return { ok: false, reason: "Bloqueos online requieren sesión admin Firebase." };
  }

  if (!window.AlayaCloud?.saveAgendaBlock) {
    return { ok: false, reason: "saveAgendaBlock no disponible." };
  }

  const result = await window.AlayaCloud.saveAgendaBlock(block);

  if (result.ok) {
    agendaBlocks = agendaBlocks.map(item => item.id === block.id ? { ...item, onlineSynced: true } : item);
    localStorage.setItem("alaya_agenda_blocks", JSON.stringify(agendaBlocks));
    renderBlockOnlineStatus("Último bloqueo enviado a Firestore.");
  }

  return result;
}

async function syncBlocksOnline() {
  if (!requireAdminAccess("subir bloqueos online")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || !status.admin) {
    renderBlockOnlineStatus();
    showToast("Necesitas Firebase admin.");
    return;
  }

  const result = await window.AlayaCloud?.saveAgendaBlocks?.(agendaBlocks);

  if (result?.ok) {
    agendaBlocks = agendaBlocks.map(item => ({ ...item, onlineSynced: true }));
    saveAgendaBlocks();
    renderBlocksList();
    renderAdminCalendar();
    renderAvailableSlots();
    renderBlockOnlineStatus(`${result.count || agendaBlocks.length} bloqueos enviados a Firestore.`);
    addAuditLog("firebase", "Subir bloqueos online", `${result.count || agendaBlocks.length} bloqueos enviados.`);
    showToast("Bloqueos subidos online.");
  } else {
    renderBlockOnlineStatus(`Error subiendo bloqueos: ${result?.reason || "No especificado"}`);
    showToast("No se pudieron subir bloqueos.");
  }
}

async function loadBlocksOnline() {
  if (!requireAdminAccess("cargar bloqueos online")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || !status.admin) {
    renderBlockOnlineStatus();
    showToast("Necesitas Firebase admin.");
    return;
  }

  const result = await window.AlayaCloud?.loadAgendaBlocks?.();

  if (result?.ok && Array.isArray(result.data)) {
    const merged = [...result.data, ...agendaBlocks];
    const map = new Map();

    merged.forEach(item => {
      if (!item.id) item.id = crypto.randomUUID();
      map.set(item.id, { ...item, onlineSynced: Boolean(item.onlineSynced || item.onlineUpdatedAt) });
    });

    agendaBlocks = Array.from(map.values()).sort((a, b) => {
      return String(a.fecha + (a.hora || "")).localeCompare(String(b.fecha + (b.hora || "")));
    }).slice(0, 500);

    saveAgendaBlocks();
    renderBlocksList();
    renderAdminCalendar();
    renderAvailableSlots();
    renderAvailabilityHint();
    renderBlockOnlineStatus(`${result.data.length} bloqueos cargados desde Firestore.`);
    addAuditLog("firebase", "Cargar bloqueos online", `${result.data.length} bloqueos cargados.`);
    showToast("Bloqueos online cargados.");
  } else {
    renderBlockOnlineStatus(`Error cargando bloqueos: ${result?.reason || "No especificado"}`);
    showToast("No se pudieron cargar bloqueos.");
  }
}

async function testBlocksOnline() {
  if (!requireAdminAccess("probar bloqueos online")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || !status.admin) {
    renderBlockOnlineStatus();
    showToast("Necesitas Firebase admin.");
    return;
  }

  const result = await window.AlayaCloud?.testAgendaBlockWrite?.();

  if (result?.ok) {
    renderBlockOnlineStatus(result.message || "Prueba de bloqueos online correcta.");
    addAuditLog("firebase", "Probar bloqueos online", "Escritura y borrado de bloqueo correctos.");
    showToast("Bloqueos online OK.");
  } else {
    renderBlockOnlineStatus(`Error en bloqueos online: ${result?.reason || "No especificado"}`);
    showToast("Bloqueos online fallaron.");
  }
}



function isDateBlocked(fecha) {
  return agendaBlocks.some(block => block.fecha === fecha && !block.hora);
}

function isTimeBlocked(fecha, hora) {
  return agendaBlocks.some(block => block.fecha === fecha && (!block.hora || block.hora === hora));
}

function getBlocksForDate(fecha) {
  return agendaBlocks
    .filter(block => block.fecha === fecha)
    .sort((a, b) => String(a.hora || "").localeCompare(String(b.hora || "")));
}

function getBlockReason(fecha, hora = "") {
  const block = agendaBlocks.find(item => item.fecha === fecha && (!item.hora || item.hora === hora));
  return block?.motivo || "Bloqueado por agenda";
}

function renderBlockedSlotHint() {
  if (!blockedSlotHint) return;

  const fecha = $("#bookingDate")?.value || "";
  const hora = $("#bookingTime")?.value || "";

  if (!fecha) {
    blockedSlotHint.textContent = "";
    return;
  }

  const blocks = getBlocksForDate(fecha);

  if (!blocks.length) {
    blockedSlotHint.textContent = "";
    return;
  }

  const dayBlock = blocks.find(block => !block.hora);
  if (dayBlock) {
    blockedSlotHint.textContent = `Este día tiene bloqueo completo: ${dayBlock.motivo || "sin motivo indicado"}.`;
    return;
  }

  if (hora && isTimeBlocked(fecha, hora)) {
    blockedSlotHint.textContent = `La franja ${hora} está bloqueada: ${getBlockReason(fecha, hora)}.`;
    return;
  }

  blockedSlotHint.textContent = `Este día tiene ${blocks.length} franja(s) bloqueada(s).`;
}

function renderBlocksList() {
  if (!blocksList) return;

  if (!agendaBlocks.length) {
    blocksList.innerHTML = "<p>No hay bloqueos de agenda.</p>";
    return;
  }

  blocksList.innerHTML = agendaBlocks
    .slice()
    .sort((a, b) => String(a.fecha + (a.hora || "")).localeCompare(String(b.fecha + (b.hora || ""))))
    .map(block => `
      <div class="admin-item">
        <div>
          <strong>${formatFecha(block.fecha)} ${block.hora ? `· ${block.hora}` : "· Todo el día"}</strong>
          <span class="block-tag">${block.hora ? "Franja" : "Día completo"}</span>
        </div>
        <p><b>Motivo:</b> ${block.motivo || "Sin motivo"}</p>
        <p><b>Estado online:</b> <span class="${block.onlineSynced ? "block-online-mark" : "block-local-mark"}">${block.onlineSynced ? "Online" : "Local"}</span></p>
        <div class="admin-item-actions">
          <button class="btn btn-danger" onclick="deleteAgendaBlock('${block.id}')">Eliminar bloqueo</button>
        </div>
      </div>
    `).join("");
  applyRoleGuardUx();
}

function saveAgendaBlockFromAdmin() {
  if (!requireAdminAccess("guardar bloqueo de agenda")) return;

  const fecha = blockDate?.value || "";
  const hora = blockTime?.value || "";
  const motivo = blockReason?.value?.trim() || "Bloqueo manual";

  if (!fecha) {
    showToast("Selecciona una fecha para bloquear.");
    return;
  }

  const exists = agendaBlocks.some(block => block.fecha === fecha && (block.hora || "") === hora);

  if (exists) {
    showToast("Ese bloqueo ya existe.");
    return;
  }

  agendaBlocks.unshift({
    id: crypto.randomUUID(),
    fecha,
    hora,
    motivo,
    createdAt: new Date().toISOString()
  });

  saveAgendaBlocks();
  syncSingleAgendaBlockOnline(agendaBlocks[0]);
  renderBlocksList();
  renderAvailableSlots();
  renderAvailabilityHint();
  renderAdminCalendar();
  addAuditLog("data", "Guardar bloqueo agenda", `${fecha} ${hora || "todo el día"} · ${motivo}`);
  showToast("Bloqueo guardado.");
}

function deleteAgendaBlock(id) {
  if (!requireAdminAccess("eliminar bloqueo de agenda")) return;

  const block = agendaBlocks.find(item => item.id === id);
  agendaBlocks = agendaBlocks.filter(item => item.id !== id);
  window.AlayaCloud?.deleteAgendaBlock?.(id);
  saveAgendaBlocks();
  renderBlocksList();
  renderAvailableSlots();
  renderAvailabilityHint();
  renderAdminCalendar();
  addAuditLog("data", "Eliminar bloqueo agenda", block ? `${block.fecha} ${block.hora || "todo el día"}` : id);
  showToast("Bloqueo eliminado.");
}

function getAvailabilitySettings() {
  const availability = appSettings.availability || {};

  return {
    openDays: Array.isArray(availability.openDays) && availability.openDays.length
      ? availability.openDays.map(String)
      : ["1", "2", "3", "4", "5"],
    openStart: availability.openStart || "10:00",
    openEnd: availability.openEnd || "20:00",
    slotMinutes: Number(availability.slotMinutes || 60),
    maxPerSlot: Math.max(1, Number(availability.maxPerSlot || 1)),
    closedDates: Array.isArray(availability.closedDates) ? availability.closedDates : []
  };
}

function getDayName(day) {
  return {
    "0": "domingo",
    "1": "lunes",
    "2": "martes",
    "3": "miércoles",
    "4": "jueves",
    "5": "viernes",
    "6": "sábado"
  }[String(day)] || day;
}

function normalizeClosedDates(text) {
  return String(text || "")
    .split(/\n|,/)
    .map(item => item.trim())
    .filter(Boolean)
    .filter(item => /^\d{4}-\d{2}-\d{2}$/.test(item));
}


function timeToMinutes(time) {
  const [hour, minute] = String(time || "00:00").split(":").map(Number);
  return (hour * 60) + (minute || 0);
}

function minutesToTime(total) {
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function getReservationsForSlot(fecha, hora) {
  return reservas.filter(reserva => {
    return reserva.eventoFecha === fecha
      && reserva.eventoHora === hora
      && reserva.estado !== "Cancelada";
  });
}

function isSlotFull(fecha, hora) {
  const availability = getAvailabilitySettings();
  return getReservationsForSlot(fecha, hora).length >= availability.maxPerSlot;
}

function generateAvailableSlots(fecha) {
  const baseCheck = checkBookingAvailability(fecha, "");
  if (!fecha || !baseCheck.ok) return [];

  const availability = getAvailabilitySettings();
  const start = timeToMinutes(availability.openStart);
  const end = timeToMinutes(availability.openEnd);
  const step = Math.max(15, availability.slotMinutes || 60);
  const slots = [];

  for (let current = start; current <= end - step; current += step) {
    const hora = minutesToTime(current);
    const count = getReservationsForSlot(fecha, hora).length;
    const blocked = isTimeBlocked(fecha, hora);
    const full = count >= availability.maxPerSlot;

    slots.push({
      hora,
      count,
      max: availability.maxPerSlot,
      full,
      blocked
    });
  }

  return slots;
}

function renderAvailableSlots() {
  if (!availabilitySlots) return;

  const fecha = $("#bookingDate")?.value || "";
  const selectedTime = $("#bookingTime")?.value || "";

  if (!fecha) {
    availabilitySlots.innerHTML = "";
    return;
  }

  const slots = generateAvailableSlots(fecha);

  if (!slots.length) {
    availabilitySlots.innerHTML = `<div class="slot-empty">No hay franjas disponibles para esta fecha.</div>`;
    return;
  }

  availabilitySlots.innerHTML = slots.map(slot => `
    <button
      type="button"
      class="slot-btn ${slot.full ? "full" : ""} ${slot.blocked ? "blocked" : ""} ${selectedTime === slot.hora ? "selected" : ""}"
      ${slot.full || slot.blocked ? "disabled" : ""}
      onclick="selectAvailableSlot('${slot.hora}')"
    >
      ${slot.hora}
      <span class="slot-counter">${slot.count}/${slot.max}</span>
    </button>
  `).join("");
}

function selectAvailableSlot(hora) {
  const bookingTimeInput = $("#bookingTime");
  if (!bookingTimeInput) return;

  bookingTimeInput.value = hora;
  renderAvailabilityHint();
  renderAvailableSlots();
}

function checkBookingAvailability(fecha, hora) {
  const availability = getAvailabilitySettings();

  if (!fecha) {
    return {
      ok: true,
      level: "warn",
      message: "Puedes enviar la reserva sin fecha, pero el admin tendrá que confirmarla manualmente."
    };
  }

  const date = new Date(`${fecha}T12:00:00`);
  const day = String(date.getDay());

  if (availability.closedDates.includes(fecha)) {
    return {
      ok: false,
      level: "bad",
      message: `La fecha ${formatFecha(fecha)} está marcada como cerrada.`
    };
  }

  if (isDateBlocked(fecha)) {
    return {
      ok: false,
      level: "bad",
      message: `La fecha ${formatFecha(fecha)} está bloqueada: ${getBlockReason(fecha)}.`
    };
  }

  if (!availability.openDays.includes(day)) {
    return {
      ok: false,
      level: "bad",
      message: `Ese día es ${getDayName(day)} y no está marcado como día abierto.`
    };
  }

  if (hora && (hora < availability.openStart || hora > availability.openEnd)) {
    return {
      ok: false,
      level: "bad",
      message: `La hora debe estar entre ${availability.openStart} y ${availability.openEnd}.`
    };
  }

  if (hora && isTimeBlocked(fecha, hora)) {
    return {
      ok: false,
      level: "bad",
      message: `La franja ${hora} está bloqueada: ${getBlockReason(fecha, hora)}.`
    };
  }

  if (!hora) {
    return {
      ok: true,
      level: "warn",
      message: `Fecha disponible. Elige una franja entre ${availability.openStart} y ${availability.openEnd}.`
    };
  }

  if (isSlotFull(fecha, hora)) {
    const count = getReservationsForSlot(fecha, hora).length;
    return {
      ok: false,
      level: "bad",
      message: `La franja ${hora} ya está completa (${count}/${availability.maxPerSlot}).`
    };
  }

  const count = getReservationsForSlot(fecha, hora).length;

  return {
    ok: true,
    level: "ok",
    message: `Disponible: ${formatFecha(fecha)} a las ${hora}. Ocupación ${count}/${availability.maxPerSlot}.`
  };
}

function renderAvailabilityHint() {
  if (!availabilityHint) return;

  const fecha = $("#bookingDate")?.value || "";
  const hora = $("#bookingTime")?.value || "";
  const result = checkBookingAvailability(fecha, hora);

  availabilityHint.classList.remove("ok", "warn", "bad");
  availabilityHint.classList.add(result.level);
  availabilityHint.textContent = result.message;
  renderAvailableSlots();
  renderBlockedSlotHint();
}

function renderAvailabilityPreview() {
  if (!availabilityPreview) return;

  const availability = getAvailabilitySettings();
  const days = availability.openDays.map(getDayName).join(", ") || "sin días configurados";
  const closed = availability.closedDates.length
    ? availability.closedDates.map(formatFecha).join(", ")
    : "ninguna fecha cerrada";

  availabilityPreview.innerHTML = `
    <div><strong>Días abiertos:</strong> ${days}</div>
    <div><strong>Horario:</strong> ${availability.openStart} - ${availability.openEnd}</div>
    <div><strong>Franjas:</strong> cada ${availability.slotMinutes} minutos · máximo ${availability.maxPerSlot} reserva(s)</div>
    <div><strong>Fechas cerradas:</strong> ${closed}</div>
  `;
}



function normalizeTemplateKey(value = "") {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "servicio";
}

function getReservationServiceKey(reserva = {}) {
  return normalizeTemplateKey(reserva.eventoTitulo || reserva.servicio || "");
}

function getServiceTemplates() {
  return appSettings.serviceTemplates || {};
}

function getTemplatesForReservation(reserva = {}) {
  const general = getMessageTemplates();
  const key = getReservationServiceKey(reserva);
  const specific = getServiceTemplates()[key] || {};

  return {
    ...general,
    confirmacion: specific.confirmacion || general.confirmacion,
    cancelacion: specific.cancelacion || general.cancelacion,
    recordatorio: specific.recordatorio || general.recordatorio
  };
}

function getServices() {
  return defaultServices;
}

function renderServiceTemplateOptions() {
  if (!serviceTemplateSelect) return;

  const services = getServices();
  const current = serviceTemplateSelect.value;

  serviceTemplateSelect.innerHTML = services.map(service => {
    const key = normalizeTemplateKey(service.title);
    const hasCustom = Boolean(getServiceTemplates()[key]);
    return `<option value="${key}" data-title="${service.title}">${service.title}${hasCustom ? " · personalizada" : ""}</option>`;
  }).join("");

  if (current && [...serviceTemplateSelect.options].some(option => option.value === current)) {
    serviceTemplateSelect.value = current;
  }

  loadSelectedServiceTemplate();
}

function getSelectedServiceTemplateTitle() {
  const option = serviceTemplateSelect?.selectedOptions?.[0];
  return option?.dataset?.title || serviceTemplateSelect?.selectedOptions?.[0]?.textContent?.replace(" · personalizada", "") || "Servicio";
}

function loadSelectedServiceTemplate() {
  if (!serviceTemplateSelect) return;

  const key = serviceTemplateSelect.value;
  const custom = getServiceTemplates()[key] || {};

  if (serviceTplConfirmacion) serviceTplConfirmacion.value = custom.confirmacion || "";
  if (serviceTplCancelacion) serviceTplCancelacion.value = custom.cancelacion || "";
  if (serviceTplRecordatorio) serviceTplRecordatorio.value = custom.recordatorio || "";

  renderServiceTemplatePreview();
}

function saveSelectedServiceTemplate() {
  if (!requireAdminAccess("configuración crítica")) return;

  const key = serviceTemplateSelect?.value;
  if (!key) {
    showToast("Selecciona un servicio.");
    return;
  }

  const custom = {
    confirmacion: serviceTplConfirmacion?.value?.trim() || "",
    cancelacion: serviceTplCancelacion?.value?.trim() || "",
    recordatorio: serviceTplRecordatorio?.value?.trim() || ""
  };

  appSettings.serviceTemplates = appSettings.serviceTemplates || {};

  if (!custom.confirmacion && !custom.cancelacion && !custom.recordatorio) {
    delete appSettings.serviceTemplates[key];
  } else {
    appSettings.serviceTemplates[key] = custom;
  }

  localStorage.setItem("alaya_settings", JSON.stringify(appSettings));
  renderServiceTemplateOptions();
  renderServiceTemplatePreview();
  addAuditLog("data", "Guardar plantilla servicio", getSelectedServiceTemplateTitle());
  showToast("Plantilla del servicio guardada.");
}

function resetSelectedServiceTemplate() {
  if (!requireAdminAccess("configuración crítica")) return;

  const key = serviceTemplateSelect?.value;
  if (!key) return;
  if (!confirm("¿Borrar la plantilla personalizada de este servicio?")) return;

  appSettings.serviceTemplates = appSettings.serviceTemplates || {};
  delete appSettings.serviceTemplates[key];
  localStorage.setItem("alaya_settings", JSON.stringify(appSettings));

  renderServiceTemplateOptions();
  renderServiceTemplatePreview();
  addAuditLog("data", "Borrar plantilla servicio", getSelectedServiceTemplateTitle());
  showToast("Plantilla del servicio borrada.");
}

function renderServiceTemplatePreview() {
  if (!serviceTemplatePreview || !serviceTemplateSelect) return;

  const title = getSelectedServiceTemplateTitle();
  const sampleReserva = {
    codigo: "ALAYA-DEMO",
    tipo: "Servicio",
    eventoTitulo: title,
    eventoFecha: new Date().toISOString().slice(0, 10),
    eventoHora: "18:00",
    nombre: "Cliente Demo",
    telefono: "600000000",
    email: "cliente@demo.com",
    mensaje: "Me gustaría reservar una sesión."
  };

  const templates = {
    ...getTemplatesForReservation(sampleReserva),
    confirmacion: serviceTplConfirmacion?.value?.trim() || getMessageTemplates().confirmacion,
    cancelacion: serviceTplCancelacion?.value?.trim() || getMessageTemplates().cancelacion,
    recordatorio: serviceTplRecordatorio?.value?.trim() || getMessageTemplates().recordatorio
  };

  const data = buildReservationTemplateData(sampleReserva);

  serviceTemplatePreview.textContent = [
    `Servicio: ${title}`,
    "-------------------------",
    "CONFIRMACIÓN",
    applyMessageTemplate(templates.confirmacion, data),
    "",
    "CANCELACIÓN",
    applyMessageTemplate(templates.cancelacion, data),
    "",
    "RECORDATORIO",
    applyMessageTemplate(templates.recordatorio, data)
  ].join("\\n");
}

function buildReservationTemplateData(reserva = {}) {
  return {
    negocio: appSettings.businessName || "Alaya Holistics",
    codigo: reserva.codigo || "Sin código",
    tipo: reserva.tipo || "Reserva",
    servicio: reserva.eventoTitulo || reserva.servicio || "Reserva",
    fecha: reserva.eventoFecha ? formatFecha(reserva.eventoFecha) : "por confirmar",
    hora: reserva.eventoHora || "por confirmar",
    nombre: reserva.nombre || "Cliente",
    telefono: reserva.telefono || "No indicado",
    email: reserva.email || "No indicado",
    mensaje: reserva.mensaje || "Sin mensaje extra",
    disponibilidad: reserva.eventoFecha
      ? checkBookingAvailability(reserva.eventoFecha, reserva.eventoHora || "").message
      : "Fecha pendiente de confirmar"
  };
}

function applyMessageTemplate(template, data) {
  return String(template || "").replace(/\{(\w+)\}/g, (match, key) => {
    return data[key] ?? match;
  }).trim();
}

function buildAdminReservationMessage(reserva) {
  const templates = getMessageTemplates();
  return applyMessageTemplate(templates.adminReserva, buildReservationTemplateData(reserva));
}

function previewMessageTemplate(type) {
  if (!requireAdminAccess("configuración crítica")) return;

  const sampleReserva = {
    codigo: "ALAYA-DEMO",
    tipo: type === "adminReserva" ? "Servicio" : "Reserva",
    eventoTitulo: "Tarot intuitivo",
    eventoFecha: new Date().toISOString().slice(0, 10),
    eventoHora: "18:00",
    nombre: "Cliente Demo",
    telefono: "600000000",
    email: "cliente@demo.com",
    mensaje: "Me gustaría reservar una sesión."
  };

  const currentTemplates = {
    confirmacion: settingTplConfirmacion?.value || DEFAULT_MESSAGE_TEMPLATES.confirmacion,
    cancelacion: settingTplCancelacion?.value || DEFAULT_MESSAGE_TEMPLATES.cancelacion,
    recordatorio: settingTplRecordatorio?.value || DEFAULT_MESSAGE_TEMPLATES.recordatorio,
    adminReserva: settingTplAdminReserva?.value || DEFAULT_MESSAGE_TEMPLATES.adminReserva
  };

  const preview = applyMessageTemplate(currentTemplates[type], buildReservationTemplateData(sampleReserva));

  if (messageTemplatePreview) {
    messageTemplatePreview.textContent = preview;
  }
}

function resetMessageTemplates() {
  if (!requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Restaurar las plantillas por defecto?")) return;

  appSettings.messageTemplates = { ...DEFAULT_MESSAGE_TEMPLATES };
  fillSettingsForm();
  previewMessageTemplate("confirmacion");
  addAuditLog("data", "Restaurar plantillas", "Plantillas de mensajes restauradas por defecto.");
  showToast("Plantillas restauradas.");
}

function generateReservationCode() {
  const part = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ALAYA-${part}`;
}

function ensureReservationMeta(reserva) {
  const now = new Date().toISOString();

  return {
    codigo: reserva.codigo || generateReservationCode(),
    statusHistory: Array.isArray(reserva.statusHistory) && reserva.statusHistory.length
      ? reserva.statusHistory
      : [
          {
            estado: reserva.estado || "Pendiente",
            fecha: reserva.fechaReserva || now,
            actor: "sistema",
            detalle: "Reserva creada"
          }
        ],
    internalNote: reserva.internalNote || "",
    consent: reserva.consent ?? true,
    ...reserva
  };
}

function normalizeReservas() {
  reservas = reservas.map(ensureReservationMeta);
  localStorage.setItem("alaya_reservas", JSON.stringify(reservas));
}

function addReservationHistory(id, estado, detalle = "") {
  reservas = reservas.map(reserva => {
    if (reserva.id !== id) return reserva;

    const history = Array.isArray(reserva.statusHistory) ? reserva.statusHistory : [];

    return {
      ...reserva,
      estado,
      statusHistory: [
        {
          estado,
          fecha: new Date().toISOString(),
          actor: getAuditActor ? getAuditActor() : "admin",
          detalle
        },
        ...history
      ]
    };
  });
}

function buildClientMessage(reserva, type = "confirmacion") {
  const templates = getTemplatesForReservation(reserva);
  const template = templates[type] || getMessageTemplates()[type] || getMessageTemplates().confirmacion;
  return applyMessageTemplate(template, buildReservationTemplateData(reserva));
}

async function copyTextToClipboard(text, successMessage = "Texto copiado.") {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch (error) {
    showToast("No se pudo copiar el texto.");
  }
}

function buildWhatsappUrl(text) {
  return `https://wa.me/${getAdminWhatsapp()}?text=${encodeURIComponent(text)}`;
}

function buildEmailUrl(subject, body) {
  return `mailto:${getAdminEmail()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function saveSettings() {
  localStorage.setItem("alaya_settings", JSON.stringify(appSettings));

  const status = window.AlayaCloud?.getStatus?.();
  if (status?.ready) {
    window.AlayaCloud.saveSettings(appSettings).then(result => {
      if (result.ok) markLastSync("Subidos ajustes");
    });
  }
}

function applySettingsToPage() {
  document.title = `${appSettings.businessName || "Alaya Holistics"} · Tarot, Reiki y Herbolario`;

  const branding = getBrandingSettings();
  const presetColors = getPresetColors(branding.preset);

  const brandStrong = document.querySelector(".brand strong");
  const brandSmall = document.querySelector(".brand small");
  const heroEyebrow = document.querySelector(".hero .eyebrow");
  const livePill = document.querySelector(".live-pill");
  const heroTitle = document.querySelector(".hero h1");
  const heroText = document.querySelector(".hero-text");
  const heroPrimary = document.querySelector('.hero-actions .btn-primary');
  const heroSecondary = document.querySelector('.hero-actions .btn-secondary:not(#installPwaBtn)');
  const heroBadges = document.querySelectorAll(".hero-badges span");
  const cardLabel = document.querySelector(".modern-oracle-card .card-label");
  const cardTitle = document.querySelector(".modern-oracle-card h2");
  const cardText = document.querySelector(".modern-oracle-card p");
  const cardCta = document.querySelector(".modern-oracle-card .btn-glass");

  const businessName = appSettings.businessName || "Alaya Holistics";
  const nameParts = businessName.split(" ");

  if (brandStrong) brandStrong.textContent = nameParts[0] || "Alaya";
  if (brandSmall) brandSmall.textContent = nameParts.slice(1).join(" ") || "Holistics";
  if (heroEyebrow) heroEyebrow.textContent = branding.heroEyebrow;
  if (livePill) livePill.textContent = branding.heroPill;
  if (heroTitle) heroTitle.textContent = appSettings.tagline || "Un espacio para reconectar contigo";
  if (heroText) heroText.textContent = branding.heroDescription;
  if (heroPrimary) heroPrimary.textContent = branding.primaryCta;
  if (heroSecondary) heroSecondary.textContent = branding.secondaryCta;
  if (heroBadges[0]) heroBadges[0].textContent = branding.badge1;
  if (heroBadges[1]) heroBadges[1].textContent = branding.badge2;
  if (heroBadges[2]) heroBadges[2].textContent = branding.badge3;
  if (cardLabel) cardLabel.textContent = branding.cardLabel;
  if (cardTitle) cardTitle.textContent = branding.cardTitle;
  if (cardText) cardText.textContent = branding.cardText;
  if (cardCta) cardCta.textContent = branding.cardCta;

  document.body.classList.remove("branding-cosmic", "branding-herbal", "branding-sunrise", "branding-ocean");
  document.body.classList.add(`branding-${branding.preset || "cosmic"}`);

  document.documentElement.style.setProperty("--accent", branding.accent || presetColors.accent || DEFAULT_BRANDING.accent);
  document.documentElement.style.setProperty("--accent-2", branding.accent2 || presetColors.accent2 || DEFAULT_BRANDING.accent2);
  document.documentElement.style.setProperty("--accent-3", branding.accent3 || presetColors.accent3 || DEFAULT_BRANDING.accent3);

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute("content", branding.accent || DEFAULT_BRANDING.accent);

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", `${businessName}: tarot, reiki, lectura de cartas, Alaya Herbolario, talleres y reservas con cita previa.`);
}

function fillBrandingForm() {
  const branding = getBrandingSettings();

  if (settingBrandPreset) settingBrandPreset.value = branding.preset;
  if (settingBrandAccent) settingBrandAccent.value = branding.accent;
  if (settingBrandAccent2) settingBrandAccent2.value = branding.accent2;
  if (settingBrandAccent3) settingBrandAccent3.value = branding.accent3;
  if (settingHeroEyebrow) settingHeroEyebrow.value = branding.heroEyebrow;
  if (settingHeroPill) settingHeroPill.value = branding.heroPill;
  if (settingHeroDescription) settingHeroDescription.value = branding.heroDescription;
  if (settingPrimaryCta) settingPrimaryCta.value = branding.primaryCta;
  if (settingSecondaryCta) settingSecondaryCta.value = branding.secondaryCta;
  if (settingHeroBadge1) settingHeroBadge1.value = branding.badge1;
  if (settingHeroBadge2) settingHeroBadge2.value = branding.badge2;
  if (settingHeroBadge3) settingHeroBadge3.value = branding.badge3;
  if (settingCardTitle) settingCardTitle.value = branding.cardTitle;
  if (settingCardText) settingCardText.value = branding.cardText;
}

function collectBrandingFromForm() {
  const preset = settingBrandPreset?.value || "cosmic";
  const colors = getPresetColors(preset);

  return {
    preset,
    accent: settingBrandAccent?.value || colors.accent || DEFAULT_BRANDING.accent,
    accent2: settingBrandAccent2?.value || colors.accent2 || DEFAULT_BRANDING.accent2,
    accent3: settingBrandAccent3?.value || colors.accent3 || DEFAULT_BRANDING.accent3,
    heroEyebrow: settingHeroEyebrow?.value?.trim() || DEFAULT_BRANDING.heroEyebrow,
    heroPill: settingHeroPill?.value?.trim() || DEFAULT_BRANDING.heroPill,
    heroDescription: settingHeroDescription?.value?.trim() || DEFAULT_BRANDING.heroDescription,
    primaryCta: settingPrimaryCta?.value?.trim() || DEFAULT_BRANDING.primaryCta,
    secondaryCta: settingSecondaryCta?.value?.trim() || DEFAULT_BRANDING.secondaryCta,
    badge1: settingHeroBadge1?.value?.trim() || DEFAULT_BRANDING.badge1,
    badge2: settingHeroBadge2?.value?.trim() || DEFAULT_BRANDING.badge2,
    badge3: settingHeroBadge3?.value?.trim() || DEFAULT_BRANDING.badge3,
    cardLabel: DEFAULT_BRANDING.cardLabel,
    cardTitle: settingCardTitle?.value?.trim() || DEFAULT_BRANDING.cardTitle,
    cardText: settingCardText?.value?.trim() || DEFAULT_BRANDING.cardText,
    cardCta: DEFAULT_BRANDING.cardCta
  };
}

function previewBrandingFromForm() {
  if (!requireAdminAccess("configuración crítica")) return;

  appSettings.branding = collectBrandingFromForm();
  applySettingsToPage();
  addAuditLog("data", "Vista previa branding", appSettings.branding.preset);
  showToast("Vista previa de branding aplicada.");
}

function resetBrandingDefaults() {
  if (!requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Restaurar el branding por defecto?")) return;

  appSettings.branding = { ...DEFAULT_BRANDING };
  fillBrandingForm();
  applySettingsToPage();
  addAuditLog("data", "Restaurar branding", "Branding restaurado por defecto.");
  showToast("Branding restaurado.");
}

function handleBrandPresetChange() {
  const preset = settingBrandPreset?.value || "cosmic";
  const colors = getPresetColors(preset);

  if (preset !== "custom") {
    if (settingBrandAccent) settingBrandAccent.value = colors.accent || DEFAULT_BRANDING.accent;
    if (settingBrandAccent2) settingBrandAccent2.value = colors.accent2 || DEFAULT_BRANDING.accent2;
    if (settingBrandAccent3) settingBrandAccent3.value = colors.accent3 || DEFAULT_BRANDING.accent3;
  }
}

function fillSettingsForm() {
  if (!settingBusinessName) return;
  settingBusinessName.value = appSettings.businessName || "";
  settingTagline.value = appSettings.tagline || "";
  settingWhatsapp.value = appSettings.whatsapp || "";
  settingEmail.value = appSettings.email || "";
  settingAdminUser.value = appSettings.adminUser || "";
  settingAdminPass.value = appSettings.adminPass || "";
  fillBrandingForm();

  const availability = getAvailabilitySettings();
  if (settingOpenDays) settingOpenDays.value = availability.openDays.join(",");
  if (settingOpenStart) settingOpenStart.value = availability.openStart;
  if (settingOpenEnd) settingOpenEnd.value = availability.openEnd;
  if (settingSlotMinutes) settingSlotMinutes.value = String(availability.slotMinutes);
  if (settingMaxPerSlot) settingMaxPerSlot.value = String(availability.maxPerSlot);
  if (settingClosedDates) settingClosedDates.value = availability.closedDates.join("\n");

  const templates = getMessageTemplates();
  if (settingTplConfirmacion) settingTplConfirmacion.value = templates.confirmacion;
  if (settingTplCancelacion) settingTplCancelacion.value = templates.cancelacion;
  if (settingTplRecordatorio) settingTplRecordatorio.value = templates.recordatorio;
  if (settingTplAdminReserva) settingTplAdminReserva.value = templates.adminReserva;

  renderAvailabilityPreview();
  renderServiceTemplateOptions();
}

function saveServices() {
  localStorage.setItem("alaya_services", JSON.stringify(defaultServices));
}

function normalizeService(service = {}) {
  const tags = Array.isArray(service.tags)
    ? service.tags
    : String(service.tags || "")
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);

  return {
    id: service.id || crypto.randomUUID(),
    icon: service.icon || "✦",
    title: service.title || "Servicio",
    category: service.category || "personalizado",
    duration: service.duration || "Consultar",
    price: service.price || "Consultar",
    featured: Boolean(service.featured),
    tags,
    description: service.description || "",
    benefits: service.benefits || "",
    preparation: service.preparation || ""
  };
}

function normalizeServices() {
  defaultServices = defaultServices.map(normalizeService);
  saveServices();
}

function getServiceCategoryLabel(id) {
  return SERVICE_CATEGORIES.find(item => item.id === id)?.label || "Personalizado";
}

function getFilteredServices() {
  const query = (serviceSearch?.value || "").toLowerCase().trim();

  return defaultServices
    .map(normalizeService)
    .filter(service => {
      const matchesCategory = selectedServiceCategory === "todos" || service.category === selectedServiceCategory;
      const haystack = [
        service.title,
        service.category,
        service.duration,
        service.price,
        service.description,
        service.benefits,
        service.preparation,
        ...(service.tags || [])
      ].join(" ").toLowerCase();

      return matchesCategory && (!query || haystack.includes(query));
    });
}

function renderServiceFilters() {
  if (!serviceCategoryFilters) return;

  serviceCategoryFilters.innerHTML = SERVICE_CATEGORIES.map(category => `
    <button
      type="button"
      class="service-filter-btn ${selectedServiceCategory === category.id ? "active" : ""}"
      onclick="setServiceCategory('${category.id}')"
    >
      ${category.label}
    </button>
  `).join("");
}

function setServiceCategory(categoryId) {
  selectedServiceCategory = categoryId;
  renderServices();
}

function filterServiceByTag(tag) {
  if (serviceSearch) serviceSearch.value = tag;
  renderServices();
  document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderServiceHighlights() {
  if (!serviceHighlights) return;

  normalizeServices();

  const total = defaultServices.length;
  const lecturas = defaultServices.filter(item => normalizeService(item).category === "lecturas").length;
  const energia = defaultServices.filter(item => normalizeService(item).category === "energia").length;
  const destacados = defaultServices.filter(item => normalizeService(item).featured).length;

  serviceHighlights.innerHTML = `
    <article><strong>${total}</strong><span>Servicios activos</span></article>
    <article><strong>${lecturas}</strong><span>Lecturas y orientación</span></article>
    <article><strong>${energia}</strong><span>Sesiones energéticas</span></article>
    <article><strong>${destacados}</strong><span>Destacados</span></article>
  `;
}

function renderFeaturedService() {
  if (!featuredService) return;

  const service = defaultServices.map(normalizeService).find(item => item.featured)
    || defaultServices.map(normalizeService)[0];

  if (!service) {
    featuredService.innerHTML = "";
    return;
  }

  featuredService.innerHTML = `
    <article class="featured-service-card">
      <div class="featured-service-icon">${service.icon}</div>
      <div>
        <h3>Servicio destacado: ${service.title}</h3>
        <p>${service.description}</p>
        <div class="service-tags">
          <span>${getServiceCategoryLabel(service.category)}</span>
          <span>${service.duration}</span>
          <span>${service.price || "Consultar"}</span>
        </div>
      </div>
      <button class="btn btn-secondary" onclick="openServiceDetail('${service.id}')">Ver ficha</button>
    </article>
  `;
}

// ======================================================
// Render público
// ======================================================

function renderServices() {
  if (!servicesGrid) return;

  normalizeServices();
  renderServiceFilters();
  renderServiceHighlights();
  renderFeaturedService();

  const filtered = getFilteredServices();

  if (!filtered.length) {
    servicesGrid.innerHTML = `
      <article class="service-card">
        <h3>Sin resultados</h3>
        <p>No hay servicios que coincidan con el filtro actual.</p>
      </article>
    `;
  } else {
    servicesGrid.innerHTML = filtered.map(service => {
      const tags = (service.tags || []).slice(0, 4).map(tag => `<span onclick="filterServiceByTag('${String(tag).replace(/'/g, "\'")}')">${tag}</span>`).join("");

      return `
        <article class="service-card ${service.featured ? "destacado" : ""}">
          ${service.featured ? `<span class="service-ribbon">Destacado</span>` : ""}
          <span class="service-icon">${service.icon}</span>
          <div class="service-category"><span>${getServiceCategoryLabel(service.category)}</span></div>
          <h3>${service.title}</h3>
          <div class="service-meta">${service.duration}</div>
          <span class="service-price">${service.price || "Consultar"}</span>
          <p>${service.description}</p>
          ${tags ? `<div class="service-tags">${tags}</div>` : ""}
          <div class="admin-actions">
            <button class="btn btn-secondary" onclick="openServiceDetail('${service.id}')">Ver ficha</button>
            <button class="btn btn-secondary" onclick="selectService('${service.id}')">Reservar</button>
          </div>
        </article>
      `;
    }).join("");
  }

  if (bookingService) {
    bookingService.innerHTML = defaultServices.map(service => `
      <option value="${service.title}">${service.title}</option>
    `).join("");
  }
}

function openServiceDetail(id) {
  const service = defaultServices.map(normalizeService).find(item => item.id === id);
  if (!service || !serviceDetailModal || !serviceDetailContent) return;

  const tags = (service.tags || []).map(tag => `<span>${tag}</span>`).join("");

  serviceDetailContent.innerHTML = `
    <div class="service-detail-content">
      <div class="service-detail-header">
        <div class="service-detail-icon">${service.icon}</div>
        <div>
          <p class="eyebrow">Ficha Alaya Holistics</p>
          <h3>${service.title}</h3>
          <div class="service-category">
            <span>${getServiceCategoryLabel(service.category)}</span>
            <span>${service.duration}</span>
            <span>${service.price || "Consultar"}</span>
          </div>
        </div>
      </div>

      <div class="service-detail-grid">
        <div class="service-detail-box">
          <strong>Duración / formato</strong>
          ${service.duration || "Consultar"}
        </div>
        <div class="service-detail-box">
          <strong>Precio / aportación</strong>
          ${service.price || "Consultar"}
        </div>
      </div>

      <div class="service-detail-box">
        <strong>Descripción</strong>
        ${service.description || "Sin descripción"}
      </div>

      ${service.benefits ? `<div class="service-detail-box"><strong>Qué incluye / enfoque</strong>${service.benefits}</div>` : ""}
      ${service.preparation ? `<div class="service-detail-box"><strong>Preparación recomendada</strong>${service.preparation}</div>` : ""}
      ${tags ? `<div class="service-tags">${tags}</div>` : ""}

      <div class="admin-actions">
        <button class="btn btn-primary" onclick="selectService('${service.id}')">Reservar este servicio</button>
        <button class="btn btn-secondary" onclick="consultarServicio('${service.id}')">Consultar por WhatsApp</button>
      </div>
    </div>
  `;

  serviceDetailModal.classList.remove("hidden");
  serviceDetailModal.setAttribute("aria-hidden", "false");
}

function closeServiceDetail() {
  serviceDetailModal?.classList.add("hidden");
  serviceDetailModal?.setAttribute("aria-hidden", "true");
}

function consultarServicio(id) {
  const service = defaultServices.map(normalizeService).find(item => item.id === id);
  if (!service) return;

  const texto = `
Hola, quiero información sobre este servicio de Alaya Holistics:

${service.icon} ${service.title}
Categoría: ${getServiceCategoryLabel(service.category)}
Duración: ${service.duration}
Precio: ${service.price || "Consultar"}

${service.description}

${service.benefits ? `Qué incluye / enfoque: ${service.benefits}` : ""}
${service.preparation ? `Preparación recomendada: ${service.preparation}` : ""}

Mensaje:
  `.trim();

  window.open(buildWhatsappUrl(texto), "_blank");
}

function selectService(id) {
  const service = defaultServices.find(item => item.id === id);
  if (!service) return;
  if (bookingService) bookingService.value = service.title;
  closeServiceDetail();
  document.querySelector("#reservas").scrollIntoView({ behavior: "smooth" });
}

function normalizeEvent(evento = {}) {
  const etiquetas = Array.isArray(evento.etiquetas)
    ? evento.etiquetas
    : String(evento.etiquetas || "")
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);

  return {
    id: evento.id || crypto.randomUUID(),
    titulo: evento.titulo || "Actividad",
    icono: evento.icono || "✦",
    categoria: evento.categoria || "otros",
    nivel: evento.nivel || "Todos",
    fecha: evento.fecha || "",
    hora: evento.hora || "",
    precio: evento.precio || "Consultar",
    plazas: Number(evento.plazas || 0),
    formato: evento.formato || "Consultar",
    ubicacion: evento.ubicacion || "",
    destacado: Boolean(evento.destacado),
    etiquetas,
    descripcion: evento.descripcion || "",
    temario: evento.temario || "",
    material: evento.material || "",
    notas: evento.notas || ""
  };
}

function normalizeEventos() {
  eventos = eventos.map(normalizeEvent);
  saveEventos();
}

function getEventCategoryLabel(id) {
  return EVENT_CATEGORIES.find(item => item.id === id)?.label || "Otros";
}

function getEventReservationsCount(eventoId) {
  return reservas.filter(reserva => {
    return reserva.eventoId === eventoId && reserva.estado !== "Cancelada";
  }).length;
}

function getEventAvailability(evento) {
  const normalized = normalizeEvent(evento);
  const reserved = getEventReservationsCount(normalized.id);
  const total = normalized.plazas;

  if (!total) {
    return {
      reserved,
      total,
      left: null,
      full: false,
      label: "Plazas a consultar"
    };
  }

  const left = Math.max(total - reserved, 0);

  return {
    reserved,
    total,
    left,
    full: left <= 0,
    label: left <= 0 ? "Completo" : `${left}/${total} plazas libres`
  };
}

function getFilteredEventos() {
  const query = (eventSearch?.value || "").toLowerCase().trim();
  const level = eventLevelFilter?.value || "";
  const status = eventStatusFilter?.value || "";

  return eventos
    .map(normalizeEvent)
    .filter(evento => {
      const availability = getEventAvailability(evento);
      const matchesCategory = selectedEventCategory === "todos" || evento.categoria === selectedEventCategory;
      const matchesLevel = !level || evento.nivel === level;
      const matchesStatus =
        !status ||
        (status === "disponible" && !availability.full) ||
        (status === "completo" && availability.full);

      const haystack = [
        evento.titulo,
        evento.categoria,
        evento.nivel,
        evento.fecha,
        evento.hora,
        evento.precio,
        evento.formato,
        evento.ubicacion,
        evento.descripcion,
        evento.temario,
        evento.material,
        evento.notas,
        ...(evento.etiquetas || [])
      ].join(" ").toLowerCase();

      return matchesCategory && matchesLevel && matchesStatus && (!query || haystack.includes(query));
    });
}

function renderEventFilters() {
  if (!eventCategoryFilters) return;

  eventCategoryFilters.innerHTML = EVENT_CATEGORIES.map(category => `
    <button
      type="button"
      class="event-filter-btn ${selectedEventCategory === category.id ? "active" : ""}"
      onclick="setEventCategory('${category.id}')"
    >
      ${category.label}
    </button>
  `).join("");
}

function setEventCategory(categoryId) {
  selectedEventCategory = categoryId;
  renderEventosPublicos();
}

function filterEventByTag(tag) {
  if (eventSearch) eventSearch.value = tag;
  renderEventosPublicos();
  document.querySelector("#eventos")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderEventHighlights() {
  if (!eventHighlights) return;

  normalizeEventos();

  const total = eventos.length;
  const upcoming = eventos.filter(evento => new Date(normalizeEvent(evento).fecha + "T23:59:00") >= new Date()).length;
  const withSeats = eventos.filter(evento => !getEventAvailability(evento).full).length;
  const featuredCount = eventos.filter(evento => normalizeEvent(evento).destacado).length;

  eventHighlights.innerHTML = `
    <article><strong>${total}</strong><span>Actividades en agenda</span></article>
    <article><strong>${upcoming}</strong><span>Próximas actividades</span></article>
    <article><strong>${withSeats}</strong><span>Con plazas o consulta</span></article>
    <article><strong>${featuredCount}</strong><span>Destacadas</span></article>
  `;
}

function renderFeaturedEvent() {
  if (!featuredEvent) return;

  const event = eventos.map(normalizeEvent).find(item => item.destacado && !getEventAvailability(item).full)
    || eventos.map(normalizeEvent).find(item => !getEventAvailability(item).full);

  if (!event) {
    featuredEvent.innerHTML = "";
    return;
  }

  const availability = getEventAvailability(event);

  featuredEvent.innerHTML = `
    <article class="featured-event-card">
      <div class="featured-event-icon">${event.icono}</div>
      <div>
        <h3>Actividad destacada: ${event.titulo}</h3>
        <p>${event.descripcion}</p>
        <div class="event-tags">
          <span>${getEventCategoryLabel(event.categoria)}</span>
          <span>${event.nivel}</span>
          <span>${formatFecha(event.fecha)} · ${event.hora || "Hora pendiente"}</span>
          <span>${availability.label}</span>
        </div>
      </div>
      <button class="btn btn-secondary" onclick="openEventDetail('${event.id}')">Ver ficha</button>
    </article>
  `;
}

function renderEventosPublicos() {
  if (!eventosGrid) return;

  normalizeEventos();
  renderEventFilters();
  renderEventHighlights();
  renderFeaturedEvent();

  const filtered = getFilteredEventos();
  eventosGrid.innerHTML = "";

  if (eventos.length === 0) {
    eventosGrid.innerHTML = `
      <article class="evento-card">
        <h3>Próximamente</h3>
        <p>Muy pronto anunciaremos nuevos talleres, cursos y encuentros.</p>
      </article>
    `;
    return;
  }

  if (!filtered.length) {
    eventosGrid.innerHTML = `
      <article class="evento-card">
        <h3>Sin resultados</h3>
        <p>No hay actividades que coincidan con los filtros actuales.</p>
      </article>
    `;
    return;
  }

  filtered.forEach(evento => {
    const availability = getEventAvailability(evento);
    const card = document.createElement("article");
    card.className = `evento-card ${evento.destacado ? "destacado" : ""} ${availability.full ? "completo" : ""}`;

    const tags = (evento.etiquetas || []).slice(0, 4).map(tag => `<span onclick="filterEventByTag('${String(tag).replace(/'/g, "\'")}')">${tag}</span>`).join("");

    card.innerHTML = `
      ${evento.destacado ? `<span class="event-ribbon">Destacado</span>` : ""}
      <span class="service-icon">${evento.icono}</span>
      <div class="event-category">
        <span>${getEventCategoryLabel(evento.categoria)}</span>
        <span>${evento.nivel}</span>
        <span>${evento.formato}</span>
      </div>
      <h3>${evento.titulo}</h3>
      <div class="evento-meta">
        ${formatFecha(evento.fecha)} · ${evento.hora || "Hora pendiente"} · ${evento.precio || "Consultar"}
      </div>
      <div class="event-capacity">
        <span class="${availability.full ? "completo" : ""}">${availability.label}</span>
      </div>
      <p>${evento.descripcion}</p>
      ${tags ? `<div class="event-tags">${tags}</div>` : ""}

      <div class="evento-actions">
        <button class="btn btn-secondary" onclick="openEventDetail('${evento.id}')">
          Ver ficha
        </button>
        <button class="btn btn-primary" ${availability.full ? "disabled" : ""} onclick="abrirReservaEvento('${evento.id}')">
          ${availability.full ? "Completo" : "Reservar plaza"}
        </button>
      </div>
    `;

    eventosGrid.appendChild(card);
  });
}

function renderHerbolarioFilters() {
  if (!herbCategoryFilters) return;

  herbCategoryFilters.innerHTML = HERB_CATEGORIES.map(category => `
    <button
      type="button"
      class="herb-filter-btn ${selectedHerbCategory === category.id ? "active" : ""}"
      onclick="setHerbCategory('${category.id}')"
    >
      ${category.label}
    </button>
  `).join("");
}

function renderHerbolarioHighlights() {
  if (!herbolarioHighlights) return;

  normalizeProductos();

  const total = productos.length;
  const disponibles = productos.filter(item => normalizeProduct(item).stock !== "Agotado").length;
  const categorias = new Set(productos.map(item => normalizeProduct(item).categoria)).size;
  const packs = productos.filter(item => normalizeProduct(item).categoria === "packs").length;

  herbolarioHighlights.innerHTML = `
    <article><strong>${total}</strong><span>Productos en catálogo</span></article>
    <article><strong>${disponibles}</strong><span>Disponibles o consultables</span></article>
    <article><strong>${categorias}</strong><span>Categorías activas</span></article>
    <article><strong>${packs}</strong><span>Packs especiales</span></article>
  `;
}

function setHerbCategory(categoryId) {
  selectedHerbCategory = categoryId;
  renderProductosPublicos();
}

function renderFeaturedHerbProduct() {
  if (!featuredHerbProduct) return;

  const normalized = productos.map(normalizeProduct);
  const featured = normalized.find(item => item.destacado && item.stock !== "Agotado")
    || normalized.find(item => item.stock !== "Agotado");

  if (!featured) {
    featuredHerbProduct.innerHTML = "";
    return;
  }

  featuredHerbProduct.innerHTML = `
    <article class="featured-card">
      <div class="featured-icon">${featured.icono || "♧"}</div>
      <div>
        <h3>Producto destacado: ${featured.nombre}</h3>
        <p>${featured.descripcion}</p>
        <div class="featured-meta">
          <span>${getCategoryLabel(featured.categoria)}</span>
          <span>${featured.stock}</span>
          ${featured.formato ? `<span>${featured.formato}</span>` : ""}
          <span>${featured.precio || "Consultar"}</span>
        </div>
      </div>
      <button class="btn btn-secondary" onclick="openProductDetail('${featured.id}')">Ver ficha</button>
    </article>
  `;
}

function renderProductosPublicos() {
  if (!productsGrid) return;

  normalizeProductos();
  renderHerbolarioFilters();
  renderHerbolarioHighlights();
  renderFeaturedHerbProduct();

  const filtered = getFilteredProductos();
  productsGrid.innerHTML = "";

  if (productos.length === 0) {
    productsGrid.innerHTML = `
      <article class="product-card">
        <h3>Próximamente</h3>
        <p>Añade productos desde el panel administrador.</p>
      </article>
    `;
    return;
  }

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <article class="product-card">
        <h3>Sin resultados</h3>
        <p>No hay productos que coincidan con el filtro actual.</p>
      </article>
    `;
    return;
  }

  filtered.forEach(producto => {
    const card = document.createElement("article");
    card.className = `product-card ${producto.destacado ? "destacado" : ""}`;

    const stockClass = producto.stock === "Agotado" ? "agotado" : "";
    const tags = (producto.etiquetas || []).slice(0, 4).map(tag => `<span onclick="filterHerbByTag('${tag.replace(/'/g, "\\'")}')">${tag}</span>`).join("");

    card.innerHTML = `
      ${producto.destacado ? `<span class="featured-ribbon">Destacado</span>` : ""}
      <span class="product-icon">${producto.icono || "♧"}</span>
      <div class="product-category"><span>${getCategoryLabel(producto.categoria)}</span></div>
      <h3>${producto.nombre}</h3>
      <div class="product-price">${producto.precio || "Consultar"}</div>
      ${producto.formato ? `<span class="product-format">${producto.formato}</span>` : ""}
      <div class="product-stock"><span class="${stockClass}">${producto.stock || "Consultar"}</span></div>
      <p>${producto.descripcion}</p>
      ${producto.uso ? `<div class="product-use"><b>Uso / consejo:</b> ${producto.uso}</div>` : ""}
      ${tags ? `<div class="product-tags">${tags}</div>` : ""}
      <div class="admin-actions">
        <button class="btn btn-secondary" onclick="openProductDetail('${producto.id}')">Ver ficha</button>
        <button class="btn btn-secondary" onclick="consultarProducto('${producto.id}')">Consultar producto</button>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

function filterHerbByTag(tag) {
  if (herbSearch) herbSearch.value = tag;
  renderProductosPublicos();
  document.querySelector("#herbolario-productos")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openProductDetail(id) {
  const producto = productos.map(normalizeProduct).find(item => item.id === id);
  if (!producto || !productDetailModal || !productDetailContent) return;

  const tags = (producto.etiquetas || []).map(tag => `<span>${tag}</span>`).join("");

  productDetailContent.innerHTML = `
    <div class="product-detail-content">
      <div class="product-detail-header">
        <div class="product-detail-icon">${producto.icono || "♧"}</div>
        <div>
          <p class="eyebrow">Ficha Alaya Herbolario</p>
          <h3>${producto.nombre}</h3>
          <div class="product-category">
            <span>${getCategoryLabel(producto.categoria)}</span>
            <span>${producto.stock || "Consultar"}</span>
            ${producto.destacado ? "<span>Destacado</span>" : ""}
          </div>
        </div>
      </div>

      <div class="product-detail-grid">
        <div class="product-detail-box"><strong>Precio</strong>${producto.precio || "Consultar"}</div>
        <div class="product-detail-box"><strong>Formato</strong>${producto.formato || "Consultar"}</div>
      </div>

      <div class="product-detail-box"><strong>Descripción</strong>${producto.descripcion || "Sin descripción"}</div>
      ${producto.uso ? `<div class="product-detail-box"><strong>Uso recomendado / consejo</strong>${producto.uso}</div>` : ""}
      ${producto.ingredientes ? `<div class="product-detail-box"><strong>Ingredientes / contenido</strong>${producto.ingredientes}</div>` : ""}
      ${producto.notas ? `<div class="product-detail-box"><strong>Notas</strong>${producto.notas}</div>` : ""}
      ${tags ? `<div class="product-tags">${tags}</div>` : ""}
      <div class="admin-actions"><button class="btn btn-primary" onclick="consultarProducto('${producto.id}')">Consultar por WhatsApp</button></div>
    </div>
  `;

  productDetailModal.classList.remove("hidden");
  productDetailModal.setAttribute("aria-hidden", "false");
}

function closeProductDetail() {
  productDetailModal?.classList.add("hidden");
  productDetailModal?.setAttribute("aria-hidden", "true");
}

function consultarProducto(id) {
  const producto = productos.map(normalizeProduct).find(item => item.id === id);
  if (!producto) return;

  const texto = `
Hola, quiero información sobre este producto de Alaya Herbolario:

${producto.icono || "♧"} ${producto.nombre}
Categoría: ${getCategoryLabel(producto.categoria)}
Precio: ${producto.precio || "Consultar"}
Stock: ${producto.stock || "Consultar"}
Formato: ${producto.formato || "Consultar"}

${producto.descripcion}

${producto.uso ? `Uso / consejo: ${producto.uso}` : ""}
${producto.ingredientes ? `Ingredientes / contenido: ${producto.ingredientes}` : ""}
${producto.notas ? `Notas: ${producto.notas}` : ""}

Mensaje:
  `.trim();

  window.open(buildWhatsappUrl(texto), "_blank");
}

// ======================================================
// Reserva general
// ======================================================

function getBookingData() {
  const nombre = $("#bookingName").value.trim();
  const telefono = $("#bookingPhone").value.trim();
  const email = $("#bookingEmail").value.trim();
  const servicio = $("#bookingService").value;
  const fecha = $("#bookingDate").value;
  const hora = $("#bookingTime").value;
  const mensaje = $("#bookingMessage").value.trim();

  if (!nombre || !telefono || !servicio) {
    showToast("Añade nombre, teléfono y servicio.");
    return null;
  }

  if (!bookingConsent?.checked) {
    showToast("Acepta el consentimiento para gestionar la reserva.");
    return null;
  }

  const availabilityResult = checkBookingAvailability(fecha, hora);
  renderAvailabilityHint();

  if (!availabilityResult.ok) {
    showToast(availabilityResult.message);
    return null;
  }

  const reserva = {
    id: crypto.randomUUID(),
    codigo: generateReservationCode(),
    tipo: "Servicio",
    eventoId: null,
    eventoTitulo: servicio,
    eventoFecha: fecha,
    eventoHora: hora,
    nombre,
    telefono,
    email,
    mensaje,
    fechaReserva: new Date().toISOString(),
    estado: "Pendiente",
    consent: true,
    internalNote: "",
    statusHistory: [
      {
        estado: "Pendiente",
        fecha: new Date().toISOString(),
        actor: "cliente",
        detalle: "Reserva creada desde formulario público"
      }
    ]
  };

  const texto = buildAdminReservationMessage(reserva);

  return { reserva, texto, servicio };
}

function submitBooking(method) {
  const data = getBookingData();
  if (!data) return;

  reservas.unshift(data.reserva);
  saveReservas();
  notifyNewReservation(data.reserva);
  renderAdminReservas();
  showToast("Reserva guardada.");

  if (method === "whatsapp") {
    window.open(buildWhatsappUrl(data.texto), "_blank");
  }

  if (method === "email") {
    window.location.href = buildEmailUrl(`Nueva reserva: ${data.servicio}`, data.texto);
  }

  $("#bookingForm").reset();
  bookingService.value = defaultServices[0].title;
  renderAvailabilityHint();
}

// ======================================================
// Reserva de eventos
// ======================================================

function openEventDetail(id) {
  const evento = eventos.map(normalizeEvent).find(item => item.id === id);
  if (!evento || !eventDetailModal || !eventDetailContent) return;

  const availability = getEventAvailability(evento);
  const tags = (evento.etiquetas || []).map(tag => `<span>${tag}</span>`).join("");

  eventDetailContent.innerHTML = `
    <div class="event-detail-content">
      <div class="event-detail-header">
        <div class="event-detail-icon">${evento.icono}</div>
        <div>
          <p class="eyebrow">Ficha de taller / curso</p>
          <h3>${evento.titulo}</h3>
          <div class="event-category">
            <span>${getEventCategoryLabel(evento.categoria)}</span>
            <span>${evento.nivel}</span>
            <span>${evento.formato}</span>
            <span>${availability.label}</span>
          </div>
        </div>
      </div>

      <div class="event-detail-grid">
        <div class="event-detail-box">
          <strong>Fecha y hora</strong>
          ${formatFecha(evento.fecha)} · ${evento.hora || "Hora pendiente"}
        </div>
        <div class="event-detail-box">
          <strong>Precio / aportación</strong>
          ${evento.precio || "Consultar"}
        </div>
        <div class="event-detail-box">
          <strong>Plazas</strong>
          ${availability.total ? `${availability.reserved}/${availability.total} reservadas · ${availability.left} libres` : "Consultar plazas"}
        </div>
        <div class="event-detail-box">
          <strong>Ubicación</strong>
          ${evento.ubicacion || "Consultar"}
        </div>
      </div>

      <div class="event-detail-box">
        <strong>Descripción</strong>
        ${evento.descripcion || "Sin descripción"}
      </div>

      ${evento.temario ? `<div class="event-detail-box"><strong>Temario / contenido</strong>${evento.temario}</div>` : ""}
      ${evento.material ? `<div class="event-detail-box"><strong>Material</strong>${evento.material}</div>` : ""}
      ${evento.notas ? `<div class="event-detail-box"><strong>Notas importantes</strong>${evento.notas}</div>` : ""}
      ${tags ? `<div class="event-tags">${tags}</div>` : ""}

      <div class="admin-actions">
        <button class="btn btn-primary" ${availability.full ? "disabled" : ""} onclick="abrirReservaEvento('${evento.id}')">
          ${availability.full ? "Actividad completa" : "Reservar plaza"}
        </button>
        <button class="btn btn-secondary" onclick="consultarEvento('${evento.id}')">Consultar por WhatsApp</button>
      </div>
    </div>
  `;

  eventDetailModal.classList.remove("hidden");
  eventDetailModal.setAttribute("aria-hidden", "false");
}

function closeEventDetail() {
  eventDetailModal?.classList.add("hidden");
  eventDetailModal?.setAttribute("aria-hidden", "true");
}

function consultarEvento(id) {
  const evento = eventos.map(normalizeEvent).find(item => item.id === id);
  if (!evento) return;

  const availability = getEventAvailability(evento);

  const texto = `
Hola, quiero información sobre esta actividad de Alaya Holistics:

${evento.icono} ${evento.titulo}
Categoría: ${getEventCategoryLabel(evento.categoria)}
Nivel: ${evento.nivel}
Fecha: ${formatFecha(evento.fecha)}
Hora: ${evento.hora || "Hora pendiente"}
Precio: ${evento.precio || "Consultar"}
Plazas: ${availability.label}
Formato: ${evento.formato}
Ubicación: ${evento.ubicacion || "Consultar"}

${evento.descripcion}

${evento.temario ? `Temario: ${evento.temario}` : ""}
${evento.material ? `Material: ${evento.material}` : ""}
${evento.notas ? `Notas: ${evento.notas}` : ""}

Mensaje:
  `.trim();

  window.open(buildWhatsappUrl(texto), "_blank");
}

function abrirReservaEvento(id) {
  const evento = eventos.map(normalizeEvent).find(item => item.id === id);
  if (!evento) return;

  const availability = getEventAvailability(evento);
  if (availability.full) {
    showToast("Esta actividad está completa.");
    return;
  }

  closeEventDetail();
  reservaEventoActualId = id;

  reservaEventoInfo.innerHTML = `
    <strong>${evento.titulo}</strong><br>
    ${formatFecha(evento.fecha)} · ${evento.hora || "Hora pendiente"} · ${evento.precio || "Consultar"}<br>
    ${availability.label}
  `;

  reservaNombre.value = "";
  reservaTelefono.value = "";
  reservaEmail.value = "";
  reservaMensaje.value = "";
  if (reservaConsent) reservaConsent.checked = false;

  reservaModal.classList.remove("hidden");
}

function cerrarReservaModal() {
  reservaModal.classList.add("hidden");
}

function crearTextoReservaEvento() {
  const evento = eventos.map(normalizeEvent).find(item => item.id === reservaEventoActualId);
  if (!evento) return null;

  const availability = getEventAvailability(evento);
  if (availability.full) {
    showToast("Esta actividad ya está completa.");
    return null;
  }

  const nombre = reservaNombre.value.trim();
  const telefono = reservaTelefono.value.trim();
  const email = reservaEmail.value.trim();
  const mensajeExtra = reservaMensaje.value.trim();

  if (!nombre || !telefono) {
    showToast("Añade tu nombre y teléfono.");
    return null;
  }

  if (!reservaConsent?.checked) {
    showToast("Acepta el consentimiento para gestionar la reserva.");
    return null;
  }

  const reserva = {
    id: crypto.randomUUID(),
    codigo: generateReservationCode(),
    tipo: "Evento",
    eventoId: evento.id,
    eventoTitulo: evento.titulo,
    eventoFecha: evento.fecha,
    eventoHora: evento.hora,
    nombre,
    telefono,
    email,
    mensaje: mensajeExtra,
    fechaReserva: new Date().toISOString(),
    estado: "Pendiente",
    consent: true,
    internalNote: "",
    statusHistory: [
      {
        estado: "Pendiente",
        fecha: new Date().toISOString(),
        actor: "cliente",
        detalle: "Reserva creada desde evento público"
      }
    ]
  };

  reservas.unshift(reserva);
  saveReservas();
  notifyNewReservation(reserva);
  renderAdminReservas();

  const texto = buildAdminReservationMessage(reserva);

  return { texto, evento, reserva };
}

function enviarReservaPorWhatsapp() {
  const data = crearTextoReservaEvento();
  if (!data) return;
  window.open(buildWhatsappUrl(data.texto), "_blank");
  cerrarReservaModal();
  showToast("Reserva enviada.");
}

function enviarReservaPorEmail() {
  const data = crearTextoReservaEvento();
  if (!data) return;
  window.location.href = buildEmailUrl(`Nueva reserva: ${data.evento.titulo}`, data.texto);
  cerrarReservaModal();
  showToast("Reserva enviada.");
}

// ======================================================
// Admin
// ======================================================

async function abrirAdminModal() {
  adminModal.classList.remove("hidden");

  const status = window.AlayaCloud?.getStatus?.();

  if (status?.mode === "firebase" && status?.ready) {
    await window.AlayaCloud.initFirebase?.();
    const refreshedStatus = window.AlayaCloud.getStatus();

    if (refreshedStatus.authenticated && refreshedStatus.admin) {
      mostrarAdminPanel();
    } else {
      adminLoginBox.classList.remove("hidden");
      adminPanel.classList.add("hidden");
      adminLoginError.textContent = "Inicia sesión con el email y contraseña admin de Firebase.";
    }

    renderAuthStatus();
    return;
  }

  const logged = localStorage.getItem("alaya_admin_logged") === "true";
  if (logged) {
    mostrarAdminPanel();
  } else {
    adminLoginBox.classList.remove("hidden");
    adminPanel.classList.add("hidden");
  }
}

function cerrarAdminModal() {
  adminModal.classList.add("hidden");
  adminLoginError.textContent = "";
  clearTimeout(adminAutoLockTimer);
}



let auditLog = JSON.parse(localStorage.getItem("alaya_audit_log")) || [];
let agendaBlocks = JSON.parse(localStorage.getItem("alaya_agenda_blocks")) || [];
let appNotifications = JSON.parse(localStorage.getItem("alaya_notifications")) || [];


function saveNotifications() {
  localStorage.setItem("alaya_notifications", JSON.stringify(appNotifications));
}

function formatNotificationDate(value) {
  if (!value) return "Sin fecha";
  return new Date(value).toLocaleString("es-ES");
}

function renderBrowserNotificationStatus() {
  if (!browserNotificationStatus) return;

  if (!("Notification" in window)) {
    browserNotificationStatus.textContent = "Avisos del navegador: este navegador no los soporta.";
    return;
  }

  const permission = Notification.permission;

  if (permission === "granted") {
    browserNotificationStatus.textContent = "Avisos del navegador: permitidos.";
  } else if (permission === "denied") {
    browserNotificationStatus.textContent = "Avisos del navegador: bloqueados por el dispositivo/navegador.";
  } else {
    browserNotificationStatus.textContent = "Avisos del navegador: todavía no se ha pedido permiso.";
  }
}

async function requestBrowserNotifications() {
  if (!requireAdminAccess("consultar panel")) return;

  if (!("Notification" in window)) {
    showToast("Este navegador no soporta notificaciones.");
    renderBrowserNotificationStatus();
    return;
  }

  const permission = await Notification.requestPermission();
  renderBrowserNotificationStatus();

  if (permission === "granted") {
    showToast("Avisos del navegador activados.");
    pushAppNotification("sistema", "Avisos activados", "Las notificaciones del navegador están permitidas.", { silentBrowser: true });
  } else {
    showToast("No se han activado los avisos del navegador.");
  }
}

function showBrowserNotification(title, body) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  try {
    new Notification(title, {
      body,
      icon: "assets/icon-192.png",
      badge: "assets/icon-192.png"
    });
  } catch (error) {
    console.warn("No se pudo mostrar notificación", error);
  }
}

function pushAppNotification(type, title, detail = "", options = {}) {
  const notification = {
    id: crypto.randomUUID(),
    type,
    title,
    detail,
    read: Boolean(options.read),
    linkedReservationId: options.linkedReservationId || "",
    createdAt: new Date().toISOString(),
    onlineSynced: false
  };

  appNotifications.unshift(notification);
  appNotifications = appNotifications.slice(0, 300);
  saveNotifications();
  const updated = appNotifications.find(item => item.id === id);
  if (updated) syncSingleNotificationOnline(updated);
  renderNotifications();
  syncSingleNotificationOnline(notification);

  if (!options.silentBrowser) {
    showBrowserNotification(title, detail);
  }

  return notification;
}

function renderNotificationOnlineStatus(message = "") {
  if (!notificationOnlineStatus) return;

  const status = window.AlayaCloud?.getStatus?.();
  const synced = appNotifications.filter(item => item.onlineSynced).length;
  const pending = appNotifications.length - synced;

  if (!status?.ready) {
    notificationOnlineStatus.textContent = "Notificaciones online: Firebase no configurado.";
    return;
  }

  if (!status.authenticated || getRoleLevel(status.role || "none") < getRoleLevel("editor")) {
    notificationOnlineStatus.textContent = `Notificaciones online: inicia sesión Firebase con rol editor/admin. Pendientes locales: ${pending}.`;
    return;
  }

  notificationOnlineStatus.textContent = message || `Notificaciones online preparadas. Sincronizadas: ${synced}. Pendientes: ${pending}.`;
}

async function syncSingleNotificationOnline(notification) {
  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status?.authenticated || getRoleLevel(status.role || "none") < getRoleLevel("editor")) {
    return { ok: false, reason: "Notificaciones online requieren rol editor/admin." };
  }

  if (!window.AlayaCloud?.saveNotification) {
    return { ok: false, reason: "saveNotification no disponible." };
  }

  const result = await window.AlayaCloud.saveNotification(notification);

  if (result.ok) {
    appNotifications = appNotifications.map(item => item.id === notification.id ? { ...item, onlineSynced: true } : item);
    localStorage.setItem("alaya_notifications", JSON.stringify(appNotifications));
    renderNotificationOnlineStatus("Última notificación enviada a Firestore.");
  }

  return result;
}

async function syncNotificationsOnline() {
  if (!requireAdminAccess("editar gestión diaria")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || getRoleLevel(status.role || "none") < getRoleLevel("editor")) {
    renderNotificationOnlineStatus();
    showToast("Necesitas Firebase con rol editor/admin.");
    return;
  }

  const result = await window.AlayaCloud?.saveNotifications?.(appNotifications);

  if (result?.ok) {
    appNotifications = appNotifications.map(item => ({ ...item, onlineSynced: true }));
    saveNotifications();
    renderNotifications();
    renderNotificationOnlineStatus(`${result.count || appNotifications.length} notificaciones enviadas a Firestore.`);
    addAuditLog("firebase", "Subir notificaciones online", `${result.count || appNotifications.length} notificaciones enviadas.`);
    showToast("Notificaciones subidas online.");
  } else {
    renderNotificationOnlineStatus(`Error subiendo notificaciones: ${result?.reason || "No especificado"}`);
    showToast("No se pudieron subir notificaciones.");
  }
}

async function loadNotificationsOnline() {
  if (!requireAdminAccess("consultar panel")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || getRoleLevel(status.role || "none") < getRoleLevel("viewer")) {
    renderNotificationOnlineStatus();
    showToast("Necesitas Firebase con rol válido.");
    return;
  }

  const result = await window.AlayaCloud?.loadNotifications?.();

  if (result?.ok && Array.isArray(result.data)) {
    const merged = [...result.data, ...appNotifications];
    const map = new Map();

    merged.forEach(item => {
      if (!item.id) item.id = crypto.randomUUID();
      map.set(item.id, { ...item, onlineSynced: Boolean(item.onlineSynced || item.onlineUpdatedAt) });
    });

    appNotifications = Array.from(map.values()).sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }).slice(0, 300);

    saveNotifications();
    renderNotifications();
    renderNotificationOnlineStatus(`${result.data.length} notificaciones cargadas desde Firestore.`);
    addAuditLog("firebase", "Cargar notificaciones online", `${result.data.length} notificaciones cargadas.`);
    showToast("Notificaciones online cargadas.");
  } else {
    renderNotificationOnlineStatus(`Error cargando notificaciones: ${result?.reason || "No especificado"}`);
    showToast("No se pudieron cargar notificaciones.");
  }
}

async function testNotificationsOnline() {
  if (!requireAdminAccess("editar gestión diaria")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || getRoleLevel(status.role || "none") < getRoleLevel("editor")) {
    renderNotificationOnlineStatus();
    showToast("Necesitas Firebase con rol editor/admin.");
    return;
  }

  const result = await window.AlayaCloud?.testNotificationWrite?.();

  if (result?.ok) {
    renderNotificationOnlineStatus(result.message || "Prueba de notificaciones online correcta.");
    addAuditLog("firebase", "Probar notificaciones online", "Escritura y borrado de notificación correctos.");
    showToast("Notificaciones online OK.");
  } else {
    renderNotificationOnlineStatus(`Error en notificaciones online: ${result?.reason || "No especificado"}`);
    showToast("Notificaciones online fallaron.");
  }
}



function notifyNewReservation(reserva) {
  pushAppNotification(
    "reserva",
    "Nueva reserva recibida",
    `${reserva.nombre} · ${reserva.eventoTitulo || reserva.servicio || "Reserva"} · ${reserva.eventoFecha || "fecha por confirmar"} ${reserva.eventoHora || ""}`,
    { linkedReservationId: reserva.id }
  );
}

function getUnreadNotifications() {
  return appNotifications.filter(item => !item.read);
}

function renderNotificationBadge() {
  if (!adminNotificationBadge) return;

  const unread = getUnreadNotifications().length;
  adminNotificationBadge.textContent = `🔔 ${unread}`;
  adminNotificationBadge.classList.toggle("has-unread", unread > 0);
  adminNotificationBadge.title = unread ? `${unread} notificación(es) sin leer` : "Sin notificaciones pendientes";
}

function renderNotificationSummary() {
  if (!notificationSummary) return;

  const total = appNotifications.length;
  const unread = getUnreadNotifications().length;
  const reservasCount = appNotifications.filter(item => item.type === "reserva").length;
  const systemCount = appNotifications.filter(item => item.type === "sistema").length;

  notificationSummary.innerHTML = `
    <div><strong>${unread}</strong><span>Sin leer</span></div>
    <div><strong>${total}</strong><span>Total</span></div>
    <div><strong>${reservasCount}</strong><span>Reservas</span></div>
    <div><strong>${systemCount}</strong><span>Sistema</span></div>
  `;
}

function renderNotifications() {
  renderNotificationBadge();
  renderNotificationSummary();
  renderBrowserNotificationStatus();
  renderNotificationOnlineStatus();

  if (!notificationList) return;

  if (!appNotifications.length) {
    notificationList.innerHTML = "<p>No hay notificaciones todavía.</p>";
    return;
  }

  notificationList.innerHTML = appNotifications.map(item => `
    <div class="admin-item ${item.read ? "" : "unread"}">
      <div>
        <span class="notification-pill ${item.type}">${item.type}</span>
        <strong>${item.title}</strong>
      </div>
      <div class="notification-meta">
        <span>${formatNotificationDate(item.createdAt)}</span>
        <span>${item.read ? "Leída" : "Sin leer"}</span>
        <span class="${item.onlineSynced ? "notification-online-mark" : "notification-local-mark"}">${item.onlineSynced ? "Online" : "Local"}</span>
      </div>
      <p>${item.detail || "Sin detalle"}</p>
      <div class="admin-item-actions">
        ${item.linkedReservationId ? `<button class="btn btn-secondary" onclick="goToReservationFromNotification('${item.linkedReservationId}', '${item.id}')">Ver reserva</button>` : ""}
        <button class="btn btn-secondary" onclick="markNotificationRead('${item.id}')">${item.read ? "Marcar no leída" : "Marcar leída"}</button>
        <button class="btn btn-danger" onclick="deleteNotification('${item.id}')">Eliminar</button>
      </div>
    </div>
  `).join("");

  applyRoleGuardUx();
}

function markNotificationRead(id) {
  if (!requireAdminAccess("consultar panel")) return;

  appNotifications = appNotifications.map(item => {
    if (item.id !== id) return item;
    return { ...item, read: !item.read };
  });

  saveNotifications();
  renderNotifications();
}

function markAllNotificationsRead() {
  if (!requireAdminAccess("consultar panel")) return;

  appNotifications = appNotifications.map(item => ({ ...item, read: true }));
  saveNotifications();
  syncNotificationsOnline();
  renderNotifications();
  showToast("Notificaciones marcadas como leídas.");
}

function deleteNotification(id) {
  if (!requireAdminAccess("consultar panel")) return;

  appNotifications = appNotifications.filter(item => item.id !== id);
  window.AlayaCloud?.deleteNotificationOnline?.(id);
  saveNotifications();
  renderNotifications();
  showToast("Notificación eliminada.");
}

function clearNotifications() {
  if (!requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Seguro que quieres vaciar todas las notificaciones?")) return;

  appNotifications = [];
  saveNotifications();
  renderNotifications();
  addAuditLog("data", "Vaciar notificaciones", "Centro de notificaciones vaciado.");
  showToast("Notificaciones vaciadas.");
}

function exportNotificationsJson() {
  if (!requireAdminAccess("configuración crítica")) return;

  const data = {
    version: "3.5",
    exportedAt: new Date().toISOString(),
    notifications: appNotifications
  };

  downloadTextFile("alaya-notificaciones.json", JSON.stringify(data, null, 2));
  addAuditLog("data", "Exportar notificaciones", `${appNotifications.length} notificaciones exportadas.`);
  showToast("Notificaciones exportadas.");
}

function goToReservationFromNotification(reservaId, notificationId) {
  if (!requireAdminAccess("consultar panel")) return;

  appNotifications = appNotifications.map(item => item.id === notificationId ? { ...item, read: true } : item);
  saveNotifications();
  renderNotifications();

  document.querySelector('[data-admin-tab="reservas"]')?.click();
  const search = document.getElementById("reservationSearch");
  if (search) {
    search.value = reservaId;
    renderAdminReservas();
  }
}

function getAuditActor() {
  const status = window.AlayaCloud?.getStatus?.();

  if (status?.mode === "firebase" && status?.userEmail) {
    return status.userEmail;
  }

  if (localStorage.getItem("alaya_admin_logged") === "true") {
    return "admin local";
  }

  return "sin sesión";
}

function addAuditLog(type, action, detail = "") {
  const entry = {
    id: crypto.randomUUID(),
    type,
    action,
    detail,
    actor: getAuditActor(),
    mode: window.AlayaCloud?.getStatus?.()?.mode || "local",
    createdAt: new Date().toISOString(),
    onlineSynced: false
  };

  auditLog.unshift(entry);
  auditLog = auditLog.slice(0, 500);
  localStorage.setItem("alaya_audit_log", JSON.stringify(auditLog));
  renderAuditLog();
  syncSingleAuditEntryOnline(entry);
}

async function syncSingleAuditEntryOnline(entry) {
  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status?.authenticated || !status?.admin) {
    return { ok: false, reason: "Auditoría online requiere sesión admin Firebase." };
  }

  if (!window.AlayaCloud?.saveAuditEntry) {
    return { ok: false, reason: "saveAuditEntry no disponible." };
  }

  const result = await window.AlayaCloud.saveAuditEntry(entry);

  if (result.ok) {
    auditLog = auditLog.map(item => item.id === entry.id ? { ...item, onlineSynced: true } : item);
    localStorage.setItem("alaya_audit_log", JSON.stringify(auditLog));
    renderAuditOnlineStatus("Último registro enviado a Firestore.");
  }

  return result;
}

function renderAuditOnlineStatus(message = "") {
  const el = document.getElementById("auditOnlineStatus");
  if (!el) return;

  const status = window.AlayaCloud?.getStatus?.();
  const synced = auditLog.filter(item => item.onlineSynced).length;
  const pending = auditLog.length - synced;

  if (!status?.ready) {
    el.textContent = "Auditoría online: Firebase no configurado.";
    return;
  }

  if (!status.authenticated || !status.admin) {
    el.textContent = `Auditoría online: inicia sesión admin Firebase. Pendientes locales: ${pending}.`;
    return;
  }

  el.textContent = message || `Auditoría online preparada. Sincronizados: ${synced}. Pendientes: ${pending}.`;
}

async function syncAuditLogOnline() {
  if (!requireAdminAccess("subir auditoría online")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || !status.admin) {
    renderAuditOnlineStatus();
    showToast("Necesitas Firebase admin.");
    return;
  }

  const result = await window.AlayaCloud?.saveAuditLog?.(auditLog);

  if (result?.ok) {
    auditLog = auditLog.map(item => ({ ...item, onlineSynced: true }));
    localStorage.setItem("alaya_audit_log", JSON.stringify(auditLog));
    renderAuditLog();
    renderAuditOnlineStatus(`${result.count || auditLog.length} registros enviados a Firestore.`);
    addAuditLog("firebase", "Subir auditoría online", `${result.count || auditLog.length} registros enviados.`);
    showToast("Auditoría subida online.");
  } else {
    renderAuditOnlineStatus(`Error subiendo auditoría: ${result?.reason || "No especificado"}`);
    showToast("No se pudo subir auditoría.");
  }
}

async function loadAuditLogOnline() {
  if (!requireAdminAccess("cargar auditoría online")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || !status.admin) {
    renderAuditOnlineStatus();
    showToast("Necesitas Firebase admin.");
    return;
  }

  const result = await window.AlayaCloud?.loadAuditLog?.();

  if (result?.ok && Array.isArray(result.data)) {
    const merged = [...result.data, ...auditLog];
    const map = new Map();

    merged.forEach(item => {
      if (!item.id) item.id = crypto.randomUUID();
      map.set(item.id, { ...item, onlineSynced: Boolean(item.onlineSynced || item.onlineCreatedAt) });
    });

    auditLog = Array.from(map.values()).sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }).slice(0, 500);

    localStorage.setItem("alaya_audit_log", JSON.stringify(auditLog));
    renderAuditLog();
    renderAuditOnlineStatus(`${result.data.length} registros cargados desde Firestore.`);
    addAuditLog("firebase", "Cargar auditoría online", `${result.data.length} registros cargados.`);
    showToast("Auditoría online cargada.");
  } else {
    renderAuditOnlineStatus(`Error cargando auditoría: ${result?.reason || "No especificado"}`);
    showToast("No se pudo cargar auditoría.");
  }
}

async function testAuditOnline() {
  if (!requireAdminAccess("probar auditoría online")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || !status.admin) {
    renderAuditOnlineStatus();
    showToast("Necesitas Firebase admin.");
    return;
  }

  const result = await window.AlayaCloud?.testAuditWrite?.();

  if (result?.ok) {
    renderAuditOnlineStatus("Prueba de auditoría online correcta.");
    addAuditLog("firebase", "Probar auditoría online", "Registro de prueba creado en Firestore.");
    showToast("Auditoría online OK.");
  } else {
    renderAuditOnlineStatus(`Error en auditoría online: ${result?.reason || "No especificado"}`);
    showToast("Auditoría online falló.");
  }
}



function getFilteredAuditLog() {
  const query = (auditSearch?.value || "").toLowerCase().trim();
  const type = auditTypeFilter?.value || "";

  return auditLog.filter(item => {
    const haystack = [
      item.type,
      item.action,
      item.detail,
      item.actor,
      item.mode,
      item.createdAt
    ].join(" ").toLowerCase();

    return (!query || haystack.includes(query)) && (!type || item.type === type);
  });
}

function renderAuditSummary() {
  if (!auditSummaryGrid) return;

  const total = auditLog.length;
  const auth = auditLog.filter(item => item.type === "auth").length;
  const data = auditLog.filter(item => item.type === "data").length;
  const guard = auditLog.filter(item => item.type === "guard").length;

  auditSummaryGrid.innerHTML = `
    <div class="audit-summary-card">
      <strong>${total}</strong>
      <span>Registros totales</span>
    </div>
    <div class="audit-summary-card">
      <strong>${auth}</strong>
      <span>Eventos Auth</span>
    </div>
    <div class="audit-summary-card">
      <strong>${data}</strong>
      <span>Cambios de datos</span>
    </div>
    <div class="audit-summary-card">
      <strong>${guard}</strong>
      <span>Guard / bloqueos</span>
    </div>
  `;
}

function formatAuditDate(value) {
  if (!value) return "Sin fecha";
  return new Date(value).toLocaleString("es-ES");
}

function renderAuditLog() {
  renderAuditSummary();
  renderAuditOnlineStatus();

  if (!auditLogList) return;

  const filtered = getFilteredAuditLog();

  if (!auditLog.length) {
    auditLogList.innerHTML = "<p>No hay actividad registrada todavía.</p>";
    return;
  }

  if (!filtered.length) {
    auditLogList.innerHTML = "<p>No hay registros que coincidan con el filtro.</p>";
    return;
  }

  auditLogList.innerHTML = filtered.map(item => `
    <div class="admin-item">
      <div>
        <span class="audit-pill ${item.type}">${item.type}</span>
        <strong>${item.action}</strong>
      </div>
      <div class="audit-meta">
        <span>${formatAuditDate(item.createdAt)}</span>
        <span>Actor: ${item.actor || "sin actor"}</span>
        <span>Modo: ${item.mode || "local"}</span>
        <span class="${item.onlineSynced ? "audit-online-mark" : "audit-local-mark"}">
          ${item.onlineSynced ? "Online" : "Local"}
        </span>
      </div>
      <div class="audit-detail">${item.detail || "Sin detalle"}</div>
    </div>
  `).join("");
}

function downloadAuditCsv() {
  if (!requireAdminAccess("descargar auditoría")) return;

  const headers = ["fecha", "tipo", "accion", "detalle", "actor", "modo"];
  const rows = auditLog.map(item => [
    item.createdAt,
    item.type,
    item.action,
    item.detail,
    item.actor,
    item.mode
  ]);

  const csv = [
    headers.map(csvEscape).join(","),
    ...rows.map(row => row.map(csvEscape).join(","))
  ].join("\\n");

  downloadTextFile("alaya-auditoria.csv", csv, "text/csv");
  addAuditLog("data", "Exportar auditoría CSV", `${auditLog.length} registros exportados.`);
  showToast("Auditoría CSV descargada.");
}

function exportAuditJson() {
  if (!requireAdminAccess("exportar auditoría")) return;

  const data = {
    version: "2.5",
    exportedAt: new Date().toISOString(),
    auditLog
  };

  downloadTextFile("alaya-auditoria.json", JSON.stringify(data, null, 2));
  addAuditLog("data", "Exportar auditoría JSON", `${auditLog.length} registros exportados.`);
  showToast("Auditoría JSON exportada.");
}

function clearAuditLog() {
  if (!requireAdminAccess("vaciar auditoría")) return;
  if (!confirm("¿Seguro que quieres borrar el historial de auditoría local?")) return;

  auditLog = [];
  localStorage.setItem("alaya_audit_log", JSON.stringify(auditLog));
  renderAuditLog();
  showToast("Auditoría vaciada.");
}


const ADMIN_AUTO_LOCK_MINUTES = 30;
let adminAutoLockTimer = null;

function getAdminModeStatus() {
  const status = window.AlayaCloud?.getStatus?.();

  if (status?.mode === "firebase" && status?.ready) {
    const role = status.role || "none";

    return {
      mode: "firebase",
      valid: Boolean(status.authenticated && role !== "none"),
      role,
      label: status.authenticated && role !== "none"
        ? `Firebase · ${status.userEmail || "usuario"}`
        : "Firebase · sin rol válido"
    };
  }

  return {
    mode: "local",
    valid: localStorage.getItem("alaya_admin_logged") === "true",
    role: "admin",
    label: "Local admin"
  };
}

function getRoleLevel(role) {
  return {
    none: 0,
    viewer: 1,
    editor: 2,
    admin: 3
  }[role || "none"] || 0;
}

function getRequiredRoleForAction(actionName = "") {
  const action = String(actionName).toLowerCase();

  const adminOnly = [
    "configuración crítica",
    "ajustes",
    "firebase",
    "sincronizar",
    "subir datos",
    "cargar datos",
    "importar",
    "exportar",
    "auditoría",
    "permisos",
    "backup",
    "configuración",
    "bloqueos online"
  ];

  const editorAllowed = [
    "editar gestión diaria",
    "guardar servicios",
    "editar servicios",
    "borrar servicios",
    "guardar eventos",
    "editar eventos",
    "borrar eventos",
    "guardar productos",
    "editar productos",
    "borrar productos",
    "confirmar reservas",
    "cambiar estado",
    "contactar reservas",
    "imprimir reservas",
    "copiar",
    "recordatorios",
    "calendario",
    "notas internas",
    "borrar reservas",
    "guardar bloqueo",
    "eliminar bloqueo",
    "reserva pública"
  ];

  if (adminOnly.some(item => action.includes(item))) return "admin";
  if (editorAllowed.some(item => action.includes(item))) return "editor";

  if (action.includes("consultar panel") || action.includes("navegar") || action.includes("sesión") || action.includes("roles")) return "viewer";

  return "viewer";
}

function canRolePerform(actionName) {
  const session = getAdminModeStatus();
  const required = getRequiredRoleForAction(actionName);
  return getRoleLevel(session.role) >= getRoleLevel(required);
}

function isAdminSessionValid() {
  return getAdminModeStatus().valid;
}

function requireAdminAccess(actionName = "esta acción") {
  const status = getAdminModeStatus();

  if (status.valid && canRolePerform(actionName)) {
    resetAdminAutoLock();
    updateAdminSessionUI();
    return true;
  }

  if (status.valid && !canRolePerform(actionName)) {
    const required = getRequiredRoleForAction(actionName);
    addAuditLog("guard", "Permiso denegado", `Intento de ${actionName}. Rol actual: ${status.role}. Requiere: ${required}.`);
    showToast(`Tu rol no permite ${actionName}.`);
    updateAdminSessionUI();
    return false;
  }

  addAuditLog("guard", "Acceso bloqueado", `Intento de ${actionName} sin sesión válida.`);
  showToast(`Debes iniciar sesión para ${actionName}.`);
  adminPanel?.classList.add("hidden");
  adminLoginBox?.classList.remove("hidden");
  updateAdminSessionUI();
  return false;
}

function updateAdminSessionUI() {
  const badge = document.getElementById("adminSessionBadge");
  const timer = document.getElementById("adminSessionTimer");
  const guardModeText = document.getElementById("guardModeText");
  const roleBadge = document.getElementById("adminRoleBadge");

  if (!badge) return;

  const status = getAdminModeStatus();

  badge.classList.remove("local", "locked");

  if (status.valid && status.mode === "firebase") {
    badge.textContent = status.label;
  } else if (status.valid && status.mode === "local") {
    badge.textContent = "Local admin";
    badge.classList.add("local");
  } else {
    badge.textContent = "Panel bloqueado";
    badge.classList.add("locked");
  }

  if (roleBadge) {
    roleBadge.classList.remove("editor", "viewer", "none");
    roleBadge.classList.add(status.role === "editor" ? "editor" : status.role === "viewer" ? "viewer" : status.role === "none" ? "none" : "");
    roleBadge.textContent = status.valid ? `Rol: ${status.role}` : "Rol: sin acceso";
  }

  if (timer) {
    timer.textContent = status.valid
      ? `Auto-bloqueo: ${ADMIN_AUTO_LOCK_MINUTES} min de inactividad`
      : "Inicia sesión para continuar";
  }

  renderRoleStatus();

  if (guardModeText) {
    guardModeText.textContent = status.mode === "firebase"
      ? "Firebase Auth + Firestore Rules"
      : "Modo local de pruebas";
  }
}

function resetAdminAutoLock() {
  clearTimeout(adminAutoLockTimer);

  if (!adminModal || adminModal.classList.contains("hidden")) return;
  if (!isAdminSessionValid()) return;

  adminAutoLockTimer = setTimeout(() => {
    bloquearPanelAdmin("Auto-bloqueo por inactividad.");
  }, ADMIN_AUTO_LOCK_MINUTES * 60 * 1000);
}

function bloquearPanelAdmin(reason = "Panel bloqueado.") {
  addAuditLog("guard", "Bloquear panel", reason);
  localStorage.removeItem("alaya_admin_logged");
  adminPanel?.classList.add("hidden");
  adminLoginBox?.classList.remove("hidden");
  updateAdminSessionUI();
  showToast(reason);
}

function guardAdminAction(actionName, callback) {
  return function guardedAction(...args) {
    if (!requireAdminAccess(actionName)) return;
    addAuditLog("data", "Acción admin", actionName);
    return callback.apply(this, args);
  };
}

async function loginAdmin() {
  const user = adminUser.value.trim();
  const pass = adminPass.value.trim();

  const status = window.AlayaCloud?.getStatus?.();

  if (status?.mode === "firebase" && status?.ready) {
    const result = await window.AlayaCloud.login(user, pass);

    if (result.ok) {
      localStorage.setItem("alaya_admin_logged", "firebase");
      mostrarAdminPanel();
      renderAuthStatus();
      addAuditLog("auth", "Login Firebase", `Sesión iniciada como ${result.user?.email || user}.`);
      showToast("Firebase Auth conectado.");
    } else {
      adminLoginError.textContent = "No se pudo iniciar sesión con Firebase.";
      showToast(result.reason || "Error de Firebase Auth.");
    }

    return;
  }

  const ADMIN_CONFIG = getAdminConfig();

  if (user === ADMIN_CONFIG.user && pass === ADMIN_CONFIG.pass) {
    localStorage.setItem("alaya_admin_logged", "true");
    mostrarAdminPanel();
    addAuditLog("auth", "Login local", "Sesión local iniciada.");
    showToast("Admin conectado.");
  } else {
    adminLoginError.textContent = "Usuario o contraseña incorrectos.";
  }
}

async function logoutAdmin() {
  const status = window.AlayaCloud?.getStatus?.();

  if (status?.mode === "firebase" && status?.ready) {
    await window.AlayaCloud.logout?.();
  }

  addAuditLog("auth", "Cerrar sesión", "Sesión admin cerrada.");
  localStorage.removeItem("alaya_admin_logged");
  adminPanel.classList.add("hidden");
  adminLoginBox.classList.remove("hidden");
  renderAuthStatus();
}

function mostrarAdminPanel() {
  adminLoginBox.classList.add("hidden");
  adminPanel.classList.remove("hidden");
  renderAdminServicios();
  renderAdminEventos();
  renderAdminReservas();
  renderAdminProductos();
  fillSettingsForm();
  renderOnlineStatus();
  renderAuthStatus();
  renderFirebaseChecklist();
renderRoleStatus();
renderRoleGuardMatrix();
renderNotifications();
applyRoleGuardUx();
renderAuditLog();
updateAdminSessionUI();
  updateAdminSessionUI();
  resetAdminAutoLock();
}

function switchAdminTab(tabName) {
  $$(".admin-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.adminTab === tabName);
  });

  $$(".admin-tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === `adminTab-${tabName}`);
  });
}

// Servicios admin
function limpiarFormularioServicio() {
  if (servicioTitulo) servicioTitulo.value = "";
  if (servicioIcono) servicioIcono.value = "";
  if (servicioCategoria) servicioCategoria.value = "lecturas";
  if (servicioDuracion) servicioDuracion.value = "";
  if (servicioPrecio) servicioPrecio.value = "";
  if (servicioDestacado) servicioDestacado.checked = false;
  if (servicioEtiquetas) servicioEtiquetas.value = "";
  if (servicioDescripcion) servicioDescripcion.value = "";
  if (servicioBeneficios) servicioBeneficios.value = "";
  if (servicioPreparacion) servicioPreparacion.value = "";

  editingServicioId = null;
  if (guardarServicioBtn) guardarServicioBtn.textContent = "Guardar servicio";
}

function guardarServicioDesdeAdmin() {
  if (!requireAdminAccess("guardar servicios")) return;

  const service = normalizeService({
    id: editingServicioId || crypto.randomUUID(),
    title: servicioTitulo?.value.trim(),
    icon: servicioIcono?.value.trim() || "✦",
    category: servicioCategoria?.value || "personalizado",
    duration: servicioDuracion?.value.trim() || "Consultar",
    price: servicioPrecio?.value.trim() || "Consultar",
    featured: Boolean(servicioDestacado?.checked),
    tags: servicioEtiquetas?.value || "",
    description: servicioDescripcion?.value.trim(),
    benefits: servicioBeneficios?.value.trim() || "",
    preparation: servicioPreparacion?.value.trim() || ""
  });

  if (!service.title || !service.description) {
    showToast("Añade nombre y descripción del servicio.");
    return;
  }

  if (editingServicioId) {
    defaultServices = defaultServices.map(item => item.id === editingServicioId ? service : item);
  } else {
    defaultServices.unshift(service);
  }

  saveServices();
  limpiarFormularioServicio();
  renderServices();
  renderAdminServicios();
  renderServiceTemplateOptions?.();
  addAuditLog("data", "Guardar servicio", service.title);
  showToast("Servicio guardado.");
}

function renderAdminServicios() {
  if (!adminServiciosList) return;

  normalizeServices();
  adminServiciosList.innerHTML = "";

  if (!defaultServices.length) {
    adminServiciosList.innerHTML = "<p>No hay servicios creados todavía.</p>";
    return;
  }

  defaultServices.forEach(service => {
    const item = document.createElement("div");
    item.className = "admin-item";

    item.innerHTML = `
      <div>
        <strong>${service.icon} ${service.title}</strong>
        <span class="service-template-label">${getServiceCategoryLabel(service.category)}</span>
      </div>
      <p><b>Duración:</b> ${service.duration} · <b>Precio:</b> ${service.price || "Consultar"}</p>
      <p>${service.description}</p>
      ${service.featured ? `<p><b>Destacado:</b> Sí</p>` : ""}
      ${service.benefits ? `<p><b>Qué incluye:</b> ${service.benefits}</p>` : ""}
      ${service.preparation ? `<p><b>Preparación:</b> ${service.preparation}</p>` : ""}
      ${service.tags?.length ? `<p><b>Etiquetas:</b> ${service.tags.join(", ")}</p>` : ""}
      <div class="admin-actions">
        <button class="btn btn-secondary" onclick="editarServicio('${service.id}')">Editar</button>
        <button class="btn btn-danger" onclick="borrarServicio('${service.id}')">Borrar</button>
      </div>
    `;

    adminServiciosList.appendChild(item);
  });

  applyRoleGuardUx?.();
}

function editarServicio(id) {
  if (!requireAdminAccess("editar servicios")) return;

  const service = defaultServices.map(normalizeService).find(item => item.id === id);
  if (!service) return;

  editingServicioId = id;
  if (servicioTitulo) servicioTitulo.value = service.title;
  if (servicioIcono) servicioIcono.value = service.icon;
  if (servicioCategoria) servicioCategoria.value = service.category;
  if (servicioDuracion) servicioDuracion.value = service.duration;
  if (servicioPrecio) servicioPrecio.value = service.price;
  if (servicioDestacado) servicioDestacado.checked = Boolean(service.featured);
  if (servicioEtiquetas) servicioEtiquetas.value = service.tags.join(", ");
  if (servicioDescripcion) servicioDescripcion.value = service.description;
  if (servicioBeneficios) servicioBeneficios.value = service.benefits;
  if (servicioPreparacion) servicioPreparacion.value = service.preparation;
  if (guardarServicioBtn) guardarServicioBtn.textContent = "Actualizar servicio";
  switchAdminTab("servicios");
}

function borrarServicio(id) {
  if (!requireAdminAccess("borrar servicios")) return;
  if (!confirm("¿Seguro que quieres borrar este servicio?")) return;

  defaultServices = defaultServices.filter(service => service.id !== id);
  window.AlayaCloud?.deleteItem?.("services", id);
  saveServices();
  renderServices();
  renderAdminServicios();
  renderServiceTemplateOptions?.();
  addAuditLog("data", "Borrar servicio", id);
  showToast("Servicio borrado.");
}

// Eventos admin
function limpiarFormularioEvento() {
  eventoTitulo.value = "";
  if (eventoIcono) eventoIcono.value = "";
  if (eventoCategoria) eventoCategoria.value = "tarot";
  if (eventoNivel) eventoNivel.value = "Iniciación";
  eventoFecha.value = "";
  eventoHora.value = "";
  eventoPrecio.value = "";
  if (eventoPlazas) eventoPlazas.value = "";
  if (eventoFormato) eventoFormato.value = "";
  if (eventoUbicacion) eventoUbicacion.value = "";
  if (eventoEtiquetas) eventoEtiquetas.value = "";
  if (eventoDestacado) eventoDestacado.checked = false;
  eventoDescripcion.value = "";
  if (eventoTemario) eventoTemario.value = "";
  if (eventoMaterial) eventoMaterial.value = "";
  if (eventoNotas) eventoNotas.value = "";
  editingEventoId = null;
  guardarEventoBtn.textContent = "Guardar evento";
}

function guardarEventoDesdeAdmin() {
  if (!requireAdminAccess("guardar eventos")) return;

  const nuevoEvento = normalizeEvent({
    id: editingEventoId || crypto.randomUUID(),
    titulo: eventoTitulo.value.trim(),
    icono: eventoIcono?.value.trim() || "✦",
    categoria: eventoCategoria?.value || "otros",
    nivel: eventoNivel?.value || "Todos",
    fecha: eventoFecha.value,
    hora: eventoHora.value,
    precio: eventoPrecio.value.trim(),
    plazas: Number(eventoPlazas?.value || 0),
    formato: eventoFormato?.value.trim() || "Consultar",
    ubicacion: eventoUbicacion?.value.trim() || "",
    destacado: Boolean(eventoDestacado?.checked),
    etiquetas: eventoEtiquetas?.value || "",
    descripcion: eventoDescripcion.value.trim(),
    temario: eventoTemario?.value.trim() || "",
    material: eventoMaterial?.value.trim() || "",
    notas: eventoNotas?.value.trim() || ""
  });

  if (!nuevoEvento.titulo || !nuevoEvento.descripcion) {
    showToast("Añade título y descripción.");
    return;
  }

  if (editingEventoId) {
    eventos = eventos.map(evento => evento.id === editingEventoId ? nuevoEvento : evento);
  } else {
    eventos.unshift(nuevoEvento);
  }

  saveEventos();
  limpiarFormularioEvento();
  renderEventosPublicos();
  renderAdminEventos();
  addAuditLog("data", "Guardar evento", nuevoEvento.titulo);
  showToast("Evento guardado.");
}

function renderAdminEventos() {
  if (!adminEventosList) return;

  normalizeEventos();
  adminEventosList.innerHTML = "";

  if (eventos.length === 0) {
    adminEventosList.innerHTML = "<p>No hay eventos creados todavía.</p>";
    return;
  }

  eventos.forEach(rawEvento => {
    const evento = normalizeEvent(rawEvento);
    const availability = getEventAvailability(evento);
    const item = document.createElement("div");
    item.className = "admin-item";

    item.innerHTML = `
      <div>
        <strong>${evento.icono} ${evento.titulo}</strong>
        <span class="service-template-label">${getEventCategoryLabel(evento.categoria)}</span>
      </div>
      <p><b>Fecha:</b> ${formatFecha(evento.fecha)} · ${evento.hora || "Hora pendiente"} · <b>Precio:</b> ${evento.precio || "Consultar"}</p>
      <p><b>Nivel:</b> ${evento.nivel} · <b>Formato:</b> ${evento.formato} · <b>Plazas:</b> ${availability.label}</p>
      <p>${evento.descripcion}</p>
      ${evento.destacado ? `<p><b>Destacado:</b> Sí</p>` : ""}
      ${evento.temario ? `<p><b>Temario:</b> ${evento.temario}</p>` : ""}
      ${evento.material ? `<p><b>Material:</b> ${evento.material}</p>` : ""}
      ${evento.notas ? `<p><b>Notas:</b> ${evento.notas}</p>` : ""}
      ${evento.etiquetas?.length ? `<p><b>Etiquetas:</b> ${evento.etiquetas.join(", ")}</p>` : ""}
      <div class="admin-actions">
        <button class="btn btn-secondary" onclick="editarEvento('${evento.id}')">Editar</button>
        <button class="btn btn-danger" onclick="borrarEvento('${evento.id}')">Borrar</button>
      </div>
    `;

    adminEventosList.appendChild(item);
  });

  applyRoleGuardUx?.();
}

function editarEvento(id) {
  if (!requireAdminAccess("editar eventos")) return;

  const evento = eventos.map(normalizeEvent).find(item => item.id === id);
  if (!evento) return;

  editingEventoId = id;
  eventoTitulo.value = evento.titulo;
  if (eventoIcono) eventoIcono.value = evento.icono;
  if (eventoCategoria) eventoCategoria.value = evento.categoria;
  if (eventoNivel) eventoNivel.value = evento.nivel;
  eventoFecha.value = evento.fecha;
  eventoHora.value = evento.hora;
  eventoPrecio.value = evento.precio;
  if (eventoPlazas) eventoPlazas.value = evento.plazas || "";
  if (eventoFormato) eventoFormato.value = evento.formato;
  if (eventoUbicacion) eventoUbicacion.value = evento.ubicacion;
  if (eventoEtiquetas) eventoEtiquetas.value = evento.etiquetas.join(", ");
  if (eventoDestacado) eventoDestacado.checked = Boolean(evento.destacado);
  eventoDescripcion.value = evento.descripcion;
  if (eventoTemario) eventoTemario.value = evento.temario;
  if (eventoMaterial) eventoMaterial.value = evento.material;
  if (eventoNotas) eventoNotas.value = evento.notas;
  guardarEventoBtn.textContent = "Actualizar evento";
  switchAdminTab("eventos");
}

function borrarEvento(id) {
  if (!requireAdminAccess("borrar eventos")) return;
  if (!confirm("¿Seguro que quieres borrar este evento?")) return;
  eventos = eventos.filter(evento => evento.id !== id);
  window.AlayaCloud?.deleteItem?.("eventos", id);
  saveEventos();
  renderEventosPublicos();
  renderAdminEventos();
  addAuditLog("data", "Borrar evento", id);
  showToast("Evento borrado.");
}

// Reservas admin

function renderReservationProSummary() {
  if (!reservationProSummary) return;

  const total = reservas.length;
  const withNotes = reservas.filter(item => item.internalNote).length;
  const withConsent = reservas.filter(item => item.consent).length;
  const withCode = reservas.filter(item => item.codigo).length;

  reservationProSummary.innerHTML = `
    <div><strong>${total}</strong><span>Total reservas</span></div>
    <div><strong>${withCode}</strong><span>Con código</span></div>
    <div><strong>${withNotes}</strong><span>Con nota interna</span></div>
    <div><strong>${withConsent}</strong><span>Con consentimiento</span></div>
  `;
}


let calendarCursor = new Date();
let selectedCalendarDate = new Date().toISOString().slice(0, 10);

function dateKeyFromParts(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getMonthName(date) {
  return date.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric"
  });
}

function getReservationsByDate(dateKey) {
  return reservas
    .filter(reserva => reserva.eventoFecha === dateKey)
    .sort((a, b) => String(a.eventoHora || "").localeCompare(String(b.eventoHora || "")));
}

function countByEstado(items, estado) {
  return items.filter(item => item.estado === estado).length;
}

function renderAdminCalendar() {
  if (!calendarGrid || !calendarMonthTitle) return;

  normalizeReservas();

  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const todayKey = new Date().toISOString().slice(0, 10);

  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  calendarMonthTitle.textContent = getMonthName(calendarCursor);

  const cells = [];

  for (let i = 0; i < startOffset; i++) {
    cells.push(`<div class="calendar-day empty"></div>`);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = dateKeyFromParts(year, month, day);
    const dayReservations = getReservationsByDate(dateKey);
    const activeReservations = dayReservations.filter(item => item.estado !== "Cancelada");
    const blocks = getBlocksForDate(dateKey);
    const isBlockedDay = blocks.some(block => !block.hora);
    const isToday = dateKey === todayKey;
    const isSelected = dateKey === selectedCalendarDate;

    const dots = dayReservations.slice(0, 6).map(item => {
      const cls = String(item.estado || "Pendiente").toLowerCase();
      return `<span class="calendar-dot ${cls}"></span>`;
    }).join("");

    cells.push(`
      <button type="button" class="calendar-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} ${isBlockedDay ? "blocked-day" : ""}" onclick="selectCalendarDay('${dateKey}')">
        <span class="calendar-day-number">${day}</span>
        ${activeReservations.length ? `<span class="calendar-day-count">${activeReservations.length} cita${activeReservations.length === 1 ? "" : "s"}</span>` : ""}
        ${blocks.length ? `<span class="calendar-block-mini">${blocks.length} bloqueo${blocks.length === 1 ? "" : "s"}</span>` : ""}
        <span class="calendar-day-status">${dots}</span>
      </button>
    `);
  }

  calendarGrid.innerHTML = cells.join("");
  renderCalendarSelectedDay();
  applyRoleGuardUx();
}

function renderCalendarSelectedDay() {
  if (!calendarDayTitle || !calendarDaySummary || !calendarDayList) return;

  const items = getReservationsByDate(selectedCalendarDate);
  const pendientes = countByEstado(items, "Pendiente");
  const confirmadas = countByEstado(items, "Confirmada");
  const canceladas = countByEstado(items, "Cancelada");
  const blocks = getBlocksForDate(selectedCalendarDate);

  calendarDayTitle.textContent = `Citas del ${formatFecha(selectedCalendarDate)}`;

  calendarDaySummary.innerHTML = `
    <div><strong>${items.length}</strong><span>Total</span></div>
    <div><strong>${pendientes}</strong><span>Pendientes</span></div>
    <div><strong>${confirmadas}</strong><span>Confirmadas</span></div>
    <div><strong>${canceladas}</strong><span>Canceladas</span></div>
  `;

  const blocksHtml = blocks.length ? `
    <div class="admin-item">
      <strong>Bloqueos del día</strong>
      ${blocks.map(block => `<p><span class="block-tag">${block.hora || "Todo el día"}</span> ${block.motivo || "Sin motivo"}</p>`).join("")}
    </div>
  ` : "";

  if (!items.length) {
    calendarDayList.innerHTML = blocksHtml || "<p>No hay reservas para este día.</p>";
    return;
  }

  calendarDayList.innerHTML = blocksHtml + items.map(reserva => {
    const statusClass = (reserva.estado || "Pendiente").toLowerCase();

    return `
      <div class="admin-item">
        <div>
          <strong>${reserva.eventoHora || "Sin hora"} · ${reserva.nombre}</strong>
          <span class="reservation-code">${reserva.codigo || "Sin código"}</span>
        </div>
        <p><b>Servicio / evento:</b> ${reserva.eventoTitulo}</p>
        <p><b>Teléfono:</b> ${reserva.telefono}</p>
        <p><b>Email:</b> ${reserva.email || "No indicado"}</p>
        <span class="status ${statusClass}">${reserva.estado}</span>
        <div class="admin-item-actions">
          <button class="btn btn-secondary" onclick="contactarReserva('${reserva.id}')">Contactar</button>
          <button class="btn btn-secondary" onclick="copiarMensajeConfirmacion('${reserva.id}')">Confirmación</button>
          <button class="btn btn-secondary" onclick="copiarRecordatorioReserva('${reserva.id}')">Recordatorio</button>
          <button class="btn btn-secondary" onclick="imprimirReserva('${reserva.id}')">Imprimir</button>
        </div>
      </div>
    `;
  }).join("");
}

function selectCalendarDay(dateKey) {
  selectedCalendarDate = dateKey;
  renderAdminCalendar();
}

function changeCalendarMonth(delta) {
  calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + delta, 1);
  renderAdminCalendar();
}

function goCalendarToday() {
  calendarCursor = new Date();
  selectedCalendarDate = new Date().toISOString().slice(0, 10);
  renderAdminCalendar();
}

function renderAdminReservas() {
  normalizeReservas();
  renderReservationProSummary();

  if (!adminReservasList) return;

  const query = (reservationSearch?.value || "").toLowerCase().trim();
  const statusFilter = reservationStatusFilter?.value || "";

  const filteredReservas = reservas.filter(reserva => {
    const haystack = [
      reserva.nombre,
      reserva.telefono,
      reserva.email,
      reserva.eventoTitulo,
      reserva.estado,
      reserva.tipo
    ].join(" ").toLowerCase();

    const matchesQuery = !query || haystack.includes(query);
    const matchesStatus = !statusFilter || reserva.estado === statusFilter;

    return matchesQuery && matchesStatus;
  });

  adminReservasList.innerHTML = "";

  if (reservas.length === 0) {
    adminReservasList.innerHTML = "<p>No hay reservas recibidas todavía.</p>";
    return;
  }

  if (filteredReservas.length === 0) {
    adminReservasList.innerHTML = "<p>No hay reservas que coincidan con el filtro.</p>";
    return;
  }

  filteredReservas.forEach(reserva => {
    const item = document.createElement("div");
    item.className = "admin-item";

    const statusClass = (reserva.estado || "Pendiente").toLowerCase();

    item.innerHTML = `
      <strong>${reserva.nombre}</strong>
      <span class="reservation-code">${reserva.codigo || "Sin código"}</span>
      <p><b>Tipo:</b> ${reserva.tipo || "Reserva"}</p>
      <p><b>Servicio / Evento:</b> ${reserva.eventoTitulo}</p>
      <p><b>Fecha:</b> ${reserva.eventoFecha ? formatFecha(reserva.eventoFecha) : "No indicada"} · ${reserva.eventoHora || "Hora no indicada"}</p>
      <p><b>Teléfono:</b> ${reserva.telefono}</p>
      <p><b>Email:</b> ${reserva.email || "No indicado"}</p>
      <p><b>Mensaje:</b> ${reserva.mensaje || "Sin mensaje extra"}</p>
      <p><b>Consentimiento:</b> ${reserva.consent ? "Aceptado" : "No registrado"}</p>
      ${reserva.internalNote ? `<div class="reservation-note"><b>Nota interna:</b> ${reserva.internalNote}</div>` : ""}
      <details class="status-history">
        <summary>Historial de estado</summary>
        <ul>
          ${(reserva.statusHistory || []).map(item => `<li>${formatAuditDate ? formatAuditDate(item.fecha) : item.fecha} · ${item.estado} · ${item.detalle || ""}</li>`).join("")}
        </ul>
      </details>
      <span class="status ${statusClass}">${reserva.estado}</span>

      <div class="admin-actions">
        <button class="btn btn-secondary" onclick="cambiarEstadoReserva('${reserva.id}', 'Confirmada')">Confirmar</button>
        <button class="btn btn-secondary" onclick="cambiarEstadoReserva('${reserva.id}', 'Cancelada')">Cancelar</button>
        <button class="btn btn-secondary" onclick="contactarReserva('${reserva.id}')">Contactar</button>
        <button class="btn btn-danger" onclick="borrarReserva('${reserva.id}')">Borrar</button>
      </div>
    `;

    adminReservasList.appendChild(item);
  });
}

function cambiarEstadoReserva(id, estado) {
  addReservationHistory(id, estado, "Estado cambiado desde panel admin");
  saveReservas();
  renderAdminReservas();
  renderAdminCalendar();
  renderAdminDashboard();
  addAuditLog("data", "Cambiar estado reserva", `${id} → ${estado}`);
  showToast(`Reserva ${estado.toLowerCase()}.`);
}

function marcarReservaConfirmada(id) {
  cambiarEstadoReserva(id, "Confirmada");
}

function contactarReserva(id) {
  const reserva = reservas.find(item => item.id === id);
  if (!reserva) return;

  const texto = `
Hola ${reserva.nombre}, te escribimos de Alaya Holistics para confirmar tu reserva de ${reserva.eventoTitulo}.
  `.trim();

  const phone = reserva.telefono.replace(/\D/g, "");
  if (phone.length >= 8) {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(texto)}`, "_blank");
  } else {
    showToast("Teléfono no válido para WhatsApp.");
  }
}

function padIcs(value) {
  return String(value).padStart(2, "0");
}

function toIcsDate(fecha, hora) {
  const safeFecha = fecha || new Date().toISOString().slice(0, 10);
  const safeHora = hora || "10:00";
  const [year, month, day] = safeFecha.split("-").map(Number);
  const [hour, minute] = safeHora.split(":").map(Number);
  return `${year}${padIcs(month)}${padIcs(day)}T${padIcs(hour)}${padIcs(minute)}00`;
}

function descargarIcsReserva(id) {
  const reserva = reservas.find(item => item.id === id);
  if (!reserva) return;

  const start = toIcsDate(reserva.eventoFecha, reserva.eventoHora);
  const endHour = reserva.eventoHora ? String(Number(reserva.eventoHora.split(":")[0]) + 1).padStart(2, "0") + ":" + reserva.eventoHora.split(":")[1] : "11:00";
  const end = toIcsDate(reserva.eventoFecha, endHour);

  const description = [
    `Cliente: ${reserva.nombre}`,
    `Teléfono: ${reserva.telefono}`,
    `Email: ${reserva.email || "No indicado"}`,
    `Mensaje: ${reserva.mensaje || "Sin mensaje"}`
  ].join("\\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Alaya Holistics//Reservas//ES",
    "BEGIN:VEVENT",
    `UID:${reserva.id}@alaya-holistics`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${reserva.eventoTitulo || "Reserva Alaya Holistics"}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  downloadTextFile(`reserva-${reserva.nombre || "alaya"}.ics`, ics, "text/calendar");
  showToast("Calendario descargado.");
}

async function copiarRecordatorioReserva(id) {
  const reserva = reservas.find(item => item.id === id);
  if (!reserva) return;

  await copyTextToClipboard(buildClientMessage(reserva, "recordatorio"), "Recordatorio copiado.");
}

function renderOnlineStatus() {
  const dot = document.getElementById("onlineStatusDot");
  const title = document.getElementById("onlineStatusTitle");
  const text = document.getElementById("onlineStatusText");

  if (!dot || !title || !text) return;

  const status = window.AlayaCloud?.getStatus?.() || {
    mode: "local",
    provider: "none",
    ready: false,
    message: "Modo local activo."
  };

  dot.classList.remove("online", "offline");

  if (status.ready) {
    dot.classList.add("online");
    title.textContent = "Modo online preparado";
  } else {
    dot.classList.add(status.mode === "local" ? "offline" : "offline");
    title.textContent = status.mode === "local" ? "Modo local activo" : "Modo online sin configurar";
  }

  text.textContent = status.message || "La web está funcionando correctamente.";

  const lastSync = localStorage.getItem("alaya_last_sync") || "nunca";
  const lastSyncEl = document.getElementById("onlineLastSync");
  if (lastSyncEl) lastSyncEl.textContent = `Última sincronización: ${lastSync}`;
}


async function cargarDatosDesdeOnline() {
  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready) {
    renderOnlineStatus();
    showToast("Firebase no está configurado.");
    return;
  }

  showToast("Cargando datos online...");

  const [settingsResult, servicesResult, eventosResult, productosResult, reservasResult] = await Promise.all([
    window.AlayaCloud.loadSettings(),
    window.AlayaCloud.loadCollection("services"),
    window.AlayaCloud.loadCollection("eventos"),
    window.AlayaCloud.loadCollection("productos"),
    window.AlayaCloud.loadCollection("reservas")
  ]);

  if (settingsResult.ok && settingsResult.data) {
    appSettings = { ...appSettings, ...settingsResult.data };
    localStorage.setItem("alaya_settings", JSON.stringify(appSettings));
  }

  if (servicesResult.ok && Array.isArray(servicesResult.data) && servicesResult.data.length) {
    services = servicesResult.data;
    localStorage.setItem("alaya_services", JSON.stringify(services));
  }

  if (eventosResult.ok && Array.isArray(eventosResult.data) && eventosResult.data.length) {
    eventos = eventosResult.data;
    localStorage.setItem("alaya_eventos", JSON.stringify(eventos));
  }

  if (productosResult.ok && Array.isArray(productosResult.data) && productosResult.data.length) {
    productos = productosResult.data;
    localStorage.setItem("alaya_productos", JSON.stringify(productos));
  }

  if (reservasResult.ok && Array.isArray(reservasResult.data)) {
    reservas = reservasResult.data;
    localStorage.setItem("alaya_reservas", JSON.stringify(reservas));
  }

  applySettingsToPage();
  fillSettingsForm();
  renderServices();
  renderEventosPublicos();
  renderProductosPublicos();
  renderAdminDashboard();
  renderAdminServicios();
  renderAdminEventos();
  renderAdminProductos();
  renderAdminReservas();
  markLastSync("Cargado online");
  renderOnlineStatus();
  addAuditLog("firebase", "Cargar datos online", "Datos leídos desde Firestore.");
  showToast("Datos online cargados.");
}

async function subirDatosLocalesOnline() {
  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready) {
    renderOnlineStatus();
    showToast("Firebase no está configurado.");
    return;
  }

  showToast("Subiendo datos locales...");

  const results = await Promise.all([
    window.AlayaCloud.saveSettings(appSettings),
    window.AlayaCloud.saveCollection("services", services),
    window.AlayaCloud.saveCollection("eventos", eventos),
    window.AlayaCloud.saveCollection("productos", productos),
    window.AlayaCloud.saveCollection("reservas", reservas)
  ]);

  const ok = results.every(result => result.ok);

  if (ok) {
    markLastSync("Subido todo");
    addAuditLog("firebase", "Subir datos locales", "Datos enviados a Firestore.");
    showToast("Datos locales subidos.");
  } else {
    const failed = results.find(result => !result.ok);
    showToast(failed?.reason || "No se pudo subir todo.");
  }

  renderOnlineStatus();
}

async function sincronizarOnline() {
  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready) {
    renderOnlineStatus();
    showToast("Firebase no está configurado.");
    return;
  }

  await subirDatosLocalesOnline();
  await cargarDatosDesdeOnline();
}




async function enviarResetPasswordFirebase() {
  const status = window.AlayaCloud?.getStatus?.();
  const email = adminUser?.value?.trim();

  if (!email) {
    showToast("Escribe primero el email admin.");
    return;
  }

  if (status?.mode !== "firebase" || !status.ready) {
    showToast("Firebase Auth no está configurado.");
    return;
  }

  const result = await window.AlayaCloud.resetPassword?.(email);

  if (result?.ok) {
    showToast("Email de recuperación enviado.");
  } else {
    showToast(result?.reason || "No se pudo enviar recuperación.");
  }

  renderAuthStatus();
}

async function testReservaPublicaFirebase() {
  const status = window.AlayaCloud?.getStatus?.();
  const log = document.getElementById("firebaseCheckerLog");

  if (status?.mode !== "firebase" || !status.ready) {
    showToast("Firebase no está configurado.");
    if (log) log.textContent = "No se puede probar reserva pública porque Firebase no está configurado.";
    return;
  }

  const reservaPrueba = {
    id: `test_public_${Date.now()}`,
    tipo: "Prueba pública",
    eventoId: null,
    eventoTitulo: "Reserva pública de prueba",
    eventoFecha: new Date().toISOString().slice(0, 10),
    eventoHora: "10:00",
    nombre: "Prueba Alaya",
    telefono: "600000000",
    email: "prueba@alaya.test",
    mensaje: "Esta reserva fue creada desde el comprobador v2.3.",
    fechaReserva: new Date().toISOString(),
    estado: "Pendiente",
    consent: true,
    internalNote: "",
    statusHistory: [
      {
        estado: "Pendiente",
        fecha: new Date().toISOString(),
        actor: "cliente",
        detalle: "Reserva creada desde evento público"
      }
    ]
  };

  if (log) log.textContent = "Probando creación de reserva pública online...";

  const result = await window.AlayaCloud.createPublicReservation?.(reservaPrueba);

  if (result?.ok) {
    if (log) {
      log.textContent =
        "Reserva pública creada correctamente en Firestore.\\n" +
        "Puedes borrarla desde Firebase Console o desde el panel si has iniciado sesión como admin.";
    }
    addAuditLog("firebase", "Probar reserva pública", "Reserva pública creada correctamente.");
    showToast("Reserva pública OK.");
  } else {
    if (log) {
      log.textContent =
        `Error creando reserva pública:\\n${result?.reason || "No especificado"}\\n\\n` +
        "Comprueba las reglas de Firestore y que allow create esté permitido para alaya_reservas.";
    }
    showToast("Reserva pública falló.");
  }

  renderFirebaseChecklist();
renderRoleStatus();
renderRoleGuardMatrix();
renderNotifications();
applyRoleGuardUx();
renderAuditLog();
updateAdminSessionUI();
  renderOnlineStatus();
  renderAuthStatus();
}



function getRoleLabel(role) {
  return {
    admin: "Admin",
    editor: "Editor",
    viewer: "Solo lectura",
    none: "Sin acceso"
  }[role || "none"] || role;
}

function getPermissionGroups() {
  return [
    {
      id: "view",
      label: "Consultar panel",
      required: "viewer",
      description: "Dashboard, calendario, reservas y estado general"
    },
    {
      id: "edit",
      label: "Editar gestión diaria",
      required: "editor",
      description: "Servicios, eventos, productos, reservas, notas y bloqueos"
    },
    {
      id: "admin",
      label: "Configuración crítica",
      required: "admin",
      description: "Ajustes, Firebase, importación/exportación y sincronización"
    },
    {
      id: "audit",
      label: "Auditoría online",
      required: "admin",
      description: "Logs, pruebas de permisos y operaciones sensibles"
    }
  ];
}

function inferAdminButtonAction(button) {
  const text = (button.textContent || "").toLowerCase().trim();
  const onclick = (button.getAttribute("onclick") || "").toLowerCase();
  const id = (button.id || "").toLowerCase();
  const all = `${text} ${onclick} ${id}`;

  if (button.classList.contains("admin-tab")) return "navegar panel";
  if (["logoutadminbtn", "lockadminbtn"].includes(id)) return "sesión";
  if (all.includes("cerrar sesión") || all.includes("bloquear panel")) return "sesión";
  if (all.includes("mes anterior") || all.includes("mes siguiente") || all.includes("hoy")) return "calendario navegación";
  if (all.includes("actualizar rol") || all.includes("copiar resumen de roles")) return "consultar roles";

  if (
    all.includes("firebase")
    || all.includes("online")
    || all.includes("sincronizar")
    || all.includes("subir datos")
    || all.includes("cargar datos")
    || all.includes("permisos")
    || all.includes("importar")
    || all.includes("exportar")
    || all.includes("csv")
    || all.includes("json")
    || all.includes("auditoría")
    || all.includes("vaciar")
    || all.includes("reset")
  ) {
    return "configuración crítica";
  }

  if (
    all.includes("guardar")
    || all.includes("editar")
    || all.includes("borrar")
    || all.includes("eliminar")
    || all.includes("confirmar")
    || all.includes("cancelar")
    || all.includes("nota")
    || all.includes("bloqueo")
    || all.includes("producto")
    || all.includes("servicio")
    || all.includes("evento")
    || all.includes("reserva")
  ) {
    return "editar gestión diaria";
  }

  if (
    all.includes("contactar")
    || all.includes("imprimir")
    || all.includes("recordatorio")
    || all.includes("confirmación")
    || all.includes("calendario")
  ) {
    return "consultar panel";
  }

  return "consultar panel";
}

function applyRoleGuardUx() {
  const session = getAdminModeStatus();
  const buttons = document.querySelectorAll("#adminPanel button");

  buttons.forEach(button => {
    const action = inferAdminButtonAction(button);
    const required = getRequiredRoleForAction(action);
    const allowed = !session.valid || canRolePerform(action);

    button.classList.toggle("role-locked", session.valid && !allowed);
    button.disabled = session.valid && !allowed;
    button.title = session.valid && !allowed
      ? `Bloqueado para rol ${getRoleLabel(session.role)}. Requiere ${getRoleLabel(required)}.`
      : "";
  });

  renderRoleGuardMatrix();
}

function renderRoleGuardMatrix() {
  if (!roleGuardMatrix) return;

  const session = getAdminModeStatus();
  const groups = getPermissionGroups();

  roleGuardMatrix.innerHTML = groups.map(group => {
    const allowed = getRoleLevel(session.role) >= getRoleLevel(group.required);

    return `
      <div class="role-guard-cell ${allowed ? "allowed" : "denied"}">
        <strong>${allowed ? "✅" : "🔒"} ${group.label}</strong>
        <span>Requiere: ${getRoleLabel(group.required)}</span>
        <span>${group.description}</span>
      </div>
    `;
  }).join("");

  if (roleGuardStatus) {
    roleGuardStatus.textContent = session.valid
      ? `Role Guard activo · Rol actual: ${getRoleLabel(session.role)}.`
      : "Role Guard activo · Inicia sesión para calcular permisos.";
  }
}

function renderRoleStatus() {
  if (!roleStatusLog) return;

  const session = getAdminModeStatus();
  const status = window.AlayaCloud?.getStatus?.();
  const role = session.role || "none";

  if (session.mode === "local") {
    roleStatusLog.textContent = "Rol actual: admin local. Útil para pruebas, no para seguridad real.";
    return;
  }

  if (!status?.ready) {
    roleStatusLog.textContent = "Rol actual: Firebase sin configurar.";
    return;
  }

  if (!session.valid) {
    roleStatusLog.textContent = "Rol actual: sin sesión o email fuera de las listas de roles.";
    return;
  }

  const permissions = {
    admin: "control total",
    editor: "puede editar contenido, reservas, calendario y bloqueos",
    viewer: "solo lectura del panel"
  }[role] || "sin permisos";

  roleStatusLog.textContent = `Rol actual: ${role} · ${permissions}. Email: ${status.userEmail || "sin email"}`;
}

async function copyRoleSummary() {
  const session = getAdminModeStatus();
  const status = window.AlayaCloud?.getStatus?.();
  const roles = window.AlayaCloud?.getRoleEmails?.() || { admin: [], editor: [], viewer: [] };

  const text = [
    "Resumen roles Alaya Holistics",
    "-----------------------------",
    `Modo: ${session.mode}`,
    `Rol actual: ${session.role}`,
    `Email actual: ${status?.userEmail || "no conectado"}`,
    "",
    `Admins: ${roles.admin.join(", ") || "sin configurar"}`,
    `Editores: ${roles.editor.join(", ") || "sin configurar"}`,
    `Solo lectura: ${roles.viewer.join(", ") || "sin configurar"}`
  ].join("\\n");

  try {
    await navigator.clipboard.writeText(text);
    showToast("Resumen de roles copiado.");
  } catch (error) {
    showToast("No se pudo copiar el resumen.");
  }
}

function renderFirebaseChecklist() {
  const grid = document.getElementById("firebaseCheckerGrid");
  const log = document.getElementById("firebaseCheckerLog");

  if (!grid) return;

  const check = window.AlayaCloud?.getConfigCheck?.();

  if (!check) {
    grid.innerHTML = `
      <div class="checker-item">
        <span class="checker-icon bad">!</span>
        <div>
          <span class="checker-title">Cloud adapter no disponible</span>
          <span class="checker-text">No se pudo leer js/cloud-adapter.js.</span>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = check.checks.map(item => {
    const icon = item.level === "ok" ? "✓" : item.level === "warn" ? "!" : "×";

    return `
      <div class="checker-item">
        <span class="checker-icon ${item.level}">${icon}</span>
        <div>
          <span class="checker-title">${item.title}</span>
          <span class="checker-text">${item.text}</span>
        </div>
      </div>
    `;
  }).join("");

  if (log) {
    log.textContent = check.ok
      ? "Configuración básica correcta. Ahora prueba conexión y permisos."
      : "Hay avisos pendientes. Revisa los puntos marcados antes de publicar.";
  }

  renderOnlineStatus();
  renderAuthStatus();
  renderFirebaseChecklist();
renderRoleStatus();
renderRoleGuardMatrix();
renderNotifications();
applyRoleGuardUx();
renderAuditLog();
updateAdminSessionUI();
  updateAdminSessionUI();
  resetAdminAutoLock();
}

async function testFirebaseConnection() {
  const log = document.getElementById("firebaseCheckerLog");

  if (log) log.textContent = "Probando conexión con Firebase...";

  const result = await window.AlayaCloud?.testConnection?.();

  if (!result) {
    if (log) log.textContent = "No se pudo ejecutar la prueba de conexión.";
    showToast("Prueba no disponible.");
    return;
  }

  if (result.ok) {
    if (log) log.textContent = result.message || "Conexión correcta.";
    addAuditLog("firebase", "Probar conexión", "Conexión Firestore correcta.");
    showToast("Conexión Firebase correcta.");
  } else {
    if (log) log.textContent = `Error de conexión:\n${result.reason || "No especificado"}`;
    showToast("Firebase no conecta.");
  }

  renderOnlineStatus();
  renderAuthStatus();
  renderFirebaseChecklist();
renderRoleStatus();
renderRoleGuardMatrix();
renderNotifications();
applyRoleGuardUx();
renderAuditLog();
updateAdminSessionUI();
  updateAdminSessionUI();
  resetAdminAutoLock();
}

async function testFirebasePermissions() {
  const log = document.getElementById("firebaseCheckerLog");

  if (log) log.textContent = "Probando permisos admin...";

  const result = await window.AlayaCloud?.testAdminPermissions?.();

  if (!result) {
    if (log) log.textContent = "No se pudo ejecutar la prueba de permisos.";
    showToast("Prueba no disponible.");
    return;
  }

  if (result.ok) {
    if (log) log.textContent = result.message || "Permisos correctos.";
    addAuditLog("firebase", "Probar permisos admin", "Escritura y borrado correctos.");
    showToast("Permisos admin correctos.");
  } else {
    if (log) {
      log.textContent =
        `Error de permisos:\n${result.reason || "No especificado"}\n\n` +
        "Comprueba que has iniciado sesión con el email admin y que firebase/firestore.rules está publicado.";
    }
    showToast("Permisos no válidos.");
  }

  renderOnlineStatus();
  renderAuthStatus();
  renderFirebaseChecklist();
renderRoleStatus();
renderRoleGuardMatrix();
renderNotifications();
applyRoleGuardUx();
renderAuditLog();
updateAdminSessionUI();
  updateAdminSessionUI();
  resetAdminAutoLock();
}

async function copyFirebaseSummary() {
  const status = window.AlayaCloud?.getStatus?.();
  const check = window.AlayaCloud?.getConfigCheck?.();

  const lines = [
    "Resumen Firebase Alaya Holistics",
    "--------------------------------",
    `Modo: ${status?.mode || "desconocido"}`,
    `Firebase listo: ${status?.ready ? "sí" : "no"}`,
    `Auth listo: ${status?.authReady ? "sí" : "no"}`,
    `Sesión iniciada: ${status?.authenticated ? "sí" : "no"}`,
    `Admin: ${status?.admin ? "sí" : "no"}`,
    `Email: ${status?.userEmail || "no conectado"}`,
    "",
    "Checks:",
    ...(check?.checks || []).map(item => `- ${item.title}: ${item.level.toUpperCase()} · ${item.text}`)
  ];

  try {
    await navigator.clipboard.writeText(lines.join("\\n"));
    showToast("Resumen copiado.");
  } catch (error) {
    showToast("No se pudo copiar el resumen.");
  }
}


function renderAuthStatus() {
  const dot = document.getElementById("authStatusDot");
  const title = document.getElementById("authStatusTitle");
  const text = document.getElementById("authStatusText");

  if (!dot || !title || !text) return;

  const status = window.AlayaCloud?.getStatus?.();

  dot.classList.remove("online", "offline");

  if (!status || status.mode !== "firebase") {
    dot.classList.add("offline");
    title.textContent = "Auth en modo local";
    text.textContent = "Firebase Authentication no está activo porque la web está en modo local.";
    return;
  }

  if (!status.ready) {
    dot.classList.add("offline");
    title.textContent = "Auth sin configurar";
    text.textContent = "Configura Firebase en js/backend-config.js.";
    return;
  }

  if (status.authenticated && status.role && status.role !== "none") {
    dot.classList.add("online");
    title.textContent = `Sesión ${status.role} iniciada`;
    text.textContent = `Conectado como ${status.userEmail || "usuario"} con rol ${status.role}.`;
    return;
  }

  if (status.authenticated && (!status.role || status.role === "none")) {
    dot.classList.add("offline");
    title.textContent = "Sesión sin rol";
    text.textContent = "El usuario está conectado, pero no está en ninguna lista de roles.";
    return;
  }

  dot.classList.add("offline");
  title.textContent = "Auth listo, sin sesión";
  text.textContent = "Inicia sesión desde el panel admin con email y contraseña. Si no recuerdas la contraseña, usa recuperación.";
}

async function cerrarSesionFirebase() {
  const status = window.AlayaCloud?.getStatus?.();

  if (status?.mode !== "firebase" || !status.ready) {
    showToast("Firebase Auth no está activo.");
    renderAuthStatus();
    return;
  }

  await window.AlayaCloud.logout?.();
  addAuditLog("auth", "Cerrar sesión", "Sesión admin cerrada.");
  localStorage.removeItem("alaya_admin_logged");
  adminPanel.classList.add("hidden");
  adminLoginBox.classList.remove("hidden");
  renderAuthStatus();
  showToast("Sesión Firebase cerrada.");
}

function mostrarGuiaOnline() {
  alert(`Guía rápida:
1. Abre docs/FIREBASE-PASO-A-PASO.md
2. Crea un proyecto en Firebase.
3. Copia tus claves en js/backend-config.js.
4. Cambia mode: "local" por mode: "firebase".
5. Sube la web de nuevo.
6. Usa la pestaña Online para subir o cargar datos.

Hasta entonces, la web funciona en modo local.`);
}

function probarModoOnline() {
  renderOnlineStatus();
  renderAuthStatus();
  renderFirebaseChecklist();
renderRoleStatus();
renderRoleGuardMatrix();
renderNotifications();
applyRoleGuardUx();
renderAuditLog();
updateAdminSessionUI();
  updateAdminSessionUI();
  resetAdminAutoLock();
  const status = window.AlayaCloud?.getStatus?.();
  showToast(status?.message || "Modo local activo.");
}


function editarNotaReserva(id) {
  const reserva = reservas.find(item => item.id === id);
  if (!reserva) return;

  const nota = prompt("Nota interna para esta reserva:", reserva.internalNote || "");
  if (nota === null) return;

  reservas = reservas.map(item => item.id === id ? { ...item, internalNote: nota.trim() } : item);
  saveReservas();
  renderAdminReservas();
  addAuditLog("data", "Editar nota interna", `${reserva.codigo || id}`);
  showToast("Nota interna guardada.");
}

async function copiarMensajeConfirmacion(id) {
  const reserva = reservas.find(item => item.id === id);
  if (!reserva) return;

  await copyTextToClipboard(buildClientMessage(reserva, "confirmacion"), "Mensaje de confirmación copiado.");
}

async function copiarMensajeCancelacion(id) {
  const reserva = reservas.find(item => item.id === id);
  if (!reserva) return;

  await copyTextToClipboard(buildClientMessage(reserva, "cancelacion"), "Mensaje de cancelación copiado.");
}

function borrarReserva(id) {
  if (!confirm("¿Seguro que quieres borrar esta reserva?")) return;
  reservas = reservas.filter(reserva => reserva.id !== id);
  window.AlayaCloud?.deleteItem?.("reservas", id);
  saveReservas();
  renderAdminReservas();
  addAuditLog("data", "Borrar reserva", id);
  showToast("Reserva borrada.");
}

// Productos admin
function limpiarFormularioProducto() {
  productoNombre.value = "";
  productoPrecio.value = "";
  if (productoCategoria) productoCategoria.value = "infusiones";
  if (productoStock) productoStock.value = "Disponible";
  if (productoIcono) productoIcono.value = "";
  if (productoFormato) productoFormato.value = "";
  if (productoEtiquetas) productoEtiquetas.value = "";
  if (productoDestacado) productoDestacado.checked = false;
  productoDescripcion.value = "";
  if (productoUso) productoUso.value = "";
  if (productoIngredientes) productoIngredientes.value = "";
  if (productoNotas) productoNotas.value = "";
  editingProductoId = null;
  guardarProductoBtn.textContent = "Guardar producto";
}

function guardarProductoDesdeAdmin() {
  const producto = normalizeProduct({
    id: editingProductoId || crypto.randomUUID(),
    nombre: productoNombre.value.trim(),
    precio: productoPrecio.value.trim(),
    categoria: productoCategoria?.value || "complementos",
    stock: productoStock?.value || "Consultar",
    icono: productoIcono?.value.trim() || "♧",
    formato: productoFormato?.value.trim() || "",
    destacado: Boolean(productoDestacado?.checked),
    etiquetas: productoEtiquetas?.value || "",
    descripcion: productoDescripcion.value.trim(),
    uso: productoUso?.value.trim() || "",
    ingredientes: productoIngredientes?.value.trim() || "",
    notas: productoNotas?.value.trim() || ""
  });

  if (!producto.nombre || !producto.descripcion) {
    showToast("Añade nombre y descripción.");
    return;
  }

  if (editingProductoId) {
    productos = productos.map(item => item.id === editingProductoId ? producto : item);
  } else {
    productos.unshift(producto);
  }

  saveProductos();
  limpiarFormularioProducto();
  renderProductosPublicos();
  renderAdminProductos();
  addAuditLog("data", "Guardar producto", producto.nombre);
  showToast("Producto guardado.");
}

function renderAdminProductos() {
  normalizeProductos();
  adminProductosList.innerHTML = "";

  if (productos.length === 0) {
    adminProductosList.innerHTML = "<p>No hay productos creados todavía.</p>";
    return;
  }

  productos.forEach(rawProducto => {
    const producto = normalizeProduct(rawProducto);
    const item = document.createElement("div");
    item.className = "admin-item";

    item.innerHTML = `
      <div>
        <strong>${producto.icono || "♧"} ${producto.nombre}</strong>
        <span class="service-template-label">${getCategoryLabel(producto.categoria)}</span>
      </div>
      <p><b>Precio:</b> ${producto.precio || "Consultar"} · <b>Stock:</b> ${producto.stock || "Consultar"} · <b>Formato:</b> ${producto.formato || "Consultar"}</p>
      <p>${producto.descripcion}</p>
      ${producto.destacado ? `<p><b>Destacado:</b> Sí</p>` : ""}
      ${producto.uso ? `<p><b>Uso / consejo:</b> ${producto.uso}</p>` : ""}
      ${producto.ingredientes ? `<p><b>Ingredientes / contenido:</b> ${producto.ingredientes}</p>` : ""}
      ${producto.notas ? `<p><b>Notas:</b> ${producto.notas}</p>` : ""}
      ${producto.etiquetas?.length ? `<p><b>Etiquetas:</b> ${producto.etiquetas.join(", ")}</p>` : ""}
      <div class="admin-actions">
        <button class="btn btn-secondary" onclick="editarProducto('${producto.id}')">Editar</button>
        <button class="btn btn-danger" onclick="borrarProducto('${producto.id}')">Borrar</button>
      </div>
    `;

    adminProductosList.appendChild(item);
  });
}

function editarProducto(id) {
  const producto = productos.map(normalizeProduct).find(item => item.id === id);
  if (!producto) return;

  editingProductoId = id;
  productoNombre.value = producto.nombre;
  productoPrecio.value = producto.precio;
  if (productoCategoria) productoCategoria.value = producto.categoria;
  if (productoStock) productoStock.value = producto.stock;
  if (productoIcono) productoIcono.value = producto.icono;
  if (productoFormato) productoFormato.value = producto.formato;
  if (productoEtiquetas) productoEtiquetas.value = producto.etiquetas.join(", ");
  if (productoDestacado) productoDestacado.checked = Boolean(producto.destacado);
  productoDescripcion.value = producto.descripcion;
  if (productoUso) productoUso.value = producto.uso;
  if (productoIngredientes) productoIngredientes.value = producto.ingredientes;
  if (productoNotas) productoNotas.value = producto.notas;
  guardarProductoBtn.textContent = "Actualizar producto";
  switchAdminTab("productos");
}

function borrarProducto(id) {
  if (!confirm("¿Seguro que quieres borrar este producto?")) return;
  productos = productos.filter(producto => producto.id !== id);
  window.AlayaCloud?.deleteItem?.("productos", id);
  saveProductos();
  renderProductosPublicos();
  renderAdminProductos();
  addAuditLog("data", "Borrar producto", id);
  showToast("Producto borrado.");
}


// ======================================================
// Ajustes, exportación e importación
// ======================================================

function guardarAjustesDesdeAdmin() {
  appSettings = {
    businessName: settingBusinessName.value.trim() || "Alaya Holistics",
    tagline: settingTagline.value.trim() || "Un espacio para reconectar contigo",
    whatsapp: settingWhatsapp.value.trim() || "34600000000",
    email: settingEmail.value.trim() || "reservas@alayaholistics.com",
    adminUser: settingAdminUser.value.trim() || "admin",
    adminPass: settingAdminPass.value.trim() || "alaya2026",
    availability: {
      openDays: (settingOpenDays?.value || "1,2,3,4,5")
        .split(",")
        .map(item => item.trim())
        .filter(item => /^[0-6]$/.test(item)),
      openStart: settingOpenStart?.value || "10:00",
      openEnd: settingOpenEnd?.value || "20:00",
      slotMinutes: Number(settingSlotMinutes?.value || 60),
      maxPerSlot: Math.max(1, Number(settingMaxPerSlot?.value || 1)),
      closedDates: normalizeClosedDates(settingClosedDates?.value || "")
    },
    messageTemplates: {
      confirmacion: settingTplConfirmacion?.value || DEFAULT_MESSAGE_TEMPLATES.confirmacion,
      cancelacion: settingTplCancelacion?.value || DEFAULT_MESSAGE_TEMPLATES.cancelacion,
      recordatorio: settingTplRecordatorio?.value || DEFAULT_MESSAGE_TEMPLATES.recordatorio,
      adminReserva: settingTplAdminReserva?.value || DEFAULT_MESSAGE_TEMPLATES.adminReserva
    },
    serviceTemplates: appSettings.serviceTemplates || {},
    branding: collectBrandingFromForm()
  };

  saveSettings();
  applySettingsToPage();
  addAuditLog("data", "Guardar ajustes", appSettings.businessName || "Ajustes");
  showToast("Ajustes guardados.");
}

function downloadTextFile(filename, content, mime = "application/json") {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportarDatosJson() {
  const data = {
    version: "1.1",
    exportedAt: new Date().toISOString(),
    settings: appSettings,
    services: defaultServices,
    eventos,
    productos,
    reservas
  };

  downloadTextFile("alaya-holistics-backup.json", JSON.stringify(data, null, 2));
  addAuditLog("data", "Exportar backup JSON", "Copia de seguridad general.");
  showToast("Datos exportados.");
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function descargarReservasCsv() {
  const headers = ["codigo", "tipo", "estado", "nombre", "telefono", "email", "servicio_evento", "fecha", "hora", "mensaje", "nota_interna", "consentimiento", "fecha_reserva"];
  const rows = reservas.map(reserva => [
    reserva.codigo || "",
    reserva.tipo || "",
    reserva.estado || "",
    reserva.nombre || "",
    reserva.telefono || "",
    reserva.email || "",
    reserva.eventoTitulo || "",
    reserva.eventoFecha || "",
    reserva.eventoHora || "",
    reserva.mensaje || "",
    reserva.internalNote || "",
    reserva.consent ? "si" : "no",
    reserva.fechaReserva || ""
  ]);

  const csv = [
    headers.map(csvEscape).join(","),
    ...rows.map(row => row.map(csvEscape).join(","))
  ].join("\n");

  downloadTextFile("alaya-reservas.csv", csv, "text/csv");
  addAuditLog("data", "Descargar reservas CSV", `${reservas.length} reservas.`);
  showToast("CSV descargado.");
}

function importarDatosJson(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = event => {
    try {
      const data = JSON.parse(event.target.result);

      if (!data || typeof data !== "object") {
        throw new Error("Archivo no válido");
      }

      if (Array.isArray(data.services)) defaultServices = data.services;
      if (Array.isArray(data.eventos)) eventos = data.eventos;
      if (Array.isArray(data.productos)) productos = data.productos;
      if (Array.isArray(data.reservas)) reservas = data.reservas;
      if (data.settings && typeof data.settings === "object") appSettings = { ...appSettings, ...data.settings };

      saveServices();
      saveEventos();
      saveProductos();
      saveReservas();
      saveSettings();

      renderEventosPublicos();
      renderProductosPublicos();
      renderAdminEventos();
      renderAdminProductos();
      renderAdminReservas();
      fillSettingsForm();
      applySettingsToPage();

      addAuditLog("data", "Importar JSON", "Datos importados desde archivo.");
      showToast("Datos importados correctamente.");
    } catch (error) {
      showToast("No se pudo importar el JSON.");
    } finally {
      importDataInput.value = "";
    }
  };

  reader.readAsText(file);
}

let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installPwaBtn?.classList.remove("hidden");
});

async function instalarPwa() {
  if (!deferredInstallPrompt) {
    showToast("Instalación no disponible en este navegador.");
    return;
  }

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installPwaBtn?.classList.add("hidden");
}



// ======================================================
// Protección de acciones admin globales
// ======================================================

function protectAdminGlobals() {
  const protectedActions = [
    ["setServiceCategory", "consultar panel"],
    ["filterServiceByTag", "consultar panel"],
    ["openServiceDetail", "consultar panel"],
    ["closeServiceDetail", "consultar panel"],
    ["consultarServicio", "consultar panel"],
    ["editarServicio", "editar servicios"],
    ["borrarServicio", "borrar servicios"],
    ["setEventCategory", "consultar panel"],
    ["filterEventByTag", "consultar panel"],
    ["openEventDetail", "consultar panel"],
    ["closeEventDetail", "consultar panel"],
    ["consultarEvento", "consultar panel"],
    ["editarEvento", "editar eventos"],
    ["borrarEvento", "borrar eventos"],
    ["marcarReservaConfirmada", "confirmar reservas"],
    ["cambiarEstadoReserva", "cambiar estado de reservas"],
    ["contactarReserva", "contactar reservas"],
    ["imprimirReserva", "imprimir reservas"],
    ["descargarIcsReserva", "descargar calendario de reservas"],
    ["copiarRecordatorioReserva", "copiar recordatorios"],
    ["copiarMensajeConfirmacion", "copiar confirmaciones"],
    ["copiarMensajeCancelacion", "copiar cancelaciones"],
    ["editarNotaReserva", "editar notas internas"],
    ["borrarReserva", "borrar reservas"],
    ["setHerbCategory", "consultar panel"],
    ["filterHerbByTag", "consultar panel"],
    ["openProductDetail", "consultar panel"],
    ["closeProductDetail", "consultar panel"],
    ["editarProducto", "editar productos"],
    ["borrarProducto", "borrar productos"],
    ["sincronizarOnline", "sincronizar online"],
    ["subirDatosLocalesOnline", "subir datos online"],
    ["cargarDatosDesdeOnline", "cargar datos online"],
    ["testFirebasePermissions", "probar permisos"],
    ["copyFirebaseSummary", "copiar resumen Firebase"],
    ["testReservaPublicaFirebase", "probar reserva pública"],
    ["syncAuditLogOnline", "subir auditoría online"],
    ["loadAuditLogOnline", "cargar auditoría online"],
    ["testAuditOnline", "probar auditoría online"],
    ["saveAgendaBlockFromAdmin", "guardar bloqueo de agenda"],
    ["deleteAgendaBlock", "eliminar bloqueo de agenda"],
    ["syncBlocksOnline", "subir bloqueos online"],
    ["loadBlocksOnline", "cargar bloqueos online"],
    ["testBlocksOnline", "probar bloqueos online"],
    ["requestBrowserNotifications", "consultar panel"],
    ["markAllNotificationsRead", "consultar panel"],
    ["exportNotificationsJson", "configuración crítica"],
    ["clearNotifications", "configuración crítica"],
    ["markNotificationRead", "consultar panel"],
    ["deleteNotification", "consultar panel"],
    ["goToReservationFromNotification", "consultar panel"],
    ["syncNotificationsOnline", "editar gestión diaria"],
    ["loadNotificationsOnline", "consultar panel"],
    ["testNotificationsOnline", "editar gestión diaria"],
    ["previewMessageTemplate", "configuración crítica"],
    ["resetMessageTemplates", "configuración crítica"],
    ["saveSelectedServiceTemplate", "configuración crítica"],
    ["resetSelectedServiceTemplate", "configuración crítica"],
    ["renderServiceTemplatePreview", "configuración crítica"],
    ["previewBrandingFromForm", "configuración crítica"],
    ["resetBrandingDefaults", "configuración crítica"]
  ];

  protectedActions.forEach(([name, label]) => {
    const original = window[name];

    if (typeof original === "function" && !original.__alayaGuarded) {
      const guarded = function (...args) {
        if (!requireAdminAccess(label)) return;
        addAuditLog("data", "Acción protegida", label);
        return original.apply(this, args);
      };

      guarded.__alayaGuarded = true;
      window[name] = guarded;
    }
  });
}

// ======================================================
// Eventos de UI
// ======================================================

$("#year").textContent = new Date().getFullYear();
applySettingsToPage();
const todayIso = new Date().toISOString().slice(0, 10);
$("#bookingDate")?.setAttribute("min", todayIso);

$("#navToggle").addEventListener("click", () => {
  $("#navLinks").classList.toggle("open");
});

$$(".nav-links a").forEach(link => {
  link.addEventListener("click", () => $("#navLinks").classList.remove("open"));
});

eventSearch?.addEventListener("input", renderEventosPublicos);
eventLevelFilter?.addEventListener("change", renderEventosPublicos);
eventStatusFilter?.addEventListener("change", renderEventosPublicos);
clearEventFiltersBtn?.addEventListener("click", () => {
  if (eventSearch) eventSearch.value = "";
  if (eventLevelFilter) eventLevelFilter.value = "";
  if (eventStatusFilter) eventStatusFilter.value = "";
  selectedEventCategory = "todos";
  renderEventosPublicos();
});
closeEventDetailModal?.addEventListener("click", closeEventDetail);
eventDetailModal?.addEventListener("click", event => {
  if (event.target === eventDetailModal) closeEventDetail();
});

serviceSearch?.addEventListener("input", renderServices);
closeServiceDetailModal?.addEventListener("click", closeServiceDetail);
serviceDetailModal?.addEventListener("click", event => {
  if (event.target === serviceDetailModal) closeServiceDetail();
});

herbSearch?.addEventListener("input", renderProductosPublicos);
herbStockFilter?.addEventListener("change", renderProductosPublicos);
clearHerbFiltersBtn?.addEventListener("click", () => {
  if (herbSearch) herbSearch.value = "";
  if (herbStockFilter) herbStockFilter.value = "";
  selectedHerbCategory = "todos";
  renderProductosPublicos();
});
closeProductDetailModal?.addEventListener("click", closeProductDetail);
productDetailModal?.addEventListener("click", event => {
  if (event.target === productDetailModal) closeProductDetail();
});
herbolarioWhatsappBtn?.addEventListener("click", event => {
  event.preventDefault();
  window.open(buildWhatsappUrl("Hola, quiero consultar productos de Alaya Herbolario."), "_blank");
});

$("#sendBookingWhatsapp").addEventListener("click", () => submitBooking("whatsapp"));
$("#sendBookingEmail").addEventListener("click", () => submitBooking("email"));
$("#bookingDate")?.addEventListener("change", () => {
  renderAvailabilityHint();
  renderAvailableSlots();
});
$("#bookingTime")?.addEventListener("change", () => {
  renderAvailabilityHint();
  renderAvailableSlots();
});
settingOpenDays?.addEventListener("input", renderAvailabilityPreview);
settingOpenStart?.addEventListener("change", renderAvailabilityPreview);
settingOpenEnd?.addEventListener("change", renderAvailabilityPreview);
settingSlotMinutes?.addEventListener("change", renderAvailabilityPreview);
settingMaxPerSlot?.addEventListener("input", renderAvailabilityPreview);
settingClosedDates?.addEventListener("input", renderAvailabilityPreview);

$("#contactWhatsapp").href = buildWhatsappUrl("Hola, quiero información sobre Alaya Holistics.");
$("#contactEmail").href = buildEmailUrl("Consulta Alaya Holistics", "Hola, quiero información sobre Alaya Holistics.");

$("#openAdminBtn").addEventListener("click", abrirAdminModal);
$("#openAdminBtnTop").addEventListener("click", abrirAdminModal);
$("#openAdminBtnFooter").addEventListener("click", abrirAdminModal);
closeAdminBtn.addEventListener("click", cerrarAdminModal);
loginAdminBtn.addEventListener("click", loginAdmin);
resetFirebasePasswordBtn?.addEventListener("click", enviarResetPasswordFirebase);
lockAdminBtn?.addEventListener("click", () => bloquearPanelAdmin("Panel bloqueado manualmente."));
logoutAdminBtn.addEventListener("click", logoutAdmin);
guardarServicioBtn?.addEventListener("click", guardarServicioDesdeAdmin);
saveBlockBtn?.addEventListener("click", saveAgendaBlockFromAdmin);
previewBrandingBtn?.addEventListener("click", previewBrandingFromForm);
resetBrandingBtn?.addEventListener("click", resetBrandingDefaults);
settingBrandPreset?.addEventListener("change", () => {
  handleBrandPresetChange();
  previewBrandingFromForm();
});
[settingBrandAccent, settingBrandAccent2, settingBrandAccent3].forEach(input => {
  input?.addEventListener("input", () => {
    if (settingBrandPreset) settingBrandPreset.value = "custom";
  });
});
resetMessageTemplatesBtn?.addEventListener("click", resetMessageTemplates);
serviceTemplateSelect?.addEventListener("change", loadSelectedServiceTemplate);
saveServiceTemplateBtn?.addEventListener("click", saveSelectedServiceTemplate);
previewServiceTemplateBtn?.addEventListener("click", renderServiceTemplatePreview);
resetServiceTemplateBtn?.addEventListener("click", resetSelectedServiceTemplate);
adminNotificationBadge?.addEventListener("click", () => {
  document.querySelector('[data-admin-tab="notificaciones"]')?.click();
});

guardarEventoBtn.addEventListener("click", guardarEventoDesdeAdmin);
guardarProductoBtn.addEventListener("click", guardarProductoDesdeAdmin);
guardarAjustesBtn?.addEventListener("click", guardAdminAction("guardar ajustes", guardarAjustesDesdeAdmin));
exportDataBtn?.addEventListener("click", guardAdminAction("exportar datos", exportarDatosJson));
downloadReservasCsvBtn?.addEventListener("click", guardAdminAction("descargar reservas", descargarReservasCsv));
importDataInput?.addEventListener("change", event => {
  if (!requireAdminAccess("importar datos")) return;
  importarDatosJson(event.target.files[0]);
});
reservationSearch?.addEventListener("input", renderAdminReservas);
reservationStatusFilter?.addEventListener("change", renderAdminReservas);
auditSearch?.addEventListener("input", renderAuditLog);
auditTypeFilter?.addEventListener("change", renderAuditLog);
installPwaBtn?.addEventListener("click", instalarPwa);

closeReservaBtn.addEventListener("click", cerrarReservaModal);
enviarReservaWhatsappBtn.addEventListener("click", enviarReservaPorWhatsapp);
enviarReservaEmailBtn.addEventListener("click", enviarReservaPorEmail);

$$(".admin-tab").forEach(btn => {
  btn.addEventListener("click", () => switchAdminTab(btn.dataset.adminTab));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    cerrarAdminModal();
    cerrarReservaModal();
    closeEventDetail();
    closeServiceDetail();
    closeProductDetail();
  }
});

const adminActivityEvents = ["click", "input", "keydown", "mousemove", "touchstart"];
adminActivityEvents.forEach(eventName => {
  adminModal?.addEventListener(eventName, () => {
    if (!adminModal.classList.contains("hidden")) {
      resetAdminAutoLock();
      updateAdminSessionUI();
    }
  }, { passive: true });
});

protectAdminGlobals();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

// Render inicial
applySettingsToPage();
normalizeReservas();
normalizeServices();
normalizeEventos();
normalizeProductos();
renderServices();
renderAvailabilityHint();
renderAvailableSlots();
renderAvailabilityPreview();
renderServiceTemplateOptions();
renderEventosPublicos();
renderProductosPublicos();
renderAdminReservas();
renderAdminCalendar();
renderBlocksList();
renderBlockOnlineStatus();
renderOnlineStatus();
renderAuthStatus();
renderFirebaseChecklist();
renderRoleStatus();
renderRoleGuardMatrix();
renderNotifications();
applyRoleGuardUx();
renderAuditLog();
updateAdminSessionUI();
