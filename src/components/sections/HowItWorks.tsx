import React from 'react';
import { MessageSquare, Zap, CalendarCheck } from 'lucide-react';
import { retardo, useReveal } from '../../lib/reveal';
import { PASOS } from '../../data/landing';

const ICONOS = [MessageSquare, Zap, CalendarCheck];

/**
 * Único lugar del sitio con marcadores numerados: es un proceso real de 3
 * pasos donde el orden importa, así que el riel que conecta los nodos no es
 * decoración — es la información (esto pasa, luego esto, luego esto).
 *
 * Dentro de la banda clara, y con el ritmo corto (`py-10 lg:py-14`): son tres
 * líneas de texto, no una sección que cargue un argumento propio. Con el mismo
 * aire que la calculadora se leía como si pesara lo mismo, y no pesa lo mismo.
 *
 * ── El movimiento ──
 *
 * Es el único momento coreografiado de la mitad de abajo, y le toca a esta
 * sección precisamente porque es la única donde el orden ES el contenido. El
 * riel se traza de arriba abajo y cada nodo aterriza cuando la línea lo
 * alcanza: la secuencia deja de estar afirmada por un dibujo estático y pasa a
 * ocurrir. Quitarlo no le resta gracia a la sección, le resta el argumento.
 *
 * Los retardos de abajo están calculados contra los 760ms del trazo (ver
 * `.pf-riel` en src/index.css) y contra dónde cae cada nodo en el recorrido —
 * primero arriba del todo, el segundo hacia la mitad, el tercero casi al
 * final. Si cambias la duración del trazo o el espaciado de los pasos, estos
 * números dejan de significar nada y hay que rehacerlos.
 */
const RETARDO_NODO = [120, 360, 600];

export default function HowItWorks() {
  const refTitulo = useReveal<HTMLHeadingElement>();
  const refRiel = useReveal<HTMLOListElement>();

  return (
    <section className="py-10 lg:py-14">
      <h2
        ref={refTitulo}
        className="pf-reveal pf-tempo-rapido text-2xl sm:text-3xl lg:text-4xl font-bold text-text-dark text-center mb-12 leading-tight"
      >
        Cómo funciona
      </h2>

      {/* La lista no lleva `.pf-reveal`: no entra como bloque, se dibuja. Su
          `data-revealed` es lo que dispara el trazo y los tres nodos. */}
      <ol ref={refRiel} className="pf-riel relative max-w-2xl mx-auto">
        {/* El riel — una sola línea que atraviesa los tres nodos. */}
        <div
          aria-hidden="true"
          className="pf-riel-linea absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-primary-main/40 via-primary-main/20 to-transparent"
        />

        {PASOS.map((paso, i) => {
          const Icono = ICONOS[i] ?? MessageSquare;
          const esUltimo = i === PASOS.length - 1;
          return (
            <li
              key={paso.numero}
              style={retardo(RETARDO_NODO[i] ?? 0)}
              className={`pf-paso relative flex gap-5 items-start ${esUltimo ? '' : 'pb-10'}`}
            >
              <span className="relative z-10 shrink-0 w-14 h-14 rounded-2xl solid-card flex items-center justify-center">
                <Icono className="w-6 h-6 text-primary-main" aria-hidden="true" />
              </span>

              <div className="pt-3">
                <span
                  className="block text-xs tracking-widest text-text-dark-muted mb-1.5 font-mono"
                  aria-hidden="true"
                >
                  {paso.numero}
                </span>
                <p className="text-text-dark text-[0.95rem] sm:text-base leading-relaxed max-w-md">
                  {paso.texto}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
