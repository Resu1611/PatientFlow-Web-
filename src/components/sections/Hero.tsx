import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import WhatsAppMockup from '../ui/WhatsAppMockup';
import { BOOKING_ANCHOR_ID } from '../../config';
import { trackEvent } from '../../lib/analytics';
import { HERO, FUENTE_CIFRAS } from '../../data/landing';

/**
 * El hero es la tesis de la página: no una headline con acento decorativo,
 * sino el mecanismo del producto mostrado en vivo — la misma conversación,
 * con y sin sistema. Ver WhatsAppMockup.tsx.
 */
export default function Hero() {
  return (
    <section className="pt-6 pb-12 lg:pt-14 lg:pb-20">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center lg:items-start max-w-6xl mx-auto">
        <div className="text-center lg:text-left">
          <Eyebrow variant="lime" dot className="mb-7">
            {HERO.eyebrow}
          </Eyebrow>

          <h1 className="text-[1.9rem] leading-[1.15] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] font-bold tracking-tight text-text-main mb-6">
            {HERO.h1Inicio}{' '}
            <span className="gradient-text-alert">{HERO.h1Cifra}</span>{' '}
            {HERO.h1Fin}
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
            {HERO.subtitulo}
          </p>

          {/* Regla 2 de CLAUDE.md: la cifra del H1 se etiqueta como estimación. */}
          <p className="text-xs text-text-subtle leading-relaxed mb-9 max-w-md mx-auto lg:mx-0">
            {FUENTE_CIFRAS}
          </p>

          <Button
            href={`#${BOOKING_ANCHOR_ID}`}
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
            fullWidth
            className="sm:w-auto"
            onClick={() => trackEvent('cta_hero_click', { ubicacion: 'hero' })}
          >
            {HERO.cta}
          </Button>

          <p className="mt-5 flex items-center justify-center lg:justify-start gap-2 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-accent-main shrink-0" aria-hidden="true" />
            Respuesta en menos de 2 minutos, verificable en tu dashboard
          </p>
        </div>

        <WhatsAppMockup />
      </div>
    </section>
  );
}
