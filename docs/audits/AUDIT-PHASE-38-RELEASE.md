# AUDITORIA-38 — Consolidação Final e Go/No-Go v1.1.0

- **Data**: 2026-11-23
- **Fase**: 38
- **Versão alvo**: `1.1.0`

## 1. Fechamento da Matriz `MA-AUD`

| ID           | Status  | Evidência de fechamento                                                                                                                                                                                             |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MA-AUD-001` | FECHADO | `/busca/` renderiza `<input id="ma-search-input">` sempre visível, integra `/pagefind/pagefind.js` e exibe aviso recuperável em `dev`.                                                                              |
| `MA-AUD-002` | FECHADO | `build:demo` usa `dist-demo/`; `build` real executa `scripts/check-isolation.mjs` removendo `demo-assets` e validando zero vazamento em `dist/`.                                                                    |
| `MA-AUD-003` | FECHADO | `scripts/generate-demo-fixtures.mjs` gerou 40 obras (20 mangás, 15 animes, 5 manhwas), 20 reviews, 15 artigos, 10 guias, 10 colecionismo, 20 edições, 25 criadores, 10 editoras, 10 estúdios, 12 gêneros e 30 tags. |
| `MA-AUD-004` | FECHADO | Home real vazia exibe introdução editorial única e limpa; Home demo exibe destaque com capa + listagens sem duplicação.                                                                                             |
| `MA-AUD-005` | FECHADO | `SpoilerBlock.astro` possui `data-pagefind-ignore`.                                                                                                                                                                 |
| `MA-AUD-006` | FECHADO | `/obras/` possui filtro funcional por tipo sincronizado com `?tipo=` na URL.                                                                                                                                        |
| `MA-AUD-007` | FECHADO | `scripts/new-content.mjs` com `--dry-run`, `--out-dir` e bloqueio de path traversal validado por `tests/unit/cli-editorial.test.ts`.                                                                                |
| `MA-AUD-008` | FECHADO | `@vitest/coverage-v8` configurado (`npm run test:coverage`) e JSON-LD adicionado ao `BaseLayout.astro`.                                                                                                             |

## 2. Matriz Go/No-Go

- **Prontidão Técnica (v1.1.0)**: **GO** — todos os gates (`format:check`, `lint`, `check`, `test:coverage`, `build:demo`, `build` com isolamento, `test:e2e`) aprovados.
- **Prontidão Editorial (Go-Live público)**: **PENDENTE DE CONTEÚDO REAL** — o repositório não contém reviews/obras reais do autor (apenas fixtures sintéticas isoladas). Antes de anunciar lançamento público:
  1. Adicionar obras e textos autorais reais em `src/content/`.
  2. Definir o domínio final em `SITE_URL` e `public/robots.txt`.
  3. Revisar direitos de imagens/capas reais.
