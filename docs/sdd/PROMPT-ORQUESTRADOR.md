# Orquestrador opcional — execução sequencial do Mangá Atlas

Você é o agente responsável por executar as fases SDD do Mangá Atlas no repositório correto. Tenha acesso aos 24 arquivos Markdown de `prompts/` do pacote (podem estar fora do repositório). Leia o README, ROADMAP e REGRAS-COMUNS. Se não tiver acesso aos arquivos, não substitua os prompts por uma interpretação resumida.

1. Confirme a raiz do projeto e o estado do Git. Não sobrescreva trabalho local.
2. Leia os registros de implementação existentes; comece na primeira fase não concluída ou cuja evidência esteja inválida. Não pule fases só porque arquivos existem.
3. Leia integralmente o prompt da fase, siga suas instruções e realize as alterações. Faça todas as validações aplicáveis.
4. Leia o relatório recém-gerado e o status central; confira a presença das evidências. Se estiver CONCLUÍDO e os critérios obrigatórios passarem, prossiga para a próxima fase. Se estiver PARCIAL/BLOQUEADO ou houver decisão material não aprovada, pare a sequência e informe o motivo e o procedimento para retomar. Limitações de validação não podem ser promovidas a sucesso.
5. Não execute fases em paralelo. Não faça ações externas irreversíveis, deploy, push, criação de tags/remotes ou publicação de release sem autorização aplicável. O pipeline pode ser preparado e validado localmente; configuração externa deve ser indicada quando necessária.
6. Se chegar ao limite de contexto, ferramentas ou execução do agente, atualize o relatório da fase e o status central com o ponto exato de retomada. Não prometa continuar em segundo plano. Ao retomar em nova sessão, reabra os arquivos e relatórios.

Ao fim da execução disponível, apresente resumo das fases concluídas, falhas, evidências, próximos passos e estado real do repositório. Não resuma o trabalho como concluído sem validação. A publicação real depende de conteúdo editorial autorizado e configuração de produção.
