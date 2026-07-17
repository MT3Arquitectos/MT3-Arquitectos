import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Button from '../ui/Button';
import Sidebar from '../ui/Sidebar';

const ServicesHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/services_hero/services-slider.webp',
    '/esmeralda/esmeralda-5.webp',
    '/esmeralda/esmeralda-8.webp',
    '/voala/voala-1.webp',
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical lines */}
        <div className="absolute inset-0 grid grid-cols-6 gap-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="border-r border-white/20"
              style={{ gridColumn: `${i + 1} / ${i + 2}` }}
            />
          ))}
        </div>
        {/* Horizontal lines */}
        <div className="absolute inset-0 grid grid-rows-4 gap-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="border-b border-white/20"
              style={{ gridRow: `${i + 1} / ${i + 2}` }}
            />
          ))}
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Sidebar with Social Media Icons */}
      <Sidebar />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="hero-title text-4xl md:text-4xl lg:text-5xl font-normal text-white mb-6 leading-tight">
            Del concepto a la construcción.<br />
          </h1>

          <p className="hero-subtitle text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
            Servicios completos de arquitectura, dirección técnica y gestión de proyectos.
          </p>

          <Link to="/contacto">
            <Button>COTIZA</Button>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 bottom-8 z-20 text-white hover:text-gray-300 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-lg"
        aria-label="Previous slide"
      >
        <IoChevronBack className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 bottom-8 z-20 text-white hover:text-gray-300 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-lg"
        aria-label="Next slide"
      >
        <IoChevronForward className="w-8 h-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;
