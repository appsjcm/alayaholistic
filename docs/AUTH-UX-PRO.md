# Alaya Holistics v2.3 · Auth UX Pro

Esta versión mejora la experiencia de autenticación.

## Nuevas mejoras

- Botón de recuperación de contraseña Firebase.
- Botón de prueba de reserva pública online.
- Checklist visual de seguridad Auth.
- Mejores mensajes de sesión y errores.
- Guía más clara para preparar Firebase Authentication.

---

## Recuperar contraseña

Para que funcione:

1. Firebase debe estar configurado en `mode: "firebase"`.
2. Authentication > Email/Password debe estar activado.
3. El email debe existir como usuario de Firebase Auth.

En el panel:

1. Pulsa Admin.
2. Escribe el email.
3. Pulsa **Recuperar contraseña Firebase**.

Firebase enviará un email de recuperación.

---

## Probar reserva pública

En:

```txt
Panel admin > Online > Firebase Authentication
```

Pulsa:

```txt
Probar reserva pública
```

La web intentará crear una reserva de prueba en Firestore sin usar sesión admin.

Esto sirve para comprobar que tus reglas permiten:

```txt
allow create
```

en:

```txt
alaya_reservas
```

---

## Recomendación antes de publicar

Haz estas pruebas:

1. Revisar configuración.
2. Probar conexión.
3. Iniciar sesión como admin.
4. Probar permisos admin.
5. Probar reserva pública.
6. Crear una reserva real desde la web.
7. Confirmar que aparece en el panel.
