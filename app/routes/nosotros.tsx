import type { Route } from './+types/nosotros';
import AboutHero from '../components/about/AboutHero';
import MissionVission from '../components/about/MissionVission';
import Certifications from '../components/about/Certifications';
import Team from '../components/about/Team';
import AboutCTA from '../components/about/AboutCTA';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Nosotros — MT3 Arquitectos' },
    {
      name: 'description',
      content:
        'Despacho de arquitectura con más de 30 años de experiencia en León, Guanajuato. Conoce a nuestro equipo y nuestra visión.',
    },
  ];
}

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <MissionVission />
      <Certifications />
      <Team />
      <AboutCTA />
    </div>
  );
}
