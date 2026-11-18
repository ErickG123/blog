import { getCollection, type CollectionEntry } from 'astro:content';
import { mergeWithFixtures, type BlogPost, type BlogWork } from './content';

export type BlogAuthor = CollectionEntry<'authors'>;
export type BlogTaxonomy = CollectionEntry<'taxonomies'>;

export function isFixturesEnabled(): boolean {
  return process.env.PUBLIC_USE_FIXTURES === 'true' || import.meta.env.PUBLIC_USE_FIXTURES === 'true';
}

export async function loadPosts(): Promise<BlogPost[]> {
  const real = await getCollection('posts');
  return mergeWithFixtures(real, fixturePosts, isFixturesEnabled());
}

export async function loadWorks(): Promise<BlogWork[]> {
  const real = await getCollection('works');
  return mergeWithFixtures(real, fixtureWorks, isFixturesEnabled());
}

export async function loadAuthors(): Promise<BlogAuthor[]> {
  const real = await getCollection('authors');
  return mergeWithFixtures(real, fixtureAuthors, isFixturesEnabled());
}

export async function loadTaxonomies(): Promise<BlogTaxonomy[]> {
  const real = await getCollection('taxonomies');
  return mergeWithFixtures(real, fixtureTaxonomies, isFixturesEnabled());
}

const svgCover = (bg1: string, bg2: string, accent: string, badge: string, title: string, subtitle: string, width = 1200, height = 675) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#grid)"/>
    <circle cx="${width * 0.82}" cy="${height * 0.28}" r="${Math.min(width, height) * 0.28}" fill="${accent}" fill-opacity="0.22"/>
    <circle cx="${width * 0.82}" cy="${height * 0.28}" r="${Math.min(width, height) * 0.16}" fill="${accent}" fill-opacity="0.38"/>
    <rect x="56" y="52" width="${badge.length * 14 + 36}" height="38" rx="6" fill="${accent}"/>
    <text x="74" y="77" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="2">${badge}</text>
    <text x="56" y="${height - 110}" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="${width > 800 ? 44 : 32}" font-weight="800">${title}</text>
    <text x="56" y="${height - 64}" fill="#d0d8e0" font-family="system-ui, -apple-system, sans-serif" font-size="${width > 800 ? 22 : 18}" font-weight="500">${subtitle}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const fixtureAuthors: BlogAuthor[] = [
  {
    id: 'equipe-editorial-fixture',
    collection: 'authors',
    data: {
      name: 'Equipe Editorial (Fixture Dev)',
      bio: 'Perfil de teste isolado para validação visual de autoria, metadados e layout do artigo.',
      links: [{ label: 'Repositório do Projeto', url: 'https://github.com/ErickG123/blog' }],
    },
  },
];

export const fixtureTaxonomies: BlogTaxonomy[] = [
  {
    id: 'ficcao-cientifica',
    collection: 'taxonomies',
    data: {
      name: 'Ficção Científica',
      description: 'Obras com temática tecnológica, espacial ou especulativa.',
      type: 'genre',
    },
  },
  {
    id: 'slice-of-life',
    collection: 'taxonomies',
    data: {
      name: 'Cotidiano',
      description: 'Narrativas focadas na rotina e relações humanas.',
      type: 'genre',
    },
  },
  {
    id: 'fantasia',
    collection: 'taxonomies',
    data: {
      name: 'Fantasia',
      description: 'Mundos imaginários, magia e jornadas de aventura.',
      type: 'genre',
    },
  },
  {
    id: 'producao-de-animacao',
    collection: 'taxonomies',
    data: {
      name: 'Produção de Animação',
      description: 'Bastidores, estúdios e técnicas de animação.',
      type: 'tag',
    },
  },
];

export const fixtureWorks: BlogWork[] = [
  {
    id: 'fixture-horizonte-orbital',
    collection: 'works',
    body: 'Ficha técnica de demonstração usada exclusivamente na validação visual da Fase 12.2. Apresenta como uma obra do tipo **anime** é exibida no catálogo, nos filtros por temporada e na página individual de obra.',
    data: {
      title: 'Horizonte Orbital: Estação Aomori',
      originalTitle: 'Kidou Horizon: Aomori Station (Fixture)',
      mediaType: 'anime',
      synopsis: 'Em uma estação de retransmissão no norte do Japão, jovens engenheiros mantêm satélites antigos em operação enquanto investigam sinais vindos da órbita alta.',
      genres: ['Ficção Científica', 'Drama'],
      releaseYear: 2026,
      season: 'fall',
      status: 'Em exibição (Fixture)',
      publicationStatus: 'published',
      cover: svgCover('#162436', '#0d1520', '#d94e3f', 'ANIME · OUTONO 2026', 'Horizonte Orbital', 'Fixture visual de catálogo (3:4)', 600, 800),
      coverAlt: 'Ilustração geométrica de teste para a obra fictícia Horizonte Orbital',
      coverCredit: 'Arte SVG gerada localmente (Fixture Dev)',
      coverSource: 'https://github.com/ErickG123/blog',
      genreRefs: [{ collection: 'taxonomies', id: 'ficcao-cientifica' }],
      relatedWorks: [{ collection: 'works', id: 'fixture-caderno-de-nanquim' }],
      sources: [
        { label: 'Documentação de Arquitetura do Blog', url: 'https://github.com/ErickG123/blog' },
      ],
    },
  },
  {
    id: 'fixture-caderno-de-nanquim',
    collection: 'works',
    body: 'Ficha técnica de demonstração para validar obras do tipo **mangá**, listagem de gêneros, sinopse e conexão cruzada com reviews e guias.',
    data: {
      title: 'Caderno de Nanquim & Chá Verde',
      originalTitle: 'Sumi to Ryokucha no Techou (Fixture)',
      mediaType: 'manga',
      synopsis: 'A rotina de uma assistente de quadrinhos em Tóquio que equilibra prazos semanais de publicação impressa com pequenas descobertas gastronômicas pelo bairro.',
      genres: ['Cotidiano', 'Comédia'],
      releaseYear: 2025,
      status: 'Em publicação (Fixture)',
      publicationStatus: 'published',
      cover: svgCover('#2b2118', '#17120d', '#c86d51', 'MANGÁ · SÉRIE IMPRESSA', 'Caderno de Nanquim', 'Fixture visual de catálogo (3:4)', 600, 800),
      coverAlt: 'Ilustração geométrica de teste para o mangá fictício Caderno de Nanquim',
      coverCredit: 'Arte SVG gerada localmente (Fixture Dev)',
      coverSource: 'https://github.com/ErickG123/blog',
      genreRefs: [{ collection: 'taxonomies', id: 'slice-of-life' }],
      relatedWorks: [{ collection: 'works', id: 'fixture-horizonte-orbital' }],
      sources: [
        { label: 'Guia Editorial do Repositório', url: 'https://github.com/ErickG123/blog' },
      ],
    },
  },
  {
    id: 'fixture-cronicas-de-vento',
    collection: 'works',
    body: 'Obra adicional sem imagem de capa para validar o fallback visual de pôster no catálogo e nas temporadas.',
    data: {
      title: 'Crônicas do Vento Leste',
      originalTitle: 'Higashi no Kaze Chronicles (Fixture)',
      mediaType: 'anime',
      synopsis: 'Viajantes atravessam um arquipélago suspenso catalogando mapas antigos e tradições orais de vilarejos isolados.',
      genres: ['Fantasia', 'Aventura'],
      releaseYear: 2026,
      season: 'spring',
      status: 'Finalizado (Fixture)',
      publicationStatus: 'published',
      genreRefs: [{ collection: 'taxonomies', id: 'fantasia' }],
      relatedWorks: [],
      sources: [],
    },
  },
  {
    id: 'fixture-guia-temporadas-2026',
    collection: 'works',
    body: 'Ficha técnica de mangá clássico de fantasia para completar a grade de 4 obras na Home e no catálogo.',
    data: {
      title: 'Atlas das Ilhas Submersas',
      originalTitle: 'Shinkai Rettou Atlas (Fixture)',
      mediaType: 'manga',
      synopsis: 'Cartógrafos reconstroem rotas marítimas e ruínas antigas a partir de diários preservados em bibliotecas costeiras.',
      genres: ['Fantasia', 'Mistério'],
      releaseYear: 2024,
      status: 'Completo (Fixture)',
      publicationStatus: 'published',
      cover: svgCover('#182a34', '#0e1920', '#4889a6', 'MANGÁ · COMPLETO', 'Atlas das Ilhas Submersas', 'Fixture visual de catálogo (3:4)', 600, 800),
      coverAlt: 'Ilustração geométrica de teste para o mangá fictício Atlas das Ilhas Submersas',
      coverCredit: 'Arte SVG gerada localmente (Fixture Dev)',
      coverSource: 'https://github.com/ErickG123/blog',
      genreRefs: [{ collection: 'taxonomies', id: 'fantasia' }],
      relatedWorks: [{ collection: 'works', id: 'fixture-cronicas-de-vento' }],
      sources: [],
    },
  },
];

export const fixturePosts: BlogPost[] = [
  {
    id: 'fixture-review-longa-horizonte-orbital',
    collection: 'posts',
    body: `Esta é uma **review longa de demonstração** carregada exclusivamente em ambiente de validação visual (\`PUBLIC_USE_FIXTURES=true\`). O objetivo deste texto é exercitar a leitura confortável em coluna principal, o índice lateral (TOC), citações, alertas, blocos de código e relação com obras do catálogo.

## Direção de arte e construção de atmosfera

Ao contrário de produções que dependem apenas de exposição verbal, *Horizonte Orbital* utiliza o desenho de som e a iluminação fria dos painéis de controle para transmitir a passagem do tempo. Cada episódio dedica seus primeiros minutos à manutenção física dos equipamentos antes de introduzir o conflito dramático.

> [!NOTE] Contexto de validação visual
> Este bloco utiliza a sintaxe de alerta GitHub-flavored Markdown para testar o contraste de superfície, borda lateral semântica e espaçamento interno dentro do corpo do artigo.

### O ritmo dos diálogos técnicos

A série equilibra terminologia de telemetria com conversas cotidianas no refeitório da estação. Os enquadramentos fechados reforçam a sensação de isolamento durante o inverno no norte de Honshu, enquanto as tomadas externas abrem o quadro para o céu noturno.

1. Apresentação contida dos personagens secundários ao longo dos três primeiros episódios;
2. Uso consistente de trilha sonora acústica em cenas de transição;
3. Integração orgânica entre animação tradicional 2D e interfaces gráficas de monitores.

## Desenvolvimento de personagens e estrutura narrativa

Na segunda metade da temporada, o foco muda da rotina operacional para as escolhas pessoais da equipe diante do descomissionamento programado da base.

### Equilíbrio entre drama humano e ficção científica

O roteiro evita soluções mágicas: cada avanço na decodificação do sinal orbital exige revisão de registros antigos, cooperação entre turnos e negociação com o centro de comando em Tsukuba.

\`\`\`txt
[REGISTRO DE TELEMETRIA - FIXTURE VISUAL]
Estação: Aomori-04 | Banda: Ka-Band | Relação Sinal-Ruído: +14.2 dB
Status da verificação de layout: Leitura confortável em 65-72 caracteres por linha.
\`\`\`

## Conclusão da análise

Como peça de validação para a Fase 12.2, esta publicação comprova que artigos longos com múltiplos subtítulos recebem índice lateral útil e bem alinhado ao texto, sem títulos desproporcionais nem barras laterais desconectadas.`,
    data: {
      title: 'Review: Horizonte Orbital encontra beleza silenciosa na rotina técnica de uma estação espacial',
      description: 'Uma análise detalhada de direção, trilha sonora e ritmo narrativo em uma publicação longa com capa, avaliação, aviso de spoiler leve e índice lateral.',
      publishedAt: '2026-11-15',
      updatedAt: '2026-11-16',
      type: 'review',
      status: 'published',
      tags: ['ficcao-cientifica', 'analise', 'animacao'],
      cover: svgCover('#162436', '#1f3a52', '#d94e3f', 'REVIEW EM DESTAQUE', 'Horizonte Orbital: Estação Aomori', 'Análise de direção, som e construção de mundo (16:9)'),
      coverAlt: 'Capa horizontal em proporção 16:9 para a review de teste Horizonte Orbital',
      coverCredit: 'Ilustração SVG local (Fixture Dev)',
      coverSource: 'https://github.com/ErickG123/blog',
      author: { collection: 'authors', id: 'equipe-editorial-fixture' },
      works: [{ collection: 'works', id: 'fixture-horizonte-orbital' }],
      taxonomyRefs: [{ collection: 'taxonomies', id: 'producao-de-animacao' }],
      sources: [
        { label: 'Especificação Visual da Fase 12.2', url: 'https://github.com/ErickG123/blog' },
      ],
      spoilerLevel: 'light',
      featured: true,
      rating: 8.8,
    },
  },
  {
    id: 'fixture-noticia-curta-temporada',
    collection: 'posts',
    body: `Esta é uma **notícia curta de validação visual** sem múltiplos subtítulos.

Em artigos curtos como notas informativas e atualizações rápidas de temporada, o layout do artigo não deve renderizar uma barra lateral de índice vazia ou redundante, mantendo o foco direto na leitura e nos metadados essenciais.`,
    data: {
      title: 'Agenda da semana: confira os horários de exibição e lançamentos da temporada de outono',
      description: 'Nota curta para validar o comportamento de cards de notícia na Home e a leitura enxuta de artigos sem índice lateral.',
      publishedAt: '2026-11-14',
      type: 'news',
      status: 'published',
      tags: ['temporada', 'agenda'],
      cover: svgCover('#261c2e', '#16111c', '#e06c50', 'NOTÍCIA CURTA', 'Agenda da Temporada', 'Card visual com proporção 16:9 consistente'),
      coverAlt: 'Capa horizontal para notícia curta de teste',
      coverCredit: 'Ilustração SVG local (Fixture Dev)',
      coverSource: 'https://github.com/ErickG123/blog',
      author: { collection: 'authors', id: 'equipe-editorial-fixture' },
      works: [{ collection: 'works', id: 'fixture-horizonte-orbital' }],
      taxonomyRefs: [],
      sources: [{ label: 'Fonte Primária de Teste', url: 'https://github.com/ErickG123/blog' }],
      featured: false,
    },
  },
  {
    id: 'fixture-guia-leitura-mangas',
    collection: 'posts',
    body: `Este **guia de leitura** valida a apresentação de artigos utilitários com estrutura passo a passo, listas organizadas e recomendações por perfil de leitor.

## 1. Entendendo formatos de publicação

Antes de iniciar uma coleção longa, vale observar se a obra é publicada em antologias semanais, mensais ou diretamente em volumes encadernados (*tankobon*).

## 2. Como organizar sua leitura por temas

- **Cotidiano e gastronomia:** capítulos episódicos ideais para leituras curtas ao longo da semana;
- **Ficção científica e mistério:** arcos fechados que se beneficiam de leitura sequencial;
- **Fantasia histórica:** edições com glossários e notas de tradução detalhadas.

## 3. Onde consultar fichas e temporadas

Utilize o catálogo de obras do blog para cruzar autores, gêneros e artigos relacionados a cada série.`,
    data: {
      title: 'Guia prático: como organizar sua lista de leitura de mangás por formato, demografia e ritmo',
      description: 'Roteiro estruturado para escolher novas séries impressas ou digitais sem se perder entre edições e volumes.',
      publishedAt: '2026-11-12',
      type: 'guide',
      status: 'published',
      tags: ['guia', 'manga', 'colecao'],
      cover: svgCover('#1d2e28', '#111c18', '#3c8d73', 'GUIA DE LEITURA', 'Organizando Leituras de Mangá', 'Formatos, edições e caminhos de entrada'),
      coverAlt: 'Capa horizontal para guia de leitura de mangás',
      coverCredit: 'Ilustração SVG local (Fixture Dev)',
      coverSource: 'https://github.com/ErickG123/blog',
      author: { collection: 'authors', id: 'equipe-editorial-fixture' },
      works: [{ collection: 'works', id: 'fixture-caderno-de-nanquim' }],
      taxonomyRefs: [],
      sources: [],
      featured: false,
    },
  },
  {
    id: 'fixture-titulo-longo-sem-capa',
    collection: 'posts',
    body: `Este artigo de teste não possui imagem de capa (\`cover\` ausente) e utiliza um **título intencionalmente longo** para assegurar que os cards na Home, nas listagens de categoria e no cabeçalho do artigo mantenham alinhamento, altura equilibrada e quebras de linha naturais sem estourar containers em 390px, 768px ou 1440px.

## Comportamento de cards sem imagem

Quando uma publicação não traz imagem de capa, o card deve apresentar uma superfície visual coerente ou identificador editorial limpo, sem parecer quebrado ao lado de cards com capa.`,
    data: {
      title: 'Como a evolução das técnicas de composição digital e fotografia transformou a estética dos animes televisivos na última década',
      description: 'Artigo de teste sem imagem de capa e com título extenso para verificar a resiliência tipográfica, o alinhamento de grids e a ausência de overflow horizontal.',
      publishedAt: '2026-11-10',
      type: 'anime',
      status: 'published',
      tags: ['animacao', 'fotografia', 'estetica'],
      author: { collection: 'authors', id: 'equipe-editorial-fixture' },
      works: [{ collection: 'works', id: 'fixture-horizonte-orbital' }, { collection: 'works', id: 'fixture-cronicas-de-vento' }],
      taxonomyRefs: [{ collection: 'taxonomies', id: 'producao-de-animacao' }],
      sources: [],
      featured: false,
    },
  },
  {
    id: 'fixture-artigo-manga-nanquim',
    collection: 'posts',
    body: `Publicação voltada à editoria de **Mangá** para validar o preenchimento das seções temáticas na Home e na rota \`/mangas/\`.

## Traço, hachuras e narrativa visual

A transição entre páginas duplas e quadros silenciosos continua sendo um dos recursos mais expressivos do quadrinho japonês contemporâneo.`,
    data: {
      title: 'O uso do silêncio e da arquitetura urbana nas páginas de Caderno de Nanquim & Chá Verde',
      description: 'Ensaio sobre quadrinização, ritmo visual e representação de bairros residenciais de Tóquio no mangá contemporâneo.',
      publishedAt: '2026-11-08',
      type: 'manga',
      status: 'published',
      tags: ['manga', 'arte', 'narrativa'],
      cover: svgCover('#2b2118', '#3c2d21', '#c86d51', 'ENSAIO · MANGÁ', 'Arquitetura e Silêncio no Mangá', 'Análise de composição de página (16:9)'),
      coverAlt: 'Capa horizontal para artigo sobre mangá',
      coverCredit: 'Ilustração SVG local (Fixture Dev)',
      coverSource: 'https://github.com/ErickG123/blog',
      author: { collection: 'authors', id: 'equipe-editorial-fixture' },
      works: [{ collection: 'works', id: 'fixture-caderno-de-nanquim' }],
      taxonomyRefs: [],
      sources: [],
      featured: false,
    },
  },
];
