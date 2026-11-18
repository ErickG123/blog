# Validação Visual e de Acessibilidade — Fase 12.2

**Data:** 17/11/2026  
**Escopo:** Validação visual em navegador real (Playwright/Chromium) nas larguras de `390px`, `768px` e `1440px`, nos temas claro e escuro, tanto no cenário **com conteúdo real** (`real-content`) quanto no cenário **com fixtures de desenvolvimento isoladas** (`with-fixtures`).

---

## 1. Matriz de Execução Automatizada (`npm run audit:ui:phase12-2`)

| Cenário | Rotas auditadas | Viewports | Temas | Combinações | Overflow Horizontal | Violações axe-core | Falhas de Semântica / Foco / Contraste |
|---|---:|---|---:|---:|---:|---:|---:|
| **Sem fixtures (`real-content`)** | 13 rotas reais | `390px`, `768px`, `1440px` | Claro e Escuro | **78** | 0 | 0 | 0 |
| **Com fixtures (`with-fixtures`)** | 20 rotas (13 base + 7 detalhes de fixtures) | `390px`, `768px`, `1440px` | Claro e Escuro | **120** | 0 | 0 | 0 |

Os artefatos gerados (ignorados pelo Git em `.gitignore`) encontram-se em:
- `artifacts/phase12-2-visual/real-content/` (78 screenshots + `results.json`)
- `artifacts/phase12-2-visual/with-fixtures/` (120 screenshots + `results.json`)
- Baseline anterior para comparação antes/depois: `artifacts/phase12-1-visual/after/`

---

## 2. Comparação Antes / Depois (Fase 12.1 vs Fase 12.2)

| Página / Viewport | Antes (`artifacts/phase12-1-visual/after/`) | Depois — Sem Fixtures (`artifacts/phase12-2-visual/real-content/`) | Depois — Com Fixtures (`artifacts/phase12-2-visual/with-fixtures/`) | Melhorias concretas verificadas |
|---|---|---|---|---|
| **Home — Desktop 1440px (Claro)** | `desktop-1440-light-home.png` | `desktop-1440-light-home.png` | `desktop-1440-light-home.png` | Header horizontal compacto em uma barra única; introdução curta e busca lado a lado na `.home-toolbar` sem espremer a página; seção de publicações recentes prioritária; grid de 6 categorias fechado (3×2) sem coluna órfã; artigo legado preservado em card próprio no "Arquivo geral". |
| **Home — Desktop 1440px (Escuro)** | `desktop-1440-dark-home.png` | `desktop-1440-dark-home.png` | `desktop-1440-dark-home.png` | Superfícies de card (`--surface: #171f28`) claramente delimitadas por `--line-subtle` sobre o fundo `--paper: #0f141a`; contraste medido superior a 4.5:1 para texto/muted/acento. |
| **Home — Tablet 768px (Claro)** | `tablet-768-light-home.png` | `tablet-768-light-home.png` | `tablet-768-light-home.png` | Adaptação limpa para grades de 2 colunas em publicações recentes, catálogo de obras e categorias. |
| **Home — Mobile 390px (Claro/Escuro)** | `mobile-390-light-home.png` / `mobile-390-dark-home.png` | `mobile-390-light-home.png` / `mobile-390-dark-home.png` | `mobile-390-light-home.png` / `mobile-390-dark-home.png` | Empilhamento vertical consistente, navegação acessível sem corte lateral, pôsteres do catálogo em 2 colunas proporcionais (3:4) e zero overflow horizontal. |
| **Artigo Legado (`/posts/ola-mundo/`) — 1440px** | `desktop-1440-light--posts-ola-mundo-.png` | `desktop-1440-light-posts-ola-mundo.png` | `desktop-1440-light-posts-ola-mundo.png` | Título em escala confortável (`clamp(1.75rem, 3.6vw, 2.65rem)` em vez de `4.4rem`); como possui apenas 1 subtítulo, o TOC lateral é omitido (`headings.length >= 2`) e o artigo é centralizado em coluna de leitura confortável (`48rem`), eliminando o corredor vazio e a caixa lateral desconectada. |
| **Artigo Review Longa c/ Capa e TOC — 1440px / 390px** | *(Não existia na 12.1)* | *(Isolado de produção)* | `desktop-1440-light-posts-fixture-review-longa-horizonte-orbital.png` / `mobile-390-light-posts-fixture-review-longa-horizonte-orbital.png` | Valida nota (`8.8 / 10`), capa `16:9` completa, aviso de spoiler leve, TOC sticky alinhado ao início do texto, alerta `[!NOTE]`, bloco de código com botão Copiar, obras/fontes abordadas e cards compactos de publicações relacionadas com miniatura `16:9`. |
| **Artigo Notícia Curta / Título Longo sem Capa — 1440px** | *(Não existia na 12.1)* | *(Isolado de produção)* | `desktop-1440-light-posts-fixture-noticia-curta-temporada.png` / `desktop-1440-light-posts-fixture-titulo-longo-sem-capa.png` | Valida leitura centralizada sem TOC desnecessário, quebra equilibrada de títulos longos e navegação entre artigos anterior/próximo. |
| **Catálogo (`/obras/`) e Ficha (`/obras/[id]/`) — 1440px** | `desktop-1440-light--obras-.png` | `desktop-1440-light-obras.png` | `desktop-1440-light-obras.png` / `desktop-1440-light-obras-fixture-horizonte-orbital.png` | No estado real vazio, apresenta card `EmptyState` estruturado com ação de retorno; com fixtures, valida barra de 5 filtros combináveis + botão limpar em superfície dedicada, grade de 4 pôsteres `3:4` (incluindo fallback sem capa) e página de detalhe da obra. |
| **Listagens, Temporadas e 404 — 1440px** | `desktop-1440-light--noticias-.png`, `...--temporadas-.png`, `...--rota-inexistente-.png` | `desktop-1440-light-noticias.png`, `...-temporadas.png`, `...-rota-inexistente.png` | `desktop-1440-light-noticias.png`, `...-temporadas.png`, `...-rota-inexistente.png` | Cabeçalhos padronizados com contador em pílula, cartões de temporada e card centralizado para a página 404. |

---

## 3. Checklist de Qualidade Visual da Fase 12.2

- **Header equilibrado:** Sim — compacto em barra única no desktop, com marca, links principais visíveis, menu complementar, busca popover, RSS e alternador de tema.
- **Conteúdo útil na primeira tela:** Sim — tanto com fixtures (destaque + cards recentes visíveis imediatamente) quanto sem fixtures (introdução + estado editorial claro + navegação de 6 categorias e arquivo geral visíveis sem precisar rolar por um hero vazio).
- **Proporções corretas de cards e imagens:** Sim — capas de artigos em `16:9` (destaque, padrão e miniatura horizontal compacta) e pôsteres de obras em `3:4`, sem cortes nem deformações.
- **Sem colunas vazias desnecessárias:** Sim — grids adaptativos (`post-results--cols-1/2/3`, `work-grid--cols-1/2/3/4`), grade de categorias par (6 itens = 3×2 em desktop, 2×3 em tablet, 1×6 em mobile) e TOC condicional (`headings.length >= 2`).
- **Isolamento total das fixtures:** Sim — após a captura com fixtures, o build de produção (`npm run build`) gerou exatamente as 13 páginas reais e passou em `npm run check:static` sem nenhuma rota, post ou obra fictícia em `dist/`, `rss.xml` ou `sitemap-index.xml`.
