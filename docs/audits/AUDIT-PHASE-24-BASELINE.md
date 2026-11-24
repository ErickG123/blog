# AUDITORIA-24 — Baseline Funcional, Arquitetural e Documental (v1.0.0 -> v1.1.0)

- **Data**: 2026-11-23
- **Fase**: 24
- **Baseline**: `1.0.0` (commit `b04aa7d`)

## 1. Inventário real de rotas e estado

| Rota                                                           | Estado v1.0.0         | Observação verificada                                                                                          |
| -------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------- |
| `/`                                                            | Parcial               | No build real, todas as seções exibiam caixas vazias tracejadas porque fixtures ficam isoladas.                |
| `/obras/` e `/obras/[slug]/`                                   | Implementado (básico) | Sem capas visuais nas listagens, sem filtros por tipo e sem relações bidirecionais na ficha.                   |
| `/reviews/` e `/reviews/[slug]/`                               | Implementado (básico) | Sem TOC, sem relacionados reais e sem `data-pagefind-ignore` em spoilers.                                      |
| `/artigos/` e `/artigos/[slug]/`                               | Implementado (básico) | Sem TOC automático e sem botão acessível de copiar link.                                                       |
| `/guias/` e `/guias/[slug]/`                                   | Implementado (básico) | Não diferencia lista temática de ordem de leitura; sem link para reviews das obras.                            |
| `/colecionismo/` e `/colecionismo/[slug]/`                     | Implementado (básico) | Sem tabela comparativa responsiva e sem galeria de fotos com créditos.                                         |
| `/criadores/[slug]/`, `/editoras/[slug]/`, `/estudios/[slug]/` | Implementado          | Funcionais no modo demo; sem vínculos reversos com publicações.                                                |
| `/tags/` e `/tags/[slug]/`                                     | Implementado          | Funcional; sem filtro/ordenação unificada.                                                                     |
| `/busca/`                                                      | Parcial               | Em `astro dev`, `/pagefind/pagefind-ui.js` não existe até o build, deixando a área de busca sem campo visível. |
| `/sobre/`, `/politica-editorial/`, `/contato/`, `/404`         | Implementado          | Funcionais e acessíveis.                                                                                       |

## 2. Causas raiz reproduzidas

1. **Home e listagens vazias no build real**: comportamento intencional de isolamento (`isFixture: true` excluído quando `INCLUDE_FIXTURES !== 'true'`), porém a UX de estado vazio empilhava múltiplas caixas tracejadas.
2. **`/busca/` sem campo em `dev`**: `PagefindUI` só monta o `<input>` se `/pagefind/pagefind-ui.js` carregar com sucesso (o que só ocorre após `astro build && npx pagefind --site dist`).
3. **Volume insuficiente de fixtures**: v1.0.0 possuía apenas 2 obras e 1 item por coleção editorial, insuficiente para testar paginação, densidade, TOC, galerias e filtros.
4. **Organização documental**: `AGENTS.md`, `CHANGELOG.md` e `prompts/` foram movidos para `docs/` após a v1.0.0; `.github/workflows/ci.yml` e referências internas precisam refletir os caminhos atuais.

## 3. Matriz de Riscos (`MA-AUD`)

| ID           | Severidade | Descrição                                                                        | Fase dona    | Teste / Evidência esperada                                         |
| ------------ | ---------- | -------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------ |
| `MA-AUD-001` | Alta       | `/busca/` fica sem campo visível em `dev` ou se Pagefind falhar                  | 33           | E2E em `/busca/` com campo acessível e fallback recuperável        |
| `MA-AUD-002` | Alta       | Mistura potencial de `dist/` entre build real e demo                             | 25           | `dist-demo/` separado + `scripts/check-isolation.mjs`              |
| `MA-AUD-003` | Média      | Volume mínimo de fixtures não cobre paginação, galerias e TOC                    | 25           | `scripts/demo-inventory.mjs` comprovando metas 20/15/5/etc.        |
| `MA-AUD-004` | Média      | Home vazia exibe múltiplas caixas tracejadas repetitivas                         | 26 / 27      | Screenshots antes/depois (real vazio vs demo rico)                 |
| `MA-AUD-005` | Média      | Spoilers fechados podem ser indexados em snippets do Pagefind                    | 29 / 33      | `data-pagefind-ignore` em `SpoilerBlock.astro`                     |
| `MA-AUD-006` | Média      | Falta de filtros/ordenação funcionais em listagens e biblioteca                  | 28 / 30 / 33 | Filtros com query params na URL + testes E2E                       |
| `MA-AUD-007` | Baixa      | `scripts/new-content.mjs` sem `--dry-run` e proteção explícita de path traversal | 35           | Testes unitários em diretório temporário (`cli-editorial.test.ts`) |
| `MA-AUD-008` | Baixa      | Ausência de relatório de cobertura Vitest e auditoria SEO/JSON-LD                | 36 / 37      | `@vitest/coverage-v8` + JSON-LD validado                           |
