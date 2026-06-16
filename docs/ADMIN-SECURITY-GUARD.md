# Alaya Holistics v2.4 · Admin Security Guard

Esta versión añade una capa de seguridad UX para el panel admin.

## Qué añade

- Comprobación de sesión antes de acciones sensibles.
- Bloqueo manual del panel.
- Auto-bloqueo por inactividad.
- Estado visual de sesión.
- Diferencia clara entre modo local y modo Firebase.

## Importante

El modo local sirve para pruebas, pero no es seguridad real porque una web estática no puede proteger secretos dentro del navegador.

La seguridad real está en:

```txt
Firebase Authentication + Firestore Rules
```

## Auto-bloqueo

El panel se bloquea tras 30 minutos de inactividad.

La inactividad se calcula con:

- clicks
- escritura
- movimiento de ratón
- teclado
- toque en pantalla

## Acciones protegidas

Se protegen acciones como:

- crear/editar/borrar servicios
- crear/editar/borrar eventos
- cambiar estado de reservas
- borrar reservas
- exportar/importar datos
- sincronizar con Firebase
- probar permisos admin
- editar productos
- guardar ajustes

## Recomendación

Para publicar de verdad:

1. Activa Firebase Auth.
2. Crea usuario admin.
3. Cambia `mode: "firebase"`.
4. Configura Firestore Rules.
5. Prueba permisos desde el checker.
6. No dependas del login local para producción.
