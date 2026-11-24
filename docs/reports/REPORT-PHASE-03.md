# Relatório da Fase 03 — Content Collections e integridade

- **Data**: 2026-11-23
- **Status**: CONCLUÍDO

## 1. Objetivo

Configurar MDX, Content Collections tipadas com Zod, validador transversal de integridade (`content:validate`) integrado ao build, seletores públicos com isolamento de rascunhos/agendados/fixtures e fixtures sintéticas de validação.

## 2. Estado anterior

Fases 00, 01 e 02 concluídas (`REPORT-PHASE-02.md`).

## 3. Documentos lidos

- `AGENTS.md`, `docs/adr/ADR-0002-content-and-domain.md`, `docs/architecture/domain.md`, `docs/reports/REPORT-PHASE-02.md`, `prompts/PROMPT-03-content-collections.md`.

## 4. Decisões tomadas

- Instalado `@astrojs/mdx` e `zod`, configurados em `astro.config.mjs` e `src/content.config.ts` via `glob` loader.
- Criado `scripts/validate-content.mjs` (Node 24 nativo, sem dependência de transpilador extra) integrado ao `npm run build`.
- Fixtures sintéticas marcadas com `isFixture: true` e excluídas por padrão em `src/features/content/content.selectors.ts` (habilitáveis via `INCLUDE_FIXTURES=true`).

## 5. Arquivos criados ou alterados

- `astro.config.mjs`, `package.json`, `tsconfig.json`
- `src/content.config.ts`
- `src/features/content/content.schema.ts`
- `src/features/content/content.validator.ts`
- `src/features/content/content.selectors.ts`
- `scripts/validate-content.mjs`
- `src/content/**` (autor, gênero, tag base + fixtures sintéticas marcadas com `isFixture: true`)
- `tests/unit/content-integrity.test.ts`
- `docs/specifications/SPEC-0002-content-collections.md`
- `docs/testing/TEST-PLAN.md`, `docs/roadmap/implementation-status.md`, `docs/reports/REPORT-PHASE-03.md`

## 6. Comandos executados e resultados reais

```text
npm run content:validate && npm run lint && npm run check && npm run test && npm run build
```

Todos os checks finalizados com exit code 0.

## 7. Testes e evidências

- `tests/unit/content-integrity.test.ts`: 3 testes cobrindo bundle válido, rejeição de slug duplicado, referência quebrada, escopo incompatível com `work.kind` e rating fora da escala.

## 8. Critérios de aceitação

| Critério                                                                                                           | Status | Evidência                                                                             |
| ------------------------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------- |
| Build e `content:validate` rejeitam slugs duplicados, refs quebradas, ratings fora de escala e tipos incompatíveis | PASS   | `content.validator.ts`, `scripts/validate-content.mjs` e `content-integrity.test.ts`. |
| Relógio fixado comprova exclusão de futuro/rascunho/fixtures e ordenação determinística                            | PASS   | `domain-rules.test.ts` + `content.selectors.ts`.                                      |
| Build real sem dados e modo demonstração suportados sem vazamento de dados privados                                | PASS   | `npm run build` concluído com `isFixture` isolado por padrão.                         |

## 9. Riscos e pendências

- Nenhum bloqueio aberto.

## 10. Condição para a fase seguinte

**Pronta para a Fase 04 — Design system e identidade visual.**
