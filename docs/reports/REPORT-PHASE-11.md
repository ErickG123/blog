# Relatório da fase 11 — consolidação técnica, visual e editorial

Data: 2026-11-17 (revisão incremental)

## Estado inicial e final

Inicialmente, o projeto preservava as rotas Astro e o artigo legado, mas o catálogo tinha filtros parciais, taxonomias sem relações tipadas, faltava uma matriz visual/acessibilidade e a proveniência editorial das mídias não estava completa. Ao final, o catálogo aceita filtros combinados, os schemas e templates suportam relações/fontes/crédito de mídia, foram adicionados verificadores locais e a documentação SDD ficou centralizada em `docs/`. O conteúdo de anime/mangá continua vazio porque não há material verificado aprovado.

## Arquivos alterados

- Aplicação: `src/content.config.ts`, `src/layouts/Layout.astro`, páginas de home, artigos, tags, 404, RSS e as novas páginas/listagens `animes`, `mangas`, `noticias`, `reviews`, `guias`, `obras` e `temporadas`; componentes compartilhados, scripts cliente e helper de filtros.
- Conteúdo: frontmatter legado atualizado para schema compatível; diretórios vazios para autores/obras/taxonomias. Sem novas pautas publicadas.
- Qualidade: `package.json`/lockfile, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, testes unitários/E2E e scripts de verificação estática/visual; workflow `.github/workflows/deploy.yml` atualizado.
- Revisão incremental: axe-core integrado ao smoke, contraste/breadcrumb do artigo corrigidos, static checker agora valida metadados SEO/base path, actions checkout/setup-node atualizadas para v5 e auditoria de dependências de produção adicionada como gate no workflow.
- Documentação: `README.md`, `.env.example`, `.gitignore`, índice, arquitetura, especificação, ADR-0005, roadmap, guia editorial, proposta editorial, auditoria e relatório de prontidão. Todo o pacote prévio `anime-blog-sdd/` foi movido para `docs/sdd-source/` com `reference/` e `prompts/` preservados.

## Funcionalidades e pendências resolvidas

- Busca sem acentos combinada com tipo, gênero, ano e estação, estado vazio, contagem e reset do catálogo; referências tipadas para taxonomias.
- Schemas e templates para relações entre posts, autores e obras, lista de fontes e proveniência de capa/avatar. Conteúdo incompleto continua fora das páginas públicas.
- Ajuste de contraste de tokens e smoke visual sem overflow na matriz disponível.
- Typecheck Astro explícito, ESLint, testes unitários e E2E, link check com `base: /blog` e smoke visual incluídos localmente e no workflow.
- Arquivo SDD arquivado sob `docs/` sem apagar prompts/documentos fonte.

## Testes executados e resultados reais

| Comando | Resultado |
|---|---|
| `npm ci` (execução inicial) | passou naquela execução. Na revisão de 17/11, duas tentativas falharam em Windows com `EPERM` ao remover o binding nativo do Astro; `npm install --no-audit --no-fund` restaurou dependências e Astro Check voltou a passar. |
| `npm run typecheck` | 0 erros, 0 warnings, 0 hints (35 arquivos) |
| `npm run lint` | sucesso |
| `npm test` | 10 testes passaram |
| `npm run build` | sucesso; 13 páginas/artefatos rotados gerados |
| `npm run check:static` | sucesso; rotas obrigatórias, prefixo `/blog/` e destinos locais presentes |
| `npm run audit:ui` | sucesso; 66 combinações rota x viewport x tema; axe-core sem violações próprias após correções |
| `npm run test:e2e` | 4 testes passaram |
| `npm audit --omit=dev` (revisão de 17/11) | falhou: 9 entradas de alta severidade ligadas ao advisory `GHSA-fc5q-39xc-vjpf`/CVE-2026-112366 em picomatch transitivo de Astro/Vite; o npm não lista versão corrigida. `npm audit fix` sugere downgrade major, que não foi aplicado. |
| `git diff --check` | sem erros; Git apenas informou normalização LF→CRLF para `src/pages/index.astro` |

O build emite avisos esperados de collections vazias para obras, autores e taxonomias. Nenhum conteúdo fictício foi incluído para suprimir esses avisos.

## Execução remota e instalação limpa

O [run público #5 do GitHub Actions](https://github.com/ErickG123/blog/actions/runs/44000796387), disparado por `b3cba29`, falhou em **Install dependencies**; typecheck, lint, testes, build e deploy foram pulados. O sumário público não expõe a mensagem detalhada sem autenticação, então a causa remota não foi inferida. O run também anotou depreciação de runtime Node 20 em `checkout@v4` e `setup-node@v4`; o workflow foi atualizado para v5, ainda sem nova execução remota. No workspace, `npm ci` falhou duas vezes com `EPERM` ao tentar apagar o binding nativo do Astro no Windows; isso também deixou `astro/tsconfigs/strict.json` ausente e gerou a mensagem do editor sobre `tsconfig.json`. O arquivo de configuração não estava incorreto: `npm install --no-audit --no-fund` restaurou Astro e o typecheck passou com 0 erros, 0 warnings e 0 hints. A instalação limpa local e execução remota ainda precisam ser repetidas/diagnosticadas.

## Evidências visuais e acessibilidade

O verificador percorreu home, cinco categorias, catálogo, temporadas, artigo legado, tag e 404 em desktop 1440×900, tablet 768×1024 e mobile 375×812, nos temas claro/escuro. Resultado: nenhum overflow, um `h1`/`main` por página, sem headings saltados detectados, links/botões nomeados, campos rotulados, imagens com alt, foco visível e preferência `reduce` ativa. Contraste medido nos tokens ficou acima de 4,5:1 para texto/muted/acento e 3:1 para bordas nos dois temas. Capturas inspecionadas manualmente: home desktop claro, catálogo tablet escuro e home mobile escuro; os 66 resultados estão em `test-results/phase11-visual/results.json` (artefato local ignorado pelo Git).

Uma segunda varredura incluiu axe-core nos níveis WCAG 2.1 A/AA e best-practice e passou sem violações no conteúdo próprio. `#giscus-container` foi excluído por conter iframe externo de terceiro; sua acessibilidade ainda depende de revisão do fornecedor e do ambiente publicado. O checker estático agora valida canonical, Open Graph, Twitter Card, 404 `noindex` e paths sob `/blog/`.

## Pendências restantes e riscos

- Ainda não há conteúdo real de anime/mangá: autores, obras, pautas, fontes e imagens precisam de produção, validação e aprovação editorial.
- As rotas de detalhe de obra/temporada não foram renderizadas nem auditadas por falta de entradas.
- A auditoria de acessibilidade é smoke próprio e não substitui leitor de tela, checagem humana completa de teclado nem avaliação WCAG por combinação real de componentes.
- Execução remota do GitHub Actions foi consultada e falhou durante instalação de dependências; logs completos, publicação e comportamento do domínio real não foram acessados.
- Auditoria de dependências reporta o alerta alto [CVE-2026-112366 / GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf), sem patch declarado pelo advisory; aguardar versão corrigida e repetir `npm audit --omit=dev`.
- O post legado é técnico e alheio à linha editorial proposta; a equipe deve decidir se permanece publicado antes da divulgação do blog temático.

## Centralização da documentação

`anime-blog-sdd/` foi movido integralmente para `docs/sdd-source/`. Os prompts estão em `prompts/`, referências em `reference/`; o índice em `docs/README.md` identifica documentos vigentes e arquivo histórico.

## Decisão

O código está pronto para revisão local e preview técnico sob `base: /blog`, mas a decisão para release público permanece **NO-GO** até existir conteúdo editorial aprovado, o workflow passar após diagnóstico, e a vulnerabilidade ser corrigida ou formalmente aceita. Ver `docs/reports/RELEASE-READINESS-PHASE-11.md`.
