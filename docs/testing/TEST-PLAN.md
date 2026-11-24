# Plano Único de Testes — Mangá Atlas

Este é o checklist central de verificação do projeto. Mantenha os IDs estáveis, marque apenas itens comprovados com evidência real e não apague o histórico.

## Legenda

- `[x]` Comprovado (PASS)
- `[ ]` Pendente ou não executado
- `N/A` Não aplicável na fase atual (com justificativa)

## Fase 00 — Fundação e governança

| ID       | Verificação                                          | Comando / Método           | Status | Evidência / Observação                                               |
| -------- | ---------------------------------------------------- | -------------------------- | ------ | -------------------------------------------------------------------- |
| `T00-01` | Instalação limpa reprodutível com lockfile único     | `npm ci`                   | `[x]`  | 571 pacotes instalados, 0 vulnerabilidades, `husky` preparado        |
| `T00-02` | Formatação de código                                 | `npm run format:check`     | `[x]`  | `All matched files use Prettier code style!`                         |
| `T00-03` | Lint (TS + Astro)                                    | `npm run lint`             | `[x]`  | `eslint .` finalizado com exit code 0                                |
| `T00-04` | Verificação de tipos (`astro check` + `tsc`)         | `npm run check`            | `[x]`  | `0 errors, 0 warnings, 0 hints` + `tsc --noEmit` exit code 0         |
| `T00-05` | Testes unitários smoke (Vitest)                      | `npm run test`             | `[x]`  | `tests/unit/smoke.test.ts` — 1/1 passed                              |
| `T00-06` | Build estático (`dist/`)                             | `npm run build`            | `[x]`  | 1 página (`/index.html`) gerada em `dist/` (`output: "static"`)      |
| `T00-07` | Commitlint aceita mensagem válida e rejeita inválida | `npx commitlint`           | `[x]`  | Válida (`feat(core): ...`) exit 0; inválida exit 1 (2 problemas)     |
| `T00-08` | Smoke E2E em navegador (Playwright + preview)        | `npm run test:e2e`         | `[x]`  | `tests/e2e/smoke.spec.ts` — 1/1 passed em Chromium (`astro preview`) |
| `T00-09` | Smoke do servidor de desenvolvimento (`astro dev`)   | `astro dev` + HTTP GET `/` | `[x]`  | Validado na Fase 00 (ver `REPORT-PHASE-00.md`)                       |

## Fase 01 — Visão e requisitos

| ID       | Verificação                                                                   | Comando / Método                        | Status | Evidência / Observação                                   |
| -------- | ----------------------------------------------------------------------------- | --------------------------------------- | ------ | -------------------------------------------------------- |
| `T01-01` | Artefatos de visão, SPEC-0001, mapa de navegação, política editorial e matriz | Revisão documental                      | `[x]`  | 5 documentos criados em `docs/` e `docs/specifications/` |
| `T01-02` | Integridade do repositório após documentação                                  | `format:check`, `lint`, `check`, `test` | `[x]`  | Exit code 0 em todos os checks                           |

## Fase 02 — Arquitetura e domínio

| ID       | Verificação                                                                                     | Comando / Método   | Status | Evidência / Observação                                                    |
| -------- | ----------------------------------------------------------------------------------------------- | ------------------ | ------ | ------------------------------------------------------------------------- |
| `T02-01` | Modelos TS compilam sem erros (`catalog.model.ts`, `editorial.model.ts`, `rules.ts`)            | `npm run check`    | `[x]`  | `astro check` + `tsc --noEmit` exit code 0                                |
| `T02-02` | Testes unitários de regras puras de domínio (slug, publicação, notas, ordenação, datas, ciclos) | `npm run test`     | `[x]`  | `tests/unit/domain-rules.test.ts` aprovado                                |
| `T02-03` | ADR-0002 e diagrama Mermaid versionado                                                          | Revisão documental | `[x]`  | `docs/adr/ADR-0002-content-and-domain.md` e `docs/architecture/domain.md` |

## Fase 03 — Content Collections e integridade

| ID       | Verificação                                                           | Comando / Método           | Status | Evidência / Observação                                              |
| -------- | --------------------------------------------------------------------- | -------------------------- | ------ | ------------------------------------------------------------------- |
| `T03-01` | Validação de schemas e integridade transversal (`content:validate`)   | `npm run content:validate` | `[x]`  | Executado com exit code 0 e integrado ao `npm run build`            |
| `T03-02` | Testes unitários de integridade (slugs, refs, rating, escopo)         | `npm run test`             | `[x]`  | `tests/unit/content-integrity.test.ts` aprovado                     |
| `T03-03` | Build estático com MDX + Content Collections e isolamento de fixtures | `npm run build`            | `[x]`  | `astro build` com `output: "static"` e fixtures isoladas por padrão |

## Fases 04–23 — UI, Rotas, Busca, SEO, Auditorias e Estabilização 1.0.0

| ID       | Verificação                                                           | Comando / Método                    | Status | Evidência / Observação                                                  |
| -------- | --------------------------------------------------------------------- | ----------------------------------- | ------ | ----------------------------------------------------------------------- |
| `T04-01` | Design system, temas Claro/Escuro/Sistema e evidências visuais        | `tests/e2e/visual-phase04.spec.ts`  | `[x]`  | 4 screenshots em `docs/reports/evidence/phase-04/` + 320px sem overflow |
| `T14-01` | Indexação Pagefind no build estático                                  | `npm run build`                     | `[x]`  | `dist/pagefind` gerado (idioma `pt-br`)                                 |
| `T16-01` | Feed RSS e Sitemap XML válidos                                        | `tests/e2e/routes-and-a11y.spec.ts` | `[x]`  | `/rss.xml` e `/sitemap-index.xml` retornam HTTP 200                     |
| `T19-01` | Suíte completa de testes unitários e E2E                              | `npm run test` + `npm run test:e2e` | `[x]`  | Vitest 13/13 + Playwright 6/6 aprovados                                 |
| `T20-01` | Auditoria visual e responsividade 320px em todas as rotas principais  | `tests/e2e/routes-and-a11y.spec.ts` | `[x]`  | 11 rotas validadas + screenshots em `docs/reports/evidence/phase-20/`   |
| `T23-01` | Build real (fixtures isoladas) e build demo (`INCLUDE_FIXTURES=true`) | `npm run build`                     | `[x]`  | Ambos concluídos sem erros                                              |

## Fases 24–38 — Evolução Mangá Atlas v1.1.0

| ID       | Verificação                                                                                          | Comando / Método                             | Status | Evidência / Observação                            |
| -------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------ | ------------------------------------------------- |
| `T24-01` | Auditoria baseline e matriz `MA-AUD`                                                                 | Revisão `AUDIT-PHASE-24-BASELINE.md`         | `[x]`  | 8 riscos mapeados e encaminhados para fases 25–38 |
| `T25-01` | Metas de fixtures (40 obras, 20 reviews, 15 artigos, 10 guias, 10 colecionismo) e build demo isolado | `npm run build:demo`                         | `[x]`  | `dist-demo/` gerado com `noindex` e Pagefind      |
| `T25-02` | Isolamento após builds alternados (`build:demo` -> `build`)                                          | `npm run build` (`check-isolation.mjs`)      | `[x]`  | Zero marcadores ou `demo-assets` em `dist/`       |
| `T33-01` | Campo de busca sempre presente e busca Pagefind funcional                                            | `tests/e2e/search-and-responsive.spec.ts`    | `[x]`  | `#ma-search-input` visível e status acessível     |
| `T34-01` | Responsividade 320/390/768/1024/1440px sem overflow                                                  | `tests/e2e/search-and-responsive.spec.ts`    | `[x]`  | Validado em Chromium + screenshots `phase-34/`    |
| `T35-01` | CLI editorial (`--dry-run`, path traversal, sem sobrescrita)                                         | `tests/unit/cli-editorial.test.ts`           | `[x]`  | Testado em diretório temporário isolado           |
| `T36-01` | Cobertura Vitest + suíte E2E completa                                                                | `npm run test:coverage` + `npm run test:e2e` | `[x]`  | Todos os testes unitários e E2E aprovados         |

## Fase 42 — Refinamento da Home, Botões e Compatibilidade GitHub Pages

| ID       | Verificação                                                                                   | Comando / Método                                          | Status | Evidência / Observação                                                                     |
| -------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------ |
| `T42-01` | Contraste WCAG 2.2 AA (>= 4.5:1) e alturas padronizadas (42px) nos botões da Home             | `tests/e2e/home-buttons-and-pages.spec.ts`                | `[x]`  | Primário `5.61:1` e secundários `>= 13.7:1` em claro/escuro + hover + focus-visible        |
| `T42-02` | Navegação das ações principais, favicon e footer no final da viewport                         | `tests/e2e/home-buttons-and-pages.spec.ts`                | `[x]`  | `/sobre/`, `/politica-editorial/`, `/busca/`, `/favicon.svg` 200 e footer no rodapé        |
| `T42-03` | Responsividade sem overflow horizontal em 320, 375, 390, 768, 1024, 1440 e 1920px             | `tests/e2e/home-buttons-and-pages.spec.ts`                | `[x]`  | Zero overflow em todas as 7 larguras                                                       |
| `T42-04` | Resolução de base path e assets locais (`withBasePath`, `resolveAssetUrl`)                    | `tests/unit/domain-rules.test.ts`                         | `[x]`  | Unit tests aprovados                                                                       |
| `T42-05` | Build real para GitHub Pages com `ASTRO_BASE_PATH=/blog/` e Pagefind + `robots.txt`           | `astro build` + `pagefind` + servidor `/blog/` Playwright | `[x]`  | Zero 404, canonical `/blog/`, favicon `/blog/favicon.svg`, Pagefind e `robots.txt` válidos |
| `T42-06` | Evidências visuais antes/depois (editorial, demo, mobile, botões, hover/focus, header/footer) | `docs/reports/evidence/phase-42/`                         | `[x]`  | Screenshots `before/` e `after/` inspecionadas visualmente                                 |

## Fase 43 — Gerenciamento de Mídia Local, Otimização e Imagens Editoriais

| ID       | Verificação                                                                                      | Comando / Método                      | Status | Evidência / Observação                                                             |
| -------- | ------------------------------------------------------------------------------------------------ | ------------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| `T43-01` | Importação local (JPEG/PNG/Unicode/espaços), `--dry-run`, segurança (traversal/SVG/URL/corrupto) | `tests/unit/media-cli.test.ts`        | `[x]`  | 4 blocos de teste (Vitest 26/26) em diretório temporário isolado                   |
| `T43-02` | Validação de mídia, inventário, duplicatas e arquivos sem uso                                    | `npm run media:validate/stats/find-*` | `[x]`  | Exit code 0; inventário salvo em `docs/reports/evidence/phase-43/media-stats.json` |

## Fase 44 — CLI de Produção Editorial, Prévia e Publicação Controlada

| ID       | Verificação                                                                           | Comando / Método                                 | Status | Evidência / Observação                                                        |
| -------- | ------------------------------------------------------------------------------------- | ------------------------------------------------ | ------ | ----------------------------------------------------------------------------- |
| `T44-01` | Criação de 8 entidades, colisão case-insensitive, `list`, `status` e `publish` seguro | `tests/unit/content-cli-phase44.test.ts`         | `[x]`  | 3 blocos E2E em diretório temporário isolado (Vitest 29/29)                   |
| `T44-02` | Diagnóstico unificado (`content:doctor`) e isolamento de `dist-preview/`              | `npm run content:doctor` + `check-isolation.mjs` | `[x]`  | Exit code 0; `Prévia local de rascunhos` e `[PENDENTE]` bloqueados em `dist/` |

## Fase 45 — Preparação das Primeiras Publicações Reais

| ID       | Verificação                                                                            | Comando / Método                                 | Status | Evidência / Observação                                                             |
| -------- | -------------------------------------------------------------------------------------- | ------------------------------------------------ | ------ | ---------------------------------------------------------------------------------- |
| `T45-01` | 5 rascunhos + 4 fichas de catálogo em `draft` válidos sem notas/opiniões inventadas    | `npm run content:doctor`                         | `[x]`  | Exit code 0; 0 publicações reais, 5 rascunhos reais                                |
| `T45-02` | Prévia local (`dist-preview/`, 51 páginas) seguida de build real (`dist/`, 42 páginas) | `content:preview --build-only` + `npm run build` | `[x]`  | Zero vazamento de rascunhos ou `[PENDENTE]` em `dist/`; screenshots em `phase-45/` |

## Fase 46 — Auditoria Final de Produção e Prontidão para Lançamento

| ID       | Verificação                                                                              | Comando / Método                            | Status | Evidência / Observação                                                                   |
| -------- | ---------------------------------------------------------------------------------------- | ------------------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `T46-01` | Bateria completa (`format:check`, `lint`, `check`, `content:doctor`, `test`, `test:e2e`) | Pipeline completo Fase 46                   | `[x]`  | Vitest 29/29 + Playwright 11/11 + 0 erros de lint/check/format                           |
| `T46-02` | Sequência `build:demo` -> `content:preview` -> `build` + `npm audit --omit=dev`          | `scripts/check-isolation.mjs` + `npm audit` | `[x]`  | Isolamento 100% em `dist/` (42p); 0 vulnerabilidades em produção; evidências `phase-46/` |
