# Alaya Holistics v10.9 · Firebase Setup Wizard Pro

Esta versión añade un asistente para preparar Firebase.

## Qué permite

- Pegar configuración de Firebase.
- Definir emails administradores.
- Configurar colección/documento del CMS.
- Generar `backend-config.js`.
- Copiar o descargar la configuración.
- Generar reglas Firestore orientativas.
- Diagnosticar si Firebase/Auth/Firestore están detectados.

## Pasos recomendados

1. Crear proyecto Firebase.
2. Añadir una app web.
3. Copiar la configuración del SDK.
4. Activar Authentication con email/contraseña.
5. Crear usuarios administradores.
6. Activar Firestore.
7. Pegar emails admin en el asistente.
8. Copiar reglas Firestore y revisarlas.
9. Descargar `backend-config.js`.
10. Subirlo a `/js/backend-config.js` en el hosting.
11. Probar Sync CMS.

## Seguridad

Las reglas incluidas son orientativas.
Antes de usar datos reales:

- revisa reglas de Firestore,
- limita escrituras a administradores,
- evita datos sensibles en contenido público,
- prueba con usuarios no administradores,
- conserva copias de seguridad.
