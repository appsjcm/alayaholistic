# Alaya Holistics v2.1 · Firebase Authentication

Esta versión añade una capa de autenticación más profesional.

## Qué consigue

- Login admin con email/contraseña de Firebase Authentication.
- Lista de emails admin en `js/backend-config.js`.
- Reglas Firestore que permiten editar solo al email admin.
- Reservas públicas: los visitantes pueden crear reservas.
- Reservas privadas: solo el admin puede leer, editar o borrar reservas.

---

## 1. Crear el usuario admin

En Firebase Console:

1. Entra en tu proyecto.
2. Ve a **Authentication**.
3. Pulsa **Get started**.
4. Activa **Email/Password**.
5. Crea un usuario, por ejemplo:

```txt
admin@alayaholistics.com
```

---

## 2. Configurar la web

Abre:

```txt
js/backend-config.js
```

Cambia:

```js
mode: "local"
```

por:

```js
mode: "firebase"
```

Pega tus claves reales de Firebase en `firebaseConfig`.

Después cambia el email admin:

```js
adminEmails: [
  "admin@alayaholistics.com"
]
```

---

## 3. Configurar reglas Firestore

Abre:

```txt
firebase/firestore.rules
```

Cambia este email:

```txt
admin@alayaholistics.com
```

por el email admin real.

Luego publica las reglas en Firebase.

---

## 4. Cómo entrar al panel

En la web:

1. Pulsa **Admin**.
2. En usuario escribe el email admin.
3. En contraseña escribe la contraseña de Firebase Authentication.
4. Entra al panel.

---

## Importante

La seguridad real está en Firestore Rules.

Aunque el HTML del panel exista en una web estática, las reglas impiden que alguien no autorizado lea o edite datos online.

---

## Siguiente mejora posible

Una v2.2 podría añadir:

- Asistente visual de configuración Firebase.
- Verificador de reglas.
- Botón de prueba de permisos.
- Recuperar contraseña con Firebase.
- Confirmación automática por email.
