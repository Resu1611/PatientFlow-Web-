import React from 'react';
import { Check, X } from 'lucide-react';
import { ES_PARA_TI, NO_ES_PARA_TI } from '../../data/landing';

/**
 * Calificar / descalificar. Regla 4 de CLAUDE.md: la columna de "NO es para
 * ti" filtra demos basura y sube la confianza — no suavizar su copy ni
 * esconderla visualmente respecto a la otra columna.
 */
export default function Qualification() {
  return (
    <section className="py-12 lg:py-20">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-12 leading-tight">
        ¿Este sistema es para tu clínica?
      </h2>

      <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-7 border-t-2 border-t-accent-main/40">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-text-main">
            <span className="w-8 h-8 rounded-full bg-accent-main/15 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-accent-main" aria-hidden="true" />
            </span>
            Es para ti si
          </h3>
          <ul className="space-y-4">
            {ES_PARA_TI.map((item) => (
              <li key={item} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                <Check
                  className="w-4 h-4 text-accent-main shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-2xl p-7 border-t-2 border-t-red-500/30">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-text-main">
            <span className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <X className="w-4 h-4 text-red-400" aria-hidden="true" />
            </span>
            No es para ti si
          </h3>
          <ul className="space-y-4">
            {NO_ES_PARA_TI.map((item) => (
              <li key={item} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                <X
                  className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
