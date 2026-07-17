import { client } from './client';
import { urlFor, type ImageSource } from './image';
import { PROJECTS_QUERY, PROJECT_QUERY, PROJECT_SLUGS_QUERY } from './queries';
import type { Project, GalleryItem } from '../data/projectsData';

// Forma cruda del documento tal como llega de GROQ (antes de mapear a Project).
interface RawImage {
  asset?: { _ref: string };
  hotspot?: unknown;
  crop?: unknown;
}

interface RawGalleryMember extends RawImage {
  _key: string;
  _type: string;
  videoUrl?: string;
  poster?: RawImage;
}

interface RawProject {
  _id: string;
  slug: string | null;
  title: string;
  category: string;
  location?: string;
  architect?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  landArea?: string;
  builtArea?: string;
  levels?: number;
  concept?: string;
  description?: string;
  challenges?: string;
  materials?: string;
  role?: string;
  image?: RawImage;
  gallery?: RawGalleryMember[];
}

function mapGalleryItem(member: RawGalleryMember): GalleryItem {
  if (member._type === 'galleryVideo') {
    return {
      type: 'video',
      src: member.videoUrl ?? '',
      thumbnail: member.poster ? urlFor(member.poster as ImageSource).url() : '',
    };
  }
  return {
    type: 'image',
    src: urlFor(member as ImageSource).width(1600).url(),
  };
}

function mapProject(doc: RawProject): Project {
  return {
    id: doc._id,
    slug: doc.slug ?? '',
    title: doc.title,
    category: doc.category,
    location: doc.location ?? '',
    architect: doc.architect ?? '',
    date: doc.date ?? '',
    startDate: doc.startDate ?? '',
    endDate: doc.endDate ?? '',
    duration: doc.duration ?? '',
    landArea: doc.landArea ?? '',
    builtArea: doc.builtArea ?? '',
    levels: doc.levels ?? '',
    concept: doc.concept ?? '',
    description: doc.description ?? '',
    challenges: doc.challenges ?? '',
    materials: doc.materials ?? '',
    role: doc.role,
    image: doc.image ? urlFor(doc.image as ImageSource).width(1600).url() : '',
    gallery: (doc.gallery ?? []).map(mapGalleryItem),
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const docs = await client.fetch<RawProject[]>(PROJECTS_QUERY);
  return docs.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const doc = await client.fetch<RawProject | null>(PROJECT_QUERY, { slug });
  return doc ? mapProject(doc) : null;
}

export interface ProjectSitemapEntry {
  slug: string;
  updatedAt: string;
}

export async function getProjectSlugs(): Promise<ProjectSitemapEntry[]> {
  const rows = await client.fetch<{ slug: string; _updatedAt: string }[]>(
    PROJECT_SLUGS_QUERY
  );
  return rows.map((r) => ({ slug: r.slug, updatedAt: r._updatedAt }));
}
