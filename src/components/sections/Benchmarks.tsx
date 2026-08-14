import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BENCHMARKS, BENCHMARKS_SECCION } from '../../data/landing';

/**
 * Benchmarks de industria: sin sistema vs con sistema, del booklet. Va justo
 * después de la calculadora — el visitante acaba de ver SU cifra de pérdida;
 * esta sección responde "¿y esto se arregla?" con rangos citados, no promesas.
 *
 * Los valores usan font-mono (cifras con fuente, mismo criterio que la
 * calculadora). El intro conecta explícitamente con la cifra de arriba en vez
 * de competir con ella.
 */
export default function Benchmarks() {
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-4 leading-tight">
          {BENCHMARKS_SECCION.titulo}
        </h2>
        <p className="text-text-muted text-sm sm:text-base leading-relaxed text-center max-w-xl mx-auto mb-10">
          {BENCHMARKS_SECCION.intro}
        </p>

        <ul className="space-y-4">
          {BENCHMARKS.map((b) => (
            <li key={b.metrica} className="glass-card rounded-2xl p-5 sm:p-6">
              <p className="text-text-main text-sm sm:text-base font-semibold mb-4">
                {b.metrica}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 rounded-xl border border-border-subtle bg-bg-alt/40 px-3 py-3 text-center">
                  <span className="block text-[0.65rem] uppercase tracking-widest text-text-subtle mb-1">
                    Sin sistema
                  </span>
                  <span className="block text-xs sm:text-sm text-text-muted font-mono">
                    {b.sin}
                  </span>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-accent-main shrink-0"
                  aria-hidden="true"
                />
                <div className="flex-1 rounded-xl border border-accent-main/30 bg-accent-main/10 px-3 py-3 text-center">
                  <span className="block text-[0.65rem] uppercase tracking-widest text-accent-main mb-1">
                    Con sistema
                  </span>
                  <span className="block text-xs sm:text-sm text-accent-main font-mono font-bold">
                    {b.con}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Regla 2 de CLAUDE.md: cifras siempre con su fuente al lado. */}
        <p className="mt-5 text-xs text-text-subtle text-center max-w-xl mx-auto leading-relaxed">
          {BENCHMARKS_SECCION.fuente}
        </p>
      </div>
    </section>
  );
}
