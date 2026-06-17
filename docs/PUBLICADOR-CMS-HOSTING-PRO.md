# Alaya Holistics v10.7 · Publicador CMS Hosting Pro

Esta versión añade un publicador de CMS para hosting estático.

## Qué hace

El Admin puede generar un archivo:

```txt
data/cms-public.json
```

Este archivo contiene:

- identidad de la web,
- portada,
- colores,
- menú,
- bloques públicos,
- SEO,
- aviso global.

## Cómo publicar cambios del Admin

1. Entra al panel Admin.
2. Edita la web desde WordPress CMS / Constructor visual.
3. Entra en “Publicador CMS”.
4. Descarga `cms-public.json`.
5. Sube ese archivo al hosting en:

```txt
/data/cms-public.json
```

6. Abre la web en incógnito y comprueba los cambios.

## Importante

En hosting estático, el navegador no puede escribir directamente en el servidor.
Por eso el Admin genera un JSON para subirlo.

Para publicación automática real hace falta:

- Firebase,
- Supabase,
- backend propio,
- o un CMS con base de datos.
