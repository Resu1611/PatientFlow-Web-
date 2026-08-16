/**
 * Placeholder de tracking.
 *
 * ⚠️ RENZO: aquí conectas tu pixel. Hoy solo hace `console.debug` en
 * desarrollo y no envía nada a ningún lado.
 *
 * Para conectar Meta Pixel / GA4 / GHL, reemplaza el cuerpo de `trackEvent`:
 *
 *   // Meta Pixel
 *   window.fbq?.('trackCustom', name, payload);
 *
 *   // GA4
 *   window.gtag?.('event', name, payload);
 *
 * El snippet del pixel va en `index.html`, dentro del `<head>`.
 */

export type TrackableEvent =
  | 'cta_hero_click'
  | 'calculadora_usada'
  | 'cta_final_click'
  | 'calendario_embed_cargado'
  | 'calendario_embed_fallido'
  /**
   * El único evento de esta página que significa dinero: Cal confirma que la
   * reserva quedó hecha. Los demás miden intención; este mide resultado.
   *
   * ⚠️ RENZO: si algún día conectas solo un evento a tu pixel, que sea este.
   * Es el que hay que marcar como conversión en Meta / GA4.
   */
  | 'demo_agendada';

export function trackEvent(
  name: TrackableEvent,
  payload: Record<string, unknown> = {},
): void {
  if (import.meta.env.DEV) {
    console.debug('[trackEvent]', name, payload);
  }
  // Conecta aquí tu pixel/analytics.
}

/**
 * Devuelve una función que solo dispara `trackEvent` la primera vez.
 * La calculadora la usa para no emitir un evento por cada píxel del slider.
 */
export function once(
  name: TrackableEvent,
): (payload?: Record<string, unknown>) => void {
  let fired = false;
  return (payload = {}) => {
    if (fired) return;
    fired = true;
    trackEvent(name, payload);
  };
}
