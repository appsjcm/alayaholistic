# Alaya Holistics v3.2 · Bloqueos Online

Esta versión sincroniza los bloqueos de agenda con Firestore.

## Nuevo

- Colección `alaya_agenda_blocks`.
- Subir bloqueos online.
- Cargar bloqueos online.
- Probar bloqueos online.
- Marcador visual Local / Online.
- Guardado automático online al crear bloqueo si hay sesión admin Firebase.
- Borrado online al eliminar bloqueo si hay sesión admin Firebase.
- Reglas Firestore para bloqueos.

## Dónde está

```txt
Panel admin > Calendario > Bloqueos de agenda
```

## Requisitos

Para usar bloqueos online:

1. Firebase configurado.
2. Modo `firebase` activado.
3. Sesión admin iniciada.
4. Reglas Firestore publicadas.
5. Email admin correcto en reglas.

## Colección usada

```txt
alaya_agenda_blocks
```

## Reglas

Solo admin puede leer, crear, actualizar y borrar bloqueos.

## Importante

Si trabajas en modo local, los bloqueos siguen funcionando en este navegador.
Si trabajas en modo Firebase, puedes cargarlos y subirlos entre dispositivos.
