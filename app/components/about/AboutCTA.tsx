import { Link } from 'react-router';
import Button2 from '../ui/Button2';

const AboutCTA = () => {
  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Geometric pattern SVG */}
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="geometric-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="50" height="50" fill="none" stroke="#000" strokeWidth="0.5" />
                <rect x="50" y="50" width="50" height="50" fill="none" stroke="#000" strokeWidth="0.5" />
                <circle cx="25" cy="25" r="8" fill="none" stroke="#000" strokeWidth="0.5" />
                <circle cx="75" cy="75" r="8" fill="none" stroke="#000" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="100" y2="100" stroke="#000" strokeWidth="0.3" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="#000" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight">
              NUESTRA EXPERIENCIA
              <br />
              <span className="font-bold">NOS RESPALDA</span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-700 font-light">
              Deja tu proyecto en nuestras manos.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Link to="/contacto">
              <Button2 className="text-lg px-12 py-4 font-semibold">
                COMENCEMOS A DISEÑARLO
              </Button2>
            </Link>
          </div>

          {/* Additional decorative elements */}
          <div className="flex justify-center items-center space-x-8 pt-12 opacity-60">
            <div className="h-px bg-black w-16"></div>
            <div className="w-2 h-2 bg-black rotate-45"></div>
            <div className="h-px bg-black w-16"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
