import { test, expect } from '@playwright/test';
import { areas } from '../src/data/site.mjs';

test('all area cards and menu links share area-specific WhatsApp messages', async ({ page, isMobile }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi', exact: true }).click();
  await expect(page.locator('.card--detail')).toHaveCount(6);
  await expect(page.getByText('Todas as áreas', { exact: true })).toHaveCount(0);
  if (isMobile) await page.locator('.menu-toggle').click();
  await page.locator('summary').click();
  for (const area of areas) {
    const card = page.locator('.card--detail').filter({ has: page.getByRole('heading', { name: area.name, exact: true }) });
    await expect(card).toHaveAttribute('href', area.whatsapp);
    await expect(page.locator('.dropdown-panel').getByRole('link', { name: area.name, exact: true })).toHaveAttribute('href', area.whatsapp);
    expect(new URL(area.whatsapp).searchParams.get('text')).toContain(area.name);
    await expect(card).toContainText(area.description);
  }
  if (isMobile) await page.locator('.menu-toggle').click();
  if (isMobile) await page.locator('.menu-toggle').click();
  await page.locator('.navigation').getByRole('link', { name: 'O Escritório', exact: true }).click();
  await expect(page).toHaveURL(/\/#o-escritorio$/);
  if (isMobile) await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
});

test('removed area pages return 404 and sitemap contains only the landing page', async ({ request }) => {
  const routes = ['direito-trabalhista', 'direito-civel-consumidor', 'direito-bancario', 'direito-familia-sucessoes', 'direito-previdenciario', 'direito-criminal'];
  for (const route of [...routes.map(route => `/${route}/`), ...areas.map(area => `/areas-de-atuacao/${area.slug}/`), '/areas-de-atuacao/']) {
    expect((await request.get(route)).status()).toBe(404);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(1);
  expect(sitemap).not.toContain('direito-');
});
