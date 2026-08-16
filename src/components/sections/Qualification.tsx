import React from 'react';
import { Check, X } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import IconChip from '../ui/IconChip';
import { ES_PARA_TI, NO_ES_PARA_TI } from '../../data/landing';

/**
 * Calificar / descalificar. Regla 4 de CLAUDE.md: la columna de "NO es para
 * ti" filtra demos basura y sube la confianza — no suavizar su copy ni
 * esconderla visualmente respecto a la otra columna.
 *
 * El filo superior de color (`border-t-2`) es lo que separa las dos columnas
 * de un vistazo. Solo funciona porque .glass-card vive en `@layer components`:
 * mientras estuvo sin capa, su `border` en forma corta ganaba y este filo no
 * se pintaba nunca.
 */
export default function Qualification() {
  return (
    <section className="py-12 lg:py-20">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-12 leading-tight">
        ¿Este sistema es para tu clínica?
      </h2>

      <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
        <GlassCard className="border-t-2 border-t-accent-main/40">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-text-main">
            <IconChip icon={Check} size="sm" />
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
        </GlassCard>

        <GlassCard className="border-t-2 border-t-red-500/30">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-text-main">
            <IconChip icon={X} tone="alert" size="sm" />
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
        </GlassCard>
      </div>
    </section>
  );
}
