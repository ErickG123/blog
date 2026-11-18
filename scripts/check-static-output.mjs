import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const base = '/blog';
const origin = 'https://erickg123.github.io';
const required = ['index.html', '404.html', 'rss.xml', 'robots.txt', 'sitemap-index.xml', 'posts/ola-mundo/index.html', 'tags/astro/index.html'];
const issues = [];

function tagWithAttribute(html, tagName, attributeName, attributeValue) {
  const escaped = attributeValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return html.match(new RegExp(`<${tagName}\\b(?=[^>]*\\b${attributeName}="${escaped}")[^>]*>`, 'i'))?.[0] ?? '';
}

function attribute(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return tag.match(new RegExp(`\\b${escaped}="([^"]*)"`, 'i'))?.[1]?.replaceAll('&amp;', '&') ?? '';
}

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
  const relativeFile = path.relative(root, file);
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = attribute(tagWithAttribute(html, 'meta', 'name', 'description'), 'content');
  const ogUrl = attribute(tagWithAttribute(html, 'meta', 'property', 'og:url'), 'content');
  const canonical = attribute(tagWithAttribute(html, 'link', 'rel', 'canonical'), 'href');
  const isNotFound = relativeFile.toLowerCase() === '404.html';
  if (!title) issues.push(`título ausente: ${relativeFile}`);
  if (!description) issues.push(`description ausente: ${relativeFile}`);
  if (!ogUrl) issues.push(`og:url ausente: ${relativeFile}`);
  if (!attribute(tagWithAttribute(html, 'meta', 'property', 'og:title'), 'content')) issues.push(`og:title ausente: ${relativeFile}`);
  if (!attribute(tagWithAttribute(html, 'meta', 'property', 'og:description'), 'content')) issues.push(`og:description ausente: ${relativeFile}`);
  if (!attribute(tagWithAttribute(html, 'meta', 'name', 'twitter:card'), 'content')) issues.push(`twitter:card ausente: ${relativeFile}`);
  if (isNotFound && attribute(tagWithAttribute(html, 'meta', 'name', 'robots'), 'content') !== 'noindex, nofollow') issues.push('404 precisa de noindex, nofollow');
  if (!isNotFound && !canonical) issues.push(`canonical ausente: ${relativeFile}`);
  for (const [kind, rawUrl] of [['canonical', canonical], ['og:url', ogUrl]]) {
    if (!rawUrl) continue;
    try {
      const url = new URL(rawUrl);
      if (url.hostname !== 'erickg123.github.io' || (url.pathname !== base && !url.pathname.startsWith(`${base}/`))) {
        issues.push(`${kind} fora do site/base ${base}: ${rawUrl} (${relativeFile})`);
      }
    } catch {
      issues.push(`${kind} inválida: ${rawUrl} (${relativeFile})`);
    }
  }
  for (const [, rawHref] of html.matchAll(/\bhref="([^"]+)"/g)) {
    if (rawHref.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(rawHref)) continue;
    const url = new URL(rawHref, origin);
    if (url.origin !== origin) continue;
    if (url.pathname !== base && !url.pathname.startsWith(`${base}/`)) {
      issues.push(`link interno sem base ${base}: ${rawHref} (${relativeFile})`);
      continue;
    }
    let relative = decodeURIComponent(url.pathname.slice(base.length)).replace(/^[/\\]+/, '');
    if (!relative || url.pathname.endsWith('/')) relative = path.join(relative, 'index.html');
    const target = path.resolve(root, relative);
    if (target !== root && !target.startsWith(`${root}${path.sep}`)) continue;
    try { await stat(target); } catch { issues.push(`link interno sem destino: ${rawHref} (${relativeFile})`); }
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Static output smoke check passed: required routes, base-path links, and local targets are present.');
}
