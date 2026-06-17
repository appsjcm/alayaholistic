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
