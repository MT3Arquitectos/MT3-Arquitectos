import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

// Tipo de la fuente aceptada por el builder (independiente de la versión).
export type ImageSource = Parameters<typeof builder.image>[0];

export const urlFor = (source: ImageSource) => builder.image(source);
