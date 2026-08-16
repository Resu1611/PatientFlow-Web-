import React from 'react';
import type { LucideIcon } from 'lucide-react';

export type IconChipTone = 'accent' | 'alert' | 'gold' | 'onLight';
export type IconChipSize = 'sm' | 'md' | 'lg';

/**
 * El cuadro con ícono que encabeza cada tarjeta.
 *
 * Existe porque el mismo rol estaba escrito a mano de cinco formas distintas
 * (32/40/44/48px, `rounded-full`/`xl`/`2xl`, íconos de 16/20/24px), y en una
 * página cuya estructura son tarjetas eso se nota como falta de sistema.
 *
 * El radio crece con la caja a propósito: 12px en 36/44px y 16px en 48px
 * mantienen la misma curvatura óptica en los tres tamaños.
 */
const SIZES: Record<IconChipSize, { box: string; icon: string }> = {
  sm: { box: 'w-9 h-9 rounded-xl', icon: 'w-4 h-4' },
  md: { box: 'w-11 h-11 rounded-xl', icon: 'w-5 h-5' },
  lg: { box: 'w-12 h-12 rounded-2xl', icon: 'w-6 h-6' },
};

/**
 * `alert` usa el rojo genérico de Tailwind, nunca el token --color-alert-main:
 * ese está reservado a las cifras de pérdida (CLAUDE.md, regla 2).
 */
const TONES: Record<IconChipTone, { box: string; icon: string }> = {
  accent: { box: 'bg-accent-main/10 border border-accent-main/20', icon: 'text-accent-main' },
  alert: { box: 'bg-red-500/10 border border-red-400/20', icon: 'text-red-400' },
  gold: { box: 'bg-gold/10 border border-gold/25', icon: 'text-gold' },
  /* Dentro de la banda clara. El lima es el color de acción sobre verde y no
     existe sobre papel: mide 1.2:1 contra blanco. Ahí el que manda es el verde
     institucional (11.6:1). */
  onLight: {
    box: 'bg-primary-main/10 border border-primary-main/15',
    icon: 'text-primary-main',
  },
};

export interface IconChipProps {
  icon: LucideIcon;
  tone?: IconChipTone;
  size?: IconChipSize;
  className?: string;
}

export default function IconChip({
  icon: Icon,
  tone = 'accent',
  size = 'md',
  className = '',
}: IconChipProps) {
  const s = SIZES[size];
  const t = TONES[tone];

  return (
    <span
      className={`${s.box} ${t.box} flex items-center justify-center shrink-0 ${className}`}
    >
      <Icon className={`${s.icon} ${t.icon}`} aria-hidden="true" />
    </span>
  );
}
