import React from 'react';
import Button from '../ui/Button';
import { BOOKING_ANCHOR_ID } from '../../config';
import { trackEvent } from '../../lib/analytics';

/**
 * Header mínimo: logo + el único CTA. Sin menú de navegación y sin links
 * externos — CLAUDE.md exige cero salidas.
 */
export default function Header() {
  return (
    <header className="fixed top-3 left-3 right-3 z-50 max-w-5xl mx-auto">
      <div className="glass-card rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between gap-3">
        <span
          className="text-white text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Patient<span className="italic font-normal text-accent-main">Flow.</span>
        </span>

        <Button
          href={`#${BOOKING_ANCHOR_ID}`}
          variant="primary"
          size="md"
          className="text-xs sm:text-sm px-4 shrink-0"
          onClick={() => trackEvent('cta_hero_click', { ubicacion: 'header' })}
        >
          Agendar demo
        </Button>
      </div>
    </header>
  );
}
