import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const routes = [
  '/', '/noticias/', '/animes/', '/mangas/', '/reviews/', '/guias/', '/obras/',
  '/temporadas/', '/posts/ola-mundo/', '/tags/astro/', '/rota-inexistente/',
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];
const themes = ['light', 'dark'];
const screenshotRoutes = new Set(['/', '/obras/', '/posts/ola-mundo/', '/rota-inexistente/']);
const output = fileURLToPath(new URL('../test-results/phase11-visual/', import.meta.url));
await mkdir(output, { recursive: true });

let localServer;
const healthUrl = 'http://127.0.0.1:4321/blog/';
try {
  await fetch(healthUrl);
} catch {
  localServer = spawn(process.execPath, ['scripts/serve-static.mjs'], { stdio: 'ignore' });
  process.on('exit', () => localServer?.kill());
  let ready = false;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(healthUrl);
      if (response.ok) { ready = true; break; }
    } catch { /* Wait for the local static server to bind its port. */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!ready) throw new Error('The local static server did not become ready. Run npm run build first.');
}

const browser = await chromium.launch();
const results = [];
for (const viewport of viewports) {
  for (const theme of themes) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    await context.addInitScript((value) => localStorage.setItem('theme', value), theme);
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4321/blog${route}`, { waitUntil: 'domcontentloaded' });
      await page.keyboard.press('Tab');
      const audit = await page.evaluate(() => {
        const css = getComputedStyle(document.documentElement);
        const color = (value) => {
          let parts;
          if (value.startsWith('#')) {
            const hex = value.slice(1);
            parts = hex.length === 3 ? [...hex].map((part) => parseInt(part + part, 16)) : [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
          } else {
            parts = value.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
          }
          return parts.map((part) => part / 255).map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
        };
        const luminance = (value) => { const [r,g,b] = color(value); return 0.2126*r + 0.7152*g + 0.0722*b; };
        const ratio = (a,b) => { const values=[luminance(a),luminance(b)].sort((x,y)=>y-x); return Number(((values[0]+.05)/(values[1]+.05)).toFixed(2)); };
        const main = [...document.querySelectorAll('main')];
        const headings = [...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')].map((heading) => Number(heading.tagName.slice(1)));
        const skippedHeadingLevels = headings.some((level, index) => index > 0 && level > headings[index - 1] + 1);
        const focused = document.activeElement;
        const border = css.getPropertyValue('--border').trim();
        return {
          path: location.pathname,
          viewportWidth: document.documentElement.clientWidth,
          pageWidth: document.documentElement.scrollWidth,
          h1Count: document.querySelectorAll('h1').length,
          mainCount: main.length,
          nestedMain: main.some((node) => node.parentElement?.closest('main')),
          skippedHeadingLevels,
          unnamedLinks: [...document.querySelectorAll('a')].filter((node) => !(node.textContent?.trim() || node.getAttribute('aria-label') || node.querySelector('img[alt]'))).length,
          unnamedLinkMarkup: [...document.querySelectorAll('a')].filter((node) => !(node.textContent?.trim() || node.getAttribute('aria-label') || node.querySelector('img[alt]'))).map((node) => node.outerHTML),
          unnamedButtons: [...document.querySelectorAll('button')].filter((node) => !(node.innerText.trim() || node.getAttribute('aria-label') || node.getAttribute('title'))).length,
          unlabeledFields: [...document.querySelectorAll('input,select,textarea')].filter((node) => !(node.labels?.length || node.getAttribute('aria-label') || node.getAttribute('aria-labelledby'))).length,
          imagesWithoutAlt: [...document.images].filter((node) => !node.hasAttribute('alt')).length,
          focusOutlineWidth: focused ? Number.parseFloat(getComputedStyle(focused).outlineWidth) : 0,
          reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
          contrast: {
            text: ratio(css.getPropertyValue('--text').trim(), css.getPropertyValue('--bg').trim()),
            muted: ratio(css.getPropertyValue('--muted').trim(), css.getPropertyValue('--bg').trim()),
            accent: ratio(css.getPropertyValue('--accent').trim(), css.getPropertyValue('--bg').trim()),
            border: ratio(border, css.getPropertyValue('--bg').trim()),
          },
        };
      });
      const accessibility = await new AxeBuilder({ page })
        .exclude('#giscus-container')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();
      const axeViolations = accessibility.violations.map(({ id, impact, help, nodes }) => ({
        id,
        impact,
        help,
        nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
      }));
      results.push({ viewport: viewport.name, theme, route, axeViolations, ...audit });
      if (screenshotRoutes.has(route)) {
        await page.screenshot({ path: `${output}/${viewport.name}-${theme}-${route === '/' ? 'home' : route.replaceAll('/', '-')}.png`, fullPage: true });
      }
    }
    await context.close();
  }
}
await browser.close();
localServer?.kill();
await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
const failures = results.flatMap((result) => {
  const problems = [];
  if (result.pageWidth > result.viewportWidth) problems.push('horizontal overflow');
  if (result.h1Count !== 1 || result.mainCount !== 1 || result.nestedMain || result.skippedHeadingLevels) problems.push('semantic structure');
  if (result.unnamedLinks || result.unnamedButtons || result.unlabeledFields || result.imagesWithoutAlt) problems.push('accessible name/label/alt');
  if (result.focusOutlineWidth < 2.5 || !result.reducedMotion) problems.push('focus/reduced-motion');
  if (result.contrast.text < 4.5 || result.contrast.muted < 4.5 || result.contrast.accent < 4.5 || result.contrast.border < 3) problems.push('theme-token contrast');
  if (result.axeViolations.length) problems.push(`axe: ${result.axeViolations.map(({ id }) => id).join(', ')}`);
  return problems.map((problem) => `${result.viewport}/${result.theme}${result.route}: ${problem}`);
});
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Visual/accessibility smoke passed for ${results.length} route × viewport × theme combinations. Screenshots saved to ${output}`);
}
