import { useEffect, useState } from 'react';
import type { GalleryItem } from '../../data/projectsData';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryItem[];
  currentIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const GalleryModal = ({ isOpen, onClose, images, currentIndex, onNavigate }: GalleryModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle opening and closing animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cerrar modal con tecla ESC / navegación con flechas
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        onNavigate('next');
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleKeyNavigation);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyNavigation);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNavigate]);

  // Reset image loaded state when image changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  if (!shouldRender) return null;

  const currentImage = images[currentIndex];
  const isVideo = currentImage?.type === 'video';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ease-out ${
        isAnimating ? 'bg-black/90 opacity-100' : 'bg-black/0 opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 z-10 text-white hover:text-gray-300 transition-all duration-300 ease-out p-2 hover:bg-black/20 rounded-full focus:outline-none ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          aria-label="Cerrar galería"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('prev');
              }}
              className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-all duration-300 ease-out p-3 hover:bg-black/20 rounded-full focus:outline-none ${
                isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              aria-label="Imagen anterior"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('next');
              }}
              className={`absolute right-5 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-all duration-300 ease-out p-3 hover:bg-black/20 rounded-full focus:outline-none ${
                isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              aria-label="Imagen siguiente"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </>
        )}

        {/* Image/Video container */}
        <div className={`relative w-full max-w-4xl aspect-[4/3] bg-black rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-out ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {isVideo ? (
            <video
              src={currentImage.src}
              poster={currentImage.thumbnail}
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              onLoadedData={() => setImageLoaded(true)}
              onPlay={() => setImageLoaded(true)}
            />
          ) : (
            <img
              src={currentImage.src}
              alt={`Galería - Imagen ${currentIndex + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          )}
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ease-out ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryModal;
