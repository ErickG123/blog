# Comparação visual — Fase 12.1

**Matriz:** Chromium/Playwright; 13 rotas, 6 larguras (360, 390, 768, 1280, 1440, 1920 px), 2 temas.  
**Capturas:** `artifacts/phase12-1-visual/before/` (156 PNGs) e `artifacts/phase12-1-visual/after/` (156 PNGs). Arquivos locais ignorados pelo Git.

## Referências principais

| Página/estado | Antes | Depois | Mudança observada |
|---|---|---|---|
| Home, desktop 1440, claro | `before/desktop-1440-light-home.png` | `after/desktop-1440-light-home.png` | Hero institucional e ilustração geométrica removidos; introdução curta e hierarquia direta. Sete cards de editoria viraram cinco links com nome completo. O post técnico aparece separado em “Arquivo geral”. |
| Home, mobile 360, claro | `before/mobile-360-light-home.png` | `after/mobile-360-light-home.png` | Conteúdo sem hero de altura excessiva; links de categoria ocupam uma coluna e não geram scroll horizontal. |
| Home, mobile 390, escuro | `before/mobile-390-dark-home.png` | `after/mobile-390-dark-home.png` | Header e menu seguem utilizáveis; contraste da paleta escura e foco aparecem no smoke; cards legíveis em coluna única. |
| Artigo legado, desktop 1440 | `before/desktop-1440-light--posts-ola-mundo-.png` | `after/desktop-1440-light--posts-ola-mundo-.png` | Largura de leitura, índice, metadados, tags, barra de progresso, compartilhamento e Giscus mantidos. Conteúdo permanece sem alterações. |
| Catálogo vazio, desktop 1440 | `before/desktop-1440-light--obras-.png` | `after/desktop-1440-light--obras-.png` | Mensagem promocional substituída por estado vazio conciso; nenhuma obra fictícia foi adicionada. |
| 404, desktop 1440 | `before/desktop-1440-light--rota-inexistente-.png` | `after/desktop-1440-light--rota-inexistente-.png` | Erro apresentado com mensagem direta e caminhos de retorno. |

Os nomes incluem dois hífens antes das rotas, conforme sanitização do caminho pelo script. Pares adicionais estão disponíveis para as outras rotas, larguras e temas no mesmo diretório.

## Resultado da inspeção

- A primeira tela deixou de ser dominada por slogan e arte abstrata.
- Categorias mantêm hierarquia e descrições em desktop e mobile, sem índices ou letras isoladas.
- Cores claro/escuro, foco, layout e overflow passaram no script nas rotas capturadas.
- A home atual tem apenas um artigo, separado em arquivo técnico; não há capas nem conteúdo otaku real para avaliar variações de card, destaque, catálogo preenchido ou relações de obras.
- Catálogo vazio tem bastante espaço vertical porque o layout preserva footer no fim da página. O conteúdo vazio permanece compacto; validar a proporção de grids depois de haver dados reais.
- Leitor de tela e contraste manual não foram certificados nesta execução; axe automatizado exclui o iframe externo do Giscus.
