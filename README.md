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
