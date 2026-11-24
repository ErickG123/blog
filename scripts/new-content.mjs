import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const [, , type, rawSlug, rawTitle] = process.argv;
const allowed = new Set(['review', 'article', 'guide', 'collecting']);

if (!type || !allowed.has(type) || !rawSlug || !rawTitle) {
  console.error('Uso: npm run content:new -- <review|article|guide|collecting> <slug> "<titulo>"');
  process.exit(1);
}

const slug = rawSlug
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const today = new Date().toISOString().slice(0, 10);
const dirMap = {
  review: 'reviews',
  article: 'articles',
  guide: 'recommendations',
  collecting: 'collecting',
};

const targetDir = resolve(import.meta.dirname, '..', 'src', 'content', dirMap[type]);
await mkdir(targetDir, { recursive: true });
const filePath = join(targetDir, `${slug}.mdx`);

const extraFields =
  type === 'review'
    ? 'workId: "id-da-obra"\nscope: work\nrating: 4\nverdict: "Veredito curto aqui."'
    : type === 'article'
      ? 'category: analise\nrelatedWorkIds: []'
      : type === 'guide'
        ? 'items:\n  - {"workId": "id-da-obra", "order": 1, "pitch": "Motivo da recomendação."}'
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

await writeFile(filePath, template, { flag: 'wx' });
console.log(`Rascunho criado em: ${filePath}`);
