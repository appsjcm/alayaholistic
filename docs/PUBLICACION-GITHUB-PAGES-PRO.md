# Alaya Holistics v6.9 · Publicación GitHub Pages Pro

Esta versión prepara mejor la web para publicarse como sitio estático en GitHub Pages.

## Nuevo

- Archivo `.nojekyll`.
- Página `404.html` personalizada.
- Panel en admin dentro de **Lanzamiento**:
  - comprobar protocolo
  - comprobar dominio
  - comprobar archivos base
  - estado de publicación
- Botón **Copiar pasos GitHub Pages**.
- Botón **Copiar checklist final**.
- Sección pública de publicación.
- Sitemap actualizado con `#publicar-alaya`.
- Guía de publicación.

## Cómo publicar

1. Descomprime el ZIP.
2. Sube el contenido de la carpeta al repositorio, no el ZIP.
3. `index.html` debe quedar en la raíz.
4. En GitHub:
   - Settings
   - Pages
   - Deploy from branch
   - Branch `main`
   - Folder `/root`
5. Espera unos minutos.
6. Abre la URL de GitHub Pages.

## Archivos importantes

- `index.html`
- `css/`
- `js/`
- `assets/`
- `manifest.webmanifest`
- `sw.js`
- `sitemap.xml`
- `robots.txt`
- `404.html`
- `.nojekyll`

## Si no se ven los cambios

- Recarga con Ctrl+F5.
- Prueba ventana de incógnito.
- Limpia caché PWA desde admin > Lanzamiento.
- Espera unos minutos a que GitHub Pages actualice.
