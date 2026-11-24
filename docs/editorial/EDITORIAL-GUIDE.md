# Manual Editorial e Ambiente Demo — Mangá Atlas

## 1. Fluxo editorial diário

1. Criar um novo rascunho (sempre inicia com `status: draft`):
   ```bash
   npm run content:new -- review meu-manga-vol-01 "Título da Review"
   ```
   Use `--dry-run` para inspecionar o template sem gravar arquivo.
2. Editar o arquivo gerado em `src/content/<colecao>/`, revisando fontes, direitos de imagem e `spoilerLevel`.
3. Validar schemas e integridade referencial:
   ```bash
   npm run content:validate
   ```
4. Alterar `status: published` quando pronto e executar `npm run build`.

## 2. Ambiente de demonstração isolado (`demo`)

Para visualizar o site com as 40 obras, 20 reviews, 15 artigos, 10 guias e 10 posts de colecionismo sintéticos sem poluir o build real `dist/`:

```bash
npm run build:demo
npm run preview:demo
```

- O build demo gera `dist-demo/` com `noindex` e faixa de identificação visual.
- O build real (`npm run build`) gera `dist/`, remove `dist/demo-assets` e valida isolamento total via `scripts/check-isolation.mjs`.
