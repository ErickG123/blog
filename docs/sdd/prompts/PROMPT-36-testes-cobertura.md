# PROMPT 36 — Ampliação da cobertura de testes

## Missão
Execute a fase 36 do ciclo de evolução Mangá Atlas no repositório existente. Baseline declarado: 1.0.0, fases 00–23 concluídas. Objetivo do ciclo: 1.1.0, sem reescrita ou ampliação indevida de escopo.

## Pré-requisitos específicos
Leia `docs/reports/REPORT-PHASE-35.md`, todos os relatórios anteriores e as regras de governança vigentes. Leia o protocolo complementar abaixo integralmente. Verifique os critérios da fase anterior no checkout, atualize a matriz MA-AUD e identifique o que já está feito. Não avance se o pré-requisito essencial estiver bloqueado.

## Implementação obrigatória
- Releia TEST-PLAN e audite os 13 unitários/6 E2E iniciais versus estado atual. Mapeie requisitos e riscos MA-AUD aos testes existentes; priorize comportamento de risco, não quantidade artificial. Evite snapshots como única evidência e testes que reproduzem implementação sem verificar resultado.
- Unit: seletores e visibilidade com relógio fixo, datas/empates, rating, slug, relacionamento, filtros, paginação, leitura e helpers de SEO. Integração: schemas, referências, validador, CLI, renderização e build real/demo, assets, sitemap/RSS e índice Pagefind. E2E: navegação, home→detalhe, filtros, busca real, tema persistido/sistema, menu mobile, spoilers, galerias e teclado, 404 e links. Use fixtures estáveis e teste estados vazios/erro.
- Configure relatórios de cobertura se compatíveis com Vitest instalado; medir linhas/branches/functions/statements dos módulos de lógica, não fingir cobertura de .astro por instrumentação que não mede. Objetivo inicial 80% linhas e 70% branches em lógica crítica coberta, ajustar fundamentadamente por baseline e risco; registrar exclusões específicas. Não baixar limiar para passar nem perseguir cobertura de getters triviais.
- Testes determinísticos sem rede externa, relógio/timezone controlado, sem dependência da ordem, sem sleeps fixos se possível. Isolar builds e servers Playwright, usar porta controlada e config CI, capturar trace/screenshot em falha. Validar execução limpa, repetição dos críticos e ausência de flakiness conhecida. Não usar retries para esconder falha.
- Consolidar checklist único em `docs/testing/TEST-PLAN.md`, IDs estáveis, matriz requisito→teste→evidência→resultado; remover duplicação documental mantendo histórico. Atualizar CI se necessário sem deploy.

## Critérios de aceitação da fase
- [ ] MA-36.1 Requisitos e riscos prioritários rastreados até testes relevantes; lacunas justificadas.
- [ ] MA-36.2 Testes unit/integration/E2E executados e resultados reais registrados; fluxos críticos cobertos.
- [ ] MA-36.3 Cobertura medida e limites transparentes, testes determinísticos e isolamento verificado.
- [ ] MA-36.4 CI reproduz comandos e checklist central atualizado, sem suítes falsas/desativadas.

## Entregáveis específicos
Relatório de cobertura, matriz de rastreabilidade, resultados/artefatos e atualização TEST-PLAN/CI.

Relatório obrigatório `docs/reports/REPORT-PHASE-36.md`. Atualize o checklist único e roadmap com evidências, sem declarar sucesso se houver critérios pendentes.

---

# Protocolo obrigatório — evolução Mangá Atlas 1.1

## Baseline e autoridade
- O relatório informado pelo usuário descreve a conclusão das fases 00–23 e a versão 1.0.0. Isto é um baseline declarado, não prova de que o checkout atual está correto. Preserve implementação e conteúdo real; não reinicialize o projeto.
- Descubra raiz, branch, `git status`, scripts, versões efetivas, lockfile, configuração Astro, rotas e árvore de documentação. Não faça reset, clean destrutivo, force push, atualização indiscriminada ou deploy. Não sobrescreva alterações do usuário. Use Conventional Commits apenas quando autorizado; não invente hashes.
- Leia README.md, `docs/governance/AGENTS.md` (ou localização efetiva), regras/skills existentes, `docs/vision.md`, especificações, ADRs em `docs/adr/` ou caminho efetivo, arquitetura, design, `docs/roadmap/implementation-status.md`, `docs/testing/TEST-PLAN.md`, relatórios 00–23 e todos os relatórios complementares anteriores. Dê atenção especial ao relatório imediatamente anterior, às falhas abertas e às evidências. Descubra caminhos reais, sem criar duplicatas. Se houver regra conflitante, registre a decisão; não ignore instruções superiores.
- Leia `docs/sdd/` e os prompts originais pertinentes. O pacote complementar não substitui os documentos originais. As decisões aprovadas continuam válidas, salvo mudança explicitamente autorizada e documentada em ADR.
- Verifique pré-requisitos com código e testes reais. Corrija bloqueios pequenos dentro do escopo; se houver bloqueio material, registre PARCIAL/BLOQUEADO e não avance. Não declare uma fase pronta só porque o relatório anterior diz que está pronta.

## Limites e arquitetura
- Astro static-first (`output: 'static'`), TypeScript strict, SCSS, Markdown/MDX, Content Collections/Zod, Pagefind, npm/lockfile, Vitest e Playwright. Preserve a versão instalada, consultando documentação oficial correspondente se necessário. Não invente APIs. Adicione dependências somente quando indispensáveis, com justificativa e análise do custo.
- Feature-based pragmático: `src/pages` para roteamento/composição, `src/features` para capacidades, `src/shared` para reuso real. Modelos em `.model.ts`, lógica significativa em `.ts`, SCSS separado conforme convenções. Frontmatter de composição Astro é permitido; não crie camadas vazias nem frameworks de cliente adicionais sem decisão fundamentada. Reutilize seletores públicos e contratos existentes.
- Não implementar anúncios, AdSense, afiliados, monetização, autenticação, comentários, painel administrativo, CMS, backend, banco, integrações automáticas de catálogo, IA, rede social ou rastreamento. Não reservar espaços publicitários nem introduzir scaffolding para escopo futuro.
- Preserve URLs e IDs existentes, relacionamentos, conteúdo real, política editorial e histórico. Não invente dados factuais ou avaliações atribuídas ao usuário. Use fixtures sintéticas explicitamente identificadas; imagens próprias, autorizadas ou licenciadas, com proveniência e créditos. Não baixar capas sem autorização ou remover marcas; caso não haja ativos permitidos, criar ilustrações originais neutras para obras fictícias e registrar a limitação. Não hotlinkar nem depender de serviços externos para demo/testes.
- Produção: nenhum fixture, rascunho ou agendado indevido em HTML, rotas, assets publicados, índice Pagefind, RSS, sitemap, dados estruturados, links, contagens ou recomendações. Centralize o predicado de visibilidade; datas com relógio controlável nos testes e convenção documentada. Demo explícita, isolada e nunca selecionada por CI de deploy.
- Visual: blog autoral de anime/mangá, não revista, portal noticioso, landing page SaaS ou dashboard. Capas e texto protagonistas, grafite/vermelho/roxo discreto, sem emojis, gradientes excessivos, glassmorphism, grandes áreas vazias, títulos gigantes ou cards em tudo. Claro/escuro/sistema; usar ícones Lucide acessíveis; não distorcer capas. pt-BR, foco visível, redução de movimento, navegação sem mouse e WCAG 2.2 AA como meta. Não sacrificar conteúdo sem JS, salvo interação essencial explicitamente tratada.

## Execução, evidência e encerramento (obrigatório)
1. Registre hipótese, escopo, baseline e plano curto. Verifique se já há implementação: complete ou corrija em vez de duplicar. Execute a fase no repositório, não apenas sugira código.
2. Use comandos portáveis Windows/Linux e scripts npm reais. Rode `format:check`, `lint`, `check`, `test`, validação de conteúdo, build real, build demo e E2E quando aplicável; descubra nomes reais e registre comandos exatos, exit codes, quantidades e falhas. Não desabilite regras/testes para obter verde. Se precisar instalar, use instalação reprodutível. Evite misturar dist real/demo e índices.
3. Para UI, capture screenshots reais via navegador em 1440×900 e 390×844, temas claro e escuro, rotas afetadas e estados representativos. Verifique 320px, 768px, 1024px, 1920px quando pertinente; navegue por teclado, teste foco e scroll, console, erros de rede, imagens, layout e estados. Compare antes/depois usando mesma viewport e fixture. Analise visualmente as evidências, não só capture. Armazene em `docs/reports/evidence/phase-NN/` ou caminho documentado. Se navegador indisponível, não aprove UI.
4. Atualize `docs/roadmap/implementation-status.md`, `docs/testing/TEST-PLAN.md` (checklist único com IDs e evidências), specs/ADRs/design pertinentes e README quando mudar operação. Atualize changelog em `docs/CHANGELOG.md` sem inventar release; fases registram em Unreleased até fase 38. Documentação dentro de docs, preservando README e eventual ponto de entrada AGENTS exigido pelo CLI. Não reescreva histórico.
5. Gere `docs/reports/REPORT-PHASE-NN.md`: objetivo, baseline, docs lidos, divergências, decisões, arquivos, comandos/resultados reais, screenshots/artefatos, critérios por ID PASS/FAIL/N/A com justificativa, riscos, pendências e condição para próxima fase. Auditorias em `docs/audits/` quando cabível, referenciadas pelo relatório. Status CONCLUÍDO somente com todos critérios obrigatórios comprovados; PARCIAL/BLOQUEADO quando faltam evidências ou requisitos. Não invente métricas, logs ou screenshots. Não execute a próxima fase dentro deste prompt.
