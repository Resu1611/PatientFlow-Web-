import React from 'react';
import { MoonStar, PhoneMissed, Unlink2, CalendarX2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import IconChip from '../ui/IconChip';
import { retardo, useReveal } from '../../lib/reveal';
import { FUGAS, FUGAS_SECCION, FUENTE_CIFRAS } from '../../data/landing';

const ICONOS = [MoonStar, PhoneMissed, Unlink2, CalendarX2];

/**
 * Las 4 fugas del booklet, nombradas. Da vocabulario al problema antes de que
 * la calculadora (justo debajo) lo cuantifique. Grid 2×2 a propósito —
 * distinto del riel secuencial de HowItWorks, porque aquí el orden NO es
 * información: son cuatro fugas paralelas, no una secuencia.
 *
 * Por eso mismo las tarjetas ya no muestran el 01–04: era numeración
 * decorativa contradiciendo lo que dice esta misma nota. El campo `numero`
 * sigue en los datos como identificador estable (la key de React).
 *
 * Los íconos usan el rojo genérico de Tailwind vía IconChip (mismo criterio
 * que la columna "No es para ti" de Qualification) — NUNCA el token
 * --color-alert-main ni .gradient-text-alert, exclusivos de cifras (regla 2).
 *
 * Las cuatro tarjetas entran JUNTAS, sin cascada, y eso es deliberado por lo
 * mismo que la rejilla es 2×2: son cuatro fugas paralelas, no una secuencia.
 * Escalonarlas afirmaría un orden que la sección niega en su propia nota. La
 * secuencia escalonada existe en esta página, pero en "Cómo funciona", que es
 * donde sí hay un antes y un después.
 */
export default function Leaks() {
  const refTitulo = useReveal<HTMLHeadingElement>();
  const refFugas = useReveal<HTMLDivElement>();
  const refCierre = useReveal<HTMLDivElement>();

  return (
    <section className="py-12 lg:py-20">
      <h2
        ref={refTitulo}
        className="pf-reveal text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-12 leading-tight"
      >
        {FUGAS_SECCION.titulo}
      </h2>

      <div
        ref={refFugas}
        style={retardo(100)}
        className="pf-reveal grid gap-5 md:grid-cols-2 max-w-4xl mx-auto"
      >
        {FUGAS.map((fuga, i) => (
          <GlassCard key={fuga.numero}>
            <div className="flex items-center gap-3 mb-3">
              <IconChip icon={ICONOS[i] ?? MoonStar} tone="alert" />
              <h3 className="text-text-main font-bold text-base sm:text-lg leading-snug">
                {fuga.nombre}
              </h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">{fuga.texto}</p>
          </GlassCard>
        ))}
      </div>

      <div ref={refCierre} style={retardo(180)} className="pf-reveal mt-10">
        <p className="text-text-main text-center max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {FUGAS_SECCION.cierre}
        </p>
        {/* Regla 2 de CLAUDE.md: el "40%" de la fuga nocturna viene de la misma
            investigación citada en el hero — la nota viaja con la cifra. */}
        <p className="mt-4 text-xs text-text-subtle text-center max-w-xl mx-auto leading-relaxed">
          {FUENTE_CIFRAS}
        </p>
      </div>
    </section>
  );
}
