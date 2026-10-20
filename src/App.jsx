import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams, Link } from 'react-router-dom';
import {
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Gamepad2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Layers,
  Search,
  Activity,
  Bot,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import './App.css';
import Header from './components/Header';
import GameSearch from './components/Input';
import RecommendationCard from './components/RecommendationCard';
import HowItWorks from './components/HowItWorks';
import Changelog from './components/Changelog';
import Recomendar from './components/Recomendar';
import Status from './components/Status';
import ErrorBoundary from './components/ErrorBoundary';
import SeoHead from './components/SeoHead';
import { analyzeGame } from './services/steamService';
import { getWebSiteJsonLd, getWebApplicationJsonLd, getGameAnalysisJsonLd } from './services/seo/seoService';

function AppContent() {
  const [selectedGameInfo, setSelectedGameInfo] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const gameLimitParam = parseInt(searchParams.get('limit') || '30', 10);
  const limit = [10, 20, 30].includes(gameLimitParam) ? gameLimitParam : 30;

  const analyzeAbortRef = useRef(null);
  const resultsRef = useRef(null);
  const lastAnalyzedLimitRef = useRef(30);

  const loadingTexts = [
    'Conectando con la comunidad de Steam...',
    'Extrayendo opiniones verificadas en español...',
    'Descargando muestras recientes de los jugadores...',
    'Limpiando texto de caracteres nulos, emojis y ruido...',
    'Analizando el vocabulario y contexto de cada opinión...',
    'Evaluando el nivel de satisfacción de los jugadores...',
    'Contrastando resultados con la aprobación general de Steam...',
    'Elaborando el veredicto y el resumen final...',
  ];

  const handleGameSelect = useCallback(async (game, customLimit = limit) => {
    if (analyzeAbortRef.current) analyzeAbortRef.current.abort();
    const controller = new AbortController();
    analyzeAbortRef.current = controller;

    lastAnalyzedLimitRef.current = customLimit;

    setError(null);
    setAnalysisResult(null);
    setSelectedGameInfo(game);
    setLoadingStep(0);
    setIsLoading(true);

    setSearchParams({
      game: game.id,
      name: game.name || '',
      limit: customLimit.toString(),
    });

    try {
      const data = await analyzeGame(game.id, customLimit, controller.signal);
      setAnalysisResult(data);
      lastAnalyzedLimitRef.current = customLimit;
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Error al analizar el juego:', err);
      setError(
        err.message ||
        'No se pudo conectar con el servidor. Comprueba si el backend está activo o si el AppID es correcto.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [limit, setSearchParams]);

  useEffect(() => {
    const gameId = searchParams.get('game');
    const gameName = searchParams.get('name');
    const gameLimit = parseInt(searchParams.get('limit') || '30', 10);
    const activeLimit = [10, 20, 30].includes(gameLimit) ? gameLimit : 30;

    if (gameId) {
      const isDifferentGame = !selectedGameInfo || String(selectedGameInfo.id) !== String(gameId);
      const isDifferentLimit = lastAnalyzedLimitRef.current !== activeLimit;

      if (isDifferentGame || isDifferentLimit) {
        handleGameSelect({
          id: gameId,
          name: gameName || `Juego (ID: ${gameId})`,
        }, activeLimit);
      }
    } else {
      if (selectedGameInfo) {
        queueMicrotask(() => {
          setSelectedGameInfo(null);
          setAnalysisResult(null);
          setError(null);
        });
      }
    }
  }, [searchParams, selectedGameInfo, handleGameSelect]);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingTexts.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLoading, loadingTexts.length]);

  useEffect(() => {
    if (!isLoading && analysisResult && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading, analysisResult]);

  // Estructuras JSON-LD para SEO
  const webSiteLd = getWebSiteJsonLd();
  const webAppLd = getWebApplicationJsonLd();
  const gameAnalysisLd = analysisResult ? getGameAnalysisJsonLd(selectedGameInfo, analysisResult) : null;

  const dynamicTitle = selectedGameInfo?.name
    ? `Análisis de Reseñas de ${selectedGameInfo.name}`
    : null;

  const dynamicDesc = selectedGameInfo?.name
    ? `Resultados del análisis de sentimiento NLP en español para ${selectedGameInfo.name} en Steam. Veredicto: ${analysisResult?.recommendation_level || 'Procesando'}.`
    : undefined;

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col font-sans antialiased overflow-x-hidden selection:bg-accent selection:text-white">
      <Header />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex-1 flex flex-col pt-4">
        <Routes>
          {/* RUTA INICIO */}
          <Route
            path="/"
            element={
              <>
                <SeoHead
                  title={dynamicTitle}
                  description={dynamicDesc}
                  canonicalPath="/"
                  jsonLd={[webSiteLd, webAppLd, gameAnalysisLd].filter(Boolean)}
                />

                {/* HERO PRINCIPAL */}
                <div className="relative pt-6 sm:pt-12 pb-6 text-left overflow-hidden hero-enter">
                  {/* Luz ambiental del héroe */}
                  <div aria-hidden="true" className="hero-light" />

                  {/* Estado en vivo / Pill */}
                  <div className="relative inline-flex items-center gap-2 bg-surface/90 border border-line text-ink-soft text-xs font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm max-w-full backdrop-blur-md">
                    <span className="w-2.5 h-2.5 bg-positive rounded-full animate-pulse shrink-0 shadow-sm shadow-positive" />
                    <span className="truncate">Motor PLN v2.4 · Calibrado para la comunidad hispana</span>
                  </div>

                  {/* Título principal con estilo gamer elegante */}
                  <h1 className="relative text-3xl sm:text-5xl md:text-[3.3rem] font-display font-extrabold tracking-tight mb-3 sm:mb-4 leading-[1.08] text-ink max-w-3xl">
                    La verdad detrás de cada juego en <span className="text-gradient">Steam</span>
                  </h1>

                  {/* Subtítulo enfocado en valor real */}
                  <p className="relative text-sm sm:text-base md:text-lg text-ink-soft max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal measure">
                    Sin sesgos de hype ni review-bombing: decodificamos miles de opiniones reales en español mediante PLN neuronal y RAG para darte un veredicto técnico y certero antes de comprar.
                  </p>

                  {/* Buscador de Juego */}
                  <div className="relative w-full max-w-2xl z-[100]">
                    <GameSearch
                      onGameSelect={(game) => handleGameSelect(game, limit)}
                      isLoading={isLoading}
                    />
                  </div>

                  {/* Selector de cantidad de reseñas y chips de características */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-2 border-t border-line/60 relative z-[90]">
                    <fieldset className="flex items-center gap-2 text-xs text-ink-faint">
                      <legend className="sr-only">Cuántas reseñas quieres analizar</legend>
                      <span className="font-semibold text-ink-soft whitespace-nowrap" aria-hidden="true">
                        Profundidad del análisis:
                      </span>
                      <div className="flex items-center gap-1 bg-surface border border-line p-1 rounded-xl shadow-sm" role="radiogroup" aria-label="Reseñas por análisis">
                        {[
                          { num: 10, label: '10 (Rápido)' },
                          { num: 20, label: '20 (Equilibrado)' },
                          { num: 30, label: '30 (Exhaustivo)' },
                        ].map(({ num, label }) => (
                          <button
                            key={num}
                            type="button"
                            role="radio"
                            aria-checked={limit === num}
                            onClick={() => {
                              setSearchParams({
                                game: selectedGameInfo?.id || '',
                                name: selectedGameInfo?.name || '',
                                limit: num.toString(),
                              });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                              limit === num
                                ? 'bg-accent text-white shadow-sm font-bold'
                                : 'text-ink-soft hover:text-ink hover:bg-surface-2'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <div className="hidden sm:flex items-center gap-4 text-xs text-ink-faint">
                      <span className="inline-flex items-center gap-1.5 text-positive font-medium">
                        <ShieldCheck className="size-3.5" />
                        <span>Filtro anti-bombing</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-accent font-medium">
                        <Zap className="size-3.5" />
                        <span>Análisis Semántico en Vivo</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="w-full bg-negative/10 border border-negative/30 p-4 rounded-2xl text-sm flex gap-3 items-start my-4 animate-fade-up" role="alert">
                    <AlertTriangle className="size-5 text-negative shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-bold text-ink mb-0.5">No se pudo completar el análisis</h4>
                      <p className="leading-relaxed text-xs sm:text-sm text-ink-soft">{error}</p>
                      <p className="text-xs text-ink-faint mt-1.5">Comprueba que el juego tenga reseñas en español o prueba con otro título.</p>
                    </div>
                  </div>
                )}

                {/* Estado de carga - HUD Táctico Futurista */}
                {isLoading && (
                  <div className="w-full py-10 my-4 flex flex-col items-center justify-center space-y-6 tactical-card p-6 border-accent/40" role="status" aria-live="polite">
                    {/* Radar escáner */}
                    <div className="relative flex items-center justify-center w-24 h-24" aria-hidden="true">
                      <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping opacity-40" />
                      <div className="absolute inset-2 rounded-full border border-dashed border-accent/30 animate-spin" style={{ animationDuration: '8s' }} />
                      <div className="w-16 h-16 rounded-full border-2 border-accent/25 border-t-accent animate-spin flex items-center justify-center bg-surface-2 shadow-lg shadow-accent/20">
                        <Bot className="size-7 text-accent animate-pulse" />
                      </div>
                    </div>

                    <div className="text-center space-y-2 max-w-md px-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span>Fase {loadingStep + 1} de {loadingTexts.length}</span>
                      </div>
                      <p className="text-sm sm:text-base font-display font-bold text-ink tracking-tight">
                        {loadingTexts[loadingStep]}
                      </p>
                      <p className="text-xs text-ink-faint">
                        Extrayendo datos de telemetría y clasificando sentimiento en español
                      </p>
                    </div>

                    {/* Barra de progreso animada */}
                    <div className="w-full max-w-md bg-surface-2 border border-line rounded-full h-2 overflow-hidden p-0.5 shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent-2 rounded-full transition-all duration-700 ease-out shadow-sm shadow-accent/40"
                        style={{ width: `${((loadingStep + 1) / loadingTexts.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* RESULTADO DEL ANÁLISIS */}
                {!isLoading && analysisResult && (
                  <div ref={resultsRef} style={{ scrollMarginTop: '80px' }} className="animate-fade-up">
                    <RecommendationCard result={analysisResult} gameInfo={selectedGameInfo} />
                  </div>
                )}

                {/* Estado vacío inicial - Showcase Gamer de Alta Calidad */}
                {!isLoading && !analysisResult && !error && (
                  <div className="space-y-6 max-w-4xl w-full my-6">
                    {/* TÍTULOS DE EJEMPLO POPULARES */}
                    <div className="tactical-card p-6 sm:p-7 text-left space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <h3 className="text-base font-display font-bold text-ink flex items-center gap-2">
                            <Sparkles className="size-4 text-accent" />
                            <span>Comienza con un informe de referencia</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed measure">
                            Haz clic en cualquier juego para ver la telemetría completa y la síntesis IA en directo:
                          </p>
                        </div>
                        <span className="text-[11px] font-mono text-ink-faint bg-surface-2 px-2.5 py-1 rounded-lg border border-line">
                          1-Click Demo
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                        {[
                          { name: 'Elden Ring', id: '1245620', meta: '96', tag: 'Acción RPG / Souls', desc: 'Obra Maestra aclamada' },
                          { name: 'Stardew Valley', id: '413150', meta: '89', tag: 'Simulación / Granja', desc: 'Relax y gestión campestre' },
                          { name: 'Cyberpunk 2077', id: '1091500', meta: '86', tag: 'Mundo Abierto / Sci-Fi', desc: 'Redención técnica total' },
                        ].map((game) => (
                          <button
                            key={game.id}
                            type="button"
                            onClick={() => handleGameSelect(game)}
                            className="bg-surface-2/80 hover:bg-surface border border-line hover:border-accent p-3.5 rounded-2xl transition-all cursor-pointer text-left group tactical-card-interactive flex flex-col justify-between space-y-3"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="code-datum text-ink-faint bg-surface border border-line px-1.5 py-0.5 rounded">
                                {game.id}
                              </span>
                              <span className="text-xs font-bold text-positive bg-positive/10 border border-positive/30 px-2 py-0.5 rounded-md">
                                {game.meta}/100
                              </span>
                            </div>
                            <div>
                              <h4 className="text-sm font-display font-bold text-ink group-hover:text-accent transition-colors">
                                {game.name}
                              </h4>
                              <p className="text-[11px] text-ink-soft mt-0.5">{game.desc}</p>
                              <span className="text-[10px] text-ink-faint mt-1 inline-block font-medium">{game.tag}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CASO DESTACADO STARDEW VALLEY */}
                    <div className="tactical-card p-5 sm:p-6 text-left space-y-3.5 border-positive/30 bg-gradient-to-r from-surface to-positive/5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-2xl bg-positive/15 border border-positive/30 flex items-center justify-center text-positive shrink-0 shadow-sm">
                            <Gamepad2 className="size-5.5 text-positive" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-base font-display font-bold text-ink">
                                Stardew Valley
                              </h4>
                              <span className="code-datum bg-surface text-ink-faint border border-line px-2 py-0.5 rounded-md">
                                AppID: 413150
                              </span>
                            </div>
                            <p className="text-xs text-ink-soft mt-0.5">
                              Ejemplo verificado: 98% aprobación semántica comunitaria
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-bold bg-positive/20 text-positive border border-positive/40 px-3 py-1 rounded-xl shrink-0 shadow-sm">
                          Muy recomendado
                        </span>
                      </div>

                      <div className="pt-3 border-t border-line/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <span className="text-ink-soft text-xs sm:text-sm">
                          Analiza elogios, advertencias de tiempo de juego y resumen Groq LLM.
                        </span>
                        <button
                          type="button"
                          onClick={() => handleGameSelect({ name: 'Stardew Valley', id: '413150' })}
                          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-positive hover:brightness-110 border border-positive/40 px-4 py-2.5 rounded-xl transition-all cursor-pointer btn-tactical shrink-0 w-full sm:w-auto justify-center shadow-md shadow-positive/25"
                        >
                          <span>Ver informe de ejemplo</span>
                          <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </div>

                    {/* 3 PILARES DEL SISTEMA */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="tactical-card p-4 sm:p-5 space-y-2 border-line/80">
                        <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
                          <Bot className="size-4" />
                        </div>
                        <h4 className="text-xs font-display font-bold text-ink uppercase tracking-wider">
                          Semántica Real vs Voto Simple
                        </h4>
                        <p className="text-xs text-ink-soft leading-relaxed">
                          Un voto marcado como "positivo" que contenga ironía o quejas de rendimiento es detectado con precisión.
                        </p>
                      </div>

                      <div className="tactical-card p-4 sm:p-5 space-y-2 border-line/80">
                        <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400">
                          <Layers className="size-4" />
                        </div>
                        <h4 className="text-xs font-display font-bold text-ink uppercase tracking-wider">
                          Síntesis Comunitaria por IA
                        </h4>
                        <p className="text-xs text-ink-soft leading-relaxed">
                          Resúmenes ejecutivos desglosados en combate, narrativa, optimización y a quién se lo recomendamos.
                        </p>
                      </div>

                      <div className="tactical-card p-4 sm:p-5 space-y-2 border-line/80">
                        <div className="w-8 h-8 rounded-xl bg-positive/10 border border-positive/25 flex items-center justify-center text-positive">
                          <Award className="size-4" />
                        </div>
                        <h4 className="text-xs font-display font-bold text-ink uppercase tracking-wider">
                          Badges para tu GitHub
                        </h4>
                        <p className="text-xs text-ink-soft leading-relaxed">
                          Incrusta el sello de veredicto en tiempo real en los README de tus proyectos con una URL SVG automática.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            }
          />

          {/* RUTA RECOMENDAR */}
          <Route path="/recomendar" element={<Recomendar />} />

          {/* RUTA CÓMO FUNCIONA */}
          <Route
            path="/como-funciona"
            element={
              <div className="py-6 sm:py-8">
                <HowItWorks />
              </div>
            }
          />

          {/* RUTA CHANGELOG */}
          <Route path="/changelog" element={<Changelog />} />

          {/* RUTA ESTADO DEL SERVICIO */}
          <Route path="/estado" element={<Status />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-line mt-auto bg-surface/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-3">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-ink-soft font-semibold" aria-label="Navegación secundaria">
            <Link to="/" className="hover:text-accent transition-colors">Inicio</Link>
            <Link to="/recomendar" className="hover:text-accent transition-colors">Recomendador</Link>
            <Link to="/como-funciona" className="hover:text-accent transition-colors">Cómo funciona</Link>
            <a href="/como-funciona#aviso-legal" className="hover:text-accent transition-colors">Aviso legal</a>
            <Link to="/estado" className="hover:text-accent transition-colors">Estado del servicio</Link>
            <Link to="/changelog" className="hover:text-accent transition-colors">Changelog</Link>
          </nav>
          <p className="text-xs text-ink-faint text-center">
            Game Recommended AI © {new Date().getFullYear()} — Análisis de sentimiento y recomendaciones inteligentes para Steam en español
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
