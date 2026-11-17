# Requisitos iniciais (a confirmar pela auditoria)

## Funcionais

- RF-001 Preservar publicação de artigos Markdown.
- RF-002 Preservar URLs e navegação dos posts existentes.
- RF-003 Preservar busca textual e por tags.
- RF-004 Preservar estimativa de tempo de leitura.
- RF-005 Preservar índice de títulos e barra de progresso.
- RF-006 Preservar compartilhar/copiar link.
- RF-007 Preservar navegação entre artigos.
- RF-008 Preservar comentários Giscus e configurar fallback.
- RF-009 Preservar tema claro/escuro e persistência.
- RF-010 Preservar RSS, sitemap e 404.
- RF-011 Preservar deploy GitHub Pages em push main.
- RF-012 Exibir home editorial responsiva.
- RF-013 Listar notícias, anime, mangá, reviews e guias.
- RF-014 Definir tipos editoriais por schema.
- RF-015 Possuir catálogo e páginas de obras.
- RF-016 Associar múltiplas obras aos posts.
- RF-017 Filtrar por gênero, tipo e tags.
- RF-018 Exibir temporadas por ano e estação.
- RF-019 Identificar spoilers e permitir nota apenas quando apropriada.
- RF-020 Exibir autor, data, atualização e capa opcional.
- RF-021 Excluir drafts de todos os recursos públicos.
- RF-022 Manter IDs e slugs estáveis.
- RF-023 Permitir navegação de obras para posts relacionados.
- RF-024 Exibir estados vazios sem dados artificiais.
- RF-025 Permitir publicar sem backend próprio.

## Não funcionais

- RNF-001 Site estático em GitHub Pages.
- RNF-002 JavaScript mínimo e carregamento eficiente.
- RNF-003 TypeScript strict quando compatível.
- RNF-004 Schemas validáveis.
- RNF-005 Acessibilidade de teclado e foco.
- RNF-006 Responsividade em mobile/tablet/desktop.
- RNF-007 Tema consistente em light/dark.
- RNF-008 SEO e metadados por rota.
- RNF-009 Testes unitários/E2E em CI.
- RNF-010 Documentação SDD rastreável.
- RNF-011 Conteúdo e imagens de origem legítima.
- RNF-012 Compatibilidade com base path GitHub Pages.

## Critérios globais de aceite

`npm ci` e `npm run build` funcionam no ambiente validado; rotas legadas mantidas; nenhum draft publicado; links internos, RSS e sitemap corretos; dark/light consistente; testes de regressão e documentação atualizados.
