import React from 'react';
import {
  Zap,
  PhoneIncoming,
  Repeat,
  CalendarClock,
  FileBarChart,
  ArrowRight,
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import IconChip from '../ui/IconChip';
import Button from '../ui/Button';
import { BOOKING_ANCHOR_ID } from '../../config';
import { trackEvent } from '../../lib/analytics';
import { retardo, useReveal } from '../../lib/reveal';
import {
  PIEZAS_SISTEMA,
  SISTEMA_SECCION,
  REPORTE_MENSUAL_NOTA,
  FUGAS,
} from '../../data/landing';

/**
 * Las 4 piezas del sistema (booklet p.6), cada una etiquetada con la fuga que
 * tapa. Va después de HowItWorks: el journey simple de 3 pasos responde "¿qué
 * ve el paciente?"; esta sección responde "¿qué instala Renzo?" — el ángulo de
 * servicio.
 *
 * Cada tarjeta ahora lleva el problema escrito al lado de la solución. Antes
 * decía solo "Tapa la fuga nocturna" y daba por hecho que el visitante
 * recordaba, nueve pantallas después, qué era la fuga nocturna: eso es un
 * puente de memoria, y en móvil nadie lo cruza. El resumen sale de FUGAS, o
 * sea del mismo texto de la sección de arriba — no es una afirmación nueva.
 *
 * Cierra la banda clara y es el primer CTA en mucho rato: es el punto donde
 * el visitante ya sabe qué se instala, que es cuando la pregunta "¿y cuánto
 * cuesta?" se vuelve inevitable.
 *
 * Íconos con eco deliberado: Zap repite el paso 02 de HowItWorks (misma
 * capacidad, más detalle); PhoneIncoming y CalendarClock contrastan con
 * PhoneMissed y CalendarX2 de Leaks (el problema y su resolución).
 *
 * El eco llega también al movimiento: las cuatro piezas entran juntas, igual
 * que las cuatro fugas, porque son las mismas cuatro cosas vistas desde el
 * otro lado. Lo único que cambia entre las dos rejillas es la velocidad —
 * lenta allá, rápida aquí — que es el corte de banda dicho con el reloj.
 */
const ICONOS = [Zap, PhoneIncoming, Repeat, CalendarClock];

export default function SystemPieces() {
  const refTitulo = useReveal<HTMLDivElement>();
  const refPiezas = useReveal<HTMLDivElement>();
  const refReporte = useReveal<HTMLElement>();
  const refCta = useReveal<HTMLDivElement>();

  return (
    <section className="pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="max-w-4xl mx-auto">
        <div ref={refTitulo} className="pf-reveal pf-tempo-rapido">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-dark text-center mb-5 leading-tight">
            {SISTEMA_SECCION.titulo}
          </h2>
          <p className="text-text-dark-muted text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto mb-12">
            {SISTEMA_SECCION.intro}
          </p>
        </div>

        <div
          ref={refPiezas}
          style={retardo(80)}
          className="pf-reveal pf-tempo-rapido grid gap-5 md:grid-cols-2"
        >
          {PIEZAS_SISTEMA.map((pieza, i) => (
            <GlassCard key={pieza.numero} variant="light">
              <div className="flex items-start gap-3 mb-4">
                <IconChip icon={ICONOS[i] ?? Zap} tone="onLight" />
                <h3 className="text-text-dark font-bold text-base sm:text-lg leading-snug min-w-0 pt-2">
                  {pieza.nombre}
                </h3>
              </div>

              {/* Problema arriba, pieza que lo cierra abajo, dentro de la misma
                  tarjeta. Sin flecha entre los dos: en 390px la línea envolvía
                  y la flecha quedaba colgando al final del primer renglón,
                  apuntando a nada. Apiladas, el peso y el color ya dicen cuál
                  es el problema y cuál la respuesta, y aguanta cualquier largo
                  de texto sin depender del ancho. */}
              <div className="rounded-xl bg-surface-2 px-3 py-2 mb-4">
                <span className="block text-xs text-text-dark-muted">
                  {FUGAS[i]?.resumen}
                </span>
                <span className="block text-xs font-semibold text-primary-main mt-0.5">
                  {pieza.fugaQueTapa}
                </span>
              </div>

              <p className="text-text-dark-muted text-sm leading-relaxed">
                {pieza.texto}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Reporte mensual (booklet paso 8) — nota corta, no una 4ª sección.
            Refuerza el ángulo de servicio con transparencia verificable. */}
        <GlassCard
          variant="light"
          padding="sm"
          ref={refReporte}
          style={retardo(140)}
          className="pf-reveal pf-tempo-rapido mt-8 flex items-start gap-3 max-w-xl mx-auto"
        >
          <FileBarChart
            className="w-4 h-4 text-primary-main shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-text-dark-muted text-sm leading-relaxed">
            {REPORTE_MENSUAL_NOTA}
          </p>
        </GlassCard>

        <div
          ref={refCta}
          style={retardo(200)}
          className="pf-reveal pf-tempo-rapido mt-12 flex justify-center"
        >
          <Button
            href={`#${BOOKING_ANCHOR_ID}`}
            variant="dark"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
            fullWidth
            className="sm:w-auto"
            onClick={() =>
              trackEvent('cta_final_click', { ubicacion: 'piezas' })
            }
          >
            Ver el sistema funcionando
          </Button>
        </div>
      </div>
    </section>
  );
}
