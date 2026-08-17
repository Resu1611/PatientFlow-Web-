import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { retardo, useReveal } from '../../lib/reveal';

export interface ImagePlaceholderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Clase de proporción cuando no hay imagen todavía, p.ej. `aspect-[16/10]`. */
  aspectClass: string;
  placeholderTitulo: string;
  placeholderNota: string;
  /** Ruta y dimensión exactas, mostradas dentro del propio placeholder. */
  fileHint: string;
  className?: string;
  /**
   * Banda donde vive el componente. El estado de placeholder es texto sobre
   * un fondo propio, así que necesita los tokens del lado correcto del
   * contraste — los mismos que usan .glass-card (`dark`) y .solid-card
   * (`light`) para lo mismo. La imagen ya cargada no lo necesita: su marco
   * (shadow-media, border-subtle) funciona igual sobre cualquiera de las dos.
   */
  tone?: 'dark' | 'light';
}

const TONO_PLACEHOLDER = {
  dark: {
    caja: 'border-accent-main/25 bg-bg-card/40',
    icono: 'text-accent-main/40',
    titulo: 'text-text-main',
    nota: 'text-text-subtle',
  },
  light: {
    caja: 'border-primary-main/25 bg-white/60',
    icono: 'text-primary-main/50',
    titulo: 'text-text-dark',
    nota: 'text-text-dark-muted',
  },
} as const;

/**
 * Imagen real con caída a un placeholder punteado con dimensiones exactas —
 * la misma lógica que antes vivía solo en VerifiableProof.tsx, generalizada
 * para que cualquier evidencia real pendiente de subir (dashboard, capturas
 * de WhatsApp) use el mismo componente en vez de reescribir el fallback.
 *
 * Sin entrada propia en el estado de placeholder, a diferencia de la imagen:
 * ese bloque no existe hasta que la carga de la imagen falla, y esa falla
 * ocurre cuando el navegador decide pedir el archivo (`loading="lazy"`), no
 * cuando el visitante llega. Un estado de error no se presenta: está.
 *
 * `pf-tempo-media`: el tempo que el sistema reserva para imágenes y embeds,
 * que cargan más peso visual que un párrafo.
 */
export default function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  aspectClass,
  placeholderTitulo,
  placeholderNota,
  fileHint,
  className = '',
  tone = 'dark',
}: ImagePlaceholderProps) {
  const [imagenDisponible, setImagenDisponible] = useState(true);
  const refImagen = useReveal<HTMLImageElement>();

  if (!imagenDisponible) {
    const t = TONO_PLACEHOLDER[tone];
    return (
      <div
        className={`w-full rounded-2xl border-2 border-dashed ${t.caja} flex flex-col items-center justify-center text-center px-6 ${aspectClass} ${className}`}
        role="img"
        aria-label={`Espacio reservado para: ${placeholderTitulo}`}
      >
        <ImageIcon className={`w-8 h-8 ${t.icono} mb-4`} aria-hidden="true" />
        <p className={`font-semibold text-sm sm:text-base ${t.titulo}`}>
          {placeholderTitulo}
        </p>
        <p className={`text-xs sm:text-sm mt-2 max-w-sm ${t.nota}`}>
          {placeholderNota}
        </p>
        <p className={`text-xs mt-4 font-mono ${t.nota}`}>{fileHint}</p>
      </div>
    );
  }

  return (
    <img
      ref={refImagen}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onError={() => setImagenDisponible(false)}
      style={retardo(120)}
      className={`pf-reveal pf-tempo-media w-full rounded-2xl border border-border-subtle shadow-media ${className}`}
    />
  );
}
