---
target: src/LandingPage.tsx
total_score: 22
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 3
timestamp: 2026-08-16T05-23-54Z
slug: src-landingpage-tsx
---
**Method: dual-agent** (A: `a0427c5cceb6b76a3` · B: `a0948d1138d8dd912`) — both isolated, run in parallel, neither saw the other's output. Target: `src/LandingPage.tsx` @ http://localhost:3000. Browser evidence collected in Chrome via Playwright at 390×844 and 1440×900.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Calculator's live count-up + `role="status"` is excellent; the one conversion moment — the GHL iframe at BookingSection.tsx:36-44 — is a 680px blank box with no skeleton, spinner or failure state |
| 2 | Match System / Real World | 4 | Fluent peer-professional LatAm Spanish, `es-PE` currency, Ley 29733, "no-show". Only wobble: two untranslated GHL product names as h3 (landing.ts:160,166) |
| 3 | User Control and Freedom | 2 | Disqualified calculator state is a terminal dead end; if the iframe fails there is no second path to book — no direct link, no WhatsApp, nothing |
| 4 | Consistency and Standards | 3 | Real primitives and single-purpose tokens, all 3 CTAs anchor `#agendar` — but heading treatment breaks: `Guarantee` h2 renders at 12px while every other h2 is 24px, and FAQ h3s render at weight 400 |
| 5 | Error Prevention | 3 | Sliders constrain everything, zero free-text, placeholders prevent shipping broken assets — but calculator defaults load at S/21,921, 88% of the H1's stated ceiling |
| 6 | Recognition Rather Than Recall | 2 | SystemPieces.tsx:39 asks the visitor to recall a 4-item leak taxonomy from 3,666px earlier; Benchmarks.tsx:28 says "la cifra de arriba" about a number ~1,000px offscreen |
| 7 | Flexibility and Efficiency | n/a | One decision, one action, one path. No expert workflow exists to accelerate on this surface |
| 8 | Aesthetic and Minimalist Design | 2 | 9,928px / 11.8 mobile folds, 12 sections on one identical rhythm; Benchmarks + HowItWorks + SystemPieces spend 2,870px asserting one claim three ways |
| 9 | Error Recovery | 1 | The one real failure path (iframe blocked in a WhatsApp webview) produces nothing, and BookingSection.tsx:46-65 is unguarded — an unset config shows a prospect the string `CALENDAR_EMBED_URL dentro de src/config.ts` |
| 10 | Help and Documentation | 3 | FAQ answers the five real objections in one line each; the most-asked question — "¿Cuánto cuesta?" — defers entirely to the demo without even an order of magnitude |
| **Total** | | **22/36** | **Acceptable (61%)** |

Heuristic 7 scored `n/a` per the Persuade-mode rule; total renormalized to 36.

**Cognitive load: 3 of 8 failed — moderate.** Passing: single focus, chunking, grouping, one-thing-at-a-time, minimal choices (no decision point exceeds 2 options). Failing: visual hierarchy (11 of 12 sections share `py-12 lg:py-20`, a centered Playfair h2 and the same glass card), working memory (leak-taxonomy callback across 3,666px), progressive disclosure (24 content atoms fully expanded across 9,928px; only the FAQ discloses).

## Design Specificity Verdict

**Split: authored atoms, template composition.**

**LLM assessment.** Two elements are unmistakably built for this product. `WhatsAppMockup.tsx` argues by demonstration — a real Spanish rinoplastia inquiry sitting unread under a live `4h 12min 07s` counter, beside the same message answered in 47s, at zero image cost, correctly `aria-hidden` because the H1 carries the claim. And LossCalculator.tsx:45,155-169 encodes the positioning as interaction: drag below 10 consultations and the CTA is deleted, not disabled, and the result is replaced by a refusal.

Between them sits ~6,000px (60% of the page) of default B2B skeleton. One layout idea — a centered stack of glass cards — repeated eleven times. 11 of 12 sections use identical `py-12 lg:py-20`, every section heading is `text-center`, and Benchmarks / SystemPieces / DemoExpectations / Qualification / Leaks are all the same "IconChip + bold title + muted body in a GlassCard" — four consecutive. theme.ts:19-24 declares a light-surface palette explicitly "para secciones que rompen el fondo oscuro" and nothing uses it: 9,928px of unbroken dark green. The one background texture is masked to transparent by 30% of page height (index.css:103), so the grid dies around y≈3,000.

From Benchmarks to Faq, a find-and-replace on the Spanish would resell this page to a plumbing-lead SaaS.

**Deterministic scan.** `detect.mjs --json src` → exit 2, 5 findings, all in CSS; narrowed to `src/components` → exit 0. `gradient-text` ×3 (index.css:137,144,151), `codex-grid-background` ×1 (index.css:98), `overused-font` ×1 (index.lib.css:12).

False positives / mis-scoped:
- `.gradient-text-lime` and `.gradient-text-gold` have zero call sites in `src/**/*.tsx`. Dead CSS — fix is `rm`.
- `.gradient-text-alert` is a true positive but not an a11y failure: endpoints on `#0D2318` measure 8.71:1 and 4.39:1 at 30.4px/700 and 48px/700, clearing the 3:1 large-text threshold. Real risk is forced-colors mode, where `-webkit-text-fill-color: transparent` hides the page's most important string.
- `overused-font` is a documented decision (theme.ts:64-70: Inter body only, Playfair headings, mono for verifiable figures). The rule also under-scoped the project — caught the `@import` in the design-sync library build, never read the `<link>` in index.html:52-56.

**In-page detector overlay** (live-server.mjs on port 8400, stopped cleanly; `git status --porcelain index.html` empty afterward) reported 26 anti-patterns, catching what the design review missed: `undersized-ui-text` ×8 — the "Sin sistema"/"Con sistema" labels at Benchmarks.tsx:39,51 render at 10.4px (`text-[0.65rem]`), below the 11px floor; `cramped-padding` ×5; `border-accent-on-rounded` ×2 (Qualification.tsx:25,43); `pulsing-dot` (Eyebrow.tsx:42); `nested-cards` ×1. The overlay ran in the automation browser, not a user-visible tab.

**Strongest convergence:** the heading-hierarchy inversion. Every h2 on the page is 24px/700 except Guarantee.tsx:26, which is 12px/600 uppercase. The falsifiable, uncopyable promise is styled as an eyebrow.

**Detector found nothing, and that's real signal:** contrast (46 text styles measured against the composited glass surface — zero below threshold; worst 4.77:1), tap targets (10/10 pass 44×44; sliders exactly 44px), horizontal overflow (none at 390 or 1440), focus rings (10/10 visible), heading structure (no level skips), alt text, landmarks, accessible names (full AX tree). Production bundle ~81.7 kB gzip. The technical floor is good; the problems are compositional.

## Overall Impression

The hero and the calculator are the product. Everything else is scaffolding around them, and there is far too much of it. The page is ordered by argument, not by momentum: hero → calculator is a genuine emotional peak at y≈2,332, then it goes flat for 2,870px, hits an empty placeholder box under the headline "Sin testimonios inventados. Datos reales del sistema.", and arrives at the calendar with the reassurance sitting 2,100px behind it. Cut the middle, move the guarantee directly above the embed, and this page gets shorter and converts harder at the same time.

## What's Working

1. **`WhatsAppMockup.tsx` argues by demonstration.** Live unread counter next to a 47-second reply, built from the product's own material in the buyer's own language, zero image bytes, correctly hidden from screen readers because the H1 states the claim.
2. **Disqualification shipped as interaction, not copy** (LossCalculator.tsx:155-169). PRODUCT.md principle 3 executed in code rather than asserted in a paragraph.
3. **A token system with arguments behind it.** Mono means "measured, not promised." `--color-alert-main` means "a loss figure," which is why IconChip deliberately uses generic Tailwind red (IconChip.tsx:24-31). Contrast reasoned against the composited glass surface; theme.ts:26-28 claims "muted 5.8:1 · subtle 4.8:1" and measures 5.84 / 4.77.

## Priority Issues

### 1. [P0] The single conversion point has no loading state, no fallback, and unguarded dev copy
**What:** BookingSection.tsx:36-44 renders the GHL iframe with `loading="lazy"` inside `min-h-[680px]` — no skeleton, no spinner, no error path. BookingSection.tsx:46-65 renders "Pega la URL del embed de GoHighLevel en CALENDAR_EMBED_URL dentro de src/config.ts" with no `import.meta.env.DEV` guard. `CALENDAR_EMBED_URL` is still `''` at config.ts:19.
**Why it matters:** 90% of traffic arrives inside a WhatsApp in-app webview on 4G, where third-party booking embeds are the most common silent failure. If that iframe doesn't paint, the page has zero remaining way to book — exactly 3 `<a>` elements page-wide, all `#agendar`, no phone, no WhatsApp. One deploy with an unset config shows a prospect a source-file path at the moment of purchase.
**Fix:** Drop `loading="lazy"` on this iframe. Render the card's chrome as a skeleton until `onLoad`. Add a ~6s timeout swapping in a direct `<Button href={CALENDAR_DIRECT_URL}>Abrir el calendario</Button>` firing `trackEvent('cta_final_click')`. Wrap the instructional block in `import.meta.env.DEV`.
**Suggested command:** /impeccable harden

### 2. [P1] The hero's signature element renders the product as broken for reduced-motion users
**What:** WhatsAppMockup.tsx:51-53 evaluates `useState(reducedMotion ? 'respondido' : 'espera')` once at mount, when `usePrefersReducedMotion` still returns its `useState(false)` initial value. The media-query effect flips it true, the animation loop returns early, and `fase` is stranded at `'espera'` permanently. Verified in Chrome with `reducedMotion: 'reduce'`: the "CON PATIENTFLOW" panel contains only the unanswered message and ~70px of empty space.
**Why it matters:** the panel that proves the product works shows it doing nothing, and reads worse than the "Sin sistema" panel beside it. The thesis inverts for every reduce-motion visitor — a setting that skews older, which is the buyer.
**Fix:** Read the query synchronously — `useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)` or `useSyncExternalStore` — plus `useEffect(() => { if (reducedMotion) setFase('respondido'); }, [reducedMotion])`. The static state must be the answered state.
**Suggested command:** /impeccable harden

### 3. [P1] 5,771px with no CTA, and the only persistent one sits in the thumb-hostile corner
**What:** three anchors page-wide — Header.tsx:22 (y=23), Hero.tsx:40 (y=585), LossCalculator.tsx:136 (y=3,093). From the Benchmarks heading to the calendar: 6.8 mobile folds with nothing tappable. The fixed header's CTA sits at `top-3` on a 390×844 phone — the furthest pixel from a thumb. `cta_final_click` is declared at analytics.ts:22 with zero call sites; the calculator CTA fires `cta_hero_click` with `ubicacion: 'calculadora'`, so section attribution is impossible.
**Fix:** Add a `<Button>` after `Guarantee` and after `DemoExpectations`, both firing `trackEvent('cta_final_click', { ubicacion })`. Add a bottom-anchored CTA bar past y≈3,300. Wire the event.
**Suggested command:** /impeccable layout

### 4. [P1] 2,870px of middle drag, the taxonomy taught twice, and hierarchy inverted
**What:** Benchmarks (967px) + HowItWorks (537px) + SystemPieces (1,366px) sit between the calculator peak and the guarantee with no CTA and no personalized data. SystemPieces.tsx:39 restates the four leaks from Leaks.tsx nine folds earlier. Benchmarks' "con sistema" column asserts what the four pieces promise and the guarantee already backs. Meanwhile Guarantee.tsx:9,26 gives the falsifiable, costly promise a `py-8` section and a 12px heading, while VerifiableProof.tsx:19 gives an empty dashed box a `text-4xl` h2 and 527px.
**Fix:** In LandingPage.tsx:36-41, merge Leaks and SystemPieces into one section — one card per leak, problem on top, the piece that closes it below (~1,200px cut, kills the memory bridge). Cut Benchmarks or fold its rows in as a third line per card (also removes the 8 undersized 10.4px labels). Promote Guarantee to a real section heading and move it directly above BookingSection.
**Suggested command:** /impeccable distill

### 5. [P2] The calculator's default is engineered to alarm, on the one page that sells anti-hype
**What:** landing.ts:93,99 (`LEADS_DEFAULT: 25`, `TICKET_DEFAULT: 1500`) produce S/21,921/month on load — 88% of the ceiling asserted in the H1.
**Why it matters:** PRODUCT.md principle 2 is "prueba verificable sobre prueba social." A skeptic's first instinct is to drag the slider down; when the number collapses they learn the opening figure was chosen, not neutral — the exact move the two prior agencies made.
**Fix:** Default to ~15 leads / S/1,200 (still ~S/10,500), or label the initial state: "Ejemplo: clínica de 25 consultas/semana — mueve los controles a tus números."
**Suggested command:** /impeccable clarify

## Persona Red Flags

**Jordan (first-timer):** hits `Speed-to-Lead` and `Missed-Call TextBack` as h3 headings (landing.ts:160,166) — two untranslated GHL product names inside flawless Spanish — and is unsure whether these are four separate products with four prices. Then "¿Cuánto cuesta?" returns "en la demo te doy el precio exacto." The one thing he needs before spending 20 minutes is withheld, without even a "desde S/X". No confirmation that tapping "Agendar demo" did anything except the page moving.

**Casey (distracted mobile, one thumb):** scrolls 6.8 folds with nothing tappable in the lower two-thirds of her screen; the only persistent CTA is a pill at `top-3`. Interrupted at the calculator, she returns to find her slider values gone — no state persistence. She reaches the calendar and gets a 680px blank box on 4G with no spinner: she cannot tell loading from broken, and there is no second way through.

**Riley (stress tester):** drags leads to 5, hits the dead end, and notices the honest branch is `text-text-muted text-sm` in a small tinted box while the selling branch gets a 48px figure and a full-width lime button — disqualification is a whisper, pitch is a shout. He enables reduced motion; the hero stops answering (issue 2). He blocks images; "Datos reales del sistema" becomes an empty rectangle. Devtools shows one console error — a missing favicon — and no `public/og-image.jpg` behind the OG tag declared at index.html:21-31.

**Marcela — dueña de clínica en San Isidro, quemada por dos agencias (project-specific):** opens the link between patients. The hero lands — she has lived that 4-hour-unread rinoplastia message. Then the calculator greets her pre-set at S/21,921 and, precisely because two agencies already showed her inflated projections, her first move is to drag it down. It collapses; she now knows the number was staged. Nine folds later she reaches the headline written for her — "Sin testimonios inventados. Datos reales del sistema." — and finds an empty box. She never sees a price. She scrolls past a guarantee that is real, falsifiable and expensive to Renzo, set at 12px in the page's smallest section. And the most persuasive sentence on the page — "le escribes tú mismo y mides el tiempo de respuesta con tu celular" (landing.ts:197) — is buried beside that empty box instead of sitting under the hero's running clock.

## Minor Observations

- `FUENTE_CIFRAS` printed verbatim 3× (Hero.tsx:35-37, Leaks.tsx:49-51, LossCalculator.tsx:172-174). In the hero it sits between the subhead and the CTA, pushing the primary action down.
- The fixed header collides with content for 9,900px (Header.tsx:12) — translucent pill, no scrolled state; mid-scroll it clips the H1 and the first "Es para ti si" bullet. Add a full-bleed scrim past `scrollY > 40`. Anchor landing itself measured fine (`h2Occluded: false`).
- 8 instances of 10.4px text at Benchmarks.tsx:39,51 (`text-[0.65rem]`), below the 11px legibility floor.
- Playfair Display runs down to 14px (index.css:84-86) on leak titles, piece names and FAQ questions; hairlines get fragile at that size on dark. Restrict the display face to h1/h2. FAQ h3s also render at weight 400, identical to body.
- Hero eyebrow wraps to two lines inside a `rounded-full` pill at 390px (Hero.tsx:20-22).
- Two dead CSS classes — `.gradient-text-lime`, `.gradient-text-gold` — zero call sites. Deleting them removes two of five detector findings.
- `public/og-image.jpg` does not exist (only `booklet.png`). The WhatsApp preview renders with a broken image. No favicon either — the page's only console error.
- The Vite dev server returns `200 text/html` for missing static paths via SPA fallback; a status-code-only asset check reports a false pass. Confirm against `public/`.
- Cleared, not a defect: `aria-hidden` on visible blocks in LossCalculator.tsx:110-118,157 is deliberate — a permanent `role="status" sr-only` region mirrors all three, preventing ~27 screen-reader announcements per slider drag. Documented and working as designed.

## Questions to Consider

1. If "le escribes tú mismo y mides el tiempo de respuesta con tu celular" is the most persuasive sentence on this page, why is it the second half of a paragraph 6,200px down, next to an empty box, instead of the caption under the hero's running clock?
2. The guarantee is falsifiable, expensive to Renzo, and impossible for an agency to copy without changing its business model. Why is it the smallest heading and shortest section on a page whose thesis is "prueba verificable sobre promesas"?
3. What is a visitor supposed to do at 8 consultations a week? Right now the honest answer is "close the tab." Is losing them entirely the intended cost of rule 3, or is there a version of disqualification that stays honest without becoming the nurturing funnel PRODUCT.md forbids?
4. Twelve sections, one visual idea, 11.8 mobile folds — for a visitor who already spoke to Renzo. If this had to survive at 5,000px, which four sections would you keep? Does the current order already tell you: hero, calculator, guarantee, calendar?
5. theme.ts:19-24 defines a full light-surface palette to "romper el fondo oscuro," nothing uses it, and the only background texture fades out by y≈3,000. Is the unbroken dark green a decision, or a section that never got made?
