# CLAUDE.md — Patient Flow Scale · Landing Page

Este archivo define cómo trabajar en este repositorio. Léelo al inicio de cada sesión.

## Qué es este proyecto

Landing page de alta conversión para **Patient Flow Scale**, un servicio que instala un sistema de respuesta automática y anti-fuga de pacientes (WhatsApp, <2 min, 24/7) para clínicas estéticas, cirujanos plásticos y med spas en Perú / LatAm.

**El único objetivo de esta página es agendar demos de 20 minutos.** No vende el retainer, no captura emails para nurturing, no ofrece descargas. Cada decisión de diseño y copy se juzga contra: "¿esto acerca al visitante a agendar la demo?". Si no, se elimina.

El tráfico llega principalmente desde **outreach directo por WhatsApp en celular**, no de tráfico frío pagado. El visitante típico ya tuvo un primer contacto con Renzo y hace clic en el link para ver el sistema. Diseña para ese contexto, no para un desconocido.

## Stack y estructura

- El sitio actual es una app React exportada de Google AI Studio.
- **Antes de escribir cualquier componente nuevo, lee el código existente y extrae la identidad visual** (colores hex, tipografías, pesos, border-radius, espaciados, estilo de botones, sombras). Documenta esos tokens en `theme.ts` o en la config de Tailwind y úsalos en toda la landing. La página nueva debe sentirse parte del mismo sitio, nunca una plantilla genérica.
- No introduzcas librerías pesadas. Sin frameworks de animación grandes, sin UI kits completos. Si necesitas un ícono, usa SVG inline o lucide-react.
- Mobile-first estricto: diseña primero a 390px. El 90% del tráfico es celular vía WhatsApp.

## Reglas de contenido (no negociables)

1. **Cero prueba social falsa.** Nunca generes testimonios, nombres de clientes, logos, reseñas ni métricas de clientes — ni siquiera como placeholder de relleno. La única prueba permitida es una captura real del dashboard propio de Renzo (deja el espacio con dimensiones, él sube la imagen).
2. **Cifras etiquetadas honestamente.** Los números de pérdida son estimaciones basadas en investigación de tiempo de respuesta de leads (Harvard Business Review / InsideSales), no datos de clientes de Renzo. No inventes estadísticas con aire propietario.
3. **Tono peer-professional para LatAm.** Directo, sin hype, sin emojis en exceso, sin copy agresivo estilo direct-response gringo. El comprador es un dueño de clínica sofisticado.
4. **Descalificar es parte de la conversión.** La página dice explícitamente para quién NO es (clínicas con <10 consultas semanales). Esto filtra demos basura y aumenta confianza. No suavices esta sección.
5. **Legal:** cualquier mención a datos de pacientes referencia la Ley 29733 de protección de datos personales del Perú.
6. Todo el copy va en español.

## Reglas técnicas (obligatorias en cada build)

- `<title>` y `meta description` correctos en español. Nunca dejar el título por defecto de AI Studio.
- Open Graph completo (`og:title`, `og:description`, `og:image`) — el link se comparte por WhatsApp y el preview debe verse profesional.
- Un solo objetivo de conversión: todos los CTAs anclan a la sección del calendario. Sin menú de navegación, sin links externos, sin footer con redes. Cero salidas.
- Botones CTA: altura mínima 48px en móvil, estados hover/active claros.
- Carga <2s en 4G. Imágenes optimizadas.
- El calendario de demos se integra vía iframe de GoHighLevel. Deja una constante `CALENDAR_EMBED_URL` para que Renzo pegue su URL. Nunca hardcodees una URL inventada.
- Deja una función `trackEvent` como placeholder en: clic CTA hero, uso de la calculadora, clic CTA final, carga del embed de calendario.
- **Verifica que el hosting permita controlar el `<head>` (meta tags) e insertar el iframe.** Si el export de AI Studio no lo permite, avísalo explícitamente y recomienda migrar a Vercel/Netlify antes de continuar.

## Cómo entregar

Al terminar cualquier tarea, lista los archivos creados/modificados y di exactamente dónde Renzo debe pegar: (1) su URL del calendario GHL, (2) la captura del dashboard, (3) su pixel/tracking. No des por terminada la landing sin esos tres puntos señalados.

## Sesgo del proyecto a corregir

Renzo tiende a construir infraestructura antes de validar demanda. Esta landing es soporte para outreach, no un generador de demos autónomo. No propongas expandir el alcance (más páginas, blog, sistema de nurturing, plantillas reutilizables) hasta que haya cerrado el primer cliente. Si una tarea empieza a crecer hacia eso, señálalo.
