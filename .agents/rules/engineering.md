# Regras de Engenharia

- **Static-first**: `astro.config.mjs` mantém `output: 'static'`. Nenhuma dependência de runtime servidor.
- **TypeScript strict**: `tsconfig.json` estende `astro/tsconfigs/strict`. Evite `any` e casts inseguros.
- **Scripts portáveis**: Todos os scripts em `package.json` devem funcionar em Windows (PowerShell/CMD) e Linux (bash/sh).
- **Lockfile único**: Use apenas `npm` e `package-lock.json`. Não adicione `yarn.lock` ou `pnpm-lock.yaml`.
- **Sem scaffolding fora de escopo**: Não crie pastas vazias nem stubs para features futuras ou itens fora de escopo.
- **Validação honesta**: Registre comandos e resultados reais. Se uma ferramenta (ex.: navegador Playwright) não estiver disponível, registre a limitação sem declarar sucesso.
