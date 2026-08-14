import React from 'react';
import { LEGAL } from '../../data/landing';

/**
 * Footer mínimo: sin redes, sin links externos, sin navegación.
 * CLAUDE.md: cero salidas. Solo marca, nota legal (Ley 29733) y copyright.
 */
export default function Footer() {
  return (
    <footer className="py-10 border-t border-border-subtle mt-6 text-center">
      <span
        className="text-white text-lg font-bold"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Patient<span className="italic font-normal text-accent-main">Flow.</span>
      </span>

      {/* Sin modificador de opacidad: la nota de la Ley 29733 es justamente el
          texto que tiene que poder leerse. Con /60 y /40 quedaba en 3.2:1 y
          2.1:1 — por debajo del mínimo AA. */}
      <p className="mt-5 max-w-xl mx-auto text-xs text-text-subtle leading-relaxed px-5">
        {LEGAL}
      </p>

      <p className="mt-4 text-xs text-text-subtle">
        © {new Date().getFullYear()} Patient Flow Scale
      </p>
    </footer>
  );
}
