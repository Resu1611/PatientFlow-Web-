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
