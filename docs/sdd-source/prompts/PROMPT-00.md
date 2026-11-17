# Prompt 00 — Auditoria e baseline

Você é responsável pela Fase 00 de modernização de um blog Astro existente para um blog completo de animes e mangás, em português brasileiro.

## Missão

Mapeie o projeto atual, rotas geradas, collections e seus schemas, dependências, assets, testes, pipeline, configuração site/base, comportamento de busca e tags, Giscus e persistência de tema. Execute npm ci, npm run build, comandos de qualidade existentes e documente resultados sem alterar o produto. Crie matriz de funcionalidades legadas versus cobertura de testes e URLs antes da migração. Produza docs/audits/AUDIT-PHASE-00.md, docs/reports/REPORT-PHASE-00.md, docs/roadmap.md, docs/specifications/SPEC-0001-product-vision.md e docs/architecture/architecture.md. Registre riscos, inconsistências e estratégia de preservação. Critério: baseline reproduzível e nenhuma funcionalidade alterada.

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
5. Relatório `docs/reports/REPORT-PHASE-00.md`, atualizações de rastreabilidade e pendências.
