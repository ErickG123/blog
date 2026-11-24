# Fase 23 — Estabilização final e preparação da versão 1.0.0

## Objetivo

Reconciliar todo o projeto, validar regressões e estabelecer condições reais para lançamento.

**Pré-requisito:** Fase 22 concluída e verificada em `docs/reports/REPORT-PHASE-22.md`; revise também as fases anteriores pertinentes.

## Protocolo obrigatório de execução (todas as fases)

Você atua como agente de engenharia no repositório Mangá Atlas. Execute a fase de fato, com alterações e validações no repositório; não se limite a descrever código. Não declare sucesso sem evidência.

### Antes de alterar
- Confirme a raiz, árvore, `git status`, branch, alterações locais e stack existente. Preserve alterações do usuário; não use reset/clean destrutivos, force push ou reescrita de histórico. Se o diretório não for o projeto correto, pare e relate.
- Leia `AGENTS.md`, `.agents/rules/`, `.agents/skills/`, `README.md`, documentos pertinentes em `docs/specifications/`, ADRs e auditorias, `docs/roadmap/implementation-status.md`, `docs/testing/TEST-PLAN.md` e os relatórios de todas as fases anteriores (em especial a imediatamente anterior). Na fase 00, crie os artefatos ausentes; nas demais, ausência de pré-requisito essencial é bloqueio, não autorização para inventar evidência.
- Compare documentos com código e testes reais; verifique pendências e riscos. Resolva pré-requisitos pequenos e claramente pertencentes ao escopo, registrando a correção. Se houver conflito de requisitos ou bloqueio relevante, registre e não avance silenciosamente.
- Planeje mudanças mínimas e coerentes. Consulte documentação oficial das versões instaladas quando necessário; use versões estáveis compatíveis, lockfile e instalação reprodutível. Não invente APIs nem execute instalação global sem necessidade.

### Restrições transversais
- Astro com saída estática, TypeScript strict, feature-based pragmático; `src/pages` concentra rotas e composição, `src/features` comportamento e UI de cada área, `src/shared` apenas o que é genuinamente reutilizado. Modelos de domínio em `.model.ts`; schemas em `.schema.ts` se útil, sem duplicar tipos inferíveis. Componentes `.astro` podem reunir markup e frontmatter de composição nativos; extraia lógica significativa em `.ts` e estilos em `.scss` separados. Evite abstrações, pastas vazias e bibliotecas sem necessidade. Sem framework cliente adicional salvo ADR justificado.
- Conteúdo em Markdown/MDX e coleções de dados tipadas. IDs estáveis e slugs independentes; consultas públicas centralizadas, sem vazamento de rascunhos, agendados, fixtures ou registros inválidos. MDX é conteúdo de autores confiáveis e versionado, nunca código vindo de visitantes.
- Design de blog pessoal moderno, não portal de notícias ou dashboard. Identidade grafite/vermelho com roxo discreto, sem emojis como ícones, gradientes excessivos, cards para tudo ou aparência genérica. Capas e fotografia são protagonistas. Claro/escuro/sistema, teclado, foco visível, semântica, contraste, redução de movimento e responsividade a partir de 320 px. Use Lucide quando ícones forem úteis. Não forçar proporções de imagens; fornecer dimensões e alternativas acessíveis.
- Fora de escopo: monetização de qualquer tipo, anúncios, afiliados, assinatura, banco, backend, autenticação, comentários, CMS, integrações automáticas com catálogos, IA, rede social. Não criar scaffolding para esses itens. Sem segredos, dados pessoais, deploy ou ações externas irreversíveis sem autorização apropriada.
- Não invente fatos sobre obras, datas, notas, fontes, autores ou edições. Fixtures sintéticas claramente marcadas, isoladas do build real. Imagens próprias, autorizadas ou com licença compatível e crédito; nada de hotlinks não autorizados, remoção de marcas ou scraping. Preserve conteúdo real do usuário.
- Idioma pt-BR, URLs estáveis, datas ISO com convenção explícita, acessibilidade WCAG 2.2 AA como meta, SEO, desempenho e segurança desde a concepção. Sem scripts de rastreamento de terceiros nesta fase inicial.

### Validação e encerramento
- Implemente e rode testes proporcionais às mudanças, mais os checks já disponíveis: instalação reprodutível quando necessário, lint, format check, typecheck (`astro check` ou script equivalente), testes unitários/integração, build e E2E quando aplicável. Na fase de documentação, não invente comandos ainda inexistentes; registre `N/A` com justificativa. Não esconda falhas, não desative regras ou testes para passar. Use scripts portáveis Windows/Linux.
- Nas fases que alteram interface, execute o site e capture screenshots reais via Playwright (ou ferramenta equivalente disponível), no mínimo desktop 1440x900 e celular 390x844, em ambos os temas, nas rotas afetadas. Cheque também largura de 320 px, navegação por teclado, foco, estados vazios, imagens e overflow. Guarde evidências em `docs/reports/evidence/phase-NN/` com nomes descritivos (ou caminho versionado/documentado para artefatos). Analise as imagens, não apenas as gere. Se o navegador não estiver disponível, registre a limitação e não declare aprovação visual.
- Atualize especificações, ADRs (se decisão relevante), README (se operação mudou), checklist central `docs/testing/TEST-PLAN.md`, `docs/roadmap/implementation-status.md` e relatórios/auditorias pertinentes. Marque somente itens comprovados, mantenha IDs estáveis e não apague histórico. Evite múltiplos checklists concorrentes.
- Gere `docs/reports/REPORT-PHASE-NN.md` (NN = número da fase), contendo: objetivo, estado anterior, documentos lidos, decisões, arquivos alterados, comandos e resultados reais (inclusive falhas), testes e evidências, critérios de aceitação com PASS/FAIL/N/A justificado, riscos e pendências, condição para fase seguinte, status CONCLUÍDO/PARCIAL/BLOQUEADO. Não invente logs, métricas, hashes ou screenshots.
- Se houver autorização para commits, use Conventional Commits e commits pequenos; nunca publique remotamente por iniciativa própria. Registre hash apenas se criado. A fase só é CONCLUÍDA quando os critérios obrigatórios estiverem comprovados. Se a fase não puder finalizar, preserve o progresso e indique exatamente como retomar. Não inicie a próxima fase neste prompt.


## Implementação específica da fase 23

1. Leia todos os 23 relatórios anteriores, ADRs, auditorias, status central, especificações e TEST-PLAN; cruze com código, build e testes atuais. Identifique itens marcados sem evidência, regressões, requisitos não atendidos e documentação obsoleta. Não assumir que fase concluída no passado ainda está válida.
2. Revise todas as funcionalidades da área pública e ferramentas editoriais ponta a ponta usando build demo e real. Verifique visibilidade, relacionamentos, notas opcionais, spoilers, pesquisa, filtros, paginação, galeria, navegação, tema, mobile, links, SEO, RSS, acessibilidade, licenças e política de privacidade. Confirme ausência de monetização e demais itens fora de escopo.
3. Corrija pendências impeditivas no escopo, sem reescrita ampla nem adição de features. Consolide documentação de arquitetura, requisitos, README, guia editorial, operação, changelog, status e checklist único de testes. Preserve relatórios históricos; marque divergências com nova evidência.
4. Execute instalação limpa, lint, format, typecheck, unit, integração, build real, demo, Pagefind, E2E, verificação de artefato, links e auditoria visual representativa. Capture screenshots finais e compare regressões. Confirme ambiente/versões e hash somente se houver commit autorizado.
5. Produza checklist separado de prontidão editorial/operacional: conteúdo real revisado e autorizado, domínio, dados institucionais, revisão humana das políticas, CI remoto, hosting, canonical e smoke pós-deploy. Se faltar item, classifique como release técnica candidata, não lançamento publicado. Prepare release notes 1.0.0 e versão conforme estratégia da fase 22; não criar tag, push ou deploy sem autorização.
6. Emita decisão GO/NO-GO para release técnica e separadamente para publicação real, com evidências e bloqueios. Declare CONCLUÍDO apenas se critérios técnicos obrigatórios comprovados; condicionantes externas podem permanecer explicitamente como gates de lançamento, nunca como tarefas falsamente realizadas.

## Critérios de aceitação específicos

- Rastreabilidade completa, 24 fases reconciliadas, sem bloqueadores técnicos conhecidos ou testes falsamente marcados.
- Checks e artefatos reais aprovados, screenshots finais inspecionados; documentação atual e operacional.
- Release notes e decisão técnica/editorial separadas; publicação só quando todos os gates pertinentes forem atendidos.

Os critérios transversais do protocolo também se aplicam. Registre PASS/FAIL/N/A com evidência por critério, não apenas um status global.

## Entregáveis obrigatórios

docs/audits/AUDIT-PHASE-23-RELEASE.md, relatório final, release notes, checklist de lançamento e status central reconciliado.

Além disso, atualize o status central e o plano único de testes e escreva `docs/reports/REPORT-PHASE-23.md` com os campos obrigatórios do protocolo. Ao final, apresente resumo de mudanças, resultados de validação, pendências e condição de continuidade. Não execute outra fase dentro desta instrução.
