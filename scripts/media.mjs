import { createHash } from 'node:crypto';
import {
  lstat,
  mkdir,
  readdir,
  readFile,
  realpath,
  rename,
  stat,
  unlink,
  writeFile,
} from 'node:fs/promises';
import { extname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import sharp from 'sharp';
import { parse as parseYaml } from 'yaml';

const ROOT_DIR = resolve(import.meta.dirname, '..');
const DEFAULT_ASSETS_ROOT = join(ROOT_DIR, 'src', 'assets', 'images');
const DEFAULT_CONTENT_ROOT = join(ROOT_DIR, 'src', 'content');

const CONTEXT_RULES = {
  works: { maxWidth: 800, targetMaxBytes: 200 * 1024, quality: 82 },
  reviews: { maxWidth: 900, targetMaxBytes: 200 * 1024, quality: 82 },
  articles: { maxWidth: 1200, targetMaxBytes: 250 * 1024, quality: 82 },
  guides: { maxWidth: 900, targetMaxBytes: 200 * 1024, quality: 82 },
  collecting: { maxWidth: 1600, targetMaxBytes: 350 * 1024, quality: 84 },
  editions: { maxWidth: 1200, targetMaxBytes: 300 * 1024, quality: 84 },
  creators: { maxWidth: 600, targetMaxBytes: 150 * 1024, quality: 82 },
  publishers: { maxWidth: 600, targetMaxBytes: 150 * 1024, quality: 82 },
  studios: { maxWidth: 600, targetMaxBytes: 150 * 1024, quality: 82 },
  placeholders: { maxWidth: 800, targetMaxBytes: 150 * 1024, quality: 82 },
};

const MAX_INPUT_BYTES = 25 * 1024 * 1024;
const MAX_INPUT_PIXELS = 64_000_000;
const WARN_FILE_BYTES = 400 * 1024;
const ALLOWED_RIGHTS = new Set(['own', 'authorized', 'pending', 'demo']);

function parseArgs(argv) {
  const opts = {};
  const positional = [];
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const eq = arg.indexOf('=');
      if (eq !== -1) {
        opts[arg.slice(2, eq)] = arg.slice(eq + 1);
      } else {
        opts[arg.slice(2)] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { opts, positional };
}

function normalizeName(input) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function assertSafeSegment(raw, label) {
  if (!raw || typeof raw !== 'string') {
    throw new Error(`${label} é obrigatório.`);
  }
  if (raw.includes('..') || raw.includes('/') || raw.includes('\\') || isAbsolute(raw)) {
    throw new Error(
      `${label} inválido (travessia de diretório ou caminho absoluto não permitido): "${raw}"`,
    );
  }
  const slug = normalizeName(raw);
  if (!slug) {
    throw new Error(`${label} resultou em identificador vazio: "${raw}"`);
  }
  return slug;
}

function assertInsideRoot(targetPath, rootPath) {
  const rel = relative(rootPath, targetPath);
  if (rel.startsWith('..') || isAbsolute(rel)) {
    throw new Error(`Destino fora da raiz permitida: ${targetPath}`);
  }
}

function validateSvgSafety(svgContent) {
  const forbidden = [
    /<script\b/i,
    /\bon[a-z]+\s*=/i,
    /javascript:/i,
    /<foreignObject\b/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i,
  ];
  for (const re of forbidden) {
    if (re.test(svgContent)) {
      throw new Error(`SVG rejeitado por conter elemento/atributo ativo proibido (${re.source}).`);
    }
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function walkFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(full)));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

async function cmdImport(opts, positional) {
  if (opts.help) {
    console.log(`Uso:
  npm run media:import -- --src="<arquivo-local>" --context=<works|reviews|articles|guides|collecting|editions|creators|publishers|studios|placeholders> --slug=<slug> [--name=<nome>] [--alt="<texto>"] [--credit="<credito>"] [--rights=<own|authorized|pending|demo>] [--format=<webp|png|keep>] [--max-width=<px>] [--dry-run] [--force] [--out-dir=<dir>]`);
    return;
  }

  const srcInput = opts.src || positional[0];
  if (!srcInput) throw new Error('Informe o arquivo de origem via --src="<caminho>".');
  if (/^https?:\/\//i.test(srcInput)) {
    throw new Error(
      'URLs remotas não são aceitas em media:import. Informe um arquivo local autorizado.',
    );
  }

  const context = String(opts.context || '');
  if (!(context in CONTEXT_RULES)) {
    throw new Error(
      `Contexto inválido "${context}". Permitidos: ${Object.keys(CONTEXT_RULES).join(', ')}.`,
    );
  }

  const slug = assertSafeSegment(String(opts.slug || ''), 'slug');
  const logicalName = assertSafeSegment(String(opts.name || 'cover'), 'name');
  const rights = opts.rights ? String(opts.rights) : 'pending';
  if (!ALLOWED_RIGHTS.has(rights)) {
    throw new Error(
      `Valor inválido para --rights: "${rights}". Use own, authorized, pending ou demo.`,
    );
  }

  const assetsRoot = opts['out-dir'] ? resolve(String(opts['out-dir'])) : DEFAULT_ASSETS_ROOT;
  const srcPath = resolve(srcInput);
  const srcStat = await lstat(srcPath).catch(() => null);
  if (!srcStat) {
    throw new Error(`Arquivo de origem não encontrado: ${srcInput}`);
  }
  if (srcStat.isSymbolicLink()) {
    const resolvedLink = await realpath(srcPath);
    const linkStat = await stat(resolvedLink);
    if (!linkStat.isFile())
      throw new Error('Symlink de origem não aponta para um arquivo regular.');
  } else if (!srcStat.isFile()) {
    throw new Error('A origem informada não é um arquivo regular.');
  }

  const inputBuffer = await readFile(srcPath);
  if (inputBuffer.length === 0) throw new Error('Arquivo de origem está vazio.');
  if (inputBuffer.length > MAX_INPUT_BYTES) {
    throw new Error(`Arquivo excede o limite de entrada (${formatBytes(MAX_INPUT_BYTES)}).`);
  }

  const srcExt = extname(srcPath).toLowerCase();
  const rule = CONTEXT_RULES[context];
  const maxWidth = opts['max-width'] ? Math.max(64, Number(opts['max-width'])) : rule.maxWidth;

  let outputBuffer;
  let outExt;
  let finalWidth;
  let finalHeight;
  let origWidth;
  let origHeight;

  if (srcExt === '.svg') {
    const svgText = inputBuffer.toString('utf-8');
    if (!svgText.includes('<svg')) {
      throw new Error('Arquivo .svg inválido (tag <svg> ausente).');
    }
    validateSvgSafety(svgText);
    outputBuffer = inputBuffer;
    outExt = '.svg';
    const meta = await sharp(inputBuffer)
      .metadata()
      .catch(() => ({ width: 420, height: 600 }));
    origWidth = meta.width || 420;
    origHeight = meta.height || 600;
    finalWidth = origWidth;
    finalHeight = origHeight;
  } else {
    let meta;
    try {
      meta = await sharp(inputBuffer, { limitInputPixels: MAX_INPUT_PIXELS }).metadata();
    } catch (err) {
      throw new Error(`Arquivo de imagem inválido ou corrompido: ${err.message}`, { cause: err });
    }

    if (!meta.format || !['jpeg', 'png', 'webp', 'tiff', 'avif', 'gif'].includes(meta.format)) {
      throw new Error(`Formato de imagem não suportado: "${meta.format || 'desconhecido'}".`);
    }
    if ((meta.pages || 1) > 1) {
      throw new Error(
        `Imagem animada (${meta.format}, ${meta.pages} quadros) rejeitada para evitar perda silenciosa de animação.`,
      );
    }

    origWidth = meta.width || 0;
    origHeight = meta.height || 0;
    if (origWidth <= 0 || origHeight <= 0) {
      throw new Error('Não foi possível determinar dimensões válidas da imagem.');
    }

    const requestedFormat = String(opts.format || 'webp').toLowerCase();
    const usePng = requestedFormat === 'png';
    outExt = usePng ? '.png' : '.webp';

    // rotate() normaliza orientação EXIF antes de remover metadados EXIF/GPS (default do Sharp sem withMetadata)
    let pipeline = sharp(inputBuffer, { limitInputPixels: MAX_INPUT_PIXELS })
      .rotate()
      .toColorspace('srgb')
      .resize({ width: maxWidth, withoutEnlargement: true });

    if (usePng) {
      pipeline = pipeline.png({ compressionLevel: 9, palette: false });
    } else {
      pipeline = pipeline.webp({ quality: rule.quality, effort: 5 });
    }

    const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
    outputBuffer = data;
    finalWidth = info.width;
    finalHeight = info.height;
  }

  const destDir = join(assetsRoot, context, slug);
  const destPath = join(destDir, `${logicalName}${outExt}`);
  assertInsideRoot(destPath, assetsRoot);

  const existsAlready = await stat(destPath).then(
    () => true,
    () => false,
  );
  if (existsAlready && !opts.force) {
    throw new Error(`Arquivo de destino já existe (use --force para sobrescrever): ${destPath}`);
  }

  const repoRelSrc = `src/assets/images/${context}/${slug}/${logicalName}${outExt}`;
  const isDryRun = Boolean(opts['dry-run']);

  if (!isDryRun) {
    await mkdir(destDir, { recursive: true });
    const tmpPath = `${destPath}.tmp-${process.pid}-${Date.now()}`;
    try {
      await writeFile(tmpPath, outputBuffer, { flag: 'wx' });
      await rename(tmpPath, destPath);
    } catch (err) {
      await unlink(tmpPath).catch(() => {});
      throw err;
    }
  }

  const warning =
    outputBuffer.length > rule.targetMaxBytes
      ? `AVISO: tamanho final (${formatBytes(outputBuffer.length)}) acima da meta recomendada (${formatBytes(rule.targetMaxBytes)}) para "${context}". Qualidade preservada.`
      : null;

  const result = {
    dryRun: isDryRun,
    context,
    slug,
    destination: opts['out-dir'] ? destPath : repoRelSrc,
    before: { bytes: inputBuffer.length, width: origWidth, height: origHeight },
    after: {
      bytes: outputBuffer.length,
      width: finalWidth,
      height: finalHeight,
      format: outExt.slice(1),
    },
    warning,
    frontmatter: {
      src: repoRelSrc,
      alt: String(opts.alt || 'Descreva a imagem com objetividade.'),
      width: finalWidth,
      height: finalHeight,
      credit: String(opts.credit || 'Crédito editorial a confirmar'),
      rightsStatus: rights,
    },
  };

  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(`${isDryRun ? '[dry-run] ' : ''}Importação concluída:`);
  console.log(`  Destino: ${result.destination}`);
  console.log(
    `  Antes:   ${origWidth}x${origHeight} (${formatBytes(inputBuffer.length)}) -> Depois: ${finalWidth}x${finalHeight} (${formatBytes(outputBuffer.length)})`,
  );
  if (warning) console.warn(`  ${warning}`);
  console.log('\nSnippet sugerido para frontmatter/JSON:');
  console.log(JSON.stringify({ cover: result.frontmatter }, null, 2));
}

async function cmdOptimize(opts) {
  const assetsRoot = opts['out-dir'] ? resolve(String(opts['out-dir'])) : DEFAULT_ASSETS_ROOT;
  const files = await walkFiles(assetsRoot);
  const rasterFiles = files.filter((f) => /\.(webp|png|jpe?g)$/i.test(f));
  let optimized = 0;
  let skipped = 0;

  for (const file of rasterFiles) {
    const rel = relative(assetsRoot, file);
    const context = rel.split(sep)[0];
    const rule = CONTEXT_RULES[context] || CONTEXT_RULES.articles;
    const buf = await readFile(file);
    const meta = await sharp(buf).metadata();
    const needsResize = (meta.width || 0) > rule.maxWidth;
    const needsCompress = buf.length > rule.targetMaxBytes;

    if (!opts.force && !needsResize && !needsCompress) {
      skipped++;
      continue;
    }

    let pipeline = sharp(buf).rotate().toColorspace('srgb');
    if (needsResize) pipeline = pipeline.resize({ width: rule.maxWidth, withoutEnlargement: true });
    const ext = extname(file).toLowerCase();
    if (ext === '.png') pipeline = pipeline.png({ compressionLevel: 9 });
    else if (ext === '.jpg' || ext === '.jpeg')
      pipeline = pipeline.jpeg({ quality: rule.quality, mozjpeg: true });
    else pipeline = pipeline.webp({ quality: rule.quality, effort: 5 });

    const out = await pipeline.toBuffer();
    if (out.length < buf.length || needsResize) {
      if (!opts['dry-run']) {
        const tmp = `${file}.tmp-${process.pid}`;
        await writeFile(tmp, out);
        await rename(tmp, file);
      }
      optimized++;
      console.log(
        `${opts['dry-run'] ? '[dry-run] ' : ''}Otimizado: ${rel} (${formatBytes(buf.length)} -> ${formatBytes(out.length)})`,
      );
    } else {
      skipped++;
    }
  }

  console.log(`Resumo media:optimize — otimizados=${optimized}, mantidos=${skipped}.`);
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  return parseYaml(m[1]);
}

async function collectMediaReferences(contentRoot) {
  const refs = [];
  const files = await walkFiles(contentRoot);
  for (const file of files) {
    const relFile = relative(ROOT_DIR, file).replace(/\\/g, '/');
    if (file.endsWith('.json')) {
      const data = JSON.parse(await readFile(file, 'utf-8'));
      if (data.cover?.src) {
        refs.push({
          sourceFile: relFile,
          isFixture: Boolean(data.isFixture),
          status: 'published',
          asset: data.cover,
        });
      }
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const raw = await readFile(file, 'utf-8');
      const fm = parseFrontmatter(raw);
      if (!fm) continue;
      if (fm.cover?.src) {
        refs.push({
          sourceFile: relFile,
          isFixture: Boolean(fm.isFixture),
          status: fm.status || 'draft',
          asset: fm.cover,
        });
      }
      const mdImgMatches = raw.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g);
      for (const m of mdImgMatches) {
        refs.push({
          sourceFile: relFile,
          isFixture: Boolean(fm.isFixture),
          status: fm.status || 'draft',
          asset: { src: m[2].trim(), alt: m[1].trim(), credit: 'inline' },
        });
      }
    }
  }
  return refs;
}

async function cmdValidate(opts) {
  const contentRoot = opts['content-dir']
    ? resolve(String(opts['content-dir']))
    : DEFAULT_CONTENT_ROOT;
  const assetsRoot = opts['assets-dir'] ? resolve(String(opts['assets-dir'])) : DEFAULT_ASSETS_ROOT;
  const publicRoot = join(ROOT_DIR, 'public');

  const errors = [];
  const warnings = [];
  const refs = await collectMediaReferences(contentRoot);

  for (const ref of refs) {
    const { src, credit, rightsStatus } = ref.asset;
    const isRealPublished = !ref.isFixture && ref.status === 'published';

    if (/^https?:\/\//i.test(src)) {
      const msg = `[${ref.sourceFile}] URL externa de imagem não autorizada: "${src}"`;
      if (isRealPublished) errors.push(msg);
      else warnings.push(msg);
      continue;
    }

    if (!ref.isFixture && (src.includes('demo-assets') || rightsStatus === 'demo')) {
      errors.push(`[${ref.sourceFile}] Conteúdo real referencia mídia demonstrativa: "${src}"`);
      continue;
    }

    if (isRealPublished && rightsStatus === 'pending') {
      errors.push(`[${ref.sourceFile}] Publicação real com direitos de imagem pendentes: "${src}"`);
    }

    if (isRealPublished && (!credit || !credit.trim())) {
      errors.push(`[${ref.sourceFile}] Publicação real sem crédito de imagem: "${src}"`);
    }

    let diskPath = null;
    if (src.startsWith('src/assets/images/') || src.startsWith('/src/assets/images/')) {
      const clean = src.replace(/^\/?src\/assets\/images\//, '');
      diskPath = join(assetsRoot, clean);
    } else if (src.startsWith('/')) {
      diskPath = join(publicRoot, src.slice(1));
    }

    if (diskPath) {
      const fileInfo = await stat(diskPath).catch(() => null);
      if (!fileInfo || !fileInfo.isFile()) {
        if (ref.isFixture && src.startsWith('/demo-assets/')) {
          warnings.push(
            `[${ref.sourceFile}] Asset demonstrativo ausente (gerado sob demanda): "${src}"`,
          );
        } else if (isRealPublished) {
          errors.push(`[${ref.sourceFile}] Arquivo de mídia inexistente: "${src}"`);
        } else {
          warnings.push(`[${ref.sourceFile}] Rascunho com mídia ainda não encontrada: "${src}"`);
        }
      } else if (fileInfo.size > WARN_FILE_BYTES) {
        warnings.push(
          `[${ref.sourceFile}] Imagem acima da meta recomendada (${formatBytes(fileInfo.size)}): "${src}"`,
        );
      }
    }
  }

  // Valida integridade básica de arquivos em src/assets/images
  const assetFiles = await walkFiles(assetsRoot);
  for (const file of assetFiles) {
    const rel = relative(ROOT_DIR, file).replace(/\\/g, '/');
    if (file.endsWith('.svg')) {
      try {
        validateSvgSafety(await readFile(file, 'utf-8'));
      } catch (err) {
        errors.push(`[${rel}] ${err.message}`);
      }
    } else if (/\.(webp|png|jpe?g|avif)$/i.test(file)) {
      const info = await stat(file);
      if (info.size > WARN_FILE_BYTES) {
        warnings.push(
          `[${rel}] Arquivo acima de ${formatBytes(WARN_FILE_BYTES)} (${formatBytes(info.size)}).`,
        );
      }
    }
  }

  if (opts.json) {
    console.log(
      JSON.stringify(
        { references: refs.length, assets: assetFiles.length, errors, warnings },
        null,
        2,
      ),
    );
  } else {
    console.log(
      `Validação de mídia: ${refs.length} referência(s), ${assetFiles.length} arquivo(s) em src/assets/images/.`,
    );
    for (const w of warnings) console.warn(`  [AVISO] ${w}`);
    for (const e of errors) console.error(`  [ERRO]  ${e}`);
  }

  if (errors.length > 0) process.exit(1);
}

async function cmdFindDuplicates(opts) {
  const assetsRoot = opts['assets-dir'] ? resolve(String(opts['assets-dir'])) : DEFAULT_ASSETS_ROOT;
  const files = await walkFiles(assetsRoot);
  const byHash = new Map();

  for (const file of files) {
    const buf = await readFile(file);
    const hash = createHash('sha256').update(buf).digest('hex');
    const rel = relative(assetsRoot, file).replace(/\\/g, '/');
    const list = byHash.get(hash) ?? [];
    list.push(rel);
    byHash.set(hash, list);
  }

  const duplicates = [];
  for (const [hash, group] of byHash.entries()) {
    if (group.length > 1) duplicates.push({ sha256: hash, files: group });
  }

  if (opts.json) {
    console.log(JSON.stringify({ scanned: files.length, duplicates }, null, 2));
    return;
  }

  if (duplicates.length === 0) {
    console.log(`Nenhuma duplicata exata encontrada em ${files.length} arquivo(s).`);
  } else {
    console.log(`${duplicates.length} grupo(s) de duplicatas exatas (nenhum arquivo removido):`);
    for (const d of duplicates) {
      console.log(`  SHA-256 ${d.sha256.slice(0, 12)}: ${d.files.join(', ')}`);
    }
  }
}

async function cmdFindUnused(opts) {
  const assetsRoot = opts['assets-dir'] ? resolve(String(opts['assets-dir'])) : DEFAULT_ASSETS_ROOT;
  const contentRoot = opts['content-dir']
    ? resolve(String(opts['content-dir']))
    : DEFAULT_CONTENT_ROOT;
  const files = await walkFiles(assetsRoot);

  const searchableFiles = [
    ...(await walkFiles(contentRoot)),
    ...(await walkFiles(join(ROOT_DIR, 'src', 'pages'))),
    ...(await walkFiles(join(ROOT_DIR, 'src', 'shared'))),
  ];

  let corpus = '';
  for (const sf of searchableFiles) {
    if (/\.(astro|ts|js|mjs|scss|css|json|md|mdx)$/i.test(sf)) {
      corpus += '\n' + (await readFile(sf, 'utf-8'));
    }
  }

  const unused = [];
  for (const file of files) {
    const relFromAssets = relative(assetsRoot, file).replace(/\\/g, '/');
    const repoPath = `src/assets/images/${relFromAssets}`;
    if (!corpus.includes(relFromAssets) && !corpus.includes(repoPath)) {
      unused.push({ file: repoPath, confidence: 'media (verificar referências dinâmicas)' });
    }
  }

  if (opts.json) {
    console.log(JSON.stringify({ scanned: files.length, unused }, null, 2));
    return;
  }

  if (unused.length === 0) {
    console.log(`Todos os ${files.length} arquivo(s) em src/assets/images/ possuem referência.`);
  } else {
    console.log(`${unused.length} arquivo(s) potencialmente sem uso (nenhum arquivo removido):`);
    for (const u of unused) console.log(`  - ${u.file} [${u.confidence}]`);
  }
}

async function cmdStats(opts) {
  const assetsRoot = opts['assets-dir'] ? resolve(String(opts['assets-dir'])) : DEFAULT_ASSETS_ROOT;
  const files = await walkFiles(assetsRoot);
  const byCategory = {};
  const items = [];
  let totalBytes = 0;

  for (const file of files) {
    const info = await stat(file);
    const rel = relative(assetsRoot, file).replace(/\\/g, '/');
    const category = rel.split('/')[0] || 'root';
    totalBytes += info.size;
    byCategory[category] = byCategory[category] || { count: 0, bytes: 0 };
    byCategory[category].count += 1;
    byCategory[category].bytes += info.size;
    items.push({ file: `src/assets/images/${rel}`, bytes: info.size });
  }

  items.sort((a, b) => b.bytes - a.bytes);

  let distBytes = 0;
  let distFilesCount = 0;
  const distFiles = await walkFiles(join(ROOT_DIR, 'dist'));
  for (const df of distFiles) {
    distBytes += (await stat(df)).size;
    distFilesCount++;
  }

  const report = {
    assetsCount: files.length,
    assetsTotalBytes: totalBytes,
    byCategory,
    largestFiles: items.slice(0, 5),
    editorialBuildDist: { files: distFilesCount, totalBytes: distBytes },
  };

  if (opts.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(
    `Inventário de mídia local (${files.length} arquivo(s), ${formatBytes(totalBytes)}):`,
  );
  for (const [cat, data] of Object.entries(byCategory)) {
    console.log(`  - ${cat}: ${data.count} arquivo(s), ${formatBytes(data.bytes)}`);
  }
  console.log(`Build editorial (dist/): ${distFilesCount} arquivo(s), ${formatBytes(distBytes)}.`);
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const { opts, positional } = parseArgs(rest);

  try {
    switch (command) {
      case 'import':
        await cmdImport(opts, positional);
        break;
      case 'optimize':
        await cmdOptimize(opts);
        break;
      case 'validate':
        await cmdValidate(opts);
        break;
      case 'find-duplicates':
        await cmdFindDuplicates(opts);
        break;
      case 'find-unused':
        await cmdFindUnused(opts);
        break;
      case 'stats':
        await cmdStats(opts);
        break;
      default:
        console.error(
          'Subcomando inválido. Use: import | optimize | validate | stats | find-duplicates | find-unused',
        );
        process.exit(1);
    }
  } catch (err) {
    console.error(`Erro [media:${command || 'cli'}]: ${err.message}`);
    process.exit(1);
  }
}

main();
