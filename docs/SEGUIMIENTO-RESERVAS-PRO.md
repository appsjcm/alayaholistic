# Alaya Holistics v11.1 · Seguimiento de Reservas Pro

Esta versión añade seguimiento de solicitudes de reserva.

## Para clientes

La web pública incluye la sección:

```txt
Consultar estado de reserva
```

El cliente introduce:

- código de solicitud,
- contacto usado al reservar.

La web muestra:

- estado,
- servicio,
- día/horario preferido,
- propuesta de Alaya si existe,
- respuesta visible de Alaya si existe.

## Para Admin

En “Reservas online” cada solicitud incluye:

- propuesta de día,
- propuesta de hora,
- respuesta visible para cliente,
- nota interna,
- guardar seguimiento,
- copiar respuesta.

## Estados

- Pendiente.
- Confirmada.
- Alternativa propuesta.
- Cancelada.
- Completada.

## Firebase

La consulta intenta buscar primero en local y después en Firestore si Firebase está disponible.

Para producción hay que revisar reglas de seguridad y privacidad.
No es recomendable mostrar datos sensibles en la respuesta pública.
