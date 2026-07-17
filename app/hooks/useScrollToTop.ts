import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getLenisInstance } from './useSmoothScroll';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantáneo al cambiar de ruta
    const lenis = getLenisInstance();
    if (lenis && typeof lenis.scrollTo === 'function') {
      // usar Lenis si está activo para forzar scroll inmediato
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // fallback para Safari/iOS antiguos
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);
};

export default useScrollToTop;
