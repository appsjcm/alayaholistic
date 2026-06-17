# Alaya Holistics v11.0 · Reservas Online Firebase Pro

Esta versión añade un flujo de reservas online preparado para Firebase.

## Cliente

La web pública incluye una sección “Reserva online” con:

- nombre,
- contacto,
- servicio,
- día preferido,
- horario preferido,
- mensaje,
- consentimiento de contacto.

Al enviar, se genera un código de solicitud.

## Admin

La pestaña “Reservas online” permite:

- ver solicitudes,
- filtrar por estado,
- buscar por código, nombre o contacto,
- cambiar estado,
- copiar mensaje para cliente,
- exportar JSON,
- sincronizar con Firebase si está configurado.

## Estados

- Pendiente.
- Confirmada.
- Alternativa propuesta.
- Cancelada.
- Completada.

## Firebase

Si Firebase está configurado y Firestore disponible, las solicitudes se envían a la colección:

```txt
reservas
```

La colección puede cambiarse en `window.ALAYA_BACKEND_CONFIG.firestore.reservationsCollection`.

## Seguridad

La reserva online no confirma automáticamente una cita.
El administrador debe revisar y confirmar manualmente.

Para producción:

- permitir creación pública de solicitudes,
- limitar lectura/edición/borrado a administradores,
- evitar datos sensibles en mensajes,
- revisar privacidad y textos legales.
