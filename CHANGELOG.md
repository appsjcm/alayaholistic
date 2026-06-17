# Alaya Holistics Web · Changelog

## v7.0 Release Candidate Pro · 2026-06-16T19:07:25Z

Versión candidata para revisión final antes de publicación.

### Incluye

- Web pública premium con diseño astral.
- Reservas con cita previa.
- Agenda inteligente y bloqueos.
- Admin con roles.
- Auditoría y notificaciones.
- Plantillas de mensajes.
- Branding editable.
- Alaya Herbolario.
- Servicios holísticos.
- Talleres y cursos.
- Alaya Astrología pública.
- Cartas astrales dentro del admin.
- Informes cliente / internos.
- Privacidad astral y consentimiento.
- Seguimiento astral.
- Sincronización Firebase preparada.
- Contenido público editable.
- Novedades / blog.
- Buscador público.
- Métricas locales sin analítica externa.
- Accesibilidad y UX.
- PWA instalable.
- Backup total y migración.
- Publicación en GitHub Pages.
- Página 404.
- Sitemap, robots y documentación.

### Revisión recomendada

- Revisar textos legales con datos reales.
- Configurar WhatsApp, email, dirección y redes.
- Probar una reserva real.
- Exportar backup antes de publicar.
- Probar en móvil.
- Probar instalación PWA.
- Verificar Firebase si se activa modo online.


## v7.1 SEO y Compartir Pro · 2026-06-16T19:09:26Z

### Añadido

- Panel admin **SEO y Compartir**.
- Configuración local de título SEO, descripción, keywords y URL.
- Generador de etiquetas meta HTML.
- Generador de texto para compartir por WhatsApp/redes.
- Vista previa de snippet social.
- Botones para copiar meta tags, resumen social y checklist SEO.
- Sección pública de compartir Alaya.
- Guía `docs/SEO-COMPARTIR-PRO.md`.

### Nota

El panel ayuda a preparar textos SEO. Para SEO real en buscadores, conviene editar el HTML final con los datos definitivos antes de publicar.


## v7.2 Rendimiento y Calidad Pro · 2026-06-16T19:11:29Z

### Añadido

- Nueva pestaña admin **Calidad**.
- Auditoría local de archivos principales.
- Revisión de enlaces internos.
- Revisión de imágenes sin alt.
- Revisión de botones/enlaces sin texto.
- Revisión de uso de lazy loading.
- Puntuación global de calidad.
- Informe copiable.
- Exportación CSV de incidencias.
- Sección pública de calidad técnica.
- Guía `docs/RENDIMIENTO-CALIDAD-PRO.md`.

### Nota

La auditoría es local y orientativa. Para pruebas avanzadas conviene revisar también en móvil real y en el hosting definitivo.


## v7.3 Avisos Globales Pro · 2026-06-16T19:14:31Z

### Añadido

- Nueva pestaña admin **Avisos**.
- Aviso global activo/inactivo.
- Tipos de aviso: normal, importante, taller, herbolario, astrología.
- Título, mensaje, CTA y enlace configurables.
- Vista previa del aviso.
- Banner público cerrable.
- Tarjeta pública de aviso.
- Botones para copiar aviso y restaurar aviso base.
- Sección pública `#avisos-alaya`.
- Guía `docs/AVISOS-GLOBALES-PRO.md`.

### Uso

Pensado para publicar cambios de horario, campañas, talleres destacados, vacaciones, lanzamientos o mensajes urgentes.


## v7.4 Modo Lanzamiento y Mantenimiento Pro · 2026-06-16T19:16:48Z

### Añadido

- Nueva pestaña admin **Mantenimiento**.
- Modo público configurable:
  - Próximamente
  - Mantenimiento
  - Lanzamiento
- Pantalla pública opcional.
- Cuenta atrás configurable.
- Botón CTA configurable.
- Mensaje público configurable.
- Bloqueo visual opcional de navegación pública.
- Vista previa en admin.
- Generador de texto/snippet de estado.
- Checklist de lanzamiento/mantenimiento.
- Sección pública `#estado-alaya`.
- Guía `docs/MODO-LANZAMIENTO-MANTENIMIENTO-PRO.md`.

### Nota

El modo se guarda localmente en el navegador. Para hacerlo global en una publicación estática, copiar los textos/snippet y dejarlos fijos antes de publicar.


## v7.5 Centro de Ayuda y Manual Pro · 2026-06-16T19:18:43Z

### Añadido

- Nueva pestaña admin **Ayuda**.
- Centro de ayuda público `#ayuda-alaya`.
- Buscador de ayuda.
- Artículos rápidos para:
  - reservas
  - servicios
  - herbolario
  - talleres
  - cartas astrales
  - backups
  - PWA
  - publicación
- Guías admin copiables.
- Checklist de formación para Alaya.
- Botón para copiar manual completo.
- Botón para abrir documentación interna.
- Guía `docs/CENTRO-AYUDA-MANUAL-PRO.md`.

### Objetivo

Que Alaya tenga una guía integrada para usar la web y explicar rápidamente cómo funcionan sus módulos.


## v7.6 Clientes y Admin Separados Pro · 2026-06-16T19:22:21Z

### Corregido

- Separación clara entre zona pública de clientes y zona administrador.
- La ayuda pública ya no mezcla guías internas de admin.
- Las secciones técnicas públicas de backup, publicación, calidad, métricas y versión se ocultan para clientes.
- Se añade aviso visual de **Zona clientes** en la parte pública.
- Se añade aviso visual de **Zona administrador** dentro del panel admin.
- Se crea un centro interno admin con accesos a módulos técnicos.
- Se añade checklist para mantener separadas ambas zonas.

### Objetivo

Evitar que clientes vean contenido interno de administración, publicación, backups, métricas o mantenimiento técnico.


## v7.7 Acceso Admin Separado Pro · 2026-06-16T20:10:53Z

### Corregido / añadido

- Se elimina el botón visible **Admin** de la navegación pública.
- Se añade página separada `admin.html`.
- `admin.html` está marcada como `noindex`.
- El panel admin puede abrirse desde `index.html#admin`.
- La web pública queda más limpia para clientes.
- Se ocultan textos de credenciales iniciales dentro del modal público.
- `robots.txt` marca `admin.html` como no indexable.
- Se añade documentación `docs/ACCESO-ADMIN-SEPARADO-PRO.md`.

### Objetivo

Que el cliente navegue por servicios, reservas, herbolario, talleres y contacto sin ver herramientas internas.


## v7.8 Documentación Cliente/Admin Pro · 2026-06-16T20:20:56Z

### Añadido / corregido

- Nueva página pública `guia-clientes.html`.
- Nueva página interna `manual-admin.html`.
- `manual-admin.html` marcado como `noindex,nofollow`.
- Enlace de ayuda pública apunta a guía de clientes.
- `admin.html` enlaza al manual interno administrador.
- `robots.txt` bloquea el manual administrador.
- Se separan los mensajes: cliente ve ayuda simple, admin ve herramientas internas.
- Se añade guía `docs/DOCUMENTACION-CLIENTE-ADMIN-PRO.md`.

### Objetivo

Evitar mezclar tutoriales de administrador con contenido público para clientes.


## v7.9 Navegación Cliente Limpia Pro · 2026-06-16T20:24:21Z

### Corregido / añadido

- Menú público simplificado para clientes.
- Eliminados enlaces duplicados de navegación.
- Eliminados enlaces técnicos de la navegación pública.
- Eliminado botón **Panel admin** del footer público.
- Footer reorganizado con solo enlaces útiles para clientes.
- Añadida franja de accesos rápidos para clientes.
- Admin mantiene su entrada separada en `admin.html`.
- Nueva guía `docs/NAVEGACION-CLIENTE-LIMPIA-PRO.md`.

### Objetivo

Que una persona cliente no vea opciones internas ni navegación técnica, solo servicios, reservas, contacto, guía y secciones públicas útiles.


## v8.0 Experiencia Cliente Pro · 2026-06-16T20:25:55Z

### Añadido

- Nueva sección pública **Qué puedes hacer en Alaya**.
- Nueva sección **Cómo funciona una reserva**.
- Nueva sección **Elige tu camino** con accesos rápidos por intención.
- Nueva mini guía antes de reservar.
- Botones rápidos para clientes.
- Sin referencias técnicas ni herramientas admin en la parte pública.
- Guía `docs/EXPERIENCIA-CLIENTE-PRO.md`.

### Objetivo

Que un cliente entre, entienda la web en pocos segundos y pueda reservar o contactar sin perderse.


## v8.1 Selector de Servicio Cliente Pro · 2026-06-16T20:39:48Z

### Añadido

- Nueva sección pública **Selector cliente**.
- Preguntas rápidas por intención:
  - claridad / cartas
  - energía / reiki
  - astrología
  - herbolario
  - talleres
  - contacto
- Recomendación visual con ruta sugerida.
- Botón principal dinámico.
- Botón para copiar mensaje de consulta.
- Se mantiene la separación cliente/admin.
- Guía `docs/SELECTOR-SERVICIO-CLIENTE-PRO.md`.

### Objetivo

Ayudar al cliente a decidir qué hacer sin perderse entre muchas secciones.


## v8.2 Pre-reserva Guiada Cliente Pro · 2026-06-16T20:46:14Z

### Añadido

- Nueva sección pública **Pre-reserva guiada**.
- Formulario simple para clientes:
  - nombre
  - motivo
  - preferencia de horario
  - canal de contacto
  - comentario
- Generador de mensaje claro para Alaya.
- Botón para copiar mensaje.
- Botón para ir a reservas.
- Botón para ir a contacto.
- Sin herramientas de administrador en la experiencia pública.
- Guía `docs/PRERESERVA-GUIADA-CLIENTE-PRO.md`.

### Objetivo

Ayudar al cliente a preparar una solicitud clara antes de reservar o contactar.


## v8.3 Consulta de Reserva Cliente Pro · 2026-06-16T20:51:45Z

### Añadido

- Nueva sección pública **Consultar mi reserva**.
- Búsqueda por código de reserva y email o teléfono.
- Resultado público con:
  - estado
  - servicio o taller
  - fecha
  - hora
  - código
  - último movimiento visible
- Botón para copiar resumen de la reserva.
- Botón para contactar si no aparece la solicitud.
- No muestra notas internas, auditoría, backups ni herramientas de administración.
- Guía `docs/CONSULTA-RESERVA-CLIENTE-PRO.md`.

### Objetivo

Dar más tranquilidad al cliente después de enviar una solicitud.


## v8.4 Confirmación Admin Obligatoria Pro · 2026-06-16T20:54:32Z

### Corregido / añadido

- La web deja claro que una reserva enviada es una **solicitud pendiente**.
- La reserva solo queda confirmada cuando el administrador pulsa **Confirmar reserva**.
- Panel admin con aviso de confirmación obligatoria.
- Botón admin **Confirmar y copiar mensaje**.
- Estado público “Pendiente de confirmación”.
- Consulta de reserva muestra explicación clara del estado.
- Mensajes y notificaciones actualizados para evitar confusión.
- Guía `docs/CONFIRMACION-ADMIN-OBLIGATORIA-PRO.md`.

### Objetivo

Evitar que el cliente piense que la cita está confirmada automáticamente.


## v8.5 Centro de Confirmaciones Admin Pro · 2026-06-16T21:04:55Z

### Añadido

- Nueva pestaña admin **Confirmaciones**.
- Bandeja de reservas pendientes de confirmación.
- Contadores:
  - pendientes
  - confirmadas
  - canceladas
- Filtro de confirmaciones.
- Botón **Confirmar y copiar mensaje**.
- Botón **Cancelar y copiar mensaje**.
- Botón **Copiar recordatorio de revisión**.
- Botón para copiar informe de pendientes.
- Sin cambios en la parte pública de cliente salvo que sigue mostrando estado claro.
- Guía `docs/CENTRO-CONFIRMACIONES-ADMIN-PRO.md`.

### Objetivo

Que el administrador tenga un lugar claro para validar manualmente cada solicitud antes de confirmar la cita.
