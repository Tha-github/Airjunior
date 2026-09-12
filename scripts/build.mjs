import { mkdir, writeFile, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pages } from '../src/pages/pages.mjs';
import { layout } from '../src/layouts/base.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function build() {
  const dist = path.join(root, 'dist');
  await mkdir(dist, { recursive: true });
  for (const page of pages) {
    const directory = path.join(dist, page.path);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), layout(page), 'utf8');
  }
  await cp(path.join(root, 'src/styles'), path.join(dist, 'styles'), { recursive: true });
  await cp(path.join(root, 'src/scripts'), path.join(dist, 'scripts'), { recursive: true });
  await cp(path.join(root, 'public'), dist, { recursive: true });
  await writeFile(path.join(dist, '404.html'), layout(pages.find(page => page.path === '/404/')), 'utf8');
  console.log(`Build concluído: ${pages.length} páginas em dist/.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
