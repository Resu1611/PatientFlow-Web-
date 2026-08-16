import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { DASHBOARD_SCREENSHOT_URL } from '../../config';
import { retardo, useReveal } from '../../lib/reveal';
import { PRUEBA } from '../../data/landing';

/**
 * Prueba verificable. Regla 1 de CLAUDE.md: aquí NO va prueba social — ni
 * testimonios, ni nombres, ni logos, ni métricas de clientes. Solo la captura
 * real del dashboard propio.
 *
 * Si la imagen no existe todavía, se muestra el placeholder con dimensiones.
 *
 * La captura entra con más recorrido y más tiempo que el texto que la
 * introduce: es la única evidencia de toda la página y pesa distinto. No lleva
 * ningún efecto propio — el peso lo da el reloj, no un adorno encima de la
 * prueba, que es lo último que conviene decorar.
 */
export default function VerifiableProof() {
  const [imagenDisponible, setImagenDisponible] = useState(true);

  const refTitulo = useReveal<HTMLDivElement>();
  const refImagen = useReveal<HTMLImageElement>();

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

        {imagenDisponible ? (
          <img
            ref={refImagen}
            src={DASHBOARD_SCREENSHOT_URL}
            alt="Dashboard del sistema mostrando los tiempos de respuesta medidos"
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            onError={() => setImagenDisponible(false)}
            style={retardo(120)}
            className="pf-reveal pf-tempo-media w-full rounded-2xl border border-border-subtle shadow-media"
          />
        ) : (
          /* ⚠️ RENZO: sube la captura a public/dashboard-tiempos-respuesta.png
             (1200×750) y este bloque desaparece solo.

             Sin entrada, a diferencia de la imagen: este bloque no existe hasta
             que la carga de la imagen falla, y esa falla ocurre cuando el
             navegador decide pedir el archivo (`loading="lazy"`), no cuando el
             visitante llega. Bajando rápido el bloque llegaba a montarse ya
             fuera de pantalla, se quedaba esperando una entrada que nunca se
             disparaba, y el hueco de la prueba salía en blanco. Un estado de
             error no se presenta: está. */
          <div
            className="w-full rounded-2xl border-2 border-dashed border-accent-main/25 bg-bg-card/40 flex flex-col items-center justify-center text-center px-6 aspect-[16/10]"
            role="img"
            aria-label="Espacio reservado para la captura real del dashboard"
          >
            <ImageIcon
              className="w-8 h-8 text-accent-main/40 mb-4"
              aria-hidden="true"
            />
            <p className="text-text-main font-semibold text-sm sm:text-base">
              {PRUEBA.placeholderTitulo}
            </p>
            <p className="text-text-subtle text-xs sm:text-sm mt-2 max-w-sm">
              {PRUEBA.placeholderNota}
            </p>
            <p className="text-text-subtle text-xs mt-4 font-mono">
              1200 × 750 px · public/dashboard-tiempos-respuesta.png
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
