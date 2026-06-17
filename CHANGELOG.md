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


## v8.6 Propuestas de Horario Admin Pro · 2026-06-17T04:32:09Z

### Añadido

- Nueva pestaña admin **Alternativas**.
- El administrador puede proponer hasta 3 horarios alternativos.
- Estado **Propuesta alternativa**.
- Mensaje automático para cliente.
- Botón para copiar mensaje de espera.
- Botón para copiar protocolo de alternativas.
- La cita sigue sin confirmarse hasta que el administrador la confirme manualmente.


## v8.7 Respuesta a Propuesta Cliente Pro · 2026-06-17T04:34:38Z

### Añadido

- Nueva sección pública **Responder propuesta**.
- El cliente puede buscar su solicitud por código y contacto.
- Si hay horarios alternativos, puede elegir una opción y copiar un mensaje de aceptación.
- Nueva zona admin dentro de **Alternativas** para registrar qué opción aceptó el cliente.
- Nuevo estado **Alternativa aceptada**.
- Botón admin para confirmar una alternativa aceptada.
- La cita sigue sin confirmarse hasta la confirmación manual del administrador.
- Guía `docs/RESPUESTA-PROPUESTA-CLIENTE-PRO.md`.

### Objetivo

Cerrar el flujo completo: solicitud → alternativa → respuesta del cliente → confirmación manual del administrador.


## v8.8 Diseño PC Pro · 2026-06-17T04:38:16Z

### Ajustado

- Cabecera de escritorio más estable y legible.
- Menú público más compacto para que no se amontone en PC.
- Hero más equilibrado en pantalla grande.
- Secciones públicas más anchas.
- Tarjetas y grids optimizados para escritorio.
- Formularios de cliente más cómodos en PC.
- Footer más ordenado.
- Panel administrador con modal más amplio y pestañas con mejor distribución.
- Se mantiene la separación cliente/admin.

### Objetivo

Que la web se vea mejor en ordenador, sin romper móvil ni tablet.


## v8.9 Inicio PC Ordenado Pro · 2026-06-17T05:05:48Z

### Ajustado

- Menú superior público más limpio en PC.
- Se ocultan accesos secundarios del menú superior en escritorio.
- Se añade panel inicial de accesos principales para clientes.
- Accesos principales: reservar, servicios, herbolario, talleres, consultar reserva y contacto.
- Mejor lectura del primer pantallazo en ordenador.
- La navegación secundaria sigue disponible dentro de la página.
- Se mantiene la separación cliente/admin.

### Objetivo

Que en PC la web no parezca saturada y el cliente encuentre rápido lo importante.


## v9.0 Diseño Responsive Total Pro · 2026-06-17T05:07:56Z

### Ajustado

- Diseño revisado para móvil, tablet y PC.
- Menú móvil más usable, con scroll y enlaces ordenados.
- Barra inferior móvil con accesos rápidos de cliente.
- Hero optimizado en móvil y PC.
- Tarjetas y grids ajustados para no romper el ancho.
- Botones más cómodos en móvil.
- Formularios adaptados a pantalla pequeña.
- Panel admin más usable en PC y móvil.
- Páginas `admin.html`, `manual-admin.html` y `guia-clientes.html` con ajustes responsive.
- Se elimina duplicado de enlace “Responder propuesta” del menú.
- Se mantiene separación cliente/admin.

### Objetivo

Que la web se vea bien en móvil y en ordenador sin saturar la pantalla.


## v9.1 Mejora Sección por Sección Pro · 2026-06-17T05:09:19Z

### Mejorado por secciones

- **Cabecera:** indicador visual de sección activa.
- **Inicio:** panel de ruta de cliente más claro.
- **Servicios:** tarjetas con mejor lectura y separación.
- **Herbolario:** catálogo más limpio visualmente.
- **Talleres:** bloques más ordenados.
- **Reservas:** aviso reforzado de confirmación por administrador.
- **Consulta de reserva:** resultado público más claro.
- **Responder propuesta:** flujo más entendible.
- **Contacto:** llamadas a la acción más visibles.
- **Ayuda:** mejor lectura en móvil y PC.
- **Admin:** paneles internos con más aire y mejor jerarquía.
- Se añade guía `docs/MEJORA-SECCION-POR-SECCION-PRO.md`.

### Objetivo

Pulir la web sección por sección para que sea más clara, profesional y usable en móvil y PC.


## v9.2 Hero e Inicio Pro · 2026-06-17T05:10:23Z

### Mejorado

- Primera pantalla más clara.
- Hero con mensaje principal más directo.
- Botones principales más visibles.
- Nuevo resumen inicial de confianza.
- Accesos rápidos más limpios para cliente.
- Mejor equilibrio visual en PC.
- Mejor lectura en móvil.
- Se mantiene la separación cliente/admin.
- Nueva guía `docs/HERO-INICIO-PRO.md`.

### Objetivo

Que al entrar en la web se entienda rápido:
1. qué es Alaya,
2. qué puede hacer el cliente,
3. cómo reservar,
4. que la reserva la confirma el administrador.


## v9.3 Servicios Pro · 2026-06-17T05:11:38Z

### Mejorado

- Nueva guía visual antes de la sección de servicios.
- Bloques claros para:
  - Lecturas y tarot.
  - Energía y reiki.
  - Astrología.
  - Acompañamiento holístico.
- Selector rápido de intención del cliente.
- Mensaje dinámico con recomendación.
- CTA claro para solicitar reserva.
- Mejor lectura de tarjetas de servicios en móvil y PC.
- Se mantiene que toda reserva necesita confirmación del administrador.
- Nueva guía `docs/SERVICIOS-PRO.md`.

### Objetivo

Que el cliente entienda rápidamente qué servicio encaja con lo que necesita y cómo pasar a reservar.


## v9.4 Herbolario Pro · 2026-06-17T05:13:06Z

### Mejorado

- Nueva guía visual antes de la sección Herbolario.
- Bloques claros para:
  - Infusiones y plantas.
  - Aromas y velas.
  - Minerales y bienestar.
  - Packs y consultas.
- Nuevo generador de mensaje para consultar producto.
- CTA final para contactar con Alaya.
- Textos orientados a bienestar, sin promesas médicas.
- Mejor lectura de catálogo en móvil y PC.
- Nueva guía `docs/HERBOLARIO-PRO.md`.

### Objetivo

Que el cliente entienda cómo explorar el herbolario y cómo preguntar por disponibilidad o recomendación general.


## v9.5 Talleres y Cursos Pro · 2026-06-17T05:14:35Z

### Mejorado

- Nueva guía visual antes de talleres y cursos.
- Bloques claros para:
  - Talleres puntuales.
  - Cursos guiados.
  - Actividades de grupo.
  - Consulta de plazas.
- Nuevo formulario para preparar solicitud de interés.
- Botón para copiar mensaje de interés.
- CTA final hacia contacto y reservas.
- Textos claros: la plaza queda pendiente hasta confirmación de Alaya.
- Mejor lectura en móvil y PC.
- Nueva guía `docs/TALLERES-CURSOS-PRO.md`.

### Objetivo

Que el cliente entienda cómo consultar talleres, pedir información y solicitar plaza sin confundirlo con una reserva confirmada.


## v9.6 Reservas Pro · 2026-06-17T05:15:53Z

### Mejorado

- Nueva guía visual antes de reservar.
- Flujo claro: elegir servicio, enviar solicitud, revisión admin, confirmación manual.
- Checklist de datos que el cliente debe preparar.
- Botón para copiar checklist.
- Bloque “Qué pasa después de reservar”.
- Bloque de estados de reserva:
  - Pendiente de confirmación.
  - Propuesta alternativa.
  - Alternativa aceptada.
  - Confirmada por Alaya.
- CTA final hacia consulta de estado y contacto.
- Se refuerza que la reserva no se confirma automáticamente.
- Nueva guía `docs/RESERVAS-PRO.md`.

### Objetivo

Evitar confusiones: el cliente envía una solicitud y el administrador confirma manualmente.


## v9.7 Consulta y Respuesta Pro · 2026-06-17T05:17:09Z

### Mejorado

- Nueva guía antes de **Consultar mi reserva**.
- Explicación clara de qué se necesita:
  - código de solicitud
  - email o teléfono usado al reservar
- Guía visual de estados para cliente.
- Nuevo bloque de ayuda si el cliente no encuentra su reserva.
- Botón para copiar mensaje de “no encuentro mi solicitud”.
- Nueva guía antes de **Responder propuesta**.
- Explicación clara de que aceptar una alternativa no confirma automáticamente la cita.
- Mejor lectura en móvil y PC.
- Nueva guía `docs/CONSULTA-RESPUESTA-PRO.md`.

### Objetivo

Que el cliente pueda consultar estado y responder alternativas sin confundirse con una confirmación automática.


## v9.8 Contacto y Confianza Pro · 2026-06-17T05:18:36Z

### Mejorado

- Nueva guía antes de contacto.
- Bloques claros para:
  - preguntar antes de reservar
  - consultar disponibilidad
  - resolver dudas de herbolario
  - talleres y cursos
- Nuevo generador de mensaje de contacto.
- Botón para copiar mensaje.
- Bloque “Qué puedes esperar de Alaya”.
- Aviso claro: reservas y plazas necesitan confirmación manual.
- Textos de confianza sin prometer resultados ni sustituir consejo profesional.
- Mejor lectura en móvil y PC.
- Nueva guía `docs/CONTACTO-CONFIANZA-PRO.md`.

### Objetivo

Que el cliente tenga claro cómo contactar y qué información enviar para recibir una respuesta útil.


## v9.9 Admin Visible Pro · 2026-06-17T05:20:17Z

### Añadido / mejorado

- Botón **Admin** visible en la página principal.
- Nuevo bloque público **Acceso administrador**.
- Enlace directo a `admin.html` desde la web principal.
- El acceso se muestra separado de la experiencia del cliente.
- Mejora visual de acceso admin en móvil y PC.
- Checklist rápido para el administrador.
- Accesos internos a:
  - Confirmaciones.
  - Alternativas.
  - Reservas.
  - Talleres.
  - Manual admin.
- Se mantiene la separación: clientes en `index.html`, administración en `admin.html`.
- Nueva guía `docs/ADMIN-VISIBLE-PRO.md`.

### Objetivo

Que el administrador pueda entrar fácilmente desde la página principal sin mezclar las herramientas internas con las secciones de clientes.


## v10.0 Panel Admin Pro · 2026-06-17T05:21:42Z

### Añadido / mejorado

- Centro rápido interno para administrador.
- Accesos directos a:
  - Confirmaciones.
  - Alternativas.
  - Reservas.
  - Calendario.
  - Servicios.
  - Manual admin.
- Checklist diario del administrador.
- Botón para copiar protocolo diario.
- Mejor jerarquía visual dentro del panel.
- Mejora visual de `admin.html`.
- Se mantiene el botón Admin visible en la página principal.
- Nueva guía `docs/PANEL-ADMIN-PRO.md`.

### Objetivo

Que el administrador tenga una entrada más clara, rápida y ordenada para gestionar la web sin mezclarlo con la experiencia del cliente.


## v10.1 Ayuda y Manuales Pro · 2026-06-17T05:26:40Z

### Añadido / mejorado

- Nueva sección pública **Ayuda rápida**.
- Preguntas frecuentes para clientes.
- Guía rápida según lo que el cliente quiere hacer.
- Botón para copiar pasos de uso.
- Mejora de `guia-clientes.html`.
- Mejora de `manual-admin.html`.
- Separación clara:
  - ayuda pública para clientes
  - manual interno para administrador
- Se mantiene botón **Admin** visible en la página principal.
- Nueva guía `docs/AYUDA-MANUALES-PRO.md`.

### Objetivo

Que clientes y administrador tengan instrucciones claras sin mezclar la zona pública con la interna.


## v10.2 UX Global Pro · 2026-06-17T05:28:38Z

### Añadido / mejorado

- Barra superior de progreso de lectura/navegación.
- Botón flotante **Subir**.
- Enlace de accesibilidad “Saltar al contenido”.
- Mejor foco visual en botones, enlaces y formularios.
- Mejor contraste de tarjetas y estados.
- Más separación entre secciones largas.
- Mejor experiencia en móvil con barra inferior y botón subir.
- Mejoras ligeras en `404.html`, `offline.html`, `guia-clientes.html` y `manual-admin.html`.
- Nueva guía `docs/UX-GLOBAL-PRO.md`.

### Objetivo

Mejorar la sensación global de la web: más cómoda, más clara, más profesional y más fácil de navegar.


## v10.3 Gestor de Contenido Admin Pro · 2026-06-17T05:35:35Z

### Añadido

- Nueva pestaña Admin: **Gestor contenido**.
- Crear contenido desde Admin:
  - Servicios.
  - Talleres.
  - Cursos.
  - Productos de herbolario.
  - Avisos.
  - Novedades.
- Editar contenido creado.
- Activar/desactivar contenido.
- Borrar contenido.
- Duplicar contenido.
- Exportar contenido en JSON.
- Contadores por tipo de contenido.
- Contenido público añadido automáticamente en:
  - sección Servicios
  - sección Talleres y Cursos
  - sección Herbolario
  - bloque de Avisos y Novedades
- Se mantiene separación cliente/admin.
- Nueva guía `docs/GESTOR-CONTENIDO-ADMIN-PRO.md`.

### Objetivo

Que Alaya pueda añadir y actualizar el contenido principal de la web desde el panel Admin sin tocar código.


## v10.4 Hosting Ready Pro · 2026-06-17T05:38:34Z

### Preparado para hosting

- Añadido `HOSTING.md` con instrucciones de subida.
- Añadido `DEPLOY-CHECKLIST.md`.
- Añadido `.htaccess` para Apache/cPanel.
- Añadido `netlify.toml`.
- Añadido `vercel.json`.
- Añadido `_headers` para Netlify/Cloudflare Pages.
- Añadido `_redirects` para Netlify.
- Añadido `.nojekyll` para GitHub Pages.
- Actualizado `robots.txt`.
- Generado `sitemap.xml`.
- Añadido `hosting-config.json`.
- Añadida guía `docs/HOSTING-READY-PRO.md`.
- Actualizado service worker a caché v10.4.
- Validación JS correcta.

### Objetivo

Dejar el proyecto listo para subir la carpeta a un hosting estático.


## v10.5 Admin WordPress CMS Pro · 2026-06-17T05:42:37Z

### Añadido

- Nueva pestaña Admin: **WordPress CMS**.
- Centro tipo WordPress para gestionar la web.
- Editor de identidad:
  - nombre de la marca
  - subtítulo
  - email
  - teléfono
  - ubicación
- Editor de portada:
  - título principal
  - texto principal
  - botones CTA
- Editor de diseño:
  - color principal
  - color secundario
  - color acento
  - escala visual
- Editor de menú rápido público.
- Editor de bloques/secciones públicas:
  - crear
  - editar
  - publicar/ocultar
  - borrar
  - ordenar
- Editor SEO:
  - title
  - description
  - keywords
- Aviso global / modo publicación.
- Exportar e importar configuración CMS en JSON.
- Render público automático.
- Se mantiene hosting ready.
- Nueva guía `docs/ADMIN-WORDPRESS-CMS-PRO.md`.

### Objetivo

Que el panel Admin funcione como un mini WordPress para gestionar la web sin tocar código.


## v10.6 Constructor Visual Admin Pro · 2026-06-17T05:45:19Z

### Añadido

- Nueva pestaña Admin: **Constructor visual**.
- Plantillas rápidas para crear bloques:
  - hero promocional
  - servicio destacado
  - taller/curso
  - herbolario
  - aviso global
  - FAQ
  - llamada a la acción
- Vista de bloques publicados/ocultos.
- Botones para:
  - mover bloque arriba
  - mover bloque abajo
  - duplicar bloque
  - publicar/ocultar
  - borrar
- Sistema de revisiones CMS en el navegador.
- Botón para guardar revisión manual.
- Botón para restaurar revisión.
- Botón para exportar backup completo CMS.
- Se mantiene hosting ready.
- Nueva guía `docs/CONSTRUCTOR-VISUAL-ADMIN-PRO.md`.

### Objetivo

Acercar el Admin a una experiencia tipo WordPress/constructor visual, sin tocar código.


## v10.7 Publicador CMS Hosting Pro · 2026-06-17T06:16:37Z

### Añadido

- Nueva pestaña Admin: **Publicador CMS**.
- Exportación de contenido CMS como `cms-public.json`.
- Carpeta `data/` preparada para hosting.
- Archivo inicial `data/cms-public.json`.
- La web pública intenta cargar automáticamente `data/cms-public.json`.
- Botón para descargar publicación.
- Botón para copiar JSON publicado.
- Importador de JSON publicado.
- Checklist de publicación estática.
- Estado visual de publicación CMS.
- Guía `docs/PUBLICADOR-CMS-HOSTING-PRO.md`.
- Actualización de `HOSTING.md` y `DEPLOY-CHECKLIST.md`.

### Objetivo

Permitir que los cambios del Admin puedan publicarse en hosting estático mediante un archivo JSON subible al servidor.


## v10.8 CMS Online Sync Pro · 2026-06-17T06:18:33Z

### Añadido

- Nueva pestaña Admin: **Sync CMS**.
- Centro de sincronización para el mini CMS.
- Modos de datos:
  - Local navegador.
  - Archivo publicado `data/cms-public.json`.
  - Firebase/online sync preparado.
- Estado visual de sincronización.
- Botón para guardar snapshot local.
- Botón para restaurar snapshot local.
- Botón para descargar snapshot.
- Botón para intentar subir CMS a Firebase.
- Botón para intentar descargar CMS desde Firebase.
- Configuración de colección/documento Firestore.
- Archivo `data/cms-sync-schema.json`.
- Guía `docs/CMS-ONLINE-SYNC-PRO.md`.
- Actualización de `HOSTING.md` y `DEPLOY-CHECKLIST.md`.

### Objetivo

Acercar el Admin a una experiencia multiadministrador: poder preparar sincronización real sin depender solo del navegador.


## v10.9 Firebase Setup Wizard Pro · 2026-06-17T06:20:28Z

### Añadido

- Nueva pestaña Admin: **Firebase Wizard**.
- Asistente paso a paso para preparar Firebase:
  - Crear proyecto.
  - Activar Authentication.
  - Activar Firestore.
  - Configurar emails admin.
  - Pegar configuración.
  - Probar estado.
- Generador de `backend-config.js`.
- Botón copiar configuración.
- Botón descargar configuración.
- Reglas Firestore orientativas.
- Botón copiar reglas.
- Diagnóstico Firebase:
  - configuración pegada
  - app Firebase detectada
  - Firestore detectado
  - Auth detectado
  - emails admin definidos
- Archivo `js/backend-config.example.js`.
- Archivo `data/firebase-security-rules.example`.
- Guía `docs/FIREBASE-SETUP-WIZARD-PRO.md`.
- Actualización de `HOSTING.md` y `DEPLOY-CHECKLIST.md`.

### Objetivo

Dejar el proyecto listo para conectar sincronización real multiadmin con Firebase de forma más clara.


## v11.0 Reservas Online Firebase Pro · 2026-06-17T06:23:54Z

### Añadido

- Nueva sección pública: **Reserva online**.
- Formulario de solicitud con:
  - nombre
  - contacto
  - servicio
  - preferencia de fecha
  - preferencia de horario
  - mensaje
- Código automático de solicitud.
- Guardado local si no hay Firebase.
- Envío a Firestore si Firebase está configurado.
- Nueva pestaña Admin: **Reservas online**.
- Panel Admin con:
  - estadísticas
  - listado de solicitudes
  - filtro por estado
  - buscar por código, nombre o contacto
  - cambiar estado
  - copiar mensaje para cliente
  - exportar reservas JSON
  - sincronizar con Firebase si está disponible
- Estados:
  - pendiente
  - confirmada
  - alternativa propuesta
  - cancelada
  - completada
- Archivo `data/reservas-firestore-schema.json`.
- Guía `docs/RESERVAS-ONLINE-FIREBASE-PRO.md`.
- Actualización de `HOSTING.md` y `DEPLOY-CHECKLIST.md`.

### Objetivo

Que las reservas puedan gestionarse desde Admin y quedar listas para sincronización real con Firebase.


## v11.1 Seguimiento de Reservas Pro · 2026-06-17T06:36:15Z

### Añadido

- Nueva sección pública: **Consultar estado de reserva**.
- Consulta por:
  - código de solicitud
  - contacto usado al reservar
- Resultado público con:
  - estado
  - servicio
  - fecha preferida
  - horario preferido
  - respuesta de Alaya si existe
  - propuesta de horario si existe
- Búsqueda local y búsqueda Firestore si Firebase está disponible.
- Admin mejorado en Reservas online:
  - respuesta visible para cliente
  - nota interna
  - propuesta de día/hora
  - guardar seguimiento
  - copiar respuesta para cliente
  - historial básico de actualización
- Actualización de esquema `data/reservas-firestore-schema.json`.
- Guía `docs/SEGUIMIENTO-RESERVAS-PRO.md`.

### Objetivo

Que el cliente pueda consultar el estado de su solicitud y que el administrador pueda responder mejor desde el panel.


## v11.2 Agenda y Disponibilidad Online Pro · 2026-06-17T06:41:36Z

### Añadido

- Nueva sección pública: **Disponibilidad orientativa**.
- Horarios disponibles creados desde Admin.
- Botón público “Solicitar este horario” que rellena la reserva online.
- Nueva pestaña Admin: **Agenda online**.
- Crear horarios con:
  - servicio
  - fecha
  - hora
  - duración
  - plazas
  - estado
  - nota interna
- Crear bloqueos de agenda.
- Listado Admin de horarios y bloqueos.
- Publicar/ocultar horarios.
- Marcar horario como completo.
- Duplicar horario.
- Borrar horario.
- Exportar agenda en JSON.
- Sincronización Firebase preparada.
- Archivo `data/agenda-firestore-schema.json`.
- Guía `docs/AGENDA-DISPONIBILIDAD-ONLINE-PRO.md`.

### Objetivo

Que Alaya pueda gestionar disponibilidad desde Admin y que el cliente pueda solicitar una reserva sobre un horario concreto.


## v11.3 Mensajes y Notificaciones Pro · 2026-06-17T06:48:01Z

### Añadido

- Nueva pestaña Admin: **Mensajes**.
- Centro de mensajes para reservas.
- Plantillas rápidas:
  - reserva recibida
  - reserva confirmada
  - propuesta alternativa
  - recordatorio
  - cancelación
  - agradecimiento
- Selector de reserva para generar mensajes con datos reales.
- Editor de mensaje antes de copiar.
- Copiar mensaje.
- Abrir WhatsApp con mensaje preparado.
- Abrir email con asunto y cuerpo preparados.
- Avisos internos/Admin:
  - nueva reserva pendiente
  - horario completo
  - falta respuesta visible
  - sin Firebase configurado
- Exportar mensajes/plantillas JSON.
- Archivo `data/mensajes-schema.json`.
- Guía `docs/MENSAJES-NOTIFICACIONES-PRO.md`.

### Objetivo

Facilitar respuestas rápidas a clientes y dejar preparado el flujo de notificaciones manuales en hosting estático.


## v11.4 Clientes CRM e Historial Pro · 2026-06-17T06:56:44Z

### Añadido

- Nueva pestaña Admin: **Clientes**.
- Mini CRM interno para clientes/consultantes.
- Alta manual de cliente.
- Actualizar clientes desde reservas existentes.
- Historial de reservas por cliente.
- Notas internas.
- Preferencias del cliente.
- Etiquetas.
- Buscador por nombre, contacto, etiqueta o preferencia.
- Estadísticas de clientes.
- Exportar clientes JSON.
- Sincronización Firebase preparada.
- Archivo `data/clientes-crm-schema.json`.
- Guía `docs/CLIENTES-CRM-HISTORIAL-PRO.md`.

### Objetivo

Dar a Alaya una base de gestión tipo CRM, sin mezclar datos privados en la parte pública.


## v11.5 Dashboard Negocio Pro · 2026-06-17T07:04:06Z

### Añadido

- Nueva pestaña Admin: **Dashboard Pro**.
- Panel resumen del negocio:
  - reservas totales
  - reservas pendientes
  - reservas confirmadas
  - clientes CRM
  - horarios publicados
  - mensajes preparados
- Panel de tareas pendientes.
- Métricas por estado de reserva.
- Métricas por servicio.
- Agenda próxima.
- Clientes recientes.
- Estado técnico:
  - CMS local
  - archivo publicado
  - Firebase detectado
  - CRM activo
- Exportar informe completo JSON.
- Copiar resumen ejecutivo.
- Archivo `data/dashboard-negocio-schema.json`.
- Guía `docs/DASHBOARD-NEGOCIO-PRO.md`.

### Objetivo

Tener una visión clara del estado de Alaya desde un único panel Admin.


## v11.6 Backup y Restauración Pro · 2026-06-17T07:13:36Z

### Añadido

- Nueva pestaña Admin: **Backup**.
- Exportación total de datos Admin en un único JSON.
- Exportaciones selectivas:
  - CMS
  - reservas
  - agenda
  - clientes
  - mensajes
  - configuración sync/Firebase
- Importación/restauración desde JSON.
- Modo de restauración:
  - combinar datos
  - reemplazar datos
- Auditoría de datos locales.
- Checklist de migración entre dispositivos.
- Copiar resumen de backup.
- Vista previa del backup.
- Archivo `data/backup-restauracion-schema.json`.
- Guía `docs/BACKUP-RESTAURACION-PRO.md`.

### Objetivo

Evitar pérdida de datos y facilitar migraciones antes de subir nuevas versiones o cambiar de dispositivo.


## v11.7 Legal, Privacidad y Consentimientos Pro · 2026-06-17T07:16:07Z

### Añadido

- Nueva pestaña Admin: **Legal Pro**.
- Centro legal y privacidad editable.
- Textos editables:
  - nombre comercial
  - responsable/contacto
  - jurisdicción
  - resumen de privacidad
  - texto de consentimiento de reservas
  - aviso de cookies
  - retención de datos
  - aviso de servicios holísticos
- Nueva sección pública: **Privacidad y confianza**.
- Consentimiento de reserva con versión legal.
- Auditoría de privacidad:
  - reservas con consentimiento
  - reservas sin consentimiento versionado
  - clientes CRM
  - notas internas
  - Firebase detectado
- Exportar configuración legal JSON.
- Copiar resumen legal.
- Archivo `data/legal-privacidad-schema.json`.
- Guía `docs/LEGAL-PRIVACIDAD-CONSENTIMIENTOS-PRO.md`.

### Objetivo

Mejorar la confianza del proyecto y dejar una base más clara para privacidad, consentimiento y gestión responsable de datos.


## v11.8 Centro Lanzamiento y QA Pro · 2026-06-17T07:31:01Z

### Añadido

- Nueva pestaña Admin: **Lanzamiento QA**.
- Panel de revisión final antes de publicar.
- Checklist de lanzamiento:
  - contenido
  - reservas
  - agenda
  - clientes
  - legal
  - backup
  - hosting
  - PWA
  - Firebase/online sync
- Modo de publicación:
  - borrador interno
  - lanzamiento
  - mantenimiento
- Aviso público de estado de lanzamiento.
- Informe QA con puntuación.
- Copiar resumen de lanzamiento.
- Exportar reporte QA JSON.
- Historial local de revisiones QA.
- Archivo `data/lanzamiento-qa-schema.json`.
- Guía `docs/CENTRO-LANZAMIENTO-QA-PRO.md`.

### Objetivo

Tener un último panel de control antes de publicar o entregar la web, evitando olvidos importantes.


## v11.9 SEO, Rendimiento y Accesibilidad Pro · 2026-06-17T07:33:23Z

### Añadido

- Nueva pestaña Admin: **SEO UX**.
- Auditoría de optimización:
  - título SEO
  - meta descripción
  - viewport móvil
  - manifest PWA
  - service worker
  - enlaces principales
  - formularios con etiquetas
  - imágenes con alt
  - secciones públicas clave
  - legal y privacidad
  - backup y QA
- Puntuación de optimización.
- Modo lectura cómoda.
- Modo reducir animaciones.
- Botón copiar resumen SEO.
- Exportar informe de optimización JSON.
- Sugerencias automáticas.
- Archivo `data/seo-rendimiento-schema.json`.
- Guía `docs/SEO-RENDIMIENTO-ACCESIBILIDAD-PRO.md`.

### Objetivo

Pulir la web antes de publicar y facilitar una revisión rápida de SEO, UX, accesibilidad y PWA.


## v12.0 Release Candidate Final Pro · 2026-06-17T07:42:38Z

### Añadido

- Nueva pestaña Admin: **Release Final**.
- Panel de cierre de proyecto.
- Informe global final:
  - negocio
  - SEO/UX
  - QA lanzamiento
  - backup
  - legal
  - Firebase/sync
- Estado de release:
  - candidata
  - aprobada
  - publicada
- Checklist final de entrega.
- Notas finales editables.
- Copiar briefing de lanzamiento.
- Exportar paquete final JSON.
- Vista previa del informe final.
- Archivo `data/release-candidate-schema.json`.
- Archivo `FINAL-CHECKLIST.md`.
- Archivo `RELEASE-NOTES.md`.
- Guía `docs/RELEASE-CANDIDATE-FINAL-PRO.md`.

### Objetivo

Cerrar la fase de desarrollo con una versión candidata lista para revisión, entrega y publicación controlada.


## v12.1 Publicación Guiada y Dominio Pro · 2026-06-17T07:52:11Z

### Añadido

- Nueva pestaña Admin: **Publicación**.
- Asistente de hosting:
  - GitHub Pages
  - Netlify
  - Vercel
  - hosting manual
- Campos de publicación:
  - URL pública
  - ruta/base path
  - dominio personalizado
  - email de contacto
  - plataforma
- Generador de plan de publicación.
- Checklist de subida.
- Generador de `robots.txt`.
- Generador de `sitemap.xml`.
- Copiar pasos de publicación.
- Exportar plan de publicación JSON.
- Vista previa del plan.
- Archivo `data/publicacion-guiada-schema.json`.
- Guía `docs/PUBLICACION-GUIADA-DOMINIO-PRO.md`.

### Objetivo

Facilitar el paso final: subir la web, preparar dominio, revisar URLs y dejar el paquete listo para publicar.


## v12.2 Seguridad Producción y Firebase Rules Pro · 2026-06-17T08:00:40Z

### Añadido

- Nueva pestaña Admin: **Seguridad Pro**.
- Auditoría de seguridad antes de producción.
- Configuración de:
  - emails admin autorizados
  - dominio permitido
  - modo de seguridad
  - nombres de colecciones Firebase
- Generador de reglas Firestore orientativas.
- Copiar reglas Firestore.
- Exportar plan de seguridad JSON.
- Checklist de seguridad.
- Estado público de seguridad y privacidad.
- Archivo `data/seguridad-produccion-schema.json`.
- Archivo `firestore.rules.template`.
- Guía `docs/SEGURIDAD-PRODUCCION-FIREBASE-PRO.md`.

### Objetivo

Evitar publicar con permisos abiertos y preparar una base más segura para Firebase, reservas, CMS, clientes y agenda.


## v12.3 Primer Arranque y Datos Demo Pro · 2026-06-17T08:06:13Z

### Añadido

- Nueva pestaña Admin: **Primer Arranque**.
- Asistente de puesta en marcha inicial.
- Configuración rápida:
  - nombre del proyecto
  - ciudad/zona
  - contacto principal
  - email admin
  - canal preferido
- Carga de datos demo seguros:
  - reserva demo
  - cliente demo
  - horario demo
  - mensaje demo
- Borrado seguro solo de datos demo.
- Checklist inicial:
  - legal
  - seguridad
  - publicación
  - reservas
  - agenda
  - backup
  - SEO UX
  - Release final
- Exportar plan de primer arranque JSON.
- Copiar resumen inicial.
- Estado público de configuración.
- Archivo `data/primer-arranque-schema.json`.
- Guía `docs/PRIMER-ARRANQUE-DATOS-DEMO-PRO.md`.

### Objetivo

Facilitar el uso real desde cero y probar la web sin tocar datos reales.


## v12.4 Mantenimiento, Soporte e Incidencias Pro · 2026-06-17T08:09:02Z

### Añadido

- Nueva pestaña Admin: **Mantenimiento**.
- Centro de soporte interno.
- Registro de incidencias:
  - título
  - prioridad
  - estado
  - zona afectada
  - descripción
- Tareas de mantenimiento.
- Estado público de mantenimiento.
- Auditoría rápida:
  - backup
  - release
  - publicación
  - seguridad
  - primer arranque
  - SEO UX
- Copiar resumen de soporte.
- Exportar reporte de mantenimiento JSON.
- Borrar incidencias cerradas.
- Archivo `data/mantenimiento-soporte-schema.json`.
- Guía `docs/MANTENIMIENTO-SOPORTE-INCIDENCIAS-PRO.md`.

### Objetivo

Tener un centro interno para resolver errores, llevar control de tareas y mantener la web ordenada después del lanzamiento.


## v12.5 Marketing, Redes y Difusión Pro · 2026-06-17T08:11:25Z

### Añadido

- Nueva pestaña Admin: **Marketing**.
- Centro de campañas y difusión.
- Crear campañas con:
  - título
  - servicio
  - canal
  - objetivo
  - fecha
  - llamada a la acción
  - nota interna
- Generador de textos para:
  - Instagram
  - WhatsApp
  - email/newsletter
  - Google Business
  - anuncio corto
- Calendario de campañas.
- Ideas rápidas de contenido.
- Copiar texto generado.
- Exportar plan de marketing JSON.
- Borrar campañas finalizadas.
- Nueva sección pública de comunidad/novedades.
- Archivo `data/marketing-redes-schema.json`.
- Guía `docs/MARKETING-REDES-DIFUSION-PRO.md`.

### Objetivo

Facilitar la difusión de servicios, talleres, agenda y novedades sin depender de herramientas externas.


## v12.6 Analítica Local y Conversión Pro · 2026-06-17T08:16:35Z

### Añadido

- Nueva pestaña Admin: **Analítica**.
- Registro local de eventos no sensibles.
- Métricas:
  - visitas locales
  - clics de reserva
  - clics de contacto
  - navegación por secciones
  - eventos de marketing
  - objetivos de conversión
- Embudo de conversión:
  - visita
  - servicio visto
  - clic reserva/contacto
  - reserva creada
- Filtros por tipo de evento.
- Limpiar eventos locales.
- Copiar resumen de analítica.
- Exportar informe JSON.
- Aviso de privacidad: analítica local sin cookies externas.
- Archivo `data/analitica-local-schema.json`.
- Guía `docs/ANALITICA-LOCAL-CONVERSION-PRO.md`.

### Objetivo

Medir qué partes de la web se usan más y mejorar reservas/contacto sin usar servicios externos ni datos personales.


## v12.7 Multiidioma y Traducciones Pro · 2026-06-17T08:22:39Z

### Añadido

- Nueva pestaña Admin: **Idiomas**.
- Selector público de idioma: ES / CAT / EN.
- Diccionario editable de textos clave.
- Traducciones base para:
  - bienvenida
  - servicios
  - reservas
  - confianza
  - talleres
  - contacto
  - aviso responsable
- Vista previa por idioma.
- Copiar resumen de traducciones.
- Exportar diccionario JSON.
- Importar diccionario JSON desde texto.
- Nueva sección pública multiidioma.
- Archivo `data/multiidioma-schema.json`.
- Guía `docs/MULTIIDIOMA-TRADUCCIONES-PRO.md`.

### Objetivo

Preparar la web para público en castellano, catalán e inglés con textos editables desde Admin.


## v12.8 Recordatorios y Seguimiento Pro · 2026-06-17T08:26:10Z

### Añadido

- Nueva pestaña Admin: **Recordatorios**.
- Generación de recordatorios manuales para:
  - reservas pendientes
  - reservas confirmadas
  - recordatorio 24h
  - seguimiento posterior
  - propuestas de horario
  - disponibilidad de agenda
- Mensajes listos para copiar.
- Marcar recordatorio como enviado manualmente.
- Omitir recordatorio.
- Filtro por estado/tipo.
- Estadísticas de seguimiento.
- Copiar resumen de recordatorios.
- Exportar reporte JSON.
- Archivo `data/recordatorios-seguimiento-schema.json`.
- Guía `docs/RECORDATORIOS-SEGUIMIENTO-PRO.md`.

### Objetivo

Ayudar al administrador a hacer seguimiento sin enviar mensajes automáticamente ni guardar datos sensibles.


## v12.9 Tarifas, Packs y Servicios Pro · 2026-06-17T09:08:17Z

### Añadido

- Nueva pestaña Admin: **Tarifas**.
- Gestión de servicios y packs:
  - nombre
  - categoría
  - modalidad
  - duración
  - precio orientativo
  - disponibilidad
  - visibilidad pública
  - descripción
  - nota responsable
- Catálogo público de servicios destacados.
- Buscador y filtro por categoría.
- Copiar ficha de servicio.
- Exportar catálogo JSON.
- Importar/restaurar catálogo base.
- Estadísticas de catálogo.
- Archivo `data/tarifas-packs-schema.json`.
- Guía `docs/TARIFAS-PACKS-SERVICIOS-PRO.md`.

### Objetivo

Mostrar servicios, talleres y packs de forma clara y responsable, sin prometer resultados médicos ni diagnósticos.


## v13.0 Talleres, Cursos e Inscripciones Pro · 2026-06-17T09:13:41Z

### Añadido

- Nueva pestaña Admin: **Talleres**.
- Gestión de talleres y cursos:
  - título
  - categoría
  - fecha
  - hora
  - duración
  - modalidad
  - plazas
  - precio orientativo
  - estado
  - visibilidad pública
  - descripción
- Catálogo público de talleres.
- Formulario público de solicitud de inscripción.
- Panel Admin de solicitudes.
- Estados de solicitud:
  - pendiente
  - contactada
  - confirmada
  - lista de espera
  - cancelada
- Contador de plazas orientativo.
- Copiar ficha de taller.
- Exportar listado de talleres e inscripciones JSON.
- Archivo `data/talleres-inscripciones-schema.json`.
- Guía `docs/TALLERES-CURSOS-INSCRIPCIONES-PRO.md`.

### Objetivo

Permitir publicar talleres/cursos, recibir solicitudes y organizar plazas sin backend obligatorio.


## v13.1 Testimonios, Reseñas y Galería Pro · 2026-06-17T18:30:20Z

- Nueva pestaña Admin **Reseñas**.
- Testimonios con consentimiento.
- Galería pública por URL.
- Exportación JSON.
- Avisos responsables.
