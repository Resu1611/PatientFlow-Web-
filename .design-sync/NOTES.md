# design-sync notes — PatientFlow

## Setup

This repo is a Vite **app** (single landing page), not a publishable
component library — `/design-sync` normally expects a `dist/` entry with
`.d.ts` exports. To make it syncable, a separate library build was added
alongside the app build:

- `src/index.ts` — barrel export of every component under `src/components/`
  (imports `./index.css` too, so the library's CSS bundle carries the real
  Tailwind output + custom utility classes, not just component styles).
- `vite.lib.config.ts` — library-mode Vite config, `react`/`react-dom`/
  `react/jsx-runtime` marked `external` (the converter's own esbuild pass
  shims these to `window.React`/`window.ReactDOM`).
- `tsconfig.lib.json` — `declaration`-only tsc pass for `.d.ts` output.
- `package.json`: `"module": "dist-lib/index.es.js"`, `"types":
  "dist-lib/index.d.ts"`, `"scripts.build:lib"` runs both.

The app's own `npm run build` (→ `dist/`) is untouched by any of this.

## Rediseño 2026-08-11 — el set de componentes cambió

La landing pasó del funnel de booklet (descarga de PDF) al modelo de
**agendar demo** descrito en `REDISEÑO.md`. Consecuencias para design-sync:

- **Eliminados** (ya no existen): `TestimonialCard`, `StarRow`,
  `TestimonialsSection` (prueba social inventada — viola la regla 1 de
  CLAUDE.md), `TextField`, `PhoneField`, `Checkbox`, `DownloadFormSection`
  (ya no hay formulario; la conversión es el iframe del calendario),
  `StatCard`, `PainPointCard`, `Navbar`, `WhyFreeSection`, `ProblemSection`,
  `WhatsInsideSection`, `ForWhoSection`, `FaqSection`, `FinalCtaSection`.
- **Nuevos**: `Slider`, `Header`, `LossCalculator`, `HowItWorks`,
  `VerifiableProof`, `Guarantee`, `Qualification`, `DemoExpectations`,
  `Faq`, `BookingSection`.
- El proyecto en claude.ai/design (`PatientFlow Design System`) quedó
  **desactualizado** tras este rediseño: sigue teniendo los 23 componentes
  viejos. La próxima corrida de `/design-sync` va a subir los nuevos y
  borrar los eliminados vía `upload.deletePaths` — es el flujo normal, no
  hay que hacer nada especial.
- `framer-motion` ya **no se usa** (peso; objetivo <2s en 4G). El acordeón
  usa CSS puro. No reintroducirlo.

## Restyle pass 2026-08-11 (frontend-design skill) — new component + font role

Applied `.claude/skills/frontend-design/SKILL.md` (installed this session
from anthropics/claude-code) to the redesign. Palette stayed exactly as-is
— CLAUDE.md mandates brand continuity, that's not a free axis — so the
distinctiveness pass went into typography, layout, and one signature
element instead:

- **New component**: `WhatsAppMockup` (`src/components/ui/WhatsAppMockup.tsx`)
  — the hero's signature element, a before/after chat comparison (no
  system vs. PatientFlow) built entirely from markup, zero image assets.
  Self-animating (ticking "sin responder" clock, typing→reply loop),
  gated on `prefers-reduced-motion`. Exported from the barrel — will
  appear as a 24th component on the next `/design-sync` run.
- **New font role**: `--font-mono` (system stack, zero network weight) —
  reserved for verifiable numbers only (calculator output, mockup
  timestamps, the 01/02/03 in `HowItWorks`). See `conventions.md` for the
  full rule; the design-sync self-check should be re-run against a fresh
  build if this file is ever regenerated, since `--font-mono` is a new
  token not in the original conventions draft.
- **New hook**: `src/lib/useCountUp.ts` — no dependency, `requestAnimationFrame`
  count-up for the calculator result. Also reduced-motion-gated.
- `HowItWorks` changed from a 3-card grid to a connected vertical rail
  (numbering was already justified — real 3-step process — the rail makes
  that sequence relationship explicit instead of implicit).

## Pasada de UI/UX 2026-08-13 (skill ui-ux-pro-max) — solo defectos, sin rediseño

Revisión contra el checklist del skill. No se tocó ni la paleta ni el layout:
todo lo de abajo son defectos medidos, no cambios de dirección visual.

- **Contraste**: `--color-text-subtle` estaba en 3.5:1 (fallaba AA) y la nota
  legal del footer usaba modificadores de opacidad que la dejaban en 2.1:1 —
  justo el texto que las reglas 2 y 5 de CLAUDE.md exigen que se lea. Token
  ahora en `#77917F` (4.8:1 sobre `bg-main`, 4.7:1 sobre `bg-card`) y sin
  `/60`–`/40` en el footer. Verificado con las 23 combinaciones de texto de la
  página compuestas contra su fondo real: 0 fallos.
- **Área táctil**: `.pf-slider` medía 28px de alto — por debajo del mínimo de
  44px, y es el control principal de la página en móvil. Ahora 44px; la pista
  sigue en 8px y el thumb en 28px, así que **no cambia nada visualmente**.
- **Lector de pantalla en la calculadora**: el `aria-live` envolvía la cifra
  animada por `useCountUp`, así que cada arrastre disparaba ~27 anuncios (uno
  por fotograma). Ahora hay una sola región `role="status"` permanente que
  anuncia el valor ya asentado, y el bloque visual va `aria-hidden`.
- **Slider**: `aria-valuetext` (antes anunciaba "1500" en vez de "S/ 1,500") y
  `aria-describedby` hacia el hint.
- `min-h-screen` → `min-h-dvh`; los `style={{fontFamily:'var(--font-mono)'}}`
  sueltos pasaron a la utility `font-mono` (el token ya está en `@theme`).
- `vite.config.ts` ignora `dist/`, `dist-lib/` y `.ds-sync/` en el watcher:
  `build:lib` vacía `dist-lib/` y en Windows eso tumbaba el dev server con
  EBUSY a media sesión.

## Preview scope

Primera sync usó scope **floor-cards-only** (elección explícita del
usuario) — todos los componentes importan funcionales; ninguno tiene
`.design-sync/previews/*.tsx` autorado todavía. Se pueden autorar
incrementalmente en cualquier re-sync.

## Re-sync risks

- **`readmeHeader` (`.design-sync/conventions.md`) is hand-authored** — the
  class/token names in it were verified against `dist-lib/react-example.css`
  at write time (2026-08-11). If new custom utility classes are added to
  `src/index.css`, or existing ones renamed/removed, re-validate the
  conventions file's family tables against the fresh build.
- **Fonts are remote-loaded** (`[FONT_REMOTE]`): `styles.css` pulls "Inter"
  and "Playfair Display" from a Google Fonts `@import` — no local `.woff2`
  ships in the bundle. If the DS pane is ever used somewhere without
  internet access to fonts.googleapis.com, headings/body text will fall
  back to system fonts. Not addressed — no local font files exist in this
  repo to ship instead.
- **That `@import` now lives in `src/index.lib.css`, not `src/index.css`** —
  and the split is load-bearing, not an accident to tidy up. The app dropped
  the `@import` because an `@import` inside the CSS bundle serializes the
  request chain (browser must fetch+parse the app CSS before it even asks for
  the font CSS), which hurts LCP on 4G; the landing loads fonts with a `<link>`
  in `index.html` instead. The design pane can't inject anything into `<head>`
  and only receives `styles.css`'s `@import` closure, so the library entry
  (`src/index.ts` → `src/index.lib.css` → `./index.css`) keeps the `@import`.
  **If you ever point `src/index.ts` back at `index.css` directly, design-sync
  previews silently lose both brand fonts.**
- **All components landed in `general`/`layout`/`sections` groups by
  directory** (`components/<group>/<Name>/` mirrors `src/components/<x>/`)
  — there's no `docsDir`/doc-based grouping since this repo has no
  per-component docs. Fine for a set this size; if the component count
  grows a lot, consider adding `.md` stub files with `category:` frontmatter
  (see `cfg.docsMap` in the design-sync skill) for finer grouping.
- **`dist-lib/` and `.ds-sync/` are gitignored** (build output + isolated
  converter deps) — a fresh clone needs `npm install`, `npm run build:lib`,
  then re-stage `.ds-sync/` (see the design-sync skill §2 step 7) before a
  re-sync can run.
