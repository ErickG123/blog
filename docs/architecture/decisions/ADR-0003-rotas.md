# ADR-0003: preservar URLs legadas e prefixar rotas internas

- Estado: aceito
- Decisão: manter os paths de posts e tags e usar URLs baseadas no ID do arquivo; caminhos novos seguem famílias de rota explícitas.
- Contexto: links externos e posts publicados não devem quebrar durante a transformação.
- Consequências: `date` antigo segue aceito; novas rotas usam helper com base path e conteúdo com slugs estáveis.
