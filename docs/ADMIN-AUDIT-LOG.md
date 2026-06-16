# Alaya Holistics v2.5 · Admin Audit Log

Esta versión añade auditoría local del panel admin.

## Qué registra

- Logins locales.
- Logins Firebase.
- Cierres de sesión.
- Bloqueos manuales.
- Auto-bloqueos.
- Intentos de acceso sin sesión.
- Cambios de servicios.
- Cambios de eventos.
- Cambios de reservas.
- Cambios de productos.
- Exportaciones e importaciones.
- Pruebas Firebase.
- Sincronizaciones online.

## Dónde verlo

```txt
Panel admin > Auditoría
```

## Acciones disponibles

- Buscar registros.
- Filtrar por tipo.
- Descargar CSV.
- Exportar JSON.
- Vaciar auditoría local.

## Importante

La auditoría se guarda en `localStorage`.

Eso significa:

- Es útil para una primera revisión.
- No es auditoría legal ni inalterable.
- Si se borra el navegador, se pierde.
- Para una auditoría profesional debería guardarse en Firestore con reglas especiales.

## Límite

Se guardan los últimos 500 registros para no cargar demasiado el navegador.

## Próxima mejora recomendada

Auditoría online en Firestore, con reglas que permitan crear logs pero no editarlos ni borrarlos desde el cliente.
