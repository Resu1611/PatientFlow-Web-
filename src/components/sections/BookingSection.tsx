import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ExternalLink, TriangleAlert } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import {
  BOOKING_ANCHOR_ID,
  CALENDAR_EMBED_URL,
  CALENDAR_DIRECT_URL,
} from '../../config';
import { trackEvent } from '../../lib/analytics';
import { AGENDADO } from '../../data/landing';

/**
 * Único punto de conversión de la página. Todos los CTA anclan aquí.
 *
 * Es el sitio donde la página no se puede permitir fallar en silencio, y era
 * justo donde fallaba en silencio: un iframe de un tercero con `loading="lazy"`
 * dentro de un hueco de 680px, sin esqueleto, sin estado de error y sin ninguna
 * otra forma de agendar si no pintaba. El 90% del tráfico abre esto dentro del
 * navegador embebido de WhatsApp, que es exactamente donde los embeds de
 * terceros se caen sin avisar.
 *
 * Ahora hay tres estados reales:
 *   1. cargando  — esqueleto con la forma del calendario, para que se note que
 *                  está pasando algo y no que está roto;
 *   2. cargado   — el iframe;
 *   3. tarda demasiado (6s) — se ofrece abrir el calendario en pestaña nueva.
 *      No sustituye al iframe: si termina de cargar, el aviso desaparece solo.
 *
 * `loading="lazy"` se quitó a propósito. Es la razón de ser de la página: no
 * tiene sentido diferirlo.
 *
 * ⚠️ RENZO: pega la URL de tu calendario en `CALENDAR_EMBED_URL`
 * (src/config.ts). Mientras esté vacía se muestra el aviso de abajo en vez
 * de un iframe roto.
 */

const MS_ANTES_DE_OFRECER_SALIDA = 6000;

/** Esqueleto con la silueta del widget: cabecera, rejilla de días, columna de horas. */
function EsqueletoCalendario() {
  return (
    <div
      className="absolute inset-0 rounded-2xl bg-surface-main p-5 sm:p-7 animate-pulse motion-reduce:animate-none"
      aria-hidden="true"
    >
      <div className="h-5 w-40 rounded-md bg-surface-2" />
      <div className="mt-6 grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-surface-2" />
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-9 w-full rounded-lg bg-surface-2" />
        <div className="h-9 w-3/4 rounded-lg bg-surface-2" />
      </div>
    </div>
  );
}

export default function BookingSection() {
  const tieneCalendario = CALENDAR_EMBED_URL.trim().length > 0;
  const urlDirecta = CALENDAR_DIRECT_URL.trim() || CALENDAR_EMBED_URL.trim();

  const [cargado, setCargado] = useState(false);
  const [tardaDemasiado, setTardaDemasiado] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!tieneCalendario || cargado) return;
    timeoutRef.current = setTimeout(
      () => setTardaDemasiado(true),
      MS_ANTES_DE_OFRECER_SALIDA,
    );
    return () => clearTimeout(timeoutRef.current);
  }, [tieneCalendario, cargado]);

  const alCargar = () => {
    setCargado(true);
    setTardaDemasiado(false);
    trackEvent('calendario_embed_cargado');
  };

  return (
    <section id={BOOKING_ANCHOR_ID} className="py-16 lg:py-28 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-4 leading-tight">
          {AGENDADO.titulo}
        </h2>

        <p className="text-text-muted text-sm sm:text-base text-center max-w-xl mx-auto mb-9 leading-relaxed">
          {AGENDADO.notaCalificacion}
        </p>

        {/* Marco, no tarjeta de contenido: el relleno es el filo alrededor del
            iframe, así que va explícito en vez de salir de la escala. */}
        <GlassCard
          padding="none"
          radius="lg"
          className="p-3 sm:p-5 overflow-hidden"
        >
          {tieneCalendario ? (
            <div className="relative min-h-[680px] sm:min-h-[720px]">
              <iframe
                src={CALENDAR_EMBED_URL}
                title="Calendario para agendar la demo de 20 minutos"
                onLoad={alCargar}
                className={[
                  'w-full h-full absolute inset-0 rounded-2xl bg-surface-main',
                  'transition-opacity duration-300 motion-reduce:transition-none',
                  cargado ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
                style={{ border: 0 }}
              />

              {!cargado && <EsqueletoCalendario />}

              {/* Región viva: quien usa lector de pantalla se entera de que
                  está cargando y de que apareció una alternativa. */}
              <p className="sr-only" role="status">
                {cargado
                  ? 'Calendario cargado.'
                  : 'Cargando el calendario para agendar la demo.'}
              </p>
            </div>
          ) : import.meta.env.DEV ? (
            /* Bloque de instrucciones: SOLO en desarrollo. En producción esto
               le mostraría a una dueña de clínica la ruta de un archivo fuente
               justo en el momento de comprar. */
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
              <p className="text-text-subtle text-xs mt-4 font-mono">
                GHL → Calendars → Share → copia la URL del src del iframe
              </p>
            </div>
          ) : (
            /* Producción sin calendario configurado: no debería pasar nunca,
               pero si pasa el visitante ve una frase humana, no una ruta. */
            <div className="rounded-2xl bg-bg-card/40 flex flex-col items-center justify-center text-center px-6 py-16 min-h-[420px]">
              <CalendarDays
                className="w-8 h-8 text-accent-main/40 mb-4"
                aria-hidden="true"
              />
              <p className="text-text-main font-semibold">
                El calendario no está disponible en este momento
              </p>
              <p className="text-text-muted text-sm mt-3 max-w-md leading-relaxed">
                Respóndeme por WhatsApp al mismo chat por el que te llegó este
                link y te agendo la demo a mano.
              </p>
            </div>
          )}
        </GlassCard>

        {/* Salida de emergencia: aparece solo si el embed tarda demasiado, y
            desaparece sola si termina de cargar. */}
        {tieneCalendario && tardaDemasiado && !cargado && urlDirecta && (
          <div
            className="mt-5 rounded-2xl border border-gold/30 bg-gold/[0.07] px-5 py-5 flex flex-col sm:flex-row sm:items-center gap-4"
            role="alert"
          >
            <TriangleAlert
              className="w-5 h-5 text-gold shrink-0"
              aria-hidden="true"
            />
            <p className="text-text-main text-sm leading-relaxed flex-1">
              El calendario está tardando en cargar. Ábrelo directamente y
              agenda igual.
            </p>
            <Button
              href={urlDirecta}
              target="_blank"
              variant="primary"
              size="md"
              icon={<ExternalLink className="w-4 h-4" aria-hidden="true" />}
              className="shrink-0"
              onClick={() =>
                trackEvent('cta_final_click', { ubicacion: 'fallback_embed' })
              }
            >
              Abrir el calendario
            </Button>
          </div>
        )}

        {/* P.D. de cierre — la última cosa que lee antes de agendar. */}
        <GlassCard variant="gold" className="mt-9">
          <p className="text-text-main text-sm sm:text-base leading-relaxed">
            <span className="font-bold text-gold">P.D. </span>
            {AGENDADO.posdata}
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
