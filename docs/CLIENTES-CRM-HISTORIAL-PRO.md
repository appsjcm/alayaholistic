# Alaya Holistics v11.4 · Clientes CRM e Historial Pro

Esta versión añade un mini CRM interno en Admin.

## Qué permite

- Crear clientes manualmente.
- Actualizar clientes desde reservas online.
- Guardar contacto.
- Añadir etiquetas.
- Guardar preferencias generales.
- Guardar notas internas.
- Ver historial de reservas vinculadas.
- Copiar resumen del cliente.
- Exportar clientes JSON.
- Sincronizar con Firebase si está configurado.

## Privacidad

Las notas internas y preferencias no aparecen en la web pública.

No guardes datos sensibles. Usa el CRM para organización básica, seguimiento administrativo y preferencias generales.

## Firebase

Preparado para guardar en:

```txt
collection: alayaClients
document: crm
```

Antes de producción hay que revisar reglas de seguridad.
