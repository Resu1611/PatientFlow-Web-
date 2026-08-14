import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, TriangleAlert } from 'lucide-react';
import Slider from '../ui/Slider';
import Button from '../ui/Button';
import { BOOKING_ANCHOR_ID } from '../../config';
import { once, trackEvent } from '../../lib/analytics';
import { useCountUp } from '../../lib/useCountUp';
import { CALCULADORA, MODELO_PERDIDA, FUENTE_CIFRAS } from '../../data/landing';

const soles = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  maximumFractionDigits: 0,
});

const entero = new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 });

/** Pérdida mensual estimada. Fórmula fijada en REDISEÑO.md — no improvisar. */
export function calcularPerdida(leadsSemanales: number, ticketPromedio: number) {
  const pacientesPerdidosMes =
    leadsSemanales * MODELO_PERDIDA.SEMANAS_POR_MES * MODELO_PERDIDA.TASA_FUGA;
  const dineroPerdidoMes =
    pacientesPerdidosMes * ticketPromedio * MODELO_PERDIDA.TASA_CIERRE;
  return { pacientesPerdidosMes, dineroPerdidoMes };
}

export default function LossCalculator() {
  const [leads, setLeads] = useState<number>(MODELO_PERDIDA.LEADS_DEFAULT);
  const [ticket, setTicket] = useState<number>(MODELO_PERDIDA.TICKET_DEFAULT);

  // Un solo evento por sesión, no uno por píxel arrastrado.
  const marcarUso = useRef(once('calculadora_usada')).current;

  const { pacientesPerdidosMes, dineroPerdidoMes } = useMemo(
    () => calcularPerdida(leads, ticket),
    [leads, ticket],
  );

  // El número "cuenta" hacia el nuevo valor en vez de saltar — se siente
  // calculado en vivo, no solo redibujado.
  const dineroAnimado = useCountUp(dineroPerdidoMes);
  const pacientesAnimados = useCountUp(pacientesPerdidosMes);

  const califica = leads >= MODELO_PERDIDA.LEADS_UMBRAL_CALIFICA;

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main mb-4 leading-tight">
            {CALCULADORA.titulo}
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {CALCULADORA.intro}
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-9">
          <div className="space-y-8">
            <Slider
              id="leads-semanales"
              label={CALCULADORA.labelLeads}
              valueLabel={entero.format(leads)}
              min={MODELO_PERDIDA.LEADS_MIN}
              max={MODELO_PERDIDA.LEADS_MAX}
              value={leads}
              onChange={(v) => {
                setLeads(v);
                marcarUso({ leads: v, ticket });
              }}
              hint={`${MODELO_PERDIDA.LEADS_MIN} a ${MODELO_PERDIDA.LEADS_MAX} consultas por semana`}
            />

            <Slider
              id="ticket-promedio"
              label={CALCULADORA.labelTicket}
              valueLabel={soles.format(ticket)}
              min={MODELO_PERDIDA.TICKET_MIN}
              max={MODELO_PERDIDA.TICKET_MAX}
              step={MODELO_PERDIDA.TICKET_PASO}
              value={ticket}
              onChange={(v) => {
                setTicket(v);
                marcarUso({ leads, ticket: v });
              }}
              hint={`${soles.format(MODELO_PERDIDA.TICKET_MIN)} a ${soles.format(MODELO_PERDIDA.TICKET_MAX)} por tratamiento`}
            />
          </div>

          {/* Línea de corte estilo recibo — separa los inputs del resultado. */}
          <div
            aria-hidden="true"
            className="my-8 border-t border-dashed border-border-subtle"
          />

          {/* Una sola región viva, permanente y solo para lectores de pantalla.
              Anuncia el valor ya asentado (no `dineroAnimado`): si se leyera la
              cifra animada, cada arrastre del slider dispararía ~27 anuncios,
              uno por fotograma del contador. Vive fuera del ternario a
              propósito — un aria-live que se monta junto con su contenido no
              se anuncia de forma fiable. */}
          <p role="status" className="sr-only">
            {califica
              ? `${CALCULADORA.resultadoPrefijo}: ${soles.format(
                  Math.round(dineroPerdidoMes),
                )} ${CALCULADORA.resultadoSufijo} Aproximadamente ${entero.format(
                  Math.round(pacientesPerdidosMes),
                )} ${CALCULADORA.detallePacientes}.`
              : CALCULADORA.descalificacion}
          </p>

          {califica ? (
            <div>
              {/* Duplica lo que ya dice la región viva de arriba. */}
              <div aria-hidden="true">
                <p className="text-[0.7rem] tracking-widest uppercase text-text-subtle mb-3 font-mono">
                  {CALCULADORA.resultadoPrefijo}
                </p>
                <p className="text-4xl sm:text-5xl font-bold gradient-text-alert tabular-nums leading-none mb-2 font-mono">
                  {soles.format(Math.round(dineroAnimado))}
                </p>
                <p className="text-sm text-text-muted mb-1">
                  {CALCULADORA.resultadoSufijo}
                </p>
                <p className="text-sm text-text-subtle tabular-nums font-mono">
                  ≈ {entero.format(Math.round(pacientesAnimados))}{' '}
                  <span className="font-sans">
                    {CALCULADORA.detallePacientes}
                  </span>
                </p>
              </div>

              <div className="mt-8">
                <Button
                  href={`#${BOOKING_ANCHOR_ID}`}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
                  fullWidth
                  className="sm:w-auto"
                  onClick={() =>
                    trackEvent('cta_hero_click', {
                      ubicacion: 'calculadora',
                      leads,
                      ticket,
                      perdidaEstimada: Math.round(dineroPerdidoMes),
                    })
                  }
                >
                  {CALCULADORA.cta}
                </Button>
              </div>
            </div>
          ) : (
            /* Descalificar es parte de la conversión — CLAUDE.md, regla 4. */
            <div
              aria-hidden="true"
              className="flex gap-4 items-start rounded-2xl border border-red-400/25 bg-red-500/5 p-5"
            >
              <TriangleAlert
                className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-sm text-text-muted leading-relaxed">
                {CALCULADORA.descalificacion}
              </p>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs text-text-subtle text-center max-w-xl mx-auto leading-relaxed">
          {FUENTE_CIFRAS}
        </p>
      </div>
    </section>
  );
}
