import React from 'react';
import { Video, Gauge, Handshake } from 'lucide-react';
import { DEMO_BULLETS } from '../../data/landing';

const ICONOS = [Video, Gauge, Handshake];

export default function DemoExpectations() {
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-12 leading-tight">
          Qué pasa en la demo
        </h2>

        <ul className="space-y-4">
          {DEMO_BULLETS.map((bullet, i) => {
            const Icono = ICONOS[i] ?? Video;
            return (
              <li
                key={bullet}
                className="glass-card rounded-2xl p-5 sm:p-6 flex gap-4 items-start"
              >
                <span className="w-10 h-10 rounded-xl bg-accent-main/10 flex items-center justify-center shrink-0">
                  <Icono className="w-5 h-5 text-accent-main" aria-hidden="true" />
                </span>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed pt-2">
                  {bullet}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
