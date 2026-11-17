import { expect, test } from '@playwright/test';

test('legacy article and tags remain reachable under GitHub Pages base path', async ({ page }) => {
  await page.goto('posts/ola-mundo/');
  await expect(page.getByRole('heading', { name: 'Meu Primeiro Artigo' })).toBeVisible();
  await expect(page.locator('#progress-bar')).toBeAttached();
  await expect(page.locator('#giscus-container')).toBeAttached();
  await page.getByRole('link', { name: '#astro' }).first().click();
  await expect(page).toHaveURL(/\/blog\/tags\/astro\/$/);
});

test('home exposes categories, search and empty editorial states', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Histórias que continuam depois dos créditos.' })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Buscar artigos' }).fill('termo-sem-resultado');
  await expect(page.locator('.post-card:visible')).toHaveCount(0);
  await page.getByRole('link', { name: 'Notícias' }).first().click();
  await expect(page.getByRole('heading', { name: 'Ainda sem publicações' })).toBeVisible();
});

test('catalog, seasons, RSS, theme and 404 are available', async ({ page }) => {
  await page.goto('obras/');
  await expect(page.getByRole('heading', { name: 'Catálogo em construção' })).toBeVisible();
  await page.goto('temporadas/');
  await expect(page.getByRole('heading', { name: 'Sem temporadas cadastradas' })).toBeVisible();
  await page.goto('rss.xml');
  await expect(page.locator('body')).toContainText('artigos');
  await page.goto('./');
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.goto('rota-inexistente/');
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

test('home fits a mobile viewport and remains keyboard navigable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('./');
  const widths = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus-visible')).toHaveCount(1);
});
