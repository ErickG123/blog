# Auditoria Inicial — Fase 12.2: Reconstrução Visual Orientada por Conteúdo

**Data:** 17/11/2026  
**Escopo:** Auditoria estrutural, visual e arquitetural do estado deixado pelas Fases 03, 11, 12 e 12.1, preparando a reconstrução orientada por conteúdo, componentes e layouts concretos.

---

## 1. Diagnóstico do Estado Atual

A inspeção do código-fonte (`src/layouts/`, `src/pages/`, `src/components/`, `src/utils/`) e das capturas em `artifacts/phase12-1-visual/after/` revelou que as reformulações anteriores oscilaram entre dois extremos problemáticos:
1. **Fase 12:** Tentou criar uma revista literária/institucional com um hero abstrato gigantesco, ornamentos geométricos e 7 cartões estreitos com letras isoladas (`N`, `A`, `M`, `R`, `G`, `O`, `T`).
2. **Fase 12.1:** Removeu os exageros da Fase 12, mas deixou a interface com aspecto de documento cru — linhas divisórias horizontais do início ao fim da tela, elementos desalinhados na metade esquerda, ausência de superfícies de card bem definidas e páginas com enormes vazios verticais.

### 1.1. Estilos herdados de reformulações anteriores

- **Duplicação de variáveis CSS em `Layout.astro`:** Coexistência confusa entre duas gerações de tokens (`--paper`, `--ink`, `--line`, `--surface`, `--radius-sm/md/lg`) e tokens antigos (`--bg`, `--text`, `--border`, `--card-bg`, `--radius`). Em `src/pages/posts/[...id].astro`, ainda se usa `--border`, `--card-bg`, `--text` e até estilos inline (`style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border);"` duplicando a classe `.comments-section`).
- **Duplicação de `#progress-bar`:** Definido globalmente em `Layout.astro` (`z-index: 100`) e redefinido localmente em `src/pages/posts/[...id].astro` (`z-index: 9999`).
- **Tipografia desproporcional herdada do modelo "revista":**
  - Título de artigo (`.post-title`): `clamp(2.2rem, 6vw, 4.4rem)` com `letter-spacing: -0.055em` e `line-height: 1.08` — exageradamente grande em desktop (70px+), quebrando títulos médios e longos de forma desconfortável.
  - Título de obra (`src/pages/obras/[id].astro`): `clamp(2.3rem, 6vw, 5rem)` com `letter-spacing: -0.065em`.
  - Títulos de listagem (`PostListing.astro`, `obras/index.astro`, `temporadas/index.astro`): `clamp(2rem, 4.5vw, 3.5rem)`.

### 1.2. Componentes redundantes ou subestruturados

- **`FeaturedPost.astro` vs `PostCard.astro`:** Dois componentes separados com marcação e metadados quase idênticos para representar publicações, enquanto `PostCard.astro` não possui superfície de card real (é apenas um bloco com `border-bottom: 1px solid var(--line)`).
- **`CategoryCard.astro`:** Renderiza linhas simples com borda inferior que deixam um buraco vazio na 3ª coluna quando há 5 categorias em um grid de 3 colunas, além de separar "Explorar obras" e "Ver temporadas de anime" em links soltos de texto (`discovery-links`) logo abaixo.
- **`EmptyState.astro`:** Reduzido na Fase 12.1 a uma linha simples (`border-top: 1px solid var(--line)`), sem container visual adequado, fazendo com que páginas sem publicações pareçam quebradas ou inacabadas.
- **Cabeçalhos de página fragmentados:** `PostListing.astro`, `obras/index.astro`, `temporadas/index.astro` e `temporadas/[ano]/[estacao].astro` reimplementam cabeçalhos de página manualmente com CSS duplicado.

### 1.3. Problemas concretos de alinhamento, composição e espaço vazio

1. **Header em duas linhas desconectadas (`Layout.astro`):**
   - A marca fica isolada no topo esquerdo e os ícones no topo direito, com uma segunda barra abaixo para links e um dropdown `<details class="more-nav">` ("Mais editorias") escondendo Reviews, Guias e Temporadas mesmo em telas de 1440px onde há amplo espaço horizontal.
2. **Home espremida ou com buracos visuais (`src/pages/index.astro`):**
   - A busca `.home-search` tem `max-width: 38rem` alinhada à esquerda e aparece acima de tudo quando há posts, dominando o topo da página com mais de 50% da largura à direita completamente vazia.
   - Em `.post-results`, a regra `.post-results > :only-child { grid-column: 1 / -1; }` combinada com `PostCard` sem borda lateral estica uma linha fina por 1200px enquanto o texto fica solto à esquerda.
   - Em `.category-grid` (`grid-template-columns: repeat(3, minmax(0, 1fr))`), 5 itens geram uma segunda linha incompleta (2 itens + 1 coluna vazia à direita).
3. **Página de artigo desconectada (`src/pages/posts/[...id].astro`):**
   - O grid `.layout-grid` (`minmax(0, 1fr) 250px`) coloca a `.sidebar` (TOC) no topo direito alinhada com o link `← Início` e os breadcrumbs, enquanto o título gigante e o texto têm `max-width: 72ch` à esquerda. Isso cria um corredor vazio no meio da tela e faz a caixa "Neste Artigo" parecer flutuar desconectada do corpo do texto.
   - Além disso, o TOC é renderizado mesmo para artigos curtíssimos com apenas 1 subtítulo (`headings.length > 0`), desperdiçando uma coluna inteira de 250px + 48px de gap para exibir um único link.
4. **Páginas de categoria, catálogo e 404 com vazio excessivo:**
   - Como `main` tem `min-height: 55vh` e `EmptyState` tem apenas ~50px de altura sem superfície, a página inteira fica em branco entre o topo e o footer.

### 1.4. Limitações causadas pela falta de conteúdo real

- O repositório possui atualmente apenas 1 post publicado (`src/content/posts/ola-mundo.md`, artigo técnico legado sobre Astro) e **0 obras**, **0 autores**, **0 taxonomias** e **0 posts temáticos** de anime/mangá.
- Sem uma estratégia de fixtures isoladas de desenvolvimento, todas as fases anteriores remodelaram o CSS às cegas para os estados com dados (notícia curta, review longa com nota/spoiler, guia com TOC, artigo com e sem capa, obras anime/mangá, títulos longos, filtros ativos do catálogo e páginas de detalhe de obra/temporada).

---

## 2. Dependências e Funcionalidades a Preservar

Conforme `.agents/rules/content-and-routes.md`, `SPEC-0001` e ADRs 0001 a 0005, são inegociáveis:

1. **Rotas e URLs públicas sob `base: '/blog'` (`basePath()`):**
   - `/`
   - `/posts/ola-mundo/` (e `/posts/[...id]/`)
   - `/tags/astro/`, `/tags/minimalista/`, `/tags/tutorial/` (e `/tags/[tag]/`)
   - `/noticias/`, `/animes/`, `/mangas/`, `/reviews/`, `/guias/`
   - `/obras/` e `/obras/[id]/`
   - `/temporadas/` e `/temporadas/[ano]/[estacao]/`
   - `/rss.xml`, `/sitemap-index.xml`, `/404.html`
2. **Artigo legado (`ola-mundo.md`):**
   - Preservar arquivo, slug, frontmatter e URL pública (`/blog/posts/ola-mundo/`), além de presença no RSS e páginas de tags.
   - Na Home, tratá-lo com decisão editorial explícita: separado das publicações temáticas de anime/mangá (em seção discreta de arquivo técnico/geral), nunca disfarçado de notícia otaku.
3. **Funcionalidades interativas e técnicas:**
   - Alternância e persistência de tema claro/escuro (`localStorage.getItem('theme')`, classe `html.dark`) + sincronia com Giscus.
   - Barra de progresso de leitura (`#progress-bar`), botão voltar ao topo (`#scroll-to-top`), copiar link (`#copy-link-btn`), copiar código em blocos `<pre>` e alertas GFM (`[!NOTE]`, etc.).
   - Comentários via Giscus (`#giscus-container`) e fallback gracioso.
   - Busca textual na Home (`#home-search`, `#search-input`, `#home-search-status`) e busca global no header (`?q=`).
   - Filtros combináveis no catálogo (`#work-filters`, `filterWorks()`).
   - Metadados SEO, Canonical, OpenGraph, Twitter Card, JSON-LD `BlogPosting` e `noindex, nofollow` na 404.
   - Isolamento estrito de rascunhos (`status: 'draft'`) e de fixtures de desenvolvimento: **nenhum dado fictício pode vazar para o build de produção, RSS ou sitemap**.

---

## 3. Plano de Ação para a Fase 12.2

1. **Estratégia de Fixtures Isoladas (Etapa 3):**
   - Criar módulo de fixtures de desenvolvimento (`src/utils/dev-fixtures.ts` + ativos SVG locais autorais em `public/images/fixtures/` que só são referenciados pelas fixtures) ativado **exclusivamente** quando `import.meta.env.DEV` ou `process.env.PUBLIC_USE_FIXTURES === 'true'` (nunca no build padrão de produção, nunca no RSS de produção, nunca no sitemap de produção).
   - Cobrir todos os casos exigidos: notícia curta, review longa, guia, artigo sem imagem, artigo com capa, obra anime, obra mangá, publicação com título longo.
2. **Reconstrução do Header e da Home (Etapa 4 & 5):**
   - Header horizontal compacto em linha única no desktop (Marca + Navegação direta para Início, Notícias, Anime, Mangá, Reviews, Guias, Obras, Temporadas + Busca popover, RSS e Tema), responsivo no mobile.
   - Container principal de `1200px` com margens laterais consistentes.
   - Home orientada por publicações e imagens, adaptativa tanto ao estado com conteúdo (destaque + grid de recentes + seções de anime/mangá + catálogo + navegação de categorias) quanto ao estado real atual (com poucas publicações, apresentando estado vazio editorial claro ao lado da navegação de categorias e mantendo o artigo legado separado no Arquivo Técnico/Geral, sem espaços mortos ou colunas órfãs).
   - Validar em navegador real (390px, 768px, 1440px, claro e escuro, com e sem fixtures) antes de prosseguir.
3. **Reconstrução da Página do Artigo (Etapa 6):**
   - Cabeçalho editorial equilibrado (categoria, título em escala confortável `clamp(1.75rem, 3.6vw, 2.75rem)`, resumo, metadados de data/leitura/autor, capa opcional com crédito).
   - Índice lateral (TOC) exibido **somente quando útil** (ex.: 2 ou mais subtítulos) e alinhado ao início do corpo do artigo, sem flutuar desconectado ao lado do breadcrumb; quando o artigo for curto ou tiver 0–1 subtítulo, centralizar/equilibrar o layout sem coluna vazia.
4. **Consolidação do Design System e Demais Páginas (Etapas 7 & 8):**
   - Unificar tokens CSS em `Layout.astro`, remover variáveis legadas duplicadas e padronizar cards, botões, badges, inputs e estados vazios.
   - Revisar listagens (`Notícias`, `Animes`, `Mangás`, `Reviews`, `Guias`), `Catálogo`, `Ficha de Obra`, `Temporadas`, `Tags`, `Busca` e `404`.
5. **Validação Completa e Relatórios (Etapas 9 & 10):**
   - Executar testes unitários, lint, typecheck, build de produção (garantindo zero fixtures no `dist/`), `check:static`, auditoria visual e Playwright E2E.
