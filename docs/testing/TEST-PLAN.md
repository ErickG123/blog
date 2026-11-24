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
