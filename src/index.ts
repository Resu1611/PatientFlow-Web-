// index.lib.css = index.css + las fuentes por @import. El panel de design-sync
// no puede poner un <link> en el <head>, así que ahí las fuentes tienen que
// viajar dentro del propio CSS. Ver el comentario en src/index.lib.css.
import './index.lib.css';

// Identidad visual y configuración
export * as theme from './theme';
export { CALENDAR_EMBED_URL, DASHBOARD_SCREENSHOT_URL, BOOKING_ANCHOR_ID } from './config';
export { trackEvent, once } from './lib/analytics';
export type { TrackableEvent } from './lib/analytics';

// UI primitives
export { default as Button } from './components/ui/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/ui/Button';
export { default as GlassCard } from './components/ui/GlassCard';
export type {
  GlassCardProps,
  GlassCardVariant,
  GlassCardPadding,
  GlassCardRadius,
} from './components/ui/GlassCard';
export { default as IconChip } from './components/ui/IconChip';
export type { IconChipProps, IconChipTone, IconChipSize } from './components/ui/IconChip';
export { default as Eyebrow } from './components/ui/Eyebrow';
export type { EyebrowProps, EyebrowVariant } from './components/ui/Eyebrow';
export { default as FaqItem } from './components/ui/FaqItem';
export type { FaqItemProps } from './components/ui/FaqItem';
export { default as Slider } from './components/ui/Slider';
export type { SliderProps } from './components/ui/Slider';
export { default as WhatsAppMockup } from './components/ui/WhatsAppMockup';

// Layout
export { default as Header } from './components/layout/Header';
export { default as Footer } from './components/layout/Footer';
export { default as DecorativeBackground } from './components/layout/DecorativeBackground';

// Secciones
export { default as Hero } from './components/sections/Hero';
export { default as Leaks } from './components/sections/Leaks';
export { default as LossCalculator, calcularPerdida } from './components/sections/LossCalculator';
export { default as Benchmarks } from './components/sections/Benchmarks';
export { default as HowItWorks } from './components/sections/HowItWorks';
export { default as SystemPieces } from './components/sections/SystemPieces';
export { default as VerifiableProof } from './components/sections/VerifiableProof';
export { default as Guarantee } from './components/sections/Guarantee';
export { default as Qualification } from './components/sections/Qualification';
export { default as DemoExpectations } from './components/sections/DemoExpectations';
export { default as Faq } from './components/sections/Faq';
export { default as BookingSection } from './components/sections/BookingSection';
