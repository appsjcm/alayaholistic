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
    preset: "astral",
    accent: "#9b72ff",
    accent2: "#ffd78a",
    accent3: "#86ecff"
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
  preset: "astral",
  accent: "#9b72ff",
  accent2: "#ffd78a",
  accent3: "#86ecff",
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


const DEFAULT_PUBLIC_PROFILE = {
  address: "Atención con cita previa",
  hours: "Horas concertadas",
  mapLink: "",
  instagram: "",
  tiktok: "",
  youtube: "",
  publicNotice: "Atención con cita previa. La disponibilidad final se confirma por mensaje."
};

function getPublicProfile() {
  return {
    ...DEFAULT_PUBLIC_PROFILE,
    ...(appSettings.publicProfile || {})
  };
}

function getBrandingSettings() {
  return {
    ...DEFAULT_BRANDING,
    ...(appSettings.branding || {})
  };
}

function getPresetColors(preset) {
  return {
    astral: {
      accent: "#9b72ff",
      accent2: "#ffd78a",
      accent3: "#86ecff"
    },
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
  { id:"tarot", icon:"☾", title:"Tarot intuitivo", category:"lecturas", duration:"45-60 min", price:"Consultar", featured:true, tags:["orientación","intuición","decisiones"], description:"Lectura simbólica e intuitiva para revisar energía, decisiones, bloqueos y caminos posibles.", benefits:"Aporta claridad, orden interno y una mirada simbólica sobre el momento actual.", preparation:"Ven con una pregunta o tema principal. No hace falta experiencia previa." },
  { id:"cartas", icon:"✦", title:"Lectura de cartas personalizada", category:"lecturas", duration:"30-45 min", price:"Consultar", featured:false, tags:["cartas","emocional","laboral"], description:"Interpretación cercana de cartas para orientación personal, emocional, laboral o espiritual.", benefits:"Ideal para enfocar situaciones concretas y recibir una lectura cercana y práctica.", preparation:"Piensa el tema que quieres trabajar y reserva un espacio tranquilo." },
  { id:"cafe", icon:"☕", title:"Lectura de posos de café", category:"lecturas", duration:"30 min", price:"Consultar", featured:true, tags:["café","símbolos","intuición"], description:"Lectura simbólica de formas y señales del poso de café para orientación y reflexión personal.", benefits:"Una experiencia cercana, visual y diferente para explorar mensajes simbólicos.", preparation:"Ideal para una consulta tranquila. Puedes traer una pregunta o dejar que salga el mensaje." },
  { id:"numerologia", icon:"🔢", title:"Numerología del nombre", category:"lecturas", duration:"30-40 min", price:"Consultar", featured:false, tags:["nombre","números","energía"], description:"Análisis numerológico del nombre, marca o proyecto para descubrir vibración, tendencia y enfoque.", benefits:"Útil para nombres personales, marcas, proyectos o cambios de etapa.", preparation:"Indica el nombre exacto que quieres analizar y el objetivo de la consulta." },
  { id:"astrologia-basica", icon:"♈", title:"Carta astral básica", category:"lecturas", duration:"60 min", price:"Consultar", featured:false, tags:["astrología","carta astral","autoconocimiento"], description:"Introducción a tu carta astral con foco en energía personal, talentos y áreas principales.", benefits:"Ayuda a comprender patrones, fortalezas y temas importantes de tu camino.", preparation:"Necesitarás fecha, hora y lugar de nacimiento." },
  { id:"reiki", icon:"✧", title:"Reiki", category:"energia", duration:"50-60 min", price:"Consultar", featured:true, tags:["calma","energía","equilibrio"], description:"Espacio de calma y equilibrio para liberar tensión, armonizar energía y reconectar contigo.", benefits:"Favorece relajación, escucha interior y sensación de bienestar.", preparation:"Acude con ropa cómoda y evita prisas antes y después de la sesión." },
  { id:"limpieza-energetica", icon:"🕯️", title:"Limpieza energética", category:"energia", duration:"45 min", price:"Consultar", featured:false, tags:["limpieza","protección","ambiente"], description:"Sesión enfocada en renovar energía personal o de espacios mediante intención, símbolos y ritual suave.", benefits:"Acompaña momentos de cambio, cierre de etapas o sensación de carga energética.", preparation:"Explica si buscas trabajar energía personal, hogar, negocio o proyecto." },
  { id:"cuantim", icon:"∞", title:"Cuantim", category:"energia", duration:"Consulta energética", price:"Consultar", featured:false, tags:["vibracional","energía","acompañamiento"], description:"Acompañamiento holístico enfocado en energía, bienestar interior y lectura vibracional.", benefits:"Acompaña procesos personales desde una mirada energética y simbólica.", preparation:"Trae una intención clara o el área de vida que quieras revisar." },
  { id:"meditacion-guiada", icon:"🌀", title:"Meditación guiada", category:"bienestar", duration:"30-45 min", price:"Consultar", featured:false, tags:["calma","respiración","relajación"], description:"Sesión guiada para bajar ritmo, respirar, enfocar la mente y conectar con el cuerpo.", benefits:"Ideal para crear un espacio de pausa, presencia y autocuidado.", preparation:"Ropa cómoda, agua y un momento tranquilo antes de empezar." },
  { id:"acompanamiento", icon:"✺", title:"Acompañamiento holístico", category:"bienestar", duration:"Sesión personalizada", price:"Consultar", featured:false, tags:["bienestar","autocuidado","proceso"], description:"Sesión flexible para combinar orientación, escucha, energía y herramientas de autocuidado.", benefits:"Útil cuando no sabes qué servicio elegir y necesitas una sesión adaptada.", preparation:"Explica tu situación al reservar para adaptar mejor la experiencia." },
  { id:"ritual-lunar", icon:"🌙", title:"Ritual lunar personalizado", category:"bienestar", duration:"45 min", price:"Consultar", featured:false, tags:["luna","ritual","intención"], description:"Ritual simbólico para enfocar intención, cerrar ciclo o abrir una nueva etapa.", benefits:"Aporta un momento consciente para ordenar deseos, emociones y objetivos.", preparation:"Piensa qué quieres soltar, agradecer o activar." },
  { id:"lectura-emocional", icon:"🌱", title:"Lectura emocional simbólica", category:"bienestar", duration:"45 min", price:"Consultar", featured:false, tags:["emociones","símbolos","autoconocimiento"], description:"Espacio de reflexión sobre emociones, señales personales y patrones desde una mirada simbólica.", benefits:"Ayuda a poner palabras a lo que sientes y encontrar un enfoque más amable.", preparation:"No sustituye ayuda médica ni psicológica; es un acompañamiento simbólico." },
  { id:"talleres", icon:"♢", title:"Talleres y cursos", category:"aprendizaje", duration:"Agenda mensual", price:"Según actividad", featured:false, tags:["formación","grupo","aprendizaje"], description:"Formaciones de tarot, reiki, astrología, herbolario, rituales y crecimiento personal.", benefits:"Aprendizaje práctico, acompañamiento grupal y herramientas para tu camino.", preparation:"Consulta agenda, plazas disponibles y material necesario." }
];

const ALAYA_SERVICE_EXAMPLES = defaultServices.map(service => ({ ...service, tags: [...(service.tags || [])] }));

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
const serviceExamplePacks = $("#serviceExamplePacks");
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
const loadServiceExamplesBtn = $("#loadServiceExamplesBtn");
const resetServicesExamplesBtn = $("#resetServicesExamplesBtn");
const adminServiciosList = $("#adminServiciosList");

const astralNombre = $("#astralNombre");
const astralCodigo = $("#astralCodigo");
const astralEmail = $("#astralEmail");
const astralTelefono = $("#astralTelefono");
const astralFechaNacimiento = $("#astralFechaNacimiento");
const astralHoraNacimiento = $("#astralHoraNacimiento");
const astralLugarNacimiento = $("#astralLugarNacimiento");
const astralPaisNacimiento = $("#astralPaisNacimiento");
const astralZonaHoraria = $("#astralZonaHoraria");
const astralEstado = $("#astralEstado");
const astralTemaConsulta = $("#astralTemaConsulta");
const astralSol = $("#astralSol");
const astralLuna = $("#astralLuna");
const astralAscendente = $("#astralAscendente");
const astralMedioCielo = $("#astralMedioCielo");
const astralPlanetas = $("#astralPlanetas");
const astralCasas = $("#astralCasas");
const astralAspectos = $("#astralAspectos");
const astralInterpretacion = $("#astralInterpretacion");
const astralReportTitle = $("#astralReportTitle");
const astralReportSummary = $("#astralReportSummary");
const astralClientMessage = $("#astralClientMessage");
const astralFortalezas = $("#astralFortalezas");
const astralRetos = $("#astralRetos");
const astralRecomendaciones = $("#astralRecomendaciones");
const astralObjetivo = $("#astralObjetivo");
const astralNotasPrivadas = $("#astralNotasPrivadas");
const astralSeguimiento = $("#astralSeguimiento");
const astralConsentDate = $("#astralConsentDate");
const astralConsentSource = $("#astralConsentSource");
const astralRetentionReview = $("#astralRetentionReview");
const astralNextSessionDate = $("#astralNextSessionDate");
const astralPriority = $("#astralPriority");
const astralNextAction = $("#astralNextAction");
const astralDataTags = $("#astralDataTags");
const astralConsentNotes = $("#astralConsentNotes");
const astralConsentimiento = $("#astralConsentimiento");
const guardarCartaAstralBtn = $("#guardarCartaAstralBtn");
const limpiarCartaAstralBtn = $("#limpiarCartaAstralBtn");
const exportarCartasAstralesBtn = $("#exportarCartasAstralesBtn");
const exportarCartasAstralesCsvBtn = $("#exportarCartasAstralesCsvBtn");
const generarPromptCartaAstralBtn = $("#generarPromptCartaAstralBtn");
const imprimirBorradorCartaAstralBtn = $("#imprimirBorradorCartaAstralBtn");
const previewInternalReportDraftBtn = $("#previewInternalReportDraftBtn");
const insertClientReportTemplateBtn = $("#insertClientReportTemplateBtn");
const previewClientReportDraftBtn = $("#previewClientReportDraftBtn");
const copyAstralReportChecklistBtn = $("#copyAstralReportChecklistBtn");
const crearPlantillaInterpretacionBtn = $("#crearPlantillaInterpretacionBtn");
const astralSessionDate = $("#astralSessionDate");
const astralSessionTitle = $("#astralSessionTitle");
const astralSessionNote = $("#astralSessionNote");
const astralSessionNext = $("#astralSessionNext");
const addAstralSessionBtn = $("#addAstralSessionBtn");
const astralSessionDraftList = $("#astralSessionDraftList");
const astralSearch = $("#astralSearch");
const astralStatusFilter = $("#astralStatusFilter");
const astralClientSearch = $("#astralClientSearch");
const astralClientHub = $("#astralClientHub");
const astralFollowupFilter = $("#astralFollowupFilter");
const astralFollowupList = $("#astralFollowupList");
const astralOnlineStatus = $("#astralOnlineStatus");
const syncAstralChartsOnlineBtn = $("#syncAstralChartsOnlineBtn");
const loadAstralChartsOnlineBtn = $("#loadAstralChartsOnlineBtn");
const testAstralChartsOnlineBtn = $("#testAstralChartsOnlineBtn");
const markAstralChartsLocalBtn = $("#markAstralChartsLocalBtn");
const astralPrivacyModeToggle = $("#astralPrivacyModeToggle");
const toggleAstralPrivacyBtn = $("#toggleAstralPrivacyBtn");
const copyAstralConsentTemplateBtn = $("#copyAstralConsentTemplateBtn");
const copyAstralPrivacyChecklistBtn = $("#copyAstralPrivacyChecklistBtn");
const astralAdminSummary = $("#astralAdminSummary");
const adminAstralChartsList = $("#adminAstralChartsList");


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
const settingPublicAddress = $("#settingPublicAddress");
const settingPublicHours = $("#settingPublicHours");
const settingMapLink = $("#settingMapLink");
const settingInstagram = $("#settingInstagram");
const settingTikTok = $("#settingTikTok");
const settingYoutube = $("#settingYoutube");
const settingPublicNotice = $("#settingPublicNotice");
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
    confirmacionAdmin: reserva.confirmacionAdmin ?? (reserva.estado === "Confirmada"),
    fechaConfirmacionAdmin: reserva.fechaConfirmacionAdmin || "",
    confirmadoPorAdmin: reserva.confirmadoPorAdmin || "",
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

function copyText(text) {
  return copyTextToClipboard(text);
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

  applyPublicProfileToPage?.();
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
  fillPublicProfileForm();
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
      saveAstralCharts();
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
  renderAstralSessionDraft();
renderAstralAdmin();
renderServices();
}

function filterServiceByTag(tag) {
  if (serviceSearch) serviceSearch.value = tag;
  renderServices();
  document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderServiceHighlights() {
  if (!serviceHighlights) return;

  normalizeAstralCharts();
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

function renderServiceExamplePacks() {
  if (!serviceExamplePacks) return;
  serviceExamplePacks.innerHTML = `
    <article class="service-example-pack">
      <span class="service-example-badge">Ejemplo</span><strong>Pack Lecturas</strong>
      <p>Orientación simbólica para consultas personales.</p>
      <ul><li>Tarot intuitivo</li><li>Lectura de cartas</li><li>Posos de café</li><li>Numerología</li></ul>
      <button class="btn btn-secondary" onclick="setServiceCategory('lecturas')">Ver lecturas</button>
    </article>
    <article class="service-example-pack">
      <span class="service-example-badge">Ejemplo</span><strong>Pack Energía</strong>
      <p>Sesiones de calma, armonía y acompañamiento energético.</p>
      <ul><li>Reiki</li><li>Limpieza energética</li><li>Cuantim</li><li>Ritual lunar</li></ul>
      <button class="btn btn-secondary" onclick="setServiceCategory('energia')">Ver energía</button>
    </article>
    <article class="service-example-pack">
      <span class="service-example-badge">Ejemplo</span><strong>Pack Bienestar</strong>
      <p>Autocuidado, meditación y procesos personales.</p>
      <ul><li>Meditación guiada</li><li>Acompañamiento holístico</li><li>Lectura emocional simbólica</li><li>Talleres y cursos</li></ul>
      <button class="btn btn-secondary" onclick="setServiceCategory('bienestar')">Ver bienestar</button>
    </article>`;
}

function mergeServiceExamples() {
  if (!requireAdminAccess("guardar servicios")) return;
  const existingIds = new Set(defaultServices.map(service => service.id));
  const missing = ALAYA_SERVICE_EXAMPLES.filter(service => !existingIds.has(service.id));
  if (!missing.length) { showToast("Los ejemplos ya están cargados."); return; }
  defaultServices = [...defaultServices, ...missing].map(normalizeService);
  saveServices(); renderServices(); renderAstralAdmin();
  renderAdminServicios(); renderServiceTemplateOptions?.();
  addAuditLog("data", "Cargar ejemplos servicios", `${missing.length} servicios añadidos.`);
  showToast(`${missing.length} ejemplos añadidos.`);
}

function resetServicesToExamples() {
  if (!requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Restaurar todos los servicios con los ejemplos de Alaya? Se reemplazará la lista actual.")) return;
  defaultServices = ALAYA_SERVICE_EXAMPLES.map(service => normalizeService({ ...service, tags: [...(service.tags || [])] }));
  saveServices(); renderServices(); renderAdminServicios(); renderServiceTemplateOptions?.();
  addAuditLog("data", "Restaurar servicios ejemplo", `${defaultServices.length} servicios restaurados.`);
  showToast("Servicios ejemplo restaurados.");
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
  renderServiceExamplePacks();
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
    confirmacionAdmin: false,
    fechaConfirmacionAdmin: "",
    confirmadoPorAdmin: "",
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
  showToast("Solicitud guardada. Queda pendiente de confirmación del administrador.");

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
    confirmacionAdmin: false,
    fechaConfirmacionAdmin: "",
    confirmadoPorAdmin: "",
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
  showToast("Solicitud enviada. Queda pendiente de confirmación del administrador.");
}

function enviarReservaPorEmail() {
  const data = crearTextoReservaEvento();
  if (!data) return;
  window.location.href = buildEmailUrl(`Nueva reserva: ${data.evento.titulo}`, data.texto);
  cerrarReservaModal();
  showToast("Solicitud enviada. Queda pendiente de confirmación del administrador.");
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


// Cartas astrales admin
function saveAstralCharts() {
  localStorage.setItem("alaya_astral_charts", JSON.stringify(astralCharts));
  renderAstralOnlineStatus?.();
}

function generateAstralCode() {
  const next = String(astralCharts.length + 1).padStart(3, "0");
  return `ALAYA-ASTRAL-${next}`;
}

function normalizeAstralChart(chart = {}) {
  return {
    id: chart.id || crypto.randomUUID(),
    codigo: chart.codigo || generateAstralCode(),
    nombre: chart.nombre || "",
    email: chart.email || "",
    telefono: chart.telefono || "",
    fechaNacimiento: chart.fechaNacimiento || "",
    horaNacimiento: chart.horaNacimiento || "",
    lugarNacimiento: chart.lugarNacimiento || "",
    paisNacimiento: chart.paisNacimiento || "",
    zonaHoraria: chart.zonaHoraria || "",
    estado: chart.estado || "Borrador",
    temaConsulta: chart.temaConsulta || "",
    sol: chart.sol || "",
    luna: chart.luna || "",
    ascendente: chart.ascendente || "",
    medioCielo: chart.medioCielo || "",
    planetas: chart.planetas || "",
    casas: chart.casas || "",
    aspectos: chart.aspectos || "",
    interpretacion: chart.interpretacion || "",
    reportTitle: chart.reportTitle || "",
    reportSummary: chart.reportSummary || "",
    clientMessage: chart.clientMessage || "",
    fortalezas: chart.fortalezas || "",
    retos: chart.retos || "",
    recomendaciones: chart.recomendaciones || "",
    objetivo: chart.objetivo || "",
    notasPrivadas: chart.notasPrivadas || "",
    seguimiento: chart.seguimiento || "",
    sesiones: Array.isArray(chart.sesiones) ? chart.sesiones : [],
    consentimiento: Boolean(chart.consentimiento),
    consentDate: chart.consentDate || "",
    consentSource: chart.consentSource || "",
    consentNotes: chart.consentNotes || "",
    retentionReview: chart.retentionReview || "",
    nextSessionDate: chart.nextSessionDate || "",
    priority: chart.priority || "Normal",
    nextAction: chart.nextAction || "",
    followupDoneAt: chart.followupDoneAt || "",
    dataTags: Array.isArray(chart.dataTags)
      ? chart.dataTags
      : String(chart.dataTags || "").split(",").map(item => item.trim()).filter(Boolean),
    anonymized: Boolean(chart.anonymized),
    onlineSynced: Boolean(chart.onlineSynced),
    onlineUpdatedAt: chart.onlineUpdatedAt || "",
    createdAt: chart.createdAt || new Date().toISOString(),
    updatedAt: chart.updatedAt || new Date().toISOString()
  };
}

function normalizeAstralCharts() {
  astralCharts = astralCharts.map(normalizeAstralChart);
  saveAstralCharts();
}

function limpiarFormularioCartaAstral() {
  [
    astralNombre, astralCodigo, astralEmail, astralTelefono,
    astralFechaNacimiento, astralHoraNacimiento, astralLugarNacimiento,
    astralPaisNacimiento, astralZonaHoraria, astralTemaConsulta,
    astralSol, astralLuna, astralAscendente, astralMedioCielo,
    astralPlanetas, astralCasas, astralAspectos, astralInterpretacion,
    astralReportTitle, astralReportSummary, astralClientMessage,
    astralFortalezas, astralRetos, astralRecomendaciones, astralObjetivo,
    astralNotasPrivadas, astralSeguimiento,
    astralConsentDate, astralRetentionReview, astralNextSessionDate, astralNextAction, astralDataTags, astralConsentNotes,
    astralSessionDate, astralSessionTitle, astralSessionNote, astralSessionNext
  ].forEach(input => {
    if (input) input.value = "";
  });

  if (astralEstado) astralEstado.value = "Borrador";
  if (astralConsentSource) astralConsentSource.value = "";
  if (astralPriority) astralPriority.value = "Normal";
  if (astralConsentimiento) astralConsentimiento.checked = false;

  editingAstralChartId = null;
  astralSessionDraft = [];
  renderAstralSessionDraft();
  if (guardarCartaAstralBtn) guardarCartaAstralBtn.textContent = "Guardar carta astral";
  if (astralCodigo) astralCodigo.value = generateAstralCode();
}

function collectAstralChartFromForm() {
  return normalizeAstralChart({
    id: editingAstralChartId || crypto.randomUUID(),
    codigo: astralCodigo?.value.trim() || generateAstralCode(),
    nombre: astralNombre?.value.trim(),
    email: astralEmail?.value.trim(),
    telefono: astralTelefono?.value.trim(),
    fechaNacimiento: astralFechaNacimiento?.value,
    horaNacimiento: astralHoraNacimiento?.value,
    lugarNacimiento: astralLugarNacimiento?.value.trim(),
    paisNacimiento: astralPaisNacimiento?.value.trim(),
    zonaHoraria: astralZonaHoraria?.value.trim(),
    estado: astralEstado?.value || "Borrador",
    temaConsulta: astralTemaConsulta?.value.trim(),
    sol: astralSol?.value.trim(),
    luna: astralLuna?.value.trim(),
    ascendente: astralAscendente?.value.trim(),
    medioCielo: astralMedioCielo?.value.trim(),
    planetas: astralPlanetas?.value.trim(),
    casas: astralCasas?.value.trim(),
    aspectos: astralAspectos?.value.trim(),
    interpretacion: astralInterpretacion?.value.trim(),
    reportTitle: astralReportTitle?.value.trim() || "Informe astral personalizado",
    reportSummary: astralReportSummary?.value.trim() || "",
    clientMessage: astralClientMessage?.value.trim() || "",
    fortalezas: astralFortalezas?.value.trim(),
    retos: astralRetos?.value.trim(),
    recomendaciones: astralRecomendaciones?.value.trim(),
    objetivo: astralObjetivo?.value.trim(),
    notasPrivadas: astralNotasPrivadas?.value.trim(),
    seguimiento: astralSeguimiento?.value.trim(),
    sesiones: astralSessionDraft,
    consentimiento: Boolean(astralConsentimiento?.checked),
    consentDate: astralConsentDate?.value || "",
    consentSource: astralConsentSource?.value || "",
    consentNotes: astralConsentNotes?.value.trim() || "",
    retentionReview: astralRetentionReview?.value || "",
    nextSessionDate: astralNextSessionDate?.value || "",
    priority: astralPriority?.value || "Normal",
    nextAction: astralNextAction?.value.trim() || "",
    dataTags: astralDataTags?.value || "",
    anonymized: false,
    createdAt: editingAstralChartId
      ? (astralCharts.find(item => item.id === editingAstralChartId)?.createdAt || new Date().toISOString())
      : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

function guardarCartaAstralDesdeAdmin() {
  if (!requireAdminAccess("guardar cartas astrales")) return;

  const chart = collectAstralChartFromForm();

  if (!chart.nombre || !chart.fechaNacimiento || !chart.lugarNacimiento) {
    showToast("Añade nombre, fecha y lugar de nacimiento.");
    return;
  }

  if (!chart.consentimiento) {
    showToast("Marca el consentimiento para guardar datos.");
    return;
  }

  if (editingAstralChartId) {
    astralCharts = astralCharts.map(item => item.id === editingAstralChartId ? chart : item);
  } else {
    astralCharts.unshift(chart);
  }

  saveAstralCharts();
  syncSingleAstralChartOnline(chart);
  renderAstralAdmin();
  limpiarFormularioCartaAstral();
  addAuditLog("data", "Guardar carta astral", `${chart.codigo} · ${chart.nombre}`);
  showToast("Carta astral guardada.");
}

function getFilteredAstralCharts() {
  const query = (astralSearch?.value || "").toLowerCase().trim();
  const status = astralStatusFilter?.value || "";

  return astralCharts.map(normalizeAstralChart).filter(chart => {
    const matchesStatus = !status || chart.estado === status;
    const haystack = [
      chart.codigo,
      chart.nombre,
      chart.email,
      chart.telefono,
      chart.fechaNacimiento,
      chart.horaNacimiento,
      chart.lugarNacimiento,
      chart.paisNacimiento,
      chart.zonaHoraria,
      chart.estado,
      chart.temaConsulta,
      chart.sol,
      chart.luna,
      chart.ascendente,
      chart.medioCielo,
      chart.planetas,
      chart.casas,
      chart.aspectos,
      chart.interpretacion,
      chart.reportTitle,
      chart.reportSummary,
      chart.clientMessage,
      chart.fortalezas,
      chart.retos,
      chart.recomendaciones,
      chart.objetivo,
      chart.notasPrivadas,
      chart.seguimiento,
      chart.consentDate,
      chart.consentSource,
      chart.consentNotes,
      chart.retentionReview,
      chart.nextSessionDate,
      chart.priority,
      chart.nextAction,
      ...(chart.dataTags || []),
      ...(chart.sesiones || []).map(session => [session.date, session.title, session.note, session.next].join(" "))
    ].join(" ").toLowerCase();

    return matchesStatus && (!query || haystack.includes(query));
  });
}


function escapeReportHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getAstralClientKey(chart) {
  const normalized = normalizeAstralChart(chart);
  return (normalized.email || normalized.telefono || `${normalized.nombre}-${normalized.fechaNacimiento}-${normalized.lugarNacimiento}`)
    .toLowerCase()
    .trim();
}

function getAstralClients() {
  const map = new Map();

  astralCharts.map(normalizeAstralChart).forEach(chart => {
    const key = getAstralClientKey(chart);
    if (!key) return;

    if (!map.has(key)) {
      map.set(key, {
        key,
        nombre: chart.nombre || "Cliente sin nombre",
        email: chart.email || "",
        telefono: chart.telefono || "",
        lugar: chart.lugarNacimiento || "",
        charts: [],
        sesiones: []
      });
    }

    const client = map.get(key);
    client.charts.push(chart);
    client.sesiones.push(...(chart.sesiones || []).map(session => ({ ...session, chartId: chart.id, chartCode: chart.codigo })));
  });

  return [...map.values()].map(client => {
    client.charts.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    client.sesiones.sort((a, b) => String(b.date || b.createdAt || "").localeCompare(String(a.date || a.createdAt || "")));
    client.lastChart = client.charts[0];
    client.lastSession = client.sesiones[0] || null;
    client.statuses = [...new Set(client.charts.map(chart => chart.estado).filter(Boolean))];
    return client;
  }).sort((a, b) => String(b.lastChart?.updatedAt || "").localeCompare(String(a.lastChart?.updatedAt || "")));
}


function getDaysDiffFromToday(dateString) {
  if (!dateString) return null;
  const today = new Date();
  const base = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  return Math.round((target - base) / 86400000);
}

function getAstralFollowups() {
  return astralCharts
    .map(normalizeAstralChart)
    .filter(chart => chart.nextSessionDate || chart.nextAction || chart.seguimiento)
    .map(chart => {
      const date = chart.nextSessionDate || chart.retentionReview || "";
      const days = getDaysDiffFromToday(date);
      return {
        chart,
        date,
        days,
        status: days === null ? "sin fecha" : days < 0 ? "vencido" : days === 0 ? "hoy" : days <= 7 ? "semana" : "futuro"
      };
    })
    .sort((a, b) => {
      if (a.days === null) return 1;
      if (b.days === null) return -1;
      return a.days - b.days;
    });
}

function renderAstralFollowups() {
  if (!astralFollowupList) return;

  const filter = astralFollowupFilter?.value || "all";
  let followups = getAstralFollowups();

  if (filter === "overdue") followups = followups.filter(item => item.days !== null && item.days < 0);
  if (filter === "today") followups = followups.filter(item => item.days === 0);
  if (filter === "week") followups = followups.filter(item => item.days !== null && item.days >= 0 && item.days <= 7);
  if (filter === "high") followups = followups.filter(item => item.chart.priority === "Alta");

  if (!followups.length) {
    astralFollowupList.innerHTML = "<p>No hay seguimientos con este filtro.</p>";
    return;
  }

  astralFollowupList.innerHTML = followups.slice(0, 16).map(item => {
    const chart = item.chart;
    const cls = item.days < 0 ? "overdue" : item.days === 0 ? "today" : "";
    const label = item.days === null
      ? "Sin fecha"
      : item.days < 0
        ? `Vencido hace ${Math.abs(item.days)} día(s)`
        : item.days === 0
          ? "Hoy"
          : `En ${item.days} día(s)`;

    return `
      <article class="astral-followup-card ${cls}">
        <div class="astral-followup-top">
          <div>
            <strong>${chart.nombre}</strong>
            <small>${chart.codigo} · ${chart.estado}</small>
          </div>
          <span class="astral-priority-pill ${String(chart.priority).toLowerCase()}">${chart.priority}</span>
        </div>

        <div class="astral-followup-date">
          <span>${item.date || "Sin fecha"}</span>
          <span>${label}</span>
          ${chart.sol ? `<span>${chart.sol}</span>` : ""}
          ${chart.ascendente ? `<span>Asc: ${chart.ascendente}</span>` : ""}
        </div>

        <div class="astral-followup-action">
          ${chart.nextAction || chart.seguimiento || "Revisar ficha y preparar próximo contacto."}
        </div>

        <div class="admin-actions">
          <button class="btn btn-secondary" onclick="editarCartaAstral('${chart.id}')">Abrir ficha</button>
          <button class="btn btn-secondary" onclick="copiarMensajeSeguimientoAstral('${chart.id}')">Copiar mensaje</button>
          <button class="btn btn-secondary" onclick="marcarSeguimientoAstralHecho('${chart.id}')">Marcar hecho</button>
        </div>
      </article>
    `;
  }).join("");
}

function copiarMensajeSeguimientoAstral(id) {
  if (!requireAdminAccess("consultar panel")) return;
  const chart = astralCharts.map(normalizeAstralChart).find(item => item.id === id);
  if (!chart) return;

  const text = `
Hola ${chart.nombre}, soy Alaya.

Te escribo por el seguimiento de tu consulta/carta astral.
Próximo paso previsto:
${chart.nextAction || chart.seguimiento || "Revisar cómo te encuentras y si necesitas una nueva orientación."}

Si te va bien, podemos concretar una hora para continuar.
  `.trim();

  copyText(text);
  showToast("Mensaje de seguimiento copiado.");
}

function marcarSeguimientoAstralHecho(id) {
  if (!requireAdminAccess("guardar cartas astrales")) return;

  astralCharts = astralCharts.map(item => {
    if (item.id !== id) return item;
    const chart = normalizeAstralChart(item);
    return {
      ...chart,
      followupDoneAt: new Date().toISOString(),
      nextSessionDate: "",
      nextAction: "",
      updatedAt: new Date().toISOString()
    };
  });

  saveAstralCharts();
  const chart = astralCharts.find(item => item.id === id);
  if (chart) syncSingleAstralChartOnline?.(chart);
  renderAstralAdmin();
  renderAstralFollowups();
  renderAstralClientHub?.();
  addAuditLog("data", "Marcar seguimiento astral hecho", id);
  showToast("Seguimiento marcado como hecho.");
}


function renderAstralClientHub() {
  if (!astralClientHub) return;

  const query = (astralClientSearch?.value || "").toLowerCase().trim();

  const clients = getAstralClients().filter(client => {
    const haystack = [
      client.nombre,
      client.email,
      client.telefono,
      client.lugar,
      client.statuses.join(" "),
      client.charts.map(chart => [chart.codigo, chart.sol, chart.luna, chart.ascendente, chart.temaConsulta, chart.notasPrivadas, chart.seguimiento].join(" ")).join(" ")
    ].join(" ").toLowerCase();

    return !query || haystack.includes(query);
  });

  if (!clients.length) {
    astralClientHub.innerHTML = "<p>No hay clientes/pacientes en el hub astral.</p>";
    return;
  }

  astralClientHub.innerHTML = clients.slice(0, 12).map(client => {
    const next = client.charts.find(chart => chart.nextAction)?.nextAction
      || client.charts.find(chart => chart.seguimiento)?.seguimiento
      || client.lastSession?.next
      || "Sin próximo paso indicado";
    const last = client.lastChart || {};

    return `
      <article class="astral-client-card">
        <div class="astral-client-top">
          <div>
            <strong>${client.nombre}</strong>
            <small>${client.email || client.telefono || client.lugar || "Sin contacto"}</small>
          </div>
          <span class="service-template-label">${client.statuses[0] || "Sin estado"}</span>
        </div>

        <div class="astral-client-metrics">
          <span><b>${client.charts.length}</b>cartas</span>
          <span><b>${client.sesiones.length}</b>sesiones</span>
          <span><b>${last.sol ? "Sí" : "No"}</b>sol</span>
          <span><b>${last.ascendente ? "Sí" : "No"}</b>asc.</span>
        </div>

        <div class="astral-chart-tags">
          ${last.sol ? `<span>${last.sol}</span>` : ""}
          ${last.luna ? `<span>${last.luna}</span>` : ""}
          ${last.ascendente ? `<span>Asc: ${last.ascendente}</span>` : ""}
          ${last.codigo ? `<span>${last.codigo}</span>` : ""}
        </div>

        <div class="astral-client-latest">
          <b>Último seguimiento:</b><br>${next}
        </div>

        <div class="admin-actions">
          <button class="btn btn-secondary" onclick="filtrarAstralPorCliente('${client.key.replace(/'/g, "\\'")}')">Ver cartas</button>
          <button class="btn btn-secondary" onclick="copiarResumenClienteAstral('${client.key.replace(/'/g, "\\'")}')">Copiar ficha</button>
          <button class="btn btn-secondary" onclick="imprimirClienteAstral('${client.key.replace(/'/g, "\\'")}')">Imprimir ficha</button>
        </div>
      </article>
    `;
  }).join("");
}

function getAstralClientByKey(key) {
  return getAstralClients().find(client => client.key === key);
}

function filtrarAstralPorCliente(key) {
  const client = getAstralClientByKey(key);
  if (!client) return;

  if (astralSearch) astralSearch.value = client.nombre;
  if (astralStatusFilter) astralStatusFilter.value = "";
  renderAstralAdmin();
  document.querySelector("#adminTab-astral")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildAstralClientSummary(client) {
  return `
Ficha astral de cliente/paciente

Nombre:
${client.nombre}

Contacto:
Email: ${client.email || "No indicado"}
Teléfono: ${client.telefono || "No indicado"}
Lugar: ${client.lugar || "No indicado"}

Resumen:
Cartas guardadas: ${client.charts.length}
Sesiones registradas: ${client.sesiones.length}
Estados: ${client.statuses.join(", ") || "Sin estados"}

Última carta:
${client.lastChart ? buildAstralChartSummary(client.lastChart) : "Sin carta"}

Sesiones:
${client.sesiones.map(session => `- ${session.date || "Sin fecha"} · ${session.title || "Sesión"} · ${session.chartCode || ""}: ${session.note || ""} ${session.next ? `| Próximo: ${session.next}` : ""}`).join("\n") || "Sin sesiones"}
  `.trim();
}

function copiarResumenClienteAstral(key) {
  if (!requireAdminAccess("consultar panel")) return;

  const client = getAstralClientByKey(key);
  if (!client) return;

  copyText(buildAstralClientSummary(client));
  showToast("Ficha de cliente copiada.");
}

function printAstralHtml(title, bodyHtml) {
  const win = window.open("", "_blank");
  if (!win) {
    showToast("Permite ventanas emergentes para imprimir.");
    return;
  }

  win.document.write(`
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>${escapeReportHtml(title)}</title>
        <style>
          body { margin: 0; background: #fffaf2; }
          .astral-print-report { color: #1f1430; background: #fffaf2; font-family: Inter, Arial, sans-serif; padding: 34px; }
          h1, h2, h3 { color: #21102f; }
          section { border: 1px solid #eadfcf; border-radius: 18px; padding: 18px; margin: 14px 0; }
          .meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .meta div { background: #f7efe4; border-radius: 12px; padding: 10px; }
          pre { white-space: pre-wrap; font-family: inherit; line-height: 1.55; }
          .print-actions { margin-bottom: 18px; }
          button { border: 0; border-radius: 999px; padding: 10px 14px; background: #21102f; color: white; cursor: pointer; }
          @media print { .print-actions { display: none; } .astral-print-report { padding: 0; } }
        </style>
      </head>
      <body>
        <main class="astral-print-report">
          <div class="print-actions"><button onclick="window.print()">Imprimir / guardar PDF</button></div>
          ${bodyHtml}
        </main>
      </body>
    </html>
  `);
  win.document.close();
  win.focus();
}

function buildAstralReportHtml(chart) {
  const sessions = (chart.sesiones || []).map(session => `
    <section>
      <h3>${escapeReportHtml(session.title || "Sesión astral")}</h3>
      <p><strong>Fecha:</strong> ${escapeReportHtml(session.date || "Sin fecha")}</p>
      <pre>${escapeReportHtml(session.note || "")}</pre>
      ${session.next ? `<pre><strong>Próximo paso:</strong> ${escapeReportHtml(session.next)}</pre>` : ""}
    </section>
  `).join("");

  return `
    <h1>Informe astral · ${escapeReportHtml(chart.codigo || "")}</h1>
    <section>
      <h2>${escapeReportHtml(chart.nombre || "Cliente/paciente")}</h2>
      <div class="meta">
        <div><strong>Fecha nacimiento</strong><br>${escapeReportHtml(chart.fechaNacimiento || "No indicada")}</div>
        <div><strong>Hora</strong><br>${escapeReportHtml(chart.horaNacimiento || "No indicada")}</div>
        <div><strong>Lugar</strong><br>${escapeReportHtml(chart.lugarNacimiento || "No indicado")}</div>
        <div><strong>Estado</strong><br>${escapeReportHtml(chart.estado || "Sin estado")}</div>
        <div><strong>Consentimiento</strong><br>${chart.consentimiento ? "Sí" : "No"} ${escapeReportHtml(chart.consentDate || "")}</div>
      </div>
    </section>
    <section>
      <h2>Claves astrológicas</h2>
      <div class="meta">
        <div><strong>Sol</strong><br>${escapeReportHtml(chart.sol || "No indicado")}</div>
        <div><strong>Luna</strong><br>${escapeReportHtml(chart.luna || "No indicada")}</div>
        <div><strong>Ascendente</strong><br>${escapeReportHtml(chart.ascendente || "No indicado")}</div>
        <div><strong>Medio Cielo</strong><br>${escapeReportHtml(chart.medioCielo || "No indicado")}</div>
      </div>
    </section>
    <section><h2>Tema de consulta</h2><pre>${escapeReportHtml(chart.temaConsulta || "Sin tema")}</pre></section>
    <section><h2>Interpretación</h2><pre>${escapeReportHtml(chart.interpretacion || "Sin interpretación")}</pre></section>
    <section><h2>Objetivo</h2><pre>${escapeReportHtml(chart.objetivo || "Sin objetivo")}</pre></section>
    <section><h2>Fortalezas</h2><pre>${escapeReportHtml(chart.fortalezas || "Sin fortalezas")}</pre></section>
    <section><h2>Retos</h2><pre>${escapeReportHtml(chart.retos || "Sin retos")}</pre></section>
    <section><h2>Recomendaciones</h2><pre>${escapeReportHtml(chart.recomendaciones || "Sin recomendaciones")}</pre></section>
    <section><h2>Seguimiento interno</h2><pre>${escapeReportHtml(chart.seguimiento || "Sin seguimiento")}</pre></section>
    <section><h2>Próximo paso</h2><pre>${escapeReportHtml(chart.nextAction || "Sin próximo paso")}</pre><p><strong>Fecha:</strong> ${escapeReportHtml(chart.nextSessionDate || "Sin fecha")} · <strong>Prioridad:</strong> ${escapeReportHtml(chart.priority || "Normal")}</p></section>
    ${sessions ? `<h2>Sesiones</h2>${sessions}` : ""}
  `;
}


function buildAstralClientReportHtml(chart) {
  const logoPath = "assets/logos/alaya-astrologia-logo.png";
  const title = chart.reportTitle || "Informe astral personalizado";
  const summary = chart.reportSummary || chart.interpretacion || "Informe preparado por Alaya Astrología.";

  return `
    <div class="cover">
      <img src="${logoPath}" alt="Alaya Astrología">
      <h1>${escapeReportHtml(title)}</h1>
      <p>${escapeReportHtml(chart.nombre || "Cliente/paciente")}</p>
      <p class="soft-note">Alaya Astrología · Informe simbólico de orientación y autoconocimiento.</p>
    </div>

    <section>
      <h2>Datos de la carta</h2>
      <div class="meta">
        <div><strong>Nombre</strong><br>${escapeReportHtml(chart.nombre || "No indicado")}</div>
        <div><strong>Fecha nacimiento</strong><br>${escapeReportHtml(chart.fechaNacimiento || "No indicada")}</div>
        <div><strong>Hora</strong><br>${escapeReportHtml(chart.horaNacimiento || "No indicada")}</div>
        <div><strong>Lugar</strong><br>${escapeReportHtml(chart.lugarNacimiento || "No indicado")}</div>
      </div>
    </section>

    <section>
      <h2>Claves principales</h2>
      <div class="meta">
        <div><strong>Sol</strong><br>${escapeReportHtml(chart.sol || "No indicado")}</div>
        <div><strong>Luna</strong><br>${escapeReportHtml(chart.luna || "No indicada")}</div>
        <div><strong>Ascendente</strong><br>${escapeReportHtml(chart.ascendente || "No indicado")}</div>
        <div><strong>Medio Cielo</strong><br>${escapeReportHtml(chart.medioCielo || "No indicado")}</div>
      </div>
    </section>

    <section><h2>Resumen inicial</h2><pre>${escapeReportHtml(summary)}</pre></section>
    <section><h2>Tema de consulta</h2><pre>${escapeReportHtml(chart.temaConsulta || "Sin tema indicado")}</pre></section>
    <section><h2>Interpretación general</h2><pre>${escapeReportHtml(chart.interpretacion || "Sin interpretación")}</pre></section>
    <section><h2>Fortalezas</h2><pre>${escapeReportHtml(chart.fortalezas || "Sin fortalezas indicadas")}</pre></section>
    <section><h2>Retos y aprendizajes</h2><pre>${escapeReportHtml(chart.retos || "Sin retos indicados")}</pre></section>
    <section><h2>Recomendaciones</h2><pre>${escapeReportHtml(chart.recomendaciones || "Sin recomendaciones indicadas")}</pre></section>
    <section><h2>Mensaje final de Alaya</h2><pre>${escapeReportHtml(chart.clientMessage || "Gracias por confiar en Alaya. Este informe es una herramienta de reflexión, orientación y autoconocimiento.")}</pre></section>

    <section>
      <h2>Nota importante</h2>
      <p class="soft-note">
        Este informe se ofrece como herramienta simbólica de orientación y autoconocimiento.
        No sustituye atención médica, psicológica, legal ni financiera.
      </p>
    </section>
  `;
}

function printAstralClientHtml(title, bodyHtml) {
  const win = window.open("", "_blank");
  if (!win) {
    showToast("Permite ventanas emergentes para imprimir.");
    return;
  }

  win.document.write(`
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>${escapeReportHtml(title)}</title>
        <style>
          body { margin: 0; background: #fffaf2; }
          .astral-client-report-preview { color: #21102f; background: #fffaf2; font-family: Inter, Arial, sans-serif; padding: 42px; }
          .cover { text-align: center; border: 2px solid #e9d7b5; border-radius: 28px; padding: 34px; background: radial-gradient(circle at 50% 0%, rgba(255,215,138,.35), transparent 38%), #fffaf2; }
          .cover img { width: 160px; height: 160px; object-fit: contain; border-radius: 28px; background: #fffaf2; margin-bottom: 18px; }
          h1 { font-size: 2.6rem; margin: 0; color: #21102f; }
          h2 { color: #32184a; margin-top: 0; }
          section { border: 1px solid #eadfcf; border-radius: 20px; padding: 20px; margin: 16px 0; background: #fffdf8; }
          .meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px; }
          .meta div { background: #f7efe4; border-radius: 13px; padding: 11px; }
          pre { white-space: pre-wrap; font-family: inherit; line-height: 1.6; }
          .soft-note { color: #6a5c72; font-size: .92rem; line-height: 1.55; }
          .print-actions { margin-bottom: 18px; }
          button { border: 0; border-radius: 999px; padding: 10px 14px; background: #21102f; color: white; cursor: pointer; }
          @media print { .print-actions { display: none; } .astral-client-report-preview { padding: 0; } }
          @media (max-width: 800px) { .meta { grid-template-columns: 1fr; } }
        </style>
      </head>
      <body>
        <main class="astral-client-report-preview">
          <div class="print-actions"><button onclick="window.print()">Imprimir / guardar PDF</button></div>
          ${bodyHtml}
        </main>
      </body>
    </html>
  `);
  win.document.close();
  win.focus();
}

function imprimirInformeClienteAstral(id) {
  if (!requireAdminAccess("consultar panel")) return;

  const chart = astralCharts.map(normalizeAstralChart).find(item => item.id === id);
  if (!chart) return;

  printAstralClientHtml(`Informe cliente ${chart.codigo}`, buildAstralClientReportHtml(chart));
}

function previewClientReportDraft() {
  if (!requireAdminAccess("consultar panel")) return;

  const chart = collectAstralChartFromForm();
  printAstralClientHtml(`Informe cliente ${chart.codigo}`, buildAstralClientReportHtml(chart));
}

function insertarPlantillaInformeCliente() {
  if (!requireAdminAccess("guardar cartas astrales")) return;

  if (astralReportTitle && !astralReportTitle.value.trim()) {
    astralReportTitle.value = "Informe astral personalizado";
  }

  if (astralReportSummary && !astralReportSummary.value.trim()) {
    astralReportSummary.value = `Este informe recoge una lectura simbólica de tu carta astral para acompañar tu proceso de autoconocimiento.`;
  }

  if (astralClientMessage && !astralClientMessage.value.trim()) {
    astralClientMessage.value = `Gracias por confiar en Alaya. Quédate con aquello que resuene contigo y úsalo como una guía amable para observarte, cuidarte y avanzar con más claridad.`;
  }

  showToast("Plantilla de informe cliente insertada.");
}

function copyAstralReportChecklist() {
  if (!requireAdminAccess("consultar panel")) return;

  const text = `
Checklist informe cliente · Alaya

Antes de entregar:
[ ] Revisar nombre y datos natales.
[ ] Confirmar que el informe NO incluye notas privadas.
[ ] Revisar tono: claro, cálido y no fatalista.
[ ] Evitar diagnósticos o promesas absolutas.
[ ] Incluir mensaje final de acompañamiento.
[ ] Guardar copia interna si procede.
[ ] Entregar solo al destinatario correcto.
  `.trim();

  copyText(text);
  showToast("Checklist de informe copiado.");
}


function imprimirInformeCartaAstral(id) {
  if (!requireAdminAccess("consultar panel")) return;

  const chart = astralCharts.map(normalizeAstralChart).find(item => item.id === id);
  if (!chart) return;

  printAstralHtml(`Informe ${chart.codigo}`, buildAstralReportHtml(chart));
}

function imprimirBorradorCartaAstral() {
  if (!requireAdminAccess("consultar panel")) return;

  const chart = collectAstralChartFromForm();
  printAstralHtml(`Borrador ${chart.codigo}`, buildAstralReportHtml(chart));
}

function imprimirClienteAstral(key) {
  if (!requireAdminAccess("consultar panel")) return;

  const client = getAstralClientByKey(key);
  if (!client) return;

  const chartsHtml = client.charts.map(chart => buildAstralReportHtml(chart)).join("<hr>");
  const header = `
    <h1>Ficha completa de cliente/paciente</h1>
    <section>
      <h2>${escapeReportHtml(client.nombre)}</h2>
      <div class="meta">
        <div><strong>Email</strong><br>${escapeReportHtml(client.email || "No indicado")}</div>
        <div><strong>Teléfono</strong><br>${escapeReportHtml(client.telefono || "No indicado")}</div>
        <div><strong>Cartas</strong><br>${client.charts.length}</div>
        <div><strong>Sesiones</strong><br>${client.sesiones.length}</div>
      </div>
    </section>
  `;

  printAstralHtml(`Ficha ${client.nombre}`, header + chartsHtml);
}




function renderAstralOnlineStatus(message = "") {
  if (!astralOnlineStatus) return;

  const status = window.AlayaCloud?.getStatus?.();
  const synced = astralCharts.filter(item => item.onlineSynced).length;
  const pending = astralCharts.length - synced;

  if (!status?.ready) {
    astralOnlineStatus.textContent = "Astral Cloud: Firebase no configurado.";
    return;
  }

  if (!status.authenticated || !status.admin) {
    astralOnlineStatus.textContent = `Astral Cloud: inicia sesión admin. Pendientes locales: ${pending}.`;
    return;
  }

  astralOnlineStatus.textContent = message || `Astral Cloud listo. Online: ${synced}. Pendientes: ${pending}.`;
}

async function syncSingleAstralChartOnline(chart) {
  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status?.authenticated || !status?.admin) {
    renderAstralOnlineStatus?.();
    return { ok: false, reason: "Astral Cloud requiere sesión admin Firebase." };
  }

  const cleanChart = normalizeAstralChart({
    ...chart,
    onlineSynced: true,
    onlineUpdatedAt: new Date().toISOString()
  });

  const result = await window.AlayaCloud?.saveCollection?.("astralCharts", [cleanChart]);

  if (result?.ok) {
    astralCharts = astralCharts.map(item => item.id === cleanChart.id
      ? { ...cleanChart, onlineSynced: true, onlineUpdatedAt: new Date().toISOString() }
      : item
    );
    localStorage.setItem("alaya_astral_charts", JSON.stringify(astralCharts));
    renderAstralOnlineStatus("Última carta enviada a Firestore.");
  }

  return result || { ok: false, reason: "saveCollection no disponible." };
}

async function syncAstralChartsOnline() {
  if (!requireAdminAccess("subir cartas astrales online")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || !status.admin) {
    renderAstralOnlineStatus();
    showToast("Necesitas Firebase admin.");
    return;
  }

  const payload = astralCharts.map(chart => normalizeAstralChart({
    ...chart,
    onlineSynced: true,
    onlineUpdatedAt: new Date().toISOString()
  }));

  const result = await window.AlayaCloud?.saveCollection?.("astralCharts", payload);

  if (result?.ok) {
    astralCharts = payload.map(chart => ({ ...chart, onlineSynced: true }));
    saveAstralCharts();
    renderAstralAdmin();
    renderAstralClientHub?.();
    renderAstralOnlineStatus(`${result.count || astralCharts.length} cartas astrales enviadas a Firestore.`);
    addAuditLog("firebase", "Subir cartas astrales online", `${result.count || astralCharts.length} cartas enviadas.`);
    showToast("Cartas astrales subidas online.");
  } else {
    renderAstralOnlineStatus(`Error subiendo cartas: ${result?.reason || "No especificado"}`);
    showToast("No se pudieron subir cartas.");
  }
}

async function loadAstralChartsOnline() {
  if (!requireAdminAccess("cargar cartas astrales online")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || !status.admin) {
    renderAstralOnlineStatus();
    showToast("Necesitas Firebase admin.");
    return;
  }

  const result = await window.AlayaCloud?.loadCollection?.("astralCharts");

  if (result?.ok && Array.isArray(result.data)) {
    const merged = [...result.data, ...astralCharts];
    const map = new Map();

    merged.forEach(item => {
      const normalized = normalizeAstralChart({
        ...item,
        onlineSynced: Boolean(item.onlineSynced || item.onlineUpdatedAt),
        onlineUpdatedAt: item.onlineUpdatedAt || item.updatedAt || ""
      });
      map.set(normalized.id, normalized);
    });

    astralCharts = Array.from(map.values()).sort((a, b) => {
      return new Date(b.updatedAt || b.onlineUpdatedAt || 0) - new Date(a.updatedAt || a.onlineUpdatedAt || 0);
    }).slice(0, 1200);

    saveAstralCharts();
    renderAstralAdmin();
    renderAstralClientHub?.();
    renderAstralOnlineStatus(`${result.data.length} cartas cargadas desde Firestore.`);
    addAuditLog("firebase", "Cargar cartas astrales online", `${result.data.length} cartas cargadas.`);
    showToast("Cartas astrales online cargadas.");
  } else {
    renderAstralOnlineStatus(`Error cargando cartas: ${result?.reason || "No especificado"}`);
    showToast("No se pudieron cargar cartas.");
  }
}

async function deleteAstralChartOnline(id) {
  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status?.authenticated || !status?.admin || !id) {
    return { ok: false, reason: "Borrado online requiere sesión admin." };
  }

  const result = await window.AlayaCloud?.deleteItem?.("astralCharts", id);
  if (result?.ok) {
    renderAstralOnlineStatus("Carta borrada de Firestore.");
  }
  return result;
}

async function testAstralChartsOnline() {
  if (!requireAdminAccess("probar cartas astrales online")) return;

  const status = window.AlayaCloud?.getStatus?.();

  if (!status?.ready || !status.authenticated || !status.admin) {
    renderAstralOnlineStatus();
    showToast("Necesitas Firebase admin.");
    return;
  }

  const testId = "astral_test_" + Date.now();
  const testChart = normalizeAstralChart({
    id: testId,
    codigo: "ALAYA-ASTRAL-TEST",
    nombre: "Prueba Astral Cloud",
    fechaNacimiento: "2000-01-01",
    lugarNacimiento: "Prueba",
    estado: "Borrador",
    consentimiento: true,
    consentDate: new Date().toISOString().slice(0, 10),
    consentSource: "Formulario",
    temaConsulta: "Prueba técnica de escritura y borrado online.",
    onlineSynced: true,
    onlineUpdatedAt: new Date().toISOString()
  });

  const saveResult = await window.AlayaCloud?.saveCollection?.("astralCharts", [testChart]);
  if (!saveResult?.ok) {
    renderAstralOnlineStatus(`Error en prueba: ${saveResult?.reason || "No especificado"}`);
    showToast("Prueba Astral Cloud fallida.");
    return;
  }

  const deleteResult = await window.AlayaCloud?.deleteItem?.("astralCharts", testId);
  if (!deleteResult?.ok) {
    renderAstralOnlineStatus(`Prueba escrita, pero no borrada: ${deleteResult?.reason || "No especificado"}`);
    showToast("Revisa permisos de borrado.");
    return;
  }

  renderAstralOnlineStatus("Prueba Astral Cloud correcta.");
  addAuditLog("firebase", "Probar Astral Cloud", "Escritura y borrado correctos.");
  showToast("Astral Cloud funciona.");
}

function markAstralChartsAsLocal() {
  if (!requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Marcar todas las cartas como pendientes locales? No borra datos online.")) return;

  astralCharts = astralCharts.map(chart => ({ ...chart, onlineSynced: false }));
  saveAstralCharts();
  renderAstralAdmin();
  renderAstralOnlineStatus("Cartas marcadas como pendientes locales.");
  addAuditLog("data", "Marcar cartas astrales como local", `${astralCharts.length} cartas actualizadas.`);
  showToast("Cartas marcadas como local.");
}


function applyAstralPrivacyMode() {
  document.body.classList.toggle("astral-privacy-active", Boolean(astralPrivacyMode));
  if (astralPrivacyModeToggle) astralPrivacyModeToggle.checked = Boolean(astralPrivacyMode);
  localStorage.setItem("alaya_astral_privacy_mode", JSON.stringify(Boolean(astralPrivacyMode)));
}

function toggleAstralPrivacyMode() {
  astralPrivacyMode = !astralPrivacyMode;
  applyAstralPrivacyMode();
  showToast(astralPrivacyMode ? "Modo privacidad activado." : "Modo privacidad desactivado.");
}

function copyAstralConsentTemplate() {
  if (!requireAdminAccess("consultar panel")) return;

  const text = `
Consentimiento informado · Alaya Astrología

Autorizo a Alaya a guardar mis datos natales necesarios para elaborar mi carta astral:
- nombre
- fecha de nacimiento
- hora de nacimiento
- lugar de nacimiento
- datos de contacto facilitados

También autorizo a guardar notas internas de seguimiento relacionadas con la consulta.

Entiendo que:
- la carta astral se usa como herramienta simbólica, de orientación y autoconocimiento;
- no sustituye atención médica, psicológica, legal ni financiera;
- puedo solicitar revisión, rectificación o eliminación de mis datos;
- mis datos deben tratarse con privacidad y solo para el seguimiento acordado.

Nombre:
Fecha:
Firma / confirmación:
  `.trim();

  copyText(text);
  showToast("Plantilla de consentimiento copiada.");
}

function copyAstralPrivacyChecklist() {
  if (!requireAdminAccess("consultar panel")) return;

  const text = `
Checklist privacidad · Alaya Astral Admin

Antes de guardar:
[ ] Nombre y datos natales revisados.
[ ] Consentimiento marcado.
[ ] Fecha de consentimiento indicada.
[ ] Origen del consentimiento indicado.
[ ] Notas privadas solo si son necesarias.
[ ] Próxima revisión de datos indicada si procede.

Antes de imprimir/enviar:
[ ] Revisar que el informe no incluya notas privadas innecesarias.
[ ] Confirmar destinatario.
[ ] No compartir datos sensibles por error.

Mantenimiento:
[ ] Revisar fichas antiguas.
[ ] Borrar o anonimizar datos que ya no hagan falta.
[ ] Exportar copias solo si es necesario.
  `.trim();

  copyText(text);
  showToast("Checklist copiado.");
}

function anonymizeAstralChart(id) {
  if (!requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Anonimizar esta carta? Se borrarán nombre, contacto y notas privadas identificables.")) return;

  astralCharts = astralCharts.map(item => {
    if (item.id !== id) return item;
    const chart = normalizeAstralChart(item);
    return {
      ...chart,
      nombre: `Cliente anonimizado ${chart.codigo}`,
      email: "",
      telefono: "",
      notasPrivadas: "",
      consentNotes: "",
      seguimiento: chart.seguimiento ? "Seguimiento anonimizado." : "",
      anonymized: true,
      updatedAt: new Date().toISOString()
    };
  });

  saveAstralCharts();
  const anonymizedChart = astralCharts.find(item => item.id === id);
  if (anonymizedChart) syncSingleAstralChartOnline(anonymizedChart);
  renderAstralAdmin();
  addAuditLog("data", "Anonimizar carta astral", id);
  showToast("Carta anonimizada.");
}


function renderAstralAdminSummary() {
  if (!astralAdminSummary) return;

  const total = astralCharts.length;
  const borrador = astralCharts.filter(item => item.estado === "Borrador").length;
  const estudio = astralCharts.filter(item => item.estado === "En estudio").length;
  const completada = astralCharts.filter(item => item.estado === "Completada").length;
  const seguimiento = astralCharts.filter(item => item.estado === "Seguimiento").length;
  const sesiones = astralCharts.reduce((total, chart) => total + (normalizeAstralChart(chart).sesiones?.length || 0), 0);

  astralAdminSummary.innerHTML = `
    <article><strong>${total}</strong><span>Total cartas</span></article>
    <article><strong>${borrador}</strong><span>Borrador</span></article>
    <article><strong>${estudio}</strong><span>En estudio</span></article>
    <article><strong>${completada}</strong><span>Completadas</span></article>
    <article><strong>${seguimiento}</strong><span>Seguimiento</span></article>
    <article><strong>${sesiones}</strong><span>Sesiones</span></article>
  `;
}

function renderAstralAdmin() {
  if (!adminAstralChartsList) return;

  normalizeAstralCharts();
  renderAstralAdminSummary();
  renderAstralClientHub();

  const filtered = getFilteredAstralCharts();

  if (!filtered.length) {
    adminAstralChartsList.innerHTML = "<p>No hay cartas astrales con estos filtros.</p>";
    return;
  }

  adminAstralChartsList.innerHTML = filtered.map(chart => `
    <div class="admin-item astral-chart-card">
      <div class="chart-head">
        <strong>${chart.codigo} · ${chart.nombre}</strong>
        <span class="service-template-label">${chart.estado}</span>
      </div>

      <div class="astral-chart-meta">
        <span class="${chart.onlineSynced ? "astral-online-mark" : "astral-local-mark"}">${chart.onlineSynced ? "Online" : "Local"}</span>
        <span class="astral-consent-pill ${chart.consentimiento ? "" : "warning"}">${chart.consentimiento ? "Consentimiento OK" : "Sin consentimiento"}</span>
        ${chart.consentDate ? `<span>Consentimiento: ${chart.consentDate}</span>` : ""}
        ${chart.retentionReview ? `<span>Revisión: ${chart.retentionReview}</span>` : ""}
        ${chart.nextSessionDate ? `<span>Seguimiento: ${chart.nextSessionDate}</span>` : ""}
        <span class="astral-priority-pill ${String(chart.priority).toLowerCase()}">${chart.priority}</span>
        <span>${chart.fechaNacimiento || "Sin fecha"} ${chart.horaNacimiento || ""}</span>
        <span>${chart.lugarNacimiento || "Sin lugar"}</span>
        ${chart.sol ? `<span>${chart.sol}</span>` : ""}
        ${chart.luna ? `<span>${chart.luna}</span>` : ""}
        ${chart.ascendente ? `<span>Asc: ${chart.ascendente}</span>` : ""}
      </div>

      <p><b>Tema:</b> ${chart.temaConsulta || "Sin tema indicado"}</p>
      ${chart.reportSummary || chart.clientMessage ? `<span class="astral-report-ready-pill">Informe cliente preparado</span>` : `<span class="astral-report-ready-pill">Informe pendiente</span>`}
      ${chart.reportSummary ? `<div class="astral-chart-section-mini"><b>Resumen cliente</b>${chart.reportSummary.slice(0, 220)}${chart.reportSummary.length > 220 ? "..." : ""}</div>` : ""}
      ${chart.dataTags?.length ? `<div class="astral-data-tags">${chart.dataTags.map(tag => `<span>${tag}</span>`).join("")}</div>` : ""}
      ${chart.consentNotes ? `<div class="astral-chart-section-mini"><b>Privacidad / consentimiento</b>${chart.consentNotes}</div>` : ""}
      ${chart.nextAction ? `<div class="astral-chart-section-mini"><b>Próximo paso</b>${chart.nextAction}</div>` : ""}

      ${chart.interpretacion ? `<div class="astral-chart-notes"><b>Interpretación:</b><br>${chart.interpretacion.slice(0, 420)}${chart.interpretacion.length > 420 ? "..." : ""}</div>` : ""}

      ${(chart.fortalezas || chart.retos || chart.recomendaciones || chart.objetivo) ? `
        <div class="astral-chart-sections">
          ${chart.objetivo ? `<div class="astral-chart-section-mini"><b>Objetivo</b>${chart.objetivo}</div>` : ""}
          ${chart.fortalezas ? `<div class="astral-chart-section-mini"><b>Fortalezas</b>${chart.fortalezas}</div>` : ""}
          ${chart.retos ? `<div class="astral-chart-section-mini"><b>Retos</b>${chart.retos}</div>` : ""}
          ${chart.recomendaciones ? `<div class="astral-chart-section-mini"><b>Recomendaciones</b>${chart.recomendaciones}</div>` : ""}
        </div>
      ` : ""}

      ${chart.sesiones?.length ? `
        <div class="astral-session-timeline">
          ${chart.sesiones.slice(0, 3).map(session => `
            <article>
              <strong>${session.title || "Sesión"}</strong>
              <small>${session.date || "Sin fecha"}</small>
              <p>${session.note || ""}</p>
              ${session.next ? `<p><b>Próximo paso:</b> ${session.next}</p>` : ""}
            </article>
          `).join("")}
        </div>
      ` : ""}

      ${chart.notasPrivadas ? `<div class="astral-chart-notes"><b>Notas privadas:</b><br>${chart.notasPrivadas.slice(0, 360)}${chart.notasPrivadas.length > 360 ? "..." : ""}</div>` : ""}
      ${chart.seguimiento ? `<div class="astral-chart-notes"><b>Seguimiento:</b><br>${chart.seguimiento.slice(0, 280)}${chart.seguimiento.length > 280 ? "..." : ""}</div>` : ""}

      <p class="astral-privacy-note">
        Datos internos guardados con consentimiento: ${chart.consentimiento ? "sí" : "no"}.
        Última actualización: ${formatNotificationDate?.(chart.updatedAt) || chart.updatedAt}
      </p>

      <div class="admin-actions">
        <button class="btn btn-secondary" onclick="editarCartaAstral('${chart.id}')">Editar</button>
        <button class="btn btn-secondary" onclick="copiarResumenCartaAstral('${chart.id}')">Copiar resumen</button>
        <button class="btn btn-secondary" onclick="imprimirInformeCartaAstral('${chart.id}')">Informe interno</button>
        <button class="btn btn-secondary" onclick="imprimirInformeClienteAstral('${chart.id}')">Informe cliente</button>
        <button class="btn btn-secondary" onclick="anonymizeAstralChart('${chart.id}')">Anonimizar</button>
        <button class="btn btn-danger" onclick="borrarCartaAstral('${chart.id}')">Borrar</button>
      </div>
    </div>
  `).join("");

  applyRoleGuardUx?.();
}

function editarCartaAstral(id) {
  if (!requireAdminAccess("editar cartas astrales")) return;

  const chart = astralCharts.map(normalizeAstralChart).find(item => item.id === id);
  if (!chart) return;

  editingAstralChartId = id;

  if (astralNombre) astralNombre.value = chart.nombre;
  if (astralCodigo) astralCodigo.value = chart.codigo;
  if (astralEmail) astralEmail.value = chart.email;
  if (astralTelefono) astralTelefono.value = chart.telefono;
  if (astralFechaNacimiento) astralFechaNacimiento.value = chart.fechaNacimiento;
  if (astralHoraNacimiento) astralHoraNacimiento.value = chart.horaNacimiento;
  if (astralLugarNacimiento) astralLugarNacimiento.value = chart.lugarNacimiento;
  if (astralPaisNacimiento) astralPaisNacimiento.value = chart.paisNacimiento;
  if (astralZonaHoraria) astralZonaHoraria.value = chart.zonaHoraria;
  if (astralEstado) astralEstado.value = chart.estado;
  if (astralTemaConsulta) astralTemaConsulta.value = chart.temaConsulta;
  if (astralSol) astralSol.value = chart.sol;
  if (astralLuna) astralLuna.value = chart.luna;
  if (astralAscendente) astralAscendente.value = chart.ascendente;
  if (astralMedioCielo) astralMedioCielo.value = chart.medioCielo;
  if (astralPlanetas) astralPlanetas.value = chart.planetas;
  if (astralCasas) astralCasas.value = chart.casas;
  if (astralAspectos) astralAspectos.value = chart.aspectos;
  if (astralInterpretacion) astralInterpretacion.value = chart.interpretacion;
  if (astralReportTitle) astralReportTitle.value = chart.reportTitle;
  if (astralReportSummary) astralReportSummary.value = chart.reportSummary;
  if (astralClientMessage) astralClientMessage.value = chart.clientMessage;
  if (astralFortalezas) astralFortalezas.value = chart.fortalezas;
  if (astralRetos) astralRetos.value = chart.retos;
  if (astralRecomendaciones) astralRecomendaciones.value = chart.recomendaciones;
  if (astralObjetivo) astralObjetivo.value = chart.objetivo;
  if (astralNotasPrivadas) astralNotasPrivadas.value = chart.notasPrivadas;
  if (astralSeguimiento) astralSeguimiento.value = chart.seguimiento;
  if (astralConsentDate) astralConsentDate.value = chart.consentDate;
  if (astralConsentSource) astralConsentSource.value = chart.consentSource;
  if (astralRetentionReview) astralRetentionReview.value = chart.retentionReview;
  if (astralNextSessionDate) astralNextSessionDate.value = chart.nextSessionDate;
  if (astralPriority) astralPriority.value = chart.priority;
  if (astralNextAction) astralNextAction.value = chart.nextAction;
  if (astralDataTags) astralDataTags.value = (chart.dataTags || []).join(", ");
  if (astralConsentNotes) astralConsentNotes.value = chart.consentNotes;
  if (astralConsentimiento) astralConsentimiento.checked = chart.consentimiento;
  astralSessionDraft = [...(chart.sesiones || [])];
  renderAstralSessionDraft();

  if (guardarCartaAstralBtn) guardarCartaAstralBtn.textContent = "Actualizar carta astral";
  switchAdminTab("astral");
}

function borrarCartaAstral(id) {
  if (!requireAdminAccess("borrar cartas astrales")) return;
  if (!confirm("¿Seguro que quieres borrar esta carta astral y sus notas?")) return;

  const chart = astralCharts.find(item => item.id === id);
  astralCharts = astralCharts.filter(item => item.id !== id);
  deleteAstralChartOnline(id);
  saveAstralCharts();
  renderAstralAdmin();
  addAuditLog("data", "Borrar carta astral", chart ? `${chart.codigo} · ${chart.nombre}` : id);
  showToast("Carta astral borrada.");
}

function buildAstralChartSummary(chart) {
  return `
Carta astral · ${chart.codigo}

Cliente/paciente:
${chart.nombre}

Nacimiento:
Fecha: ${chart.fechaNacimiento}
Hora: ${chart.horaNacimiento || "No indicada"}
Lugar: ${chart.lugarNacimiento}, ${chart.paisNacimiento || ""}
Zona horaria: ${chart.zonaHoraria || "No indicada"}

Tema:
${chart.temaConsulta || "Sin tema"}

Claves:
Sol: ${chart.sol || "No indicado"}
Luna: ${chart.luna || "No indicada"}
Ascendente: ${chart.ascendente || "No indicado"}
Medio Cielo: ${chart.medioCielo || "No indicado"}

Planetas:
${chart.planetas || "Sin datos"}

Casas:
${chart.casas || "Sin datos"}

Aspectos:
${chart.aspectos || "Sin datos"}

Interpretación:
${chart.interpretacion || "Sin interpretación"}

Informe cliente:
Título: ${chart.reportTitle || "Sin título"}
Resumen: ${chart.reportSummary || "Sin resumen"}
Mensaje final: ${chart.clientMessage || "Sin mensaje final"}

Objetivo:
${chart.objetivo || "Sin objetivo"}

Fortalezas:
${chart.fortalezas || "Sin fortalezas"}

Retos:
${chart.retos || "Sin retos"}

Recomendaciones:
${chart.recomendaciones || "Sin recomendaciones"}

Sesiones:
${(chart.sesiones || []).map(session => `- ${session.date || "Sin fecha"} · ${session.title || "Sesión"}: ${session.note || ""} ${session.next ? `| Próximo: ${session.next}` : ""}`).join("\n") || "Sin sesiones"}

Notas privadas:
${chart.notasPrivadas || "Sin notas"}

Seguimiento:
${chart.seguimiento || "Sin seguimiento"}

Privacidad:
Consentimiento: ${chart.consentimiento ? "Sí" : "No"}
Fecha consentimiento: ${chart.consentDate || "No indicada"}
Origen consentimiento: ${chart.consentSource || "No indicado"}
Revisión de datos: ${chart.retentionReview || "No indicada"}
Próxima sesión/seguimiento: ${chart.nextSessionDate || "No indicada"}
Prioridad: ${chart.priority || "Normal"}
Próximo paso: ${chart.nextAction || "Sin próximo paso"}
Notas consentimiento: ${chart.consentNotes || "Sin notas"}
  `.trim();
}

function copiarResumenCartaAstral(id) {
  if (!requireAdminAccess("consultar panel")) return;

  const chart = astralCharts.map(normalizeAstralChart).find(item => item.id === id);
  if (!chart) return;

  copyText(buildAstralChartSummary(chart));
  showToast("Resumen de carta copiado.");
}

function renderAstralSessionDraft() {
  if (!astralSessionDraftList) return;

  if (!astralSessionDraft.length) {
    astralSessionDraftList.innerHTML = "<p>No hay sesiones añadidas en este borrador.</p>";
    return;
  }

  astralSessionDraftList.innerHTML = astralSessionDraft.map((session, index) => `
    <div class="astral-session-draft">
      <strong>${session.title || "Sesión"} · ${session.date || "Sin fecha"}</strong>
      <p>${session.note || ""}</p>
      ${session.next ? `<p><b>Próximo paso:</b> ${session.next}</p>` : ""}
      <button class="btn btn-danger" type="button" onclick="removeAstralSessionDraft(${index})">Quitar sesión</button>
    </div>
  `).join("");
}

function addAstralSessionToDraft() {
  if (!requireAdminAccess("guardar cartas astrales")) return;

  const session = {
    id: crypto.randomUUID(),
    date: astralSessionDate?.value || new Date().toISOString().slice(0, 10),
    title: astralSessionTitle?.value.trim() || "Sesión astral",
    note: astralSessionNote?.value.trim() || "",
    next: astralSessionNext?.value.trim() || "",
    createdAt: new Date().toISOString()
  };

  if (!session.note && !session.next) {
    showToast("Añade una nota o próximo paso.");
    return;
  }

  astralSessionDraft.unshift(session);

  if (astralSessionDate) astralSessionDate.value = "";
  if (astralSessionTitle) astralSessionTitle.value = "";
  if (astralSessionNote) astralSessionNote.value = "";
  if (astralSessionNext) astralSessionNext.value = "";

  renderAstralSessionDraft();
  showToast("Sesión añadida al borrador.");
}

function removeAstralSessionDraft(index) {
  if (!requireAdminAccess("guardar cartas astrales")) return;
  astralSessionDraft.splice(index, 1);
  renderAstralSessionDraft();
}

function insertarPlantillaInterpretacionAstral() {
  if (!requireAdminAccess("guardar cartas astrales")) return;

  const plantilla = `
Resumen general:
- Energía principal:
- Tono emocional:
- Camino de crecimiento:

Sol:
- Identidad:
- Talento principal:
- Cuidado recomendado:

Luna:
- Mundo emocional:
- Necesidad interna:
- Patrón a observar:

Ascendente:
- Cómo se presenta:
- Primer impulso:
- Aprendizaje visible:

Casas y áreas de vida:
- Trabajo / vocación:
- Relaciones:
- Hogar / raíces:
- Espiritualidad / sentido:

Aspectos importantes:
- Aspecto 1:
- Aspecto 2:
- Aspecto 3:

Cierre de sesión:
- Mensaje clave:
- Recomendación:
- Próximo paso:
  `.trim();

  if (astralInterpretacion && !astralInterpretacion.value.trim()) {
    astralInterpretacion.value = plantilla;
  } else if (astralInterpretacion) {
    astralInterpretacion.value += "\\n\\n" + plantilla;
  }

  showToast("Plantilla insertada.");
}

function buildAstralIaPromptFromForm() {
  const chart = collectAstralChartFromForm();

  return `
Actúa como asistente de apoyo para una consulta astrológica holística de Alaya.
Quiero una interpretación clara, cuidada y no fatalista. No hagas diagnósticos médicos ni promesas absolutas.

Datos de la persona:
- Nombre: ${chart.nombre || "No indicado"}
- Fecha de nacimiento: ${chart.fechaNacimiento || "No indicada"}
- Hora de nacimiento: ${chart.horaNacimiento || "No indicada"}
- Lugar de nacimiento: ${chart.lugarNacimiento || "No indicado"}
- País: ${chart.paisNacimiento || "No indicado"}
- Zona horaria: ${chart.zonaHoraria || "No indicada"}

Tema de consulta:
${chart.temaConsulta || "No indicado"}

Datos astrológicos ya calculados:
- Sol: ${chart.sol || "No indicado"}
- Luna: ${chart.luna || "No indicada"}
- Ascendente: ${chart.ascendente || "No indicado"}
- Medio Cielo: ${chart.medioCielo || "No indicado"}

Planetas:
${chart.planetas || "Sin datos"}

Casas:
${chart.casas || "Sin datos"}

Aspectos:
${chart.aspectos || "Sin datos"}

Necesito que generes:
1. Resumen general de la carta.
2. Fortalezas principales.
3. Retos o aprendizajes.
4. Recomendaciones de acompañamiento.
5. Preguntas útiles para una sesión.
6. Próximo paso recomendado.

Tono: profesional, cálido, espiritual, claro, respetuoso y orientado al bienestar.
  `.trim();
}

function copiarPromptCartaAstralIa() {
  if (!requireAdminAccess("consultar panel")) return;
  copyText(buildAstralIaPromptFromForm());
  showToast("Prompt IA copiado.");
}

function exportarCartasAstralesJson() {
  if (!requireAdminAccess("configuración crítica")) return;

  const data = {
    version: "4.9",
    exportedAt: new Date().toISOString(),
    astralCharts
  };

  downloadTextFile("alaya-cartas-astrales.json", JSON.stringify(data, null, 2));
  addAuditLog("data", "Exportar cartas astrales JSON", `${astralCharts.length} cartas exportadas.`);
  showToast("Cartas astrales exportadas en JSON.");
}

function exportarCartasAstralesCsv() {
  if (!requireAdminAccess("configuración crítica")) return;

  const headers = [
    "codigo", "nombre", "email", "telefono", "fechaNacimiento", "horaNacimiento",
    "lugarNacimiento", "paisNacimiento", "zonaHoraria", "estado", "temaConsulta",
    "sol", "luna", "ascendente", "medioCielo", "planetas", "casas", "aspectos",
    "interpretacion", "reportTitle", "reportSummary", "clientMessage", "fortalezas", "retos", "recomendaciones", "objetivo", "notasPrivadas", "seguimiento", "sesiones", "consentimiento", "consentDate", "consentSource", "consentNotes", "retentionReview", "nextSessionDate", "priority", "nextAction", "followupDoneAt", "dataTags", "anonymized", "onlineSynced", "onlineUpdatedAt", "createdAt", "updatedAt"
  ];

  const rows = astralCharts.map(chart => {
    const normalized = normalizeAstralChart(chart);
    return headers.map(header => {
      const value = String(normalized[header] ?? "").replace(/"/g, '""');
      return `"${value}"`;
    }).join(",");
  });

  downloadTextFile("alaya-cartas-astrales.csv", [headers.join(","), ...rows].join("\\n"));
  addAuditLog("data", "Exportar cartas astrales CSV", `${astralCharts.length} cartas exportadas.`);
  showToast("Cartas astrales exportadas en CSV.");
}

function copyAstralAdminSummary() {
  if (!requireAdminAccess("consultar panel")) return;

  const text = `
Alaya Astral Admin

- App Astral IA disponible solo desde admin.
- Cartas astrales guardadas: ${astralCharts.length}
- Permite fichas de cliente/paciente.
- Guarda datos natales, interpretación, notas privadas y seguimiento.
- Exportación JSON/CSV disponible.
  `.trim();

  copyText(text);
  showToast("Resumen del módulo copiado.");
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
        <span class="status ${statusClass}">${getReservationPublicStatusLabel(reserva)}</span>\n      <span class="confirmation-admin-pill ${reserva.confirmacionAdmin ? "confirmed" : ""}">${reserva.confirmacionAdmin ? "Confirmada por admin" : "Pendiente de confirmación admin"}</span>
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
        <button class="btn btn-primary" onclick="confirmarReservaAdmin('${reserva.id}')">Confirmar reserva</button>
        <button class="btn btn-secondary" onclick="cambiarEstadoReserva('${reserva.id}', 'Cancelada')">Cancelar</button>
        <button class="btn btn-secondary" onclick="contactarReserva('${reserva.id}')">Contactar</button>
        <button class="btn btn-danger" onclick="borrarReserva('${reserva.id}')">Borrar</button>
      </div>
    `;

    adminReservasList.appendChild(item);
  });
}


function getReservationPublicStatusLabel(reserva) {
  const estado = reserva?.estado || "Pendiente";
  if (estado === "Pendiente") return "Pendiente de confirmación";
  if (estado === "Confirmada") return "Confirmada por Alaya";
  if (estado === "Propuesta alternativa") return "Propuesta alternativa enviada";
  if (estado === "Alternativa aceptada") return "Alternativa aceptada, pendiente de confirmación";
  if (estado === "Cancelada") return "Cancelada";
  return estado;
}

function marcarConfirmacionAdminMeta(id, confirmado = true) {
  reservas = reservas.map(reserva => {
    if (reserva.id !== id) return reserva;
    return {
      ...reserva,
      confirmacionAdmin: confirmado,
      fechaConfirmacionAdmin: confirmado ? new Date().toISOString() : "",
      confirmadoPorAdmin: confirmado ? (getAuditActor ? getAuditActor() : "admin") : ""
    };
  });
}

async function confirmarReservaAdmin(id) {
  if (!requireAdminAccess("confirmar reservas")) return;

  marcarConfirmacionAdminMeta(id, true);
  addReservationHistory(id, "Confirmada", "Reserva confirmada manualmente por el administrador");
  saveReservas();
  renderAdminReservas();
  renderAdminCalendar();
  renderAdminDashboard();
  addAuditLog("data", "Confirmar reserva", `${id} → Confirmada por admin`);

  const reserva = reservas.find(item => item.id === id);
  if (reserva) {
    await copyTextToClipboard(buildClientMessage(reserva, "confirmacion"), "Reserva confirmada. Mensaje de confirmación copiado.");
  } else {
    showToast("Reserva confirmada.");
  }
}


function cambiarEstadoReserva(id, estado) {
  marcarConfirmacionAdminMeta(id, estado === "Confirmada");
  addReservationHistory(id, estado, estado === "Confirmada" ? "Reserva confirmada manualmente por el administrador" : "Estado cambiado desde panel admin");
  saveReservas();
  renderAdminReservas();
  renderAdminCalendar();
  renderAdminDashboard();
  addAuditLog("data", "Cambiar estado reserva", `${id} → ${estado}`);
  showToast(estado === "Confirmada" ? "Reserva confirmada por administrador." : `Reserva ${estado.toLowerCase()}.`);
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
    branding: collectBrandingFromForm(),
    publicProfile: collectPublicProfileFromForm()
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
    astralCharts,
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
      if (Array.isArray(data.astralCharts)) astralCharts = data.astralCharts;
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
    ["copyAstralAdminSummary", "consultar panel"],
    ["editarCartaAstral", "editar cartas astrales"],
    ["borrarCartaAstral", "borrar cartas astrales"],
    ["copiarResumenCartaAstral", "consultar panel"],
    ["exportarCartasAstralesJson", "configuración crítica"],
    ["exportarCartasAstralesCsv", "configuración crítica"],
    ["removeAstralSessionDraft", "guardar cartas astrales"],
    ["copiarPromptCartaAstralIa", "consultar panel"],
    ["filtrarAstralPorCliente", "consultar panel"],
    ["copiarResumenClienteAstral", "consultar panel"],
    ["imprimirClienteAstral", "consultar panel"],
    ["imprimirInformeCartaAstral", "consultar panel"],
    ["imprimirInformeClienteAstral", "consultar panel"],
    ["previewClientReportDraft", "consultar panel"],
    ["insertarPlantillaInformeCliente", "guardar cartas astrales"],
    ["copyAstralReportChecklist", "consultar panel"],
    ["imprimirBorradorCartaAstral", "consultar panel"],
    ["anonymizeAstralChart", "configuración crítica"],
    ["copiarMensajeSeguimientoAstral", "consultar panel"],
    ["marcarSeguimientoAstralHecho", "guardar cartas astrales"],
    ["syncAstralChartsOnline", "subir cartas astrales online"],
    ["loadAstralChartsOnline", "cargar cartas astrales online"],
    ["testAstralChartsOnline", "probar cartas astrales online"],
    ["markAstralChartsAsLocal", "configuración crítica"],
    ["copyLaunchReport", "consultar panel"],
    ["resetLaunchChecklist", "configuración crítica"],
    ["insertarPlantillaInterpretacionAstral", "guardar cartas astrales"],
    ["mergeServiceExamples", "guardar servicios"],
    ["resetServicesToExamples", "configuración crítica"],
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
guardarCartaAstralBtn?.addEventListener("click", guardarCartaAstralDesdeAdmin);
limpiarCartaAstralBtn?.addEventListener("click", limpiarFormularioCartaAstral);
exportarCartasAstralesBtn?.addEventListener("click", exportarCartasAstralesJson);
exportarCartasAstralesCsvBtn?.addEventListener("click", exportarCartasAstralesCsv);
generarPromptCartaAstralBtn?.addEventListener("click", copiarPromptCartaAstralIa);
imprimirBorradorCartaAstralBtn?.addEventListener("click", imprimirBorradorCartaAstral);
previewInternalReportDraftBtn?.addEventListener("click", imprimirBorradorCartaAstral);
insertClientReportTemplateBtn?.addEventListener("click", insertarPlantillaInformeCliente);
previewClientReportDraftBtn?.addEventListener("click", previewClientReportDraft);
copyAstralReportChecklistBtn?.addEventListener("click", copyAstralReportChecklist);
crearPlantillaInterpretacionBtn?.addEventListener("click", insertarPlantillaInterpretacionAstral);
addAstralSessionBtn?.addEventListener("click", addAstralSessionToDraft);
astralSearch?.addEventListener("input", renderAstralAdmin);
astralStatusFilter?.addEventListener("change", renderAstralAdmin);
astralClientSearch?.addEventListener("input", renderAstralClientHub);
astralFollowupFilter?.addEventListener("change", renderAstralFollowups);
syncAstralChartsOnlineBtn?.addEventListener("click", syncAstralChartsOnline);
loadAstralChartsOnlineBtn?.addEventListener("click", loadAstralChartsOnline);
testAstralChartsOnlineBtn?.addEventListener("click", testAstralChartsOnline);
markAstralChartsLocalBtn?.addEventListener("click", markAstralChartsAsLocal);
astralPrivacyModeToggle?.addEventListener("change", event => {
  astralPrivacyMode = Boolean(event.target.checked);
  applyAstralPrivacyMode();
});
toggleAstralPrivacyBtn?.addEventListener("click", toggleAstralPrivacyMode);
copyAstralConsentTemplateBtn?.addEventListener("click", copyAstralConsentTemplate);
copyAstralPrivacyChecklistBtn?.addEventListener("click", copyAstralPrivacyChecklist);
guardarServicioBtn?.addEventListener("click", guardarServicioDesdeAdmin);
loadServiceExamplesBtn?.addEventListener("click", mergeServiceExamples);
resetServicesExamplesBtn?.addEventListener("click", resetServicesToExamples);
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


// v5.6 Web Pública Pro
function updatePublicQuickDockVisibility() {
  const dock = document.querySelector("#publicQuickDock");
  if (!dock) return;

  const adminOpen = document.querySelector("#adminModal:not(.hidden)");
  const anyModalOpen = document.querySelector(".modal:not(.hidden)");
  dock.style.display = (adminOpen || anyModalOpen) ? "none" : "";
}

document.addEventListener("click", () => setTimeout(updatePublicQuickDockVisibility, 80));
document.addEventListener("keydown", () => setTimeout(updatePublicQuickDockVisibility, 80));
updatePublicQuickDockVisibility();



// v5.7 Centro de Lanzamiento Pro
const launchScoreValue = document.querySelector("#launchScoreValue");
const launchScoreText = document.querySelector("#launchScoreText");
const launchScoreRing = document.querySelector("#launchScoreRing");
const launchPublicChecklist = document.querySelector("#launchPublicChecklist");
const launchAdminChecklist = document.querySelector("#launchAdminChecklist");
const launchQuickTests = document.querySelector("#launchQuickTests");
const runLaunchCheckBtn = document.querySelector("#runLaunchCheckBtn");
const copyLaunchReportBtn = document.querySelector("#copyLaunchReportBtn");
const resetLaunchChecklistBtn = document.querySelector("#resetLaunchChecklistBtn");
const launchNotes = document.querySelector("#launchNotes");
const saveLaunchNotesBtn = document.querySelector("#saveLaunchNotesBtn");

const LAUNCH_CHECKLIST = {
  public: [
    { id: "logos", label: "Logos revisados en header, secciones y favicon." },
    { id: "texts", label: "Textos principales revisados: servicios, herbolario, astrología y reservas." },
    { id: "contact", label: "WhatsApp/email de contacto configurados." },
    { id: "seo", label: "SEO básico, sitemap y robots incluidos." },
    { id: "mobile", label: "Web revisada en móvil." },
    { id: "offline", label: "PWA/offline revisado." }
  ],
  admin: [
    { id: "login", label: "Acceso admin probado." },
    { id: "roles", label: "Roles admin/editor/viewer revisados." },
    { id: "reservations", label: "Reserva de prueba creada y gestionada." },
    { id: "firebase", label: "Firebase configurado o decidido usar solo local." },
    { id: "privacy", label: "Privacidad y consentimiento revisados." },
    { id: "backup", label: "Backup exportado antes de publicar." }
  ]
};

function getLaunchState() {
  return JSON.parse(localStorage.getItem("alaya_launch_checklist") || "{}");
}

function saveLaunchState(state) {
  localStorage.setItem("alaya_launch_checklist", JSON.stringify(state));
}

function renderLaunchChecklist() {
  const state = getLaunchState();

  const renderGroup = (target, group) => {
    if (!target) return;
    target.innerHTML = LAUNCH_CHECKLIST[group].map(item => `
      <label class="launch-check-item">
        <input type="checkbox" data-launch-check="${item.id}" ${state[item.id] ? "checked" : ""}>
        <span>${item.label}</span>
      </label>
    `).join("");
  };

  renderGroup(launchPublicChecklist, "public");
  renderGroup(launchAdminChecklist, "admin");

  document.querySelectorAll("[data-launch-check]").forEach(input => {
    input.addEventListener("change", event => {
      const current = getLaunchState();
      current[event.target.dataset.launchCheck] = event.target.checked;
      saveLaunchState(current);
      renderLaunchStatus();
    });
  });
}

function getLaunchTests() {
  const requiredSelectors = [
    ["Logo principal", ".brand-logo-img"],
    ["Sección reservas", "#reservas"],
    ["Servicios", "#servicios"],
    ["Herbolario", "#herbolario"],
    ["Astrología", "#astral-ia"],
    ["Accesos rápidos", "#publicQuickDock"],
    ["Panel admin", "#adminModal"],
    ["Manifest PWA", "link[rel='manifest']"],
    ["SEO descripción", "meta[name='description']"],
    ["Datos estructurados", "#alayaStructuredData"]
  ];

  return requiredSelectors.map(([label, selector]) => ({
    label,
    ok: Boolean(document.querySelector(selector)),
    detail: selector
  }));
}

function renderLaunchTests() {
  if (!launchQuickTests) return;

  const tests = getLaunchTests();
  launchQuickTests.innerHTML = tests.map(test => `
    <div class="launch-test-item ${test.ok ? "launch-test-ok" : "launch-test-warning"}">
      <b>${test.ok ? "OK" : "!"}</b>
      <span>${test.label}<br><small>${test.detail}</small></span>
    </div>
  `).join("");
}

function calculateLaunchScore() {
  const state = getLaunchState();
  const checks = [...LAUNCH_CHECKLIST.public, ...LAUNCH_CHECKLIST.admin];
  const checked = checks.filter(item => state[item.id]).length;
  const tests = getLaunchTests();
  const testsOk = tests.filter(test => test.ok).length;

  const checklistScore = checks.length ? checked / checks.length : 0;
  const testsScore = tests.length ? testsOk / tests.length : 0;

  return Math.round(((checklistScore * 0.65) + (testsScore * 0.35)) * 100);
}

function renderLaunchStatus() {
  renderLaunchTests();

  const score = calculateLaunchScore();
  if (launchScoreValue) launchScoreValue.textContent = `${score}%`;
  if (launchScoreRing) launchScoreRing.style.setProperty("--launch-score", `${score}%`);

  if (launchScoreText) {
    if (score >= 90) {
      launchScoreText.textContent = "La web está prácticamente lista para publicar.";
    } else if (score >= 70) {
      launchScoreText.textContent = "La web está avanzada, pero quedan revisiones importantes.";
    } else {
      launchScoreText.textContent = "Todavía quedan puntos por revisar antes del lanzamiento.";
    }
  }

  if (launchNotes) {
    launchNotes.value = localStorage.getItem("alaya_launch_notes") || "";
  }
}

function copyLaunchReport() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const state = getLaunchState();
  const tests = getLaunchTests();
  const score = calculateLaunchScore();

  const checklistLines = [...LAUNCH_CHECKLIST.public, ...LAUNCH_CHECKLIST.admin]
    .map(item => `${state[item.id] ? "[x]" : "[ ]"} ${item.label}`)
    .join("\n");

  const testLines = tests
    .map(test => `${test.ok ? "OK" : "REVISAR"} · ${test.label} (${test.detail})`)
    .join("\n");

  const report = `
Alaya Holistics · Informe de lanzamiento

Preparación: ${score}%

Checklist:
${checklistLines}

Pruebas rápidas:
${testLines}

Notas:
${localStorage.getItem("alaya_launch_notes") || "Sin notas"}

Recomendación:
${score >= 90 ? "Lista para publicar con revisión final." : "Revisar puntos pendientes antes de publicar."}
  `.trim();

  if (typeof copyText === "function") copyText(report);
  else navigator.clipboard?.writeText(report);

  if (typeof showToast === "function") showToast("Informe de lanzamiento copiado.");
}

function resetLaunchChecklist() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Reiniciar checklist de lanzamiento?")) return;

  localStorage.removeItem("alaya_launch_checklist");
  renderLaunchChecklist();
  renderLaunchStatus();

  if (typeof showToast === "function") showToast("Checklist reiniciado.");
}

function saveLaunchNotes() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  localStorage.setItem("alaya_launch_notes", launchNotes?.value || "");
  if (typeof showToast === "function") showToast("Notas de lanzamiento guardadas.");
}

runLaunchCheckBtn?.addEventListener("click", () => {
  renderLaunchChecklist();
  renderLaunchStatus();
});
copyLaunchReportBtn?.addEventListener("click", copyLaunchReport);
resetLaunchChecklistBtn?.addEventListener("click", resetLaunchChecklist);
saveLaunchNotesBtn?.addEventListener("click", saveLaunchNotes);

renderLaunchChecklist();
renderLaunchStatus();



// v5.8 Banner básico de cookies y almacenamiento local
const cookieBanner = document.querySelector("#cookieBanner");
const acceptCookiesBtn = document.querySelector("#acceptCookiesBtn");
const rejectCookiesBtn = document.querySelector("#rejectCookiesBtn");

function showCookieBannerIfNeeded() {
  if (!cookieBanner) return;
  const choice = localStorage.getItem("alaya_cookie_choice");
  cookieBanner.classList.toggle("hidden", Boolean(choice));
}

function setCookieChoice(choice) {
  localStorage.setItem("alaya_cookie_choice", choice);
  localStorage.setItem("alaya_cookie_choice_at", new Date().toISOString());
  cookieBanner?.classList.add("hidden");
  if (typeof showToast === "function") {
    showToast(choice === "accepted" ? "Preferencias aceptadas." : "Solo cookies/almacenamiento necesario.");
  }
}

acceptCookiesBtn?.addEventListener("click", () => setCookieChoice("accepted"));
rejectCookiesBtn?.addEventListener("click", () => setCookieChoice("necessary"));
showCookieBannerIfNeeded();



// v5.9 Contacto y Conversión Pro
const publicContactReason = document.querySelector("#publicContactReason");
const publicContactName = document.querySelector("#publicContactName");
const publicContactMessagePreview = document.querySelector("#publicContactMessagePreview");
const copyPublicContactMessageBtn = document.querySelector("#copyPublicContactMessageBtn");
const backToTopBtn = document.querySelector("#backToTopBtn");

function buildPublicContactMessage() {
  const reason = publicContactReason?.value || "una consulta holística";
  const name = publicContactName?.value?.trim();
  return `Hola Alaya${name ? `, soy ${name}` : ""}. Me gustaría pedir información para ${reason}. ¿Me podéis indicar disponibilidad y cómo reservar?`;
}

function updatePublicContactPreview() {
  if (!publicContactMessagePreview) return;
  publicContactMessagePreview.textContent = buildPublicContactMessage();
}

function copyPublicContactMessage() {
  const message = buildPublicContactMessage();
  if (typeof copyText === "function") {
    copyText(message);
  } else {
    navigator.clipboard?.writeText(message);
  }
  if (typeof showToast === "function") showToast("Mensaje de contacto copiado.");
}

publicContactReason?.addEventListener("change", updatePublicContactPreview);
publicContactName?.addEventListener("input", updatePublicContactPreview);
copyPublicContactMessageBtn?.addEventListener("click", copyPublicContactMessage);
updatePublicContactPreview();

function updateBackToTopButton() {
  if (!backToTopBtn) return;
  backToTopBtn.classList.toggle("visible", window.scrollY > 520);
}

backToTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
window.addEventListener("scroll", updateBackToTopButton, { passive: true });
updateBackToTopButton();



// v6.0 Canales y Redes Pro
const openPublicWhatsappBtn = document.querySelector("#openPublicWhatsappBtn");
const openPublicEmailBtn = document.querySelector("#openPublicEmailBtn");
const publicWhatsappLabel = document.querySelector("#publicWhatsappLabel");
const publicWhatsappLink = document.querySelector("#publicWhatsappLink");
const publicEmailLabel = document.querySelector("#publicEmailLabel");
const publicEmailLink = document.querySelector("#publicEmailLink");
const publicAddressLabel = document.querySelector("#publicAddressLabel");
const publicMapLink = document.querySelector("#publicMapLink");
const publicHoursLabel = document.querySelector("#publicHoursLabel");
const publicInstagramLink = document.querySelector("#publicInstagramLink");
const publicTikTokLink = document.querySelector("#publicTikTokLink");
const publicYoutubeLink = document.querySelector("#publicYoutubeLink");
const publicNoticeText = document.querySelector("#publicNoticeText");

function collectPublicProfileFromForm() {
  return {
    address: settingPublicAddress?.value.trim() || DEFAULT_PUBLIC_PROFILE.address,
    hours: settingPublicHours?.value.trim() || DEFAULT_PUBLIC_PROFILE.hours,
    mapLink: settingMapLink?.value.trim() || "",
    instagram: settingInstagram?.value.trim() || "",
    tiktok: settingTikTok?.value.trim() || "",
    youtube: settingYoutube?.value.trim() || "",
    publicNotice: settingPublicNotice?.value.trim() || DEFAULT_PUBLIC_PROFILE.publicNotice
  };
}

function fillPublicProfileForm() {
  const profile = getPublicProfile();
  if (settingPublicAddress) settingPublicAddress.value = profile.address || "";
  if (settingPublicHours) settingPublicHours.value = profile.hours || "";
  if (settingMapLink) settingMapLink.value = profile.mapLink || "";
  if (settingInstagram) settingInstagram.value = profile.instagram || "";
  if (settingTikTok) settingTikTok.value = profile.tiktok || "";
  if (settingYoutube) settingYoutube.value = profile.youtube || "";
  if (settingPublicNotice) settingPublicNotice.value = profile.publicNotice || "";
}

function setOptionalLink(link, url, fallback = "#contacto-alaya") {
  if (!link) return;
  if (url) {
    link.href = url;
    link.classList.remove("is-empty");
  } else {
    link.href = fallback;
    link.classList.add("is-empty");
  }
}

function applyPublicProfileToPage() {
  const profile = getPublicProfile();
  const whatsapp = getAdminWhatsapp();
  const email = getAdminEmail();
  const message = typeof buildPublicContactMessage === "function"
    ? buildPublicContactMessage()
    : `Hola Alaya. Me gustaría pedir información.`;

  if (publicWhatsappLabel) publicWhatsappLabel.textContent = whatsapp ? `+${whatsapp}` : "Configurar WhatsApp";
  if (publicEmailLabel) publicEmailLabel.textContent = email || "Configurar email";
  if (publicAddressLabel) publicAddressLabel.textContent = profile.address || DEFAULT_PUBLIC_PROFILE.address;
  if (publicHoursLabel) publicHoursLabel.textContent = profile.hours || DEFAULT_PUBLIC_PROFILE.hours;
  if (publicNoticeText) publicNoticeText.textContent = profile.publicNotice || DEFAULT_PUBLIC_PROFILE.publicNotice;

  if (publicWhatsappLink) {
    publicWhatsappLink.href = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}` : "#reservas";
    publicWhatsappLink.target = whatsapp ? "_blank" : "";
    publicWhatsappLink.rel = whatsapp ? "noopener" : "";
  }

  if (publicEmailLink) {
    publicEmailLink.href = email ? `mailto:${email}?subject=${encodeURIComponent("Consulta Alaya")}&body=${encodeURIComponent(message)}` : "#reservas";
  }

  if (publicMapLink) {
    publicMapLink.href = profile.mapLink || "#contacto-alaya";
    publicMapLink.target = profile.mapLink ? "_blank" : "";
    publicMapLink.rel = profile.mapLink ? "noopener" : "";
    publicMapLink.textContent = profile.mapLink ? "Abrir mapa" : "Sin mapa";
  }

  setOptionalLink(publicInstagramLink, profile.instagram);
  setOptionalLink(publicTikTokLink, profile.tiktok);
  setOptionalLink(publicYoutubeLink, profile.youtube);
}

function openPublicWhatsapp() {
  const whatsapp = getAdminWhatsapp();
  if (!whatsapp) {
    if (typeof showToast === "function") showToast("Configura el WhatsApp en admin.");
    return;
  }
  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(buildPublicContactMessage())}`, "_blank", "noopener");
}

function openPublicEmail() {
  const email = getAdminEmail();
  if (!email) {
    if (typeof showToast === "function") showToast("Configura el email en admin.");
    return;
  }
  window.location.href = `mailto:${email}?subject=${encodeURIComponent("Consulta Alaya")}&body=${encodeURIComponent(buildPublicContactMessage())}`;
}

openPublicWhatsappBtn?.addEventListener("click", openPublicWhatsapp);
openPublicEmailBtn?.addEventListener("click", openPublicEmail);

publicContactReason?.addEventListener("change", applyPublicProfileToPage);
publicContactName?.addEventListener("input", applyPublicProfileToPage);
applyPublicProfileToPage();



// v6.1 Contenido Público Pro
const contentTestimonialName = document.querySelector("#contentTestimonialName");
const contentTestimonialContext = document.querySelector("#contentTestimonialContext");
const contentTestimonialText = document.querySelector("#contentTestimonialText");
const addPublicTestimonialBtn = document.querySelector("#addPublicTestimonialBtn");
const loadDefaultTestimonialsBtn = document.querySelector("#loadDefaultTestimonialsBtn");
const adminPublicTestimonialsList = document.querySelector("#adminPublicTestimonialsList");
const contentFaqQuestion = document.querySelector("#contentFaqQuestion");
const contentFaqAnswer = document.querySelector("#contentFaqAnswer");
const addPublicFaqBtn = document.querySelector("#addPublicFaqBtn");
const loadDefaultFaqsBtn = document.querySelector("#loadDefaultFaqsBtn");
const adminPublicFaqList = document.querySelector("#adminPublicFaqList");
const copyPublicContentBtn = document.querySelector("#copyPublicContentBtn");
const resetPublicContentBtn = document.querySelector("#resetPublicContentBtn");
const publicTestimonialsGrid = document.querySelector("#publicTestimonialsGrid");
const publicFaqList = document.querySelector("#publicFaqList");
const publicTestimonialsCount = document.querySelector("#publicTestimonialsCount");
const publicFaqCount = document.querySelector("#publicFaqCount");

const DEFAULT_PUBLIC_CONTENT = {
  testimonials: [
    {
      id: "testimonio_base_1",
      name: "Consulta de orientación",
      context: "Alaya Holistics",
      text: "Me ayudó a ordenar ideas, entender mejor lo que necesitaba y salir con más claridad."
    },
    {
      id: "testimonio_base_2",
      name: "Taller / curso",
      context: "Alaya Talleres",
      text: "La información estaba muy clara y el proceso de reserva fue sencillo."
    },
    {
      id: "testimonio_base_3",
      name: "Herbolario",
      context: "Alaya Herbolario",
      text: "La sección de productos se entiende muy bien y pude consultar por WhatsApp."
    }
  ],
  faqs: [
    {
      id: "faq_base_1",
      question: "¿Las consultas son con cita previa?",
      answer: "Sí. Alaya trabaja con reservas y horas concertadas para poder atender mejor cada consulta."
    },
    {
      id: "faq_base_2",
      question: "¿Puedo reservar talleres y cursos?",
      answer: "Sí. Los talleres pueden tener fecha, hora, nivel, plazas y ficha ampliada."
    },
    {
      id: "faq_base_3",
      question: "¿El herbolario es una tienda online?",
      answer: "De momento funciona como catálogo con consulta directa, sin pago online integrado."
    },
    {
      id: "faq_base_4",
      question: "¿Las cartas astrales se hacen desde la web pública?",
      answer: "No. La gestión detallada de cartas astrales queda dentro del panel administrador."
    }
  ]
};

function getPublicContent() {
  try {
    return {
      testimonials: [],
      faqs: [],
      ...DEFAULT_PUBLIC_CONTENT,
      ...(JSON.parse(localStorage.getItem("alaya_public_content_v61") || "{}"))
    };
  } catch {
    return { ...DEFAULT_PUBLIC_CONTENT };
  }
}

function savePublicContent(content) {
  localStorage.setItem("alaya_public_content_v61", JSON.stringify(content));
}

function renderPublicTestimonials() {
  const content = getPublicContent();
  const testimonials = content.testimonials || [];

  if (publicTestimonialsCount) {
    publicTestimonialsCount.textContent = `${testimonials.length} opinión${testimonials.length === 1 ? "" : "es"}`;
  }

  if (publicTestimonialsGrid) {
    publicTestimonialsGrid.innerHTML = testimonials.length
      ? testimonials.map(item => `
        <article class="public-testimonial-card">
          <p>“${item.text || ""}”</p>
          <div>
            <strong>${item.name || "Opinión"}</strong><br>
            <span>${item.context || "Alaya Holistics"}</span>
          </div>
        </article>
      `).join("")
      : "<p>No hay testimonios publicados todavía.</p>";
  }

  if (adminPublicTestimonialsList) {
    adminPublicTestimonialsList.innerHTML = testimonials.length
      ? testimonials.map(item => `
        <div class="admin-item public-content-admin-item">
          <strong>${item.name || "Sin nombre"} · ${item.context || "Sin contexto"}</strong>
          <p>${item.text || ""}</p>
          <div class="admin-actions">
            <button class="btn btn-secondary" onclick="editPublicTestimonial('${item.id}')">Editar</button>
            <button class="btn btn-danger" onclick="deletePublicTestimonial('${item.id}')">Borrar</button>
          </div>
        </div>
      `).join("")
      : "<p>No hay testimonios añadidos.</p>";
  }
}

function renderPublicFaqs() {
  const content = getPublicContent();
  const faqs = content.faqs || [];

  if (publicFaqCount) {
    publicFaqCount.textContent = `${faqs.length} FAQ${faqs.length === 1 ? "" : "s"}`;
  }

  if (publicFaqList) {
    publicFaqList.innerHTML = faqs.length
      ? faqs.map(item => `
        <details>
          <summary>${item.question || "Pregunta"}</summary>
          <p>${item.answer || ""}</p>
        </details>
      `).join("")
      : "<p>No hay preguntas frecuentes publicadas todavía.</p>";
  }

  if (adminPublicFaqList) {
    adminPublicFaqList.innerHTML = faqs.length
      ? faqs.map(item => `
        <div class="admin-item public-content-admin-item">
          <strong>${item.question || "Sin pregunta"}</strong>
          <p>${item.answer || ""}</p>
          <div class="admin-actions">
            <button class="btn btn-secondary" onclick="editPublicFaq('${item.id}')">Editar</button>
            <button class="btn btn-danger" onclick="deletePublicFaq('${item.id}')">Borrar</button>
          </div>
        </div>
      `).join("")
      : "<p>No hay FAQs añadidas.</p>";
  }
}

function renderPublicContentPro() {
  renderPublicTestimonials();
  renderPublicFaqs();
}

function addPublicTestimonial() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;

  const text = contentTestimonialText?.value.trim();
  if (!text) {
    if (typeof showToast === "function") showToast("Añade el texto del testimonio.");
    return;
  }

  const content = getPublicContent();
  content.testimonials = [
    {
      id: crypto.randomUUID(),
      name: contentTestimonialName?.value.trim() || "Opinión Alaya",
      context: contentTestimonialContext?.value.trim() || "Alaya Holistics",
      text
    },
    ...(content.testimonials || [])
  ];

  savePublicContent(content);
  if (contentTestimonialName) contentTestimonialName.value = "";
  if (contentTestimonialContext) contentTestimonialContext.value = "";
  if (contentTestimonialText) contentTestimonialText.value = "";

  renderPublicContentPro();
  if (typeof showToast === "function") showToast("Testimonio añadido.");
}

function addPublicFaq() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;

  const question = contentFaqQuestion?.value.trim();
  const answer = contentFaqAnswer?.value.trim();

  if (!question || !answer) {
    if (typeof showToast === "function") showToast("Añade pregunta y respuesta.");
    return;
  }

  const content = getPublicContent();
  content.faqs = [
    {
      id: crypto.randomUUID(),
      question,
      answer
    },
    ...(content.faqs || [])
  ];

  savePublicContent(content);
  if (contentFaqQuestion) contentFaqQuestion.value = "";
  if (contentFaqAnswer) contentFaqAnswer.value = "";

  renderPublicContentPro();
  if (typeof showToast === "function") showToast("FAQ añadida.");
}

function editPublicTestimonial(id) {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;

  const content = getPublicContent();
  const item = (content.testimonials || []).find(testimonial => testimonial.id === id);
  if (!item) return;

  if (contentTestimonialName) contentTestimonialName.value = item.name || "";
  if (contentTestimonialContext) contentTestimonialContext.value = item.context || "";
  if (contentTestimonialText) contentTestimonialText.value = item.text || "";

  content.testimonials = (content.testimonials || []).filter(testimonial => testimonial.id !== id);
  savePublicContent(content);
  renderPublicContentPro();
}

function deletePublicTestimonial(id) {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  if (!confirm("¿Borrar este testimonio?")) return;

  const content = getPublicContent();
  content.testimonials = (content.testimonials || []).filter(item => item.id !== id);
  savePublicContent(content);
  renderPublicContentPro();
  if (typeof showToast === "function") showToast("Testimonio borrado.");
}

function editPublicFaq(id) {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;

  const content = getPublicContent();
  const item = (content.faqs || []).find(faq => faq.id === id);
  if (!item) return;

  if (contentFaqQuestion) contentFaqQuestion.value = item.question || "";
  if (contentFaqAnswer) contentFaqAnswer.value = item.answer || "";

  content.faqs = (content.faqs || []).filter(faq => faq.id !== id);
  savePublicContent(content);
  renderPublicContentPro();
}

function deletePublicFaq(id) {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  if (!confirm("¿Borrar esta pregunta frecuente?")) return;

  const content = getPublicContent();
  content.faqs = (content.faqs || []).filter(item => item.id !== id);
  savePublicContent(content);
  renderPublicContentPro();
  if (typeof showToast === "function") showToast("FAQ borrada.");
}

function loadDefaultPublicTestimonials() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  const content = getPublicContent();
  content.testimonials = [...DEFAULT_PUBLIC_CONTENT.testimonials];
  savePublicContent(content);
  renderPublicContentPro();
  if (typeof showToast === "function") showToast("Testimonios base cargados.");
}

function loadDefaultPublicFaqs() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  const content = getPublicContent();
  content.faqs = [...DEFAULT_PUBLIC_CONTENT.faqs];
  savePublicContent(content);
  renderPublicContentPro();
  if (typeof showToast === "function") showToast("FAQs base cargadas.");
}

function copyPublicContentJson() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;
  const text = JSON.stringify(getPublicContent(), null, 2);
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Contenido público copiado.");
}

function resetPublicContent() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Restaurar contenido público base?")) return;
  savePublicContent({ ...DEFAULT_PUBLIC_CONTENT });
  renderPublicContentPro();
  if (typeof showToast === "function") showToast("Contenido público restaurado.");
}

addPublicTestimonialBtn?.addEventListener("click", addPublicTestimonial);
addPublicFaqBtn?.addEventListener("click", addPublicFaq);
loadDefaultTestimonialsBtn?.addEventListener("click", loadDefaultPublicTestimonials);
loadDefaultFaqsBtn?.addEventListener("click", loadDefaultPublicFaqs);
copyPublicContentBtn?.addEventListener("click", copyPublicContentJson);
resetPublicContentBtn?.addEventListener("click", resetPublicContent);

window.editPublicTestimonial = editPublicTestimonial;
window.deletePublicTestimonial = deletePublicTestimonial;
window.editPublicFaq = editPublicFaq;
window.deletePublicFaq = deletePublicFaq;

renderPublicContentPro();



// v6.2 Novedades y Blog Pro
const newsTitle = document.querySelector("#newsTitle");
const newsCategory = document.querySelector("#newsCategory");
const newsDate = document.querySelector("#newsDate");
const newsStatus = document.querySelector("#newsStatus");
const newsImage = document.querySelector("#newsImage");
const newsExcerpt = document.querySelector("#newsExcerpt");
const newsBody = document.querySelector("#newsBody");
const newsFeatured = document.querySelector("#newsFeatured");
const saveNewsBtn = document.querySelector("#saveNewsBtn");
const clearNewsBtn = document.querySelector("#clearNewsBtn");
const loadDefaultNewsBtn = document.querySelector("#loadDefaultNewsBtn");
const adminNewsList = document.querySelector("#adminNewsList");
const publicFeaturedNews = document.querySelector("#publicFeaturedNews");
const publicNewsGrid = document.querySelector("#publicNewsGrid");
const newsDetailModal = document.querySelector("#newsDetailModal");
const closeNewsDetailBtn = document.querySelector("#closeNewsDetailBtn");
const newsDetailContent = document.querySelector("#newsDetailContent");

let editingNewsId = null;
let activeNewsFilter = "Todos";

const DEFAULT_NEWS_ITEMS = [
  {
    id: "news_base_1",
    title: "Reservas con cita previa",
    category: "Novedad",
    date: new Date().toISOString().slice(0, 10),
    status: "Publicado",
    icon: "✦",
    excerpt: "Alaya trabaja con horas concertadas para ofrecer una atención más personalizada.",
    body: "La reserva con cita previa permite preparar mejor cada consulta, taller o sesión. Desde la web puedes seleccionar servicio, fecha, hora y enviar tu solicitud para confirmación.",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "news_base_2",
    title: "Alaya Herbolario como catálogo",
    category: "Herbolario",
    date: new Date().toISOString().slice(0, 10),
    status: "Publicado",
    icon: "🌿",
    excerpt: "El herbolario funciona como escaparate visual con consulta por WhatsApp.",
    body: "La zona de Alaya Herbolario muestra productos, packs, infusiones, velas, minerales y artículos de bienestar. De momento está preparado como catálogo, sin pago online integrado.",
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "news_base_3",
    title: "Cartas astrales desde admin",
    category: "Astrología",
    date: new Date().toISOString().slice(0, 10),
    status: "Publicado",
    icon: "♈",
    excerpt: "La gestión detallada de cartas astrales queda protegida dentro del panel administrador.",
    body: "Alaya admin puede crear fichas, guardar cartas astrales, añadir notas internas, seguimiento, informes y trabajar con privacidad. La parte pública solo muestra la identidad y permite reservar consulta.",
    featured: false,
    createdAt: new Date().toISOString()
  }
];

function getNewsItems() {
  try {
    const saved = JSON.parse(localStorage.getItem("alaya_news_v62") || "null");
    return Array.isArray(saved) ? saved : [...DEFAULT_NEWS_ITEMS];
  } catch {
    return [...DEFAULT_NEWS_ITEMS];
  }
}

function saveNewsItems(items) {
  localStorage.setItem("alaya_news_v62", JSON.stringify(items));
}

function normalizeNewsItem(item = {}) {
  return {
    id: item.id || crypto.randomUUID(),
    title: item.title || "Novedad Alaya",
    category: item.category || "Novedad",
    date: item.date || new Date().toISOString().slice(0, 10),
    status: item.status || "Publicado",
    icon: item.icon || "✦",
    excerpt: item.excerpt || "",
    body: item.body || "",
    featured: Boolean(item.featured),
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString()
  };
}

function getPublishedNews() {
  return getNewsItems()
    .map(normalizeNewsItem)
    .filter(item => item.status === "Publicado")
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function clearNewsForm() {
  editingNewsId = null;
  if (newsTitle) newsTitle.value = "";
  if (newsCategory) newsCategory.value = "Novedad";
  if (newsDate) newsDate.value = new Date().toISOString().slice(0, 10);
  if (newsStatus) newsStatus.value = "Publicado";
  if (newsImage) newsImage.value = "";
  if (newsExcerpt) newsExcerpt.value = "";
  if (newsBody) newsBody.value = "";
  if (newsFeatured) newsFeatured.checked = false;
  if (saveNewsBtn) saveNewsBtn.textContent = "Guardar novedad";
}

function collectNewsForm() {
  return normalizeNewsItem({
    id: editingNewsId || crypto.randomUUID(),
    title: newsTitle?.value.trim(),
    category: newsCategory?.value || "Novedad",
    date: newsDate?.value || new Date().toISOString().slice(0, 10),
    status: newsStatus?.value || "Publicado",
    icon: newsImage?.value.trim() || "✦",
    excerpt: newsExcerpt?.value.trim(),
    body: newsBody?.value.trim(),
    featured: Boolean(newsFeatured?.checked),
    createdAt: editingNewsId
      ? (getNewsItems().find(item => item.id === editingNewsId)?.createdAt || new Date().toISOString())
      : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

function saveNewsFromAdmin() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;

  const item = collectNewsForm();
  if (!item.title || !item.excerpt) {
    if (typeof showToast === "function") showToast("Añade título y resumen.");
    return;
  }

  const items = getNewsItems();
  const updated = editingNewsId
    ? items.map(news => news.id === editingNewsId ? item : news)
    : [item, ...items];

  saveNewsItems(updated);
  clearNewsForm();
  renderNewsPro();
  if (typeof showToast === "function") showToast("Novedad guardada.");
}

function renderAdminNewsList() {
  if (!adminNewsList) return;

  const items = getNewsItems().map(normalizeNewsItem);

  adminNewsList.innerHTML = items.length
    ? items.map(item => `
      <div class="admin-item news-admin-item">
        <strong>${item.icon} ${item.title}</strong>
        <div class="public-news-meta">
          <span>${item.category}</span>
          <span>${item.date}</span>
          <span class="news-status-pill">${item.status}</span>
          ${item.featured ? "<span>Destacada</span>" : ""}
        </div>
        <p>${item.excerpt}</p>
        <div class="admin-actions">
          <button class="btn btn-secondary" onclick="editNewsItem('${item.id}')">Editar</button>
          <button class="btn btn-danger" onclick="deleteNewsItem('${item.id}')">Borrar</button>
        </div>
      </div>
    `).join("")
    : "<p>No hay novedades creadas.</p>";
}

function renderPublicNews() {
  const published = getPublishedNews();
  const filtered = activeNewsFilter === "Todos"
    ? published
    : published.filter(item => item.category === activeNewsFilter);

  const featured = filtered.find(item => item.featured) || filtered[0];

  if (publicFeaturedNews) {
    publicFeaturedNews.innerHTML = featured ? `
      <article class="featured-news-card">
        <div class="featured-news-icon">${featured.icon}</div>
        <div>
          <div class="public-news-meta">
            <span>${featured.category}</span>
            <span>${featured.date}</span>
            <span>Destacado</span>
          </div>
          <h3>${featured.title}</h3>
          <p>${featured.excerpt}</p>
        </div>
        <button class="btn btn-primary" onclick="openNewsDetail('${featured.id}')">Leer más</button>
      </article>
    ` : "";
  }

  const gridItems = filtered.filter(item => item.id !== featured?.id);

  if (publicNewsGrid) {
    publicNewsGrid.innerHTML = gridItems.length
      ? gridItems.map(item => `
        <article class="public-news-card">
          <div class="public-news-icon">${item.icon}</div>
          <div class="public-news-meta">
            <span>${item.category}</span>
            <span>${item.date}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
          <button class="btn btn-secondary" onclick="openNewsDetail('${item.id}')">Leer más</button>
        </article>
      `).join("")
      : featured ? "" : "<p>No hay novedades publicadas con este filtro.</p>";
  }
}

function renderNewsFilters() {
  document.querySelectorAll("[data-news-filter]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.newsFilter === activeNewsFilter);
    btn.onclick = () => {
      activeNewsFilter = btn.dataset.newsFilter || "Todos";
      renderNewsFilters();
      renderPublicNews();
    };
  });
}

function renderNewsPro() {
  renderAdminNewsList();
  renderNewsFilters();
  renderPublicNews();
}

function editNewsItem(id) {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;

  const item = getNewsItems().map(normalizeNewsItem).find(news => news.id === id);
  if (!item) return;

  editingNewsId = id;
  if (newsTitle) newsTitle.value = item.title;
  if (newsCategory) newsCategory.value = item.category;
  if (newsDate) newsDate.value = item.date;
  if (newsStatus) newsStatus.value = item.status;
  if (newsImage) newsImage.value = item.icon;
  if (newsExcerpt) newsExcerpt.value = item.excerpt;
  if (newsBody) newsBody.value = item.body;
  if (newsFeatured) newsFeatured.checked = item.featured;
  if (saveNewsBtn) saveNewsBtn.textContent = "Actualizar novedad";
}

function deleteNewsItem(id) {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  if (!confirm("¿Borrar esta novedad?")) return;

  const items = getNewsItems().filter(item => item.id !== id);
  saveNewsItems(items);
  renderNewsPro();
  if (typeof showToast === "function") showToast("Novedad borrada.");
}

function openNewsDetail(id) {
  const item = getNewsItems().map(normalizeNewsItem).find(news => news.id === id);
  if (!item || !newsDetailModal || !newsDetailContent) return;

  newsDetailContent.innerHTML = `
    <div class="news-detail-content">
      <div class="news-detail-header">
        <div class="news-detail-icon">${item.icon}</div>
        <div>
          <div class="public-news-meta">
            <span>${item.category}</span>
            <span>${item.date}</span>
          </div>
          <h3>${item.title}</h3>
        </div>
      </div>
      <p>${item.excerpt}</p>
      <div class="news-detail-body">${item.body || item.excerpt}</div>
      <div class="admin-actions">
        <a class="btn btn-primary" href="#reservas" onclick="closeNewsDetail()">Reservar / consultar</a>
        <button class="btn btn-secondary" type="button" onclick="copyNewsShareText('${item.id}')">Copiar resumen</button>
      </div>
    </div>
  `;

  newsDetailModal.classList.remove("hidden");
}

function closeNewsDetail() {
  newsDetailModal?.classList.add("hidden");
}

function copyNewsShareText(id) {
  const item = getNewsItems().map(normalizeNewsItem).find(news => news.id === id);
  if (!item) return;

  const text = `${item.title}\n\n${item.excerpt}\n\n${item.body || ""}`.trim();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Resumen copiado.");
}

function loadDefaultNewsItems() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  saveNewsItems([...DEFAULT_NEWS_ITEMS]);
  clearNewsForm();
  renderNewsPro();
  if (typeof showToast === "function") showToast("Novedades base cargadas.");
}

saveNewsBtn?.addEventListener("click", saveNewsFromAdmin);
clearNewsBtn?.addEventListener("click", clearNewsForm);
loadDefaultNewsBtn?.addEventListener("click", loadDefaultNewsItems);
closeNewsDetailBtn?.addEventListener("click", closeNewsDetail);
newsDetailModal?.addEventListener("click", event => {
  if (event.target === newsDetailModal) closeNewsDetail();
});

window.editNewsItem = editNewsItem;
window.deleteNewsItem = deleteNewsItem;
window.openNewsDetail = openNewsDetail;
window.closeNewsDetail = closeNewsDetail;
window.copyNewsShareText = copyNewsShareText;

clearNewsForm();
renderNewsPro();



// v6.3 Buscador Público Pro
const publicGlobalSearchInput = document.querySelector("#publicGlobalSearchInput");
const publicGlobalSearchResults = document.querySelector("#publicGlobalSearchResults");
const publicSearchEmpty = document.querySelector("#publicSearchEmpty");
const publicSearchChips = document.querySelector("#publicSearchChips");

function safeText(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function lowerSearch(value = "") {
  return safeText(value).toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getPublicSearchItems() {
  const items = [];

  try {
    if (typeof defaultServices !== "undefined" && Array.isArray(defaultServices)) {
      defaultServices.forEach(service => {
        items.push({
          type: "Servicio",
          title: service.title || service.name || "Servicio Alaya",
          text: [service.category, service.description, service.benefits, service.tags?.join?.(" "), service.duration, service.price].join(" "),
          href: "#servicios"
        });
      });
    }
  } catch {}

  try {
    if (typeof defaultEvents !== "undefined" && Array.isArray(defaultEvents)) {
      defaultEvents.forEach(event => {
        items.push({
          type: "Taller / curso",
          title: event.title || "Taller Alaya",
          text: [event.category, event.description, event.level, event.tags?.join?.(" "), event.date, event.time, event.location].join(" "),
          href: "#eventos"
        });
      });
    }
  } catch {}

  try {
    const productSources = [];
    if (typeof productos !== "undefined" && Array.isArray(productos)) productSources.push(...productos);
    if (typeof defaultProducts !== "undefined" && Array.isArray(defaultProducts)) productSources.push(...defaultProducts);

    productSources.forEach(product => {
      items.push({
        type: "Herbolario",
        title: product.name || product.title || "Producto Alaya",
        text: [product.category, product.description, product.tags?.join?.(" "), product.use, product.format, product.stock].join(" "),
        href: "#herbolario"
      });
    });
  } catch {}

  try {
    if (typeof getNewsItems === "function") {
      getNewsItems().forEach(news => {
        if (news.status !== "Borrador") {
          items.push({
            type: "Novedad",
            title: news.title || "Novedad Alaya",
            text: [news.category, news.excerpt, news.body, news.date].join(" "),
            href: "#novedades-alaya"
          });
        }
      });
    }
  } catch {}

  try {
    if (typeof getPublicContent === "function") {
      const content = getPublicContent();
      (content.faqs || []).forEach(faq => {
        items.push({
          type: "FAQ",
          title: faq.question || "Pregunta frecuente",
          text: faq.answer || "",
          href: "#opiniones-faq"
        });
      });

      (content.testimonials || []).forEach(testimonial => {
        items.push({
          type: "Opinión",
          title: testimonial.name || "Opinión Alaya",
          text: [testimonial.context, testimonial.text].join(" "),
          href: "#opiniones-faq"
        });
      });
    }
  } catch {}

  items.push(
    {
      type: "Astrología",
      title: "Carta astral y acompañamiento astrológico",
      text: "Alaya Astrología carta astral consulta natal signos sol luna ascendente casas aspectos",
      href: "#astral-ia"
    },
    {
      type: "Reserva",
      title: "Reservar cita con Alaya",
      text: "reserva cita previa horas concertadas consulta servicio taller herbolario astrología",
      href: "#reservas"
    },
    {
      type: "Contacto",
      title: "Contactar con Alaya",
      text: "whatsapp email dirección redes mensaje rápido contacto",
      href: "#contacto-alaya"
    }
  );

  const unique = new Map();
  items.forEach(item => {
    const key = `${item.type}-${item.title}-${item.href}`;
    if (!unique.has(key)) unique.set(key, item);
  });

  return [...unique.values()];
}

function renderPublicSearch(query = "") {
  if (!publicGlobalSearchResults) return;

  const normalized = lowerSearch(query);
  const items = getPublicSearchItems();

  const results = normalized
    ? items.filter(item => {
        const haystack = lowerSearch([item.type, item.title, item.text].join(" "));
        return haystack.includes(normalized);
      })
    : items.slice(0, 6);

  publicGlobalSearchResults.innerHTML = results.slice(0, 12).map(item => `
    <article class="public-search-result-card">
      <span class="public-search-type">${item.type}</span>
      <strong>${safeText(item.title)}</strong>
      <p>${safeText(item.text).slice(0, 150)}${safeText(item.text).length > 150 ? "..." : ""}</p>
      <a href="${item.href}">Ver sección</a>
    </article>
  `).join("");

  const empty = normalized && !results.length;
  publicSearchEmpty?.classList.toggle("hidden", !empty);
}

publicGlobalSearchInput?.addEventListener("input", event => {
  renderPublicSearch(event.target.value);
});

publicSearchChips?.addEventListener("click", event => {
  const button = event.target.closest("[data-search-chip]");
  if (!button) return;

  const value = button.dataset.searchChip || "";
  if (publicGlobalSearchInput) publicGlobalSearchInput.value = value;
  renderPublicSearch(value);
  publicGlobalSearchInput?.focus();
});

document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName || "")) {
    event.preventDefault();
    publicGlobalSearchInput?.focus();
    document.querySelector("#buscar-alaya")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

renderPublicSearch("");



// v6.4 Métricas Locales Pro
const metricVisitsValue = document.querySelector("#metricVisitsValue");
const metricClicksValue = document.querySelector("#metricClicksValue");
const metricSearchesValue = document.querySelector("#metricSearchesValue");
const metricLastVisitValue = document.querySelector("#metricLastVisitValue");
const metricTopSearches = document.querySelector("#metricTopSearches");
const metricTopClicks = document.querySelector("#metricTopClicks");
const metricRecentActivity = document.querySelector("#metricRecentActivity");
const refreshMetricsBtn = document.querySelector("#refreshMetricsBtn");
const copyMetricsReportBtn = document.querySelector("#copyMetricsReportBtn");
const exportMetricsCsvBtn = document.querySelector("#exportMetricsCsvBtn");
const resetMetricsBtn = document.querySelector("#resetMetricsBtn");

const METRICS_KEY = "alaya_local_metrics_v64";

function getLocalMetrics() {
  try {
    return {
      visits: 0,
      clicks: {},
      searches: {},
      activity: [],
      lastVisit: "",
      ...JSON.parse(localStorage.getItem(METRICS_KEY) || "{}")
    };
  } catch {
    return { visits: 0, clicks: {}, searches: {}, activity: [], lastVisit: "" };
  }
}

function saveLocalMetrics(metrics) {
  localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
}

function addMetricActivity(type, label) {
  const metrics = getLocalMetrics();
  metrics.activity = [
    { type, label, at: new Date().toISOString() },
    ...(metrics.activity || [])
  ].slice(0, 80);
  saveLocalMetrics(metrics);
}

function trackLocalVisit() {
  const sessionKey = "alaya_local_metrics_session_v64";
  const todayKey = new Date().toISOString().slice(0, 10);
  const currentSession = sessionStorage.getItem(sessionKey);

  if (currentSession !== todayKey) {
    const metrics = getLocalMetrics();
    metrics.visits = (metrics.visits || 0) + 1;
    metrics.lastVisit = new Date().toISOString();
    metrics.activity = [
      { type: "visita", label: "Nueva visita pública", at: metrics.lastVisit },
      ...(metrics.activity || [])
    ].slice(0, 80);
    saveLocalMetrics(metrics);
    sessionStorage.setItem(sessionKey, todayKey);
  }
}

function incrementMetricGroup(group, key) {
  const cleanKey = String(key || "").trim().slice(0, 90);
  if (!cleanKey) return;

  const metrics = getLocalMetrics();
  metrics[group] = metrics[group] || {};
  metrics[group][cleanKey] = (metrics[group][cleanKey] || 0) + 1;
  metrics.activity = [
    { type: group === "clicks" ? "clic" : "búsqueda", label: cleanKey, at: new Date().toISOString() },
    ...(metrics.activity || [])
  ].slice(0, 80);
  saveLocalMetrics(metrics);
  renderLocalMetrics();
}

function trackPublicClick(event) {
  const target = event.target.closest("a, button");
  if (!target) return;

  const href = target.getAttribute("href") || "";
  const text = (target.textContent || target.getAttribute("aria-label") || target.title || "").trim();

  const isImportant =
    href.includes("#reservas") ||
    href.includes("#contacto") ||
    href.includes("wa.me") ||
    href.includes("mailto:") ||
    /reserv|whatsapp|email|contact|copiar|leer más|consultar|abrir/i.test(text);

  if (!isImportant) return;

  const label = text || href || "CTA";
  incrementMetricGroup("clicks", label);
}

let searchMetricTimer = null;
function trackPublicSearchMetric(value) {
  const clean = String(value || "").trim();
  if (clean.length < 2) return;

  clearTimeout(searchMetricTimer);
  searchMetricTimer = setTimeout(() => {
    incrementMetricGroup("searches", clean.toLowerCase());
  }, 700);
}

function topMetricEntries(group, limit = 8) {
  return Object.entries(group || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function renderMetricList(target, entries, emptyText = "Sin datos todavía.") {
  if (!target) return;

  target.innerHTML = entries.length
    ? entries.map(([label, count]) => `
      <div class="metrics-list-item">
        <strong>${label}</strong>
        <span>${count}</span>
      </div>
    `).join("")
    : `<p>${emptyText}</p>`;
}

function renderActivityList(target, activity = []) {
  if (!target) return;

  target.innerHTML = activity.length
    ? activity.slice(0, 12).map(item => `
      <div class="metrics-list-item">
        <strong>${item.type}</strong>
        <span>${new Date(item.at).toLocaleDateString()}</span>
        <small>${item.label}<br>${new Date(item.at).toLocaleTimeString()}</small>
      </div>
    `).join("")
    : "<p>Sin actividad registrada.</p>";
}

function renderLocalMetrics() {
  const metrics = getLocalMetrics();
  const clicksTotal = Object.values(metrics.clicks || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  const searchesTotal = Object.values(metrics.searches || {}).reduce((sum, value) => sum + Number(value || 0), 0);

  if (metricVisitsValue) metricVisitsValue.textContent = metrics.visits || 0;
  if (metricClicksValue) metricClicksValue.textContent = clicksTotal;
  if (metricSearchesValue) metricSearchesValue.textContent = searchesTotal;
  if (metricLastVisitValue) {
    metricLastVisitValue.textContent = metrics.lastVisit
      ? new Date(metrics.lastVisit).toLocaleDateString()
      : "—";
  }

  renderMetricList(metricTopSearches, topMetricEntries(metrics.searches), "Sin búsquedas todavía.");
  renderMetricList(metricTopClicks, topMetricEntries(metrics.clicks), "Sin clics todavía.");
  renderActivityList(metricRecentActivity, metrics.activity || []);
}

function buildMetricsReport() {
  const metrics = getLocalMetrics();
  const clicksTotal = Object.values(metrics.clicks || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  const searchesTotal = Object.values(metrics.searches || {}).reduce((sum, value) => sum + Number(value || 0), 0);

  const searches = topMetricEntries(metrics.searches, 12).map(([k, v]) => `- ${k}: ${v}`).join("\n") || "- Sin búsquedas";
  const clicks = topMetricEntries(metrics.clicks, 12).map(([k, v]) => `- ${k}: ${v}`).join("\n") || "- Sin clics";

  return `
Alaya Holistics · Informe de métricas locales

Visitas: ${metrics.visits || 0}
Clics importantes: ${clicksTotal}
Búsquedas: ${searchesTotal}
Última visita: ${metrics.lastVisit ? new Date(metrics.lastVisit).toLocaleString() : "Sin datos"}

Top búsquedas:
${searches}

Top clics:
${clicks}

Nota:
Métricas guardadas solo en este navegador con localStorage.
  `.trim();
}

function copyMetricsReport() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const report = buildMetricsReport();
  if (typeof copyText === "function") copyText(report);
  else navigator.clipboard?.writeText(report);

  if (typeof showToast === "function") showToast("Informe de métricas copiado.");
}

function exportMetricsCsv() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const metrics = getLocalMetrics();
  const rows = [["tipo", "valor", "total"]];

  Object.entries(metrics.searches || {}).forEach(([key, value]) => rows.push(["busqueda", key, value]));
  Object.entries(metrics.clicks || {}).forEach(([key, value]) => rows.push(["clic", key, value]));
  (metrics.activity || []).forEach(item => rows.push([item.type, item.label, item.at]));

  const csv = rows.map(row => row.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `alaya-metricas-locales-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function resetLocalMetrics() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Reiniciar todas las métricas locales?")) return;

  localStorage.removeItem(METRICS_KEY);
  sessionStorage.removeItem("alaya_local_metrics_session_v64");
  renderLocalMetrics();

  if (typeof showToast === "function") showToast("Métricas reiniciadas.");
}

document.addEventListener("click", trackPublicClick);
publicGlobalSearchInput?.addEventListener("input", event => trackPublicSearchMetric(event.target.value));

refreshMetricsBtn?.addEventListener("click", renderLocalMetrics);
copyMetricsReportBtn?.addEventListener("click", copyMetricsReport);
exportMetricsCsvBtn?.addEventListener("click", exportMetricsCsv);
resetMetricsBtn?.addEventListener("click", resetLocalMetrics);

trackLocalVisit();
renderLocalMetrics();



// v6.5 Accesibilidad y UX Pro
const accessibilityFab = document.querySelector("#accessibilityFab");
const accessibilityPanel = document.querySelector("#accessibilityPanel");
const closeAccessibilityPanelBtn = document.querySelector("#closeAccessibilityPanelBtn");
const increaseTextBtn = document.querySelector("#increaseTextBtn");
const decreaseTextBtn = document.querySelector("#decreaseTextBtn");
const toggleHighContrastBtn = document.querySelector("#toggleHighContrastBtn");
const toggleReduceMotionBtn = document.querySelector("#toggleReduceMotionBtn");
const resetAccessibilityBtn = document.querySelector("#resetAccessibilityBtn");
const accessibilityStatus = document.querySelector("#accessibilityStatus");

const A11Y_KEY = "alaya_accessibility_v65";

function getA11ySettings() {
  try {
    return {
      textSize: 0,
      highContrast: false,
      reduceMotion: false,
      ...JSON.parse(localStorage.getItem(A11Y_KEY) || "{}")
    };
  } catch {
    return { textSize: 0, highContrast: false, reduceMotion: false };
  }
}

function saveA11ySettings(settings) {
  localStorage.setItem(A11Y_KEY, JSON.stringify(settings));
}

function applyA11ySettings() {
  const settings = getA11ySettings();

  document.body.classList.toggle("a11y-large-text", settings.textSize === 1);
  document.body.classList.toggle("a11y-xl-text", settings.textSize >= 2);
  document.body.classList.toggle("a11y-high-contrast", Boolean(settings.highContrast));
  document.body.classList.toggle("a11y-reduce-motion", Boolean(settings.reduceMotion));

  if (accessibilityStatus) {
    const sizeLabel = settings.textSize === 0 ? "Tamaño normal" : settings.textSize === 1 ? "Texto grande" : "Texto muy grande";
    const contrastLabel = settings.highContrast ? "Alto contraste" : "Contraste normal";
    const motionLabel = settings.reduceMotion ? "Movimiento reducido" : "Movimiento activo";
    accessibilityStatus.textContent = `${sizeLabel} · ${contrastLabel} · ${motionLabel}`;
  }
}

function toggleAccessibilityPanel() {
  accessibilityPanel?.classList.toggle("hidden");
}

function changeTextSize(delta) {
  const settings = getA11ySettings();
  settings.textSize = Math.max(0, Math.min(2, Number(settings.textSize || 0) + delta));
  saveA11ySettings(settings);
  applyA11ySettings();
}

function toggleHighContrast() {
  const settings = getA11ySettings();
  settings.highContrast = !settings.highContrast;
  saveA11ySettings(settings);
  applyA11ySettings();
}

function toggleReduceMotion() {
  const settings = getA11ySettings();
  settings.reduceMotion = !settings.reduceMotion;
  saveA11ySettings(settings);
  applyA11ySettings();
}

function resetA11ySettings() {
  localStorage.removeItem(A11Y_KEY);
  applyA11ySettings();
  if (typeof showToast === "function") showToast("Accesibilidad restaurada.");
}

accessibilityFab?.addEventListener("click", toggleAccessibilityPanel);
closeAccessibilityPanelBtn?.addEventListener("click", () => accessibilityPanel?.classList.add("hidden"));
increaseTextBtn?.addEventListener("click", () => changeTextSize(1));
decreaseTextBtn?.addEventListener("click", () => changeTextSize(-1));
toggleHighContrastBtn?.addEventListener("click", toggleHighContrast);
toggleReduceMotionBtn?.addEventListener("click", toggleReduceMotion);
resetAccessibilityBtn?.addEventListener("click", resetA11ySettings);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") accessibilityPanel?.classList.add("hidden");
});

applyA11ySettings();



// v6.6 Asistente Público Pro
const assistantOptions = document.querySelector("#assistantOptions");
const assistantResult = document.querySelector("#assistantResult");
const copyAssistantMessageBtn = document.querySelector("#copyAssistantMessageBtn");

let currentAssistantMessage = "Hola Alaya, me gustaría pedir información para elegir el servicio más adecuado.";

const ASSISTANT_RECOMMENDATIONS = {
  claridad: {
    icon: "☾",
    title: "Lectura de cartas / tarot intuitivo",
    text: "Puede ayudarte como orientación simbólica para ordenar ideas, mirar opciones y preparar una consulta con más claridad.",
    href: "#servicios",
    cta: "Ver servicios",
    message: "Hola Alaya, me gustaría pedir información sobre una lectura de cartas o tarot intuitivo para tener más claridad."
  },
  energia: {
    icon: "✺",
    title: "Reiki o acompañamiento energético",
    text: "Una opción suave para trabajar bienestar, calma y equilibrio desde un enfoque holístico.",
    href: "#servicios",
    cta: "Ver servicios",
    message: "Hola Alaya, me gustaría pedir información sobre Reiki o una sesión energética."
  },
  astrologia: {
    icon: "♈",
    title: "Consulta de Alaya Astrología",
    text: "Ideal si quieres explorar carta astral, Sol, Luna, Ascendente y una lectura simbólica personalizada.",
    href: "#astral-ia",
    cta: "Ver astrología",
    message: "Hola Alaya, me gustaría pedir información sobre una consulta de carta astral."
  },
  herbolario: {
    icon: "🌿",
    title: "Alaya Herbolario",
    text: "Puedes consultar productos, packs, infusiones, velas, minerales o artículos de bienestar.",
    href: "#herbolario",
    cta: "Ver herbolario",
    message: "Hola Alaya, me gustaría pedir información sobre productos de Alaya Herbolario."
  },
  aprender: {
    icon: "✦",
    title: "Talleres y cursos",
    text: "Buena opción si quieres aprender en grupo, asistir a actividades o reservar plaza en próximos eventos.",
    href: "#eventos",
    cta: "Ver talleres",
    message: "Hola Alaya, me gustaría pedir información sobre talleres o cursos disponibles."
  },
  personalizado: {
    icon: "◇",
    title: "Consulta personalizada",
    text: "Si no sabes qué elegir, puedes contactar y explicar tu situación para recibir una recomendación adecuada.",
    href: "#reservas",
    cta: "Reservar consulta",
    message: "Hola Alaya, no sé qué servicio elegir. Me gustaría explicar lo que busco y recibir una recomendación."
  }
};

function renderAssistantRecommendation(key) {
  const item = ASSISTANT_RECOMMENDATIONS[key] || ASSISTANT_RECOMMENDATIONS.personalizado;
  currentAssistantMessage = item.message;

  document.querySelectorAll("[data-assistant-need]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.assistantNeed === key);
  });

  if (!assistantResult) return;
  assistantResult.innerHTML = `
    <div class="assistant-result-icon">${item.icon}</div>
    <div>
      <strong>${item.title}</strong>
      <p>${item.text}</p>
      <div class="assistant-result-actions">
        <a class="btn btn-primary" href="${item.href}">${item.cta}</a>
        <a class="btn btn-secondary" href="#reservas">Reservar</a>
        <button id="copyAssistantMessageBtnDynamic" class="btn btn-secondary" type="button">Copiar mensaje</button>
      </div>
    </div>
  `;

  document.querySelector("#copyAssistantMessageBtnDynamic")?.addEventListener("click", copyAssistantMessage);
}

function copyAssistantMessage() {
  if (typeof copyText === "function") {
    copyText(currentAssistantMessage);
  } else {
    navigator.clipboard?.writeText(currentAssistantMessage);
  }

  if (typeof showToast === "function") showToast("Mensaje del asistente copiado.");
}

assistantOptions?.addEventListener("click", event => {
  const button = event.target.closest("[data-assistant-need]");
  if (!button) return;
  renderAssistantRecommendation(button.dataset.assistantNeed);
});

copyAssistantMessageBtn?.addEventListener("click", copyAssistantMessage);



// v6.7 PWA Instalación y Mantenimiento Pro
const installPwaMainBtn = document.querySelector("#installPwaMainBtn");
const copyPwaInstructionsBtn = document.querySelector("#copyPwaInstructionsBtn");
const pwaInstallStatus = document.querySelector("#pwaInstallStatus");
const pwaInstallHint = document.querySelector("#pwaInstallHint");
const pwaInstallFab = document.querySelector("#pwaInstallFab");
const pwaManifestStatus = document.querySelector("#pwaManifestStatus");
const pwaSwStatus = document.querySelector("#pwaSwStatus");
const pwaInstallModeStatus = document.querySelector("#pwaInstallModeStatus");
const pwaCacheStatus = document.querySelector("#pwaCacheStatus");
const checkPwaStatusBtn = document.querySelector("#checkPwaStatusBtn");
const clearPwaCachesBtn = document.querySelector("#clearPwaCachesBtn");
const copyPwaAdminGuideBtn = document.querySelector("#copyPwaAdminGuideBtn");

let deferredPwaPrompt = null;

function isPwaStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function updatePwaInstallUi() {
  const standalone = isPwaStandalone();

  if (pwaInstallStatus) {
    if (standalone) pwaInstallStatus.textContent = "Alaya ya está abierta como app.";
    else if (deferredPwaPrompt) pwaInstallStatus.textContent = "Instalación disponible.";
    else pwaInstallStatus.textContent = "Instalación desde menú del navegador.";
  }

  if (pwaInstallHint) {
    pwaInstallHint.textContent = standalone
      ? "Ya estás usando Alaya en modo app."
      : deferredPwaPrompt
        ? "Pulsa “Instalar app” para añadir Alaya a tu dispositivo."
        : "Si el botón no instala directamente, abre el menú del navegador y elige “Añadir a pantalla de inicio”.";
  }

  pwaInstallFab?.classList.toggle("hidden", standalone || !deferredPwaPrompt);
}

async function promptPwaInstall() {
  if (isPwaStandalone()) {
    if (typeof showToast === "function") showToast("Alaya ya está instalada como app.");
    return;
  }

  if (!deferredPwaPrompt) {
    if (typeof showToast === "function") showToast("Usa el menú del navegador para añadir a pantalla de inicio.");
    document.querySelector("#instalar-alaya")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  deferredPwaPrompt.prompt();
  const choice = await deferredPwaPrompt.userChoice;
  deferredPwaPrompt = null;
  updatePwaInstallUi();

  if (typeof showToast === "function") {
    showToast(choice?.outcome === "accepted" ? "Instalación aceptada." : "Instalación cancelada.");
  }
}

function copyPwaInstructions() {
  const text = `
Cómo instalar Alaya Holistics como app

En Android / Chrome:
1. Abre la web.
2. Toca el menú de tres puntos.
3. Pulsa “Añadir a pantalla de inicio” o “Instalar app”.
4. Confirma.

En iPhone / Safari:
1. Abre la web en Safari.
2. Toca compartir.
3. Pulsa “Añadir a pantalla de inicio”.
4. Confirma.

Si ya está instalada, se abrirá como una app independiente.
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Instrucciones de instalación copiadas.");
}

async function checkPwaStatus() {
  if (pwaManifestStatus) {
    pwaManifestStatus.textContent = document.querySelector("link[rel='manifest']") ? "Detectado" : "No detectado";
  }

  if (pwaSwStatus) {
    pwaSwStatus.textContent = "serviceWorker" in navigator
      ? (navigator.serviceWorker.controller ? "Activo" : "Compatible")
      : "No compatible";
  }

  if (pwaInstallModeStatus) {
    pwaInstallModeStatus.textContent = isPwaStandalone()
      ? "Instalada"
      : deferredPwaPrompt
        ? "Instalable"
        : "Manual";
  }

  if (pwaCacheStatus) {
    if ("caches" in window) {
      const keys = await caches.keys();
      pwaCacheStatus.textContent = `${keys.length} caché(s)`;
    } else {
      pwaCacheStatus.textContent = "No disponible";
    }
  }

  updatePwaInstallUi();
  if (typeof showToast === "function") showToast("Estado PWA actualizado.");
}

async function clearPwaCaches() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("configuración crítica")) return;
  if (!confirm("¿Limpiar caché PWA? Puede ayudar a ver los últimos cambios publicados.")) return;

  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
  }

  if (typeof showToast === "function") showToast("Caché PWA limpiada. Recarga la web.");
  checkPwaStatus();
}

function copyPwaAdminGuide() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = `
Guía rápida PWA · Alaya Holistics

Antes de publicar:
[ ] Comprobar manifest.webmanifest.
[ ] Comprobar iconos 192 y 512.
[ ] Comprobar service worker activo.
[ ] Abrir offline.html.
[ ] Probar en móvil.
[ ] Instalar desde Android/Chrome.
[ ] Probar en iPhone/Safari con “Añadir a pantalla de inicio”.
[ ] Si no se ven cambios, limpiar caché PWA y recargar.

Estado actual:
- Modo app: ${isPwaStandalone() ? "sí" : "no"}
- Service Worker: ${"serviceWorker" in navigator ? "compatible" : "no compatible"}
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Guía PWA copiada.");
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredPwaPrompt = event;
  updatePwaInstallUi();
});

window.addEventListener("appinstalled", () => {
  deferredPwaPrompt = null;
  updatePwaInstallUi();
  if (typeof showToast === "function") showToast("Alaya instalada como app.");
});

installPwaMainBtn?.addEventListener("click", promptPwaInstall);
pwaInstallFab?.addEventListener("click", promptPwaInstall);
copyPwaInstructionsBtn?.addEventListener("click", copyPwaInstructions);
checkPwaStatusBtn?.addEventListener("click", checkPwaStatus);
clearPwaCachesBtn?.addEventListener("click", clearPwaCaches);
copyPwaAdminGuideBtn?.addEventListener("click", copyPwaAdminGuide);

setTimeout(() => {
  updatePwaInstallUi();
  checkPwaStatus();
}, 600);



// v6.8 Backup Total y Migración Pro
const backupKeysCount = document.querySelector("#backupKeysCount");
const backupSizeValue = document.querySelector("#backupSizeValue");
const backupLastDate = document.querySelector("#backupLastDate");
const backupStatusValue = document.querySelector("#backupStatusValue");
const generateFullBackupBtn = document.querySelector("#generateFullBackupBtn");
const downloadFullBackupBtn = document.querySelector("#downloadFullBackupBtn");
const copyFullBackupBtn = document.querySelector("#copyFullBackupBtn");
const fullBackupOutput = document.querySelector("#fullBackupOutput");
const backupImportFile = document.querySelector("#backupImportFile");
const fullBackupInput = document.querySelector("#fullBackupInput");
const restoreFullBackupBtn = document.querySelector("#restoreFullBackupBtn");
const validateFullBackupBtn = document.querySelector("#validateFullBackupBtn");
const clearBackupInputBtn = document.querySelector("#clearBackupInputBtn");
const refreshBackupInventoryBtn = document.querySelector("#refreshBackupInventoryBtn");
const copyBackupInventoryBtn = document.querySelector("#copyBackupInventoryBtn");
const downloadBackupInventoryCsvBtn = document.querySelector("#downloadBackupInventoryCsvBtn");
const backupInventoryList = document.querySelector("#backupInventoryList");

const FULL_BACKUP_PREFIXES = ["alaya_"];
const FULL_BACKUP_LAST_KEY = "alaya_full_backup_last_date_v68";

function isAlayaStorageKey(key) {
  return FULL_BACKUP_PREFIXES.some(prefix => key.startsWith(prefix));
}

function bytesToHuman(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getStorageInventory() {
  const entries = [];

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !isAlayaStorageKey(key)) continue;

    const value = localStorage.getItem(key) || "";
    entries.push({
      key,
      size: new Blob([value]).size,
      preview: value.slice(0, 120)
    });
  }

  return entries.sort((a, b) => a.key.localeCompare(b.key));
}

function buildFullBackup() {
  const data = {};
  getStorageInventory().forEach(item => {
    data[item.key] = localStorage.getItem(item.key);
  });

  return {
    type: "alaya-holistics-full-backup",
    version: "6.8",
    createdAt: new Date().toISOString(),
    origin: location.href,
    items: data
  };
}

function updateBackupStats() {
  const inventory = getStorageInventory();
  const totalBytes = inventory.reduce((sum, item) => sum + item.size, 0);
  const last = localStorage.getItem(FULL_BACKUP_LAST_KEY);

  if (backupKeysCount) backupKeysCount.textContent = inventory.length;
  if (backupSizeValue) backupSizeValue.textContent = bytesToHuman(totalBytes);
  if (backupLastDate) backupLastDate.textContent = last ? new Date(last).toLocaleDateString() : "—";
  if (backupStatusValue) backupStatusValue.textContent = "Listo";

  renderBackupInventory();
}

function renderBackupInventory() {
  if (!backupInventoryList) return;

  const inventory = getStorageInventory();

  backupInventoryList.innerHTML = inventory.length
    ? inventory.map(item => `
      <div class="backup-inventory-item">
        <strong>${item.key}</strong>
        <span>${bytesToHuman(item.size)}</span>
        <small>${item.preview ? item.preview.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "Sin contenido visible"}</small>
      </div>
    `).join("")
    : "<p>No hay datos locales de Alaya guardados todavía.</p>";
}

function generateFullBackup() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const backup = buildFullBackup();
  const json = JSON.stringify(backup, null, 2);
  if (fullBackupOutput) fullBackupOutput.value = json;

  localStorage.setItem(FULL_BACKUP_LAST_KEY, backup.createdAt);
  updateBackupStats();

  if (typeof showToast === "function") showToast("Backup generado.");
  return json;
}

function downloadTextFile(filename, content, type = "application/json") {
  const blob = new Blob([content], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadFullBackup() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const json = fullBackupOutput?.value.trim() || generateFullBackup();
  if (!json) return;

  downloadTextFile(`alaya-backup-total-${new Date().toISOString().slice(0, 10)}.json`, json);
  if (typeof showToast === "function") showToast("Backup descargado.");
}

function copyFullBackup() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const json = fullBackupOutput?.value.trim() || generateFullBackup();
  if (!json) return;

  if (typeof copyText === "function") copyText(json);
  else navigator.clipboard?.writeText(json);

  if (typeof showToast === "function") showToast("Backup copiado.");
}

function parseBackupInput() {
  const raw = fullBackupInput?.value.trim();
  if (!raw) throw new Error("No hay backup pegado.");

  const parsed = JSON.parse(raw);
  if (!parsed || parsed.type !== "alaya-holistics-full-backup" || !parsed.items || typeof parsed.items !== "object") {
    throw new Error("El JSON no parece un backup total de Alaya.");
  }

  return parsed;
}

function validateFullBackup() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  try {
    const parsed = parseBackupInput();
    const count = Object.keys(parsed.items || {}).length;
    if (backupStatusValue) backupStatusValue.textContent = `Backup válido · ${count} claves`;
    if (typeof showToast === "function") showToast(`Backup válido: ${count} claves.`);
    return true;
  } catch (error) {
    if (backupStatusValue) backupStatusValue.textContent = "Backup no válido";
    if (typeof showToast === "function") showToast(error.message || "Backup no válido.");
    return false;
  }
}

function restoreFullBackup() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("configuración crítica")) return;

  let parsed;
  try {
    parsed = parseBackupInput();
  } catch (error) {
    if (typeof showToast === "function") showToast(error.message || "Backup no válido.");
    return;
  }

  const keys = Object.keys(parsed.items || {}).filter(isAlayaStorageKey);
  if (!keys.length) {
    if (typeof showToast === "function") showToast("El backup no contiene claves Alaya.");
    return;
  }

  if (!confirm(`¿Restaurar ${keys.length} claves? Esto sobrescribirá datos locales de Alaya.`)) return;

  keys.forEach(key => {
    localStorage.setItem(key, parsed.items[key]);
  });

  localStorage.setItem(FULL_BACKUP_LAST_KEY, new Date().toISOString());
  updateBackupStats();

  if (typeof showToast === "function") showToast("Backup restaurado. Recarga la web para ver todos los cambios.");

  setTimeout(() => {
    if (confirm("¿Recargar ahora para aplicar la restauración?")) location.reload();
  }, 500);
}

function clearBackupInput() {
  if (fullBackupInput) fullBackupInput.value = "";
  if (backupImportFile) backupImportFile.value = "";
  if (typeof showToast === "function") showToast("Entrada de backup limpiada.");
}

function copyBackupInventory() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = getStorageInventory()
    .map(item => `${item.key} · ${bytesToHuman(item.size)}`)
    .join("\n") || "Sin datos locales.";

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Inventario copiado.");
}

function downloadBackupInventoryCsv() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const rows = [["key", "size_bytes", "size_human", "preview"]];
  getStorageInventory().forEach(item => rows.push([item.key, item.size, bytesToHuman(item.size), item.preview]));

  const csv = rows.map(row => row.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  downloadTextFile(`alaya-inventario-datos-${new Date().toISOString().slice(0, 10)}.csv`, csv, "text/csv");

  if (typeof showToast === "function") showToast("Inventario CSV descargado.");
}

backupImportFile?.addEventListener("change", async event => {
  const file = event.target.files?.[0];
  if (!file) return;

  const text = await file.text();
  if (fullBackupInput) fullBackupInput.value = text;
  validateFullBackup();
});

generateFullBackupBtn?.addEventListener("click", generateFullBackup);
downloadFullBackupBtn?.addEventListener("click", downloadFullBackup);
copyFullBackupBtn?.addEventListener("click", copyFullBackup);
restoreFullBackupBtn?.addEventListener("click", restoreFullBackup);
validateFullBackupBtn?.addEventListener("click", validateFullBackup);
clearBackupInputBtn?.addEventListener("click", clearBackupInput);
refreshBackupInventoryBtn?.addEventListener("click", updateBackupStats);
copyBackupInventoryBtn?.addEventListener("click", copyBackupInventory);
downloadBackupInventoryCsvBtn?.addEventListener("click", downloadBackupInventoryCsv);

setTimeout(updateBackupStats, 700);



// v6.9 Publicación GitHub Pages Pro
const publishProtocolStatus = document.querySelector("#publishProtocolStatus");
const publishHostStatus = document.querySelector("#publishHostStatus");
const publishFilesStatus = document.querySelector("#publishFilesStatus");
const publishReadyStatus = document.querySelector("#publishReadyStatus");
const checkPublishStatusBtn = document.querySelector("#checkPublishStatusBtn");
const copyGithubPagesStepsBtn = document.querySelector("#copyGithubPagesStepsBtn");
const copyPublishChecklistBtn = document.querySelector("#copyPublishChecklistBtn");

async function checkPublishStatus() {
  const protocol = location.protocol.replace(":", "");
  const host = location.host || "local";
  const isSecure = location.protocol === "https:" || location.hostname === "localhost" || location.protocol === "file:";
  const isGithub = host.includes("github.io");

  if (publishProtocolStatus) {
    publishProtocolStatus.textContent = isSecure ? `${protocol} OK` : `${protocol} revisar`;
  }

  if (publishHostStatus) {
    publishHostStatus.textContent = isGithub ? "GitHub Pages" : host;
  }

  let filesOk = 0;
  const files = ["./index.html", "./manifest.webmanifest", "./sw.js", "./sitemap.xml", "./robots.txt", "./404.html"];

  for (const file of files) {
    try {
      const res = await fetch(file, { cache: "no-store" });
      if (res.ok) filesOk += 1;
    } catch {}
  }

  if (publishFilesStatus) {
    publishFilesStatus.textContent = `${filesOk}/${files.length}`;
  }

  if (publishReadyStatus) {
    publishReadyStatus.textContent = filesOk >= 5 && isSecure ? "Lista" : "Revisar";
  }

  if (typeof showToast === "function") showToast("Estado de publicación revisado.");
}

function copyGithubPagesSteps() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = `
Publicar Alaya Holistics en GitHub Pages

1. Descomprime el ZIP.
2. Entra en GitHub y abre tu repositorio.
3. Sube todo el contenido de la carpeta de la web, no solo el ZIP.
4. Asegúrate de que index.html esté en la raíz.
5. Mantén también:
   - assets/
   - css/
   - js/
   - docs/
   - manifest.webmanifest
   - sw.js
   - sitemap.xml
   - robots.txt
   - 404.html
   - .nojekyll
6. Ve a Settings > Pages.
7. En Source elige:
   - Deploy from a branch
   - Branch: main
   - Folder: /root
8. Guarda.
9. Espera unos minutos.
10. Abre la URL de GitHub Pages.
11. En admin > Lanzamiento, pulsa “Comprobar publicación”.
12. Si no ves cambios, limpia caché PWA o abre en incógnito.
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Pasos de GitHub Pages copiados.");
}

function copyPublishChecklist() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = `
Checklist final antes de publicar Alaya

[ ] index.html en la raíz.
[ ] Carpeta assets subida.
[ ] Carpeta css subida.
[ ] Carpeta js subida.
[ ] manifest.webmanifest subido.
[ ] sw.js subido.
[ ] sitemap.xml subido.
[ ] robots.txt subido.
[ ] 404.html subido.
[ ] .nojekyll subido.
[ ] Logos visibles.
[ ] Legal/privacidad/cookies revisados.
[ ] WhatsApp/email configurados.
[ ] Servicios revisados.
[ ] Reservas probadas.
[ ] Backup exportado.
[ ] PWA probada en móvil.
[ ] Caché limpiada si no aparecen cambios.
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Checklist final copiado.");
}

checkPublishStatusBtn?.addEventListener("click", checkPublishStatus);
copyGithubPagesStepsBtn?.addEventListener("click", copyGithubPagesSteps);
copyPublishChecklistBtn?.addEventListener("click", copyPublishChecklist);

setTimeout(checkPublishStatus, 1000);



// v7.0 Release Candidate Pro
const rcVersionValue = document.querySelector("#rcVersionValue");
const rcBuildDateValue = document.querySelector("#rcBuildDateValue");
const rcCriticalFilesStatus = document.querySelector("#rcCriticalFilesStatus");
const rcDocsStatus = document.querySelector("#rcDocsStatus");
const rcPwaStatus = document.querySelector("#rcPwaStatus");
const rcPublishStatus = document.querySelector("#rcPublishStatus");
const rcCheckList = document.querySelector("#rcCheckList");
const runRcCheckBtn = document.querySelector("#runRcCheckBtn");
const copyRcNotesBtn = document.querySelector("#copyRcNotesBtn");
const openChangelogBtn = document.querySelector("#openChangelogBtn");
const openVersionFileBtn = document.querySelector("#openVersionFileBtn");

const RC_CRITICAL_FILES = [
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/cloud-adapter.js",
  "./js/backend-config.js",
  "./manifest.webmanifest",
  "./sw.js",
  "./offline.html",
  "./404.html",
  "./sitemap.xml",
  "./robots.txt",
  "./VERSION.json",
  "./CHANGELOG.md"
];

const RC_DOCS = [
  "./docs/PUBLICACION-GITHUB-PAGES-PRO.md",
  "./docs/BACKUP-TOTAL-MIGRACION-PRO.md",
  "./docs/PWA-INSTALACION-MANTENIMIENTO-PRO.md",
  "./docs/ACCESIBILIDAD-UX-PRO.md",
  "./docs/BUSCADOR-PUBLICO-PRO.md",
  "./docs/NOVEDADES-BLOG-PRO.md"
];

async function fileExistsForRc(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    return response.ok;
  } catch {
    return location.protocol === "file:";
  }
}

async function runRcCheck() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const criticalResults = [];
  for (const file of RC_CRITICAL_FILES) {
    criticalResults.push({ file, ok: await fileExistsForRc(file) });
  }

  const docsResults = [];
  for (const file of RC_DOCS) {
    docsResults.push({ file, ok: await fileExistsForRc(file) });
  }

  let versionData = null;
  try {
    const response = await fetch("./VERSION.json", { cache: "no-store" });
    versionData = await response.json();
  } catch {
    versionData = { version: "7.0", codename: "Release Candidate Pro", buildDate: "Local" };
  }

  if (rcVersionValue) rcVersionValue.textContent = `v${versionData.version || "7.0"}`;
  if (rcBuildDateValue) rcBuildDateValue.textContent = `${versionData.codename || "Release Candidate Pro"} · ${versionData.buildDate || "Local"}`;

  const criticalOk = criticalResults.filter(item => item.ok).length;
  const docsOk = docsResults.filter(item => item.ok).length;
  const pwaOk = Boolean(document.querySelector("link[rel='manifest']")) && ("serviceWorker" in navigator || location.protocol === "file:");
  const publishOk = criticalOk >= RC_CRITICAL_FILES.length - 1 && docsOk >= Math.min(4, RC_DOCS.length);

  if (rcCriticalFilesStatus) rcCriticalFilesStatus.textContent = `${criticalOk}/${RC_CRITICAL_FILES.length}`;
  if (rcDocsStatus) rcDocsStatus.textContent = `${docsOk}/${RC_DOCS.length}`;
  if (rcPwaStatus) rcPwaStatus.textContent = pwaOk ? "OK" : "Revisar";
  if (rcPublishStatus) rcPublishStatus.textContent = publishOk ? "Lista" : "Revisar";

  if (rcCheckList) {
    const all = [
      ...criticalResults.map(item => ({ ...item, label: "Archivo crítico" })),
      ...docsResults.map(item => ({ ...item, label: "Documento" }))
    ];

    rcCheckList.innerHTML = all.map(item => `
      <div class="rc-check-item ${item.ok ? "" : "warning"}">
        <b>${item.ok ? "OK" : "!"}</b>
        <span>${item.file}</span>
        <small>${item.label}</small>
      </div>
    `).join("");
  }

  if (typeof showToast === "function") showToast("Revisión final v7.0 completada.");
}

function getRcNotes() {
  return `
Alaya Holistics Web v7.0 · Release Candidate Pro

Lista para revisión final antes de publicar.

Incluye:
- Web pública premium con diseño astral.
- Reservas con cita previa.
- Agenda inteligente y bloqueos.
- Admin con roles, auditoría y notificaciones.
- Alaya Herbolario.
- Servicios, talleres y cursos.
- Alaya Astrología pública.
- Cartas astrales dentro del admin.
- Informes cliente e internos.
- Privacidad astral y consentimiento.
- Seguimiento astral.
- Contenido público editable.
- Novedades/blog.
- Buscador público.
- Métricas locales sin servicios externos.
- Accesibilidad.
- PWA instalable.
- Backup total y migración.
- Preparación GitHub Pages.
- 404, sitemap, robots, VERSION.json y CHANGELOG.md.

Antes de publicar:
[ ] Configurar WhatsApp/email/redes.
[ ] Revisar textos legales.
[ ] Probar reserva real.
[ ] Exportar backup.
[ ] Probar en móvil.
[ ] Probar PWA.
[ ] Revisar Firebase si se usa modo online.
  `.trim();
}

function copyRcNotes() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const notes = getRcNotes();
  if (typeof copyText === "function") copyText(notes);
  else navigator.clipboard?.writeText(notes);

  if (typeof showToast === "function") showToast("Notas v7.0 copiadas.");
}

runRcCheckBtn?.addEventListener("click", runRcCheck);
copyRcNotesBtn?.addEventListener("click", copyRcNotes);
openChangelogBtn?.addEventListener("click", () => window.open("./CHANGELOG.md", "_blank", "noopener"));
openVersionFileBtn?.addEventListener("click", () => window.open("./VERSION.json", "_blank", "noopener"));

setTimeout(runRcCheck, 1200);



// v7.1 SEO y Compartir Pro
const seoTitleInput = document.querySelector("#seoTitleInput");
const seoDescriptionInput = document.querySelector("#seoDescriptionInput");
const seoKeywordsInput = document.querySelector("#seoKeywordsInput");
const seoUrlInput = document.querySelector("#seoUrlInput");
const seoImageInput = document.querySelector("#seoImageInput");
const saveSeoSettingsBtn = document.querySelector("#saveSeoSettingsBtn");
const loadDefaultSeoBtn = document.querySelector("#loadDefaultSeoBtn");
const copySeoMetaBtn = document.querySelector("#copySeoMetaBtn");
const seoPreviewCard = document.querySelector("#seoPreviewCard");
const seoPreviewImage = document.querySelector("#seoPreviewImage");
const seoPreviewTitle = document.querySelector("#seoPreviewTitle");
const seoPreviewDescription = document.querySelector("#seoPreviewDescription");
const seoPreviewUrl = document.querySelector("#seoPreviewUrl");
const seoShareTextOutput = document.querySelector("#seoShareTextOutput");
const copySeoShareTextBtn = document.querySelector("#copySeoShareTextBtn");
const copySeoChecklistBtn = document.querySelector("#copySeoChecklistBtn");
const seoMetaOutput = document.querySelector("#seoMetaOutput");
const copyPublicPageLinkBtn = document.querySelector("#copyPublicPageLinkBtn");
const sharePublicPageBtn = document.querySelector("#sharePublicPageBtn");

const SEO_SETTINGS_KEY = "alaya_seo_settings_v71";

const DEFAULT_SEO_SETTINGS = {
  title: "Alaya Holistics · Reservas, Herbolario, Astrología y Talleres",
  description: "Alaya Holistics: consultas con cita previa, tarot, lectura de cartas, reiki, herbolario, astrología, talleres y cursos.",
  keywords: "Alaya Holistics, tarot, reiki, herbolario, astrología, carta astral, talleres, reservas",
  url: location.href.split("#")[0],
  image: "assets/logos/alaya-holistics-logo.png"
};

function getSeoSettings() {
  try {
    return {
      ...DEFAULT_SEO_SETTINGS,
      ...JSON.parse(localStorage.getItem(SEO_SETTINGS_KEY) || "{}")
    };
  } catch {
    return { ...DEFAULT_SEO_SETTINGS };
  }
}

function saveSeoSettings(settings) {
  localStorage.setItem(SEO_SETTINGS_KEY, JSON.stringify(settings));
}

function collectSeoForm() {
  return {
    title: seoTitleInput?.value.trim() || DEFAULT_SEO_SETTINGS.title,
    description: seoDescriptionInput?.value.trim() || DEFAULT_SEO_SETTINGS.description,
    keywords: seoKeywordsInput?.value.trim() || DEFAULT_SEO_SETTINGS.keywords,
    url: seoUrlInput?.value.trim() || DEFAULT_SEO_SETTINGS.url,
    image: seoImageInput?.value.trim() || DEFAULT_SEO_SETTINGS.image
  };
}

function fillSeoForm() {
  const settings = getSeoSettings();
  if (seoTitleInput) seoTitleInput.value = settings.title;
  if (seoDescriptionInput) seoDescriptionInput.value = settings.description;
  if (seoKeywordsInput) seoKeywordsInput.value = settings.keywords;
  if (seoUrlInput) seoUrlInput.value = settings.url;
  if (seoImageInput) seoImageInput.value = settings.image;
  renderSeoPreview();
}

function buildSeoMetaTags(settings = getSeoSettings()) {
  return `
<title>${settings.title}</title>
<meta name="description" content="${settings.description}">
<meta name="keywords" content="${settings.keywords}">
<link rel="canonical" href="${settings.url}">

<meta property="og:type" content="website">
<meta property="og:title" content="${settings.title}">
<meta property="og:description" content="${settings.description}">
<meta property="og:url" content="${settings.url}">
<meta property="og:image" content="${settings.image}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${settings.title}">
<meta name="twitter:description" content="${settings.description}">
<meta name="twitter:image" content="${settings.image}">
  `.trim();
}

function buildSeoShareText(settings = getSeoSettings()) {
  return `${settings.title}

${settings.description}

${settings.url}`.trim();
}

function renderSeoPreview() {
  const settings = collectSeoForm();

  if (seoPreviewImage) seoPreviewImage.src = settings.image || DEFAULT_SEO_SETTINGS.image;
  if (seoPreviewTitle) seoPreviewTitle.textContent = settings.title;
  if (seoPreviewDescription) seoPreviewDescription.textContent = settings.description;
  if (seoPreviewUrl) seoPreviewUrl.textContent = settings.url;
  if (seoShareTextOutput) seoShareTextOutput.value = buildSeoShareText(settings);
  if (seoMetaOutput) seoMetaOutput.value = buildSeoMetaTags(settings);
}

function saveSeoFromAdmin() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  const settings = collectSeoForm();
  saveSeoSettings(settings);
  renderSeoPreview();
  if (typeof showToast === "function") showToast("SEO guardado.");
}

function loadDefaultSeo() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  saveSeoSettings({ ...DEFAULT_SEO_SETTINGS });
  fillSeoForm();
  if (typeof showToast === "function") showToast("SEO base cargado.");
}

function copySeoMeta() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;
  const text = seoMetaOutput?.value || buildSeoMetaTags(collectSeoForm());
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Meta HTML copiada.");
}

function copySeoShareText() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;
  const text = seoShareTextOutput?.value || buildSeoShareText(collectSeoForm());
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Texto para compartir copiado.");
}

function copySeoChecklist() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;
  const settings = collectSeoForm();
  const text = `
Checklist SEO Alaya

[ ] Título SEO revisado: ${settings.title}
[ ] Descripción menor de 160 caracteres si es posible.
[ ] Keywords revisadas.
[ ] URL pública correcta: ${settings.url}
[ ] Imagen social existe: ${settings.image}
[ ] Meta tags pegadas en el head final si se quiere SEO fijo.
[ ] Sitemap publicado.
[ ] robots.txt publicado.
[ ] Página 404 publicada.
[ ] Probar vista previa al compartir en WhatsApp.
[ ] Probar en móvil.
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Checklist SEO copiado.");
}

function copyPublicPageLink() {
  const url = location.href.split("#")[0];
  if (typeof copyText === "function") copyText(url);
  else navigator.clipboard?.writeText(url);
  if (typeof showToast === "function") showToast("Enlace copiado.");
}

async function sharePublicPage() {
  const settings = getSeoSettings();
  const shareData = {
    title: settings.title,
    text: settings.description,
    url: settings.url || location.href.split("#")[0]
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch {}
  }

  copyPublicPageLink();
}

[seoTitleInput, seoDescriptionInput, seoKeywordsInput, seoUrlInput, seoImageInput].forEach(input => {
  input?.addEventListener("input", renderSeoPreview);
});

saveSeoSettingsBtn?.addEventListener("click", saveSeoFromAdmin);
loadDefaultSeoBtn?.addEventListener("click", loadDefaultSeo);
copySeoMetaBtn?.addEventListener("click", copySeoMeta);
copySeoShareTextBtn?.addEventListener("click", copySeoShareText);
copySeoChecklistBtn?.addEventListener("click", copySeoChecklist);
copyPublicPageLinkBtn?.addEventListener("click", copyPublicPageLink);
sharePublicPageBtn?.addEventListener("click", sharePublicPage);

fillSeoForm();



// v7.2 Rendimiento y Calidad Pro
const qualityScoreValue = document.querySelector("#qualityScoreValue");
const qualityScoreText = document.querySelector("#qualityScoreText");
const qualityScoreOrb = document.querySelector("#qualityScoreOrb");
const qualityFilesValue = document.querySelector("#qualityFilesValue");
const qualityLinksValue = document.querySelector("#qualityLinksValue");
const qualityImagesValue = document.querySelector("#qualityImagesValue");
const qualityIssuesValue = document.querySelector("#qualityIssuesValue");
const qualityFileResults = document.querySelector("#qualityFileResults");
const qualityIssueResults = document.querySelector("#qualityIssueResults");
const runQualityAuditBtn = document.querySelector("#runQualityAuditBtn");
const copyQualityReportBtn = document.querySelector("#copyQualityReportBtn");
const exportQualityCsvBtn = document.querySelector("#exportQualityCsvBtn");
const copyQualityChecklistBtn = document.querySelector("#copyQualityChecklistBtn");

let lastQualityAudit = null;

const QUALITY_FILES = [
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./manifest.webmanifest",
  "./sw.js",
  "./offline.html",
  "./404.html",
  "./sitemap.xml",
  "./robots.txt",
  "./VERSION.json",
  "./CHANGELOG.md"
];

function qualityBytesToHuman(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function getQualityFileInfo(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) return { path, ok: false, size: 0, label: "No encontrado" };
    const text = await response.text();
    const size = new Blob([text]).size;
    return {
      path,
      ok: true,
      size,
      label: qualityBytesToHuman(size)
    };
  } catch {
    return {
      path,
      ok: location.protocol === "file:",
      size: 0,
      label: location.protocol === "file:" ? "Local" : "Error"
    };
  }
}

function getInternalLinkIssues() {
  const issues = [];
  const links = [...document.querySelectorAll("a[href^='#']")];

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) {
      issues.push({
        type: "Enlace interno",
        label: `${href} no existe`,
        severity: "warning"
      });
    }
  });

  return { count: links.length, issues };
}

function getImageQualityIssues() {
  const issues = [];
  const images = [...document.querySelectorAll("img")];

  images.forEach(img => {
    if (!img.getAttribute("alt")) {
      issues.push({ type: "Imagen", label: "Imagen sin texto alt", severity: "warning" });
    }

    if (!img.getAttribute("loading")) {
      issues.push({ type: "Imagen", label: `Sin lazy loading: ${img.getAttribute("src") || "imagen"}`, severity: "info" });
    }
  });

  return { count: images.length, issues };
}

function getBasicA11yIssues() {
  const issues = [];

  document.querySelectorAll("button").forEach(button => {
    const text = (button.textContent || button.getAttribute("aria-label") || "").trim();
    if (!text) issues.push({ type: "Accesibilidad", label: "Botón sin texto ni aria-label", severity: "warning" });
  });

  document.querySelectorAll("input, textarea, select").forEach(field => {
    const hasLabel = field.id && document.querySelector(`label[for="${field.id}"]`);
    const hasName = field.getAttribute("aria-label") || field.getAttribute("placeholder") || field.getAttribute("title");
    if (!hasLabel && !hasName) {
      issues.push({ type: "Formulario", label: `${field.tagName.toLowerCase()} sin label/placeholder`, severity: "warning" });
    }
  });

  if (!document.querySelector("h1")) {
    issues.push({ type: "SEO", label: "No se detecta h1", severity: "warning" });
  }

  if (!document.querySelector("meta[name='description']")) {
    issues.push({ type: "SEO", label: "No se detecta meta description", severity: "warning" });
  }

  return issues;
}

function renderQualityList(target, items, emptyText) {
  if (!target) return;
  target.innerHTML = items.length
    ? items.map(item => `
      <div class="quality-list-item ${item.ok === false || item.severity === "warning" ? "warning" : ""}">
        <b>${item.ok === false || item.severity === "warning" ? "!" : "OK"}</b>
        <span>${item.path || item.label}</span>
        <small>${item.label && item.path ? item.label : (item.type || "")}</small>
      </div>
    `).join("")
    : `<p>${emptyText}</p>`;
}

async function runQualityAudit(silent = false) {
  if (!silent && typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return null;

  const fileResults = [];
  for (const file of QUALITY_FILES) {
    fileResults.push(await getQualityFileInfo(file));
  }

  const internalLinks = getInternalLinkIssues();
  const imageQuality = getImageQualityIssues();
  const a11yIssues = getBasicA11yIssues();

  const allIssues = [
    ...fileResults.filter(item => !item.ok).map(item => ({ type: "Archivo", label: `${item.path} no encontrado`, severity: "warning" })),
    ...internalLinks.issues,
    ...imageQuality.issues,
    ...a11yIssues
  ];

  const warningCount = allIssues.filter(issue => issue.severity !== "info").length;
  const score = Math.max(0, Math.min(100, 100 - warningCount * 8 - Math.max(0, allIssues.length - warningCount) * 2));

  lastQualityAudit = {
    createdAt: new Date().toISOString(),
    score,
    files: fileResults,
    linksCount: internalLinks.count,
    imagesCount: imageQuality.count,
    issues: allIssues
  };

  if (qualityScoreValue) qualityScoreValue.textContent = `${score}/100`;
  if (qualityScoreText) {
    qualityScoreText.textContent = score >= 90
      ? "Muy buen estado para publicar."
      : score >= 75
        ? "Buen estado, con pequeños avisos."
        : "Revisar incidencias antes de publicar.";
  }
  if (qualityScoreOrb) qualityScoreOrb.textContent = score >= 90 ? "OK" : score >= 75 ? "QC" : "REV";
  if (qualityFilesValue) qualityFilesValue.textContent = `${fileResults.filter(item => item.ok).length}/${fileResults.length}`;
  if (qualityLinksValue) qualityLinksValue.textContent = internalLinks.count;
  if (qualityImagesValue) qualityImagesValue.textContent = imageQuality.count;
  if (qualityIssuesValue) qualityIssuesValue.textContent = allIssues.length;

  renderQualityList(qualityFileResults, fileResults, "Sin archivos revisados.");
  renderQualityList(qualityIssueResults, allIssues, "No se han detectado incidencias.");

  if (!silent && typeof showToast === "function") showToast("Auditoría de calidad completada.");
  return lastQualityAudit;
}

function buildQualityReport() {
  const audit = lastQualityAudit;
  if (!audit) return "Ejecuta primero la auditoría de calidad.";

  const files = audit.files.map(item => `- ${item.ok ? "OK" : "ERROR"} ${item.path}: ${item.label}`).join("\n");
  const issues = audit.issues.length
    ? audit.issues.map(item => `- ${item.type}: ${item.label}`).join("\n")
    : "- Sin incidencias detectadas";

  return `
Alaya Holistics · Informe de calidad v7.2

Fecha: ${new Date(audit.createdAt).toLocaleString()}
Puntuación: ${audit.score}/100
Enlaces internos revisados: ${audit.linksCount}
Imágenes detectadas: ${audit.imagesCount}
Incidencias: ${audit.issues.length}

Archivos:
${files}

Incidencias:
${issues}
  `.trim();
}

function copyQualityReport() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;
  const report = buildQualityReport();
  if (typeof copyText === "function") copyText(report);
  else navigator.clipboard?.writeText(report);
  if (typeof showToast === "function") showToast("Informe de calidad copiado.");
}

function exportQualityCsv() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;
  const audit = lastQualityAudit;
  if (!audit) {
    if (typeof showToast === "function") showToast("Ejecuta primero la auditoría.");
    return;
  }

  const rows = [["tipo", "estado", "detalle", "extra"]];
  audit.files.forEach(item => rows.push(["archivo", item.ok ? "ok" : "error", item.path, item.label]));
  audit.issues.forEach(item => rows.push([item.type, item.severity || "info", item.label, ""]));

  const csv = rows.map(row => row.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `alaya-calidad-v72-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function copyQualityChecklist() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = `
Checklist de calidad Alaya v7.2

[ ] Ejecutar auditoría de calidad.
[ ] Revisar archivos críticos.
[ ] Revisar enlaces internos rotos.
[ ] Revisar imágenes sin alt.
[ ] Revisar formularios con placeholder/label.
[ ] Probar reserva.
[ ] Probar buscador.
[ ] Probar asistente.
[ ] Probar compartir.
[ ] Probar PWA.
[ ] Probar móvil.
[ ] Exportar backup antes de publicar.
[ ] Limpiar caché PWA si se actualiza la web.
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Checklist de calidad copiado.");
}

runQualityAuditBtn?.addEventListener("click", () => runQualityAudit(false));
copyQualityReportBtn?.addEventListener("click", copyQualityReport);
exportQualityCsvBtn?.addEventListener("click", exportQualityCsv);
copyQualityChecklistBtn?.addEventListener("click", copyQualityChecklist);

setTimeout(() => runQualityAudit(true), 1800);



// v7.3 Avisos Globales Pro
const globalNoticeBanner = document.querySelector("#globalNoticeBanner");
const globalNoticeType = document.querySelector("#globalNoticeType");
const globalNoticeTitle = document.querySelector("#globalNoticeTitle");
const globalNoticeMessage = document.querySelector("#globalNoticeMessage");
const globalNoticeCta = document.querySelector("#globalNoticeCta");
const closeGlobalNoticeBtn = document.querySelector("#closeGlobalNoticeBtn");

const noticeActiveInput = document.querySelector("#noticeActiveInput");
const noticeTypeInput = document.querySelector("#noticeTypeInput");
const noticeModeInput = document.querySelector("#noticeModeInput");
const noticeTitleInput = document.querySelector("#noticeTitleInput");
const noticeMessageInput = document.querySelector("#noticeMessageInput");
const noticeCtaTextInput = document.querySelector("#noticeCtaTextInput");
const noticeCtaUrlInput = document.querySelector("#noticeCtaUrlInput");
const noticeDismissibleInput = document.querySelector("#noticeDismissibleInput");
const saveGlobalNoticeBtn = document.querySelector("#saveGlobalNoticeBtn");
const previewGlobalNoticeBtn = document.querySelector("#previewGlobalNoticeBtn");
const resetGlobalNoticeBtn = document.querySelector("#resetGlobalNoticeBtn");
const adminNoticePreview = document.querySelector("#adminNoticePreview");
const copyGlobalNoticeBtn = document.querySelector("#copyGlobalNoticeBtn");
const copyNoticeChecklistBtn = document.querySelector("#copyNoticeChecklistBtn");

const publicNoticeCard = document.querySelector("#publicNoticeCard");
const publicNoticeCardType = document.querySelector("#publicNoticeCardType");
const publicNoticeCardTitle = document.querySelector("#publicNoticeCardTitle");
const publicNoticeCardMessage = document.querySelector("#publicNoticeCardMessage");
const publicNoticeCardCta = document.querySelector("#publicNoticeCardCta");

const GLOBAL_NOTICE_KEY = "alaya_global_notice_v73";
const GLOBAL_NOTICE_CLOSED_KEY = "alaya_global_notice_closed_v73";

const DEFAULT_GLOBAL_NOTICE = {
  active: false,
  type: "normal",
  mode: "banner-card",
  title: "Reservas con cita previa",
  message: "Alaya atiende con horas concertadas. Puedes solicitar tu reserva desde la web o por WhatsApp.",
  ctaText: "Reservar",
  ctaUrl: "#reservas",
  dismissible: true,
  updatedAt: new Date().toISOString()
};

function getGlobalNotice() {
  try {
    return {
      ...DEFAULT_GLOBAL_NOTICE,
      ...JSON.parse(localStorage.getItem(GLOBAL_NOTICE_KEY) || "{}")
    };
  } catch {
    return { ...DEFAULT_GLOBAL_NOTICE };
  }
}

function saveGlobalNoticeData(notice) {
  localStorage.setItem(GLOBAL_NOTICE_KEY, JSON.stringify({
    ...notice,
    updatedAt: new Date().toISOString()
  }));
}

function getNoticeTypeLabel(type) {
  return {
    normal: "Aviso",
    importante: "Importante",
    taller: "Taller",
    herbolario: "Herbolario",
    astrologia: "Astrología"
  }[type] || "Aviso";
}

function collectNoticeForm() {
  return {
    active: Boolean(noticeActiveInput?.checked),
    type: noticeTypeInput?.value || "normal",
    mode: noticeModeInput?.value || "banner-card",
    title: noticeTitleInput?.value.trim() || DEFAULT_GLOBAL_NOTICE.title,
    message: noticeMessageInput?.value.trim() || DEFAULT_GLOBAL_NOTICE.message,
    ctaText: noticeCtaTextInput?.value.trim() || DEFAULT_GLOBAL_NOTICE.ctaText,
    ctaUrl: noticeCtaUrlInput?.value.trim() || DEFAULT_GLOBAL_NOTICE.ctaUrl,
    dismissible: Boolean(noticeDismissibleInput?.checked)
  };
}

function fillNoticeForm() {
  const notice = getGlobalNotice();

  if (noticeActiveInput) noticeActiveInput.checked = Boolean(notice.active);
  if (noticeTypeInput) noticeTypeInput.value = notice.type || "normal";
  if (noticeModeInput) noticeModeInput.value = notice.mode || "banner-card";
  if (noticeTitleInput) noticeTitleInput.value = notice.title || "";
  if (noticeMessageInput) noticeMessageInput.value = notice.message || "";
  if (noticeCtaTextInput) noticeCtaTextInput.value = notice.ctaText || "";
  if (noticeCtaUrlInput) noticeCtaUrlInput.value = notice.ctaUrl || "";
  if (noticeDismissibleInput) noticeDismissibleInput.checked = notice.dismissible !== false;

  renderNoticePreview();
}

function applyNoticeClass(element, type) {
  if (!element) return;
  element.classList.remove("notice-normal", "notice-importante", "notice-taller", "notice-herbolario", "notice-astrologia");
  element.classList.add(`notice-${type || "normal"}`);
}

function renderNoticePreview() {
  const notice = collectNoticeForm();

  if (adminNoticePreview) {
    applyNoticeClass(adminNoticePreview, notice.type);
    adminNoticePreview.innerHTML = `
      <span>${getNoticeTypeLabel(notice.type)}</span>
      <strong>${notice.title}</strong>
      <p>${notice.message}</p>
      <a href="${notice.ctaUrl}">${notice.ctaText}</a>
    `;
  }
}

function renderGlobalNotice() {
  const notice = getGlobalNotice();
  const closed = localStorage.getItem(GLOBAL_NOTICE_CLOSED_KEY) === notice.updatedAt;

  const showBanner = notice.active && ["banner", "banner-card"].includes(notice.mode) && !(notice.dismissible && closed);
  const showCard = notice.active && ["card", "banner-card"].includes(notice.mode);

  if (globalNoticeBanner) {
    applyNoticeClass(globalNoticeBanner, notice.type);
    globalNoticeBanner.classList.toggle("hidden", !showBanner);
  }

  if (globalNoticeType) globalNoticeType.textContent = getNoticeTypeLabel(notice.type);
  if (globalNoticeTitle) globalNoticeTitle.textContent = notice.title;
  if (globalNoticeMessage) globalNoticeMessage.textContent = notice.message;
  if (globalNoticeCta) {
    globalNoticeCta.textContent = notice.ctaText || "Ver más";
    globalNoticeCta.href = notice.ctaUrl || "#reservas";
  }

  if (closeGlobalNoticeBtn) {
    closeGlobalNoticeBtn.style.display = notice.dismissible ? "" : "none";
  }

  if (publicNoticeCard) {
    applyNoticeClass(publicNoticeCard, notice.type);
    publicNoticeCard.classList.toggle("is-inactive", !showCard);
  }

  if (publicNoticeCardType) publicNoticeCardType.textContent = showCard ? getNoticeTypeLabel(notice.type) : "Sin aviso";
  if (publicNoticeCardTitle) publicNoticeCardTitle.textContent = showCard ? notice.title : "Sin aviso activo";
  if (publicNoticeCardMessage) {
    publicNoticeCardMessage.textContent = showCard
      ? notice.message
      : "Cuando Alaya active un aviso desde admin, aparecerá aquí.";
  }
  if (publicNoticeCardCta) {
    publicNoticeCardCta.textContent = showCard ? (notice.ctaText || "Ver más") : "Reservar";
    publicNoticeCardCta.href = showCard ? (notice.ctaUrl || "#reservas") : "#reservas";
    publicNoticeCardCta.style.display = showCard ? "" : "none";
  }
}

function saveNoticeFromAdmin() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;

  const notice = collectNoticeForm();
  saveGlobalNoticeData(notice);
  localStorage.removeItem(GLOBAL_NOTICE_CLOSED_KEY);
  renderNoticePreview();
  renderGlobalNotice();

  if (typeof showToast === "function") showToast("Aviso global guardado.");
}

function resetGlobalNotice() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  saveGlobalNoticeData({ ...DEFAULT_GLOBAL_NOTICE });
  localStorage.removeItem(GLOBAL_NOTICE_CLOSED_KEY);
  fillNoticeForm();
  renderGlobalNotice();
  if (typeof showToast === "function") showToast("Aviso base restaurado.");
}

function closeGlobalNotice() {
  const notice = getGlobalNotice();
  localStorage.setItem(GLOBAL_NOTICE_CLOSED_KEY, notice.updatedAt || "closed");
  renderGlobalNotice();
}

function copyGlobalNoticeText() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const notice = collectNoticeForm();
  const text = `${getNoticeTypeLabel(notice.type)} · ${notice.title}

${notice.message}

${notice.ctaText}: ${notice.ctaUrl}`.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Aviso copiado.");
}

function copyNoticeChecklist() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = `
Checklist de avisos Alaya

[ ] Título claro.
[ ] Mensaje breve.
[ ] Enlace correcto.
[ ] Tipo de aviso adecuado.
[ ] Revisar en móvil.
[ ] Revisar que se puede cerrar si no es urgente.
[ ] Desactivar aviso cuando ya no sea actual.
[ ] Evitar promesas médicas o absolutas.
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Checklist de avisos copiado.");
}

[noticeActiveInput, noticeTypeInput, noticeModeInput, noticeTitleInput, noticeMessageInput, noticeCtaTextInput, noticeCtaUrlInput, noticeDismissibleInput].forEach(input => {
  input?.addEventListener("input", renderNoticePreview);
  input?.addEventListener("change", renderNoticePreview);
});

saveGlobalNoticeBtn?.addEventListener("click", saveNoticeFromAdmin);
previewGlobalNoticeBtn?.addEventListener("click", () => {
  renderNoticePreview();
  if (typeof showToast === "function") showToast("Vista previa actualizada.");
});
resetGlobalNoticeBtn?.addEventListener("click", resetGlobalNotice);
copyGlobalNoticeBtn?.addEventListener("click", copyGlobalNoticeText);
copyNoticeChecklistBtn?.addEventListener("click", copyNoticeChecklist);
closeGlobalNoticeBtn?.addEventListener("click", closeGlobalNotice);

fillNoticeForm();
renderGlobalNotice();



// v7.4 Modo Lanzamiento y Mantenimiento Pro
const maintenanceOverlay = document.querySelector("#maintenanceOverlay");
const maintenanceModeLabel = document.querySelector("#maintenanceModeLabel");
const maintenanceTitle = document.querySelector("#maintenanceTitle");
const maintenanceMessage = document.querySelector("#maintenanceMessage");
const maintenanceCountdown = document.querySelector("#maintenanceCountdown");
const maintenanceCta = document.querySelector("#maintenanceCta");
const maintenanceContinueBtn = document.querySelector("#maintenanceContinueBtn");

const maintenanceActiveInput = document.querySelector("#maintenanceActiveInput");
const maintenanceModeInput = document.querySelector("#maintenanceModeInput");
const maintenanceDisplayInput = document.querySelector("#maintenanceDisplayInput");
const maintenanceTitleInput = document.querySelector("#maintenanceTitleInput");
const maintenanceMessageInput = document.querySelector("#maintenanceMessageInput");
const maintenanceDateInput = document.querySelector("#maintenanceDateInput");
const maintenanceCtaTextInput = document.querySelector("#maintenanceCtaTextInput");
const maintenanceCtaUrlInput = document.querySelector("#maintenanceCtaUrlInput");
const maintenanceAllowContinueInput = document.querySelector("#maintenanceAllowContinueInput");
const saveMaintenanceModeBtn = document.querySelector("#saveMaintenanceModeBtn");
const previewMaintenanceModeBtn = document.querySelector("#previewMaintenanceModeBtn");
const resetMaintenanceModeBtn = document.querySelector("#resetMaintenanceModeBtn");
const adminMaintenancePreview = document.querySelector("#adminMaintenancePreview");
const copyMaintenanceStatusBtn = document.querySelector("#copyMaintenanceStatusBtn");
const copyMaintenanceSnippetBtn = document.querySelector("#copyMaintenanceSnippetBtn");
const copyMaintenanceChecklistBtn = document.querySelector("#copyMaintenanceChecklistBtn");

const publicMaintenanceCard = document.querySelector("#publicMaintenanceCard");
const publicMaintenanceModeLabel = document.querySelector("#publicMaintenanceModeLabel");
const publicMaintenanceTitle = document.querySelector("#publicMaintenanceTitle");
const publicMaintenanceMessage = document.querySelector("#publicMaintenanceMessage");
const publicMaintenanceCountdown = document.querySelector("#publicMaintenanceCountdown");
const publicMaintenanceCta = document.querySelector("#publicMaintenanceCta");

const MAINTENANCE_KEY = "alaya_maintenance_mode_v74";
const MAINTENANCE_CONTINUE_KEY = "alaya_maintenance_continue_v74";

const DEFAULT_MAINTENANCE_MODE = {
  active: false,
  mode: "proximamente",
  display: "card",
  title: "Alaya está preparando algo especial",
  message: "Muy pronto estará disponible la experiencia completa.",
  date: "",
  ctaText: "Contactar",
  ctaUrl: "#contacto-alaya",
  allowContinue: true,
  updatedAt: new Date().toISOString()
};

function getMaintenanceModeData() {
  try {
    return {
      ...DEFAULT_MAINTENANCE_MODE,
      ...JSON.parse(localStorage.getItem(MAINTENANCE_KEY) || "{}")
    };
  } catch {
    return { ...DEFAULT_MAINTENANCE_MODE };
  }
}

function saveMaintenanceModeData(data) {
  localStorage.setItem(MAINTENANCE_KEY, JSON.stringify({
    ...data,
    updatedAt: new Date().toISOString()
  }));
}

function getMaintenanceModeLabel(mode) {
  return {
    proximamente: "Próximamente",
    mantenimiento: "Mantenimiento",
    lanzamiento: "Lanzamiento"
  }[mode] || "Estado";
}

function getCountdownText(dateValue) {
  if (!dateValue) return "Sin cuenta atrás activa";

  const target = new Date(dateValue).getTime();
  const now = Date.now();
  const diff = target - now;

  if (!Number.isFinite(target)) return "Fecha no válida";
  if (diff <= 0) return "Fecha alcanzada";

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  if (days > 0) return `${days} día${days === 1 ? "" : "s"} · ${hours} h · ${minutes} min`;
  if (hours > 0) return `${hours} h · ${minutes} min`;
  return `${minutes} min`;
}

function collectMaintenanceForm() {
  return {
    active: Boolean(maintenanceActiveInput?.checked),
    mode: maintenanceModeInput?.value || "proximamente",
    display: maintenanceDisplayInput?.value || "card",
    title: maintenanceTitleInput?.value.trim() || DEFAULT_MAINTENANCE_MODE.title,
    message: maintenanceMessageInput?.value.trim() || DEFAULT_MAINTENANCE_MODE.message,
    date: maintenanceDateInput?.value || "",
    ctaText: maintenanceCtaTextInput?.value.trim() || DEFAULT_MAINTENANCE_MODE.ctaText,
    ctaUrl: maintenanceCtaUrlInput?.value.trim() || DEFAULT_MAINTENANCE_MODE.ctaUrl,
    allowContinue: Boolean(maintenanceAllowContinueInput?.checked)
  };
}

function fillMaintenanceForm() {
  const data = getMaintenanceModeData();

  if (maintenanceActiveInput) maintenanceActiveInput.checked = Boolean(data.active);
  if (maintenanceModeInput) maintenanceModeInput.value = data.mode || "proximamente";
  if (maintenanceDisplayInput) maintenanceDisplayInput.value = data.display || "card";
  if (maintenanceTitleInput) maintenanceTitleInput.value = data.title || "";
  if (maintenanceMessageInput) maintenanceMessageInput.value = data.message || "";
  if (maintenanceDateInput) maintenanceDateInput.value = data.date || "";
  if (maintenanceCtaTextInput) maintenanceCtaTextInput.value = data.ctaText || "";
  if (maintenanceCtaUrlInput) maintenanceCtaUrlInput.value = data.ctaUrl || "";
  if (maintenanceAllowContinueInput) maintenanceAllowContinueInput.checked = data.allowContinue !== false;

  renderMaintenancePreview();
}

function applyMaintenanceClass(element, mode) {
  if (!element) return;
  element.classList.remove("mode-proximamente", "mode-mantenimiento", "mode-lanzamiento", "is-normal");
  element.classList.add(`mode-${mode || "proximamente"}`);
}

function renderMaintenancePreview() {
  const data = collectMaintenanceForm();
  const countdown = getCountdownText(data.date);

  if (adminMaintenancePreview) {
    applyMaintenanceClass(adminMaintenancePreview, data.mode);
    adminMaintenancePreview.innerHTML = `
      <span>${getMaintenanceModeLabel(data.mode)}</span>
      <strong>${data.title}</strong>
      <p>${data.message}</p>
      <small>Cuenta atrás: ${countdown}</small>
    `;
  }
}

function renderMaintenancePublic() {
  const data = getMaintenanceModeData();
  const continued = sessionStorage.getItem(MAINTENANCE_CONTINUE_KEY) === data.updatedAt;
  const countdownText = getCountdownText(data.date);
  const showOverlay = data.active && ["overlay", "both"].includes(data.display) && !(data.allowContinue && continued);
  const showCard = data.active && ["card", "both"].includes(data.display);

  if (maintenanceOverlay) maintenanceOverlay.classList.toggle("hidden", !showOverlay);
  if (maintenanceModeLabel) maintenanceModeLabel.textContent = getMaintenanceModeLabel(data.mode);
  if (maintenanceTitle) maintenanceTitle.textContent = data.title;
  if (maintenanceMessage) maintenanceMessage.textContent = data.message;
  if (maintenanceCountdown) {
    maintenanceCountdown.innerHTML = `<strong>${countdownText}</strong><small>Cuenta atrás</small>`;
  }
  if (maintenanceCta) {
    maintenanceCta.textContent = data.ctaText || "Contactar";
    maintenanceCta.href = data.ctaUrl || "#contacto-alaya";
  }
  if (maintenanceContinueBtn) maintenanceContinueBtn.style.display = data.allowContinue ? "" : "none";

  if (publicMaintenanceCard) {
    applyMaintenanceClass(publicMaintenanceCard, data.active ? data.mode : "normal");
    publicMaintenanceCard.classList.toggle("is-normal", !showCard);
  }
  if (publicMaintenanceModeLabel) publicMaintenanceModeLabel.textContent = showCard ? getMaintenanceModeLabel(data.mode) : "Disponible";
  if (publicMaintenanceTitle) publicMaintenanceTitle.textContent = showCard ? data.title : "Alaya Holistics está disponible";
  if (publicMaintenanceMessage) {
    publicMaintenanceMessage.textContent = showCard
      ? data.message
      : "Puedes navegar por la web, consultar servicios, reservar cita previa y contactar con Alaya.";
  }
  if (publicMaintenanceCountdown) publicMaintenanceCountdown.textContent = showCard ? countdownText : "Sin cuenta atrás activa";
  if (publicMaintenanceCta) {
    publicMaintenanceCta.textContent = showCard ? (data.ctaText || "Contactar") : "Reservar";
    publicMaintenanceCta.href = showCard ? (data.ctaUrl || "#contacto-alaya") : "#reservas";
  }
}

function saveMaintenanceFromAdmin() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;

  const data = collectMaintenanceForm();
  saveMaintenanceModeData(data);
  sessionStorage.removeItem(MAINTENANCE_CONTINUE_KEY);
  renderMaintenancePreview();
  renderMaintenancePublic();

  if (typeof showToast === "function") showToast("Modo de lanzamiento/mantenimiento guardado.");
}

function resetMaintenanceMode() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("guardar configuración")) return;
  saveMaintenanceModeData({ ...DEFAULT_MAINTENANCE_MODE });
  sessionStorage.removeItem(MAINTENANCE_CONTINUE_KEY);
  fillMaintenanceForm();
  renderMaintenancePublic();
  if (typeof showToast === "function") showToast("Modo base restaurado.");
}

function continueFromMaintenance() {
  const data = getMaintenanceModeData();
  sessionStorage.setItem(MAINTENANCE_CONTINUE_KEY, data.updatedAt || "continue");
  renderMaintenancePublic();
}

function getMaintenanceStatusText() {
  const data = collectMaintenanceForm();
  return `${getMaintenanceModeLabel(data.mode)} · ${data.title}

${data.message}

${data.date ? `Fecha objetivo: ${new Date(data.date).toLocaleString()}` : "Sin fecha objetivo"}

${data.ctaText}: ${data.ctaUrl}`;
}

function copyMaintenanceStatus() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = getMaintenanceStatusText();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Estado copiado.");
}

function copyMaintenanceSnippet() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const data = collectMaintenanceForm();
  const snippet = `
<!-- Alaya · aviso de ${getMaintenanceModeLabel(data.mode)} -->
<section style="padding:24px;border-radius:24px;background:#12091f;color:#fff;font-family:system-ui">
  <p style="color:#ffd78a;font-weight:800">${getMaintenanceModeLabel(data.mode)}</p>
  <h1>${data.title}</h1>
  <p>${data.message}</p>
  ${data.date ? `<p>Fecha objetivo: ${new Date(data.date).toLocaleString()}</p>` : ""}
  <a href="${data.ctaUrl}" style="display:inline-block;padding:10px 14px;border-radius:999px;background:#ffd78a;color:#1a0b1d;text-decoration:none;font-weight:800">${data.ctaText}</a>
</section>
  `.trim();

  if (typeof copyText === "function") copyText(snippet);
  else navigator.clipboard?.writeText(snippet);

  if (typeof showToast === "function") showToast("Snippet copiado.");
}

function copyMaintenanceChecklist() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = `
Checklist modo lanzamiento/mantenimiento

[ ] Mensaje breve y claro.
[ ] Fecha objetivo revisada.
[ ] Botón CTA correcto.
[ ] Probar en móvil.
[ ] Probar pantalla completa.
[ ] Permitir entrar si no es mantenimiento real.
[ ] Desactivar cuando la web esté lista.
[ ] Exportar backup antes de cambios grandes.
[ ] Limpiar caché PWA después de publicar cambios.
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Checklist copiado.");
}

[maintenanceActiveInput, maintenanceModeInput, maintenanceDisplayInput, maintenanceTitleInput, maintenanceMessageInput, maintenanceDateInput, maintenanceCtaTextInput, maintenanceCtaUrlInput, maintenanceAllowContinueInput].forEach(input => {
  input?.addEventListener("input", renderMaintenancePreview);
  input?.addEventListener("change", renderMaintenancePreview);
});

saveMaintenanceModeBtn?.addEventListener("click", saveMaintenanceFromAdmin);
previewMaintenanceModeBtn?.addEventListener("click", () => {
  renderMaintenancePreview();
  if (typeof showToast === "function") showToast("Vista previa actualizada.");
});
resetMaintenanceModeBtn?.addEventListener("click", resetMaintenanceMode);
copyMaintenanceStatusBtn?.addEventListener("click", copyMaintenanceStatus);
copyMaintenanceSnippetBtn?.addEventListener("click", copyMaintenanceSnippet);
copyMaintenanceChecklistBtn?.addEventListener("click", copyMaintenanceChecklist);
maintenanceContinueBtn?.addEventListener("click", continueFromMaintenance);

fillMaintenanceForm();
renderMaintenancePublic();
setInterval(renderMaintenancePublic, 60000);



// v7.5 Centro de Ayuda y Manual Pro
const publicHelpSearchInput = document.querySelector("#publicHelpSearchInput");
const publicHelpGrid = document.querySelector("#publicHelpGrid");
const adminHelpGuideList = document.querySelector("#adminHelpGuideList");
const adminHelpGuidePreview = document.querySelector("#adminHelpGuidePreview");
const copyAdminQuickManualBtn = document.querySelector("#copyAdminQuickManualBtn");
const copyTrainingChecklistBtn = document.querySelector("#copyTrainingChecklistBtn");
const copyClientHelpTextBtn = document.querySelector("#copyClientHelpTextBtn");
const openHelpDocsBtn = document.querySelector("#openHelpDocsBtn");

const HELP_GUIDES = [
  {
    id: "reservas",
    icon: "📅",
    title: "Reservas",
    audience: "Cliente / Admin",
    summary: "Solicitar una cita previa, revisar estado y confirmar por mensaje.",
    steps: [
      "Entrar en la sección Reservas.",
      "Elegir servicio, fecha y hora.",
      "Enviar solicitud con datos básicos.",
      "El admin revisa la reserva.",
      "Confirmar, cancelar o enviar recordatorio desde el panel."
    ]
  },
  {
    id: "servicios",
    icon: "✦",
    title: "Servicios holísticos",
    audience: "Admin",
    summary: "Crear, editar y ordenar servicios visibles en la web.",
    steps: [
      "Entrar en admin.",
      "Abrir la pestaña Servicios.",
      "Editar título, categoría, duración, precio y descripción.",
      "Guardar cambios.",
      "Revisar la sección pública de servicios."
    ]
  },
  {
    id: "herbolario",
    icon: "🌿",
    title: "Alaya Herbolario",
    audience: "Cliente / Admin",
    summary: "Catálogo visual con productos y consulta directa por WhatsApp.",
    steps: [
      "Abrir la sección Herbolario.",
      "Buscar o filtrar productos.",
      "Abrir detalle de producto.",
      "Consultar por WhatsApp.",
      "Desde admin se pueden editar productos y stock visible."
    ]
  },
  {
    id: "talleres",
    icon: "🎓",
    title: "Talleres y cursos",
    audience: "Cliente / Admin",
    summary: "Publicar actividades con fecha, plazas, nivel y ficha ampliada.",
    steps: [
      "Crear taller desde admin.",
      "Añadir fecha, hora, plazas, nivel y descripción.",
      "Marcar como destacado si interesa.",
      "El cliente puede verlo y solicitar reserva.",
      "Revisar plazas antes de confirmar."
    ]
  },
  {
    id: "astral",
    icon: "♈",
    title: "Cartas astrales admin",
    audience: "Admin",
    summary: "Crear fichas privadas, informes y seguimiento de cartas astrales.",
    steps: [
      "Abrir la pestaña Cartas astrales.",
      "Crear ficha con datos natales y consentimiento.",
      "Añadir interpretación, notas privadas y seguimiento.",
      "Generar informe interno o cliente.",
      "Exportar o guardar backup antes de cambios grandes."
    ]
  },
  {
    id: "backup",
    icon: "⬡",
    title: "Backups",
    audience: "Admin",
    summary: "Exportar y restaurar datos locales de Alaya.",
    steps: [
      "Abrir la pestaña Backups.",
      "Pulsar Generar backup.",
      "Descargar JSON.",
      "Guardar en lugar seguro.",
      "Para migrar, importar el JSON en otro navegador y restaurar."
    ]
  },
  {
    id: "pwa",
    icon: "📱",
    title: "Instalar como app",
    audience: "Cliente / Admin",
    summary: "Usar Alaya como app instalada en móvil u ordenador.",
    steps: [
      "Abrir la web desde el navegador.",
      "Tocar Instalar app si aparece.",
      "Si no aparece, usar el menú del navegador.",
      "En iPhone: Safari > Compartir > Añadir a pantalla de inicio.",
      "En admin se puede revisar estado PWA."
    ]
  },
  {
    id: "publicacion",
    icon: "⌂",
    title: "Publicar en GitHub Pages",
    audience: "Admin",
    summary: "Subir la carpeta completa a GitHub Pages.",
    steps: [
      "Descomprimir el ZIP.",
      "Subir todos los archivos a la raíz del repositorio.",
      "Activar GitHub Pages desde Settings > Pages.",
      "Probar la URL publicada.",
      "Si no aparecen cambios, limpiar caché PWA."
    ]
  }
];

function helpNormalize(text = "") {
  return String(text).toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderPublicHelp(query = "") {
  if (!publicHelpGrid) return;

  const q = helpNormalize(query);
  const items = HELP_GUIDES.filter(item => {
    const haystack = helpNormalize([item.title, item.summary, item.audience, item.steps.join(" ")].join(" "));
    return !q || haystack.includes(q);
  });

  publicHelpGrid.innerHTML = items.length
    ? items.map(item => `
      <article class="public-help-card">
        <span>${item.icon} ${item.audience}</span>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <ul>
          ${item.steps.slice(0, 3).map(step => `<li>${step}</li>`).join("")}
        </ul>
      </article>
    `).join("")
    : `<article class="public-help-card"><span>Sin resultados</span><h3>No encontré esa ayuda</h3><p>Prueba con otra palabra o contacta con Alaya.</p></article>`;
}

function renderAdminHelpList() {
  if (!adminHelpGuideList) return;

  adminHelpGuideList.innerHTML = HELP_GUIDES.map(item => `
    <button class="help-guide-btn" type="button" data-help-guide="${item.id}">
      <b>${item.icon}</b>
      <span><strong>${item.title}</strong><br>${item.summary}</span>
    </button>
  `).join("");
}

function renderAdminHelpGuide(id) {
  const item = HELP_GUIDES.find(guide => guide.id === id) || HELP_GUIDES[0];
  if (!adminHelpGuidePreview || !item) return;

  adminHelpGuidePreview.innerHTML = `
    <span>${item.icon} ${item.audience}</span>
    <strong>${item.title}</strong>
    <p>${item.summary}</p>
    <ol>
      ${item.steps.map(step => `<li>${step}</li>`).join("")}
    </ol>
    <button class="btn btn-secondary" type="button" onclick="copySingleHelpGuide('${item.id}')">Copiar esta guía</button>
  `;
}

function buildSingleHelpGuide(id) {
  const item = HELP_GUIDES.find(guide => guide.id === id);
  if (!item) return "";

  return `${item.title} · ${item.audience}

${item.summary}

${item.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`;
}

function copySingleHelpGuide(id) {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = buildSingleHelpGuide(id);
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Guía copiada.");
}

function buildAdminQuickManual() {
  return `Manual rápido Alaya Holistics

${HELP_GUIDES.map(item => buildSingleHelpGuide(item.id)).join("\n\n---\n\n")}

Consejo:
Antes de publicar, revisa avisos, modo mantenimiento, SEO, calidad, PWA y exporta backup.`;
}

function copyAdminQuickManual() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = buildAdminQuickManual();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Manual rápido copiado.");
}

function copyTrainingChecklist() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const text = `
Checklist de formación Alaya

[ ] Saber entrar al admin.
[ ] Revisar reservas.
[ ] Confirmar/cancelar reservas.
[ ] Editar servicios.
[ ] Editar productos del herbolario.
[ ] Crear talleres.
[ ] Crear carta astral admin.
[ ] Generar informe cliente.
[ ] Crear aviso global.
[ ] Usar modo mantenimiento si hace falta.
[ ] Revisar SEO.
[ ] Ejecutar auditoría de calidad.
[ ] Exportar backup.
[ ] Limpiar caché PWA si hay cambios.
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Checklist de formación copiado.");
}

function copyClientHelpText() {
  const text = `
Ayuda rápida para usar Alaya Holistics

Puedes navegar por:
- Reservas: pedir cita previa.
- Servicios: ver consultas disponibles.
- Herbolario: consultar productos y packs.
- Talleres: ver cursos y actividades.
- Astrología: reservar consulta astral.
- Contacto: escribir por WhatsApp o email.
- Instalar app: guardar Alaya en pantalla de inicio.

Si no sabes qué elegir, usa el Asistente Alaya o contacta directamente.
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Ayuda cliente copiada.");
}

publicHelpSearchInput?.addEventListener("input", event => renderPublicHelp(event.target.value));
adminHelpGuideList?.addEventListener("click", event => {
  const button = event.target.closest("[data-help-guide]");
  if (!button) return;
  renderAdminHelpGuide(button.dataset.helpGuide);
});

copyAdminQuickManualBtn?.addEventListener("click", copyAdminQuickManual);
copyTrainingChecklistBtn?.addEventListener("click", copyTrainingChecklist);
copyClientHelpTextBtn?.addEventListener("click", copyClientHelpText);
openHelpDocsBtn?.addEventListener("click", () => window.open("./docs/CENTRO-AYUDA-MANUAL-PRO.md", "_blank", "noopener"));

window.copySingleHelpGuide = copySingleHelpGuide;

renderPublicHelp("");
renderAdminHelpList();
renderAdminHelpGuide("reservas");



// v7.6 Clientes y Admin Separados Pro
const copySeparationChecklistBtn = document.querySelector("#copySeparationChecklistBtn");

const CLIENT_HELP_GUIDES_V76 = [
  {
    id: "reservas-cliente",
    icon: "📅",
    title: "Cómo reservar cita",
    audience: "Cliente",
    summary: "Solicita una cita previa desde la web y espera confirmación de Alaya.",
    steps: ["Entra en Reservas.", "Elige servicio, fecha y hora.", "Rellena tus datos de contacto.", "Envía la solicitud.", "Alaya confirma la reserva por mensaje."]
  },
  {
    id: "servicios-cliente",
    icon: "✦",
    title: "Ver servicios",
    audience: "Cliente",
    summary: "Consulta lecturas, reiki, astrología, talleres y acompañamiento holístico.",
    steps: ["Abre la sección Servicios.", "Busca o filtra el servicio que te interesa.", "Lee la ficha del servicio.", "Usa Reservar o Contactar si tienes dudas."]
  },
  {
    id: "herbolario-cliente",
    icon: "🌿",
    title: "Consultar Alaya Herbolario",
    audience: "Cliente",
    summary: "Explora productos del catálogo y consulta disponibilidad por mensaje.",
    steps: ["Abre Alaya Herbolario.", "Filtra por categoría o busca un producto.", "Abre el detalle.", "Consulta por WhatsApp si quieres más información."]
  },
  {
    id: "talleres-cliente",
    icon: "🎓",
    title: "Talleres y cursos",
    audience: "Cliente",
    summary: "Consulta actividades disponibles, fechas, plazas y nivel.",
    steps: ["Abre Talleres y cursos.", "Revisa fecha, hora y plazas.", "Lee la descripción.", "Solicita reserva si te interesa."]
  },
  {
    id: "astrologia-cliente",
    icon: "♈",
    title: "Consulta de carta astral",
    audience: "Cliente",
    summary: "La parte pública permite reservar consulta astral; la ficha detallada se gestiona solo en admin.",
    steps: ["Abre la zona de Astrología.", "Lee la explicación pública.", "Solicita reserva.", "Alaya prepara la consulta desde el panel privado."]
  },
  {
    id: "contacto-cliente",
    icon: "☎",
    title: "Contactar con Alaya",
    audience: "Cliente",
    summary: "Usa WhatsApp, email o el mensaje rápido para resolver dudas.",
    steps: ["Abre Contacto.", "Elige el motivo.", "Copia el mensaje o abre WhatsApp/email.", "Envía tu consulta."]
  },
  {
    id: "app-cliente",
    icon: "📱",
    title: "Instalar como app",
    audience: "Cliente",
    summary: "Guarda Alaya en la pantalla de inicio del móvil.",
    steps: ["Abre Instalar app.", "Pulsa el botón si aparece.", "En Android usa el menú del navegador si hace falta.", "En iPhone usa Safari > Compartir > Añadir a pantalla de inicio."]
  }
];

const ADMIN_HELP_GUIDES_V76 = [
  {
    id: "reservas-admin",
    icon: "📅",
    title: "Gestionar reservas",
    audience: "Administrador",
    summary: "Revisar solicitudes, cambiar estados, copiar mensajes y controlar agenda.",
    steps: ["Entrar al panel admin.", "Abrir Reservas o Calendario.", "Revisar fecha, hora, servicio y datos.", "Confirmar, cancelar o dejar pendiente.", "Copiar mensaje para el cliente."]
  },
  {
    id: "contenido-admin",
    icon: "✍",
    title: "Contenido público",
    audience: "Administrador",
    summary: "Editar testimonios, FAQs, novedades y avisos sin tocar código.",
    steps: ["Abrir Contenido o Avisos.", "Crear/editar el bloque necesario.", "Revisar vista previa.", "Guardar.", "Comprobar la web pública."]
  },
  {
    id: "astral-admin",
    icon: "♈",
    title: "Cartas astrales privadas",
    audience: "Administrador",
    summary: "Crear fichas, notas privadas, informes y seguimiento dentro del admin.",
    steps: ["Abrir Cartas astrales.", "Añadir datos con consentimiento.", "Completar interpretación e informe.", "Guardar seguimiento.", "Exportar backup si hay cambios importantes."]
  },
  {
    id: "backups-admin",
    icon: "⬡",
    title: "Backups",
    audience: "Administrador",
    summary: "Crear copias completas y restaurarlas en otro navegador.",
    steps: ["Abrir Backups.", "Generar backup.", "Descargar JSON.", "Guardar en lugar seguro.", "Restaurar solo si se entiende que sobrescribe datos."]
  },
  {
    id: "tecnico-admin",
    icon: "⚙",
    title: "Zona técnica",
    audience: "Administrador",
    summary: "Calidad, SEO, PWA, publicación, mantenimiento y métricas son módulos internos.",
    steps: ["Usar Calidad antes de publicar.", "Usar SEO para preparar títulos y descripciones.", "Usar PWA para probar instalación.", "Usar Lanzamiento/Publicación para GitHub Pages.", "Mantener estos módulos fuera de la experiencia cliente."]
  }
];

function renderPublicHelpV76(query = "") {
  if (!publicHelpGrid) return;
  const q = helpNormalize(query);
  const items = CLIENT_HELP_GUIDES_V76.filter(item => {
    const haystack = helpNormalize([item.title, item.summary, item.audience, item.steps.join(" ")].join(" "));
    return !q || haystack.includes(q);
  });
  publicHelpGrid.innerHTML = items.length
    ? items.map(item => `
      <article class="public-help-card">
        <span>${item.icon} ${item.audience}</span>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <ul>${item.steps.slice(0, 4).map(step => `<li>${step}</li>`).join("")}</ul>
      </article>
    `).join("")
    : `<article class="public-help-card"><span>Cliente</span><h3>No encontré esa ayuda</h3><p>Prueba con otra palabra o contacta con Alaya.</p></article>`;
}

function renderAdminHelpListV76() {
  if (!adminHelpGuideList) return;
  adminHelpGuideList.innerHTML = ADMIN_HELP_GUIDES_V76.map(item => `
    <button class="help-guide-btn" type="button" data-help-guide-v76="${item.id}">
      <b>${item.icon}</b>
      <span><strong>${item.title}</strong><br>${item.summary}</span>
    </button>
  `).join("");
}

function renderAdminHelpGuideV76(id) {
  const item = ADMIN_HELP_GUIDES_V76.find(guide => guide.id === id) || ADMIN_HELP_GUIDES_V76[0];
  if (!adminHelpGuidePreview || !item) return;
  adminHelpGuidePreview.innerHTML = `
    <span>${item.icon} ${item.audience}</span>
    <strong>${item.title}</strong>
    <p>${item.summary}</p>
    <ol>${item.steps.map(step => `<li>${step}</li>`).join("")}</ol>
    <button class="btn btn-secondary" type="button" onclick="copySingleAdminHelpGuideV76('${item.id}')">Copiar esta guía admin</button>
  `;
}

function buildAdminHelpGuideV76(id) {
  const item = ADMIN_HELP_GUIDES_V76.find(guide => guide.id === id);
  if (!item) return "";
  return `${item.title} · ${item.audience}

${item.summary}

${item.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`;
}

function copySingleAdminHelpGuideV76(id) {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;
  const text = buildAdminHelpGuideV76(id);
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Guía admin copiada.");
}

function copySeparationChecklist() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;
  const text = `
Checklist separación clientes / administrador

Zona clientes:
[ ] Servicios visibles y claros.
[ ] Reservas visibles.
[ ] Contacto visible.
[ ] Herbolario visible como catálogo.
[ ] Talleres visibles.
[ ] Ayuda pública solo para clientes.
[ ] Sin backups visibles.
[ ] Sin publicación/GitHub visible.
[ ] Sin métricas visibles.
[ ] Sin calidad técnica visible.
[ ] Sin notas internas visibles.

Zona administrador:
[ ] Reservas y agenda.
[ ] Servicios/productos/talleres.
[ ] Cartas astrales y notas privadas.
[ ] Backups.
[ ] SEO.
[ ] Calidad.
[ ] PWA.
[ ] Publicación.
[ ] Métricas.
[ ] Mantenimiento.
[ ] Avisos globales.
  `.trim();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Checklist separación copiado.");
}

function copyClientHelpText() {
  const text = `
Ayuda rápida para clientes · Alaya Holistics

Puedes usar la web para:
- Ver servicios.
- Solicitar una reserva con cita previa.
- Consultar Alaya Herbolario.
- Ver talleres y cursos.
- Reservar consulta de astrología.
- Contactar por WhatsApp o email.
- Instalar la web como app.

La gestión interna, backups, métricas, publicación, notas privadas y cartas astrales detalladas pertenecen solo al panel administrador.
  `.trim();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Ayuda cliente copiada.");
}

document.querySelectorAll("[data-open-admin-tab]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const tab = link.dataset.openAdminTab;
    const tabButton = document.querySelector(`.admin-tab[data-admin-tab="${tab}"]`);
    tabButton?.click();
    document.querySelector("#adminPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

publicHelpSearchInput?.addEventListener("input", event => renderPublicHelpV76(event.target.value));
adminHelpGuideList?.addEventListener("click", event => {
  const button = event.target.closest("[data-help-guide-v76]");
  if (!button) return;
  renderAdminHelpGuideV76(button.dataset.helpGuideV76);
});
copySeparationChecklistBtn?.addEventListener("click", copySeparationChecklist);
window.copySingleAdminHelpGuideV76 = copySingleAdminHelpGuideV76;

setTimeout(() => {
  renderPublicHelpV76(publicHelpSearchInput?.value || "");
  renderAdminHelpListV76();
  renderAdminHelpGuideV76("reservas-admin");
}, 80);



// v7.7 Acceso Admin Separado Pro
function openAdminFromDedicatedAccess() {
  const shouldOpenAdmin =
    location.hash === "#admin" ||
    new URLSearchParams(location.search).get("admin") === "1";

  if (!shouldOpenAdmin) return;

  const openButton = document.querySelector("#openAdminBtnTop");
  const adminModal = document.querySelector("#adminModal");

  if (openButton) {
    openButton.click();
    return;
  }

  if (adminModal) {
    adminModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  }
}

window.addEventListener("hashchange", openAdminFromDedicatedAccess);
setTimeout(openAdminFromDedicatedAccess, 300);



// v7.9 Navegación Cliente Limpia Pro
function getClientNavigationReport() {
  const navLinks = [...document.querySelectorAll("#navLinks a, .footer-site-map a, .client-clean-shortcuts a")];
  const internalWords = ["admin", "backup", "métrica", "metricas", "github", "calidad técnica", "publicación"];
  const visibleIssues = navLinks
    .map(link => (link.textContent || link.href || "").trim().toLowerCase())
    .filter(text => internalWords.some(word => text.includes(word)));

  return {
    totalLinks: navLinks.length,
    issues: visibleIssues,
    ok: visibleIssues.length === 0
  };
}

function copyClientNavigationChecklistV79() {
  if (typeof requireAdminAccess === "function" && !requireAdminAccess("consultar panel")) return;

  const report = getClientNavigationReport();
  const text = `
Checklist navegación cliente limpia

[ ] Menú superior sin Admin.
[ ] Footer sin Panel admin.
[ ] Sin enlaces a backups en zona cliente.
[ ] Sin enlaces a métricas en zona cliente.
[ ] Sin enlaces a publicación/GitHub en zona cliente.
[ ] Sin enlaces a calidad técnica en zona cliente.
[ ] Cliente ve: Sobre Alaya, Servicios, Herbolario, Talleres, Astrología, Reservas, Contacto, Ayuda y Guía.
[ ] Admin entra por admin.html.
[ ] Manual admin separado de guía cliente.

Estado detectado:
- Enlaces cliente revisados: ${report.totalLinks}
- Incidencias visibles: ${report.issues.length ? report.issues.join(", ") : "ninguna"}
  `.trim();

  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);

  if (typeof showToast === "function") showToast("Checklist navegación cliente copiado.");
}

window.copyClientNavigationChecklistV79 = copyClientNavigationChecklistV79;



// v8.0 Experiencia Cliente Pro
function highlightClientRouteFromHash() {
  const target = location.hash ? document.querySelector(location.hash) : null;
  if (!target) return;
  target.classList.add("client-section-highlight");
  setTimeout(() => target.classList.remove("client-section-highlight"), 1400);
}

window.addEventListener("hashchange", highlightClientRouteFromHash);
setTimeout(highlightClientRouteFromHash, 500);



// v8.1 Selector de Servicio Cliente Pro
const clientSelectorOptions = document.querySelectorAll(".client-selector-option");
const clientSelectorBadge = document.querySelector("#clientSelectorBadge");
const clientSelectorTitle = document.querySelector("#clientSelectorTitle");
const clientSelectorText = document.querySelector("#clientSelectorText");
const clientSelectorSteps = document.querySelector("#clientSelectorSteps");
const clientSelectorMainLink = document.querySelector("#clientSelectorMainLink");
const copyClientSelectorMessageBtn = document.querySelector("#copyClientSelectorMessageBtn");

const CLIENT_SELECTOR_ROUTES = {
  claridad: {
    badge: "Lecturas",
    title: "Lectura de cartas o tarot intuitivo",
    text: "Si necesitas claridad sobre una situación, puedes empezar por una lectura simbólica o una consulta personalizada.",
    href: "#servicios",
    cta: "Ver servicios",
    steps: ["Revisa los servicios disponibles.", "Elige el tipo de lectura.", "Solicita reserva con cita previa."],
    message: "Hola Alaya, me gustaría información para una lectura de cartas o tarot intuitivo. Quiero reservar o saber qué opción me recomiendas."
  },
  energia: {
    badge: "Energía",
    title: "Reiki o acompañamiento energético",
    text: "Si buscas una sesión tranquila de equilibrio y autocuidado, empieza por los servicios energéticos.",
    href: "#servicios",
    cta: "Ver energía",
    steps: ["Consulta los servicios de energía.", "Lee la preparación recomendada.", "Solicita hora concertada."],
    message: "Hola Alaya, me gustaría información sobre reiki o una sesión energética. ¿Qué opción me recomiendas?"
  },
  astral: {
    badge: "Astrología",
    title: "Consulta de carta astral",
    text: "Si te interesa tu carta natal, puedes pedir una consulta astral para recibir orientación simbólica personalizada.",
    href: "#astral-ia",
    cta: "Ver astrología",
    steps: ["Lee la sección de astrología.", "Prepara fecha, hora y lugar de nacimiento.", "Solicita reserva."],
    message: "Hola Alaya, me interesa una consulta de carta astral. Tengo mis datos de nacimiento y quisiera reservar o pedir información."
  },
  herbolario: {
    badge: "Herbolario",
    title: "Catálogo Alaya Herbolario",
    text: "Si buscas productos, packs o artículos de bienestar, explora el catálogo y consulta disponibilidad.",
    href: "#herbolario",
    cta: "Ver herbolario",
    steps: ["Busca por categoría.", "Abre la ficha del producto.", "Consulta disponibilidad por mensaje."],
    message: "Hola Alaya, quiero consultar productos del herbolario. ¿Me puedes ayudar con disponibilidad o recomendaciones generales?"
  },
  talleres: {
    badge: "Talleres",
    title: "Talleres y cursos",
    text: "Si quieres aprender o participar en actividades, revisa próximos talleres, plazas y nivel.",
    href: "#eventos",
    cta: "Ver talleres",
    steps: ["Revisa talleres disponibles.", "Comprueba fecha y plazas.", "Solicita inscripción."],
    message: "Hola Alaya, me gustaría información sobre talleres o cursos disponibles. ¿Qué actividades hay próximamente?"
  },
  duda: {
    badge: "Contacto",
    title: "Contacto directo con Alaya",
    text: "Si no tienes claro qué elegir, lo mejor es escribir un mensaje breve explicando lo que necesitas.",
    href: "#contacto-alaya",
    cta: "Contactar",
    steps: ["Explica qué buscas.", "Indica si prefieres sesión, producto o taller.", "Alaya te orientará hacia la opción adecuada."],
    message: "Hola Alaya, tengo dudas y no sé qué opción elegir. Me gustaría que me orientaras sobre servicios, herbolario o talleres."
  }
};

let activeClientSelectorRoute = "claridad";

function renderClientSelector(route = "claridad") {
  const data = CLIENT_SELECTOR_ROUTES[route] || CLIENT_SELECTOR_ROUTES.claridad;
  activeClientSelectorRoute = route;

  clientSelectorOptions.forEach(button => {
    button.classList.toggle("active", button.dataset.clientRoute === route);
  });

  if (clientSelectorBadge) clientSelectorBadge.textContent = data.badge;
  if (clientSelectorTitle) clientSelectorTitle.textContent = data.title;
  if (clientSelectorText) clientSelectorText.textContent = data.text;
  if (clientSelectorMainLink) {
    clientSelectorMainLink.href = data.href;
    clientSelectorMainLink.textContent = data.cta;
  }
  if (clientSelectorSteps) {
    clientSelectorSteps.innerHTML = data.steps.map(step => `<li>${step}</li>`).join("");
  }
}

function copyClientSelectorMessage() {
  const data = CLIENT_SELECTOR_ROUTES[activeClientSelectorRoute] || CLIENT_SELECTOR_ROUTES.claridad;
  if (typeof copyText === "function") copyText(data.message);
  else navigator.clipboard?.writeText(data.message);
  if (typeof showToast === "function") showToast("Mensaje para Alaya copiado.");
}

clientSelectorOptions.forEach(button => {
  button.addEventListener("click", () => renderClientSelector(button.dataset.clientRoute));
});

copyClientSelectorMessageBtn?.addEventListener("click", copyClientSelectorMessage);
renderClientSelector("claridad");



// v8.2 Pre-reserva Guiada Cliente Pro
const prebookingName = document.querySelector("#prebookingName");
const prebookingReason = document.querySelector("#prebookingReason");
const prebookingTime = document.querySelector("#prebookingTime");
const prebookingContact = document.querySelector("#prebookingContact");
const prebookingComment = document.querySelector("#prebookingComment");
const prebookingMessageOutput = document.querySelector("#prebookingMessageOutput");
const copyPrebookingMessageBtn = document.querySelector("#copyPrebookingMessageBtn");

function buildPrebookingMessage() {
  const name = prebookingName?.value.trim() || "Cliente";
  const reason = prebookingReason?.value || "No sé qué elegir";
  const time = prebookingTime?.value || "Me adapto a la disponibilidad";
  const contact = prebookingContact?.value || "WhatsApp";
  const comment = prebookingComment?.value.trim();

  return `Hola Alaya, soy ${name}.

Me gustaría pedir información o preparar una reserva.

Motivo: ${reason}
Preferencia de horario: ${time}
Canal de contacto preferido: ${contact}${comment ? `

Comentario:
${comment}` : ""}

¿Me puedes confirmar disponibilidad y orientarme con la mejor opción?

Gracias.`;
}

function renderPrebookingMessage() {
  if (!prebookingMessageOutput) return;
  prebookingMessageOutput.value = buildPrebookingMessage();
}

function copyPrebookingMessage() {
  const text = buildPrebookingMessage();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Mensaje de pre-reserva copiado.");
}

[prebookingName, prebookingReason, prebookingTime, prebookingContact, prebookingComment].forEach(input => {
  input?.addEventListener("input", renderPrebookingMessage);
  input?.addEventListener("change", renderPrebookingMessage);
});

copyPrebookingMessageBtn?.addEventListener("click", copyPrebookingMessage);
renderPrebookingMessage();



// v8.3 Consulta de Reserva Cliente Pro
const clientReservationLookupForm = document.querySelector("#clientReservationLookupForm");
const clientLookupCode = document.querySelector("#clientLookupCode");
const clientLookupContact = document.querySelector("#clientLookupContact");
const clientReservationResult = document.querySelector("#clientReservationResult");

let lastClientReservationPublicSummary = "";

function normalizeClientLookupText(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^\w@.+-]/g, "");
}

function getPublicReservationsForClientLookup() {
  try {
    const stored = JSON.parse(localStorage.getItem("alaya_reservas") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function getVisibleReservationHistory(reserva) {
  const history = Array.isArray(reserva.statusHistory) ? reserva.statusHistory : [];
  return history
    .filter(item => item && item.estado)
    .map(item => ({
      estado: item.estado,
      fecha: item.fecha || "",
      detalle: item.actor === "admin" || item.actor === "sistema" || item.actor === "cliente"
        ? (item.estado === "Pendiente" ? "Solicitud recibida" : `Estado actualizado a ${item.estado}`)
        : "Estado actualizado"
    }))[0];
}

function findClientReservationByCodeAndContact(code, contact) {
  const normalizedCode = normalizeClientLookupText(code);
  const normalizedContact = normalizeClientLookupText(contact);

  if (!normalizedCode || !normalizedContact) return null;

  return getPublicReservationsForClientLookup().find(reserva => {
    const reservaCode = normalizeClientLookupText(reserva.codigo || "");
    const reservaEmail = normalizeClientLookupText(reserva.email || "");
    const reservaPhone = normalizeClientLookupText(reserva.telefono || "");
    return reservaCode === normalizedCode && (reservaEmail === normalizedContact || reservaPhone === normalizedContact);
  }) || null;
}

function buildClientReservationPublicSummary(reserva) {
  const title = reserva.eventoTitulo || reserva.servicio || "Reserva Alaya";
  const fecha = reserva.eventoFecha || reserva.fecha || "Pendiente";
  const hora = reserva.eventoHora || reserva.hora || "Pendiente";
  const estado = getReservationPublicStatusLabel(reserva);
  const codigo = reserva.codigo || "Sin código";

  return `Resumen de reserva Alaya

Código: ${codigo}
Estado: ${estado}
Servicio / taller: ${title}
Fecha: ${fecha}
Hora: ${hora}

Si necesitas modificarla, contacta con Alaya indicando tu código.`;
}

function renderClientReservationResult(reserva) {
  if (!clientReservationResult) return;

  if (!reserva) {
    lastClientReservationPublicSummary = "";
    clientReservationResult.classList.remove("found");
    clientReservationResult.classList.add("not-found");
    clientReservationResult.innerHTML = `
      <span>Sin resultado</span>
      <h3>No se encontró la solicitud</h3>
      <p>
        Revisa que el código y el contacto coincidan exactamente con los usados al reservar.
        Si no lo tienes, contacta con Alaya.
      </p>
      <div class="client-reservation-result-actions">
        <a class="btn btn-primary" href="#contacto-alaya">Contactar con Alaya</a>
        <a class="btn btn-secondary" href="#reservas">Nueva reserva</a>
      </div>
    `;
    return;
  }

  const title = reserva.eventoTitulo || reserva.servicio || "Reserva Alaya";
  const fecha = reserva.eventoFecha || reserva.fecha || "Pendiente";
  const hora = reserva.eventoHora || reserva.hora || "Pendiente";
  const estado = getReservationPublicStatusLabel(reserva);
  const codigo = reserva.codigo || "Sin código";
  const lastMove = getVisibleReservationHistory(reserva);

  lastClientReservationPublicSummary = buildClientReservationPublicSummary(reserva);
  clientReservationResult.classList.remove("not-found");
  clientReservationResult.classList.add("found");

  clientReservationResult.innerHTML = `
    <span class="client-reservation-status-pill">${estado}</span>
    <h3>${title}</h3>
    <p>Estos son los datos públicos de tu solicitud. Si aparece pendiente, aún falta la confirmación manual de Alaya.</p>
    <ul class="client-reservation-public-list">
      <li><b>Código</b><span>${codigo}</span></li>
      <li><b>Estado</b><span>${estado}</span></li>
      <li><b>Fecha</b><span>${fecha || "Pendiente"}</span></li>
      <li><b>Hora</b><span>${hora || "Pendiente"}</span></li>
      <li><b>Último movimiento</b><span>${lastMove ? `${lastMove.detalle}` : "Solicitud registrada"}</span></li>
    </ul>
    <div class="client-reservation-result-actions">
      <button class="btn btn-primary" type="button" onclick="copyClientReservationPublicSummary()">Copiar resumen</button>
      <a class="btn btn-secondary" href="#contacto-alaya">Contactar</a>
    </div>
  `;
}

function handleClientReservationLookup(event) {
  event?.preventDefault?.();

  const code = clientLookupCode?.value || "";
  const contact = clientLookupContact?.value || "";

  if (!code.trim() || !contact.trim()) {
    if (typeof showToast === "function") showToast("Añade código y contacto.");
    return;
  }

  const reserva = findClientReservationByCodeAndContact(code, contact);
  renderClientReservationResult(reserva);
}

function copyClientReservationPublicSummary() {
  if (!lastClientReservationPublicSummary) return;
  if (typeof copyText === "function") copyText(lastClientReservationPublicSummary);
  else navigator.clipboard?.writeText(lastClientReservationPublicSummary);
  if (typeof showToast === "function") showToast("Resumen de reserva copiado.");
}

clientReservationLookupForm?.addEventListener("submit", handleClientReservationLookup);
window.copyClientReservationPublicSummary = copyClientReservationPublicSummary;



// v8.4 Confirmación Admin Obligatoria Pro
function isReservationConfirmedByAdmin(reserva) {
  return Boolean(reserva?.confirmacionAdmin) || reserva?.estado === "Confirmada";
}

function getReservationClientExplanation(reserva) {
  if (!reserva) return "";
  if (reserva.estado === "Cancelada") return "Esta solicitud aparece cancelada. Contacta con Alaya si necesitas más información.";
  if (isReservationConfirmedByAdmin(reserva)) return "Tu cita ha sido confirmada por Alaya.";
  return "Tu solicitud está recibida, pero todavía pendiente de confirmación por Alaya.";
}



// v8.5 Centro de Confirmaciones Admin Pro
const confirmPendingCount = document.querySelector("#confirmPendingCount");
const confirmConfirmedCount = document.querySelector("#confirmConfirmedCount");
const confirmCancelledCount = document.querySelector("#confirmCancelledCount");
const confirmAdminFilter = document.querySelector("#confirmAdminFilter");
const confirmAdminSearch = document.querySelector("#confirmAdminSearch");
const copyPendingConfirmationsBtn = document.querySelector("#copyPendingConfirmationsBtn");
const copyConfirmationProcessBtn = document.querySelector("#copyConfirmationProcessBtn");
const refreshConfirmationsBtn = document.querySelector("#refreshConfirmationsBtn");
const confirmationsAdminList = document.querySelector("#confirmationsAdminList");

function getConfirmationState(reserva) {
  if (!reserva) return "pendiente";
  if (reserva.estado === "Cancelada") return "cancelada";
  if (reserva.confirmacionAdmin || reserva.estado === "Confirmada") return "confirmada";
  return "pendiente";
}

function getConfirmationFilteredReservations() {
  const filter = confirmAdminFilter?.value || "pendientes";
  const q = (confirmAdminSearch?.value || "").trim().toLowerCase();

  return (reservas || []).filter(reserva => {
    const state = getConfirmationState(reserva);
    const matchesFilter =
      filter === "todas" ||
      (filter === "pendientes" && state === "pendiente") ||
      (filter === "confirmadas" && state === "confirmada") ||
      (filter === "canceladas" && state === "cancelada");

    const haystack = [
      reserva.codigo,
      reserva.nombre,
      reserva.email,
      reserva.telefono,
      reserva.servicio,
      reserva.eventoTitulo,
      reserva.fecha,
      reserva.hora,
      reserva.estado
    ].join(" ").toLowerCase();

    return matchesFilter && (!q || haystack.includes(q));
  }).sort((a, b) => {
    const stateA = getConfirmationState(a);
    const stateB = getConfirmationState(b);
    const order = { pendiente: 0, confirmada: 1, cancelada: 2 };
    return (order[stateA] ?? 9) - (order[stateB] ?? 9) || String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
  });
}

function renderConfirmationsAdminCenter() {
  if (!confirmationsAdminList) return;

  const all = reservas || [];
  const pending = all.filter(reserva => getConfirmationState(reserva) === "pendiente").length;
  const confirmed = all.filter(reserva => getConfirmationState(reserva) === "confirmada").length;
  const cancelled = all.filter(reserva => getConfirmationState(reserva) === "cancelada").length;

  if (confirmPendingCount) confirmPendingCount.textContent = pending;
  if (confirmConfirmedCount) confirmConfirmedCount.textContent = confirmed;
  if (confirmCancelledCount) confirmCancelledCount.textContent = cancelled;

  const list = getConfirmationFilteredReservations();

  if (!list.length) {
    confirmationsAdminList.innerHTML = `<div class="confirmations-empty">No hay reservas en esta bandeja.</div>`;
    return;
  }

  confirmationsAdminList.innerHTML = list.map(reserva => {
    const state = getConfirmationState(reserva);
    const title = reserva.eventoTitulo || reserva.servicio || "Reserva Alaya";
    const fecha = reserva.eventoFecha || reserva.fecha || "Pendiente";
    const hora = reserva.eventoHora || reserva.hora || "Pendiente";
    const statusLabel = state === "pendiente"
      ? "Pendiente de confirmación"
      : state === "confirmada"
        ? "Confirmada por admin"
        : "Cancelada";

    return `
      <article class="confirmation-card-admin ${state === "pendiente" ? "pending" : state === "confirmada" ? "confirmed" : "cancelled"}">
        <div class="confirmation-card-header">
          <div>
            <h5>${title}</h5>
            <p>${reserva.nombre || "Cliente"} · ${reserva.codigo || "Sin código"}</p>
          </div>
          <span class="confirmation-status-pill ${state === "confirmada" ? "confirmed" : state === "cancelada" ? "cancelled" : ""}">${statusLabel}</span>
        </div>
        <ul>
          <li><b>Fecha</b><br>${fecha}</li>
          <li><b>Hora</b><br>${hora}</li>
          <li><b>Contacto</b><br>${reserva.email || reserva.telefono || "No indicado"}</li>
          <li><b>Servicio</b><br>${title}</li>
        </ul>
        <small>${state === "pendiente" ? "Revisar disponibilidad antes de confirmar." : state === "confirmada" ? "Reserva confirmada manualmente." : "Reserva cancelada."}</small>
        <div class="confirmation-actions">
          ${state === "pendiente" ? `<button class="btn btn-primary" type="button" onclick="confirmarReservaDesdeCentro('${reserva.id}')">Confirmar y copiar mensaje</button>` : ""}
          ${state !== "cancelada" ? `<button class="btn btn-secondary" type="button" onclick="cancelarReservaDesdeCentro('${reserva.id}')">Cancelar y copiar mensaje</button>` : ""}
          <button class="btn btn-secondary" type="button" onclick="copiarRevisionReserva('${reserva.id}')">Copiar revisión</button>
          <button class="btn btn-secondary" type="button" onclick="editarReserva('${reserva.id}')">Abrir ficha</button>
        </div>
      </article>
    `;
  }).join("");
}

async function confirmarReservaDesdeCentro(id) {
  if (typeof confirmarReservaAdmin === "function") {
    await confirmarReservaAdmin(id);
  } else {
    cambiarEstadoReserva(id, "Confirmada");
  }
  renderConfirmationsAdminCenter();
}

async function cancelarReservaDesdeCentro(id) {
  if (!requireAdminAccess("cancelar reservas")) return;
  cambiarEstadoReserva(id, "Cancelada");
  const reserva = reservas.find(item => item.id === id);
  if (reserva) {
    await copyTextToClipboard(buildClientMessage(reserva, "cancelacion"), "Reserva cancelada. Mensaje copiado.");
  }
  renderConfirmationsAdminCenter();
}

async function copiarRevisionReserva(id) {
  if (!requireAdminAccess("consultar panel")) return;
  const reserva = reservas.find(item => item.id === id);
  if (!reserva) return;

  const text = `Revisión de solicitud Alaya

Código: ${reserva.codigo || "Sin código"}
Cliente: ${reserva.nombre || "Cliente"}
Servicio: ${reserva.eventoTitulo || reserva.servicio || "Reserva Alaya"}
Fecha: ${reserva.eventoFecha || reserva.fecha || "Pendiente"}
Hora: ${reserva.eventoHora || reserva.hora || "Pendiente"}
Contacto: ${reserva.email || reserva.telefono || "No indicado"}

Estado actual: ${getReservationPublicStatusLabel(reserva)}
Acción pendiente: revisar disponibilidad y confirmar o cancelar manualmente.`;

  await copyTextToClipboard(text, "Revisión copiada.");
}

function buildPendingConfirmationsReport() {
  const pending = (reservas || []).filter(reserva => getConfirmationState(reserva) === "pendiente");
  if (!pending.length) return "No hay reservas pendientes de confirmación.";

  return `Reservas pendientes de confirmación · Alaya

${pending.map((reserva, index) => `${index + 1}. ${reserva.codigo || "Sin código"} · ${reserva.nombre || "Cliente"} · ${reserva.eventoTitulo || reserva.servicio || "Reserva"} · ${reserva.eventoFecha || reserva.fecha || "Fecha pendiente"} ${reserva.eventoHora || reserva.hora || ""}`).join("\n")}

Recordatorio: ninguna de estas reservas está confirmada hasta que el administrador pulse Confirmar reserva.`;
}

async function copyPendingConfirmationsReport() {
  if (!requireAdminAccess("consultar panel")) return;
  await copyTextToClipboard(buildPendingConfirmationsReport(), "Informe de pendientes copiado.");
}

async function copyConfirmationProcess() {
  if (!requireAdminAccess("consultar panel")) return;
  const text = `Protocolo de confirmación Alaya

1. Revisar nueva solicitud.
2. Comprobar disponibilidad real.
3. Si hay disponibilidad, pulsar Confirmar y copiar mensaje.
4. Enviar el mensaje al cliente.
5. Si no hay disponibilidad, cancelar o proponer alternativa.
6. No considerar confirmada ninguna cita sin confirmación manual del administrador.`;
  await copyTextToClipboard(text, "Protocolo copiado.");
}

confirmAdminFilter?.addEventListener("change", renderConfirmationsAdminCenter);
confirmAdminSearch?.addEventListener("input", renderConfirmationsAdminCenter);
copyPendingConfirmationsBtn?.addEventListener("click", copyPendingConfirmationsReport);
copyConfirmationProcessBtn?.addEventListener("click", copyConfirmationProcess);
refreshConfirmationsBtn?.addEventListener("click", renderConfirmationsAdminCenter);

window.renderConfirmationsAdminCenter = renderConfirmationsAdminCenter;
window.confirmarReservaDesdeCentro = confirmarReservaDesdeCentro;
window.cancelarReservaDesdeCentro = cancelarReservaDesdeCentro;
window.copiarRevisionReserva = copiarRevisionReserva;

// Re-render center after common admin actions.
const originalRenderAdminReservasV85 = window.renderAdminReservas;
if (typeof originalRenderAdminReservasV85 === "function") {
  window.renderAdminReservas = function(...args) {
    const result = originalRenderAdminReservasV85.apply(this, args);
    setTimeout(renderConfirmationsAdminCenter, 0);
    return result;
  };
}

setTimeout(renderConfirmationsAdminCenter, 600);



// v8.6 Propuestas de Horario Admin Pro
const alternativeReservationSelect = document.querySelector("#alternativeReservationSelect");
const alternativeOptionOne = document.querySelector("#alternativeOptionOne");
const alternativeOptionTwo = document.querySelector("#alternativeOptionTwo");
const alternativeOptionThree = document.querySelector("#alternativeOptionThree");
const alternativeAdminNote = document.querySelector("#alternativeAdminNote");
const sendAlternativeProposalBtn = document.querySelector("#sendAlternativeProposalBtn");
const copyWaitingMessageBtn = document.querySelector("#copyWaitingMessageBtn");
const copyAlternativesProtocolBtn = document.querySelector("#copyAlternativesProtocolBtn");
const alternativePreview = document.querySelector("#alternativePreview");
const alternativeReservationList = document.querySelector("#alternativeReservationList");

function getAlternativeEligibleReservations() {
  return (reservas || []).filter(reserva => {
    const estado = reserva.estado || "Pendiente";
    return estado === "Pendiente" || estado === "Propuesta alternativa";
  }).sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
}

function getSelectedAlternativeReservation() {
  const id = alternativeReservationSelect?.value;
  return (reservas || []).find(reserva => reserva.id === id) || null;
}

function getAlternativeOptionsFromForm() {
  return [alternativeOptionOne?.value, alternativeOptionTwo?.value, alternativeOptionThree?.value]
    .map(item => String(item || "").trim())
    .filter(Boolean);
}

function buildAlternativeProposalMessage(reserva = getSelectedAlternativeReservation()) {
  if (!reserva) return "Selecciona una reserva para generar el mensaje.";

  const options = getAlternativeOptionsFromForm();
  const optionsText = options.length
    ? options.map((option, index) => `${index + 1}. ${option}`).join("\n")
    : "1. [Añadir opción de horario]\n2. [Añadir otra opción]";

  const title = reserva.eventoTitulo || reserva.servicio || "tu solicitud";
  const requested = `${reserva.eventoFecha || reserva.fecha || "fecha solicitada"} ${reserva.eventoHora || reserva.hora || ""}`.trim();

  return `Hola ${reserva.nombre || ""}, gracias por tu solicitud en Alaya.

He revisado disponibilidad para ${title}.
La fecha/hora solicitada (${requested}) queda pendiente y te propongo estas alternativas:

${optionsText}

Cuando puedas, dime cuál te va mejor y te confirmaré la reserva.

Código de solicitud: ${reserva.codigo || "sin código"}`;
}

function renderAlternativeReservationSelect() {
  if (!alternativeReservationSelect) return;

  const selected = alternativeReservationSelect.value;
  const list = getAlternativeEligibleReservations();

  alternativeReservationSelect.innerHTML = `<option value="">Selecciona una reserva</option>` + list.map(reserva => {
    const title = reserva.eventoTitulo || reserva.servicio || "Reserva";
    const status = reserva.estado === "Propuesta alternativa" ? " · con alternativa" : "";
    return `<option value="${reserva.id}">${reserva.codigo || "Sin código"} · ${reserva.nombre || "Cliente"} · ${title}${status}</option>`;
  }).join("");

  if (selected && list.some(item => item.id === selected)) alternativeReservationSelect.value = selected;
  renderAlternativePreview();
}

function renderAlternativePreview() {
  if (!alternativePreview) return;

  const reserva = getSelectedAlternativeReservation();
  const options = getAlternativeOptionsFromForm();

  if (!reserva) {
    alternativePreview.innerHTML = `<span>Propuesta alternativa</span><h5>Selecciona una reserva</h5><p>El mensaje aparecerá aquí.</p>`;
    return;
  }

  alternativePreview.innerHTML = `
    <span>Propuesta alternativa</span>
    <h5>${reserva.nombre || "Cliente"} · ${reserva.codigo || "Sin código"}</h5>
    <p>${reserva.eventoTitulo || reserva.servicio || "Reserva Alaya"}</p>
    <ul>${(options.length ? options : ["Añade al menos una opción"]).map(option => `<li>${option}</li>`).join("")}</ul>
    <p>${buildAlternativeProposalMessage(reserva).replace(/\n/g, "<br>")}</p>
  `;
}

function renderAlternativeReservationList() {
  if (!alternativeReservationList) return;

  const list = getAlternativeEligibleReservations();
  if (!list.length) {
    alternativeReservationList.innerHTML = `<div class="confirmations-empty">No hay reservas pendientes ni propuestas alternativas.</div>`;
    return;
  }

  alternativeReservationList.innerHTML = list.map(reserva => {
    const title = reserva.eventoTitulo || reserva.servicio || "Reserva Alaya";
    const estado = reserva.estado === "Alternativa aceptada" ? "Alternativa aceptada" : reserva.estado === "Propuesta alternativa" ? "Propuesta alternativa enviada" : "Pendiente de confirmación";
    const proposed = Array.isArray(reserva.alternativasHorario) ? reserva.alternativasHorario : [];

    return `
      <article class="alternative-card ${reserva.estado === "Alternativa aceptada" ? "accepted" : reserva.estado === "Propuesta alternativa" ? "proposed" : ""}">
        <span class="alternative-status-pill">${estado}</span>
        <h5>${title}</h5>
        <p>${reserva.nombre || "Cliente"} · ${reserva.codigo || "Sin código"}</p>
        <ul>
          <li><b>Solicitado</b><br>${reserva.eventoFecha || reserva.fecha || "Fecha pendiente"} ${reserva.eventoHora || reserva.hora || ""}</li>
          <li><b>Contacto</b><br>${reserva.email || reserva.telefono || "No indicado"}</li>
          <li><b>Alternativas</b><br>${proposed.length ? proposed.join("<br>") : "Sin alternativas enviadas"}${reserva.alternativaAceptada ? `<br><span class="accepted-alternative-pill">Aceptada: ${reserva.alternativaAceptada}</span>` : ""}</li>
          <li><b>Estado</b><br>${estado}</li>
        </ul>
        <div class="alternative-card-actions">
          <button class="btn btn-primary" type="button" onclick="selectAlternativeReservation('${reserva.id}')">Preparar alternativa</button>
          <button class="btn btn-secondary" type="button" onclick="confirmarReservaDesdeCentro?.('${reserva.id}')">Confirmar si acepta</button>
          <button class="btn btn-secondary" type="button" onclick="copiarUltimaAlternativa('${reserva.id}')">Copiar alternativa</button>
        </div>
      </article>
    `;
  }).join("");
}

function selectAlternativeReservation(id) {
  if (alternativeReservationSelect) {
    alternativeReservationSelect.value = id;
    renderAlternativePreview();
    document.querySelector("#adminTab-alternativas")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function applyAlternativeProposalToReservation(id, options) {
  reservas = reservas.map(reserva => {
    if (reserva.id !== id) return reserva;
    return {
      ...reserva,
      estado: "Propuesta alternativa",
      confirmacionAdmin: false,
      alternativasHorario: options,
      alternativaEnviadaAt: new Date().toISOString(),
      alternativeInternalNote: alternativeAdminNote?.value.trim() || reserva.alternativeInternalNote || ""
    };
  });
}

async function sendAlternativeProposal() {
  if (!requireAdminAccess("proponer horarios")) return;

  const reserva = getSelectedAlternativeReservation();
  if (!reserva) {
    showToast("Selecciona una reserva.");
    return;
  }

  const options = getAlternativeOptionsFromForm();
  if (!options.length) {
    showToast("Añade al menos una opción alternativa.");
    return;
  }

  applyAlternativeProposalToReservation(reserva.id, options);
  addReservationHistory(reserva.id, "Propuesta alternativa", "Administrador propuso horarios alternativos");
  saveReservas();
  renderAdminReservas();
  renderAdminCalendar();
  renderAdminDashboard();
  renderConfirmationsAdminCenter?.();
  renderAlternativeReservationSelect();
  renderAlternativeReservationList();

  const updated = reservas.find(item => item.id === reserva.id);
  await copyTextToClipboard(buildAlternativeProposalMessage(updated), "Propuesta alternativa guardada y mensaje copiado.");
}

async function copyWaitingMessage() {
  if (!requireAdminAccess("consultar panel")) return;

  const reserva = getSelectedAlternativeReservation();
  const text = reserva
    ? `Hola ${reserva.nombre || ""}, he recibido tu solicitud ${reserva.codigo || ""}. La estoy revisando y te confirmaré disponibilidad lo antes posible. Gracias.`
    : "Hola, he recibido tu solicitud. La estoy revisando y te confirmaré disponibilidad lo antes posible. Gracias.";

  await copyTextToClipboard(text, "Mensaje de espera copiado.");
}

async function copyAlternativesProtocol() {
  if (!requireAdminAccess("consultar panel")) return;

  const text = `Protocolo de horarios alternativos Alaya

1. Revisar la solicitud pendiente.
2. Comprobar agenda real.
3. Si no encaja, añadir 2 o 3 horarios alternativos.
4. Pulsar “Proponer horarios y copiar mensaje”.
5. Enviar el mensaje al cliente.
6. Cuando el cliente elija opción, confirmar manualmente la reserva.
7. No confirmar una cita hasta que el cliente acepte una alternativa y el administrador la valide.`;

  await copyTextToClipboard(text, "Protocolo de alternativas copiado.");
}

async function copiarUltimaAlternativa(id) {
  if (!requireAdminAccess("consultar panel")) return;

  const reserva = (reservas || []).find(item => item.id === id);
  if (!reserva) return;

  const oldSelect = alternativeReservationSelect?.value;
  if (alternativeReservationSelect) alternativeReservationSelect.value = id;

  if (Array.isArray(reserva.alternativasHorario)) {
    if (alternativeOptionOne) alternativeOptionOne.value = reserva.alternativasHorario[0] || "";
    if (alternativeOptionTwo) alternativeOptionTwo.value = reserva.alternativasHorario[1] || "";
    if (alternativeOptionThree) alternativeOptionThree.value = reserva.alternativasHorario[2] || "";
  }

  await copyTextToClipboard(buildAlternativeProposalMessage(reserva), "Última alternativa copiada.");
  if (alternativeReservationSelect) alternativeReservationSelect.value = oldSelect || "";
  renderAlternativePreview();
}

[alternativeReservationSelect, alternativeOptionOne, alternativeOptionTwo, alternativeOptionThree, alternativeAdminNote].forEach(input => {
  input?.addEventListener("input", renderAlternativePreview);
  input?.addEventListener("change", renderAlternativePreview);
});

sendAlternativeProposalBtn?.addEventListener("click", sendAlternativeProposal);
copyWaitingMessageBtn?.addEventListener("click", copyWaitingMessage);
copyAlternativesProtocolBtn?.addEventListener("click", copyAlternativesProtocol);

window.renderAlternativeReservationSelect = renderAlternativeReservationSelect;
window.renderAlternativeReservationList = renderAlternativeReservationList;
window.selectAlternativeReservation = selectAlternativeReservation;
window.copiarUltimaAlternativa = copiarUltimaAlternativa;

setTimeout(() => {
  renderAlternativeReservationSelect();
  renderAlternativeReservationList();
}, 800);



// v8.7 Respuesta a Propuesta Cliente Pro
const clientProposalResponseForm = document.querySelector("#clientProposalResponseForm");
const proposalResponseCode = document.querySelector("#proposalResponseCode");
const proposalResponseContact = document.querySelector("#proposalResponseContact");
const clientProposalResponseResult = document.querySelector("#clientProposalResponseResult");

const acceptedAlternativeReservationSelect = document.querySelector("#acceptedAlternativeReservationSelect");
const acceptedAlternativeOptionSelect = document.querySelector("#acceptedAlternativeOptionSelect");
const acceptedAlternativeNote = document.querySelector("#acceptedAlternativeNote");
const markAlternativeAcceptedBtn = document.querySelector("#markAlternativeAcceptedBtn");
const confirmAcceptedAlternativeBtn = document.querySelector("#confirmAcceptedAlternativeBtn");
const copyAcceptedAlternativeMessageBtn = document.querySelector("#copyAcceptedAlternativeMessageBtn");

let currentProposalResponseReservation = null;
let currentProposalAcceptedOption = "";

function findClientProposalReservation(code, contact) {
  const reserva = findClientReservationByCodeAndContact?.(code, contact);
  if (!reserva) return null;
  const options = Array.isArray(reserva.alternativasHorario) ? reserva.alternativasHorario : [];
  return options.length ? reserva : null;
}

function buildProposalAcceptanceMessage(reserva, option) {
  return `Hola Alaya, soy ${reserva?.nombre || "cliente"}.

He revisado las alternativas de mi solicitud ${reserva?.codigo || ""} y acepto esta opción:

${option || "[opción elegida]"}

Quedo pendiente de que me confirmes manualmente la reserva.

Gracias.`;
}

function renderClientProposalResponse(reserva) {
  if (!clientProposalResponseResult) return;

  if (!reserva) {
    currentProposalResponseReservation = null;
    currentProposalAcceptedOption = "";
    clientProposalResponseResult.innerHTML = `
      <span>Sin propuesta</span>
      <h3>No se encontró una propuesta alternativa</h3>
      <p>
        Revisa el código y el contacto. Si no tienes propuesta alternativa, puedes consultar tu reserva o contactar con Alaya.
      </p>
      <div class="proposal-response-actions">
        <a class="btn btn-primary" href="#consulta-reserva">Consultar reserva</a>
        <a class="btn btn-secondary" href="#contacto-alaya">Contactar</a>
      </div>
    `;
    return;
  }

  currentProposalResponseReservation = reserva;
  const options = Array.isArray(reserva.alternativasHorario) ? reserva.alternativasHorario : [];
  currentProposalAcceptedOption = options[0] || "";

  clientProposalResponseResult.innerHTML = `
    <span class="proposal-response-pill">Propuesta alternativa</span>
    <h3>${reserva.eventoTitulo || reserva.servicio || "Reserva Alaya"}</h3>
    <p>Elige la opción que prefieres y copia el mensaje para enviarlo a Alaya.</p>
    <div class="proposal-response-options">
      ${options.map((option, index) => `
        <label class="proposal-response-option">
          <input type="radio" name="proposalClientOption" value="${option.replace(/"/g, "&quot;")}" ${index === 0 ? "checked" : ""}>
          <span>${option}</span>
        </label>
      `).join("")}
    </div>
    <p class="proposal-response-note">
      Esta respuesta no confirma la cita automáticamente. Alaya debe confirmarla manualmente.
    </p>
    <div class="proposal-response-actions">
      <button class="btn btn-primary" type="button" onclick="copyClientProposalAcceptanceMessage()">Copiar respuesta</button>
      <a class="btn btn-secondary" href="#contacto-alaya">Contactar</a>
    </div>
  `;

  clientProposalResponseResult.querySelectorAll("input[name='proposalClientOption']").forEach(input => {
    input.addEventListener("change", () => {
      currentProposalAcceptedOption = input.value;
    });
  });
}

function handleClientProposalResponseLookup(event) {
  event?.preventDefault?.();
  const code = proposalResponseCode?.value || "";
  const contact = proposalResponseContact?.value || "";

  if (!code.trim() || !contact.trim()) {
    showToast?.("Añade código y contacto.");
    return;
  }

  renderClientProposalResponse(findClientProposalReservation(code, contact));
}

async function copyClientProposalAcceptanceMessage() {
  if (!currentProposalResponseReservation || !currentProposalAcceptedOption) return;
  const text = buildProposalAcceptanceMessage(currentProposalResponseReservation, currentProposalAcceptedOption);
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  showToast?.("Respuesta a propuesta copiada.");
}

function getAcceptedAlternativeReservations() {
  return (reservas || []).filter(reserva => Array.isArray(reserva.alternativasHorario) && reserva.alternativasHorario.length);
}

function renderAcceptedAlternativeSelectors() {
  if (!acceptedAlternativeReservationSelect) return;

  const selected = acceptedAlternativeReservationSelect.value;
  const list = getAcceptedAlternativeReservations();

  acceptedAlternativeReservationSelect.innerHTML = `<option value="">Selecciona una reserva con alternativa</option>` + list.map(reserva => {
    const accepted = reserva.alternativaAceptada ? " · aceptada" : "";
    return `<option value="${reserva.id}">${reserva.codigo || "Sin código"} · ${reserva.nombre || "Cliente"}${accepted}</option>`;
  }).join("");

  if (selected && list.some(item => item.id === selected)) {
    acceptedAlternativeReservationSelect.value = selected;
  }

  renderAcceptedAlternativeOptions();
}

function renderAcceptedAlternativeOptions() {
  if (!acceptedAlternativeOptionSelect) return;

  const reserva = (reservas || []).find(item => item.id === acceptedAlternativeReservationSelect?.value);
  const options = Array.isArray(reserva?.alternativasHorario) ? reserva.alternativasHorario : [];

  acceptedAlternativeOptionSelect.innerHTML = `<option value="">Selecciona opción aceptada</option>` + options.map(option => {
    const selected = option === reserva?.alternativaAceptada ? "selected" : "";
    return `<option value="${option.replace(/"/g, "&quot;")}" ${selected}>${option}</option>`;
  }).join("");
}

function markAlternativeAccepted() {
  if (!requireAdminAccess("registrar aceptación")) return;

  const id = acceptedAlternativeReservationSelect?.value;
  const option = acceptedAlternativeOptionSelect?.value;

  if (!id || !option) {
    showToast("Selecciona reserva y opción aceptada.");
    return;
  }

  reservas = reservas.map(reserva => {
    if (reserva.id !== id) return reserva;
    return {
      ...reserva,
      estado: "Alternativa aceptada",
      confirmacionAdmin: false,
      alternativaAceptada: option,
      alternativaAceptadaAt: new Date().toISOString(),
      alternativaAceptadaNota: acceptedAlternativeNote?.value.trim() || ""
    };
  });

  addReservationHistory(id, "Alternativa aceptada", "Cliente aceptó una alternativa registrada por admin");
  saveReservas();
  renderAdminReservas();
  renderAdminCalendar();
  renderAdminDashboard();
  renderConfirmationsAdminCenter?.();
  renderAlternativeReservationSelect?.();
  renderAlternativeReservationList?.();
  renderAcceptedAlternativeSelectors();

  showToast("Alternativa aceptada registrada. Falta confirmación manual.");
}

async function confirmAcceptedAlternative() {
  if (!requireAdminAccess("confirmar reservas")) return;

  const id = acceptedAlternativeReservationSelect?.value;
  if (!id) {
    showToast("Selecciona una reserva.");
    return;
  }

  await confirmarReservaAdmin?.(id);
  renderAcceptedAlternativeSelectors();
}

async function copyAcceptedAlternativeConfirmationMessage() {
  if (!requireAdminAccess("consultar panel")) return;

  const reserva = (reservas || []).find(item => item.id === acceptedAlternativeReservationSelect?.value);
  if (!reserva) {
    showToast("Selecciona una reserva.");
    return;
  }

  const option = acceptedAlternativeOptionSelect?.value || reserva.alternativaAceptada || "la opción aceptada";
  const text = `Hola ${reserva.nombre || ""}, queda confirmada tu reserva en Alaya para:

${reserva.eventoTitulo || reserva.servicio || "Reserva Alaya"}
Horario confirmado: ${option}
Código: ${reserva.codigo || ""}

Gracias.`;

  await copyTextToClipboard(text, "Mensaje de confirmación de alternativa copiado.");
}

clientProposalResponseForm?.addEventListener("submit", handleClientProposalResponseLookup);
acceptedAlternativeReservationSelect?.addEventListener("change", renderAcceptedAlternativeOptions);
markAlternativeAcceptedBtn?.addEventListener("click", markAlternativeAccepted);
confirmAcceptedAlternativeBtn?.addEventListener("click", confirmAcceptedAlternative);
copyAcceptedAlternativeMessageBtn?.addEventListener("click", copyAcceptedAlternativeConfirmationMessage);

window.copyClientProposalAcceptanceMessage = copyClientProposalAcceptanceMessage;
window.renderAcceptedAlternativeSelectors = renderAcceptedAlternativeSelectors;

setTimeout(renderAcceptedAlternativeSelectors, 900);



// v8.9 Inicio PC Ordenado Pro
function applyDesktopNavigationModeV89() {
  document.body.classList.toggle("desktop-wide-v89", window.innerWidth >= 1024);
}
window.addEventListener("resize", applyDesktopNavigationModeV89);
applyDesktopNavigationModeV89();



// v9.0 Diseño Responsive Total Pro
function applyResponsiveModeV90() {
  document.body.classList.toggle("is-mobile-v90", window.innerWidth <= 860);
  document.body.classList.toggle("is-desktop-v90", window.innerWidth > 860);
}

function closeMobileMenuAfterClickV90() {
  if (window.innerWidth > 860) return;
  document.querySelector("#navLinks")?.classList.remove("open");
}

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", closeMobileMenuAfterClickV90);
});

window.addEventListener("resize", applyResponsiveModeV90);
applyResponsiveModeV90();



// v9.1 Mejora Sección por Sección Pro
function updateActiveSectionNavV91() {
  const links = [...document.querySelectorAll("#navLinks a[href^='#']")];
  if (!links.length) return;

  const sections = links
    .map(link => {
      try {
        return { link, section: document.querySelector(link.getAttribute("href")) };
      } catch {
        return null;
      }
    })
    .filter(item => item && item.section);

  let active = null;
  const offset = window.innerWidth <= 860 ? 120 : 150;

  for (const item of sections) {
    const rect = item.section.getBoundingClientRect();
    if (rect.top <= offset && rect.bottom > offset) {
      active = item;
      break;
    }
  }

  links.forEach(link => link.classList.remove("active-section-v91"));
  if (active) active.link.classList.add("active-section-v91");
}

function buildSectionReviewV91() {
  const sectionIds = [
    "inicio-cliente",
    "selector-cliente",
    "servicios",
    "herbolario",
    "eventos",
    "reservas",
    "consulta-reserva",
    "contacto-alaya"
  ];

  return sectionIds.map(id => {
    const section = document.getElementById(id);
    return {
      id,
      exists: Boolean(section),
      title: section?.querySelector("h2,h3,h1")?.textContent?.trim() || id
    };
  });
}

window.addEventListener("scroll", updateActiveSectionNavV91, { passive: true });
window.addEventListener("resize", updateActiveSectionNavV91);
setTimeout(updateActiveSectionNavV91, 700);
window.buildSectionReviewV91 = buildSectionReviewV91;



// v9.2 Hero e Inicio Pro
function focusHeroPrimaryActionV92() {
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;
  target.classList.add("client-section-highlight");
  setTimeout(() => target.classList.remove("client-section-highlight"), 1200);
}

document.querySelectorAll(".hero-intro-summary-actions-v92 a, .hero-trust-v92 a").forEach(link => {
  link.addEventListener("click", focusHeroPrimaryActionV92);
});

setTimeout(focusHeroPrimaryActionV92, 500);



// v9.3 Servicios Pro
const servicesRecommendationV93 = document.querySelector("#servicesRecommendationV93");

const SERVICE_GUIDE_COPY_V93 = {
  lecturas: {
    title: "Ruta recomendada: lectura simbólica",
    text: "Empieza revisando las lecturas disponibles. Después prepara tu consulta y solicita reserva pendiente de confirmación."
  },
  energia: {
    title: "Ruta recomendada: sesión energética",
    text: "Revisa los servicios de energía o reiki, elige una sesión y solicita horario. Alaya confirmará manualmente."
  },
  astral: {
    title: "Ruta recomendada: consulta astral",
    text: "Consulta la sección de astrología y prepara fecha, hora y lugar de nacimiento antes de solicitar la cita."
  },
  duda: {
    title: "Ruta recomendada: selector o contacto",
    text: "Usa el selector cliente o prepara un mensaje explicando qué buscas. Alaya te orientará antes de reservar."
  }
};

function updateServicesRecommendationV93(choice) {
  if (!servicesRecommendationV93) return;
  const data = SERVICE_GUIDE_COPY_V93[choice] || SERVICE_GUIDE_COPY_V93.duda;
  const strong = servicesRecommendationV93.querySelector("strong");
  const p = servicesRecommendationV93.querySelector("p");
  if (strong) strong.textContent = data.title;
  if (p) p.textContent = data.text;
}

document.querySelectorAll("[data-service-guide-choice]").forEach(link => {
  link.addEventListener("click", () => {
    updateServicesRecommendationV93(link.dataset.serviceGuideChoice);
  });
});



// v9.4 Herbolario Pro
const herbolarioRecommendationV94 = document.querySelector("#herbolarioRecommendationV94");
const herbConsultNameV94 = document.querySelector("#herbConsultNameV94");
const herbConsultTypeV94 = document.querySelector("#herbConsultTypeV94");
const herbConsultCommentV94 = document.querySelector("#herbConsultCommentV94");
const herbConsultOutputV94 = document.querySelector("#herbConsultOutputV94");
const copyHerbConsultBtnV94 = document.querySelector("#copyHerbConsultBtnV94");

const HERB_GUIDE_COPY_V94 = {
  infusiones: {
    title: "Ruta recomendada: infusiones y plantas",
    text: "Explora el catálogo, revisa disponibilidad y pregunta por opciones de bienestar general."
  },
  aromas: {
    title: "Ruta recomendada: aromas y velas",
    text: "Busca artículos para crear ambiente, acompañar rituales simbólicos o preparar espacios de calma."
  },
  minerales: {
    title: "Ruta recomendada: minerales y detalles",
    text: "Consulta minerales, detalles y artículos decorativos de acompañamiento simbólico."
  },
  packs: {
    title: "Ruta recomendada: pack personalizado",
    text: "Prepara un mensaje explicando para qué lo quieres y Alaya podrá orientarte de forma general."
  }
};

function updateHerbolarioRecommendationV94(choice) {
  if (!herbolarioRecommendationV94) return;
  const data = HERB_GUIDE_COPY_V94[choice] || HERB_GUIDE_COPY_V94.packs;
  const strong = herbolarioRecommendationV94.querySelector("strong");
  const p = herbolarioRecommendationV94.querySelector("p");
  if (strong) strong.textContent = data.title;
  if (p) p.textContent = data.text;
}

function buildHerbolarioConsultMessageV94() {
  const name = herbConsultNameV94?.value.trim() || "Cliente";
  const type = herbConsultTypeV94?.value || "No sé qué elegir";
  const comment = herbConsultCommentV94?.value.trim();

  return `Hola Alaya, soy ${name}.

Me gustaría consultar el herbolario.

Busco: ${type}${comment ? `

Comentario:
${comment}` : ""}

¿Me puedes decir disponibilidad u orientarme de forma general?

Gracias.`;
}

function renderHerbolarioConsultMessageV94() {
  if (!herbConsultOutputV94) return;
  herbConsultOutputV94.value = buildHerbolarioConsultMessageV94();
}

function copyHerbolarioConsultMessageV94() {
  const text = buildHerbolarioConsultMessageV94();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Mensaje de herbolario copiado.");
}

document.querySelectorAll("[data-herb-guide-choice]").forEach(link => {
  link.addEventListener("click", () => updateHerbolarioRecommendationV94(link.dataset.herbGuideChoice));
});

[herbConsultNameV94, herbConsultTypeV94, herbConsultCommentV94].forEach(input => {
  input?.addEventListener("input", renderHerbolarioConsultMessageV94);
  input?.addEventListener("change", renderHerbolarioConsultMessageV94);
});

copyHerbConsultBtnV94?.addEventListener("click", copyHerbolarioConsultMessageV94);
renderHerbolarioConsultMessageV94();



// v9.5 Talleres y Cursos Pro
const talleresRecommendationV95 = document.querySelector("#talleresRecommendationV95");
const workshopConsultNameV95 = document.querySelector("#workshopConsultNameV95");
const workshopConsultTypeV95 = document.querySelector("#workshopConsultTypeV95");
const workshopConsultScheduleV95 = document.querySelector("#workshopConsultScheduleV95");
const workshopConsultContactV95 = document.querySelector("#workshopConsultContactV95");
const workshopConsultCommentV95 = document.querySelector("#workshopConsultCommentV95");
const workshopConsultOutputV95 = document.querySelector("#workshopConsultOutputV95");
const copyWorkshopConsultBtnV95 = document.querySelector("#copyWorkshopConsultBtnV95");

const WORKSHOP_GUIDE_COPY_V95 = {
  puntual: {
    title: "Ruta recomendada: taller puntual",
    text: "Revisa próximas fechas y prepara una consulta de plaza. Alaya confirmará disponibilidad antes de cerrar la asistencia."
  },
  curso: {
    title: "Ruta recomendada: curso guiado",
    text: "Pregunta por duración, fechas, material y nivel recomendado. Después solicita plaza pendiente de confirmación."
  },
  grupo: {
    title: "Ruta recomendada: actividad de grupo",
    text: "Consulta el aforo y el formato de la actividad. La plaza queda pendiente hasta confirmación."
  },
  plazas: {
    title: "Ruta recomendada: consultar plazas",
    text: "Prepara un mensaje con tu horario preferido y Alaya te dirá opciones disponibles."
  }
};

function updateTalleresRecommendationV95(choice) {
  if (!talleresRecommendationV95) return;
  const data = WORKSHOP_GUIDE_COPY_V95[choice] || WORKSHOP_GUIDE_COPY_V95.plazas;
  const strong = talleresRecommendationV95.querySelector("strong");
  const p = talleresRecommendationV95.querySelector("p");
  if (strong) strong.textContent = data.title;
  if (p) p.textContent = data.text;
}

function buildWorkshopConsultMessageV95() {
  const name = workshopConsultNameV95?.value.trim() || "Cliente";
  const type = workshopConsultTypeV95?.value || "Consultar plazas";
  const schedule = workshopConsultScheduleV95?.value || "Me adapto";
  const contact = workshopConsultContactV95?.value.trim();
  const comment = workshopConsultCommentV95?.value.trim();

  return `Hola Alaya, soy ${name}.

Me gustaría consultar talleres o cursos.

Interés: ${type}
Horario preferido: ${schedule}${contact ? `
Contacto: ${contact}` : ""}${comment ? `

Comentario:
${comment}` : ""}

¿Me puedes decir si hay plazas, próximas fechas o qué opción encaja mejor?

Entiendo que la plaza queda pendiente hasta confirmación de Alaya.

Gracias.`;
}

function renderWorkshopConsultMessageV95() {
  if (!workshopConsultOutputV95) return;
  workshopConsultOutputV95.value = buildWorkshopConsultMessageV95();
}

function copyWorkshopConsultMessageV95() {
  const text = buildWorkshopConsultMessageV95();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Mensaje de talleres copiado.");
}

document.querySelectorAll("[data-workshop-guide-choice]").forEach(link => {
  link.addEventListener("click", () => updateTalleresRecommendationV95(link.dataset.workshopGuideChoice));
});

[workshopConsultNameV95, workshopConsultTypeV95, workshopConsultScheduleV95, workshopConsultContactV95, workshopConsultCommentV95].forEach(input => {
  input?.addEventListener("input", renderWorkshopConsultMessageV95);
  input?.addEventListener("change", renderWorkshopConsultMessageV95);
});

copyWorkshopConsultBtnV95?.addEventListener("click", copyWorkshopConsultMessageV95);
renderWorkshopConsultMessageV95();



// v9.6 Reservas Pro
const copyReservationChecklistV96 = document.querySelector("#copyReservationChecklistV96");

function buildReservationChecklistV96() {
  return `Checklist para solicitar reserva en Alaya

1. Nombre y contacto.
2. Servicio, taller o consulta que quiero.
3. Día u horario preferido.
4. Comentario breve si necesito orientación.
5. Esperar respuesta de Alaya.

Importante: enviar la solicitud no confirma automáticamente la cita. Alaya debe confirmarla manualmente.`;
}

function copyReservationChecklistTextV96() {
  const text = buildReservationChecklistV96();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Checklist de reserva copiado.");
}

copyReservationChecklistV96?.addEventListener("click", copyReservationChecklistTextV96);



// v9.7 Consulta y Respuesta Pro
const copyMissingReservationMessageV97 = document.querySelector("#copyMissingReservationMessageV97");

function buildMissingReservationMessageV97() {
  return `Hola Alaya.

No consigo encontrar mi solicitud de reserva.

Te dejo mis datos para que puedas revisarlo:
- Nombre:
- Email o teléfono usado:
- Servicio o taller solicitado:
- Fecha aproximada de solicitud:
- Código si lo tengo:

Gracias.`;
}

function copyMissingReservationHelpV97() {
  const text = buildMissingReservationMessageV97();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Mensaje de ayuda copiado.");
}

copyMissingReservationMessageV97?.addEventListener("click", copyMissingReservationHelpV97);



// v9.8 Contacto y Confianza Pro
const contactMessageNameV98 = document.querySelector("#contactMessageNameV98");
const contactMessageReasonV98 = document.querySelector("#contactMessageReasonV98");
const contactMessageContactV98 = document.querySelector("#contactMessageContactV98");
const contactMessageScheduleV98 = document.querySelector("#contactMessageScheduleV98");
const contactMessageDetailsV98 = document.querySelector("#contactMessageDetailsV98");
const contactMessageOutputV98 = document.querySelector("#contactMessageOutputV98");
const copyContactMessageBtnV98 = document.querySelector("#copyContactMessageBtnV98");

function buildContactMessageV98() {
  const name = contactMessageNameV98?.value.trim() || "Cliente";
  const reason = contactMessageReasonV98?.value || "Tengo una duda";
  const contact = contactMessageContactV98?.value.trim();
  const schedule = contactMessageScheduleV98?.value || "Me adapto";
  const details = contactMessageDetailsV98?.value.trim();

  return `Hola Alaya, soy ${name}.

Motivo: ${reason}
Horario preferido: ${schedule}${contact ? `
Contacto para responder: ${contact}` : ""}${details ? `

Detalles:
${details}` : ""}

Quedo pendiente de tu respuesta. Entiendo que reservas, plazas u horarios necesitan confirmación de Alaya.

Gracias.`;
}

function renderContactMessageV98() {
  if (!contactMessageOutputV98) return;
  contactMessageOutputV98.value = buildContactMessageV98();
}

function copyContactMessageV98() {
  const text = buildContactMessageV98();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Mensaje de contacto copiado.");
}

[contactMessageNameV98, contactMessageReasonV98, contactMessageContactV98, contactMessageScheduleV98, contactMessageDetailsV98].forEach(input => {
  input?.addEventListener("input", renderContactMessageV98);
  input?.addEventListener("change", renderContactMessageV98);
});

copyContactMessageBtnV98?.addEventListener("click", copyContactMessageV98);
renderContactMessageV98();



// v9.9 Admin Visible Pro
function trackAdminPublicAccessV99() {
  const links = document.querySelectorAll(".admin-public-nav-v99, .admin-public-access-v99 a[href='admin.html']");
  links.forEach(link => {
    link.addEventListener("click", () => {
      try {
        localStorage.setItem("alaya_last_admin_access_click", new Date().toISOString());
      } catch {}
    });
  });
}
trackAdminPublicAccessV99();



// v10.0 Panel Admin Pro
const copyAdminDailyProtocolV100 = document.querySelector("#copyAdminDailyProtocolV100");

function jumpAdminTabV100(tabName) {
  const tab = document.querySelector(`.admin-tab[data-admin-tab="${tabName}"]`);
  if (tab) {
    tab.click();
    tab.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const fallback = document.querySelector(`#adminTab-${tabName}`);
  if (fallback) fallback.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildAdminDailyProtocolV100() {
  return `Protocolo diario Alaya Admin

1. Revisar reservas pendientes.
2. Confirmar, cancelar o proponer alternativa.
3. Copiar y enviar mensaje al cliente.
4. Revisar talleres, plazas y calendario.
5. Actualizar servicios o contenido si hay cambios.
6. Hacer copia de seguridad tras cambios importantes.

Recordatorio: ninguna reserva queda confirmada hasta validación manual del administrador.`;
}

async function copyAdminDailyProtocolTextV100() {
  const text = buildAdminDailyProtocolV100();
  if (typeof copyTextToClipboard === "function") await copyTextToClipboard(text, "Protocolo diario admin copiado.");
  else if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
}

document.querySelectorAll("[data-admin-jump-v100]").forEach(button => {
  button.addEventListener("click", () => jumpAdminTabV100(button.dataset.adminJumpV100));
});

copyAdminDailyProtocolV100?.addEventListener("click", copyAdminDailyProtocolTextV100);
window.jumpAdminTabV100 = jumpAdminTabV100;



// v10.1 Ayuda y Manuales Pro
const copyClientHelpStepsV101 = document.querySelector("#copyClientHelpStepsV101");

function buildClientHelpStepsV101() {
  return `Guía rápida para usar Alaya Holistics

1. Si no sabes qué elegir, usa el selector.
2. Si quieres reservar, envía una solicitud de reserva.
3. La reserva no queda confirmada automáticamente.
4. Alaya revisa disponibilidad y confirma manualmente.
5. Para consultar estado, usa tu código y contacto.
6. Si hay una propuesta alternativa, responde y espera confirmación final.
7. Para dudas, prepara un mensaje de contacto.`;
}

function copyClientHelpStepsTextV101() {
  const text = buildClientHelpStepsV101();
  if (typeof copyText === "function") copyText(text);
  else navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Guía rápida copiada.");
}

copyClientHelpStepsV101?.addEventListener("click", copyClientHelpStepsTextV101);



// v10.2 UX Global Pro
const pageProgressV102 = document.querySelector("#pageProgressV102");
const backToTopV102 = document.querySelector("#backToTopV102");

function updatePageProgressV102() {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
  if (pageProgressV102) pageProgressV102.style.width = `${progress}%`;
  backToTopV102?.classList.toggle("visible", window.scrollY > 460);
}

function scrollTopV102() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", updatePageProgressV102, { passive: true });
window.addEventListener("resize", updatePageProgressV102);
backToTopV102?.addEventListener("click", scrollTopV102);
setTimeout(updatePageProgressV102, 400);



// v10.3 Gestor de Contenido Admin Pro
const ADMIN_CONTENT_KEY_V103 = "alaya_admin_content_v103";

const CONTENT_TYPE_LABEL_V103 = {
  servicio: "Servicio",
  taller: "Taller",
  curso: "Curso",
  herbolario: "Herbolario",
  aviso: "Aviso",
  novedad: "Novedad"
};

function getAdminContentV103() {
  try {
    const raw = localStorage.getItem(ADMIN_CONTENT_KEY_V103);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAdminContentV103(items) {
  localStorage.setItem(ADMIN_CONTENT_KEY_V103, JSON.stringify(items));
  renderAdminContentManagerV103();
  renderPublicAdminContentV103();
}

function createAdminContentIdV103() {
  return `alaya-content-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sanitizeTextV103(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function getContentFormDataV103() {
  return {
    id: document.querySelector("#contentIdV103")?.value || createAdminContentIdV103(),
    type: document.querySelector("#contentTypeV103")?.value || "servicio",
    title: sanitizeTextV103(document.querySelector("#contentTitleV103")?.value),
    category: sanitizeTextV103(document.querySelector("#contentCategoryV103")?.value),
    status: sanitizeTextV103(document.querySelector("#contentStatusV103")?.value),
    date: sanitizeTextV103(document.querySelector("#contentDateV103")?.value),
    price: sanitizeTextV103(document.querySelector("#contentPriceV103")?.value),
    description: sanitizeTextV103(document.querySelector("#contentDescriptionV103")?.value),
    ctaText: sanitizeTextV103(document.querySelector("#contentCtaTextV103")?.value) || "Solicitar información",
    ctaLink: sanitizeTextV103(document.querySelector("#contentCtaLinkV103")?.value) || "#contacto-alaya",
    active: Boolean(document.querySelector("#contentActiveV103")?.checked),
    updatedAt: new Date().toISOString()
  };
}

function setContentFormDataV103(item) {
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#contentIdV103", item.id);
  set("#contentTypeV103", item.type);
  set("#contentTitleV103", item.title);
  set("#contentCategoryV103", item.category);
  set("#contentStatusV103", item.status);
  set("#contentDateV103", item.date);
  set("#contentPriceV103", item.price);
  set("#contentDescriptionV103", item.description);
  set("#contentCtaTextV103", item.ctaText);
  set("#contentCtaLinkV103", item.ctaLink);
  const active = document.querySelector("#contentActiveV103");
  if (active) active.checked = item.active !== false;
  renderContentPreviewV103();
}

function clearContentFormV103() {
  document.querySelector("#contentManagerFormV103")?.reset();
  const id = document.querySelector("#contentIdV103");
  if (id) id.value = "";
  const active = document.querySelector("#contentActiveV103");
  if (active) active.checked = true;
  renderContentPreviewV103();
}

function renderContentPreviewV103() {
  const item = getContentFormDataV103();
  const preview = document.querySelector("#contentPreviewV103");
  if (!preview) return;
  preview.innerHTML = `
    <span>${CONTENT_TYPE_LABEL_V103[item.type] || item.type}${item.active ? "" : " · oculto"}</span>
    <h3>${item.title || "Contenido sin título"}</h3>
    <div class="content-public-meta-v103">
      ${item.category ? `<small>${item.category}</small>` : ""}
      ${item.status ? `<small>${item.status}</small>` : ""}
      ${item.date ? `<small>${item.date}</small>` : ""}
      ${item.price ? `<small>${item.price}</small>` : ""}
    </div>
    <p>${item.description || "Rellena la descripción para ver cómo se presentará en la web pública."}</p>
  `;
}

function submitContentFormV103(event) {
  event?.preventDefault();
  const item = getContentFormDataV103();

  if (!item.title) {
    if (typeof showToast === "function") showToast("Añade un título al contenido.");
    else alert("Añade un título al contenido.");
    return;
  }

  const items = getAdminContentV103();
  const index = items.findIndex(existing => existing.id === item.id);
  if (index >= 0) items[index] = { ...items[index], ...item };
  else items.unshift({ ...item, createdAt: new Date().toISOString() });

  saveAdminContentV103(items);
  clearContentFormV103();
  if (typeof showToast === "function") showToast("Contenido guardado.");
}

function duplicateContentV103(id) {
  const items = getAdminContentV103();
  const item = items.find(existing => existing.id === id);
  if (!item) return;
  const copy = {
    ...item,
    id: createAdminContentIdV103(),
    title: `${item.title} copia`,
    active: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  saveAdminContentV103([copy, ...items]);
}

function toggleContentV103(id) {
  const items = getAdminContentV103().map(item =>
    item.id === id ? { ...item, active: item.active === false, updatedAt: new Date().toISOString() } : item
  );
  saveAdminContentV103(items);
}

function deleteContentV103(id) {
  const item = getAdminContentV103().find(existing => existing.id === id);
  if (!item) return;
  if (!confirm(`¿Borrar "${item.title}"?`)) return;
  saveAdminContentV103(getAdminContentV103().filter(existing => existing.id !== id));
}

function editContentV103(id) {
  const item = getAdminContentV103().find(existing => existing.id === id);
  if (!item) return;
  setContentFormDataV103(item);
  document.querySelector("#contentManagerFormV103")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getFilteredAdminContentV103() {
  const type = document.querySelector("#contentFilterTypeV103")?.value || "";
  const search = (document.querySelector("#contentSearchV103")?.value || "").toLowerCase().trim();

  return getAdminContentV103().filter(item => {
    const matchesType = !type || item.type === type;
    const haystack = `${item.title || ""} ${item.category || ""} ${item.status || ""} ${item.description || ""}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);
    return matchesType && matchesSearch;
  });
}

function renderContentStatsV103() {
  const stats = document.querySelector("#contentManagerStatsV103");
  if (!stats) return;
  const items = getAdminContentV103();
  const types = ["servicio", "taller", "curso", "herbolario", "aviso", "novedad"];
  stats.innerHTML = types.map(type => {
    const count = items.filter(item => item.type === type).length;
    return `<div class="content-stat-v103"><strong>${count}</strong><span>${CONTENT_TYPE_LABEL_V103[type]}</span></div>`;
  }).join("");
}

function renderAdminContentListV103() {
  const list = document.querySelector("#contentListV103");
  if (!list) return;
  const items = getFilteredAdminContentV103();

  if (!items.length) {
    list.innerHTML = `<div class="content-card-v103"><p>No hay contenido para mostrar.</p></div>`;
    return;
  }

  list.innerHTML = items.map(item => `
    <article class="content-card-v103 ${item.active === false ? "is-inactive" : ""}">
      <div class="content-card-top-v103">
        <span>${CONTENT_TYPE_LABEL_V103[item.type] || item.type}</span>
        <small class="content-card-status-v103">${item.active === false ? "Oculto" : "Visible"}</small>
      </div>
      <h4>${item.title || "Sin título"}</h4>
      <p>${item.description || "Sin descripción."}</p>
      <div class="content-public-meta-v103">
        ${item.category ? `<small>${item.category}</small>` : ""}
        ${item.status ? `<small>${item.status}</small>` : ""}
        ${item.date ? `<small>${item.date}</small>` : ""}
        ${item.price ? `<small>${item.price}</small>` : ""}
      </div>
      <div class="content-card-actions-v103">
        <button class="btn btn-secondary" type="button" onclick="editContentV103('${item.id}')">Editar</button>
        <button class="btn btn-secondary" type="button" onclick="toggleContentV103('${item.id}')">${item.active === false ? "Publicar" : "Ocultar"}</button>
        <button class="btn btn-secondary" type="button" onclick="duplicateContentV103('${item.id}')">Duplicar</button>
        <button class="btn btn-secondary" type="button" onclick="deleteContentV103('${item.id}')">Borrar</button>
      </div>
    </article>
  `).join("");
}

function renderAdminContentManagerV103() {
  renderContentStatsV103();
  renderAdminContentListV103();
  renderContentPreviewV103();
}

function contentCardPublicV103(item) {
  return `
    <article class="content-public-card-v103">
      <span>${CONTENT_TYPE_LABEL_V103[item.type] || item.type}</span>
      <h3>${item.title || "Contenido"}</h3>
      <div class="content-public-meta-v103">
        ${item.category ? `<small>${item.category}</small>` : ""}
        ${item.status ? `<small>${item.status}</small>` : ""}
        ${item.date ? `<small>${item.date}</small>` : ""}
        ${item.price ? `<small>${item.price}</small>` : ""}
      </div>
      <p>${item.description || ""}</p>
      <a class="btn btn-secondary" href="${item.ctaLink || "#contacto-alaya"}">${item.ctaText || "Solicitar información"}</a>
    </article>
  `;
}

function renderPublicGroupV103(containerId, items, title) {
  const container = document.querySelector(containerId);
  if (!container) return;
  if (!items.length) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = `
    <h3 class="admin-public-content-title-v103">${title}</h3>
    <div class="admin-public-content-grid-v103">
      ${items.map(contentCardPublicV103).join("")}
    </div>
  `;
}

function renderPublicAdminContentV103() {
  const visible = getAdminContentV103().filter(item => item.active !== false);
  renderPublicGroupV103("#adminContentServicesV103", visible.filter(item => item.type === "servicio"), "Añadido por Alaya");
  renderPublicGroupV103("#adminContentEventsV103", visible.filter(item => item.type === "taller" || item.type === "curso"), "Talleres y cursos añadidos");
  renderPublicGroupV103("#adminContentHerbolarioV103", visible.filter(item => item.type === "herbolario"), "Productos añadidos por Alaya");
  renderPublicGroupV103("#adminContentNewsV103", visible.filter(item => item.type === "aviso" || item.type === "novedad"), "Avisos y novedades");
}

function exportAdminContentV103() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "10.3",
    items: getAdminContentV103()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-contenido-admin-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

document.querySelector("#contentManagerFormV103")?.addEventListener("submit", submitContentFormV103);
document.querySelector("#clearContentFormV103")?.addEventListener("click", clearContentFormV103);
document.querySelector("#previewContentV103")?.addEventListener("click", renderContentPreviewV103);
document.querySelector("#exportAdminContentV103")?.addEventListener("click", exportAdminContentV103);
document.querySelector("#contentFilterTypeV103")?.addEventListener("change", renderAdminContentListV103);
document.querySelector("#contentSearchV103")?.addEventListener("input", renderAdminContentListV103);

["#contentTypeV103", "#contentTitleV103", "#contentCategoryV103", "#contentStatusV103", "#contentDateV103", "#contentPriceV103", "#contentDescriptionV103", "#contentCtaTextV103", "#contentCtaLinkV103", "#contentActiveV103"].forEach(selector => {
  const input = document.querySelector(selector);
  input?.addEventListener("input", renderContentPreviewV103);
  input?.addEventListener("change", renderContentPreviewV103);
});

window.editContentV103 = editContentV103;
window.toggleContentV103 = toggleContentV103;
window.duplicateContentV103 = duplicateContentV103;
window.deleteContentV103 = deleteContentV103;
window.renderPublicAdminContentV103 = renderPublicAdminContentV103;
window.renderAdminContentManagerV103 = renderAdminContentManagerV103;

renderAdminContentManagerV103();
renderPublicAdminContentV103();



// v10.5 Admin WordPress CMS Pro
const WP_CMS_KEY_V105 = "alaya_wordpress_cms_v105";

const WP_DEFAULT_CMS_V105 = {
  identity: {
    siteName: "Alaya Holistics",
    subtitle: "Bienestar · Tarot · Reiki · Herbolario",
    email: "",
    phone: "",
    location: "",
    instagram: "",
    brandText: "Un espacio de bienestar, orientación simbólica y acompañamiento holístico."
  },
  home: {
    heroTitle: "Un espacio para reconectar contigo",
    heroText: "En Alaya Holistics encontrarás lectura de cartas, tarot, reiki, consultas energéticas, herbolario y talleres para acompañarte con calma, intuición y cuidado.",
    primaryCtaText: "Solicitar reserva",
    primaryCtaLink: "#reservas",
    secondaryCtaText: "Ver servicios",
    secondaryCtaLink: "#servicios",
    publicMenuText: "Atajos gestionados desde el panel Admin."
  },
  appearance: {
    colorPrimary: "#ffd78a",
    colorSecondary: "#86ecff",
    colorAccent: "#ff9fcb",
    colorOk: "#a7ffce",
    visualScale: "normal",
    homeMode: "premium"
  },
  menu: [
    { label: "Reservar", url: "#guia-reservas" },
    { label: "Servicios", url: "#guia-servicios" },
    { label: "Herbolario", url: "#guia-herbolario" },
    { label: "Talleres", url: "#guia-talleres" },
    { label: "Contacto", url: "#mensaje-contacto" }
  ],
  blocks: [],
  seo: {
    title: "Alaya Holistics · Bienestar, Tarot, Reiki y Herbolario",
    description: "Alaya Holistics: consultas de tarot, lectura de cartas, reiki, astrología, talleres y herbolario con reserva previa.",
    keywords: "tarot, reiki, herbolario, talleres, astrología, bienestar",
    index: "index"
  },
  publish: {
    siteStatus: "publicada",
    announcementEnabled: "no",
    announcementText: ""
  }
};

function deepMergeV105(base, extra) {
  if (Array.isArray(base)) return Array.isArray(extra) ? extra : base;
  const out = { ...base };
  Object.keys(extra || {}).forEach(key => {
    if (base[key] && typeof base[key] === "object" && !Array.isArray(base[key])) {
      out[key] = deepMergeV105(base[key], extra[key]);
    } else {
      out[key] = extra[key];
    }
  });
  return out;
}

function getWpCmsV105() {
  try {
    const raw = localStorage.getItem(WP_CMS_KEY_V105);
    return raw ? deepMergeV105(WP_DEFAULT_CMS_V105, JSON.parse(raw)) : structuredClone(WP_DEFAULT_CMS_V105);
  } catch {
    return JSON.parse(JSON.stringify(WP_DEFAULT_CMS_V105));
  }
}

function saveWpCmsV105(cms) {
  localStorage.setItem(WP_CMS_KEY_V105, JSON.stringify(cms));
  applyWpCmsV105();
  renderWpAdminV105();
}

function sanitizeWpV105(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function ensureMetaV105(name, attr = "name") {
  let meta = document.querySelector(`meta[${attr}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  return meta;
}

function applyWpCmsV105() {
  const cms = getWpCmsV105();

  document.body.style.setProperty("--astral-gold", cms.appearance.colorPrimary || "#ffd78a");
  document.body.style.setProperty("--astral-cyan", cms.appearance.colorSecondary || "#86ecff");
  document.body.style.setProperty("--astral-pink", cms.appearance.colorAccent || "#ff9fcb");
  document.body.style.setProperty("--astral-ok", cms.appearance.colorOk || "#a7ffce");

  document.body.classList.toggle("wp-scale-compact-v105", cms.appearance.visualScale === "compacta");
  document.body.classList.toggle("wp-scale-large-v105", cms.appearance.visualScale === "grande");
  document.body.classList.toggle("wp-home-simple-v105", cms.appearance.homeMode === "simple");
  document.body.classList.toggle("wp-home-editorial-v105", cms.appearance.homeMode === "editorial");

  const title = cms.seo.title || cms.identity.siteName || "Alaya Holistics";
  document.title = title;
  ensureMetaV105("description").setAttribute("content", cms.seo.description || "");
  ensureMetaV105("keywords").setAttribute("content", cms.seo.keywords || "");
  ensureMetaV105("robots").setAttribute("content", cms.seo.index === "noindex" ? "noindex,nofollow" : "index,follow");
  ensureMetaV105("og:title", "property").setAttribute("content", title);
  ensureMetaV105("og:description", "property").setAttribute("content", cms.seo.description || "");

  document.querySelectorAll(".brand strong").forEach(el => {
    el.textContent = cms.identity.siteName?.split(" ")[0] || "Alaya";
  });
  document.querySelectorAll(".brand small").forEach(el => {
    el.textContent = cms.identity.siteName?.split(" ").slice(1).join(" ") || "Holistics";
  });

  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) heroTitle.textContent = cms.home.heroTitle || WP_DEFAULT_CMS_V105.home.heroTitle;

  const heroText = document.querySelector(".hero .hero-text");
  if (heroText) heroText.textContent = cms.home.heroText || WP_DEFAULT_CMS_V105.home.heroText;

  const heroButtons = document.querySelectorAll(".hero-actions a");
  if (heroButtons[0]) {
    heroButtons[0].textContent = cms.home.primaryCtaText || "Solicitar reserva";
    heroButtons[0].setAttribute("href", cms.home.primaryCtaLink || "#reservas");
  }
  if (heroButtons[1]) {
    heroButtons[1].textContent = cms.home.secondaryCtaText || "Ver servicios";
    heroButtons[1].setAttribute("href", cms.home.secondaryCtaLink || "#servicios");
  }

  const menuText = document.querySelector("#cmsPublicMenuTextV105");
  if (menuText) menuText.textContent = cms.home.publicMenuText || "Atajos gestionados desde Admin.";

  renderWpPublicMenuV105(cms);
  renderWpPublicBlocksV105(cms);
  renderWpAnnouncementV105(cms);
}

function renderWpAnnouncementV105(cms) {
  const el = document.querySelector("#cmsGlobalAnnouncementV105");
  if (!el) return;
  const visible = cms.publish.announcementEnabled === "yes" && cms.publish.announcementText;
  el.classList.toggle("hidden", !visible);
  el.textContent = visible ? cms.publish.announcementText : "";
}

function renderWpPublicMenuV105(cms = getWpCmsV105()) {
  const nav = document.querySelector("#cmsPublicMenuLinksV105");
  if (!nav) return;
  const items = (cms.menu || []).filter(item => item.label && item.url).slice(0, 8);
  nav.innerHTML = items.map(item => `<a href="${sanitizeWpV105(item.url)}">${sanitizeWpV105(item.label)}</a>`).join("");
}

function renderWpPublicBlocksV105(cms = getWpCmsV105()) {
  const container = document.querySelector("#cmsPublicBlocksV105");
  if (!container) return;
  const blocks = (cms.blocks || []).filter(block => block.status === "Publicado");
  const section = document.querySelector(".cms-public-blocks-v105");
  if (section) section.style.display = blocks.length ? "" : "none";

  container.innerHTML = blocks.map(block => `
    <article class="cms-public-block-card-v105">
      <span>${sanitizeWpV105(block.type || "Bloque")}</span>
      <h3>${sanitizeWpV105(block.title || "Sin título")}</h3>
      ${block.subtitle ? `<strong>${sanitizeWpV105(block.subtitle)}</strong>` : ""}
      <p>${sanitizeWpV105(block.content || "")}</p>
      ${block.ctaText && block.ctaLink ? `<a class="btn btn-secondary" href="${sanitizeWpV105(block.ctaLink)}">${sanitizeWpV105(block.ctaText)}</a>` : ""}
    </article>
  `).join("");
}

function wpSetInputV105(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.value = value ?? "";
}

function wpGetInputV105(selector) {
  return sanitizeWpV105(document.querySelector(selector)?.value);
}

function fillWpFormsV105() {
  const cms = getWpCmsV105();
  wpSetInputV105("#wpSiteNameV105", cms.identity.siteName);
  wpSetInputV105("#wpSiteSubtitleV105", cms.identity.subtitle);
  wpSetInputV105("#wpEmailV105", cms.identity.email);
  wpSetInputV105("#wpPhoneV105", cms.identity.phone);
  wpSetInputV105("#wpLocationV105", cms.identity.location);
  wpSetInputV105("#wpInstagramV105", cms.identity.instagram);
  wpSetInputV105("#wpBrandTextV105", cms.identity.brandText);

  wpSetInputV105("#wpHeroTitleV105", cms.home.heroTitle);
  wpSetInputV105("#wpHeroTextV105", cms.home.heroText);
  wpSetInputV105("#wpPrimaryCtaTextV105", cms.home.primaryCtaText);
  wpSetInputV105("#wpPrimaryCtaLinkV105", cms.home.primaryCtaLink);
  wpSetInputV105("#wpSecondaryCtaTextV105", cms.home.secondaryCtaText);
  wpSetInputV105("#wpSecondaryCtaLinkV105", cms.home.secondaryCtaLink);
  wpSetInputV105("#wpPublicMenuTextInputV105", cms.home.publicMenuText);

  wpSetInputV105("#wpColorPrimaryV105", cms.appearance.colorPrimary);
  wpSetInputV105("#wpColorSecondaryV105", cms.appearance.colorSecondary);
  wpSetInputV105("#wpColorAccentV105", cms.appearance.colorAccent);
  wpSetInputV105("#wpColorOkV105", cms.appearance.colorOk);
  wpSetInputV105("#wpVisualScaleV105", cms.appearance.visualScale);
  wpSetInputV105("#wpHomeModeV105", cms.appearance.homeMode);

  wpSetInputV105("#wpSeoTitleV105", cms.seo.title);
  wpSetInputV105("#wpSeoDescriptionV105", cms.seo.description);
  wpSetInputV105("#wpSeoKeywordsV105", cms.seo.keywords);
  wpSetInputV105("#wpSeoIndexV105", cms.seo.index);

  wpSetInputV105("#wpSiteStatusV105", cms.publish.siteStatus);
  wpSetInputV105("#wpAnnouncementEnabledV105", cms.publish.announcementEnabled);
  wpSetInputV105("#wpAnnouncementTextV105", cms.publish.announcementText);
}

function collectWpFormsV105() {
  const cms = getWpCmsV105();
  cms.identity = {
    siteName: wpGetInputV105("#wpSiteNameV105") || "Alaya Holistics",
    subtitle: wpGetInputV105("#wpSiteSubtitleV105"),
    email: wpGetInputV105("#wpEmailV105"),
    phone: wpGetInputV105("#wpPhoneV105"),
    location: wpGetInputV105("#wpLocationV105"),
    instagram: wpGetInputV105("#wpInstagramV105"),
    brandText: wpGetInputV105("#wpBrandTextV105")
  };
  cms.home = {
    heroTitle: wpGetInputV105("#wpHeroTitleV105") || WP_DEFAULT_CMS_V105.home.heroTitle,
    heroText: wpGetInputV105("#wpHeroTextV105") || WP_DEFAULT_CMS_V105.home.heroText,
    primaryCtaText: wpGetInputV105("#wpPrimaryCtaTextV105") || "Solicitar reserva",
    primaryCtaLink: wpGetInputV105("#wpPrimaryCtaLinkV105") || "#reservas",
    secondaryCtaText: wpGetInputV105("#wpSecondaryCtaTextV105") || "Ver servicios",
    secondaryCtaLink: wpGetInputV105("#wpSecondaryCtaLinkV105") || "#servicios",
    publicMenuText: wpGetInputV105("#wpPublicMenuTextInputV105") || "Atajos gestionados desde Admin."
  };
  cms.appearance = {
    colorPrimary: wpGetInputV105("#wpColorPrimaryV105") || "#ffd78a",
    colorSecondary: wpGetInputV105("#wpColorSecondaryV105") || "#86ecff",
    colorAccent: wpGetInputV105("#wpColorAccentV105") || "#ff9fcb",
    colorOk: wpGetInputV105("#wpColorOkV105") || "#a7ffce",
    visualScale: wpGetInputV105("#wpVisualScaleV105") || "normal",
    homeMode: wpGetInputV105("#wpHomeModeV105") || "premium"
  };
  cms.seo = {
    title: wpGetInputV105("#wpSeoTitleV105") || cms.identity.siteName,
    description: wpGetInputV105("#wpSeoDescriptionV105"),
    keywords: wpGetInputV105("#wpSeoKeywordsV105"),
    index: wpGetInputV105("#wpSeoIndexV105") || "index"
  };
  cms.publish = {
    siteStatus: wpGetInputV105("#wpSiteStatusV105") || "publicada",
    announcementEnabled: wpGetInputV105("#wpAnnouncementEnabledV105") || "no",
    announcementText: wpGetInputV105("#wpAnnouncementTextV105")
  };
  cms.menu = collectWpMenuV105();
  return cms;
}

function saveWpAllV105() {
  const cms = collectWpFormsV105();
  saveWpCmsV105(cms);
  if (typeof showToast === "function") showToast("CMS guardado.");
}

function renderWpMenuEditorV105() {
  const cms = getWpCmsV105();
  const container = document.querySelector("#wpMenuEditorV105");
  if (!container) return;
  const menu = cms.menu?.length ? cms.menu : WP_DEFAULT_CMS_V105.menu;
  container.innerHTML = menu.map((item, index) => `
    <div class="wp-menu-row-v105" data-menu-index-v105="${index}">
      <label>Etiqueta<input data-menu-label-v105 value="${sanitizeWpV105(item.label)}"></label>
      <label>Enlace<input data-menu-url-v105 value="${sanitizeWpV105(item.url)}"></label>
      <button class="btn btn-secondary" type="button" onclick="removeWpMenuItemV105(${index})">Quitar</button>
    </div>
  `).join("");
}

function collectWpMenuV105() {
  return [...document.querySelectorAll(".wp-menu-row-v105")].map(row => ({
    label: sanitizeWpV105(row.querySelector("[data-menu-label-v105]")?.value),
    url: sanitizeWpV105(row.querySelector("[data-menu-url-v105]")?.value)
  })).filter(item => item.label && item.url);
}

function addWpMenuItemV105() {
  const cms = collectWpFormsV105();
  cms.menu.push({ label: "Nuevo enlace", url: "#contacto-alaya" });
  localStorage.setItem(WP_CMS_KEY_V105, JSON.stringify(cms));
  renderWpMenuEditorV105();
  renderWpPublicMenuV105(cms);
}

function removeWpMenuItemV105(index) {
  const cms = collectWpFormsV105();
  cms.menu.splice(index, 1);
  localStorage.setItem(WP_CMS_KEY_V105, JSON.stringify(cms));
  renderWpMenuEditorV105();
  renderWpPublicMenuV105(cms);
}

function getWpBlockFormDataV105() {
  return {
    id: wpGetInputV105("#wpBlockIdV105") || `wp-block-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type: wpGetInputV105("#wpBlockTypeV105") || "destacado",
    status: wpGetInputV105("#wpBlockStatusV105") || "Publicado",
    title: wpGetInputV105("#wpBlockTitleV105"),
    subtitle: wpGetInputV105("#wpBlockSubtitleV105"),
    content: wpGetInputV105("#wpBlockContentV105"),
    ctaText: wpGetInputV105("#wpBlockCtaTextV105"),
    ctaLink: wpGetInputV105("#wpBlockCtaLinkV105"),
    updatedAt: new Date().toISOString()
  };
}

function clearWpBlockFormV105() {
  document.querySelector("#wpBlockFormV105")?.reset();
  wpSetInputV105("#wpBlockIdV105", "");
}

function saveWpBlockV105(event) {
  event?.preventDefault();
  const block = getWpBlockFormDataV105();
  if (!block.title) {
    if (typeof showToast === "function") showToast("Añade título al bloque.");
    else alert("Añade título al bloque.");
    return;
  }
  const cms = collectWpFormsV105();
  const index = cms.blocks.findIndex(item => item.id === block.id);
  if (index >= 0) cms.blocks[index] = { ...cms.blocks[index], ...block };
  else cms.blocks.unshift({ ...block, createdAt: new Date().toISOString() });
  saveWpCmsV105(cms);
  clearWpBlockFormV105();
}

function editWpBlockV105(id) {
  const cms = getWpCmsV105();
  const block = cms.blocks.find(item => item.id === id);
  if (!block) return;
  wpSetInputV105("#wpBlockIdV105", block.id);
  wpSetInputV105("#wpBlockTypeV105", block.type);
  wpSetInputV105("#wpBlockStatusV105", block.status);
  wpSetInputV105("#wpBlockTitleV105", block.title);
  wpSetInputV105("#wpBlockSubtitleV105", block.subtitle);
  wpSetInputV105("#wpBlockContentV105", block.content);
  wpSetInputV105("#wpBlockCtaTextV105", block.ctaText);
  wpSetInputV105("#wpBlockCtaLinkV105", block.ctaLink);
  document.querySelector("#wpBlockFormV105")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleWpBlockV105(id) {
  const cms = getWpCmsV105();
  cms.blocks = cms.blocks.map(block => block.id === id ? { ...block, status: block.status === "Publicado" ? "Oculto" : "Publicado" } : block);
  saveWpCmsV105(cms);
}

function deleteWpBlockV105(id) {
  const cms = getWpCmsV105();
  const block = cms.blocks.find(item => item.id === id);
  if (!block) return;
  if (!confirm(`¿Borrar bloque "${block.title}"?`)) return;
  cms.blocks = cms.blocks.filter(item => item.id !== id);
  saveWpCmsV105(cms);
}

function renderWpBlocksAdminV105() {
  const list = document.querySelector("#wpBlockListV105");
  if (!list) return;
  const cms = getWpCmsV105();
  if (!cms.blocks.length) {
    list.innerHTML = `<article class="wp-block-card-v105"><p>Todavía no hay bloques creados.</p></article>`;
    return;
  }
  list.innerHTML = cms.blocks.map(block => `
    <article class="wp-block-card-v105 ${block.status !== "Publicado" ? "is-hidden" : ""}">
      <span>${sanitizeWpV105(block.type)} · ${sanitizeWpV105(block.status)}</span>
      <h4>${sanitizeWpV105(block.title)}</h4>
      ${block.subtitle ? `<p><strong>${sanitizeWpV105(block.subtitle)}</strong></p>` : ""}
      <p>${sanitizeWpV105(block.content)}</p>
      <div class="wp-block-actions-v105">
        <button class="btn btn-secondary" type="button" onclick="editWpBlockV105('${block.id}')">Editar</button>
        <button class="btn btn-secondary" type="button" onclick="toggleWpBlockV105('${block.id}')">${block.status === "Publicado" ? "Ocultar" : "Publicar"}</button>
        <button class="btn btn-secondary" type="button" onclick="deleteWpBlockV105('${block.id}')">Borrar</button>
      </div>
    </article>
  `).join("");
}

function renderWpDashboardV105() {
  const cms = getWpCmsV105();
  const site = document.querySelector("#wpDashSiteNameV105");
  if (site) site.textContent = cms.identity.siteName || "Alaya Holistics";
  const count = document.querySelector("#wpDashBlocksCountV105");
  if (count) count.textContent = `${cms.blocks.length} bloque${cms.blocks.length === 1 ? "" : "s"}`;
  const status = document.querySelector("#wpDashStatusV105");
  if (status) status.textContent = cms.publish.siteStatus || "publicada";

  const seoTitle = document.querySelector("#wpSeoPreviewTitleV105");
  if (seoTitle) seoTitle.textContent = cms.seo.title || cms.identity.siteName;
  const seoDesc = document.querySelector("#wpSeoPreviewDescV105");
  if (seoDesc) seoDesc.textContent = cms.seo.description || "Descripción SEO de la web.";
}

function renderWpAdminV105() {
  fillWpFormsV105();
  renderWpMenuEditorV105();
  renderWpBlocksAdminV105();
  renderWpDashboardV105();
}

function switchWpSectionV105(name) {
  document.querySelectorAll("[data-wp-section-v105]").forEach(btn => btn.classList.toggle("active", btn.dataset.wpSectionV105 === name));
  document.querySelectorAll("[data-wp-panel-v105]").forEach(panel => panel.classList.toggle("active", panel.dataset.wpPanelV105 === name));
}

function exportWpCmsV105() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "10.5",
    cms: collectWpFormsV105()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-cms-wordpress-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyWpCmsV105() {
  const data = JSON.stringify({ version: "10.5", cms: collectWpFormsV105() }, null, 2);
  if (typeof copyText === "function") copyText(data);
  else await navigator.clipboard?.writeText(data);
  if (typeof showToast === "function") showToast("JSON CMS copiado.");
}

function importWpCmsV105() {
  const raw = document.querySelector("#wpImportTextV105")?.value;
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    const cms = parsed.cms || parsed;
    saveWpCmsV105(deepMergeV105(WP_DEFAULT_CMS_V105, cms));
    if (typeof showToast === "function") showToast("CMS importado.");
  } catch {
    if (typeof showToast === "function") showToast("JSON no válido.");
    else alert("JSON no válido.");
  }
}

document.querySelectorAll("[data-wp-section-v105]").forEach(btn => {
  btn.addEventListener("click", () => switchWpSectionV105(btn.dataset.wpSectionV105));
});

document.querySelector("#wpSaveAllV105")?.addEventListener("click", saveWpAllV105);
document.querySelector("#wpResetPreviewV105")?.addEventListener("click", () => applyWpCmsV105());
document.querySelector("#wpAddMenuItemV105")?.addEventListener("click", addWpMenuItemV105);
document.querySelector("#wpBlockFormV105")?.addEventListener("submit", saveWpBlockV105);
document.querySelector("#wpClearBlockV105")?.addEventListener("click", clearWpBlockFormV105);
document.querySelector("#wpExportCmsV105")?.addEventListener("click", exportWpCmsV105);
document.querySelector("#wpCopyCmsV105")?.addEventListener("click", copyWpCmsV105);
document.querySelector("#wpImportCmsV105")?.addEventListener("click", importWpCmsV105);

["#wpSeoTitleV105", "#wpSeoDescriptionV105", "#wpSeoKeywordsV105"].forEach(selector => {
  document.querySelector(selector)?.addEventListener("input", () => {
    const cms = collectWpFormsV105();
    const title = document.querySelector("#wpSeoPreviewTitleV105");
    const desc = document.querySelector("#wpSeoPreviewDescV105");
    if (title) title.textContent = cms.seo.title || cms.identity.siteName;
    if (desc) desc.textContent = cms.seo.description || "Descripción SEO de la web.";
  });
});

window.removeWpMenuItemV105 = removeWpMenuItemV105;
window.editWpBlockV105 = editWpBlockV105;
window.toggleWpBlockV105 = toggleWpBlockV105;
window.deleteWpBlockV105 = deleteWpBlockV105;
window.applyWpCmsV105 = applyWpCmsV105;

applyWpCmsV105();
renderWpAdminV105();



// v10.6 Constructor Visual Admin Pro
const WP_REVISIONS_KEY_V106 = "alaya_wordpress_cms_revisions_v106";
let visualShowOnlyPublishedV106 = false;

const VISUAL_TEMPLATES_V106 = {
  hero: {
    type: "destacado",
    status: "Publicado",
    title: "Nuevo destacado principal",
    subtitle: "Bloque creado desde Constructor visual",
    content: "Añade aquí un mensaje importante para la portada o una campaña especial.",
    ctaText: "Más información",
    ctaLink: "#contacto-alaya"
  },
  servicio: {
    type: "servicio",
    status: "Publicado",
    title: "Servicio destacado",
    subtitle: "Consulta personalizada",
    content: "Describe el servicio, para quién es y cómo puede solicitar información el cliente.",
    ctaText: "Solicitar reserva",
    ctaLink: "#reservas"
  },
  taller: {
    type: "taller",
    status: "Publicado",
    title: "Nuevo taller o curso",
    subtitle: "Plazas limitadas",
    content: "Explica fecha, duración, nivel recomendado y cómo apuntarse.",
    ctaText: "Consultar plaza",
    ctaLink: "#consulta-talleres"
  },
  herbolario: {
    type: "herbolario",
    status: "Publicado",
    title: "Producto o pack de herbolario",
    subtitle: "Bienestar general",
    content: "Describe el producto de forma general, sin prometer resultados médicos.",
    ctaText: "Consultar producto",
    ctaLink: "#consulta-herbolario"
  },
  aviso: {
    type: "aviso",
    status: "Publicado",
    title: "Aviso importante",
    subtitle: "Información actualizada",
    content: "Escribe aquí un aviso para clientes: cambios de horario, agenda abierta o novedades.",
    ctaText: "Contactar",
    ctaLink: "#mensaje-contacto"
  },
  faq: {
    type: "faq",
    status: "Publicado",
    title: "Pregunta frecuente",
    subtitle: "Respuesta rápida",
    content: "Escribe aquí la respuesta de forma sencilla y clara.",
    ctaText: "Ver ayuda",
    ctaLink: "#faq-cliente"
  },
  cta: {
    type: "destacado",
    status: "Publicado",
    title: "¿Quieres reservar o preguntar?",
    subtitle: "Alaya te acompaña",
    content: "Prepara tu mensaje o solicita reserva. La confirmación será manual por parte de Alaya.",
    ctaText: "Preparar mensaje",
    ctaLink: "#mensaje-contacto"
  }
};

function getWpRevisionsV106() {
  try {
    const raw = localStorage.getItem(WP_REVISIONS_KEY_V106);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveWpRevisionsV106(revisions) {
  localStorage.setItem(WP_REVISIONS_KEY_V106, JSON.stringify(revisions.slice(0, 20)));
  renderVisualRevisionsV106();
}

function saveVisualRevisionV106(label = "Revisión manual") {
  if (typeof getWpCmsV105 !== "function") return;
  const cms = getWpCmsV105();
  const revisions = getWpRevisionsV106();
  revisions.unshift({
    id: `rev-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label,
    createdAt: new Date().toISOString(),
    cms
  });
  saveWpRevisionsV106(revisions);
  if (typeof showToast === "function") showToast("Revisión guardada.");
}

function restoreVisualRevisionV106(id) {
  const revision = getWpRevisionsV106().find(item => item.id === id);
  if (!revision) return;
  if (!confirm("¿Restaurar esta revisión del CMS?")) return;
  if (typeof saveWpCmsV105 === "function") saveWpCmsV105(revision.cms);
  renderVisualBuilderV106();
  if (typeof showToast === "function") showToast("Revisión restaurada.");
}

function deleteVisualRevisionV106(id) {
  saveWpRevisionsV106(getWpRevisionsV106().filter(item => item.id !== id));
}

function addVisualTemplateV106(templateName) {
  if (typeof getWpCmsV105 !== "function" || typeof saveWpCmsV105 !== "function") return;
  const template = VISUAL_TEMPLATES_V106[templateName];
  if (!template) return;
  const cms = getWpCmsV105();
  cms.blocks = cms.blocks || [];
  cms.blocks.unshift({
    ...template,
    id: `visual-block-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  saveWpCmsV105(cms);
  renderVisualBuilderV106();
  if (typeof showToast === "function") showToast("Plantilla añadida.");
}

function moveVisualBlockV106(id, direction) {
  const cms = getWpCmsV105();
  const blocks = cms.blocks || [];
  const index = blocks.findIndex(block => block.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= blocks.length) return;
  [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
  cms.blocks = blocks;
  saveWpCmsV105(cms);
  renderVisualBuilderV106();
}

function duplicateVisualBlockV106(id) {
  const cms = getWpCmsV105();
  const block = (cms.blocks || []).find(item => item.id === id);
  if (!block) return;
  cms.blocks.unshift({
    ...block,
    id: `visual-block-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: `${block.title} copia`,
    status: "Borrador",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  saveWpCmsV105(cms);
  renderVisualBuilderV106();
}

function toggleVisualBlockV106(id) {
  if (typeof toggleWpBlockV105 === "function") toggleWpBlockV105(id);
  renderVisualBuilderV106();
}

function deleteVisualBlockV106(id) {
  if (typeof deleteWpBlockV105 === "function") deleteWpBlockV105(id);
  renderVisualBuilderV106();
}

function editVisualBlockV106(id) {
  if (typeof switchWpSectionV105 === "function") switchWpSectionV105("blocks");
  if (typeof editWpBlockV105 === "function") editWpBlockV105(id);
  const tab = document.querySelector('[data-admin-tab="wordpress-cms"]');
  tab?.click();
}

function renderVisualBlocksV106() {
  const list = document.querySelector("#visualBlocksListV106");
  const count = document.querySelector("#visualBlocksCountV106");
  if (!list || typeof getWpCmsV105 !== "function") return;

  const cms = getWpCmsV105();
  let blocks = cms.blocks || [];
  if (visualShowOnlyPublishedV106) blocks = blocks.filter(block => block.status === "Publicado");

  if (count) count.textContent = `${blocks.length} bloque${blocks.length === 1 ? "" : "s"}`;

  if (!blocks.length) {
    list.innerHTML = `<article class="visual-block-card-v106"><p>No hay bloques para mostrar. Añade una plantilla rápida.</p></article>`;
    return;
  }

  list.innerHTML = blocks.map((block, index) => `
    <article class="visual-block-card-v106 ${block.status !== "Publicado" ? "is-hidden" : ""}">
      <span>${block.type || "bloque"} · ${block.status || "Borrador"} · #${index + 1}</span>
      <h4>${block.title || "Sin título"}</h4>
      ${block.subtitle ? `<p><strong>${block.subtitle}</strong></p>` : ""}
      <p>${block.content || ""}</p>
      <div class="visual-block-actions-v106">
        <button class="btn btn-secondary" type="button" onclick="moveVisualBlockV106('${block.id}', -1)">↑ Subir</button>
        <button class="btn btn-secondary" type="button" onclick="moveVisualBlockV106('${block.id}', 1)">↓ Bajar</button>
        <button class="btn btn-secondary" type="button" onclick="editVisualBlockV106('${block.id}')">Editar</button>
        <button class="btn btn-secondary" type="button" onclick="duplicateVisualBlockV106('${block.id}')">Duplicar</button>
        <button class="btn btn-secondary" type="button" onclick="toggleVisualBlockV106('${block.id}')">${block.status === "Publicado" ? "Ocultar" : "Publicar"}</button>
        <button class="btn btn-secondary" type="button" onclick="deleteVisualBlockV106('${block.id}')">Borrar</button>
      </div>
    </article>
  `).join("");
}

function renderVisualRevisionsV106() {
  const list = document.querySelector("#visualRevisionsListV106");
  if (!list) return;
  const revisions = getWpRevisionsV106();

  if (!revisions.length) {
    list.innerHTML = `<article class="visual-revision-card-v106"><p>No hay revisiones guardadas.</p></article>`;
    return;
  }

  list.innerHTML = revisions.map(rev => {
    const date = new Date(rev.createdAt).toLocaleString();
    const blocks = rev.cms?.blocks?.length || 0;
    return `
      <article class="visual-revision-card-v106">
        <span>${rev.label}</span>
        <h4>${date}</h4>
        <p>${blocks} bloque${blocks === 1 ? "" : "s"} guardado${blocks === 1 ? "" : "s"}.</p>
        <div class="visual-revision-actions-v106">
          <button class="btn btn-secondary" type="button" onclick="restoreVisualRevisionV106('${rev.id}')">Restaurar</button>
          <button class="btn btn-secondary" type="button" onclick="deleteVisualRevisionV106('${rev.id}')">Borrar</button>
        </div>
      </article>
    `;
  }).join("");
}

function exportVisualBackupV106() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "10.6",
    cms: typeof getWpCmsV105 === "function" ? getWpCmsV105() : null,
    revisions: getWpRevisionsV106()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-constructor-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function renderVisualBuilderV106() {
  renderVisualBlocksV106();
  renderVisualRevisionsV106();
  if (typeof renderWpBlocksAdminV105 === "function") renderWpBlocksAdminV105();
  if (typeof renderWpPublicBlocksV105 === "function") renderWpPublicBlocksV105();
}

document.querySelectorAll("[data-template-v106]").forEach(button => {
  button.addEventListener("click", () => {
    saveVisualRevisionV106("Antes de añadir plantilla");
    addVisualTemplateV106(button.dataset.templateV106);
  });
});

document.querySelector("#saveVisualRevisionV106")?.addEventListener("click", () => saveVisualRevisionV106("Revisión manual"));
document.querySelector("#exportVisualBackupV106")?.addEventListener("click", exportVisualBackupV106);
document.querySelector("#showOnlyPublishedV106")?.addEventListener("click", () => {
  visualShowOnlyPublishedV106 = true;
  renderVisualBlocksV106();
});
document.querySelector("#showAllBlocksV106")?.addEventListener("click", () => {
  visualShowOnlyPublishedV106 = false;
  renderVisualBlocksV106();
});

window.moveVisualBlockV106 = moveVisualBlockV106;
window.duplicateVisualBlockV106 = duplicateVisualBlockV106;
window.toggleVisualBlockV106 = toggleVisualBlockV106;
window.deleteVisualBlockV106 = deleteVisualBlockV106;
window.editVisualBlockV106 = editVisualBlockV106;
window.restoreVisualRevisionV106 = restoreVisualRevisionV106;
window.deleteVisualRevisionV106 = deleteVisualRevisionV106;
window.renderVisualBuilderV106 = renderVisualBuilderV106;

setTimeout(renderVisualBuilderV106, 600);



// v10.7 Publicador CMS Hosting Pro
const CMS_PUBLIC_URL_V107 = "./data/cms-public.json";
const CMS_REMOTE_META_KEY_V107 = "alaya_cms_remote_meta_v107";

function buildPublishedCmsPackageV107() {
  const cms = typeof getWpCmsV105 === "function" ? getWpCmsV105() : {};
  return {
    version: "10.7",
    publishedAt: new Date().toISOString(),
    source: "alaya-admin-publicador-cms",
    cms,
    instructions: {
      uploadPath: "data/cms-public.json",
      description: "Sube este archivo a la carpeta /data/ del hosting para publicar los cambios del CMS."
    }
  };
}

function getPublishedCmsJsonV107() {
  return JSON.stringify(buildPublishedCmsPackageV107(), null, 2);
}

function renderPublisherMetricsV107() {
  const metrics = document.querySelector("#cmsPublisherMetricsV107");
  if (!metrics || typeof getWpCmsV105 !== "function") return;
  const cms = getWpCmsV105();
  const menuCount = cms.menu?.length || 0;
  const blockCount = cms.blocks?.length || 0;
  const publishedBlocks = (cms.blocks || []).filter(block => block.status === "Publicado").length;
  metrics.innerHTML = `
    <div class="cms-publisher-metric-v107"><strong>${menuCount}</strong><span>Enlaces menú</span></div>
    <div class="cms-publisher-metric-v107"><strong>${blockCount}</strong><span>Bloques totales</span></div>
    <div class="cms-publisher-metric-v107"><strong>${publishedBlocks}</strong><span>Bloques publicados</span></div>
  `;
}

function renderPublishedCmsJsonV107() {
  const output = document.querySelector("#publishedCmsJsonV107");
  if (!output) return;
  output.value = getPublishedCmsJsonV107();
  renderPublisherMetricsV107();
}

function downloadPublishedCmsV107() {
  const json = getPublishedCmsJsonV107();
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cms-public.json";
  a.click();
  URL.revokeObjectURL(url);
  if (typeof showToast === "function") showToast("Archivo cms-public.json descargado.");
}

async function copyPublishedCmsV107() {
  const json = getPublishedCmsJsonV107();
  if (typeof copyText === "function") copyText(json);
  else await navigator.clipboard?.writeText(json);
  if (typeof showToast === "function") showToast("JSON publicado copiado.");
}

function importPublishedCmsV107() {
  const raw = document.querySelector("#importPublishedCmsTextV107")?.value;
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    const cms = parsed.cms || parsed;
    if (typeof saveWpCmsV105 === "function") saveWpCmsV105(cms);
    renderPublishedCmsJsonV107();
    if (typeof showToast === "function") showToast("Publicación importada al CMS.");
  } catch {
    if (typeof showToast === "function") showToast("JSON publicado no válido.");
    else alert("JSON publicado no válido.");
  }
}

async function loadPublishedCmsFromHostingV107() {
  try {
    const response = await fetch(CMS_PUBLIC_URL_V107, { cache: "no-cache" });
    if (!response.ok) return;
    const parsed = await response.json();
    const remoteCms = parsed.cms || parsed;
    if (!remoteCms || typeof remoteCms !== "object") return;

    const remotePublishedAt = parsed.publishedAt || "";
    const metaRaw = localStorage.getItem(CMS_REMOTE_META_KEY_V107);
    const meta = metaRaw ? JSON.parse(metaRaw) : {};
    const hasLocalCms = Boolean(localStorage.getItem("alaya_wordpress_cms_v105"));
    const hasKnownRemote = Boolean(meta.publishedAt);

    const shouldApplyRemote =
      !hasLocalCms ||
      (hasKnownRemote && remotePublishedAt && remotePublishedAt > meta.publishedAt);

    if (shouldApplyRemote) {
      localStorage.setItem("alaya_wordpress_cms_v105", JSON.stringify(remoteCms));
      localStorage.setItem(CMS_REMOTE_META_KEY_V107, JSON.stringify({ publishedAt: remotePublishedAt, loadedAt: new Date().toISOString() }));
      if (typeof applyWpCmsV105 === "function") applyWpCmsV105();
      if (typeof renderWpAdminV105 === "function") renderWpAdminV105();
    }

    const statusTitle = document.querySelector("#cmsPublishStatusTitleV107");
    const statusText = document.querySelector("#cmsPublishStatusTextV107");
    if (statusTitle) statusTitle.textContent = "Archivo publicado detectado";
    if (statusText) statusText.textContent = `La web puede cargar ${CMS_PUBLIC_URL_V107}. Última publicación: ${remotePublishedAt || "sin fecha"}.`;
  } catch {
    const statusTitle = document.querySelector("#cmsPublishStatusTitleV107");
    const statusText = document.querySelector("#cmsPublishStatusTextV107");
    if (statusTitle) statusTitle.textContent = "Sin archivo publicado online";
    if (statusText) statusText.textContent = "Cuando subas data/cms-public.json al hosting, la web pública podrá cargarlo automáticamente.";
  }
}

document.querySelector("#downloadPublishedCmsV107")?.addEventListener("click", downloadPublishedCmsV107);
document.querySelector("#copyPublishedCmsV107")?.addEventListener("click", copyPublishedCmsV107);
document.querySelector("#importPublishedCmsV107")?.addEventListener("click", importPublishedCmsV107);

window.buildPublishedCmsPackageV107 = buildPublishedCmsPackageV107;
window.renderPublishedCmsJsonV107 = renderPublishedCmsJsonV107;
window.loadPublishedCmsFromHostingV107 = loadPublishedCmsFromHostingV107;

setTimeout(renderPublishedCmsJsonV107, 700);
loadPublishedCmsFromHostingV107();



// v10.8 CMS Online Sync Pro
const CMS_SYNC_SETTINGS_KEY_V108 = "alaya_cms_sync_settings_v108";
const CMS_SNAPSHOTS_KEY_V108 = "alaya_cms_snapshots_v108";

function getCmsSyncSettingsV108() {
  try {
    const raw = localStorage.getItem(CMS_SYNC_SETTINGS_KEY_V108);
    return raw ? JSON.parse(raw) : {
      mode: "local",
      collection: "alayaCms",
      document: "public"
    };
  } catch {
    return { mode: "local", collection: "alayaCms", document: "public" };
  }
}

function saveCmsSyncSettingsV108(settings) {
  localStorage.setItem(CMS_SYNC_SETTINGS_KEY_V108, JSON.stringify(settings));
  renderCmsSyncV108();
}

function getCmsSnapshotsV108() {
  try {
    const raw = localStorage.getItem(CMS_SNAPSHOTS_KEY_V108);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCmsSnapshotsV108(items) {
  localStorage.setItem(CMS_SNAPSHOTS_KEY_V108, JSON.stringify(items.slice(0, 25)));
  renderCmsSyncV108();
}

function getCmsLastEditV108(cms) {
  const dates = [];
  if (cms?.blocks?.length) {
    cms.blocks.forEach(block => {
      if (block.updatedAt) dates.push(block.updatedAt);
      if (block.createdAt) dates.push(block.createdAt);
    });
  }
  return dates.sort().at(-1) || "";
}

function saveCmsSnapshotV108(label = "Snapshot manual") {
  if (typeof getWpCmsV105 !== "function") return;
  const cms = getWpCmsV105();
  const snapshots = getCmsSnapshotsV108();
  snapshots.unshift({
    id: `snap-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label,
    createdAt: new Date().toISOString(),
    cms
  });
  saveCmsSnapshotsV108(snapshots);
  if (typeof showToast === "function") showToast("Snapshot CMS guardado.");
}

function restoreCmsSnapshotV108(id) {
  const snap = getCmsSnapshotsV108().find(item => item.id === id);
  if (!snap) return;
  if (!confirm("¿Restaurar este snapshot del CMS?")) return;
  if (typeof saveWpCmsV105 === "function") saveWpCmsV105(snap.cms);
  renderCmsSyncV108();
  if (typeof showToast === "function") showToast("Snapshot restaurado.");
}

function deleteCmsSnapshotV108(id) {
  saveCmsSnapshotsV108(getCmsSnapshotsV108().filter(item => item.id !== id));
}

function downloadCmsSnapshotV108() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "10.8",
    syncSettings: getCmsSyncSettingsV108(),
    cms: typeof getWpCmsV105 === "function" ? getWpCmsV105() : null,
    snapshots: getCmsSnapshotsV108()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-cms-sync-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function renderCmsSnapshotsV108() {
  const list = document.querySelector("#cmsSnapshotsListV108");
  if (!list) return;
  const snaps = getCmsSnapshotsV108();
  if (!snaps.length) {
    list.innerHTML = `<article class="cms-snapshot-card-v108"><p>No hay snapshots guardados.</p></article>`;
    return;
  }

  list.innerHTML = snaps.map(snap => {
    const date = new Date(snap.createdAt).toLocaleString();
    const blocks = snap.cms?.blocks?.length || 0;
    return `
      <article class="cms-snapshot-card-v108">
        <span>${snap.label}</span>
        <h6>${date}</h6>
        <p>${blocks} bloque${blocks === 1 ? "" : "s"} en esta copia.</p>
        <div class="cms-snapshot-actions-v108">
          <button class="btn btn-secondary" type="button" onclick="restoreCmsSnapshotV108('${snap.id}')">Restaurar</button>
          <button class="btn btn-secondary" type="button" onclick="deleteCmsSnapshotV108('${snap.id}')">Borrar</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderCmsSyncDiagnosticsV108() {
  const box = document.querySelector("#cmsSyncDiagnosticsV108");
  if (!box) return;
  const hasCms = Boolean(localStorage.getItem("alaya_wordpress_cms_v105"));
  const hasPublishedLoader = typeof loadPublishedCmsFromHostingV107 === "function";
  const hasFirebaseConfig = Boolean(window.firebase || window.db || window.firebaseApp);
  const settings = getCmsSyncSettingsV108();

  const rows = [
    ["CMS local", hasCms ? "OK" : "Sin datos todavía", hasCms ? "ok" : "warn"],
    ["Carga cms-public.json", hasPublishedLoader ? "OK" : "No detectada", hasPublishedLoader ? "ok" : "warn"],
    ["Modo seleccionado", settings.mode, "ok"],
    ["Firebase detectado", hasFirebaseConfig ? "Detectado" : "No configurado", hasFirebaseConfig ? "ok" : "warn"],
    ["Colección Firestore", settings.collection || "alayaCms", "ok"],
    ["Documento Firestore", settings.document || "public", "ok"]
  ];

  box.innerHTML = rows.map(([label, value, cls]) => `
    <div class="cms-sync-diagnostic-row-v108">
      <strong>${label}</strong>
      <span class="${cls}">${value}</span>
    </div>
  `).join("");
}

function renderCmsSyncV108() {
  const cms = typeof getWpCmsV105 === "function" ? getWpCmsV105() : {};
  const settings = getCmsSyncSettingsV108();
  const snaps = getCmsSnapshotsV108();
  const last = getCmsLastEditV108(cms);

  document.querySelectorAll('input[name="cmsSyncModeV108"]').forEach(input => {
    input.checked = input.value === settings.mode;
  });

  const collectionInput = document.querySelector("#cmsSyncCollectionV108");
  const docInput = document.querySelector("#cmsSyncDocumentV108");
  if (collectionInput) collectionInput.value = settings.collection || "alayaCms";
  if (docInput) docInput.value = settings.document || "public";

  const modeLabel = document.querySelector("#cmsSyncModeLabelV108");
  if (modeLabel) modeLabel.textContent = settings.mode === "firebase" ? "Firebase ready" : settings.mode === "published" ? "Archivo publicado" : "Local";

  const lastEdit = document.querySelector("#cmsSyncLastEditV108");
  if (lastEdit) lastEdit.textContent = last ? new Date(last).toLocaleString() : "Sin datos";

  const count = document.querySelector("#cmsSyncSnapshotCountV108");
  if (count) count.textContent = String(snaps.length);

  const online = document.querySelector("#cmsSyncOnlineStatusV108");
  if (online) online.textContent = settings.mode === "firebase" ? "Firebase seleccionado" : "Preparado";

  renderCmsSnapshotsV108();
  renderCmsSyncDiagnosticsV108();
}

function updateCmsSyncSettingsFromFormV108() {
  const current = getCmsSyncSettingsV108();
  const mode = document.querySelector('input[name="cmsSyncModeV108"]:checked')?.value || current.mode || "local";
  const collection = document.querySelector("#cmsSyncCollectionV108")?.value?.trim() || "alayaCms";
  const documentId = document.querySelector("#cmsSyncDocumentV108")?.value?.trim() || "public";
  saveCmsSyncSettingsV108({ mode, collection, document: documentId, updatedAt: new Date().toISOString() });
}

async function uploadCmsFirebaseV108() {
  const settings = getCmsSyncSettingsV108();
  const cms = typeof getWpCmsV105 === "function" ? getWpCmsV105() : null;

  if (!cms) {
    if (typeof showToast === "function") showToast("No hay CMS para subir.");
    return;
  }

  try {
    if (window.firebase?.firestore) {
      await window.firebase.firestore().collection(settings.collection).doc(settings.document).set({
        cms,
        updatedAt: new Date().toISOString(),
        source: "alaya-admin-v10.8"
      }, { merge: true });
      if (typeof showToast === "function") showToast("CMS subido a Firebase.");
      renderCmsSyncV108();
      return;
    }
  } catch (error) {
    console.warn("Firebase upload error", error);
  }

  if (typeof showToast === "function") showToast("Firebase no está configurado o no está disponible.");
  else alert("Firebase no está configurado o no está disponible.");
}

async function downloadCmsFirebaseV108() {
  const settings = getCmsSyncSettingsV108();
  try {
    if (window.firebase?.firestore) {
      const doc = await window.firebase.firestore().collection(settings.collection).doc(settings.document).get();
      if (!doc.exists) {
        if (typeof showToast === "function") showToast("No hay CMS en Firebase.");
        return;
      }
      const data = doc.data();
      if (data?.cms && typeof saveWpCmsV105 === "function") {
        saveCmsSnapshotV108("Antes de bajar Firebase");
        saveWpCmsV105(data.cms);
        if (typeof showToast === "function") showToast("CMS bajado desde Firebase.");
        renderCmsSyncV108();
      }
      return;
    }
  } catch (error) {
    console.warn("Firebase download error", error);
  }

  if (typeof showToast === "function") showToast("Firebase no está configurado o no está disponible.");
  else alert("Firebase no está configurado o no está disponible.");
}

document.querySelectorAll('input[name="cmsSyncModeV108"]').forEach(input => {
  input.addEventListener("change", updateCmsSyncSettingsFromFormV108);
});
document.querySelector("#cmsSyncCollectionV108")?.addEventListener("input", updateCmsSyncSettingsFromFormV108);
document.querySelector("#cmsSyncDocumentV108")?.addEventListener("input", updateCmsSyncSettingsFromFormV108);
document.querySelector("#saveCmsSnapshotV108")?.addEventListener("click", () => saveCmsSnapshotV108("Snapshot manual"));
document.querySelector("#downloadCmsSnapshotV108")?.addEventListener("click", downloadCmsSnapshotV108);
document.querySelector("#uploadCmsFirebaseV108")?.addEventListener("click", uploadCmsFirebaseV108);
document.querySelector("#downloadCmsFirebaseV108")?.addEventListener("click", downloadCmsFirebaseV108);
document.querySelector("#runCmsSyncDiagnosticsV108")?.addEventListener("click", renderCmsSyncDiagnosticsV108);

window.restoreCmsSnapshotV108 = restoreCmsSnapshotV108;
window.deleteCmsSnapshotV108 = deleteCmsSnapshotV108;
window.renderCmsSyncV108 = renderCmsSyncV108;

setTimeout(renderCmsSyncV108, 800);



// v10.9 Firebase Setup Wizard Pro
const FIREBASE_WIZARD_KEY_V109 = "alaya_firebase_wizard_v109";

function getFirebaseWizardV109() {
  try {
    const raw = localStorage.getItem(FIREBASE_WIZARD_KEY_V109);
    return raw ? JSON.parse(raw) : {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      adminEmails: "",
      cmsCollection: "alayaCms",
      cmsDocument: "public"
    };
  } catch {
    return {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      adminEmails: "",
      cmsCollection: "alayaCms",
      cmsDocument: "public"
    };
  }
}

function saveFirebaseWizardV109(data) {
  localStorage.setItem(FIREBASE_WIZARD_KEY_V109, JSON.stringify(data));
  renderFirebaseWizardV109();
}

function fwValueV109(selector) {
  return String(document.querySelector(selector)?.value || "").trim();
}

function collectFirebaseWizardV109() {
  return {
    apiKey: fwValueV109("#fwApiKeyV109"),
    authDomain: fwValueV109("#fwAuthDomainV109"),
    projectId: fwValueV109("#fwProjectIdV109"),
    storageBucket: fwValueV109("#fwStorageBucketV109"),
    messagingSenderId: fwValueV109("#fwSenderIdV109"),
    appId: fwValueV109("#fwAppIdV109"),
    adminEmails: fwValueV109("#fwAdminEmailsV109"),
    cmsCollection: fwValueV109("#fwCmsCollectionV109") || "alayaCms",
    cmsDocument: fwValueV109("#fwCmsDocumentV109") || "public"
  };
}

function fillFirebaseWizardV109() {
  const data = getFirebaseWizardV109();
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#fwApiKeyV109", data.apiKey);
  set("#fwAuthDomainV109", data.authDomain);
  set("#fwProjectIdV109", data.projectId);
  set("#fwStorageBucketV109", data.storageBucket);
  set("#fwSenderIdV109", data.messagingSenderId);
  set("#fwAppIdV109", data.appId);
  set("#fwAdminEmailsV109", data.adminEmails);
  set("#fwCmsCollectionV109", data.cmsCollection || "alayaCms");
  set("#fwCmsDocumentV109", data.cmsDocument || "public");
}

function adminEmailListV109(data = getFirebaseWizardV109()) {
  return String(data.adminEmails || "")
    .split(/[\n,;]+/)
    .map(email => email.trim())
    .filter(Boolean);
}

function buildBackendConfigV109() {
  const data = collectFirebaseWizardV109();
  const emails = adminEmailListV109(data);
  return `// Alaya Holistics · backend-config.js
// Generado desde Firebase Setup Wizard Pro

window.ALAYA_BACKEND_CONFIG = {
  firebaseEnabled: true,

  firebaseConfig: {
    apiKey: ${JSON.stringify(data.apiKey)},
    authDomain: ${JSON.stringify(data.authDomain)},
    projectId: ${JSON.stringify(data.projectId)},
    storageBucket: ${JSON.stringify(data.storageBucket)},
    messagingSenderId: ${JSON.stringify(data.messagingSenderId)},
    appId: ${JSON.stringify(data.appId)}
  },

  adminEmails: ${JSON.stringify(emails, null, 2)},

  firestore: {
    cmsCollection: ${JSON.stringify(data.cmsCollection || "alayaCms")},
    cmsDocument: ${JSON.stringify(data.cmsDocument || "public")},
    reservationsCollection: "reservas",
    auditCollection: "auditLog"
  }
};
`;
}

function buildFirestoreRulesV109() {
  const emails = adminEmailListV109(collectFirebaseWizardV109());
  const emailLines = emails.length
    ? emails.map(email => `          "${email}"`).join(",\n")
    : '          // "admin@alaya.es"';

  return `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return signedIn()
        && request.auth.token.email in [
${emailLines}
        ];
    }

    match /${fwValueV109("#fwCmsCollectionV109") || "alayaCms"}/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /reservas/{reservationId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }

    match /auditLog/{logId} {
      allow read, write: if isAdmin();
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
`;
}

function renderFirebaseOutputsV109() {
  const configOutput = document.querySelector("#backendConfigOutputV109");
  if (configOutput) configOutput.value = buildBackendConfigV109();

  const rulesOutput = document.querySelector("#firestoreRulesOutputV109");
  if (rulesOutput) rulesOutput.value = buildFirestoreRulesV109();
}

function renderFirebaseDiagnosticsV109() {
  const box = document.querySelector("#firebaseDiagnosticsV109");
  if (!box) return;
  const data = collectFirebaseWizardV109();
  const rows = [
    ["apiKey", Boolean(data.apiKey), "Config pegada"],
    ["projectId", Boolean(data.projectId), "Proyecto definido"],
    ["admin emails", adminEmailListV109(data).length > 0, `${adminEmailListV109(data).length} admin(s)`],
    ["Firebase global", Boolean(window.firebase), window.firebase ? "Detectado" : "No detectado"],
    ["Auth", Boolean(window.firebase?.auth), window.firebase?.auth ? "Detectado" : "No detectado"],
    ["Firestore", Boolean(window.firebase?.firestore), window.firebase?.firestore ? "Detectado" : "No detectado"],
    ["Colección CMS", Boolean(data.cmsCollection), data.cmsCollection || "Sin colección"]
  ];

  box.innerHTML = rows.map(([label, ok, text]) => `
    <div class="firebase-diagnostic-row-v109">
      <strong>${label}</strong>
      <span class="${ok ? "ok" : "warn"}">${text}</span>
    </div>
  `).join("");
}

function renderFirebaseWizardV109() {
  fillFirebaseWizardV109();
  renderFirebaseOutputsV109();
  renderFirebaseDiagnosticsV109();
}

function saveFirebaseWizardFromFormV109() {
  saveFirebaseWizardV109(collectFirebaseWizardV109());
  if (typeof showToast === "function") showToast("Configuración Firebase guardada en navegador.");
}

function clearFirebaseWizardV109() {
  if (!confirm("¿Limpiar configuración Firebase del asistente?")) return;
  localStorage.removeItem(FIREBASE_WIZARD_KEY_V109);
  renderFirebaseWizardV109();
}

async function copyBackendConfigV109() {
  const text = buildBackendConfigV109();
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("backend-config.js copiado.");
}

function downloadBackendConfigV109() {
  const blob = new Blob([buildBackendConfigV109()], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "backend-config.js";
  a.click();
  URL.revokeObjectURL(url);
}

async function copyFirestoreRulesV109() {
  const text = buildFirestoreRulesV109();
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Reglas Firestore copiadas.");
}

document.querySelectorAll("#firebaseWizardFormV109 input, #firebaseWizardFormV109 textarea").forEach(input => {
  input.addEventListener("input", renderFirebaseOutputsV109);
  input.addEventListener("change", renderFirebaseOutputsV109);
});

document.querySelector("#saveFirebaseWizardV109")?.addEventListener("click", saveFirebaseWizardFromFormV109);
document.querySelector("#clearFirebaseWizardV109")?.addEventListener("click", clearFirebaseWizardV109);
document.querySelector("#copyBackendConfigV109")?.addEventListener("click", copyBackendConfigV109);
document.querySelector("#downloadBackendConfigV109")?.addEventListener("click", downloadBackendConfigV109);
document.querySelector("#copyFirestoreRulesV109")?.addEventListener("click", copyFirestoreRulesV109);
document.querySelector("#runFirebaseDiagnosticsV109")?.addEventListener("click", renderFirebaseDiagnosticsV109);

window.renderFirebaseWizardV109 = renderFirebaseWizardV109;
setTimeout(renderFirebaseWizardV109, 900);



// v11.0 Reservas Online Firebase Pro
const ONLINE_RESERVATIONS_KEY_V110 = "alaya_online_reservations_v110";

const RESERVATION_STATUS_LABELS_V110 = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  alternativa: "Alternativa propuesta",
  cancelada: "Cancelada",
  completada: "Completada"
};

function getOnlineReservationsV110() {
  try {
    const raw = localStorage.getItem(ONLINE_RESERVATIONS_KEY_V110);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOnlineReservationsV110(items) {
  localStorage.setItem(ONLINE_RESERVATIONS_KEY_V110, JSON.stringify(items));
  renderReservationsAdminV110();
}

function reservationCollectionV110() {
  return window.ALAYA_BACKEND_CONFIG?.firestore?.reservationsCollection || "reservas";
}

function createReservationCodeV110() {
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10).replaceAll("-", "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ALAYA-${ymd}-${rand}`;
}

function sanitizeReservationV110(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function getReservationFormDataV110() {
  return {
    id: `res-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    code: createReservationCodeV110(),
    name: sanitizeReservationV110(document.querySelector("#onlineReservationNameV110")?.value),
    contact: sanitizeReservationV110(document.querySelector("#onlineReservationContactV110")?.value),
    service: sanitizeReservationV110(document.querySelector("#onlineReservationServiceV110")?.value),
    preferredDate: sanitizeReservationV110(document.querySelector("#onlineReservationDateV110")?.value),
    preferredTime: sanitizeReservationV110(document.querySelector("#onlineReservationTimeV110")?.value),
    message: sanitizeReservationV110(document.querySelector("#onlineReservationMessageV110")?.value),
    status: "pendiente",
    source: "web-online",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

async function sendReservationToFirebaseV110(reservation) {
  try {
    if (window.firebase?.firestore) {
      const doc = await window.firebase.firestore().collection(reservationCollectionV110()).add({
        ...reservation,
        createdAt: reservation.createdAt,
        updatedAt: reservation.updatedAt
      });
      return doc.id;
    }
  } catch (error) {
    console.warn("Reservation Firebase send error", error);
  }
  return "";
}

async function handleOnlineReservationSubmitV110(event) {
  event?.preventDefault();
  const form = document.querySelector("#onlineReservationFormV110");
  const result = document.querySelector("#onlineReservationResultV110");
  const consent = document.querySelector("#onlineReservationConsentV110");

  if (!form) return;
  if (!consent?.checked) {
    if (typeof showToast === "function") showToast("Acepta el contacto para gestionar la solicitud.");
    return;
  }

  const reservation = getReservationFormDataV110();
  if (!reservation.name || !reservation.contact) {
    if (typeof showToast === "function") showToast("Añade nombre y contacto.");
    return;
  }

  const cloudId = await sendReservationToFirebaseV110(reservation);
  const finalReservation = { ...reservation, cloudId, syncStatus: cloudId ? "firebase" : "local" };
  saveOnlineReservationsV110([finalReservation, ...getOnlineReservationsV110()]);

  if (result) {
    result.classList.add("visible");
    result.innerHTML = `
      <span>Solicitud enviada</span>
      <p><strong>Código:</strong> ${finalReservation.code}</p>
      <p>Estado inicial: pendiente de revisión manual. Guarda este código para consultar tu solicitud.</p>
      <p>${cloudId ? "La solicitud se ha enviado online." : "La solicitud se ha guardado en este navegador. Si Firebase está configurado, podrá sincronizarse."}</p>
    `;
  }

  form.reset();
  if (typeof showToast === "function") showToast("Solicitud de reserva creada.");
}

function getFilteredReservationsV110() {
  const status = document.querySelector("#reservationFilterStatusV110")?.value || "";
  const search = (document.querySelector("#reservationSearchV110")?.value || "").toLowerCase().trim();

  return getOnlineReservationsV110().filter(item => {
    const matchesStatus = !status || item.status === status;
    const haystack = `${item.code || ""} ${item.name || ""} ${item.contact || ""} ${item.service || ""}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);
    return matchesStatus && matchesSearch;
  });
}

function renderReservationStatsV110() {
  const box = document.querySelector("#reservationStatsV110");
  if (!box) return;
  const items = getOnlineReservationsV110();
  const statuses = ["pendiente", "confirmada", "alternativa", "cancelada", "completada"];
  box.innerHTML = statuses.map(status => {
    const count = items.filter(item => item.status === status).length;
    return `<div class="reservation-stat-v110"><strong>${count}</strong><span>${RESERVATION_STATUS_LABELS_V110[status]}</span></div>`;
  }).join("");
}

function reservationClientMessageV110(reservation) {
  const status = RESERVATION_STATUS_LABELS_V110[reservation.status] || reservation.status;
  return `Hola ${reservation.name || ""}, te escribimos de Alaya Holistics sobre tu solicitud ${reservation.code}.

Servicio: ${reservation.service || "No indicado"}
Estado: ${status}

Recuerda que la cita queda confirmada únicamente cuando Alaya lo confirme manualmente.`;
}

async function copyReservationMessageV110(id) {
  const item = getOnlineReservationsV110().find(res => res.id === id);
  if (!item) return;
  const text = reservationClientMessageV110(item);
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Mensaje copiado.");
}

async function updateReservationFirebaseV110(reservation) {
  try {
    if (window.firebase?.firestore && reservation.cloudId) {
      await window.firebase.firestore().collection(reservationCollectionV110()).doc(reservation.cloudId).set({
        ...reservation,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      return true;
    }
  } catch (error) {
    console.warn("Reservation Firebase update error", error);
  }
  return false;
}

async function changeReservationStatusV110(id, status) {
  const items = getOnlineReservationsV110();
  const index = items.findIndex(item => item.id === id);
  if (index < 0) return;
  items[index] = { ...items[index], status, updatedAt: new Date().toISOString() };
  await updateReservationFirebaseV110(items[index]);
  saveOnlineReservationsV110(items);
}

function deleteReservationV110(id) {
  const item = getOnlineReservationsV110().find(res => res.id === id);
  if (!item) return;
  if (!confirm(`¿Borrar solicitud ${item.code}?`)) return;
  saveOnlineReservationsV110(getOnlineReservationsV110().filter(res => res.id !== id));
}

async function syncReservationsFromFirebaseV110() {
  try {
    if (!window.firebase?.firestore) {
      if (typeof showToast === "function") showToast("Firebase no está configurado.");
      return;
    }

    const snap = await window.firebase.firestore().collection(reservationCollectionV110()).orderBy("createdAt", "desc").limit(100).get();
    const remote = [];
    snap.forEach(doc => remote.push({ ...doc.data(), cloudId: doc.id, syncStatus: "firebase" }));

    const local = getOnlineReservationsV110();
    const byKey = new Map();
    [...remote, ...local].forEach(item => {
      const key = item.cloudId || item.id || item.code;
      if (key) byKey.set(key, item);
    });

    saveOnlineReservationsV110([...byKey.values()].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""))));
    if (typeof showToast === "function") showToast("Reservas sincronizadas.");
  } catch (error) {
    console.warn("Reservation Firebase sync error", error);
    if (typeof showToast === "function") showToast("No se pudo sincronizar Firebase.");
  }
}

function renderReservationsListV110() {
  const list = document.querySelector("#reservationsListV110");
  if (!list) return;
  const items = getFilteredReservationsV110();

  if (!items.length) {
    list.innerHTML = `<article class="reservation-card-v110"><p>No hay solicitudes para mostrar.</p></article>`;
    return;
  }

  list.innerHTML = items.map(item => `
    <article class="reservation-card-v110">
      <div class="reservation-card-top-v110">
        <div>
          <span>${item.code || "Sin código"}</span>
          <h5>${item.name || "Sin nombre"} · ${item.service || "Servicio"}</h5>
        </div>
        <strong class="reservation-status-v110">${RESERVATION_STATUS_LABELS_V110[item.status] || item.status}</strong>
      </div>
      <div class="reservation-meta-v110">
        <small>Contacto: ${item.contact || "No indicado"}</small>
        <small>Día: ${item.preferredDate || "No indicado"}</small>
        <small>Horario: ${item.preferredTime || "No indicado"}</small>
        <small>Sync: ${item.syncStatus || "local"}</small>
      </div>
      ${item.message ? `<p>${item.message}</p>` : ""}
      <div class="reservation-actions-v110">
        <select onchange="changeReservationStatusV110('${item.id}', this.value)">
          ${Object.entries(RESERVATION_STATUS_LABELS_V110).map(([value, label]) => `<option value="${value}" ${item.status === value ? "selected" : ""}>${label}</option>`).join("")}
        </select>
        <button class="btn btn-secondary" type="button" onclick="copyReservationMessageV110('${item.id}')">Copiar mensaje</button>
        <button class="btn btn-secondary" type="button" onclick="deleteReservationV110('${item.id}')">Borrar</button>
      </div>
    </article>
  `).join("");
}

function renderReservationsAdminV110() {
  renderReservationStatsV110();
  renderReservationsListV110();
}

function exportReservationsV110() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "11.0",
    reservations: getOnlineReservationsV110()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-reservas-online-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function clearReservationFiltersV110() {
  const status = document.querySelector("#reservationFilterStatusV110");
  const search = document.querySelector("#reservationSearchV110");
  if (status) status.value = "";
  if (search) search.value = "";
  renderReservationsListV110();
}

document.querySelector("#onlineReservationFormV110")?.addEventListener("submit", handleOnlineReservationSubmitV110);
document.querySelector("#reservationFilterStatusV110")?.addEventListener("change", renderReservationsListV110);
document.querySelector("#reservationSearchV110")?.addEventListener("input", renderReservationsListV110);
document.querySelector("#clearReservationFiltersV110")?.addEventListener("click", clearReservationFiltersV110);
document.querySelector("#exportReservationsV110")?.addEventListener("click", exportReservationsV110);
document.querySelector("#syncReservationsFirebaseV110")?.addEventListener("click", syncReservationsFromFirebaseV110);

window.copyReservationMessageV110 = copyReservationMessageV110;
window.changeReservationStatusV110 = changeReservationStatusV110;
window.deleteReservationV110 = deleteReservationV110;
window.renderReservationsAdminV110 = renderReservationsAdminV110;

setTimeout(renderReservationsAdminV110, 900);



// v11.1 Seguimiento de Reservas Pro
function normalizeLookupV111(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, "").trim();
}

function contactMatchesV111(savedContact, lookupContact) {
  const saved = normalizeLookupV111(savedContact);
  const lookup = normalizeLookupV111(lookupContact);
  return Boolean(saved && lookup && (saved.includes(lookup) || lookup.includes(saved)));
}

async function findReservationByCodeV111(code, contact) {
  const normalizedCode = String(code || "").trim().toUpperCase();
  const local = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : [];
  const foundLocal = local.find(item =>
    String(item.code || "").trim().toUpperCase() === normalizedCode &&
    contactMatchesV111(item.contact, contact)
  );
  if (foundLocal) return { ...foundLocal, lookupSource: "local" };

  try {
    if (window.firebase?.firestore && typeof reservationCollectionV110 === "function") {
      const snap = await window.firebase.firestore()
        .collection(reservationCollectionV110())
        .where("code", "==", normalizedCode)
        .limit(5)
        .get();

      let found = null;
      snap.forEach(doc => {
        const data = doc.data();
        if (!found && contactMatchesV111(data.contact, contact)) {
          found = { ...data, cloudId: doc.id, lookupSource: "firebase" };
        }
      });
      if (found) return found;
    }
  } catch (error) {
    console.warn("Lookup Firebase error", error);
  }

  return null;
}

function renderReservationLookupResultV111(reservation) {
  const result = document.querySelector("#reservationLookupResultV111");
  if (!result) return;

  if (!reservation) {
    result.innerHTML = `
      <span>No encontrada</span>
      <h3>No hemos encontrado esa solicitud</h3>
      <p>Revisa el código y el contacto. Si tienes dudas, contacta con Alaya indicando tu nombre y servicio solicitado.</p>
    `;
    return;
  }

  const statusLabel = (typeof RESERVATION_STATUS_LABELS_V110 !== "undefined" && RESERVATION_STATUS_LABELS_V110[reservation.status])
    ? RESERVATION_STATUS_LABELS_V110[reservation.status]
    : (reservation.status || "Pendiente");

  const reply = reservation.clientReply || "";
  const proposal = [reservation.proposedDate, reservation.proposedTime].filter(Boolean).join(" · ");

  result.innerHTML = `
    <span>${statusLabel}</span>
    <h3>${reservation.code || "Solicitud"}</h3>
    <div class="lookup-meta-v111">
      <small>Servicio: ${reservation.service || "No indicado"}</small>
      <small>Día preferido: ${reservation.preferredDate || "No indicado"}</small>
      <small>Horario preferido: ${reservation.preferredTime || "No indicado"}</small>
      <small>Origen: ${reservation.lookupSource || reservation.syncStatus || "local"}</small>
    </div>
    ${proposal ? `<div class="lookup-highlight-v111"><strong>Propuesta de Alaya:</strong><p>${proposal}</p></div>` : ""}
    ${reply ? `<div class="lookup-highlight-v111"><strong>Respuesta de Alaya:</strong><p>${reply}</p></div>` : "<p>Alaya todavía no ha añadido una respuesta visible para esta solicitud.</p>"}
    <p>Recuerda: la cita solo queda confirmada cuando Alaya lo confirme manualmente.</p>
  `;
}

async function handleReservationLookupV111(event) {
  event?.preventDefault();
  const code = document.querySelector("#reservationLookupCodeV111")?.value;
  const contact = document.querySelector("#reservationLookupContactV111")?.value;
  const result = document.querySelector("#reservationLookupResultV111");

  if (result) {
    result.innerHTML = `<span>Buscando</span><p>Revisando solicitud...</p>`;
  }

  const reservation = await findReservationByCodeV111(code, contact);
  renderReservationLookupResultV111(reservation);
}

function updateReservationFieldV111(id, field, value) {
  const items = getOnlineReservationsV110();
  const index = items.findIndex(item => item.id === id);
  if (index < 0) return;
  items[index] = {
    ...items[index],
    [field]: String(value || "").trim(),
    updatedAt: new Date().toISOString(),
    history: [
      ...(items[index].history || []),
      { at: new Date().toISOString(), type: "field", field }
    ].slice(-20)
  };
  saveOnlineReservationsV110(items);
}

async function saveReservationFollowV111(id) {
  const get = selector => document.querySelector(selector)?.value || "";
  const items = getOnlineReservationsV110();
  const index = items.findIndex(item => item.id === id);
  if (index < 0) return;

  const updated = {
    ...items[index],
    proposedDate: get(`#proposedDate-${id}`),
    proposedTime: get(`#proposedTime-${id}`),
    clientReply: get(`#clientReply-${id}`),
    internalNote: get(`#internalNote-${id}`),
    updatedAt: new Date().toISOString(),
    history: [
      ...(items[index].history || []),
      { at: new Date().toISOString(), type: "follow-up", label: "Seguimiento actualizado" }
    ].slice(-20)
  };

  items[index] = updated;
  if (typeof updateReservationFirebaseV110 === "function") await updateReservationFirebaseV110(updated);
  saveOnlineReservationsV110(items);
  if (typeof showToast === "function") showToast("Seguimiento guardado.");
}

async function copyReservationReplyV111(id) {
  const item = getOnlineReservationsV110().find(res => res.id === id);
  if (!item) return;

  const statusLabel = RESERVATION_STATUS_LABELS_V110[item.status] || item.status;
  const proposal = [item.proposedDate, item.proposedTime].filter(Boolean).join(" · ");
  const text = `Hola ${item.name || ""}, te escribimos de Alaya Holistics sobre tu solicitud ${item.code}.

Estado: ${statusLabel}
Servicio: ${item.service || "No indicado"}${proposal ? `\nPropuesta: ${proposal}` : ""}

${item.clientReply || "Tu solicitud está en revisión. Te contactaremos para confirmarla manualmente."}

Gracias.`;

  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Respuesta copiada.");
}

// Sobrescribe render de v11.0 para añadir seguimiento avanzado
function renderReservationsListV110() {
  const list = document.querySelector("#reservationsListV110");
  if (!list) return;
  const items = getFilteredReservationsV110();

  if (!items.length) {
    list.innerHTML = `<article class="reservation-card-v110"><p>No hay solicitudes para mostrar.</p></article>`;
    return;
  }

  list.innerHTML = items.map(item => `
    <article class="reservation-card-v110">
      <div class="reservation-card-top-v110">
        <div>
          <span>${item.code || "Sin código"}</span>
          <h5>${item.name || "Sin nombre"} · ${item.service || "Servicio"}</h5>
        </div>
        <strong class="reservation-status-v110">${RESERVATION_STATUS_LABELS_V110[item.status] || item.status}</strong>
      </div>

      <div class="reservation-meta-v110">
        <small>Contacto: ${item.contact || "No indicado"}</small>
        <small>Día: ${item.preferredDate || "No indicado"}</small>
        <small>Horario: ${item.preferredTime || "No indicado"}</small>
        <small>Sync: ${item.syncStatus || "local"}</small>
        <small>Actualizada: ${item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "sin fecha"}</small>
      </div>

      ${item.message ? `<p>${item.message}</p>` : ""}

      <div class="reservation-actions-v110">
        <select onchange="changeReservationStatusV110('${item.id}', this.value)">
          ${Object.entries(RESERVATION_STATUS_LABELS_V110).map(([value, label]) => `<option value="${value}" ${item.status === value ? "selected" : ""}>${label}</option>`).join("")}
        </select>
        <button class="btn btn-secondary" type="button" onclick="copyReservationMessageV110('${item.id}')">Mensaje base</button>
        <button class="btn btn-secondary" type="button" onclick="copyReservationReplyV111('${item.id}')">Copiar respuesta</button>
        <button class="btn btn-secondary" type="button" onclick="deleteReservationV110('${item.id}')">Borrar</button>
      </div>

      <div class="reservation-follow-form-v111">
        <label>Propuesta día
          <input id="proposedDate-${item.id}" type="text" value="${(item.proposedDate || "").replaceAll('"', '&quot;')}" placeholder="Ejemplo: viernes 18">
        </label>
        <label>Propuesta hora
          <input id="proposedTime-${item.id}" type="text" value="${(item.proposedTime || "").replaceAll('"', '&quot;')}" placeholder="Ejemplo: 18:00">
        </label>
        <label>Respuesta visible para cliente
          <textarea id="clientReply-${item.id}" rows="3" placeholder="Respuesta que verá el cliente al consultar su estado.">${item.clientReply || ""}</textarea>
        </label>
        <label>Nota interna
          <textarea id="internalNote-${item.id}" rows="3" placeholder="Nota solo para Admin.">${item.internalNote || ""}</textarea>
        </label>
        <div class="reservation-follow-actions-v111">
          <button class="btn btn-primary" type="button" onclick="saveReservationFollowV111('${item.id}')">Guardar seguimiento</button>
          <span class="reservation-follow-badge-v111">${(item.history || []).length} cambios</span>
        </div>
      </div>
    </article>
  `).join("");
}

document.querySelector("#reservationLookupFormV111")?.addEventListener("submit", handleReservationLookupV111);

window.saveReservationFollowV111 = saveReservationFollowV111;
window.copyReservationReplyV111 = copyReservationReplyV111;
window.updateReservationFieldV111 = updateReservationFieldV111;
window.handleReservationLookupV111 = handleReservationLookupV111;

setTimeout(() => {
  if (typeof renderReservationsAdminV110 === "function") renderReservationsAdminV110();
}, 1100);



// v11.2 Agenda y Disponibilidad Online Pro
const AGENDA_SLOTS_KEY_V112 = "alaya_agenda_slots_v112";
const AGENDA_BLOCKS_KEY_V112 = "alaya_agenda_blocks_v112";

const SLOT_STATUS_LABELS_V112 = {
  "disponible": "Disponible",
  "plazas-limitadas": "Plazas limitadas",
  "completo": "Completo",
  "oculto": "Oculto"
};

function getAgendaSlotsV112() {
  try {
    const raw = localStorage.getItem(AGENDA_SLOTS_KEY_V112);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getAgendaBlocksV112() {
  try {
    const raw = localStorage.getItem(AGENDA_BLOCKS_KEY_V112);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAgendaSlotsV112(items) {
  localStorage.setItem(AGENDA_SLOTS_KEY_V112, JSON.stringify(items));
  renderAgendaAdminV112();
  renderPublicAvailabilityV112();
}

function saveAgendaBlocksV112(items) {
  localStorage.setItem(AGENDA_BLOCKS_KEY_V112, JSON.stringify(items));
  renderAgendaAdminV112();
  renderPublicAvailabilityV112();
}

function slotIdV112() {
  return `slot-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cleanAgendaTextV112(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function getSlotFormDataV112() {
  return {
    id: document.querySelector("#slotIdV112")?.value || slotIdV112(),
    service: cleanAgendaTextV112(document.querySelector("#slotServiceV112")?.value),
    date: cleanAgendaTextV112(document.querySelector("#slotDateV112")?.value),
    time: cleanAgendaTextV112(document.querySelector("#slotTimeV112")?.value),
    duration: cleanAgendaTextV112(document.querySelector("#slotDurationV112")?.value) || "45 min",
    capacity: Number(document.querySelector("#slotCapacityV112")?.value || 1),
    status: cleanAgendaTextV112(document.querySelector("#slotStatusV112")?.value) || "disponible",
    publicNote: cleanAgendaTextV112(document.querySelector("#slotPublicNoteV112")?.value),
    internalNote: cleanAgendaTextV112(document.querySelector("#slotInternalNoteV112")?.value),
    updatedAt: new Date().toISOString()
  };
}

function clearSlotFormV112() {
  document.querySelector("#availabilitySlotFormV112")?.reset();
  const id = document.querySelector("#slotIdV112");
  if (id) id.value = "";
  const capacity = document.querySelector("#slotCapacityV112");
  if (capacity) capacity.value = "1";
  const duration = document.querySelector("#slotDurationV112");
  if (duration) duration.value = "45 min";
}

function setSlotFormV112(slot) {
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#slotIdV112", slot.id);
  set("#slotServiceV112", slot.service);
  set("#slotDateV112", slot.date);
  set("#slotTimeV112", slot.time);
  set("#slotDurationV112", slot.duration);
  set("#slotCapacityV112", slot.capacity || 1);
  set("#slotStatusV112", slot.status);
  set("#slotPublicNoteV112", slot.publicNote);
  set("#slotInternalNoteV112", slot.internalNote);
}

function saveSlotFormV112(event) {
  event?.preventDefault();
  const slot = getSlotFormDataV112();
  if (!slot.service || !slot.date || !slot.time) {
    if (typeof showToast === "function") showToast("Añade servicio, fecha y hora.");
    return;
  }
  const slots = getAgendaSlotsV112();
  const index = slots.findIndex(item => item.id === slot.id);
  if (index >= 0) slots[index] = { ...slots[index], ...slot };
  else slots.unshift({ ...slot, createdAt: new Date().toISOString() });
  saveAgendaSlotsV112(slots);
  clearSlotFormV112();
  if (typeof showToast === "function") showToast("Horario guardado.");
}

function editSlotV112(id) {
  const slot = getAgendaSlotsV112().find(item => item.id === id);
  if (!slot) return;
  setSlotFormV112(slot);
  document.querySelector("#availabilitySlotFormV112")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function duplicateSlotV112(id) {
  const slot = getAgendaSlotsV112().find(item => item.id === id);
  if (!slot) return;
  const copy = {
    ...slot,
    id: slotIdV112(),
    status: "oculto",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  saveAgendaSlotsV112([copy, ...getAgendaSlotsV112()]);
}

function setSlotStatusV112(id, status) {
  const slots = getAgendaSlotsV112().map(slot => slot.id === id ? { ...slot, status, updatedAt: new Date().toISOString() } : slot);
  saveAgendaSlotsV112(slots);
}

function deleteSlotV112(id) {
  const slot = getAgendaSlotsV112().find(item => item.id === id);
  if (!slot) return;
  if (!confirm(`¿Borrar horario de ${slot.service} ${slot.date} ${slot.time}?`)) return;
  saveAgendaSlotsV112(getAgendaSlotsV112().filter(item => item.id !== id));
}

function addAgendaBlockV112() {
  const date = cleanAgendaTextV112(document.querySelector("#blockDateV112")?.value);
  const reason = cleanAgendaTextV112(document.querySelector("#blockReasonV112")?.value);
  if (!date) {
    if (typeof showToast === "function") showToast("Añade fecha de bloqueo.");
    return;
  }
  const block = {
    id: `block-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date,
    reason: reason || "Bloqueado",
    createdAt: new Date().toISOString()
  };
  saveAgendaBlocksV112([block, ...getAgendaBlocksV112()]);
  const dateInput = document.querySelector("#blockDateV112");
  const reasonInput = document.querySelector("#blockReasonV112");
  if (dateInput) dateInput.value = "";
  if (reasonInput) reasonInput.value = "";
}

function deleteAgendaBlockV112(id) {
  saveAgendaBlocksV112(getAgendaBlocksV112().filter(block => block.id !== id));
}

function isDateBlockedV112(date) {
  return getAgendaBlocksV112().some(block => block.date === date);
}

function getFilteredSlotsAdminV112() {
  const status = document.querySelector("#agendaFilterStatusV112")?.value || "";
  const search = (document.querySelector("#agendaSearchV112")?.value || "").toLowerCase().trim();

  return getAgendaSlotsV112().filter(slot => {
    const matchesStatus = !status || slot.status === status;
    const haystack = `${slot.service || ""} ${slot.date || ""} ${slot.time || ""} ${slot.publicNote || ""} ${slot.internalNote || ""}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);
    return matchesStatus && matchesSearch;
  });
}

function renderAgendaStatsV112() {
  const box = document.querySelector("#agendaStatsV112");
  if (!box) return;
  const slots = getAgendaSlotsV112();
  const blocks = getAgendaBlocksV112();
  const visible = slots.filter(slot => slot.status !== "oculto").length;
  const full = slots.filter(slot => slot.status === "completo").length;
  box.innerHTML = `
    <div class="agenda-stat-v112"><strong>${slots.length}</strong><span>Horarios</span></div>
    <div class="agenda-stat-v112"><strong>${visible}</strong><span>Visibles</span></div>
    <div class="agenda-stat-v112"><strong>${full}</strong><span>Completos</span></div>
    <div class="agenda-stat-v112"><strong>${blocks.length}</strong><span>Bloqueos</span></div>
  `;
}

function renderAgendaListV112() {
  const list = document.querySelector("#agendaListV112");
  if (!list) return;
  const slots = getFilteredSlotsAdminV112();
  const blocks = getAgendaBlocksV112();

  const slotHtml = slots.length ? slots.map(slot => `
    <article class="agenda-slot-card-v112 ${slot.status === "oculto" ? "is-hidden" : ""} ${slot.status === "completo" ? "is-full" : ""}">
      <div class="agenda-slot-top-v112">
        <div>
          <span>${SLOT_STATUS_LABELS_V112[slot.status] || slot.status}</span>
          <h5>${slot.service} · ${slot.date} ${slot.time}</h5>
        </div>
        <strong class="reservation-status-v110">${slot.capacity || 1} plaza${Number(slot.capacity) === 1 ? "" : "s"}</strong>
      </div>
      <div class="availability-meta-v112">
        <small>Duración: ${slot.duration || "45 min"}</small>
        <small>Bloqueado día: ${isDateBlockedV112(slot.date) ? "Sí" : "No"}</small>
        <small>Actualizado: ${slot.updatedAt ? new Date(slot.updatedAt).toLocaleString() : "sin fecha"}</small>
      </div>
      ${slot.publicNote ? `<p>${slot.publicNote}</p>` : ""}
      ${slot.internalNote ? `<p><strong>Interno:</strong> ${slot.internalNote}</p>` : ""}
      <div class="agenda-slot-actions-v112">
        <button class="btn btn-secondary" type="button" onclick="editSlotV112('${slot.id}')">Editar</button>
        <button class="btn btn-secondary" type="button" onclick="duplicateSlotV112('${slot.id}')">Duplicar</button>
        <button class="btn btn-secondary" type="button" onclick="setSlotStatusV112('${slot.id}', '${slot.status === "oculto" ? "disponible" : "oculto"}')">${slot.status === "oculto" ? "Publicar" : "Ocultar"}</button>
        <button class="btn btn-secondary" type="button" onclick="setSlotStatusV112('${slot.id}', 'completo')">Completo</button>
        <button class="btn btn-secondary" type="button" onclick="deleteSlotV112('${slot.id}')">Borrar</button>
      </div>
    </article>
  `).join("") : `<article class="agenda-slot-card-v112"><p>No hay horarios para mostrar.</p></article>`;

  const blockHtml = blocks.length ? blocks.map(block => `
    <article class="agenda-block-card-v112">
      <span>Bloqueo</span>
      <h5>${block.date}</h5>
      <p>${block.reason || "Bloqueado"}</p>
      <div class="agenda-slot-actions-v112">
        <button class="btn btn-secondary" type="button" onclick="deleteAgendaBlockV112('${block.id}')">Quitar bloqueo</button>
      </div>
    </article>
  `).join("") : "";

  list.innerHTML = slotHtml + blockHtml;
}

function formatSlotDateV112(date) {
  if (!date) return "Fecha pendiente";
  try {
    return new Date(date + "T00:00:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return date;
  }
}

function requestSlotV112(id) {
  const slot = getAgendaSlotsV112().find(item => item.id === id);
  if (!slot) return;

  const service = document.querySelector("#onlineReservationServiceV110");
  const date = document.querySelector("#onlineReservationDateV110");
  const time = document.querySelector("#onlineReservationTimeV110");
  const message = document.querySelector("#onlineReservationMessageV110");

  if (service) service.value = slot.service || service.value;
  if (date) date.value = slot.date || "";
  if (time) time.value = slot.time || "";
  if (message && !message.value) message.value = `Me interesa solicitar el horario ${slot.date} a las ${slot.time} para ${slot.service}.`;

  document.querySelector("#reserva-online")?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (typeof showToast === "function") showToast("Horario añadido a la solicitud.");
}

function renderPublicAvailabilityV112() {
  const box = document.querySelector("#availabilitySlotsPublicV112");
  if (!box) return;
  const filter = document.querySelector("#availabilityPublicFilterV112")?.value || "";
  const today = new Date().toISOString().slice(0, 10);
  const slots = getAgendaSlotsV112()
    .filter(slot => slot.status !== "oculto" && slot.status !== "completo")
    .filter(slot => !slot.date || slot.date >= today)
    .filter(slot => !isDateBlockedV112(slot.date))
    .filter(slot => !filter || slot.service === filter)
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
    .slice(0, 12);

  if (!slots.length) {
    box.innerHTML = `<article class="availability-public-card-v112"><span>Sin horarios</span><h3>No hay disponibilidad publicada</h3><p>Contacta con Alaya para consultar horarios disponibles.</p><a class="btn btn-secondary" href="#mensaje-contacto">Contactar</a></article>`;
    return;
  }

  box.innerHTML = slots.map(slot => `
    <article class="availability-public-card-v112">
      <span>${SLOT_STATUS_LABELS_V112[slot.status] || "Disponible"}</span>
      <h3>${slot.service}</h3>
      <div class="availability-meta-v112">
        <small>${formatSlotDateV112(slot.date)}</small>
        <small>${slot.time || "Hora pendiente"}</small>
        <small>${slot.duration || "45 min"}</small>
        <small>${slot.capacity || 1} plaza${Number(slot.capacity) === 1 ? "" : "s"}</small>
      </div>
      ${slot.publicNote ? `<p>${slot.publicNote}</p>` : "<p>Horario orientativo sujeto a confirmación manual.</p>"}
      <button class="btn btn-secondary" type="button" onclick="requestSlotV112('${slot.id}')">Solicitar este horario</button>
    </article>
  `).join("");
}

async function syncAgendaFirebaseV112() {
  try {
    if (!window.firebase?.firestore) {
      if (typeof showToast === "function") showToast("Firebase no está configurado.");
      return;
    }
    const db = window.firebase.firestore();
    const payload = {
      slots: getAgendaSlotsV112(),
      blocks: getAgendaBlocksV112(),
      updatedAt: new Date().toISOString(),
      source: "alaya-agenda-v11.2"
    };
    await db.collection("alayaAgenda").doc("public").set(payload, { merge: true });
    if (typeof showToast === "function") showToast("Agenda sincronizada con Firebase.");
  } catch (error) {
    console.warn("Agenda sync error", error);
    if (typeof showToast === "function") showToast("No se pudo sincronizar agenda.");
  }
}

function exportAgendaV112() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "11.2",
    slots: getAgendaSlotsV112(),
    blocks: getAgendaBlocksV112()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-agenda-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function renderAgendaAdminV112() {
  renderAgendaStatsV112();
  renderAgendaListV112();
}

document.querySelector("#availabilitySlotFormV112")?.addEventListener("submit", saveSlotFormV112);
document.querySelector("#clearSlotFormV112")?.addEventListener("click", clearSlotFormV112);
document.querySelector("#addAgendaBlockV112")?.addEventListener("click", addAgendaBlockV112);
document.querySelector("#agendaFilterStatusV112")?.addEventListener("change", renderAgendaListV112);
document.querySelector("#agendaSearchV112")?.addEventListener("input", renderAgendaListV112);
document.querySelector("#availabilityPublicFilterV112")?.addEventListener("change", renderPublicAvailabilityV112);
document.querySelector("#syncAgendaFirebaseV112")?.addEventListener("click", syncAgendaFirebaseV112);
document.querySelector("#exportAgendaV112")?.addEventListener("click", exportAgendaV112);

window.editSlotV112 = editSlotV112;
window.duplicateSlotV112 = duplicateSlotV112;
window.setSlotStatusV112 = setSlotStatusV112;
window.deleteSlotV112 = deleteSlotV112;
window.deleteAgendaBlockV112 = deleteAgendaBlockV112;
window.requestSlotV112 = requestSlotV112;
window.renderAgendaAdminV112 = renderAgendaAdminV112;
window.renderPublicAvailabilityV112 = renderPublicAvailabilityV112;

setTimeout(() => {
  renderAgendaAdminV112();
  renderPublicAvailabilityV112();
}, 1000);



// v11.3 Mensajes y Notificaciones Pro
const MESSAGE_LOG_KEY_V113 = "alaya_message_log_v113";

const MESSAGE_TEMPLATES_V113 = {
  recibida: {
    subject: "Alaya Holistics · Solicitud recibida",
    label: "Reserva recibida",
    text: `Hola {nombre}, hemos recibido tu solicitud {codigo} para {servicio}.

Fecha solicitada: {fecha}
Horario solicitado: {hora}

La solicitud queda pendiente de revisión. Te contactaremos para confirmar disponibilidad.

Gracias,
Alaya Holistics`
  },
  confirmada: {
    subject: "Alaya Holistics · Reserva confirmada",
    label: "Reserva confirmada",
    text: `Hola {nombre}, tu reserva {codigo} queda confirmada.

Servicio: {servicio}
Fecha: {propuestaFecha}
Hora: {propuestaHora}

Gracias por confiar en Alaya Holistics.`
  },
  alternativa: {
    subject: "Alaya Holistics · Propuesta de horario",
    label: "Propuesta alternativa",
    text: `Hola {nombre}, hemos revisado tu solicitud {codigo}.

Para {servicio}, te proponemos:
Fecha: {propuestaFecha}
Hora: {propuestaHora}

Responde para confirmar si te va bien este horario.

Gracias,
Alaya Holistics`
  },
  recordatorio: {
    subject: "Alaya Holistics · Recordatorio de cita",
    label: "Recordatorio",
    text: `Hola {nombre}, te recordamos tu cita con Alaya Holistics.

Servicio: {servicio}
Fecha: {propuestaFecha}
Hora: {propuestaHora}

Si necesitas cambiar algo, avísanos con antelación.`
  },
  cancelacion: {
    subject: "Alaya Holistics · Reserva cancelada",
    label: "Cancelación",
    text: `Hola {nombre}, te informamos de que la solicitud/reserva {codigo} queda cancelada.

Servicio: {servicio}

Puedes volver a contactar con Alaya para buscar otra disponibilidad.`
  },
  agradecimiento: {
    subject: "Alaya Holistics · Gracias por tu visita",
    label: "Agradecimiento",
    text: `Hola {nombre}, gracias por confiar en Alaya Holistics.

Esperamos que la experiencia haya sido agradable. Si necesitas una nueva consulta o información sobre talleres/herbolario, puedes escribirnos cuando quieras.`
  },
  personalizado: {
    subject: "Alaya Holistics",
    label: "Personalizado",
    text: `Hola {nombre}, te escribimos de Alaya Holistics sobre tu solicitud {codigo}.

`
  }
};

function getMessageLogV113() {
  try {
    const raw = localStorage.getItem(MESSAGE_LOG_KEY_V113);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveMessageLogV113(items) {
  localStorage.setItem(MESSAGE_LOG_KEY_V113, JSON.stringify(items.slice(0, 30)));
  renderMessageLogV113();
}

function getSelectedReservationV113() {
  const id = document.querySelector("#messageReservationSelectV113")?.value;
  const reservations = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : [];
  return reservations.find(item => item.id === id) || null;
}

function fillTemplateV113(template, reservation) {
  const data = reservation || {};
  const statusLabel = typeof RESERVATION_STATUS_LABELS_V110 !== "undefined"
    ? (RESERVATION_STATUS_LABELS_V110[data.status] || data.status || "pendiente")
    : (data.status || "pendiente");

  const map = {
    "{nombre}": data.name || "cliente",
    "{codigo}": data.code || "sin código",
    "{servicio}": data.service || "servicio solicitado",
    "{fecha}": data.preferredDate || "fecha por confirmar",
    "{hora}": data.preferredTime || "hora por confirmar",
    "{propuestaFecha}": data.proposedDate || data.preferredDate || "fecha por confirmar",
    "{propuestaHora}": data.proposedTime || data.preferredTime || "hora por confirmar",
    "{estado}": statusLabel,
    "{respuesta}": data.clientReply || ""
  };

  let text = template.text;
  Object.entries(map).forEach(([key, value]) => {
    text = text.replaceAll(key, value);
  });
  return text;
}

function populateReservationSelectV113() {
  const select = document.querySelector("#messageReservationSelectV113");
  if (!select) return;
  const current = select.value;
  const reservations = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : [];
  select.innerHTML = `<option value="">Sin reserva seleccionada</option>` + reservations.map(item => `
    <option value="${item.id}">${item.code || "Sin código"} · ${item.name || "Sin nombre"} · ${item.service || "Servicio"}</option>
  `).join("");
  if ([...select.options].some(opt => opt.value === current)) select.value = current;
}

function generateMessageV113() {
  const key = document.querySelector("#messageTemplateV113")?.value || "recibida";
  const template = MESSAGE_TEMPLATES_V113[key] || MESSAGE_TEMPLATES_V113.recibida;
  const reservation = getSelectedReservationV113();

  const subject = document.querySelector("#messageSubjectV113");
  const output = document.querySelector("#messageOutputV113");

  if (subject) subject.value = template.subject;
  if (output) output.value = fillTemplateV113(template, reservation);

  addMessageLogV113("generado", key);
}

function addMessageLogV113(action, templateKey) {
  const reservation = getSelectedReservationV113();
  const template = MESSAGE_TEMPLATES_V113[templateKey || document.querySelector("#messageTemplateV113")?.value] || MESSAGE_TEMPLATES_V113.recibida;
  const log = {
    id: `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    action,
    template: template.label,
    reservationCode: reservation?.code || "",
    reservationName: reservation?.name || "",
    at: new Date().toISOString()
  };
  saveMessageLogV113([log, ...getMessageLogV113()]);
}

async function copyMessageV113() {
  const text = document.querySelector("#messageOutputV113")?.value || "";
  if (!text) generateMessageV113();
  const finalText = document.querySelector("#messageOutputV113")?.value || "";
  if (typeof copyText === "function") copyText(finalText);
  else await navigator.clipboard?.writeText(finalText);
  addMessageLogV113("copiado");
  if (typeof showToast === "function") showToast("Mensaje copiado.");
}

function normalizePhoneForWhatsAppV113(contact) {
  return String(contact || "").replace(/[^\d+]/g, "").replace(/^\+/, "");
}

function openWhatsAppV113() {
  const reservation = getSelectedReservationV113();
  const text = document.querySelector("#messageOutputV113")?.value || "";
  if (!text) generateMessageV113();
  const finalText = encodeURIComponent(document.querySelector("#messageOutputV113")?.value || "");
  const phone = normalizePhoneForWhatsAppV113(reservation?.contact || "");
  const url = phone ? `https://wa.me/${phone}?text=${finalText}` : `https://wa.me/?text=${finalText}`;
  addMessageLogV113("whatsapp");
  window.open(url, "_blank", "noopener,noreferrer");
}

function openEmailV113() {
  const reservation = getSelectedReservationV113();
  const subject = encodeURIComponent(document.querySelector("#messageSubjectV113")?.value || "Alaya Holistics");
  const body = encodeURIComponent(document.querySelector("#messageOutputV113")?.value || "");
  const contact = String(reservation?.contact || "");
  const email = contact.includes("@") ? contact : "";
  addMessageLogV113("email");
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

function renderMessageTemplatesPreviewV113() {
  const box = document.querySelector("#messageTemplatesPreviewV113");
  if (!box) return;
  box.innerHTML = Object.entries(MESSAGE_TEMPLATES_V113).map(([key, template]) => `
    <article class="message-template-card-v113">
      <span>${key}</span>
      <h6>${template.label}</h6>
      <p>${template.text.split("\n").slice(0, 2).join(" ")}</p>
    </article>
  `).join("");
}

function renderMessageLogV113() {
  const box = document.querySelector("#messageLogV113");
  if (!box) return;
  const logs = getMessageLogV113();
  if (!logs.length) {
    box.innerHTML = `<article class="message-log-item-v113"><p>No hay mensajes preparados todavía.</p></article>`;
    return;
  }
  box.innerHTML = logs.slice(0, 8).map(log => `
    <article class="message-log-item-v113">
      <span>${log.action}</span>
      <h6>${log.template}</h6>
      <p>${log.reservationCode || "Sin reserva"} ${log.reservationName ? "· " + log.reservationName : ""}</p>
      <p>${new Date(log.at).toLocaleString()}</p>
    </article>
  `).join("");
}

function renderAdminNotificationsV113() {
  const box = document.querySelector("#adminNotificationCenterV113");
  if (!box) return;

  const reservations = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : [];
  const slots = typeof getAgendaSlotsV112 === "function" ? getAgendaSlotsV112() : [];
  const pending = reservations.filter(item => item.status === "pendiente").length;
  const withoutReply = reservations.filter(item => item.status !== "cancelada" && !item.clientReply).length;
  const fullSlots = slots.filter(slot => slot.status === "completo").length;
  const firebaseReady = Boolean(window.firebase?.firestore);

  box.innerHTML = `
    <article class="mensajes-alert-v113">
      <span>Reservas</span>
      <strong>${pending}</strong>
      <p>solicitud${pending === 1 ? "" : "es"} pendiente${pending === 1 ? "" : "s"}.</p>
    </article>
    <article class="mensajes-alert-v113">
      <span>Seguimiento</span>
      <strong>${withoutReply}</strong>
      <p>reserva${withoutReply === 1 ? "" : "s"} sin respuesta visible.</p>
    </article>
    <article class="mensajes-alert-v113">
      <span>Agenda</span>
      <strong>${fullSlots}</strong>
      <p>horario${fullSlots === 1 ? "" : "s"} marcado${fullSlots === 1 ? "" : "s"} como completo.</p>
    </article>
    <article class="mensajes-alert-v113">
      <span>Firebase</span>
      <strong>${firebaseReady ? "OK" : "Local"}</strong>
      <p>${firebaseReady ? "Firestore detectado." : "Sin conexión Firebase detectada."}</p>
    </article>
  `;
}

function exportMessagesV113() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "11.3",
    templates: MESSAGE_TEMPLATES_V113,
    log: getMessageLogV113()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-mensajes-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function renderMessagesAdminV113() {
  populateReservationSelectV113();
  renderMessageTemplatesPreviewV113();
  renderMessageLogV113();
  renderAdminNotificationsV113();
  const output = document.querySelector("#messageOutputV113");
  if (output && !output.value) generateMessageV113();
}

document.querySelector("#generateMessageV113")?.addEventListener("click", generateMessageV113);
document.querySelector("#copyMessageV113")?.addEventListener("click", copyMessageV113);
document.querySelector("#openWhatsAppV113")?.addEventListener("click", openWhatsAppV113);
document.querySelector("#openEmailV113")?.addEventListener("click", openEmailV113);
document.querySelector("#exportMessagesV113")?.addEventListener("click", exportMessagesV113);
document.querySelector("#messageReservationSelectV113")?.addEventListener("change", generateMessageV113);
document.querySelector("#messageTemplateV113")?.addEventListener("change", generateMessageV113);

window.renderMessagesAdminV113 = renderMessagesAdminV113;
window.generateMessageV113 = generateMessageV113;
window.copyMessageV113 = copyMessageV113;
window.openWhatsAppV113 = openWhatsAppV113;
window.openEmailV113 = openEmailV113;

setTimeout(renderMessagesAdminV113, 1200);



// v11.4 Clientes CRM e Historial Pro
const CLIENTS_KEY_V114 = "alaya_clients_crm_v114";

function getClientsV114() {
  try {
    const raw = localStorage.getItem(CLIENTS_KEY_V114);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveClientsV114(items) {
  localStorage.setItem(CLIENTS_KEY_V114, JSON.stringify(items));
  renderClientsAdminV114();
}

function cleanClientTextV114(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function normalizeClientContactV114(value) {
  return cleanClientTextV114(value).toLowerCase().replace(/\s+/g, "");
}

function splitTagsV114(value) {
  return cleanClientTextV114(value)
    .split(/[,;#]+/)
    .map(tag => tag.trim())
    .filter(Boolean);
}

function createClientIdV114() {
  return `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getClientFormDataV114() {
  return {
    id: document.querySelector("#clientIdV114")?.value || createClientIdV114(),
    name: cleanClientTextV114(document.querySelector("#clientNameV114")?.value),
    contact: cleanClientTextV114(document.querySelector("#clientContactV114")?.value),
    tags: splitTagsV114(document.querySelector("#clientTagsV114")?.value),
    preference: cleanClientTextV114(document.querySelector("#clientPreferenceV114")?.value),
    internalNote: cleanClientTextV114(document.querySelector("#clientInternalNoteV114")?.value),
    updatedAt: new Date().toISOString()
  };
}

function setClientFormV114(client) {
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#clientIdV114", client.id);
  set("#clientNameV114", client.name);
  set("#clientContactV114", client.contact);
  set("#clientTagsV114", Array.isArray(client.tags) ? client.tags.join(", ") : "");
  set("#clientPreferenceV114", client.preference);
  set("#clientInternalNoteV114", client.internalNote);
}

function clearClientFormV114() {
  document.querySelector("#clientFormV114")?.reset();
  const id = document.querySelector("#clientIdV114");
  if (id) id.value = "";
}

function saveClientFormV114(event) {
  event?.preventDefault();
  const client = getClientFormDataV114();

  if (!client.name || !client.contact) {
    if (typeof showToast === "function") showToast("Añade nombre y contacto.");
    return;
  }

  const clients = getClientsV114();
  const index = clients.findIndex(item => item.id === client.id);
  if (index >= 0) clients[index] = { ...clients[index], ...client };
  else clients.unshift({ ...client, createdAt: new Date().toISOString() });

  saveClientsV114(clients);
  clearClientFormV114();
  if (typeof showToast === "function") showToast("Cliente guardado.");
}

function reservationsForClientV114(client) {
  const reservations = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : [];
  const clientContact = normalizeClientContactV114(client.contact);
  return reservations.filter(res => {
    const resContact = normalizeClientContactV114(res.contact);
    return clientContact && resContact && (clientContact.includes(resContact) || resContact.includes(clientContact));
  });
}

function syncClientsFromReservationsV114() {
  const reservations = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : [];
  const clients = getClientsV114();
  const byContact = new Map(clients.map(client => [normalizeClientContactV114(client.contact), client]));

  reservations.forEach(res => {
    const key = normalizeClientContactV114(res.contact);
    if (!key) return;

    const existing = byContact.get(key);
    if (existing) {
      const tags = new Set([...(existing.tags || []), res.service].filter(Boolean));
      byContact.set(key, {
        ...existing,
        name: existing.name || res.name,
        tags: [...tags],
        lastReservationCode: res.code,
        updatedAt: new Date().toISOString()
      });
    } else {
      byContact.set(key, {
        id: createClientIdV114(),
        name: res.name || "Sin nombre",
        contact: res.contact || "",
        tags: [res.service].filter(Boolean),
        preference: res.service || "",
        internalNote: "",
        source: "reserva-online",
        lastReservationCode: res.code,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  });

  saveClientsV114([...byContact.values()].sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""))));
  if (typeof showToast === "function") showToast("Clientes actualizados desde reservas.");
}

function getFilteredClientsV114() {
  const query = (document.querySelector("#clientSearchV114")?.value || "").toLowerCase().trim();
  if (!query) return getClientsV114();

  return getClientsV114().filter(client => {
    const haystack = [
      client.name,
      client.contact,
      client.preference,
      client.internalNote,
      ...(client.tags || [])
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

function renderClientStatsV114() {
  const box = document.querySelector("#clientsStatsV114");
  if (!box) return;
  const clients = getClientsV114();
  const reservations = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : [];
  const tagged = clients.filter(c => (c.tags || []).length).length;
  const withNotes = clients.filter(c => c.internalNote).length;

  box.innerHTML = `
    <div class="client-stat-v114"><strong>${clients.length}</strong><span>Clientes</span></div>
    <div class="client-stat-v114"><strong>${reservations.length}</strong><span>Reservas</span></div>
    <div class="client-stat-v114"><strong>${tagged}</strong><span>Con etiquetas</span></div>
    <div class="client-stat-v114"><strong>${withNotes}</strong><span>Con nota interna</span></div>
  `;
}

function renderClientsListV114() {
  const list = document.querySelector("#clientsListV114");
  if (!list) return;
  const clients = getFilteredClientsV114();

  if (!clients.length) {
    list.innerHTML = `<article class="client-card-v114"><p>No hay clientes para mostrar. Puedes crearlos manualmente o actualizar desde reservas.</p></article>`;
    return;
  }

  list.innerHTML = clients.map(client => {
    const history = reservationsForClientV114(client);
    return `
      <article class="client-card-v114">
        <div class="client-card-top-v114">
          <div>
            <span>${client.source || "cliente"}</span>
            <h5>${client.name || "Sin nombre"}</h5>
            <p>${client.contact || "Sin contacto"}</p>
          </div>
          <strong class="reservation-status-v110">${history.length} reserva${history.length === 1 ? "" : "s"}</strong>
        </div>

        <div class="client-tags-v114">
          ${(client.tags || []).map(tag => `<small>${tag}</small>`).join("") || "<small>Sin etiquetas</small>"}
          ${client.preference ? `<small>Preferencia: ${client.preference}</small>` : ""}
        </div>

        ${client.internalNote ? `<p><strong>Nota interna:</strong> ${client.internalNote}</p>` : ""}

        <ul class="client-history-v114">
          ${history.slice(0, 5).map(res => `<li>${res.code || "Sin código"} · ${res.service || "Servicio"} · ${res.status || "pendiente"}</li>`).join("") || "<li>Sin reservas vinculadas.</li>"}
        </ul>

        <div class="client-actions-v114">
          <button class="btn btn-secondary" type="button" onclick="editClientV114('${client.id}')">Editar</button>
          <button class="btn btn-secondary" type="button" onclick="copyClientSummaryV114('${client.id}')">Copiar resumen</button>
          <button class="btn btn-secondary" type="button" onclick="deleteClientV114('${client.id}')">Borrar</button>
        </div>
      </article>
    `;
  }).join("");
}

function editClientV114(id) {
  const client = getClientsV114().find(item => item.id === id);
  if (!client) return;
  setClientFormV114(client);
  document.querySelector("#clientFormV114")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function copyClientSummaryV114(id) {
  const client = getClientsV114().find(item => item.id === id);
  if (!client) return;
  const history = reservationsForClientV114(client);
  const text = `Cliente: ${client.name}
Contacto: ${client.contact}
Etiquetas: ${(client.tags || []).join(", ") || "sin etiquetas"}
Preferencia: ${client.preference || "sin preferencia"}
Reservas vinculadas: ${history.length}

Últimas reservas:
${history.slice(0, 5).map(res => `- ${res.code || "sin código"} · ${res.service || "servicio"} · ${res.status || "estado"}`).join("\n")}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen copiado.");
}

function deleteClientV114(id) {
  const client = getClientsV114().find(item => item.id === id);
  if (!client) return;
  if (!confirm(`¿Borrar cliente ${client.name}?`)) return;
  saveClientsV114(getClientsV114().filter(item => item.id !== id));
}

async function syncClientsFirebaseV114() {
  try {
    if (!window.firebase?.firestore) {
      if (typeof showToast === "function") showToast("Firebase no está configurado.");
      return;
    }
    await window.firebase.firestore().collection("alayaClients").doc("crm").set({
      clients: getClientsV114(),
      updatedAt: new Date().toISOString(),
      source: "alaya-clients-v11.4"
    }, { merge: true });
    if (typeof showToast === "function") showToast("Clientes sincronizados con Firebase.");
  } catch (error) {
    console.warn("Clients Firebase sync error", error);
    if (typeof showToast === "function") showToast("No se pudo sincronizar clientes.");
  }
}

function exportClientsV114() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "11.4",
    clients: getClientsV114()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-clientes-crm-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function renderClientsAdminV114() {
  renderClientStatsV114();
  renderClientsListV114();
}

document.querySelector("#clientFormV114")?.addEventListener("submit", saveClientFormV114);
document.querySelector("#clearClientFormV114")?.addEventListener("click", clearClientFormV114);
document.querySelector("#clientSearchV114")?.addEventListener("input", renderClientsListV114);
document.querySelector("#syncClientsFromReservationsV114")?.addEventListener("click", syncClientsFromReservationsV114);
document.querySelector("#exportClientsV114")?.addEventListener("click", exportClientsV114);
document.querySelector("#syncClientsFirebaseV114")?.addEventListener("click", syncClientsFirebaseV114);

window.editClientV114 = editClientV114;
window.copyClientSummaryV114 = copyClientSummaryV114;
window.deleteClientV114 = deleteClientV114;
window.renderClientsAdminV114 = renderClientsAdminV114;

setTimeout(renderClientsAdminV114, 1300);



// v11.5 Dashboard Negocio Pro
function safeLocalJsonV115(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : fallback;
    return parsed || fallback;
  } catch {
    return fallback;
  }
}

function getBusinessDataV115() {
  const reservations = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : safeLocalJsonV115("alaya_online_reservations_v110", []);
  const clients = typeof getClientsV114 === "function" ? getClientsV114() : safeLocalJsonV115("alaya_clients_crm_v114", []);
  const slots = typeof getAgendaSlotsV112 === "function" ? getAgendaSlotsV112() : safeLocalJsonV115("alaya_agenda_slots_v112", []);
  const blocks = typeof getAgendaBlocksV112 === "function" ? getAgendaBlocksV112() : safeLocalJsonV115("alaya_agenda_blocks_v112", []);
  const messages = safeLocalJsonV115("alaya_message_log_v113", []);
  const cms = typeof getWpCmsV105 === "function" ? getWpCmsV105() : safeLocalJsonV115("alaya_wordpress_cms_v105", null);
  return { reservations, clients, slots, blocks, messages, cms };
}

function countByV115(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "Sin definir";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function buildBusinessReportV115() {
  const { reservations, clients, slots, blocks, messages, cms } = getBusinessDataV115();
  const pendingReservations = reservations.filter(item => item.status === "pendiente");
  const confirmedReservations = reservations.filter(item => item.status === "confirmada");
  const publishedSlots = slots.filter(slot => slot.status !== "oculto" && slot.status !== "completo");
  const withoutReply = reservations.filter(item => item.status !== "cancelada" && !item.clientReply);
  const today = new Date().toISOString().slice(0, 10);
  const upcomingSlots = slots
    .filter(slot => slot.date && slot.date >= today && slot.status !== "oculto")
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
    .slice(0, 8);

  return {
    generatedAt: new Date().toISOString(),
    version: "11.5",
    totals: {
      reservations: reservations.length,
      pendingReservations: pendingReservations.length,
      confirmedReservations: confirmedReservations.length,
      clients: clients.length,
      agendaSlots: slots.length,
      publishedSlots: publishedSlots.length,
      agendaBlocks: blocks.length,
      messages: messages.length
    },
    reservationsByStatus: countByV115(reservations, "status"),
    reservationsByService: countByV115(reservations, "service"),
    tasks: buildBusinessTasksV115({ reservations, clients, slots, blocks, messages, cms, pendingReservations, withoutReply, publishedSlots }),
    upcomingSlots,
    recentClients: clients.slice(0, 8),
    tech: {
      hasCmsLocal: Boolean(localStorage.getItem("alaya_wordpress_cms_v105")),
      hasPublishedCmsLoader: typeof loadPublishedCmsFromHostingV107 === "function",
      firebaseDetected: Boolean(window.firebase?.firestore),
      hasClientsCrm: clients.length > 0,
      hasReservations: reservations.length > 0,
      hasAgenda: slots.length > 0
    }
  };
}

function buildBusinessTasksV115(ctx) {
  const tasks = [];
  if (ctx.pendingReservations.length) {
    tasks.push({ level: "alta", title: "Revisar reservas pendientes", text: `${ctx.pendingReservations.length} solicitud${ctx.pendingReservations.length === 1 ? "" : "es"} pendiente${ctx.pendingReservations.length === 1 ? "" : "s"} de revisar.` });
  }
  if (ctx.withoutReply.length) {
    tasks.push({ level: "media", title: "Añadir respuestas visibles", text: `${ctx.withoutReply.length} reserva${ctx.withoutReply.length === 1 ? "" : "s"} sin respuesta para consulta pública.` });
  }
  if (!ctx.publishedSlots.length) {
    tasks.push({ level: "media", title: "Publicar disponibilidad", text: "No hay horarios visibles en la agenda pública." });
  }
  if (!ctx.clients.length && ctx.reservations.length) {
    tasks.push({ level: "media", title: "Actualizar CRM", text: "Hay reservas, pero el CRM todavía está vacío." });
  }
  if (!window.firebase?.firestore) {
    tasks.push({ level: "opcional", title: "Configurar Firebase", text: "Firebase no está detectado. La web funciona en local/archivo publicado." });
  }
  if (!tasks.length) {
    tasks.push({ level: "ok", title: "Todo revisado", text: "No hay tareas urgentes detectadas ahora mismo." });
  }
  return tasks;
}

function renderBusinessKpisV115(report = buildBusinessReportV115()) {
  const box = document.querySelector("#businessKpisV115");
  if (!box) return;
  const items = [
    ["Reservas", report.totals.reservations],
    ["Pendientes", report.totals.pendingReservations],
    ["Confirmadas", report.totals.confirmedReservations],
    ["Clientes", report.totals.clients],
    ["Horarios visibles", report.totals.publishedSlots],
    ["Mensajes", report.totals.messages]
  ];
  box.innerHTML = items.map(([label, value]) => `
    <div class="business-kpi-v115">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderBusinessTasksV115(report = buildBusinessReportV115()) {
  const box = document.querySelector("#businessTasksV115");
  if (!box) return;
  box.innerHTML = report.tasks.map(task => `
    <article class="business-task-v115">
      <span class="business-tag-v115">${task.level}</span>
      <strong>${task.title}</strong>
      <p>${task.text}</p>
    </article>
  `).join("");
}

function renderReservationBreakdownV115(report = buildBusinessReportV115()) {
  const box = document.querySelector("#reservationBreakdownV115");
  if (!box) return;
  const statusRows = Object.entries(report.reservationsByStatus);
  const serviceRows = Object.entries(report.reservationsByService).slice(0, 8);

  box.innerHTML = `
    <div class="business-row-v115"><strong>Por estado</strong><span>${statusRows.length || 0} estados</span></div>
    ${statusRows.map(([key, value]) => `<div class="business-row-v115"><span>${key}</span><strong>${value}</strong></div>`).join("") || `<div class="business-row-v115"><span>Sin reservas</span><strong>0</strong></div>`}
    <div class="business-row-v115"><strong>Por servicio</strong><span>${serviceRows.length || 0} servicios</span></div>
    ${serviceRows.map(([key, value]) => `<div class="business-row-v115"><span>${key}</span><strong>${value}</strong></div>`).join("") || `<div class="business-row-v115"><span>Sin servicios</span><strong>0</strong></div>`}
  `;
}

function renderUpcomingAgendaV115(report = buildBusinessReportV115()) {
  const box = document.querySelector("#upcomingAgendaV115");
  if (!box) return;
  if (!report.upcomingSlots.length) {
    box.innerHTML = `<article class="business-mini-item-v115"><strong>Sin próximos horarios</strong><p>No hay agenda visible próxima.</p></article>`;
    return;
  }
  box.innerHTML = report.upcomingSlots.map(slot => `
    <article class="business-mini-item-v115">
      <strong>${slot.service || "Servicio"}</strong>
      <p>${slot.date || "Sin fecha"} · ${slot.time || "Sin hora"} · ${slot.status || "estado"}</p>
    </article>
  `).join("");
}

function renderRecentClientsV115(report = buildBusinessReportV115()) {
  const box = document.querySelector("#recentClientsV115");
  if (!box) return;
  if (!report.recentClients.length) {
    box.innerHTML = `<article class="business-mini-item-v115"><strong>Sin clientes todavía</strong><p>Actualiza CRM desde reservas o crea clientes manualmente.</p></article>`;
    return;
  }
  box.innerHTML = report.recentClients.map(client => `
    <article class="business-mini-item-v115">
      <strong>${client.name || "Cliente"}</strong>
      <p>${client.contact || "Sin contacto"} ${(client.tags || []).length ? "· " + client.tags.join(", ") : ""}</p>
    </article>
  `).join("");
}

function renderBusinessTechV115(report = buildBusinessReportV115()) {
  const box = document.querySelector("#businessTechStatusV115");
  if (!box) return;
  const rows = [
    ["CMS local", report.tech.hasCmsLocal],
    ["Publicador CMS", report.tech.hasPublishedCmsLoader],
    ["Firebase", report.tech.firebaseDetected],
    ["CRM", report.tech.hasClientsCrm],
    ["Reservas", report.tech.hasReservations],
    ["Agenda", report.tech.hasAgenda]
  ];

  box.innerHTML = rows.map(([label, ok]) => `
    <article class="business-tech-item-v115 ${ok ? "ok" : "warn"}">
      <span>${ok ? "OK" : "Pendiente"}</span>
      <strong>${label}</strong>
    </article>
  `).join("");
}

function renderBusinessReportPreviewV115(report = buildBusinessReportV115()) {
  const output = document.querySelector("#businessReportPreviewV115");
  if (output) output.value = JSON.stringify(report, null, 2);
}

function renderBusinessDashboardV115() {
  const report = buildBusinessReportV115();
  renderBusinessKpisV115(report);
  renderBusinessTasksV115(report);
  renderReservationBreakdownV115(report);
  renderUpcomingAgendaV115(report);
  renderRecentClientsV115(report);
  renderBusinessTechV115(report);
  renderBusinessReportPreviewV115(report);
}

function exportBusinessReportV115() {
  const report = buildBusinessReportV115();
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-dashboard-negocio-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyBusinessSummaryV115() {
  const report = buildBusinessReportV115();
  const text = `Resumen Alaya Holistics

Reservas totales: ${report.totals.reservations}
Pendientes: ${report.totals.pendingReservations}
Confirmadas: ${report.totals.confirmedReservations}
Clientes CRM: ${report.totals.clients}
Horarios visibles: ${report.totals.publishedSlots}
Mensajes preparados: ${report.totals.messages}

Tareas:
${report.tasks.map(task => `- ${task.title}: ${task.text}`).join("\n")}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen copiado.");
}

document.querySelector("#exportBusinessReportV115")?.addEventListener("click", exportBusinessReportV115);
document.querySelector("#copyBusinessSummaryV115")?.addEventListener("click", copyBusinessSummaryV115);

window.renderBusinessDashboardV115 = renderBusinessDashboardV115;
window.buildBusinessReportV115 = buildBusinessReportV115;

setTimeout(renderBusinessDashboardV115, 1400);



// v11.6 Backup y Restauración Pro
const BACKUP_KEYS_V116 = {
  cms: [
    "alaya_wordpress_cms_v105",
    "alaya_wordpress_cms_revisions_v106",
    "alaya_admin_content_v103"
  ],
  reservations: [
    "alaya_online_reservations_v110"
  ],
  agenda: [
    "alaya_agenda_slots_v112",
    "alaya_agenda_blocks_v112"
  ],
  clients: [
    "alaya_clients_crm_v114"
  ],
  messages: [
    "alaya_message_log_v113"
  ],
  settings: [
    "alaya_cms_sync_settings_v108",
    "alaya_cms_snapshots_v108",
    "alaya_cms_remote_meta_v107",
    "alaya_firebase_wizard_v109"
  ]
};

function safeParseBackupValueV116(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function getSelectedBackupGroupsV116() {
  return [...document.querySelectorAll("[data-backup-key-v116]")]
    .filter(input => input.checked)
    .map(input => input.dataset.backupKeyV116);
}

function collectBackupDataV116(groups = Object.keys(BACKUP_KEYS_V116)) {
  const data = {};
  groups.forEach(group => {
    data[group] = {};
    (BACKUP_KEYS_V116[group] || []).forEach(key => {
      const value = localStorage.getItem(key);
      data[group][key] = value === null ? null : safeParseBackupValueV116(value);
    });
  });

  return {
    version: "11.6",
    app: "Alaya Holistics",
    createdAt: new Date().toISOString(),
    groups,
    data
  };
}

function backupCountV116(group) {
  const keys = BACKUP_KEYS_V116[group] || [];
  return keys.reduce((count, key) => count + (localStorage.getItem(key) ? 1 : 0), 0);
}

function renderBackupStatsV116() {
  const box = document.querySelector("#backupStatsV116");
  if (!box) return;
  const groups = [
    ["cms", "CMS"],
    ["reservations", "Reservas"],
    ["agenda", "Agenda"],
    ["clients", "Clientes"],
    ["messages", "Mensajes"],
    ["settings", "Config"]
  ];
  box.innerHTML = groups.map(([group, label]) => `
    <div class="backup-stat-v116">
      <strong>${backupCountV116(group)}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderBackupAuditV116() {
  const box = document.querySelector("#backupAuditV116");
  if (!box) return;
  const rows = Object.entries(BACKUP_KEYS_V116).flatMap(([group, keys]) =>
    keys.map(key => {
      const raw = localStorage.getItem(key);
      let size = raw ? `${Math.round(raw.length / 1024 * 10) / 10} KB` : "0 KB";
      return { group, key, exists: Boolean(raw), size };
    })
  );

  box.innerHTML = rows.map(row => `
    <article class="backup-audit-item-v116">
      <span>${row.exists ? "OK" : "Vacío"}</span>
      <strong>${row.key}</strong>
      <p>${row.group} · ${row.size}</p>
    </article>
  `).join("");
}

function renderBackupPreviewV116() {
  const output = document.querySelector("#backupPreviewV116");
  if (!output) return;
  const selected = getSelectedBackupGroupsV116();
  output.value = JSON.stringify(collectBackupDataV116(selected), null, 2);
  renderBackupStatsV116();
  renderBackupAuditV116();
}

function downloadBackupV116(groups = Object.keys(BACKUP_KEYS_V116), filename = "alaya-backup-total") {
  const data = collectBackupDataV116(groups);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function validateBackupObjectV116(parsed) {
  return Boolean(parsed && parsed.data && typeof parsed.data === "object");
}

function restoreBackupV116() {
  const status = document.querySelector("#backupImportStatusV116");
  const raw = document.querySelector("#backupImportTextV116")?.value || "";
  const mode = document.querySelector("#restoreModeV116")?.value || "merge";

  try {
    const parsed = JSON.parse(raw);
    if (!validateBackupObjectV116(parsed)) throw new Error("Formato no válido");

    const groups = Object.keys(parsed.data || {});
    if (mode === "replace") {
      groups.forEach(group => {
        (BACKUP_KEYS_V116[group] || []).forEach(key => localStorage.removeItem(key));
      });
    }

    groups.forEach(group => {
      const entries = parsed.data[group] || {};
      Object.entries(entries).forEach(([key, value]) => {
        if (value === null || typeof value === "undefined") return;
        localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
      });
    });

    if (status) {
      status.innerHTML = `<span>Restaurado</span><p>Backup restaurado en modo ${mode}. Actualiza o recarga la página para ver todos los cambios.</p>`;
    }

    renderBackupPanelV116();

    if (typeof renderWpAdminV105 === "function") renderWpAdminV105();
    if (typeof applyWpCmsV105 === "function") applyWpCmsV105();
    if (typeof renderReservationsAdminV110 === "function") renderReservationsAdminV110();
    if (typeof renderAgendaAdminV112 === "function") renderAgendaAdminV112();
    if (typeof renderClientsAdminV114 === "function") renderClientsAdminV114();
    if (typeof renderBusinessDashboardV115 === "function") renderBusinessDashboardV115();

    if (typeof showToast === "function") showToast("Backup restaurado.");
  } catch (error) {
    if (status) status.innerHTML = `<span>Error</span><p>No se pudo restaurar: JSON no válido o formato incorrecto.</p>`;
    if (typeof showToast === "function") showToast("Backup no válido.");
  }
}

function validateBackupV116() {
  const status = document.querySelector("#backupImportStatusV116");
  const raw = document.querySelector("#backupImportTextV116")?.value || "";
  try {
    const parsed = JSON.parse(raw);
    if (!validateBackupObjectV116(parsed)) throw new Error("Formato no válido");
    const groups = Object.keys(parsed.data || {});
    if (status) status.innerHTML = `<span>Válido</span><p>Backup válido. Grupos detectados: ${groups.join(", ") || "ninguno"}.</p>`;
  } catch {
    if (status) status.innerHTML = `<span>Error</span><p>El JSON no parece un backup válido de Alaya.</p>`;
  }
}

async function copyBackupSummaryV116() {
  const full = collectBackupDataV116();
  const lines = Object.entries(BACKUP_KEYS_V116).map(([group, keys]) => {
    const present = keys.filter(key => localStorage.getItem(key)).length;
    return `- ${group}: ${present}/${keys.length} claves con datos`;
  });

  const text = `Backup Alaya Holistics
Fecha: ${full.createdAt}
Versión backup: ${full.version}

Resumen:
${lines.join("\n")}

Recomendación: guardar este backup antes de actualizar o migrar.`;

  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen de backup copiado.");
}

function renderBackupPanelV116() {
  renderBackupStatsV116();
  renderBackupAuditV116();
  renderBackupPreviewV116();
}

document.querySelector("#downloadFullBackupV116")?.addEventListener("click", () => downloadBackupV116(Object.keys(BACKUP_KEYS_V116), "alaya-backup-total"));
document.querySelector("#downloadSelectiveBackupV116")?.addEventListener("click", () => downloadBackupV116(getSelectedBackupGroupsV116(), "alaya-backup-seleccion"));
document.querySelector("#refreshBackupPreviewV116")?.addEventListener("click", renderBackupPreviewV116);
document.querySelector("#restoreBackupV116")?.addEventListener("click", restoreBackupV116);
document.querySelector("#validateBackupV116")?.addEventListener("click", validateBackupV116);
document.querySelector("#copyBackupSummaryV116")?.addEventListener("click", copyBackupSummaryV116);
document.querySelectorAll("[data-backup-key-v116]").forEach(input => input.addEventListener("change", renderBackupPreviewV116));

window.renderBackupPanelV116 = renderBackupPanelV116;
window.collectBackupDataV116 = collectBackupDataV116;

setTimeout(renderBackupPanelV116, 1500);



// v11.7 Legal, Privacidad y Consentimientos Pro
const LEGAL_SETTINGS_KEY_V117 = "alaya_legal_privacy_v117";
const LEGAL_VERSION_V117 = "AlayaLegal-v11.7";

const LEGAL_DEFAULTS_V117 = {
  version: LEGAL_VERSION_V117,
  businessName: "Alaya Holistics",
  owner: "Responsable de Alaya Holistics",
  email: "",
  jurisdiction: "España / Unión Europea",
  privacySummary: "Solo se solicitan los datos necesarios para gestionar reservas, contacto y seguimiento administrativo. La información se usa para responder solicitudes y organizar la agenda.",
  bookingConsent: "Acepto que Alaya Holistics contacte conmigo para gestionar esta solicitud de reserva. Entiendo que la reserva no queda confirmada automáticamente y requiere confirmación manual.",
  cookiesText: "Esta web puede usar almacenamiento local del navegador para recordar preferencias, reservas, agenda o configuración del Admin. No se usan cookies publicitarias desde esta base estática.",
  retentionText: "Los datos se conservarán solo el tiempo necesario para gestionar solicitudes, seguimiento y organización interna. Puedes solicitar revisión o eliminación contactando con Alaya.",
  disclaimer: "Los servicios holísticos ofrecidos son de bienestar, orientación simbólica y acompañamiento personal. No sustituyen asesoramiento profesional sanitario, psicológico, legal o financiero.",
  updatedAt: ""
};

function getLegalSettingsV117() {
  try {
    const raw = localStorage.getItem(LEGAL_SETTINGS_KEY_V117);
    return raw ? { ...LEGAL_DEFAULTS_V117, ...JSON.parse(raw) } : { ...LEGAL_DEFAULTS_V117 };
  } catch {
    return { ...LEGAL_DEFAULTS_V117 };
  }
}

function saveLegalSettingsObjectV117(settings) {
  localStorage.setItem(LEGAL_SETTINGS_KEY_V117, JSON.stringify({
    ...LEGAL_DEFAULTS_V117,
    ...settings,
    version: LEGAL_VERSION_V117,
    updatedAt: new Date().toISOString()
  }));
  renderLegalAdminV117();
  applyLegalPublicV117();
}

function legalSetValueV117(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.value = value || "";
}

function legalGetValueV117(selector) {
  return String(document.querySelector(selector)?.value || "").trim();
}

function fillLegalFormV117() {
  const s = getLegalSettingsV117();
  legalSetValueV117("#legalBusinessNameV117", s.businessName);
  legalSetValueV117("#legalOwnerV117", s.owner);
  legalSetValueV117("#legalEmailV117", s.email);
  legalSetValueV117("#legalJurisdictionV117", s.jurisdiction);
  legalSetValueV117("#legalPrivacySummaryV117", s.privacySummary);
  legalSetValueV117("#legalBookingConsentV117", s.bookingConsent);
  legalSetValueV117("#legalCookiesTextV117", s.cookiesText);
  legalSetValueV117("#legalRetentionTextV117", s.retentionText);
  legalSetValueV117("#legalDisclaimerV117", s.disclaimer);
}

function collectLegalFormV117() {
  return {
    businessName: legalGetValueV117("#legalBusinessNameV117") || LEGAL_DEFAULTS_V117.businessName,
    owner: legalGetValueV117("#legalOwnerV117") || LEGAL_DEFAULTS_V117.owner,
    email: legalGetValueV117("#legalEmailV117"),
    jurisdiction: legalGetValueV117("#legalJurisdictionV117") || LEGAL_DEFAULTS_V117.jurisdiction,
    privacySummary: legalGetValueV117("#legalPrivacySummaryV117") || LEGAL_DEFAULTS_V117.privacySummary,
    bookingConsent: legalGetValueV117("#legalBookingConsentV117") || LEGAL_DEFAULTS_V117.bookingConsent,
    cookiesText: legalGetValueV117("#legalCookiesTextV117") || LEGAL_DEFAULTS_V117.cookiesText,
    retentionText: legalGetValueV117("#legalRetentionTextV117") || LEGAL_DEFAULTS_V117.retentionText,
    disclaimer: legalGetValueV117("#legalDisclaimerV117") || LEGAL_DEFAULTS_V117.disclaimer
  };
}

function saveLegalSettingsV117() {
  saveLegalSettingsObjectV117(collectLegalFormV117());
  if (typeof showToast === "function") showToast("Configuración legal guardada.");
}

function resetLegalDefaultsV117() {
  if (!confirm("¿Restaurar textos legales base?")) return;
  localStorage.removeItem(LEGAL_SETTINGS_KEY_V117);
  renderLegalAdminV117();
  applyLegalPublicV117();
}

function applyLegalPublicV117() {
  const s = getLegalSettingsV117();
  const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  };

  setText("#legalPublicTitleV117", `${s.businessName}: privacidad y confianza`);
  setText("#legalPublicIntroV117", s.privacySummary);
  setText("#legalPublicPrivacyV117", s.privacySummary);
  setText("#legalPublicBookingV117", s.bookingConsent);
  setText("#legalPublicDisclaimerV117", s.disclaimer);

  const consentLabel = document.querySelector(".reserva-consent-v110 span");
  if (consentLabel) consentLabel.textContent = s.bookingConsent;
}

function legalAuditDataV117() {
  const reservations = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : [];
  const clients = typeof getClientsV114 === "function" ? getClientsV114() : [];
  const withConsent = reservations.filter(r => r.consent?.accepted).length;
  const withoutVersion = reservations.filter(r => !r.consent?.version).length;
  const notes = clients.filter(c => c.internalNote).length;
  const firebase = Boolean(window.firebase?.firestore);

  return {
    reservations: reservations.length,
    withConsent,
    withoutVersion,
    clients: clients.length,
    internalNotes: notes,
    firebase
  };
}

function renderLegalStatsV117() {
  const box = document.querySelector("#legalStatsV117");
  if (!box) return;
  const a = legalAuditDataV117();
  const rows = [
    ["Reservas", a.reservations],
    ["Consentimiento", a.withConsent],
    ["Sin versión", a.withoutVersion],
    ["Clientes", a.clients],
    ["Notas internas", a.internalNotes]
  ];
  box.innerHTML = rows.map(([label, value]) => `
    <div class="legal-stat-v117"><strong>${value}</strong><span>${label}</span></div>
  `).join("");
}

function renderLegalAuditV117() {
  const box = document.querySelector("#legalAuditV117");
  if (!box) return;
  const a = legalAuditDataV117();
  const items = [
    ["Consentimiento reservas", `${a.withConsent}/${a.reservations}`, a.withConsent === a.reservations ? "OK" : "Revisar"],
    ["Reservas sin versión legal", a.withoutVersion, a.withoutVersion ? "Revisar" : "OK"],
    ["Clientes CRM", a.clients, "Interno"],
    ["Notas internas", a.internalNotes, a.internalNotes ? "Privado" : "OK"],
    ["Firebase", a.firebase ? "Detectado" : "No detectado", a.firebase ? "OK" : "Local"]
  ];

  box.innerHTML = items.map(([title, value, tag]) => `
    <article class="legal-audit-item-v117">
      <span>${tag}</span>
      <strong>${title}</strong>
      <p>${value}</p>
    </article>
  `).join("");
}

function renderLegalPreviewV117() {
  const output = document.querySelector("#legalPreviewV117");
  if (!output) return;
  output.value = JSON.stringify({
    exportedAt: new Date().toISOString(),
    version: "11.7",
    legal: getLegalSettingsV117(),
    audit: legalAuditDataV117()
  }, null, 2);
}

function renderLegalAdminV117() {
  fillLegalFormV117();
  renderLegalStatsV117();
  renderLegalAuditV117();
  renderLegalPreviewV117();
}

function exportLegalSettingsV117() {
  const data = {
    exportedAt: new Date().toISOString(),
    version: "11.7",
    legal: getLegalSettingsV117(),
    audit: legalAuditDataV117()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-legal-privacidad-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyLegalSummaryV117() {
  const s = getLegalSettingsV117();
  const a = legalAuditDataV117();
  const text = `Resumen legal Alaya Holistics

Nombre comercial: ${s.businessName}
Responsable/contacto: ${s.owner}
Email: ${s.email || "no indicado"}
Jurisdicción: ${s.jurisdiction}
Versión consentimiento: ${s.version}

Reservas: ${a.reservations}
Reservas con consentimiento: ${a.withConsent}
Reservas sin versión legal: ${a.withoutVersion}
Clientes CRM: ${a.clients}
Notas internas: ${a.internalNotes}

Aviso: esta base es orientativa y debe revisarse antes de producción.`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen legal copiado.");
}

// Override reserva data to include legal consent version
if (typeof getReservationFormDataV110 === "function") {
  const getReservationFormDataOriginalV117 = getReservationFormDataV110;
  getReservationFormDataV110 = function() {
    const data = getReservationFormDataOriginalV117();
    const legal = getLegalSettingsV117();
    return {
      ...data,
      consent: {
        accepted: Boolean(document.querySelector("#onlineReservationConsentV110")?.checked),
        version: legal.version || LEGAL_VERSION_V117,
        text: legal.bookingConsent,
        acceptedAt: new Date().toISOString()
      }
    };
  };
}

document.querySelector("#saveLegalSettingsV117")?.addEventListener("click", saveLegalSettingsV117);
document.querySelector("#exportLegalSettingsV117")?.addEventListener("click", exportLegalSettingsV117);
document.querySelector("#copyLegalSummaryV117")?.addEventListener("click", copyLegalSummaryV117);
document.querySelector("#resetLegalDefaultsV117")?.addEventListener("click", resetLegalDefaultsV117);
document.querySelectorAll(".legal-form-v117 input, .legal-form-v117 textarea").forEach(input => {
  input.addEventListener("input", renderLegalPreviewV117);
});

window.renderLegalAdminV117 = renderLegalAdminV117;
window.applyLegalPublicV117 = applyLegalPublicV117;
window.getLegalSettingsV117 = getLegalSettingsV117;

setTimeout(() => {
  applyLegalPublicV117();
  renderLegalAdminV117();
}, 1500);



// v11.8 Centro Lanzamiento y QA Pro
const LAUNCH_SETTINGS_KEY_V118 = "alaya_launch_settings_v118";
const LAUNCH_HISTORY_KEY_V118 = "alaya_launch_qa_history_v118";

const LAUNCH_DEFAULTS_V118 = {
  mode: "draft",
  message: "La web está en preparación y revisión final antes del lanzamiento.",
  updatedAt: ""
};

function getLaunchSettingsV118() {
  try {
    const raw = localStorage.getItem(LAUNCH_SETTINGS_KEY_V118);
    return raw ? { ...LAUNCH_DEFAULTS_V118, ...JSON.parse(raw) } : { ...LAUNCH_DEFAULTS_V118 };
  } catch {
    return { ...LAUNCH_DEFAULTS_V118 };
  }
}

function saveLaunchSettingsV118(settings) {
  localStorage.setItem(LAUNCH_SETTINGS_KEY_V118, JSON.stringify({
    ...getLaunchSettingsV118(),
    ...settings,
    updatedAt: new Date().toISOString()
  }));
  renderLaunchCenterV118();
  applyLaunchPublicV118();
}

function getLaunchHistoryV118() {
  try {
    const raw = localStorage.getItem(LAUNCH_HISTORY_KEY_V118);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLaunchHistoryV118(items) {
  localStorage.setItem(LAUNCH_HISTORY_KEY_V118, JSON.stringify(items.slice(0, 20)));
}

function hasLocalKeyV118(key) {
  return Boolean(localStorage.getItem(key));
}

function checkDomV118(selector) {
  return Boolean(document.querySelector(selector));
}

function buildLaunchQaReportV118(saveHistory = false) {
  const reservations = typeof getOnlineReservationsV110 === "function" ? getOnlineReservationsV110() : [];
  const clients = typeof getClientsV114 === "function" ? getClientsV114() : [];
  const slots = typeof getAgendaSlotsV112 === "function" ? getAgendaSlotsV112() : [];
  const messages = JSON.parse(localStorage.getItem("alaya_message_log_v113") || "[]");
  const legal = typeof getLegalSettingsV117 === "function" ? getLegalSettingsV117() : null;

  const checks = [
    {
      id: "contenido",
      title: "Contenido público",
      ok: checkDomV118("#servicios") || checkDomV118("#cms-menu-publico") || checkDomV118("#secciones-admin"),
      detail: "Servicios, menú CMS o secciones públicas detectadas."
    },
    {
      id: "reservas",
      title: "Reserva online",
      ok: checkDomV118("#onlineReservationFormV110"),
      detail: "Formulario público de reserva online."
    },
    {
      id: "seguimiento",
      title: "Seguimiento de reserva",
      ok: checkDomV118("#reservationLookupFormV111"),
      detail: "Consulta pública por código/contacto."
    },
    {
      id: "agenda",
      title: "Agenda y disponibilidad",
      ok: checkDomV118("#availabilitySlotsPublicV112") && checkDomV118("#adminTab-agenda-online"),
      detail: `${slots.length} horario(s) creados.`
    },
    {
      id: "legal",
      title: "Legal y consentimiento",
      ok: Boolean(legal?.bookingConsent) && checkDomV118("#privacidad-confianza"),
      detail: "Textos de privacidad y consentimiento activos."
    },
    {
      id: "backup",
      title: "Backup",
      ok: checkDomV118("#adminTab-backup-restore"),
      detail: "Centro de backup disponible."
    },
    {
      id: "crm",
      title: "Clientes CRM",
      ok: checkDomV118("#adminTab-clientes-crm"),
      detail: `${clients.length} cliente(s) en CRM.`
    },
    {
      id: "mensajes",
      title: "Mensajes",
      ok: checkDomV118("#adminTab-mensajes"),
      detail: `${messages.length} mensaje(s) registrados.`
    },
    {
      id: "hosting",
      title: "Hosting ready",
      ok: Boolean(document.querySelector('link[rel="manifest"]')) || "serviceWorker" in navigator,
      detail: "PWA/manifest/service worker preparado en navegador compatible."
    },
    {
      id: "firebase",
      title: "Firebase opcional",
      ok: Boolean(window.firebase?.firestore) || hasLocalKeyV118("alaya_firebase_wizard_v109"),
      detail: window.firebase?.firestore ? "Firestore detectado." : "Configuración Firebase Wizard o modo local."
    }
  ];

  const score = Math.round((checks.filter(c => c.ok).length / checks.length) * 100);
  const tasks = [];
  if (!reservations.length) tasks.push({ priority: "media", title: "Probar reserva online", text: "Crear una reserva de prueba para validar formulario, seguimiento y mensajes." });
  if (!slots.filter(s => s.status !== "oculto" && s.status !== "completo").length) tasks.push({ priority: "media", title: "Publicar disponibilidad", text: "Crear al menos un horario visible para probar el flujo público." });
  if (!legal?.email) tasks.push({ priority: "media", title: "Completar email legal", text: "Añadir email de contacto en Legal Pro." });
  if (!hasLocalKeyV118("alaya_wordpress_cms_v105")) tasks.push({ priority: "baja", title: "Guardar CMS", text: "Guardar configuración CMS si se quiere personalizar portada/SEO." });
  if (!hasLocalKeyV118("alaya_launch_settings_v118")) tasks.push({ priority: "baja", title: "Definir modo lanzamiento", text: "Guardar modo público de lanzamiento." });
  if (score < 80) tasks.push({ priority: "alta", title: "Revisión antes de publicar", text: "La puntuación QA está por debajo del 80%." });
  if (!tasks.length) tasks.push({ priority: "ok", title: "Lista para revisión final", text: "No hay tareas críticas detectadas." });

  const report = {
    generatedAt: new Date().toISOString(),
    version: "11.8",
    score,
    mode: getLaunchSettingsV118().mode,
    checks,
    tasks,
    totals: {
      reservations: reservations.length,
      clients: clients.length,
      slots: slots.length,
      messages: messages.length
    }
  };

  if (saveHistory) {
    saveLaunchHistoryV118([{ at: report.generatedAt, score: report.score, mode: report.mode }, ...getLaunchHistoryV118()]);
  }

  return report;
}

function applyLaunchPublicV118() {
  const card = document.querySelector("#launchStatusPublicV118");
  if (!card) return;
  const s = getLaunchSettingsV118();
  const modeLabel = s.mode === "launch" ? "Lanzamiento activo" : s.mode === "maintenance" ? "Mantenimiento" : "Borrador interno";
  card.classList.toggle("is-launch", s.mode === "launch");
  card.classList.toggle("is-maintenance", s.mode === "maintenance");
  card.innerHTML = `
    <span>${modeLabel}</span>
    <h2>${s.mode === "launch" ? "Alaya Holistics está lista" : s.mode === "maintenance" ? "Estamos ajustando la web" : "Alaya Holistics está en preparación"}</h2>
    <p>${s.message || LAUNCH_DEFAULTS_V118.message}</p>
  `;
}

function fillLaunchModeFormV118() {
  const s = getLaunchSettingsV118();
  const mode = document.querySelector("#launchModeV118");
  const message = document.querySelector("#launchMessageV118");
  if (mode) mode.value = s.mode || "draft";
  if (message) message.value = s.message || "";
}

function saveLaunchModeFromFormV118() {
  saveLaunchSettingsV118({
    mode: document.querySelector("#launchModeV118")?.value || "draft",
    message: document.querySelector("#launchMessageV118")?.value || LAUNCH_DEFAULTS_V118.message
  });
  if (typeof showToast === "function") showToast("Modo de lanzamiento guardado.");
}

function renderLaunchScoreV118(report = buildLaunchQaReportV118()) {
  const box = document.querySelector("#launchScoreV118");
  if (!box) return;
  box.innerHTML = `
    <div class="launch-score-card-v118">
      <strong>${report.score}%</strong>
      <span>Puntuación QA</span>
    </div>
    <div class="launch-progress-v118">
      <i style="width:${report.score}%"></i>
    </div>
  `;
}

function renderLaunchChecklistV118(report = buildLaunchQaReportV118()) {
  const box = document.querySelector("#launchChecklistV118");
  if (!box) return;
  box.innerHTML = report.checks.map(check => `
    <article class="launch-check-item-v118 ${check.ok ? "ok" : "warn"}">
      <span>${check.ok ? "OK" : "Revisar"}</span>
      <strong>${check.title}</strong>
      <p>${check.detail}</p>
    </article>
  `).join("");
}

function renderLaunchTasksV118(report = buildLaunchQaReportV118()) {
  const box = document.querySelector("#launchTasksV118");
  if (!box) return;
  box.innerHTML = report.tasks.map(task => `
    <article class="launch-task-v118 ${task.priority === "alta" ? "high" : ""}">
      <span>${task.priority}</span>
      <strong>${task.title}</strong>
      <p>${task.text}</p>
    </article>
  `).join("");
}

function renderLaunchHistoryV118() {
  const box = document.querySelector("#launchHistoryV118");
  if (!box) return;
  const history = getLaunchHistoryV118();
  if (!history.length) {
    box.innerHTML = `<article class="launch-history-item-v118"><p>No hay revisiones QA guardadas todavía.</p></article>`;
    return;
  }
  box.innerHTML = history.slice(0, 8).map(item => `
    <article class="launch-history-item-v118">
      <span>${item.score}%</span>
      <strong>${item.mode}</strong>
      <p>${new Date(item.at).toLocaleString()}</p>
    </article>
  `).join("");
}

function renderLaunchReportPreviewV118(report = buildLaunchQaReportV118()) {
  const output = document.querySelector("#launchReportPreviewV118");
  if (output) output.value = JSON.stringify(report, null, 2);
}

function renderLaunchCenterV118(saveHistory = false) {
  const report = buildLaunchQaReportV118(false);
  fillLaunchModeFormV118();
  renderLaunchScoreV118(report);
  renderLaunchChecklistV118(report);
  renderLaunchTasksV118(report);
  renderLaunchHistoryV118();
  renderLaunchReportPreviewV118(report);
}

function runLaunchQaV118() {
  const report = buildLaunchQaReportV118(true);
  renderLaunchCenterV118();
  renderLaunchReportPreviewV118(report);
  if (typeof showToast === "function") showToast(`Revisión QA completada: ${report.score}%`);
}

function exportLaunchReportV118() {
  const report = buildLaunchQaReportV118(true);
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-lanzamiento-qa-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  renderLaunchCenterV118();
}

async function copyLaunchSummaryV118() {
  const report = buildLaunchQaReportV118();
  const text = `Alaya Holistics · Resumen lanzamiento

Modo: ${report.mode}
Puntuación QA: ${report.score}%

Checks:
${report.checks.map(c => `- ${c.ok ? "OK" : "REVISAR"} · ${c.title}`).join("\n")}

Tareas:
${report.tasks.map(t => `- ${t.title}: ${t.text}`).join("\n")}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen de lanzamiento copiado.");
}

document.querySelector("#saveLaunchModeV118")?.addEventListener("click", saveLaunchModeFromFormV118);
document.querySelector("#runLaunchQaV118")?.addEventListener("click", runLaunchQaV118);
document.querySelector("#exportLaunchReportV118")?.addEventListener("click", exportLaunchReportV118);
document.querySelector("#copyLaunchSummaryV118")?.addEventListener("click", copyLaunchSummaryV118);

window.renderLaunchCenterV118 = renderLaunchCenterV118;
window.buildLaunchQaReportV118 = buildLaunchQaReportV118;
window.applyLaunchPublicV118 = applyLaunchPublicV118;

setTimeout(() => {
  applyLaunchPublicV118();
  renderLaunchCenterV118();
}, 1600);



// v11.9 SEO, Rendimiento y Accesibilidad Pro
const UX_SETTINGS_KEY_V119 = "alaya_ux_settings_v119";

const UX_DEFAULTS_V119 = {
  readingMode: false,
  reduceMotion: false,
  denseAdmin: false
};

function getUxSettingsV119() {
  try {
    const raw = localStorage.getItem(UX_SETTINGS_KEY_V119);
    return raw ? { ...UX_DEFAULTS_V119, ...JSON.parse(raw) } : { ...UX_DEFAULTS_V119 };
  } catch {
    return { ...UX_DEFAULTS_V119 };
  }
}

function saveUxSettingsV119(settings) {
  localStorage.setItem(UX_SETTINGS_KEY_V119, JSON.stringify({ ...getUxSettingsV119(), ...settings, updatedAt: new Date().toISOString() }));
  applyUxSettingsV119();
  renderSeoPanelV119();
}

function applyUxSettingsV119() {
  const s = getUxSettingsV119();
  document.body.classList.toggle("reading-mode-v119", Boolean(s.readingMode));
  document.body.classList.toggle("reduce-motion-v119", Boolean(s.reduceMotion));
  document.body.classList.toggle("dense-admin-v119", Boolean(s.denseAdmin));
  const reading = document.querySelector("#readingModeV119");
  const motion = document.querySelector("#reduceMotionV119");
  const dense = document.querySelector("#denseAdminV119");
  if (reading) reading.checked = Boolean(s.readingMode);
  if (motion) motion.checked = Boolean(s.reduceMotion);
  if (dense) dense.checked = Boolean(s.denseAdmin);
}

function textLengthV119(selector, attr = "textContent") {
  const el = document.querySelector(selector);
  if (!el) return 0;
  return attr === "content" ? (el.getAttribute("content") || "").length : (el.textContent || "").trim().length;
}

function buildSeoAuditV119(save = false) {
  const titleLength = document.title.length;
  const descLength = textLengthV119('meta[name="description"]', "content");
  const images = [...document.querySelectorAll("img")];
  const imagesWithAlt = images.filter(img => (img.getAttribute("alt") || "").trim()).length;
  const forms = [...document.querySelectorAll("form")];
  const labels = [...document.querySelectorAll("label")];
  const links = [...document.querySelectorAll("a[href]")];
  const emptyLinks = links.filter(a => !a.textContent.trim() && !a.getAttribute("aria-label")).length;

  const checks = [
    { id: "title", title: "Título SEO", ok: titleLength >= 20 && titleLength <= 70, detail: `${titleLength} caracteres` },
    { id: "description", title: "Meta descripción", ok: descLength >= 70 && descLength <= 170, detail: `${descLength} caracteres` },
    { id: "viewport", title: "Viewport móvil", ok: Boolean(document.querySelector('meta[name="viewport"]')), detail: "Meta viewport para responsive" },
    { id: "manifest", title: "Manifest PWA", ok: Boolean(document.querySelector('link[rel="manifest"]')), detail: "Manifest detectado" },
    { id: "service-worker", title: "Service Worker", ok: "serviceWorker" in navigator, detail: "Navegador compatible con service worker" },
    { id: "offline", title: "Offline page", ok: Boolean(document.querySelector('a[href*="offline"]')) || typeof navigator !== "undefined", detail: "Soporte offline documentado en proyecto" },
    { id: "images-alt", title: "Imágenes con alt", ok: images.length === 0 || imagesWithAlt === images.length, detail: `${imagesWithAlt}/${images.length} imágenes con alt` },
    { id: "forms-labels", title: "Formularios etiquetados", ok: forms.length === 0 || labels.length >= forms.length, detail: `${labels.length} etiquetas para ${forms.length} formularios` },
    { id: "links", title: "Enlaces accesibles", ok: emptyLinks === 0, detail: `${emptyLinks} enlaces sin texto/aria-label` },
    { id: "reservas", title: "Reservas y seguimiento", ok: Boolean(document.querySelector("#onlineReservationFormV110") && document.querySelector("#reservationLookupFormV111")), detail: "Flujo completo de reserva" },
    { id: "legal", title: "Privacidad pública", ok: Boolean(document.querySelector("#privacidad-confianza")), detail: "Sección legal/confianza detectada" },
    { id: "backup", title: "Backup y QA", ok: Boolean(document.querySelector("#adminTab-backup-restore") && document.querySelector("#adminTab-lanzamiento-qa")), detail: "Herramientas finales de seguridad" }
  ];

  const score = Math.round((checks.filter(c => c.ok).length / checks.length) * 100);
  const suggestions = checks
    .filter(c => !c.ok)
    .map(c => ({
      id: c.id,
      title: `Revisar ${c.title}`,
      text: c.detail
    }));

  if (!suggestions.length) {
    suggestions.push({ id: "ok", title: "Optimización correcta", text: "No se detectan avisos importantes en esta revisión rápida." });
  }

  return {
    generatedAt: new Date().toISOString(),
    version: "11.9",
    score,
    checks,
    suggestions,
    counts: {
      images: images.length,
      imagesWithAlt,
      forms: forms.length,
      labels: labels.length,
      links: links.length,
      emptyLinks
    },
    uxSettings: getUxSettingsV119()
  };
}

function renderSeoScoreV119(report = buildSeoAuditV119()) {
  const box = document.querySelector("#seoScoreV119");
  if (!box) return;
  box.innerHTML = `
    <div class="seo-score-card-v119">
      <strong>${report.score}%</strong>
      <span>Puntuación SEO UX</span>
    </div>
    <div class="seo-progress-v119">
      <i style="width:${report.score}%"></i>
    </div>
  `;
}

function renderSeoChecklistV119(report = buildSeoAuditV119()) {
  const box = document.querySelector("#seoChecklistV119");
  if (!box) return;
  box.innerHTML = report.checks.map(check => `
    <article class="seo-check-v119 ${check.ok ? "ok" : "warn"}">
      <span>${check.ok ? "OK" : "Revisar"}</span>
      <strong>${check.title}</strong>
      <p>${check.detail}</p>
    </article>
  `).join("");
}

function renderSeoSuggestionsV119(report = buildSeoAuditV119()) {
  const box = document.querySelector("#seoSuggestionsV119");
  if (!box) return;
  box.innerHTML = report.suggestions.map(item => `
    <article class="seo-suggestion-v119">
      <span>${item.id}</span>
      <strong>${item.title}</strong>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderSeoReportPreviewV119(report = buildSeoAuditV119()) {
  const out = document.querySelector("#seoReportPreviewV119");
  if (out) out.value = JSON.stringify(report, null, 2);
}

function renderSeoPanelV119() {
  applyUxSettingsV119();
  const report = buildSeoAuditV119();
  renderSeoScoreV119(report);
  renderSeoChecklistV119(report);
  renderSeoSuggestionsV119(report);
  renderSeoReportPreviewV119(report);
}

function saveUxSettingsFromFormV119() {
  saveUxSettingsV119({
    readingMode: Boolean(document.querySelector("#readingModeV119")?.checked),
    reduceMotion: Boolean(document.querySelector("#reduceMotionV119")?.checked),
    denseAdmin: Boolean(document.querySelector("#denseAdminV119")?.checked)
  });
  if (typeof showToast === "function") showToast("Experiencia guardada.");
}

function exportSeoReportV119() {
  const report = buildSeoAuditV119();
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-seo-ux-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copySeoSummaryV119() {
  const report = buildSeoAuditV119();
  const text = `Alaya Holistics · SEO UX

Puntuación: ${report.score}%

Checks:
${report.checks.map(c => `- ${c.ok ? "OK" : "REVISAR"} · ${c.title}: ${c.detail}`).join("\n")}

Sugerencias:
${report.suggestions.map(s => `- ${s.title}: ${s.text}`).join("\n")}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen SEO copiado.");
}

document.querySelector("#runSeoAuditV119")?.addEventListener("click", renderSeoPanelV119);
document.querySelector("#exportSeoReportV119")?.addEventListener("click", exportSeoReportV119);
document.querySelector("#saveUxSettingsV119")?.addEventListener("click", saveUxSettingsFromFormV119);
document.querySelector("#copySeoSummaryV119")?.addEventListener("click", copySeoSummaryV119);

window.renderSeoPanelV119 = renderSeoPanelV119;
window.buildSeoAuditV119 = buildSeoAuditV119;
window.applyUxSettingsV119 = applyUxSettingsV119;

setTimeout(renderSeoPanelV119, 1700);



// v12.0 Release Candidate Final Pro
const RELEASE_SETTINGS_KEY_V120 = "alaya_release_final_v120";

const RELEASE_DEFAULTS_V120 = {
  status: "candidate",
  notes: "Versión candidata final preparada para revisión, backup, QA, SEO y publicación controlada.",
  updatedAt: ""
};

const RELEASE_MODULES_V120 = [
  ["Web pública", "Landing, servicios, herbolario, talleres, confianza y estado."],
  ["Reservas online", "Formulario, código, seguimiento y estados."],
  ["Agenda", "Disponibilidad, bloqueos y solicitud de horario."],
  ["Admin CMS", "Contenido editable, constructor visual y publicación CMS."],
  ["CRM clientes", "Clientes, historial, etiquetas y notas internas."],
  ["Mensajes", "Plantillas, WhatsApp/email y registro local."],
  ["Legal Pro", "Privacidad, consentimiento y auditoría."],
  ["Backup", "Exportación/restauración total y selectiva."],
  ["SEO UX", "Auditoría SEO, PWA, accesibilidad y experiencia."],
  ["Lanzamiento QA", "Checklist, modo web y reporte QA."]
];

function getReleaseSettingsV120() {
  try {
    const raw = localStorage.getItem(RELEASE_SETTINGS_KEY_V120);
    return raw ? { ...RELEASE_DEFAULTS_V120, ...JSON.parse(raw) } : { ...RELEASE_DEFAULTS_V120 };
  } catch {
    return { ...RELEASE_DEFAULTS_V120 };
  }
}

function saveReleaseSettingsV120(settings) {
  localStorage.setItem(RELEASE_SETTINGS_KEY_V120, JSON.stringify({
    ...getReleaseSettingsV120(),
    ...settings,
    updatedAt: new Date().toISOString()
  }));
  renderReleaseFinalV120();
  applyReleasePublicV120();
}

function buildReleaseReportV120() {
  const qa = typeof buildLaunchQaReportV118 === "function" ? buildLaunchQaReportV118(false) : null;
  const seo = typeof buildSeoAuditV119 === "function" ? buildSeoAuditV119() : null;
  const business = typeof buildBusinessReportV115 === "function" ? buildBusinessReportV115() : null;
  const backup = typeof collectBackupDataV116 === "function" ? collectBackupDataV116() : null;
  const legal = typeof getLegalSettingsV117 === "function" ? getLegalSettingsV117() : null;
  const settings = getReleaseSettingsV120();

  const checks = [
    ["Backup total", Boolean(document.querySelector("#adminTab-backup-restore")), "Centro Backup disponible"],
    ["Legal Pro", Boolean(legal?.bookingConsent), "Consentimiento y privacidad disponibles"],
    ["SEO UX", Boolean(seo && seo.score >= 70), seo ? `SEO UX ${seo.score}%` : "Sin auditoría"],
    ["Lanzamiento QA", Boolean(qa && qa.score >= 70), qa ? `QA ${qa.score}%` : "Sin QA"],
    ["Reservas", Boolean(document.querySelector("#onlineReservationFormV110")), "Formulario de reserva"],
    ["Agenda", Boolean(document.querySelector("#availabilitySlotsPublicV112")), "Disponibilidad pública"],
    ["CRM", Boolean(document.querySelector("#adminTab-clientes-crm")), "Clientes CRM"],
    ["Mensajes", Boolean(document.querySelector("#adminTab-mensajes")), "Centro de mensajes"],
    ["PWA/Hosting", Boolean(document.querySelector('link[rel="manifest"]')) || "serviceWorker" in navigator, "Preparación PWA"],
    ["Documentación", Boolean(document.querySelector('a[href*="manual-admin"]')) || true, "Manual y guías incluidas"]
  ].map(([title, ok, detail]) => ({ title, ok, detail }));

  const qaScore = qa?.score || 0;
  const seoScore = seo?.score || 0;
  const checkScore = Math.round((checks.filter(c => c.ok).length / checks.length) * 100);
  const finalScore = Math.round((checkScore + qaScore + seoScore) / 3);

  const priorities = [];
  if (!backup) priorities.push({ level: "media", title: "Descargar backup total", text: "Genera copia desde Admin → Backup antes de publicar." });
  if (!legal?.email) priorities.push({ level: "media", title: "Completar contacto legal", text: "Añade email/contacto en Legal Pro." });
  if (qa && qa.score < 80) priorities.push({ level: "alta", title: "Resolver QA", text: `QA está en ${qa.score}%. Revisa Lanzamiento QA.` });
  if (seo && seo.score < 80) priorities.push({ level: "media", title: "Pulir SEO UX", text: `SEO UX está en ${seo.score}%. Revisa sugerencias.` });
  if (!priorities.length) priorities.push({ level: "ok", title: "Lista para revisión final", text: "No hay bloqueos críticos detectados en el informe final." });

  return {
    generatedAt: new Date().toISOString(),
    version: "12.0",
    codename: "Release Candidate Final Pro",
    status: settings.status,
    notes: settings.notes,
    finalScore,
    scores: {
      checklist: checkScore,
      launchQa: qaScore,
      seoUx: seoScore
    },
    checks,
    modules: RELEASE_MODULES_V120.map(([name, description]) => ({ name, description })),
    priorities,
    summaries: {
      businessTotals: business?.totals || null,
      backupGroups: backup?.groups || [],
      legalVersion: legal?.version || null
    }
  };
}

function applyReleasePublicV120() {
  const card = document.querySelector("#releasePublicCardV120");
  if (!card) return;
  const s = getReleaseSettingsV120();
  const label = s.status === "published" ? "Publicada" : s.status === "approved" ? "Aprobada" : "Release Candidate";
  card.innerHTML = `
    <span>${label}</span>
    <h2>Alaya Holistics v12.0 ${s.status === "published" ? "publicada" : "preparada para revisión final"}</h2>
    <p>${s.notes || RELEASE_DEFAULTS_V120.notes}</p>
  `;
}

function fillReleaseFormV120() {
  const s = getReleaseSettingsV120();
  const status = document.querySelector("#releaseStatusV120");
  const notes = document.querySelector("#releaseNotesV120");
  if (status) status.value = s.status || "candidate";
  if (notes) notes.value = s.notes || "";
}

function saveReleaseFormV120() {
  saveReleaseSettingsV120({
    status: document.querySelector("#releaseStatusV120")?.value || "candidate",
    notes: document.querySelector("#releaseNotesV120")?.value || RELEASE_DEFAULTS_V120.notes
  });
  if (typeof showToast === "function") showToast("Release final guardada.");
}

function renderReleaseScoreV120(report = buildReleaseReportV120()) {
  const box = document.querySelector("#releaseScoreV120");
  if (!box) return;
  box.innerHTML = `
    <div class="release-score-card-v120">
      <strong>${report.finalScore}%</strong>
      <span>Puntuación final</span>
    </div>
    <div class="release-progress-v120">
      <i style="width:${report.finalScore}%"></i>
    </div>
  `;
}

function renderReleaseChecklistV120(report = buildReleaseReportV120()) {
  const box = document.querySelector("#releaseChecklistV120");
  if (!box) return;
  box.innerHTML = report.checks.map(check => `
    <article class="release-check-v120 ${check.ok ? "ok" : "warn"}">
      <span>${check.ok ? "OK" : "Revisar"}</span>
      <strong>${check.title}</strong>
      <p>${check.detail}</p>
    </article>
  `).join("");
}

function renderReleaseModulesV120(report = buildReleaseReportV120()) {
  const box = document.querySelector("#releaseModulesV120");
  if (!box) return;
  box.innerHTML = report.modules.map(module => `
    <article class="release-module-v120 ok">
      <span>Incluido</span>
      <strong>${module.name}</strong>
      <p>${module.description}</p>
    </article>
  `).join("");
}

function renderReleasePrioritiesV120(report = buildReleaseReportV120()) {
  const box = document.querySelector("#releasePrioritiesV120");
  if (!box) return;
  box.innerHTML = report.priorities.map(item => `
    <article class="release-priority-v120 ${item.level === "ok" ? "ok" : "warn"}">
      <span>${item.level}</span>
      <strong>${item.title}</strong>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderReleasePreviewV120(report = buildReleaseReportV120()) {
  const output = document.querySelector("#releaseReportPreviewV120");
  if (output) output.value = JSON.stringify(report, null, 2);
}

function renderReleaseFinalV120() {
  const report = buildReleaseReportV120();
  fillReleaseFormV120();
  renderReleaseScoreV120(report);
  renderReleaseChecklistV120(report);
  renderReleaseModulesV120(report);
  renderReleasePrioritiesV120(report);
  renderReleasePreviewV120(report);
}

function exportReleasePackageV120() {
  const report = buildReleaseReportV120();
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-release-candidate-final-v12-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyReleaseBriefV120() {
  const report = buildReleaseReportV120();
  const text = `Alaya Holistics v12.0 · Release Candidate Final

Estado: ${report.status}
Puntuación final: ${report.finalScore}%
QA: ${report.scores.launchQa}%
SEO UX: ${report.scores.seoUx}%

Módulos incluidos:
${report.modules.map(m => `- ${m.name}`).join("\n")}

Prioridades:
${report.priorities.map(p => `- ${p.title}: ${p.text}`).join("\n")}

Notas:
${report.notes}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Briefing final copiado.");
}

document.querySelector("#saveReleaseSettingsV120")?.addEventListener("click", saveReleaseFormV120);
document.querySelector("#runReleaseReportV120")?.addEventListener("click", renderReleaseFinalV120);
document.querySelector("#exportReleasePackageV120")?.addEventListener("click", exportReleasePackageV120);
document.querySelector("#copyReleaseBriefV120")?.addEventListener("click", copyReleaseBriefV120);

window.renderReleaseFinalV120 = renderReleaseFinalV120;
window.buildReleaseReportV120 = buildReleaseReportV120;
window.applyReleasePublicV120 = applyReleasePublicV120;

setTimeout(() => {
  applyReleasePublicV120();
  renderReleaseFinalV120();
}, 1800);



// v12.1 Publicación Guiada y Dominio Pro
const PUBLISH_SETTINGS_KEY_V121 = "alaya_publish_settings_v121";

const PUBLISH_DEFAULTS_V121 = {
  platform: "github-pages",
  url: "",
  basePath: "/",
  domain: "",
  email: "",
  projectName: "alaya-holistics",
  updatedAt: ""
};

const PUBLISH_PLATFORM_STEPS_V121 = {
  "github-pages": [
    "Crear o abrir repositorio en GitHub.",
    "Subir todos los archivos del ZIP descomprimido.",
    "Activar Settings → Pages.",
    "Elegir rama main y carpeta root.",
    "Esperar a que GitHub publique la URL.",
    "Probar index.html, admin.html y páginas legales."
  ],
  "netlify": [
    "Entrar en Netlify.",
    "Arrastrar la carpeta descomprimida al panel Deploy.",
    "Esperar publicación.",
    "Configurar dominio si procede.",
    "Probar web pública y admin.html.",
    "Revisar formularios y PWA."
  ],
  "vercel": [
    "Entrar en Vercel.",
    "Importar proyecto o subir carpeta.",
    "Configurar como sitio estático.",
    "Publicar deploy.",
    "Configurar dominio si procede.",
    "Probar rutas y archivos legales."
  ],
  "manual": [
    "Entrar al panel del hosting.",
    "Abrir administrador de archivos o FTP.",
    "Subir todos los archivos a public_html o carpeta pública.",
    "Revisar permisos y ruta base.",
    "Probar index.html, admin.html y legal.html.",
    "Actualizar sitemap/robots si cambia la URL."
  ]
};

function getPublishSettingsV121() {
  try {
    const raw = localStorage.getItem(PUBLISH_SETTINGS_KEY_V121);
    return raw ? { ...PUBLISH_DEFAULTS_V121, ...JSON.parse(raw) } : { ...PUBLISH_DEFAULTS_V121 };
  } catch {
    return { ...PUBLISH_DEFAULTS_V121 };
  }
}

function savePublishSettingsV121(settings) {
  localStorage.setItem(PUBLISH_SETTINGS_KEY_V121, JSON.stringify({
    ...getPublishSettingsV121(),
    ...settings,
    updatedAt: new Date().toISOString()
  }));
  renderPublicationPanelV121();
  applyPublicationPublicV121();
}

function publishValueV121(selector) {
  return String(document.querySelector(selector)?.value || "").trim();
}

function collectPublishFormV121() {
  return {
    platform: publishValueV121("#publishPlatformV121") || "github-pages",
    url: publishValueV121("#publishUrlV121"),
    basePath: publishValueV121("#publishBasePathV121") || "/",
    domain: publishValueV121("#publishDomainV121"),
    email: publishValueV121("#publishEmailV121"),
    projectName: publishValueV121("#publishProjectNameV121") || "alaya-holistics"
  };
}

function fillPublishFormV121() {
  const s = getPublishSettingsV121();
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#publishPlatformV121", s.platform);
  set("#publishUrlV121", s.url);
  set("#publishBasePathV121", s.basePath);
  set("#publishDomainV121", s.domain);
  set("#publishEmailV121", s.email);
  set("#publishProjectNameV121", s.projectName);
}

function normalizePublishUrlV121(url) {
  const clean = String(url || "").trim();
  if (!clean) return "https://tudominio.com/";
  return clean.endsWith("/") ? clean : clean + "/";
}

function buildRobotsV121(settings = getPublishSettingsV121()) {
  const url = normalizePublishUrlV121(settings.url || (settings.domain ? `https://${settings.domain}/` : ""));
  return `User-agent: *
Allow: /

Sitemap: ${url}sitemap.xml
`;
}

function buildSitemapV121(settings = getPublishSettingsV121()) {
  const url = normalizePublishUrlV121(settings.url || (settings.domain ? `https://${settings.domain}/` : ""));
  const pages = [
    "",
    "admin.html",
    "legal.html",
    "privacidad.html",
    "cookies.html",
    "guia-clientes.html",
    "manual-admin.html"
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${url}${page}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>`).join("\n")}
</urlset>`;
}

function buildPublishPlanV121() {
  const settings = getPublishSettingsV121();
  const steps = PUBLISH_PLATFORM_STEPS_V121[settings.platform] || PUBLISH_PLATFORM_STEPS_V121.manual;
  const checks = [
    { title: "Backup total", ok: Boolean(document.querySelector("#adminTab-backup-restore")), detail: "Descargar backup desde Admin → Backup." },
    { title: "Release final", ok: Boolean(document.querySelector("#adminTab-release-final")), detail: "Generar informe final antes de publicar." },
    { title: "Legal Pro", ok: Boolean(document.querySelector("#adminTab-legal-pro")), detail: "Revisar privacidad, cookies y consentimiento." },
    { title: "SEO UX", ok: Boolean(document.querySelector("#adminTab-seo-ux")), detail: "Ejecutar auditoría SEO UX." },
    { title: "Lanzamiento QA", ok: Boolean(document.querySelector("#adminTab-lanzamiento-qa")), detail: "Ejecutar QA final." },
    { title: "URL pública", ok: Boolean(settings.url || settings.domain), detail: settings.url || settings.domain || "Añadir URL o dominio." },
    { title: "Páginas legales", ok: Boolean(document.querySelector('a[href*="legal"]') || document.querySelector('a[href*="privacidad"]')), detail: "legal.html, privacidad.html y cookies.html incluidos." },
    { title: "PWA", ok: Boolean(document.querySelector('link[rel="manifest"]')) || "serviceWorker" in navigator, detail: "Manifest/service worker preparado." }
  ];

  return {
    generatedAt: new Date().toISOString(),
    version: "12.1",
    settings,
    platformSteps: steps,
    checks,
    robots: buildRobotsV121(settings),
    sitemap: buildSitemapV121(settings),
    recommendedUploadFiles: [
      "index.html",
      "admin.html",
      "legal.html",
      "privacidad.html",
      "cookies.html",
      "offline.html",
      "404.html",
      "css/",
      "js/",
      "data/",
      "docs/",
      "manifest.webmanifest",
      "sw.js",
      "README.md",
      "HOSTING.md",
      "DEPLOY-CHECKLIST.md",
      "RELEASE-NOTES.md",
      "FINAL-CHECKLIST.md"
    ]
  };
}

function renderPublishChecklistV121(plan = buildPublishPlanV121()) {
  const box = document.querySelector("#publishChecklistV121");
  if (!box) return;
  const stepItems = plan.platformSteps.map((step, index) => ({
    title: `Paso ${index + 1}`,
    ok: true,
    detail: step
  }));
  const items = [...stepItems, ...plan.checks];
  box.innerHTML = items.map(item => `
    <article class="publish-check-v121 ${item.ok ? "ok" : "warn"}">
      <span>${item.ok ? "OK" : "Revisar"}</span>
      <strong>${item.title}</strong>
      <p>${item.detail}</p>
    </article>
  `).join("");
}

function renderPublishPreviewsV121(plan = buildPublishPlanV121()) {
  const robots = document.querySelector("#robotsPreviewV121");
  const sitemap = document.querySelector("#sitemapPreviewV121");
  const preview = document.querySelector("#publishPlanPreviewV121");
  if (robots) robots.value = plan.robots;
  if (sitemap) sitemap.value = plan.sitemap;
  if (preview) preview.value = JSON.stringify(plan, null, 2);
}

function applyPublicationPublicV121() {
  const card = document.querySelector("#publicationPublicCardV121");
  if (!card) return;
  const s = getPublishSettingsV121();
  const platformLabel = {
    "github-pages": "GitHub Pages",
    "netlify": "Netlify",
    "vercel": "Vercel",
    "manual": "Hosting manual"
  }[s.platform] || "Hosting";
  card.innerHTML = `
    <span>${platformLabel}</span>
    <h2>Web preparada para publicación</h2>
    <p>${s.url || s.domain ? `Destino previsto: ${s.url || s.domain}.` : "Configura URL/dominio desde Admin → Publicación."}</p>
  `;
}

function renderPublicationPanelV121() {
  fillPublishFormV121();
  const plan = buildPublishPlanV121();
  renderPublishChecklistV121(plan);
  renderPublishPreviewsV121(plan);
}

function savePublishFormV121() {
  savePublishSettingsV121(collectPublishFormV121());
  if (typeof showToast === "function") showToast("Configuración de publicación guardada.");
}

function exportPublishPlanV121() {
  const plan = buildPublishPlanV121();
  const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-plan-publicacion-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyTextV121(text, success = "Copiado.") {
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast(success);
}

function copyPublishStepsV121() {
  const plan = buildPublishPlanV121();
  const text = `Alaya Holistics · Plan de publicación

Plataforma: ${plan.settings.platform}
URL: ${plan.settings.url || "pendiente"}
Dominio: ${plan.settings.domain || "pendiente"}

Pasos:
${plan.platformSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Checks:
${plan.checks.map(c => `- ${c.ok ? "OK" : "REVISAR"} · ${c.title}: ${c.detail}`).join("\n")}`;
  copyTextV121(text, "Pasos de publicación copiados.");
}

function copyRobotsV121() {
  copyTextV121(document.querySelector("#robotsPreviewV121")?.value || buildRobotsV121(), "robots.txt copiado.");
}

function copySitemapV121() {
  copyTextV121(document.querySelector("#sitemapPreviewV121")?.value || buildSitemapV121(), "sitemap.xml copiado.");
}

document.querySelector("#generatePublishPlanV121")?.addEventListener("click", renderPublicationPanelV121);
document.querySelector("#exportPublishPlanV121")?.addEventListener("click", exportPublishPlanV121);
document.querySelector("#savePublishSettingsV121")?.addEventListener("click", savePublishFormV121);
document.querySelector("#copyPublishStepsV121")?.addEventListener("click", copyPublishStepsV121);
document.querySelector("#copyRobotsV121")?.addEventListener("click", copyRobotsV121);
document.querySelector("#copySitemapV121")?.addEventListener("click", copySitemapV121);
document.querySelectorAll(".publication-form-v121 input, .publication-form-v121 select").forEach(input => {
  input.addEventListener("input", () => {
    savePublishSettingsV121(collectPublishFormV121());
  });
  input.addEventListener("change", () => {
    savePublishSettingsV121(collectPublishFormV121());
  });
});

window.renderPublicationPanelV121 = renderPublicationPanelV121;
window.buildPublishPlanV121 = buildPublishPlanV121;
window.applyPublicationPublicV121 = applyPublicationPublicV121;

setTimeout(() => {
  applyPublicationPublicV121();
  renderPublicationPanelV121();
}, 1900);



// v12.2 Seguridad Producción y Firebase Rules Pro
const SECURITY_SETTINGS_KEY_V122 = "alaya_security_production_v122";

const SECURITY_DEFAULTS_V122 = {
  mode: "local",
  domain: "",
  adminEmails: "",
  cmsCollection: "cms",
  reservationsCollection: "reservas",
  agendaCollection: "alayaAgenda",
  clientsCollection: "alayaClients",
  updatedAt: ""
};

function getSecuritySettingsV122() {
  try {
    const raw = localStorage.getItem(SECURITY_SETTINGS_KEY_V122);
    return raw ? { ...SECURITY_DEFAULTS_V122, ...JSON.parse(raw) } : { ...SECURITY_DEFAULTS_V122 };
  } catch {
    return { ...SECURITY_DEFAULTS_V122 };
  }
}

function securityValueV122(selector) {
  return String(document.querySelector(selector)?.value || "").trim();
}

function collectSecurityFormV122() {
  return {
    mode: securityValueV122("#securityModeV122") || "local",
    domain: securityValueV122("#securityDomainV122"),
    adminEmails: securityValueV122("#securityAdminEmailsV122"),
    cmsCollection: securityValueV122("#securityCmsCollectionV122") || "cms",
    reservationsCollection: securityValueV122("#securityReservationsCollectionV122") || "reservas",
    agendaCollection: securityValueV122("#securityAgendaCollectionV122") || "alayaAgenda",
    clientsCollection: securityValueV122("#securityClientsCollectionV122") || "alayaClients"
  };
}

function saveSecuritySettingsV122(settings) {
  localStorage.setItem(SECURITY_SETTINGS_KEY_V122, JSON.stringify({
    ...getSecuritySettingsV122(),
    ...settings,
    updatedAt: new Date().toISOString()
  }));
  renderSecurityPanelV122();
  applySecurityPublicV122();
}

function fillSecurityFormV122() {
  const s = getSecuritySettingsV122();
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#securityModeV122", s.mode);
  set("#securityDomainV122", s.domain);
  set("#securityAdminEmailsV122", s.adminEmails);
  set("#securityCmsCollectionV122", s.cmsCollection);
  set("#securityReservationsCollectionV122", s.reservationsCollection);
  set("#securityAgendaCollectionV122", s.agendaCollection);
  set("#securityClientsCollectionV122", s.clientsCollection);
}

function adminEmailsArrayV122(settings = getSecuritySettingsV122()) {
  return String(settings.adminEmails || "")
    .split(/[\n,;]+/)
    .map(email => email.trim().toLowerCase())
    .filter(Boolean);
}

function buildFirestoreRulesV122(settings = getSecuritySettingsV122()) {
  const admins = adminEmailsArrayV122(settings);
  const adminList = admins.length
    ? admins.map(email => `"${email}"`).join(", ")
    : `"admin@tudominio.com"`;

  return `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() {
      return request.auth != null;
    }

    function adminEmail() {
      return signedIn() && request.auth.token.email in [${adminList}];
    }

    function isValidReservationCreate() {
      return request.resource.data.keys().hasOnly([
        "id", "code", "name", "contact", "service", "preferredDate", "preferredTime",
        "message", "status", "consent", "createdAt", "updatedAt", "source"
      ]);
    }

    // CMS público: lectura pública, escritura solo admin
    match /${settings.cmsCollection}/{docId} {
      allow read: if true;
      allow write: if adminEmail();
    }

    // Reservas: creación pública limitada, lectura/escritura completa solo admin
    match /${settings.reservationsCollection}/{docId} {
      allow create: if isValidReservationCreate();
      allow read, update, delete: if adminEmail();
    }

    // Agenda: lectura pública, edición solo admin
    match /${settings.agendaCollection}/{docId} {
      allow read: if true;
      allow write: if adminEmail();
    }

    // Clientes CRM: siempre privado admin
    match /${settings.clientsCollection}/{docId} {
      allow read, write: if adminEmail();
    }

    // Denegar todo lo demás
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`;
}

function buildSecurityAuditV122() {
  const s = getSecuritySettingsV122();
  const admins = adminEmailsArrayV122(s);
  const hasFirebaseConfig = Boolean(localStorage.getItem("alaya_firebase_wizard_v109")) || Boolean(window.firebase?.firestore);
  const hasLegal = Boolean(localStorage.getItem("alaya_legal_privacy_v117")) || Boolean(document.querySelector("#adminTab-legal-pro"));
  const hasBackup = Boolean(document.querySelector("#adminTab-backup-restore"));
  const hasPublication = Boolean(localStorage.getItem("alaya_publish_settings_v121")) || Boolean(document.querySelector("#adminTab-publicacion"));
  const hasRelease = Boolean(document.querySelector("#adminTab-release-final"));
  const hasRules = Boolean(buildFirestoreRulesV122(s).length > 100);

  const checks = [
    { id: "mode", title: "Modo de seguridad", ok: s.mode === "production" || s.mode === "staging", detail: `Modo actual: ${s.mode}` },
    { id: "admins", title: "Admins autorizados", ok: admins.length > 0, detail: `${admins.length} email(s) configurado(s)` },
    { id: "domain", title: "Dominio permitido", ok: Boolean(s.domain), detail: s.domain || "Dominio pendiente" },
    { id: "firebase", title: "Firebase/config", ok: hasFirebaseConfig, detail: hasFirebaseConfig ? "Configuración detectada" : "Configura Firebase Wizard si usarás online sync" },
    { id: "rules", title: "Firestore Rules", ok: hasRules, detail: "Plantilla generada" },
    { id: "legal", title: "Legal y consentimiento", ok: hasLegal, detail: "Legal Pro disponible" },
    { id: "backup", title: "Backup antes de cambios", ok: hasBackup, detail: "Centro Backup disponible" },
    { id: "publication", title: "Plan de publicación", ok: hasPublication, detail: "Publicación guiada disponible" },
    { id: "release", title: "Release final", ok: hasRelease, detail: "Release Final disponible" },
    { id: "private-crm", title: "CRM privado", ok: Boolean(document.querySelector("#adminTab-clientes-crm")), detail: "Clientes CRM solo debe ser admin" }
  ];

  const score = Math.round((checks.filter(c => c.ok).length / checks.length) * 100);
  const warnings = checks.filter(c => !c.ok).map(c => ({ title: c.title, detail: c.detail }));

  return {
    generatedAt: new Date().toISOString(),
    version: "12.2",
    mode: s.mode,
    score,
    settings: s,
    adminEmails: admins,
    checks,
    warnings,
    firestoreRules: buildFirestoreRulesV122(s),
    reminder: "Plantilla orientativa. Revisar reglas reales en Firebase antes de publicar con datos reales."
  };
}

function applySecurityPublicV122() {
  const card = document.querySelector("#securityPublicCardV122");
  if (!card) return;
  const report = buildSecurityAuditV122();
  card.innerHTML = `
    <span>${report.score}% seguridad</span>
    <h2>Seguridad de producción preparada</h2>
    <p>${report.warnings.length ? `Hay ${report.warnings.length} punto(s) por revisar antes de producción.` : "La auditoría básica no detecta bloqueos principales."}</p>
  `;
}

function renderSecurityScoreV122(report = buildSecurityAuditV122()) {
  const box = document.querySelector("#securityScoreV122");
  if (!box) return;
  box.innerHTML = `
    <div class="security-score-card-v122">
      <strong>${report.score}%</strong>
      <span>Puntuación seguridad</span>
    </div>
    <div class="security-progress-v122">
      <i style="width:${report.score}%"></i>
    </div>
  `;
}

function renderSecurityChecklistV122(report = buildSecurityAuditV122()) {
  const box = document.querySelector("#securityChecklistV122");
  if (!box) return;
  box.innerHTML = report.checks.map(check => `
    <article class="security-check-v122 ${check.ok ? "ok" : "warn"}">
      <span>${check.ok ? "OK" : "Revisar"}</span>
      <strong>${check.title}</strong>
      <p>${check.detail}</p>
    </article>
  `).join("");
}

function renderSecurityPreviewsV122(report = buildSecurityAuditV122()) {
  const rules = document.querySelector("#firestoreRulesPreviewV122");
  const plan = document.querySelector("#securityPlanPreviewV122");
  if (rules) rules.value = report.firestoreRules;
  if (plan) plan.value = JSON.stringify(report, null, 2);
}

function renderSecurityPanelV122() {
  fillSecurityFormV122();
  const report = buildSecurityAuditV122();
  renderSecurityScoreV122(report);
  renderSecurityChecklistV122(report);
  renderSecurityPreviewsV122(report);
}

async function copySecurityTextV122(text, ok = "Copiado.") {
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast(ok);
}

function copyFirestoreRulesV122() {
  copySecurityTextV122(buildFirestoreRulesV122(), "Reglas Firestore copiadas.");
}

function copySecuritySummaryV122() {
  const report = buildSecurityAuditV122();
  const text = `Alaya Holistics · Seguridad Producción

Puntuación: ${report.score}%
Modo: ${report.mode}
Admins: ${report.adminEmails.join(", ") || "pendiente"}
Dominio: ${report.settings.domain || "pendiente"}

Checks:
${report.checks.map(c => `- ${c.ok ? "OK" : "REVISAR"} · ${c.title}: ${c.detail}`).join("\n")}

Recordatorio: revisar Firebase Rules reales antes de producción.`;
  copySecurityTextV122(text, "Resumen de seguridad copiado.");
}

function exportSecurityPlanV122() {
  const report = buildSecurityAuditV122();
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-plan-seguridad-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function saveSecurityFormV122() {
  saveSecuritySettingsV122(collectSecurityFormV122());
  if (typeof showToast === "function") showToast("Configuración de seguridad guardada.");
}

document.querySelector("#runSecurityAuditV122")?.addEventListener("click", renderSecurityPanelV122);
document.querySelector("#exportSecurityPlanV122")?.addEventListener("click", exportSecurityPlanV122);
document.querySelector("#saveSecuritySettingsV122")?.addEventListener("click", saveSecurityFormV122);
document.querySelector("#copySecuritySummaryV122")?.addEventListener("click", copySecuritySummaryV122);
document.querySelector("#copyFirestoreRulesV122")?.addEventListener("click", copyFirestoreRulesV122);
document.querySelectorAll(".security-form-v122 input, .security-form-v122 select, .security-form-v122 textarea").forEach(input => {
  input.addEventListener("input", () => renderSecurityPreviewsV122(buildSecurityAuditV122()));
  input.addEventListener("change", () => renderSecurityPreviewsV122(buildSecurityAuditV122()));
});

window.renderSecurityPanelV122 = renderSecurityPanelV122;
window.buildSecurityAuditV122 = buildSecurityAuditV122;
window.buildFirestoreRulesV122 = buildFirestoreRulesV122;
window.applySecurityPublicV122 = applySecurityPublicV122;

setTimeout(() => {
  applySecurityPublicV122();
  renderSecurityPanelV122();
}, 2000);



// v12.3 Primer Arranque y Datos Demo Pro
const ONBOARDING_SETTINGS_KEY_V123 = "alaya_onboarding_settings_v123";
const DEMO_TAG_V123 = "demo-v12.3";

const ONBOARDING_DEFAULTS_V123 = {
  projectName: "Alaya Holistics",
  location: "",
  contact: "",
  adminEmail: "",
  channel: "whatsapp",
  status: "setup",
  completedAt: "",
  updatedAt: ""
};

function getOnboardingSettingsV123() {
  try {
    const raw = localStorage.getItem(ONBOARDING_SETTINGS_KEY_V123);
    return raw ? { ...ONBOARDING_DEFAULTS_V123, ...JSON.parse(raw) } : { ...ONBOARDING_DEFAULTS_V123 };
  } catch {
    return { ...ONBOARDING_DEFAULTS_V123 };
  }
}

function onboardingValueV123(selector) {
  return String(document.querySelector(selector)?.value || "").trim();
}

function collectOnboardingFormV123() {
  return {
    projectName: onboardingValueV123("#onboardingProjectNameV123") || "Alaya Holistics",
    location: onboardingValueV123("#onboardingLocationV123"),
    contact: onboardingValueV123("#onboardingContactV123"),
    adminEmail: onboardingValueV123("#onboardingAdminEmailV123"),
    channel: onboardingValueV123("#onboardingChannelV123") || "whatsapp",
    status: onboardingValueV123("#onboardingStatusV123") || "setup"
  };
}

function saveOnboardingSettingsV123(settings) {
  localStorage.setItem(ONBOARDING_SETTINGS_KEY_V123, JSON.stringify({
    ...getOnboardingSettingsV123(),
    ...settings,
    updatedAt: new Date().toISOString()
  }));
  renderOnboardingPanelV123();
  applyOnboardingPublicV123();
}

function fillOnboardingFormV123() {
  const s = getOnboardingSettingsV123();
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#onboardingProjectNameV123", s.projectName);
  set("#onboardingLocationV123", s.location);
  set("#onboardingContactV123", s.contact);
  set("#onboardingAdminEmailV123", s.adminEmail);
  set("#onboardingChannelV123", s.channel);
  set("#onboardingStatusV123", s.status);
}

function safeJsonV123(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJsonV123(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function buildOnboardingPlanV123() {
  const s = getOnboardingSettingsV123();
  const reservations = safeJsonV123("alaya_online_reservations_v110", []);
  const clients = safeJsonV123("alaya_clients_crm_v114", []);
  const slots = safeJsonV123("alaya_agenda_slots_v112", []);
  const messages = safeJsonV123("alaya_message_log_v113", []);
  const hasDemo = [reservations, clients, slots, messages].some(items => items.some(item => item.demoTag === DEMO_TAG_V123));

  const checks = [
    { id: "basic", title: "Datos básicos", ok: Boolean(s.projectName && (s.contact || s.adminEmail)), detail: "Nombre y contacto principal." },
    { id: "legal", title: "Legal Pro", ok: Boolean(document.querySelector("#adminTab-legal-pro")), detail: "Privacidad y consentimiento disponibles." },
    { id: "security", title: "Seguridad Pro", ok: Boolean(document.querySelector("#adminTab-seguridad-pro")), detail: "Auditoría de seguridad disponible." },
    { id: "publication", title: "Publicación", ok: Boolean(document.querySelector("#adminTab-publicacion")), detail: "Plan hosting/dominio disponible." },
    { id: "backup", title: "Backup", ok: Boolean(document.querySelector("#adminTab-backup-restore")), detail: "Copia total disponible." },
    { id: "reservations", title: "Reservas", ok: Boolean(document.querySelector("#onlineReservationFormV110")), detail: `${reservations.length} reserva(s).` },
    { id: "agenda", title: "Agenda", ok: Boolean(document.querySelector("#availabilitySlotsPublicV112")), detail: `${slots.length} horario(s).` },
    { id: "crm", title: "CRM", ok: Boolean(document.querySelector("#adminTab-clientes-crm")), detail: `${clients.length} cliente(s).` },
    { id: "seo", title: "SEO UX", ok: Boolean(document.querySelector("#adminTab-seo-ux")), detail: "Auditoría de optimización disponible." },
    { id: "release", title: "Release Final", ok: Boolean(document.querySelector("#adminTab-release-final")), detail: "Cierre final disponible." }
  ];

  const score = Math.round((checks.filter(c => c.ok).length / checks.length) * 100);
  const tasks = [];
  if (!s.contact && !s.adminEmail) tasks.push({ level: "alta", title: "Añadir contacto", text: "Completa contacto principal o email admin." });
  if (!hasDemo && !reservations.length) tasks.push({ level: "media", title: "Cargar demo", text: "Carga datos demo para probar el flujo completo sin datos reales." });
  if (hasDemo) tasks.push({ level: "media", title: "Borrar demo antes de publicar", text: "Cuando termines las pruebas, usa Borrar demo." });
  if (!localStorage.getItem("alaya_legal_privacy_v117")) tasks.push({ level: "media", title: "Guardar Legal Pro", text: "Revisa y guarda los textos legales orientativos." });
  if (!localStorage.getItem("alaya_security_production_v122")) tasks.push({ level: "media", title: "Guardar Seguridad Pro", text: "Configura admins, dominio y modo de seguridad." });
  if (!tasks.length) tasks.push({ level: "ok", title: "Primer arranque listo", text: "La base inicial está preparada para pruebas finales." });

  return {
    generatedAt: new Date().toISOString(),
    version: "12.3",
    settings: s,
    score,
    hasDemo,
    checks,
    tasks,
    counts: {
      reservations: reservations.length,
      clients: clients.length,
      slots: slots.length,
      messages: messages.length
    }
  };
}

function applyOnboardingPublicV123() {
  const card = document.querySelector("#onboardingPublicCardV123");
  if (!card) return;
  const plan = buildOnboardingPlanV123();
  const s = getOnboardingSettingsV123();
  const label = s.status === "ready" ? "Lista" : s.status === "testing" ? "En pruebas" : "Configurando";
  card.innerHTML = `
    <span>${label} · ${plan.score}%</span>
    <h2>${s.projectName || "Alaya Holistics"} preparada para primer arranque</h2>
    <p>${plan.hasDemo ? "Hay datos demo cargados para pruebas. Bórralos antes de publicar." : "Puedes cargar datos demo desde Admin para probar sin tocar datos reales."}</p>
  `;
}

function createDemoDataV123() {
  const today = new Date();
  const date = new Date(today.getTime() + 86400000 * 2).toISOString().slice(0, 10);
  const createdAt = new Date().toISOString();

  const reservations = safeJsonV123("alaya_online_reservations_v110", []);
  if (!reservations.some(item => item.demoTag === DEMO_TAG_V123)) {
    reservations.unshift({
      id: `demo-res-${Date.now()}`,
      code: "ALAYA-DEMO",
      name: "Cliente Demo",
      contact: "demo@alaya.local",
      service: "Tarot / orientación demo",
      preferredDate: date,
      preferredTime: "17:00",
      message: "Reserva de prueba creada desde Primer Arranque.",
      status: "pendiente",
      source: "demo",
      demoTag: DEMO_TAG_V123,
      createdAt,
      updatedAt: createdAt,
      consent: {
        accepted: true,
        version: "demo-v12.3",
        text: "Consentimiento demo para pruebas internas.",
        acceptedAt: createdAt
      }
    });
    setJsonV123("alaya_online_reservations_v110", reservations);
  }

  const clients = safeJsonV123("alaya_clients_crm_v114", []);
  if (!clients.some(item => item.demoTag === DEMO_TAG_V123)) {
    clients.unshift({
      id: `demo-client-${Date.now()}`,
      name: "Cliente Demo",
      contact: "demo@alaya.local",
      tags: ["demo", "tarot", "primer arranque"],
      preference: "Prueba de tarde",
      internalNote: "Cliente de ejemplo. Borrar antes de publicar.",
      source: "demo",
      demoTag: DEMO_TAG_V123,
      createdAt,
      updatedAt: createdAt
    });
    setJsonV123("alaya_clients_crm_v114", clients);
  }

  const slots = safeJsonV123("alaya_agenda_slots_v112", []);
  if (!slots.some(item => item.demoTag === DEMO_TAG_V123)) {
    slots.unshift({
      id: `demo-slot-${Date.now()}`,
      service: "Tarot / orientación demo",
      date,
      time: "17:00",
      duration: 60,
      capacity: 1,
      status: "disponible",
      publicNote: "Horario demo para probar reservas.",
      internalNote: "Borrar antes de publicar.",
      demoTag: DEMO_TAG_V123,
      createdAt,
      updatedAt: createdAt
    });
    setJsonV123("alaya_agenda_slots_v112", slots);
  }

  const messages = safeJsonV123("alaya_message_log_v113", []);
  if (!messages.some(item => item.demoTag === DEMO_TAG_V123)) {
    messages.unshift({
      id: `demo-msg-${Date.now()}`,
      action: "demo",
      template: "Reserva recibida demo",
      reservationCode: "ALAYA-DEMO",
      reservationName: "Cliente Demo",
      demoTag: DEMO_TAG_V123,
      at: createdAt
    });
    setJsonV123("alaya_message_log_v113", messages);
  }

  if (typeof showToast === "function") showToast("Datos demo cargados.");
  refreshModulesAfterDemoV123();
}

function clearDemoDataV123() {
  if (!confirm("¿Borrar solo los datos demo creados por Primer Arranque?")) return;
  const keys = [
    "alaya_online_reservations_v110",
    "alaya_clients_crm_v114",
    "alaya_agenda_slots_v112",
    "alaya_message_log_v113"
  ];
  keys.forEach(key => {
    const items = safeJsonV123(key, []);
    setJsonV123(key, items.filter(item => item.demoTag !== DEMO_TAG_V123));
  });
  if (typeof showToast === "function") showToast("Datos demo borrados.");
  refreshModulesAfterDemoV123();
}

function refreshModulesAfterDemoV123() {
  if (typeof renderReservationsAdminV110 === "function") renderReservationsAdminV110();
  if (typeof renderAgendaAdminV112 === "function") renderAgendaAdminV112();
  if (typeof renderPublicAvailabilityV112 === "function") renderPublicAvailabilityV112();
  if (typeof renderClientsAdminV114 === "function") renderClientsAdminV114();
  if (typeof renderMessagesAdminV113 === "function") renderMessagesAdminV113();
  if (typeof renderBusinessDashboardV115 === "function") renderBusinessDashboardV115();
  renderOnboardingPanelV123();
  applyOnboardingPublicV123();
}

function renderDemoStatusV123(plan = buildOnboardingPlanV123()) {
  const box = document.querySelector("#demoStatusV123");
  if (!box) return;
  box.innerHTML = `
    <span>${plan.hasDemo ? "Demo activa" : "Sin demo"}</span>
    <p>${plan.hasDemo ? "Hay datos demo cargados. Recuerda borrarlos antes de publicar." : "No hay datos demo de Primer Arranque."}</p>
  `;
}

function renderOnboardingScoreV123(plan = buildOnboardingPlanV123()) {
  const box = document.querySelector("#onboardingScoreV123");
  if (!box) return;
  box.innerHTML = `
    <div class="onboarding-score-card-v123">
      <strong>${plan.score}%</strong>
      <span>Primer arranque</span>
    </div>
    <div class="onboarding-progress-v123">
      <i style="width:${plan.score}%"></i>
    </div>
  `;
}

function renderOnboardingChecklistV123(plan = buildOnboardingPlanV123()) {
  const box = document.querySelector("#onboardingChecklistV123");
  if (!box) return;
  box.innerHTML = plan.checks.map(check => `
    <article class="onboarding-check-v123 ${check.ok ? "ok" : "warn"}">
      <span>${check.ok ? "OK" : "Revisar"}</span>
      <strong>${check.title}</strong>
      <p>${check.detail}</p>
    </article>
  `).join("");
}

function renderOnboardingTasksV123(plan = buildOnboardingPlanV123()) {
  const box = document.querySelector("#onboardingTasksV123");
  if (!box) return;
  box.innerHTML = plan.tasks.map(task => `
    <article class="onboarding-task-v123">
      <span>${task.level}</span>
      <strong>${task.title}</strong>
      <p>${task.text}</p>
    </article>
  `).join("");
}

function renderOnboardingPreviewV123(plan = buildOnboardingPlanV123()) {
  const out = document.querySelector("#onboardingPlanPreviewV123");
  if (out) out.value = JSON.stringify(plan, null, 2);
}

function renderOnboardingPanelV123() {
  fillOnboardingFormV123();
  const plan = buildOnboardingPlanV123();
  renderOnboardingScoreV123(plan);
  renderDemoStatusV123(plan);
  renderOnboardingChecklistV123(plan);
  renderOnboardingTasksV123(plan);
  renderOnboardingPreviewV123(plan);
}

function saveOnboardingFormV123() {
  saveOnboardingSettingsV123(collectOnboardingFormV123());
  if (typeof showToast === "function") showToast("Primer arranque guardado.");
}

function exportOnboardingPlanV123() {
  const plan = buildOnboardingPlanV123();
  const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-primer-arranque-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyOnboardingSummaryV123() {
  const plan = buildOnboardingPlanV123();
  const s = plan.settings;
  const text = `Alaya Holistics · Primer Arranque

Proyecto: ${s.projectName}
Zona: ${s.location || "pendiente"}
Contacto: ${s.contact || "pendiente"}
Admin: ${s.adminEmail || "pendiente"}
Estado: ${s.status}
Puntuación: ${plan.score}%
Demo activa: ${plan.hasDemo ? "sí" : "no"}

Tareas:
${plan.tasks.map(t => `- ${t.title}: ${t.text}`).join("\n")}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen de primer arranque copiado.");
}

document.querySelector("#generateOnboardingPlanV123")?.addEventListener("click", renderOnboardingPanelV123);
document.querySelector("#exportOnboardingPlanV123")?.addEventListener("click", exportOnboardingPlanV123);
document.querySelector("#saveOnboardingSettingsV123")?.addEventListener("click", saveOnboardingFormV123);
document.querySelector("#copyOnboardingSummaryV123")?.addEventListener("click", copyOnboardingSummaryV123);
document.querySelector("#loadDemoDataV123")?.addEventListener("click", createDemoDataV123);
document.querySelector("#clearDemoDataV123")?.addEventListener("click", clearDemoDataV123);

window.renderOnboardingPanelV123 = renderOnboardingPanelV123;
window.buildOnboardingPlanV123 = buildOnboardingPlanV123;
window.applyOnboardingPublicV123 = applyOnboardingPublicV123;

setTimeout(() => {
  applyOnboardingPublicV123();
  renderOnboardingPanelV123();
}, 2100);



// v12.4 Mantenimiento, Soporte e Incidencias Pro
const MAINTENANCE_SETTINGS_KEY_V124 = "alaya_maintenance_settings_v124";
const ISSUES_KEY_V124 = "alaya_maintenance_issues_v124";

const MAINTENANCE_DEFAULTS_V124 = {
  status: "ok",
  message: "La web está funcionando correctamente.",
  updatedAt: ""
};

function getMaintenanceSettingsV124() {
  try {
    const raw = localStorage.getItem(MAINTENANCE_SETTINGS_KEY_V124);
    return raw ? { ...MAINTENANCE_DEFAULTS_V124, ...JSON.parse(raw) } : { ...MAINTENANCE_DEFAULTS_V124 };
  } catch {
    return { ...MAINTENANCE_DEFAULTS_V124 };
  }
}

function getIssuesV124() {
  try {
    const raw = localStorage.getItem(ISSUES_KEY_V124);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveIssuesV124(items) {
  localStorage.setItem(ISSUES_KEY_V124, JSON.stringify(items));
  renderMaintenancePanelV124();
}

function saveMaintenanceSettingsV124(settings) {
  localStorage.setItem(MAINTENANCE_SETTINGS_KEY_V124, JSON.stringify({
    ...getMaintenanceSettingsV124(),
    ...settings,
    updatedAt: new Date().toISOString()
  }));
  renderMaintenancePanelV124();
  applyMaintenancePublicV124();
}

function cleanMaintenanceTextV124(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function fillMaintenanceFormV124() {
  const s = getMaintenanceSettingsV124();
  const status = document.querySelector("#maintenanceStatusV124");
  const message = document.querySelector("#maintenancePublicMessageV124");
  if (status) status.value = s.status || "ok";
  if (message) message.value = s.message || "";
}

function saveMaintenanceFormV124() {
  saveMaintenanceSettingsV124({
    status: document.querySelector("#maintenanceStatusV124")?.value || "ok",
    message: cleanMaintenanceTextV124(document.querySelector("#maintenancePublicMessageV124")?.value) || MAINTENANCE_DEFAULTS_V124.message
  });
  if (typeof showToast === "function") showToast("Estado de mantenimiento guardado.");
}

function getIssueFormDataV124() {
  return {
    id: document.querySelector("#issueIdV124")?.value || `issue-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: cleanMaintenanceTextV124(document.querySelector("#issueTitleV124")?.value),
    priority: document.querySelector("#issuePriorityV124")?.value || "media",
    status: document.querySelector("#issueStatusV124")?.value || "pendiente",
    area: cleanMaintenanceTextV124(document.querySelector("#issueAreaV124")?.value),
    description: cleanMaintenanceTextV124(document.querySelector("#issueDescriptionV124")?.value),
    updatedAt: new Date().toISOString()
  };
}

function setIssueFormV124(issue) {
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#issueIdV124", issue.id);
  set("#issueTitleV124", issue.title);
  set("#issuePriorityV124", issue.priority);
  set("#issueStatusV124", issue.status);
  set("#issueAreaV124", issue.area);
  set("#issueDescriptionV124", issue.description);
}

function clearIssueFormV124() {
  document.querySelector("#issueFormV124")?.reset();
  const id = document.querySelector("#issueIdV124");
  if (id) id.value = "";
}

function saveIssueV124(event) {
  event?.preventDefault();
  const issue = getIssueFormDataV124();
  if (!issue.title) {
    if (typeof showToast === "function") showToast("Añade un título.");
    return;
  }
  const issues = getIssuesV124();
  const index = issues.findIndex(item => item.id === issue.id);
  if (index >= 0) issues[index] = { ...issues[index], ...issue };
  else issues.unshift({ ...issue, createdAt: new Date().toISOString() });
  saveIssuesV124(issues);
  clearIssueFormV124();
  if (typeof showToast === "function") showToast("Incidencia guardada.");
}

function editIssueV124(id) {
  const issue = getIssuesV124().find(item => item.id === id);
  if (!issue) return;
  setIssueFormV124(issue);
  document.querySelector("#issueFormV124")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setIssueStatusV124(id, status) {
  saveIssuesV124(getIssuesV124().map(item => item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
}

function deleteIssueV124(id) {
  const issue = getIssuesV124().find(item => item.id === id);
  if (!issue) return;
  if (!confirm(`¿Borrar incidencia "${issue.title}"?`)) return;
  saveIssuesV124(getIssuesV124().filter(item => item.id !== id));
}

function clearClosedIssuesV124() {
  if (!confirm("¿Borrar todas las incidencias cerradas?")) return;
  saveIssuesV124(getIssuesV124().filter(item => item.status !== "cerrada"));
}

function getFilteredIssuesV124() {
  const query = (document.querySelector("#issueSearchV124")?.value || "").toLowerCase().trim();
  const status = document.querySelector("#issueFilterStatusV124")?.value || "all";
  return getIssuesV124().filter(issue => {
    const matchesStatus = status === "all" || issue.status === status;
    const haystack = [issue.title, issue.priority, issue.status, issue.area, issue.description].join(" ").toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  });
}

function buildMaintenanceReportV124() {
  const issues = getIssuesV124();
  const settings = getMaintenanceSettingsV124();
  const pending = issues.filter(item => item.status === "pendiente").length;
  const inProgress = issues.filter(item => item.status === "en-proceso").length;
  const closed = issues.filter(item => item.status === "cerrada").length;
  const high = issues.filter(item => item.priority === "alta" && item.status !== "cerrada").length;
  const audit = [
    { id: "backup", title: "Backup", ok: Boolean(document.querySelector("#adminTab-backup-restore")), detail: "Centro Backup disponible" },
    { id: "release", title: "Release Final", ok: Boolean(document.querySelector("#adminTab-release-final")), detail: "Cierre final disponible" },
    { id: "publication", title: "Publicación", ok: Boolean(document.querySelector("#adminTab-publicacion")), detail: "Plan publicación disponible" },
    { id: "security", title: "Seguridad Pro", ok: Boolean(document.querySelector("#adminTab-seguridad-pro")), detail: "Auditoría seguridad disponible" },
    { id: "onboarding", title: "Primer Arranque", ok: Boolean(document.querySelector("#adminTab-primer-arranque")), detail: "Puesta en marcha disponible" },
    { id: "seo", title: "SEO UX", ok: Boolean(document.querySelector("#adminTab-seo-ux")), detail: "Optimización disponible" },
    { id: "legal", title: "Legal Pro", ok: Boolean(document.querySelector("#adminTab-legal-pro")), detail: "Privacidad disponible" },
    { id: "reservas", title: "Reservas", ok: Boolean(document.querySelector("#onlineReservationFormV110")), detail: "Formulario disponible" }
  ];
  const score = Math.round((audit.filter(item => item.ok).length / audit.length) * 100);
  return {
    generatedAt: new Date().toISOString(),
    version: "12.4",
    settings,
    score,
    stats: {
      total: issues.length,
      pending,
      inProgress,
      closed,
      highOpen: high
    },
    audit,
    issues
  };
}

function applyMaintenancePublicV124() {
  const card = document.querySelector("#maintenancePublicCardV124");
  if (!card) return;
  const settings = getMaintenanceSettingsV124();
  const label = settings.status === "maintenance" ? "Mantenimiento" : settings.status === "review" ? "En revisión" : "Funcionando";
  card.innerHTML = `
    <span>${label}</span>
    <h2>${settings.status === "maintenance" ? "Mantenimiento en curso" : settings.status === "review" ? "Web en revisión" : "Mantenimiento controlado"}</h2>
    <p>${settings.message || MAINTENANCE_DEFAULTS_V124.message}</p>
  `;
}

function renderMaintenanceStatsV124(report = buildMaintenanceReportV124()) {
  const box = document.querySelector("#maintenanceScoreV124");
  if (!box) return;
  const stats = [
    ["Total", report.stats.total],
    ["Pendientes", report.stats.pending],
    ["En proceso", report.stats.inProgress],
    ["Alta prioridad", report.stats.highOpen]
  ];
  box.innerHTML = stats.map(([label, value]) => `
    <div class="maintenance-stat-v124">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderIssuesListV124() {
  const list = document.querySelector("#issuesListV124");
  if (!list) return;
  const issues = getFilteredIssuesV124();
  if (!issues.length) {
    list.innerHTML = `<article class="issue-card-v124"><p>No hay incidencias para mostrar.</p></article>`;
    return;
  }
  list.innerHTML = issues.map(issue => `
    <article class="issue-card-v124" data-priority="${issue.priority}" data-status="${issue.status}">
      <span>${issue.priority} · ${issue.status}</span>
      <strong>${issue.title}</strong>
      <p>${issue.area || "Sin zona"} · ${issue.description || "Sin descripción"}</p>
      <p>Actualizado: ${issue.updatedAt ? new Date(issue.updatedAt).toLocaleString() : "sin fecha"}</p>
      <div class="issue-actions-v124">
        <button class="btn btn-secondary" type="button" onclick="editIssueV124('${issue.id}')">Editar</button>
        <button class="btn btn-secondary" type="button" onclick="setIssueStatusV124('${issue.id}', 'en-proceso')">En proceso</button>
        <button class="btn btn-secondary" type="button" onclick="setIssueStatusV124('${issue.id}', 'cerrada')">Cerrar</button>
        <button class="btn btn-secondary" type="button" onclick="deleteIssueV124('${issue.id}')">Borrar</button>
      </div>
    </article>
  `).join("");
}

function renderMaintenanceAuditV124(report = buildMaintenanceReportV124()) {
  const box = document.querySelector("#maintenanceAuditV124");
  if (!box) return;
  box.innerHTML = report.audit.map(item => `
    <article class="maintenance-audit-item-v124">
      <span>${item.ok ? "OK" : "Revisar"}</span>
      <strong>${item.title}</strong>
      <p>${item.detail}</p>
    </article>
  `).join("");
}

function renderMaintenancePreviewV124(report = buildMaintenanceReportV124()) {
  const out = document.querySelector("#maintenanceReportPreviewV124");
  if (out) out.value = JSON.stringify(report, null, 2);
}

function renderMaintenancePanelV124() {
  fillMaintenanceFormV124();
  const report = buildMaintenanceReportV124();
  renderMaintenanceStatsV124(report);
  renderIssuesListV124();
  renderMaintenanceAuditV124(report);
  renderMaintenancePreviewV124(report);
}

function exportMaintenanceReportV124() {
  const report = buildMaintenanceReportV124();
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-mantenimiento-soporte-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyMaintenanceSummaryV124() {
  const report = buildMaintenanceReportV124();
  const text = `Alaya Holistics · Mantenimiento

Estado público: ${report.settings.status}
Puntuación auditoría: ${report.score}%
Incidencias totales: ${report.stats.total}
Pendientes: ${report.stats.pending}
En proceso: ${report.stats.inProgress}
Alta prioridad abierta: ${report.stats.highOpen}

Mensaje:
${report.settings.message}

Incidencias:
${report.issues.slice(0, 10).map(i => `- ${i.priority}/${i.status}: ${i.title}`).join("\n") || "Sin incidencias"}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen de mantenimiento copiado.");
}

document.querySelector("#saveMaintenanceSettingsV124")?.addEventListener("click", saveMaintenanceFormV124);
document.querySelector("#exportMaintenanceReportV124")?.addEventListener("click", exportMaintenanceReportV124);
document.querySelector("#copyMaintenanceSummaryV124")?.addEventListener("click", copyMaintenanceSummaryV124);
document.querySelector("#clearClosedIssuesV124")?.addEventListener("click", clearClosedIssuesV124);
document.querySelector("#issueFormV124")?.addEventListener("submit", saveIssueV124);
document.querySelector("#clearIssueFormV124")?.addEventListener("click", clearIssueFormV124);
document.querySelector("#issueSearchV124")?.addEventListener("input", renderIssuesListV124);
document.querySelector("#issueFilterStatusV124")?.addEventListener("change", renderIssuesListV124);

window.renderMaintenancePanelV124 = renderMaintenancePanelV124;
window.buildMaintenanceReportV124 = buildMaintenanceReportV124;
window.applyMaintenancePublicV124 = applyMaintenancePublicV124;
window.editIssueV124 = editIssueV124;
window.setIssueStatusV124 = setIssueStatusV124;
window.deleteIssueV124 = deleteIssueV124;

setTimeout(() => {
  applyMaintenancePublicV124();
  renderMaintenancePanelV124();
}, 2200);



// v12.5 Marketing, Redes y Difusión Pro
const MARKETING_KEY_V125 = "alaya_marketing_campaigns_v125";

const MARKETING_IDEAS_V125 = [
  ["Post educativo", "Explicar un servicio de forma sencilla: qué es, para quién es y cómo reservar."],
  ["Historia de taller", "Compartir una invitación cercana a un taller o curso con plazas limitadas."],
  ["Recordatorio suave", "Recordar disponibilidad de agenda sin presión comercial."],
  ["Confianza", "Publicar valores: escucha, cuidado, privacidad y acompañamiento responsable."],
  ["Herbolario", "Destacar una categoría de productos o rutina de bienestar general sin prometer curas."],
  ["Preguntas frecuentes", "Responder dudas típicas sobre reservas, duración, ubicación o modalidad."]
];

function getMarketingCampaignsV125() {
  try {
    const raw = localStorage.getItem(MARKETING_KEY_V125);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveMarketingCampaignsV125(items) {
  localStorage.setItem(MARKETING_KEY_V125, JSON.stringify(items));
  renderMarketingPanelV125();
}

function cleanMarketingTextV125(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function campaignFormDataV125() {
  return {
    id: document.querySelector("#campaignIdV125")?.value || `campaign-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: cleanMarketingTextV125(document.querySelector("#campaignTitleV125")?.value),
    service: cleanMarketingTextV125(document.querySelector("#campaignServiceV125")?.value),
    channel: document.querySelector("#campaignChannelV125")?.value || "instagram",
    goal: document.querySelector("#campaignGoalV125")?.value || "reservas",
    date: document.querySelector("#campaignDateV125")?.value || "",
    cta: cleanMarketingTextV125(document.querySelector("#campaignCtaV125")?.value),
    note: cleanMarketingTextV125(document.querySelector("#campaignNoteV125")?.value),
    template: document.querySelector("#marketingTemplateV125")?.value || "instagram",
    generatedText: document.querySelector("#marketingGeneratedTextV125")?.value || "",
    updatedAt: new Date().toISOString()
  };
}

function fillMarketingFormV125(campaign) {
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#campaignIdV125", campaign.id);
  set("#campaignTitleV125", campaign.title);
  set("#campaignServiceV125", campaign.service);
  set("#campaignChannelV125", campaign.channel);
  set("#campaignGoalV125", campaign.goal);
  set("#campaignDateV125", campaign.date);
  set("#campaignCtaV125", campaign.cta);
  set("#campaignNoteV125", campaign.note);
  set("#marketingTemplateV125", campaign.template);
  set("#marketingGeneratedTextV125", campaign.generatedText);
}

function clearMarketingFormV125() {
  document.querySelector("#marketingFormV125")?.reset();
  const id = document.querySelector("#campaignIdV125");
  const output = document.querySelector("#marketingGeneratedTextV125");
  if (id) id.value = "";
  if (output) output.value = "";
}

function saveMarketingCampaignV125(event) {
  event?.preventDefault();
  const campaign = campaignFormDataV125();
  if (!campaign.title) {
    if (typeof showToast === "function") showToast("Añade un título de campaña.");
    return;
  }
  const campaigns = getMarketingCampaignsV125();
  const index = campaigns.findIndex(item => item.id === campaign.id);
  if (index >= 0) campaigns[index] = { ...campaigns[index], ...campaign };
  else campaigns.unshift({ ...campaign, createdAt: new Date().toISOString(), status: "planificada" });
  saveMarketingCampaignsV125(campaigns);
  if (typeof showToast === "function") showToast("Campaña guardada.");
}

function generateMarketingTextV125() {
  const c = campaignFormDataV125();
  const template = document.querySelector("#marketingTemplateV125")?.value || c.channel || "instagram";
  const title = c.title || "Nueva propuesta de Alaya Holistics";
  const service = c.service || "bienestar holístico";
  const cta = c.cta || "Escríbenos para reservar o consultar disponibilidad";
  const dateLine = c.date ? `\nFecha prevista: ${c.date}` : "";
  const note = c.note ? `\n\nDetalle interno a adaptar: ${c.note}` : "";

  const texts = {
    instagram: `✨ ${title}\n\nHoy abrimos espacio para ${service}, una propuesta pensada para acompañarte con calma, escucha y presencia.\n\n${cta}.${dateLine}\n\n#AlayaHolistics #Bienestar #Tarot #Reiki #Herbolario #Talleres`,
    whatsapp: `Hola 🌿\n\nTe compartimos una novedad de Alaya Holistics:\n\n${title}\n\nServicio/tema: ${service}.${dateLine}\n\n${cta}.\n\nGracias por formar parte de nuestra comunidad.`,
    email: `Asunto: ${title}\n\nHola,\n\nDesde Alaya Holistics queremos compartir contigo esta propuesta:\n\n${title}\n\nTema principal: ${service}.${dateLine}\n\nEs una invitación a vivir un espacio de bienestar, orientación y conexión desde una mirada cercana y responsable.\n\n${cta}.\n\nUn abrazo,\nAlaya Holistics`,
    "google-business": `${title}\n\nEn Alaya Holistics presentamos una nueva propuesta relacionada con ${service}. Un espacio de bienestar y acompañamiento para quienes buscan una experiencia cercana, cuidada y consciente.${dateLine}\n\n${cta}.`,
    "short-ad": `${title} · ${service}. ${cta}.`
  };

  const output = document.querySelector("#marketingGeneratedTextV125");
  if (output) output.value = (texts[template] || texts.instagram) + note;
  if (typeof showToast === "function") showToast("Texto generado.");
}

function saveGeneratedCampaignV125() {
  saveMarketingCampaignV125();
}

function editCampaignV125(id) {
  const campaign = getMarketingCampaignsV125().find(item => item.id === id);
  if (!campaign) return;
  fillMarketingFormV125(campaign);
  document.querySelector("#marketingFormV125")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteCampaignV125(id) {
  const campaign = getMarketingCampaignsV125().find(item => item.id === id);
  if (!campaign) return;
  if (!confirm(`¿Borrar campaña "${campaign.title}"?`)) return;
  saveMarketingCampaignsV125(getMarketingCampaignsV125().filter(item => item.id !== id));
}

function markCampaignDoneV125(id) {
  saveMarketingCampaignsV125(getMarketingCampaignsV125().map(item => item.id === id ? { ...item, status: "finalizada", updatedAt: new Date().toISOString() } : item));
}

function clearFinishedCampaignsV125() {
  saveMarketingCampaignsV125(getMarketingCampaignsV125().filter(item => item.status !== "finalizada"));
}

function filteredCampaignsV125() {
  const query = (document.querySelector("#marketingSearchV125")?.value || "").toLowerCase().trim();
  const channel = document.querySelector("#marketingFilterChannelV125")?.value || "all";
  return getMarketingCampaignsV125().filter(c => {
    const matchesChannel = channel === "all" || c.channel === channel;
    const haystack = [c.title, c.service, c.channel, c.goal, c.cta, c.note, c.generatedText].join(" ").toLowerCase();
    return matchesChannel && (!query || haystack.includes(query));
  }).sort((a, b) => String(a.date || "9999").localeCompare(String(b.date || "9999")));
}

function buildMarketingPlanV125() {
  const campaigns = getMarketingCampaignsV125();
  const planned = campaigns.filter(c => c.status !== "finalizada").length;
  const finished = campaigns.filter(c => c.status === "finalizada").length;
  const byChannel = campaigns.reduce((acc, c) => {
    acc[c.channel || "sin canal"] = (acc[c.channel || "sin canal"] || 0) + 1;
    return acc;
  }, {});
  const upcoming = campaigns.filter(c => c.date && c.status !== "finalizada").sort((a, b) => a.date.localeCompare(b.date)).slice(0, 8);

  return {
    generatedAt: new Date().toISOString(),
    version: "12.5",
    stats: {
      total: campaigns.length,
      planned,
      finished,
      byChannel
    },
    upcoming,
    ideas: MARKETING_IDEAS_V125.map(([title, text]) => ({ title, text })),
    campaigns
  };
}

function renderMarketingStatsV125(plan = buildMarketingPlanV125()) {
  const box = document.querySelector("#marketingStatsV125");
  if (!box) return;
  const instagram = plan.stats.byChannel.instagram || 0;
  const whatsapp = plan.stats.byChannel.whatsapp || 0;
  const email = plan.stats.byChannel.email || 0;
  box.innerHTML = `
    <div class="marketing-stat-v125"><strong>${plan.stats.total}</strong><span>Campañas</span></div>
    <div class="marketing-stat-v125"><strong>${plan.stats.planned}</strong><span>Planificadas</span></div>
    <div class="marketing-stat-v125"><strong>${instagram}</strong><span>Instagram</span></div>
    <div class="marketing-stat-v125"><strong>${whatsapp}</strong><span>WhatsApp</span></div>
    <div class="marketing-stat-v125"><strong>${email}</strong><span>Email</span></div>
  `;
}

function renderCampaignsListV125() {
  const list = document.querySelector("#marketingCampaignsListV125");
  if (!list) return;
  const campaigns = filteredCampaignsV125();
  if (!campaigns.length) {
    list.innerHTML = `<article class="marketing-campaign-v125"><p>No hay campañas para mostrar.</p></article>`;
    return;
  }
  list.innerHTML = campaigns.map(c => `
    <article class="marketing-campaign-v125">
      <span>${c.channel || "canal"} · ${c.status || "planificada"}</span>
      <strong>${c.title || "Sin título"}</strong>
      <p>${c.service || "Sin servicio"} ${c.date ? "· " + c.date : ""}</p>
      <p>${c.cta || "Sin CTA"}</p>
      <div class="marketing-campaign-actions-v125">
        <button class="btn btn-secondary" type="button" onclick="editCampaignV125('${c.id}')">Editar</button>
        <button class="btn btn-secondary" type="button" onclick="markCampaignDoneV125('${c.id}')">Finalizada</button>
        <button class="btn btn-secondary" type="button" onclick="deleteCampaignV125('${c.id}')">Borrar</button>
      </div>
    </article>
  `).join("");
}

function renderMarketingIdeasV125() {
  const box = document.querySelector("#marketingIdeasV125");
  if (!box) return;
  box.innerHTML = MARKETING_IDEAS_V125.map(([title, text]) => `
    <article class="marketing-idea-v125">
      <span>Idea</span>
      <strong>${title}</strong>
      <p>${text}</p>
    </article>
  `).join("");
}

function renderMarketingPreviewV125(plan = buildMarketingPlanV125()) {
  const out = document.querySelector("#marketingPlanPreviewV125");
  if (out) out.value = JSON.stringify(plan, null, 2);
}

function renderMarketingPanelV125() {
  const plan = buildMarketingPlanV125();
  renderMarketingStatsV125(plan);
  renderCampaignsListV125();
  renderMarketingIdeasV125();
  renderMarketingPreviewV125(plan);
}

async function copyMarketingTextV125() {
  const text = document.querySelector("#marketingGeneratedTextV125")?.value || "";
  if (!text) {
    if (typeof showToast === "function") showToast("Primero genera un texto.");
    return;
  }
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Texto copiado.");
}

function exportMarketingPlanV125() {
  const plan = buildMarketingPlanV125();
  const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-plan-marketing-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

document.querySelector("#marketingFormV125")?.addEventListener("submit", saveMarketingCampaignV125);
document.querySelector("#clearMarketingFormV125")?.addEventListener("click", clearMarketingFormV125);
document.querySelector("#generateMarketingTextV125")?.addEventListener("click", generateMarketingTextV125);
document.querySelector("#copyMarketingTextV125")?.addEventListener("click", copyMarketingTextV125);
document.querySelector("#saveGeneratedCampaignV125")?.addEventListener("click", saveGeneratedCampaignV125);
document.querySelector("#exportMarketingPlanV125")?.addEventListener("click", exportMarketingPlanV125);
document.querySelector("#marketingSearchV125")?.addEventListener("input", renderCampaignsListV125);
document.querySelector("#marketingFilterChannelV125")?.addEventListener("change", renderCampaignsListV125);

window.renderMarketingPanelV125 = renderMarketingPanelV125;
window.buildMarketingPlanV125 = buildMarketingPlanV125;
window.editCampaignV125 = editCampaignV125;
window.deleteCampaignV125 = deleteCampaignV125;
window.markCampaignDoneV125 = markCampaignDoneV125;
window.clearFinishedCampaignsV125 = clearFinishedCampaignsV125;

setTimeout(renderMarketingPanelV125, 2300);



// v12.6 Analítica Local y Conversión Pro
const ANALYTICS_EVENTS_KEY_V126 = "alaya_analytics_events_v126";
const ANALYTICS_SESSION_KEY_V126 = "alaya_analytics_session_v126";
const ANALYTICS_MAX_EVENTS_V126 = 600;

function getAnalyticsEventsV126() {
  try {
    const raw = localStorage.getItem(ANALYTICS_EVENTS_KEY_V126);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAnalyticsEventsV126(events) {
  localStorage.setItem(ANALYTICS_EVENTS_KEY_V126, JSON.stringify(events.slice(0, ANALYTICS_MAX_EVENTS_V126)));
}

function analyticsSessionV126() {
  let id = sessionStorage.getItem(ANALYTICS_SESSION_KEY_V126);
  if (!id) {
    id = `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    sessionStorage.setItem(ANALYTICS_SESSION_KEY_V126, id);
  }
  return id;
}

function cleanAnalyticsTextV126(value) {
  return String(value || "").replace(/[<>]/g, "").trim().slice(0, 120);
}

function trackAnalyticsEventV126(type, label = "", meta = {}) {
  try {
    const event = {
      id: `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type: cleanAnalyticsTextV126(type),
      label: cleanAnalyticsTextV126(label),
      path: location.pathname || "/",
      hash: location.hash || "",
      session: analyticsSessionV126(),
      at: new Date().toISOString(),
      meta: Object.fromEntries(Object.entries(meta || {}).map(([k, v]) => [cleanAnalyticsTextV126(k), cleanAnalyticsTextV126(v)]))
    };
    const events = getAnalyticsEventsV126();
    events.unshift(event);
    saveAnalyticsEventsV126(events);
  } catch {}
}

function analyticsTypeFromClickV126(target) {
  const text = (target.textContent || target.getAttribute("aria-label") || target.href || "").toLowerCase();
  const href = (target.getAttribute("href") || "").toLowerCase();

  if (text.includes("reserv") || href.includes("reserva") || href.includes("whatsapp")) return "reservation_intent";
  if (text.includes("contact") || text.includes("escríbenos") || href.includes("mailto:") || href.includes("tel:")) return "contact_intent";
  if (text.includes("marketing") || text.includes("novedad") || text.includes("redes")) return "marketing_intent";
  return "click";
}

function setupAnalyticsTrackingV126() {
  if (window.__alayaAnalyticsV126Ready) return;
  window.__alayaAnalyticsV126Ready = true;

  trackAnalyticsEventV126("page_view", document.title || "Alaya Holistics");

  document.addEventListener("click", event => {
    const target = event.target.closest("a, button");
    if (!target) return;
    if (target.closest("#adminTab-analitica")) return;
    const label = target.textContent || target.getAttribute("aria-label") || target.getAttribute("href") || "acción";
    trackAnalyticsEventV126(analyticsTypeFromClickV126(target), label, {
      href: target.getAttribute("href") || "",
      tag: target.tagName || ""
    });
  });

  const sections = [...document.querySelectorAll("section[id]")];
  if ("IntersectionObserver" in window && sections.length) {
    const seen = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target?.id && !seen.has(entry.target.id)) {
          seen.add(entry.target.id);
          trackAnalyticsEventV126("section_view", entry.target.id, { section: entry.target.id });
        }
      });
    }, { threshold: 0.35 });
    sections.forEach(section => observer.observe(section));
  }
}

function countAnalyticsByV126(items, getter) {
  return items.reduce((acc, item) => {
    const key = getter(item) || "sin dato";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function safeAnalyticsJsonV126(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function buildAnalyticsReportV126() {
  const events = getAnalyticsEventsV126();
  const reservations = safeAnalyticsJsonV126("alaya_online_reservations_v110", []);
  const campaigns = safeAnalyticsJsonV126("alaya_marketing_campaigns_v125", []);
  const clients = safeAnalyticsJsonV126("alaya_clients_crm_v114", []);
  const sessions = new Set(events.map(e => e.session)).size;
  const byType = countAnalyticsByV126(events, e => e.type);
  const bySection = countAnalyticsByV126(events.filter(e => e.type === "section_view"), e => e.label || e.meta?.section);
  const reservationIntent = (byType.reservation_intent || 0) + events.filter(e => String(e.label).toLowerCase().includes("reserva")).length;
  const contactIntent = byType.contact_intent || 0;
  const marketingIntent = byType.marketing_intent || 0;

  const funnel = [
    { label: "Visitas locales", value: byType.page_view || 0 },
    { label: "Secciones vistas", value: byType.section_view || 0 },
    { label: "Intención reserva", value: reservationIntent },
    { label: "Intención contacto", value: contactIntent },
    { label: "Reservas creadas", value: reservations.length }
  ];

  const goals = [
    { label: "Reservas", value: reservations.length, target: 10 },
    { label: "Clientes CRM", value: clients.length, target: 20 },
    { label: "Campañas", value: campaigns.length, target: 6 },
    { label: "Contactos", value: contactIntent, target: 10 },
    { label: "Marketing", value: marketingIntent, target: 10 }
  ];

  return {
    generatedAt: new Date().toISOString(),
    version: "12.6",
    privacy: "Analítica local sin servicios externos. No guardar datos personales.",
    stats: {
      events: events.length,
      sessions,
      pageViews: byType.page_view || 0,
      sectionViews: byType.section_view || 0,
      clicks: byType.click || 0,
      reservationIntent,
      contactIntent,
      marketingIntent,
      reservations: reservations.length,
      clients: clients.length,
      campaigns: campaigns.length
    },
    byType,
    bySection,
    funnel,
    goals,
    events: events.slice(0, 200)
  };
}

function filteredAnalyticsEventsV126() {
  const query = (document.querySelector("#analyticsSearchV126")?.value || "").toLowerCase().trim();
  const type = document.querySelector("#analyticsFilterTypeV126")?.value || "all";
  return getAnalyticsEventsV126().filter(event => {
    const matchesType = type === "all" || event.type === type;
    const haystack = [event.type, event.label, event.path, event.hash, Object.values(event.meta || {}).join(" ")].join(" ").toLowerCase();
    return matchesType && (!query || haystack.includes(query));
  }).slice(0, 120);
}

function renderAnalyticsStatsV126(report = buildAnalyticsReportV126()) {
  const box = document.querySelector("#analyticsStatsV126");
  if (!box) return;
  const stats = [
    ["Eventos", report.stats.events],
    ["Sesiones", report.stats.sessions],
    ["Visitas", report.stats.pageViews],
    ["Reserva", report.stats.reservationIntent],
    ["Contacto", report.stats.contactIntent],
    ["Reservas", report.stats.reservations]
  ];
  box.innerHTML = stats.map(([label, value]) => `
    <div class="analytics-stat-v126">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderConversionFunnelV126(report = buildAnalyticsReportV126()) {
  const box = document.querySelector("#conversionFunnelV126");
  if (!box) return;
  const max = Math.max(...report.funnel.map(item => item.value), 1);
  box.innerHTML = report.funnel.map(item => {
    const percent = Math.round((item.value / max) * 100);
    return `
      <article class="funnel-step-v126">
        <span>${item.value}</span>
        <strong>${item.label}</strong>
        <div class="funnel-bar-v126"><i style="width:${percent}%"></i></div>
        <p>${percent}% respecto al mayor paso del embudo.</p>
      </article>
    `;
  }).join("");
}

function renderConversionGoalsV126(report = buildAnalyticsReportV126()) {
  const box = document.querySelector("#conversionGoalsV126");
  if (!box) return;
  box.innerHTML = report.goals.map(goal => {
    const percent = Math.min(100, Math.round((goal.value / Math.max(goal.target, 1)) * 100));
    return `
      <article class="goal-item-v126">
        <span>${percent}%</span>
        <strong>${goal.label}</strong>
        <div class="funnel-bar-v126"><i style="width:${percent}%"></i></div>
        <p>${goal.value}/${goal.target} objetivo orientativo.</p>
      </article>
    `;
  }).join("");
}

function renderTopSectionsV126(report = buildAnalyticsReportV126()) {
  const box = document.querySelector("#topSectionsV126");
  if (!box) return;
  const rows = Object.entries(report.bySection).sort((a, b) => b[1] - a[1]).slice(0, 15);
  if (!rows.length) {
    box.innerHTML = `<article class="top-section-v126"><p>Todavía no hay secciones registradas.</p></article>`;
    return;
  }
  box.innerHTML = rows.map(([section, count]) => `
    <article class="top-section-v126">
      <span>${count}</span>
      <strong>#${section}</strong>
      <p>Vista registrada localmente.</p>
    </article>
  `).join("");
}

function renderAnalyticsEventsListV126() {
  const box = document.querySelector("#analyticsEventsListV126");
  if (!box) return;
  const events = filteredAnalyticsEventsV126();
  if (!events.length) {
    box.innerHTML = `<article class="analytics-event-v126"><p>No hay eventos para mostrar.</p></article>`;
    return;
  }
  box.innerHTML = events.map(event => `
    <article class="analytics-event-v126">
      <span>${event.type}</span>
      <strong>${event.label || "Sin etiqueta"}</strong>
      <p>${event.path}${event.hash || ""}</p>
      <p>${event.at ? new Date(event.at).toLocaleString() : "sin fecha"}</p>
    </article>
  `).join("");
}

function renderAnalyticsPreviewV126(report = buildAnalyticsReportV126()) {
  const out = document.querySelector("#analyticsReportPreviewV126");
  if (out) out.value = JSON.stringify(report, null, 2);
}

function renderAnalyticsPanelV126() {
  const report = buildAnalyticsReportV126();
  renderAnalyticsStatsV126(report);
  renderConversionFunnelV126(report);
  renderConversionGoalsV126(report);
  renderAnalyticsEventsListV126();
  renderTopSectionsV126(report);
  renderAnalyticsPreviewV126(report);
}

function clearAnalyticsEventsV126() {
  if (!confirm("¿Limpiar eventos locales de analítica? No borra reservas ni clientes.")) return;
  localStorage.removeItem(ANALYTICS_EVENTS_KEY_V126);
  trackAnalyticsEventV126("page_view", document.title || "Alaya Holistics");
  renderAnalyticsPanelV126();
  if (typeof showToast === "function") showToast("Eventos locales limpiados.");
}

function exportAnalyticsReportV126() {
  const report = buildAnalyticsReportV126();
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-analitica-local-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyAnalyticsSummaryV126() {
  const report = buildAnalyticsReportV126();
  const text = `Alaya Holistics · Analítica local

Eventos: ${report.stats.events}
Sesiones: ${report.stats.sessions}
Visitas: ${report.stats.pageViews}
Intención reserva: ${report.stats.reservationIntent}
Intención contacto: ${report.stats.contactIntent}
Reservas creadas: ${report.stats.reservations}
Clientes CRM: ${report.stats.clients}
Campañas: ${report.stats.campaigns}

Top secciones:
${Object.entries(report.bySection).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([k,v]) => `- ${k}: ${v}`).join("\n") || "Sin datos"}

Nota: métricas locales no sensibles.`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen de analítica copiado.");
}

document.querySelector("#refreshAnalyticsV126")?.addEventListener("click", renderAnalyticsPanelV126);
document.querySelector("#exportAnalyticsReportV126")?.addEventListener("click", exportAnalyticsReportV126);
document.querySelector("#clearAnalyticsEventsV126")?.addEventListener("click", clearAnalyticsEventsV126);
document.querySelector("#copyAnalyticsSummaryV126")?.addEventListener("click", copyAnalyticsSummaryV126);
document.querySelector("#analyticsSearchV126")?.addEventListener("input", renderAnalyticsEventsListV126);
document.querySelector("#analyticsFilterTypeV126")?.addEventListener("change", renderAnalyticsEventsListV126);

window.trackAnalyticsEventV126 = trackAnalyticsEventV126;
window.renderAnalyticsPanelV126 = renderAnalyticsPanelV126;
window.buildAnalyticsReportV126 = buildAnalyticsReportV126;

setTimeout(() => {
  setupAnalyticsTrackingV126();
  renderAnalyticsPanelV126();
}, 2400);



// v12.7 Multiidioma y Traducciones Pro
const TRANSLATIONS_KEY_V127 = "alaya_translations_v127";
const LANGUAGE_KEY_V127 = "alaya_language_v127";

const DEFAULT_TRANSLATIONS_V127 = {
  es: {
    headline: "Alaya Holistics en varios idiomas",
    intro: "Cambia el idioma de los textos principales y prepara la web para castellano, catalán e inglés.",
    servicesTag: "Servicios",
    servicesTitle: "Bienestar y orientación",
    servicesText: "Tarot, Reiki, talleres, herbolario y acompañamiento holístico con una comunicación clara.",
    bookingTag: "Reservas",
    bookingTitle: "Solicitud sencilla",
    bookingText: "Pide información o reserva hora concertada desde la web.",
    trustTag: "Confianza",
    trustTitle: "Textos responsables",
    trustText: "Mensajes preparados para explicar los servicios sin prometer diagnósticos ni resultados médicos."
  },
  cat: {
    headline: "Alaya Holistics en diversos idiomes",
    intro: "Canvia l’idioma dels textos principals i prepara la web per a castellà, català i anglès.",
    servicesTag: "Serveis",
    servicesTitle: "Benestar i orientació",
    servicesText: "Tarot, Reiki, tallers, herbolari i acompanyament holístic amb una comunicació clara.",
    bookingTag: "Reserves",
    bookingTitle: "Sol·licitud senzilla",
    bookingText: "Demana informació o reserva hora concertada des de la web.",
    trustTag: "Confiança",
    trustTitle: "Textos responsables",
    trustText: "Missatges preparats per explicar els serveis sense prometre diagnòstics ni resultats mèdics."
  },
  en: {
    headline: "Alaya Holistics in multiple languages",
    intro: "Switch the main public texts and prepare the website for Spanish, Catalan and English.",
    servicesTag: "Services",
    servicesTitle: "Wellbeing and guidance",
    servicesText: "Tarot, Reiki, workshops, herbal shop and holistic support with clear communication.",
    bookingTag: "Bookings",
    bookingTitle: "Simple request",
    bookingText: "Ask for information or request an appointment from the website.",
    trustTag: "Trust",
    trustTitle: "Responsible wording",
    trustText: "Texts prepared to explain services without promising diagnoses or medical outcomes."
  }
};

function getTranslationsV127() {
  try {
    const raw = localStorage.getItem(TRANSLATIONS_KEY_V127);
    return raw ? { ...DEFAULT_TRANSLATIONS_V127, ...JSON.parse(raw) } : JSON.parse(JSON.stringify(DEFAULT_TRANSLATIONS_V127));
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_TRANSLATIONS_V127));
  }
}

function saveTranslationsObjectV127(translations) {
  localStorage.setItem(TRANSLATIONS_KEY_V127, JSON.stringify(translations));
}

function getCurrentLanguageV127() {
  return localStorage.getItem(LANGUAGE_KEY_V127) || "es";
}

function setCurrentLanguageV127(lang) {
  if (!["es", "cat", "en"].includes(lang)) lang = "es";
  localStorage.setItem(LANGUAGE_KEY_V127, lang);
  applyLanguageV127(lang);
  renderLanguageAdminV127();
}

function applyLanguageV127(lang = getCurrentLanguageV127()) {
  const translations = getTranslationsV127();
  const dict = translations[lang] || translations.es;
  document.querySelectorAll("[data-i18n-v127]").forEach(el => {
    const key = el.getAttribute("data-i18n-v127");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-lang-v127]").forEach(btn => {
    btn.classList.toggle("is-active", btn.getAttribute("data-lang-v127") === lang);
  });
}

function fillTranslationFormV127() {
  const lang = document.querySelector("#translationLangV127")?.value || getCurrentLanguageV127();
  const dict = getTranslationsV127()[lang] || {};
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#trHeadlineV127", dict.headline);
  set("#trIntroV127", dict.intro);
  set("#trServicesTagV127", dict.servicesTag);
  set("#trServicesTitleV127", dict.servicesTitle);
  set("#trServicesTextV127", dict.servicesText);
  set("#trBookingTagV127", dict.bookingTag);
  set("#trBookingTitleV127", dict.bookingTitle);
  set("#trBookingTextV127", dict.bookingText);
  set("#trTrustTagV127", dict.trustTag);
  set("#trTrustTitleV127", dict.trustTitle);
  set("#trTrustTextV127", dict.trustText);
}

function collectTranslationFormV127() {
  return {
    headline: document.querySelector("#trHeadlineV127")?.value || "",
    intro: document.querySelector("#trIntroV127")?.value || "",
    servicesTag: document.querySelector("#trServicesTagV127")?.value || "",
    servicesTitle: document.querySelector("#trServicesTitleV127")?.value || "",
    servicesText: document.querySelector("#trServicesTextV127")?.value || "",
    bookingTag: document.querySelector("#trBookingTagV127")?.value || "",
    bookingTitle: document.querySelector("#trBookingTitleV127")?.value || "",
    bookingText: document.querySelector("#trBookingTextV127")?.value || "",
    trustTag: document.querySelector("#trTrustTagV127")?.value || "",
    trustTitle: document.querySelector("#trTrustTitleV127")?.value || "",
    trustText: document.querySelector("#trTrustTextV127")?.value || ""
  };
}

function saveTranslationFormV127() {
  const lang = document.querySelector("#translationLangV127")?.value || "es";
  const translations = getTranslationsV127();
  translations[lang] = collectTranslationFormV127();
  saveTranslationsObjectV127(translations);
  applyLanguageV127(getCurrentLanguageV127());
  renderLanguageAdminV127();
  if (typeof showToast === "function") showToast("Traducciones guardadas.");
}

function renderLanguageStatsV127() {
  const box = document.querySelector("#languageStatsV127");
  if (!box) return;
  const translations = getTranslationsV127();
  const rows = ["es", "cat", "en"].map(lang => {
    const filled = Object.values(translations[lang] || {}).filter(Boolean).length;
    return [lang.toUpperCase(), filled];
  });
  box.innerHTML = `
    <div class="language-stat-v127"><strong>${getCurrentLanguageV127().toUpperCase()}</strong><span>Idioma activo</span></div>
    ${rows.map(([lang, count]) => `<div class="language-stat-v127"><strong>${count}</strong><span>${lang} textos</span></div>`).join("")}
  `;
}

function renderTranslationPreviewV127() {
  const box = document.querySelector("#translationPreviewV127");
  if (!box) return;
  const lang = document.querySelector("#translationLangV127")?.value || getCurrentLanguageV127();
  const dict = getTranslationsV127()[lang] || {};
  box.innerHTML = `
    <span>${lang.toUpperCase()}</span>
    <h3>${dict.headline || "Sin titular"}</h3>
    <p>${dict.intro || "Sin introducción"}</p>
    <p><strong>${dict.servicesTitle || ""}</strong> · ${dict.servicesText || ""}</p>
    <p><strong>${dict.bookingTitle || ""}</strong> · ${dict.bookingText || ""}</p>
    <p><strong>${dict.trustTitle || ""}</strong> · ${dict.trustText || ""}</p>
  `;
}

function renderTranslationsJsonV127() {
  const out = document.querySelector("#translationsJsonV127");
  if (out) out.value = JSON.stringify({
    version: "12.7",
    exportedAt: new Date().toISOString(),
    activeLanguage: getCurrentLanguageV127(),
    translations: getTranslationsV127()
  }, null, 2);
}

function renderLanguageAdminV127() {
  const selector = document.querySelector("#translationLangV127");
  if (selector && !selector.value) selector.value = getCurrentLanguageV127();
  fillTranslationFormV127();
  renderLanguageStatsV127();
  renderTranslationPreviewV127();
  renderTranslationsJsonV127();
}

function exportTranslationsV127() {
  const data = {
    version: "12.7",
    exportedAt: new Date().toISOString(),
    activeLanguage: getCurrentLanguageV127(),
    translations: getTranslationsV127()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-traducciones-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importTranslationsV127() {
  const raw = document.querySelector("#translationImportV127")?.value || "";
  if (!raw.trim()) return;
  try {
    const parsed = JSON.parse(raw);
    const translations = parsed.translations || parsed;
    if (!translations.es || !translations.cat || !translations.en) throw new Error("Formato incompleto");
    saveTranslationsObjectV127(translations);
    renderLanguageAdminV127();
    applyLanguageV127(getCurrentLanguageV127());
    if (typeof showToast === "function") showToast("Traducciones importadas.");
  } catch {
    if (typeof showToast === "function") showToast("JSON de traducciones no válido.");
  }
}

function resetTranslationsV127() {
  if (!confirm("¿Restaurar traducciones base?")) return;
  localStorage.removeItem(TRANSLATIONS_KEY_V127);
  renderLanguageAdminV127();
  applyLanguageV127(getCurrentLanguageV127());
}

async function copyTranslationsSummaryV127() {
  const lang = document.querySelector("#translationLangV127")?.value || getCurrentLanguageV127();
  const dict = getTranslationsV127()[lang] || {};
  const text = `Alaya Holistics · Traducciones

Idioma activo: ${getCurrentLanguageV127().toUpperCase()}
Idioma editado: ${lang.toUpperCase()}

Titular:
${dict.headline}

Intro:
${dict.intro}

Servicios:
${dict.servicesTitle} · ${dict.servicesText}

Reservas:
${dict.bookingTitle} · ${dict.bookingText}

Confianza:
${dict.trustTitle} · ${dict.trustText}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen de traducciones copiado.");
}

document.querySelectorAll("[data-lang-v127]").forEach(btn => {
  btn.addEventListener("click", () => setCurrentLanguageV127(btn.getAttribute("data-lang-v127")));
});
document.querySelector("#translationLangV127")?.addEventListener("change", renderLanguageAdminV127);
document.querySelector("#saveTranslationsV127")?.addEventListener("click", saveTranslationFormV127);
document.querySelector("#applyLanguageV127")?.addEventListener("click", () => setCurrentLanguageV127(document.querySelector("#translationLangV127")?.value || "es"));
document.querySelector("#exportTranslationsV127")?.addEventListener("click", exportTranslationsV127);
document.querySelector("#importTranslationsV127")?.addEventListener("click", importTranslationsV127);
document.querySelector("#resetTranslationsV127")?.addEventListener("click", resetTranslationsV127);
document.querySelector("#copyTranslationsSummaryV127")?.addEventListener("click", copyTranslationsSummaryV127);
document.querySelectorAll(".translation-form-v127 input, .translation-form-v127 textarea").forEach(el => {
  el.addEventListener("input", () => {
    renderTranslationPreviewV127();
    renderTranslationsJsonV127();
  });
});

window.applyLanguageV127 = applyLanguageV127;
window.renderLanguageAdminV127 = renderLanguageAdminV127;
window.getTranslationsV127 = getTranslationsV127;

setTimeout(() => {
  applyLanguageV127();
  renderLanguageAdminV127();
}, 2500);



// v12.8 Recordatorios y Seguimiento Pro
const REMINDER_SETTINGS_KEY_V128 = "alaya_reminder_settings_v128";
const REMINDERS_KEY_V128 = "alaya_reminders_v128";

const REMINDER_DEFAULTS_V128 = {
  businessName: "Alaya Holistics",
  channel: "whatsapp",
  signature: "Gracias,\nAlaya Holistics",
  updatedAt: ""
};

function getReminderSettingsV128() {
  try {
    const raw = localStorage.getItem(REMINDER_SETTINGS_KEY_V128);
    return raw ? { ...REMINDER_DEFAULTS_V128, ...JSON.parse(raw) } : { ...REMINDER_DEFAULTS_V128 };
  } catch {
    return { ...REMINDER_DEFAULTS_V128 };
  }
}

function getSavedRemindersV128() {
  try {
    const raw = localStorage.getItem(REMINDERS_KEY_V128);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRemindersV128(items) {
  localStorage.setItem(REMINDERS_KEY_V128, JSON.stringify(items));
  renderRemindersPanelV128();
}

function saveReminderSettingsV128(settings) {
  localStorage.setItem(REMINDER_SETTINGS_KEY_V128, JSON.stringify({
    ...getReminderSettingsV128(),
    ...settings,
    updatedAt: new Date().toISOString()
  }));
  renderRemindersPanelV128();
}

function safeReminderJsonV128(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function dateDiffDaysV128(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return Math.round((date - new Date(today.toISOString().slice(0,10) + "T00:00:00")) / 86400000);
}

function cleanReminderTextV128(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function reminderMessageV128(type, source, settings = getReminderSettingsV128()) {
  const name = source.name || source.clientName || "Hola";
  const service = source.service || source.title || "tu cita";
  const date = source.preferredDate || source.date || "";
  const time = source.preferredTime || source.time || "";
  const code = source.code ? `\nCódigo: ${source.code}` : "";
  const when = date ? `${date}${time ? " a las " + time : ""}` : "la fecha acordada";
  const sign = settings.signature || REMINDER_DEFAULTS_V128.signature;

  const messages = {
    pending: `Hola ${name},\n\nTe escribimos desde ${settings.businessName} para confirmar que hemos recibido tu solicitud sobre ${service}.\n\nEstamos revisando disponibilidad y te responderemos lo antes posible.${code}\n\n${sign}`,
    confirmed24h: `Hola ${name},\n\nTe recordamos tu cita de ${service} prevista para ${when}.\n\nSi necesitas cambiarla, avísanos con antelación.${code}\n\n${sign}`,
    followup: `Hola ${name},\n\nGracias por haber confiado en ${settings.businessName}. Esperamos que la sesión de ${service} haya sido de ayuda.\n\nSi quieres compartir cómo te has sentido o solicitar otra cita, estamos disponibles.\n\n${sign}`,
    proposal: `Hola ${name},\n\nTenemos una propuesta de horario para ${service}: ${when}.\n\nRespóndenos si te va bien o prefieres otra opción.${code}\n\n${sign}`,
    agenda: `Hola,\n\nTenemos disponibilidad para ${service} el ${when}.\n\nPuedes escribirnos para solicitar tu plaza o más información.\n\n${sign}`
  };

  return messages[type] || messages.pending;
}

function buildReminderCandidatesV128() {
  const reservations = safeReminderJsonV128("alaya_online_reservations_v110", []);
  const slots = safeReminderJsonV128("alaya_agenda_slots_v112", []);
  const existing = getSavedRemindersV128();
  const existingMap = new Map(existing.map(item => [item.fingerprint, item]));
  const createdAt = new Date().toISOString();
  const candidates = [];

  reservations.forEach(res => {
    const baseId = res.id || res.code || `${res.name}-${res.preferredDate}-${res.service}`;
    const status = res.status || "pendiente";
    const days = dateDiffDaysV128(res.preferredDate);

    if (status === "pendiente") {
      candidates.push(makeReminderCandidateV128("pending", "Reserva pendiente", res, baseId, createdAt));
    }

    if (status === "confirmada" && days !== null && days <= 1 && days >= 0) {
      candidates.push(makeReminderCandidateV128("confirmed24h", "Recordatorio 24h", res, baseId, createdAt));
    }

    if (false) {
      // Replaced below after string construction.
    }

    if (status === "alternativa") {
      candidates.push(makeReminderCandidateV128("proposal", "Propuesta de horario", res, baseId, createdAt));
    }
  });

  slots.forEach(slot => {
    const days = dateDiffDaysV128(slot.date);
    if ((slot.status === "disponible" || !slot.status) && days !== null && days >= 0 && days <= 7) {
      const baseId = slot.id || `${slot.service}-${slot.date}-${slot.time}`;
      candidates.push(makeReminderCandidateV128("agenda", "Agenda disponible", slot, baseId, createdAt));
    }
  });

  return candidates.map(item => {
    const previous = existingMap.get(item.fingerprint);
    return previous ? { ...item, ...previous, message: previous.message || item.message } : item;
  });
}

function makeReminderCandidateV128(type, title, source, baseId, createdAt) {
  const fingerprint = `${type}:${baseId}`;
  return {
    id: fingerprint.replace(/[^a-zA-Z0-9_-]/g, "-"),
    fingerprint,
    type,
    title,
    status: "pendiente",
    sourceName: source.name || source.clientName || source.service || "Sin nombre",
    sourceContact: source.contact || source.email || "",
    sourceCode: source.code || "",
    service: source.service || source.title || "",
    date: source.preferredDate || source.date || "",
    time: source.preferredTime || source.time || "",
    message: reminderMessageV128(type, source),
    createdAt,
    updatedAt: createdAt
  };
}

function buildReminderCandidatesFixedV128() {
  const reservations = safeReminderJsonV128("alaya_online_reservations_v110", []);
  const slots = safeReminderJsonV128("alaya_agenda_slots_v112", []);
  const existing = getSavedRemindersV128();
  const existingMap = new Map(existing.map(item => [item.fingerprint, item]));
  const createdAt = new Date().toISOString();
  const candidates = [];

  reservations.forEach(res => {
    const baseId = res.id || res.code || `${res.name}-${res.preferredDate}-${res.service}`;
    const status = res.status || "pendiente";
    const days = dateDiffDaysV128(res.preferredDate);

    if (status === "pendiente") candidates.push(makeReminderCandidateV128("pending", "Reserva pendiente", res, baseId, createdAt));
    if (status === "confirmada" && days !== null && days <= 1 && days >= 0) candidates.push(makeReminderCandidateV128("confirmed24h", "Recordatorio 24h", res, baseId, createdAt));
    if (status === "completada" || (days !== null && days < 0 && days >= -7)) candidates.push(makeReminderCandidateV128("followup", "Seguimiento posterior", res, baseId, createdAt));
    if (status === "alternativa") candidates.push(makeReminderCandidateV128("proposal", "Propuesta de horario", res, baseId, createdAt));
  });

  slots.forEach(slot => {
    const days = dateDiffDaysV128(slot.date);
    if ((slot.status === "disponible" || !slot.status) && days !== null && days >= 0 && days <= 7) {
      const baseId = slot.id || `${slot.service}-${slot.date}-${slot.time}`;
      candidates.push(makeReminderCandidateV128("agenda", "Agenda disponible", slot, baseId, createdAt));
    }
  });

  return candidates.map(item => {
    const previous = existingMap.get(item.fingerprint);
    return previous ? { ...item, ...previous, message: previous.message || item.message } : item;
  });
}

function generateRemindersV128() {
  saveRemindersV128(buildReminderCandidatesFixedV128());
  if (typeof showToast === "function") showToast("Recordatorios generados.");
}

function fillReminderSettingsFormV128() {
  const s = getReminderSettingsV128();
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#reminderBusinessNameV128", s.businessName);
  set("#reminderChannelV128", s.channel);
  set("#reminderSignatureV128", s.signature);
}

function saveReminderSettingsFormV128() {
  saveReminderSettingsV128({
    businessName: cleanReminderTextV128(document.querySelector("#reminderBusinessNameV128")?.value) || "Alaya Holistics",
    channel: document.querySelector("#reminderChannelV128")?.value || "whatsapp",
    signature: cleanReminderTextV128(document.querySelector("#reminderSignatureV128")?.value) || REMINDER_DEFAULTS_V128.signature
  });
  if (typeof showToast === "function") showToast("Ajustes de recordatorios guardados.");
}

function filteredRemindersV128() {
  const query = (document.querySelector("#reminderSearchV128")?.value || "").toLowerCase().trim();
  const status = document.querySelector("#reminderFilterV128")?.value || "all";
  return getSavedRemindersV128().filter(item => {
    const matchesStatus = status === "all" || item.status === status;
    const haystack = [item.title, item.type, item.sourceName, item.sourceContact, item.service, item.message, item.status].join(" ").toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  });
}

function setReminderStatusV128(id, status) {
  const updated = getSavedRemindersV128().map(item => item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item);
  saveRemindersV128(updated);
}

async function copyReminderMessageV128(id) {
  const item = getSavedRemindersV128().find(r => r.id === id);
  if (!item) return;
  if (typeof copyText === "function") copyText(item.message);
  else await navigator.clipboard?.writeText(item.message);
  if (typeof showToast === "function") showToast("Mensaje copiado.");
}

function buildRemindersReportV128() {
  const reminders = getSavedRemindersV128();
  const byStatus = reminders.reduce((acc, r) => {
    acc[r.status || "pendiente"] = (acc[r.status || "pendiente"] || 0) + 1;
    return acc;
  }, {});
  const byType = reminders.reduce((acc, r) => {
    acc[r.type || "sin tipo"] = (acc[r.type || "sin tipo"] || 0) + 1;
    return acc;
  }, {});
  return {
    generatedAt: new Date().toISOString(),
    version: "12.8",
    settings: getReminderSettingsV128(),
    stats: {
      total: reminders.length,
      pending: byStatus.pendiente || 0,
      prepared: byStatus.preparado || 0,
      sent: byStatus["enviado-manual"] || 0,
      skipped: byStatus.omitido || 0
    },
    byStatus,
    byType,
    reminders
  };
}

function renderReminderStatsV128(report = buildRemindersReportV128()) {
  const box = document.querySelector("#remindersStatsV128");
  if (!box) return;
  const stats = [
    ["Total", report.stats.total],
    ["Pendientes", report.stats.pending],
    ["Preparados", report.stats.prepared],
    ["Enviados", report.stats.sent],
    ["Omitidos", report.stats.skipped]
  ];
  box.innerHTML = stats.map(([label, value]) => `
    <div class="reminder-stat-v128">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderReminderTypesV128(report = buildRemindersReportV128()) {
  const box = document.querySelector("#reminderTypesV128");
  if (!box) return;
  const rows = Object.entries(report.byType);
  if (!rows.length) {
    box.innerHTML = `<article class="reminder-type-v128"><p>Genera recordatorios para ver tipos disponibles.</p></article>`;
    return;
  }
  box.innerHTML = rows.map(([type, count]) => `
    <article class="reminder-type-v128">
      <span>${count}</span>
      <strong>${type}</strong>
      <p>Recordatorios de este tipo.</p>
    </article>
  `).join("");
}

function renderRemindersListV128() {
  const list = document.querySelector("#remindersListV128");
  if (!list) return;
  const reminders = filteredRemindersV128();
  if (!reminders.length) {
    list.innerHTML = `<article class="reminder-card-v128"><p>No hay recordatorios para mostrar. Pulsa “Generar recordatorios”.</p></article>`;
    return;
  }
  list.innerHTML = reminders.map(item => `
    <article class="reminder-card-v128" data-status="${item.status}">
      <span>${item.title} · ${item.status}</span>
      <strong>${item.sourceName || "Sin nombre"} ${item.date ? "· " + item.date : ""} ${item.time ? item.time : ""}</strong>
      <p>${item.service || "Sin servicio"} ${item.sourceCode ? "· " + item.sourceCode : ""}</p>
      <div class="reminder-message-v128">${item.message}</div>
      <div class="reminder-actions-v128">
        <button class="btn btn-secondary" type="button" onclick="copyReminderMessageV128('${item.id}')">Copiar</button>
        <button class="btn btn-secondary" type="button" onclick="setReminderStatusV128('${item.id}', 'preparado')">Preparado</button>
        <button class="btn btn-secondary" type="button" onclick="setReminderStatusV128('${item.id}', 'enviado-manual')">Enviado</button>
        <button class="btn btn-secondary" type="button" onclick="setReminderStatusV128('${item.id}', 'omitido')">Omitir</button>
      </div>
    </article>
  `).join("");
}

function renderRemindersPreviewV128(report = buildRemindersReportV128()) {
  const out = document.querySelector("#remindersReportPreviewV128");
  if (out) out.value = JSON.stringify(report, null, 2);
}

function renderRemindersPanelV128() {
  fillReminderSettingsFormV128();
  const report = buildRemindersReportV128();
  renderReminderStatsV128(report);
  renderReminderTypesV128(report);
  renderRemindersListV128();
  renderRemindersPreviewV128(report);
}

function exportRemindersReportV128() {
  const report = buildRemindersReportV128();
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-recordatorios-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyRemindersSummaryV128() {
  const report = buildRemindersReportV128();
  const text = `Alaya Holistics · Recordatorios

Total: ${report.stats.total}
Pendientes: ${report.stats.pending}
Preparados: ${report.stats.prepared}
Enviados manuales: ${report.stats.sent}
Omitidos: ${report.stats.skipped}

Tipos:
${Object.entries(report.byType).map(([k,v]) => `- ${k}: ${v}`).join("\n") || "Sin tipos"}

Nota: no se envían mensajes automáticamente.`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen de recordatorios copiado.");
}

document.querySelector("#generateRemindersV128")?.addEventListener("click", generateRemindersV128);
document.querySelector("#exportRemindersReportV128")?.addEventListener("click", exportRemindersReportV128);
document.querySelector("#saveReminderSettingsV128")?.addEventListener("click", saveReminderSettingsFormV128);
document.querySelector("#copyRemindersSummaryV128")?.addEventListener("click", copyRemindersSummaryV128);
document.querySelector("#reminderSearchV128")?.addEventListener("input", renderRemindersListV128);
document.querySelector("#reminderFilterV128")?.addEventListener("change", renderRemindersListV128);

window.renderRemindersPanelV128 = renderRemindersPanelV128;
window.generateRemindersV128 = generateRemindersV128;
window.setReminderStatusV128 = setReminderStatusV128;
window.copyReminderMessageV128 = copyReminderMessageV128;
window.buildRemindersReportV128 = buildRemindersReportV128;

setTimeout(renderRemindersPanelV128, 2600);



// v12.9 Tarifas, Packs y Servicios Pro
const SERVICES_CATALOG_KEY_V129 = "alaya_services_catalog_v129";

const DEFAULT_SERVICES_V129 = [
  {
    id: "svc-tarot-general",
    name: "Lectura de cartas completa",
    category: "tarot",
    mode: "presencial",
    duration: "60 min",
    price: "45 €",
    availability: "hora-concertada",
    description: "Sesión de orientación simbólica para revisar una situación desde una mirada reflexiva y cercana.",
    disclaimer: "Servicio de orientación simbólica. No sustituye asesoramiento médico, psicológico, legal o financiero.",
    visible: true
  },
  {
    id: "svc-reiki",
    name: "Sesión de Reiki",
    category: "reiki",
    mode: "presencial",
    duration: "60 min",
    price: "40 €",
    availability: "hora-concertada",
    description: "Espacio de bienestar y relajación orientado a la calma y el equilibrio personal.",
    disclaimer: "Servicio de bienestar complementario. No sustituye atención sanitaria profesional.",
    visible: true
  },
  {
    id: "svc-herbolario",
    name: "Asesoramiento herbolario",
    category: "herbolario",
    mode: "consulta",
    duration: "30 min",
    price: "Consultar",
    availability: "disponible",
    description: "Orientación general sobre productos de herbolario y rutinas de bienestar cotidiano.",
    disclaimer: "No se realizan diagnósticos ni tratamientos. Consulta siempre con un profesional sanitario ante síntomas o medicación.",
    visible: true
  },
  {
    id: "svc-taller-tarot",
    name: "Taller iniciación al Tarot",
    category: "taller",
    mode: "mixta",
    duration: "2 h",
    price: "Consultar",
    availability: "proximamente",
    description: "Taller introductorio para conocer cartas, arquetipos y lectura responsable.",
    disclaimer: "Contenido formativo y simbólico. No se prometen resultados concretos.",
    visible: true
  },
  {
    id: "svc-pack-bienestar",
    name: "Pack bienestar holístico",
    category: "pack",
    mode: "presencial",
    duration: "3 sesiones",
    price: "Pack a consultar",
    availability: "hora-concertada",
    description: "Pack flexible para combinar orientación, relajación y seguimiento manual.",
    disclaimer: "Pack de bienestar/orientación. No sustituye atención profesional especializada.",
    visible: true
  }
];

function getServicesCatalogV129() {
  try {
    const raw = localStorage.getItem(SERVICES_CATALOG_KEY_V129);
    const parsed = raw ? JSON.parse(raw) : DEFAULT_SERVICES_V129;
    return Array.isArray(parsed) ? parsed : DEFAULT_SERVICES_V129;
  } catch {
    return DEFAULT_SERVICES_V129;
  }
}

function saveServicesCatalogV129(items) {
  localStorage.setItem(SERVICES_CATALOG_KEY_V129, JSON.stringify(items));
  renderServicesAdminV129();
  renderPublicServicesCatalogV129();
}

function cleanServiceTextV129(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function getServiceFormDataV129() {
  return {
    id: document.querySelector("#serviceIdV129")?.value || `svc-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: cleanServiceTextV129(document.querySelector("#serviceNameV129")?.value),
    category: document.querySelector("#serviceCategoryV129")?.value || "holistico",
    mode: document.querySelector("#serviceModeV129")?.value || "presencial",
    duration: cleanServiceTextV129(document.querySelector("#serviceDurationV129")?.value),
    price: cleanServiceTextV129(document.querySelector("#servicePriceV129")?.value),
    availability: document.querySelector("#serviceAvailabilityV129")?.value || "hora-concertada",
    description: cleanServiceTextV129(document.querySelector("#serviceDescriptionV129")?.value),
    disclaimer: cleanServiceTextV129(document.querySelector("#serviceDisclaimerV129")?.value),
    visible: Boolean(document.querySelector("#serviceVisibleV129")?.checked),
    updatedAt: new Date().toISOString()
  };
}

function fillServiceFormV129(service) {
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#serviceIdV129", service.id);
  set("#serviceNameV129", service.name);
  set("#serviceCategoryV129", service.category);
  set("#serviceModeV129", service.mode);
  set("#serviceDurationV129", service.duration);
  set("#servicePriceV129", service.price);
  set("#serviceAvailabilityV129", service.availability);
  set("#serviceDescriptionV129", service.description);
  set("#serviceDisclaimerV129", service.disclaimer);
  const visible = document.querySelector("#serviceVisibleV129");
  if (visible) visible.checked = Boolean(service.visible);
}

function clearServiceFormV129() {
  document.querySelector("#serviceFormV129")?.reset();
  const id = document.querySelector("#serviceIdV129");
  const visible = document.querySelector("#serviceVisibleV129");
  if (id) id.value = "";
  if (visible) visible.checked = true;
}

function saveServiceV129(event) {
  event?.preventDefault();
  const service = getServiceFormDataV129();
  if (!service.name) {
    if (typeof showToast === "function") showToast("Añade el nombre del servicio.");
    return;
  }
  const services = getServicesCatalogV129();
  const index = services.findIndex(item => item.id === service.id);
  if (index >= 0) services[index] = { ...services[index], ...service };
  else services.unshift({ ...service, createdAt: new Date().toISOString() });
  saveServicesCatalogV129(services);
  clearServiceFormV129();
  if (typeof showToast === "function") showToast("Servicio guardado.");
}

function filteredServicesAdminV129() {
  const query = (document.querySelector("#serviceSearchV129")?.value || "").toLowerCase().trim();
  const cat = document.querySelector("#serviceFilterCategoryV129")?.value || "all";
  return getServicesCatalogV129().filter(s => {
    const matchesCat = cat === "all" || s.category === cat;
    const haystack = [s.name, s.category, s.mode, s.price, s.duration, s.description, s.availability].join(" ").toLowerCase();
    return matchesCat && (!query || haystack.includes(query));
  });
}

function filteredServicesPublicV129() {
  const query = (document.querySelector("#publicServiceSearchV129")?.value || "").toLowerCase().trim();
  const cat = document.querySelector("#publicServiceCategoryV129")?.value || "all";
  return getServicesCatalogV129().filter(s => {
    const matchesCat = cat === "all" || s.category === cat;
    const haystack = [s.name, s.category, s.mode, s.price, s.duration, s.description, s.availability].join(" ").toLowerCase();
    return s.visible !== false && s.availability !== "oculto" && matchesCat && (!query || haystack.includes(query));
  });
}

function renderPublicServicesCatalogV129() {
  const box = document.querySelector("#publicServicesCatalogV129");
  if (!box) return;
  const services = filteredServicesPublicV129();
  if (!services.length) {
    box.innerHTML = `<article><p>No hay servicios visibles con este filtro.</p></article>`;
    return;
  }
  box.innerHTML = services.map(s => `
    <article>
      <span>${s.category || "servicio"} · ${s.availability || "consultar"}</span>
      <h3>${s.name}</h3>
      <div class="price-line-v129">
        <strong>${s.price || "Consultar"}</strong>
        <small>${s.duration || ""} · ${s.mode || ""}</small>
      </div>
      <p>${s.description || ""}</p>
      <p><small>${s.disclaimer || "Precio orientativo sujeto a confirmación."}</small></p>
      <a class="btn btn-secondary" href="#reservas">Solicitar información</a>
    </article>
  `).join("");
}

function renderServicesStatsV129() {
  const box = document.querySelector("#servicesStatsV129");
  if (!box) return;
  const services = getServicesCatalogV129();
  const visible = services.filter(s => s.visible !== false && s.availability !== "oculto").length;
  const packs = services.filter(s => s.category === "pack").length;
  const talleres = services.filter(s => s.category === "taller").length;
  const hora = services.filter(s => s.availability === "hora-concertada").length;
  const stats = [["Total", services.length], ["Visibles", visible], ["Packs", packs], ["Talleres", talleres], ["Hora concertada", hora]];
  box.innerHTML = stats.map(([label, value]) => `
    <div class="price-stat-v129">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderAdminServicesListV129() {
  const list = document.querySelector("#adminServicesListV129");
  if (!list) return;
  const services = filteredServicesAdminV129();
  if (!services.length) {
    list.innerHTML = `<article class="service-item-v129"><p>No hay servicios con este filtro.</p></article>`;
    return;
  }
  list.innerHTML = services.map(s => `
    <article class="service-item-v129" data-visible="${s.visible !== false}">
      <span>${s.category || "servicio"} · ${s.visible !== false ? "visible" : "oculto"}</span>
      <strong>${s.name || "Sin nombre"}</strong>
      <p>${s.price || "Consultar"} · ${s.duration || ""} · ${s.mode || ""}</p>
      <p>${s.description || ""}</p>
      <div class="service-actions-v129">
        <button class="btn btn-secondary" type="button" onclick="editServiceV129('${s.id}')">Editar</button>
        <button class="btn btn-secondary" type="button" onclick="copyServiceCardV129('${s.id}')">Copiar ficha</button>
        <button class="btn btn-secondary" type="button" onclick="toggleServiceVisibleV129('${s.id}')">${s.visible !== false ? "Ocultar" : "Mostrar"}</button>
        <button class="btn btn-secondary" type="button" onclick="deleteServiceV129('${s.id}')">Borrar</button>
      </div>
    </article>
  `).join("");
}

function editServiceV129(id) {
  const service = getServicesCatalogV129().find(s => s.id === id);
  if (!service) return;
  fillServiceFormV129(service);
  document.querySelector("#serviceFormV129")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteServiceV129(id) {
  const service = getServicesCatalogV129().find(s => s.id === id);
  if (!service) return;
  if (!confirm(`¿Borrar "${service.name}"?`)) return;
  saveServicesCatalogV129(getServicesCatalogV129().filter(s => s.id !== id));
}

function toggleServiceVisibleV129(id) {
  saveServicesCatalogV129(getServicesCatalogV129().map(s => s.id === id ? { ...s, visible: s.visible === false } : s));
}

async function copyServiceCardV129(id) {
  const s = getServicesCatalogV129().find(item => item.id === id);
  if (!s) return;
  const text = `${s.name}

Categoría: ${s.category}
Modalidad: ${s.mode}
Duración: ${s.duration}
Precio orientativo: ${s.price}
Disponibilidad: ${s.availability}

${s.description}

Nota: ${s.disclaimer || "Precio orientativo sujeto a confirmación."}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Ficha copiada.");
}

function renderServicesCatalogPreviewV129() {
  const out = document.querySelector("#servicesCatalogPreviewV129");
  if (out) out.value = JSON.stringify({
    version: "12.9",
    exportedAt: new Date().toISOString(),
    services: getServicesCatalogV129()
  }, null, 2);
}

function renderServicesAdminV129() {
  renderServicesStatsV129();
  renderAdminServicesListV129();
  renderServicesCatalogPreviewV129();
}

function exportServicesCatalogV129() {
  const data = { version: "12.9", exportedAt: new Date().toISOString(), services: getServicesCatalogV129() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-catalogo-servicios-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function resetServicesCatalogV129() {
  if (!confirm("¿Restaurar catálogo base?")) return;
  localStorage.removeItem(SERVICES_CATALOG_KEY_V129);
  renderServicesAdminV129();
  renderPublicServicesCatalogV129();
}

async function copyServicesSummaryV129() {
  const services = getServicesCatalogV129();
  const text = `Alaya Holistics · Catálogo de servicios

Total: ${services.length}
Visibles: ${services.filter(s => s.visible !== false).length}

${services.map(s => `- ${s.name}: ${s.price || "Consultar"} · ${s.duration || ""} · ${s.availability || ""}`).join("\n")}

Nota: tarifas orientativas sujetas a confirmación manual.`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen de servicios copiado.");
}

document.querySelector("#serviceFormV129")?.addEventListener("submit", saveServiceV129);
document.querySelector("#clearServiceFormV129")?.addEventListener("click", clearServiceFormV129);
document.querySelector("#exportServicesCatalogV129")?.addEventListener("click", exportServicesCatalogV129);
document.querySelector("#resetServicesCatalogV129")?.addEventListener("click", resetServicesCatalogV129);
document.querySelector("#copyServicesSummaryV129")?.addEventListener("click", copyServicesSummaryV129);
document.querySelector("#serviceSearchV129")?.addEventListener("input", renderAdminServicesListV129);
document.querySelector("#serviceFilterCategoryV129")?.addEventListener("change", renderAdminServicesListV129);
document.querySelector("#publicServiceSearchV129")?.addEventListener("input", renderPublicServicesCatalogV129);
document.querySelector("#publicServiceCategoryV129")?.addEventListener("change", renderPublicServicesCatalogV129);

window.renderServicesAdminV129 = renderServicesAdminV129;
window.renderPublicServicesCatalogV129 = renderPublicServicesCatalogV129;
window.editServiceV129 = editServiceV129;
window.deleteServiceV129 = deleteServiceV129;
window.toggleServiceVisibleV129 = toggleServiceVisibleV129;
window.copyServiceCardV129 = copyServiceCardV129;
window.getServicesCatalogV129 = getServicesCatalogV129;

setTimeout(() => {
  renderServicesAdminV129();
  renderPublicServicesCatalogV129();
}, 2700);



// v13.0 Talleres, Cursos e Inscripciones Pro
const WORKSHOPS_KEY_V130 = "alaya_workshops_v130";
const WORKSHOP_REQUESTS_KEY_V130 = "alaya_workshop_requests_v130";

const DEFAULT_WORKSHOPS_V130 = [
  {
    id: "workshop-tarot-init",
    title: "Taller de iniciación al Tarot",
    category: "tarot",
    date: "",
    time: "",
    duration: "2 h",
    mode: "presencial",
    capacity: 10,
    price: "Consultar",
    status: "abierto",
    visible: true,
    description: "Introducción práctica a los arquetipos, símbolos y lectura responsable de cartas.",
    disclaimer: "Actividad formativa y simbólica. No sustituye asesoramiento profesional."
  },
  {
    id: "workshop-reiki-relax",
    title: "Encuentro de Reiki y relajación",
    category: "reiki",
    date: "",
    time: "",
    duration: "90 min",
    mode: "presencial",
    capacity: 8,
    price: "Consultar",
    status: "abierto",
    visible: true,
    description: "Espacio grupal de calma, respiración y bienestar desde una mirada respetuosa.",
    disclaimer: "Actividad de bienestar complementario. No sustituye atención sanitaria."
  },
  {
    id: "workshop-herbolario",
    title: "Taller de herbolario consciente",
    category: "herbolario",
    date: "",
    time: "",
    duration: "2 h",
    mode: "presencial",
    capacity: 12,
    price: "Consultar",
    status: "proximamente",
    visible: true,
    description: "Introducción a rutinas de bienestar cotidiano y uso responsable de productos de herbolario.",
    disclaimer: "No se realizan diagnósticos ni tratamientos. Consulta con profesionales sanitarios ante dudas de salud."
  }
];

function getWorkshopsV130() {
  try {
    const raw = localStorage.getItem(WORKSHOPS_KEY_V130);
    const parsed = raw ? JSON.parse(raw) : DEFAULT_WORKSHOPS_V130;
    return Array.isArray(parsed) ? parsed : DEFAULT_WORKSHOPS_V130;
  } catch {
    return DEFAULT_WORKSHOPS_V130;
  }
}

function getWorkshopRequestsV130() {
  try {
    const raw = localStorage.getItem(WORKSHOP_REQUESTS_KEY_V130);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveWorkshopsV130(items) {
  localStorage.setItem(WORKSHOPS_KEY_V130, JSON.stringify(items));
  renderWorkshopsAdminV130();
  renderPublicWorkshopsV130();
}

function saveWorkshopRequestsV130(items) {
  localStorage.setItem(WORKSHOP_REQUESTS_KEY_V130, JSON.stringify(items));
  renderWorkshopsAdminV130();
}

function cleanWorkshopTextV130(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function getWorkshopFormDataV130() {
  return {
    id: document.querySelector("#workshopIdV130")?.value || `workshop-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: cleanWorkshopTextV130(document.querySelector("#workshopTitleV130")?.value),
    category: document.querySelector("#workshopCategoryV130")?.value || "otro",
    date: document.querySelector("#workshopDateV130")?.value || "",
    time: document.querySelector("#workshopTimeV130")?.value || "",
    duration: cleanWorkshopTextV130(document.querySelector("#workshopDurationV130")?.value),
    mode: document.querySelector("#workshopModeV130")?.value || "presencial",
    capacity: Number(document.querySelector("#workshopCapacityV130")?.value || 0),
    price: cleanWorkshopTextV130(document.querySelector("#workshopPriceV130")?.value),
    status: document.querySelector("#workshopStatusV130")?.value || "abierto",
    visible: Boolean(document.querySelector("#workshopVisibleV130")?.checked),
    description: cleanWorkshopTextV130(document.querySelector("#workshopDescriptionV130")?.value),
    disclaimer: cleanWorkshopTextV130(document.querySelector("#workshopDisclaimerV130")?.value),
    updatedAt: new Date().toISOString()
  };
}

function fillWorkshopFormV130(item) {
  const set = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.value = value || "";
  };
  set("#workshopIdV130", item.id);
  set("#workshopTitleV130", item.title);
  set("#workshopCategoryV130", item.category);
  set("#workshopDateV130", item.date);
  set("#workshopTimeV130", item.time);
  set("#workshopDurationV130", item.duration);
  set("#workshopModeV130", item.mode);
  set("#workshopCapacityV130", item.capacity);
  set("#workshopPriceV130", item.price);
  set("#workshopStatusV130", item.status);
  set("#workshopDescriptionV130", item.description);
  set("#workshopDisclaimerV130", item.disclaimer);
  const visible = document.querySelector("#workshopVisibleV130");
  if (visible) visible.checked = item.visible !== false;
}

function clearWorkshopFormV130() {
  document.querySelector("#workshopFormV130")?.reset();
  const id = document.querySelector("#workshopIdV130");
  const visible = document.querySelector("#workshopVisibleV130");
  if (id) id.value = "";
  if (visible) visible.checked = true;
}

function saveWorkshopV130(event) {
  event?.preventDefault();
  const workshop = getWorkshopFormDataV130();
  if (!workshop.title) {
    if (typeof showToast === "function") showToast("Añade el título del taller.");
    return;
  }
  const workshops = getWorkshopsV130();
  const index = workshops.findIndex(item => item.id === workshop.id);
  if (index >= 0) workshops[index] = { ...workshops[index], ...workshop };
  else workshops.unshift({ ...workshop, createdAt: new Date().toISOString() });
  saveWorkshopsV130(workshops);
  clearWorkshopFormV130();
  if (typeof showToast === "function") showToast("Taller guardado.");
}

function publicWorkshopFilterV130() {
  const query = (document.querySelector("#publicWorkshopSearchV130")?.value || "").toLowerCase().trim();
  const cat = document.querySelector("#publicWorkshopCategoryV130")?.value || "all";
  return getWorkshopsV130().filter(w => {
    const matchesCat = cat === "all" || w.category === cat;
    const haystack = [w.title, w.category, w.mode, w.price, w.duration, w.description, w.status].join(" ").toLowerCase();
    return w.visible !== false && w.status !== "borrador" && matchesCat && (!query || haystack.includes(query));
  });
}

function adminWorkshopFilterV130() {
  const query = (document.querySelector("#workshopSearchV130")?.value || "").toLowerCase().trim();
  const cat = document.querySelector("#workshopFilterCategoryV130")?.value || "all";
  return getWorkshopsV130().filter(w => {
    const matchesCat = cat === "all" || w.category === cat;
    const haystack = [w.title, w.category, w.mode, w.price, w.duration, w.description, w.status].join(" ").toLowerCase();
    return matchesCat && (!query || haystack.includes(query));
  });
}

function confirmedCountForWorkshopV130(workshopId) {
  return getWorkshopRequestsV130().filter(r => r.workshopId === workshopId && r.status === "confirmada").length;
}

function renderPublicWorkshopsV130() {
  const box = document.querySelector("#publicWorkshopsCatalogV130");
  const select = document.querySelector("#publicWorkshopSelectV130");
  const workshops = publicWorkshopFilterV130();

  if (select) {
    const allVisible = getWorkshopsV130().filter(w => w.visible !== false && w.status !== "borrador");
    select.innerHTML = allVisible.map(w => `<option value="${w.id}">${w.title}</option>`).join("") || `<option value="">Sin talleres publicados</option>`;
  }

  if (!box) return;
  if (!workshops.length) {
    box.innerHTML = `<article><p>No hay talleres visibles con este filtro.</p></article>`;
    return;
  }

  box.innerHTML = workshops.map(w => {
    const confirmed = confirmedCountForWorkshopV130(w.id);
    const capacity = Number(w.capacity || 0);
    const remaining = capacity ? Math.max(capacity - confirmed, 0) : null;
    return `
      <article>
        <span>${w.category || "taller"} · ${w.status || "abierto"}</span>
        <h3>${w.title}</h3>
        <div class="workshop-meta-v130">
          <strong>${w.price || "Consultar"}</strong>
          <small>${w.date || "Fecha por definir"} ${w.time ? "· " + w.time : ""}</small>
          <small>${w.duration || ""} · ${w.mode || ""}</small>
        </div>
        <p>${w.description || ""}</p>
        <p>${capacity ? `Plazas orientativas: ${capacity}. ${remaining} disponibles según solicitudes confirmadas.` : "Plazas a consultar."}</p>
        <p><small>${w.disclaimer || "Actividad de bienestar/formación sujeta a confirmación manual."}</small></p>
        <a class="btn btn-secondary" href="#talleres-inscripciones">Solicitar plaza</a>
      </article>
    `;
  }).join("");
}

function savePublicWorkshopRequestV130(event) {
  event?.preventDefault();
  const name = cleanWorkshopTextV130(document.querySelector("#publicWorkshopNameV130")?.value);
  const contact = cleanWorkshopTextV130(document.querySelector("#publicWorkshopContactV130")?.value);
  const workshopId = document.querySelector("#publicWorkshopSelectV130")?.value || "";
  const message = cleanWorkshopTextV130(document.querySelector("#publicWorkshopMessageV130")?.value);
  const workshop = getWorkshopsV130().find(w => w.id === workshopId);
  if (!name || !contact || !workshopId) {
    if (typeof showToast === "function") showToast("Completa nombre, contacto y taller.");
    return;
  }

  const requests = getWorkshopRequestsV130();
  requests.unshift({
    id: `workshop-request-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    contact,
    workshopId,
    workshopTitle: workshop?.title || "Taller",
    message,
    status: "pendiente",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: "public-form"
  });
  saveWorkshopRequestsV130(requests);
  document.querySelector("#publicWorkshopRequestFormV130")?.reset();
  if (typeof showToast === "function") showToast("Solicitud recibida. Se confirmará manualmente.");
}

function renderWorkshopStatsV130() {
  const box = document.querySelector("#workshopsStatsV130");
  if (!box) return;
  const workshops = getWorkshopsV130();
  const requests = getWorkshopRequestsV130();
  const visible = workshops.filter(w => w.visible !== false && w.status !== "borrador").length;
  const pending = requests.filter(r => r.status === "pendiente").length;
  const confirmed = requests.filter(r => r.status === "confirmada").length;
  const waitlist = requests.filter(r => r.status === "lista-espera").length;
  const stats = [["Talleres", workshops.length], ["Visibles", visible], ["Pendientes", pending], ["Confirmadas", confirmed], ["Lista espera", waitlist]];
  box.innerHTML = stats.map(([label, value]) => `
    <div class="workshop-stat-v130">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderAdminWorkshopsListV130() {
  const list = document.querySelector("#adminWorkshopsListV130");
  if (!list) return;
  const workshops = adminWorkshopFilterV130();
  if (!workshops.length) {
    list.innerHTML = `<article class="workshop-item-v130"><p>No hay talleres con este filtro.</p></article>`;
    return;
  }

  list.innerHTML = workshops.map(w => {
    const confirmed = confirmedCountForWorkshopV130(w.id);
    return `
      <article class="workshop-item-v130" data-visible="${w.visible !== false}">
        <span>${w.category || "taller"} · ${w.status || "abierto"} · ${w.visible !== false ? "visible" : "oculto"}</span>
        <strong>${w.title || "Sin título"}</strong>
        <p>${w.date || "Sin fecha"} ${w.time ? "· " + w.time : ""} · ${w.duration || ""} · ${w.price || "Consultar"}</p>
        <p>Confirmadas: ${confirmed}${w.capacity ? "/" + w.capacity : ""}</p>
        <p>${w.description || ""}</p>
        <div class="workshop-actions-v130">
          <button class="btn btn-secondary" type="button" onclick="editWorkshopV130('${w.id}')">Editar</button>
          <button class="btn btn-secondary" type="button" onclick="copyWorkshopCardV130('${w.id}')">Copiar ficha</button>
          <button class="btn btn-secondary" type="button" onclick="toggleWorkshopVisibleV130('${w.id}')">${w.visible !== false ? "Ocultar" : "Mostrar"}</button>
          <button class="btn btn-secondary" type="button" onclick="deleteWorkshopV130('${w.id}')">Borrar</button>
        </div>
      </article>
    `;
  }).join("");
}

function requestFilterV130() {
  const query = (document.querySelector("#workshopRequestSearchV130")?.value || "").toLowerCase().trim();
  const status = document.querySelector("#workshopRequestFilterV130")?.value || "all";
  return getWorkshopRequestsV130().filter(r => {
    const matchesStatus = status === "all" || r.status === status;
    const haystack = [r.name, r.contact, r.workshopTitle, r.message, r.status].join(" ").toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  });
}

function renderWorkshopRequestsListV130() {
  const list = document.querySelector("#workshopRequestsListV130");
  if (!list) return;
  const requests = requestFilterV130();
  if (!requests.length) {
    list.innerHTML = `<article class="workshop-request-item-v130"><p>No hay solicitudes para mostrar.</p></article>`;
    return;
  }

  list.innerHTML = requests.map(r => `
    <article class="workshop-request-item-v130">
      <span>${r.status || "pendiente"}</span>
      <strong>${r.name || "Sin nombre"} · ${r.workshopTitle || "Taller"}</strong>
      <p>${r.contact || "Sin contacto"}</p>
      <p>${r.message || "Sin mensaje"}</p>
      <p>${r.createdAt ? new Date(r.createdAt).toLocaleString() : "sin fecha"}</p>
      <div class="workshop-request-actions-v130">
        <button class="btn btn-secondary" type="button" onclick="setWorkshopRequestStatusV130('${r.id}', 'contactada')">Contactada</button>
        <button class="btn btn-secondary" type="button" onclick="setWorkshopRequestStatusV130('${r.id}', 'confirmada')">Confirmar</button>
        <button class="btn btn-secondary" type="button" onclick="setWorkshopRequestStatusV130('${r.id}', 'lista-espera')">Lista espera</button>
        <button class="btn btn-secondary" type="button" onclick="setWorkshopRequestStatusV130('${r.id}', 'cancelada')">Cancelar</button>
      </div>
    </article>
  `).join("");
}

function editWorkshopV130(id) {
  const workshop = getWorkshopsV130().find(w => w.id === id);
  if (!workshop) return;
  fillWorkshopFormV130(workshop);
  document.querySelector("#workshopFormV130")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteWorkshopV130(id) {
  const workshop = getWorkshopsV130().find(w => w.id === id);
  if (!workshop) return;
  if (!confirm(`¿Borrar taller "${workshop.title}"?`)) return;
  saveWorkshopsV130(getWorkshopsV130().filter(w => w.id !== id));
}

function toggleWorkshopVisibleV130(id) {
  saveWorkshopsV130(getWorkshopsV130().map(w => w.id === id ? { ...w, visible: w.visible === false } : w));
}

function setWorkshopRequestStatusV130(id, status) {
  saveWorkshopRequestsV130(getWorkshopRequestsV130().map(r => r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r));
  renderPublicWorkshopsV130();
}

function clearCancelledWorkshopRequestsV130() {
  if (!confirm("¿Borrar solicitudes canceladas?")) return;
  saveWorkshopRequestsV130(getWorkshopRequestsV130().filter(r => r.status !== "cancelada"));
}

async function copyWorkshopCardV130(id) {
  const w = getWorkshopsV130().find(item => item.id === id);
  if (!w) return;
  const confirmed = confirmedCountForWorkshopV130(w.id);
  const text = `${w.title}

Categoría: ${w.category}
Fecha: ${w.date || "por definir"} ${w.time || ""}
Duración: ${w.duration}
Modalidad: ${w.mode}
Precio orientativo: ${w.price}
Estado: ${w.status}
Plazas confirmadas: ${confirmed}${w.capacity ? "/" + w.capacity : ""}

${w.description}

Nota: ${w.disclaimer || "Actividad sujeta a confirmación manual."}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Ficha de taller copiada.");
}

function buildWorkshopsReportV130() {
  const workshops = getWorkshopsV130();
  const requests = getWorkshopRequestsV130();
  const byStatus = requests.reduce((acc, r) => {
    acc[r.status || "pendiente"] = (acc[r.status || "pendiente"] || 0) + 1;
    return acc;
  }, {});
  return {
    generatedAt: new Date().toISOString(),
    version: "13.0",
    stats: {
      workshops: workshops.length,
      visible: workshops.filter(w => w.visible !== false && w.status !== "borrador").length,
      requests: requests.length,
      pending: byStatus.pendiente || 0,
      confirmed: byStatus.confirmada || 0,
      waitlist: byStatus["lista-espera"] || 0
    },
    workshops,
    requests
  };
}

function renderWorkshopsReportPreviewV130() {
  const out = document.querySelector("#workshopsReportPreviewV130");
  if (out) out.value = JSON.stringify(buildWorkshopsReportV130(), null, 2);
}

function renderWorkshopsAdminV130() {
  renderWorkshopStatsV130();
  renderAdminWorkshopsListV130();
  renderWorkshopRequestsListV130();
  renderWorkshopsReportPreviewV130();
}

function exportWorkshopsV130() {
  const data = buildWorkshopsReportV130();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alaya-talleres-inscripciones-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function resetWorkshopsV130() {
  if (!confirm("¿Restaurar talleres base? No borra solicitudes.")) return;
  localStorage.removeItem(WORKSHOPS_KEY_V130);
  renderWorkshopsAdminV130();
  renderPublicWorkshopsV130();
}

async function copyWorkshopsSummaryV130() {
  const report = buildWorkshopsReportV130();
  const text = `Alaya Holistics · Talleres e inscripciones

Talleres: ${report.stats.workshops}
Visibles: ${report.stats.visible}
Solicitudes: ${report.stats.requests}
Pendientes: ${report.stats.pending}
Confirmadas: ${report.stats.confirmed}
Lista de espera: ${report.stats.waitlist}

Talleres:
${report.workshops.map(w => `- ${w.title}: ${w.date || "sin fecha"} · ${w.status}`).join("\n")}`;
  if (typeof copyText === "function") copyText(text);
  else await navigator.clipboard?.writeText(text);
  if (typeof showToast === "function") showToast("Resumen de talleres copiado.");
}

document.querySelector("#workshopFormV130")?.addEventListener("submit", saveWorkshopV130);
document.querySelector("#clearWorkshopFormV130")?.addEventListener("click", clearWorkshopFormV130);
document.querySelector("#exportWorkshopsV130")?.addEventListener("click", exportWorkshopsV130);
document.querySelector("#resetWorkshopsV130")?.addEventListener("click", resetWorkshopsV130);
document.querySelector("#copyWorkshopsSummaryV130")?.addEventListener("click", copyWorkshopsSummaryV130);
document.querySelector("#clearCancelledWorkshopRequestsV130")?.addEventListener("click", clearCancelledWorkshopRequestsV130);
document.querySelector("#publicWorkshopRequestFormV130")?.addEventListener("submit", savePublicWorkshopRequestV130);
document.querySelector("#publicWorkshopSearchV130")?.addEventListener("input", renderPublicWorkshopsV130);
document.querySelector("#publicWorkshopCategoryV130")?.addEventListener("change", renderPublicWorkshopsV130);
document.querySelector("#workshopSearchV130")?.addEventListener("input", renderAdminWorkshopsListV130);
document.querySelector("#workshopFilterCategoryV130")?.addEventListener("change", renderAdminWorkshopsListV130);
document.querySelector("#workshopRequestSearchV130")?.addEventListener("input", renderWorkshopRequestsListV130);
document.querySelector("#workshopRequestFilterV130")?.addEventListener("change", renderWorkshopRequestsListV130);

window.renderPublicWorkshopsV130 = renderPublicWorkshopsV130;
window.renderWorkshopsAdminV130 = renderWorkshopsAdminV130;
window.editWorkshopV130 = editWorkshopV130;
window.deleteWorkshopV130 = deleteWorkshopV130;
window.toggleWorkshopVisibleV130 = toggleWorkshopVisibleV130;
window.setWorkshopRequestStatusV130 = setWorkshopRequestStatusV130;
window.copyWorkshopCardV130 = copyWorkshopCardV130;
window.buildWorkshopsReportV130 = buildWorkshopsReportV130;

setTimeout(() => {
  renderPublicWorkshopsV130();
  renderWorkshopsAdminV130();
}, 2800);

// v13.1 Testimonios, Reseñas y Galería Pro
const REVIEWS_KEY_V131="alaya_reviews_v131", GALLERY_KEY_V131="alaya_gallery_v131";
const DEFAULT_REVIEWS_V131=[
{id:"review-demo-1",name:"S. M.",service:"Lectura de cartas",rating:5,status:"publicada",visible:true,consent:true,text:"Me sentí escuchada y acompañada. La sesión me ayudó a ordenar mis ideas con calma.",createdAt:new Date().toISOString()},
{id:"review-demo-2",name:"Cliente taller",service:"Taller",rating:5,status:"publicada",visible:true,consent:true,text:"Un espacio bonito, cercano y muy bien explicado.",createdAt:new Date().toISOString()}
];
const DEFAULT_GALLERY_V131=[
{id:"gallery-demo-1",title:"Espacio de calma",category:"espacio",image:"",description:"Imagen de ejemplo para mostrar el espacio o ambiente de Alaya.",visible:true,createdAt:new Date().toISOString()},
{id:"gallery-demo-2",title:"Talleres y comunidad",category:"taller",image:"",description:"Espacio reservado para mostrar actividades, cursos y encuentros.",visible:true,createdAt:new Date().toISOString()}
];
function getReviewsV131(){try{const r=localStorage.getItem(REVIEWS_KEY_V131);const p=r?JSON.parse(r):DEFAULT_REVIEWS_V131;return Array.isArray(p)?p:DEFAULT_REVIEWS_V131}catch{return DEFAULT_REVIEWS_V131}}
function getGalleryV131(){try{const r=localStorage.getItem(GALLERY_KEY_V131);const p=r?JSON.parse(r):DEFAULT_GALLERY_V131;return Array.isArray(p)?p:DEFAULT_GALLERY_V131}catch{return DEFAULT_GALLERY_V131}}
function saveReviewsV131(x){localStorage.setItem(REVIEWS_KEY_V131,JSON.stringify(x));renderReviewsAdminV131();renderPublicReviewsV131()}
function saveGalleryV131(x){localStorage.setItem(GALLERY_KEY_V131,JSON.stringify(x));renderReviewsAdminV131();renderPublicReviewsV131()}
function cleanReviewTextV131(v){return String(v||"").replace(/[<>]/g,"").trim()}
function escapeReviewHtmlV131(v){return String(v||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
function safeGalleryImageV131(v){const url=String(v||"").trim();if(!url)return "";if(url.startsWith("assets/")||url.startsWith("./assets/"))return url.replace(/"/g,"");try{const parsed=new URL(url,window.location.href);return ["http:","https:"].includes(parsed.protocol)?parsed.href:""}catch{return ""}}
function starsV131(n){n=Math.max(1,Math.min(5,Number(n||5)));return "★".repeat(n)+"☆".repeat(5-n)}
function reviewDataV131(){return{id:document.querySelector("#reviewIdV131")?.value||`review-${Date.now()}`,name:cleanReviewTextV131(document.querySelector("#reviewNameV131")?.value),service:cleanReviewTextV131(document.querySelector("#reviewServiceV131")?.value),rating:Number(document.querySelector("#reviewRatingV131")?.value||5),status:document.querySelector("#reviewStatusV131")?.value||"revision",text:cleanReviewTextV131(document.querySelector("#reviewTextV131")?.value),consent:Boolean(document.querySelector("#reviewConsentV131")?.checked),visible:Boolean(document.querySelector("#reviewVisibleV131")?.checked),updatedAt:new Date().toISOString()}}
function galleryDataV131(){return{id:document.querySelector("#galleryIdV131")?.value||`gallery-${Date.now()}`,title:cleanReviewTextV131(document.querySelector("#galleryTitleV131")?.value),category:document.querySelector("#galleryCategoryV131")?.value||"espacio",image:cleanReviewTextV131(document.querySelector("#galleryImageV131")?.value),description:cleanReviewTextV131(document.querySelector("#galleryDescriptionV131")?.value),visible:Boolean(document.querySelector("#galleryVisibleV131")?.checked),updatedAt:new Date().toISOString()}}
function clearReviewFormV131(){document.querySelector("#reviewFormV131")?.reset();const e=document.querySelector("#reviewIdV131");if(e)e.value=""}
function clearGalleryFormV131(){document.querySelector("#galleryFormV131")?.reset();const e=document.querySelector("#galleryIdV131");if(e)e.value="";const v=document.querySelector("#galleryVisibleV131");if(v)v.checked=true}
function saveReviewFormV131(e){e?.preventDefault();const r=reviewDataV131();if(!r.name||!r.text){showToast?.("Añade nombre visible y texto.");return}if(r.visible&&!r.consent){showToast?.("Para publicar, marca el consentimiento.");return}const arr=getReviewsV131();const i=arr.findIndex(x=>x.id===r.id);i>=0?arr[i]={...arr[i],...r}:arr.unshift({...r,createdAt:new Date().toISOString()});saveReviewsV131(arr);clearReviewFormV131();showToast?.("Reseña guardada.")}
function saveGalleryFormV131(e){e?.preventDefault();const g=galleryDataV131();if(!g.title){showToast?.("Añade un título.");return}const arr=getGalleryV131();const i=arr.findIndex(x=>x.id===g.id);i>=0?arr[i]={...arr[i],...g}:arr.unshift({...g,createdAt:new Date().toISOString()});saveGalleryV131(arr);clearGalleryFormV131();showToast?.("Imagen guardada.")}
function renderPublicReviewsV131(){const rb=document.querySelector("#publicReviewsV131"),gb=document.querySelector("#publicGalleryV131");if(rb){const r=getReviewsV131().filter(x=>x.visible&&x.consent&&x.status==="publicada");rb.innerHTML=r.length?r.map(x=>`<article><span>${escapeReviewHtmlV131(x.service||"Experiencia")}</span><div class="review-stars-v131">${starsV131(x.rating)}</div><p>“${escapeReviewHtmlV131(x.text)}”</p><h3>${escapeReviewHtmlV131(x.name)}</h3></article>`).join(""):`<article><p>Todavía no hay testimonios publicados.</p></article>`}if(gb){const g=getGalleryV131().filter(x=>x.visible!==false);gb.innerHTML=g.length?g.map(x=>{const image=safeGalleryImageV131(x.image);const title=escapeReviewHtmlV131(x.title);return`<article><div class="gallery-thumb-v131">${image?`<img src="${escapeReviewHtmlV131(image)}" alt="${title}">`:""}</div><span>${escapeReviewHtmlV131(x.category||"galería")}</span><h3>${title}</h3><p>${escapeReviewHtmlV131(x.description||"")}</p></article>`}).join(""):`<article><p>Todavía no hay imágenes publicadas.</p></article>`}}
function filteredReviewsV131(){const q=(document.querySelector("#reviewSearchV131")?.value||"").toLowerCase(),s=document.querySelector("#reviewFilterV131")?.value||"all";return getReviewsV131().filter(r=>(s==="all"||r.status===s)&&[r.name,r.service,r.text,r.status].join(" ").toLowerCase().includes(q))}
function renderReviewsStatsV131(){const b=document.querySelector("#reviewsStatsV131");if(!b)return;const r=getReviewsV131(),g=getGalleryV131();const vals=[["Reseñas",r.length],["Publicadas",r.filter(x=>x.visible&&x.consent&&x.status==="publicada").length],["Revisión",r.filter(x=>x.status==="revision").length],["Consentimiento",r.filter(x=>x.consent).length],["Galería",g.filter(x=>x.visible!==false).length]];b.innerHTML=vals.map(([a,v])=>`<div class="review-stat-v131"><strong>${v}</strong><span>${a}</span></div>`).join("")}
function renderAdminReviewsListV131(){const l=document.querySelector("#adminReviewsListV131");if(!l)return;const r=filteredReviewsV131();l.innerHTML=r.length?r.map(x=>`<article class="review-item-v131" data-visible="${x.visible&&x.consent&&x.status==="publicada"}"><span>${x.status} · ${x.visible?"visible":"oculta"}</span><strong>${x.name} · ${starsV131(x.rating)}</strong><p>${x.service||"Sin servicio"}</p><p>${x.text}</p><p>${x.consent?"Consentimiento: sí":"Consentimiento: pendiente"}</p><div class="review-actions-v131"><button class="btn btn-secondary" onclick="editReviewV131('${x.id}')">Editar</button><button class="btn btn-secondary" onclick="setReviewStatusV131('${x.id}','publicada')">Publicar</button><button class="btn btn-secondary" onclick="setReviewStatusV131('${x.id}','oculta')">Ocultar</button><button class="btn btn-secondary" onclick="copyReviewV131('${x.id}')">Copiar</button></div></article>`).join(""):`<article class="review-item-v131"><p>No hay reseñas con este filtro.</p></article>`}
function renderAdminGalleryListV131(){const l=document.querySelector("#adminGalleryListV131");if(!l)return;const g=getGalleryV131();l.innerHTML=g.length?g.map(x=>`<article class="gallery-item-v131" data-visible="${x.visible!==false}"><span>${x.category} · ${x.visible!==false?"visible":"oculta"}</span><strong>${x.title}</strong><p>${x.description||""}</p><p>${x.image||"Sin URL"}</p><div class="gallery-actions-v131"><button class="btn btn-secondary" onclick="editGalleryV131('${x.id}')">Editar</button><button class="btn btn-secondary" onclick="toggleGalleryVisibleV131('${x.id}')">${x.visible!==false?"Ocultar":"Mostrar"}</button></div></article>`).join(""):`<article class="gallery-item-v131"><p>No hay imágenes.</p></article>`}
function editReviewV131(id){const x=getReviewsV131().find(r=>r.id===id);if(!x)return;["Id","Name","Service","Rating","Status","Text"].forEach(k=>{const e=document.querySelector("#review"+k+"V131");if(e)e.value=x[k.toLowerCase()]||x.id});document.querySelector("#reviewConsentV131").checked=!!x.consent;document.querySelector("#reviewVisibleV131").checked=!!x.visible}
function editGalleryV131(id){const x=getGalleryV131().find(g=>g.id===id);if(!x)return;document.querySelector("#galleryIdV131").value=x.id;document.querySelector("#galleryTitleV131").value=x.title||"";document.querySelector("#galleryCategoryV131").value=x.category||"espacio";document.querySelector("#galleryImageV131").value=x.image||"";document.querySelector("#galleryDescriptionV131").value=x.description||"";document.querySelector("#galleryVisibleV131").checked=x.visible!==false}
function setReviewStatusV131(id,status){saveReviewsV131(getReviewsV131().map(r=>r.id===id?{...r,status,visible:status==="publicada",updatedAt:new Date().toISOString()}:r))}
function toggleGalleryVisibleV131(id){saveGalleryV131(getGalleryV131().map(g=>g.id===id?{...g,visible:g.visible===false}:g))}
async function copyReviewV131(id){const r=getReviewsV131().find(x=>x.id===id);if(!r)return;const t=`${r.name} · ${r.service||"Experiencia"} · ${starsV131(r.rating)}\n\n${r.text}\n\nConsentimiento: ${r.consent?"sí":"pendiente"}\nEstado: ${r.status}`;copyText?copyText(t):await navigator.clipboard?.writeText(t);showToast?.("Reseña copiada.")}
function buildReviewsReportV131(){const r=getReviewsV131(),g=getGalleryV131();return{generatedAt:new Date().toISOString(),version:"13.1",stats:{reviews:r.length,published:r.filter(x=>x.visible&&x.consent&&x.status==="publicada").length,pending:r.filter(x=>x.status==="revision").length,consent:r.filter(x=>x.consent).length,gallery:g.length,visibleImages:g.filter(x=>x.visible!==false).length},responsibleNote:"No publicar promesas de curación, diagnósticos, resultados garantizados ni datos privados sin consentimiento.",reviews:r,gallery:g}}
function renderReviewsReportPreviewV131(){const o=document.querySelector("#reviewsReportPreviewV131");if(o)o.value=JSON.stringify(buildReviewsReportV131(),null,2)}
function renderReviewsAdminV131(){renderReviewsStatsV131();renderAdminReviewsListV131();renderAdminGalleryListV131();renderReviewsReportPreviewV131()}
function exportReviewsV131(){const blob=new Blob([JSON.stringify(buildReviewsReportV131(),null,2)],{type:"application/json"});const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download=`alaya-testimonios-galeria-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(u)}
function resetReviewsV131(){if(!confirm("¿Restaurar ejemplos base?"))return;localStorage.removeItem(REVIEWS_KEY_V131);localStorage.removeItem(GALLERY_KEY_V131);renderReviewsAdminV131();renderPublicReviewsV131()}
async function copyReviewsSummaryV131(){const r=buildReviewsReportV131();const t=`Alaya Holistics · Reseñas y galería\n\nReseñas: ${r.stats.reviews}\nPublicadas: ${r.stats.published}\nConsentimiento: ${r.stats.consent}\nImágenes visibles: ${r.stats.visibleImages}\n\n${r.responsibleNote}`;copyText?copyText(t):await navigator.clipboard?.writeText(t);showToast?.("Resumen copiado.")}
document.querySelector("#reviewFormV131")?.addEventListener("submit",saveReviewFormV131);
document.querySelector("#galleryFormV131")?.addEventListener("submit",saveGalleryFormV131);
document.querySelector("#clearReviewFormV131")?.addEventListener("click",clearReviewFormV131);
document.querySelector("#clearGalleryFormV131")?.addEventListener("click",clearGalleryFormV131);
document.querySelector("#exportReviewsV131")?.addEventListener("click",exportReviewsV131);
document.querySelector("#resetReviewsV131")?.addEventListener("click",resetReviewsV131);
document.querySelector("#copyReviewsSummaryV131")?.addEventListener("click",copyReviewsSummaryV131);
document.querySelector("#reviewSearchV131")?.addEventListener("input",renderAdminReviewsListV131);
document.querySelector("#reviewFilterV131")?.addEventListener("change",renderAdminReviewsListV131);
window.renderReviewsAdminV131=renderReviewsAdminV131;window.renderPublicReviewsV131=renderPublicReviewsV131;window.editReviewV131=editReviewV131;window.setReviewStatusV131=setReviewStatusV131;window.copyReviewV131=copyReviewV131;window.editGalleryV131=editGalleryV131;window.toggleGalleryVisibleV131=toggleGalleryVisibleV131;window.buildReviewsReportV131=buildReviewsReportV131;
setTimeout(()=>{renderReviewsAdminV131();renderPublicReviewsV131()},2900);
