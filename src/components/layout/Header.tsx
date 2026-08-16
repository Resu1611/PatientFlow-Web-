import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { BOOKING_ANCHOR_ID } from '../../config';
import { trackEvent } from '../../lib/analytics';

/**
 * Header mínimo: logo + el único CTA. Sin menú de navegación y sin links
 * externos — CLAUDE.md exige cero salidas.
 *
 * La píldora es translúcida y flota sobre ~10.000px de contenido, así que
 * durante todo el scroll deja ver lo que pasa por debajo: capturada a media
 * página cortaba el H1 y el primer bullet de "Es para ti si". El velo aparece
 * al pasar los 40px y le da un suelo opaco, sin quitarle el aire que tiene
 * arriba del todo. Se apoya en un degradado de ancho completo detrás de la
 * píldora, no en subirle la opacidad: así el contenido se desvanece contra el
 * borde superior en vez de reaparecer a los lados.
 */
export default function Header() {
  const [conVelo, setConVelo] = useState(false);

  useEffect(() => {
    const alScrollear = () => setConVelo(window.scrollY > 40);
    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });
    return () => window.removeEventListener('scroll', alScrollear);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-3 px-3">
      <div
        aria-hidden="true"
        className={[
          'absolute inset-x-0 top-0 h-[82px] pointer-events-none',
          'bg-gradient-to-b from-bg-main via-bg-main/85 to-transparent',
          'transition-opacity duration-200 motion-reduce:transition-none',
          conVelo ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      <div className="relative max-w-5xl mx-auto glass-card rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between gap-3">
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
