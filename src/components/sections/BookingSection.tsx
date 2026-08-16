import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ExternalLink, TriangleAlert } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import {
  BOOKING_ANCHOR_ID,
  CAL_CSS_VARS,
  CAL_ELEMENT_ID,
  CAL_LINK,
  CAL_NAMESPACE,
  CALENDAR_DIRECT_URL,
} from '../../config';
import { mountCalInline } from '../../lib/cal';
import { trackEvent } from '../../lib/analytics';
import { retardo, useReveal } from '../../lib/reveal';
import { AGENDADO } from '../../data/landing';

/**
 * Único punto de conversión de la página. Todos los CTA anclan aquí.
 *
 * Es el sitio donde la página no se puede permitir fallar en silencio, y era
 * justo donde fallaba en silencio: un embed de un tercero dentro de un hueco de
 * 680px, sin esqueleto, sin estado de error y sin ninguna otra forma de agendar
 * si no pintaba. El 90% del tráfico abre esto dentro del navegador embebido de
 * WhatsApp, que es exactamente donde los embeds de terceros se caen sin avisar.
 *
 * Estados reales:
 *   1. cargando  — esqueleto con la forma del calendario, para que se note que
 *                  está pasando algo y no que está roto;
 *   2. cargado   — el widget (`linkReady`);
 *   3. fallido   — `linkFailed`, o 8s sin noticias. Se ofrece abrir el
 *                  calendario en pestaña nueva. No sustituye al embed: si
 *                  termina de cargar, el aviso desaparece solo.
 *
 * El timeout sigue existiendo aunque ahora Cal avise de sus propios fallos,
 * porque el modo de fallo que más miedo da es que `embed.js` ni siquiera baje
 * — y en ese caso no hay nadie que pueda emitir `linkFailed`.
 */

const MS_ANTES_DE_OFRECER_SALIDA = 8000;

/** Esqueleto con la silueta del widget: cabecera, rejilla de días, columna de horas. */
function EsqueletoCalendario() {
  return (
    <div
      className="absolute inset-0 rounded-2xl bg-bg-card p-5 sm:p-7 animate-pulse motion-reduce:animate-none"
      aria-hidden="true"
    >
      <div className="h-5 w-40 rounded-md bg-primary-main" />
      <div className="mt-6 grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-primary-main" />
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-9 w-full rounded-lg bg-primary-main" />
        <div className="h-9 w-3/4 rounded-lg bg-primary-main" />
      </div>
    </div>
  );
}

export default function BookingSection() {
  const tieneCalendario = CAL_LINK.trim().length > 0;

  const [cargado, setCargado] = useState(false);
  const [fallido, setFallido] = useState(false);

  // El calendario NO entra, y es la única cosa de la página que se queda
  // quieta a propósito.
  //
  // Dos motivos, y los dos apuntan al mismo sitio. El de diseño: es el destino
  // de todos los CTA de la landing, así que cuando el visitante llega tiene que
  // estar ya puesto, esperándolo. Hacer que el punto de conversión se presente
  // es meterle retardo justo a lo único que importa, y el widget ya tiene su
  // propio lenguaje para el tiempo — el esqueleto que late mientras carga.
  //
  // El técnico: mantener el contenedor del iframe sin `transform` durante los
  // primeros segundos. Cal se mide solo dentro de ese div, el 90% del tráfico
  // lo abre en el navegador embebido de WhatsApp, y este es exactamente el
  // sitio donde CLAUDE.md no permite fallar en silencio. No vale la pena
  // arriesgar el calendario por una entrada.
  const refTitulo = useReveal<HTMLDivElement>();
  const refPosdata = useReveal<HTMLElement>();

  // Los callbacks viven en un ref para que el efecto que monta el iframe
  // dependa solo del enlace: si dependiera de las funciones, cada render
  // volvería a montar el calendario desde cero.
  const cargadoRef = useRef(false);

  useEffect(() => {
    if (!tieneCalendario) return;

    if (import.meta.env.DEV && !CAL_LINK.endsWith('/20min')) {
      console.warn(
        `[Patient Flow] El calendario apunta a "${CAL_LINK}" pero la página ` +
          'promete una demo de 20 minutos. Crea el evento de 20 min en Cal.com ' +
          'y actualiza CAL_LINK en src/config.ts.',
      );
    }

    const desmontar = mountCalInline(
      {
        elementId: CAL_ELEMENT_ID,
        calLink: CAL_LINK,
        namespace: CAL_NAMESPACE,
        cssVars: CAL_CSS_VARS,
      },
      {
        onReady: () => {
          cargadoRef.current = true;
          setCargado(true);
          setFallido(false);
          trackEvent('calendario_embed_cargado');
        },
        onFailed: () => {
          setFallido(true);
          trackEvent('calendario_embed_fallido', { motivo: 'link_failed' });
        },
        onBooked: () => {
          trackEvent('demo_agendada', { calLink: CAL_LINK });
        },
      },
    );

    const timeout = setTimeout(() => {
      if (cargadoRef.current) return;
      setFallido(true);
      trackEvent('calendario_embed_fallido', { motivo: 'timeout' });
    }, MS_ANTES_DE_OFRECER_SALIDA);

    return () => {
      clearTimeout(timeout);
      desmontar();
    };
  }, [tieneCalendario]);

  return (
    <section id={BOOKING_ANCHOR_ID} className="py-16 lg:py-28 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div ref={refTitulo} className="pf-reveal">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center mb-4 leading-tight">
            {AGENDADO.titulo}
          </h2>

          <p className="text-text-muted text-sm sm:text-base text-center max-w-xl mx-auto mb-9 leading-relaxed">
            {AGENDADO.notaCalificacion}
          </p>
        </div>

        {/* Marco, no tarjeta de contenido: el relleno es el filo alrededor del
            widget, así que va explícito en vez de salir de la escala. */}
        <GlassCard
          padding="none"
          radius="lg"
          className="p-3 sm:p-5 overflow-hidden"
        >
          {tieneCalendario ? (
            <div className="relative min-h-[680px] sm:min-h-[720px]">
              {/* Cal inyecta su iframe aquí dentro y lo redimensiona solo, así
                  que este div va en flujo normal: el alto lo manda el widget,
                  no una altura fija que corte el mes en 390px. */}
              <div
                id={CAL_ELEMENT_ID}
                className={[
                  'w-full rounded-2xl overflow-hidden',
                  'transition-opacity duration-300 motion-reduce:transition-none',
                  cargado ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              />

              {!cargado && <EsqueletoCalendario />}

              {/* Región viva: quien usa lector de pantalla se entera de que
                  está cargando y de que apareció una alternativa. */}
              <p className="sr-only" role="status">
                {cargado
                  ? 'Calendario cargado.'
                  : fallido
                    ? 'El calendario no cargó. Hay un enlace para abrirlo en una pestaña nueva.'
                    : 'Cargando el calendario para agendar la demo.'}
              </p>
            </div>
          ) : (
            /* No debería pasar nunca — CAL_LINK está en el código, no en una
               variable de entorno — pero si pasa, la visitante ve una frase
               humana y una salida, no una ruta de archivo. */
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

        {/* Salida de emergencia: aparece solo si el embed falló o tardó
            demasiado, y desaparece sola si termina de cargar. */}
        {tieneCalendario && fallido && !cargado && (
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
              href={CALENDAR_DIRECT_URL}
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
        <GlassCard
          variant="gold"
          ref={refPosdata}
          style={retardo(160)}
          className="pf-reveal mt-9"
        >
          <p className="text-text-main text-sm sm:text-base leading-relaxed">
            <span className="font-bold text-gold">P.D. </span>
            {AGENDADO.posdata}
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
