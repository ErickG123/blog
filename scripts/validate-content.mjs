import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import {
  articleSchema,
  authorSchema,
  collectingSchema,
  creatorSchema,
  editionSchema,
  genreSchema,
  publisherSchema,
  recommendationSchema,
  relationshipSchema,
  reviewSchema,
  studioSchema,
  tagSchema,
  workSchema,
} from '../src/features/content/content.schema.ts';
import { validateContentIntegrity } from '../src/features/content/content.validator.ts';

const CONTENT_ROOT = resolve(import.meta.dirname, '..', 'src', 'content');

function parseSimpleFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return parseYaml(match[1]);
}

async function readCollectionFiles(dirName, extType, schema, errors) {
  const fullDir = join(CONTENT_ROOT, dirName);
  let files;
  try {
    files = await readdir(fullDir);
  } catch {
    return [];
  }

  const results = [];
  for (const file of files) {
    if (extType === 'json' && !file.endsWith('.json')) continue;
    if (extType === 'md' && !file.endsWith('.md') && !file.endsWith('.mdx')) continue;

    const filePath = join(fullDir, file);
    const raw = await readFile(filePath, 'utf-8');
    let parsed;
    try {
      parsed = extType === 'json' ? JSON.parse(raw) : parseSimpleFrontmatter(raw);
      if (!parsed) {
        errors.push(`[${filePath}] Frontmatter ausente ou inválido.`);
        continue;
      }
    } catch (err) {
      errors.push(`[${filePath}] Erro de sintaxe: ${err.message}`);
      continue;
    }

    const res = schema.safeParse(parsed);
    if (!res.success) {
      for (const issue of res.error.issues) {
        errors.push(`[${filePath}] Campo "${issue.path.join('.') || 'raiz'}": ${issue.message}`);
      }
      continue;
    }
    results.push(res.data);
  }
  return results;
}

async function main() {
  const errors = [];

  const bundle = {
    works: await readCollectionFiles('works', 'json', workSchema, errors),
    editions: await readCollectionFiles('editions', 'json', editionSchema, errors),
    creators: await readCollectionFiles('creators', 'json', creatorSchema, errors),
    publishers: await readCollectionFiles('publishers', 'json', publisherSchema, errors),
    studios: await readCollectionFiles('studios', 'json', studioSchema, errors),
    genres: await readCollectionFiles('genres', 'json', genreSchema, errors),
    tags: await readCollectionFiles('tags', 'json', tagSchema, errors),
    authors: await readCollectionFiles('authors', 'json', authorSchema, errors),
    relationships: await readCollectionFiles('relationships', 'json', relationshipSchema, errors),
    reviews: await readCollectionFiles('reviews', 'md', reviewSchema, errors),
    articles: await readCollectionFiles('articles', 'md', articleSchema, errors),
    recommendations: await readCollectionFiles(
      'recommendations',
      'md',
      recommendationSchema,
      errors,
    ),
    collecting: await readCollectionFiles('collecting', 'md', collectingSchema, errors),
  };

  for (const issue of validateContentIntegrity(bundle)) {
    errors.push(
      `[integridade:${issue.collection}${issue.id ? '/' + issue.id : ''}] Campo "${issue.field}": ${issue.message}`,
    );
  }

  if (errors.length > 0) {
    console.error('Falha na validação de conteúdo do Mangá Atlas:\n');
    for (const err of errors) console.error(` - ${err}`);
    process.exit(1);
  }

  console.log(
    `Validação de conteúdo concluída com sucesso (obras=${bundle.works.length}, reviews=${bundle.reviews.length}, artigos=${bundle.articles.length}, guias=${bundle.recommendations.length}, colecionismo=${bundle.collecting.length}).`,
  );
}

main();
