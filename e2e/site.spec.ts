import { expect, test } from '@playwright/test';

test('legacy article and tags remain reachable under GitHub Pages base path', async ({ page }) => {
  await page.goto('posts/ola-mundo/');
  await expect(page.getByRole('heading', { name: 'Meu Primeiro Artigo' })).toBeVisible();
  await expect(page.locator('#progress-bar')).toBeAttached();
  await expect(page.locator('#giscus-container')).toBeAttached();
  await page.getByRole('link', { name: '#astro' }).first().click();
  await expect(page).toHaveURL(/\/blog\/tags\/astro\/$/);
});

test('home exposes categories, archive and empty editorial states without redundant search field', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Anime & Mangá' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Arquivo geral' })).toBeVisible();
  await expect(page.locator('.archive-section').getByRole('link', { name: 'Meu Primeiro Artigo' })).toBeVisible();
  await expect(page.locator('#post-results .post-card')).toHaveCount(0);
  await expect(page.locator('#home-search')).toHaveCount(0);
  await page.getByRole('link', { name: 'Notícias' }).first().click();
  await expect(page.getByRole('heading', { name: 'Nenhuma publicação por enquanto' })).toBeVisible();
});

test('unified search dialog opens from any route, manages focus, handles empty results and navigates on Enter', async ({ page }) => {
  await page.goto('noticias/');
  const trigger = page.getByRole('button', { name: 'Abrir busca' });
  const dialog = page.locator('#search-dialog');
  const searchInput = dialog.getByRole('searchbox', { name: 'Buscar no blog' });

  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(searchInput).toBeFocused();

  // Filter with no matches -> empty state
  await searchInput.fill('termo-sem-resultado');
  await expect(dialog.locator('#search-dialog-empty')).toBeVisible();
  await expect(dialog.locator('#search-dialog-status')).toContainText('Nenhum texto corresponde');

  // Close with Escape and verify focus returns to trigger
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  // Reopen, search with accent-insensitive term and press Enter to navigate
  await trigger.click();
  await expect(dialog).toBeVisible();
  await searchInput.fill('introducao');
  await expect(dialog.locator('.search-result-item:visible')).toHaveCount(1);
  await searchInput.press('Enter');
  await expect(page).toHaveURL(/\/blog\/posts\/ola-mundo\/$/);
});

test('unified search dialog closes via explicit close button and supports ?q= URL parameter', async ({ page }) => {
  await page.goto('./?q=minimalista');
  const dialog = page.locator('#search-dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.search-result-item:visible')).toHaveCount(1);
  await dialog.getByRole('button', { name: 'Fechar pesquisa' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('button', { name: 'Abrir busca' })).toBeFocused();
});

test('catalog, seasons, RSS, theme and 404 are available', async ({ page }) => {
  await page.goto('obras/');
  await expect(page.getByRole('heading', { name: 'O catálogo está vazio' })).toBeVisible();
  await page.goto('temporadas/');
  await expect(page.getByRole('heading', { name: 'Nenhuma temporada cadastrada' })).toBeVisible();
  await page.goto('rss.xml');
  await expect(page.locator('body')).toContainText('artigos');
  await page.goto('./');
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.goto('rota-inexistente/');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

test('home fits a mobile viewport and remains keyboard navigable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('./');
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  for (const label of ['Início', 'Notícias', 'Anime', 'Mangá', 'Obras']) await expect(nav.getByRole('link', { name: label })).toBeVisible();
  const activeTab = nav.getByRole('link', { name: 'Início' });
  await expect(activeTab).toHaveAttribute('aria-current', 'page');
  const activeStyles = await activeTab.evaluate((el) => {
    const s = getComputedStyle(el);
    return { boxShadow: s.boxShadow, borderBottomWidth: s.borderBottomWidth };
  });
  expect(activeStyles.boxShadow).toBe('none');
  const moreMenu = nav.locator('.more-nav > summary');
  await expect(moreMenu).toBeVisible();
  await moreMenu.focus();
  await page.keyboard.press('Enter');
  await expect(nav.getByRole('link', { name: 'Reviews' })).toBeVisible();
  const widths = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus-visible')).toHaveCount(1);
});

test('secondary archive page is reachable and lists legacy technical posts', async ({ page }) => {
  await page.goto('arquivo/');
  await expect(page.getByRole('heading', { name: 'Arquivo geral' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Meu Primeiro Artigo' })).toBeVisible();
});
