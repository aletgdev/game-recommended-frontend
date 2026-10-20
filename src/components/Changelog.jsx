import { useEffect } from 'react';
import {
  Sparkles,
  Bug,
  TrendingUp,
  Zap,
  Layout,
  History,
  CheckCircle2,
} from 'lucide-react';
import SeoHead from './SeoHead';
import { getBreadcrumbJsonLd } from '../services/seo/seoService';
import { LATEST_CHANGELOG_VERSION } from '../constants/changelog';

const BADGE = {
  new: { label: 'Nuevo', bg: 'bg-positive/15', text: 'text-positive', border: 'border-positive/40', icon: <Sparkles className="size-3.5" /> },
  fix: { label: 'Corrección', bg: 'bg-negative/15', text: 'text-negative', border: 'border-negative/40', icon: <Bug className="size-3.5" /> },
  improve: { label: 'Mejora', bg: 'bg-accent/15', text: 'text-accent', border: 'border-accent/40', icon: <TrendingUp className="size-3.5" /> },
  perf: { label: 'Rendimiento', bg: 'bg-warn/15', text: 'text-warn', border: 'border-warn/40', icon: <Zap className="size-3.5" /> },
  ui: { label: 'Diseño', bg: 'bg-violet-500/15', text: 'text-violet-400', border: 'border-violet-500/40', icon: <Layout className="size-3.5" /> },
};

const ENTRIES = [
  {
    version: '2.4.0',
    date: '20 de octubre de 2026',
    type: 'ui',
    title: 'Rediseño Integral de la Interfaz e Identidad Visual de Alto Rendimiento',
    items: [
      'Barra superior translúcida de lectura fluida con selector de tema integrado y navegación táctica.',
      'Hero renovado con tono editorial: análisis sin sesgos de hype ni review-bombing.',
      'Consola de búsqueda inteligente con accesos directos a títulos en tendencia (Elden Ring, Cyberpunk 2077, Hades, etc.).',
      'Escáner de diagnóstico visual interactivo para los estados de análisis con telemetría paso a paso.',
      'Panel inicial de demostraciones interactivas con informe verificado de muestra y comparativas de mercado.',
      'Optimización general de fluidez, tiempos de carga y animaciones de transición en toda la plataforma.',
    ],
  },
  {
    version: '2.3.0',
    date: '18 de septiembre de 2026',
    type: 'ui',
    title: 'Rediseño Integral de Experiencia y Accesibilidad Visual',
    items: [
      'Nuevo contraste reforzado en modo claro y modo oscuro para una lectura cómoda en cualquier pantalla.',
      'Buscador optimizado con atajos de teclado y sugerencias enriquecidas de títulos.',
      'Nuevo indicador de progreso paso a paso durante el análisis de juegos.',
      'Controles de navegación claros para alternar entre gráficas estadísticas y resúmenes de opiniones.',
      'Respeto a las preferencias del sistema para usuarios que prefieren animaciones reducidas.',
    ],
  },
  {
    version: '2.2.0',
    date: '9 de septiembre de 2026',
    type: 'new',
    title: 'Síntesis Inteligente de la Comunidad e Informes de Demostración',
    items: [
      'Nueva sección de resumen que extrae los puntos clave de las opiniones de los jugadores.',
      'Botones rápidos para alternar al instante entre estadísticas numéricas y análisis narrativo.',
      'Acceso directo a métricas clave desde la cabecera del informe.',
      'Ficha de demostración de Stardew Valley disponible desde el primer instante.',
      'Acceso directo a la síntesis en cada tarjeta del recomendador de juegos.',
    ],
  },
  {
    version: '2.1.0',
    date: '9 de septiembre de 2026',
    type: 'ui',
    title: 'Mejoras de Visibilidad en Buscadores y Renovación del Sistema Visual',
    items: [
      'Optimización para que los informes y juegos analizados aparezcan correctamente en buscadores.',
      'Fichas enriquecidas con información clara sobre valoraciones de juegos y preguntas frecuentes.',
      'Previsualizaciones atractivas y legibles al compartir enlaces en redes sociales y mensajería.',
      'Nuevo sistema de iconos vectoriales consistentes y componentes visuales reactivos.',
      'Línea visual cuidada con contrastes nítidos y tarjetas translúcidas de fácil lectura.',
    ],
  },
  {
    version: '2.0.0',
    date: '30 de julio de 2026',
    type: 'new',
    title: 'Recomendador Inteligente en Lenguaje Natural y Comparador de Precios',
    items: [
      'Búsqueda de juegos por sensaciones o temáticas sobre un catálogo de miles de títulos destacados.',
      'Explicaciones detalladas que argumentan por qué cada juego encaja con lo que buscas.',
      'Comprensión avanzada de peticiones escritas en español.',
      'Comparativa de precios y ofertas con tiendas digitales oficiales y de confianza.',
      'Imágenes oficiales de alta calidad cargadas con máxima nitidez y rapidez.',
    ],
  },
];

export default function Changelog() {
  useEffect(() => {
    try {
      localStorage.setItem('seen_changelog_version', LATEST_CHANGELOG_VERSION);
    } catch {
      // Ignorar en entornos sin localStorage
    }
  }, []);

  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: 'Novedades & Changelog', path: '/changelog' },
  ]);

  return (
    <>
      <SeoHead
        title="Historial de Actualizaciones & Changelog"
        description="Novedades, mejoras de rendimiento y evolución de Game Recommended AI. Registro de versiones del analizador de opiniones de Steam en español."
        canonicalPath="/changelog"
        keywords={['Changelog', 'Actualizaciones Steam AI', 'Versiones Game Recommended']}
        jsonLd={breadcrumbLd}
      />

      <div className="w-full max-w-4xl mx-auto space-y-10 animate-fade-up py-4 sm:py-8">
        {/* HERO SECTION */}
        <section className="relative py-10 px-6 sm:px-10 rounded-3xl text-center space-y-4 overflow-hidden border border-line bg-surface/60 shadow-xl backdrop-blur-xl">
          <div aria-hidden="true" className="hero-light" />

          <div className="relative inline-flex items-center gap-2 bg-surface border border-line text-accent text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
            <History className="size-4 text-accent animate-pulse" />
            <span>Registro de Actualizaciones & Evolución</span>
          </div>

          <h1 className="relative text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink">
            Historial de <span className="text-gradient">Versiones</span>
          </h1>
          <p className="relative text-sm sm:text-base text-ink-soft max-w-lg mx-auto leading-relaxed font-normal measure">
            Transparencia y mejoras continuas en la experiencia de usuario, la precisión de los análisis y la velocidad del servicio.
          </p>
        </section>

        {/* TIMELINE DE VERSIONES */}
        <section className="space-y-6">
          {ENTRIES.map((entry, index) => {
            const badge = BADGE[entry.type] || BADGE.new;
            const isLatest = index === 0;

            return (
              <article
                key={entry.version}
                className={`tactical-card p-6 sm:p-7 space-y-4 shadow-md transition-all ${
                  isLatest ? 'border-accent/50 shadow-accent/10' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-line">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-base sm:text-lg font-display font-black text-ink">
                      v{entry.version}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                    {isLatest && (
                      <span className="text-[10px] font-mono font-bold bg-accent text-white px-2 py-0.5 rounded-md shadow-sm">
                        ÚLTIMA VERSIÓN
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-ink-faint">
                    {entry.date}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-display font-bold text-ink">
                  {entry.title}
                </h3>

                <ul className="space-y-2 text-xs sm:text-sm text-ink-soft">
                  {entry.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>
      </div>
    </>
  );
}
