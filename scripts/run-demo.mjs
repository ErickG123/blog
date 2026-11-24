import { spawn } from 'node:child_process';

const mode = process.argv[2];
if (!['dev', 'build', 'preview'].includes(mode)) {
  console.error('Uso: node scripts/run-demo.mjs <dev|build|preview>');
  process.exit(1);
}

const env = {
  ...process.env,
  INCLUDE_FIXTURES: 'true',
  ASTRO_OUT_DIR: 'dist-demo',
};

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env,
    });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} falhou com código ${code}`));
    });
  });
}

try {
  if (mode === 'dev') {
    await run('npx', ['astro', 'dev']);
  } else if (mode === 'build') {
    await run('node', ['scripts/validate-content.mjs']);
    await run('npx', ['astro', 'build']);
    await run('npx', ['pagefind', '--site', 'dist-demo']);
  } else if (mode === 'preview') {
    await run('npx', ['astro', 'preview']);
  }
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
