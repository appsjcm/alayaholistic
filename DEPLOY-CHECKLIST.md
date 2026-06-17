# Checklist de publicación · Alaya Holistics Web

## Revisión visual

- [ ] Abrir `index.html` en móvil.
- [ ] Abrir `index.html` en PC.
- [ ] Revisar menú principal.
- [ ] Revisar botón Admin.
- [ ] Revisar formularios.
- [ ] Revisar secciones de servicios, herbolario, talleres y reservas.

## Contacto

- [ ] Revisar teléfono.
- [ ] Revisar email.
- [ ] Revisar enlaces de WhatsApp si existen.
- [ ] Revisar textos de contacto.

## Reservas

- [ ] Probar solicitud de reserva.
- [ ] Probar consulta de estado.
- [ ] Probar responder propuesta.
- [ ] Revisar que la reserva se muestra como pendiente hasta confirmación.

## Admin

- [ ] Entrar en `admin.html`.
- [ ] Probar acceso al panel.
- [ ] Probar Gestor contenido.
- [ ] Crear un servicio de prueba.
- [ ] Crear un taller de prueba.
- [ ] Crear un producto de herbolario de prueba.
- [ ] Verificar que aparece en la web pública.
- [ ] Borrar contenido de prueba.

## Legal

- [ ] Revisar `legal.html`.
- [ ] Revisar `privacidad.html`.
- [ ] Revisar `cookies.html`.
- [ ] Adaptar datos reales del negocio.
- [ ] Revisar con profesional si se publica oficialmente.

## Hosting

- [ ] Subir todo a `public_html` o carpeta raíz del hosting.
- [ ] Confirmar que `index.html` abre correctamente.
- [ ] Confirmar que `admin.html` abre correctamente.
- [ ] Confirmar que `manifest.webmanifest` / `manifest.json` funciona si existe.
- [ ] Confirmar que `sw.js` no da error.
- [ ] Probar en navegador incógnito.
- [ ] Probar en móvil con datos móviles.


## Publicador CMS

- [ ] Editar cambios desde WordPress CMS o Constructor visual.
- [ ] Entrar en Publicador CMS.
- [ ] Descargar `cms-public.json`.
- [ ] Subirlo a `/data/cms-public.json`.
- [ ] Abrir web en incógnito.
- [ ] Confirmar que portada, menú, colores y bloques se actualizan.


## Sync CMS

- [ ] Elegir modo local, publicado o Firebase.
- [ ] Guardar snapshot antes de cambios grandes.
- [ ] Descargar backup CMS.
- [ ] Si se usa Firebase, comprobar reglas de seguridad.
- [ ] Probar subida CMS a Firebase.
- [ ] Probar bajada CMS desde Firebase.
- [ ] Confirmar que la web pública carga el contenido correcto.


## Firebase Wizard

- [ ] Crear proyecto Firebase.
- [ ] Activar Authentication.
- [ ] Crear usuario administrador.
- [ ] Activar Firestore.
- [ ] Pegar config en Firebase Wizard.
- [ ] Añadir emails admin.
- [ ] Copiar reglas y revisarlas.
- [ ] Descargar `backend-config.js`.
- [ ] Subir `backend-config.js` a `/js/`.
- [ ] Probar diagnóstico Firebase.
- [ ] Probar Sync CMS.


## Reservas online Firebase

- [ ] Probar envío de solicitud desde web pública.
- [ ] Confirmar que aparece código.
- [ ] Entrar a Admin → Reservas online.
- [ ] Cambiar estado de una solicitud.
- [ ] Copiar mensaje para cliente.
- [ ] Exportar reservas JSON.
- [ ] Si Firebase está activo, probar sincronización.
- [ ] Revisar reglas Firestore.


## Seguimiento de reservas

- [ ] Crear una reserva de prueba.
- [ ] Copiar el código.
- [ ] Entrar a Admin → Reservas online.
- [ ] Añadir respuesta visible.
- [ ] Añadir propuesta de horario.
- [ ] Consultar estado con código/contacto.
- [ ] Confirmar que no se muestran notas internas al cliente.


## Agenda online

- [ ] Crear un horario disponible.
- [ ] Verlo en la sección pública Disponibilidad.
- [ ] Pulsar “Solicitar este horario”.
- [ ] Comprobar que rellena la reserva online.
- [ ] Crear un bloqueo de fecha.
- [ ] Confirmar que los horarios bloqueados no aparecen.
- [ ] Exportar agenda JSON.
- [ ] Si Firebase está activo, probar sincronización.


## Mensajes y notificaciones

- [ ] Crear reserva de prueba.
- [ ] Entrar en Admin → Mensajes.
- [ ] Seleccionar reserva.
- [ ] Generar plantilla de confirmación.
- [ ] Copiar mensaje.
- [ ] Probar abrir WhatsApp.
- [ ] Probar abrir email.
- [ ] Exportar mensajes JSON.


## Clientes CRM

- [ ] Crear cliente de prueba.
- [ ] Crear reserva de prueba.
- [ ] Pulsar “Actualizar desde reservas”.
- [ ] Comprobar historial vinculado.
- [ ] Añadir etiqueta y nota interna.
- [ ] Copiar resumen.
- [ ] Exportar clientes JSON.
- [ ] Si Firebase está activo, probar sincronización.


## Dashboard negocio

- [ ] Abrir Admin → Dashboard Pro.
- [ ] Revisar reservas pendientes.
- [ ] Revisar tareas pendientes.
- [ ] Revisar próximos horarios.
- [ ] Revisar clientes recientes.
- [ ] Copiar resumen.
- [ ] Exportar informe JSON.


## Backup y restauración

- [ ] Abrir Admin → Backup.
- [ ] Descargar backup total.
- [ ] Validar que se descargó el JSON.
- [ ] Copiar resumen de backup.
- [ ] Probar vista previa.
- [ ] Antes de actualizar, guardar también el ZIP actual.
- [ ] Si se migra de navegador, restaurar backup.


## Legal y privacidad

- [ ] Abrir Admin → Legal Pro.
- [ ] Revisar nombre comercial y contacto.
- [ ] Revisar privacidad.
- [ ] Revisar consentimiento de reservas.
- [ ] Revisar cookies/almacenamiento local.
- [ ] Revisar aviso de servicios holísticos.
- [ ] Exportar configuración legal.
- [ ] Revisar textos antes de producción.


## Lanzamiento QA

- [ ] Descargar backup total.
- [ ] Revisar textos legales.
- [ ] Crear reserva de prueba.
- [ ] Consultar estado de reserva.
- [ ] Crear horario disponible.
- [ ] Revisar móvil y PC.
- [ ] Ejecutar QA.
- [ ] Exportar reporte de lanzamiento.
- [ ] Activar modo lanzamiento.


## SEO UX

- [ ] Abrir Admin → SEO UX.
- [ ] Ejecutar auditoría.
- [ ] Revisar título SEO.
- [ ] Revisar meta descripción.
- [ ] Revisar formularios y enlaces.
- [ ] Revisar PWA/manifest.
- [ ] Exportar informe SEO UX.


## Release final

- [ ] Abrir Admin → Release Final.
- [ ] Generar informe final.
- [ ] Revisar módulos incluidos.
- [ ] Revisar prioridades.
- [ ] Copiar briefing final.
- [ ] Exportar paquete final JSON.
- [ ] Guardar RELEASE-NOTES.md.
- [ ] Guardar FINAL-CHECKLIST.md.


## Publicación guiada

- [ ] Abrir Admin → Publicación.
- [ ] Elegir plataforma.
- [ ] Añadir URL pública.
- [ ] Añadir dominio si existe.
- [ ] Generar plan.
- [ ] Exportar plan JSON.
- [ ] Copiar robots.txt si se necesita.
- [ ] Copiar sitemap.xml si se necesita.
- [ ] Subir todos los archivos del ZIP descomprimido.


## Seguridad producción

- [ ] Abrir Admin → Seguridad Pro.
- [ ] Configurar modo producción/staging.
- [ ] Añadir emails admin autorizados.
- [ ] Añadir dominio permitido.
- [ ] Copiar reglas Firestore.
- [ ] Probar reglas antes de datos reales.
- [ ] Confirmar que CRM clientes es privado.
- [ ] Exportar plan de seguridad.


## Primer arranque

- [ ] Abrir Admin → Primer Arranque.
- [ ] Completar datos básicos.
- [ ] Cargar datos demo.
- [ ] Probar reservas.
- [ ] Probar agenda.
- [ ] Probar CRM.
- [ ] Probar mensajes.
- [ ] Borrar datos demo.
- [ ] Exportar plan inicial.


## Mantenimiento y soporte

- [ ] Abrir Admin → Mantenimiento.
- [ ] Registrar incidencia de prueba.
- [ ] Cambiar a en proceso.
- [ ] Cerrar incidencia.
- [ ] Exportar reporte.
- [ ] Borrar cerradas si procede.


## Marketing y redes

- [ ] Abrir Admin → Marketing.
- [ ] Crear campaña de prueba.
- [ ] Generar texto.
- [ ] Copiar texto.
- [ ] Exportar plan de marketing.
- [ ] Revisar que no haya datos privados.


## Analítica local

- [ ] Abrir Admin → Analítica.
- [ ] Navegar por secciones públicas.
- [ ] Comprobar eventos.
- [ ] Revisar embudo de conversión.
- [ ] Exportar informe.
- [ ] Limpiar eventos si se desea.


## Multiidioma

- [ ] Abrir Admin → Idiomas.
- [ ] Revisar castellano.
- [ ] Revisar catalán.
- [ ] Revisar inglés.
- [ ] Probar selector público.
- [ ] Exportar diccionario JSON.


## Recordatorios y seguimiento

- [ ] Abrir Admin → Recordatorios.
- [ ] Guardar ajustes.
- [ ] Generar recordatorios.
- [ ] Copiar un mensaje de prueba.
- [ ] Marcar como enviado manual.
- [ ] Exportar reporte.


## Tarifas y servicios

- [ ] Abrir Admin → Tarifas.
- [ ] Revisar servicios base.
- [ ] Revisar precios orientativos.
- [ ] Revisar notas responsables.
- [ ] Probar buscador público.
- [ ] Exportar catálogo.


## Talleres e inscripciones

- [ ] Abrir Admin → Talleres.
- [ ] Crear taller de prueba.
- [ ] Probar catálogo público.
- [ ] Enviar solicitud pública.
- [ ] Confirmar solicitud desde Admin.
- [ ] Exportar listado.


## Testimonios y galería

- [ ] Revisar consentimiento.
- [ ] Probar galería.
- [ ] Exportar JSON.
