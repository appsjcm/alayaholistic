# Alaya Holistics v3.4 · Role Guard UX

Esta versión mejora la experiencia del sistema multi-admin.

## Qué añade

- Matriz visual de permisos.
- Botones bloqueados visualmente según el rol.
- Mensaje de por qué una acción está bloqueada.
- Badge de rol más útil.
- Resumen de permisos por rol.
- Protección visual para evitar errores antes de pulsar.

## Roles

### Admin

Puede hacer todo.

### Editor

Puede gestionar la actividad diaria:

- reservas
- calendario
- bloqueos
- servicios
- eventos
- productos
- notas internas

### Solo lectura

Puede consultar información, pero no modificar datos.

## Importante

Role Guard UX es una mejora visual y práctica.

La seguridad real sigue estando en:

```txt
Firebase Authentication + Firestore Rules
```

Por eso las reglas Firestore de v3.3 siguen siendo esenciales.

## Cómo probar

1. Configura un email admin, editor y viewer.
2. Inicia sesión con cada usuario.
3. Abre el panel.
4. Mira la matriz de permisos.
5. Comprueba qué botones quedan activos o bloqueados.
