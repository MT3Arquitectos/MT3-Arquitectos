import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

type TabKey = 'nosotros' | 'mision' | 'vision';

const MissionVission = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('nosotros');

  const content: Record<TabKey, { title: string; text: string }> = {
    nosotros: {
      title: 'NOSOTROS',
      text: 'Somos un despacho de arquitectura con más de 30 años de experiencia generando proyectos con personalidad, rompiendo estereotipos, logrando diseños únicos',
    },
    mision: {
      title: 'MISIÓN',
      text: 'Crear espacios arquitectónicos únicos que reflejen la personalidad y necesidades de nuestros clientes, combinando funcionalidad, estética y sostenibilidad en cada proyecto que realizamos.',
    },
    vision: {
      title: 'VISIÓN',
      text: 'Ser reconocidos como el despacho líder en arquitectura personalizada, transformando la manera de habitar los espacios y estableciendo nuevos estándares en diseño arquitectónico innovador.',
    },
  };

  return (
    <section className="relative bg-neutral-800 py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-white ">
                DONDE LA IMAGINACIÓN<br />
                <span className="font-normal">SE HACE REALIDAD</span>
              </h2>
            </div>

            {/* Tab Navigation */}
            <div className="relative">
              <div className="flex gap-12">
                {(Object.keys(content) as TabKey[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      pb-4 text-lg font-medium uppercase tracking-wider
                      transition-colors duration-300 relative whitespace-nowrap cursor-pointer
                      ${activeTab === tab ? 'text-white' : 'text-white/60 hover:text-white/80'}
                    `}
                  >
                    {content[tab].title}
                    {/* Animated underline */}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Content */}
            <div className="space-y-6">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-white/90 text-lg leading-relaxed max-w-lg"
              >
                {content[activeTab].text}
              </motion.p>

              <div className="pt-4">
                <Link to="/contacto" prefetch="intent">
                  <Button className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                    COTIZA TU PROYECTO
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/mission_vision.webp"
                alt="Espacio arquitectónico moderno"
                className="w-full h-[600px] object-cover"
              />
              {/* Optional overlay for better text visibility if needed */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVission;
