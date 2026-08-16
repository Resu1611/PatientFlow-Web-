import React from 'react';
import { ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useReveal } from '../../lib/reveal';
import { BENCHMARKS, BENCHMARKS_SECCION } from '../../data/landing';
import type { Benchmark } from '../../data/landing';

/**
 * Benchmarks de industria: sin sistema vs con sistema, del booklet. Va justo
 * después de la calculadora — el visitante acaba de ver SU cifra de pérdida;
 * esta sección responde "¿y esto se arregla?" con rangos citados, no promesas.
 *
 * Abre la banda clara. El corte de color cae aquí a propósito: es la línea
 * exacta donde la página deja de hablar del problema y empieza a hablar de la
 * solución, así que salir del verde es el argumento, no decoración.
 *
 * Los valores usan font-mono (cifras con fuente, mismo criterio que la
 * calculadora). El intro conecta explícitamente con la cifra de arriba en vez
 * de competir con ella.
 *
 * Las dos celdas están deliberadamente desbalanceadas: la de "sin sistema" va
 * hundida en el gris de la banda; la de "con sistema" lleva el verde
 * institucional y peso. Antes eran dos cajas idénticas — se leían como un
 * empate, cuando lo que la sección afirma es un antes y un después.
 *
 * ── El movimiento ──
 *
 * Ese desbalance ahora también ocurre en el tiempo. Cada fila entra con las
 * dos celdas IGUALES — mismo gris hundido, mismo texto apagado, un empate — y
 * medio segundo después la celda derecha se resuelve: se llena de lima, se le
 * dibuja el borde, el texto sube al verde institucional y la flecha avanza.
 * No son dos estados que coexisten, es uno que le sucede al otro, que es
 * literalmente lo que la sección afirma.
 *
 * Aquí sí hay cascada entre filas, al revés que en "Las fugas": esto es una
 * lista que se lee como lista, una métrica tras otra. El escalonado es corto
 * (90ms) y con cuatro filas topa en 270ms — nadie espera a la última.
 */

/** Cascada entre filas. Corta a propósito: es ritmo de lista, no una escena. */
const PASO_CASCADA = 90;
/** Cuánto tarda cada fila en resolverse desde que aparece. */
const ESPERA_RESUELVE = 320;

/** Mismo gesto que `entrada()` en Hero.tsx: la secuencia se lee en el JSX. */
const tiempos = (fila: number, resuelve?: number) => ({
  ['--pf-retardo' as string]: `${fila}ms`,
  ...(resuelve === undefined
    ? null
    : { ['--pf-resuelve-retardo' as string]: `${resuelve}ms` }),
});

function FilaBenchmark({ b, indice }: { b: Benchmark; indice: number }) {
  const ref = useReveal<HTMLElement>();

  // Las dos transiciones arrancan en el mismo instante — cuando la fila recibe
  // `data-revealed` — así que el retardo de la celda lleva sumado el de su
  // propia fila. Si no, las filas de abajo se resolverían antes de aparecer.
  const retardoFila = indice * PASO_CASCADA;

  return (
    <GlassCard
      as="li"
      variant="light"
      ref={ref}
      className="pf-reveal pf-tempo-rapido"
      style={tiempos(retardoFila, retardoFila + ESPERA_RESUELVE)}
    >
      <p className="text-text-dark text-sm sm:text-base font-semibold mb-4">
        {b.metrica}
      </p>
      <div className="flex items-center gap-3">
        {/* text-xs y no text-[0.65rem]: esas etiquetas medían 10.4px,
            bajo el piso de legibilidad de 11px, y son la etiqueta de
            una comparación — no un pie de página. */}
        <div className="flex-1 rounded-xl bg-surface-2 px-3 py-3 text-center">
          <span className="block text-xs uppercase tracking-widest text-text-dark-muted mb-1">
            Sin sistema
          </span>
          <span className="block text-xs sm:text-sm text-text-dark-muted font-mono">
            {b.sin}
          </span>
        </div>
        <ArrowRight
          className="pf-flecha w-4 h-4 text-primary-main shrink-0"
          aria-hidden="true"
        />
        {/* Sin clases de color en los hijos: el color lo pone `.pf-resuelve` y
            se hereda, que es lo que permite animarlo de gris apagado a verde
            institucional en una sola declaración. Las dos cadenas ya usaban el
            mismo color, así que no se pierde ninguna distinción. */}
        <div className="pf-resuelve flex-1 rounded-xl border border-primary-main/15 bg-accent-main/40 px-3 py-3 text-center">
          <span className="block text-xs uppercase tracking-widest mb-1">
            Con sistema
          </span>
          <span className="block text-xs sm:text-sm font-mono font-bold">
            {b.con}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}

export default function Benchmarks() {
  const refTitulo = useReveal<HTMLDivElement>();
  const refFuente = useReveal<HTMLParagraphElement>();

  return (
    <section className="pt-16 pb-12 lg:pt-24 lg:pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Primer bloque de la banda clara, y el primero con el tempo rápido:
            el cambio de velocidad se nota antes que el cambio de color. */}
        <div ref={refTitulo} className="pf-reveal pf-tempo-rapido">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-dark text-center mb-4 leading-tight">
            {BENCHMARKS_SECCION.titulo}
          </h2>
          <p className="text-text-dark-muted text-sm sm:text-base leading-relaxed text-center max-w-xl mx-auto mb-10">
            {BENCHMARKS_SECCION.intro}
          </p>
        </div>

        <ul className="space-y-4">
          {BENCHMARKS.map((b, i) => (
            <FilaBenchmark key={b.metrica} b={b} indice={i} />
          ))}
        </ul>

        {/* Regla 2 de CLAUDE.md: cifras siempre con su fuente al lado. */}
        <p
          ref={refFuente}
          style={tiempos(BENCHMARKS.length * PASO_CASCADA)}
          className="pf-reveal pf-tempo-rapido mt-5 text-xs text-text-dark-muted text-center max-w-xl mx-auto leading-relaxed"
        >
          {BENCHMARKS_SECCION.fuente}
        </p>
      </div>
    </section>
  );
}
