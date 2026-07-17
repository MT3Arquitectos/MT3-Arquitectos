import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Lista de logos
const logos = [
  { id: 1, src: '/logos/logo1.png', alt: 'Logo Carrusel 1' },
  { id: 2, src: '/logos/logo2.png', alt: 'Logo Carrusel 2' },
  { id: 3, src: '/logos/logo3.png', alt: 'Logo Carrusel 3' },
  { id: 4, src: '/logos/logo4.png', alt: 'Logo Carrusel 4' },
  { id: 5, src: '/logos/logo5.png', alt: 'Logo Carrusel 5' },
  { id: 6, src: '/logos/logo6.png', alt: 'Logo Carrusel 6' },
  { id: 7, src: '/logos/logo7.png', alt: 'Logo Carrusel 7' },
  { id: 8, src: '/logos/logo8.png', alt: 'Logo Carrusel 8' },
  { id: 9, src: '/logos/logo9.png', alt: 'Logo Carrusel 9' },
  { id: 10, src: '/logos/logo10.png', alt: 'Logo Carrusel 10' },
  { id: 11, src: '/logos/logo11.png', alt: 'Logo Carrusel 11' },
  { id: 12, src: '/logos/logo12.png', alt: 'Logo Carrusel 12' },
  { id: 13, src: '/logos/logo13.png', alt: 'Logo Carrusel 13' },
];

const TranslateWrapper = ({ children, reverse }: { children: ReactNode; reverse?: boolean }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      className="flex gap-12 px-6 min-w-max"
    >
      {children}
    </motion.div>
  );
};

const LogoItem = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex items-center">
    <img src={src} alt={alt} className="h-16 w-auto sm:h-20 md:h-24 lg:h-32" />
  </div>
);

const LogoItems = () => (
  <div className="flex gap-12">
    {logos.map((logo) => (
      <LogoItem key={logo.id} src={logo.src} alt={logo.alt} />
    ))}
  </div>
);

const Logos = () => {
  return (
    <section className="relative w-full overflow-hidden border-b border-zinc-700 py-12 sm:py-16 bg-[#F4F4F4]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full overflow-hidden">
          <TranslateWrapper>
            <LogoItems />
          </TranslateWrapper>
          <TranslateWrapper>
            <LogoItems />
          </TranslateWrapper>
          <TranslateWrapper>
            <LogoItems />
          </TranslateWrapper>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F4F4F4] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F4F4F4] to-transparent" />
    </section>
  );
};

export default Logos;
