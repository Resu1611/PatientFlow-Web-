import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, XCircle, ChevronDown, Shield, Clock, FileText,
  ArrowRight, Check, Download, Star, TrendingUp, Users, BarChart3,
  MessageCircle, AlertTriangle, Target, Zap
} from 'lucide-react';

/* ─────────────────────── DATA ─────────────────────── */

const PAIN_POINTS = [
  { icon: AlertTriangle, label: 'Pacientes "fantasma"', desc: 'Dejan de responder en WhatsApp y nunca más aparecen.' },
  { icon: Clock, label: 'Agendas vacías', desc: 'Cancelaciones de último minuto destruyen tu productividad.' },
  { icon: BarChart3, label: 'Guerra de precios', desc: 'Descuentos constantes que erosionan tu margen neto.' },
  { icon: Target, label: 'Ads sin ROI', desc: 'Inviertes en anuncios sin saber cuánto retornan realmente.' },
  { icon: MessageCircle, label: 'Seguimiento manual', desc: 'Lento, agotador y dependiente de tu equipo.' },
];

const INSIDE_ITEMS = [
  'El framework exacto para filtrar curiosos y atraer pacientes High-Ticket.',
  'Scripts de WhatsApp probados para rebatir la objeción de "está muy caro".',
  'El sistema de 3 pasos para reducir los no-shows a menos del 10%.',
  'Cómo estructurar una oferta irresistible sin abaratar tu marca.',
  'Las 3 métricas (KPIs) que debes revisar cada viernes para asegurar rentabilidad.',
];

const FOR_WHO_YES = [
  'Dueños de clínicas estéticas o MedSpas operando en LATAM.',
  'Profesionales que ofrecen tratamientos de alto valor (High-Ticket).',
  'Clínicas con capacidad para atender al menos 20 pacientes nuevos al mes.',
];

const FOR_WHO_NO = [
  'Principiantes que aún no tienen un consultorio físico establecido.',
  'Clínicas que compiten exclusivamente por ser "los más baratos".',
  'Personas buscando trucos mágicos sin esfuerzo de implementación.',
];

const TESTIMONIALS = [
  {
    quote: '"Implementamos el script del capítulo 2 y nuestra tasa de asistencia pasó del 40% al 85% en tres semanas. Ya no perdemos tiempo con curiosos."',
    name: 'Dra. Laura M.',
    role: 'Directora Médica, Clínica Estética CDMX',
    initials: 'LM',
  },
  {
    quote: '"Entender la diferencia entre un lead y un paciente calificado cambió nuestro negocio. El mes pasado cerramos el mayor ticket de nuestra historia."',
    name: 'Dr. Andrés P.',
    role: 'Fundador, MedSpa Premium Bogotá',
    initials: 'AP',
  },
];

const FAQS = [
  { q: '¿Es realmente gratis?', a: 'Sí, 100% gratis. No te pediremos tarjeta de crédito. Lo regalamos para demostrar nuestro valor por adelantado.' },
  { q: '¿Cuánto tarda en llegarme?', a: 'Es inmediato. Al completar el formulario, recibirás un enlace de descarga y una copia en tu correo electrónico.' },
  { q: '¿Necesito ads corriendo para que esto funcione?', a: 'No. Los principios de conversión y seguimiento aplican perfectamente para tráfico orgánico o tu base de datos actual.' },
  { q: '¿Esto aplica a mi ciudad/país?', a: 'Sí. Los principios de psicología de compra y estructuración de ofertas funcionan en todo LATAM y mercado hispano.' },
  { q: '¿Me van a llamar por teléfono?', a: 'No te acosaremos. Podríamos enviarte un mensaje de WhatsApp para confirmar tu descarga, pero tú decides si quieres seguir conversando.' },
  { q: '¿Qué pasa con mis datos?', a: 'Tus datos están seguros. Solo los usaremos para enviarte el reporte y contenido educativo ocasional. Puedes darte de baja con un clic.' },
];

/* ─────────────────────── COMPONENTS ─────────────────────── */

function StarRow({ gold = false }: { gold?: boolean }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 fill-current ${gold ? 'text-[#D4AF37]' : 'text-[#CEF88D]'}`}
        />
      ))}
    </div>
  );
}

function ScrollCTA() {
  return (
    <button
      onClick={() => document.getElementById('download-form')?.scrollIntoView({ behavior: 'smooth' })}
      className="btn-primary inline-flex items-center gap-2.5 text-base px-7 py-4 rounded-2xl"
    >
      Quiero mi Booklet Gratis
      <ArrowRight className="w-5 h-5" />
    </button>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-accent-main selection:text-bg-main">

      {/* ── Subtle grid ── */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* ── Decorative Blobs ── */}
      <div
        className="absolute top-0 left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(26,64,41,0.7) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-20 right-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-60 left-[30%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(206,248,141,0.08) 0%, transparent 70%)' }}
      />

      {/* ════════════════════════════════════════════════
          NAVBAR FLOTANTE
      ════════════════════════════════════════════════ */}
      <nav className="fixed top-4 left-4 right-4 z-50 max-w-6xl mx-auto">
        <div className="glass-card rounded-2xl px-5 py-3 flex items-center justify-between">
          <span className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Patient<span className="italic font-normal text-[#CEF88D]">Flow.</span>
          </span>
          <button
            onClick={() => document.getElementById('download-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl inline-flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Descargar Guía</span>
            <span className="sm:hidden">Descargar Guía</span>
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10 pt-24">

        {/* ── A: HERO ── */}
        <section className="py-8 lg:py-14 flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-gold mb-8">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] text-sm font-medium tracking-wide">Sistema exclusivo para MedSpas en LATAM</span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl lg:text-5xl xl:text-[3.6rem] font-bold leading-[1.1] tracking-tight mb-6 text-text-main">
            Deja de perder dinero en pacientes que{' '}
            <span className="italic gradient-text-lime">cancelan a última hora</span>
            {' '}o solo buscan descuentos.
          </h1>

          <p className="text-lg text-text-muted max-w-2xl mb-10 leading-relaxed">
            El playbook definitivo para dueños de MedSpas en LATAM que quieren atraer pacientes de alto valor, automatizar su seguimiento y tener claridad absoluta de su ROI.
          </p>

          {/* Social proof stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { icon: Users, value: '+200', label: 'Clínicas usando el sistema' },
              { icon: TrendingUp, value: '85%', label: 'Reducción promedio de no-shows' },
              { icon: Zap, value: '100%', label: 'Gratis, sin tarjeta' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3 min-w-[180px]">
                <div className="w-9 h-9 bg-accent-main/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-accent-main" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-accent-main leading-none">{value}</p>
                  <p className="text-xs text-text-muted mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pain bullets */}
          <ul className="space-y-3 mb-10 text-left inline-block">
            {[
              'Pacientes "fantasma" que dejan de responder en WhatsApp.',
              'Agendas vacías por cancelaciones de último minuto.',
              'Guerra de precios y descuentos que destruyen tu margen.',
              'Inversión en anuncios sin saber cuánto retorna realmente.',
              'Seguimiento manual, lento y agotador.',
            ].map((bullet, i) => (
              <li key={i} className="flex gap-3 text-text-main">
                <XCircle className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                <span className="text-text-muted">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <ScrollCTA />
            <a
              href="#que-contiene"
              className="text-text-muted hover:text-text-main text-sm flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
            >
              Ver qué contiene <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ── B: POR QUÉ GRATIS ── */}
        <section className="py-8">
          <div className="glass-card-gold rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Gold accent bar */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#E8CB5A] to-[#D4AF37] rounded-l-3xl" />
            <div className="pl-4">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">Transparencia total</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-5 text-text-main">¿Por qué regalamos este sistema?</h2>
              <div className="space-y-4 text-text-muted text-base lg:text-lg leading-relaxed">
                <p>
                  Sabemos que la industria estética en LATAM está llena de "agencias" que prometen el cielo y entregan leads basura.
                </p>
                <p>
                  Regalamos este reporte porque queremos demostrarte con{' '}
                  <strong className="text-text-main font-semibold">valor real y aplicable</strong>{' '}
                  que existe una forma sistemática y predecible de crecer tu clínica. Si este reporte gratuito te ayuda a facturar más, quizás en el futuro consideres trabajar con nosotros. Así de simple.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── C: EL PROBLEMA REAL ── */}
        <section className="py-10 lg:py-16 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-text-main leading-tight">
              El problema real no es tu servicio,<br className="hidden sm:block" />{' '}
              <span className="italic gradient-text-lime">es tu sistema de captación.</span>
            </h2>
            <p className="text-text-muted text-lg">Si te identificas con esto, estás perdiendo miles de dólares al mes:</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAIN_POINTS.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="glass-card rounded-2xl p-6 cursor-default group"
              >
                <div className="w-10 h-10 bg-accent-main/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-main/20 transition-colors duration-200">
                  <Icon className="w-5 h-5 text-accent-main" />
                </div>
                <h4 className="text-text-main font-bold text-base mb-2">{label}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center p-7 glass-card-gold rounded-2xl">
            <p className="text-lg font-medium text-text-main">
              La buena noticia:{' '}
              <span className="gradient-text-gold italic">No es tu culpa.</span>{' '}
              <span className="text-text-muted">Nadie te enseñó a sistematizar la adquisición de pacientes en la facultad de medicina.</span>
            </p>
          </div>
        </section>

        {/* ── D: QUÉ CONTIENE ── */}
        <section id="que-contiene" className="py-10 lg:py-16">
          <div className="bg-surface-main rounded-[32px] p-8 lg:p-16 text-text-dark relative overflow-hidden">
            {/* Decorative corner blob */}
            <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(26,64,41,0.4) 0%, transparent 70%)' }} />

            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-main/10 border border-primary-main/20 mb-5">
                  <span className="text-primary-main text-xs font-semibold tracking-widest uppercase">Lo que recibirás</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-text-dark leading-tight">
                  Qué vas a encontrar dentro del PatientFlow Booklet
                </h2>
                <p className="text-text-dark/60 text-base mb-8 leading-relaxed">
                  Un manual táctico, sin relleno, diseñado para implementarse en 48 horas.
                </p>

                <ul className="space-y-5">
                  {INSIDE_ITEMS.map((bullet, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="mt-0.5 w-6 h-6 bg-primary-main text-surface-main rounded-full flex items-center justify-center shrink-0 text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="font-medium text-text-dark/90 leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    onClick={() => document.getElementById('download-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 bg-primary-main text-surface-main font-bold px-6 py-3.5 rounded-2xl hover:bg-primary-light transition-colors duration-200 cursor-pointer"
                  >
                    Quiero el Booklet <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Book Mockup */}
              <div className="relative flex justify-center">
                <img
                  src="/booklet.png"
                  alt="PatientFlow Booklet"
                  className="w-64 lg:w-80 mix-blend-multiply transition-transform duration-500 hover:-translate-y-2 drop-shadow-2xl"
                  style={{ transform: 'rotate(2deg)' }}
                />

                {/* Shadow reflection */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-8 rounded-full opacity-40 mix-blend-multiply"
                  style={{ background: 'radial-gradient(ellipse, rgba(26,64,41,0.6) 0%, transparent 70%)', filter: 'blur(8px)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── E: PARA QUIÉN ES ── */}
        <section className="py-10 lg:py-16 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-text-main">¿Este booklet es para ti?</h2>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Sí */}
            <div className="glass-card rounded-2xl p-8 border-t-2 border-t-accent-main/40">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-text-main">
                <div className="w-8 h-8 rounded-full bg-accent-main/15 flex items-center justify-center">
                  <CheckCircle2 className="text-accent-main w-5 h-5" />
                </div>
                Para quién <span className="gradient-text-lime italic">SÍ</span> es
              </h3>
              <ul className="space-y-4">
                {FOR_WHO_YES.map((item, i) => (
                  <li key={i} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                    <Check className="w-4 h-4 text-accent-main shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* No */}
            <div className="glass-card rounded-2xl p-8 opacity-80 border-t-2 border-t-red-500/20">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-text-muted">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="text-red-400 w-5 h-5" />
                </div>
                Para quién <span className="text-red-400 italic">NO</span> es
              </h3>
              <ul className="space-y-4">
                {FOR_WHO_NO.map((item, i) => (
                  <li key={i} className="flex gap-3 text-text-muted/70 text-sm leading-relaxed">
                    <XCircle className="w-4 h-4 text-red-400/60 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* ── F: TESTIMONIALS ── */}
        <section className="py-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-main mb-2">Sistemas probados en el mundo real</h2>
            <p className="text-text-muted">Lo que dicen quienes ya lo implementaron</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-surface-main text-text-dark rounded-2xl p-8 flex flex-col gap-5 relative">
                {/* Quote mark */}
                <span className="absolute top-5 right-7 text-5xl text-primary-main/10 font-serif leading-none pointer-events-none select-none">"</span>

                <StarRow gold />
                <p className="text-base font-medium italic leading-relaxed text-text-dark/90">{t.quote}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary-main flex items-center justify-center shrink-0">
                    <span className="text-surface-main text-sm font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-text-dark">{t.name}</p>
                    <p className="text-xs text-text-dark/60">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-text-muted mt-6 opacity-60">
            * Los resultados varían según la ejecución y el compromiso de cada clínica.
          </p>
        </section>

        {/* ── G: FAQ ── */}
        <section className="py-10 lg:py-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-text-main">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden transition-all duration-200"
                style={{ borderColor: activeFaq === i ? 'rgba(206,248,141,0.25)' : undefined }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-accent-main/50 w-5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-semibold text-text-main group-hover:text-accent-main transition-colors duration-150 text-sm sm:text-base">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-accent-main transition-transform duration-200 shrink-0 ml-4 ${activeFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="px-6 pb-5"
                    >
                      <div className="ml-8 text-text-muted text-sm leading-relaxed border-t border-border-subtle pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ── FORM ── */}
        <section id="download-form" className="py-10 lg:py-16 max-w-xl mx-auto">
          <div className="bg-surface-main rounded-3xl p-8 md:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.35)] relative">

            {/* Floating badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg whitespace-nowrap glow-gold">
              ✦ 100% GRATIS — Acceso Inmediato
            </div>

            <div className="text-center mb-8 mt-2">
              <h3 className="text-2xl lg:text-3xl font-bold text-text-dark mb-2">
                Descarga el PatientFlow Booklet
              </h3>
              <p className="text-text-dark/60 text-sm">Completa tus datos para recibir acceso inmediato al PDF.</p>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary-main/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary-main" />
                </div>
                <h4 className="text-xl font-bold text-text-dark mb-2">¡Todo listo!</h4>
                <p className="text-text-dark/70 text-sm">Revisa tu correo. El PDF está en camino.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-text-dark/70 uppercase tracking-wide mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text" id="name" required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-main/40 focus:border-primary-main transition-all duration-200 text-sm"
                    placeholder="Ej. Dra. Laura Gómez"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-text-dark/70 uppercase tracking-wide mb-2">
                    Email profesional *
                  </label>
                  <input
                    type="email" id="email" required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-main/40 focus:border-primary-main transition-all duration-200 text-sm"
                    placeholder="tu@clinica.com"
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-xs font-semibold text-text-dark/70 uppercase tracking-wide mb-2">
                    WhatsApp *
                  </label>
                  <input
                    type="tel" id="whatsapp" required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-main/40 focus:border-primary-main transition-all duration-200 text-sm"
                    placeholder="+52 123 456 7890"
                  />
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox" id="consent" required
                    className="mt-1 w-4 h-4 accent-[#1A4029] rounded border-gray-300 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-text-dark/60 leading-tight cursor-pointer">
                    Acepto recibir el booklet y comunicaciones sobre marketing para MedSpas. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-base py-4 rounded-2xl flex justify-center items-center gap-2.5 mt-2"
                >
                  <Download className="w-5 h-5" />
                  Descargar Ahora
                </button>
              </form>
            )}

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-5 text-xs text-text-dark/50 font-medium">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Datos protegidos</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Lectura 15 min</span>
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> PDF Inmediato</span>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-8 max-w-3xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-10 lg:p-14">
            <p className="text-text-muted text-sm uppercase tracking-widest font-semibold mb-4">¿Listo para transformar tu clínica?</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-main mb-3">
              Empieza hoy. Es <span className="gradient-text-lime italic">completamente gratis.</span>
            </h2>
            <p className="text-text-muted mb-8 max-w-lg mx-auto">No hay nada que perder y un sistema probado que ganar.</p>
            <ScrollCTA />
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-8 border-t border-border-subtle mt-6 text-center">
          <div className="mb-5">
            <span className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Patient<span className="italic font-normal text-[#CEF88D]">Flow.</span>
            </span>
          </div>
          <div className="flex justify-center gap-6 mb-5 text-sm text-text-muted">
            <a href="#" className="hover:text-text-main transition-colors duration-150 cursor-pointer">Política de Privacidad</a>
            <a href="#" className="hover:text-text-main transition-colors duration-150 cursor-pointer">Términos y Condiciones</a>
          </div>
          <p className="max-w-2xl mx-auto text-xs text-text-muted/50 leading-relaxed">
            Este sitio no es parte de Facebook Inc. Este sitio NO está respaldado por Facebook.
            <br />
            El contenido de este reporte es puramente educativo. No constituye consejo médico, legal ni financiero.
          </p>
          <p className="mt-5 text-xs text-text-muted/40">
            © {new Date().getFullYear()} PatientFlow. Todos los derechos reservados.
          </p>
        </footer>

      </div>
    </div>
  );
}
