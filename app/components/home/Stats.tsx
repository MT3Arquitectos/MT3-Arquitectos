import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

interface StatProps {
  num: number;
  suffix: string;
  label: string;
  description: string;
}

const Stat = ({ num, suffix, label, description }: StatProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, num, {
      duration: 2.5,
      ease: 'easeOut',
      onUpdate(value) {
        if (!ref.current) return;
        ref.current.textContent = String(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [num, isInView]);

  return (
    <div className="text-center group">
      <div className="relative">
        {/* Number */}
        <div className="mb-4">
          <span className="text-6xl md:text-7xl font-light text-white block font-semibold">
            [<span ref={ref}>0</span>{suffix}]
          </span>
        </div>

        {/* Label */}
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-wide">
          {label}
        </h3>

        {/* Description */}
        <p className="text-white/80 text-sm md:text-base max-w-xs mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative line */}
      <div className="mt-6 w-16 h-0.5 bg-white/30 mx-auto group-hover:bg-white transition-colors duration-300"></div>
    </div>
  );
};

const Stats = () => {
  return (
    <section
      className="relative py-16 md:py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/stats-bg.webp)',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-semibold">
          <Stat num={200} suffix="+" label="PROYECTOS" description="Espacios únicos diseñados y construidos" />
          <Stat num={150} suffix="+" label="CLIENTES" description="Confianza depositada en nuestro trabajo" />
          <Stat num={35} suffix="+" label="AÑOS DE EXPERIENCIA" description="Trayectoria consolidada en el mercado" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
