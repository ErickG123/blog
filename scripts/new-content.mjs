import { cmdNew } from './content-cli.mjs';

const rawArgs = process.argv.slice(2);
const opts = {};
const positional = [];

for (const arg of rawArgs) {
  if (arg.startsWith('--')) {
    const eq = arg.indexOf('=');
    if (eq !== -1) opts[arg.slice(2, eq)] = arg.slice(eq + 1);
    else opts[arg.slice(2)] = true;
  } else {
    positional.push(arg);
  }
}

try {
  await cmdNew(opts, positional);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
