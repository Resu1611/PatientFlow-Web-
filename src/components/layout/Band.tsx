import React from 'react';

/**
 * Banda de ancho completo con su propio contenedor dentro.
 *
 * Existe para que la banda clara pueda sangrar hasta los bordes de la ventana
 * sin ningún truco de ancho: `<main>` dejó de tener el contenedor y ahora cada
 * banda pone el suyo. La alternativa habitual (`w-screen` + `left-1/2` +
 * `-translate-x-1/2`) mide contra el viewport incluyendo la barra de scroll y
 * mete overflow horizontal de unos pocos píxeles en desktop — justo el defecto
 * que esta página no tiene y no vale la pena estrenar.
 *
 * `tone="dark"` no pinta nada: el fondo de la página ya es ese verde. Solo
 * envuelve el contenido en el mismo contenedor para que el ancho de columna no
 * cambie al cruzar de una banda a otra.
 */
export type BandTone = 'dark' | 'light';

export interface BandProps {
  children: React.ReactNode;
  tone?: BandTone;
  className?: string;
  /**
   * Extiende la atmósfera de `DecorativeBackground` a esta banda. Esa
   * atmósfera hoy solo cubre el Hero, y de Benchmarks hacia abajo no hay
   * ninguna — el tramo más largo sin atmósfera es la banda oscura inferior
   * (prueba → cierre). Reusa los mismos tokens rgba, posicionados relativos a
   * la banda (no a la página) para no depender de la altura total.
   *
   * Solo tiene sentido en `tone="dark"`: `.solid-card` documenta por qué la
   * banda clara no lleva manchas — sobre papel no hay nada que dejar ver.
   */
  ambient?: boolean;
}

export default function Band({
  children,
  tone = 'dark',
  className = '',
  ambient = false,
}: BandProps) {
  const bandClasses = [
    'relative',
    tone === 'light' ? 'band-light' : '',
    ambient ? 'overflow-hidden' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={bandClasses}>
      {ambient && (
        <>
          <div
            aria-hidden="true"
            className="absolute top-[10%] left-[-12%] w-[520px] h-[520px] rounded-full pointer-events-none opacity-60 animate-pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(26,64,41,0.7) 0%, transparent 70%)' }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[8%] right-[-10%] w-[420px] h-[420px] rounded-full pointer-events-none opacity-70"
            style={{ background: 'radial-gradient(circle, rgba(206,248,141,0.08) 0%, transparent 70%)' }}
          />
        </>
      )}
      <div className="max-w-6xl mx-auto px-5 lg:px-8 relative">{children}</div>
    </div>
  );
}
