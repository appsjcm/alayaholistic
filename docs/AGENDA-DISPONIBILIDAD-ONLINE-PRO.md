# Alaya Holistics v11.2 · Agenda y Disponibilidad Online Pro

Esta versión añade agenda y disponibilidad online.

## Web pública

La sección “Disponibilidad orientativa” muestra horarios publicados desde Admin.

El cliente puede pulsar:

```txt
Solicitar este horario
```

Ese botón rellena la reserva online con servicio, fecha y hora.

## Admin

La pestaña “Agenda online” permite:

- crear horarios,
- editar horarios,
- duplicar horarios,
- publicar u ocultar,
- marcar como completo,
- borrar,
- crear bloqueos de fechas,
- exportar agenda,
- sincronizar con Firebase si está disponible.

## Estados

- Disponible.
- Plazas limitadas.
- Completo.
- Oculto.

## Importante

La disponibilidad es orientativa.
La reserva no queda confirmada hasta que Alaya la confirme manualmente.

## Firebase

Preparado para guardar agenda en:

```txt
collection: alayaAgenda
document: public
```

Revisar reglas de seguridad antes de producción.
