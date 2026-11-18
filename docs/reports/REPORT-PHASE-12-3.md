# Relatório — Fase 12.3: Refinamento Visual e Correção de Navegação

**Data:** 17/11/2026  
**Escopo:** Ajustes pontuais de UX, correção obrigatória do estado ativo do menu principal, redução de redundâncias na Home, refinamento de espaçamentos em cards/artigos e criação de rota secundária para o arquivo técnico legado.  
**Estado:** Concluído e validado localmente; status de release público permanece **NO-GO** pelas pendências externas (conteúdo editorial real, CI remoto e dependência transitiva).

---

## 1. Diagnóstico Inicial

1. **Menu de navegação (`src/layouts/Layout.astro`):**
   - A aba ativa (`.primary-nav > a[aria-current="page"]`) aplicava `box-shadow: inset 0 -2px var(--accent)` (linha inferior coral grossa) e alterava o `font-weight` de `650` para `750`, o que modificava a largura do item ao alternar entre páginas e deslocava a percepção de centralização vertical do texto.
   - Os itens usavam `min-height: 2.35rem` com `padding: .3rem .68rem` e `line-height` herdado (`1.65`), sem `justify-content: center` nem `line-height: 1` explícito.
   - Quando o usuário visitava `/reviews/`, `/guias/` ou `/temporadas/`, o agrupador `<details class="more-nav">` ("Mais editorias") não refletia visualmente que uma sub-rota estava ativa.
2. **Home (`src/pages/index.astro`):**
   - Quando não havia publicações temáticas (`editorialPosts.length === 0`), a Home exibia um bloco `EmptyState` ("Novas pautas de anime e mangá em preparação") com botão "Consultar catálogo", competindo diretamente com a seção "Navegar por categorias" (que já inclui o card "Catálogo de obras") logo abaixo.
3. **Cards de categoria (`src/components/CategoryCard.astro`):**
   - Descrição em `0.79rem` e `gap: .15rem` deixavam a leitura secundária comprimida.
4. **Artigos (`src/pages/posts/[...id].astro`) e Conteúdo Legado:**
   - As tags (`.tag`) e botões de compartilhamento (`.share-btn`) usavam `display: inline-block` com paddings verticais variáveis em vez de `inline-flex` com altura e centralização padronizadas.
   - No artigo legado (`type === 'article'`), o breadcrumb exibia `Início / Artigo` como texto estático sem link para uma listagem dedicada ao arquivo técnico.

---

## 2. Alterações Implementadas

### 2.1. Correção Obrigatória do Menu (`src/layouts/Layout.astro`)
- **Remoção total da linha coral inferior:** Removida a regra `box-shadow: inset 0 -2px var(--accent)`. Verificado via Playwright (`getComputedStyle(el).boxShadow === 'none'`) que nenhuma borda inferior, sombra interna ou pseudo-elemento gera linha colorida sob a aba ativa.
- **Centralização e estabilidade dimensional:**
  - `.primary-nav > a` e `.more-nav > summary` agora compartilham `display: inline-flex; align-items: center; justify-content: center; height: 2.3rem; padding: 0 .75rem; border: 1px solid transparent; font-size: .85rem; font-weight: 650; line-height: 1; text-align: center; white-space: nowrap;` (`height: 2.15rem; padding: 0 .6rem` em telas `<= 620px`).
  - O `font-weight: 650` permanece idêntico em repouso, hover, foco e ativo, evitando qualquer mudança de largura ou deslocamento de vizinhos ao trocar de rota.
- **Identificação sutil da aba ativa e foco acessível:**
  - Aba ativa identificada por fundo sutil `background: var(--surface-soft); border-color: var(--line-subtle); color: var(--ink);` — aplicada também ao `<details class="more-nav" data-active="true">` quando a rota ativa é `/reviews/`, `/guias/` ou `/temporadas/`.
  - Indicador `:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }` preservado em todos os itens.

### 2.2. Refinamento das Páginas e Rota Secundária de Arquivo
- **Home (`src/pages/index.astro`):**
  - Removido o bloco vazio redundante quando `editorialPosts.length === 0`, fazendo com que a navegação por categorias suba diretamente para a primeira dobra sem estados vazios competitivos;
  - Mantido `<div id="post-results" class="post-results" hidden></div>` para compatibilidade com scripts e testes;
  - Adicionado link de ação `Abrir página do arquivo →` (`/blog/arquivo/`) no cabeçalho da seção "Arquivo geral".
- **Página Secundária de Arquivo (`src/pages/arquivo/index.astro`):**
  - Nova rota pública `/blog/arquivo/` que lista publicações técnicas legadas (`ola-mundo`) usando `PostListing.astro`, ligada a partir da Home, do rodapé (`Layout.astro`) e do breadcrumb de artigos do tipo `article` (`src/pages/posts/[...id].astro`), preservando integralmente `/blog/posts/ola-mundo/`, RSS e tags.
- **Cards de Categoria (`src/components/CategoryCard.astro`):**
  - Ajustados `padding: 1rem 1.15rem`, `gap: .95rem`, ícone `2.55rem`, título `1rem` (`font-weight: 750`) e descrição `0.84rem` (`line-height: 1.45`) para melhor legibilidade.
- **Artigos e Componentes (`src/pages/posts/[...id].astro`, `src/components/PostCard.astro`, `src/components/EmptyState.astro`):**
  - Tags (`.tag`) e botões de compartilhamento (`.share-btn` e `.empty-action`) padronizados com `display: inline-flex; align-items: center; justify-content: center; line-height: 1` e alturas fixas consistentes.

---

## 3. Arquivos Alterados

- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/pages/arquivo/index.astro` *(novo)*
- `src/pages/posts/[...id].astro`
- `src/components/CategoryCard.astro`
- `src/components/PostCard.astro`
- `src/components/EmptyState.astro`
- `e2e/site.spec.ts`
- `scripts/phase12-2-visual-audit.mjs`
- `.gitignore`
- `docs/roadmap.md`
- `docs/reports/REPORT-PHASE-12-3.md` *(novo)*

---

## 4. Capturas Antes / Depois

- **Antes (Fase 12.2):** `artifacts/phase12-2-visual/real-content/`
- **Depois (Fase 12.3):** `artifacts/phase12-3-visual/real-content/` (84 capturas cobrindo 14 rotas × `390px`, `768px`, `1440px` × temas claro e escuro)

| Rota / Viewport | Antes (`artifacts/phase12-2-visual/real-content/`) | Depois (`artifacts/phase12-3-visual/real-content/`) | Verificação |
|---|---|---|---|
| **Home — 1440px (Claro / Escuro)** | `desktop-1440-light-home.png` / `desktop-1440-dark-home.png` | `desktop-1440-light-home.png` / `desktop-1440-dark-home.png` | Aba "Início" sem linha coral inferior, com texto centralizado em pílula sutil (`--surface-soft`); seção "Navegar por categorias" posicionada diretamente abaixo da barra inicial sem estado vazio redundante. |
| **Home — 768px e 390px** | `tablet-768-light-home.png` / `mobile-390-light-home.png` | `tablet-768-light-home.png` / `mobile-390-light-home.png` | Menu responsivo com altura uniforme (`2.15rem` no mobile), sem cortes nem overflow horizontal. |
| **Notícias / Obras — 1440px** | `desktop-1440-light-noticias.png` / `desktop-1440-light-obras.png` | `desktop-1440-light-noticias.png` / `desktop-1440-light-obras.png` | Transição da aba ativa para "Notícias" ou "Obras" mantém exatamente a mesma largura e alinhamento dos itens vizinhos. |
| **Artigo Legado (`/posts/ola-mundo/`) — 1440px** | `desktop-1440-light-posts-ola-mundo.png` | `desktop-1440-light-posts-ola-mundo.png` | Breadcrumb `← Início / Artigo` clicável levando a `/blog/arquivo/`, tags e botões de compartilhamento perfeitamente alinhados. |
| **Arquivo Geral (`/arquivo/`) — 1440px** | *(Nova rota secundária)* | `desktop-1440-light-arquivo.png` | Página dedicada ao acervo técnico legado, preservando a URL original do post. |

---

## 5. Resultados dos Testes

| Comando | Resultado | Detalhes |
|---|---|---|
| `npm run typecheck` | **Passou** | `astro check`: 44 arquivos, 0 erros, 0 warnings, 0 hints. |
| `npm run lint` | **Passou** | ESLint: 0 erros, 0 warnings. |
| `npm test` | **Passou** | Vitest: 2 suítes, **11 testes unitários passaram**. |
| `npm run build` | **Passou** | 14 páginas estáticas geradas em `dist/` (incluindo `/arquivo/index.html`), sem conteúdo fictício. |
| `npm run check:static` | **Passou** | Todos os links locais, metadados SEO e prefixos `/blog/` verificados. |
| `npm run audit:ui:phase12-2` | **Passou** | **84 combinações** (14 rotas × 3 viewports `390`, `768`, `1440` × 2 temas): 0 overflow horizontal, 0 violações axe-core, foco e contraste aprovados. |
| `npm run test:e2e` | **Passou** | Playwright: **6 testes E2E passaram** (incluindo asserção de `boxShadow: 'none'` na aba ativa e teste da rota `/blog/arquivo/`). |

---

## 6. Pendências Externas

- Produção e aprovação humana de conteúdo editorial real de anime/mangá;
- Verificação remota do workflow no GitHub Actions e resolução/aceite da vulnerabilidade transitiva em `picomatch`;
- Teste manual com leitor de tela.
