import React from 'react';
import { Video, Gauge, Handshake, ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import IconChip from '../ui/IconChip';
import Button from '../ui/Button';
import { BOOKING_ANCHOR_ID } from '../../config';
import { trackEvent } from '../../lib/analytics';
import { DEMO_BULLETS } from '../../data/landing';

const ICONOS = [Video, Gauge, Handshake];

/**
 * Filas compactas (`padding="sm"`): cada una es una sola afirmación, no una
 * tarjeta de contenido. Ritmo corto por lo mismo.
 *
 * `items-center` en vez del `pt-2` que había: ese relleno alineaba a ojo la
 * primera línea con el ícono y solo cuadraba con el texto de una línea. Los
 * bullets van de 1 a 3 líneas en 390px, y centrar el chip contra el bloque
 * completo se sostiene en cualquiera de los tres casos sin número mágico.
 *
 * Lleva CTA: es el punto donde cae la última objeción real ("te digo si no
 * calificas y no te hago perder tiempo"), y el momento con menos fricción de
 * toda la mitad de abajo.
 */
export default function DemoExpectations() {
  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-12 leading-tight">
          Qué pasa en la demo
        </h2>

        <ul className="space-y-4">
          {DEMO_BULLETS.map((bullet, i) => (
            <GlassCard
              key={bullet}
              as="li"
              padding="sm"
              className="flex gap-4 items-center"
            >
              <IconChip icon={ICONOS[i] ?? Video} />
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                {bullet}
              </p>
            </GlassCard>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button
            href={`#${BOOKING_ANCHOR_ID}`}
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
            fullWidth
            className="sm:w-auto"
            onClick={() => trackEvent('cta_final_click', { ubicacion: 'demo' })}
          >
            Agendar mi demo de 20 minutos
          </Button>
        </div>
      </div>
    </section>
  );
}
