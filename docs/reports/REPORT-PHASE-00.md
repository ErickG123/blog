# Relatório da Fase 00 — Fundação e governança

- **Data**: 2026-11-23
- **Status**: CONCLUÍDO

## 1. Objetivo

Inicializar o repositório **Mangá Atlas** como um projeto Astro estático executável, reprodutível e governado por SDD, com qualidade automatizada (TypeScript strict, ESLint, Prettier, Vitest, Playwright, Husky e Commitlint) e documentação fundacional, sem antecipar funcionalidades ou design de fases posteriores.

## 2. Estado anterior

- **Diretório**: `C:\Users\erick\Documentos\Github\blog`
- **Sistema Operacional**: Windows (`Microsoft Windows NT 10.0.26300.0`)
- **Runtime**: Node.js `v24.18.0` (LTS) e npm `11.5.2`
- **Git**: `git version 2.40.0.windows.1`, porém o diretório ainda não era um repositório Git (sem `.git`).
- **Conteúdo pré-existente preservado**: `prompts/`, `PROMPT-ORQUESTRADOR.md`, `REGRAS-COMUNS.md`, `ROADMAP.md` (pacote original de prompts SDD do usuário).

## 3. Documentos lidos

- `README.md` (original do pacote de prompts)
- `ROADMAP.md`
- `REGRAS-COMUNS.md`
- `PROMPT-ORQUESTRADOR.md`

## 4. Decisões tomadas

- **ADR-0001** (`docs/adr/ADR-0001-stack-and-static-first.md`): adotada arquitetura static-first com Astro `^7.4.13` (`output: 'static'`), TypeScript `^6.0.3` (`strict`), SCSS (`sass ^1.108.2`), npm como único gerenciador (`package-lock.json`), ESLint, Prettier, Vitest, Playwright, Husky e Commitlint.
- **Compatibilidade TypeScript 6.x**: a instalação inicial trouxe `typescript@^7.0.2`, que causou erro em `@astrojs/check` e `typescript-eslint` (ambos exigem TypeScript 6.x no momento). A dependência foi fixada em `typescript@^6.0.3` junto com `@types/node@^26.6.6`, e `baseUrl` depreciado foi removido de `tsconfig.json`.
- **Preservação de arquivos locais**: o pacote de prompts do usuário (`prompts/`, `ROADMAP.md`, `REGRAS-COMUNS.md`, `PROMPT-ORQUESTRADOR.md`) foi preservado integralmente e excluído de formatação automática via `.prettierignore`.
- **Git local**: inicializado repositório local com `git init -b main`, sem configuração de remote inventado.
- **Escopo estrito**: MDX, Pagefind, Lucide e design system não foram instalados nem antecipados nesta fase.

## 5. Arquivos criados ou alterados

- **Configuração e tooling**: `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.mjs`, `.prettierignore`, `commitlint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`, `.editorconfig`, `.nvmrc`, `.husky/commit-msg`, `.husky/pre-commit`.
- **Aplicação mínima e testes smoke**: `src/pages/index.astro`, `src/shared/styles/base.scss`, `src/shared/utils/project.ts`, `tests/unit/smoke.test.ts`, `tests/e2e/smoke.spec.ts`.
- **Governança SDD e documentação**: `AGENTS.md`, `.agents/rules/engineering.md`, `.agents/rules/content-and-ui.md`, `.agents/skills/sdd-phase-execution/SKILL.md`, `docs/adr/ADR-0001-stack-and-static-first.md`, `docs/templates/SPEC-TEMPLATE.md`, `docs/templates/ADR-TEMPLATE.md`, `docs/templates/AUDIT-TEMPLATE.md`, `docs/templates/REPORT-TEMPLATE.md`, `docs/roadmap/implementation-status.md`, `docs/testing/TEST-PLAN.md`, `README.md`, `CHANGELOG.md`, `docs/reports/REPORT-PHASE-00.md`.

## 6. Comandos executados e resultados reais

```text
npm ci
> added 571 packages, and audited 572 packages in 20s — found 0 vulnerabilities (husky executado via prepare)

npm run format:check
> All matched files use Prettier code style! (exit 0)

npm run lint
> eslint . (exit 0)

npm run check
> astro check: Result (10 files): 0 errors, 0 warnings, 0 hints
> tsc --noEmit (exit 0)

npm run test
> vitest run: Test Files 1 passed (1), Tests 1 passed (1)

npm run build
> astro build: output "static", 1 page(s) built (/index.html) in 410ms

npm run test:e2e
> playwright test: 1 passed (3.6s) — [chromium] tests/e2e/smoke.spec.ts (servido via astro preview)

astro dev --host 127.0.0.1 --port 4322 + HTTP GET /
> astro v7.4.13 ready in 195 ms; [200] / 22ms; DEV_STATUS=200

Commitlint (válido): "feat(core): inicializar fundacao do projeto" | npx commitlint -> exit 0
Commitlint (inválido): "mensagem sem padrao convencional" | npx commitlint -> exit 1 (subject-empty, type-empty)
```

## 7. Testes e evidências

- **Unitário (Vitest)**: `tests/unit/smoke.test.ts` passou (1/1).
- **E2E (Playwright + Chromium)**: `tests/e2e/smoke.spec.ts` passou (1/1), comprovando resposta HTTP 200, título `Mangá Atlas`, atributo `lang="pt-BR"` e heading principal visível via `npm run preview`.
- **Evidências visuais (screenshots)**: `N/A` na Fase 00, pois não há implementação de design system ou interface visual definitiva (prevista para a Fase 04).

## 8. Critérios de aceitação

| Critério                                                                              | Status | Evidência                                                                                                                         |
| ------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Instalação limpa com lockfile único (`npm ci`)                                        | PASS   | `npm ci` instalou 571 pacotes com 0 vulnerabilidades usando `package-lock.json`.                                                  |
| Servidor de desenvolvimento (`dev`) funciona                                          | PASS   | `astro dev` respondeu HTTP `200` em `http://127.0.0.1:4322/`.                                                                     |
| Build estático e preview funcionam com smoke da página servida                        | PASS   | `npm run build` gerou `dist/index.html` e `npm run test:e2e` validou a página via `astro preview` em Chromium.                    |
| TypeScript strict, lint e formatter reais e passando                                  | PASS   | `npm run check`, `npm run lint` e `npm run format:check` passaram com exit code 0.                                                |
| Testes unitários e E2E mínimos executáveis                                            | PASS   | `npm run test` (1/1) e `npm run test:e2e` (1/1) executados e aprovados.                                                           |
| Hooks Husky e Commitlint reais (aceita válido, rejeita inválido)                      | PASS   | `.husky/commit-msg` e `.husky/pre-commit` configurados; `commitlint` retornou exit 0 para mensagem válida e exit 1 para inválida. |
| Estrutura SDD, `AGENTS.md`, templates, ADR-0001, `TEST-PLAN.md` e status das 24 fases | PASS   | Todos os artefatos criados e atualizados no repositório.                                                                          |
| `README.md` com comandos efetivamente disponíveis e árvore sem boilerplate inútil     | PASS   | Scripts documentados correspondem 1:1 a `package.json`; sem dependências fora de escopo.                                          |

## 9. Riscos e pendências

- **Dependência de binário de navegador**: `npm run test:e2e` exige o binário Chromium do Playwright instalado no ambiente (`npx playwright install chromium`). Neste ambiente o Chromium já estava disponível e o teste passou; em novas máquinas ou CI será necessário instalar o navegador antes do E2E.
- **TypeScript 7.x**: quando `@astrojs/check` (ou seu sucessor `@astrojs/ts-content-mapper`) e `typescript-eslint` suportarem TypeScript 7 estável, a atualização poderá ser avaliada em ADR ou fase de manutenção.

## 10. Condição para a fase seguinte

**Pronta para a Fase 01 — Visão e requisitos.** Todos os critérios obrigatórios da Fase 00 foram comprovados com evidências reais.
