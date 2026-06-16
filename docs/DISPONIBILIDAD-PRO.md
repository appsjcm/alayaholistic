# Alaya Holistics v2.8 · Disponibilidad Pro

Esta versión añade control de disponibilidad para reservas de servicios.

## Nuevo

- Días abiertos configurables.
- Horario de apertura configurable.
- Fechas cerradas.
- Mensaje visual de disponibilidad en el formulario público.
- Bloqueo de reservas fuera de disponibilidad.
- Resumen de disponibilidad en el panel admin.

## Días abiertos

En:

```txt
Panel admin > Ajustes > Disponibilidad de reservas
```

Usa números:

```txt
Lunes=1
Martes=2
Miércoles=3
Jueves=4
Viernes=5
Sábado=6
Domingo=0
```

Ejemplo de lunes a viernes:

```txt
1,2,3,4,5
```

## Fechas cerradas

Una fecha por línea:

```txt
2026-08-15
2026-12-25
```

## Qué bloquea

La web bloquea:

- fechas cerradas
- días no abiertos
- horas fuera del horario configurado

## Importante

Esta disponibilidad es una validación frontal para mejorar el flujo.

Para una agenda profesional total, la siguiente mejora sería guardar franjas ocupadas en Firestore y bloquear horas ya reservadas.
