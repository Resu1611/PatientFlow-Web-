/**
 * Integración del embed inline de Cal.com.
 *
 * Por qué está escrito a mano y no con `@calcom/embed-react`: el paquete
 * oficial es un envoltorio de ~30 líneas sobre exactamente este mismo loader.
 * CLAUDE.md prohíbe meter librerías por comodidad, y aquí la comodidad sería
 * una dependencia más en el árbol para no escribir una función. El loader de
 * abajo es el snippet que da Cal en su panel, tipado y hecho idempotente.
 *
 * Lo que sí aporta este camino frente a un `<iframe src>` pelado — que era la
 * otra opción y funciona igual de bien para *mostrar* el calendario:
 *
 *   - `linkReady` / `linkFailed`: saber de verdad si el widget cargó o murió,
 *     en vez de adivinarlo con un timeout ciego. En el navegador embebido de
 *     WhatsApp, que es de donde llega el 90% del tráfico, esa diferencia es la
 *     que decide si la visitante ve una salida o una caja en blanco.
 *   - `bookingSuccessful`: el único evento de esta página que significa dinero.
 *     Con el iframe pelado la conversión real es invisible; lo máximo que se
 *     puede registrar es que el embed pintó, que no es lo mismo que una demo
 *     agendada.
 *   - Auto-resize por postMessage, así que la altura del mes no se corta en
 *     390px ni deja un hueco muerto en escritorio.
 */

/** Firma de la API global que instala el loader de Cal. */
type CalApi = {
  (...args: unknown[]): void;
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: unknown[];
  config?: { forwardQueryParams?: boolean };
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const EMBED_JS = 'https://app.cal.com/embed/embed.js';
const CAL_ORIGIN = 'https://app.cal.com';

/**
 * Instala el shim de Cal si no está ya. Es el IIFE del snippet oficial: crea
 * una cola (`q`) que acepta llamadas antes de que `embed.js` termine de bajar,
 * y las reproduce cuando llega. Llamarlo dos veces no hace nada la segunda vez
 * — importa, porque `<StrictMode>` monta cada efecto dos veces en desarrollo.
 */
function ensureCalLoader(): CalApi {
  const w = window;
  if (w.Cal) return w.Cal;

  /** Encola una llamada hasta que `embed.js` esté listo para reproducirla.
   *  Guarda arrays, no objetos `arguments`: el propio snippet de Cal mezcla
   *  ambos (`p(cal, ["initNamespace", namespace])`), así que su reproductor
   *  trata la cola como array-like en los dos casos. */
  const push = (target: { q?: unknown[] }, args: unknown[]) => {
    target.q = target.q || [];
    target.q.push(args);
  };

  const cal: CalApi = function (...args: unknown[]) {
    const self = w.Cal!;

    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      const script = document.createElement('script');
      script.src = EMBED_JS;
      document.head.appendChild(script);
      self.loaded = true;
    }

    if (args[0] === 'init') {
      const namespace = args[1];
      const api: CalApi = function (...nsArgs: unknown[]) {
        push(api, nsArgs);
      } as CalApi;
      api.q = api.q || [];

      if (typeof namespace === 'string') {
        self.ns![namespace] = self.ns![namespace] || api;
        push(self.ns![namespace], args);
        push(self, ['initNamespace', namespace]);
      } else {
        push(self, args);
      }
      return;
    }

    push(self, args);
  } as CalApi;

  w.Cal = cal;
  return cal;
}

export interface CalInlineConfig {
  /** Id del `<div>` contenedor donde Cal inyecta su iframe. */
  elementId: string;
  /** `usuario/evento`, p. ej. `renzo-suito-6ipafm/20min`. */
  calLink: string;
  /** Espacio de nombres del embed. Basta con que sea estable y único. */
  namespace: string;
  /** Variables CSS de Cal, para que el widget use la paleta de la marca. */
  cssVars?: Record<string, string>;
}

export interface CalCallbacks {
  /** `linkReady` — el widget pintó. */
  onReady?: () => void;
  /** `linkFailed` — Cal reporta que el enlace no cargó. */
  onFailed?: () => void;
  /** La reserva quedó confirmada. El único evento que significa dinero. */
  onBooked?: (detail: unknown) => void;
}

/**
 * Monta el calendario inline dentro de `elementId` y suscribe los tres eventos
 * que le importan a la página. Devuelve la función de limpieza.
 *
 * Se llama desde un `useEffect`; los callbacks se leen por referencia para que
 * cambiarlos no vuelva a montar el iframe.
 */
export function mountCalInline(
  { elementId, calLink, namespace, cssVars = {} }: CalInlineConfig,
  callbacks: CalCallbacks,
): () => void {
  const Cal = ensureCalLoader();

  Cal('init', namespace, { origin: CAL_ORIGIN });

  const ns = window.Cal?.ns?.[namespace];
  if (!ns) return () => {};

  // Conserva utm_* y demás parámetros de la URL al pasar al iframe: es lo que
  // permite atribuir una demo al mensaje de WhatsApp que la originó.
  window.Cal!.config = window.Cal!.config || {};
  window.Cal!.config.forwardQueryParams = true;

  ns('inline', {
    elementOrSelector: `#${elementId}`,
    calLink,
    config: {
      layout: 'month_view',
      theme: 'dark',
      // En 390px la rejilla del mes deja las horas fuera de pantalla; esta
      // vista lleva directo a los huecos disponibles.
      useSlotsViewOnSmallScreen: true,
    },
  });

  ns('ui', {
    theme: 'dark',
    hideEventTypeDetails: false,
    layout: 'month_view',
    cssVarsPerTheme: { dark: cssVars, light: cssVars },
  });

  const onReady = () => callbacks.onReady?.();
  const onFailed = () => callbacks.onFailed?.();

  /**
   * La reserva se detecta por comodín en vez de suscribirse a
   * `bookingSuccessful` por nombre, a propósito.
   *
   * `linkReady` y `linkFailed` están dentro de `embed.js` y se pueden
   * verificar. `bookingSuccessful` no: lo emite la app del calendario desde
   * dentro del iframe, y `on()` es un `addEventListener` pelado sin lista de
   * acciones válidas — o sea que un nombre equivocado no da error, simplemente
   * no dispara nunca. Sería la peor forma de fallar: el evento que mide dinero,
   * muerto en silencio y sin nada en pantalla que lo delate.
   *
   * El comodín `*` recibe todas las acciones, así que se comprueba el nombre
   * aquí y se aceptan las dos variantes que usa Cal.
   */
  const onAnyAction = (e: Event) => {
    const detail = (e as CustomEvent).detail as { type?: string } | undefined;
    const action = detail?.type;
    if (!action) return;

    if (import.meta.env.DEV) {
      console.debug('[Cal]', action, detail);
    }

    if (action === 'bookingSuccessful' || action === 'bookingSuccessfulV2') {
      callbacks.onBooked?.(detail);
    }
  };

  ns('on', { action: 'linkReady', callback: onReady });
  ns('on', { action: 'linkFailed', callback: onFailed });
  ns('on', { action: '*', callback: onAnyAction });

  return () => {
    ns('off', { action: 'linkReady', callback: onReady });
    ns('off', { action: 'linkFailed', callback: onFailed });
    ns('off', { action: '*', callback: onAnyAction });
    // Cal no desmonta su propio iframe: sin esto, el doble montaje de
    // StrictMode deja dos calendarios apilados en desarrollo.
    document.getElementById(elementId)?.replaceChildren();
  };
}
