// Carousel.tsx
import { useId, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Link } from 'react-router';
import { FaArrowRight, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import { DrawOutlineButton } from '../ui/DrawOutlineButton';
import type { Project } from '../../data/projectsData';

interface SlideData {
  title: string;
  button: string;
  src: string;
  slug: string;
  description: string;
  location: string;
  category: string;
  architect: string;
  date: string;
  duration: string;
  landArea: string;
  builtArea: string;
  levels: number | string;
  fullDescription: string;
  challenges: string;
  materials: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  isExpanded: boolean;
  handleSlideClick: (index: number) => void;
  handleToggleExpanded: (index: number) => void;
}

/* --- Slide --- */
const Slide = ({
  slide,
  index,
  current,
  isExpanded,
  handleSlideClick,
  handleToggleExpanded,
}: SlideProps) => {
  const imageLoaded = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = '1';
  };

  const {
    src,
    button,
    title,
    location,
    category,
    architect,
    date,
    duration,
    landArea,
    builtArea,
    levels,
    slug,
  } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        style={{
          transform:
            current !== index
              ? 'scale(0.98) rotateX(8deg)'
              : 'scale(1) rotateX(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'bottom',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out">
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{ opacity: current === index ? 1 : 0.5 }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />

          {/* Expandable Box */}
          <div
            className={`absolute inset-0 bg-black/90 p-4 text-white flex flex-col justify-start items-start text-left transition-all duration-500 ease-in-out overflow-y-auto ${
              isExpanded
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold text-blue-300">Categoría:</span> {category}</p>
                  <p><span className="font-semibold text-blue-300">Ubicación:</span> {location}</p>
                  <p><span className="font-semibold text-blue-300">Arquitecto:</span> {architect}</p>
                  <p><span className="font-semibold text-blue-300">Fecha:</span> {date}</p>
                  <p><span className="font-semibold text-blue-300">Duración:</span> {duration}</p>
                  <p><span className="font-semibold text-blue-300">Terreno:</span> {landArea}</p>
                  <p><span className="font-semibold text-blue-300">Construcción:</span> {builtArea}</p>
                  <p><span className="font-semibold text-blue-300">Niveles:</span> {levels}</p>
                </div>
              </div>
            </div>
          </div>

          {current === index && !isExpanded && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}

          {/* Info Button */}
          {current === index && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleExpanded(index);
              }}
              className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20 cursor-pointer"
              aria-label="Ver información del proyecto"
            >
              <FaInfoCircle className="text-gray-800 w-5 h-5" />
            </button>
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index && !isExpanded
              ? 'opacity-100 visible'
              : 'opacity-0 invisible'
          }`}
        >
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold relative">
            {title}
          </h2>
          <div className="flex justify-center">
            <Link to={`/proyectos/${slug}`}>
              <DrawOutlineButton className="mt-6">{button}</DrawOutlineButton>
            </Link>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: 'previous' | 'next';
  title: string;
  handleClick: () => void;
}

/* --- Controles del carrusel --- */
const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => {
  return (
    <button
      className="w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 cursor-pointer"
      title={title}
      onClick={handleClick}
      aria-label={title}
    >
      {type === 'previous' ? (
        <FaArrowLeft className="text-neutral-600 dark:text-neutral-200 w-5 h-5" />
      ) : (
        <FaArrowRight className="text-neutral-600 dark:text-neutral-200 w-5 h-5" />
      )}
    </button>
  );
};

/* --- Carrusel principal --- */
export const Carousel = ({ slides = [] }: { slides?: SlideData[] }) => {
  const [current, setCurrent] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
    setExpandedIndex(-1);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
    setExpandedIndex(-1);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
      setExpandedIndex(-1);
    }
  };

  const handleToggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const id = useId();

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
      role="region"
    >
      <h2 id={`carousel-heading-${id}`} className="sr-only">
        Image carousel
      </h2>

      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * (100 / slides.length)}%)` }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            isExpanded={expandedIndex === index}
            handleSlideClick={handleSlideClick}
            handleToggleExpanded={handleToggleExpanded}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
};

/* --- Transformar datos de proyectos para el carousel --- */
function toSlides(projects: Project[]): SlideData[] {
  return projects.map((project) => ({
    title: project.title,
    button: 'Ver Proyecto',
    src: project.image,
    slug: project.slug,
    description: project.concept,
    location: project.location,
    category: project.category,
    architect: project.architect,
    date: project.date,
    duration: project.duration,
    landArea: project.landArea,
    builtArea: project.builtArea,
    levels: project.levels,
    fullDescription: project.description,
    challenges: project.challenges,
    materials: project.materials,
  }));
}

export default function CarouselDemo({ projects }: { projects: Project[] }) {
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={toSlides(projects)} />
    </div>
  );
}
