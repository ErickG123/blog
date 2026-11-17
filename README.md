# Anime & Mangá

Blog estático feito com Astro 7. Artigos, obras, autores e classificações são arquivos versionados no repositório. A saída é publicada no GitHub Pages em `https://erickg123.github.io/blog/`.

## Desenvolvimento

```sh
npm ci
npm run dev
```

Build e checks:

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm run check:static
npx playwright install chromium # primeira execução dos testes de browser
npm run audit:ui
npm run test:e2e
```

## Conteúdo

- Artigos: [guia editorial](docs/content-editorial-guide.md), arquivos em `src/content/posts/`.
- Pauta inicial: [proposta editorial](docs/content-proposal-phase-11.md); os itens ainda não são conteúdo aprovado para publicação.
- Obras: arquivos Markdown em `src/content/works/`; autores em `src/content/authors/`.
- Mídia deve ter origem e permissão documentadas. Não publique exemplos fictícios como notícias, fichas reais ou avaliações.
- Use `status: draft` para rascunho. Rascunhos são removidos das páginas e do RSS.

O frontmatter legado (`date`, `updatedDate`) continua compatível. Campos novos podem usar `publishedAt` e `updatedAt`. O nome do arquivo define o ID público, então mantenha-o estável.

## Publicação

Push na branch `main` executa os testes, compila o site e publica o artefato estático no GitHub Pages via `.github/workflows/deploy.yml`.

## Documentação SDD

Veja o [índice da documentação](docs/README.md), [visão e requisitos](docs/specifications/SPEC-0001-product-vision.md), [arquitetura](docs/architecture/architecture.md) e [roadmap](docs/roadmap.md). O pacote original `anime-blog-sdd` foi centralizado em `docs/sdd-source/`.
