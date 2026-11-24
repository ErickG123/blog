# Relatório da Fase 05 — Layout e navegação global

- **Data**: 2026-11-23
- **Status**: CONCLUÍDO

## 1. Objetivo

Implementar o layout global (`BaseLayout.astro`), cabeçalho com wordmark provisório, navegação principal semântica com `aria-current`, skip-link, rodapé institucional e página `404.astro`.

## 2. Arquivos criados ou alterados

- `src/shared/layouts/BaseLayout.astro`
- `src/shared/styles/layout.scss`
- `src/pages/404.astro`

## 3. Validação e critérios de aceitação

| Critério                                                                           | Status | Evidência                                           |
| ---------------------------------------------------------------------------------- | ------ | --------------------------------------------------- |
| Landmarks semânticos (`header`, `nav`, `main`, `footer`), skip-link e foco visível | PASS   | `BaseLayout.astro` e `base.scss`.                   |
| Página `404.astro` amigável com links de retorno                                   | PASS   | `dist/404.html` gerado no build.                    |
| Responsividade e temas aplicados globalmente                                       | PASS   | Validado via Playwright (`visual-phase04.spec.ts`). |

## 4. Condição para a fase seguinte

**Pronta para a Fase 06 — Página inicial.**
