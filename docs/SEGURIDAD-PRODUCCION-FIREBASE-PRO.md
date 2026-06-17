# Alaya Holistics v12.2 · Seguridad Producción y Firebase Rules Pro

Esta versión añade un centro de seguridad en Admin.

## Qué permite

- Configurar modo de seguridad.
- Definir dominio permitido.
- Definir emails admin autorizados.
- Definir colecciones Firebase.
- Generar reglas Firestore orientativas.
- Copiar reglas Firestore.
- Ejecutar auditoría.
- Exportar plan de seguridad JSON.

## Importante

Las reglas incluidas son una plantilla orientativa.

Antes de producción real:

- activar Firebase Authentication,
- crear usuarios admin,
- revisar Firestore Rules,
- no dejar permisos abiertos,
- probar reservas,
- probar CMS,
- probar clientes CRM,
- revisar backups,
- revisar textos legales.

## Reglas orientativas

La idea base es:

- CMS: lectura pública, escritura admin.
- Reservas: creación pública limitada, lectura/escritura admin.
- Agenda: lectura pública, escritura admin.
- Clientes CRM: solo admin.
- Todo lo demás: denegado.

## Recomendación

No publicar datos reales hasta revisar seguridad en Firebase.
