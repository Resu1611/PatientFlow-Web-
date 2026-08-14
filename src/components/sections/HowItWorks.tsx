import React from 'react';
import { MessageSquare, Zap, CalendarCheck } from 'lucide-react';
import { PASOS } from '../../data/landing';

const ICONOS = [MessageSquare, Zap, CalendarCheck];

/**
 * Único lugar del sitio con marcadores numerados: es un proceso real de 3
 * pasos donde el orden importa, así que el riel que conecta los nodos no es
 * decoración — es la información (esto pasa, luego esto, luego esto).
 */
export default function HowItWorks() {
  return (
    <section className="py-12 lg:py-20">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-14 leading-tight">
        Cómo funciona
      </h2>

      <ol className="relative max-w-2xl mx-auto">
        {/* El riel — una sola línea que atraviesa los tres nodos. */}
        <div
          aria-hidden="true"
          className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-accent-main/40 via-accent-main/15 to-transparent"
        />

        {PASOS.map((paso, i) => {
          const Icono = ICONOS[i] ?? MessageSquare;
          const esUltimo = i === PASOS.length - 1;
          return (
            <li
              key={paso.numero}
              className={`relative flex gap-5 items-start ${esUltimo ? '' : 'pb-10'}`}
            >
              <span className="relative z-10 shrink-0 w-14 h-14 rounded-2xl glass-card border-accent-main/25 flex items-center justify-center">
                <Icono className="w-6 h-6 text-accent-main" aria-hidden="true" />
              </span>

              <div className="pt-3">
                <span
                  className="block text-xs tracking-widest text-accent-main/60 mb-1.5 font-mono"
                  aria-hidden="true"
                >
                  {paso.numero}
                </span>
                <p className="text-text-main text-[0.95rem] sm:text-base leading-relaxed max-w-md">
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
