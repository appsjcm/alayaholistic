# Alaya Holistics v2.6 · Online Audit Trail

Esta versión prepara la auditoría online en Firestore.

## Qué añade

- Colección `alaya_audit_log`.
- Subida manual de auditoría local a Firestore.
- Carga de auditoría online al panel.
- Prueba de escritura de auditoría.
- Marcador visual:
  - `Online`
  - `Local`
- Reglas Firestore para auditoría.

## Botones nuevos

En:

```txt
Panel admin > Auditoría
```

Encontrarás:

- **Subir auditoría online**
- **Cargar auditoría online**
- **Probar auditoría online**

## Seguridad

La colección de auditoría usa reglas:

```txt
allow read: if isAdmin();
allow create: if isAdmin();
allow update: if false;
allow delete: if isAdmin();
```

Esto evita modificar registros ya creados desde el cliente.

## Importante

Para que funcione:

1. Firebase debe estar configurado.
2. Debes iniciar sesión como admin.
3. El email admin debe coincidir con Firestore Rules.
4. Las reglas deben estar publicadas.

## Recomendación profesional

En una fase superior, lo ideal sería:

- no permitir borrar auditoría desde cliente
- crear auditoría con Cloud Functions
- guardar IP/UA si la normativa lo permite
- crear logs inmutables por servidor
