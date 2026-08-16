import React from 'react';
import { BadgeCheck } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import IconChip from '../ui/IconChip';
import { GARANTIA } from '../../data/landing';

/**
 * La garantía es lo único de esta página que a Renzo le cuesta dinero si falla,
 * y lo único que una agencia no puede copiar sin cambiar su modelo de negocio.
 * Estaba puesta como si fuera una nota al pie: un h2 de 12px en mayúsculas —
 * o sea con el tamaño de un eyebrow — dentro de la sección más corta de la
 * página, mientras un recuadro vacío a la espera de una captura se llevaba un
 * titular de 36px. Ahora tiene el peso de sección que le corresponde.
 *
 * Movida además justo encima del calendario (ver LandingPage.tsx): lo último
 * que se lee antes de agendar debe ser la reversión de riesgo, no una pregunta
 * frecuente sobre números de WhatsApp.
 *
 * Se le quitó la barra dorada vertical de 6px del borde izquierdo: es
 * decoración de plantilla, y el sobre dorado de la tarjeta con el chip ya
 * dicen "esto es distinto" sin ella.
 */
export default function Guarantee() {
  return (
    <section className="py-16 lg:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-10 leading-tight">
          {GARANTIA.etiqueta}
        </h2>

        <GlassCard
          variant="gold"
          padding="lg"
          radius="lg"
          className="flex flex-col sm:flex-row gap-6 sm:items-start"
        >
          <IconChip icon={BadgeCheck} tone="gold" size="lg" />
          <p className="text-text-main text-base sm:text-lg leading-relaxed">
            {GARANTIA.texto}
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
