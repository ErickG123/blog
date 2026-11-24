# Acompanhamento Editorial — Primeiras Publicações Reais (Fase 45)

Este documento consolida o estado de preparação das primeiras publicações reais do **Mangá Atlas**. Todos os itens abaixo estão em **`status: draft`** e **não** entram no build editorial de produção (`dist/`) nem no GitHub Pages até revisão e aprovação explícita do autor.

## 1. Matriz de pautas e aprovação humana

| Pauta                               | Tipo               | Arquivo                                                                 | Fichas vinculadas                           | Estado técnico                | Mídia / Direitos         | Pendências do autor                                             | Aprovação final  |
| ----------------------------------- | ------------------ | ----------------------------------------------------------------------- | ------------------------------------------- | ----------------------------- | ------------------------ | --------------------------------------------------------------- | ---------------- |
| Yotsuba&! — Volume 1                | Review (mangá)     | `src/content/reviews/yotsuba-to-volume-1.mdx`                           | `work-yotsuba-to`, `creator-kiyohiko-azuma` | Rascunho estrutural (`draft`) | Capa pendente            | Impressões autorais, edição lida, decisão sobre nota/veredito   | Aguardando autor |
| Yuru Camp△ — Temporada 1            | Review (anime)     | `src/content/reviews/yuru-camp-temporada-1.mdx`                         | `work-yuru-camp-anime`, `creator-afro`      | Rascunho estrutural (`draft`) | Imagem pendente          | Confirmar que assistiu à T1, impressões autorais, nota opcional | Aguardando autor |
| O cotidiano como narrativa          | Artigo (`analise`) | `src/content/articles/cotidiano-como-narrativa-slice-of-life.mdx`       | `work-yotsuba-to`, `work-yuru-camp-anime`   | Rascunho estrutural (`draft`) | Imagem opcional pendente | Desenvolver argumentos e exemplos autorais                      | Aguardando autor |
| Por onde começar no slice of life   | Guia               | `src/content/recommendations/por-onde-comecar-mangas-slice-of-life.mdx` | `work-yotsuba-to`                           | Rascunho estrutural (`draft`) | Opcional                 | Confirmar obras adicionais lidas e critérios                    | Aguardando autor |
| Edição japonesa de Yotsuba&! Vol. 1 | Colecionismo       | `src/content/collecting/edicao-japonesa-yotsuba-volume-1.mdx`           | `work-yotsuba-to`                           | Rascunho estrutural (`draft`) | Fotos próprias pendentes | Dados do exemplar real (ISBN, editora, papel, fotos próprias)   | Aguardando autor |

## 2. Perguntas curtas para o autor fechar as lacunas

1. **Yotsuba&! Vol. 1**: quais aspectos do volume 1 mais chamaram sua atenção? Qual edição você leu? Deseja atribuir nota (0–5) ou publicar sem nota?
2. **Yuru Camp△ T1**: você já assistiu à 1ª temporada completa? Quais momentos ou elementos (direção, trilha, ritmo) quer destacar?
3. **Guia slice of life**: quais outros 2 ou 3 mangás reais você já leu e gostaria de incluir na lista?
4. **Colecionismo**: você tem em mãos o exemplar físico japonês de _Yotsuba&!_ Vol. 1 e fotografias próprias para importar com `media:import`?
5. **Mídia**: quais imagens próprias ou autorizadas estão disponíveis para cada pauta?

## 3. Fluxo de revisão e publicação controlada

```bash
# 1. Conferir inventário e pendências
npm run content:list
npm run content:doctor

# 2. Abrir prévia local dos rascunhos (somente 127.0.0.1, noindex, isolado em dist-preview/)
npm run content:preview

# 3. Importar imagem própria/autorizada quando disponível
npm run media:import -- --src="C:\caminho\foto.jpg" --context=works --slug=yotsuba-to --name=capa --alt="Capa do volume 1" --credit="Acervo próprio" --rights=own

# 4. Após revisar o texto, remover [PENDENTE] e aprovar:
npm run content:publish -- --slug=yotsuba-to-volume-1 --dry-run
npm run content:publish -- --slug=yotsuba-to-volume-1 --confirm-publish
```
