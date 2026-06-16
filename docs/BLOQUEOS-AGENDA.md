# Alaya Holistics v3.1 · Bloqueos de Agenda

Esta versión añade bloqueos manuales al calendario.

## Nuevo

- Bloquear un día completo.
- Bloquear una hora concreta.
- Añadir motivo del bloqueo.
- Ver bloqueos en calendario.
- Ver bloqueos en el día seleccionado.
- Las franjas bloqueadas no se pueden reservar.
- Los días bloqueados se bloquean en el formulario público.

## Dónde está

```txt
Panel admin > Calendario > Bloqueos de agenda
```

## Cómo bloquear todo un día

1. Selecciona fecha.
2. Deja hora vacía.
3. Escribe motivo.
4. Guarda.

## Cómo bloquear una franja

1. Selecciona fecha.
2. Selecciona hora.
3. Escribe motivo.
4. Guarda.

## Ejemplos

- Formación
- Vacaciones
- Descanso
- Cita externa
- Festivo local
- Evento privado

## Importante

Los bloqueos se guardan en `localStorage` en esta versión.

Para una gestión multi-dispositivo completa, una mejora posterior sería sincronizar bloqueos en Firestore.
