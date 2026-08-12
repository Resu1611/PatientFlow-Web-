import React from 'react';

export interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold';
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, variant = 'default', className = '', style }: GlassCardProps) {
  const base = variant === 'gold' ? 'glass-card-gold' : 'glass-card';
  return (
    <div className={`${base} ${className}`} style={style}>
      {children}
    </div>
  );
}
