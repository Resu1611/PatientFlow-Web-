import React from 'react';

/**
 * `light` es la misma tarjeta leída desde el otro lado del contraste: la que
 * va dentro de la banda clara. No hereda el vidrio porque el vidrio existe
 * para dejar ver el verde y las manchas de luz del fondo, y sobre papel no hay
 * nada detrás que dejar ver. Ver `.solid-card` en src/index.css.
 */
export type GlassCardVariant = 'default' | 'gold' | 'light';
export type GlassCardPadding = 'none' | 'sm' | 'md' | 'lg';
export type GlassCardRadius = 'md' | 'lg';

/**
 * La tarjeta de vidrio: la superficie que estructura 9 de las 12 secciones.
 *
 * El componente ya existía pero ninguna sección lo usaba — todas escribían
 * `glass-card rounded-2xl p-…` a mano, y el relleno terminó en cinco valores
 * distintos (p-5, p-5/6, p-6/7, p-7, p-7/10) para el mismo tipo de tarjeta.
 * La escala de abajo es esa decisión, ya tomada una sola vez.
 *
 * `md` es la tarjeta estándar; `lg` la reserva para las piezas que cargan la
 * sección entera (calculadora, garantía), donde el aire extra es jerarquía y
 * no capricho. `none` es para marcos, no para contenido.
 */
const PADDING: Record<GlassCardPadding, string> = {
  none: '',
  sm: 'p-5',
  md: 'p-6 sm:p-7',
  lg: 'p-7 sm:p-10',
};

const RADIUS: Record<GlassCardRadius, string> = {
  md: 'rounded-2xl',
  lg: 'rounded-3xl',
};

export interface GlassCardProps {
  children: React.ReactNode;
  variant?: GlassCardVariant;
  padding?: GlassCardPadding;
  radius?: GlassCardRadius;
  className?: string;
  style?: React.CSSProperties;
  /** Etiqueta el elemento raíz: `li` dentro de listas, `div` por defecto. */
  as?: 'div' | 'li';
  /**
   * React 19 pasa `ref` como una prop normal, sin forwardRef. Lo necesita el
   * revelado por scroll: varias tarjetas son ellas mismas el objetivo que se
   * observa (la garantía, el marco del calendario, las filas de benchmarks) y
   * envolverlas en un div solo para colgar un ref metería una caja extra
   * dentro de grids y listas.
   */
  ref?: React.Ref<HTMLElement>;
}

export default function GlassCard({
  children,
  variant = 'default',
  padding = 'md',
  radius = 'md',
  className = '',
  style,
  as: Tag = 'div',
  ref,
}: GlassCardProps) {
  const BASE: Record<GlassCardVariant, string> = {
    default: 'glass-card',
    gold: 'glass-card-gold',
    light: 'solid-card',
  };
  const base = BASE[variant];
  const classes = [base, RADIUS[radius], PADDING[padding], className]
    .filter(Boolean)
    .join(' ');

  return (
    // El cast existe porque `Tag` es una unión: TS no puede saber si el ref
    // apunta a un div o a un li hasta el sitio de uso.
    <Tag className={classes} style={style} ref={ref as React.Ref<never>}>
      {children}
    </Tag>
  );
}
