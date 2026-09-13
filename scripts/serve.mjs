import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from './build.mjs';

const root = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const port = Number(process.env.PORT || 4321);
const types = { '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' };
await build();
http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    let file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) && file !== path.resolve(root)) {
      response.writeHead(403); response.end('Forbidden'); return;
    }
    try { if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html'); } catch { /* Handled below with 404. */ }
    let body;
    let status = 200;
    try { body = await readFile(file); }
    catch { file = path.join(root, '404.html'); body = await readFile(file); status = 404; }
    response.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
    response.end(body);
  } catch {
    response.writeHead(400); response.end('Bad request');
  }
}).listen(port, '127.0.0.1', () => console.log(`AAFJ Advocacia: http://localhost:${port}`));
