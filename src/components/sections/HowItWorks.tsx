import React from 'react';
import { MessageSquare, Zap, CalendarCheck } from 'lucide-react';
import { PASOS } from '../../data/landing';

const ICONOS = [MessageSquare, Zap, CalendarCheck];

export default function HowItWorks() {
  return (
    <section className="py-12 lg:py-20">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-12 leading-tight">
        Cómo funciona
      </h2>

      <ol className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
        {PASOS.map((paso, i) => {
          const Icono = ICONOS[i] ?? MessageSquare;
          return (
            <li key={paso.numero} className="glass-card rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-xl bg-accent-main/10 flex items-center justify-center shrink-0">
                  <Icono className="w-5 h-5 text-accent-main" aria-hidden="true" />
                </span>
                <span
                  className="font-mono text-2xl font-bold text-accent-main/20"
                  aria-hidden="true"
                >
                  {paso.numero}
                </span>
              </div>
              <p className="text-text-main text-[0.95rem] leading-relaxed">
                {paso.texto}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
