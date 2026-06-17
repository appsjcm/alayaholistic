# Alaya Holistics v6.8 · Backup Total y Migración Pro

Esta versión añade un centro de backup total para el panel administrador.

## Nuevo

- Nueva pestaña admin **Backups**.
- Exportación total de claves locales `alaya_`.
- Restauración desde JSON pegado.
- Restauración desde archivo `.json`.
- Validación de backup.
- Descarga de backup completo.
- Copia de backup al portapapeles.
- Inventario de datos locales.
- Copia de inventario.
- Descarga de inventario CSV.
- Estadísticas:
  - número de claves
  - tamaño aproximado
  - última copia
  - estado
- Bloque público de datos portables.
- Sitemap actualizado con `#backup-alaya`.

## Qué incluye

Incluye los datos guardados en `localStorage` con prefijo `alaya_`, por ejemplo:
- ajustes
- reservas
- servicios
- talleres
- productos
- cartas astrales
- contenido público
- novedades
- métricas locales
- preferencias PWA/accesibilidad

## Importante

Los backups pueden contener datos personales, notas internas o información de consultas.
Deben guardarse en un lugar seguro.

## Uso recomendado

1. Entrar en admin.
2. Abrir pestaña **Backups**.
3. Pulsar **Generar backup**.
4. Descargar JSON.
5. Guardar en lugar seguro.
6. Para migrar: abrir la web en otro navegador, pegar/importar JSON y restaurar.
