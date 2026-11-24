# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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
