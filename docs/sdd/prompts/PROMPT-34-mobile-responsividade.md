# PROMPT 34 — Experiência mobile e responsividade

## Missão
Execute a fase 34 do ciclo de evolução Mangá Atlas no repositório existente. Baseline declarado: 1.0.0, fases 00–23 concluídas. Objetivo do ciclo: 1.1.0, sem reescrita ou ampliação indevida de escopo.

## Pré-requisitos específicos
Leia `docs/reports/REPORT-PHASE-33.md`, todos os relatórios anteriores e as regras de governança vigentes. Leia o protocolo complementar abaixo integralmente. Verifique os critérios da fase anterior no checkout, atualize a matriz MA-AUD e identifique o que já está feito. Não avance se o pré-requisito essencial estiver bloqueado.

## Implementação obrigatória
- Audite todas as famílias de páginas com 320, 360, 390, 768, 1024, 1440 e 1920 px; desktop e mobile, ambos temas, demo e estado vazio real. Use viewport em CSS px, não zoom artificial. Verifique reflow/zoom até 200% quando aplicável, orientação e uso por toque.
- Corrija overflow na origem (grid minmax, min-width, texto, imagens, tabelas, containers, gutters), nunca esconder horizontal globalmente para mascarar. Preserve scroll interno intencional em tabelas e blocos largos. Cabeçalho/menu mobile não deve sobrepor conteúdo ou prender scroll; fechar por Escape e restaurar foco quando adequado.
- Melhore áreas clicáveis, densidade, espaçamento, contraste, filtros mobile, botão tema/busca, ordem visual/DOM, breadcrumb, paginação, galerias e índice. Evite barras fixas que escondem conteúdo; controle foco após navegação. Respeite safe areas quando necessário e reduced motion.
- Verifique capas e fotos não deformadas, proporções e carregamento; títulos longos em pt/ja, artigos, lista extensa, modais e resultados. Teste teclado, toque emulado e navegação sem hover. Não alegue teste em dispositivo real se usou somente emulação.
- Automatize detecção de overflow por rota/viewport e inspeção dos elementos causadores. Combine com avaliação visual real; não confundir `scrollWidth` igual com layout bom. Documente exceções intencionais.

## Critérios de aceitação da fase
- [ ] MA-34.1 Matriz de rotas/viewports/temas executada, zero overflow de página não intencional.
- [ ] MA-34.2 Menu, filtros, busca, tema, galerias e paginação operáveis por teclado/toque.
- [ ] MA-34.3 Conteúdo legível e imagens preservadas; foco e scroll coerentes.
- [ ] MA-34.4 Screenshots e resultados de testes por família, limitações de dispositivo registradas.

## Entregáveis específicos
Auditoria responsiva, matriz de viewport, testes de overflow e interação, capturas antes/depois.

Relatório obrigatório `docs/reports/REPORT-PHASE-34.md`. Atualize o checklist único e roadmap com evidências, sem declarar sucesso se houver critérios pendentes.

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
