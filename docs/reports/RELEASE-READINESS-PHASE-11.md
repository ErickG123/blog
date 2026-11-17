# Prontidão para release — fase 11

Data: 2026-11-16

## Decisão: NO-GO para release público

As verificações locais de código passaram: typecheck, lint, unitários, build, links estáticos/base path, smoke visual/a11y, E2E e auditoria de dependências de produção. Isso dá confiança para revisão local e preview.

O release editorial não está pronto porque não há obras, autores ou artigos temáticos verificados e aprovados; o único artigo atual é um tutorial técnico legado cuja permanência precisa de decisão editorial. A execução remota do GitHub Actions e o site publicado não foram consultados. Não houve deploy nem criação de release nesta fase.

## Condições para mudar para GO

1. Produzir e aprovar conteúdo de lançamento, fontes externas, autoria e proveniência/licença das imagens; decidir sobre o artigo legado.
2. Executar o workflow atualizado no GitHub e confirmar que todos os jobs passam.
3. Auditar as rotas de detalhe quando houver obras e temporadas cadastradas; completar revisão manual de teclado e leitor de tela.
4. Fazer uma verificação final do domínio publicado e dos recursos sob `/blog/` após a decisão de release.

Consulte `docs/reports/REPORT-PHASE-11.md` e `docs/audits/AUDIT-PHASE-11.md` para evidências e limitações.
