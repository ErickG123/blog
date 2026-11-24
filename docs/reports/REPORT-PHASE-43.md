# Relatório da Fase 43 — Gerenciamento de Mídia Local, Otimização e Imagens Editoriais

- **Data**: 2026-11-24
- **Status**: **CONCLUÍDA**

## 1. Objetivo e baseline

Consolidar um fluxo 100% local, gratuito e sustentável para importar, otimizar, validar e renderizar imagens editoriais no Mangá Atlas (Astro `7.4.13` + Sharp `0.35.5`, hospedado no GitHub Pages), sem armazenamento externo (R2/Cloudinary/Supabase), sem Git LFS obrigatório e sem hotlinks de terceiros.

- **Inventário baseline**: `public/favicon.svg` (branding), 0 imagens editoriais reais versionadas em `src/assets/images/`, 4 referências demonstrativas em fixtures (`demo-*.json` / `demo-*.mdx`).
- **Build editorial baseline (`dist/`)**: 106 arquivos, `936.6 KB` (incluindo índice Pagefind).

## 2. Decisões e arquitetura

- Registrada em `docs/adr/ADR-0005-local-media-pipeline.md`:
  - Diretório editorial versionado: `src/assets/images/{works,reviews,articles,guides,collecting,editions,creators,publishers,studios,placeholders}/<slug>/`.
  - Resolução local via `src/shared/media/media.resolver.ts` (`import.meta.glob` -> `ImageMetadata` para `<Image />` de `astro:assets`) com fallback compatível via `resolveAssetUrl`.
  - Contrato de procedência estendido em `ImageAsset` e `imageAssetSchema` (`sourceUrl?`, `rightsStatus?: 'own' | 'authorized' | 'pending' | 'demo'`, `decorative?`).
  - `sharp ^0.35.5` declarado diretamente em `devDependencies` (reutilizando a versão já presente no lockfile).

## 3. Comandos implementados (`scripts/media.mjs` + `package.json`)

| Comando                                                                   | Função                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run media:import -- --src="<arquivo>" --context=<ctx> --slug=<slug>` | Importa imagem local, valida decodificação Sharp/SVG seguro, normaliza EXIF (`.rotate()`), remove metadados privados, converte para WebP (ou PNG) sem upscale, grava atomicamente, suporta `--dry-run`, `--json`, `--force`, `--out-dir` e gera snippet de frontmatter. |
| `npm run media:optimize`                                                  | Reotimiza apenas imagens raster fora das metas de largura/bytes em `src/assets/images/` (com `--dry-run` e `--force`).                                                                                                                                                  |
| `npm run media:validate`                                                  | Diagnostica referências inexistentes, direitos `pending` em publicações reais, uso de `demo-assets` em conteúdo real, hotlinks externos, SVGs com scripts e arquivos acima das metas.                                                                                   |
| `npm run media:stats`                                                     | Inventário por contexto, maiores arquivos e tamanho do build `dist/` (formato humano e `--json`).                                                                                                                                                                       |
| `npm run media:find-duplicates`                                           | Detecta duplicatas exatas por SHA-256 sem remover arquivos automaticamente.                                                                                                                                                                                             |
| `npm run media:find-unused`                                               | Lista candidatos potencialmente sem referência cruzando collections, MDX e `src/` sem remoção automática.                                                                                                                                                               |

## 4. Componentes e placeholder

- `src/shared/ui/MediaFigure.astro`: consolidado com 9 variantes semânticas (`catalog-cover`, `work-detail`, `review-header`, `thumbnail`, `edition-cover`, `featured`, `inline`, `gallery`, `related`), `widths`/`sizes` coerentes, `object-fit: contain` para capas e suporte a `src/assets/images/placeholders/cover-fallback.svg`.

## 5. Arquivos alterados

- `package.json`
- `src/features/catalog/domain/catalog.model.ts`, `src/features/content/content.schema.ts`
- `src/shared/media/media.config.ts`, `src/shared/media/media.resolver.ts`
- `src/assets/images/placeholders/cover-fallback.svg`
- `src/shared/ui/MediaFigure.astro`
- `scripts/media.mjs`
- `tests/unit/media-cli.test.ts`
- `docs/adr/ADR-0005-local-media-pipeline.md`, `docs/editorial/EDITORIAL-GUIDE.md`, `docs/testing/TEST-PLAN.md`, `docs/roadmap/implementation-status.md`, `docs/CHANGELOG.md`

## 6. Validações e evidências

- `npm run test`: **PASS** (7 suítes, 26/26 testes, incluindo JPEG com espaços/japonês `よつばと`, transparência PNG, `--dry-run`, sobrescrita bloqueada, path traversal, URL remota, arquivo corrompido, SVG com `<script>`, duplicatas, unused, stats e referência quebrada).
- `npm run media:validate`: **PASS** (0 erros bloqueantes; 4 avisos informativos de `demo-assets` sob demanda).
- `npm run media:stats -- --json`: salvo em `docs/reports/evidence/phase-43/media-stats.json`.
- `npm run media:find-duplicates` / `media:find-unused`: **PASS**.

## 7. Critérios de aceitação

- [x] Estrutura e metadados locais coerentes, sem duplicação desnecessária.
- [x] Importação CLI portável, segura, com compressão, validação e `--dry-run`.
- [x] Inventário, detecção de duplicatas e arquivos possivelmente não usados, sem remoção automática.
- [x] Imagens responsivas, proporcionais, acessíveis e otimizadas; componente `MediaFigure` reutilizado.
- [x] Referências e procedência verificáveis; nenhum vazamento demo/privado no build editorial.
- [x] Documentação, ADR-0005, plano de testes, status e evidências atualizados.
