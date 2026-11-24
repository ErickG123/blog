# Manual Editorial, Mídia Local e Ambiente Demo — Mangá Atlas

## 1. Fluxo editorial diário (CLI Fase 44)

Todo conteúdo editorial novo nasce em `status: draft` e **não** entra no build de produção (`dist/`).

1. **Criar entidade ou rascunho**:

   ```bash
   # Catálogo (JSON)
   npm run content:new -- creator kiyohiko-azuma "Kiyohiko Azuma"
   npm run content:new -- work yotsuba-to "Yotsuba&!" --kind=manga --format=series

   # Publicações editoriais (MDX — sempre status: draft, sem notas inventadas)
   npm run content:new -- review yotsuba-vol-01 "Yotsuba&! — Volume 1" --work-id=work-yotsuba-to --scope=volume
   npm run content:new -- article cotidiano-slice-of-life "O cotidiano como narrativa" --category=analise
   npm run content:new -- guide guia-slice-of-life "Por onde começar no slice of life" --work-id=work-yotsuba-to
   npm run content:new -- collecting edicao-jp-yotsuba "Conhecendo a edição japonesa"
   ```

   Use `--dry-run` para inspecionar o arquivo gerado sem gravar em disco.

2. **Listar e inspecionar pendências**:

   ```bash
   npm run content:list
   npm run content:status -- --slug=yotsuba-vol-01
   npm run content:doctor
   ```

3. **Prévia local de rascunhos (somente loopback `127.0.0.1`, `noindex`, pasta `dist-preview/` isolada)**:

   ```bash
   npm run content:preview
   ```

4. **Promoção local controlada (após revisão humana e remoção de `[PENDENTE]`)**:
   ```bash
   # Simula diff sem gravar
   npm run content:publish -- --slug=yotsuba-vol-01 --dry-run

   # Atualiza apenas o arquivo local (nunca executa commit, push ou deploy)
   npm run content:publish -- --slug=yotsuba-vol-01 --confirm-publish
   ```
   > **Importante sobre agendamento**: como o site é 100% estático no GitHub Pages, publicações com data futura só passam a aparecer no site após um novo build/deploy na data prevista.

## 2. Fluxo de mídia local (Fase 43)

Imagens editoriais otimizadas ficam versionadas em `src/assets/images/<context>/<slug>/`. Originais pesados ficam fora do repositório.

```bash
# Importar capa (gera WebP otimizado <= 800px, remove EXIF/GPS, normaliza orientação)
npm run media:import -- --src="C:\caminho\capa.jpg" --context=works --slug=yotsuba-to --name=capa --alt="Capa do volume 1" --credit="Acervo próprio" --rights=own

# Importar foto de edição física (até 1600px)
npm run media:import -- --src="C:\caminho\foto-edicao.jpg" --context=collecting --slug=edicao-jp-yotsuba --name=lombada --alt="Detalhe da lombada" --credit="Fotografia própria" --rights=own

# Auditoria e inventário (nenhum comando remove arquivos automaticamente)
npm run media:validate
npm run media:stats
npm run media:find-duplicates
npm run media:find-unused
```

### Metas locais de referência (alertas, não quotas oficiais)

- Capas (`works`, `reviews`, `guides`): largura máx. `800–900 px`, meta `<= 200 KB`.
- Artigos/OG (`articles`): largura máx. `1200 px`, meta `<= 250 KB`.
- Fotografias de colecionismo (`collecting`): largura máx. `1600 px`, meta `<= 350 KB`.
- Direitos (`rightsStatus`): `own` (própria), `authorized` (autorizada), `pending` (bloqueia publicação real) ou `demo` (proibida em conteúdo real).

## 3. Ambiente de demonstração isolado (`demo`)

```bash
npm run build:demo
npm run preview:demo
```

- `dist-demo/` inclui fixtures sintéticas com banner e `noindex`.
- `npm run build` gera `dist/` apenas com conteúdo real publicado e executa `scripts/check-isolation.mjs`.
