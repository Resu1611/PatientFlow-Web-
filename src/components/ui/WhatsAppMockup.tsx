import React, { useEffect, useRef, useState } from 'react';
import { Check, Clock } from 'lucide-react';

/**
 * Firma visual del hero: dramatiza la tesis de la página (responder rápido
 * vs. no responder) con el propio material del producto — una conversación
 * de WhatsApp — en vez de una estadística genérica.
 *
 * ── La escena: un mensaje, dos destinos ──
 *
 * Los dos paneles corren sobre UN solo reloj, y esa es toda la idea. Antes
 * cada uno iba por su lado: el izquierdo era un mensaje fijo con un contador
 * que arrancaba en 4h12m porque sí, y el derecho hacía su propio bucle de 7s
 * que además BORRABA la respuesta en cada vuelta — el panel que demuestra que
 * el producto funciona pasaba la mitad del tiempo vacío. Nunca se leían como
 * el mismo suceso.
 *
 * Ahora el mismo mensaje del mismo paciente cae en los dos paneles en el
 * mismo instante y a partir de ahí se bifurca:
 *
 *   t=0.0s   el mensaje aparece en ambos lados
 *   t=0.6s   la derecha empieza a escribir
 *   t=1.9s   la derecha responde — 47 segundos, cerrado
 *   t→6.4s   la izquierda corre una noche comprimida: el contador sube con
 *            ease hasta 4h 12min. Eso es lo que hay que ver: mientras un lado
 *            ya está resuelto, en el otro pasa la noche entera.
 *   t→10.3s  la izquierda sigue contando en tiempo real. La respuesta de la
 *            derecha NO se borra: se queda ahí todo el rato.
 *   t→11.0s  las burbujas se desvanecen y entra el siguiente paciente.
 *
 * ── Coste ──
 *
 * El contador se escribe directo al DOM por ref, no por estado de React: a
 * 60fps durante un bucle infinito, un setState por fotograma serían ~60
 * renders/s del hero para siempre. Con esto React solo re-renderiza en los
 * cambios de fase, que son cuatro por vuelta. El bucle además se detiene solo
 * cuando el mockup sale de pantalla o la pestaña pasa a segundo plano.
 *
 * Decorativo: el mismo mensaje ya está en el H1/subtítulo en texto
 * accesible, así que todo el bloque se oculta a lectores de pantalla.
 */

const MENSAJE_ENTRANTE =
  'Hola! Vi el anuncio de rinoplastia, ¿tienen citas esta semana?';
const MENSAJE_RESPUESTA =
  'Hola! Sí, tenemos disponibilidad jueves y viernes. ¿Prefieres mañana o tarde?';

/** Dónde aterriza el contador de la izquierda: 4h 12min. */
const SEGUNDOS_NOCHE = 4 * 3600 + 12 * 60;

/** Marcas de la escena, en ms desde el inicio de cada vuelta. */
const ESCENA = {
  ESCRIBIENDO: 600,
  RESPONDIDO: 1900,
  NOCHE_FIN: 6400,
  SALIDA: 10300,
  TOTAL: 11000,
} as const;

/**
 * Compás −1: la entrada.
 *
 * Los paneles entran como marco vacío y la escena espera a que terminen. Esto
 * no es decoración de arranque, arregla algo real: antes el bucle empezaba en
 * el montaje, así que quien llegaba con 4G lento aterrizaba a mitad de ciclo,
 * veía "4h 12min" y nunca presenció la llegada de un mensaje — o sea, se
 * perdía justo el momento que sostiene el argumento. Ahora todo el mundo
 * entra por el compás 0.
 */
const ENTRADA = {
  PANEL_IZQ: 220,
  PANEL_DER: 300,
  /** Cuándo cae el primer mensaje: después de que el marco ya está puesto. */
  ESCENA_INICIO: 900,
  /** Al volver a mirar el mockup, el marco ya está puesto. */
  REENTRADA: 250,
} as const;

function formatearElapsed(totalSegundos: number): string {
  const seg = Math.max(0, Math.floor(totalSegundos));
  const h = Math.floor(seg / 3600);
  const m = Math.floor((seg % 3600) / 60);
  const s = seg % 60;
  return `${h}h ${String(m).padStart(2, '0')}min ${String(s).padStart(2, '0')}s`;
}

const easeInOutCubic = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

/** Segundos que marca el reloj de la izquierda en el instante `t` del ciclo. */
function segundosEn(t: number): number {
  if (t <= ESCENA.RESPONDIDO) return t / 1000;

  if (t <= ESCENA.NOCHE_FIN) {
    const desde = ESCENA.RESPONDIDO / 1000;
    const p = (t - ESCENA.RESPONDIDO) / (ESCENA.NOCHE_FIN - ESCENA.RESPONDIDO);
    return desde + (SEGUNDOS_NOCHE - desde) * easeInOutCubic(p);
  }

  return SEGUNDOS_NOCHE + (t - ESCENA.NOCHE_FIN) / 1000;
}

const TEXTO_RELOJ = (seg: number) => `${formatearElapsed(seg)} sin responder`;

/**
 * La consulta se lee en el inicializador, no dentro del efecto.
 *
 * Con `useState(false)` + efecto, el primer render siempre decía "no hay
 * preferencia", y la fase — que se inicializa una sola vez a partir de este
 * valor — se quedaba clavada en 'espera' para siempre: el panel que demuestra
 * que el producto responde no respondía nunca. Es decir, con reduced-motion
 * activo la página mostraba su propia tesis fallando.
 */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

type FaseRespuesta = 'espera' | 'escribiendo' | 'respondido';

export default function WhatsAppMockup() {
  const reducedMotion = usePrefersReducedMotion();

  const [fase, setFase] = useState<FaseRespuesta>('espera');
  const [saliendo, setSaliendo] = useState(false);
  const [ciclo, setCiclo] = useState(0);
  const [activo, setActivo] = useState(true);
  /**
   * false hasta que la entrada termina: es lo que retiene el primer mensaje.
   * Con reduced-motion arranca en true ya en el primer render — si esperara al
   * efecto, la conversación se pintaría oculta un fotograma y luego saltaría a
   * la vista, que es un parpadeo de contenido justo para quien pidió menos
   * movimiento.
   */
  const [escenaLista, setEscenaLista] = useState(reducedMotion);

  const raizRef = useRef<HTMLDivElement>(null);
  const relojRef = useRef<HTMLSpanElement>(null);
  const yaEntroRef = useRef(false);

  // Sin animación, el estado estático tiene que ser el RESUELTO: es el que
  // demuestra la tesis. La izquierda se queda en la cifra dramática.
  useEffect(() => {
    if (!reducedMotion) return;
    setFase('respondido');
    setSaliendo(false);
    setEscenaLista(true);
    if (relojRef.current) {
      relojRef.current.textContent = TEXTO_RELOJ(SEGUNDOS_NOCHE);
    }
  }, [reducedMotion]);

  // Compás −1 → compás 0: el marco ya está puesto, entra el primer mensaje.
  //
  // Cuelga de `activo`, no del montaje, y ese detalle importa en móvil: ahí el
  // mockup nace bajo el pliegue, así que si el compás 0 se disparara al montar,
  // el reloj ya estaría corriendo cuando el visitante llega y al arrancar la
  // escena saltaría de "4h 12min" a "0h 00min" delante de sus ojos. Atado a la
  // visibilidad, la conversación se apaga al salir de pantalla y vuelve a
  // entrar por el compás 0, siempre.
  useEffect(() => {
    if (reducedMotion) return;
    if (!activo) {
      setEscenaLista(false);
      return;
    }
    // La espera larga es para la primera vez, que es la que cuenta como
    // entrada. Al volver a mirar, el marco ya está: esperar de nuevo un
    // segundo entero sería tiempo muerto.
    const espera = yaEntroRef.current ? ENTRADA.REENTRADA : ENTRADA.ESCENA_INICIO;
    const id = setTimeout(() => {
      yaEntroRef.current = true;
      setEscenaLista(true);
    }, espera);
    return () => clearTimeout(id);
  }, [reducedMotion, activo]);

  // Un bucle de ambiente no debe seguir corriendo fuera de pantalla ni con la
  // pestaña en segundo plano.
  useEffect(() => {
    if (reducedMotion) return;
    const nodo = raizRef.current;
    if (!nodo) return;

    let visible = true;
    let enPantalla = true;
    const sincronizar = () => setActivo(visible && enPantalla);

    // El margen negativo es lo que hace que esto funcione en móvil. Con el
    // umbral en 0 bastaba que asomara el borde superior del mockup — y en
    // 390px asoma justo al pie de la primera pantalla, mientras el visitante
    // todavía está leyendo el titular. La escena arrancaba ahí, invisible, y
    // cuando por fin bajaba se encontraba "3h 11min" a media vuelta: otra vez
    // sin haber visto llegar el mensaje, que es exactamente lo que la entrada
    // venía a arreglar. Recortando el root un 15% arriba y abajo, la escena
    // espera a que el mockup esté de verdad en pantalla.
    const io = new IntersectionObserver(
      ([entry]) => {
        enPantalla = entry.isIntersecting;
        sincronizar();
      },
      { rootMargin: '-15% 0px -15% 0px' },
    );
    io.observe(nodo);

    const alCambiarVisibilidad = () => {
      visible = document.visibilityState === 'visible';
      sincronizar();
    };
    document.addEventListener('visibilitychange', alCambiarVisibilidad);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
    };
  }, [reducedMotion]);

  // El reloj de la escena. Reanudar reinicia la vuelta desde el principio: es
  // un bucle, y verlo desde el mensaje que llega es justo lo que hay que ver.
  useEffect(() => {
    if (reducedMotion || !activo || !escenaLista) return;

    let frame = 0;
    let inicio: number | null = null;
    let vueltaPrevia = 0;

    const paso = (ahora: number) => {
      if (inicio === null) inicio = ahora;
      const transcurrido = ahora - inicio;
      const t = transcurrido % ESCENA.TOTAL;
      const vuelta = Math.floor(transcurrido / ESCENA.TOTAL);

      if (relojRef.current) {
        relojRef.current.textContent = TEXTO_RELOJ(segundosEn(t));
      }

      const siguienteFase: FaseRespuesta =
        t < ESCENA.ESCRIBIENDO
          ? 'espera'
          : t < ESCENA.RESPONDIDO
            ? 'escribiendo'
            : 'respondido';

      setFase((previa) => (previa === siguienteFase ? previa : siguienteFase));

      const enSalida = t >= ESCENA.SALIDA;
      setSaliendo((previa) => (previa === enSalida ? previa : enSalida));

      if (vuelta !== vueltaPrevia) {
        vueltaPrevia = vuelta;
        setCiclo(vuelta);
      }

      frame = requestAnimationFrame(paso);
    };

    frame = requestAnimationFrame(paso);
    return () => {
      cancelAnimationFrame(frame);
      // Si el bucle se corta durante el desvanecido de salida, las burbujas
      // quedarían en opacidad 0 hasta que alguien vuelva a mirar. Al pausar,
      // la escena se deja en su estado de reposo.
      setSaliendo(false);
    };
  }, [reducedMotion, activo, escenaLista]);

  // Las burbujas se desvanecen juntas al final de la vuelta y vuelven juntas:
  // el siguiente paciente entra en los dos paneles a la vez.
  // Antes de que la escena arranque están en 0: el primer mensaje ENTRA, no
  // estaba ya puesto. Esa aparición es el compás 0 y el enganche entre la
  // entrada del hero y el bucle.
  const conversacion = [
    'transition-opacity duration-700 ease-out motion-reduce:transition-none',
    escenaLista && !saliendo ? 'opacity-100' : 'opacity-0',
  ].join(' ');

  return (
    <div
      ref={raizRef}
      aria-hidden="true"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-w-md mx-auto lg:max-w-sm lg:mt-2"
    >
      {/* ── Panel: sin sistema ── */}
      {/* Los dos paneles entran con 80ms de diferencia: se leen como dos cosas
          distintas. Después el mensaje cae en ambos a la vez y a partir de ahí
          son el mismo suceso. */}
      <div
        className="pf-hero-panel-in glass-card rounded-2xl p-4 lg:p-5 border-red-400/20 flex flex-col gap-3"
        style={{ ['--pf-hero-delay' as string]: `${ENTRADA.PANEL_IZQ}ms` }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-red-300/80">
          Sin sistema de respuesta
        </p>

        <div className={conversacion}>
          <div className="bg-white/[0.06] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm lg:text-[0.95rem] text-text-main/90 leading-snug">
            {MENSAJE_ENTRANTE}
          </div>
        </div>

        {/* El reloj se desvanece con la conversación: contar el tiempo sin
            respuesta de un mensaje que todavía no llegó no significa nada. */}
        <div className={`mt-auto flex items-center gap-1.5 text-red-300/90 ${conversacion}`}>
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span ref={relojRef} className="text-xs tabular-nums font-mono">
            {TEXTO_RELOJ(SEGUNDOS_NOCHE)}
          </span>
        </div>
      </div>

      {/* ── Panel: con PatientFlow ── */}
      <div
        className="pf-hero-panel-in glass-card rounded-2xl p-4 lg:p-5 border-accent-main/25 flex flex-col gap-3"
        style={{ ['--pf-hero-delay' as string]: `${ENTRADA.PANEL_DER}ms` }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-main/80">
          Con PatientFlow
        </p>

        <div className={conversacion}>
          <div className="bg-white/[0.06] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm lg:text-[0.95rem] text-text-main/90 leading-snug">
            {MENSAJE_ENTRANTE}
          </div>

          <div className="min-h-[52px] flex flex-col justify-end mt-3">
            {fase === 'escribiendo' && (
              <div className="self-end flex items-center gap-1 bg-accent-main/15 rounded-2xl rounded-tr-sm px-3.5 py-2.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="pf-typing-dot w-1.5 h-1.5 rounded-full bg-accent-main/80"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}

            {fase === 'respondido' && (
              <div
                key={ciclo}
                className="pf-bubble-in self-end bg-accent-main/15 rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm text-text-main leading-snug"
              >
                {MENSAJE_RESPUESTA}
              </div>
            )}
          </div>
        </div>

        {/* El check solo aparece cuando de verdad hay respuesta — durante
            "escribiendo" no se muestra ningún ícono de estado terminado. */}
        <div
          className={`mt-auto h-[18px] flex items-center gap-1.5 text-accent-main/90 ${conversacion}`}
        >
          {fase === 'respondido' && (
            <>
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs tabular-nums font-mono">
                Respondido en 47s
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
