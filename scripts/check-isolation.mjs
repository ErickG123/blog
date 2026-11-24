import { readdir, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const DIST_DIR = resolve(process.cwd(), 'dist');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

// Garante que ativos exclusivos de demo não permaneçam no build real dist/
await rm(join(DIST_DIR, 'demo-assets'), { recursive: true, force: true });

const files = await walk(DIST_DIR);
const leaks = [];
const forbiddenMarkers = [
  'fixture-work-',
  'cronicas-do-atlas-fixture',
  'Fixture Sintética',
  'yotsuba-demo',
  'yuru-camp-demo',
  'navillera-demo',
  'Prévia local de rascunhos',
  '[PENDENTE]',
];

for (const file of files) {
  if (!/\.(html|xml|txt|json)$/i.test(file)) continue;
  const content = await readFile(file, 'utf-8');
  for (const marker of forbiddenMarkers) {
    if (content.includes(marker)) {
      leaks.push(`${file} contém marcador de fixture "${marker}"`);
    }
  }
}

if (leaks.length > 0) {
  console.error('ERRO DE ISOLAMENTO: vazamento de fixture detectado em dist/:');
  for (const leak of leaks) console.error(` - ${leak}`);
  process.exit(1);
}

console.log(`Isolamento verificado com sucesso em ${files.length} arquivo(s) de dist/.`);
