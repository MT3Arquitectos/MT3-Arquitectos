// Migración de los 6 proyectos originales a Sanity.
// Sube las imágenes (portada + galería + posters de video) desde /public y crea
// los documentos `proyecto`. Los videos quedan referenciados por ruta (/public).
//
// Uso:
//   1. Creá un token de escritura (Editor) en https://manage.sanity.io  (proyecto jc7dx1zu)
//   2. Pegalo en mt3arquitectos/.env.local  ->  SANITY_WRITE_TOKEN=sk...
//   3. cd mt3arquitectos && node scripts/migrate-projects.mjs

import { createClient } from '@sanity/client';
import { createReadStream, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { projectsData } from './source-data.mjs';

// --- Token desde .env.local (no se imprime) ---
function readToken() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN.trim();
  const envPath = path.resolve('.env.local');
  if (!existsSync(envPath)) return null;
  const line = readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .find((l) => l.startsWith('SANITY_WRITE_TOKEN='));
  return line ? line.slice('SANITY_WRITE_TOKEN='.length).trim() : null;
}

const token = readToken();
if (!token) {
  console.error(
    '❌ Falta el token. Creá uno (Editor) en manage.sanity.io y ponelo en .env.local como SANITY_WRITE_TOKEN=...'
  );
  process.exit(1);
}

const client = createClient({
  projectId: 'jc7dx1zu',
  dataset: 'production',
  apiVersion: '2026-05-15',
  token,
  useCdn: false,
});

const PUBLIC_DIR = path.resolve('public');

async function uploadImage(relPath) {
  const filePath = path.join(PUBLIC_DIR, relPath);
  if (!existsSync(filePath)) {
    throw new Error(`No existe la imagen: ${filePath}`);
  }
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: path.basename(relPath),
  });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function run() {
  console.log('🧹 Borrando proyectos existentes (si los hay)…');
  await client.delete({ query: '*[_type == "proyecto"]' });

  for (let i = 0; i < projectsData.length; i++) {
    const p = projectsData[i];
    console.log(`⬆️  (${i + 1}/${projectsData.length}) ${p.title} — subiendo imágenes…`);

    const image = await uploadImage(p.image);

    const gallery = [];
    for (let g = 0; g < (p.gallery?.length ?? 0); g++) {
      const item = p.gallery[g];
      const key = `${p.slug}-g${g}`;
      if (item.type === 'video') {
        const poster = item.thumbnail ? await uploadImage(item.thumbnail) : undefined;
        gallery.push({ _type: 'galleryVideo', _key: key, videoUrl: item.src, poster });
      } else {
        const img = await uploadImage(item.src);
        gallery.push({ ...img, _type: 'galleryImage', _key: key });
      }
    }

    const doc = {
      _type: 'proyecto',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      order: i,
      category: p.category,
      location: p.location,
      architect: p.architect || undefined,
      date: p.date || undefined,
      startDate: p.startDate || undefined,
      endDate: p.endDate || undefined,
      duration: p.duration || undefined,
      landArea: p.landArea || undefined,
      builtArea: p.builtArea || undefined,
      levels: typeof p.levels === 'number' ? p.levels : undefined,
      concept: p.concept || undefined,
      description: p.description,
      challenges: p.challenges || undefined,
      materials: p.materials || undefined,
      role: p.role || undefined,
      image,
      gallery,
    };

    const created = await client.create(doc);
    console.log(`   ✅ creado ${created._id}`);
  }

  console.log('🎉 Migración completa.');
}

run().catch((err) => {
  console.error('❌ Error en la migración:', err.message);
  process.exit(1);
});
