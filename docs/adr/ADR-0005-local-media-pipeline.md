# ADR-0005 — Fluxo de Mídia Local, Otimização e Contrato de Procedência

- **Status**: Aceito
- **Data**: 2026-11-24
- **Fase**: 43

## Contexto

O Mangá Atlas é hospedado inicialmente no GitHub Pages com Astro (`output: 'static'`), sem uso de storage externo (R2, Cloudinary, Supabase) ou Git LFS obrigatório. É necessário um fluxo local, gratuito, reproduzível e seguro para importar, comprimir, validar e renderizar imagens editoriais respeitando o `base` do GitHub Pages e a política de direitos autorais.

## Decisão

1. **Armazenamento versionado**: imagens editoriais otimizadas residem em `src/assets/images/<context>/<slug>/` (`works`, `reviews`, `articles`, `guides`, `collecting`, `editions`, `creators`, `publishers`, `studios`, `placeholders`). Assets de marca (ex.: `public/favicon.svg`) permanecem separados; fotos originais em alta resolução permanecem fora do repositório.
2. **Resolução local compatível com Astro**: `src/shared/media/media.resolver.ts` usa `import.meta.glob` sobre `/src/assets/images/**/*` para fornecer `ImageMetadata` ao componente `MediaFigure.astro` (que usa `<Image />` de `astro:assets`), mantendo fallback compatível via `resolveAssetUrl` para caminhos públicos e SVGs.
3. **Contrato de procedência**: `imageAssetSchema` e `ImageAsset` ganham campos opcionais retrocompatíveis (`sourceUrl`, `rightsStatus: 'own' | 'authorized' | 'pending' | 'demo'`, `decorative`). Crédito não equivale a autorização.
4. **Pipeline CLI local (`scripts/media.mjs`)**: utiliza `sharp` (dependência direta compatível com o Astro) para `media:import`, `media:optimize`, `media:validate`, `media:stats`, `media:find-duplicates` e `media:find-unused`, normalizando orientação EXIF, removendo metadados privados, impedindo path traversal/sobrescrita silenciosa/SVGs com scripts e preservando originais.

## Consequências

- Zero custo de infraestrutura externa, compatibilidade total com `ASTRO_BASE_PATH` no GitHub Pages, validação automatizada de referências e direitos, e controle transparente de tamanho do repositório.
