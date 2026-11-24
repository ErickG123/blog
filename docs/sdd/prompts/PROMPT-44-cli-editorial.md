# PROMPT 44 — CLI de produção editorial, prévia e publicação controlada

## Objetivo e pré-requisitos

Facilitar a rotina de escrever, revisar e preparar conteúdo sem painel administrativo, mantendo os arquivos Markdown/MDX e Content Collections como fonte de verdade. Ler integralmente `../REGRAS-COMUNS.md`, relatório da fase 43, especificações de conteúdo e relatórios 39–42. Validar o CLI `content:new` e os scripts realmente disponíveis. Reutilizar o fluxo de mídia da fase 43 e não duplicar schemas. Não fazer deploy nem promover conteúdo real sem autorização.

## 1. Auditoria do fluxo atual

Simular a criação de obra, review, artigo, guia, colecionismo e edição; mapear passos, prompts, campos, defaults, slugs, metadados, relação com imagens, validações, estados editoriais e preview. Verificar se criadores, editoras, estúdios, tags e gêneros podem ser cadastrados e referenciados sem edição manual repetitiva. Identificar onde validação no CLI diverge do schema real; corrigir discrepâncias com fonte única de contratos ou testes de conformidade, sem duplicar uma arquitetura completa.

Registrar o baseline com exemplos e problemas reproduzíveis. Verificar portabilidade Windows/Linux e comportamento em terminal não interativo. Conferir o isolamento demo/stress/real e os comandos de desenvolvimento existentes.

## 2. Comandos e ergonomia

Consolidar comandos canônicos, sugeridos abaixo, reutilizando a infraestrutura atual:

- `content:new`: criação guiada ou por flags, com seleção do tipo.
- `content:list`: listar e filtrar itens por tipo, status, obra, autor, data; saída humana e JSON quando útil.
- `content:validate`: validações gerais ou por item, com diagnóstico de arquivo/campo.
- `content:preview`: iniciar prévia local de rascunhos mediante opção explícita, ou imprimir comando e URL verificáveis; não expor rede externa.
- `content:status`: inspecionar o estado de um item e pendências editoriais.
- `content:publish`: preparar alteração local de status após validação e confirmação explícita; não é deploy.
- `content:schedule` e `content:unpublish`: somente se compatíveis com o domínio e úteis; caso contrário, documentar o fluxo existente de edição de metadados.
- `content:doctor`: verificar referências, mídias, datas, slugs e prontidão editorial; pode ser integrado ao validador já existente.

Não exigir exatamente estes nomes se houver equivalentes claros. Documentar uma convenção única. Oferecer `--help`, erros úteis, saída não zero em falha, `--dry-run` sem escrita e comportamento não interativo previsível. Comandos destrutivos ou alteração de status real exigem confirmação explícita do usuário ou flag de autorização consciente; não simular consentimento por padrão do agente. Não incluir publicação remota em qualquer comando. Não bloquear automação por prompts invisíveis em CI.

## 3. Templates e geração de conteúdo

Criar ou revisar templates específicos: obra (mangá, anime, manhwa), review por volume/temporada/obra completa/filme, artigo/análise, guia/recomendação, colecionismo, edição física, criador, editora, estúdio, gênero, tag e autor editorial, conforme collections existentes. Evitar campos inventados e conteúdo fictício apresentado como definitivo. Os templates de conteúdo novo devem começar em `draft` ou equivalente; tags e entidades auxiliares seguem política do domínio sem revelar conteúdo privado.

Os templates devem orientar com instruções removíveis, campos opcionais claros e estrutura editorial flexível; evitar lorem ipsum em produção. Não obrigar nota ou veredito. Distinguir título, descrição, slug, alias, data, autor, referência à obra, escopo da review, spoilers, imagens, créditos, relações e SEO. Permitir selecionar entidades existentes e sugerir criação de entidades ausentes sem criar duplicatas automaticamente. Gerar slugs estáveis, compatíveis com rotas e Unicode/transliteração adotados, preservar slugs já públicos e bloquear colisões considerando filesystem case-insensitive.

Escrever frontmatter válido, escapar texto corretamente e não executar MDX arbitrário vindo de input do CLI. Validar após geração, preservar corpo e campos desconhecidos permitidos ao editar metadados, manter formatação e newline coerentes. Escrever atomicamente; não sobrescrever arquivo existente. Impedir path traversal, escapes por symlinks e criação fora das collections autorizadas. Não alterar imagens ou arquivos do usuário sem permissão.

## 4. Integração de mídia

Oferecer opção de referenciar mídia existente, chamar ou orientar o comando `media:import` já implementado. Não duplicar compressão e validação. Permitir salvar rascunho sem imagem obrigatória final, com diagnóstico de pendência, mas bloquear publicação quando necessário. Associar alt, legenda, crédito e procedência ao contrato vigente. Não baixar capas de sites de terceiros, não inventar licenças, não inserir hotlinks não autorizados.

## 5. Ciclo editorial e prévia privada

Definir transições de status conforme schemas reais: rascunho, agendado (se suportado), publicado e retirada/arquivamento se existir. Documentar invariantes e diferenças entre status declarado e elegibilidade pública, incluindo datas futuras e referências relacionadas. Não alterar publicação já existente por inferência. Verificar horário e timezone editorial (pt-BR, avaliar `America/Sao_Paulo`), regras de datas sem hora, UTC e fronteiras de elegibilidade; não reinterpretar datas existentes silenciosamente. Um site estático não publica automaticamente quando chega uma data sem novo build/deploy; documentar claramente.

Implementar prévia somente local, preferencialmente vinculada a loopback, permitindo selecionar um rascunho ou visualizar conjunto explicitamente opt-in, com banner e noindex. Separar artefatos e cache do build de produção. Não modificar fixtures ou status real para permitir preview. Se rascunho não puder ser incluído pela estratégia atual sem grandes mudanças, implementar mecanismo local mínimo e documentar limites. Não publicar nem enviar prévia a GitHub Pages. Não presumir que `noindex` protege conteúdo privado. Evitar que rascunhos com material confidencial sejam commitados em repositório público; documentar opções locais, incluindo arquivos ignorados e validação de paths, conforme arquitetura real.

A preparação de publicação deve executar checks de conteúdo, referências, mídia, data, direitos, título/descrição, ausência de marcadores de revisão pendentes e consistência de rotas. Mostrar diff proposto e estado final. Exigir confirmação humana para alterar status de conteúdo real; usar apenas fixture temporária para testes automatizados. A validação pós-alteração deve reverter apenas as alterações que o comando realizou se falhar. Não alterar datas de publicação previamente definidas sem confirmação.

## 6. Ferramentas úteis para o autor

Avaliar, quando agregarem valor sem excesso de complexidade: inventário editorial de rascunhos, calendário local por data, contagem de palavras/tempo de leitura alinhada à lógica do site, diagnóstico de links internos, relatório de mídias sem alt, tags órfãs, aliases duplicados, ausência de obras relacionadas, checklist de revisão, comandos de exemplo copiáveis para Windows. Não adicionar crawler, IA de geração automática, CMS, backend ou integração social. Evitar comandos que sejam apenas wrappers redundantes.

## 7. Testes de ponta a ponta

Com arquivos temporários, executar criação de obra + review associada + imagem local + artigo/guia/colecionismo; validar e visualizar preview; testar publicação local simulada em fixture. Verificar erros de slug duplicado, campo obrigatório, status inválido, data futura, referência inexistente, mídia ausente, conteúdo demo referenciado por real, cancelamento, `--dry-run`, flags inválidas, modo não interativo, Unicode e espaços, arquivo já existente, falha durante escrita, preservação de corpo Markdown/MDX e ausência de alterações em arquivos não alvo.

Demonstrar que rascunhos não estão em HTML público, rotas geradas, sitemap, RSS, índice Pagefind, links relacionados ou assets privados no build editorial, inclusive após prévia/demo. Confirmar que build do GitHub Pages usa apenas o modo editorial. Não instalar ferramenta de terminal interativo pesada se os recursos existentes forem suficientes.

## Aceitação e entregáveis

- [ ] Fluxo local funcional do cadastro à prévia, sem editar código da aplicação para publicar conteúdo.
- [ ] Templates compatíveis com schemas reais e status de rascunho por padrão.
- [ ] CLI seguro, portável, documentado, testável e com dry-run.
- [ ] Integração com mídia local sem lógica duplicada.
- [ ] Publicação local explicitamente controlada e sem deploy automático.
- [ ] Isolamento de rascunhos/preview/demo/stress comprovado.
- [ ] Testes, builds e relatórios executados conforme regras comuns.

Atualizar guia editorial, exemplos de comandos, README, plano de testes, roadmap e changelog. Gerar `docs/reports/REPORT-PHASE-44.md` com tabela de comandos, exemplos reproduzíveis, resultados, decisões e limitações. Salvar evidências em `docs/reports/evidence/phase-44/`, sem expor conteúdo privado.
