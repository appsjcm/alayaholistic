# Alaya Holistics Web v10.4 · Guía para subir a hosting

Este paquete está preparado para hosting estático.

## Qué subir

Sube **todo el contenido de esta carpeta** al directorio público del hosting.

Ejemplos:

- cPanel / Apache: `public_html/`
- Netlify: arrastra esta carpeta o conecta repositorio.
- Vercel: publica la carpeta como proyecto estático.
- GitHub Pages: sube los archivos a la rama configurada.
- Cloudflare Pages: publica como proyecto estático.

## Archivo principal

La web empieza en:

```txt
index.html
```

El acceso administrador está en:

```txt
admin.html
```

## Archivos incluidos para hosting

- `.htaccess` para Apache/cPanel.
- `netlify.toml` para Netlify.
- `vercel.json` para Vercel.
- `_headers` y `_redirects`.
- `.nojekyll` para GitHub Pages.
- `robots.txt`.
- `sitemap.xml`.
- `offline.html`.
- `404.html`.

## Antes de publicar

1. Abrir `index.html` localmente y revisar diseño.
2. Revisar enlaces de contacto.
3. Revisar textos legales:
   - `legal.html`
   - `privacidad.html`
   - `cookies.html`
4. Revisar el acceso admin.
5. Subir toda la carpeta al hosting.
6. Probar en móvil y PC.
7. Probar instalación PWA si aplica.

## Importante sobre Admin

La app es estática. Si el contenido creado desde Admin se guarda en localStorage, se queda en el navegador donde se creó.

Para que el contenido se comparta entre dispositivos o varios administradores, hay que activar Firebase/online sync.

## Seguridad

El botón Admin visible es un acceso cómodo, pero un hosting estático no protege por sí solo herramientas internas si el control está solo en frontend.

Para producción seria:

- usar Firebase Auth / backend real,
- configurar reglas de seguridad,
- proteger datos sensibles,
- revisar textos legales con un profesional.


---

## Admin WordPress CMS Pro

Esta versión incluye un mini CMS tipo WordPress dentro del panel Admin.

Funciona en hosting estático, pero los cambios se guardan en el navegador si no hay Firebase conectado.

Para uso profesional con varios administradores:

1. Activar Firebase/online sync.
2. Configurar autenticación.
3. Configurar reglas de seguridad.
4. Probar en varios dispositivos.


---

## Publicador CMS Hosting Pro

El Admin puede generar un archivo `cms-public.json` con la configuración pública del CMS.

### Publicar cambios del Admin en hosting estático

1. Abrir la web.
2. Entrar al Admin.
3. Editar contenido desde WordPress CMS / Constructor visual.
4. Ir a **Publicador CMS**.
5. Descargar `cms-public.json`.
6. Subirlo al hosting en:

```txt
/data/cms-public.json
```

7. Abrir la web en incógnito para comprobar cambios.

### Nota importante

En hosting estático, el Admin no puede modificar archivos del servidor directamente.
El sistema genera un archivo JSON para que lo subas al hosting.

Para publicación automática real, activa Firebase/online sync o backend.


---

## CMS Online Sync Pro

La pestaña **Sync CMS** permite preparar sincronización entre dispositivos.

### Modos

- **Local navegador:** solo el dispositivo actual.
- **Archivo publicado:** subir `/data/cms-public.json`.
- **Firebase preparado:** para multiadmin real.

### Para multiadmin real

1. Crear proyecto Firebase.
2. Activar Firestore.
3. Activar Authentication.
4. Configurar reglas de seguridad.
5. Configurar `js/backend-config.js`.
6. Usar la pestaña Sync CMS para subir/bajar contenido.

Sin Firebase, la forma recomendada en hosting estático es usar Publicador CMS y subir `data/cms-public.json`.


---

## Firebase Setup Wizard Pro

La pestaña **Firebase Wizard** ayuda a preparar sincronización real.

### Archivos añadidos

- `js/backend-config.example.js`
- `data/firebase-security-rules.example`
- `docs/FIREBASE-SETUP-WIZARD-PRO.md`

### Flujo

1. Crear proyecto Firebase.
2. Activar Authentication.
3. Activar Firestore.
4. Pegar configuración en Admin → Firebase Wizard.
5. Descargar `backend-config.js`.
6. Subirlo a:

```txt
/js/backend-config.js
```

7. Revisar reglas de seguridad.
8. Probar Sync CMS.


---

## Reservas Online Firebase Pro

La web incluye formulario público de reserva online y panel Admin para gestionarlas.

### Sin Firebase

Las solicitudes se guardan en el navegador donde se envían o gestionan.

### Con Firebase

Las solicitudes se envían a Firestore en la colección:

```txt
reservas
```

Puedes cambiarla en `js/backend-config.js`:

```js
firestore: {
  reservationsCollection: "reservas"
}
```

### Seguridad recomendada

- Permitir crear reservas desde público.
- Permitir leer/editar/borrar solo a admins.
- Evitar datos sensibles en mensajes.
- Revisar reglas Firestore antes de producción.


---

## Seguimiento de Reservas Pro

La web incluye consulta pública de estado por código/contacto.

### Admin

En Reservas online puedes añadir:

- respuesta visible,
- nota interna,
- propuesta de fecha,
- propuesta de hora.

### Privacidad

No escribas datos sensibles en la respuesta visible.
Para producción con Firebase, revisa reglas de seguridad.


---

## Agenda y Disponibilidad Online Pro

La web incluye disponibilidad pública y panel Admin de agenda.

### Sin Firebase

Los horarios se guardan en el navegador del administrador.

### Con Firebase

Preparado para colección/documento:

```txt
alayaAgenda/public
```

### Recordatorio

Los horarios son orientativos. La cita solo queda confirmada cuando Admin confirma la solicitud.


---

## Mensajes y Notificaciones Pro

La pestaña Admin **Mensajes** prepara respuestas para WhatsApp/email.

### Importante

La web estática no envía mensajes automáticamente.
Para envío automático real se necesita backend o servicio externo seguro.

### Uso

1. Seleccionar reserva.
2. Elegir plantilla.
3. Copiar mensaje o abrir WhatsApp/email.
4. Enviar manualmente.


---

## Clientes CRM e Historial Pro

La pestaña Admin **Clientes** añade un mini CRM interno.

### Uso

- Crear clientes manualmente.
- Actualizar clientes desde reservas.
- Guardar etiquetas y preferencias generales.
- Consultar historial.
- Exportar JSON.

### Privacidad

No guardes datos sensibles.
Si usas Firebase, revisa reglas de seguridad para que solo admins puedan leer/escribir clientes.


---

## Dashboard Negocio Pro

La pestaña Admin **Dashboard Pro** muestra métricas internas de reservas, clientes, agenda y mensajes.

### Exportación

Puede exportar un informe JSON para revisión interna.

### Nota

Las métricas dependen de los datos disponibles en el navegador o sincronizados con Firebase.


---

## Backup y Restauración Pro

La pestaña Admin **Backup** permite exportar e importar datos del Admin.

### Antes de actualizar

1. Descargar backup total.
2. Guardar ZIP actual.
3. Subir nueva versión.
4. Restaurar backup si cambias de dispositivo.

### Privacidad

Los backups pueden contener datos de clientes.
No subirlos a sitios públicos ni compartirlos sin protección.


---

## Legal, Privacidad y Consentimientos Pro

La pestaña Admin **Legal Pro** permite editar textos de privacidad, consentimiento y avisos de confianza.

### Recomendación

Antes de publicar con datos reales, revisar:

- aviso legal,
- privacidad,
- cookies/almacenamiento local,
- consentimiento de reservas,
- reglas Firebase.

Esta base es orientativa y no sustituye revisión profesional.


---

## Centro Lanzamiento y QA Pro

La pestaña Admin **Lanzamiento QA** permite revisar la web antes de publicar.

### Antes de lanzar

1. Descargar backup total.
2. Revisar legal.
3. Probar reserva online.
4. Probar agenda.
5. Ejecutar QA.
6. Exportar reporte.
7. Activar modo lanzamiento.

El modo público puede ser borrador, lanzamiento o mantenimiento.


---

## SEO, Rendimiento y Accesibilidad Pro

La pestaña Admin **SEO UX** permite revisar SEO técnico, PWA, formularios, enlaces y accesibilidad.

### Antes de publicar

1. Ejecutar SEO UX.
2. Revisar sugerencias.
3. Exportar informe.
4. Ejecutar Lanzamiento QA.


---

## Release Candidate Final Pro

La pestaña Admin **Release Final** genera informe final del proyecto.

### Flujo de publicación

1. Descargar backup total.
2. Ejecutar Lanzamiento QA.
3. Ejecutar SEO UX.
4. Exportar paquete final desde Release Final.
5. Subir archivos al hosting.

### Archivos añadidos

- `RELEASE-NOTES.md`
- `FINAL-CHECKLIST.md`
- `data/release-candidate-schema.json`
- `docs/RELEASE-CANDIDATE-FINAL-PRO.md`


---

## Publicación Guiada y Dominio Pro

La pestaña Admin **Publicación** ayuda a preparar el hosting.

### Plataformas

- GitHub Pages.
- Netlify.
- Vercel.
- Hosting manual.

### Archivos extra

- `robots.template.txt`
- `sitemap.template.xml`
- `data/publicacion-guiada-schema.json`
- `docs/PUBLICACION-GUIADA-DOMINIO-PRO.md`

### Flujo

1. Elegir plataforma.
2. Indicar URL/dominio.
3. Generar plan.
4. Copiar robots/sitemap si hace falta.
5. Subir ZIP descomprimido al hosting.


---

## Seguridad Producción y Firebase Rules Pro

La pestaña Admin **Seguridad Pro** prepara una auditoría y reglas Firestore orientativas.

### Antes de activar Firebase en producción

1. Configurar Firebase Authentication.
2. Crear usuarios admin.
3. Revisar emails admin autorizados.
4. Copiar reglas Firestore.
5. Probar reglas.
6. Confirmar que clientes CRM no son públicos.
7. Descargar backup total.

### Archivos añadidos

- `firestore.rules.template`
- `data/seguridad-produccion-schema.json`
- `docs/SEGURIDAD-PRODUCCION-FIREBASE-PRO.md`


---

## Primer Arranque y Datos Demo Pro

La pestaña Admin **Primer Arranque** permite probar la web sin datos reales.

### Flujo

1. Completar datos básicos.
2. Cargar demo.
3. Probar módulos.
4. Borrar demo.
5. Descargar backup.
6. Usar datos reales.

### Archivos añadidos

- `data/primer-arranque-schema.json`
- `docs/PRIMER-ARRANQUE-DATOS-DEMO-PRO.md`


---

## Mantenimiento, Soporte e Incidencias Pro

La pestaña Admin **Mantenimiento** permite registrar incidencias y tareas después de publicar.

### Uso

1. Registrar incidencia.
2. Marcar prioridad.
3. Cambiar estado.
4. Exportar reporte.
5. Descargar backup antes de hacer cambios.

### Archivos añadidos

- `data/mantenimiento-soporte-schema.json`
- `docs/MANTENIMIENTO-SOPORTE-INCIDENCIAS-PRO.md`


---

## Marketing, Redes y Difusión Pro

La pestaña Admin **Marketing** permite crear campañas y textos para difusión.

### Canales

- Instagram.
- WhatsApp.
- Email/newsletter.
- Google Business.
- Web.

### Nota

El sistema no envía mensajes automáticamente. Solo prepara textos para copiar.


---

## Analítica Local y Conversión Pro

La pestaña Admin **Analítica** mide eventos locales sin herramientas externas.

### Incluye

- visitas locales,
- clics,
- secciones vistas,
- intención de reserva,
- intención de contacto,
- embudo de conversión,
- exportación de informe.

### Privacidad

No usa servicios externos ni cookies de terceros.
No debe guardar datos personales.


---

## Multiidioma y Traducciones Pro

La pestaña Admin **Idiomas** permite gestionar textos en castellano, catalán e inglés.

### Recomendación

Exporta el diccionario JSON tras revisar las traducciones.
Si se necesita una web 100% traducida, ampliar las claves del diccionario por secciones.


---

## Recordatorios y Seguimiento Pro

La pestaña Admin **Recordatorios** prepara mensajes de seguimiento manual.

### Nota

No envía WhatsApp ni email automáticamente. Solo genera textos para copiar y registrar el estado.


---

## Tarifas, Packs y Servicios Pro

La pestaña Admin **Tarifas** permite gestionar servicios y packs públicos.

### Recomendación

Revisar textos y precios antes de publicar. Los precios deben ser orientativos y confirmarse manualmente.


---

## Talleres, Cursos e Inscripciones Pro

La pestaña Admin **Talleres** permite publicar actividades y gestionar solicitudes.

### Recomendación

Las solicitudes no confirman plaza automáticamente. Revisar disponibilidad y responder manualmente.


## Testimonios, Reseñas y Galería Pro

Publicar solo reseñas con consentimiento y sin promesas de resultados.
