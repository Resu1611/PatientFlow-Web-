import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, TriangleAlert } from 'lucide-react';
import Slider from '../ui/Slider';
import Button from '../ui/Button';
import { BOOKING_ANCHOR_ID } from '../../config';
import { once, trackEvent } from '../../lib/analytics';
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

          <hr className="my-8 border-t border-border-subtle" />

          {califica ? (
            <div aria-live="polite">
              <p className="text-sm text-text-muted mb-2">
                {CALCULADORA.resultadoPrefijo}
              </p>
              <p className="text-4xl sm:text-5xl font-bold gradient-text-alert tabular-nums leading-none mb-2">
                {soles.format(dineroPerdidoMes)}
              </p>
              <p className="text-sm text-text-muted mb-1">
                {CALCULADORA.resultadoSufijo}
              </p>
              <p className="text-sm text-text-subtle">
                ≈ {entero.format(pacientesPerdidosMes)}{' '}
                {CALCULADORA.detallePacientes}
              </p>

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
              aria-live="polite"
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
