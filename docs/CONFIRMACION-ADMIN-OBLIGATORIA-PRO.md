# Alaya Holistics v8.4 · Confirmación Admin Obligatoria Pro

Esta versión refuerza el flujo correcto de reservas:

**El cliente solicita. El administrador confirma.**

## Cambios

- Las reservas enviadas desde la web quedan como **Pendiente de confirmación**.
- El cliente ve claramente que la solicitud no está confirmada todavía.
- El panel admin muestra un aviso de confirmación obligatoria.
- El admin debe pulsar **Confirmar reserva**.
- Al confirmar, se guarda:
  - estado confirmado
  - fecha de confirmación
  - confirmación por administrador
- El mensaje de confirmación se copia para enviarlo al cliente.
- La consulta pública de reserva muestra estado público claro.

## Flujo recomendado

1. Cliente envía solicitud.
2. Admin recibe la reserva.
3. Admin revisa disponibilidad.
4. Admin pulsa **Confirmar reserva**.
5. Admin envía mensaje de confirmación al cliente.
6. La reserva pasa a confirmada.

## Importante

Una solicitud recibida no es una cita confirmada hasta que el administrador la confirma.
