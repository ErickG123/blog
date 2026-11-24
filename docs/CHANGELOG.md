# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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
