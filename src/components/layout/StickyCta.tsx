import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { BOOKING_ANCHOR_ID } from '../../config';
import { trackEvent } from '../../lib/analytics';

/**
 * CTA fija al borde inferior, solo en móvil y tablet.
 *
 * El problema que resuelve: entre la calculadora y el calendario había ~5.700px
 * — casi siete pantallas de 390px — sin un solo elemento tocable, y el único
 * CTA permanente era la píldora del header, arriba del todo, que es el píxel
 * más lejano al pulgar de una mano sola. El 90% del tráfico llega por WhatsApp
 * en celular, así que esa esquina no es una esquina cualquiera.
 *
 * No aparece de entrada: mientras el visitante está en el hero ya tiene el CTA
 * grande delante y una barra encima sería ruido. Aparece al pasar el
 * centinela (justo después de la calculadora, cuando ya vio su propia cifra) y
 * se retira sola cuando el calendario entra en pantalla, porque a partir de ahí
 * competiría con el punto de conversión real.
 *
 * `visibility` y no `aria-hidden`: esconder con aria un botón que sigue siendo
 * enfocable deja un destino de tabulación invisible. `invisible` lo saca del
 * orden de tabulación y del árbol de accesibilidad de una sola vez, y además
 * es animable.
 */
export interface StickyCtaProps {
  /** Id del elemento que, al quedar por encima del viewport, revela la barra. */
  revealAfterId: string;
}

export default function StickyCta({ revealAfterId }: StickyCtaProps) {
  const [pasoCentinela, setPasoCentinela] = useState(false);
  const [calendarioVisible, setCalendarioVisible] = useState(false);

  // Posición de scroll, no IntersectionObserver.
  //
  // El centinela con IO se veía correcto y fallaba en un caso real: el
  // observer solo avisa cuando el elemento CRUZA el borde del viewport, y un
  // salto instantáneo — un link de ancla con scroll-behavior:auto, que es lo
  // que recibe cualquiera con reduced-motion activo, o el botón "atrás" del
  // navegador — lo lleva de "encima del viewport" a "debajo del viewport" en
  // un solo fotograma. Los dos estados dan isIntersecting:false, así que no
  // hay cambio de estado, no se dispara nada y la barra se quedaba visible
  // sobre el hero. Comprobado en Chrome: saltar del pie a y=0 la dejaba
  // encendida. Comparar scrollY contra la posición del centinela no depende
  // de cruces y no se puede saltar.
  useEffect(() => {
    const centinela = document.getElementById(revealAfterId);
    if (!centinela) return;

    let offsetCentinela = 0;
    const medir = () => {
      offsetCentinela = centinela.getBoundingClientRect().top + window.scrollY;
      evaluar();
    };
    const evaluar = () => setPasoCentinela(window.scrollY > offsetCentinela);

    medir();
    window.addEventListener('scroll', evaluar, { passive: true });
    window.addEventListener('resize', medir);
    return () => {
      window.removeEventListener('scroll', evaluar);
      window.removeEventListener('resize', medir);
    };
  }, [revealAfterId]);

  useEffect(() => {
    const calendario = document.getElementById(BOOKING_ANCHOR_ID);
    if (!calendario) return;

    const io = new IntersectionObserver(
      ([entry]) => setCalendarioVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(calendario);
    return () => io.disconnect();
  }, []);

  const visible = pasoCentinela && !calendarioVisible;

  return (
    <div
      className={[
        'lg:hidden fixed inset-x-0 bottom-0 z-40',
        'px-3 pt-3',
        // Respeta la barra de gestos del iPhone.
        'pb-[calc(0.75rem+env(safe-area-inset-bottom))]',
        'bg-bg-main/80 backdrop-blur-md border-t border-border-subtle',
        // Entra con deceleración natural, sale más rápido: una barra que se
        // retira despacio se lee como latencia, no como una decisión.
        'transition-[transform,visibility] motion-reduce:transition-none',
        visible
          ? 'visible translate-y-0 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]'
          : 'invisible translate-y-full duration-200 ease-in',
      ].join(' ')}
    >
      <Button
        href={`#${BOOKING_ANCHOR_ID}`}
        variant="primary"
        size="lg"
        icon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
        fullWidth
        onClick={() => trackEvent('cta_final_click', { ubicacion: 'barra_fija' })}
      >
        Agendar demo de 20 minutos
      </Button>
    </div>
  );
}
