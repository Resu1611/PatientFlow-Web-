import React from 'react';
import DecorativeBackground from './components/layout/DecorativeBackground';
import Band from './components/layout/Band';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StickyCta from './components/layout/StickyCta';
import Hero from './components/sections/Hero';
import Leaks from './components/sections/Leaks';
import LossCalculator from './components/sections/LossCalculator';
import Benchmarks from './components/sections/Benchmarks';
import HowItWorks from './components/sections/HowItWorks';
import SystemPieces from './components/sections/SystemPieces';
import VerifiableProof from './components/sections/VerifiableProof';
import Guarantee from './components/sections/Guarantee';
import Qualification from './components/sections/Qualification';
import DemoExpectations from './components/sections/DemoExpectations';
import Faq from './components/sections/Faq';
import BookingSection from './components/sections/BookingSection';

/** Ancla invisible: a partir de aquí aparece la barra fija de CTA en móvil. */
const CENTINELA_CTA_ID = 'fin-calculadora';

/**
 * Landing de Patient Flow Scale.
 *
 * Un solo objetivo: agendar demos de 20 minutos. Cada sección empuja hacia
 * #agendar y no hay ninguna otra salida de la página.
 *
 * La página va en bandas, no en una sola columna sobre verde. El corte de
 * color no es variedad decorativa: cae exactamente donde cambia de dueño el
 * argumento. Oscuro donde vive el problema (las fugas, la cifra que pierdes),
 * claro donde vive la solución (qué cambia, cómo funciona, qué se instala), y
 * de vuelta al oscuro para la prueba, la garantía y el cierre.
 *
 * La garantía se movió del medio a justo encima del calendario: lo último que
 * se lee antes de agendar tiene que ser la reversión de riesgo — "si el
 * sistema no responde en <2 min, ese mes no lo pagas" — y no una pregunta
 * frecuente sobre números de WhatsApp.
 *
 * `<main>` ya no lleva el contenedor: cada banda pone el suyo (ver Band.tsx),
 * que es lo que permite que la banda clara sangre hasta los bordes de la
 * ventana sin trucos de ancho ni overflow horizontal.
 */
export default function LandingPage() {
  return (
    // min-h-dvh y no min-h-screen: en móvil 100vh cuenta la barra del
    // navegador como si no existiera y deja un hueco al final.
    <div className="min-h-dvh relative overflow-hidden selection:bg-accent-main selection:text-bg-main">
      <DecorativeBackground />

      <Header />

      <main className="relative z-10 pt-24">
        <Band>
          <Hero />
          <Leaks />
          <LossCalculator />
        </Band>

        {/* El visitante ya vio su propia cifra: de aquí en adelante conviene
            tener el CTA siempre al alcance del pulgar. */}
        <div id={CENTINELA_CTA_ID} aria-hidden="true" />

        <Band tone="light">
          <Benchmarks />
          <HowItWorks />
          <SystemPieces />
        </Band>

        <Band ambient>
          <VerifiableProof />
          <Qualification />
          <DemoExpectations />
          <Faq />
          <Guarantee />
          <BookingSection />
        </Band>
      </main>

      {/* pb en móvil: la barra fija no puede tapar la nota legal del footer. */}
      <div className="max-w-6xl mx-auto px-5 lg:px-8 relative z-10 pb-28 lg:pb-0">
        <Footer />
      </div>

      <StickyCta revealAfterId={CENTINELA_CTA_ID} />
    </div>
  );
}
