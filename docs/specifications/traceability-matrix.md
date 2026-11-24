# Matriz de Rastreabilidade — Mangá Atlas

Mapeamento entre requisitos (`SPEC-0001`), fases do roadmap e verificação no `docs/testing/TEST-PLAN.md`.

| Requisito | Descrição resumida                         | Fase responsável | Verificação / Teste alvo                       |
| --------- | ------------------------------------------ | ---------------- | ---------------------------------------------- |
| `FR-01`   | Página inicial editorial                   | 06               | E2E + evidência visual Fase 06                 |
| `FR-02`   | Biblioteca e ficha de obras                | 07               | Unitário (seletores) + E2E Fase 07             |
| `FR-03`   | Sistema de reviews (notas/escopo)          | 08               | Unitário (schema/regras) + E2E Fase 08         |
| `FR-04`   | Artigos e análises                         | 09               | Build + E2E Fase 09                            |
| `FR-05`   | Guias e recomendações                      | 10               | Unitário (ordenação) + E2E Fase 10             |
| `FR-06`   | Colecionismo e edições físicas             | 11               | Unitário (relações) + E2E Fase 11              |
| `FR-07`   | Criadores, editoras e estúdios             | 12               | Unitário + E2E Fase 12                         |
| `FR-08`   | Categorias, tags, filtros e paginação      | 13               | Unitário (paginação) + E2E Fase 13             |
| `FR-09`   | Pesquisa global estática (Pagefind)        | 14               | Build + índice Pagefind + E2E Fase 14          |
| `FR-10`   | Ferramentas editoriais e CLI               | 15               | Unitário CLI + validador Fase 15               |
| `FR-11`   | SEO, RSS e distribuição                    | 16               | Validação XML/RSS/metatags Fase 16             |
| `FR-12`   | Páginas institucionais                     | 17               | E2E rotas institucionais Fase 17               |
| `FR-13`   | Temas claro/escuro/sistema                 | 04 / 05          | Evidência visual ambos os temas Fase 04/05     |
| `FR-14`   | Política e componente de spoilers          | 04 / 08          | E2E teclado/sem JS Fase 04/08                  |
| `FR-15`   | Estados vazio, 404, rascunho, futuro, erro | 03 / 05          | Unitário (filtro público) + E2E 404 Fase 03/05 |
| `NFR-01`  | Acessibilidade WCAG 2.2 AA                 | 04–20            | Auditoria visual e a11y Fase 20                |
| `NFR-02`  | Responsividade 320px+                      | 04–20            | Screenshots 320/390/1440 Fase 04–20            |
| `NFR-03`  | Orçamento de desempenho                    | 21               | Auditoria técnica Fase 21                      |
| `NFR-04`  | Navegação essencial sem JS                 | 05 / 20          | Teste sem JS Fase 20/21                        |
| `NFR-05`  | Privacidade e segurança                    | 21 / 22          | Auditoria de headers e assets Fase 21/22       |
| `NFR-06`  | Idioma pt-BR e datas ISO                   | 02 / 03          | Unitário de formatação Fase 02                 |
| `NFR-07`  | Build determinístico e CI                  | 00 / 22          | `npm ci && npm run build` + GitHub Actions     |
