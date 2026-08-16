import React from 'react';
import { ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { BENCHMARKS, BENCHMARKS_SECCION } from '../../data/landing';

/**
 * Benchmarks de industria: sin sistema vs con sistema, del booklet. Va justo
 * después de la calculadora — el visitante acaba de ver SU cifra de pérdida;
 * esta sección responde "¿y esto se arregla?" con rangos citados, no promesas.
 *
 * Abre la banda clara. El corte de color cae aquí a propósito: es la línea
 * exacta donde la página deja de hablar del problema y empieza a hablar de la
 * solución, así que salir del verde es el argumento, no decoración.
 *
 * Los valores usan font-mono (cifras con fuente, mismo criterio que la
 * calculadora). El intro conecta explícitamente con la cifra de arriba en vez
 * de competir con ella.
 *
 * Las dos celdas están deliberadamente desbalanceadas: la de "sin sistema" va
 * hundida en el gris de la banda; la de "con sistema" lleva el verde
 * institucional y peso. Antes eran dos cajas idénticas — se leían como un
 * empate, cuando lo que la sección afirma es un antes y un después.
 */
export default function Benchmarks() {
  return (
    <section className="pt-16 pb-12 lg:pt-24 lg:pb-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-dark text-center mb-4 leading-tight">
          {BENCHMARKS_SECCION.titulo}
        </h2>
        <p className="text-text-dark-muted text-sm sm:text-base leading-relaxed text-center max-w-xl mx-auto mb-10">
          {BENCHMARKS_SECCION.intro}
        </p>

        <ul className="space-y-4">
          {BENCHMARKS.map((b) => (
            <GlassCard key={b.metrica} as="li" variant="light">
              <p className="text-text-dark text-sm sm:text-base font-semibold mb-4">
                {b.metrica}
              </p>
              <div className="flex items-center gap-3">
                {/* text-xs y no text-[0.65rem]: esas etiquetas medían 10.4px,
                    bajo el piso de legibilidad de 11px, y son la etiqueta de
                    una comparación — no un pie de página. */}
                <div className="flex-1 rounded-xl bg-surface-2 px-3 py-3 text-center">
                  <span className="block text-xs uppercase tracking-widest text-text-dark-muted mb-1">
                    Sin sistema
                  </span>
                  <span className="block text-xs sm:text-sm text-text-dark-muted font-mono">
                    {b.sin}
                  </span>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-primary-main shrink-0"
                  aria-hidden="true"
                />
                <div className="flex-1 rounded-xl border border-primary-main/15 bg-accent-main/40 px-3 py-3 text-center">
                  <span className="block text-xs uppercase tracking-widest text-primary-main mb-1">
                    Con sistema
                  </span>
                  <span className="block text-xs sm:text-sm text-primary-main font-mono font-bold">
                    {b.con}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </ul>

        {/* Regla 2 de CLAUDE.md: cifras siempre con su fuente al lado. */}
        <p className="mt-5 text-xs text-text-dark-muted text-center max-w-xl mx-auto leading-relaxed">
          {BENCHMARKS_SECCION.fuente}
        </p>
      </div>
    </section>
  );
}
