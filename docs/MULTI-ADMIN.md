# Alaya Holistics v3.3 · Multi-admin

Esta versión añade roles de usuario.

## Roles

### Admin

Control total:

- ajustes
- Firebase
- auditoría
- sincronización
- reservas
- servicios
- eventos
- productos
- bloqueos

### Editor

Puede gestionar:

- servicios
- eventos
- productos
- reservas
- calendario
- bloqueos

No debería tocar:

- ajustes críticos
- reglas Firebase
- auditoría online
- importación/exportación completa

### Solo lectura

Puede consultar:

- dashboard
- reservas
- calendario
- estado del panel

No puede modificar datos.

## Archivos a configurar

### `js/backend-config.js`

```js
adminEmails: [
  "admin@alayaholistics.com"
],
editorEmails: [
  "editor@alayaholistics.com"
],
viewerEmails: [
  "viewer@alayaholistics.com"
]
```

### `firebase/firestore.rules`

Debes poner los mismos emails en:

- `isAdmin()`
- `isEditor()`
- `isViewer()`

## Importante

La protección visual del panel ayuda a la experiencia, pero la seguridad real está en Firestore Rules.

Por eso los emails deben estar bien puestos en las reglas.
