import { defineQuery } from 'groq';

// Campos compartidos entre listado y detalle.
const PROJECT_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  title,
  category,
  location,
  architect,
  date,
  startDate,
  endDate,
  duration,
  landArea,
  builtArea,
  levels,
  concept,
  description,
  challenges,
  materials,
  role,
  image,
  gallery[]{
    _key,
    _type,
    asset,
    hotspot,
    crop,
    videoUrl,
    poster
  }
`;

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "proyecto"] | order(order asc){${PROJECT_FIELDS}}`
);

export const PROJECT_QUERY = defineQuery(
  `*[_type == "proyecto" && slug.current == $slug][0]{${PROJECT_FIELDS}}`
);

export const PROJECT_SLUGS_QUERY = defineQuery(
  `*[_type == "proyecto" && defined(slug.current)] | order(order asc){
    "slug": slug.current,
    _updatedAt
  }`
);
