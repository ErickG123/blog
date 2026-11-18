# Auditoria — fase 11: consolidação técnica, visual e editorial

Data: 2026-11-17 (revisão incremental)

## Fontes revisadas

Lidos os relatórios das fases 00–10, auditoria baseline, SPEC-0001, roadmap, arquitetura, ADRs 0001–0005, guia editorial, testes e pacote fonte `docs/sdd-source/`. A auditoria compara o conteúdo das decisões com o código atual; o status histórico dos documentos não foi tratado como prova de implementação.

## Estado inicial observado

- Astro estático 7.x com `site` e `base: /blog`, Content Collections para posts, obras, autores e taxonomias.
- Existia somente `src/content/posts/ola-mundo.md`, artigo técnico legado. As collections de obras, autores e taxonomias estavam sem conteúdo real.
- Build anterior emitia 13 páginas/artefatos públicos, incluindo rotas legadas e categorias vazias; páginas individuais de obra e temporada dependem de conteúdo.
- `npm test` 6/6, build, verificação estática, E2E 4/4 e auditoria de produção sem vulnerabilidades haviam passado no baseline registrado.
- Catálogo filtrava apenas tipo e gênero, sem busca/ano/estação/reset combinados. Taxonomias não tinham referências canônicas nas entradas. Não havia matriz visual de páginas, larguras e temas nem métrica registrada de contraste.
- A inspeção atual encontrou um `<main>` em cada rota examinada, sem reprodução do problema de `main` aninhado descrito em registro anterior.
- Execução de GitHub Actions remota não foi consultada; status remoto não verificado.

## Mudanças verificadas nesta fase

1. Filtros combináveis de busca textual (sem acento), tipo, gênero, ano e estação em helper compartilhado, com contagem, limpeza e mensagem de estado vazio. Referências de gênero apontam para taxonomias canônicas. Cobertura unitária inclui combinação, ausência de resultado e reset.
2. Schemas editoriais preparados para fontes e proveniência de capa/avatar: crédito e URL de origem para imagens de capa, referências de autor/obra/taxonomia e texto alternativo de mídia. Templates exibem fontes/atribuição onde cadastradas.
3. Contraste semântico do acento e das bordas ajustado. Página inicial, artigo, tags e templates de catálogo passaram por correções estruturais/semânticas; home não tinha regressão de `main` no estado auditado.
4. Script Playwright varre 11 rotas públicas geradas x 3 larguras x 2 temas = 66 combinações; verifica overflow, landmarks/headings básicos, nomes acessíveis/labels/alt, foco após Tab, preferência de movimento reduzido e contraste de tokens. Foram inspecionadas capturas desktop claro, catálogo tablet escuro e home mobile escuro.
5. Conteúdo inicial proposto em documento separado. Nenhuma obra, autoria ou notícia fictícia foi adicionada às collections.
6. Pasta fonte `anime-blog-sdd` centralizada em `docs/sdd-source/`; documentos de referência aninhados ficam em `docs/sdd-source/reference/`, prompts em `docs/sdd-source/prompts/`. O histórico foi preservado e o README raiz aponta ao índice `docs/README.md`.
7. Auditoria incremental adicionou axe-core às mesmas 66 combinações. Os primeiros resultados encontraram contraste baixo no botão de copiar, breadcrumb distinguido somente por cor e findings dentro do iframe de comentários externo. Contraste e sublinhado foram corrigidos; o container Giscus, que pertence a terceiro, foi excluído da verificação axe. Segunda varredura passou sem violações próprias.
8. `check:static` ampliado para canonical, Open Graph, Twitter Card, metadados da 404 e paths `/blog/`; checagem passou.
9. Consulta do workflow público encontrou o run #5 (`b3cba29`) em falha na etapa `Install dependencies`; passos seguintes foram pulados. Logs detalhados requerem autenticação e não puderam ser consultados; causa específica permanece desconhecida. Atualizado `.github/workflows/deploy.yml` de actions v4 para v5 para alinhar runtimes Node 24 após anotação de depreciação no run.
10. Mensagem do editor sobre `astro/tsconfigs/strict` foi reproduzida após `npm ci` parcialmente remover `node_modules` e falhar com `EPERM` no binding nativo do Astro. `tsconfig.json` permaneceu válido; `npm install --no-audit --no-fund` restaurou `astro/tsconfigs/strict.json` e `npm run typecheck` passou sem diagnósticos.

## Resultados do smoke visual/a11y

- 66/66 combinações concluídas; 0 casos de overflow horizontal.
- Cada página examinada tinha exatamente um `h1` e um `main`; sem saltos de nível de heading detectados pelo verificador.
- 0 links/botões sem nome computável, campos sem label ou imagens sem atributo `alt`.
- Foco após Tab com outline mínimo de 3 px; `prefers-reduced-motion` ativo durante a varredura.
- Contraste mínimo medido entre tokens: tema claro texto 14,63:1, muted 4,76:1, acento 5,18:1, borda 3,43:1; tema escuro texto 15,31:1, muted 7,36:1, acento 11,19:1, borda 3,97:1.
- Capturas e dados brutos locais (ignorados pelo Git): `test-results/phase11-visual/`.
- axe-core: 0 violações nas 66 combinações após correções. O iframe do Giscus foi excluído da árvore axe, pois é conteúdo externo; sua experiência acessível precisa ser verificada com o fornecedor/na página publicada.

## Limitações

Este é um smoke automatizado, não uma certificação WCAG. Não foi feita sessão completa com leitor de tela ou auditoria manual de todas as interações por teclado. O iframe Giscus foi excluído do axe. Rotas de detalhe de obra e temporada não foram exercitadas por ausência de entradas. Conteúdo e imagens reais aguardam produção, checagem de fonte/licença e aprovação editorial. O GitHub Actions remoto foi consultado e falhou antes dos checks, durante `Install dependencies`; logs detalhados e domínio publicado não foram acessíveis nesta auditoria. A auditoria atual de dependências de produção registra 9 entradas altas transitivas ligadas ao advisory [CVE-2026-112366 / GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf), cujo registro não declara uma versão corrigida no momento da checagem.

Consulte `docs/reports/REPORT-PHASE-11.md` para comandos e `docs/reports/RELEASE-READINESS-PHASE-11.md` para a decisão de prontidão.
