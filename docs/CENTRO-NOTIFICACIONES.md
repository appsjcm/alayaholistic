# Alaya Holistics v3.5 · Centro de Notificaciones

Esta versión añade un centro interno de notificaciones.

## Nuevo

- Pestaña **Notificaciones** en el panel admin.
- Contador de notificaciones sin leer.
- Aviso cuando entra una nueva reserva.
- Marcar una notificación como leída/no leída.
- Marcar todo como leído.
- Eliminar notificaciones.
- Exportar notificaciones en JSON.
- Permiso opcional para notificaciones del navegador.

## Notificaciones del navegador

Las notificaciones del navegador solo funcionan si:

1. El navegador las soporta.
2. El usuario da permiso.
3. La web está abierta o el navegador permite mostrar el aviso.

No es un sistema push profesional de servidor.

## Dónde se guarda

Las notificaciones se guardan en:

```txt
localStorage
```

## Próxima mejora posible

- Notificaciones online en Firestore.
- Avisos por email automáticos.
- Panel con filtros por tipo.
- Notificaciones push reales con backend.
