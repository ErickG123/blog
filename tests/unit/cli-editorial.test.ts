import { describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const SCRIPT = resolve(process.cwd(), 'scripts/new-content.mjs');

describe('CLI editorial scripts/new-content.mjs (Fase 35)', () => {
  it('suporta --dry-run sem gravar arquivos e bloqueia path traversal', () => {
    const out = execFileSync(
      process.execPath,
      [SCRIPT, 'article', 'ensaio-teste', 'Ensaio Teste', '--dry-run'],
      { encoding: 'utf-8' },
    );
    expect(out).toContain('[dry-run]');
    expect(out).toContain('status: draft');

    expect(() =>
      execFileSync(process.execPath, [SCRIPT, 'article', '../escape', 'Hack', '--dry-run'], {
        stdio: 'pipe',
      }),
    ).toThrow();
  });

  it('cria rascunho válido em diretório temporário e recusa sobrescrita', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ma-cli-'));
    try {
      execFileSync(
        process.execPath,
        [SCRIPT, 'review', 'obra-nova', 'Review Nova', `--out-dir=${dir}`],
        { encoding: 'utf-8' },
      );
      const created = readFileSync(join(dir, 'reviews', 'obra-nova.mdx'), 'utf-8');
      expect(created).toContain('slug: obra-nova');
      expect(created).toContain('status: draft');

      // Segunda execução no mesmo slug deve falhar (flag wx)
      expect(() =>
        execFileSync(
          process.execPath,
          [SCRIPT, 'review', 'obra-nova', 'Review Duplicada', `--out-dir=${dir}`],
          { stdio: 'pipe' },
        ),
      ).toThrow();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
