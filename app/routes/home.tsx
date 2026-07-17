import type { Route } from './+types/home';
import { getAllProjects } from '../sanity/projects';
import Hero from '../components/home/Hero';
import FounderQuote from '../components/home/FounderQuote';
import Services from '../components/home/Services';
import Stats from '../components/home/Stats';
import Logos from '../components/home/Logos';
import Carousel from '../components/home/Carousel';
import HomeCTA from '../components/home/HomeCTA';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'MT3 ARQUITECTOS' },
    {
      name: 'description',
      content:
        'Arquitectura contemporánea en León, Guanajuato. Diseñamos residencias, interiores y proyectos comerciales con enfoque funcional y duradero.',
    },
    { property: 'og:image', content: '/og/home.jpg' },
    { name: 'twitter:image', content: '/og/home.jpg' },
  ];
}

export async function loader() {
  const projects = await getAllProjects();
  return { projects };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;

  return (
    <div>
      <Hero />
      <FounderQuote />
      <Services />
      <Stats />
      <Logos />
      <Carousel projects={projects} />
      <HomeCTA />
    </div>
  );
}
