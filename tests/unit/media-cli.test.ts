import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const MEDIA_SCRIPT = resolve(process.cwd(), 'scripts/media.mjs');

function runMedia(args: string[]) {
  return execFileSync(process.execPath, [MEDIA_SCRIPT, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

describe('CLI de mídia local (Fase 43)', () => {
  let tmpRoot: string;
  let srcDir: string;
  let outAssetsDir: string;
  let fakeContentDir: string;

  beforeAll(async () => {
    tmpRoot = mkdtempSync(join(tmpdir(), 'ma-media-test-'));
    srcDir = join(tmpRoot, 'input');
    outAssetsDir = join(tmpRoot, 'assets');
    fakeContentDir = join(tmpRoot, 'content');
    mkdirSync(srcDir, { recursive: true });
    mkdirSync(outAssetsDir, { recursive: true });
    mkdirSync(join(fakeContentDir, 'works'), { recursive: true });

    // JPEG 1200x1600 válido com orientação EXIF
    await sharp({
      create: { width: 1200, height: 1600, channels: 3, background: { r: 180, g: 30, b: 45 } },
    })
      .jpeg({ quality: 90 })
      .toFile(join(srcDir, 'capa teste よつばと.jpg'));

    // PNG com transparência (RGBA)
    await sharp({
      create: {
        width: 400,
        height: 400,
        channels: 4,
        background: { r: 20, g: 20, b: 24, alpha: 0.5 },
      },
    })
      .png()
      .toFile(join(srcDir, 'transparente.png'));

    // Arquivo corrompido/truncado
    writeFileSync(join(srcDir, 'corrompido.jpg'), Buffer.from('not-a-valid-image'));

    // SVG inseguro com <script>
    writeFileSync(
      join(srcDir, 'inseguro.svg'),
      '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>',
    );
  });

  afterAll(() => {
    rmSync(tmpRoot, { recursive: true, force: true });
  });

  it('importa JPEG com espaços e Unicode japonês, redimensiona sem upscale e gera WebP em --out-dir', () => {
    const out = runMedia([
      'import',
      `--src=${join(srcDir, 'capa teste よつばと.jpg')}`,
      '--context=works',
      '--slug=yotsuba-real',
      '--name=capa',
      '--alt=Capa de teste',
      '--credit=Acervo próprio',
      '--rights=own',
      '--json',
      `--out-dir=${outAssetsDir}`,
    ]);
    const parsed = JSON.parse(out);
    expect(parsed.dryRun).toBe(false);
    expect(parsed.after.format).toBe('webp');
    expect(parsed.after.width).toBe(800);
    expect(existsSync(join(outAssetsDir, 'works', 'yotsuba-real', 'capa.webp'))).toBe(true);
  });

  it('não cria arquivos em --dry-run e preserva transparência em --format=png', () => {
    const dryOut = runMedia([
      'import',
      `--src=${join(srcDir, 'transparente.png')}`,
      '--context=articles',
      '--slug=ensaio-transparencia',
      '--name=diagrama',
      '--format=png',
      '--dry-run',
      '--json',
      `--out-dir=${outAssetsDir}`,
    ]);
    const parsed = JSON.parse(dryOut);
    expect(parsed.dryRun).toBe(true);
    expect(parsed.after.format).toBe('png');
    expect(existsSync(join(outAssetsDir, 'articles', 'ensaio-transparencia', 'diagrama.png'))).toBe(
      false,
    );
  });

  it('bloqueia sobrescrita silenciosa, path traversal, URL remota, arquivo corrompido e SVG com script', () => {
    // Sobrescrita sem --force
    expect(() =>
      runMedia([
        'import',
        `--src=${join(srcDir, 'capa teste よつばと.jpg')}`,
        '--context=works',
        '--slug=yotsuba-real',
        '--name=capa',
        `--out-dir=${outAssetsDir}`,
      ]),
    ).toThrow();

    // Path traversal
    expect(() =>
      runMedia([
        'import',
        `--src=${join(srcDir, 'transparente.png')}`,
        '--context=works',
        '--slug=../escape',
        `--out-dir=${outAssetsDir}`,
      ]),
    ).toThrow();

    // URL remota
    expect(() =>
      runMedia([
        'import',
        '--src=https://exemplo.org/capa.jpg',
        '--context=works',
        '--slug=remota',
        `--out-dir=${outAssetsDir}`,
      ]),
    ).toThrow();

    // Arquivo corrompido
    expect(() =>
      runMedia([
        'import',
        `--src=${join(srcDir, 'corrompido.jpg')}`,
        '--context=works',
        '--slug=corrompido',
        `--out-dir=${outAssetsDir}`,
      ]),
    ).toThrow();

    // SVG com script
    expect(() =>
      runMedia([
        'import',
        `--src=${join(srcDir, 'inseguro.svg')}`,
        '--context=works',
        '--slug=svg-inseguro',
        `--out-dir=${outAssetsDir}`,
      ]),
    ).toThrow();
  });

  it('detecta duplicatas exatas, arquivos sem uso, estatísticas JSON e referências quebradas/demo', () => {
    // Cria duplicata exata
    const dupDir = join(outAssetsDir, 'works', 'duplicada');
    mkdirSync(dupDir, { recursive: true });
    runMedia([
      'import',
      `--src=${join(srcDir, 'capa teste よつばと.jpg')}`,
      '--context=works',
      '--slug=duplicada',
      '--name=capa',
      `--out-dir=${outAssetsDir}`,
    ]);

    const dupJson = JSON.parse(
      runMedia(['find-duplicates', `--assets-dir=${outAssetsDir}`, '--json']),
    );
    expect(dupJson.duplicates.length).toBeGreaterThanOrEqual(1);

    const statsJson = JSON.parse(runMedia(['stats', `--assets-dir=${outAssetsDir}`, '--json']));
    expect(statsJson.assetsCount).toBe(2);

    const unusedJson = JSON.parse(
      runMedia([
        'find-unused',
        `--assets-dir=${outAssetsDir}`,
        `--content-dir=${fakeContentDir}`,
        '--json',
      ]),
    );
    expect(unusedJson.unused.length).toBe(2);

    // Referência quebrada em obra real deve falhar em media:validate
    writeFileSync(
      join(fakeContentDir, 'works', 'quebrada.json'),
      JSON.stringify({
        id: 'work-quebrada',
        slug: 'quebrada',
        title: 'Obra Quebrada',
        cover: {
          src: 'src/assets/images/works/quebrada/inexistente.webp',
          alt: 'Capa',
          width: 400,
          height: 600,
          credit: 'Autor',
          rightsStatus: 'own',
        },
      }),
    );

    expect(() =>
      runMedia(['validate', `--assets-dir=${outAssetsDir}`, `--content-dir=${fakeContentDir}`]),
    ).toThrow();
  });
});
