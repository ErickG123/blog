# SPEC-0001 — visão do produto e contratos

Status: baseline concluído; produto implementado parcialmente até a auditoria final. Ver relatórios por fase.

## Objetivo

Evoluir o blog Astro para descoberta editorial brasileira de anime e mangá, preservando o modelo estático, dados versionados em Git, artigo Markdown existente e publicação no GitHub Pages.

## Requisitos funcionais

- [x] RF-001 Preservar publicação de artigos Markdown.
- [x] RF-002 Preservar URLs e navegação de posts existentes.
- [x] RF-003 Preservar busca textual e navegação por tags.
- [x] RF-004 Preservar tempo estimado de leitura.
- [x] RF-005 Preservar índice de títulos e barra de progresso.
- [x] RF-006 Preservar compartilhar/copiar link.
- [x] RF-007 Preservar navegação entre posts.
- [x] RF-008 Preservar comentários Giscus e fallback em configuração placeholder.
- [x] RF-009 Preservar tema claro/escuro e persistência.
- [x] RF-010 Preservar RSS, sitemap e 404.
- [x] RF-011 Preservar deploy GitHub Pages em push para `main`.
- [x] RF-012 Exibir home editorial responsiva.
- [x] RF-013 Disponibilizar páginas para notícias, anime, mangá, reviews e guias.
- [x] RF-014 Validar tipos editoriais por schema.
- [x] RF-015 Disponibilizar catálogo e páginas de obras.
- [x] RF-016 Permitir associação de múltiplas obras a um post.
- [x] RF-017 Filtrar obras por texto, tipo, gênero, ano e estação em combinação; posts mantêm navegação por tags e referências canônicas.
- [x] RF-018 Disponibilizar temporadas por ano/estação declarados na obra.
- [x] RF-019 Identificar níveis de spoiler e exibir aviso quando apropriado.
- [x] RF-020 Suportar autor, data, atualização e capa opcionais.
- [x] RF-021 Excluir drafts das rotas, listas e RSS; sitemap contém apenas rotas públicas geradas.
- [x] RF-022 Manter IDs e slugs de arquivo estáveis, sem mudar o post legado.
- [x] RF-023 Ligar páginas de obra aos artigos e obras relacionados.
- [x] RF-024 Exibir estados vazios sem criar dados artificiais.
- [x] RF-025 Publicar sem backend próprio.

## Requisitos não funcionais

- [x] RNF-001 Astro estático no GitHub Pages.
- [x] RNF-002 Interação com JavaScript pequeno e scripts nativos.
- [x] RNF-003 TypeScript strict herdado da configuração Astro.
- [x] RNF-004 Validação de schemas no build.
- [~] RNF-005 Foco visível, nomes/labels, landmarks, headings, alt, movimento reduzido e contraste de tokens cobertos por smoke local; leitor de tela e verificação manual completa pendentes.
- [x] RNF-006 Matriz das rotas disponíveis em desktop/tablet/mobile, claro/escuro sem overflow; páginas de detalhe sem conteúdo cadastrado não puderam ser avaliadas.
- [x] RNF-007 Tokens de tema light/dark consistentes.
- [x] RNF-008 Metadados e JSON-LD de artigo; smoke de sitemap e RSS.
- [x] RNF-009 Vitest, Playwright e CI antes da publicação.
- [x] RNF-010 Documentação SDD rastreável.
- [~] RNF-011 Política e orientação sobre fontes/licenças documentadas; verificação editorial permanece humana.
- [x] RNF-012 Links locais verificados com base `/blog/`.

## Contratos de URL

Manter `/`, `/posts/{id}/`, `/tags/{tag}/`, `/rss.xml`, `/404.html`; no Pages, sob `/blog`. Novas famílias: `/noticias/`, `/animes/`, `/mangas/`, `/reviews/`, `/guias/`, `/obras/`, `/obras/{id}/`, `/temporadas/`, `/temporadas/{ano}/{estacao}/`. `id` de conteúdo é o slug do arquivo e não deve mudar sem redirecionamento documentado.

## Critérios testáveis e Definition of Done

1. `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run check:static`, `npm run audit:ui` e `npm run test:e2e` terminam com sucesso.
2. Post legado e tags continuam públicos sob `/blog/`.
3. Drafts não geram páginas nem aparecem em listagens/RSS.
4. Referências de conteúdo são verificadas pelo Astro durante build.
5. Links locais usam base path e têm destinos no artefato.
6. Páginas vazias explicam que ainda não há publicações.
7. Conteúdo e imagens seguem política editorial; não são adicionados exemplos de notícia/obra.
8. Relatório descreve limitações e não declara conclusão total se houver itens parciais.

## Política editorial e de dados

Dados factuais precisam de verificação editorial. Não inferir temporada a partir da data do post nem inventar avaliações, rankings, episódios, volumes ou status. Capa/avatar requer origem, licença/permissão e crédito. IDs são nomes de arquivo e relações usam referências tipadas do Astro. Drafts são explícitos e não públicos.

## Tokens e interação

Paleta semântica em `Layout.astro`: fundo, texto, muted, accent, border, code-bg e card-bg; raio compartilhado de 10 px; foco de 3 px; tipografia do sistema. CSS prefere layout fluido e `prefers-reduced-motion`; tema usa `localStorage`.

## Rastreabilidade

| Requisitos | Fases | Testes/evidência |
|---|---|---|
| RF-001..011 | 00, 02, 05, 08..10 | Matriz no audit; Vitest, Playwright, static check |
| RF-012..014 | 03..04 | Build, smoke de busca e categorias vazias |
| RF-015..018, RF-023 | 02, 06..07, 11 | Schema, filtros combinados unitários e rotas de catálogo/temporadas |
| RF-019..020 | 02, 05 | Schema e template do artigo |
| RF-021..022, RF-024..025 | 02..10 | filtro público, RSS, build e link audit |
| RNF-001..012 | todas | CI configurado; validações locais e limitações descritas no relatório da fase 11 |
