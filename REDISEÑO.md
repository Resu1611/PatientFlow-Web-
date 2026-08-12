# Tarea: Rediseño de la landing page

Construye una nueva landing page de alta conversión cuyo único objetivo es agendar demos de 20 minutos, manteniendo la estética visual del sitio actual. Sigue en todo momento las reglas de `CLAUDE.md`.

## Paso 1 — Extraer la identidad visual existente

Antes de escribir código nuevo, lee el código actual del sitio (componentes, config de Tailwind/CSS, estilos inline) y extrae: paleta de colores exacta (hex), tipografías y pesos, border-radius, espaciados, estilo de botones y sombras. Documéntalos en `theme.ts` o `tailwind.config` y úsalos en TODA la landing. Debe sentirse como el mismo sitio, no una plantilla.

## Paso 2 — Construir la landing (una sola página) con estas secciones en este orden

### 1. Hero
- H1: **"Tu clínica pierde entre S/8,000 y S/25,000 al mes en pacientes que escribieron y nadie respondió a tiempo"**
- Subtítulo: "Sistema de respuesta automática en menos de 2 minutos, 24/7, por WhatsApp. Verificable en tu dashboard."
- CTA primario: **"Agendar demo de 20 minutos"** (ancla a la sección de calendario)
- Sin menú, sin links externos, sin footer social. Cero salidas.

### 2. Calculadora de pacientes perdidos (React interactivo)
- Inputs: leads semanales (slider 5–100), ticket promedio (slider S/300–S/5,000)
- Lógica: `pacientesPerdidosMes = leadsSemanales * 4.33 * 0.45`; `dineroPerdidoMes = pacientesPerdidosMes * ticketPromedio * 0.30`
- Output grande, en color de alerta: "Estás perdiendo aproximadamente S/X al mes"
- CTA secundario debajo: "Recuperar estos pacientes — Agendar demo"
- Si leads < 10: "Con menos de 10 consultas semanales, tu prioridad es generar tráfico, no velocidad de respuesta. Este sistema aún no es para ti."

### 3. Cómo funciona (3 pasos)
1. "Un paciente te escribe por WhatsApp, Instagram o tu web"
2. "El sistema responde en menos de 2 minutos, resuelve dudas frecuentes y califica al paciente"
3. "El paciente llega agendado directamente a tu calendario"

### 4. Prueba verificable
- Título: "Sin testimonios inventados. Datos reales del sistema."
- Placeholder con dimensiones para la captura real del dashboard (Renzo la sube)
- Texto: "Estos son los tiempos de respuesta medidos de mi propio sistema en operación. En la demo lo verás funcionando en vivo: le escribes tú mismo y mides el tiempo de respuesta con tu celular."
- NO generes testimonios, nombres, logos ni métricas de clientes. Solo el espacio para la captura real.

### 5. Garantía (tarjeta destacada)
- "Garantía verificable: respuesta en menos de 2 minutos, 24/7. Lo compruebas tú mismo en el dashboard. Si el sistema no cumple, ese mes no lo pagas."

### 6. Para quién es / para quién no es (dos columnas)
- **ES PARA TI SI:** recibes 10+ consultas semanales / inviertes en publicidad o tienes flujo orgánico constante / pierdes pacientes por responder tarde o fuera de horario
- **NO ES PARA TI SI:** recibes menos de 10 consultas semanales / no tienes WhatsApp como canal principal / buscas que te generemos los leads (eso no lo hace este sistema)

### 7. Qué pasa en la demo (3 bullets, tono consultivo)
- "20 minutos por videollamada"
- "Ves el sistema respondiendo en vivo y calculamos tu pérdida real con tus números"
- "Te digo con honestidad si tu clínica califica o no. Si no califica, te lo digo y no te hago perder tiempo."

### 8. FAQ (acordeón, 5 preguntas)
- "¿Esto reemplaza a mi recepcionista?" — No. Atiende el primer contacto 24/7 y agenda; tu equipo maneja el resto.
- "¿Qué pasa con consultas médicas delicadas?" — El sistema no da consejo médico. Deriva esas conversaciones a tu equipo de inmediato.
- "¿Tengo que cambiar mi número de WhatsApp?" — Se configura sobre WhatsApp Business API; lo vemos en la demo según tu caso.
- "¿Cuánto cuesta?" — Depende de tu volumen de consultas. En la demo te doy el precio exacto sin vueltas.
- "¿Y los datos de mis pacientes?" — El contrato incluye cláusula de tratamiento de datos conforme a la Ley 29733.

### 9. Sección final de agendado
- Título: "Agenda tu demo de 20 minutos"
- Embed del calendario de GHL vía iframe, usando la constante `CALENDAR_EMBED_URL`
- Si el embed no permite campos de calificación: texto "Al agendar te haré 3 preguntas rápidas para confirmar que la demo tiene sentido para tu clínica"
- P.D. final: "Cada semana sin sistema de respuesta, los números de la calculadora de arriba se repiten. La demo es gratis; los pacientes perdidos no."

## Paso 3 — Requisitos técnicos
Aplica todos los de `CLAUDE.md` (título, meta description, Open Graph, mobile-first 390px, <2s en 4G, CTAs anclados al calendario, `trackEvent`, verificación de control del `<head>` y del iframe).

`<title>` objetivo: "Patient Flow Scale | Recupera los pacientes que tu clínica pierde por responder tarde"

## Paso 4 — Al terminar
Lista archivos creados/modificados y señala dónde pegar: (1) URL del calendario GHL, (2) captura del dashboard, (3) pixel/tracking.
