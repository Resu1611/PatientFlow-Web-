import React from 'react';
import { BadgeCheck } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import IconChip from '../ui/IconChip';
import { retardo, useReveal } from '../../lib/reveal';
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
 *
 * ── El movimiento ──
 *
 * Es la entrada más lenta y de más recorrido de la landing (`.pf-tempo-peso`,
 * 720ms), y ese tempo es exclusivo suyo: en cuanto otra cosa lo use, deja de
 * significar "esto pesa más que el resto".
 *
 * El sello llega después de la tarjeta, no con ella. Una garantía se lee y
 * luego se firma; el chip apareciendo medio segundo tarde, ya con el texto
 * puesto, es ese gesto. Es lo único de esta sección que se mueve aparte, y no
 * hace falta nada más — la garantía se sostiene sola.
 */

/**
 * El sello no sube: crece un poco desde el centro. Un desplazamiento vertical
 * lo leería como "otro elemento que llega"; una escala corta lo lee como algo
 * que se aplica encima de lo que ya está puesto.
 *
 * 640ms es después de que la tarjeta termina de asentarse (120 de retardo +
 * 720 de duración, con el ojo dándola por llegada bastante antes del final).
 */
const sello = (): React.CSSProperties =>
  ({
    ['--pf-retardo' as string]: '640ms',
    ['--pf-dur' as string]: '380ms',
    ['--pf-viaje' as string]: '0px',
    ['--pf-escala' as string]: '0.86',
  }) as React.CSSProperties;

export default function Guarantee() {
  const refTitulo = useReveal<HTMLHeadingElement>();
  const refTarjeta = useReveal<HTMLElement>();
  const refSello = useReveal<HTMLSpanElement>();

  return (
    <section className="py-16 lg:py-28">
      <div className="max-w-3xl mx-auto">
        <h2
          ref={refTitulo}
          className="pf-reveal text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-10 leading-tight"
        >
          {GARANTIA.etiqueta}
        </h2>

        <GlassCard
          variant="gold"
          padding="lg"
          radius="lg"
          ref={refTarjeta}
          style={retardo(120)}
          className="pf-reveal pf-tempo-peso flex flex-col sm:flex-row gap-6 sm:items-start"
        >
          {/* El sello se observa por su cuenta: cuelga de su propia entrada en
              pantalla, no de la de la tarjeta, así que su retardo se cuenta
              desde que él aparece y no depende de dónde quedó el scroll. */}
          <IconChip
            icon={BadgeCheck}
            tone="gold"
            size="lg"
            ref={refSello}
            style={sello()}
            className="pf-reveal"
          />
          <p className="text-text-main text-base sm:text-lg leading-relaxed">
            {GARANTIA.texto}
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
