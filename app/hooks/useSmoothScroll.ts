import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const getLenisInstance = (): Lenis | null => lenisInstance;

const useSmoothScroll = (shouldEnable = true) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Solo inicializar si está habilitado (y en el cliente)
    if (!shouldEnable) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [shouldEnable]);

  return lenisRef;
};

export default useSmoothScroll;
