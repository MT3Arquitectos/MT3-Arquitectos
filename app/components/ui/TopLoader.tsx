import { useEffect, useRef, useState } from 'react';
import { useNavigation } from 'react-router';

// Tiempo mínimo que la barra permanece visible una vez que aparece,
// para que el usuario siempre perciba el feedback de carga aunque la
// navegación termine antes.
const MIN_VISIBLE_MS = 1000;
// Cada cuánto avanza el progreso mientras la navegación sigue en curso.
const TICK_MS = 200;

export default function TopLoader() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== 'idle';

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const shownAtRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isNavigating) {
      clearTimeout(hideTimerRef.current);
      clearInterval(intervalRef.current);

      shownAtRef.current = Date.now();
      setVisible(true);
      setProgress(10);

      // Avanza acercándose a 90% mientras la navegación siga activa; nunca
      // llega a 100% por su cuenta, eso solo pasa cuando la carga termina.
      intervalRef.current = setInterval(() => {
        setProgress((p) => (p < 90 ? p + (90 - p) * 0.2 : p));
      }, TICK_MS);

      return;
    }

    clearInterval(intervalRef.current);
    if (!visible) return;

    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);

    setProgress(100);
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, remaining + 200);
  }, [isNavigating]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 pointer-events-none">
      <div
        className="h-full bg-[#F2B705] transition-[width,opacity] duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress >= 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
