# Alaya Holistics v7.7 · Acceso Admin Separado Pro

Esta versión refuerza la separación entre clientes y administración.

## Cambios

- Se elimina el botón **Admin** visible de la navegación pública.
- Se crea `admin.html` como entrada separada.
- `admin.html` está marcado con `noindex,nofollow`.
- `robots.txt` bloquea `/admin.html`.
- El panel interno puede abrirse con:
  - `admin.html`
  - `index.html#admin`
- Se oculta el texto público de credenciales iniciales.
- La web principal queda orientada a clientes.

## Uso recomendado

Para clientes:
- Usar `index.html`.
- Ver servicios, herbolario, talleres, reservas y contacto.

Para administración:
- Entrar desde `admin.html`.
- O abrir directamente `index.html#admin`.

## Importante

Esto separa la experiencia visual y de navegación. Para seguridad real en producción,
usar Firebase Auth y reglas de Firestore configuradas correctamente.
