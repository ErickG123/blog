# ADR-0001: manter arquitetura static-first

- Estado: aceito
- Decisão: manter Astro com saída estática e publicação no GitHub Pages.
- Contexto: o produto atual não precisa de autenticação, escrita de dados online nem backend; conteúdo editorial vive em Git.
- Consequências: build gera páginas e feed; busca/filtros no browser; comentários usam Giscus; interações precisam funcionar no base path.
