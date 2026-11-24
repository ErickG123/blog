# Relatório da Fase 45 — Preparação das Primeiras Publicações Reais

- **Data**: 2026-11-24
- **Status**: **CONCLUÍDA (preparação técnica) / AGUARDANDO REVISÃO DO AUTOR (aprovação editorial)**

## 1. Inventário e estrutura preparada

Foram preparados sem duplicar fixtures e sem inventar notas, opiniões pessoais ou fotografias:

- **4 fichas factuais de catálogo em `status: "draft"`** (isoladas do build real até aprovação):
  - `src/content/creators/kiyohiko-azuma.json` (`creator-kiyohiko-azuma`)
  - `src/content/creators/afro.json` (`creator-afro`)
  - `src/content/works/yotsuba-to.json` (`work-yotsuba-to`)
  - `src/content/works/yuru-camp-anime.json` (`work-yuru-camp-anime`)
- **5 rascunhos editoriais em `status: draft`** (1 de cada tipo principal, todos com marcadores `[PENDENTE]` explícitos e sem notas/vereditos inventados):
  1. `src/content/reviews/yotsuba-to-volume-1.mdx` (Review de mangá — Volume 1)
  2. `src/content/reviews/yuru-camp-temporada-1.mdx` (Review de anime — Temporada 1)
  3. `src/content/articles/cotidiano-como-narrativa-slice-of-life.mdx` (Artigo — Análise)
  4. `src/content/recommendations/por-onde-comecar-mangas-slice-of-life.mdx` (Guia)
  5. `src/content/collecting/edicao-japonesa-yotsuba-volume-1.mdx` (Colecionismo)
- **Matriz de aprovação humana**: `docs/editorial/primeiras-publicacoes.md` com status por pauta, pendências de texto/mídia e 5 perguntas objetivas para o autor.

## 2. Isolamento comprovado

- Adicionado suporte opcional a `status: 'draft' | 'published'` nas entidades de catálogo (`content.schema.ts` e `content.selectors.ts`) para impedir que obras/criadores ainda sem publicação aprovada vazem para o build editorial real.
- `npm run content:preview -- --build-only` gerou `dist-preview/` com **51 páginas** (incluindo todos os rascunhos e banner `noindex`).
- `npm run build` em seguida gerou `dist/` com **42 páginas** (**0 rascunhos, 0 fichas draft, 0 fixtures**), aprovado por `scripts/check-isolation.mjs`.

## 3. Evidências visuais

Capturadas e inspecionadas em `docs/reports/evidence/phase-45/`:

- `preview-home-dark.png`, `preview-home-light.png`, `preview-review-dark.png`, `preview-home-mobile.png`.

## 4. Critérios de aceitação

- [x] Inventário editorial inicial e pauta realista, sem duplicação de fixtures.
- [x] Rascunho estrutural utilizável para cada tipo principal (`review` mangá, `review` anime, `article`, `guide`, `collecting`).
- [x] Fichas factuais relacionadas sem dados ou fontes inventados.
- [x] Notas, opiniões, fotografias e direitos não inventados.
- [x] Prévia local navegável nos dois temas e mobile com evidências.
- [x] Produção (`dist/`) continua sem rascunhos, fixtures ou mídia privada.
- [x] Checklist humano e fluxo de aprovação documentados em `docs/editorial/primeiras-publicacoes.md`.
