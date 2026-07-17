import type { Route } from './+types/proyectos';
import { getAllProjects } from '../sanity/projects';
import ProjectsHero from '../components/projects/ProjectsHero';
import ProjectFilter from '../components/projects/ProjectFilter';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Proyectos — MT3 Arquitectos' },
    {
      name: 'description',
      content:
        'Portafolio de proyectos residenciales, comerciales e industriales de MT3 Arquitectos en León, Guanajuato.',
    },
    { property: 'og:image', content: '/og/proyectos.jpg' },
    { name: 'twitter:image', content: '/og/proyectos.jpg' },
  ];
}

export async function loader() {
  const projects = await getAllProjects();
  return { projects };
}

export default function Proyectos({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;

  return (
    <div>
      <ProjectsHero />
      <ProjectFilter projects={projects} />
    </div>
  );
}
