import { execFileSync, spawn } from 'node:child_process';
import { mkdir, readdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';

const ROOT_DIR = resolve(import.meta.dirname, '..');
const DEFAULT_CONTENT_DIR = join(ROOT_DIR, 'src', 'content');

const TYPE_CONFIG = {
  work: { dir: 'works', ext: 'json', editorial: false },
  edition: { dir: 'editions', ext: 'json', editorial: false },
  creator: { dir: 'creators', ext: 'json', editorial: false },
  publisher: { dir: 'publishers', ext: 'json', editorial: false },
  studio: { dir: 'studios', ext: 'json', editorial: false },
  genre: { dir: 'genres', ext: 'json', editorial: false },
  tag: { dir: 'tags', ext: 'json', editorial: false },
  author: { dir: 'authors', ext: 'json', editorial: false },
  review: { dir: 'reviews', ext: 'mdx', editorial: true },
  article: { dir: 'articles', ext: 'mdx', editorial: true },
  guide: { dir: 'recommendations', ext: 'mdx', editorial: true },
  collecting: { dir: 'collecting', ext: 'mdx', editorial: true },
};

function parseArgs(argv) {
  const opts = {};
  const positional = [];
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const eq = arg.indexOf('=');
      if (eq !== -1) opts[arg.slice(2, eq)] = arg.slice(eq + 1);
      else opts[arg.slice(2)] = true;
    } else {
      positional.push(arg);
    }
  }
  return { opts, positional };
}

function normalizeSlug(raw) {
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function assertSafeSlug(rawSlug) {
  if (!rawSlug || rawSlug.includes('..') || rawSlug.includes('/') || rawSlug.includes('\\')) {
    throw new Error('Slug inválido (travessia de diretório não permitida).');
  }
  const slug = normalizeSlug(rawSlug);
  if (!slug) throw new Error('Slug resultante está vazio.');
  return slug;
}

function assertInside(targetPath, basePath) {
  const rel = relative(basePath, targetPath);
  if (rel.startsWith('..') || isAbsolute(rel)) {
    throw new Error(`Destino fora do diretório permitido: ${targetPath}`);
  }
}

function todayIsoSaoPaulo() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

function escapeYamlStr(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;
  return { data: parseYaml(match[1]), rawFrontmatter: match[1], body: match[2] };
}

async function listDirSafe(dir) {
  try {
    return await readdir(dir);
  } catch {
    return [];
  }
}

async function loadAllEntries(contentDir) {
  const items = [];
  for (const [type, cfg] of Object.entries(TYPE_CONFIG)) {
    const dir = join(contentDir, cfg.dir);
    const files = await listDirSafe(dir);
    for (const file of files) {
      if (cfg.ext === 'json' && !file.endsWith('.json')) continue;
      if (cfg.ext === 'mdx' && !file.endsWith('.mdx') && !file.endsWith('.md')) continue;
      const filePath = join(dir, file);
      const raw = await readFile(filePath, 'utf-8');
      if (cfg.ext === 'json') {
        const data = JSON.parse(raw);
        items.push({
          type,
          collection: cfg.dir,
          filePath,
          id: data.id,
          slug: data.slug,
          title: data.title || data.name || data.slug,
          status: 'catalog',
          publishedAt: null,
          isFixture: Boolean(data.isFixture),
          data,
          body: '',
        });
      } else {
        const parsed = parseFrontmatter(raw);
        if (!parsed) continue;
        items.push({
          type,
          collection: cfg.dir,
          filePath,
          id: parsed.data.id,
          slug: parsed.data.slug,
          title: parsed.data.title || parsed.data.slug,
          status: parsed.data.status || 'draft',
          publishedAt: parsed.data.publishedAt || null,
          isFixture: Boolean(parsed.data.isFixture),
          data: parsed.data,
          body: parsed.body,
        });
      }
    }
  }
  return items;
}

function buildTemplate(type, slug, title, opts) {
  const today = String(opts.date || todayIsoSaoPaulo());
  const authorId = String(opts.author || 'author-atlas');

  if (type === 'work') {
    return (
      JSON.stringify(
        {
          id: `work-${slug}`,
          slug,
          title,
          kind: opts.kind || 'manga',
          format: opts.format || 'series',
          publicationStatus: opts['publication-status'] || 'unknown',
          synopsis: '[PENDENTE] Resumo factual breve da obra sem copiar sinopse de terceiros.',
          credits: [],
          genreIds: [],
        },
        null,
        2,
      ) + '\n'
    );
  }

  if (type === 'edition') {
    return (
      JSON.stringify(
        {
          id: `edition-${slug}`,
          slug,
          workId: opts['work-id'] || 'work-id-da-obra',
          publisherId: opts['publisher-id'] || 'publisher-id-da-editora',
          title,
          language: opts.language || 'pt-BR',
        },
        null,
        2,
      ) + '\n'
    );
  }

  if (type === 'creator' || type === 'publisher' || type === 'studio') {
    return (
      JSON.stringify(
        {
          id: `${type}-${slug}`,
          slug,
          name: title,
        },
        null,
        2,
      ) + '\n'
    );
  }

  if (type === 'genre' || type === 'tag') {
    return (
      JSON.stringify(
        {
          id: `${type}-${slug}`,
          slug,
          name: title,
        },
        null,
        2,
      ) + '\n'
    );
  }

  if (type === 'author') {
    return (
      JSON.stringify(
        {
          id: `author-${slug}`,
          slug,
          name: title,
          bio: '[PENDENTE] Biografia editorial breve.',
        },
        null,
        2,
      ) + '\n'
    );
  }

  // Coleções editoriais MDX (sempre status: draft, sem nota/veredito obrigatórios)
  const extra =
    type === 'review'
      ? `workId: "${escapeYamlStr(opts['work-id'] || 'work-id-da-obra')}"\nscope: ${opts.scope || 'volume'}`
      : type === 'article'
        ? `category: ${opts.category || 'analise'}\nrelatedWorkIds: []`
        : type === 'guide'
          ? `items:\n  - workId: "${escapeYamlStr(opts['work-id'] || 'work-id-da-obra')}"\n    order: 1\n    pitch: "[PENDENTE] Motivo editorial da recomendação."`
          : `workIds: []\neditionIds: []`;

  const bodyGuide =
    type === 'review'
      ? `## Apresentação e escopo\n\n[PENDENTE] Contextualize a obra e o recorte avaliado sem spoilers.\n\n## Análise\n\n[PENDENTE] Impressões autorais sobre narrativa, arte/animação, ritmo e personagens.\n\n## Para quem vale a pena\n\n[PENDENTE] Recomendação final (nota e veredito são opcionais).\n`
      : type === 'article'
        ? `## Tese\n\n[PENDENTE] Apresente a pergunta central ou recorte do ensaio.\n\n## Desenvolvimento\n\n[PENDENTE] Argumentos, exemplos e fontes verificadas.\n\n## Conclusão\n\n[PENDENTE] Fechamento editorial.\n`
        : type === 'guide'
          ? `## Critérios deste guia\n\n[PENDENTE] Explique para quem a seleção foi montada e o critério editorial.\n`
          : `## Observações do exemplar\n\n[PENDENTE] Registre apenas características físicas efetivamente observadas em mãos.\n`;

  return `---
id: ${type}-${slug}
slug: ${slug}
title: "${escapeYamlStr(title)}"
summary: "[PENDENTE] Resumo editorial conciso."
authorId: ${authorId}
status: draft
publishedAt: "${today}"
spoilerLevel: none
tagIds: []
${extra}
---

${bodyGuide}`;
}

export async function cmdNew(opts, positional) {
  if (opts.help) {
    console.log(
      `Uso: npm run content:new -- <${Object.keys(TYPE_CONFIG).join('|')}> <slug> "<titulo>" [--dry-run] [--out-dir=<dir>] [--work-id=<id>] [--scope=<volume|season|work|arc|movie>] [--category=<analise|ensaio|industria|opiniao>]`,
    );
    return;
  }

  const [type, rawSlug, rawTitle] = positional;
  const cfg = TYPE_CONFIG[type];
  if (!cfg || !rawSlug || !rawTitle) {
    throw new Error(
      `Uso: npm run content:new -- <${Object.keys(TYPE_CONFIG).join('|')}> <slug> "<titulo>" [--dry-run] [--out-dir=<dir>]`,
    );
  }

  const slug = assertSafeSlug(rawSlug);
  const contentDir = opts['out-dir'] ? resolve(String(opts['out-dir'])) : DEFAULT_CONTENT_DIR;
  const targetDir = join(contentDir, cfg.dir);
  const fileName = `${slug}.${cfg.ext}`;
  const filePath = join(targetDir, fileName);
  assertInside(filePath, contentDir);

  // Checagem de colisão case-insensitive
  const existingFiles = await listDirSafe(targetDir);
  if (existingFiles.some((f) => f.toLowerCase() === fileName.toLowerCase())) {
    throw new Error(
      `Já existe um arquivo com o slug "${slug}" em ${targetDir} (colisão case-insensitive).`,
    );
  }

  const template = buildTemplate(type, slug, rawTitle, opts);

  if (opts['dry-run']) {
    console.log(`[dry-run] Arquivo alvo: ${filePath}\n\n${template}`);
    return;
  }

  await mkdir(targetDir, { recursive: true });
  const tmpPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  try {
    await writeFile(tmpPath, template, { flag: 'wx' });
    await rename(tmpPath, filePath);
  } catch (err) {
    await unlink(tmpPath).catch(() => {});
    throw err;
  }

  console.log(`Rascunho criado em: ${filePath}`);
}

async function cmdList(opts) {
  const contentDir = opts['content-dir']
    ? resolve(String(opts['content-dir']))
    : DEFAULT_CONTENT_DIR;
  let items = await loadAllEntries(contentDir);

  if (!opts['include-fixtures']) {
    items = items.filter((i) => !i.isFixture);
  }
  if (opts.type) {
    items = items.filter((i) => i.type === opts.type);
  }
  if (opts.status) {
    items = items.filter((i) => i.status === opts.status);
  }
  if (opts.work) {
    items = items.filter((i) => i.data.workId === opts.work || i.data.workIds?.includes(opts.work));
  }

  const summary = items.map((i) => ({
    type: i.type,
    id: i.id,
    slug: i.slug,
    title: i.title,
    status: i.status,
    publishedAt: i.publishedAt,
    isFixture: i.isFixture,
    file: relative(ROOT_DIR, i.filePath).replace(/\\/g, '/'),
  }));

  if (opts.json) {
    console.log(JSON.stringify(summary, null, 2));
    return;
  }

  if (summary.length === 0) {
    console.log('Nenhum item encontrado com os filtros aplicados.');
    return;
  }

  for (const row of summary) {
    console.log(
      `[${row.type.padEnd(10)}] ${row.status.padEnd(9)} | ${row.slug} — ${row.title}${row.publishedAt ? ` (${row.publishedAt})` : ''}`,
    );
  }
}

async function cmdStatus(opts, positional) {
  const slug = String(opts.slug || positional[0] || '');
  if (!slug) throw new Error('Informe o slug via --slug=<slug> ou argumento posicional.');

  const contentDir = opts['content-dir']
    ? resolve(String(opts['content-dir']))
    : DEFAULT_CONTENT_DIR;
  const items = await loadAllEntries(contentDir);
  const item = items.find((i) => i.slug === slug || i.id === slug);
  if (!item) throw new Error(`Item não encontrado: "${slug}".`);

  const pendingMarkers = [];
  const fullText = JSON.stringify(item.data) + '\n' + item.body;
  if (fullText.includes('[PENDENTE]')) pendingMarkers.push('Contém marcador [PENDENTE]');
  if (fullText.includes('TODO:')) pendingMarkers.push('Contém marcador TODO:');
  if (item.data.cover?.rightsStatus === 'pending')
    pendingMarkers.push('Direitos de imagem pendentes');

  const words = item.body.trim() ? item.body.trim().split(/\s+/).length : 0;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));

  const report = {
    type: item.type,
    id: item.id,
    slug: item.slug,
    title: item.title,
    status: item.status,
    publishedAt: item.publishedAt,
    isFixture: item.isFixture,
    words,
    readingMinutes,
    pendingMarkers,
    readyToPublish: item.status !== 'archived' && pendingMarkers.length === 0 && !item.isFixture,
  };

  if (opts.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`Status de "${report.title}" (${report.type}/${report.slug}):`);
  console.log(`  Status atual:   ${report.status}`);
  console.log(`  Data editorial: ${report.publishedAt || 'N/A'}`);
  console.log(`  Palavras:       ${report.words} (~${report.readingMinutes} min de leitura)`);
  console.log(
    `  Pendências:     ${report.pendingMarkers.length ? report.pendingMarkers.join('; ') : 'Nenhuma'}`,
  );
}

async function cmdDoctor() {
  console.log('1/3 Executando validação de schemas e integridade referencial...');
  execFileSync(process.execPath, [join(ROOT_DIR, 'scripts', 'validate-content.mjs')], {
    stdio: 'inherit',
  });
  console.log('2/3 Executando validação de mídia local...');
  execFileSync(process.execPath, [join(ROOT_DIR, 'scripts', 'media.mjs'), 'validate'], {
    stdio: 'inherit',
  });
  console.log('3/3 Verificando inventário de rascunhos reais...');
  const items = (await loadAllEntries(DEFAULT_CONTENT_DIR)).filter((i) => !i.isFixture);
  const drafts = items.filter((i) => i.status === 'draft');
  const published = items.filter((i) => i.status === 'published');
  console.log(
    `Diagnóstico concluído: ${published.length} publicação(ões) real(is), ${drafts.length} rascunho(s) real(is).`,
  );
}

async function cmdPreview(opts) {
  if (opts['print-command']) {
    console.log(
      'INCLUDE_DRAFTS=true ASTRO_OUT_DIR=dist-preview npx astro build && npx astro preview --host 127.0.0.1 --port 4322',
    );
    return;
  }

  const env = {
    ...process.env,
    INCLUDE_DRAFTS: 'true',
    ASTRO_OUT_DIR: 'dist-preview',
  };

  const run = (cmd, args) =>
    new Promise((res, rej) => {
      const child = spawn(cmd, args, {
        stdio: 'inherit',
        shell: process.platform === 'win32',
        env,
      });
      child.on('exit', (code) => (code === 0 ? res() : rej(new Error(`${cmd} falhou (${code})`))));
    });

  await run('npx', ['astro', 'build']);
  if (opts['build-only']) {
    console.log('Prévia local de rascunhos gerada em dist-preview/ (noindex, isolada de dist/).');
    return;
  }
  console.log('Iniciando servidor de prévia local em http://127.0.0.1:4322/ (somente loopback)...');
  await run('npx', ['astro', 'preview', '--host', '127.0.0.1', '--port', '4322']);
}

async function cmdPublish(opts, positional) {
  const slug = String(opts.slug || positional[0] || '');
  if (!slug) {
    throw new Error(
      'Uso: npm run content:publish -- --slug=<slug> [--dry-run] [--confirm-publish] [--content-dir=<dir>]',
    );
  }

  const contentDir = opts['content-dir']
    ? resolve(String(opts['content-dir']))
    : DEFAULT_CONTENT_DIR;
  const items = await loadAllEntries(contentDir);
  const item = items.find((i) => i.slug === slug && TYPE_CONFIG[i.type]?.editorial);
  if (!item) throw new Error(`Conteúdo editorial não encontrado para slug "${slug}".`);

  const originalRaw = await readFile(item.filePath, 'utf-8');
  if (originalRaw.includes('[PENDENTE]') || originalRaw.includes('TODO:')) {
    throw new Error(
      `Publicação bloqueada: "${slug}" ainda contém marcadores de pendência ([PENDENTE] ou TODO:).`,
    );
  }
  if (item.data.cover?.rightsStatus === 'pending') {
    throw new Error(
      `Publicação bloqueada: direitos da imagem de capa ainda estão marcados como "pending".`,
    );
  }

  const updatedRaw = originalRaw.replace(/^(status:\s*)draft(\r?)$/m, '$1published$2');
  if (updatedRaw === originalRaw) {
    console.log(`"${slug}" já não está em status draft (status atual: ${item.status}).`);
    return;
  }

  console.log(`Diff proposto em ${item.filePath}:\n  - status: draft\n  + status: published`);

  if (opts['dry-run']) {
    console.log('[dry-run] Nenhuma alteração gravada.');
    return;
  }

  if (!opts['confirm-publish']) {
    throw new Error(
      'Confirmação explícita obrigatória. Reexecute com --confirm-publish para alterar o arquivo localmente (nenhum push/deploy é executado).',
    );
  }

  await writeFile(item.filePath, updatedRaw, 'utf-8');
  console.log(`Status atualizado localmente para "published" em: ${item.filePath}`);
  console.log(
    'Lembrete: nenhuma alteração foi enviada ao Git remoto ou publicada no GitHub Pages.',
  );
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const { opts, positional } = parseArgs(rest);

  try {
    switch (command) {
      case 'new':
        await cmdNew(opts, positional);
        break;
      case 'list':
        await cmdList(opts);
        break;
      case 'status':
        await cmdStatus(opts, positional);
        break;
      case 'doctor':
        await cmdDoctor();
        break;
      case 'preview':
        await cmdPreview(opts);
        break;
      case 'publish':
        await cmdPublish(opts, positional);
        break;
      default:
        console.error(
          'Uso: node scripts/content-cli.mjs <new|list|status|doctor|preview|publish> ...',
        );
        process.exit(1);
    }
  } catch (err) {
    console.error(`Erro [content:${command || 'cli'}]: ${err.message}`);
    process.exit(1);
  }
}

if (
  import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` ||
  process.argv[1]?.endsWith('content-cli.mjs')
) {
  main();
}
