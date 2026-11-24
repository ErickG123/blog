# Relatório da Fase 04 — Design system e identidade visual

- **Data**: 2026-11-23
- **Status**: CONCLUÍDO

## 1. Objetivo

Estabelecer tokens semânticos CSS/SCSS, identidade visual editorial (grafite/vermelho/roxo discreto), sistema de temas Claro/Escuro/Sistema sem flash, componentes primitivos acessíveis com `@lucide/astro` e evidências visuais reais.

## 2. Estado anterior

Fase 03 concluída (`REPORT-PHASE-03.md`).

## 3. Decisões tomadas

- **ADR-0003**: tokens semânticos em `src/shared/styles/tokens.scss`, script antecipado no `<head>` com fallback seguro sem `localStorage`, stack tipográfica nativa e ícones `@lucide/astro`.
- Componente `SpoilerBlock.astro` baseado em `<details>` nativo (funcional por teclado e sem JavaScript).

## 4. Arquivos criados ou alterados

- `docs/design/DESIGN-SYSTEM.md`, `docs/adr/ADR-0003-theme-and-design-tokens.md`
- `src/shared/styles/tokens.scss`, `src/shared/styles/base.scss`, `src/shared/styles/components.scss`
- `src/shared/ui/{ThemeToggle,SectionHeading,TagChip,Button,EmptyState,SpoilerBlock,MediaFigure}.astro`
- `tests/e2e/visual-phase04.spec.ts`
- `docs/reports/evidence/phase-04/{home-desktop-1440-light,home-desktop-1440-dark,home-mobile-390-light,home-mobile-390-dark}.png`

## 5. Validação e evidências

- `npm run format:check`, `lint`, `check`, `test`, `build`, `test:e2e`: **PASS**.
- Evidências visuais capturadas em desktop `1440x900` e mobile `390x844` em ambos os temas; checagem `320px` confirmou ausência de overflow horizontal (`scrollWidth <= clientWidth`).

## 6. Critérios de aceitação

| Critério                                                               | Status | Evidência                                                          |
| ---------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| Tokens semânticos sem cores hardcoded dispersas; contrastes ajustados  | PASS   | `tokens.scss` e `DESIGN-SYSTEM.md`.                                |
| Tema Claro/Escuro/Sistema persiste e respeita `prefers-reduced-motion` | PASS   | `ThemeToggle.astro` e `BaseLayout.astro`.                          |
| Evidências visuais reais desktop/mobile/320px sem overflow             | PASS   | `docs/reports/evidence/phase-04/*.png` + `visual-phase04.spec.ts`. |

## 7. Condição para a fase seguinte

**Pronta para a Fase 05 — Layout e navegação global.**
