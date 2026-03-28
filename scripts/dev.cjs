process.env.VITE_CJS_IGNORE_WARNING = '1';

const { spawnSync } = require('child_process');
const path = require('path');

const config = require('../app/config.json');
console.info(config.ascii);

const root = path.join(__dirname, '..');
const result = spawnSync('npx', ['remix', 'vite:dev'], {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
  shell: true,
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}
process.exit(result.status === null ? 1 : result.status);
