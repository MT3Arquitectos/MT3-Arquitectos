import { Link } from 'react-router';
import Button from '../ui/Button';

const HomeCTA = () => {
  return (
    <section className="bg-[#707372] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight">
              "Diseñamos espacios que funcionan y emocionan."
            </h2>

            <p className="text-xl lg:text-2xl font-light opacity-90 leading-relaxed">
              Cuéntanos tu proyecto y lo haremos realidad.
            </p>
          </div>

          {/* Right side - CTA Button */}
          <div className="flex justify-center lg:justify-end">
            <Link to="/contacto">
              <Button className="text-lg px-8 py-4 font-medium tracking-wide">
                COTIZA AHORA
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;
