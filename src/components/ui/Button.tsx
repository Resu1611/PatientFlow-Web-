import React from 'react';

export type ButtonVariant = 'primary' | 'dark' | 'ghost';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  /** Si se pasa, se renderiza como `<a>` — todos los CTA anclan al calendario. */
  href?: string;
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

// min-h-[52px] cumple (con margen) el mínimo de 48px que exige CLAUDE.md.
const SIZES: Record<ButtonSize, string> = {
  md: 'text-sm px-5 py-3 min-h-[48px] rounded-xl gap-2',
  lg: 'text-base px-7 py-4 min-h-[52px] rounded-2xl gap-2.5',
};

export default function Button({
  children,
  href,
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
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-main',
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
      <a href={href} onClick={onClick} className={classes}>
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
