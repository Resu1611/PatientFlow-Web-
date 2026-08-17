import React from 'react';
import { MoonStar, PhoneMissed, Unlink2, CalendarX2, Clock } from 'lucide-react';
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
  const refEvidencia = useReveal<HTMLElement>();
  const refFugas = useReveal<HTMLDivElement>();
  const refCierre = useReveal<HTMLDivElement>();

  return (
    <section className="py-12 lg:py-20">
      <h2
        ref={refTitulo}
        className="pf-reveal text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-8 leading-tight"
      >
        {FUGAS_SECCION.titulo}
      </h2>

      {/* Franja de evidencia — no es una 5ª fuga, es la primera puesta en
          números antes de nombrar las cuatro en la rejilla de abajo. Reusa el
          mismo lenguaje tipográfico que Hero y LossCalculator (font-mono para
          la cifra medida): es el mismo dato que anima WhatsAppMockup, aquí
          congelado en una instantánea en vez de una segunda escena animada —
          el sitio reserva sus únicos dos momentos coreografiados para
          HowItWorks y Benchmarks. */}
      <GlassCard
        ref={refEvidencia}
        style={retardo(60)}
        className="pf-reveal mb-10 max-w-2xl mx-auto flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6"
      >
        <IconChip icon={MoonStar} tone="alert" size="lg" />
        <div className="flex-1 min-w-[180px]">
          <p className="text-text-muted text-xs sm:text-sm">
            11:47 pm — un paciente escribe
          </p>
          <p className="text-text-main font-mono text-2xl sm:text-3xl font-bold leading-none mt-1.5 flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-400 shrink-0" aria-hidden="true" />
            4h 12min
          </p>
          <p className="text-text-subtle text-xs mt-1.5">hasta la primera respuesta</p>
        </div>
      </GlassCard>

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
