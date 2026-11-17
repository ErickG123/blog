import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const base = '/blog';
const origin = 'https://erickg123.github.io';
const required = ['index.html', '404.html', 'rss.xml', 'robots.txt', 'sitemap-index.xml', 'posts/ola-mundo/index.html', 'tags/astro/index.html'];
const issues = [];

for (const relative of required) {
  try { await stat(path.join(root, relative)); } catch { issues.push(`artefato ausente: ${relative}`); }
}

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(absolute));
    else if (entry.name.endsWith('.html')) files.push(absolute);
  }
  return files;
}

for (const file of await htmlFiles(root)) {
  const html = await readFile(file, 'utf8');
  for (const [, rawHref] of html.matchAll(/\bhref="([^"]+)"/g)) {
    if (rawHref.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(rawHref)) continue;
    const url = new URL(rawHref, origin);
    if (url.origin !== origin) continue;
    if (url.pathname !== base && !url.pathname.startsWith(`${base}/`)) {
      issues.push(`link interno sem base ${base}: ${rawHref} (${path.relative(root, file)})`);
      continue;
    }
    let relative = decodeURIComponent(url.pathname.slice(base.length)).replace(/^[/\\]+/, '');
    if (!relative || url.pathname.endsWith('/')) relative = path.join(relative, 'index.html');
    const target = path.resolve(root, relative);
    if (target !== root && !target.startsWith(`${root}${path.sep}`)) continue;
    try { await stat(target); } catch { issues.push(`link interno sem destino: ${rawHref} (${path.relative(root, file)})`); }
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Static output smoke check passed: required routes, base-path links, and local targets are present.');
}
