import React from 'react';
import { Zap, PhoneIncoming, Repeat, CalendarClock, FileBarChart } from 'lucide-react';
import { PIEZAS_SISTEMA, SISTEMA_SECCION, REPORTE_MENSUAL_NOTA } from '../../data/landing';

/**
 * Las 4 piezas del sistema (booklet p.6), cada una etiquetada con la fuga que
 * tapa — callback temático directo a la sección Leaks de arriba. Va después
 * de HowItWorks: el journey simple de 3 pasos responde "¿qué ve el paciente?";
 * esta sección responde "¿qué instala Renzo?" — el ángulo de servicio.
 *
 * Íconos con eco deliberado: Zap repite el paso 02 de HowItWorks (misma
 * capacidad, más detalle); PhoneIncoming y CalendarClock contrastan con
 * PhoneMissed y CalendarX2 de Leaks (el problema y su resolución).
 */
const ICONOS = [Zap, PhoneIncoming, Repeat, CalendarClock];

export default function SystemPieces() {
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-5 leading-tight">
          {SISTEMA_SECCION.titulo}
        </h2>
        <p className="text-text-muted text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto mb-12">
          {SISTEMA_SECCION.intro}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {PIEZAS_SISTEMA.map((pieza, i) => {
            const Icono = ICONOS[i] ?? Zap;
            return (
              <div key={pieza.numero} className="glass-card rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-accent-main/10 flex items-center justify-center shrink-0">
                    <Icono className="w-6 h-6 text-accent-main" aria-hidden="true" />
                  </span>
                  <span
                    className="font-mono text-xs tracking-widest text-text-subtle"
                    aria-hidden="true"
                  >
                    {pieza.numero}
                  </span>
                </div>
                <h3 className="text-text-main font-bold text-base sm:text-lg mb-1">
                  {pieza.nombre}
                </h3>
                <p className="text-accent-main text-xs font-semibold uppercase tracking-wide mb-3">
                  {pieza.fugaQueTapa}
                </p>
                <p className="text-text-muted text-sm leading-relaxed">{pieza.texto}</p>
              </div>
            );
          })}
        </div>

        {/* Reporte mensual (booklet paso 8) — nota corta, no una 4ª sección.
            Refuerza el ángulo de servicio con transparencia verificable. */}
        <p className="mt-8 glass-card rounded-xl p-4 sm:p-5 flex items-start gap-3 max-w-xl mx-auto text-text-muted text-sm leading-relaxed">
          <FileBarChart
            className="w-4 h-4 text-accent-main shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span>{REPORTE_MENSUAL_NOTA}</span>
        </p>
      </div>
    </section>
  );
}
