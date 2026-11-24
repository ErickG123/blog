# SPEC-0002 — Content Collections e Integridade Editorial

- **Status**: Aprovada
- **Fase**: 03
- **Data**: 2026-11-23

## 1. Coleções e formatos

Configuradas em `src/content.config.ts` via `glob` loader do Astro:

- **Dados estruturados (`.json`)**: `works`, `editions`, `creators`, `publishers`, `studios`, `genres`, `tags`, `authors`, `relationships`.
- **Editorial (`.md` / `.mdx`)**: `reviews`, `articles`, `recommendations`, `collecting`.

## 2. Validação transversal (`npm run content:validate`)

Executada automaticamente antes do `astro build`:

- Valida todos os arquivos contra os schemas Zod (`src/features/content/content.schema.ts`).
- Verifica unicidade de `id` e `slug` por coleção.
- Verifica referências entre entidades (`workId`, `creatorId`, `publisherId`, `studioId`, `genreIds`, `tagIds`, `authorId`, `editionIds`).
- Verifica compatibilidade de `scope` de review com `work.kind` (`season` exige `anime`; `volume` rejeita `anime`).
- Valida relações entre obras (autolink, duplicata, órfão e ciclo hierárquico).

## 3. Política de fixtures e visibilidade pública

- Toda consulta pública passa por `src/features/content/content.selectors.ts` usando `isPublicEntry`.
- Registros com `status !== 'published'`, `publishedAt > now` ou `isFixture === true` são excluídos do build editorial real.
- Para demonstração/testes locais, o modo opt-in `INCLUDE_FIXTURES=true` habilita a exibição das fixtures sintéticas.
