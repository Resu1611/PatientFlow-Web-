import React from 'react';
import DecorativeBackground from './components/layout/DecorativeBackground';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
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

/**
 * Landing de Patient Flow Scale.
 *
 * Un solo objetivo: agendar demos de 20 minutos. Cada sección empuja hacia
 * #agendar y no hay ninguna otra salida de la página.
 * Orden de secciones fijado en REDISEÑO.md.
 */
export default function LandingPage() {
  return (
    // min-h-dvh y no min-h-screen: en móvil 100vh cuenta la barra del
    // navegador como si no existiera y deja un hueco al final.
    <div className="min-h-dvh relative overflow-hidden selection:bg-accent-main selection:text-bg-main">
      <DecorativeBackground />

      <Header />

      <main className="max-w-6xl mx-auto px-5 lg:px-8 relative z-10 pt-24">
        <Hero />
        <Leaks />
        <LossCalculator />
        <Benchmarks />
        <HowItWorks />
        <SystemPieces />
        <VerifiableProof />
        <Guarantee />
        <Qualification />
        <DemoExpectations />
        <Faq />
        <BookingSection />
      </main>

      <div className="max-w-6xl mx-auto px-5 lg:px-8 relative z-10">
        <Footer />
      </div>
    </div>
  );
}
