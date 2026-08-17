/**
 * Configuración de la landing.
 *
 * ⚠️ RENZO: aquí es donde conectas tu calendario de Cal.com.
 */

/**
 * Tu enlace de Cal.com, en formato `usuario/evento`. Sin `https://cal.com/`
 * delante: solo la parte final.
 *
 * Apunta al evento de 20 minutos, que es lo que promete el copy de toda la
 * página (títulos, CTAs, meta description y Open Graph). Confirmado 2026-08-16.
 *
 * ⚠️ RENZO: si algún día cambias la duración de la demo, esto y el copy tienen
 * que moverse juntos — son 9 sitios, incluidos los meta tags de index.html. En
 * desarrollo la consola te avisa si el slug deja de decir `20min`.
 */
export const CAL_LINK = 'renzo-suito-6ipafm/20min';

/**
 * Espacio de nombres del embed. Es un identificador interno de Cal, no algo
 * que la visitante vea: da igual su valor mientras sea estable. Deliberadamente
 * NO es el slug del evento — así cambiar `CAL_LINK` de `15min` a `20min` no
 * obliga a tocar nada más.
 */
export const CAL_NAMESPACE = 'demo';

/**
 * Salida de emergencia: la misma reserva, abierta en pestaña nueva en vez de
 * dentro del embed.
 *
 * Por qué existe: el 90% del tráfico abre el link dentro del navegador
 * embebido de WhatsApp, y ahí los embeds de terceros son la falla silenciosa
 * más común que hay (partición de almacenamiento en WKWebView, bloqueadores,
 * DNS corporativo). Si el widget no pinta, sin esto la página se queda con
 * CERO formas de agendar: no hay teléfono, no hay link, no hay nada.
 *
 * No es una "salida" de las que prohíbe CLAUDE.md: es la misma conversión por
 * otra ruta, y solo se muestra cuando el embed ya falló.
 *
 * Se deriva de `CAL_LINK`, así que no hay que mantenerla a mano.
 */
export const CALENDAR_DIRECT_URL = `https://cal.com/${CAL_LINK}`;

/**
 * Paleta de la marca inyectada dentro del iframe de Cal.
 *
 * `cal-brand` es la variable documentada y la que de verdad importa: pinta el
 * día seleccionado y el botón de confirmar. El resto son mejor-esfuerzo para
 * que el widget no se lea como una caja gris pegada dentro de una tarjeta
 * verde; si Cal renombra alguna, se ignora sin romper nada.
 *
 * Los valores salen de src/theme.ts — no inventes hex aquí.
 */
export const CAL_CSS_VARS = {
  'cal-brand': '#CEF88D', // accent.main — el lima de todo CTA primario
  'cal-bg': '#0F2B1C', // bg.card — el mismo verde de la tarjeta que lo enmarca
  'cal-bg-emphasis': '#1A4029', // primary.main — hover de los días
  'cal-bg-subtle': '#254D33', // primary.light
} as const;

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

/**
 * Ruta de una captura de pantalla REAL de WhatsApp mostrando al sistema
 * respondiendo (puede ser una prueba tuya, escribiéndole tú mismo al número
 * del sistema). Misma categoría de evidencia que el dashboard — verificable,
 * no fabricada — nunca una foto de "cliente feliz" (regla 1 de CLAUDE.md).
 *
 * ⚠️ RENZO: sube la captura a `public/` con este nombre. Recorte vertical de
 * la app de WhatsApp con el mensaje entrante y la respuesta automática, hora
 * visible. Recomendado ~1000×1300px.
 *
 * Mientras el archivo no exista, se muestra el placeholder con dimensiones.
 */
export const SYSTEM_PHOTO_URL = '/sistema-respondiendo.png';

/** Id del ancla de la sección de agendado. Todo CTA apunta aquí. */
export const BOOKING_ANCHOR_ID = 'agendar';

/** Id del contenedor donde Cal inyecta su iframe. */
export const CAL_ELEMENT_ID = 'cal-inline-demo';
