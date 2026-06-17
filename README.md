# Alaya Holistics · Web completa

Este ZIP contiene una web completa estática para **Alaya Holistics**.

## Incluye

- Página principal premium.
- Servicios: tarot, lectura de cartas, reiki, cuantim, herbolario y talleres.
- Formulario de reservas por WhatsApp y email.
- Talleres/cursos editables.
- Productos de herbolario editables.
- Panel de administrador básico.
- Reservas guardadas en el navegador.
- PWA instalable.
- Iconos 192x192 y 512x512.

## Cómo abrirla

1. Descomprime el ZIP.
2. Abre `index.html` en el navegador.

## Datos de administrador iniciales

Usuario:

```txt
admin
```

Contraseña:

```txt
alaya2026
```

Puedes cambiarlo en:

```txt
js/app.js
```

Busca:

```js
const ADMIN_CONFIG = {
  user: "admin",
  pass: "alaya2026"
};
```

## Cambiar WhatsApp y email

En `js/app.js`, cambia:

```js
const ADMIN_WHATSAPP = "34600000000";
const ADMIN_EMAIL = "reservas@alayaholistics.com";
```

El WhatsApp debe ir con prefijo de país, sin `+`, sin espacios.

Ejemplo:

```js
const ADMIN_WHATSAPP = "34611222333";
const ADMIN_EMAIL = "alayaholistics@gmail.com";
```

## Importante sobre seguridad

Esta web funciona sin backend. El panel admin es básico y usa `localStorage`.

Eso significa:

- Sirve para una primera versión visual y funcional.
- Los datos se guardan en el navegador.
- No es un sistema seguro para producción real.
- Para una versión profesional, hay que conectar Firebase, Supabase o backend propio.

## Subir a GitHub Pages

1. Crea un repositorio.
2. Sube todos los archivos de esta carpeta.
3. En GitHub, ve a Settings > Pages.
4. Activa GitHub Pages desde la rama principal.
5. Abre la URL que te genere GitHub.

## Próxima mejora recomendada

Conectar Firebase gratis para que:

- Las reservas lleguen al admin desde cualquier dispositivo.
- Los eventos se guarden online.
- El login sea real y seguro.


---

# Versión v1.1 Premium añadida

Esta versión incluye mejoras nuevas:

## Nuevo en v1.1

- Botón de instalar como PWA cuando el navegador lo permita.
- Ajustes editables desde el panel admin:
  - Nombre del negocio.
  - Frase principal.
  - WhatsApp.
  - Email.
  - Usuario admin.
  - Contraseña admin.
- Exportar copia de seguridad en JSON.
- Importar copia de seguridad en JSON.
- Descargar reservas en CSV.
- Buscar reservas por nombre, teléfono, servicio o estado.
- Filtrar reservas por estado.
- Estados de reserva:
  - Pendiente.
  - Confirmada.
  - Cancelada.
- Mejoras SEO básicas:
  - Open Graph.
  - robots.txt.
  - sitemap.xml.
- Fecha mínima de reserva desde hoy.

## Recomendación

Cuando la web esté lista visualmente, la siguiente mejora fuerte es conectar Firebase o Supabase para que las reservas se guarden online y el panel admin sea real.


---

# Versión v1.2 Pro añadida

## Nuevo en v1.2

- Servicios editables desde el panel admin.
- Crear, editar y borrar servicios visibles en la web.
- El selector de reserva usa los servicios editados.
- Nueva pestaña **Resumen** en el panel admin.
- Contadores de:
  - reservas pendientes
  - reservas confirmadas
  - reservas canceladas
  - servicios
  - talleres
  - productos
- Botón para imprimir ficha de reserva.
- Botón flotante de reserva.
- Sección básica de aviso, privacidad y cookies.
- Mejoras visuales en tarjetas y panel.
- Las copias JSON ahora también incluyen servicios.

## Recordatorio

Sigue siendo una versión sin backend. Para producción real, conectar Firebase o Supabase.


---

# Versión v1.3 Online Ready añadida

## Nuevo en v1.3

- Nueva pestaña **Online** en el panel admin.
- Estado visual del modo local/online.
- Archivo `js/backend-config.js` para preparar Firebase.
- Archivo `js/cloud-adapter.js` como adaptador de sincronización.
- Carpeta `firebase/` con reglas y configuración de ejemplo.
- Guía `docs/FIREBASE-PASO-A-PASO.md`.
- Botón para descargar reserva en calendario `.ics`.
- Botón para copiar recordatorio de reserva.
- Mejoras en Service Worker para cachear nuevos archivos.

## Estado actual

La web sigue funcionando en modo local por defecto.

Esto está hecho así para que puedas abrir el ZIP y usarlo sin configurar Firebase.

## Próxima versión recomendada

v1.4 con Firebase real:

- Login admin real.
- Reservas guardadas online.
- Eventos online.
- Servicios online.
- Productos online.
- Panel admin protegido.


---

# Versión v1.4 Firebase Sync añadida

## Nuevo en v1.4

- Sincronización manual preparada con Firestore.
- Botón **Sincronizar ahora**.
- Botón **Subir datos locales**.
- Botón **Cargar datos online**.
- `cloud-adapter.js` ahora intenta usar Firebase Web SDK si configuras claves reales.
- Guardado automático en Firestore al crear/editar datos, si Firebase está configurado.
- Borrado en Firestore al borrar elementos, si Firebase está configurado.
- Reglas Firestore actualizadas con base para Authentication.
- Guía Firebase ampliada.

## Importante

Por defecto sigue en modo local.

Para activar Firebase debes editar:

```txt
js/backend-config.js
```

y cambiar:

```js
mode: "local"
```

por:

```js
mode: "firebase"
```

Después pega tus claves reales de Firebase.

## Próxima versión recomendada

v1.5 con login real usando Firebase Authentication.


---

# Versión v2 Modern UI añadida

## Nuevo en v2

- Rediseño visual moderno premium.
- Hero más impactante y editorial.
- Navbar flotante tipo app moderna.
- Tarjeta principal tipo oráculo con anillos animados.
- Estadísticas visuales en portada.
- Cards con efecto hover premium.
- Mejor contraste, sombras, bordes y foco de formularios.
- Botón flotante de reserva más moderno.
- Mobile más cuidado.
- Animaciones suaves con soporte para `prefers-reduced-motion`.

## Objetivo

Esta versión está centrada en diseño visual moderno, sin romper las funciones de la v1.4.


---

# Versión v2.1 Auth Pro añadida

## Nuevo en v2.1

- Login opcional real con **Firebase Authentication**.
- En modo Firebase, el campo usuario del panel admin funciona como **email**.
- Lista de emails admin en `js/backend-config.js`.
- Estado visual de Firebase Auth en la pestaña Online.
- Botón para cerrar sesión Firebase.
- Firestore Rules más seguras usando email admin.
- Reservas públicas online con `createPublicReservation`.
- Evita subir toda la colección de reservas si el admin no está autenticado.
- Nueva guía: `docs/FIREBASE-AUTH.md`.

## Modo local

Si no configuras Firebase, todo sigue funcionando con:

```txt
Usuario: admin
Contraseña: alaya2026
```

## Modo Firebase

Para usar autenticación real:

1. Activa Firebase Authentication > Email/Password.
2. Crea un usuario admin.
3. Pon ese email en:
   - `js/backend-config.js`
   - `firebase/firestore.rules`
4. Cambia `mode: "local"` por `mode: "firebase"`.
5. Entra al panel usando email y contraseña de Firebase.

## Seguridad

La protección real está en `firebase/firestore.rules`.


---

# Versión v2.2 Firebase Checker añadida

## Nuevo en v2.2

- Comprobador visual de Firebase dentro del panel admin.
- Revisión de:
  - modo Firebase
  - API Key
  - Project ID
  - App ID
  - Auth activado
  - email admin personalizado
- Botón **Probar conexión** con Firestore.
- Botón **Probar permisos admin**.
- Botón **Copiar resumen**.
- Nueva guía: `docs/FIREBASE-CHECKER.md`.

## Para qué sirve

Sirve para saber qué falta antes de publicar la web con Firebase real.

## Importante

Si la prueba de permisos falla, revisa:

- que has iniciado sesión con Firebase Auth
- que el email admin está en `js/backend-config.js`
- que el email admin está en `firebase/firestore.rules`
- que las reglas están publicadas


---

# Versión v2.3 Auth UX Pro añadida

## Nuevo en v2.3

- Botón **Recuperar contraseña Firebase** en el login admin.
- Función `resetPassword` en `cloud-adapter.js`.
- Botón **Enviar reset contraseña** en pestaña Online.
- Botón **Probar reserva pública**.
- Checklist visual de seguridad Auth.
- Nueva guía: `docs/AUTH-UX-PRO.md`.
- Mejores mensajes de estado de sesión.

## Para qué sirve

Para dejar la autenticación más usable antes de publicar:

- puedes probar si Auth responde
- puedes recuperar contraseña
- puedes comprobar si las reservas públicas se crean online
- puedes revisar pasos de seguridad desde el panel


---

# Versión v2.4 Admin Security Guard añadida

## Nuevo en v2.4

- Estado visual de sesión admin.
- Botón **Bloquear panel**.
- Auto-bloqueo por inactividad.
- Comprobación de sesión antes de acciones sensibles.
- Protección de acciones globales del panel.
- Diferencia clara entre modo local y modo Firebase.
- Nueva guía: `docs/ADMIN-SECURITY-GUARD.md`.

## Importante

El modo local sigue siendo útil para pruebas.

Para producción real, usa Firebase Authentication + Firestore Rules.


---

# Versión v2.5 Admin Audit Log añadida

## Nuevo en v2.5

- Nueva pestaña **Auditoría** en el panel admin.
- Registro local de actividad del panel.
- Búsqueda en auditoría.
- Filtro por tipo:
  - Auth
  - Guard
  - Datos
  - Firebase
  - Sistema
- Exportar auditoría en CSV.
- Exportar auditoría en JSON.
- Vaciar auditoría.
- Registro de acciones sensibles.
- Nueva guía: `docs/ADMIN-AUDIT-LOG.md`.

## Importante

Esta auditoría es local con `localStorage`. Para producción real, lo ideal sería auditoría online en Firestore.


---

# Versión v2.6 Online Audit Trail añadida

## Nuevo en v2.6

- Auditoría online preparada con Firestore.
- Nueva colección `alaya_audit_log`.
- Botón **Subir auditoría online**.
- Botón **Cargar auditoría online**.
- Botón **Probar auditoría online**.
- Marcadores visuales **Online / Local** en registros.
- Reglas Firestore para auditoría.
- Nueva guía: `docs/ONLINE-AUDIT-TRAIL.md`.

## Importante

La auditoría online requiere:

- Firebase configurado
- sesión admin iniciada
- reglas Firestore publicadas


---

# Versión v2.7 Reservas Pro añadida

## Nuevo en v2.7

- Consentimiento obligatorio en reservas públicas.
- Código único por reserva.
- Notas internas de administrador.
- Historial de estados por reserva.
- Botón copiar confirmación.
- Botón copiar cancelación.
- Recordatorio mejorado.
- Exportación CSV ampliada.
- Resumen Reservas Pro.
- Nueva guía: `docs/RESERVAS-PRO.md`.

## Objetivo

Hacer la gestión de reservas más profesional, clara y fácil de seguir.


---

# Versión v2.8 Disponibilidad Pro añadida

## Nuevo en v2.8

- Días abiertos configurables.
- Horario de reservas configurable.
- Fechas cerradas.
- Mensaje visual de disponibilidad en el formulario.
- Bloqueo de reservas fuera de disponibilidad.
- Vista previa de disponibilidad en ajustes.
- Nueva guía: `docs/DISPONIBILIDAD-PRO.md`.

## Próxima mejora recomendada

v2.9 Agenda inteligente: bloquear horas ya reservadas y mostrar franjas libres.


---

# Versión v2.9 Agenda Inteligente añadida

## Nuevo en v2.9

- Franjas libres visibles en el formulario.
- Bloqueo de horas ya ocupadas.
- Configuración de duración de cita.
- Configuración de reservas máximas por franja.
- Ocupación visible por hora.
- Las reservas canceladas liberan la franja.
- Nueva guía: `docs/AGENDA-INTELIGENTE.md`.

## Próxima mejora recomendada

v3.0 Calendario Pro: vista semanal/mensual, citas por día y calendario visual para el admin.


---

# Versión v3.0 Calendario Pro añadida

## Nuevo en v3.0

- Nueva pestaña **Calendario**.
- Vista mensual de reservas.
- Indicador de citas por día.
- Resumen del día seleccionado.
- Listado de reservas del día.
- Acciones rápidas desde calendario.
- Navegación por meses.
- Botón **Hoy**.
- Nueva guía: `docs/CALENDARIO-PRO.md`.

## Objetivo

Hacer que la gestión de reservas sea visual, rápida y más profesional.


---

# Versión v3.1 Bloqueos de Agenda añadida

## Nuevo en v3.1

- Bloqueo manual de día completo.
- Bloqueo manual de franja horaria.
- Motivo de bloqueo.
- Bloqueos visibles en calendario.
- Bloqueos visibles en el día seleccionado.
- Bloqueo de reservas públicas en días/horas bloqueadas.
- Nueva guía: `docs/BLOQUEOS-AGENDA.md`.

## Próxima mejora recomendada

v3.2 Bloqueos online: sincronizar bloqueos en Firestore para usar varios dispositivos.


---

# Versión v3.2 Bloqueos Online añadida

## Nuevo en v3.2

- Bloqueos sincronizables con Firestore.
- Nueva colección `alaya_agenda_blocks`.
- Botón **Subir bloqueos online**.
- Botón **Cargar bloqueos online**.
- Botón **Probar bloqueos online**.
- Marcador visual **Online / Local**.
- Guardado online al crear bloqueos, si Firebase admin está activo.
- Borrado online al eliminar bloqueos, si Firebase admin está activo.
- Reglas Firestore para bloqueos.
- Nueva guía: `docs/BLOQUEOS-ONLINE.md`.

## Próxima mejora recomendada

v3.3 Multi-admin: roles de administrador, editor y solo lectura.


---

# Versión v3.3 Multi-admin añadida

## Nuevo en v3.3

- Roles de acceso:
  - admin
  - editor
  - viewer / solo lectura
- Badge visual de rol en el panel.
- Panel explicativo de roles.
- Copiar resumen de roles.
- Permisos por acción en el panel.
- Reglas Firestore actualizadas con `isAdmin`, `isEditor` e `isViewer`.
- Configuración de emails por rol en `js/backend-config.js`.
- Nueva guía: `docs/MULTI-ADMIN.md`.

## Importante

Para seguridad real, configura los mismos emails en:

- `js/backend-config.js`
- `firebase/firestore.rules`


---

# Versión v3.4 Role Guard UX añadida

## Nuevo en v3.4

- Matriz visual de permisos.
- Botones bloqueados según rol.
- Mensaje visual de acción bloqueada.
- Integración con roles admin/editor/viewer.
- Mejora de experiencia para multi-admin.
- Nueva guía: `docs/ROLE-GUARD-UX.md`.

## Importante

Esta capa mejora la interfaz, pero la seguridad real depende de Firebase Authentication y Firestore Rules.


---

# Versión v3.5 Centro de Notificaciones añadida

## Nuevo en v3.5

- Nueva pestaña **Notificaciones**.
- Contador de notificaciones sin leer.
- Avisos internos para nuevas reservas.
- Permiso opcional para avisos del navegador.
- Marcar leído/no leído.
- Marcar todo leído.
- Eliminar notificaciones.
- Exportar notificaciones en JSON.
- Nueva guía: `docs/CENTRO-NOTIFICACIONES.md`.

## Importante

Las notificaciones del navegador dependen del permiso del dispositivo y no sustituyen un sistema push profesional.


---

# Versión v3.6 Notificaciones Online añadida

## Nuevo en v3.6

- Notificaciones sincronizables con Firestore.
- Nueva colección `alaya_notifications`.
- Botón **Subir notificaciones online**.
- Botón **Cargar notificaciones online**.
- Botón **Probar notificaciones online**.
- Marcador visual **Online / Local**.
- Guardado online al crear notificaciones, si hay sesión Firebase válida.
- Borrado online al eliminar notificaciones, si hay sesión Firebase válida.
- Reglas Firestore para notificaciones.
- Nueva guía: `docs/NOTIFICACIONES-ONLINE.md`.

## Próxima mejora recomendada

v3.7 Plantillas de mensajes: textos editables para confirmaciones, cancelaciones, recordatorios y WhatsApp.


---

# Versión v3.7 Plantillas de Mensajes añadida

## Nuevo en v3.7

- Plantillas editables desde Ajustes.
- Confirmación personalizada.
- Cancelación personalizada.
- Recordatorio personalizado.
- Mensaje de nueva reserva para admin personalizable.
- Variables tipo `{nombre}`, `{codigo}`, `{servicio}`, `{fecha}`, `{hora}`.
- Vista previa de plantillas.
- Botón restaurar plantillas por defecto.
- Corrección de notificación duplicada en reservas de evento.
- Nueva guía: `docs/PLANTILLAS-MENSAJES.md`.

## Próxima mejora recomendada

v3.8 Email/WhatsApp Pro: plantillas por servicio, mensajes diferentes para tarot, reiki, talleres y herbolario.


---

# Versión v3.8 Plantillas por Servicio añadida

## Nuevo en v3.8

- Plantillas personalizadas por servicio.
- Confirmación distinta por servicio.
- Cancelación distinta por servicio.
- Recordatorio distinto por servicio.
- Si una plantilla específica está vacía, usa la general.
- Vista previa por servicio.
- Borrar plantilla personalizada de un servicio.
- Nueva guía: `docs/PLANTILLAS-POR-SERVICIO.md`.

## Próxima mejora recomendada

v3.9 Branding Pro: editor visual de colores, hero, textos principales y estilo de marca desde el panel admin.


---

# Versión v3.9 Branding Pro añadida

## Nuevo en v3.9

- Editor visual de branding desde Ajustes.
- Presets visuales:
  - Cosmic premium
  - Herbal natural
  - Sunrise cálido
  - Ocean calm
  - Personalizado
- Colores de marca editables.
- Textos del hero editables.
- Botones principales editables.
- Badges de portada editables.
- Tarjeta principal editable.
- Vista previa instantánea.
- Restaurar branding por defecto.
- Nueva guía: `docs/BRANDING-PRO.md`.

## Próxima mejora recomendada

v4.0 Landing Premium: secciones editables, testimonios, FAQ, galería y bloques comerciales desde el panel.


---

# Versión v4.0 Alaya Herbolario Pro añadida

## Nuevo en v4.0

- Herbolario separado como **Alaya Herbolario**.
- Nueva sección pública independiente.
- Hero propio del herbolario.
- Botón de consulta por WhatsApp.
- Buscador de productos.
- Filtros por categoría.
- Contadores del catálogo.
- Fichas de producto más completas.
- Categorías:
  - Infusiones
  - Plantas
  - Aromas
  - Minerales
  - Velas
  - Packs
  - Complementos
- Panel admin de productos mejorado:
  - categoría
  - stock
  - icono
  - etiquetas
  - uso recomendado
- Nueva guía: `docs/ALAYA-HERBOLARIO-PRO.md`.

## Nota importante

El herbolario queda separado visualmente de tarot/reiki/talleres, pero sigue dentro de la misma web Alaya Holistics.


---

# Versión v4.1 Herbolario Catálogo Pro añadida

## Nuevo en v4.1

- Producto destacado en Alaya Herbolario.
- Filtro por stock.
- Botón limpiar filtros.
- Etiquetas clicables.
- Ficha ampliada de producto.
- Modal de detalle de producto.
- Consulta por WhatsApp desde ficha.
- Nuevos campos de producto: formato, destacado, ingredientes/contenido y notas.
- Nueva guía: `docs/HERBOLARIO-CATALOGO-PRO.md`.

## Próxima mejora recomendada

v4.2 Lista de consulta: seleccionar varios productos y enviarlos juntos por WhatsApp.


---

# Versión v4.2 Alaya Holistics Servicios Pro añadida

## Nuevo en v4.2

- Servicios principales mejorados.
- Filtros por categoría.
- Buscador de servicios.
- Contadores de servicios.
- Servicio destacado.
- Ficha ampliada de servicio.
- Consulta por WhatsApp desde ficha.
- Etiquetas clicables.
- Panel admin de servicios funcional y ampliado:
  - categoría
  - precio
  - destacado
  - etiquetas
  - beneficios / qué incluye
  - preparación recomendada
- Backup JSON ahora incluye servicios.
- Nueva guía: `docs/ALAYA-HOLISTICS-SERVICIOS-PRO.md`.

## Nota

Alaya Holistics queda reforzado como área principal de terapias, lecturas y talleres, separado de Alaya Herbolario.


---

# Versión v4.3 Talleres y Cursos Pro añadida

## Nuevo en v4.3

- Agenda de talleres y cursos más profesional.
- Buscador de actividades.
- Filtros por categoría, nivel y plazas.
- Actividad destacada.
- Fichas ampliadas de actividad.
- Consulta por WhatsApp desde ficha.
- Etiquetas clicables.
- Control visual de plazas.
- Bloqueo de reserva si una actividad está completa.
- Panel admin de eventos ampliado:
  - icono
  - categoría
  - nivel
  - plazas
  - formato
  - ubicación
  - etiquetas
  - destacada
  - temario
  - material
  - notas
- Nueva guía: `docs/TALLERES-CURSOS-PRO.md`.

## Próxima mejora recomendada

v4.4 Lista de consulta / carrito sin pago para Alaya Herbolario.


---

# Versión v4.4 Servicios Ejemplo Pro añadida

## Nuevo en v4.4

- Más ejemplos reales de servicios.
- Nuevos servicios base: posos de café, numerología, carta astral básica, limpieza energética, meditación guiada, ritual lunar y lectura emocional simbólica.
- Nueva sección visual con packs: Lecturas, Energía y Bienestar.
- Botón admin **Cargar ejemplos Alaya**.
- Botón admin **Restaurar servicios ejemplo**.
- Nueva guía: `docs/SERVICIOS-EJEMPLO-PRO.md`.

## Próxima mejora recomendada

v4.5 Landing Premium: Sobre Alaya, método de trabajo, testimonios, FAQ y CTA final.


---

# Versión v4.5 Logos Integrados añadida

## Nuevo en v4.5

- Integrados los 3 logos de marca:
  - Alaya Holistics
  - Alaya Herbolario
  - Alaya Astrología
- Logos guardados en `assets/logos/`.
- Logo principal añadido al header.
- Logo principal añadido al hero.
- Logo Alaya Herbolario añadido a su sección.
- Nueva sección visual de Alaya Astrología.
- Vista previa de logos en el panel admin.
- Iconos PWA/favicon generados desde el logo Alaya Holistics.
- Nueva guía: `docs/LOGOS-INTEGRADOS.md`.


---

# Versión v4.6 Alaya Astral IA integrada

## Nuevo en v4.6

- Integrada la app **Alaya Astral IA** dentro de la web principal.
- La app queda en la carpeta `alaya-astral/`.
- Nueva sección pública **Alaya Astral IA**.
- Botón para abrir la app astral.
- Botón para reservar consulta astral.
- Panel admin con acceso directo a la app astral.
- Logo Alaya Astrología usado como identidad visual del módulo.
- Nueva guía: `docs/ALAYA-ASTRAL-INTEGRADO.md`.

## Importante

La app astral se integra como módulo separado para conservar su funcionamiento.


---

# Versión v4.7 Diseño Astral Global añadida

## Nuevo en v4.7

- El estilo de Alaya Astral IA se aplica a toda la web.
- Fondo cósmico oscuro.
- Estrellas animadas.
- Paleta astral global: violeta, dorado, cyan y crema.
- Cards tipo glass premium.
- Botones y filtros con estilo astral.
- Header más oscuro y elegante.
- Servicios, talleres, herbolario y astrología quedan unificados visualmente.
- Nuevo preset **Alaya Astral** en Branding Pro.
- Nueva sección **Universo Alaya**.
- Nueva guía: `docs/DISENO-ASTRAL-GLOBAL.md`.


---

# Versión v4.8 Landing Astral Premium añadida

## Nuevo en v4.8

- Nueva sección **Sobre Alaya**.
- Nueva sección **Método Alaya**.
- Nueva zona de confianza.
- Testimonios de ejemplo.
- Preguntas frecuentes.
- CTA final de reserva.
- Accesos claros a:
  - Alaya Holistics
  - Alaya Herbolario
  - Alaya Astral IA
- Diseño coherente con el estilo astral global.
- Nueva guía: `docs/LANDING-ASTRAL-PREMIUM.md`.


---

# Versión v4.9 Astral Admin Pro añadida

## Nuevo en v4.9

- Se quita el acceso público directo a **Alaya Astral IA**.
- La herramienta astral pasa al panel admin.
- Nueva pestaña admin **Cartas astrales**.
- Guardado de cartas astrales detalladas.
- Fichas de cliente/paciente.
- Notas privadas por persona.
- Seguimiento interno.
- Estados de carta:
  - Borrador
  - En estudio
  - Completada
  - Entregada
  - Seguimiento
- Búsqueda y filtro por estado.
- Exportación JSON.
- Exportación CSV.
- Backup general incluye cartas astrales.
- Nueva guía: `docs/ASTRAL-ADMIN-PRO.md`.

## Importante

La gestión de cartas astrales guarda datos personales. Revisar privacidad y consentimiento antes de usarlo en producción.


---

# Versión v5.0 Astral Admin Plus añadida

## Nuevo en v5.0

- Historial de sesiones por cliente/paciente.
- Notas por sesión.
- Próximo paso recomendado.
- Campos estructurados de interpretación:
  - objetivo
  - fortalezas
  - retos
  - recomendaciones
- Botón **Copiar prompt IA**.
- Botón **Insertar plantilla**.
- Vista resumida de interpretación en cada carta.
- Timeline de sesiones.
- Exportación JSON/CSV ampliada.
- Nueva guía: `docs/ASTRAL-ADMIN-PLUS.md`.


---

# Versión v5.1 Astral Client Hub añadida

## Nuevo en v5.1

- Nuevo **Client Hub Astral** dentro del admin.
- Agrupa cartas por cliente/paciente.
- Muestra cartas, sesiones, estado y último seguimiento.
- Botón **Ver cartas** por cliente.
- Botón **Copiar ficha** por cliente.
- Botón **Imprimir ficha** por cliente.
- Botón **Informe** en cada carta astral.
- Botón **Vista informe** para el borrador actual.
- Informes imprimibles desde navegador.
- Nueva guía: `docs/ASTRAL-CLIENT-HUB.md`.


---

# Versión v5.2 Privacidad Astral Pro añadida

## Nuevo en v5.2

- Panel **Privacidad Astral Pro**.
- Modo privacidad para ocultar visualmente notas privadas.
- Plantilla de consentimiento copiable.
- Checklist de privacidad copiable.
- Fecha de consentimiento.
- Origen del consentimiento.
- Próxima revisión de datos.
- Etiquetas internas.
- Notas de consentimiento.
- Botón **Anonimizar** en cada carta astral.
- Indicadores visuales de consentimiento.
- Nueva guía: `docs/PRIVACIDAD-ASTRAL-PRO.md`.

## Importante

Esta mejora ayuda a organizar privacidad, pero no sustituye revisión legal/profesional para uso real con datos personales.


---

# Versión v5.3 Astral Cloud Sync Pro añadida

## Nuevo en v5.3

- Panel **Astral Cloud Sync Pro**.
- Sincronización online de cartas astrales con Firebase/Firestore.
- Botón **Subir cartas online**.
- Botón **Cargar cartas online**.
- Botón **Probar Astral Cloud**.
- Botón **Marcar como local**.
- Indicadores **Online / Local** en cada carta.
- Auto-sync al guardar una carta si Firebase admin está activo.
- Borrado online al borrar carta local si hay sesión admin.
- Nueva colección Firestore: `alaya_astral_charts`.
- Reglas Firestore actualizadas: solo admin.
- Nueva guía: `docs/ASTRAL-CLOUD-SYNC-PRO.md`.

## Importante

Por privacidad, las cartas astrales online quedan protegidas para rol admin.


---

# Versión v5.4 Seguimiento Astral Pro añadida

## Nuevo en v5.4

- Fecha de próxima sesión / seguimiento.
- Prioridad:
  - Alta
  - Normal
  - Baja
- Próximo paso concreto.
- Panel **Seguimiento Astral Pro**.
- Filtros de seguimiento:
  - vencidos
  - hoy
  - próximos 7 días
  - prioridad alta
- Botón **Abrir ficha**.
- Botón **Copiar mensaje**.
- Botón **Marcar hecho**.
- Client Hub mejorado con próximo paso.
- Informes incluyen próximo paso.
- Nueva guía: `docs/SEGUIMIENTO-ASTRAL-PRO.md`.


---

# Versión v5.5 Informes Astrales Pro añadida

## Nuevo en v5.5

- Panel **Informes Astrales Pro**.
- Campos de informe para cliente:
  - título
  - resumen inicial
  - mensaje final
- Botón **Plantilla informe cliente**.
- Botón **Vista informe cliente**.
- Botón **Informe cliente** en cada carta astral.
- Informe interno separado.
- Checklist de informe copiable.
- Informe cliente imprimible / guardable como PDF desde navegador.
- El informe cliente no incluye notas privadas por defecto.
- Nueva guía: `docs/INFORMES-ASTRALES-PRO.md`.


---

# Versión v5.6 Web Pública Pro añadida

## Nuevo en v5.6

- SEO básico en el head.
- JSON-LD tipo LocalBusiness.
- Open Graph y Twitter Card.
- `sitemap.xml`.
- `robots.txt`.
- `offline.html`.
- Fallback offline para PWA.
- Accesos rápidos flotantes.
- Enlace accesible “Saltar al contenido”.
- Nueva sección **Experiencia web**.
- Mapa rápido en el footer.
- Manifest PWA mejorado.
- Nueva guía: `docs/WEB-PUBLICA-PRO.md`.


---

# Versión v5.7 Centro de Lanzamiento Pro añadida

## Nuevo en v5.7

- Nueva pestaña admin **Lanzamiento**.
- Puntuación de preparación de lanzamiento.
- Checklist público.
- Checklist admin.
- Pruebas rápidas automáticas.
- Informe de lanzamiento copiable.
- Notas internas de lanzamiento.
- Bloque público **Web preparada**.
- Mejoras de carga de imágenes.
- Manifest PWA revisado.
- Nueva guía: `docs/CENTRO-LANZAMIENTO-PRO.md`.


---

# Versión v5.8 Legal y Confianza Web Pro añadida

## Nuevo en v5.8

- Página `legal.html`.
- Página `privacidad.html`.
- Página `cookies.html`.
- Banner de cookies / almacenamiento local.
- Enlaces legales en footer.
- Bloque público de confianza legal.
- Aviso claro de bienestar y orientación simbólica.
- Sitemap actualizado.
- Páginas legales cacheadas por la PWA.
- Nueva guía: `docs/LEGAL-CONFIANZA-WEB-PRO.md`.

## Importante

Los textos legales son base orientativa y deben revisarse/adaptarse antes de publicar.


---

# Versión v5.9 Contacto y Conversión Pro añadida

## Nuevo en v5.9

- Nueva sección pública **Contacto y reservas**.
- Tarjetas de contacto:
  - cita previa
  - WhatsApp
  - horario orientativo
- Constructor de mensaje rápido.
- Botón **Copiar mensaje**.
- Vista previa del mensaje.
- Botón flotante **volver arriba**.
- Ribbon en hero de cita previa.
- Sitemap actualizado.
- Nueva guía: `docs/CONTACTO-CONVERSION-PRO.md`.


---

# Versión v6.0 Canales y Redes Pro añadida

## Nuevo en v6.0

- Panel admin **Datos públicos y redes**.
- Dirección / zona de atención editable.
- Horario público editable.
- Enlace de Google Maps.
- Instagram, TikTok y YouTube.
- Aviso público breve.
- Nueva zona pública **Canales Alaya**.
- Botón **Abrir WhatsApp** desde mensaje rápido.
- Botón **Enviar email** desde mensaje rápido.
- Redes desactivadas visualmente si están vacías.
- Sitemap actualizado.
- Nueva guía: `docs/CANALES-REDES-PRO.md`.


---

# Versión v6.1 Contenido Público Pro añadida

## Nuevo en v6.1

- Nueva pestaña admin **Contenido**.
- Editor de testimonios/opiniones.
- Editor de preguntas frecuentes.
- Nueva sección pública **Opiniones y dudas**.
- Contadores públicos de opiniones y FAQs.
- Botones para cargar ejemplos.
- Botón para copiar contenido JSON.
- Botón para restaurar contenido base.
- Sitemap actualizado.
- Nueva guía: `docs/CONTENIDO-PUBLICO-PRO.md`.


---

# Versión v6.2 Novedades y Blog Pro añadida

## Nuevo en v6.2

- Nueva sección pública **Novedades Alaya**.
- Filtros por categoría.
- Tarjeta destacada.
- Modal de lectura completa.
- Botón para copiar resumen.
- Editor admin de novedades dentro de **Contenido**.
- Estado publicado/borrador.
- Opción para destacar una novedad.
- CRUD completo: crear, editar, borrar y cargar ejemplos.
- Sitemap actualizado.
- Nueva guía: `docs/NOVEDADES-BLOG-PRO.md`.


---

# Versión v6.3 Buscador Público Pro añadida

## Nuevo en v6.3

- Nueva sección pública **Buscar en Alaya**.
- Buscador global.
- Etiquetas rápidas de búsqueda.
- Resultados de servicios, talleres, herbolario, novedades, FAQs, opiniones, contacto y reservas.
- Estado vacío con CTA a reservar.
- Atajo `/` para enfocar el buscador.
- Sitemap actualizado.
- Nueva guía: `docs/BUSCADOR-PUBLICO-PRO.md`.


---

# Versión v6.4 Métricas Locales Pro añadida

## Nuevo en v6.4

- Nueva pestaña admin **Métricas**.
- Analítica interna sin servicios externos.
- Registro local de visitas.
- Registro de clics importantes.
- Registro de búsquedas del buscador público.
- Top búsquedas.
- Top clics.
- Actividad reciente.
- Copiar informe de métricas.
- Exportar CSV.
- Reiniciar métricas.
- Bloque público de transparencia sobre métricas.
- Nueva guía: `docs/METRICAS-LOCALES-PRO.md`.


---

# Versión v6.5 Accesibilidad y UX Pro añadida

## Nuevo en v6.5

- Botón flotante **A11y**.
- Panel de accesibilidad.
- Aumentar/reducir texto.
- Alto contraste.
- Reducir movimiento.
- Restaurar ajustes.
- Preferencias guardadas localmente.
- Mejora de foco visible con teclado.
- Sección pública de accesibilidad.
- Sitemap actualizado.
- Nueva guía: `docs/ACCESIBILIDAD-UX-PRO.md`.


---

# Versión v6.6 Asistente Público Pro añadida

## Nuevo en v6.6

- Nueva sección **Asistente Alaya**.
- Guía rápida para elegir servicio.
- Recomendaciones automáticas por necesidad.
- Acceso rápido a servicio/sección recomendada.
- Botón para reservar.
- Botón para copiar mensaje preparado.
- Sitemap actualizado.
- Nueva guía: `docs/ASISTENTE-PUBLICO-PRO.md`.


---

# Versión v6.7 PWA Instalación y Mantenimiento Pro añadida

## Nuevo en v6.7

- Nueva sección pública **Alaya como app**.
- Botón **Instalar app**.
- Botón para copiar instrucciones de instalación.
- Botón flotante de instalación cuando está disponible.
- Panel PWA dentro de **Lanzamiento**.
- Estado de manifest, Service Worker, instalación y cachés.
- Botón **Comprobar PWA**.
- Botón **Limpiar caché PWA**.
- Botón **Copiar guía instalación**.
- Manifest actualizado con shortcuts.
- Sitemap actualizado.
- Nueva guía: `docs/PWA-INSTALACION-MANTENIMIENTO-PRO.md`.


---

# Versión v6.8 Backup Total y Migración Pro añadida

## Nuevo en v6.8

- Nueva pestaña admin **Backups**.
- Backup total de datos locales Alaya.
- Restauración desde JSON pegado.
- Restauración desde archivo `.json`.
- Validación de backup.
- Descarga de backup completo.
- Copiar backup al portapapeles.
- Inventario de datos locales.
- Copiar inventario.
- Descargar inventario CSV.
- Estadísticas de claves, tamaño y última copia.
- Bloque público de datos portables.
- Sitemap actualizado.
- Nueva guía: `docs/BACKUP-TOTAL-MIGRACION-PRO.md`.


---

# Versión v6.9 Publicación GitHub Pages Pro añadida

## Nuevo en v6.9

- Archivo `.nojekyll`.
- Página `404.html` personalizada.
- Panel admin de publicación dentro de **Lanzamiento**.
- Comprobación de protocolo, dominio y archivos base.
- Botón **Copiar pasos GitHub Pages**.
- Botón **Copiar checklist final**.
- Sección pública de publicación.
- Sitemap actualizado.
- Nueva guía: `docs/PUBLICACION-GITHUB-PAGES-PRO.md`.


---

# Versión v7.0 Release Candidate Pro añadida

Build: `2026-06-16T19:07:25Z`

## Nuevo en v7.0

- Archivo `VERSION.json`.
- Archivo `CHANGELOG.md`.
- Panel admin **Release Candidate Pro**.
- Revisión de archivos críticos.
- Revisión de documentación.
- Estado PWA y publicación.
- Botón para copiar notas v7.0.
- Sección pública de versión candidata.
- Sitemap actualizado.
- Nueva guía: `docs/RELEASE-CANDIDATE-PRO.md`.

## Recomendación

Usar esta versión para pruebas finales antes de publicarla como versión estable.


---

# Versión v7.1 SEO y Compartir Pro añadida

Build: `2026-06-16T19:09:26Z`

## Nuevo en v7.1

- Nueva pestaña admin **SEO**.
- Editor de título, descripción, keywords, URL e imagen social.
- Vista previa social.
- Generador de meta tags HTML.
- Generador de texto para compartir.
- Botón copiar meta HTML.
- Botón copiar checklist SEO.
- Sección pública **Compartir Alaya**.
- Botones públicos para copiar enlace y compartir.
- Sitemap actualizado.
- Nueva guía: `docs/SEO-COMPARTIR-PRO.md`.


---

# Versión v7.2 Rendimiento y Calidad Pro añadida

Build: `2026-06-16T19:11:29Z`

## Nuevo en v7.2

- Nueva pestaña admin **Calidad**.
- Auditoría local de archivos principales.
- Revisión de enlaces internos.
- Revisión de imágenes y textos alternativos.
- Revisión básica de formularios y SEO.
- Puntuación global de calidad.
- Informe copiable.
- Exportación CSV.
- Checklist de calidad.
- Sección pública de calidad técnica.
- Sitemap actualizado.
- Nueva guía: `docs/RENDIMIENTO-CALIDAD-PRO.md`.


---

# Versión v7.3 Avisos Globales Pro añadida

Build: `2026-06-16T19:14:31Z`

## Nuevo en v7.3

- Nueva pestaña admin **Avisos**.
- Aviso global activo/inactivo.
- Tipos de aviso: normal, importante, taller, herbolario y astrología.
- Modo banner, tarjeta o ambos.
- Título, mensaje, botón y enlace configurables.
- Banner público superior.
- Tarjeta pública de aviso.
- Vista previa en admin.
- Botón copiar aviso.
- Botón copiar checklist.
- Sitemap actualizado.
- Nueva guía: `docs/AVISOS-GLOBALES-PRO.md`.


---

# Versión v7.4 Modo Lanzamiento y Mantenimiento Pro añadida

Build: `2026-06-16T19:16:48Z`

## Nuevo en v7.4

- Nueva pestaña admin **Mantenimiento**.
- Modo Próximamente, Mantenimiento o Lanzamiento.
- Pantalla pública opcional.
- Tarjeta pública de estado.
- Cuenta atrás por fecha objetivo.
- Botón CTA configurable.
- Opción de entrar igualmente.
- Vista previa en admin.
- Copiar estado.
- Copiar snippet.
- Copiar checklist.
- Sitemap actualizado.
- Nueva guía: `docs/MODO-LANZAMIENTO-MANTENIMIENTO-PRO.md`.


---

# Versión v7.5 Centro de Ayuda y Manual Pro añadida

Build: `2026-06-16T19:18:43Z`

## Nuevo en v7.5

- Nueva pestaña admin **Ayuda**.
- Centro de ayuda público.
- Buscador de ayuda.
- Guías rápidas por módulo.
- Vista de guía en admin.
- Copiar guía individual.
- Copiar manual rápido completo.
- Copiar checklist de formación.
- Copiar ayuda para cliente.
- Sitemap actualizado.
- Nueva guía: `docs/CENTRO-AYUDA-MANUAL-PRO.md`.


---

# Versión v7.6 Clientes y Admin Separados Pro añadida

Build: `2026-06-16T19:22:21Z`

## Corregido en v7.6

- Separación clara entre **zona clientes** y **zona administrador**.
- Ayuda pública solo para clientes.
- Ayuda admin solo para administrador.
- Ocultadas de navegación pública las secciones internas:
  - backups
  - publicación
  - calidad técnica
  - versión interna
  - métricas técnicas
- Añadido centro interno administrador.
- Añadido checklist de separación.
- Sitemap limpiado para no destacar secciones internas.
- Nueva guía: `docs/CLIENTES-ADMIN-SEPARADOS-PRO.md`.


---

# Versión v7.7 Acceso Admin Separado Pro añadida

Build: `2026-06-16T20:10:53Z`

## Nuevo en v7.7

- Eliminado el botón **Admin** de la navegación pública.
- Nueva página `admin.html`.
- `admin.html` marcada como `noindex,nofollow`.
- `robots.txt` bloquea `/admin.html`.
- Acceso directo compatible con `index.html#admin`.
- Textos de acceso admin más claros.
- La web principal queda más limpia para clientes.
- Nueva guía: `docs/ACCESO-ADMIN-SEPARADO-PRO.md`.


---

# Versión v7.8 Documentación Cliente/Admin Pro añadida

Build: `2026-06-16T20:20:56Z`

## Nuevo en v7.8

- Nueva página pública `guia-clientes.html`.
- Nueva página interna `manual-admin.html`.
- `manual-admin.html` marcada como `noindex,nofollow`.
- `robots.txt` bloquea `/manual-admin.html`.
- `admin.html` enlaza al manual administrador.
- La web pública enlaza a la guía de clientes.
- Sitemap incluye solo la guía pública de clientes.
- Nueva guía: `docs/DOCUMENTACION-CLIENTE-ADMIN-PRO.md`.


---

# Versión v7.9 Navegación Cliente Limpia Pro añadida

Build: `2026-06-16T20:24:21Z`

## Nuevo en v7.9

- Menú público simplificado.
- Eliminados enlaces duplicados.
- Eliminado botón **Panel admin** del footer.
- Footer reorganizado para clientes.
- Nueva franja de atajos para clientes.
- Checklist de navegación cliente limpia.
- Admin sigue separado en `admin.html`.
- Nueva guía: `docs/NAVEGACION-CLIENTE-LIMPIA-PRO.md`.


---

# Versión v8.0 Experiencia Cliente Pro añadida

Build: `2026-06-16T20:25:55Z`

## Nuevo en v8.0

- Nueva sección **Qué puedes hacer en Alaya Holistics**.
- Nueva sección **Elige tu camino**.
- Nueva sección **Cómo funciona una reserva**.
- Mini guía antes de reservar.
- Accesos rápidos pensados para clientes.
- Sitemap actualizado.
- Nueva guía: `docs/EXPERIENCIA-CLIENTE-PRO.md`.

## Enfoque

La parte pública queda centrada en clientes. Las herramientas internas siguen separadas en `admin.html`.


---

# Versión v8.1 Selector de Servicio Cliente Pro añadida

Build: `2026-06-16T20:39:48Z`

## Nuevo en v8.1

- Nueva sección pública **Selector cliente**.
- Recomendaciones según intención del cliente.
- Botón principal dinámico.
- Pasos sugeridos.
- Botón para copiar mensaje de consulta.
- Sitemap actualizado.
- Nueva guía: `docs/SELECTOR-SERVICIO-CLIENTE-PRO.md`.


---

# Versión v8.2 Pre-reserva Guiada Cliente Pro añadida

Build: `2026-06-16T20:46:14Z`

## Nuevo en v8.2

- Nueva sección pública **Pre-reserva guiada**.
- Formulario simple para clientes.
- Generador de mensaje claro.
- Botón para copiar mensaje.
- Botones para ir a reservas o contacto.
- Sitemap actualizado.
- Nueva guía: `docs/PRERESERVA-GUIADA-CLIENTE-PRO.md`.


---

# Versión v8.3 Consulta de Reserva Cliente Pro añadida

Build: `2026-06-16T20:51:45Z`

## Nuevo en v8.3

- Nueva sección pública **Consultar mi reserva**.
- Búsqueda por código y contacto.
- Resultado público sin notas internas.
- Botón copiar resumen.
- Botón contactar si no aparece la solicitud.
- Sitemap actualizado.
- Nueva guía: `docs/CONSULTA-RESERVA-CLIENTE-PRO.md`.


---

# Versión v8.4 Confirmación Admin Obligatoria Pro añadida

Build: `2026-06-16T20:54:32Z`

## Nuevo en v8.4

- La reserva queda como **Pendiente de confirmación**.
- La cita solo se confirma cuando el administrador pulsa **Confirmar reserva**.
- Aviso público para clientes.
- Aviso interno en panel admin.
- Botón admin **Confirmar reserva**.
- Mensaje de confirmación copiado automáticamente al confirmar.
- Consulta pública muestra estado claro.
- Sitemap actualizado.
- Nueva guía: `docs/CONFIRMACION-ADMIN-OBLIGATORIA-PRO.md`.


---

# Versión v8.5 Centro de Confirmaciones Admin Pro añadida

Build: `2026-06-16T21:04:55Z`

## Nuevo en v8.5

- Nueva pestaña admin **Confirmaciones**.
- Bandeja de reservas pendientes.
- Contadores de pendientes, confirmadas y canceladas.
- Filtro y buscador de reservas.
- Botón **Confirmar y copiar mensaje**.
- Botón **Cancelar y copiar mensaje**.
- Botón **Copiar revisión**.
- Botón **Copiar informe pendientes**.
- Botón **Copiar protocolo**.
- Nueva guía: `docs/CENTRO-CONFIRMACIONES-ADMIN-PRO.md`.


---

# Versión v8.6 Propuestas de Horario Admin Pro añadida

Build: `2026-06-17T04:32:09Z`

## Nuevo en v8.6

- Nueva pestaña admin **Alternativas**.
- Propuesta de hasta 3 horarios alternativos.
- Mensaje automático para cliente.
- Estado **Propuesta alternativa**.
- Botón copiar mensaje de espera.
- Botón copiar protocolo.
- Listado de reservas pendientes o con alternativa.
- Nueva guía: `docs/PROPUESTAS-HORARIO-ADMIN-PRO.md`.


---

# Versión v8.7 Respuesta a Propuesta Cliente Pro añadida

Build: `2026-06-17T04:34:38Z`

## Nuevo en v8.7

- Nueva sección pública **Responder propuesta**.
- Cliente puede elegir una alternativa y copiar mensaje de aceptación.
- Admin puede registrar la alternativa aceptada.
- Nuevo estado **Alternativa aceptada**.
- Admin puede confirmar una alternativa aceptada.
- Sitemap actualizado.
- Nueva guía: `docs/RESPUESTA-PROPUESTA-CLIENTE-PRO.md`.


---

# Versión v8.8 Diseño PC Pro añadida

Build: `2026-06-17T04:38:16Z`

## Ajustes en v8.8

- Cabecera de escritorio corregida.
- Menú público más compacto.
- Hero y secciones mejor adaptadas a PC.
- Grids y tarjetas más equilibrados.
- Formularios públicos más cómodos.
- Footer más ordenado.
- Panel administrador con más ancho útil.
- Nueva guía: `docs/DISENO-PC-PRO.md`.


---

# Versión v8.9 Inicio PC Ordenado Pro añadida

Build: `2026-06-17T05:05:48Z`

## Nuevo en v8.9

- Menú superior más limpio en PC.
- Accesos secundarios ocultos del menú superior en escritorio.
- Nuevo panel inicial de accesos principales.
- Mejor primer pantallazo en ordenador.
- Nueva guía: `docs/INICIO-PC-ORDENADO-PRO.md`.


---

# Versión v9.0 Diseño Responsive Total Pro añadida

Build: `2026-06-17T05:07:56Z`

## Nuevo en v9.0

- Ajuste completo para móvil, tablet y PC.
- Menú móvil mejorado.
- Barra inferior móvil para clientes.
- Hero, tarjetas, formularios y grids adaptados.
- Panel admin mejorado en móvil y PC.
- Eliminado duplicado de enlace “Responder propuesta”.
- Nueva guía: `docs/DISENO-RESPONSIVE-TOTAL-PRO.md`.


---

# Versión v9.1 Mejora Sección por Sección Pro añadida

Build: `2026-06-17T05:09:19Z`

## Nuevo en v9.1

- Primera pasada de mejora sección por sección.
- Indicador de sección activa en la navegación.
- Nuevo bloque público **Recorrido claro por secciones**.
- Mejor separación visual entre bloques.
- Tarjetas y formularios más consistentes.
- Reservas con aviso visual más claro.
- Admin con recordatorio de revisión por secciones.
- Nueva guía: `docs/MEJORA-SECCION-POR-SECCION-PRO.md`.


---

# Versión v9.2 Hero e Inicio Pro añadida

Build: `2026-06-17T05:10:23Z`

## Nuevo en v9.2

- Hero más claro y profesional.
- Nuevo bloque de confianza en la primera pantalla.
- Nuevo resumen de bienvenida.
- Accesos rápidos para clientes.
- Botones principales más visibles.
- Mejor equilibrio móvil/PC.
- Nueva guía: `docs/HERO-INICIO-PRO.md`.


---

# Versión v9.3 Servicios Pro añadida

Build: `2026-06-17T05:11:38Z`

## Nuevo en v9.3

- Nueva guía visual de servicios.
- Selector rápido por tipo de necesidad.
- Recomendación dinámica.
- CTA final hacia reserva.
- Mejor lectura de la sección servicios en móvil y PC.
- Nueva guía: `docs/SERVICIOS-PRO.md`.


---

# Versión v9.4 Herbolario Pro añadida

Build: `2026-06-17T05:13:06Z`

## Nuevo en v9.4

- Nueva guía visual para Herbolario.
- Recomendación rápida por categoría.
- Formulario para preparar consulta de producto.
- Botón copiar mensaje.
- CTA hacia contacto.
- Mejor lectura del catálogo en móvil y PC.
- Nueva guía: `docs/HERBOLARIO-PRO.md`.


---

# Versión v9.5 Talleres y Cursos Pro añadida

Build: `2026-06-17T05:14:35Z`

## Nuevo en v9.5

- Nueva guía visual de talleres y cursos.
- Recomendación rápida por tipo de actividad.
- Formulario para preparar consulta de plaza.
- Botón copiar mensaje.
- CTA hacia contacto y talleres.
- Mejor lectura en móvil y PC.
- Nueva guía: `docs/TALLERES-CURSOS-PRO.md`.


---

# Versión v9.6 Reservas Pro añadida

Build: `2026-06-17T05:15:53Z`

## Nuevo en v9.6

- Nueva guía visual de reservas.
- Checklist para solicitar reserva.
- Botón copiar checklist.
- Bloque “Después de reservar”.
- Estados de reserva explicados.
- CTA hacia consultar estado y responder propuesta.
- Refuerzo de confirmación manual por administrador.
- Nueva guía: `docs/RESERVAS-PRO.md`.


---

# Versión v9.7 Consulta y Respuesta Pro añadida

Build: `2026-06-17T05:17:09Z`

## Nuevo en v9.7

- Guía antes de consultar reserva.
- Explicación de código + contacto.
- Estados de reserva más claros.
- Ayuda para solicitudes no encontradas.
- Botón copiar mensaje de ayuda.
- Guía antes de responder propuesta.
- Refuerzo de que aceptar alternativa no confirma automáticamente.
- Nueva guía: `docs/CONSULTA-RESPUESTA-PRO.md`.


---

# Versión v9.8 Contacto y Confianza Pro añadida

Build: `2026-06-17T05:18:36Z`

## Nuevo en v9.8

- Nueva guía antes de contacto.
- Generador de mensaje de contacto.
- Botón copiar mensaje.
- Bloque de confianza para clientes.
- CTA hacia mensaje y ayuda.
- Mejor lectura de contacto en móvil y PC.
- Nueva guía: `docs/CONTACTO-CONFIANZA-PRO.md`.


---

# Versión v9.9 Admin Visible Pro añadida

Build: `2026-06-17T05:20:17Z`

## Nuevo en v9.9

- Botón **Admin** visible en la página principal.
- Bloque público **Acceso administrador**.
- Enlace directo a `admin.html`.
- Enlace a `manual-admin.html`.
- Acceso admin también en footer.
- Mejoras visuales de entrada admin en móvil y PC.
- Nueva guía: `docs/ADMIN-VISIBLE-PRO.md`.


---

# Versión v10.0 Panel Admin Pro añadida

Build: `2026-06-17T05:21:42Z`

## Nuevo en v10.0

- Centro rápido interno del administrador.
- Accesos a confirmaciones, alternativas, reservas, calendario, servicios y manual.
- Checklist diario admin.
- Botón copiar protocolo diario.
- Mejoras visuales de `admin.html`.
- Nueva guía: `docs/PANEL-ADMIN-PRO.md`.


---

# Versión v10.1 Ayuda y Manuales Pro añadida

Build: `2026-06-17T05:26:40Z`

## Nuevo en v10.1

- Nueva ayuda rápida para clientes.
- FAQ pública.
- Botón copiar pasos rápidos.
- Mejora de `guia-clientes.html`.
- Mejora de `manual-admin.html`.
- Nueva guía: `docs/AYUDA-MANUALES-PRO.md`.


---

# Versión v10.2 UX Global Pro añadida

Build: `2026-06-17T05:28:38Z`

## Nuevo en v10.2

- Barra superior de progreso.
- Botón flotante para volver arriba.
- Mapa rápido de navegación.
- Accesibilidad: enlace para saltar al contenido y foco visual mejorado.
- Mejoras globales de lectura y responsive.
- Nueva guía: `docs/UX-GLOBAL-PRO.md`.


---

# Versión v10.3 Gestor de Contenido Admin Pro añadida

Build: `2026-06-17T05:35:35Z`

## Nuevo en v10.3

- Nueva pestaña Admin: Gestor contenido.
- Crear servicios, talleres, cursos, productos de herbolario, avisos y novedades.
- Editar, ocultar/publicar, duplicar y borrar.
- Exportar contenido en JSON.
- Render público automático por sección.
- Nueva guía: `docs/GESTOR-CONTENIDO-ADMIN-PRO.md`.


---

# Versión v10.4 Hosting Ready Pro añadida

Build: `2026-06-17T05:38:34Z`

## Nuevo en v10.4

- Proyecto preparado para hosting estático.
- Añadido `HOSTING.md`.
- Añadido `DEPLOY-CHECKLIST.md`.
- Añadido `.htaccess`.
- Añadido `netlify.toml`.
- Añadido `vercel.json`.
- Añadido `_headers` y `_redirects`.
- Añadido `.nojekyll`.
- Actualizado `robots.txt`.
- Generado `sitemap.xml`.
- Añadido `hosting-config.json`.
- Nueva guía: `docs/HOSTING-READY-PRO.md`.

## Subida rápida

Sube todo el contenido de la carpeta a la raíz pública del hosting, por ejemplo `public_html`.


---

# Versión v10.5 Admin WordPress CMS Pro añadida

Build: `2026-06-17T05:42:37Z`

## Nuevo en v10.5

- Nueva pestaña Admin: **WordPress CMS**.
- Control de identidad, portada, diseño, menú, bloques, SEO y publicación.
- Render público automático de menú y bloques.
- Exportar/importar JSON del CMS.
- Aviso global editable.
- Hosting ready mantenido.
- Nueva guía: `docs/ADMIN-WORDPRESS-CMS-PRO.md`.

## Nota

No es WordPress real con PHP/MySQL. Es un mini CMS integrado en la web estática.


---

# Versión v10.6 Constructor Visual Admin Pro añadida

Build: `2026-06-17T05:45:19Z`

## Nuevo en v10.6

- Nueva pestaña Admin: **Constructor visual**.
- Plantillas rápidas.
- Ordenar bloques.
- Duplicar bloques.
- Publicar/ocultar.
- Borrar bloques.
- Guardar/restaurar revisiones.
- Exportar backup completo.
- Nueva guía: `docs/CONSTRUCTOR-VISUAL-ADMIN-PRO.md`.


---

# Versión v10.7 Publicador CMS Hosting Pro añadida

Build: `2026-06-17T06:16:37Z`

## Nuevo en v10.7

- Nueva pestaña Admin: **Publicador CMS**.
- Genera `cms-public.json`.
- Añade carpeta `data/`.
- Añade `data/cms-public.json`.
- La web pública carga automáticamente `data/cms-public.json`.
- Importador de JSON publicado.
- Actualización de `HOSTING.md` y `DEPLOY-CHECKLIST.md`.
- Nueva guía: `docs/PUBLICADOR-CMS-HOSTING-PRO.md`.

## Flujo de publicación

Editar en Admin → Publicador CMS → Descargar `cms-public.json` → subir a `/data/cms-public.json`.


---

# Versión v10.8 CMS Online Sync Pro añadida

Build: `2026-06-17T06:18:33Z`

## Nuevo en v10.8

- Nueva pestaña Admin: **Sync CMS**.
- Modo local, archivo publicado y Firebase ready.
- Snapshots locales del CMS.
- Restaurar snapshots.
- Descargar backup.
- Diagnóstico técnico.
- Archivo `data/cms-sync-schema.json`.
- Guía: `docs/CMS-ONLINE-SYNC-PRO.md`.

## Nota

Para multiadministrador real hay que configurar Firebase/online sync con reglas de seguridad.


---

# Versión v10.9 Firebase Setup Wizard Pro añadida

Build: `2026-06-17T06:20:28Z`

## Nuevo en v10.9

- Nueva pestaña Admin: **Firebase Wizard**.
- Generador de `backend-config.js`.
- Reglas Firestore orientativas.
- Diagnóstico Firebase.
- Archivo `js/backend-config.example.js`.
- Archivo `data/firebase-security-rules.example`.
- Guía `docs/FIREBASE-SETUP-WIZARD-PRO.md`.


---

# Versión v11.0 Reservas Online Firebase Pro añadida

Build: `2026-06-17T06:23:54Z`

## Nuevo en v11.0

- Sección pública: **Reserva online**.
- Código automático de solicitud.
- Guardado local y envío Firestore si Firebase está configurado.
- Nueva pestaña Admin: **Reservas online**.
- Estados de solicitud.
- Exportación JSON.
- Sincronización Firebase preparada.
- Archivo `data/reservas-firestore-schema.json`.
- Guía `docs/RESERVAS-ONLINE-FIREBASE-PRO.md`.


---

# Versión v11.1 Seguimiento de Reservas Pro añadida

Build: `2026-06-17T06:36:15Z`

## Nuevo en v11.1

- Consulta pública de estado de reserva.
- Búsqueda por código y contacto.
- Respuesta visible para cliente.
- Nota interna para Admin.
- Propuesta de día/hora.
- Copiar respuesta.
- Historial básico.
- Guía `docs/SEGUIMIENTO-RESERVAS-PRO.md`.


---

# Versión v11.2 Agenda y Disponibilidad Online Pro añadida

Build: `2026-06-17T06:41:36Z`

## Nuevo en v11.2

- Sección pública: **Disponibilidad orientativa**.
- Nueva pestaña Admin: **Agenda online**.
- Crear horarios disponibles.
- Crear bloqueos de fechas.
- Publicar/ocultar/completo.
- Botón “Solicitar este horario”.
- Exportación agenda JSON.
- Sincronización Firebase preparada.
- Archivo `data/agenda-firestore-schema.json`.
- Guía `docs/AGENDA-DISPONIBILIDAD-ONLINE-PRO.md`.


---

# Versión v11.3 Mensajes y Notificaciones Pro añadida

Build: `2026-06-17T06:48:01Z`

## Nuevo en v11.3

- Nueva pestaña Admin: **Mensajes**.
- Plantillas para reservas.
- Generador de mensajes con datos reales.
- Copiar texto.
- Abrir WhatsApp/email.
- Avisos internos.
- Registro local de mensajes.
- Exportar mensajes JSON.
- Archivo `data/mensajes-schema.json`.
- Guía `docs/MENSAJES-NOTIFICACIONES-PRO.md`.


---

# Versión v11.4 Clientes CRM e Historial Pro añadida

Build: `2026-06-17T06:56:44Z`

## Nuevo en v11.4

- Nueva pestaña Admin: **Clientes**.
- Mini CRM interno.
- Alta manual de cliente.
- Actualizar desde reservas.
- Historial de reservas por cliente.
- Etiquetas y preferencias.
- Notas internas.
- Exportar clientes JSON.
- Sincronización Firebase preparada.
- Archivo `data/clientes-crm-schema.json`.
- Guía `docs/CLIENTES-CRM-HISTORIAL-PRO.md`.


---

# Versión v11.5 Dashboard Negocio Pro añadida

Build: `2026-06-17T07:04:06Z`

## Nuevo en v11.5

- Nueva pestaña Admin: **Dashboard Pro**.
- Métricas de reservas, clientes, agenda y mensajes.
- Tareas pendientes.
- Reservas por estado y servicio.
- Agenda próxima.
- Clientes recientes.
- Estado técnico.
- Exportar informe JSON.
- Copiar resumen ejecutivo.
- Archivo `data/dashboard-negocio-schema.json`.
- Guía `docs/DASHBOARD-NEGOCIO-PRO.md`.


---

# Versión v11.6 Backup y Restauración Pro añadida

Build: `2026-06-17T07:13:36Z`

## Nuevo en v11.6

- Nueva pestaña Admin: **Backup**.
- Exportar backup total.
- Exportar backup selectivo.
- Restaurar backup JSON.
- Modo combinar/reemplazar.
- Auditoría de datos locales.
- Checklist de migración.
- Copiar resumen.
- Archivo `data/backup-restauracion-schema.json`.
- Guía `docs/BACKUP-RESTAURACION-PRO.md`.


---

# Versión v11.7 Legal, Privacidad y Consentimientos Pro añadida

Build: `2026-06-17T07:16:07Z`

## Nuevo en v11.7

- Nueva pestaña Admin: **Legal Pro**.
- Textos legales editables.
- Sección pública “Privacidad y confianza”.
- Consentimiento versionado en reservas.
- Auditoría de privacidad.
- Exportar configuración legal JSON.
- Copiar resumen legal.
- Archivo `data/legal-privacidad-schema.json`.
- Guía `docs/LEGAL-PRIVACIDAD-CONSENTIMIENTOS-PRO.md`.


---

# Versión v11.8 Centro Lanzamiento y QA Pro añadida

Build: `2026-06-17T07:31:01Z`

## Nuevo en v11.8

- Nueva pestaña Admin: **Lanzamiento QA**.
- Puntuación QA.
- Checklist final.
- Tareas recomendadas.
- Modo borrador/lanzamiento/mantenimiento.
- Estado público del proyecto.
- Historial QA.
- Exportar reporte JSON.
- Copiar resumen.
- Archivo `data/lanzamiento-qa-schema.json`.
- Guía `docs/CENTRO-LANZAMIENTO-QA-PRO.md`.


---

# Versión v11.9 SEO, Rendimiento y Accesibilidad Pro añadida

Build: `2026-06-17T07:33:23Z`

## Nuevo en v11.9

- Nueva pestaña Admin: **SEO UX**.
- Auditoría SEO/PWA/accesibilidad.
- Puntuación de optimización.
- Sugerencias automáticas.
- Modo lectura cómoda.
- Reducir animaciones.
- Admin compacto.
- Exportar informe JSON.
- Copiar resumen SEO.
- Archivo `data/seo-rendimiento-schema.json`.
- Guía `docs/SEO-RENDIMIENTO-ACCESIBILIDAD-PRO.md`.


---

# Versión v12.0 Release Candidate Final Pro añadida

Build: `2026-06-17T07:42:38Z`

## Nuevo en v12.0

- Nueva pestaña Admin: **Release Final**.
- Informe global final.
- Puntuación final combinada.
- Checklist de entrega.
- Módulos incluidos.
- Prioridades finales.
- Estado de release.
- Notas finales editables.
- Copiar briefing.
- Exportar paquete final JSON.
- `RELEASE-NOTES.md`.
- `FINAL-CHECKLIST.md`.
- `data/release-candidate-schema.json`.
- Guía `docs/RELEASE-CANDIDATE-FINAL-PRO.md`.


---

# Versión v12.1 Publicación Guiada y Dominio Pro añadida

Build: `2026-06-17T07:52:11Z`

## Nuevo en v12.1

- Nueva pestaña Admin: **Publicación**.
- Asistente para GitHub Pages, Netlify, Vercel y hosting manual.
- Configuración de URL, ruta base, dominio y email.
- Plan de publicación exportable.
- Checklist de subida.
- Generador de robots.txt.
- Generador de sitemap.xml.
- Archivos `robots.template.txt` y `sitemap.template.xml`.
- Archivo `data/publicacion-guiada-schema.json`.
- Guía `docs/PUBLICACION-GUIADA-DOMINIO-PRO.md`.


---

# Versión v12.2 Seguridad Producción y Firebase Rules Pro añadida

Build: `2026-06-17T08:00:40Z`

## Nuevo en v12.2

- Nueva pestaña Admin: **Seguridad Pro**.
- Auditoría de seguridad.
- Configuración de modo local/staging/producción.
- Emails admin autorizados.
- Dominio permitido.
- Colecciones Firebase configurables.
- Generador de reglas Firestore orientativas.
- Copiar reglas.
- Exportar plan de seguridad JSON.
- Archivo `firestore.rules.template`.
- Archivo `data/seguridad-produccion-schema.json`.
- Guía `docs/SEGURIDAD-PRODUCCION-FIREBASE-PRO.md`.


---

# Versión v12.3 Primer Arranque y Datos Demo Pro añadida

Build: `2026-06-17T08:06:13Z`

## Nuevo en v12.3

- Nueva pestaña Admin: **Primer Arranque**.
- Configuración rápida inicial.
- Carga de datos demo seguros.
- Borrado solo de datos demo.
- Checklist de puesta en marcha.
- Prioridades iniciales.
- Exportar plan JSON.
- Copiar resumen.
- Archivo `data/primer-arranque-schema.json`.
- Guía `docs/PRIMER-ARRANQUE-DATOS-DEMO-PRO.md`.


---

# Versión v12.4 Mantenimiento, Soporte e Incidencias Pro añadida

Build: `2026-06-17T08:09:02Z`

## Nuevo en v12.4

- Nueva pestaña Admin: **Mantenimiento**.
- Estado público de mantenimiento.
- Registro de incidencias.
- Prioridades y estados.
- Auditoría rápida.
- Copiar resumen de soporte.
- Exportar reporte JSON.
- Borrar incidencias cerradas.
- Archivo `data/mantenimiento-soporte-schema.json`.
- Guía `docs/MANTENIMIENTO-SOPORTE-INCIDENCIAS-PRO.md`.


---

# Versión v12.5 Marketing, Redes y Difusión Pro añadida

Build: `2026-06-17T08:11:25Z`

## Nuevo en v12.5

- Nueva pestaña Admin: **Marketing**.
- Campañas y calendario.
- Textos para Instagram, WhatsApp, email, Google Business y anuncio corto.
- Ideas rápidas de contenido.
- Copiar textos.
- Exportar plan marketing JSON.
- Sección pública de comunidad/novedades.
- Archivo `data/marketing-redes-schema.json`.
- Guía `docs/MARKETING-REDES-DIFUSION-PRO.md`.


---

# Versión v12.6 Analítica Local y Conversión Pro añadida

Build: `2026-06-17T08:16:35Z`

## Nuevo en v12.6

- Nueva pestaña Admin: **Analítica**.
- Eventos locales sin servicios externos.
- Embudo de conversión.
- Objetivos orientativos.
- Top secciones.
- Filtro de eventos.
- Limpiar eventos locales.
- Copiar resumen.
- Exportar informe JSON.
- Archivo `data/analitica-local-schema.json`.
- Guía `docs/ANALITICA-LOCAL-CONVERSION-PRO.md`.


---

# Versión v12.7 Multiidioma y Traducciones Pro añadida

Build: `2026-06-17T08:22:39Z`

## Nuevo en v12.7

- Nueva pestaña Admin: **Idiomas**.
- Selector público ES/CAT/EN.
- Diccionario editable.
- Traducciones base en castellano, catalán e inglés.
- Importar/exportar traducciones JSON.
- Copiar resumen de traducciones.
- Archivo `data/multiidioma-schema.json`.
- Guía `docs/MULTIIDIOMA-TRADUCCIONES-PRO.md`.


---

# Versión v12.8 Recordatorios y Seguimiento Pro añadida

Build: `2026-06-17T08:26:10Z`

## Nuevo en v12.8

- Nueva pestaña Admin: **Recordatorios**.
- Generación de recordatorios desde reservas y agenda.
- Mensajes listos para copiar.
- Estados: pendiente, preparado, enviado manual, omitido.
- Filtros y buscador.
- Copiar resumen.
- Exportar reporte JSON.
- Archivo `data/recordatorios-seguimiento-schema.json`.
- Guía `docs/RECORDATORIOS-SEGUIMIENTO-PRO.md`.


---

# Versión v12.9 Tarifas, Packs y Servicios Pro añadida

Build: `2026-06-17T09:08:17Z`

## Nuevo en v12.9

- Nueva pestaña Admin: **Tarifas**.
- Catálogo de servicios y packs.
- Precios orientativos.
- Duración, modalidad y disponibilidad.
- Visibilidad pública.
- Buscador y filtro público.
- Copiar ficha de servicio.
- Exportar catálogo JSON.
- Archivo `data/tarifas-packs-schema.json`.
- Guía `docs/TARIFAS-PACKS-SERVICIOS-PRO.md`.


---

# Versión v13.0 Talleres, Cursos e Inscripciones Pro añadida

Build: `2026-06-17T09:13:41Z`

## Nuevo en v13.0

- Nueva pestaña Admin: **Talleres**.
- Gestión de talleres y cursos.
- Fechas, horas, duración y modalidad.
- Plazas orientativas.
- Solicitudes públicas de inscripción.
- Estados de solicitudes.
- Catálogo público con filtros.
- Copiar ficha de taller.
- Exportar listado JSON.
- Archivo `data/talleres-inscripciones-schema.json`.
- Guía `docs/TALLERES-CURSOS-INSCRIPCIONES-PRO.md`.


---
# Versión v13.1 Testimonios, Reseñas y Galería Pro

Build: `2026-06-17T18:30:20Z`

Añade pestaña **Reseñas**, testimonios responsables, consentimiento, galería pública y exportación JSON.
