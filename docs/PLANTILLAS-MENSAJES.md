# Alaya Holistics v3.7 · Plantillas de Mensajes

Esta versión permite editar los textos usados en reservas.

## Nuevo

En:

```txt
Panel admin > Ajustes > Plantillas de mensajes
```

puedes editar:

- confirmación de reserva
- cancelación de reserva
- recordatorio
- mensaje de nueva reserva para el administrador

## Variables disponibles

Puedes usar estas variables:

```txt
{negocio}
{codigo}
{tipo}
{servicio}
{fecha}
{hora}
{nombre}
{telefono}
{email}
{mensaje}
{disponibilidad}
```

## Ejemplo

```txt
Hola {nombre}, tu reserva en {negocio} está confirmada.

Código: {codigo}
Servicio: {servicio}
Fecha: {fecha}
Hora: {hora}
```

## Botones de vista previa

La vista previa permite comprobar el texto antes de guardarlo.

## Botón restaurar

Restaura las plantillas originales por si algo queda mal.

## Corrección incluida

También se corrige el aviso duplicado de notificación al crear reserva de evento.
