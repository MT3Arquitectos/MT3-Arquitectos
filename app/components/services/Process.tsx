import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

const SPRING_OPTIONS = { mass: 1, stiffness: 220, damping: 20 };
const NUM_FILLER_LINES_PER_SECTION = 4; // líneas "de relleno" entre números
const LINES_PER_STEP = NUM_FILLER_LINES_PER_SECTION + 1; // 1 tick principal (número) + fillers
const WAVE_SIGMA = 1.1; // anchura de la onda (en ticks)

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
}

const STEPS: Step[] = [
  { number: '01', title: 'IDEAS', description: 'Lluvia de ideas y objetivos. Detectamos necesidades, contexto y metas del proyecto.', image: '/process/process1.webp' },
  { number: '02', title: 'CONCEPTO', description: 'Definimos el concepto rector: estilo, referencias y lineamientos de diseño.', image: '/process/process2.webp' },
  { number: '03', title: 'PLANOS', description: 'Desarrollo de planos arquitectónicos y técnicos para aprobación.', image: '/process/process4.webp' },
  { number: '04', title: 'RENDERS', description: 'Visualizaciones fotorrealistas para validar materiales, volumetría y acabados.', image: '/process/process5.webp' },
  { number: '05', title: 'EVALUACIÓN', description: 'Seguimiento continuo del proyecto, revisiones periódicas y ajustes en tiempo real para garantizar calidad.', image: '/process/process8.webp' },
  { number: '06', title: 'COTIZACIÓN', description: 'Alcances, tiempos y costos. Presentamos una propuesta clara y desglosada.', image: '/process/process3.webp' },
  { number: '07', title: 'GESTIÓN', description: 'Gestión de documentación necesaria, permisos y autorizaciones para que todo esté registrado legalmente.', image: '/process/process6.webp' },
  { number: '08', title: 'EJECUCIÓN', description: 'Plan de obra, coordinación y supervisión de la construcción etapa por etapa.', image: '/process/process7.webp' },
  { number: '09', title: 'CULMINACIÓN', description: 'Entrega de construcción y finalización del proyecto.', image: '/process/process9.webp' },
];

// Total number of ticks in the rail
const TOTAL_TICKS = (STEPS.length - 1) * LINES_PER_STEP + 1;

type StepElement = { type: 'step'; position: number; step: Step; stepIndex: number };
type TickElement = { type: 'tick'; position: number };
type RailEl = StepElement | TickElement;

// Create unified array of all rail elements
const RAIL_ELEMENTS: RailEl[] = Array.from({ length: TOTAL_TICKS }, (_, i): RailEl => {
  const stepIndex = Math.floor(i / LINES_PER_STEP);
  const isStep = i % LINES_PER_STEP === 0;

  if (isStep && stepIndex < STEPS.length) {
    return { type: 'step', position: i, step: STEPS[stepIndex], stepIndex };
  }
  return { type: 'tick', position: i };
});

const Card = ({ step, proximity }: { step: Step; proximity: number }) => {
  const prox = useSpring(proximity, SPRING_OPTIONS);
  const scale = useTransform(prox, (p) => 0.95 + 0.05 * p);
  const y = useTransform(prox, (p) => (1 - p) * 16);

  return (
    <motion.div
      className="pointer-events-auto relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[580px] rounded-lg shadow-2xl border border-white/20 overflow-hidden min-h-[200px] sm:min-h-[240px] lg:min-h-[200px]"
      style={{ scale, y }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] h-full">
        {/* Contenido de texto */}
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
          <div className="mb-4 lg:mb-6">
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-extrabold tracking-wide text-white mb-2">
              {step.title}
            </h3>
            <span className="text-base sm:text-lg lg:text-xl font-extrabold text-white leading-none">
              {step.number}
            </span>
          </div>
          <p className="text-xs sm:text-sm lg:text-lg leading-relaxed text-white">
            {step.description}
          </p>
        </div>

        {/* Imagen - solo visible en desktop */}
        <div className="hidden lg:block relative">
          <div
            className="w-full h-full bg-cover bg-center opacity-100"
            style={{
              backgroundImage: `url('${step.image}')`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Process = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const [proximity, setProximity] = useState<number[]>(() => Array(STEPS.length).fill(0));

  // Fase de la onda (en "ticks" globales del rail). 0 = inicio, aumenta hacia abajo.
  const wavePhaseMV = useMotionValue(0);
  const wavePhase = useSpring(wavePhaseMV, SPRING_OPTIONS);

  useEffect(() => {
    const compute = () => {
      const centersDoc = sectionRefs.current
        .map((el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const centerDoc = r.top + window.scrollY + r.height / 2;
          return centerDoc;
        })
        .filter((c): c is number => c !== null);

      if (centersDoc.length === 0) return;

      const midDoc = window.scrollY + window.innerHeight / 2;

      // proximidad por sección (para escala/opacity de números)
      const nextProx = centersDoc.map((c) => {
        const maxDist = window.innerHeight * 0.6;
        const dist = Math.abs(midDoc - c);
        return Math.max(0, 1 - dist / maxDist);
      });

      // índice continuo entre secciones (pos = idx + t)
      let idx = 0;

      // Determinar en qué segmento estamos
      if (midDoc < centersDoc[0]) {
        idx = 0;
      } else if (midDoc > centersDoc[centersDoc.length - 1]) {
        idx = centersDoc.length - 1;
      } else {
        for (let i = 0; i < centersDoc.length - 1; i++) {
          if (midDoc >= centersDoc[i] && midDoc <= centersDoc[i + 1]) {
            idx = i;
            break;
          }
        }
      }

      // Calcular posición interpolada
      let pos: number;
      if (idx === centersDoc.length - 1) {
        const lastCenter = centersDoc[centersDoc.length - 1];
        const extraDist = Math.max(0, midDoc - lastCenter);
        const extraProgress = Math.min(1, extraDist / (window.innerHeight * 0.5));
        pos = idx + extraProgress;
      } else {
        const c0 = centersDoc[idx];
        const c1 = centersDoc[idx + 1];
        const t = c1 === c0 ? 0 : Math.max(0, Math.min(1, (midDoc - c0) / (c1 - c0)));
        pos = idx + t;
      }

      // Fase de la onda en ticks globales
      const maxPos = STEPS.length - 1;
      const totalTicksSpan = maxPos * LINES_PER_STEP;
      const phaseTicks = Math.max(0, Math.min(totalTicksSpan, pos * LINES_PER_STEP));
      wavePhaseMV.set(phaseTicks);

      setProximity(nextProx);
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [wavePhaseMV]);

  return (
    <div className="min-h-screen w-full bg-[#1c1b1f] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            PROCESO DE<br />
            <span className="text-white">TRABAJO MT.3</span>
          </h1>
        </div>

        <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[104px_1fr] gap-4 md:gap-8">
          {/* RAIL IZQUIERDO (sticky) */}
          <div ref={railRef} className="relative h-screen sticky top-0">
            <div className="relative flex h-full flex-col justify-between items-start py-6">
              {RAIL_ELEMENTS.map((element) => (
                <RailElement
                  key={element.position}
                  element={element}
                  wavePhase={wavePhase}
                  proximity={element.type === 'step' ? proximity[element.stepIndex] || 0 : 0}
                  setRef={
                    element.type === 'step'
                      ? (el) => (stepRefs.current[element.stepIndex] = el)
                      : undefined
                  }
                />
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: secciones 100vh con tarjeta */}
          <div className="relative">
            {STEPS.map((step, idx) => (
              <section
                key={`sec-${step.number}`}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                className="h-screen flex items-center justify-end relative pr-0 sm:pr-4 md:pr-8"
              >
                <Card step={step} proximity={proximity[idx] || 0} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface RailElementProps {
  element: RailEl;
  wavePhase: MotionValue<number>;
  proximity: number;
  setRef?: (el: HTMLDivElement | null) => void;
}

// Unified rail element component (replaces StepItem and WaveTick)
const RailElement = ({ element, wavePhase, proximity, setRef }: RailElementProps) => {
  const prox = useSpring(proximity, SPRING_OPTIONS);

  // Wave influence calculation (unified for both steps and ticks)
  const waveInfluence = useTransform(wavePhase, (p) => {
    const d = element.position - p;
    return Math.exp(-(d * d) / (2 * WAVE_SIGMA * WAVE_SIGMA)); // [0..1]
  });

  // Base animations
  const baseWidth = 8;
  const maxWidth = 32;
  const lineWidth = useTransform(waveInfluence, (v) => baseWidth + (maxWidth - baseWidth) * v);
  const x = useTransform(waveInfluence, (v) => v * 12); // horizontal wave push

  const scale = useTransform(prox, (v) => 1 + (1.05 - 1) * v);
  const numberX = useTransform(waveInfluence, (v) => v * 8 + maxWidth + 16);

  if (element.type === 'step') {
    return (
      <motion.div
        ref={(el) => setRef?.(el)}
        className="relative flex items-center pointer-events-none h-12"
        style={{ scale }}
      >
        <motion.div className="h-0.5 bg-white" style={{ width: lineWidth, x }} />
        <motion.span
          className="absolute left-0 text-4xl md:text-5xl font-extrabold text-white"
          style={{ x: numberX }}
        >
          {element.step.number}
        </motion.span>
      </motion.div>
    );
  }

  return <motion.div className="h-0.5 bg-white" style={{ width: lineWidth, x }} />;
};

export default Process;
