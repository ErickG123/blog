# Arquitetura-alvo

Markdown e arquivos JSON/YAML locais → Astro Content Collections com Zod e referências → funções de consulta/transformação tipadas → componentes/layouts Astro → build estático → GitHub Actions → GitHub Pages. Giscus opera como serviço externo de comentários.

## Coleções

- `posts`: title, description, publishedAt, updatedAt?, type, status, tags, cover?, author?, works?, spoilerLevel?, featured?, rating?
- `works`: title, originalTitle?, mediaType, synopsis, genres, releaseYear?, season?, status?, cover?, relatedWorks?
- `authors`: nome, bio?, avatar?, links?
- `taxonomies`: slug/id, nome, descrição?, tipo?

## Relacionamentos

Post N:N Work; post N:1 autor; obra N:N relacionadas. Preferir `reference()` da versão Astro instalada e validação de integridade em build.

## Rotas

Manter `/posts/[...id]`, `/tags/[tag]` e `/`. Adicionar `/noticias`, `/animes`, `/mangas`, `/reviews`, `/guias`, `/obras`, `/obras/[id]`, `/temporadas` e `/temporadas/[ano]/[estacao]`. Canonical e links devem respeitar `site` e `base` do Astro.

## Design e qualidade

Tokens CSS, componentes Astro, lógica TypeScript isolada, ausência de SPA framework; testes Vitest/Playwright quando aprovados após inspeção das dependências; CI com validação antes de publicar.

## Estratégia de migração

Auditar primeiro; preservar URLs e post existente; introduzir compatibilidade de frontmatter antes da troca de layouts; adicionar páginas uma por vez; testar cada fase; finalizar com revisão de build/rotas/links/SEO/RSS.
