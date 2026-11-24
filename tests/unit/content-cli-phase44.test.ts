import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const CLI = resolve(process.cwd(), 'scripts/content-cli.mjs');

function runCli(args: string[]) {
  return execFileSync(process.execPath, [CLI, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

describe('CLI editorial completo (Fase 44)', () => {
  let tmpContent: string;

  beforeAll(() => {
    tmpContent = mkdtempSync(join(tmpdir(), 'ma-content-cli-'));
  });

  afterAll(() => {
    rmSync(tmpContent, { recursive: true, force: true });
  });

  it('cria obra, criador, editora, edição, review, artigo, guia e colecionismo em draft sem notas inventadas', () => {
    runCli(['new', 'creator', 'kiyohiko-azuma', 'Kiyohiko Azuma', `--out-dir=${tmpContent}`]);
    runCli(['new', 'publisher', 'panini-comics', 'Panini Comics', `--out-dir=${tmpContent}`]);
    runCli([
      'new',
      'work',
      'yotsuba-vol-1',
      'Yotsuba&!',
      '--kind=manga',
      `--out-dir=${tmpContent}`,
    ]);
    runCli([
      'new',
      'edition',
      'yotsuba-edicao-jp',
      'Yotsuba&! Vol. 1 (JP)',
      '--work-id=work-yotsuba-vol-1',
      '--publisher-id=publisher-panini-comics',
      `--out-dir=${tmpContent}`,
    ]);
    runCli([
      'new',
      'review',
      'yotsuba-vol-1-review',
      'Yotsuba&! Vol. 1',
      '--work-id=work-yotsuba-vol-1',
      '--scope=volume',
      `--out-dir=${tmpContent}`,
    ]);
    runCli([
      'new',
      'article',
      'cotidiano-slice-of-life',
      'O cotidiano como narrativa',
      `--out-dir=${tmpContent}`,
    ]);
    runCli([
      'new',
      'guide',
      'guia-slice-of-life',
      'Por onde começar no slice of life',
      `--out-dir=${tmpContent}`,
    ]);
    runCli([
      'new',
      'collecting',
      'edicao-jp-yotsuba',
      'Conhecendo a edição japonesa',
      `--out-dir=${tmpContent}`,
    ]);

    const reviewRaw = readFileSync(
      join(tmpContent, 'reviews', 'yotsuba-vol-1-review.mdx'),
      'utf-8',
    );
    expect(reviewRaw).toContain('status: draft');
    expect(reviewRaw).not.toContain('rating:');
    expect(existsSync(join(tmpContent, 'works', 'yotsuba-vol-1.json'))).toBe(true);
    expect(existsSync(join(tmpContent, 'editions', 'yotsuba-edicao-jp.json'))).toBe(true);
  });

  it('bloqueia colisão case-insensitive e lista/inspeciona status corretamente', () => {
    expect(() =>
      runCli(['new', 'article', 'COTIDIANO-SLICE-OF-LIFE', 'Duplicado', `--out-dir=${tmpContent}`]),
    ).toThrow();

    const list = JSON.parse(runCli(['list', `--content-dir=${tmpContent}`, '--json']));
    expect(list.length).toBe(8);

    const status = JSON.parse(
      runCli(['status', '--slug=yotsuba-vol-1-review', `--content-dir=${tmpContent}`, '--json']),
    );
    expect(status.status).toBe('draft');
    expect(status.pendingMarkers.length).toBeGreaterThan(0);
    expect(status.readyToPublish).toBe(false);
  });

  it('bloqueia publicação com [PENDENTE] ou sem --confirm-publish, e publica em fixture temporária preservando o corpo', () => {
    // Bloqueia com [PENDENTE]
    expect(() =>
      runCli([
        'publish',
        '--slug=yotsuba-vol-1-review',
        '--confirm-publish',
        `--content-dir=${tmpContent}`,
      ]),
    ).toThrow();

    // Remove marcadores de pendência na fixture temporária
    const reviewPath = join(tmpContent, 'reviews', 'yotsuba-vol-1-review.mdx');
    const clean = readFileSync(reviewPath, 'utf-8').replace(/\[PENDENTE\]/g, 'Texto revisado');
    writeFileSync(reviewPath, clean, 'utf-8');

    // Bloqueia sem --confirm-publish
    expect(() =>
      runCli(['publish', '--slug=yotsuba-vol-1-review', `--content-dir=${tmpContent}`]),
    ).toThrow();

    // Dry-run não altera arquivo
    runCli(['publish', '--slug=yotsuba-vol-1-review', '--dry-run', `--content-dir=${tmpContent}`]);
    expect(readFileSync(reviewPath, 'utf-8')).toContain('status: draft');

    // Com --confirm-publish altera somente status preservando o corpo
    runCli([
      'publish',
      '--slug=yotsuba-vol-1-review',
      '--confirm-publish',
      `--content-dir=${tmpContent}`,
    ]);
    const publishedRaw = readFileSync(reviewPath, 'utf-8');
    expect(publishedRaw).toContain('status: published');
    expect(publishedRaw).toContain('## Análise');
  });
});
