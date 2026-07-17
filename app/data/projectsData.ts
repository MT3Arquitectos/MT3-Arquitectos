// Tipos y categorías de proyectos. La DATA ahora viene de Sanity (ver app/sanity/).
// Este archivo conserva solo los tipos del frontend y las categorías del filtro.

export interface ProjectCategory {
  key: string;
  label: string;
}

export interface GalleryImage {
  type: 'image';
  src: string;
}

export interface GalleryVideo {
  type: 'video';
  src: string;
  thumbnail: string;
}

export type GalleryItem = GalleryImage | GalleryVideo;

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  architect: string;
  date: string;
  startDate: string;
  endDate: string;
  duration: string;
  landArea: string;
  builtArea: string;
  levels: number | string;
  concept: string;
  description: string;
  challenges: string;
  materials: string;
  role?: string;
  image: string;
  gallery: GalleryItem[];
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { key: 'TODOS', label: 'TODOS' },
  { key: 'HABITACIONAL', label: 'HABITACIONAL' },
  { key: 'COMERCIAL', label: 'COMERCIAL' },
  { key: 'INDUSTRIAL', label: 'INDUSTRIAL' },
];
