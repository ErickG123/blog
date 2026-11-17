import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    if (pathname !== '/blog' && !pathname.startsWith('/blog/')) {
      response.writeHead(404).end('Not found');
      return;
    }
    const relative = pathname.slice('/blog'.length).replace(/^[/\\]+/, '');
    let target = path.resolve(distRoot, relative);
    if (target !== distRoot && !target.startsWith(`${distRoot}${path.sep}`)) {
      response.writeHead(400).end('Bad request');
      return;
    }
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    } catch {
      if (!path.extname(target)) target = path.join(target, 'index.html');
    }
    let status = 200;
    let contents;
    try {
      contents = await readFile(target);
    } catch {
      status = 404;
      target = path.join(distRoot, '404.html');
      contents = await readFile(target);
    }
    response.writeHead(status, { 'content-type': mimeTypes[path.extname(target)] ?? 'application/octet-stream' });
    response.end(contents);
  } catch {
    response.writeHead(400).end('Bad request');
  }
}).listen(4321, '127.0.0.1');
