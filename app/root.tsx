import { useState, useEffect } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { AnimatePresence } from 'framer-motion';

import type { Route } from './+types/root';
import './app.css';

import { NavBarDemo } from './layout/Navbar';
import Footer from './layout/Footer';
import FloatingWAButton from './layout/FloatingWAButton';
import SplashScreen from './components/ui/SplashScreen';
import useScrollToTop from './hooks/useScrollToTop';
import useSmoothScroll from './hooks/useSmoothScroll';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  { rel: 'apple-touch-icon', href: '/favicon.png' },
  { rel: 'canonical', href: 'https://mt3arquitectos.com.mx/' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  },
  { rel: 'preload', as: 'image', href: '/MT3_LOGO_WHITE.png' },
  { rel: 'preload', as: 'image', href: '/voala/voala-2.webp' },
];

export const meta: Route.MetaFunction = () => [
  { title: 'MT3 ARQUITECTOS' },
  {
    name: 'description',
    content:
      'Arquitectura contemporánea en León, Guanajuato. Diseñamos residencias, interiores y proyectos comerciales con enfoque funcional y duradero.',
  },
  {
    name: 'keywords',
    content:
      'Arquitectos León, Arquitectos Guanajuato, Arquitectura contemporánea México, Diseño arquitectónico León, Arquitectura residencial México, Diseño de interiores León, Consultoría arquitectónica México, Proyectos arquitectónicos Guanajuato, Estudios de arquitectura León, Arquitectura interior contemporánea, Dirección técnica de proyectos, Casas de lujo León',
  },
  { name: 'author', content: 'MT3 Arquitectos' },
  { name: 'robots', content: 'index, follow' },
  { name: 'theme-color', content: '#000000' },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: 'MT3 ARQUITECTOS' },
  {
    property: 'og:title',
    content: 'MT3 ARQUITECTOS – Arquitectura contemporánea en León, Guanajuato',
  },
  {
    property: 'og:description',
    content:
      'Arquitectura contemporánea en León, Guanajuato. Diseñamos residencias, interiores y proyectos comerciales con enfoque funcional y duradero.',
  },
  { property: 'og:image', content: '/voala/voala-2.webp' },
  { property: 'og:url', content: 'https://mt3arquitectos.com.mx/' },
  { property: 'og:locale', content: 'es_MX' },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:title',
    content: 'MT3 ARQUITECTOS – Arquitectura contemporánea en León, Guanajuato',
  },
  {
    name: 'twitter:description',
    content:
      'Arquitectura contemporánea en León, Guanajuato. Diseñamos residencias, interiores y proyectos comerciales con enfoque funcional y duradero.',
  },
  { name: 'twitter:image', content: '/voala/voala-2.webp' },
  {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'MT3 ARQUITECTOS',
      url: 'https://mt3arquitectos.com.mx/',
      logo: 'https://mt3arquitectos.com.mx/MT3_LOGO_BLACK.png',
      image: [
        'https://mt3arquitectos.com.mx/voala/voala-2.webp',
        'https://mt3arquitectos.com.mx/esmeralda/esmeralda-3.webp',
      ],
      description:
        'Arquitectura contemporánea en León, Guanajuato. Diseñamos residencias, interiores y proyectos comerciales con enfoque funcional y duradero.',
      sameAs: [
        'https://www.facebook.com/MT3arquitectos',
        'https://www.instagram.com/mt3arquitectos/',
        'https://mx.pinterest.com/mt3arquitectos/',
      ],
      areaServed: [
        { '@type': 'City', name: 'León' },
        { '@type': 'State', name: 'Guanajuato' },
        { '@type': 'Country', name: 'México' },
      ],
      priceRange: '$$$',
    },
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // El splash depende de sessionStorage (solo cliente). Se inicializa en false
  // para que SSR e hidratación coincidan, y se decide tras montar.
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!sessionStorage.getItem('splashShownInSession')) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem('splashShownInSession', 'true');
    setShowSplash(false);
  };

  // Scroll al top al cambiar de ruta
  useScrollToTop();
  // Lenis se activa solo en el cliente y una vez terminado el splash
  useSmoothScroll(mounted && !showSplash);

  return (
    <>
      <FloatingWAButton />
      <NavBarDemo />
      <Outlet />
      <Footer />

      {/* Splash: overlay solo-cliente sobre el contenido ya renderizado */}
      {mounted && (
        <AnimatePresence mode="wait">
          {showSplash && <SplashScreen key="splash" onFinish={handleSplashFinish} />}
        </AnimatePresence>
      )}
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'Ocurrió un error inesperado.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'La página solicitada no se encontró.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
