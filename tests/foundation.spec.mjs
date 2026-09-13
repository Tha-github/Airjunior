import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pages } from '../src/pages/pages.mjs';
import { areas } from '../src/data/site.mjs';

test('all pages render without horizontal overflow or broken local links', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const entry of pages) {
    const response = await page.goto(entry.path);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
    for (const href of hrefs) {
      const [path, hash] = href.split('#');
      const target = pages.find(entry => entry.path === path);
      expect(target, href).toBeTruthy();
      if (hash) expect(target.content).toContain(`id="${hash}"`);
    }
  }
  expect(errors).toEqual([]);
  expect((await page.goto('/nao-existe/')).status()).toBe(404);
});

test('menu, areas, Escape and keyboard focus work', async ({ page, isMobile }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi', exact: true }).click();
  const menu = page.locator('.menu-toggle');
  if (isMobile) {
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await menu.focus();
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('.navigation > .button')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(menu).toBeFocused();
  }
  const summary = page.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.areas-dropdown')).toHaveAttribute('open', '');
  await expect(page.getByRole('link', { name: 'Direito Criminal', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(summary).toBeFocused();
  await expect(page.locator('.areas-dropdown')).not.toHaveAttribute('open');
  if (isMobile) {
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeFocused();
    await menu.click();
  }
  await summary.click();
  await expect(page.getByRole('link', { name: 'Direito Trabalhista', exact: true })).toHaveAttribute('href', areas[0].whatsapp);
});

test('privacy notice persists and can be reset', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.cookie-notice')).toBeVisible();
  await page.getByRole('button', { name: 'Entendi', exact: true }).click();
  await page.reload();
  await expect(page.locator('.cookie-notice')).toBeHidden();
  await page.goto('/cookies/');
  await page.getByRole('button', { name: 'Exibir aviso novamente' }).click();
  await expect(page.locator('.cookie-notice')).toBeVisible();
  expect(await page.context().cookies()).toEqual([]);
});

test('WCAG automated checks cover homepage, menu and content pages', async ({ page, isMobile }) => {
  for (const url of ['/', '/o-escritorio/', '/contato/', '/cookies/']) {
    await page.goto(url);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  }
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi', exact: true }).click();
  if (isMobile) await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.locator('summary').click();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});

test('responsive widths and screenshots', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi', exact: true }).click();
  for (const width of [320, 375, 390, 640, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `width ${width}`).toBe(true);
  }
  await page.setViewportSize(testInfo.project.use.viewport);
  await page.screenshot({ path: `test-results/${testInfo.project.name}-home.png`, fullPage: true });
});

test('navigation remains usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.getByRole('link', { name: 'Contato', exact: true })).toBeVisible();
  await page.locator('summary').click();
  await expect(page.getByRole('link', { name: 'Direito Criminal', exact: true })).toHaveAttribute('href', areas.find(area => area.slug === 'direito-criminal').whatsapp);
  await context.close();
});
