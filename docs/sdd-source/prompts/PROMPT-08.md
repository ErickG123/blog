# Prompt 08 — SEO, RSS, acessibilidade e performance

Você é responsável pela Fase 08 de modernização de um blog Astro existente para um blog completo de animes e mangás, em português brasileiro.

## Missão

Revise titles, meta descriptions, canonical, Open Graph, imagens sociais, robots, sitemap, feeds RSS, semântica HTML, breadcrumbs, JSON-LD apropriado e performance. Exclua drafts. Teste URL base com e sem subdiretório GitHub Pages; não faça claims de SEO sem testar. Audite imagens remotas/local, dimensões, lazy load e CLS, front-end JS, fontes e acessibilidade. Preserve 404. Gere relatório com evidências de rotas e links internos. Critério: build e auditoria de smoke das páginas geradas.

## Instruções globais

# Regras obrigatórias para todas as fases

- Trabalhe no repositório existente; não recrie o projeto e não suponha que caminhos descritos sejam o código atual sem inspecionar os arquivos.
- Antes de qualquer alteração, leia README, package.json, astro.config.mjs, src/content.config.ts, .github/workflows, docs/**, .agents/** e todos os relatórios/auditorias anteriores disponíveis.
- Execute Spec-Driven Development: documente requisitos e critérios de aceite antes de alterar o código, atualize ADRs quando houver decisão arquitetural e registre evidências após implementar.
- Não altere funcionalidades não relacionadas nem introduza backend, banco de dados, autenticação, CMS, framework SPA ou dependências desnecessárias.
- Preserve por padrão URLs, posts existentes, busca, tags, leitura estimada, índice de títulos, progresso, compartilhamento, copiar link, navegação entre posts, Giscus, temas, RSS, sitemap, 404 e GitHub Pages.
- Compatibilidade com o Astro instalado: valide APIs e versões reais, não force upgrade grande sem justificativa. Se alguma alteração de rota for indispensável, documente plano de migração e teste links.
- Separe estrutura, conteúdo, estilos e lógica. Componentes .astro para apresentação; funções puras e tipadas para transformação de conteúdo.
- Garanta layout mobile, acessibilidade de teclado, focus visible, contraste, reduced motion e modo claro/escuro.
- Não invente informações sobre obras, lançamentos, avaliações, licenças ou anúncios reais. Use fixtures explícitas e não publique exemplos fictícios como notícia.
- Não copie imagens sem autorização; registre origem, permissões e créditos de mídia. Não crie hotlink frágil como padrão.
- Execute checks, build e testes disponíveis; reporte falhas reais, não declare execução bem-sucedida sem evidência.
- Ao final, crie docs/reports/REPORT-PHASE-XX.md com escopo, alterações, decisões, testes (comandos/resultados), pendências e riscos; atualize docs/roadmap.md e checkboxes de requisitos.
- Não avance automaticamente para a fase seguinte se houver bloqueio crítico, build quebrado ou regressão não resolvida; registre a causa.

## Saída esperada

1. Diagnóstico do estado antes da alteração.
2. Especificações e critérios de aceite da fase.
3. Alterações de código e conteúdo necessárias.
4. Testes e build com resultados reais.
5. Relatório `docs/reports/REPORT-PHASE-08.md`, atualizações de rastreabilidade e pendências.
