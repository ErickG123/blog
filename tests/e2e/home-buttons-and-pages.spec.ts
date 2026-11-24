import { expect, test } from '@playwright/test';

function parseRgb(input: string): [number, number, number] {
  const match = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) throw new Error(`Cor RGB inválida: ${input}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(parseRgb(fg));
  const l2 = relativeLuminance(parseRgb(bg));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

test.describe('Fase 42 — Home editorial, botões, contraste WCAG 2.2 AA e layout', () => {
  test('botões da Home têm contraste WCAG AA >= 4.5:1 e alturas padronizadas nos temas claro e escuro', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    for (const theme of ['dark', 'light'] as const) {
      await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
      // Aguarda transição de cores finalizar
      await page.waitForTimeout(220);

      const primary = page.locator('.ma-home-intro .ma-btn--primary');
      const secondaries = page.locator('.ma-home-intro .ma-btn--secondary');

      await expect(primary).toBeVisible();
      await expect(secondaries).toHaveCount(2);

      const metrics = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.ma-home-intro .ma-btn'));
        return btns.map((el) => {
          const cs = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            text: el.textContent?.trim() ?? '',
            isPrimary: el.classList.contains('ma-btn--primary'),
            color: cs.color,
            bg: cs.backgroundColor,
            height: rect.height,
          };
        });
      });

      const heights = metrics.map((m) => Math.round(m.height));
      for (const m of metrics) {
        expect(m.height, `Altura do botão "${m.text}" (${theme})`).toBeGreaterThanOrEqual(40);
        expect(m.height, `Altura do botão "${m.text}" (${theme})`).toBeLessThanOrEqual(46);
        const ratio = contrastRatio(m.color, m.bg);
        expect(
          ratio,
          `Contraste de "${m.text}" no tema ${theme} (${m.color} sobre ${m.bg})`,
        ).toBeGreaterThanOrEqual(4.5);
      }

      // Todos os botões do grupo têm a mesma altura
      expect(new Set(heights).size, `Alturas uniformes no tema ${theme}`).toBe(1);

      // Botão primário mantém contraste >= 4.5:1 também no estado hover
      await primary.hover();
      await page.waitForTimeout(220);
      const hoverStyle = await primary.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { color: cs.color, bg: cs.backgroundColor };
      });
      expect(
        contrastRatio(hoverStyle.color, hoverStyle.bg),
        `Contraste hover do botão primário (${theme})`,
      ).toBeGreaterThanOrEqual(4.5);

      // Estado focus-visible acessível
      await primary.focus();
      const focusOutline = await primary.evaluate((el) => getComputedStyle(el).outlineStyle);
      expect(focusOutline).not.toBe('none');
    }
  });

  test('ações principais da Home navegam para as rotas corretas e footer fica no final da viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Verifica posicionamento do footer no rodapé da viewport
    const footerBottom = await page.locator('footer.ma-footer').evaluate((el) => {
      return el.getBoundingClientRect().bottom;
    });
    expect(footerBottom).toBeGreaterThanOrEqual(895);

    // Verifica favicon acessível
    const faviconHref = await page.locator('link[rel="icon"]').getAttribute('href');
    expect(faviconHref).toBeTruthy();
    const faviconRes = await page.request.get(faviconHref!);
    expect(faviconRes.status()).toBe(200);

    // Navegação: Sobre o projeto, Política editorial e Pesquisa (dentro da intro da Home)
    const intro = page.locator('.ma-home-intro');
    await intro.getByRole('link', { name: 'Sobre o projeto' }).click();
    await expect(page).toHaveURL(/\/sobre\/$/);

    await page.goto('/');
    await intro.getByRole('link', { name: 'Política editorial' }).click();
    await expect(page).toHaveURL(/\/politica-editorial\/$/);

    await page.goto('/');
    await intro.getByRole('link', { name: 'Pesquisa' }).click();
    await expect(page).toHaveURL(/\/busca\/$/);
  });

  test('Home sem overflow horizontal em todas as larguras (320px a 1920px)', async ({ page }) => {
    for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasOverflow, `Sem overflow horizontal em ${width}px`).toBe(false);
    }
  });
});
