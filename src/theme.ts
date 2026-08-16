/**
 * Identidad visual de Patient Flow Scale.
 *
 * Extraída del sitio original (src/index.css @theme). Es la única fuente de
 * verdad de la paleta: los mismos valores están declarados como custom
 * properties de Tailwind v4 en `src/index.css`, y este módulo los expone a
 * JS/TS para lógica que necesite el color exacto (gráficos, estilos inline).
 *
 * Al agregar un color nuevo, agrégalo en AMBOS lugares.
 */

export const colors = {
  /** Fondos oscuros — el verde profundo de la marca. */
  bg: {
    main: '#0D2318',
    alt: '#071A11',
    card: '#0F2B1C',
  },
  /** Superficies claras. Las usa la banda clara del medio de la página
   *  (Benchmarks → HowItWorks → SystemPieces): oscuro donde vive el problema,
   *  claro donde vive la solución. Ver `.band-light` en src/index.css. */
  surface: {
    main: '#EAF0EB',
    alt: '#F4F7F4',
    muted: '#D8E2DA',
  },
  /** Contraste medido en el navegador. Sobre bg.main: main 14.6:1 ·
   *  muted 6.5:1 · subtle 5.3:1. Sobre la tarjeta de vidrio, que es la
   *  superficie más clara y por tanto el caso peor: main 13.2:1 ·
   *  muted 5.8:1 · subtle 4.8:1. Todos pasan AA (4.5:1). Ver la nota larga
   *  en src/index.css antes de tocar `subtle`. */
  text: {
    main: '#EDF2EE',
    muted: '#8FA899',
    subtle: '#7E9885',
    /** Sobre la banda clara. dark 15.8:1 · darkMuted 6.8:1 sobre surface.main;
     *  13.6:1 y 5.9:1 sobre surface.muted, que es el caso peor de la banda. */
    dark: '#0F172A',
    darkMuted: '#45564C',
  },
  /** Verde institucional — botones sobre superficies claras. */
  primary: {
    main: '#1A4029',
    light: '#254D33',
  },
  /** Lima — color de acción. Todo CTA primario lo usa. */
  accent: {
    main: '#CEF88D',
    hover: '#BBEF72',
  },
  /** Dorado — acento secundario, garantía y detalles premium. */
  gold: {
    main: '#D4AF37',
    light: '#E8CB5A',
  },
  /** Alerta — exclusivo para las cifras de pérdida de la calculadora. */
  alert: {
    main: '#F87171',
    strong: '#EF4444',
  },
  border: {
    subtle: 'rgba(206,248,141,0.10)',
    gold: 'rgba(212,175,55,0.25)',
  },
} as const;

/**
 * Tres roles tipográficos, deliberados:
 *  - `heading`  — Playfair Display. Autoridad editorial, no de SaaS genérico.
 *  - `sans`     — Inter. Cuerpo de texto, neutral y legible.
 *  - `mono`     — pila del sistema (sin descarga extra). Reservada SOLO para
 *    cifras verificables: el resultado de la calculadora, el tiempo de
 *    respuesta del mockup del hero, timestamps. Es el "acento tipográfico"
 *    del sitio — señala "esto es un dato medido, no una promesa".
 */
export const fonts = {
  sans: '"Inter", ui-sans-serif, system-ui, sans-serif',
  heading: '"Playfair Display", Georgia, serif',
  mono: 'ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Consolas, monospace',
} as const;

/** Pesos realmente usados en la landing (los únicos que se descargan). */
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** Radios del sistema — las tarjetas grandes usan `xl`/`2xl`. */
export const radius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
} as const;

/**
 * Ritmo vertical de las secciones (mobile-first).
 *
 * Antes había un solo valor y las 12 secciones lo usaban: con el mismo aire
 * arriba y abajo de todo, nada pesaba más que nada y la página se leía como
 * una lista. Tres pasos, asignados por lo que carga cada sección:
 *
 *  - `sectionYTight` — beats de apoyo que sostienen un argumento ajeno
 *    (HowItWorks, DemoExpectations, Faq).
 *  - `sectionY`      — la sección estándar.
 *  - `sectionYLoose` — los tres momentos que cargan la conversión: la
 *    calculadora, la garantía y el calendario. El aire extra ES la jerarquía.
 */
export const spacing = {
  sectionYTight: 'py-10 lg:py-14',
  sectionY: 'py-12 lg:py-20',
  sectionYLoose: 'py-16 lg:py-28',
  containerX: 'px-5 lg:px-8',
  containerMax: 'max-w-6xl',
} as const;

/**
 * Altura mínima de los CTA en móvil. CLAUDE.md exige 48px; usamos 52px para
 * dar margen cómodo al pulgar en pantallas de 390px.
 */
export const tapTarget = {
  minHeight: '52px',
} as const;

export const shadows = {
  limeGlow: '0 4px 20px rgba(206,248,141,0.35)',
  limeGlowHover: '0 6px 28px rgba(206,248,141,0.50)',
  goldGlow: '0 0 20px rgba(212,175,55,0.25), 0 0 40px rgba(212,175,55,0.10)',
  card: '0 24px 60px rgba(0,0,0,0.35)',
} as const;
