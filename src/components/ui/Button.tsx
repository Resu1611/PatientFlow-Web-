import React from 'react';

export type ButtonVariant = 'primary' | 'dark' | 'ghost';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  /** Si se pasa, se renderiza como `<a>` — todos los CTA anclan al calendario. */
  href?: string;
  /**
   * Solo lo usa la salida de emergencia del calendario, que abre la misma
   * reserva en pestaña nueva cuando el iframe no carga. `rel` se pone solo
   * para que ningún destino externo pueda tocar `window.opener`.
   */
  target?: '_blank';
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  dark:
    'bg-primary-main text-surface-main hover:bg-primary-light active:translate-y-0 transition-colors duration-200',
  ghost:
    'border border-accent-main/30 text-accent-main hover:bg-accent-main/10 transition-colors duration-200',
};

/**
 * El anillo de foco es lo primero que se rompe al meter una banda clara: el
 * lima sobre papel blanco mide 1.2:1, o sea que el botón queda sin foco
 * visible justo en la mitad de la página. `dark` es la variante que vive en la
 * banda clara, así que enfoca en verde institucional (10:1 sobre surface-main).
 */
const FOCUS_RING: Record<ButtonVariant, string> = {
  primary: 'focus-visible:outline-accent-main',
  dark: 'focus-visible:outline-primary-main',
  ghost: 'focus-visible:outline-accent-main',
};

// min-h-[52px] cumple (con margen) el mínimo de 48px que exige CLAUDE.md.
const SIZES: Record<ButtonSize, string> = {
  md: 'text-sm px-5 py-3 min-h-[48px] rounded-xl gap-2',
  lg: 'text-base px-7 py-4 min-h-[52px] rounded-2xl gap-2.5',
};

export default function Button({
  children,
  href,
  target,
  variant = 'primary',
  size = 'lg',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  onClick,
  className = '',
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center text-center font-bold cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    FOCUS_RING[variant],
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
