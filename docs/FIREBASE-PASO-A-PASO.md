# Alaya Holistics · Guía Firebase paso a paso

Esta versión funciona en modo local sin configurar nada.

El objetivo de esta carpeta es dejar la web preparada para una futura conexión online.

## Qué hay ahora

- `js/backend-config.js`: archivo donde se pondrán las claves públicas del proyecto Firebase.
- `js/cloud-adapter.js`: adaptador preparado para conectar la app con un proveedor online.
- `firebase/firestore.rules`: reglas iniciales de ejemplo.
- `firebase/firebase.json`: configuración de hosting de ejemplo.

## Pasos para activar Firebase más adelante

1. Crear un proyecto en Firebase.
2. Crear una app web dentro del proyecto.
3. Copiar la configuración web de Firebase.
4. Abrir:

```txt
js/backend-config.js
```

5. Cambiar:

```js
mode: "local"
```

por:

```js
mode: "firebase"
```

6. Rellenar:

```js
firebaseConfig: {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

## Importante

Esta v1.3 todavía no sincroniza Firestore automáticamente. Está preparada con estructura, panel, configuración y adaptador.

Para una v1.4 se puede implementar:

- Login real con Firebase Authentication.
- Guardado de reservas en Firestore.
- Lectura de eventos/productos/servicios desde Firestore.
- Panel admin real protegido.
- Reglas de seguridad definitivas.

## Reglas de seguridad

El archivo `firebase/firestore.rules` es solo una base inicial. No publiques una web real sin revisarlas.


---

# Añadido en v1.4

La versión v1.4 incluye sincronización manual con Firestore cuando Firebase está configurado:

- **Subir datos locales**: sube servicios, eventos, productos, reservas y ajustes a Firestore.
- **Cargar datos online**: trae datos de Firestore y los guarda también en localStorage.
- **Sincronizar ahora**: sube y después carga.

## Importante sobre login

La v1.4 prepara Firestore y sincronización, pero todavía no incluye login real con Firebase Authentication.

Para una web pública definitiva, la siguiente versión debe añadir:

- Firebase Authentication.
- Login admin con email/contraseña.
- Reglas para que solo el admin pueda leer/editar reservas.
- Protección real del panel admin.

## Colecciones usadas

```txt
alaya_settings
alaya_services
alaya_eventos
alaya_productos
alaya_reservas
```

## Recomendación

Antes de activar modo online:

1. Exporta una copia JSON desde el panel.
2. Configura Firebase.
3. Abre la pestaña Online.
4. Pulsa "Subir datos locales".
5. Comprueba en Firestore que aparecen las colecciones.
