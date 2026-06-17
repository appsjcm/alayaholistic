# Alaya Holistics v5.3 · Astral Cloud Sync Pro

Esta versión prepara las cartas astrales para sincronización online con Firebase/Firestore.

## Nuevo

- Panel **Astral Cloud Sync Pro** dentro de Cartas astrales.
- Estado online de cartas astrales.
- Botón **Subir cartas online**.
- Botón **Cargar cartas online**.
- Botón **Probar Astral Cloud**.
- Botón **Marcar como local**.
- Indicadores visuales:
  - Online
  - Local
- Sincronización automática al guardar carta, si Firebase admin está activo.
- Borrado online al borrar carta local, si hay sesión admin.
- Colección nueva en Firebase:
  - `alaya_astral_charts`
- Reglas Firestore actualizadas:
  - solo admin puede leer/escribir cartas astrales.

## Configuración

En `js/backend-config.js` se añade:

```js
astralCharts: "alaya_astral_charts"
```

## Privacidad

Las cartas astrales pueden contener datos natales, contacto, notas privadas y seguimiento.
Por eso las reglas dejan acceso solo a admin.
