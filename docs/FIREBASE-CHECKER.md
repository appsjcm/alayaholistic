# Alaya Holistics v2.2 · Firebase Checker

Esta versión añade un comprobador visual dentro del panel admin.

## Dónde está

En la web:

```txt
Panel admin > Online > Comprobador Firebase
```

## Qué revisa

- Si la web está en `mode: "firebase"`.
- Si la API Key parece real.
- Si el Project ID parece real.
- Si el App ID parece real.
- Si Authentication está activado en la configuración.
- Si el email admin ha sido cambiado.
- Si Firestore responde.
- Si el usuario admin tiene permisos de escritura y borrado.

## Botones incluidos

### Revisar configuración

Hace una revisión rápida de `js/backend-config.js`.

### Probar conexión

Intenta conectar con Firestore y leer una colección.

### Probar permisos admin

Intenta crear y borrar un documento de prueba en la colección de ajustes.

Para que esta prueba funcione:

1. Firebase debe estar configurado.
2. Debes haber iniciado sesión como admin.
3. Las reglas de Firestore deben estar publicadas.
4. Tu email admin debe estar en `firebase/firestore.rules`.

### Copiar resumen

Copia un resumen del estado para poder revisarlo o pedir ayuda.

## Errores normales

### Firebase no está configurado

Revisa `js/backend-config.js`.

### Permisos no válidos

Puede significar:

- No has iniciado sesión.
- El email no coincide con el de las reglas.
- Las reglas no se han publicado.
- Authentication no está activado.
- Estás en modo local.

## Recomendación

Antes de publicar oficialmente:

1. Exporta copia JSON.
2. Configura Firebase.
3. Entra con Auth.
4. Pulsa “Probar conexión”.
5. Pulsa “Probar permisos admin”.
6. Haz una reserva de prueba desde la parte pública.
7. Comprueba que aparece en Firestore.
