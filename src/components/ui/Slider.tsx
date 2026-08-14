import React from 'react';

export interface SliderProps {
  id: string;
  label: string;
  /** Valor ya formateado para mostrar junto al label (ej. "S/ 1,500"). */
  valueLabel: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  /** Texto corto bajo el slider (ej. rangos mín/máx). */
  hint?: string;
}

/**
 * `<input type="range">` nativo con estilo propio (ver `.pf-slider` en
 * index.css). Nativo = accesible con teclado y ligero; el thumb mide 28px
 * para que sea cómodo con el pulgar en 390px.
 */
export default function Slider({
  id,
  label,
  valueLabel,
  min,
  max,
  step = 1,
  value,
  onChange,
  hint,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const hintId = `${id}-hint`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <label htmlFor={id} className="text-sm text-text-muted">
          {label}
        </label>
        {/* El valor ya se anuncia por aria-valuetext; repetirlo aquí haría que
            el lector de pantalla lo lea dos veces. */}
        <span
          aria-hidden="true"
          className="text-lg font-bold text-accent-main tabular-nums font-mono"
        >
          {valueLabel}
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        // Sin esto el lector anuncia "1500"; con esto, "S/ 1,500".
        aria-valuetext={valueLabel}
        aria-describedby={hint ? hintId : undefined}
        className="pf-slider"
        // El relleno lima a la izquierda del thumb se pinta con este %.
        style={{ ['--pf-slider-fill' as string]: `${pct}%` }}
      />

      {hint && (
        <p id={hintId} className="mt-2 text-xs text-text-subtle">
          {hint}
        </p>
      )}
    </div>
  );
}
