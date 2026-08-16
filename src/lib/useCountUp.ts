import { useEffect, useRef, useState } from 'react';

export interface CountUpOpciones {
  durationMs?: number;
  /**
   * Mientras sea `false` el valor se queda en 0 y no hay animación. Al pasar a
   * `true`, la cifra cuenta desde 0 hasta el objetivo.
   *
   * Existe para la primera aparición de la calculadora. Antes el resultado
   * simplemente estaba escrito cuando el visitante bajaba hasta él, y una
   * cifra que ya está puesta se lee como una cifra genérica de una plantilla.
   * Contando desde cero delante de sus ojos se lee como lo que es: el cálculo
   * de SUS números, hecho en ese momento. Es el mismo argumento que ya sostenía
   * la animación entre valores al arrastrar el slider, aplicado al único
   * momento en que hasta ahora no pasaba nada.
   */
  activo?: boolean;
}

/**
 * Anima un número hacia `target` en `durationMs`. Sin librería — un solo
 * requestAnimationFrame.
 *
 * Respeta `prefers-reduced-motion`: salta directo al valor final.
 */
export function useCountUp(
  target: number,
  opciones: CountUpOpciones = {},
): number {
  const { durationMs = 450, activo = true } = opciones;

  const [valor, setValor] = useState(activo ? target : 0);
  const anterior = useRef(activo ? target : 0);
  const frame = useRef<number>(undefined);

  useEffect(() => {
    if (!activo) return;

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
      const actual = desde + (hasta - desde) * progreso;
      setValor(actual);
      // El ancla se mueve en cada fotograma, no solo al terminar. Arrastrando
      // el slider el efecto se reinicia constantemente a mitad de vuelo, y con
      // el ancla congelada en el objetivo ANTERIOR cada reinicio devolvía la
      // cifra de un salto a donde estaba hace medio segundo: el número temblaba
      // hacia atrás mientras el dedo iba hacia adelante. Desde el valor que se
      // está mostrando, la cifra solo persigue al slider.
      anterior.current = actual;
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
  }, [target, durationMs, activo]);

  return valor;
}
