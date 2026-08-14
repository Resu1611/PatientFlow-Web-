import React, { useEffect, useRef, useState } from 'react';
import { Check, Clock } from 'lucide-react';

/**
 * Firma visual del hero: dramatiza la tesis de la página (responder rápido
 * vs. no responder) con el propio material del producto — una conversación
 * de WhatsApp — en vez de una estadística genérica con acento en gradiente.
 *
 * Panel izquierdo: el mensaje se queda sin leer, el reloj sigue corriendo.
 * Panel derecho: el mismo tipo de mensaje, respondido en segundos.
 *
 * Puramente markup — no requiere ninguna imagen ni asset.
 * Decorativo: el mismo mensaje ya está en el H1/subtítulo en texto
 * accesible, así que todo el bloque se oculta a lectores de pantalla.
 */

const MENSAJE_ENTRANTE =
  'Hola! Vi el anuncio de rinoplastia, ¿tienen citas esta semana?';
const MENSAJE_RESPUESTA =
  'Hola! Sí, tenemos disponibilidad jueves y viernes. ¿Prefieres mañana o tarde?';

const SEGUNDOS_INICIALES_SIN_RESPUESTA = 4 * 3600 + 12 * 60; // 4h 12min

function formatearElapsed(totalSegundos: number): string {
  const h = Math.floor(totalSegundos / 3600);
  const m = Math.floor((totalSegundos % 3600) / 60);
  const s = totalSegundos % 60;
  return `${h}h ${String(m).padStart(2, '0')}min ${String(s).padStart(2, '0')}s`;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
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

  const [segundosSinRespuesta, setSegundosSinRespuesta] = useState(
    SEGUNDOS_INICIALES_SIN_RESPUESTA,
  );
  const [fase, setFase] = useState<FaseRespuesta>(
    reducedMotion ? 'respondido' : 'espera',
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Reloj del panel "sin sistema": nunca se detiene, esa es la idea.
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setSegundosSinRespuesta((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Loop del panel "con PatientFlow": espera → escribiendo → respondido → repite.
  useEffect(() => {
    if (reducedMotion) return;

    const avanzar = (siguiente: FaseRespuesta, ms: number) => {
      timeoutRef.current = setTimeout(() => setFase(siguiente), ms);
    };

    if (fase === 'espera') avanzar('escribiendo', 1400);
    else if (fase === 'escribiendo') avanzar('respondido', 1300);
    else avanzar('espera', 4200);

    return () => clearTimeout(timeoutRef.current);
  }, [fase, reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-w-md mx-auto lg:max-w-sm lg:mt-2"
    >
      {/* ── Panel: sin sistema ── */}
      <div className="glass-card rounded-2xl p-4 lg:p-5 border-red-400/20 flex flex-col gap-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-red-300/80">
          Sin sistema de respuesta
        </p>

        <div className="bg-white/[0.06] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm lg:text-[0.95rem] text-text-main/90 leading-snug">
          {MENSAJE_ENTRANTE}
        </div>

        <div className="mt-auto flex items-center gap-1.5 text-red-300/90">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="text-xs tabular-nums font-mono">
            {formatearElapsed(segundosSinRespuesta)} sin responder
          </span>
        </div>
      </div>

      {/* ── Panel: con PatientFlow ── */}
      <div className="glass-card rounded-2xl p-4 lg:p-5 border-accent-main/25 flex flex-col gap-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-accent-main/80">
          Con PatientFlow
        </p>

        <div className="bg-white/[0.06] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm lg:text-[0.95rem] text-text-main/90 leading-snug">
          {MENSAJE_ENTRANTE}
        </div>

        <div className="min-h-[52px] flex flex-col justify-end">
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
            <div className="pf-bubble-in self-end bg-accent-main/15 rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm text-text-main leading-snug">
              {MENSAJE_RESPUESTA}
            </div>
          )}
        </div>

        {/* El check solo aparece cuando de verdad hay respuesta — durante
            "escribiendo" no se muestra ningún ícono de estado terminado. */}
        <div className="mt-auto h-[18px] flex items-center gap-1.5 text-accent-main/90">
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
