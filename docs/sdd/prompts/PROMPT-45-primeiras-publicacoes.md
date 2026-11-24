# PROMPT 45 — Preparação das primeiras publicações reais

## Objetivo

Transformar a estrutura do Mangá Atlas em um fluxo editorial utilizável, preparando um primeiro conjunto de conteúdo real em rascunho, conectado à biblioteca e com imagens locais. A prioridade é deixar o blog pronto para o autor revisar e publicar, não fabricar avaliações ou publicar automaticamente. Ler `../REGRAS-COMUNS.md`, relatórios 43 e 44, política editorial e guia de mídia/conteúdo existentes antes de iniciar.

## 1. Inventário e plano editorial

Inspecionar as collections reais separadamente de fixtures e identificar conteúdo já existente, obras e autores disponíveis, direitos de mídia, estado dos rascunhos e rotas que serão preenchidas. Não duplicar nem substituir textos existentes do autor. Confirmar os caminhos e comandos de preview disponíveis. Se não houver rascunhos reais, planejar um conjunto inicial pequeno, com relacionamentos úteis, sem inflar o catálogo artificialmente.

Proposta inicial, ajustável às obras efetivamente lidas/assistidas e aos materiais autorizados que o usuário tiver fornecido:

| Tipo | Pauta sugerida | Observações |
|---|---|---|
| Review de mangá | Yotsuba&! — volume 1 | Impressões do autor e nota somente após confirmação |
| Review de anime | Yuru Camp — temporada 1 | Confirmar que o autor assistiu; avaliar apenas a temporada identificada |
| Artigo | O cotidiano como narrativa: o que torna o slice of life interessante? | Análise original, distinguir fatos de opinião |
| Guia | Por onde começar a descobrir mangás slice of life | Indicações sujeitas à aprovação do autor |
| Colecionismo | Conhecendo uma edição japonesa de Yotsuba&! — volume 1 | Fotografias e observações físicas do exemplar real |

Preferir as pautas que possuem insumos disponíveis. A existência de uma review demonstrativa não prova que o autor concorda com seu texto ou nota. Não copiar a fixture para produção. Se a política editorial não permitir geração automática de texto final, limitar-se a esboços, pesquisa, estrutura e sugestões de revisão. Não alegar que o autor leu, assistiu, comprou ou fotografou uma obra sem evidência fornecida por ele.

## 2. Fichas factuais e relacionamentos

Preparar fichas reais somente das obras relacionadas às pautas, com título oficial, título original, aliases, tipo, formato, gêneros, sinopse autoral breve, criadores, editora/estúdio, país e ano quando verificados. Distinguir a obra original, adaptação, temporada, volume e edição física. Evitar que nome de editora demo, papel sintético, dimensões fictícias ou notas demonstrativas entrem em conteúdo real.

Usar referências oficiais quando disponíveis (editora, estúdio, site da obra, ficha do exemplar, materiais autorizados). Se o ambiente tiver acesso à internet, conferir dados sujeitos a mudança e registrar fonte, URL, data consultada e escopo do dado; caso contrário, marcar como pendente. Não inventar fontes, ISBN, contagem de capítulos, volumes, disponibilidade, preço, data, créditos ou dados editoriais. Não copiar sinopses extensas de terceiros. Não criar dezenas de entidades órfãs apenas para preencher menus. Preservar IDs/slugs já públicos; usar novos slugs reais distintos de demo sem criar colisões.

## 3. Preparação dos rascunhos

Utilizar o CLI da fase 44 para gerar os arquivos em estado de rascunho e preencher apenas informações confirmadas ou conteúdo textual identificado como sugestão de escrita. Para material que não pode ir para um repositório público, usar área local ignorada ou documento privado, conforme estratégia de preview definida na fase 44; não adicionar material confidencial à árvore versionada. Guardar marcações de pendência de revisão em campos ou checklist previstos, não em metadados públicos.

Cada review deve permitir: apresentação, escopo (volume/temporada/obra), contexto sem spoilers, análise de narrativa, personagens, arte/animação e ritmo quando relevante, pontos positivos e negativos, recomendação e veredito/nota opcionais. Não gerar opinião em primeira pessoa como se fosse do usuário. Se nenhuma impressão pessoal estiver disponível, produzir perguntas específicas para o autor e uma estrutura pronta para preenchimento. Não usar a nota 4,5/5 de demonstração como nota real. Não forçar todos os tópicos quando não forem pertinentes.

Artigos devem ter tese, desenvolvimento, conclusão e fontes quando fizerem afirmações factuais. Guias devem explicar critérios de seleção, público e ordem quando aplicável; não inventar experiência pessoal. Colecionismo deve distinguir observações de um exemplar efetivamente inspecionado de recomendações gerais; não deduzir gramatura, acabamento ou medidas de uma capa. Para cada rascunho, criar título, descrição, slug, metadados pertinentes, tags reais formatadas em pt-BR, links relacionados coerentes e estrutura de subtítulos. Verificar que não há texto-placeholder em itens prontos para revisão.

## 4. Mídia editorial local

Aplicar o fluxo da fase 43 para imagens fornecidas pelo usuário, com autorização ou procedência suficiente para o contexto de uso. Fotografias próprias são preferíveis quando disponíveis, mas não implicam automaticamente autorização sobre toda arte fotografada. Verificar política de uso de capas e material promocional; não assumir que acesso público, crédito ou URL de editora concede licença. Não buscar ou copiar scans, fanart sem autorização ou imagens de outros blogs. Não apresentar arte sintética como capa oficial.

Para cada pauta, listar mídia necessária: capa, miniatura, destaque, imagens de apoio, fotos de edição e alt/legenda/crédito. Se imagem autorizada não estiver disponível, deixar pendência explícita ou utilizar fallback neutro permitido na prévia; não bloquear o cadastro de rascunho apenas por falta de uma imagem final. Não publicar original privado, EXIF/GPS ou arte não aprovada. Registrar tamanho, referência, direitos e resolução das imagens importadas. Não criar uma galeria fictícia do exemplar real.

## 5. Revisão e prévia

Gerar uma prévia local com os rascunhos elegíveis, sem publicar ou alterar sua visibilidade no build editorial. Validar Home com conteúdo inicial, listagens com poucos registros, detalhes da review, ficha de obra, artigo longo, guia, colecionismo, links entre páginas, tags, imagens, leitura em mobile e tema claro/escuro. Aproveitar as variantes visuais existentes; corrigir somente regressões localizadas comprovadas. Não iniciar novo redesign.

Inspecionar metadados SEO e Open Graph em ambiente de teste apropriado, legibilidade, headings, navegação por índice, spoilers, legendas e proporções das imagens. Não inventar screenshots se não houver browser. Conferir que a publicação real continua vazia ou contém apenas registros anteriormente aprovados; não incluir rascunhos no RSS, sitemap, Pagefind, rotas públicas ou assets privados do build editorial.

## 6. Checklist de aprovação humana

Consolidar em um documento existente de acompanhamento editorial, ou `docs/editorial/primeiras-publicacoes.md` se não houver equivalente, uma matriz por pauta com: status, arquivo, referências, fontes verificadas, informações pendentes, imagens e direitos, necessidade de opinião do autor, revisão de spoilers, preview, revisão textual, aprovação de nota, aprovação final e próximos passos. Identificar quem deve decidir cada pendência. Não registrar aprovação não fornecida. Distinguir claramente rascunho estrutural, rascunho pronto para revisão e conteúdo aprovado pelo autor.

Entregar perguntas curtas específicas para fechar lacunas. Exemplo: quais aspectos do volume 1 de Yotsuba&! mais chamaram sua atenção? Você deseja atribuir nota? Quais fotografias próprias estão disponíveis? Qual edição (ISBN/editora) será apresentada? Não obrigar o usuário a responder tudo para que a preparação técnica avance. Não preencher lacunas com fatos inventados.

Documentar comandos reais para criar, validar, abrir preview, importar imagem e preparar publicação local após aprovação. A promoção de status, commit de conteúdo real, push, deploy e postagem em redes sociais continuam sujeitos a autorização explícita; a existência de workflow automático deve ser considerada antes de qualquer push.

## 7. Testes e critérios de aceitação

- [ ] Inventário editorial inicial e pauta realista, sem duplicação de fixtures.
- [ ] Pelo menos um rascunho ou esboço utilizável para cada tipo principal, conforme insumos disponíveis; registrar o que ficou pendente.
- [ ] Fichas factuais relacionadas com fontes verificáveis ou lacunas identificadas.
- [ ] Notas, opiniões, fotografias e direitos não inventados.
- [ ] Prévia local navegável nos dois temas e mobile, com evidências disponíveis.
- [ ] Produção continua sem rascunhos, fixtures ou mídia privada.
- [ ] Checklist humano e fluxo de aprovação documentados.
- [ ] Testes/builds executados, documentação atualizada.

Gerar `docs/reports/REPORT-PHASE-45.md` e evidências `docs/reports/evidence/phase-45/`. O relatório deve listar quantidade real de rascunhos e fichas, status de cada pauta, fontes, mídia, validações e pendências do autor. Não capturar evidências contendo material privado sem autorização. Distinguir conclusão técnica da preparação e aprovação editorial: é possível entregar a estrutura com pendência de texto/autorizações, mas não declarar os conteúdos prontos para publicação se ainda dependerem disso.
