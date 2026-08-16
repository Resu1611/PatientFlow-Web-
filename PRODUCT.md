# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños de clínicas estéticas, cirujanos plásticos y med spas en Perú / LatAm. Compradores sofisticados, escépticos del hype de agencias. Llegan a la landing desde outreach directo 1:1 por WhatsApp con Renzo — ya hubo un primer contacto y hacen clic para "ver el sistema". No es tráfico frío. ~90% abre en celular (diseño mobile-first a 390px).

## Product Purpose

Patient Flow Scale instala un sistema de respuesta automática y anti-fuga de pacientes (WhatsApp, <2 minutos, 24/7) para clínicas. Esta landing tiene un único objetivo: **agendar demos de 20 minutos por videollamada**. No vende el retainer, no captura emails, no ofrece descargas. Éxito = demo agendada y calificada.

## Positioning

Prueba verificable en lugar de promesas: el prospecto puede comprobar el tiempo de respuesta él mismo (dashboard en vivo durante la demo — "escríbele tú mismo y mide con tu celular"). Garantía verificable: si el sistema no responde en <2 min 24/7, ese mes no se paga. La descalificación explícita (<10 consultas semanales no califica) es parte del posicionamiento: honestidad que una agencia promedio no puede copiar sin perder ventas.

## Operating Context

- Flujo: outreach por WhatsApp → link → landing en celular → CTA → calendario embebido → demo de 20 min por videollamada.
- El link se comparte por WhatsApp: el preview Open Graph es parte de la primera impresión.
- El calendario de demos es un iframe de GoHighLevel (`CALENDAR_EMBED_URL` en `src/config.ts`).
- El sistema del cliente se configura sobre WhatsApp Business API; los detalles se resuelven en la demo.

## Capabilities and Constraints

- Un solo objetivo de conversión: todos los CTAs anclan a `#agendar`. Sin menú de navegación, sin links externos, sin footer con redes. Cero salidas.
- Las cifras de pérdida son estimaciones basadas en investigación de tiempos de respuesta a leads (Harvard Business Review / InsideSales), nunca datos de clientes de Renzo, y siempre se etiquetan como tal.
- Toda mención a datos de pacientes referencia la Ley 29733 de protección de datos personales del Perú.
- Copy 100% en español, tono peer-professional LatAm: directo, sin hype, sin exceso de emojis.
- Rendimiento: carga <2s en 4G; CTAs con altura mínima 48px en móvil.
- `trackEvent` (en `src/lib/analytics.ts`) es placeholder hasta que exista pixel.
- Sin librerías pesadas: nada de UI kits completos ni frameworks de animación grandes; íconos vía lucide-react o SVG inline.
- Pendientes explícitos (a 2026-08-15): hosting por decidir; pixel por definir; URL de calendario GHL por pegar.

## Brand Commitments

- Nombre: **Patient Flow Scale**. Dominio **patientflowscale.com** comprado (confirmado 2026-08-15); hosting aún por decidir.
- Voz: peer-professional, directa, honesta hasta el punto de descalificar prospectos.
- Identidad visual incumbente documentada en `src/theme.ts` y `src/index.css` (fuente de verdad): verde profundo #0D2318, lima #CEF88D como color de acción, dorado #D4AF37 para detalles premium, Playfair Display + Inter. Todo trabajo nuevo debe sentirse parte del mismo sitio.

## Evidence on Hand

- **La única prueba permitida** es una captura real del dashboard propio de Renzo. A 2026-08-15 **aún no existe**: la landing muestra un placeholder con dimensiones (`public/dashboard-tiempos-respuesta.png` vía `DASHBOARD_SCREENSHOT_URL`). No fabricar sustitutos.
- **No hay clientes cerrados** (confirmado 2026-08-15; etapa de validación por outreach). Por lo tanto no existen testimonios, logos, reseñas ni métricas de clientes — y está prohibido inventarlos, incluso como placeholder.
- Pendientes de Renzo: URL del calendario GHL, captura del dashboard, pixel/tracking, `og-image.jpg` (1200×630) en `public/`.

## Product Principles

1. Cada decisión de diseño y copy se juzga contra: "¿esto acerca al visitante a agendar la demo?". Si no, se elimina.
2. Prueba verificable sobre prueba social: solo mostrar lo que el prospecto puede comprobar por sí mismo; nunca fabricar.
3. Descalificar es conversión: decir explícitamente para quién NO es filtra demos basura y aumenta la confianza. No suavizar.
4. Diseñar para el visitante real: tibio, ya habló con Renzo, abre en celular vía WhatsApp — no para un desconocido de tráfico pagado.
5. La landing es soporte del outreach, no infraestructura autónoma: no expandir alcance (más páginas, blog, nurturing) hasta cerrar el primer cliente.
