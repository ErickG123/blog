# Relatório da Fase 44 — CLI de Produção Editorial, Prévia e Publicação Controlada

- **Data**: 2026-11-24
- **Status**: **CONCLUÍDA**

## 1. Auditoria inicial do fluxo anterior

- `scripts/new-content.mjs` suportava apenas 4 tipos (`review`, `article`, `guide`, `collecting`), sem suporte a entidades de catálogo (`work`, `edition`, `creator`, `publisher`, `studio`, `genre`, `tag`, `author`).
- O template de `review` preenchia `rating: 4` e `verdict: "Veredito curto aqui."` por padrão, contrariando a diretriz de não obrigar notas nem pré-preencher opiniões.
- Não havia comandos para listagem, inspeção de status/pendências, diagnóstico unificado, prévia local isolada de rascunhos ou promoção local controlada com confirmação explícita.

## 2. Comandos implementados (`scripts/content-cli.mjs`)

| Comando                   | Função                                                                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run content:new`     | Cria qualquer entidade (12 tipos), sempre `status: draft` para MDX, sem notas/vereditos inventados, colisão case-insensitive, escrita atômica, `--dry-run` e `--out-dir`. |
| `npm run content:list`    | Lista e filtra conteúdo por `--type`, `--status`, `--work`, separando reais de fixtures (`--include-fixtures`), com saída humana e `--json`.                              |
| `npm run content:status`  | Inspeciona status, contagem de palavras, tempo de leitura e pendências (`[PENDENTE]`, `TODO:`, `rightsStatus: pending`).                                                  |
| `npm run content:doctor`  | Executa `validate-content.mjs` + `media:validate` + resumo de rascunhos/publicações reais.                                                                                |
| `npm run content:preview` | Gera `dist-preview/` com `INCLUDE_DRAFTS=true` (`noindex` + banner) e sobe preview somente em loopback (`127.0.0.1:4322`).                                                |
| `npm run content:publish` | Valida ausência de pendências, exibe diff proposto e só altera `status: draft` -> `published` localmente mediante `--confirm-publish` (nunca faz commit/push/deploy).     |

## 3. Isolamento de prévia local

- `isPublicEntry` (`src/shared/domain/rules.ts`) e `content.selectors.ts` aceitam `INCLUDE_DRAFTS=true` exclusivamente quando ativado explicitamente; o build editorial padrão (`npm run build`) e o workflow GitHub Pages jamais ativam `INCLUDE_DRAFTS`.
- `BaseLayout.astro` injeta `<meta name="robots" content="noindex, nofollow" />` e banner explícito no modo prévia.
- `scripts/check-isolation.mjs` passou a bloquear também marcadores `Prévia local de rascunhos` e `[PENDENTE]` em `dist/`.
- `dist-preview/` adicionado ao `.gitignore`.

## 4. Validações e evidências

- `npm run test`: **PASS** (8 suítes, 29/29 testes, incluindo `tests/unit/content-cli-phase44.test.ts` e `tests/unit/cli-editorial.test.ts`).
- `npm run content:doctor`: **PASS**.
- Evidência JSON salva em `docs/reports/evidence/phase-44/content-list.json`.

## 5. Critérios de aceitação

- [x] Fluxo local funcional do cadastro à prévia sem editar código da aplicação.
- [x] Templates compatíveis com schemas reais e `status: draft` por padrão.
- [x] CLI seguro, portável, documentado, testável e com `--dry-run`.
- [x] Integração com mídia local via `content:doctor` sem lógica duplicada.
- [x] Publicação local explicitamente controlada (`--confirm-publish`) e sem deploy automático.
- [x] Isolamento de rascunhos/preview/demo comprovado.
