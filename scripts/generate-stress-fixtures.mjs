import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const CONTENT = join(ROOT, 'src', 'content');
const pad = (n) => String(n).padStart(2, '0');

async function main() {
  for (const d of [
    'creators',
    'publishers',
    'studios',
    'works',
    'editions',
    'reviews',
    'articles',
    'recommendations',
    'collecting',
  ]) {
    await mkdir(join(CONTENT, d), { recursive: true });
  }

  // 30 criadores, 12 editoras, 12 estúdios, 73 obras, 30 edições, 37 reviews, 37 artigos, 25 guias, 25 colecionismo
  for (let i = 1; i <= 30; i++) {
    await writeFile(
      join(CONTENT, 'creators', `fixture-stress-creator-${pad(i)}.json`),
      JSON.stringify({
        id: `fixture-stress-creator-${pad(i)}`,
        slug: `criador-stress-${pad(i)}`,
        name: `Criador Stress ${pad(i)}`,
        isFixture: true,
      }) + '\n',
    );
  }
  for (let i = 1; i <= 12; i++) {
    await writeFile(
      join(CONTENT, 'publishers', `fixture-stress-pub-${pad(i)}.json`),
      JSON.stringify({
        id: `fixture-stress-pub-${pad(i)}`,
        slug: `editora-stress-${pad(i)}`,
        name: `Editora Stress ${pad(i)}`,
        isFixture: true,
      }) + '\n',
    );
    await writeFile(
      join(CONTENT, 'studios', `fixture-stress-studio-${pad(i)}.json`),
      JSON.stringify({
        id: `fixture-stress-studio-${pad(i)}`,
        slug: `estudio-stress-${pad(i)}`,
        name: `Estúdio Stress ${pad(i)}`,
        isFixture: true,
      }) + '\n',
    );
  }

  const kinds = ['manga', 'anime', 'manhwa'];
  for (let i = 1; i <= 73; i++) {
    const kind = kinds[i % 3];
    await writeFile(
      join(CONTENT, 'works', `fixture-stress-work-${pad(i)}.json`),
      JSON.stringify({
        id: `fixture-stress-work-${pad(i)}`,
        slug: `obra-stress-${pad(i)}`,
        title: `Obra de Paginação ${pad(i)}`,
        kind,
        format: 'series',
        releaseYear: 2000 + (i % 25),
        publicationStatus: 'completed',
        synopsis: `Sinopse sintética de stress nº ${pad(i)}.`,
        credits: [
          { creatorId: `fixture-stress-creator-${pad(((i - 1) % 30) + 1)}`, role: 'author' },
        ],
        genreIds: ['genre-drama'],
        isFixture: true,
      }) + '\n',
    );
  }

  for (let i = 1; i <= 30; i++) {
    await writeFile(
      join(CONTENT, 'editions', `fixture-stress-ed-${pad(i)}.json`),
      JSON.stringify({
        id: `fixture-stress-ed-${pad(i)}`,
        slug: `edicao-stress-${pad(i)}`,
        workId: `fixture-stress-work-${pad(i)}`,
        publisherId: `fixture-stress-pub-${pad(((i - 1) % 12) + 1)}`,
        title: `Edição Física Stress ${pad(i)}`,
        language: 'pt-BR',
        isFixture: true,
      }) + '\n',
    );
  }

  for (let i = 1; i <= 37; i++) {
    await writeFile(
      join(CONTENT, 'reviews', `fixture-stress-review-${pad(i)}.mdx`),
      `---\nid: fixture-stress-review-${pad(i)}\nslug: review-stress-${pad(i)}\ntitle: "Review de Paginação ${pad(i)}"\nsummary: "Resumo sintético de stress para validar paginação em múltiplas páginas."\nauthorId: author-atlas\nstatus: published\npublishedAt: "2026-08-${pad(((i - 1) % 28) + 1)}"\nspoilerLevel: none\ntagIds: [tag-cotidiano]\nworkId: fixture-stress-work-${pad(i)}\nscope: work\nrating: ${((i % 5) + 1).toFixed(1)}\nisFixture: true\n---\n\nConteúdo sintético de stress.\n`,
    );
    await writeFile(
      join(CONTENT, 'articles', `fixture-stress-article-${pad(i)}.mdx`),
      `---\nid: fixture-stress-article-${pad(i)}\nslug: artigo-stress-${pad(i)}\ntitle: "Artigo de Paginação ${pad(i)}"\nsummary: "Resumo sintético de artigo para validação de paginação."\nauthorId: author-atlas\nstatus: published\npublishedAt: "2026-07-${pad(((i - 1) % 28) + 1)}"\nspoilerLevel: none\ntagIds: [tag-ritmo]\ncategory: analise\nisFixture: true\n---\n\nConteúdo sintético de stress.\n`,
    );
  }

  for (let i = 1; i <= 25; i++) {
    await writeFile(
      join(CONTENT, 'recommendations', `fixture-stress-guide-${pad(i)}.mdx`),
      `---\nid: fixture-stress-guide-${pad(i)}\nslug: guia-stress-${pad(i)}\ntitle: "Guia de Paginação ${pad(i)}"\nsummary: "Guia sintético para validação de paginação."\nauthorId: author-atlas\nstatus: published\npublishedAt: "2026-06-${pad(((i - 1) % 28) + 1)}"\nspoilerLevel: none\ntagIds: [tag-guia-de-entrada]\nitems:\n  - workId: fixture-stress-work-${pad(i)}\n    order: 1\n    pitch: "Indicação sintética."\nisFixture: true\n---\n\nConteúdo sintético de stress.\n`,
    );
    await writeFile(
      join(CONTENT, 'collecting', `fixture-stress-col-${pad(i)}.mdx`),
      `---\nid: fixture-stress-col-${pad(i)}\nslug: colecionismo-stress-${pad(i)}\ntitle: "Colecionismo de Paginação ${pad(i)}"\nsummary: "Post sintético de colecionismo para validação de paginação."\nauthorId: author-atlas\nstatus: published\npublishedAt: "2026-05-${pad(((i - 1) % 28) + 1)}"\nspoilerLevel: none\ntagIds: [tag-edicao-fisica]\nworkIds: [fixture-stress-work-${pad(i)}]\neditionIds: [fixture-stress-ed-${pad(i)}]\nisFixture: true\n---\n\nConteúdo sintético de stress.\n`,
    );
  }

  console.log(
    'Massa de stress da Fase 40 gerada com sucesso (73 obras, 37 reviews, 37 artigos, 25 guias, 25 colecionismo).',
  );
}

main();
