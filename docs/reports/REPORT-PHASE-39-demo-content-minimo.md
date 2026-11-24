# Relatório da Fase 39 — Conteúdo demonstrativo mínimo para validação de todas as abas

- **Data**: 2026-11-23
- **Status**: CONCLUÍDO

## 1. Objetivo

Criar um conjunto mínimo, realista e bem relacionado de conteúdo demonstrativo (`isFixture: true`) para permitir a validação visual e funcional de todas as abas públicas do **Mangá Atlas** sem expor fixtures no build editorial real (`dist/`).

## 2. Conteúdo demonstrativo criado

Todos os registros estão marcados com `isFixture: true` (isolados do build real `npm run build` e habilitados via `npm run dev:demo` / `npm run build:demo` / `npm run preview:demo`):

- **Obras (3)**: `Yotsuba&!` (mangá), `Yuru Camp△` (anime), `Navillera: Like a Butterfly` (manhwa).
- **Reviews (2)**: `Yotsuba&! Vol. 1 — A beleza das pequenas coisas` (com subtítulos, TOC, pontos positivos/negativos, bloco "Para quem recomendo", nota `4.5`, veredito) e `Yuru Camp△ (Temporada 1) — Aconchego à beira da fogueira`.
- **Artigo (1)**: `Por que obras slice of life funcionam tão bem no cotidiano` (leitura longa com 4 subtítulos H2, TOC automático e obras citadas).
- **Guia (1)**: `3 obras para quem quer começar a ler slice of life` (lista ordenada conectada às 3 obras).
- **Colecionismo (1)**: `O que observar ao avaliar a qualidade física de um mangá` (vinculado à obra e à edição física `Yotsuba&! Vol. 1 — Edição Tankobon (Demo)` com tabela comparativa).
- **Criadores (2)**: `Kiyohiko Azuma` e `Afro`.
- **Editora (1)**: `Editora Horizonte (Demo)`.
- **Estúdio (1)**: `C-Station (Demo)`.
- **Tags vinculadas**: `cotidiano`, `narrativa-visual`, `guia-de-entrada`, `edicao-fisica`, `papel-offwhite`, `estante`, `ritmo`, `trilha-sonora`.

## 3. Evidências visuais geradas (`docs/reports/evidence/phase-39/`)

17 screenshots reais capturadas via Playwright contra `dist-demo/`:

- Desktop (`1440×900`): `01-home-desktop.png` até `14-busca-resultado-desktop.png` (incluindo busca real por `"Yotsuba"` com resultados Pagefind).
- Mobile (`390×844`): `15-home-mobile.png`, `16-review-detail-mobile.png`, `17-biblioteca-mobile.png`.
- Rotas de entidades validadas com HTTP 200: `/criadores/kiyohiko-azuma-demo/`, `/editoras/editora-horizonte-demo/`, `/estudios/estudio-c-station-demo/`.

## 4. Comandos e validações

- `npm run format:check`, `npm run lint`, `npm run check`, `npm run test`: **PASS**
- `npm run build:demo` (`dist-demo/` + Pagefind) + `node scripts/capture-demo-evidence.mjs`: **PASS**
- `npm run build` (`dist/` real + `scripts/check-isolation.mjs` comprovando zero vazamento de `yotsuba-demo`/`yuru-camp-demo`/`navillera-demo`): **PASS**
- `npm run test:e2e`: **PASS**

## 5. Próximos passos recomendados

- Revisar manualmente as 17 screenshots em `docs/reports/evidence/phase-39/` ou rodar `npm run preview:demo` para navegar localmente.
- Quando iniciar a publicação editorial real, criar conteúdos com `npm run content:new` (sem `isFixture: true`).
