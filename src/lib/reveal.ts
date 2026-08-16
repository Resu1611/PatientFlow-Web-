import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

/**
 * Revelado por scroll — el transporte del sistema de movimiento de la página.
 *
 * Lo que decide QUÉ se mueve está en cada sección y en `src/index.css`; esto
 * solo resuelve el cuándo, y lo hace con un único IntersectionObserver para
 * toda la landing en vez de uno por elemento. Son ~30 objetivos: treinta
 * observers separados es trabajo de layout repetido treinta veces en cada
 * scroll de un gama baja, que es justo el dispositivo del 90% del tráfico.
 *
 * Cada objetivo se deja de observar en cuanto entra. El movimiento de entrada
 * ocurre una sola vez: una sección que se re-anima al volver a subir se lee
 * como un fallo, no como una decisión.
 *
 * ── Por qué el contenido nace visible ──
 *
 * El estado oculto vive detrás de `<html data-motion>`, que se marca desde JS
 * (ver src/main.tsx). Si el script no llega — 4G malo, navegador embebido de
 * WhatsApp con el JS a medio bajar — no hay atributo, no hay regla que
 * esconda nada y la página se lee entera. Nunca al revés.
 *
 * El margen inferior recorta el disparo un 12%: en 390px un elemento que
 * asoma un píxel por el borde de la pantalla todavía no se está mirando, y
 * animarlo ahí gasta la entrada donde nadie la ve.
 */

const MARGEN = '0px 0px -12% 0px';

type AlEntrar = (elemento: Element) => void;

let observer: IntersectionObserver | null = null;
const pendientes = new WeakMap<Element, AlEntrar>();

function obtenerObserver(): IntersectionObserver | null {
  if (observer) return observer;
  if (typeof IntersectionObserver === 'undefined') return null;

  observer = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        const alEntrar = pendientes.get(entrada.target);
        observer?.unobserve(entrada.target);
        pendientes.delete(entrada.target);
        alEntrar?.(entrada.target);
      }
    },
    { rootMargin: MARGEN, threshold: 0 },
  );

  return observer;
}

/**
 * Avisa una sola vez cuando `elemento` entra en pantalla. Si el navegador no
 * trae IntersectionObserver, avisa de inmediato: el contenido se muestra sin
 * animación, que es el fallo correcto.
 */
function observarUnaVez(elemento: Element, alEntrar: AlEntrar): () => void {
  const io = obtenerObserver();
  if (!io) {
    alEntrar(elemento);
    return () => {};
  }

  pendientes.set(elemento, alEntrar);
  io.observe(elemento);

  return () => {
    io.unobserve(elemento);
    pendientes.delete(elemento);
  };
}

/**
 * Marca el elemento con `data-revealed` al entrar en pantalla. Todo lo visual
 * cuelga de ese atributo en CSS: el elemento mismo si lleva `.pf-reveal`, y
 * sus hijos coreografiados (el riel de "Cómo funciona", la celda que se
 * resuelve en Benchmarks) desde el mismo disparo.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    return observarUnaVez(nodo, (elemento) => {
      (elemento as HTMLElement).dataset.revealed = '';
    });
  }, []);

  return ref;
}

/**
 * Igual que `useReveal` pero devuelve el estado a React, para el movimiento
 * que no es CSS. Lo usa la calculadora: su cifra cuenta desde cero la primera
 * vez que aparece, y eso vive en un requestAnimationFrame, no en una clase.
 *
 * Arranca en `true` si no hay IntersectionObserver — sin él la cifra debe
 * mostrarse, no quedarse en cero esperando un aviso que no va a llegar.
 */
export function useEnVista<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [enVista, setEnVista] = useState(
    () => typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    return observarUnaVez(nodo, () => setEnVista(true));
  }, []);

  return [ref, enVista] as const;
}

/**
 * Retardo de un elemento dentro de la cascada de su sección. Mismo gesto que
 * `entrada()` en Hero.tsx: la secuencia se lee en el JSX, en orden, en vez de
 * repartida en clases con números en el nombre.
 */
export const retardo = (ms: number): CSSProperties =>
  ({ ['--pf-retardo' as string]: `${ms}ms` }) as CSSProperties;
