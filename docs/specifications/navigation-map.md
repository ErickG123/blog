# Mapa de Navegação e Inventário de Telas — Mangá Atlas

- **Fase**: 01
- **Data**: 2026-11-23

## 1. Sitemap lógico (URLs canônicas em pt-BR)

```text
/
├── /reviews/
│   ├── /reviews/[slug]/
│   └── /reviews/pagina/[page]/
├── /artigos/
│   ├── /artigos/[slug]/
│   └── /artigos/pagina/[page]/
├── /guias/
│   └── /guias/[slug]/
├── /colecionismo/
│   └── /colecionismo/[slug]/
├── /obras/
│   ├── /obras/[slug]/
│   └── /obras/pagina/[page]/
├── /criadores/
│   └── /criadores/[slug]/
├── /editoras/
│   └── /editoras/[slug]/
├── /estudios/
│   └── /estudios/[slug]/
├── /tags/
│   └── /tags/[slug]/
├── /busca/
├── /sobre/
├── /politica-editorial/
├── /contato/
├── /rss.xml
├── /sitemap-index.xml
└── /404
```

## 2. Inventário de telas (MVP vs Aprimoramento)

| Rota                                                           | Tipo                                    | Prioridade | Fase |
| -------------------------------------------------------------- | --------------------------------------- | ---------- | ---- |
| `/`                                                            | Página inicial editorial                | MVP        | 06   |
| `/obras/` e `/obras/[slug]/`                                   | Biblioteca e ficha de obra              | MVP        | 07   |
| `/reviews/` e `/reviews/[slug]/`                               | Listagem e detalhe de review            | MVP        | 08   |
| `/artigos/` e `/artigos/[slug]/`                               | Listagem e detalhe de artigo            | MVP        | 09   |
| `/guias/` e `/guias/[slug]/`                                   | Listagem e detalhe de guia/recomendação | MVP        | 10   |
| `/colecionismo/` e `/colecionismo/[slug]/`                     | Colecionismo e edições físicas          | MVP        | 11   |
| `/criadores/[slug]/`, `/editoras/[slug]/`, `/estudios/[slug]/` | Páginas de entidades                    | MVP        | 12   |
| `/tags/[slug]/` e paginação                                    | Taxonomia e navegação paginada          | MVP        | 13   |
| `/busca/`                                                      | Pesquisa global estática (Pagefind)     | MVP        | 14   |
| `/sobre/`, `/politica-editorial/`, `/contato/`                 | Institucionais                          | MVP        | 17   |
| `/404`                                                         | Estado inexistente                      | MVP        | 05   |
| `/rss.xml` e `/sitemap-index.xml`                              | Distribuição e SEO                      | MVP        | 16   |
