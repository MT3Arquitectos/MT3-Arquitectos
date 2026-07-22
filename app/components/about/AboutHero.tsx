import { Link } from 'react-router';
import Button from '../ui/Button';
import Sidebar from '../ui/Sidebar';

const AboutHero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/about_hero/abouthero-bg.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

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
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            <span className="font-semibold">Conócenos</span>
          </h1>

          <p className="hero-subtitle text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
            Agenda tu asesoría y empieza a construir tu visión.
          </p>

          <Link to="/contacto" prefetch="intent">
            <Button>COMENCEMOS</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
