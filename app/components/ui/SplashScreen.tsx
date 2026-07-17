import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [useFallback, setUseFallback] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Timer de seguridad: si el video no inicia en 500ms, mostrar fallback
    timeoutRef.current = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused) {
        setUseFallback(true);
        setShowContent(true);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleVideoPlay = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowContent(true);
  };

  const handleVideoError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setUseFallback(true);
    setShowContent(true);
  };

  const handleVideoEnd = () => {
    setTimeout(() => {
      onFinish();
    }, 200);
  };

  useEffect(() => {
    if (useFallback) {
      // Duración del logo: 2.5 segundos de animación
      const t = setTimeout(() => {
        onFinish();
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [useFallback, onFinish]);

  return (
    <motion.div
      key="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className={`fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center ${
        useFallback ? 'bg-white' : 'bg-black'
      }`}
      style={{
        transition: 'background-color 0.6s ease-in-out',
      }}
    >
      {!useFallback ? (
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onPlay={handleVideoPlay}
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        >
          <source src="/splash/cortinilla-horizontal.mp4" type="video/mp4" />
        </motion.video>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{
            opacity: { duration: 0.8, ease: 'easeOut' },
            scale: { duration: 1.2, ease: 'easeOut' },
            filter: { duration: 1, ease: 'easeOut' },
          }}
          className="flex items-center justify-center p-8"
        >
          <img
            src="/MT3_LOGO_BLACK.png"
            alt="MT3 Logo"
            className="max-w-[60%] max-h-[60%] w-auto h-auto object-contain"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SplashScreen;
