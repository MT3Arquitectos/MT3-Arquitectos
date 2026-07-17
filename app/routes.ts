import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('nosotros', 'routes/nosotros.tsx'),
  route('servicios', 'routes/servicios.tsx'),
  route('proyectos', 'routes/proyectos.tsx'),
  route('proyectos/:slug', 'routes/proyecto-detalle.tsx'),
  route('contacto', 'routes/contacto.tsx'),
] satisfies RouteConfig;
