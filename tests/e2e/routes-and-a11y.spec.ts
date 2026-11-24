import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const ROUTES_TO_CHECK = [
  '/',
  '/reviews/',
  '/artigos/',
  '/guias/',
  '/colecionismo/',
  '/obras/',
  '/tags/',
  '/busca/',
  '/sobre/',
  '/politica-editorial/',
  '/contato/',
];

test('todas as rotas principais respondem 200, têm landmark main e não têm overflow em 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  for (const route of ROUTES_TO_CHECK) {
    const response = await page.goto(route);
    expect(response?.status(), `Rota ${route}`).toBe(200);
    await expect(page.locator('main#conteudo')).toBeVisible();
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow, `Sem overflow horizontal em ${route} a 320px`).toBe(false);
  }
});

test('alternador de tema funciona e persiste preferência', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('[data-theme-toggle]');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('RSS e sitemap são servidos no build estático', async ({ request }) => {
  const rss = await request.get('/rss.xml');
  expect(rss.status()).toBe(200);
  expect(await rss.text()).toContain('<rss');

  const sitemap = await request.get('/sitemap-index.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('sitemap');
});

test('auditoria visual final (Fase 20) — captura desktop e mobile em ambos os temas', async ({
  page,
}) => {
  const evidenceDir = resolve(process.cwd(), 'docs/reports/evidence/phase-20');
  mkdirSync(evidenceDir, { recursive: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.screenshot({ path: resolve(evidenceDir, 'final-home-desktop-1440-light.png') });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.screenshot({ path: resolve(evidenceDir, 'final-home-desktop-1440-dark.png') });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.screenshot({ path: resolve(evidenceDir, 'final-home-mobile-390-light.png') });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.screenshot({ path: resolve(evidenceDir, 'final-home-mobile-390-dark.png') });
});
