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
}

export default function Band({ children, tone = 'dark', className = '' }: BandProps) {
  const bandClasses = [
    'relative',
    tone === 'light' ? 'band-light' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={bandClasses}>
      <div className="max-w-6xl mx-auto px-5 lg:px-8">{children}</div>
    </div>
  );
}
