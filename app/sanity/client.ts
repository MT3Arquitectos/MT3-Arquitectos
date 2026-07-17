import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from './env';

// Cliente publishable (sin token). Sirve para el image URL builder y para
// leer contenido publicado (dataset público) desde loaders SSR.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
