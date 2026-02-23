import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronDown, Shield, Clock, FileText, ArrowRight, Check } from 'lucide-react';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-accent-main selection:text-bg-main">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50"></div>
      
      {/* Decorative Blobs */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-64 h-64 bg-primary-main rounded-full mix-blend-screen filter blur-[100px] opacity-30 pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-10 w-96 h-96 bg-accent-main rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* SECTION A: Hero */}
        <section className="py-16 lg:py-24 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-12">
            <span className="text-white text-4xl md:text-5xl font-bold tracking-tight">Patient<span className="font-serif italic font-normal">Flow.</span></span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Atrae pacientes High-Ticket', 'Reduce No-Shows', 'Sistemas Probados', 'ROI Claro'].map((chip, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-subtle bg-bg-alt text-xs font-heading tracking-wide text-text-main">
                <Check className="w-3 h-3 text-accent-main" />
                {chip}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            Deja de perder dinero en pacientes que <span className="text-accent-main">cancelan a última hora</span> o solo buscan descuentos.
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mb-10">
            El playbook definitivo para dueños de MedSpas en LATAM que quieren atraer pacientes de alto valor, automatizar su seguimiento y tener claridad absoluta de su ROI.
          </p>

          <ul className="space-y-4 mb-10 text-left inline-block">
            {[
              'Pacientes "fantasma" que dejan de responder en WhatsApp.',
              'Agendas vacías por cancelaciones de último minuto.',
              'Guerra de precios y descuentos que destruyen tu margen.',
              'Inversión en anuncios sin saber cuánto retorna realmente.',
              'Seguimiento manual, lento y agotador.'
            ].map((bullet, i) => (
              <li key={i} className="flex gap-3 text-text-main">
                <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => document.getElementById('download-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent-main hover:bg-[#bdf075] text-bg-main font-bold text-lg px-8 py-4 rounded-xl transition-all hover:-translate-y-1 shadow-[0_4px_14px_rgba(206,248,141,0.4)] flex justify-center items-center gap-2"
          >
            Quiero mi Booklet Gratis <ArrowRight className="w-5 h-5" />
          </button>
        </section>

        {/* SECTION B: Why free? */}
        <section className="py-16">
          <div className="bg-bg-alt border border-border-subtle rounded-[24px] p-8 lg:p-12 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent-main"></div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">¿Por qué regalamos este sistema?</h2>
            <div className="space-y-4 text-text-muted text-lg">
              <p>
                Sabemos que la industria estética en LATAM está llena de "agencias" que prometen el cielo y entregan leads basura.
              </p>
              <p>
                Regalamos este reporte porque queremos demostrarte con <strong className="text-text-main">valor real y aplicable</strong> que existe una forma sistemática y predecible de crecer tu clínica. Si este reporte gratuito te ayuda a facturar más, quizás en el futuro consideres trabajar con nosotros. Así de simple.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION C: The real problem */}
        <section className="py-16 lg:py-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">El problema real no es tu servicio, es tu sistema de captación.</h2>
            <p className="text-text-muted text-lg">Si te identificas con esto, estás perdiendo miles de dólares al mes:</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Dependencia del boca a boca', desc: 'No tienes control sobre cuántos pacientes nuevos llegarán este mes.' },
              { title: 'Leads no calificados', desc: 'Recibes mensajes preguntando "precio" y luego desaparecen.' },
              { title: 'Falta de seguimiento', desc: 'Tus recepcionistas no tienen tiempo ni guiones para cerrar ventas por WhatsApp.' },
              { title: 'Marketing de esperanza', desc: 'Publicas en Instagram esperando que alguien mágicamente agende una cita.' }
            ].map((item, i) => (
              <div key={i} className="bg-bg-alt border border-border-subtle p-6 rounded-[20px] hover:-translate-y-1 transition-transform">
                <h4 className="text-accent-main font-bold text-xl mb-2">{item.title}</h4>
                <p className="text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center p-6 bg-primary-main/20 border border-primary-main/30 rounded-[20px]">
            <p className="text-xl font-medium">
              La buena noticia: <span className="text-accent-main">No es tu culpa.</span> Nadie te enseñó a sistematizar la adquisición de pacientes en la facultad de medicina.
            </p>
          </div>
        </section>

        {/* SECTION D: What's inside */}
        <section className="py-16 lg:py-24">
          <div className="bg-surface-main rounded-[32px] p-8 lg:p-16 text-text-dark">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Qué vas a encontrar dentro del PatientFlow Booklet</h2>
                <p className="text-text-dark/70 text-lg mb-8">Un manual táctico, sin relleno, diseñado para implementarse en 48 horas.</p>
                
                <ul className="space-y-5">
                  {[
                    'El framework exacto para filtrar curiosos y atraer pacientes High-Ticket.',
                    'Scripts de WhatsApp probados para rebatir la objeción de "está muy caro".',
                    'El sistema de 3 pasos para reducir los no-shows a menos del 10%.',
                    'Cómo estructurar una oferta irresistible sin abaratar tu marca.',
                    'Las 3 métricas (KPIs) que debes revisar cada viernes para asegurar rentabilidad.'
                  ].map((bullet, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 bg-primary-main text-surface-main rounded-full p-1 shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                {/* Placeholder for Book Cover */}
                <div className="aspect-[3/4] bg-surface-2 rounded-2xl border-2 border-border-subtle/50 shadow-2xl flex items-center justify-center relative overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-main/10 to-transparent"></div>
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-accent-main rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <FileText className="w-8 h-8 text-bg-main" />
                    </div>
                    <h3 className="font-heading font-bold text-3xl text-primary-main mb-2">PatientFlow</h3>
                    <p className="text-text-dark/60 font-medium tracking-widest uppercase text-sm">Booklet Oficial</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION E: Who is it for */}
        <section className="py-16 lg:py-24 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bg-alt border border-border-subtle p-8 rounded-[24px]">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-accent-main w-6 h-6" /> Para quién SÍ es
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-text-muted"><Check className="w-5 h-5 text-accent-main shrink-0" /> Dueños de clínicas estéticas o MedSpas operando en LATAM.</li>
                <li className="flex gap-3 text-text-muted"><Check className="w-5 h-5 text-accent-main shrink-0" /> Profesionales que ofrecen tratamientos de alto valor (High-Ticket).</li>
                <li className="flex gap-3 text-text-muted"><Check className="w-5 h-5 text-accent-main shrink-0" /> Clínicas con capacidad para atender al menos 20 pacientes nuevos al mes.</li>
              </ul>
            </div>
            <div className="bg-bg-alt border border-border-subtle p-8 rounded-[24px] opacity-80">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-text-muted">
                <XCircle className="text-red-400 w-6 h-6" /> Para quién NO es
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-text-muted"><XCircle className="w-5 h-5 text-red-400 shrink-0" /> Principiantes que aún no tienen un consultorio físico establecido.</li>
                <li className="flex gap-3 text-text-muted"><XCircle className="w-5 h-5 text-red-400 shrink-0" /> Clínicas que compiten exclusivamente por ser "los más baratos".</li>
                <li className="flex gap-3 text-text-muted"><XCircle className="w-5 h-5 text-red-400 shrink-0" /> Personas buscando trucos mágicos sin esfuerzo de implementación.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION F: Proof */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Sistemas probados en el mundo real</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-surface-main text-text-dark p-8 rounded-[24px]">
              <div className="flex text-accent-main mb-4">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current text-primary-main" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-lg font-medium italic mb-6">"Implementamos el script de WhatsApp del capítulo 2 y nuestra tasa de asistencia pasó del 40% al 85% en tres semanas. Ya no perdemos tiempo con curiosos."</p>
              <div>
                <p className="font-bold">[Nombre del Doctor/a]</p>
                <p className="text-sm text-text-dark/70">Director Médico, [Nombre Clínica]</p>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-surface-main text-text-dark p-8 rounded-[24px]">
              <div className="flex text-accent-main mb-4">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current text-primary-main" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-lg font-medium italic mb-6">"Entender la diferencia entre un lead y un paciente calificado cambió nuestro negocio. El mes pasado cerramos [Métrica] en tratamientos de alto valor."</p>
              <div>
                <p className="font-bold">[Nombre del Doctor/a]</p>
                <p className="text-sm text-text-dark/70">Fundador, [Nombre Clínica]</p>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-text-muted mt-6">* Los resultados varían según la ejecución y el compromiso de cada clínica.</p>
        </section>

        {/* SECTION G: FAQ */}
        <section className="py-16 lg:py-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {[
              { q: '¿Es realmente gratis?', a: 'Sí, 100% gratis. No te pediremos tarjeta de crédito. Lo regalamos para demostrar nuestro valor por adelantado.' },
              { q: '¿Cuánto tarda en llegarme?', a: 'Es inmediato. Al completar el formulario, recibirás un enlace de descarga y una copia en tu correo electrónico.' },
              { q: '¿Necesito tener ads corriendo para que esto funcione?', a: 'No. Aunque los sistemas están optimizados para tráfico pago, los principios de conversión y seguimiento aplican perfectamente para tráfico orgánico o base de datos actual.' },
              { q: '¿Esto aplica a mi ciudad/país?', a: 'Sí. Los principios de psicología de compra y estructuración de ofertas funcionan en todo LATAM y mercado hispano.' },
              { q: '¿Me van a llamar por teléfono?', a: 'No te acosaremos. Podríamos enviarte un mensaje de WhatsApp para confirmar que pudiste descargar el archivo, pero tú decides si quieres seguir conversando.' },
              { q: '¿Qué pasa con mis datos?', a: 'Tus datos están seguros. Solo los usaremos para enviarte el reporte y contenido educativo ocasional. Puedes darte de baja con un clic en cualquier momento.' }
            ].map((faq, i) => (
              <div key={i} className="bg-bg-alt border border-border-subtle rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold focus:outline-none"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-accent-main transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-text-muted"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION Form (Moved to bottom) */}
        <section id="download-form" className="py-16 lg:py-24 max-w-2xl mx-auto">
          <div className="bg-surface-main rounded-[24px] p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.25)] relative">
            <div className="absolute -top-4 -right-4 bg-accent-main text-bg-main text-xs font-bold px-4 py-2 rounded-full transform rotate-3 shadow-lg">
              100% GRATIS
            </div>
            <h3 className="text-3xl font-bold text-text-dark mb-2 text-center">Descarga el PatientFlow Booklet</h3>
            <p className="text-text-dark/70 text-center mb-8">Completa tus datos para recibir acceso inmediato al PDF.</p>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-text-dark mb-1.5">Nombre completo *</label>
                <input type="text" id="name" required className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent transition-shadow" placeholder="Ej. Dra. Laura Gómez" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-text-dark mb-1.5">Email profesional *</label>
                <input type="email" id="email" required className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent transition-shadow" placeholder="tu@clinica.com" />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-semibold text-text-dark mb-1.5">WhatsApp *</label>
                <input type="tel" id="whatsapp" required className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent transition-shadow" placeholder="+52 123 456 7890" />
              </div>
              
              <div className="flex items-start gap-3 pt-2">
                <input type="checkbox" id="consent" required className="mt-1 w-4 h-4 text-primary-main rounded border-gray-300 focus:ring-primary-main" />
                <label htmlFor="consent" className="text-xs text-text-dark/70 leading-tight">
                  Acepto recibir el booklet y comunicaciones sobre marketing para MedSpas. *
                </label>
              </div>

              <button type="submit" className="w-full bg-accent-main hover:bg-[#bdf075] text-bg-main font-bold text-xl py-4 rounded-xl transition-all hover:-translate-y-1 shadow-[0_4px_14px_rgba(206,248,141,0.4)] flex justify-center items-center gap-2 mt-4">
                Descargar Ahora <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-dark/60 font-medium">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Datos protegidos</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Lectura 15 min</span>
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> PDF Inmediato</span>
            </div>
          </div>
        </section>

        {/* SECTION H: Footer */}
        <footer className="py-8 border-t border-border-subtle text-center text-sm text-text-muted">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="hover:text-text-main transition-colors">[Política de Privacidad]</a>
            <a href="#" className="hover:text-text-main transition-colors">[Términos y Condiciones]</a>
          </div>
          <p className="max-w-2xl mx-auto text-xs opacity-60">
            Este sitio no es parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca comercial de FACEBOOK, Inc.
            <br/><br/>
            Descargo de responsabilidad: El contenido de este reporte es puramente educativo y de marketing. No constituye consejo médico, legal ni financiero. Los resultados mostrados son ejemplos y no garantizan resultados idénticos.
          </p>
          <p className="mt-6 text-xs opacity-50">&copy; {new Date().getFullYear()} PatientFlow. Todos los derechos reservados.</p>
        </footer>

      </div>
    </div>
  );
}
