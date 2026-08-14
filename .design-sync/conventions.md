# PatientFlow UI — conventions

Kit de landing para Patient Flow Scale: clínicas estéticas y med spas en
LatAm. Estética verde oscuro + acento lima, Tailwind v4 con clases propias.

No hay provider ni root wrapper: todo componente renderiza correcto por sí
solo con `styles.css` cargado. No hay ThemeProvider, contexto ni estado
global que conectar.

## Idioma y contenido

**Todo el copy va en español.** Y una regla dura del proyecto: **nunca
generes prueba social** — ni testimonios, ni nombres de clientes, ni logos,
ni métricas de clientes, ni siquiera como relleno. Este kit no tiene
componente de testimonial a propósito. Cifras de pérdida se etiquetan
siempre como estimación de investigación pública, no como dato propietario.

## Idioma visual

**Tokens** (custom properties de Tailwind v4; se usan por utility, ej.
`bg-accent-main`, `text-text-muted`):

| Token | Uso |
|---|---|
| `--color-bg-main` (`#0D2318`) | Fondo de página (verde profundo) |
| `--color-bg-card` (`#0F2B1C`) | Fondo de bloques internos |
| `--color-surface-main` (`#EAF0EB`) | Superficies claras (embed del calendario) |
| `--color-text-main` / `--color-text-muted` / `--color-text-subtle` | Texto sobre fondo oscuro, de más a menos énfasis. Los tres pasan WCAG AA (14.6:1 / 6.5:1 / 4.8:1) y `subtle` está calibrado para pasar también sobre `bg-card`. **No los apagues con modificadores de opacidad** (`text-text-subtle/70`): `subtle` ya está justo encima del mínimo y cualquier `/xx` lo tira por debajo. Si hace falta menos énfasis, usa el token de abajo, no opacidad. |
| `--color-text-dark` | Texto sobre superficies claras |
| `--color-primary-main` / `--color-primary-light` | Verde institucional, botones sobre claro |
| `--color-accent-main` (`#CEF88D`) / `--color-accent-hover` | Lima — todo CTA primario |
| `--color-gold` / `--color-gold-light` | Dorado — garantía y acentos premium |
| `--color-border-subtle` | Bordes finos sobre oscuro |

**Clases propias** (en `styles.css`, no son utilities de Tailwind):

| Clase | Uso |
|---|---|
| `.glass-card` / `.glass-card-gold` | Tarjeta translúcida con blur — el contenedor por defecto de todo bloque sobre fondo oscuro. Variante dorada para la garantía. |
| `.btn-primary` | Botón lima de CTA (hover con elevación y glow). Lo aplica `Button variant="primary"`. |
| `.gradient-text-lime` / `.gradient-text-gold` / `.gradient-text-alert` | Relleno degradado para frases destacadas dentro de un heading. **`alert` es exclusivo de cifras de pérdida.** |
| `.glow-lime` / `.glow-gold` | Glow suave, uso puntual. |
| `.bg-grid` | Textura de rejilla de fondo (decorativa, absolute). |
| `.pf-slider` | Estilo del `<input type="range">` del componente `Slider`. |
| `.animate-float-slow` / `.animate-pulse-glow` | Blobs decorativos ambientales. |
| `.pf-typing-dot` / `.pf-bubble-in` | Animaciones del mockup de WhatsApp del hero (punto de "escribiendo…", burbuja que aparece). Únicas animaciones ligadas a UN componente específico — no reutilizar fuera de `WhatsAppMockup`. |

**Sin librería de animación.** No uses framer-motion ni similares: se quitó a
propósito por peso (objetivo <2s en 4G). Para animar, usa transiciones/
keyframes CSS — el acordeón de `FaqItem` usa el truco
`grid-template-rows: 0fr → 1fr`; `WhatsAppMockup` orquesta su ciclo con
`useEffect`/`setTimeout` puro, sin dependencias. Todo lo animado con JS
comprueba `prefers-reduced-motion` primero (ver `useCountUp` y
`WhatsAppMockup` como referencia) y salta directo al estado final si el
usuario lo prefiere así.

**Tres roles tipográficos, no dos.** `--font-heading` (Playfair Display,
autoridad editorial) y `--font-sans` (Inter, cuerpo) cargan por `@import`
remoto en `styles.css`. El tercero, `--font-mono`, es una pila de sistema
(cero descarga) **reservada exclusivamente para cifras verificables**: el
resultado de la calculadora, los timestamps del mockup del hero
("4h 12min sin responder" / "Respondido en 47s"), los números `01/02/03`
de `HowItWorks`. Es la firma tipográfica del sitio — señala "esto es un
dato medido, no una promesa de marketing". No usar `--font-mono` para texto
que no sea un dato medible; diluye la señal. Aplícalo con la utility
`font-mono`, no con `style={{ fontFamily: 'var(--font-mono)' }}` — el token
está en `@theme`, así que la utility ya resuelve al mismo valor.

## Reglas de layout

- **Mobile-first, 390px primero.** El 90% del tráfico es celular.
- **CTA con altura mínima 48px** (`Button size="md"` da 48px, `size="lg"` da
  52px). No bajar de ahí.
- **Una sola conversión:** todo CTA apunta a `#agendar`. `Button` acepta
  `href` y renderiza `<a>` para eso. Sin menú, sin links externos, sin redes.

## Dónde está la verdad

- `styles.css` — bloque `@theme` con los tokens y todas las clases de arriba.
- El `.prompt.md` de cada componente — props y uso.
- `Button`, `GlassCard`, `Eyebrow`, `FaqItem`, `Slider`, `WhatsAppMockup` son
  los bloques base; los componentes de sección (`Hero`, `LossCalculator`,
  `Guarantee`, `BookingSection`…) son composiciones de página construidas
  con ellos. `WhatsAppMockup` es la firma visual del sitio — el elemento
  que dramatiza la tesis del producto (responder rápido vs. no responder)
  con el material real del subject (una conversación) en vez de una
  estadística genérica. Es deliberadamente un componente de un solo uso: no
  lo repitas en otras secciones — la firma pierde fuerza si se repite.

## Ejemplo idiomático

```tsx
import { GlassCard, Button } from 'patientflow-ui';
import { ArrowRight } from 'lucide-react';

function BloqueCta() {
  return (
    <GlassCard className="rounded-2xl p-7 text-center">
      <p className="text-lg font-medium text-text-main">
        Estás perdiendo{' '}
        <span className="gradient-text-alert font-bold">S/ 21,900</span>{' '}
        <span className="text-text-muted">al mes en consultas sin responder.</span>
      </p>
      <Button
        href="#agendar"
        variant="primary"
        size="lg"
        icon={<ArrowRight className="w-5 h-5" />}
        className="mt-6"
      >
        Agendar demo de 20 minutos
      </Button>
    </GlassCard>
  );
}
```
