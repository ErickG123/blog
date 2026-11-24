import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const EVIDENCE_DIR = resolve(process.cwd(), 'docs/reports/evidence/phase-39');
mkdirSync(EVIDENCE_DIR, { recursive: true });

const server = spawn('npx', ['astro', 'preview', '--host', '127.0.0.1', '--port', '4323'], {
  shell: process.platform === 'win32',
  env: { ...process.env, INCLUDE_FIXTURES: 'true', ASTRO_OUT_DIR: 'dist-demo' },
  stdio: 'ignore',
});

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('Servidor preview:demo não iniciou a tempo.');
}

try {
  await waitForServer('http://127.0.0.1:4323/');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const desktopShots = [
    ['01-home-desktop.png', '/'],
    ['02-reviews-list-desktop.png', '/reviews/'],
    ['03-review-detail-desktop.png', '/reviews/yotsuba-vol-1-beleza-pequenas-coisas/'],
    ['04-artigos-list-desktop.png', '/artigos/'],
    ['05-artigo-detail-desktop.png', '/artigos/por-que-slice-of-life-funciona-no-cotidiano/'],
    ['06-guias-list-desktop.png', '/guias/'],
    ['07-guia-detail-desktop.png', '/guias/tres-obras-para-comecar-slice-of-life/'],
    ['08-colecionismo-list-desktop.png', '/colecionismo/'],
    ['09-colecionismo-detail-desktop.png', '/colecionismo/o-que-observar-qualidade-fisica-manga/'],
    ['10-biblioteca-desktop.png', '/obras/'],
    ['11-obra-detail-desktop.png', '/obras/yotsuba-demo/'],
    ['12-tags-list-desktop.png', '/tags/'],
    ['13-tag-detail-desktop.png', '/tags/cotidiano/'],
  ];

  for (const [filename, route] of desktopShots) {
    const res = await page.goto(`http://127.0.0.1:4323${route}`, { waitUntil: 'networkidle' });
    if (!res || res.status() !== 200) {
      throw new Error(`Rota ${route} retornou status ${res?.status()}`);
    }
    await page.screenshot({ path: resolve(EVIDENCE_DIR, filename), fullPage: false });
  }

  // Verificar rotas de criador, editora e estúdio
  for (const entityRoute of [
    '/criadores/kiyohiko-azuma-demo/',
    '/editoras/editora-horizonte-demo/',
    '/estudios/estudio-c-station-demo/',
  ]) {
    const res = await page.goto(`http://127.0.0.1:4323${entityRoute}`);
    if (!res || res.status() !== 200) {
      throw new Error(`Rota ${entityRoute} retornou status ${res?.status()}`);
    }
  }

  // Busca com resultado real via Pagefind
  await page.goto('http://127.0.0.1:4323/busca/', { waitUntil: 'networkidle' });
  await page.fill('#ma-search-input', 'Yotsuba');
  await page.click('button[type="submit"]');
  await page.waitForSelector('[data-search-results] li', { timeout: 8000 });
  await page.screenshot({ path: resolve(EVIDENCE_DIR, '14-busca-resultado-desktop.png') });

  // Mobile 390x844
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileShots = [
    ['15-home-mobile.png', '/'],
    ['16-review-detail-mobile.png', '/reviews/yotsuba-vol-1-beleza-pequenas-coisas/'],
    ['17-biblioteca-mobile.png', '/obras/'],
  ];
  for (const [filename, route] of mobileShots) {
    await page.goto(`http://127.0.0.1:4323${route}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: resolve(EVIDENCE_DIR, filename), fullPage: false });
  }

  await browser.close();
  console.log('17 screenshots de evidência da Fase 39 geradas em docs/reports/evidence/phase-39/.');
} finally {
  server.kill('SIGTERM');
}
