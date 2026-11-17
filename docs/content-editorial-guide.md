# Guia editorial

## Publicar artigo

Crie `src/content/posts/<slug>.md`. O nome do arquivo controla o ID e a URL pública; mantenha-o estável. Campos mínimos:

```yaml
title: "Título"
date: "2026-11-16" # ou publishedAt
description: "Resumo factual e conciso."
tags: ["tema"]
```

Campos novos: `publishedAt`, `updatedAt`, `type` (`article`, `news`, `anime`, `manga`, `review`, `guide`), `status` (`draft`, `published`), `taxonomyRefs`, `cover`, `author`, `works`, `sources`, `spoilerLevel`, `featured` e `rating`. Para artigo legado, `date` e `updatedDate` continuam válidos. Status padrão é `published`; configure explicitamente `status: draft` para rascunhos. Capa exige `coverCredit` e `coverSource`; alt text pode ser informado em `coverAlt`.

## Obras e autores

Adicione Markdown em `src/content/works/` com `title`, `mediaType`, `synopsis` e `genres`. Temporada e ano são opcionais e só devem ser preenchidos com informação verificada. Use `publicationStatus: draft` para fichas incompletas; `status` é reservado para o estado editorial da obra. Use `genreRefs` para ligar gêneros a IDs canônicos em `src/content/taxonomies/`; `genres` continua disponível para rótulos legados. Fichas com capa exigem `coverCredit` e `coverSource`; obras podem registrar `sources`. Use referências de coleção `works` e `authors` nos artigos. Autores ficam em `src/content/authors/`.

## Tags e mídias

Tags devem ser curtas, consistentes e escritas como texto simples; caminhos são codificados em URL. Imagens devem ter origem, autorização/licença e crédito editorial verificados. Armazene ativos próprios em `public/`; não use hotlinks como padrão. Não publique notícia, avaliação, data, ranking, episódio, volume ou sinopse sem fonte confiável.

## Publicar

Execute `npm ci` e `npm run build`; revise o HTML e links locais. Push em `main` aciona GitHub Pages. Rascunhos não são publicados.
