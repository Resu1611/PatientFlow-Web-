import React from 'react';
import { CalendarDays } from 'lucide-react';
import { BOOKING_ANCHOR_ID, CALENDAR_EMBED_URL } from '../../config';
import { trackEvent } from '../../lib/analytics';
import { AGENDADO } from '../../data/landing';

/**
 * Único punto de conversión de la página. Todos los CTA anclan aquí.
 *
 * ⚠️ RENZO: pega la URL de tu calendario en `CALENDAR_EMBED_URL`
 * (src/config.ts). Mientras esté vacía se muestra el aviso de abajo en vez
 * de un iframe roto.
 */
export default function BookingSection() {
  const tieneCalendario = CALENDAR_EMBED_URL.trim().length > 0;

  return (
    <section id={BOOKING_ANCHOR_ID} className="py-12 lg:py-20 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-4 leading-tight">
          {AGENDADO.titulo}
        </h2>

        <p className="text-text-muted text-sm sm:text-base text-center max-w-xl mx-auto mb-9 leading-relaxed">
          {AGENDADO.notaCalificacion}
        </p>

        <div className="glass-card rounded-3xl p-3 sm:p-5 overflow-hidden">
          {tieneCalendario ? (
            <iframe
              src={CALENDAR_EMBED_URL}
              title="Calendario para agendar la demo de 20 minutos"
              loading="lazy"
              onLoad={() => trackEvent('calendario_embed_cargado')}
              className="w-full rounded-2xl bg-surface-main min-h-[680px] sm:min-h-[720px]"
              style={{ border: 0 }}
            />
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-accent-main/25 bg-bg-card/40 flex flex-col items-center justify-center text-center px-6 py-16 min-h-[420px]">
              <CalendarDays
                className="w-8 h-8 text-accent-main/40 mb-4"
                aria-hidden="true"
              />
              <p className="text-text-main font-semibold">
                Falta conectar el calendario
              </p>
              <p className="text-text-subtle text-sm mt-3 max-w-md leading-relaxed">
                Pega la URL del embed de GoHighLevel en{' '}
                <code className="font-mono text-accent-main/80">
                  CALENDAR_EMBED_URL
                </code>{' '}
                dentro de{' '}
                <code className="font-mono text-accent-main/80">src/config.ts</code>.
              </p>
              <p className="text-text-subtle/70 text-xs mt-4 font-mono">
                GHL → Calendars → Share → copia la URL del src del iframe
              </p>
            </div>
          )}
        </div>

        {/* P.D. de cierre — la última cosa que lee antes de agendar. */}
        <div className="mt-9 glass-card-gold rounded-2xl p-6 sm:p-7">
          <p className="text-text-main text-sm sm:text-base leading-relaxed">
            <span className="font-bold text-gold">P.D. </span>
            {AGENDADO.posdata}
          </p>
        </div>
      </div>
    </section>
  );
}
