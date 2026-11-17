# Arquitetura atual

## Fluxo

Conteúdo Markdown local → Content Collections Astro e validação Zod → utilitários de normalização/ordenação → páginas e componentes Astro → build estático → GitHub Actions → GitHub Pages. Giscus é a única integração externa de interação.

## Coleções

- `posts`: mantém `date`/`updatedDate` legados e aceita `publishedAt`/`updatedAt`; tipo editorial, status, tags legadas, referências taxonômicas, capa com crédito/origem, fontes, autor e obras relacionados.
- `works`: anime/mangá com temporada e gêneros opcionais, referências canônicas de gênero, `publicationStatus` para draft/published; `status` pode registrar status editorial da obra; relações para obras relacionadas e fontes. Capa exige crédito e origem.
- `authors`: nome, biografia, avatar com proveniência e links.
- `taxonomies`: rótulos editoriais versionados localmente, referenciados por ID em artigos e obras.

As referências usam a API `reference()` exportada pela versão instalada do Astro. Entradas ficam em `src/content/{posts,works,authors,taxonomies}`.

O catálogo usa a função pura `filterWorks()` para combinar busca sem acentos, tipo, gênero, ano e estação. A UI lê os valores dos controles e atualiza resultados, contagem e estado vazio sem framework de cliente. As coleções de obras, autores e taxonomias podem permanecer vazias; nenhum dado editorial fictício é usado para preencher rotas.

## Rotas

Legadas: `/`, `/posts/[...id]`, `/tags/[tag]`, `/rss.xml`, 404. Novas: categorias editoriais, `/obras/`, `/obras/[id]/`, `/temporadas/` e `/temporadas/[ano]/[estacao]/`. `basePath()` é usado para links internos, respeitando o prefixo `/blog/` do GitHub Pages.

## Publicação

Posts com `status: draft` são removidos das listagens, páginas individuais, tags e RSS. O sitemap deriva das rotas de build e, assim, não inclui páginas de draft. O catálogo inclui apenas obras com entradas explícitas.
