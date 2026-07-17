import { getProjectSlugs } from '../sanity/projects';

const BASE = 'https://mt3arquitectos.com.mx';

// Rutas estáticas del sitio (sin /proyectos/:slug, que se agregan desde Sanity).
const STATIC_PATHS = ['/', '/nosotros', '/servicios', '/proyectos', '/contacto'];

// Resource route: solo loader, sin componente. Devuelve XML.
export async function loader() {
  const projects = await getProjectSlugs();

  const entries = [
    ...STATIC_PATHS.map((p) => ({ loc: `${BASE}${p}`, lastmod: undefined as string | undefined })),
    ...projects.map((p) => ({
      loc: `${BASE}/proyectos/${p.slug}`,
      lastmod: p.updatedAt,
    })),
  ];

  const urls = entries
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>${
          u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''
        }\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
