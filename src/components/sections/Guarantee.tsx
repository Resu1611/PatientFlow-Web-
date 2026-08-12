import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { GARANTIA } from '../../data/landing';

export default function Guarantee() {
  return (
    <section className="py-8 lg:py-12">
      <div className="glass-card-gold rounded-3xl p-7 sm:p-10 max-w-3xl mx-auto relative overflow-hidden">
        {/* Barra dorada lateral, como en el sitio original. */}
        <div
          className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-gold-light to-gold"
          aria-hidden="true"
        />

        <div className="pl-4 sm:pl-5 flex flex-col sm:flex-row gap-5 sm:gap-6 sm:items-start">
          <span className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
            <BadgeCheck className="w-6 h-6 text-gold" aria-hidden="true" />
          </span>

          <div>
            <h2 className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
              {GARANTIA.etiqueta}
            </h2>
            <p className="text-text-main text-base sm:text-lg leading-relaxed">
              {GARANTIA.texto}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
