# Auditoria de baseline — fase 00

Data: 2026-11-16

## Estado observado

- Projeto Astro 7.3.2, saída estática, TypeScript strict e conteúdo em Markdown via Content Layer API.
- Uma coleção `posts`, carregada de `src/content/posts`, com `title`, `date`, `description`, `updatedDate?` e `tags?`.
- Um artigo publicado: `ola-mundo`, URL local `/blog/posts/ola-mundo/` no GitHub Pages.
- Rotas geradas no build: `/404.html`, `/posts/ola-mundo/`, `/rss.xml`, `/tags/{astro,minimalista,tutorial}/` e `/` (sob `base: /blog`, portanto os links públicos devem incluir `/blog`).
- Busca client-side percorre texto de cards, incluindo título, descrição, data e tags. Feed agrupa por mês, ordena por data, estima leitura a 200 palavras/minuto.
- Página do artigo possui índice de títulos, progresso de leitura, compartilhamento, copiar link, navegação anterior/próximo e Giscus.
- Tema claro/escuro salvo em `localStorage`; script aplica tema após o início do documento.
- RSS via `@astrojs/rss`, sitemap via `@astrojs/sitemap`, robots.txt estático e 404 personalizada.
- Deploy em `.github/workflows/deploy.yml`, acionado em push para `main`, com `npm ci`, build e deploy de Pages.
- Sem suíte de testes, lint ou formatador declarados no `package.json`; não foi identificada pasta `.agents` nem documentação existente fora do pacote de especificação.

## Baseline reproduzível

- `npm ci`: sucesso; npm reportou 9 vulnerabilidades (1 baixa, 2 moderadas, 6 altas). Sem auditoria de dependências individuais nesta fase.
- `npm run build`: sucesso; Astro gerou 6 páginas e `sitemap-index.xml`.
- `npm test`, lint e format: indisponíveis, não existem scripts correspondentes.

## Matriz de legado e testes

| Funcionalidade | Implementação observada | Teste automatizado antes da migração |
|---|---|---|
| Markdown e URL de artigo | `src/content/posts/ola-mundo.md`, `/posts/ola-mundo/` | Nenhum |
| Feed, busca e tempo de leitura | `src/pages/index.astro` | Nenhum |
| Tags e páginas de tags | `src/pages/tags/[tag].astro` | Nenhum |
| TOC, progresso, compartilhar/copiar, navegação | `src/pages/posts/[...id].astro` | Nenhum |
| Giscus | Defaults no código e variáveis `PUBLIC_GISCUS_*` | Nenhum |
| Tema persistente | `src/layouts/Layout.astro`, `localStorage` | Nenhum |
| RSS, sitemap, robots, 404 | RSS route, integração, `public/robots.txt`, `404.astro` | Build apenas |
| GitHub Pages e base `/blog` | `astro.config.mjs`, workflow | Build local; deploy não exercitado |

## Riscos/inconsistências

1. O schema atual usa `date`/`updatedDate`; a visão futura usa `publishedAt`/`updatedAt`, exigindo compatibilidade para preservar artigo e ordenação.
2. Giscus tem valores padrão embutidos, então não há fallback de serviço claramente configurado; `.env.example` contém placeholders e categoria diferente dos defaults.
3. `site` está como `https://ErickG123.github.io` e base `/blog`; verificar normalização e URLs canônicas/feed/sitemap sob base path nas fases de SEO.
4. Não há testes automatizados para qualquer comportamento legado.
5. Não há conteúdo editorial verificável de anime/mangá nem mídia licenciada no repositório; migração deve fornecer estruturas vazias e nenhum anúncio fictício.
6. Busca exige JavaScript. Giscus também é externo, como esperado para a arquitetura.

## URLs para preservação

- `/blog/`
- `/blog/posts/ola-mundo/`
- `/blog/tags/astro/`, `/blog/tags/minimalista/`, `/blog/tags/tutorial/`
- `/blog/rss.xml`, `/blog/sitemap-index.xml`, `/blog/404.html`

As rotas Astro são geradas sem o prefixo em `dist`; o `base` do projeto prefixa referências públicas. Links devem ser conferidos no HTML gerado.

## Estratégia

Manter Astro estático e as rotas existentes. Adicionar schemas e rotas com conteúdo Markdown/JSON local, defaults sem dados editoriais artificiais, excluir drafts de toda saída pública, e validar build/linkagem sob `/blog`. Alterações visuais e de conteúdo serão incrementais; dependências de testes só entram se justificadas e suportadas pelo runtime.
