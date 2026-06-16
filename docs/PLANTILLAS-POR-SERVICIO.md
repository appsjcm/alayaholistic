# Alaya Holistics v3.8 · Plantillas por Servicio

Esta versión permite crear mensajes diferentes para cada servicio.

## Nuevo

En:

```txt
Panel admin > Ajustes > Plantillas por servicio
```

puedes seleccionar un servicio y crear textos propios para:

- confirmación
- cancelación
- recordatorio

## Cómo funciona

Si un servicio tiene plantilla personalizada, se usa esa plantilla.

Si un campo está vacío, se usa la plantilla general.

Ejemplo:

- Tarot puede tener un mensaje más místico.
- Reiki puede tener un mensaje más tranquilo.
- Talleres puede incluir información de llegada.
- Herbolario puede tener un texto más práctico.

## Variables disponibles

Son las mismas que en las plantillas generales:

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

## Botones

- **Guardar plantilla del servicio**
- **Vista previa servicio**
- **Borrar plantilla del servicio**

## Importante

Las plantillas por servicio se guardan dentro de los ajustes locales.

Si usas Firebase, sincroniza los ajustes para mantenerlas entre dispositivos.
