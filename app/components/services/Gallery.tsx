import { useState } from 'react';
import { Link } from 'react-router';
import Button from '../ui/Button2';

interface AccordionItemData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

// --- Data for the image accordion ---
const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: 'Arquitectura',
    description:
      'Diseñamos proyectos arquitectónicos integrales que combinan funcionalidad, estética y sostenibilidad. Desde el concepto hasta la ejecución, transformamos tus ideas en espacios únicos que perduran en el tiempo.',
    imageUrl: '/esmeralda/esmeralda-1.webp',
  },
  {
    id: 2,
    title: 'Industrial-Comercial',
    description:
      'Desarrollamos soluciones arquitectónicas para espacios industriales y comerciales que optimizan procesos, maximizan la eficiencia operativa y fortalecen la identidad de tu marca en cada detalle.',
    imageUrl: '/bodega_panan.jpg',
  },
  {
    id: 3,
    title: 'Interiores',
    description:
      'Creamos ambientes interiores sofisticados que reflejan tu personalidad y estilo de vida. Combinamos funcionalidad y diseño para transformar cada espacio en una experiencia única y confortable.',
    imageUrl: '/esmeralda/esmeralda-11.webp',
  },
  {
    id: 4,
    title: 'Muebles-Decoración',
    description:
      'Diseñamos y fabricamos mobiliario a medida y elementos decorativos exclusivos que complementan perfectamente tu espacio. Cada pieza es una obra de arte funcional que eleva la estética de tu proyecto.',
    imageUrl: '/esmeralda/esmeralda-8.webp',
  },
  {
    id: 5,
    title: 'Consultoría',
    description:
      'Brindamos asesoría especializada en todas las etapas de tu proyecto arquitectónico. Nuestro expertise te guía en la toma de decisiones estratégicas para lograr resultados excepcionales y rentables.',
    imageUrl: '/consultoria.webp',
  },
];

// --- Accordion Item Component ---
interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
}

const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative h-[450px] overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/accordion/accordion1.webp';
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Mobile Service Card Component ---
interface MobileServiceCardProps {
  item: AccordionItemData;
  onClick?: () => void;
}

const MobileServiceCard = ({ item, onClick }: MobileServiceCardProps) => {
  return (
    <div
      className="relative h-[300px] overflow-hidden rounded-lg cursor-pointer group"
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/accordion/accordion1.webp';
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-sm text-white/90 line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
};

// --- Main Gallery Component ---
const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  // Get the current active item for dynamic content
  const activeItem = accordionItems[activeIndex];

  return (
    <div className="bg-black font-sans px-4">
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        {/* Desktop View: Text + Accordion */}
        <div className="hidden md:flex flex-row items-center justify-between gap-12">
          {/* Left Side: Dynamic Text Content */}
          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tighter">
              {activeItem.title}
            </h1>
            <p className="mt-6 text-lg text-white max-w-xl">{activeItem.description}</p>
            <div className="mt-8">
              <Link to="/contacto">
                <Button>Contáctanos</Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View: Vertical Cards */}
        <div className="md:hidden">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Nuestros Servicios
          </h2>
          <div className="flex flex-col gap-6">
            {accordionItems.map((item) => (
              <MobileServiceCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/contacto">
              <Button>Contáctanos</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
