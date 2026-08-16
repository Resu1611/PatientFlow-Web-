import React, { useState } from 'react';
import FaqItem from '../ui/FaqItem';
import { FAQS } from '../../data/landing';

export default function Faq() {
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    // Ritmo corto: el FAQ resuelve objeciones sueltas, no carga un argumento.
    <section className="py-10 lg:py-14">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-12 leading-tight">
          Preguntas frecuentes
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.pregunta}
              index={i}
              question={faq.pregunta}
              answer={faq.respuesta}
              isOpen={abierta === i}
              onToggle={() => setAbierta(abierta === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
