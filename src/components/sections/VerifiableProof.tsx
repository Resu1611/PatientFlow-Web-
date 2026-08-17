import React from 'react';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import { DASHBOARD_SCREENSHOT_URL } from '../../config';
import { useReveal } from '../../lib/reveal';
import { PRUEBA } from '../../data/landing';

/**
 * Prueba verificable. Regla 1 de CLAUDE.md: aquí NO va prueba social — ni
 * testimonios, ni nombres, ni logos, ni métricas de clientes. Solo la captura
 * real del dashboard propio.
 *
 * Si la imagen no existe todavía, ImagePlaceholder muestra el placeholder con
 * dimensiones — misma lógica de fallback que usa SystemPieces para su propia
 * evidencia, ahora en un solo lugar (ver src/components/ui/ImagePlaceholder.tsx).
 *
 * La captura entra con más recorrido y más tiempo que el texto que la
 * introduce: es la única evidencia de toda la página y pesa distinto. No lleva
 * ningún efecto propio — el peso lo da el reloj, no un adorno encima de la
 * prueba, que es lo último que conviene decorar.
 */
export default function VerifiableProof() {
  const refTitulo = useReveal<HTMLDivElement>();

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <div ref={refTitulo} className="pf-reveal">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-5 leading-tight">
            {PRUEBA.titulo}
          </h2>

          <p className="text-text-muted text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto mb-10">
            {PRUEBA.texto}
          </p>
        </div>

        <ImagePlaceholder
          src={DASHBOARD_SCREENSHOT_URL}
          alt="Dashboard del sistema mostrando los tiempos de respuesta medidos"
          width={1200}
          height={750}
          aspectClass="aspect-[16/10]"
          placeholderTitulo={PRUEBA.placeholderTitulo}
          placeholderNota={PRUEBA.placeholderNota}
          fileHint="1200 × 750 px · public/dashboard-tiempos-respuesta.png"
        />
      </div>
    </section>
  );
}
