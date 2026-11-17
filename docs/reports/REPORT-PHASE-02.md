# Relatório — fase 02: Content Collections

## Resultado

`src/content.config.ts` agora define posts, obras, autores e taxonomias, com referências tipadas suportadas pelo Astro instalado. Posts aceitam `date`/`updatedDate` legados e `publishedAt`/`updatedAt`; datas usam padrão ISO; tipos/status, tags, obras, autor, capa, spoiler e avaliação são validados. O post `ola-mundo` manteve ID e URL.

## Publicação

`status: draft` é excluído das rotas de post, home, tags, filtros editoriais e RSS. Obras também têm `publicationStatus` separado do status da obra; rascunhos são removidos do catálogo, relações e temporadas. Sitemap lista rotas geradas. Coleções de obras/autores/taxonomias permanecem vazias até existir dado verificado; não há fixtures editoriais publicadas.

## Evidências

- Build Astro passa e valida entradas.
- Vitest cobre datas, status público, ordenação estável, leitura e base path.

## Pendências

Não há teste negativo automatizado criando uma referência inválida temporária; a validação de referência ocorre pelo build do Astro quando relações reais forem adicionadas.
