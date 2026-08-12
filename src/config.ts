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
