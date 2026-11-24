# Status de Implementação — Mangá Atlas

Este documento é a fonte oficial de acompanhamento das 24 fases SDD (00 a 23). Atualize apenas com base em evidências reais registradas nos relatórios `docs/reports/REPORT-PHASE-NN.md`.

| Fase | Nome                                              | Status    | Relatório                         | Observações                                                                          |
| ---- | ------------------------------------------------- | --------- | --------------------------------- | ------------------------------------------------------------------------------------ |
| 00   | Fundação e governança                             | CONCLUÍDO | `docs/reports/REPORT-PHASE-00.md` | Fundação executável, SDD, checks, Vitest, Playwright e Commitlint validados          |
| 01   | Visão e requisitos                                | CONCLUÍDO | `docs/reports/REPORT-PHASE-01.md` | Visão, SPEC-0001, mapa de navegação, política editorial e matriz                     |
| 02   | Arquitetura e domínio                             | CONCLUÍDO | `docs/reports/REPORT-PHASE-02.md` | ADR-0002, `domain.md`, modelos TS e testes de regras puras                           |
| 03   | Content Collections e integridade                 | CONCLUÍDO | `docs/reports/REPORT-PHASE-03.md` | MDX, Zod, `content:validate`, seletores públicos e isolamento de fixtures            |
| 04   | Design system e identidade visual                 | CONCLUÍDO | `docs/reports/REPORT-PHASE-04.md` | Tokens, temas Claro/Escuro/Sistema, `@lucide/astro`, primitivos e evidências visuais |
| 05   | Layout e navegação global                         | CONCLUÍDO | `docs/reports/REPORT-PHASE-05.md` | `BaseLayout.astro`, skip-link, navegação semântica e `404.astro`                     |
| 06   | Página inicial                                    | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | Home editorial conectada às coleções públicas com estados vazios                     |
| 07   | Biblioteca de obras                               | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/obras/` e `/obras/[slug]/` separando fatos de opinião crítica                      |
| 08   | Sistema de reviews                                | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/reviews/` e `/reviews/[slug]/` com escopo, nota opcional 0–5, veredito e spoilers  |
| 09   | Artigos e análises                                | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/artigos/` e `/artigos/[slug]/` com categoria, tempo de leitura e obras citadas     |
| 10   | Guias e recomendações                             | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/guias/` e `/guias/[slug]/` com listas ordenadas ligadas à biblioteca               |
| 11   | Colecionismo e edições físicas                    | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/colecionismo/` e `/colecionismo/[slug]/` com ficha de edições físicas              |
| 12   | Criadores, editoras e estúdios                    | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/criadores/[slug]/`, `/editoras/[slug]/` e `/estudios/[slug]/`                      |
| 13   | Categorias, tags, filtros e paginação             | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/tags/`, `/tags/[slug]/` e utilitário determinístico `paginateItems`                |
| 14   | Pesquisa global                                   | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/busca/` com Pagefind indexado no `npm run build`                                   |
| 15   | Ferramentas editoriais e CLI                      | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `npm run content:new` e `npm run content:validate`                                   |
| 16   | SEO, RSS e distribuição                           | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/rss.xml`, `/sitemap-index.xml`, `robots.txt` e metatags canônicas/OG               |
| 17   | Páginas institucionais e política editorial       | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `/sobre/`, `/politica-editorial/` e `/contato/`                                      |
| 18   | Conteúdo demonstrativo e cenários de validação    | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | Fixtures sintéticas completas isoladas do build real (`INCLUDE_FIXTURES=true`)       |
| 19   | Testes automatizados e regressão                  | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | 4 suítes Vitest (13 testes) + 3 suítes Playwright E2E (6 testes)                     |
| 20   | Auditoria visual, acessibilidade e responsividade | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | Screenshots desktop/mobile/temas em `phase-20/` e 320px sem overflow                 |
| 21   | Auditoria técnica, segurança e desempenho         | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | Saída 100% estática, zero rastreadores, `_headers` de segurança                      |
| 22   | CI/CD, versionamento e preparação para publicação | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | `.github/workflows/ci.yml`, `_headers`, `_redirects` e `CHANGELOG.md`                |
| 23   | Estabilização final e preparação da versão 1.0.0  | CONCLUÍDO | `docs/reports/REPORT-PHASE-23.md` | Versão `1.0.0` estabilizada e validada integralmente                                 |
