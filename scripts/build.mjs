import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pages } from '../src/pages/pages.mjs';
import { layout } from '../src/layouts/base.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function build({ publishRoot = false, basePath = '/' } = {}) {
  const base = `/${basePath.split('/').filter(Boolean).join('/')}${basePath.split('/').filter(Boolean).length ? '/' : ''}`;
  const render = page => layout(page).replace(/\b(href|src|action)="\/(?!\/)/g, `$1="${base}`);
  const dist = path.join(root, 'dist');
  if (path.resolve(dist) !== path.resolve(root, 'dist') || path.relative(root, dist) !== 'dist') throw new Error('Invalid output directory');
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  for (const page of pages) {
    const directory = path.join(dist, page.path);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), render(page), 'utf8');
  }
  await cp(path.join(root, 'src/styles'), path.join(dist, 'styles'), { recursive: true });
  await cp(path.join(root, 'src/scripts'), path.join(dist, 'scripts'), { recursive: true });
  await cp(path.join(root, 'public'), dist, { recursive: true });
  await writeFile(path.join(dist, '404.html'), render(pages.find(page => page.path === '/404/')), 'utf8');
  await writeFile(path.join(dist, '.nojekyll'), '', 'utf8');
  const siteUrl = process.env.SITE_URL || 'https://tha-github.github.io/Airjunior/';
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${new URL(siteUrl).href.replaceAll('&', '&amp;')}</loc></url></urlset>\n`;
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
  if (publishRoot) await cp(dist, root, { recursive: true });
  console.log(`Build concluído: ${pages.length} páginas em dist/.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const publishRoot = process.argv.includes('--root');
  await build({ publishRoot, basePath: process.env.BASE_PATH || (publishRoot ? '/Airjunior/' : '/') });
}
