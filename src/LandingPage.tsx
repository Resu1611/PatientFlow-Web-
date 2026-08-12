import React from 'react';
import DecorativeBackground from './components/layout/DecorativeBackground';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import LossCalculator from './components/sections/LossCalculator';
import HowItWorks from './components/sections/HowItWorks';
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
    <div className="min-h-screen relative overflow-hidden selection:bg-accent-main selection:text-bg-main">
      <DecorativeBackground />

      <Header />

      <main className="max-w-6xl mx-auto px-5 lg:px-8 relative z-10 pt-24">
        <Hero />
        <LossCalculator />
        <HowItWorks />
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
