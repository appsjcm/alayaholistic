# Alaya Holistics v10.4 · Hosting Ready Pro

Esta versión deja el proyecto preparado para subir a hosting.

## Añadido

- `.htaccess`
- `netlify.toml`
- `vercel.json`
- `_headers`
- `_redirects`
- `.nojekyll`
- `robots.txt`
- `sitemap.xml`
- `HOSTING.md`
- `DEPLOY-CHECKLIST.md`
- `hosting-config.json`

## Hosting recomendado

Funciona como web estática/PWA en:

- Apache / cPanel
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Hostings estáticos

## Subida rápida cPanel

1. Entrar al administrador de archivos.
2. Abrir `public_html`.
3. Subir todos los archivos del proyecto.
4. Extraer si se sube en ZIP.
5. Abrir el dominio.

## Nota sobre datos

El contenido del Gestor Admin usa localStorage si no hay Firebase conectado.
Para que el contenido sea compartido entre dispositivos, activar sincronización online.
