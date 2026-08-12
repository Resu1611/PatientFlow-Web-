import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import { BOOKING_ANCHOR_ID } from '../../config';
import { trackEvent } from '../../lib/analytics';
import { HERO, FUENTE_CIFRAS } from '../../data/landing';

export default function Hero() {
  return (
    <section className="pt-6 pb-12 lg:pt-12 lg:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow variant="lime" dot className="mb-7">
          {HERO.eyebrow}
        </Eyebrow>

        <h1 className="text-[1.9rem] leading-[1.15] sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-main mb-6">
          {HERO.h1Inicio}{' '}
          <span className="gradient-text-alert">{HERO.h1Cifra}</span>{' '}
          {HERO.h1Fin}
        </h1>

        <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-4">
          {HERO.subtitulo}
        </p>

        {/* Regla 2 de CLAUDE.md: la cifra del H1 se etiqueta como estimación. */}
        <p className="text-xs text-text-subtle max-w-xl mx-auto leading-relaxed mb-9">
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

        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-text-muted">
          <ShieldCheck className="w-4 h-4 text-accent-main shrink-0" aria-hidden="true" />
          Respuesta en menos de 2 minutos, verificable en tu dashboard
        </p>
      </div>
    </section>
  );
}
