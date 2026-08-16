/**
 * Configuración de la landing.
 *
 * ⚠️ RENZO: aquí es donde pegas tu URL del calendario de GoHighLevel.
 */

/**
 * URL del embed del calendario de GHL.
 *
 * Pégala entre las comillas. En GoHighLevel:
 *   Calendars → (tu calendario) → Share / Embed → copia la URL del `src`
 *   del iframe (no el `<iframe>` completo, solo la URL).
 *
 * Debe verse parecido a:
 *   https://api.leadconnectorhq.com/widget/booking/XXXXXXXXXXXXXXXX
 *
 * Mientras esté vacía, la sección de agendado muestra un aviso en su lugar
 * (visible solo para ti en desarrollo) en vez de un iframe roto.
 */
export const CALENDAR_EMBED_URL = '';

/**
 * Salida de emergencia del calendario: la misma reserva, abierta en pestaña
 * nueva en vez de dentro del iframe.
 *
 * Por qué existe: el 90% del tráfico abre el link dentro del navegador
 * embebido de WhatsApp, y ahí los embeds de terceros son la falla silenciosa
 * más común que hay (partición de almacenamiento en WKWebView, bloqueadores,
 * DNS corporativo). Si el iframe no pinta, sin esto la página se queda con
 * CERO formas de agendar: no hay teléfono, no hay link, no hay nada.
 *
 * No es una "salida" de las que prohíbe CLAUDE.md: es la misma conversión por
 * otra ruta, y solo se muestra cuando el iframe ya falló.
 *
 * ⚠️ RENZO: si la dejas vacía se usa `CALENDAR_EMBED_URL`, que en GHL funciona
 * igual abierta directamente. Solo llénala si tu calendario tiene una URL
 * pública distinta a la del embed.
 */
export const CALENDAR_DIRECT_URL = '';

/**
 * Ruta de la captura real del dashboard (prueba verificable).
 *
 * ⚠️ RENZO: sube tu captura a `public/` con este nombre y aparecerá sola.
 * Proporción recomendada: 16:10, mínimo 1200×750px para que se vea nítida
 * en pantallas retina.
 *
 * Mientras el archivo no exista, se muestra el placeholder con dimensiones.
 */
export const DASHBOARD_SCREENSHOT_URL = '/dashboard-tiempos-respuesta.png';

/** Id del ancla de la sección de agendado. Todo CTA apunta aquí. */
export const BOOKING_ANCHOR_ID = 'agendar';
