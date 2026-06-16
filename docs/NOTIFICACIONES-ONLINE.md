# Alaya Holistics v3.6 · Notificaciones Online

Esta versión prepara el centro de notificaciones para Firestore.

## Nuevo

- Colección `alaya_notifications`.
- Subir notificaciones online.
- Cargar notificaciones online.
- Probar notificaciones online.
- Marcador visual Local / Online.
- Sincronización automática al crear notificación si hay sesión Firebase válida.
- Borrado online al eliminar notificación si hay sesión Firebase válida.
- Reglas Firestore para notificaciones.

## Dónde está

```txt
Panel admin > Notificaciones
```

## Requisitos

Para usar notificaciones online:

1. Firebase configurado.
2. Modo `firebase` activado.
3. Sesión con rol válido.
4. Reglas Firestore publicadas.

## Permisos

- Viewer: leer notificaciones.
- Editor/Admin: crear, actualizar y borrar notificaciones.

## Importante

Esto sigue siendo un centro de notificaciones dentro de la web.

No sustituye notificaciones push profesionales de servidor.
