# Alaya Holistics v2.9 · Agenda Inteligente

Esta versión añade franjas libres y bloqueo de horas ocupadas.

## Nuevo

- Generación automática de franjas según horario.
- Botones de horas disponibles en el formulario público.
- Bloqueo de horas completas.
- Configuración de duración de cita.
- Configuración de reservas máximas por franja.
- Ocupación visible tipo `0/1`, `1/2`, etc.

## Cómo funciona

En el panel admin puedes configurar:

```txt
Días abiertos
Hora inicio
Hora fin
Duración de cita
Reservas por franja
Fechas cerradas
```

La web genera las franjas automáticamente.

Ejemplo:

```txt
Horario: 10:00 - 20:00
Duración: 60 minutos
Reservas por franja: 1
```

La web muestra:

```txt
10:00, 11:00, 12:00...
```

Si una franja ya tiene el máximo de reservas, aparece bloqueada.

## Estados

Las reservas canceladas no ocupan franja.

Las reservas pendientes y confirmadas sí ocupan franja.

## Importante

Esta agenda inteligente funciona con los datos que hay cargados en el navegador o en Firestore si sincronizas.

Para una versión todavía más profesional se puede añadir vista calendario semanal.
