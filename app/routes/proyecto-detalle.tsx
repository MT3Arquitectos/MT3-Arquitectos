import { useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/proyecto-detalle';
import { getProjectBySlug } from '../sanity/projects';
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from '../components/projects/ImageComparison';
import Button from '../components/ui/Button';
import GalleryModal from '../components/ui/GalleryModal';

export async function loader({ params }: Route.LoaderArgs) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    throw new Response('Proyecto no encontrado', { status: 404 });
  }
  return { project };
}

function toProjectOgJpg(image: string) {
  if (!image) return '/og/proyectos.jpg';

  try {
    const url = new URL(image);
    url.searchParams.set('w', '1200');
    url.searchParams.set('h', '630');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('fm', 'jpg');
    return url.toString();
  } catch {
    return image;
  }
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.project) {
    return [{ title: 'Proyecto no encontrado — MT3 Arquitectos' }];
  }
  const ogImage = toProjectOgJpg(data.project.image);

  return [
    { title: `${data.project.title} — MT3 Arquitectos` },
    { name: 'description', content: data.project.description.slice(0, 155) },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:image', content: ogImage },
  ];
}

export default function ProyectoDetalle({ loaderData }: Route.ComponentProps) {
  const { project } = loaderData;

  // Gallery modal state
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const openGalleryModal = (index: number) => {
    setCurrentGalleryIndex(index);
    setIsGalleryModalOpen(true);
  };

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false);
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!project.gallery) return;

    if (direction === 'next') {
      setCurrentGalleryIndex((prev) =>
        prev === project.gallery.length - 1 ? 0 : prev + 1
      );
    } else if (direction === 'prev') {
      setCurrentGalleryIndex((prev) =>
        prev === 0 ? project.gallery.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="bg-[#212121] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <Link
          to="/proyectos"
          prefetch="intent"
          className="inline-flex items-center gap-2 text-lg mb-8 hover:underline"
        >
          &larr; ATRÁS
        </Link>

        {/* Image Comparison Slider */}
        <div className="mb-12">
          <ImageComparison className="aspect-[4/3] w-full rounded-lg md:aspect-video">
            <ImageComparisonImage
              src={project.image}
              alt={project.title}
              position="left"
              className="grayscale"
            />
            <ImageComparisonImage src={project.image} alt={project.title} position="right" />
            <ImageComparisonSlider className="w-1 bg-white/50 backdrop-blur-sm">
              <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-xl flex items-center justify-center">
                <div className="h-5 w-5 bg-white rounded-full" />
              </div>
            </ImageComparisonSlider>
          </ImageComparison>
        </div>

        {/* Project Info */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col">
            <h1 className="text-6xl font-bold mb-6 tracking-tighter">{project.title}</h1>
            <div className="font-light space-y-1">
              <p><span className="font-semibold">NOMBRE DEL PROYECTO:</span> {project.title}</p>
              <p><span className="font-semibold">CATEGORÍA:</span> {project.category}</p>
              <p><span className="font-semibold">UBICACIÓN:</span> {project.location}</p>
              <p><span className="font-semibold">ARQUITECTO:</span> {project.architect}</p>
              <p><span className="font-semibold">FECHA DE ENTREGA:</span> {project.date}</p>
              {project.duration && <p><span className="font-semibold">DURACIÓN:</span> {project.duration}</p>}
              {project.landArea && <p><span className="font-semibold">SUPERFICIE DE TERRENO:</span> {project.landArea}</p>}
              {project.builtArea && <p><span className="font-semibold">SUPERFICIE CONSTRUIDA:</span> {project.builtArea}</p>}
              {project.levels && <p><span className="font-semibold">NIVELES:</span> {project.levels}</p>}
              {project.concept && <p><span className="font-semibold">CONCEPTO:</span> {project.concept}</p>}
            </div>
          </div>
          <div>
            <p className="text-gray-300 font-light leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>

        {/* Challenges & Materials */}
        {(project.challenges || project.materials) && (
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {project.challenges && (
              <div>
                <h3 className="text-2xl font-bold mb-4">RETOS Y SOLUCIONES</h3>
                <p className="text-gray-300 font-light leading-relaxed">{project.challenges}</p>
              </div>
            )}
            {project.materials && (
              <div>
                <h3 className="text-2xl font-bold mb-4">MATERIALES DESTACADOS</h3>
                <p className="text-gray-300 font-light leading-relaxed">{project.materials}</p>
              </div>
            )}
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {project.gallery.map((item, index) => (
                <div
                  key={index}
                  className="relative aspect-video group cursor-pointer"
                  onClick={() => openGalleryModal(index)}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <video
                      src={item.src}
                      poster={item.thumbnail}
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        <path d="M10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/contacto" prefetch="intent">
            <Button className="bg-black border-white text-white hover:bg-white hover:text-black">
              COTIZAR
            </Button>
          </Link>
        </div>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={closeGalleryModal}
        images={project.gallery || []}
        currentIndex={currentGalleryIndex}
        onNavigate={navigateGallery}
      />
    </div>
  );
}
