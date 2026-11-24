import { expect, test } from '@playwright/test';

test('página inicial mínima responde e identifica o projeto', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  await expect(page).toHaveTitle('Mangá Atlas');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.getByRole('heading', { level: 1, name: 'Mangá Atlas' })).toBeVisible();
});
