/**
 * Todo el copy de la landing, en un solo lugar.
 * Editar texto aquí no requiere tocar ningún componente.
 */

/* ─────────────── Hero ─────────────── */

export const HERO = {
  eyebrow: 'Para clínicas estéticas, cirujanos plásticos y med spas',
  h1Inicio: 'Tu clínica pierde entre',
  h1Cifra: 'S/8,000 y S/25,000 al mes',
  h1Fin: 'en pacientes que escribieron y nadie respondió a tiempo',
  subtitulo:
    'Sistema de respuesta automática en menos de 2 minutos, 24/7, por WhatsApp. Verificable en tu dashboard.',
  cta: 'Agendar demo de 20 minutos',
} as const;

/**
 * Nota de honestidad sobre las cifras. CLAUDE.md, regla 2: los números de
 * pérdida son estimaciones de investigación pública, NO datos de clientes.
 * No editar para que suenen propietarios.
 */
export const FUENTE_CIFRAS =
  'Estimación basada en investigación pública sobre tiempo de respuesta a leads (Harvard Business Review, InsideSales). No son datos de clientes.';

/* ─────────────── Las 4 fugas ─────────────── */

export interface Fuga {
  numero: string;
  nombre: string;
  texto: string;
}

export const FUGAS_SECCION = {
  titulo: 'Las fugas silenciosas que vacían tu agenda',
  cierre:
    'La buena noticia: cada una de estas fugas se tapa. Y cuando lo haces, no necesitas más pacientes para llenar tu agenda — te bastan los que ya tienes.',
} as const;

export const FUGAS: Fuga[] = [
  {
    numero: '01',
    nombre: 'La fuga nocturna',
    texto:
      'El 40% de los pacientes escribe fuera del horario de atención. Si nadie responde hasta el otro día, la mayoría ya agendó en otro lado.',
  },
  {
    numero: '02',
    nombre: 'La llamada perdida',
    texto:
      'Cada llamada que no se devuelve es una consulta que pagaste con tus anuncios y regalaste a la competencia.',
  },
  {
    numero: '03',
    nombre: 'El seguimiento roto',
    texto:
      'Unos leads reciben tres mensajes, otros ninguno. Depende de quién esté libre ese día. No es un sistema, es suerte.',
  },
  {
    numero: '04',
    nombre: 'El no-show',
    texto:
      'La agenda se ve llena, pero un tercio no aparece. Y una agenda llena de gente que no llega no paga la renta.',
  },
];

/* ─────────────── Calculadora ─────────────── */

export const CALCULADORA = {
  titulo: 'Calcula lo que te está costando responder tarde',
  intro:
    'Mueve los dos controles con los números de tu clínica. El cálculo usa tasas de la investigación citada, no promesas.',
  labelLeads: 'Consultas nuevas por semana',
  labelTicket: 'Ticket promedio por tratamiento',
  resultadoPrefijo: 'Estás perdiendo aproximadamente',
  resultadoSufijo: 'al mes',
  detallePacientes: 'pacientes al mes que no llegan a agendar',
  cta: 'Recuperar estos pacientes — Agendar demo',
  descalificacion:
    'Con menos de 10 consultas semanales, tu prioridad es generar tráfico, no velocidad de respuesta. Este sistema aún no es para ti.',
} as const;

/** Constantes del modelo de pérdida. Documentadas para que sean auditables. */
export const MODELO_PERDIDA = {
  /** Semanas promedio por mes (52 / 12). */
  SEMANAS_POR_MES: 4.33,
  /** Proporción de consultas que se pierden por respuesta tardía. */
  TASA_FUGA: 0.45,
  /** Proporción de esas consultas perdidas que habría cerrado. */
  TASA_CIERRE: 0.3,
  LEADS_MIN: 5,
  LEADS_MAX: 100,
  LEADS_DEFAULT: 25,
  /** Bajo este volumen la clínica no califica. */
  LEADS_UMBRAL_CALIFICA: 10,
  TICKET_MIN: 300,
  TICKET_MAX: 5000,
  TICKET_PASO: 100,
  TICKET_DEFAULT: 1500,
} as const;

/* ─────────────── Benchmarks ─────────────── */

export interface Benchmark {
  metrica: string;
  sin: string;
  con: string;
}

export const BENCHMARKS_SECCION = {
  titulo: 'Lo que cambia al tapar la fuga',
  intro:
    'La cifra de arriba es lo que se pierde hoy. Esto es lo que reporta la industria al resolver cada fuga — no una promesa, un punto de referencia.',
  fuente:
    'Rangos reportados por la industria de medspas y CRM de adquisición de pacientes. Los resultados reales dependen de tu volumen actual, tu oferta y tu mercado.',
} as const;

export const BENCHMARKS: Benchmark[] = [
  { metrica: 'Velocidad de respuesta al lead', sin: 'Horas o días', con: 'Menos de 1 min' },
  { metrica: 'Leads con seguimiento completo', sin: '20-30%', con: '90%+' },
  { metrica: 'Tasa de no-shows', sin: '30-40%', con: 'Menos de 15%' },
  { metrica: 'Llamadas perdidas recuperadas', sin: 'Casi ninguna', con: 'La mayoría' },
];

/* ─────────────── Cómo funciona ─────────────── */

export interface Paso {
  numero: string;
  texto: string;
}

export const PASOS: Paso[] = [
  { numero: '01', texto: 'Un paciente te escribe por WhatsApp, Instagram o tu web' },
  {
    numero: '02',
    texto:
      'El sistema responde en menos de 2 minutos, resuelve dudas frecuentes y califica al paciente',
  },
  { numero: '03', texto: 'El paciente llega agendado directamente a tu calendario' },
];

/* ─────────────── Las 4 piezas del sistema ─────────────── */

export interface PiezaSistema {
  numero: string;
  nombre: string;
  fugaQueTapa: string;
  texto: string;
}

export const SISTEMA_SECCION = {
  titulo: 'Las 4 piezas que tapan las fugas',
  intro:
    'Cada pieza tapa una de las fugas que viste más arriba. Juntas cubren el recorrido completo: desde el primer mensaje hasta que el paciente llega a la cita.',
} as const;

export const PIEZAS_SISTEMA: PiezaSistema[] = [
  {
    numero: '01',
    nombre: 'Speed-to-Lead',
    fugaQueTapa: 'Tapa la fuga nocturna',
    texto:
      'Respuesta en segundos, a cualquier hora. Quien escribe por Instagram, WhatsApp o formulario recibe una respuesta personalizada en menos de un minuto, las 24 horas, y avanza hacia agendar.',
  },
  {
    numero: '02',
    nombre: 'Missed-Call TextBack',
    fugaQueTapa: 'Tapa la llamada perdida',
    texto:
      'Ninguna llamada se pierde. Si una llamada queda sin atender, en segundos le llega al paciente un WhatsApp: «Vi que llamaste, ¿en qué te puedo ayudar?». La conversación sigue viva.',
  },
  {
    numero: '03',
    nombre: 'Seguimiento automático',
    fugaQueTapa: 'Tapa el seguimiento roto',
    texto:
      'Todos reciben el mismo trato. Una secuencia de mensajes por WhatsApp y email da seguimiento completo a cada paciente, sin depender de quién esté libre ese día ni de que alguien se acuerde.',
  },
  {
    numero: '04',
    nombre: 'Recordatorios de cita',
    fugaQueTapa: 'Tapa el no-show',
    texto:
      'La gente aparece. Confirmaciones y recordatorios automáticos 24 horas y 1 hora antes de la cita, por el canal que el paciente realmente lee. La agenda deja de llenarse de gente que no llega.',
  },
];

/** Mención breve al reporte mensual — booklet paso 8. No amerita sección propia. */
export const REPORTE_MENSUAL_NOTA =
  'Cada mes recibes un reporte simple: qué funcionó, cuántos pacientes entraron y de dónde vinieron. Nada a ciegas.';

/* ─────────────── Prueba verificable ─────────────── */

export const PRUEBA = {
  titulo: 'Sin testimonios inventados. Datos reales del sistema.',
  texto:
    'Estos son los tiempos de respuesta medidos de mi propio sistema en operación. En la demo lo verás funcionando en vivo: le escribes tú mismo y mides el tiempo de respuesta con tu celular.',
  placeholderTitulo: 'Captura del dashboard',
  placeholderNota: 'Tiempos de respuesta medidos · imagen real, pendiente de subir',
} as const;

/* ─────────────── Garantía ─────────────── */

export const GARANTIA = {
  etiqueta: 'Garantía verificable',
  texto:
    'Respuesta en menos de 2 minutos, 24/7. Lo compruebas tú mismo en el dashboard. Si el sistema no cumple, ese mes no lo pagas.',
} as const;

/* ─────────────── Calificación ─────────────── */

export const ES_PARA_TI: string[] = [
  'Recibes 10 o más consultas semanales',
  'Inviertes en publicidad o tienes flujo orgánico constante',
  'Pierdes pacientes por responder tarde o fuera de horario',
];

export const NO_ES_PARA_TI: string[] = [
  'Recibes menos de 10 consultas semanales',
  'No tienes WhatsApp como canal principal',
  'Buscas que te generemos los leads (eso no lo hace este sistema)',
];

/* ─────────────── Qué pasa en la demo ─────────────── */

export const DEMO_BULLETS: string[] = [
  '20 minutos por videollamada',
  'Ves el sistema respondiendo en vivo y calculamos tu pérdida real con tus números',
  'Te digo con honestidad si tu clínica califica o no. Si no califica, te lo digo y no te hago perder tiempo.',
];

/* ─────────────── FAQ ─────────────── */

export interface Faq {
  pregunta: string;
  respuesta: string;
}

export const FAQS: Faq[] = [
  {
    pregunta: '¿Esto reemplaza a mi recepcionista?',
    respuesta:
      'No. Atiende el primer contacto 24/7 y agenda; tu equipo maneja el resto.',
  },
  {
    pregunta: '¿Qué pasa con consultas médicas delicadas?',
    respuesta:
      'El sistema no da consejo médico. Deriva esas conversaciones a tu equipo de inmediato.',
  },
  {
    pregunta: '¿Tengo que cambiar mi número de WhatsApp?',
    respuesta:
      'Se configura sobre WhatsApp Business API; lo vemos en la demo según tu caso.',
  },
  {
    pregunta: '¿Cuánto cuesta?',
    respuesta:
      'Depende de tu volumen de consultas. En la demo te doy el precio exacto sin vueltas.',
  },
  {
    pregunta: '¿Y los datos de mis pacientes?',
    respuesta:
      'El contrato incluye cláusula de tratamiento de datos conforme a la Ley 29733.',
  },
];

/* ─────────────── Agendado ─────────────── */

export const AGENDADO = {
  titulo: 'Agenda tu demo de 20 minutos',
  notaCalificacion:
    'Al agendar te haré 3 preguntas rápidas para confirmar que la demo tiene sentido para tu clínica.',
  posdata:
    'Cada semana sin sistema de respuesta, los números de la calculadora de arriba se repiten. La demo es gratis; los pacientes perdidos no.',
} as const;

/* ─────────────── Legal ─────────────── */

export const LEGAL =
  'El tratamiento de datos de pacientes se rige por la Ley 29733 de Protección de Datos Personales del Perú.';
