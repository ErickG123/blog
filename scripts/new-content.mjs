import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const rawArgs = process.argv.slice(2);
const flags = new Set(rawArgs.filter((a) => a.startsWith('--')));
const outDirFlag = rawArgs.find((a) => a.startsWith('--out-dir='));
const positional = rawArgs.filter((a) => !a.startsWith('--'));

const [type, rawSlug, rawTitle] = positional;
const allowed = new Set(['review', 'article', 'guide', 'collecting']);

if (!type || !allowed.has(type) || !rawSlug || !rawTitle) {
  console.error(
    'Uso: npm run content:new -- <review|article|guide|collecting> <slug> "<titulo>" [--dry-run] [--out-dir=<dir>]',
  );
  process.exit(1);
}

if (rawSlug.includes('..') || rawSlug.includes('/') || rawSlug.includes('\\')) {
  console.error('Erro: slug inválido (path traversal não permitido).');
  process.exit(1);
}

const slug = rawSlug
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!slug) {
  console.error('Erro: slug resultante está vazio.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const dirMap = {
  review: 'reviews',
  article: 'articles',
  guide: 'recommendations',
  collecting: 'collecting',
};

const baseContentDir = outDirFlag
  ? resolve(outDirFlag.slice('--out-dir='.length))
  : resolve(import.meta.dirname, '..', 'src', 'content');

const targetDir = join(baseContentDir, dirMap[type]);
const filePath = join(targetDir, `${slug}.mdx`);

const extraFields =
  type === 'review'
    ? 'workId: "id-da-obra"\nscope: work\nrating: 4\nverdict: "Veredito curto aqui."'
    : type === 'article'
      ? 'category: analise\nrelatedWorkIds: []'
      : type === 'guide'
        ? 'items:\n  - workId: "id-da-obra"\n    order: 1\n    pitch: "Motivo da recomendação."'
        : 'workIds: []\neditionIds: []';

const template = `---
id: ${type}-${slug}
slug: ${slug}
title: "${rawTitle.replace(/"/g, '\\"')}"
summary: "Resumo editorial conciso."
authorId: author-atlas
status: draft
publishedAt: "${today}"
spoilerLevel: none
tagIds: []
${extraFields}
---

Escreva o conteúdo editorial aqui.
`;

if (flags.has('--dry-run')) {
  console.log(`[dry-run] Arquivo alvo: ${filePath}\n\n${template}`);
  process.exit(0);
}

await mkdir(targetDir, { recursive: true });
await writeFile(filePath, template, { flag: 'wx' });
console.log(`Rascunho criado em: ${filePath}`);
