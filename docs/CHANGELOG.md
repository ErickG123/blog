# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Fixed & Changed

- **Fase 42 (Refinamento da Home, Correção de Botões e Compatibilidade com GitHub Pages)**:
  - Corrigido conflito de especificidade entre `.ma-prose a` e `.ma-btn` (texto vermelho invisível sobre fundo vermelho no botão primário e texto vermelho em botões secundários).
  - Consolidadas as variantes semânticas de `Button.astro` / `.ma-btn` (`primary`, `secondary`, `outline`, `ghost`, `link`), dimensões padronizadas (`42px` de altura, `18px` padding horizontal, `8px` radius), tokens dedicados com contraste WCAG 2.2 AA (`>= 4.5:1`) nos temas claro e escuro, e `.ma-btn-group` responsivo.
  - Refinada a composição editorial da Home sem publicações (`.ma-home-intro`) com linguagem natural, ícones Lucide e preservação da Home demonstrativa com `resolveAssetUrl` e formatação `pt-BR`.
  - Consolidada a compatibilidade com GitHub Pages em subdiretório (`ASTRO_BASE_PATH=/blog/`): `withBasePath` e `resolveAssetUrl` centralizados, `public/favicon.svg`, `src/pages/robots.txt.ts` dinâmico estático e normalização de `baseUrl` no Pagefind.
- **Fase 43 (Gerenciamento de Mídia Local, Otimização e Imagens Editoriais)**:
  - Adicionado `ADR-0005-local-media-pipeline.md` e CLI completo `scripts/media.mjs` (`media:import`, `media:optimize`, `media:validate`, `media:stats`, `media:find-duplicates`, `media:find-unused`) com `sharp` direto em `devDependencies`.
  - Consolidado `MediaFigure.astro` com `astro:assets` (`import.meta.glob`), 9 variantes semânticas, placeholder `cover-fallback.svg` e contrato de procedência (`rightsStatus`, `sourceUrl`, `decorative`).
- **Fase 44 (CLI de Produção Editorial, Prévia e Publicação Controlada)**:
  - Consolidado `scripts/content-cli.mjs` (`content:new`, `content:list`, `content:status`, `content:doctor`, `content:preview`, `content:publish`) com 12 templates compatíveis com schemas reais, escrita atômica, colisão case-insensitive, prévia local isolada (`dist-preview/`, `INCLUDE_DRAFTS=true`, `noindex`) e confirmação explícita `--confirm-publish`.
- **Fase 45 (Preparação das Primeiras Publicações Reais)**:
  - Adicionado suporte opcional `status: 'draft' | 'published'` nas entidades de catálogo para isolamento seguro antes da aprovação editorial.
  - Criados 5 rascunhos editoriais iniciais (`draft`), 4 fichas factuais vinculadas (`draft`) e matriz de aprovação humana em `docs/editorial/primeiras-publicacoes.md`.
- **Fase 46 (Auditoria Final de Produção e Prontidão para Lançamento)**:
  - Corrigido layout de destaque sem capa (`.ma-featured--no-cover`), adicionado `media:validate` ao CI (`.github/workflows/ci.yml`), criado `docs/editorial/launch-checklist.md` e concluída auditoria final com 29 testes unitários, 11 E2E e 0 vulnerabilidades em produção.

## [1.1.0] - 2026-11-23

### Added

- **Fases 24–25 (Auditoria Baseline e Ambiente Demo Isolado)**:
  - Auditoria baseline (`docs/audits/AUDIT-PHASE-24-BASELINE.md`) com matriz de riscos `MA-AUD-001` a `MA-AUD-008`.
  - Scripts portáveis `dev:demo`, `build:demo` e `preview:demo` usando `dist-demo/` separado, banner visual e `<meta name="robots" content="noindex, nofollow" />`.
  - Conjunto completo de fixtures sintéticas (40 obras: 20 mangás, 15 animes, 5 manhwas; 20 reviews, 15 artigos, 10 guias, 10 posts de colecionismo, 20 edições, 25 criadores, 10 editoras, 10 estúdios, 12 gêneros, 30 tags + SVGs locais originais).
  - Verificador automático de isolamento `scripts/check-isolation.mjs` integrado ao `npm run build`.
- **Fases 26–34 (Identidade, Home, Leitura, Biblioteca, Colecionismo, Busca e Responsividade)**:
  - Header com busca acessível (`@lucide/astro`), Home redesenhada (destaque editorial com capa no demo; introdução limpa sem caixas tracejadas no real vazio).
  - TOC automático em reviews e artigos longos, botão acessível `CopyLinkButton`, relacionados reais e `data-pagefind-ignore` em `SpoilerBlock`.
  - Biblioteca `/obras/` com capas e filtro por tipo sincronizado na URL (`?tipo=`); Colecionismo com tabela comparativa responsiva.
  - Página `/busca/` com campo `<input type="search">` sempre visível, integração direta com `/pagefind/pagefind.js` e aviso claro quando o índice não está disponível em `dev`.
- **Fases 35–38 (CLI Editorial, Cobertura, SEO/JSON-LD e Release 1.1.0)**:
  - `scripts/new-content.mjs` com `--dry-run`, `--out-dir` e bloqueio de path traversal + `docs/editorial/EDITORIAL-GUIDE.md`.
  - Cobertura de testes via `@vitest/coverage-v8` (`npm run test:coverage`), JSON-LD estruturado em `BaseLayout.astro` e auditoria final `AUDIT-PHASE-38-RELEASE.md`.

## [1.0.0] - 2026-11-23

### Added

- **Fases 00–03 (Fundação, Visão, Domínio e Content Collections)**:
  - Projeto Astro estático (`output: 'static'`), TypeScript `strict`, SCSS, npm, ESLint, Prettier, Vitest, Playwright, Husky e Commitlint.
  - Governança SDD (`AGENTS.md`, `.agents/`, ADRs 0001–0003, SPECs 0001–0002, mapa de navegação, política editorial e matriz de rastreabilidade).
  - Content Collections tipadas com Zod, `@astrojs/mdx`, validador transversal (`npm run content:validate`) e isolamento de rascunhos, agendados e fixtures (`INCLUDE_FIXTURES=true`).
- **Fases 04–13 (Design System, Layout e Rotas Editoriais/Catálogo)**:
  - Tokens semânticos grafite/vermelho/roxo discreto, temas Claro/Escuro/Sistema sem flash, `@lucide/astro`, componentes primitivos e `SpoilerBlock` acessível sem JS.
  - Layout global responsivo com skip-link, `404.astro` e páginas completas: Home (`/`), Biblioteca (`/obras/`), Reviews (`/reviews/`), Artigos (`/artigos/`), Guias (`/guias/`), Colecionismo (`/colecionismo/`), Criadores, Editoras, Estúdios e Tags.
- **Fases 14–23 (Busca, CLI, SEO/RSS, Institucionais, Auditorias e CI/CD)**:
  - Pesquisa global estática via **Pagefind** (`/busca/`).
  - CLI editorial `npm run content:new` para criação de rascunhos válidos.
  - Feed RSS (`/rss.xml`), sitemap XML (`/sitemap-index.xml`), `robots.txt`, `_headers` de segurança e `_redirects` para Cloudflare Pages.
  - Páginas institucionais (`/sobre/`, `/politica-editorial/`, `/contato/`).
  - Suítes Vitest (13 testes) e Playwright E2E (6 testes + evidências visuais em `docs/reports/evidence/phase-04/` e `phase-20/`).
  - Pipeline de CI em `.github/workflows/ci.yml`.
