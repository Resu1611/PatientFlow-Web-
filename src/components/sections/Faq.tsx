import React, { useState } from 'react';
import FaqItem from '../ui/FaqItem';
import { retardo, useReveal } from '../../lib/reveal';
import { FAQS } from '../../data/landing';

/**
 * La lista entra como un bloque, sin cascada entre preguntas: son objeciones
 * sueltas y ninguna va antes que otra. El movimiento que importa en esta
 * sección es el del acordeón (ver FaqItem.tsx), que responde a un clic — y la
 * entrada no debe competir con el único gesto interactivo real de la mitad de
 * abajo de la página.
 */
export default function Faq() {
  const [abierta, setAbierta] = useState<number | null>(null);

  const refTitulo = useReveal<HTMLHeadingElement>();
  const refLista = useReveal<HTMLDivElement>();

  return (
    // Ritmo corto: el FAQ resuelve objeciones sueltas, no carga un argumento.
    <section className="py-10 lg:py-14">
      <div className="max-w-3xl mx-auto">
        <h2
          ref={refTitulo}
          className="pf-reveal text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-12 leading-tight"
        >
          Preguntas frecuentes
        </h2>

        <div ref={refLista} style={retardo(100)} className="pf-reveal space-y-3">
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
