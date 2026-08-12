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

      <p className="mt-5 max-w-xl mx-auto text-xs text-text-muted/60 leading-relaxed px-5">
        {LEGAL}
      </p>

      <p className="mt-4 text-xs text-text-muted/40">
        © {new Date().getFullYear()} Patient Flow Scale
      </p>
    </footer>
  );
}
