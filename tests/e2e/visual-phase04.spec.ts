import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const EVIDENCE_DIR = resolve(process.cwd(), 'docs/reports/evidence/phase-04');

test('captura evidências visuais (desktop 1440x900, mobile 390x844, temas claro/escuro e checagem 320px)', async ({
  page,
}) => {
  mkdirSync(EVIDENCE_DIR, { recursive: true });

  // Desktop 1440x900 — Claro
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.screenshot({ path: resolve(EVIDENCE_DIR, 'home-desktop-1440-light.png') });

  // Desktop 1440x900 — Escuro
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.screenshot({ path: resolve(EVIDENCE_DIR, 'home-desktop-1440-dark.png') });

  // Mobile 390x844 — Claro e Escuro
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.screenshot({ path: resolve(EVIDENCE_DIR, 'home-mobile-390-light.png') });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.screenshot({ path: resolve(EVIDENCE_DIR, 'home-mobile-390-dark.png') });

  // Checagem de largura mínima 320px sem overflow horizontal
  await page.setViewportSize({ width: 320, height: 568 });
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});
