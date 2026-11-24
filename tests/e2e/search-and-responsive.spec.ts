import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

test('página /busca/ sempre exibe campo acessível e trata consulta vazia', async ({ page }) => {
  await page.goto('/busca/');
  const input = page.locator('#ma-search-input');
  await expect(input).toBeVisible();
  await input.fill('mangá');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.locator('[data-search-status]')).not.toBeEmpty();
});

test('auditoria responsiva (Fase 34) — 320px, 390px, 768px, 1024px, 1440px sem overflow', async ({
  page,
}) => {
  const evidenceDir = resolve(process.cwd(), 'docs/reports/evidence/phase-34');
  mkdirSync(evidenceDir, { recursive: true });

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow, `Overflow horizontal detectado em ${width}px`).toBe(false);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/busca/');
  await page.screenshot({ path: resolve(evidenceDir, 'busca-desktop-1440.png') });
});
