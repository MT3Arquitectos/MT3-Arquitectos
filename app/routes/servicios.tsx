import type { Route } from './+types/servicios';
import ServicesHero from '../components/services/ServicesHero';
import Gallery from '../components/services/Gallery';
import Process from '../components/services/Process';
import ServicesCarousel from '../components/services/ServicesCarousel';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Servicios — MT3 Arquitectos' },
    {
      name: 'description',
      content:
        'Arquitectura, interiores, consultoría y dirección técnica. Servicios completos del concepto a la construcción en León, Guanajuato.',
    },
    { property: 'og:image', content: '/og/servicios.jpg' },
    { name: 'twitter:image', content: '/og/servicios.jpg' },
  ];
}

export default function Servicios() {
  return (
    <div>
      <ServicesHero />
      <Gallery />
      <Process />
      <ServicesCarousel />
    </div>
  );
}
