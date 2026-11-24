# Relatório da Fase 42 — Refinamento da Home, Correção de Botões e Compatibilidade com GitHub Pages

- **Data**: 2026-11-24
- **Status**: **CONCLUÍDA**

## 1. Diagnóstico inicial

Na auditoria inicial do build estático de produção (`dist/`), observou-se na página inicial editorial (sem publicações):

- O botão primário (`Sobre o projeto`) exibia fundo vermelho com texto vermelho quase invisível (`rgb(229, 57, 70)` sobre `rgb(216, 47, 61)` no escuro e `rgb(200, 35, 51)` sobre `rgb(202, 37, 53)` no claro).
- Os botões secundários (`Política editorial` e `Pesquisa`) exibiam texto vermelho (`--ma-accent`), quebrando a hierarquia visual entre variantes.
- A apresentação da Home sem publicações utilizava `.ma-prose` com estilos inline e copy excessivamente técnica.
- Imagens/assets locais (`cover.src`, `asset.src`) e `robots.txt` ainda não utilizavam centralizadamente o `base` configurado para hospedagem em subdiretório no GitHub Pages (`/blog/`).

## 2. Causa técnica do problema dos botões

A inspeção dos estilos computados e das folhas SCSS identificou **conflito de especificidade CSS**:

1. `src/shared/styles/base.scss` definia `.ma-prose a { color: var(--ma-accent); }` com especificidade `(0, 1, 1)`.
2. `src/shared/styles/components.scss` definia `.ma-btn` e `.ma-btn--primary` com especificidade `(0, 1, 0)`.
3. Como `src/pages/index.astro` (estado vazio) e `src/pages/404.astro` renderizavam `<Button href="...">` (elemento `<a class="ma-btn ...">`) dentro de `<section class="ma-prose">`, a regra `.ma-prose a` sobrepunha a cor de texto de todas as variantes de botão.
4. Adicionalmente, no tema escuro, `--ma-accent` (`#E53946`) com texto branco produzia contraste `4.19:1`, abaixo do mínimo `4.5:1` da WCAG 2.2 AA para texto normal.

## 3. Correções implementadas

- **`src/shared/styles/base.scss`**: restringido `.ma-prose a:not(.ma-btn):not(.ma-tag)` para impedir interferência de links de prosa em botões e tags, sem uso de `!important`.
- **`src/shared/styles/tokens.scss`**: criados tokens semânticos dedicados para botões (`--ma-btn-primary-bg`, `--ma-btn-primary-hover`, `--ma-btn-primary-active`, `--ma-btn-primary-text`, `--ma-btn-secondary-*`, `--ma-btn-height: 2.625rem`, `--ma-btn-px: 1.125rem`, `--ma-btn-radius: 8px`, `--ma-btn-gap: var(--ma-space-2)`), garantindo contraste >= `4.5:1` em ambos os temas e em todos os estados.
- **`src/shared/styles/components.scss`**: consolidadas todas as variantes (`primary`, `secondary`, `outline`, `ghost`, `link`), estados (`:link`, `:visited`, `:hover`, `:active`, `:focus-visible`, `:disabled`, `[aria-disabled='true']`), alinhamento de ícones SVG (`16px`, `currentColor`) e `.ma-btn-group` responsivo.
- **`src/shared/ui/Button.astro`**: expandido para suportar as 5 variantes semânticas, `disabled`, `ariaLabel`, `class` e `id`, preservando `<a>` para navegação e `<button>` para ações.
- **`src/shared/styles/editorial.scss`**: atualizados estados ativos de filtros/paginação para usar `--ma-btn-primary-*`, alinhado input de busca com `--ma-btn-height` e adicionada a composição `.ma-home-intro`.

## 4. Variantes e tokens consolidados

| Variante    | Fundo (Claro / Escuro)     | Texto (Claro / Escuro) | Contraste medido    | Altura |
| ----------- | -------------------------- | ---------------------- | ------------------- | ------ |
| `primary`   | `#C82333` / `#C82333`      | `#FFFFFF` / `#FFFFFF`  | `5.61:1` / `5.61:1` | `42px` |
| `secondary` | `#FFFFFF` / `#25252E`      | `#141418` / `#F3F3F7`  | `18.4:1` / `13.7:1` | `42px` |
| `outline`   | `transparent`              | `--ma-text`            | `>= 13.7:1`         | `42px` |
| `ghost`     | `transparent`              | `--ma-text`            | `>= 13.7:1`         | `42px` |
| `link`      | `transparent` (sublinhado) | `--ma-accent`          | `>= 5.2:1`          | auto   |

## 5. Melhorias na composição da Home

- Substituído o texto técnico na Home sem publicações por apresentação editorial natural (eyebrow discreto, título, tagline, descrição do propósito, ações com ícones Lucide e nota discreta sobre futuras publicações).
- Na Home demonstrativa, corrigido o wrapper `.ma-work-card__body` nos cards da biblioteca e aplicada formatação `pt-BR` (`formatWorkKind`, `formatWorkFormat`, `formatArticleCategory`, `formatRatingPtBr`).

## 6. Ajustes de layout

- Confirmado `body { min-height: 100dvh; display: flex; flex-direction: column; }` com `.ma-main { flex: 1; }`, mantendo o footer posicionado no final da viewport em páginas curtas e fluindo naturalmente em páginas longas.
- Refinado link de busca no header (`.ma-nav__search`), adicionada marcação de `.ma-btn-group` em `404.astro` e alinhados os botões de `busca/index.astro` e `CopyLinkButton.astro`.

## 7. Validação do GitHub Pages

- Centralizados `withBasePath` e `resolveAssetUrl` em `src/shared/domain/rules.ts`.
- Adicionado `public/favicon.svg` e `src/pages/robots.txt.ts` (substituindo `public/robots.txt` hardcoded).
- Normalizado `baseUrl` no carregamento do Pagefind em `src/pages/busca/index.astro`.
- Executado build de teste com `ASTRO_BASE_PATH=/blog/` e `SITE_URL=https://usuario.github.io`, servido sob `/blog/` e verificado via Playwright:
  - `canonical`: `https://usuario.github.io/blog/`
  - `favicon`: `/blog/favicon.svg` (HTTP 200)
  - Navegação para `/blog/sobre/` (HTTP 200), RSS e Sitemap (HTTP 200)
  - Busca Pagefind sob `/blog/busca/` retornando resultados normalmente
  - `robots.txt` apontando para `https://usuario.github.io/blog/sitemap-index.xml`
  - **0 respostas HTTP >= 400**.

## 8. Validação dos assets locais

- `resolveAssetUrl` aplicado em `MediaFigure.astro`, `index.astro`, `obras/index.astro` e `obras/[slug].astro`.
- `scripts/check-isolation.mjs` validou isolamento de `dist/` sem vazamento de fixtures ou `demo-assets`.

## 9. Arquivos alterados

- `src/shared/styles/tokens.scss`, `base.scss`, `components.scss`, `layout.scss`, `editorial.scss`
- `src/shared/ui/Button.astro`, `CopyLinkButton.astro`, `MediaFigure.astro`
- `src/shared/layouts/BaseLayout.astro`
- `src/shared/domain/rules.ts`
- `src/pages/index.astro`, `404.astro`, `busca/index.astro`, `obras/index.astro`, `obras/[slug].astro`, `robots.txt.ts`
- `public/favicon.svg` (criado), `public/robots.txt` (removido em favor de `src/pages/robots.txt.ts`)
- `tests/unit/domain-rules.test.ts`, `tests/e2e/home-buttons-and-pages.spec.ts`
- `README.md`, `docs/design/DESIGN-SYSTEM.md`, `docs/testing/TEST-PLAN.md`, `docs/roadmap/implementation-status.md`, `docs/CHANGELOG.md`

## 10. Testes executados

- `npm run format:check`: **PASS**
- `npm run lint`: **PASS**
- `npm run check`: **PASS**
- `npm run test`: **PASS** (todas as suítes Vitest incluindo `withBasePath` e `resolveAssetUrl`)
- `npm run build:demo`: **PASS**
- `npm run build` (com `content:validate`, `check-isolation.mjs` e `pagefind`): **PASS**
- `npm run test:e2e`: **PASS** (11/11 testes Playwright em Chromium)
- Build GitHub Pages (`ASTRO_BASE_PATH=/blog/`): **PASS** (0 erros HTTP)

## 11. Screenshots comparativas

Salvas e inspecionadas visualmente em `docs/reports/evidence/phase-42/`:

- `before/`: `home-editorial-dark.png`, `home-editorial-light.png`, `home-editorial-mobile-dark.png`
- `after/`: `home-editorial-dark.png`, `home-editorial-light.png`, `home-editorial-mobile-dark.png`, `home-editorial-mobile-light.png`, `home-demo-dark.png`, `home-demo-light.png`, `buttons-group-dark.png`, `buttons-hover-dark.png`, `buttons-focus-dark.png`, `header-dark.png`, `footer-dark.png`

## 12. Pendências e limitações

- No modo demonstrativo, os SVGs `public/demo-assets/cover-01..03.svg` são gerados sob demanda e removidos do build real; a gestão estruturada de imagens locais e placeholders editoriais será consolidada na Fase 43.

## 13. Critérios de aceitação

- [x] Texto do botão primário completamente visível.
- [x] Contraste adequado em todos os estados (>= 4.5:1 WCAG 2.2 AA).
- [x] Botões secundários visualmente consistentes.
- [x] Alturas (`42px`) e espaçamentos padronizados.
- [x] Links globais não interferem indevidamente nos botões.
- [x] Home sem publicações visualmente agradável.
- [x] Home demonstrativa preservada.
- [x] Footer corretamente posicionado.
- [x] Header e conteúdo alinhados.
- [x] Temas claro e escuro validados.
- [x] Responsividade validada (320px a 1920px).
- [x] Links internos funcionando no GitHub Pages (`/blog/`).
- [x] Imagens e assets carregados corretamente.
- [x] Ausência de regressões nas demais páginas.
- [x] Testes e builds executados.
- [x] Evidências visuais geradas.
- [x] Documentação atualizada.

## 14. Conclusão

A Fase 42 está **CONCLUÍDA**, com a causa raiz do problema dos botões eliminada, variantes semânticas acessíveis consolidadas, Home refinada e compatibilidade integral com GitHub Pages verificada em build real.
