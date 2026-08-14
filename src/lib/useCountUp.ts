import { useEffect, useRef, useState } from 'react';

/**
 * Anima un número hacia `target` en `durationMs`. Sin librería — un solo
 * requestAnimationFrame. Usado en la calculadora para que el resultado se
 * sienta "calculado" en vez de simplemente reemplazado.
 *
 * Respeta `prefers-reduced-motion`: salta directo al valor final.
 */
export function useCountUp(target: number, durationMs = 450): number {
  const [valor, setValor] = useState(target);
  const anterior = useRef(target);
  const frame = useRef<number>(undefined);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValor(target);
      anterior.current = target;
      return;
    }

    const desde = anterior.current;
    const hasta = target;
    if (desde === hasta) return;

    const inicio = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / durationMs);
      const progreso = easeOutCubic(t);
      setValor(desde + (hasta - desde) * progreso);
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        anterior.current = hasta;
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, durationMs]);

  return valor;
}
