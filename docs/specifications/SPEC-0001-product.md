# SPEC-0001 — Especificação de Produto do Mangá Atlas

- **Status**: Aprovada
- **Fase**: 01
- **Data**: 2026-11-23
- **Responsável**: Agente de Engenharia (Mangá Atlas)

## 1. Contexto e distinção fundamental

O **Mangá Atlas** separa estritamente:

- **Conteúdo de obra (catálogo/referência)**: dados factuais e estruturados sobre obras (`Work`), edições físicas (`Edition`), criadores (`Creator`), editoras (`Publisher`), estúdios (`Studio`), gêneros (`Genre`) e relações entre obras (`WorkRelationship`).
- **Conteúdo editorial (autoral)**: textos opinativos ou analíticos escritos pelo autor — `Review`, `Article`, `Recommendation` e `CollectingPost`.

## 2. Requisitos Funcionais (FR)

### MVP Obrigatório

| ID      | Área                         | Requisito                                                                                                                                                                                | Critério verificável                                                                                     | Fase    |
| ------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------- |
| `FR-01` | Home                         | Página inicial editorial destacando publicações recentes, reviews em destaque, acesso à biblioteca e colecionismo.                                                                       | Exibe seções reais a partir das coleções públicas; sem vazamento de rascunhos/agendados.                 | 06      |
| `FR-02` | Biblioteca                   | Listagem e ficha individual de obras (mangá, anime, manhwa) com metadados factuais, obras relacionadas, edições e publicações vinculadas.                                                | Rota `/obras/` e `/obras/[slug]/` funcionam; ficha separa fatos de críticas.                             | 07      |
| `FR-03` | Reviews                      | Reviews de volumes, obras completas, arcos, temporadas ou filmes, com escopo explícito, nota opcional (0 a 5, passo 0,5 ou sem nota), veredito textual opcional e critérios por formato. | Rota `/reviews/` e `/reviews/[slug]/`; valida intervalo de nota e escopo; nenhuma média automática.      | 08      |
| `FR-04` | Artigos                      | Artigos e análises aprofundadas com sumário (TOC), tempo de leitura, obras citadas e referências.                                                                                        | Rota `/artigos/` e `/artigos/[slug]/`; renderiza MDX confiável com semântica correta.                    | 09      |
| `FR-05` | Guias                        | Guias e listas ordenadas de recomendações conectadas a obras da biblioteca.                                                                                                              | Rota `/guias/` e `/guias/[slug]/`; ordem determinística preservada.                                      | 10      |
| `FR-06` | Colecionismo                 | Posts de colecionismo e ficha de edições físicas (editora, formato, papel, acabamento, fotos próprias/autorizadas, comparação entre edições).                                            | Rota `/colecionismo/` e `/colecionismo/[slug]/`; conecta edições à obra e editora.                       | 11      |
| `FR-07` | Criadores e Organizações     | Páginas de criadores (autores, ilustradores, diretores), editoras e estúdios com lista de obras e publicações relacionadas.                                                              | Rotas `/criadores/[slug]/`, `/editoras/[slug]/`, `/estudios/[slug]/`.                                    | 12      |
| `FR-08` | Categorias, Tags e Paginação | Navegação por categorias, tags, filtros e paginação determinística.                                                                                                                      | Rotas `/tags/[slug]/`, páginas numeradas estáveis, filtros utilizáveis via teclado.                      | 13      |
| `FR-09` | Pesquisa Global              | Pesquisa estática client-side (Pagefind) sobre conteúdo público publicado.                                                                                                               | Rota `/busca/` encontra obras e publicações sem backend; rascunhos excluídos do índice.                  | 14      |
| `FR-10` | Ferramentas Editoriais       | CLI/scripts para scaffolding de conteúdo e validação de integridade editorial antes do build.                                                                                            | Comando gera template válido e validador falha em referências quebradas ou campos inválidos.             | 15      |
| `FR-11` | SEO, RSS e Distribuição      | Metatags canônicas, Open Graph, sitemap XML, feed RSS em pt-BR e compartilhamento simples sem rastreadores.                                                                              | `sitemap-index.xml`, `rss.xml`, `<link rel="canonical">` e metadados presentes no build.                 | 16      |
| `FR-12` | Páginas Institucionais       | Páginas Sobre, Política Editorial, Política de Spoilers e Contato/Canais complementares.                                                                                                 | Rotas `/sobre/`, `/politica-editorial/`, `/contato/` acessíveis pelo menu/rodapé.                        | 17      |
| `FR-13` | Temas                        | Alternância de tema Claro, Escuro e Sistema sem flash brusco e com persistência local opcional.                                                                                          | Atributo `data-theme` aplicado, contraste WCAG AA em ambos os temas.                                     | 04 / 05 |
| `FR-14` | Spoilers                     | Indicação clara de nível de spoiler (`none`, `light`, `heavy`) e blocos ocultos reveláveis apenas por ação explícita do leitor.                                                          | Componente acessível por teclado (`<details>` ou botão ARIA), funcional mesmo sem JS.                    | 04 / 08 |
| `FR-15` | Estados de Exceção           | Tratamento explícito de estados: vazio (sem itens), inexistente (404), rascunho (`draft`), publicação futura (`scheduled`) e erro de validação no build.                                 | Página `404.astro` amigável; consultas públicas filtram `draft`/futuros; build falha em schema inválido. | 03 / 05 |

### Aprimoramentos (pós-MVP / opcionais dentro das fases)

- `FR-16` (Aprimoramento — Fase 16): botão de cópia de link canônico com feedback acessível (`aria-live`).
- `FR-17` (Aprimoramento — Fase 13): filtros combinados progressivos em listagens com fallback estático sem JS.

## 3. Requisitos Não Funcionais (NFR)

| ID       | Categoria               | Requisito / Meta                                                                                                                                                                           | Verificação                                         |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| `NFR-01` | Acessibilidade          | Conformidade alvo **WCAG 2.2 AA**: navegação integral por teclado, foco visível, contraste mínimo 4.5:1 (texto normal) e 3:1 (grande/UI), landmarks semânticos e `prefers-reduced-motion`. | Auditoria manual + Playwright/axe na Fase 20.       |
| `NFR-02` | Responsividade          | Layout funcional sem overflow horizontal a partir de `320px` até desktop `1440px+`.                                                                                                        | Evidências visuais `320px`, `390x844` e `1440x900`. |
| `NFR-03` | Desempenho (metas)      | Orçamento alvo: LCP < 2.5s, CLS < 0.1, JS inicial mínimo (< 30 KB gzipped fora da busca), imagens com `width`/`height` explícitos e lazy loading abaixo da dobra.                          | Auditoria técnica na Fase 21.                       |
| `NFR-04` | Progressive Enhancement | Todo conteúdo essencial (leitura, navegação, spoilers via `<details>`, links) funciona sem JavaScript.                                                                                     | Teste com JS desabilitado na Fase 20/21.            |
| `NFR-05` | Privacidade e Segurança | Zero scripts de rastreamento de terceiros, zero cookies de terceiros, MDX exclusivamente versionado pelo autor, headers de segurança recomendados para Cloudflare Pages.                   | Revisão de build e `_headers` na Fase 21/22.        |
| `NFR-06` | Idioma e Datas          | Todo conteúdo em `pt-BR`; datas armazenadas em ISO-8601 (`YYYY-MM-DD` ou timestamp com timezone explícito `America/Sao_Paulo` / `-03:00`) e exibidas em formato brasileiro legível.        | Testes unitários de formatação na Fase 02/03.       |
| `NFR-07` | Reprodutibilidade       | Build estático determinístico via `npm ci && npm run build` em Windows e Linux.                                                                                                            | CI (GitHub Actions) na Fase 22.                     |

## 4. Regras de Notas e Spoilers

- **Notas**: opcionais (`0` a `5` em passos de `0.5`, ou `null`/ausente para textos sem nota). Jamais calcular médias automáticas ou importar notas de terceiros.
- **Veredito**: texto editorial curto opcional, independente da nota numérica.
- **Critérios por formato**: mangá/manhwa (arte, ritmo, edição/tradução quando aplicável), anime (direção, animação, trilha, adaptação) — sempre opcionais.
- **Spoilers**: toda publicação declara `spoilerLevel` (`none` | `light` | `heavy`). Blocos com spoilers dentro do texto usam marcação semântica fechada por padrão (`<details>`).

## 5. Fora de escopo

Confirmado conforme `AGENTS.md`: sem monetização, banco de dados, backend, autenticação, comentários, CMS, integrações automáticas com catálogos, IA, rede social ou rastreadores.
