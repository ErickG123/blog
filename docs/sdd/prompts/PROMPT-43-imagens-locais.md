# PROMPT 43 — Gerenciamento de mídia local, otimização e imagens editoriais

## Objetivo

Implementar um fluxo local, gratuito e sustentável para importar, organizar, validar e renderizar capas, pôsteres, miniaturas e fotografias. O Astro continua estático, o GitHub Pages continua sendo a hospedagem e o Git é a fonte versionada das imagens editoriais otimizadas. Não usar R2, Cloudinary, Supabase, Git LFS obrigatório, hotlinking de terceiros ou serviços pagos. Leia integralmente `../REGRAS-COMUNS.md` deste pacote (localize seu caminho real), os relatórios 40–42 e as regras do projeto antes de trabalhar.

## 1. Auditoria e baseline

Mapear todos os pontos de entrada de mídia: `src/assets`, `public`, fixtures, schemas de Content Collections, referências Markdown/MDX, CSS, metadados OG, componentes de capa, cards, detalhes de obra/review, galerias e fallback. Identificar referências por URL, importação, slug e ID. Listar imagens com dimensões, formato, tamanho, origem, licença/procedência, referências, modo editorial/demo e eventuais problemas.

Verificar o suporte efetivo de `astro:assets`, `Image`, `Picture`, serviço Sharp, schema `image()` e importações de assets na versão instalada do Astro. Não supor que caminhos dinâmicos arbitrários possam ser resolvidos como imports. Verificar como o `base` do GitHub Pages é aplicado. Inspecionar a estrutura atual antes de propor alterações; preferir migração incremental com compatibilidade dos conteúdos existentes.

Registrar tamanho dos assets versionados, arquivos gerados no build, total de bytes do build editorial, número de variantes por imagem, e limites da hospedagem/repositório documentados em fontes oficiais atuais quando acessíveis. Não depender de limites não verificados. Criar metas locais de alerta, não confundi-las com quotas oficiais.

## 2. Organização e contrato de mídia

Consolidar uma estrutura coerente com o projeto, usando como referência `src/assets/images/{works,reviews,articles,guides,collecting,editions,creators,publishers,studios,placeholders}/<slug>/`. Preservar a organização existente se já resolver o problema. Assets de marca ficam separados. Fixtures devem ter diretório/manifesto e resolução explícita de modo, sem cópia automática para produção.

Centralizar metadados em um contrato pequeno e compatível com as collections atuais: identificador estável quando útil, referência local resolvível, tipo/contexto, texto alternativo ou marcação decorativa explícita, dimensões quando conhecidas, legenda, crédito, URL da fonte, situação de direitos/procedência (por exemplo própria, autorizada, pendente, demo). Não transformar crédito em prova de autorização. Não criar catálogo de mídia paralelo se os schemas existentes já suportam os mesmos dados. Distinguir conteúdo editorial público de imagens decorativas e branding. Quando várias páginas utilizarem uma capa, referenciar um único arquivo, sem duplicá-lo.

Definir e documentar a resolução local com `image()` nas collections e/ou mapa de imports estáticos (`import.meta.glob` com opções compatíveis com a versão atual), conforme necessário. Usar `ImageMetadata` no fluxo de otimização; não entregar string de caminho interno como se fosse uma URL pública. Se for útil, manter o contrato extensível a outra origem, mas não criar integração remota, cliente de storage, segredo, credencial ou adaptador fictício. Registrar decisão em ADR se alterar os contratos. Garantir validação de referências e migração sem quebrar slugs.

## 3. Importação e compressão local

Implementar ou ampliar scripts existentes com comandos claros em `package.json`, preferencialmente `media:import`, `media:optimize`, `media:validate`, `media:stats`, `media:find-unused`, `media:find-duplicates`. Se a convenção vigente for diferente, manter um comando canônico e documentar equivalências, evitando aliases desnecessários. Utilizar Node e Sharp como dependência direta se o script realmente o importar; não depender de dependência transitiva acidental. Reutilizar a versão compatível com o Astro/lockfile. Não instalar bibliotecas de UI para tarefas de CLI.

O comando de importação deve aceitar caminho local (incluindo espaços, acentos e nomes japoneses), contexto, slug, nome lógico e metadados pertinentes. Oferecer modo interativo e flags documentadas para automação. Exibir origem, destino, formato, dimensões e tamanho previsto. Validar existência, tipo por conteúdo decodificável, limite de pixels/bytes configurável, extensão, slug e destino. Impedir travessia de diretório, caminhos absolutos como destino, symlinks/reparse points que escapem da raiz permitida, sobrescrita silenciosa e colisões. Não aceitar URLs como entrada para download automático nesta fase. Usar escrita segura/atômica e rollback de alterações parciais quando aplicável. Não apagar arquivo original. `--dry-run` não pode criar nem alterar arquivos.

Normalizar orientação antes de remover metadados EXIF/GPS; manter perfil de cor apropriado (sRGB quando necessário), preservar transparência, não ampliar imagens sem necessidade, evitar compressão repetida. Preferir WebP para fotos/ilustrações raster; manter SVG de origem confiável para vetores, PNG quando necessário, e tratar explicitamente GIF/AVIF/animações e formatos não suportados (não converter silenciosamente animação em quadro estático). Não aceitar SVG arbitrário com scripts/referências ativas; validar ou restringir importação a assets vetoriais confiáveis. Guardar fotos originais grandes fora do repositório de publicação, a cargo do usuário; versionar a cópia editorial otimizada. Não adicionar originais privados ao Git nem salvar caminho pessoal em frontmatter.

Referências de dimensão máxima de entrada (ajustáveis por configuração): capa 600–900 px de largura, pôster 600–900 px, miniatura 800 px, destaque/OG 1200 px, fotografia de edição até 1600 px. Preservar proporções; OG pode ter recorte editorial explícito. Metas típicas, não limites universais: capas 80–200 KB, miniaturas 80–150 KB, fotos 150–350 KB. Se atingir meta exigir degradação visível, emitir aviso e preservar qualidade. Registrar antes/depois em dimensões/bytes, versão/configuração de processamento e destino. Evitar recodificar arquivos já conformes quando não houver solicitação.

## 4. Componentes visuais e desempenho

Reutilizar e consolidar os componentes existentes em vez de criar uma segunda família. Definir variantes semânticas para capa de catálogo, capa de detalhe de obra, cabeçalho de review, thumbnail, capa de edição, destaque editorial, imagem interna, galeria e relacionados. Usar `Image`/`Picture` quando a fonte e a versão do Astro permitirem otimização. Configurar widths/sizes coerentes com CSS, não gerar dezenas de variantes por imagem; validar HTML efetivo (`srcset`, `sizes`, dimensões, paths) e saída no build. Manter `object-fit: contain` para capas; permitir recorte explícito para thumbnails, não cortar elementos importantes. Lazy loading abaixo da dobra; LCP prioritário quando justificado e sem duplicar downloads. Reservar espaço para reduzir CLS. Evitar upscale e bordas duplicadas.

Referências de exibição desktop: biblioteca 160–200 px, detalhe de obra 220–260 px, cabeçalho review 140–190 px, relacionados 64–100 px, edição 120–160 px, miniatura 160–240 px, destaque até 850 px ou conforme coluna editorial. Adaptar ao design já consolidado na Fase 41 e telas pequenas. Legenda e crédito junto à imagem, sem duplicações. Placeholder visual consistente para falta de mídia opcional; mídia obrigatória ausente deve falhar na validação de conteúdo em vez de mascarar problema.

Revisar galeria de colecionismo: navegação por teclado, legenda, proporção, miniaturas e ampliação (lightbox) apenas se útil. Aproveitar recurso existente; se criar, usar HTML/JS mínimo, gerenciamento de foco, Esc, fechamento, retorno do foco, navegação por teclado e sem bloquear conteúdo quando JS falhar. Não adicionar dependência pesada apenas para zoom. Garantir que as páginas com e sem imagens permaneçam equilibradas.

## 5. Integridade, inventário e direitos

`media:validate` deve diagnosticar referências inexistentes, arquivos inválidos, dimensões, formato, metadados obrigatórios, créditos e procedência conforme política, colisões, uso de mídia demo em publicação real, URLs externas não autorizadas, arquivos grandes e inconsistências de paths. Distinguir erros bloqueantes de avisos. Permitir rascunhos incompletos sem promover a publicação; falhar quando conteúdo elegível para produção depender de mídia sem direitos confirmados ou não resolvível. Não inventar licença nem afirmar direitos por inferência.

`media:find-duplicates`: detectar duplicatas exatas por hash de bytes; se usar hash visual, classificar apenas como sugestão, não remover automaticamente. `media:find-unused`: considerar imports, collections, MDX, CSS, branding, OG, assets de fallback e referências dinâmicas; reportar grau de confiança e falsos positivos possíveis. Nenhum desses comandos deve apagar arquivos por padrão. `media:stats`: inventário por categoria, número de arquivos, bytes, maiores arquivos, avisos configuráveis, tamanho do build e histórico Git quando viável, com formato humano e opção JSON para CI. Não incluir dados privados de caminho nos relatórios.

## 6. Modos de build e GitHub Pages

Verificar `site`, `base`, trailing slash e resolução de caminhos para hospedagem de projeto em subdiretório. Não hardcodar o nome do repositório. Garantir que `public/` seja usado apenas quando necessário, pois arquivos copiados diretamente podem contornar isolamento e otimização. Verificar imports globais e artefatos gerados: nenhuma imagem exclusiva de fixture, rascunho privado ou conteúdo futuro deve aparecer no build editorial; conteúdo compartilhado legítimo pode permanecer. Separar saída/cache de demo/stress ou limpar de forma segura antes do build. Testar demo seguido de editorial e o inverso. Conferir URLs de OG, sitemap, RSS e indexação. Não executar deploy.

## 7. Testes e evidências

Testar: importação de JPEG/PNG/WebP válidos, orientação EXIF, transparência, arquivo inválido/truncado, arquivo grande, caminho com espaços/Unicode, destino inválido, colisão, symlink quando suportado, `--dry-run`, ausência de sobrescrita, duplicatas, referência quebrada, isolamento, formato não suportado, mídia sem crédito quando exigido, build com `base`, fallback, layout e galeria. Usar fixtures pequenas e originais, nunca fotos privadas ou obras não autorizadas. Testes devem isolar diretórios temporários e limpar apenas o que criaram.

Gerar evidências da importação, inventário, HTML responsivo, build e screenshots de Home, biblioteca, detalhe de obra, review e colecionismo com mídia diversa. Não substituir capas reais por arte sintética sem identificar como demo. Registrar comandos e medições comparáveis antes/depois; não fabricar ganhos.

## Aceitação e entregáveis

- [ ] Estrutura e metadados locais coerentes, sem duplicação desnecessária.
- [ ] Importação CLI portável, segura, com compressão, validação e dry-run.
- [ ] Inventário, detecção de duplicatas e arquivos possivelmente não usados, sem remoção automática.
- [ ] Imagens responsivas, proporcionais, acessíveis e otimizadas; componentes reutilizados.
- [ ] Referências e procedência verificáveis; nenhum vazamento demo/privado no build editorial.
- [ ] Build com base GitHub Pages e testes de regressão aprovados ou falhas explícitas.
- [ ] Documentação prática em `docs/editorial/` (ou caminho existente), README, design, testes, status, changelog e relatório `docs/reports/REPORT-PHASE-43.md`.

Entregar exemplos de comandos reais com caminhos fictícios, regras de tamanho, fluxo para importar uma capa e foto de coleção, limites do processo e evidências em `docs/reports/evidence/phase-43/`. Não publicar nem migrar armazenamento.
