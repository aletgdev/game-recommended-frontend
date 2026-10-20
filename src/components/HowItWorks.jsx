import { useState } from 'react';
import {
  Search,
  CloudDownload,
  Filter,
  Cpu,
  BarChart3,
  CheckCircle2,
  HelpCircle,
  Zap,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import SeoHead from './SeoHead';
import { getBreadcrumbJsonLd, getFaqJsonLd } from '../services/seo/seoService';

const steps = [
  {
    num: '01',
    icon: <Search className="size-5 text-accent" />,
    title: 'Búsqueda e Identificación del Juego',
    description:
      'Introduces el título comercial, el AppID o la URL oficial de la tienda de Steam. El sistema valida el juego y localiza su ficha oficial al instante.',
    tech: 'Búsqueda en Tiempo Real',
  },
  {
    num: '02',
    icon: <CloudDownload className="size-5 text-positive" />,
    title: 'Extracción de Opiniones en Español',
    description:
      'El sistema consulta la comunidad de Steam y recopila las opiniones públicas más recientes escritas específicamente en español para analizar la experiencia de los jugadores hispanohablantes.',
    tech: 'Conexión con Steam',
  },
  {
    num: '03',
    icon: <Filter className="size-5 text-warn" />,
    title: 'Filtrado de Ruido y Limpieza de Texto',
    description:
      'Se eliminan caracteres repetitivos, enlaces, emoticonos y textos vacíos para aislar el vocabulario auténtico, los argumentos de los jugadores y sus valoraciones sinceras.',
    tech: 'Procesamiento de Lenguaje Natural',
  },
  {
    num: '04',
    icon: <Cpu className="size-5 text-accent-2" />,
    title: 'Evaluación Semántica de Sentimiento',
    description:
      'El modelo de Inteligencia Artificial evalúa el tono, la emoción y el contexto de cada opinión para determinar si la experiencia ha sido genuinamente Positiva o Negativa, distinguiendo ironías y quejas técnicas.',
    tech: 'Inteligencia Artificial',
  },
  {
    num: '05',
    icon: <BarChart3 className="size-5 text-positive" />,
    title: 'Veredicto Claro y Resumen Comunitario',
    description:
      'Se calcula el porcentaje de aprobación real y se emite un veredicto transparente: <strong class="text-ink">Extremadamente Recomendado</strong> (≥ 80%), <strong class="text-ink">Recomendado</strong> (≥ 60%), <strong class="text-ink">Mixto</strong> (≥ 40%) o <strong class="text-ink">No Recomendado</strong> (&lt; 40%), acompañado de un desglose con lo mejor y lo peor del juego.',
    tech: 'Informe Comunitario',
  },
];

const faqs = [
  {
    question: '¿Por qué es más certero este análisis que el porcentaje de Steam?',
    answer:
      'Steam sólo cuenta los clics binarios sí/no que suelen estar distorsionados por campañas externas, review-bombing o votos irónicos. Nuestro modelo analiza el contenido semántico y los argumentos reales expresados por los jugadores en español.',
  },
  {
    question: '¿Qué idioma procesa el motor de análisis?',
    answer:
      'Está calibrado y optimizado para opiniones redactadas en castellano, reconociendo giros lingüísticos, quejas habituales de rendimiento y expresiones propias de la comunidad hispana.',
  },
  {
    question: '¿Con qué frecuencia se actualizan los datos de cada juego?',
    answer:
      'Cada análisis consulta la comunidad de Steam en tiempo real para ofrecer la fotografía más actual de la opinión de los jugadores.',
  },
  {
    question: '¿Se recopila información personal de los visitantes?',
    answer:
      'No. No almacenamos cookies de rastreo, no hay cuentas de usuario ni registro obligatorio. Es una herramienta libre de recopilación de datos privados.',
  },
  {
    question: '¿Cómo funcionan los enlaces a tiendas de videojuegos (Instant Gaming, G2A)?',
    answer:
      'Los botones de compra contienen parámetros de afiliado conformes al Art. 20 de la LSSI-CE. Si decides adquirir una clave mediante ellos, el proyecto recibe una pequeña comisión que financia los servidores sin ningún coste extra para ti.',
  },
  {
    question: '¿Cómo puedo incrustar la insignia en mi repositorio de GitHub?',
    answer:
      'Cada análisis genera automáticamente un fragmento en formato Markdown con una imagen interactiva, listo para copiar y pegar en el archivo README.md de cualquier proyecto.',
  },
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: '¿Cómo funciona?', path: '/como-funciona' },
  ]);

  const faqLd = getFaqJsonLd(faqs);

  return (
    <>
      <SeoHead
        title="¿Cómo Funciona el Motor de Análisis de Steam?"
        description="Conoce el proceso de Inteligencia Artificial para análisis de sentimiento en opiniones de Steam: Extracción de opiniones, procesado semántico y emisión de veredictos objetivos."
        canonicalPath="/como-funciona"
        keywords={[
          'Análisis de opiniones',
          'Veredicto Steam',
          'Opiniones en español',
          'Inteligencia Artificial videojuegos',
          'Recomendaciones de juegos',
        ]}
        jsonLd={[breadcrumbLd, faqLd]}
      />

      <div className="w-full max-w-4xl mx-auto space-y-10 animate-fade-up py-4 sm:py-8">
        {/* HERO HEADER */}
        <section className="relative py-10 px-6 sm:px-10 rounded-3xl text-center space-y-4 overflow-hidden border border-line bg-surface/60 shadow-xl backdrop-blur-xl">
          <div aria-hidden="true" className="hero-light" />

          <div className="relative inline-flex items-center gap-2 bg-surface border border-line text-accent text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
            <Cpu className="size-4 text-accent animate-pulse" />
            <span>Transparencia en el Proceso de Análisis</span>
          </div>

          <h1 className="relative text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink">
            ¿Cómo Funciona el <span className="text-gradient">Motor de Análisis</span>?
          </h1>
          <p className="relative text-sm sm:text-base text-ink-soft max-w-lg mx-auto leading-relaxed font-normal measure">
            Transparencia paso a paso desde que buscas un título hasta la emisión del informe y el veredicto final.
          </p>
        </section>

        {/* PIPELINE OVERVIEW BADGES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="tactical-card p-3 text-center space-y-1">
            <span className="text-xs font-mono text-accent font-bold">01. Búsqueda</span>
            <p className="text-[11px] text-ink-soft">Catálogo de Steam</p>
          </div>
          <div className="tactical-card p-3 text-center space-y-1">
            <span className="text-xs font-mono text-positive font-bold">02. Limpieza</span>
            <p className="text-[11px] text-ink-soft">Filtro de Ruido y Spam</p>
          </div>
          <div className="tactical-card p-3 text-center space-y-1">
            <span className="text-xs font-mono text-accent-2 font-bold">03. Sentimiento</span>
            <p className="text-[11px] text-ink-soft">Semántica en Español</p>
          </div>
          <div className="tactical-card p-3 text-center space-y-1">
            <span className="text-xs font-mono text-warn font-bold">04. Veredicto</span>
            <p className="text-[11px] text-ink-soft">Informe y Puntos Clave</p>
          </div>
        </div>

        {/* TIMELINE DE PASOS TÉCNICOS */}
        <section className="space-y-4 relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="tactical-card p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start transition-all hover:border-accent/60 shadow-md group"
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-line flex items-center justify-center shrink-0 shadow-inner group-hover:border-accent/40 transition-colors">
                  {step.icon}
                </div>
                <span className="sm:hidden text-xs font-mono font-bold text-accent">
                  Fase {step.num}
                </span>
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="text-sm sm:text-base font-display font-bold text-ink flex items-center gap-2">
                    <span className="hidden sm:inline-block font-mono text-accent text-xs font-bold bg-accent/15 px-2 py-0.5 rounded-md border border-accent/30">
                      Fase {step.num}
                    </span>
                    <span>{step.title}</span>
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-ink-soft bg-surface-2 border border-line px-2.5 py-1 rounded-lg shrink-0">
                    {step.tech}
                  </span>
                </div>
                <p
                  className="text-xs sm:text-sm text-ink-soft leading-relaxed font-normal"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            </div>
          ))}
        </section>

        {/* NOTA VENTAJA NLP */}
        <section className="tactical-card p-6 sm:p-8 text-center space-y-3 border-l-4 border-l-accent shadow-xl bg-surface-2/40">
          <div className="flex items-center justify-center gap-2">
            <Zap className="size-5 text-accent" />
            <h4 className="text-sm font-display font-bold text-ink uppercase tracking-wider">
              La Ventaja del Análisis de Contenido Real
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-ink-soft max-w-xl mx-auto leading-relaxed font-normal">
            Steam computa únicamente si el usuario pulsó pulgar arriba o abajo. Nuestro sistema analiza <strong className="text-ink font-semibold">el contenido escrito real en español</strong> para detectar matices críticos, quejas de optimización y sarcasmos que alteran la realidad.
          </p>
        </section>

        {/* SECCIÓN FAQ INTERACTIVA */}
        <section className="space-y-4 pt-4 border-t border-line">
          <div className="flex items-center gap-2 justify-center">
            <HelpCircle className="size-5 text-accent" />
            <h3 className="text-sm sm:text-base font-display font-bold text-ink uppercase tracking-wider">
              Preguntas Frecuentes (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="tactical-card overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-surface-2/50 transition-colors gap-3"
                  >
                    <span className="text-xs sm:text-sm font-display font-bold text-ink flex items-center gap-2.5">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`size-4 text-ink-faint transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-line/40 bg-surface-2/30 animate-fade-in pl-11">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECCIÓN AVISO LEGAL Y TRANSPARENCIA */}
        <section id="aviso-legal" className="tactical-card p-6 sm:p-8 space-y-4 shadow-xl border-t-2 border-t-positive">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-5 text-positive shrink-0" />
            <h3 className="text-sm sm:text-base font-display font-bold text-ink uppercase tracking-wider">
              Aviso Legal, Transparencia & Exención de Responsabilidad
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-ink-soft leading-relaxed font-normal">
            <p>
              <strong className="text-ink font-semibold">1. Ausencia de Tratamiento de Datos Personales:</strong> Este servicio opera como una herramienta de consulta pública. No se almacenan datos privados, direcciones IP de consulta persistente ni perfiles de usuario.
            </p>
            <p>
              <strong className="text-ink font-semibold">2. Enlaces de Afiliación (LSSI-CE Art. 20):</strong> Los enlaces hacia Instant Gaming y G2A contienen parámetros de afiliación que ayudan a sostener los costes del servicio sin repercutir ningún sobreprecio al usuario.
            </p>
            <p>
              <strong className="text-ink font-semibold">3. Estimaciones Automatizadas:</strong> Las valoraciones e inferencias son estimaciones objetivas calculadas a partir de opiniones públicas de jugadores en Steam.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
