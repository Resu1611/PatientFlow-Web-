import React from 'react';

export type EyebrowVariant = 'lime' | 'gold' | 'alert';

export interface EyebrowProps {
  children: React.ReactNode;
  variant?: EyebrowVariant;
  /** Punto pulsante a la izquierda — solo para el hero. */
  dot?: boolean;
  className?: string;
}

const VARIANTS: Record<EyebrowVariant, { wrap: string; text: string; dot: string }> = {
  lime: {
    wrap: 'glass-card border-accent-main/25',
    text: 'text-accent-main',
    dot: 'bg-accent-main',
  },
  gold: {
    wrap: 'glass-card-gold',
    text: 'text-gold',
    dot: 'bg-gold',
  },
  alert: {
    wrap: 'bg-red-500/10 border border-red-400/25',
    text: 'text-red-300',
    dot: 'bg-red-400',
  },
};

export default function Eyebrow({
  children,
  variant = 'lime',
  dot = false,
  className = '',
}: EyebrowProps) {
  const v = VARIANTS[variant];
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${v.wrap} ${className}`}
    >
      {dot && <span className={`w-2 h-2 rounded-full ${v.dot} animate-pulse`} />}
      <span className={`${v.text} text-xs sm:text-sm font-medium tracking-wide`}>
        {children}
      </span>
    </span>
  );
}
