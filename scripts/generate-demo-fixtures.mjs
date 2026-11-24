import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const CONTENT = join(ROOT, 'src', 'content');
const ASSETS = join(ROOT, 'public', 'demo-assets');

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function makeSvgCover(title, subtitle, bg, accent, width = 420, height = 600) {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').slice(0, 34);
  const safeSub = subtitle.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${safeTitle}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="${accent}" stroke-width="3"/>
  <rect x="44" y="56" width="84" height="8" fill="${accent}"/>
  <text x="44" y="130" fill="#F3F3F6" font-family="system-ui, sans-serif" font-size="24" font-weight="700">${safeTitle}</text>
  <text x="44" y="168" fill="#B6B6C4" font-family="system-ui, sans-serif" font-size="14">${safeSub}</text>
  <text x="44" y="${height - 48}" fill="${accent}" font-family="system-ui, sans-serif" font-size="12" font-weight="600">MANGÁ ATLAS · ILUSTRAÇÃO SINTÉTICA</text>
</svg>`;
}

async function main() {
  const dirs = [
    'genres',
    'tags',
    'creators',
    'publishers',
    'studios',
    'works',
    'editions',
    'relationships',
    'reviews',
    'articles',
    'recommendations',
    'collecting',
  ];
  for (const d of dirs) await ensureDir(join(CONTENT, d));
  await ensureDir(ASSETS);

  // Ilustrações SVG originais neutras (portrait e landscape) para fixtures sintéticas
  const palettes = [
    ['#18181d', '#e53946'],
    ['#1e1b29', '#8b5cf6'],
    ['#1b2226', '#d94854'],
    ['#201c1c', '#c82333'],
  ];

  for (let i = 1; i <= 8; i++) {
    const [bg, accent] = palettes[(i - 1) % palettes.length];
    await writeFile(
      join(ASSETS, `cover-${pad(i)}.svg`),
      makeSvgCover(`Obra Sintética ${pad(i)}`, 'Capa demonstrativa original', bg, accent, 420, 600),
    );
  }
  for (let i = 1; i <= 4; i++) {
    const [bg, accent] = palettes[(i - 1) % palettes.length];
    await writeFile(
      join(ASSETS, `photo-wide-${pad(i)}.svg`),
      makeSvgCover(`Edição Física ${pad(i)}`, 'Fotografia sintética 16:10', bg, accent, 800, 500),
    );
  }

  // 12 Gêneros
  const genres = [
    ['drama', 'Drama'],
    ['ficcao-cientifica', 'Ficção Científica'],
    ['fantasia', 'Fantasia'],
    ['misterio', 'Mistério'],
    ['slice-of-life', 'Slice of Life'],
    ['historico', 'Histórico'],
    ['aventura', 'Aventura'],
    ['suspense', 'Suspense'],
    ['esporte', 'Esporte'],
    ['comedia', 'Comédia'],
    ['terror', 'Terror'],
    ['psicologico', 'Psicológico'],
  ];
  for (const [slug, name] of genres) {
    await writeFile(
      join(CONTENT, 'genres', `${slug}.json`),
      JSON.stringify(
        { id: `genre-${slug}`, slug, name, description: `Narrativas classificadas em ${name}.` },
        null,
        2,
      ) + '\n',
    );
  }

  // 30 Tags
  const tagNames = [
    'edicao-fisica',
    'narrativa-visual',
    'ritmo',
    'seinen',
    'shonen',
    'josei',
    'shojo',
    'volume-unico',
    'encerrado',
    'em-andamento',
    'direcao-de-arte',
    'trilha-sonora',
    'adaptacao',
    'traducao',
    'papel-offwhite',
    'capa-dura',
    'sobrecapa',
    'box-colecionador',
    'estante',
    'guia-de-entrada',
    'leitura-curta',
    'obra-longa',
    'ficcao-especulativa',
    'cotidiano',
    'suspense-urbano',
    'memoria',
    'arquitetura',
    'cidades',
    'viagem',
    'classicos-modernos',
  ];
  for (const slug of tagNames) {
    const name = slug
      .split('-')
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(' ');
    await writeFile(
      join(CONTENT, 'tags', `${slug}.json`),
      JSON.stringify(
        { id: `tag-${slug}`, slug, name, description: `Publicações relacionadas a ${name}.` },
        null,
        2,
      ) + '\n',
    );
  }

  // 25 Criadores sintéticos
  for (let i = 1; i <= 25; i++) {
    const id = `fixture-creator-${pad(i)}`;
    await writeFile(
      join(CONTENT, 'creators', `${id}.json`),
      JSON.stringify(
        {
          id,
          slug: `criador-sintetico-${pad(i)}`,
          name: `Criador Sintético ${pad(i)}`,
          originalName: `創作 太郎 ${pad(i)}`,
          bio: `Registro sintético nº ${pad(i)} exclusivo para demonstração e testes automatizados.`,
          isFixture: true,
        },
        null,
        2,
      ) + '\n',
    );
  }

  // 10 Editoras sintéticas
  for (let i = 1; i <= 10; i++) {
    const id = `fixture-publisher-${pad(i)}`;
    await writeFile(
      join(CONTENT, 'publishers', `${id}.json`),
      JSON.stringify(
        {
          id,
          slug: `editora-sintetica-${pad(i)}`,
          name: `Editora Sintética ${pad(i)}`,
          country: i % 2 === 0 ? 'JP' : 'BR',
          description: `Editora fictícia nº ${pad(i)} usada para validação de catálogo.`,
          isFixture: true,
        },
        null,
        2,
      ) + '\n',
    );
  }

  // 10 Estúdios sintéticos
  for (let i = 1; i <= 10; i++) {
    const id = `fixture-studio-${pad(i)}`;
    await writeFile(
      join(CONTENT, 'studios', `${id}.json`),
      JSON.stringify(
        {
          id,
          slug: `estudio-sintetico-${pad(i)}`,
          name: `Estúdio Sintético ${pad(i)}`,
          country: 'JP',
          description: `Estúdio fictício nº ${pad(i)} usado para demonstração de animes.`,
          isFixture: true,
        },
        null,
        2,
      ) + '\n',
    );
  }

  // 40 Obras: 20 mangás, 15 animes, 5 manhwas (3 sem capa opcional, títulos extensos e japonês)
  const kinds = [
    ...Array(20).fill('manga'),
    ...Array(15).fill('anime'),
    ...Array(5).fill('manhwa'),
  ];
  const statuses = ['ongoing', 'completed', 'hiatus', 'completed'];

  for (let i = 1; i <= 40; i++) {
    const kind = kinds[i - 1];
    const id = `fixture-work-${pad(i)}`;
    const isLongTitle = i === 1 || i === 21 || i === 36;
    const omitCover = i === 3 || i === 23 || i === 38;
    const title = isLongTitle
      ? `Crônicas do Atlas ${pad(i)}: Uma Jornada Editorial Muito Longa Para Testar Quebra de Linha e Densidade`
      : `Crônicas do Atlas ${pad(i)} (${kind.toUpperCase()} Fixture)`;
    const work = {
      id,
      slug: `cronicas-do-atlas-${pad(i)}-fixture`,
      title,
      originalTitle: kind === 'manhwa' ? `아틀라스 연대기 ${pad(i)}` : `アトラス年代記 ${pad(i)}`,
      alternativeTitles: [`Atlas Chronicles ${pad(i)}`],
      kind,
      format: kind === 'anime' && i % 5 === 0 ? 'movie' : i % 7 === 0 ? 'oneshot' : 'series',
      country: kind === 'manhwa' ? 'KR' : 'JP',
      originalLanguage: kind === 'manhwa' ? 'ko' : 'ja',
      releaseYear: 2015 + (i % 11),
      publicationStatus: statuses[i % statuses.length],
      synopsis: `Sinopse sintética da obra nº ${pad(i)} (${kind}) criada exclusivamente para demonstração de interface, filtros e relacionamentos no Mangá Atlas.`,
      ...(omitCover
        ? {}
        : {
            cover: {
              src: `/demo-assets/cover-${pad(((i - 1) % 8) + 1)}.svg`,
              alt: `Capa ilustrativa sintética de ${title}`,
              width: 420,
              height: 600,
              credit: 'Ilustração SVG original Mangá Atlas (Fixture)',
              license: 'CC0-1.0',
            },
          }),
      credits: [
        {
          creatorId: `fixture-creator-${pad(((i - 1) % 25) + 1)}`,
          role: kind === 'anime' ? 'director' : 'author',
        },
      ],
      ...(kind === 'anime'
        ? { studioIds: [`fixture-studio-${pad(((i - 1) % 10) + 1)}`] }
        : { publisherIds: [`fixture-publisher-${pad(((i - 1) % 10) + 1)}`] }),
      genreIds: [`genre-${genres[(i - 1) % genres.length][0]}`],
      isFixture: true,
    };
    await writeFile(join(CONTENT, 'works', `${id}.json`), JSON.stringify(work, null, 2) + '\n');
  }

  // Relações entre obras (adaptation, sequel, related)
  const rels = [
    {
      fromWorkId: 'fixture-work-21',
      toWorkId: 'fixture-work-01',
      type: 'adaptation',
      note: 'Adaptação animada sintética.',
    },
    {
      fromWorkId: 'fixture-work-22',
      toWorkId: 'fixture-work-02',
      type: 'adaptation',
      note: 'Adaptação em série.',
    },
    {
      fromWorkId: 'fixture-work-02',
      toWorkId: 'fixture-work-01',
      type: 'sequel',
      note: 'Continuação direta sintética.',
    },
    {
      fromWorkId: 'fixture-work-04',
      toWorkId: 'fixture-work-01',
      type: 'spin_off',
      note: 'História paralela.',
    },
    {
      fromWorkId: 'fixture-work-36',
      toWorkId: 'fixture-work-01',
      type: 'related',
      note: 'Temática semelhante.',
    },
  ];
  for (let i = 0; i < rels.length; i++) {
    await writeFile(
      join(CONTENT, 'relationships', `fixture-rel-${pad(i + 1)}.json`),
      JSON.stringify(rels[i], null, 2) + '\n',
    );
  }

  // 20 Edições físicas
  for (let i = 1; i <= 20; i++) {
    const id = `fixture-edition-${pad(i)}`;
    await writeFile(
      join(CONTENT, 'editions', `${id}.json`),
      JSON.stringify(
        {
          id,
          slug: `edicao-fisica-${pad(i)}-fixture`,
          workId: `fixture-work-${pad(i)}`,
          publisherId: `fixture-publisher-${pad(((i - 1) % 10) + 1)}`,
          title: `Crônicas do Atlas ${pad(i)} — Edição ${i % 2 === 0 ? 'Definitiva' : 'Tankobon'} (Fixture)`,
          language: 'pt-BR',
          formatLabel: i % 2 === 0 ? '15x21cm Capa Dura' : '13,7x20cm Tankobon',
          paperType: i % 2 === 0 ? 'Pólen Bold 90g' : 'Offwhite 80g',
          binding: i % 2 === 0 ? 'Costurada com sobrecapa' : 'Brochura colada',
          releaseYear: 2022 + (i % 4),
          volumesCount: 1 + (i % 12),
          isFixture: true,
        },
        null,
        2,
      ) + '\n',
    );
  }

  // 20 Reviews (3 longas, 3 sem nota, spoilers variados)
  const spoilerLevels = ['none', 'light', 'heavy'];
  for (let i = 1; i <= 20; i++) {
    const id = `fixture-review-${pad(i)}`;
    const workIdx = i <= 12 ? i : 20 + (i - 12);
    const isAnime = workIdx > 20;
    const noRating = i === 3 || i === 9 || i === 15;
    const isLong = i <= 3;
    const ratingLine = noRating ? '' : `rating: ${((i % 6) * 0.5 + 2.5).toFixed(1)}\n`;
    const body = isLong
      ? `## Contextualização editorial\n\nTexto demonstrativo longo para validar ritmo de leitura, largura de medida (68ch) e navegação por sumário (TOC).\n\n## Direção visual e ritmo\n\nAnálise sintética sobre composição de páginas, contraste de nanquim e cadência narrativa.\n\n## Considerações finais\n\nConclusão editorial demonstrativa sem atribuição de opinião real ao autor.\n`
      : `Texto demonstrativo sintético da review ${pad(i)} para validação de listagem e página de detalhe.`;

    const mdx = `---
id: ${id}
slug: review-atlas-${pad(i)}-fixture
title: "Review Demonstrativa ${pad(i)} — Crônicas do Atlas (Fixture)"
summary: "Resumo sintético da review ${pad(i)} para testar densidade editorial, filtros e leitura."
authorId: author-atlas
status: published
publishedAt: "2026-10-${pad(((i - 1) % 28) + 1)}"
spoilerLevel: ${spoilerLevels[i % 3]}
tagIds:
  - tag-${tagNames[(i - 1) % tagNames.length]}
  - tag-${tagNames[i % tagNames.length]}
workId: fixture-work-${pad(workIdx)}
scope: ${isAnime ? 'season' : i % 2 === 0 ? 'volume' : 'work'}
scopeLabel: "${isAnime ? 'Temporada 1' : i % 2 === 0 ? `Volume ${i}` : 'Obra completa'}"
${ratingLine}verdict: "Veredito sintético demonstrativo nº ${pad(i)}."
isFixture: true
---

${body}
`;
    await writeFile(join(CONTENT, 'reviews', `${id}.mdx`), mdx);
  }

  // 15 Artigos (3 longos com múltiplos headings)
  const categories = ['analise', 'ensaio', 'industria', 'opiniao'];
  for (let i = 1; i <= 15; i++) {
    const id = `fixture-article-${pad(i)}`;
    const isLong = i <= 3;
    const body = isLong
      ? `## Introdução ao tema\n\nEnsaio demonstrativo longo nº ${pad(i)} para validar tipografia de prosa e sumário automático.\n\n## Estrutura de quadros e silêncio\n\nObservações sintéticas sobre espaço negativo e ritmo de leitura.\n\n## Impacto no mercado editorial\n\nReflexões demonstrativas sobre formatos e preservação física.\n\n## Síntese\n\nFechamento sintético do artigo demonstrativo.\n`
      : `Conteúdo sintético do artigo demonstrativo nº ${pad(i)}.`;

    const mdx = `---
id: ${id}
slug: artigo-atlas-${pad(i)}-fixture
title: "Artigo Demonstrativo ${pad(i)} — Estética e Narrativa (Fixture)"
summary: "Ensaio sintético nº ${pad(i)} sobre narrativa visual, ritmo e mercado de mangás."
authorId: author-atlas
status: published
publishedAt: "2026-09-${pad(((i - 1) % 28) + 1)}"
spoilerLevel: none
tagIds:
  - tag-${tagNames[(i + 2) % tagNames.length]}
category: ${categories[i % categories.length]}
relatedWorkIds:
  - fixture-work-${pad(i)}
isFixture: true
---

${body}
`;
    await writeFile(join(CONTENT, 'articles', `${id}.mdx`), mdx);
  }

  // 10 Guias
  for (let i = 1; i <= 10; i++) {
    const id = `fixture-guide-${pad(i)}`;
    const mdx = `---
id: ${id}
slug: guia-atlas-${pad(i)}-fixture
title: "Guia Demonstrativo ${pad(i)} — Por Onde Começar (Fixture)"
summary: "Lista curada sintética nº ${pad(i)} conectada às obras da biblioteca demonstrativa."
authorId: author-atlas
status: published
publishedAt: "2026-08-${pad(((i - 1) % 28) + 1)}"
spoilerLevel: none
tagIds:
  - tag-guia-de-entrada
items:
  - workId: fixture-work-${pad(i)}
    order: 1
    pitch: "Primeira indicação sintética deste guia."
  - workId: fixture-work-${pad(i + 10)}
    order: 2
    pitch: "Segunda indicação sintética para aprofundar o tema."
  - workId: fixture-work-${pad(i + 20)}
    order: 3
    pitch: "Adaptação ou complemento sintético em anime."
isFixture: true
---

Introdução sintética ao guia demonstrativo nº ${pad(i)}.
`;
    await writeFile(join(CONTENT, 'recommendations', `${id}.mdx`), mdx);
  }

  // 10 Posts de colecionismo (com edições comparáveis e fotos locais sintéticas)
  for (let i = 1; i <= 10; i++) {
    const id = `fixture-collecting-${pad(i)}`;
    const secondEd = i <= 10 ? `\n  - fixture-edition-${pad(i + 10)}` : '';
    const mdx = `---
id: ${id}
slug: colecionismo-atlas-${pad(i)}-fixture
title: "Colecionismo Demonstrativo ${pad(i)} — Acabamento e Papel (Fixture)"
summary: "Comparativo sintético de acabamento, papel e encadernação da edição nº ${pad(i)}."
authorId: author-atlas
status: published
publishedAt: "2026-07-${pad(((i - 1) % 28) + 1)}"
spoilerLevel: none
tagIds:
  - tag-edicao-fisica
workIds:
  - fixture-work-${pad(i)}
editionIds:
  - fixture-edition-${pad(i)}${secondEd}
cover:
  src: "/demo-assets/photo-wide-${pad(((i - 1) % 4) + 1)}.svg"
  alt: "Fotografia sintética da edição física ${pad(i)}"
  width: 800
  height: 500
  credit: "Ilustração SVG original Mangá Atlas (Fixture)"
  license: "CC0-1.0"
isFixture: true
---

Análise sintética de acabamento gráfico, papel e lombada para validação da área de colecionismo.
`;
    await writeFile(join(CONTENT, 'collecting', `${id}.mdx`), mdx);
  }

  console.log('Fixtures sintéticas completas da Fase 25 geradas com sucesso.');
}

main();
