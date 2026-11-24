# PROMPT 46 — Auditoria final de produção e prontidão para lançamento

## Objetivo

Validar o Mangá Atlas como blog estático realmente publicável no GitHub Pages, consolidando qualidade técnica, visual, editorial e operacional. Esta fase não autoriza publicação remota nem aprovação automática de textos. Ler `../REGRAS-COMUNS.md`, relatórios 39–45 (especialmente 42–45), ADRs, especificações, status e plano de testes. Inspecionar implementação real e configuração do repositório; não presumir que qualquer fase ou deploy esteja correto apenas por relatórios anteriores.

## 1. Baseline e auditoria do escopo

Registrar branch, commit, versão local, status Git, Node/npm, dependências e scripts. Mapear requisitos e rotas: Home, reviews, artigos, guias, colecionismo, biblioteca, obras, criadores, editoras, estúdios, tags, busca, institucionais, RSS, sitemap e 404. Identificar requisitos não implementados, regressões e pendências. Verificar integridade das Content Collections e do design system, execução da fase 42, mídia local da 43, CLI da 44 e situação editorial da 45. Classificar problemas como críticos, altos, médios ou baixos, com evidência e reprodução. Não expandir escopo por conveniência.

## 2. GitHub Pages e CI/CD

Auditar `astro.config.*`, `site`, `base`, trailing slash, workflow CI/deploy, permissões mínimas, lockfile, ambiente Node, artefatos e condições de execução. Confirmar se é site de usuário/organização ou de projeto em subdiretório e qual é o caminho real. Usar dados do projeto; se domínio/URL não puderem ser confirmados, registrar limitação. Não alterar nome de repo, domínio, DNS, configurações externas ou segredos. Verificar se push para determinada branch dispara deploy e documentar o risco. Não executar push/deploy/teste de publicação que altere o ambiente remoto.

Reproduzir localmente o build editorial sob o mesmo `base` e ambiente do workflow. Servir saída estática com caminho equivalente ao GitHub Pages (não confiar somente em `astro dev` com base `/`). Validar refresh de rotas profundas, links de navegação, breadcrumbs, assets, fontes, favicon, CSS/JS, URLs de imagens processadas, Pagefind, paginação, filtros e âncoras. Conferir comportamento 404 e redirecionamentos suportados. Não depender de `_headers`, `_redirects` ou fallback de SPA específicos de outras hospedagens para segurança ou navegação; documentar limites do GitHub Pages e implementar alternativas estáticas quando necessárias e compatíveis.

Se a URL pública estiver disponível no projeto e acesso de rede for permitido, realizar smoke test somente leitura da versão hospedada, distinguindo resultados do site já publicado dos resultados do build local. Não declarar deploy realizado nem equivalência de commits sem evidência. Caso não haja acesso, fornecer passos de validação pós-deploy.

## 3. Isolamento e integridade do build

Executar builds editorial, demo e stress conforme scripts vigentes. Testar sequência demo → editorial, stress → editorial, preview → editorial. Verificar diretórios de saída, caches, scripts de pós-build e seleção do artefato enviado ao GitHub Pages. Validar que somente conteúdo elegível entra em produção, com referências transitivas verificadas. Procurar IDs, slugs, títulos e assets exclusivos de fixtures, rascunhos e futuros em HTML, arquivos estáticos, JSON, índices Pagefind, RSS, sitemap, metadados e rotas. O filtro não pode excluir conteúdo real válido. Verificar que assets privados não vazam por cópia em `public/`, imports globais, sourcemaps ou manifestos. Noindex não substitui isolamento.

Verificar se arquivos privados, originais e rascunhos confidenciais estão fora de qualquer repositório público ou artefato; build limpo não elimina exposição no histórico Git. Reportar possíveis vazamentos sem reproduzir dados sensíveis. Não reescrever histórico nem apagar arquivos privados do usuário. Criar uma validação automatizada bloqueante para artefato editorial se estiver ausente e for possível de forma localizada. Validar fluxo normal de publicação com fixture temporária representativa, não tornar conteúdo real publicado automaticamente.

## 4. Auditoria funcional

Navegar pelas rotas em modos apropriados: editorial vazio (se ainda for o caso), editorial com conteúdo já aprovado, demo e stress. Testar ligações entre fichas de obra e publicações; referências entre criadores, editoras e estúdios; tags, filtros, ordenação, pesquisa, links de compartilhamento, spoiler, navegação por âncoras, galerias e seletor de tema. Verificar 0/1/muitos itens, títulos longos, campos opcionais e ausência de imagem. Testar botões do estado inicial da Home, inclusive visited/hover/focus e contraste, conforme correção da fase 42.

Validar paginação com zero, limite exato, limite+1 e múltiplas páginas; filtros aplicados ao conjunto elegível completo, ordenação estável com desempate, sem perda/duplicação, página inválida, URLs compartilháveis conforme estratégia, refresh, voltar/avançar e uso móvel. Testar Pagefind com índice realmente gerado, consulta com resultados, zero resultados, títulos em português/japonês/romanizados quando disponíveis, links sob base path e ausência de rascunhos. Se o site editorial não tiver conteúdo, validar estado vazio útil e não tratar ausência de índice como erro sem diagnóstico.

## 5. SEO, RSS e metadados

Auditar títulos, descrições, canônicos, Open Graph, imagens sociais, idioma pt-BR, headings semânticos, robots.txt, sitemap, RSS, links internos e 404. Verificar domínio/base absolutos onde exigidos, datas válidas e escape de XML. Verificar conteúdo duplicado e URLs paginadas conforme estratégia documentada. Usar dados estruturados apenas de tipos aplicáveis e sem inventar notas, autor, datas, disponibilidade ou detalhes do produto. Não gerar marcação de avaliações para conteúdo não aprovado ou incompatível com políticas. Não prometer indexação ou rich results. Verificar que robots, canonical e noindex do modo de preview não vazam para páginas editoriais legítimas. Documentar etapas opcionais de Search Console sem configurar contas externas.

## 6. Acessibilidade, visual e responsividade

Inspecionar Home (vazia e preenchida em demo), listagens, detalhes de review e obra, artigo, guia, colecionismo, busca, tags, footer, header, estados de filtro e paginação. Validar em 320, 390, 768, 1024, 1440 e 1920px ou matriz existente mais ampla; testar zoom e tamanhos de texto. Conferir contraste WCAG 2.2 AA aplicável, navegação por teclado, foco visível, skip link, labels, semântica, ordem de leitura, alt, headings, âncoras sob header sticky, modais/galerias, controles de tema, movimento reduzido, alvos de interação e overflow. Ferramenta automatizada ajuda, mas não comprova conformidade integral. Registrar limitações.

Revisar pontos visuais específicos das fases 40–42: padding de cards, proporção de capas, alinhamento de containers, coluna de leitura e sidebar, tabelas e rodapé de páginas curtas, botões primário/secundário, tags e metadados localizados. Corrigir apenas defeitos localizados sustentados por evidências; não refazer identidade visual. Capturar screenshots representativas no tema claro e escuro e inspecioná-las. Diferenciar evidência com fixtures de evidência editorial real.

## 7. Desempenho e segurança operacional

Medir build limpo, tamanho da saída, número de arquivos e variantes, imagens grandes, JS/CSS e páginas representativas. Usar Lighthouse/Playwright ou ferramentas existentes quando disponíveis e registrar método, condições, amostras e resultados. Tratar LCP/CLS e outras métricas de laboratório como estimativas, não dados reais de usuários; comparar com baseline equivalente e não fabricar pontuações. Priorizar regressões perceptíveis, imagens sem dimensões e assets bloqueantes. Evitar aumentar dependências apenas para cumprir uma métrica. Verificar limites atuais da hospedagem e do GitHub com documentação oficial se acessível, sem apresentar metas internas como quotas reais.

Revisar dependências e lockfile, resultados de auditoria disponíveis, scripts de build, permissões de workflows, uso de segredos, URLs externas, conteúdo MDX confiável, SVG e importação de arquivos. Não executar `npm audit fix --force` nem upgrades major indiscriminados; avaliar impacto e registrar riscos. Não introduzir serviços de terceiros, coleta de dados, cookies analíticos ou monetização. Revisar páginas institucionais, contato, créditos e privacidade de acordo com comportamento real do site; não inventar e-mails ou políticas. Evitar afirmações legais conclusivas sem revisão apropriada.

## 8. Validações automatizadas e correções

Executar format:check, lint, check, test, test:e2e, content:validate, media:validate, build editorial, demo e stress, ou equivalentes reais. Registrar resultados, duração quando útil, contagem de testes e cenários não executados. Adicionar testes de regressão para falhas corrigidas, incluindo caminhos do GitHub Pages e artefato editorial limpo. Não alterar testes para aceitar comportamento errado. Verificar se o workflow usa a mesma cadeia de validação e falha antes de enviar artefato inválido. Não realizar publicação remota.

Corrigir problemas críticos/altos que sejam seguros, localizados e no escopo. Se exigir mudança arquitetural ampla, autorização, informação privada ou intervenção externa, documentar bloqueio e proposta de correção. Não declarar fase concluída se testes críticos falharem ou critérios essenciais não forem verificados.

## 9. Checklist de lançamento e rotina pós-lançamento

Consolidar checklist em documento de produção existente ou `docs/editorial/launch-checklist.md`. Separar:

- Prontidão técnica: build reproduzível, caminhos, assets, testes, acessibilidade, workflow e isolamento.
- Prontidão editorial: revisão do autor, fatos verificados, imagens autorizadas, notas aprovadas, status e metadados corretos.
- Prontidão operacional: repositório, branch, base, artefato correto, procedimento de rollback/redeploy de versão anterior, validação pós-publicação e contato real.

Documentar passos que o usuário deverá executar para aprovar a primeira publicação, promover o rascunho local, validar o build editorial, realizar commit/push deliberadamente e verificar o site no GitHub Pages. Explicar que agendamento requer novo build/deploy e que reverter publicação pode requerer um commit de correção e redeploy. Não executar essas ações. Não prometer remoção de arquivos já armazenados em cache ou histórico público.

Definir conclusão em dois eixos: **técnico** (apto, apto com ressalvas, não apto) e **editorial** (apto, aguardando revisão/insumos, não apto). A versão sem conteúdo pode estar tecnicamente apta para pré-lançamento, mas não equivale a lançamento editorial completo. Não gerar nova versão/tag por padrão; recomendar bump apenas se houver mudanças que o justifiquem e houver autorização. Preservar changelog e roadmap reais.

## 10. Entregáveis e aceitação

- [ ] Build editorial validado em ambiente equivalente ao GitHub Pages.
- [ ] Rotas, navegação, busca, filtros e paginação testados com cenários representativos.
- [ ] Imagens locais e links corretos sob o caminho base.
- [ ] Isolamento editorial/demo/preview/stress comprovado no artefato de produção.
- [ ] SEO, RSS, sitemap, 404 e metadados revisados.
- [ ] Acessibilidade, responsividade e visual inspecionados com evidências.
- [ ] Desempenho e segurança operacional revisados, limitações explícitas.
- [ ] Testes e CI coerentes; falhas e bloqueios documentados.
- [ ] Checklist de publicação e rollback documentados.
- [ ] Prontidão técnica e editorial avaliadas separadamente; nenhuma publicação não autorizada.

Atualizar documentos existentes de arquitetura, design, editorial, hospedagem, testes, status e changelog conforme necessário. Gerar `docs/reports/REPORT-PHASE-46.md` e evidências em `docs/reports/evidence/phase-46/`. Incluir matriz de achados (ID, severidade, reprodução, correção, teste/evidência, status), comandos reais, métricas verificadas, resultados de smoke test, pendências do usuário e conclusão independente por eixo. Classificar a fase CONCLUÍDA, PARCIAL ou BLOQUEADA. Entregar instruções finais de operação sem iniciar novas fases automaticamente.
