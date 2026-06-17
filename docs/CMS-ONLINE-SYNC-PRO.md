# Alaya Holistics v10.8 · CMS Online Sync Pro

Esta versión prepara la sincronización del CMS entre dispositivos y administradores.

## Modos disponibles

### Local navegador

Los cambios se guardan en el navegador donde se edita.

### Archivo publicado

La web carga:

```txt
/data/cms-public.json
```

Este archivo se genera desde el Publicador CMS y se sube al hosting.

### Firebase preparado

Permite preparar una sincronización real tipo multiadmin usando Firestore.

## Qué añade

- Pestaña Admin “Sync CMS”.
- Estado de sincronización.
- Snapshots locales.
- Descargar backup.
- Restaurar snapshot.
- Configuración de colección/documento Firestore.
- Botón subir CMS a Firebase.
- Botón bajar CMS de Firebase.
- Diagnóstico técnico.

## Importante

La sincronización Firebase requiere configuración real:

- Firebase App.
- Firebase Auth.
- Firestore.
- Reglas de seguridad.
- Administradores autorizados.

Sin Firebase, el sistema funciona en local o mediante `data/cms-public.json`.
