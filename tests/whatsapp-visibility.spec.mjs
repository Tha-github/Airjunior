import { test, expect } from '@playwright/test';

test('Home floating WhatsApp follows the real practice section boundary', async ({ page }) => {
  await page.goto('/');
  const floating = page.locator('.whatsapp-float');
  await expect(floating).toBeHidden();
  await expect(page.locator('.hero-actions .button')).toBeVisible();
  await page.getByRole('button', { name: 'Entendi', exact: true }).click();

  const reachSection = () => page.evaluate(() => {
    const section = document.querySelector('#areas-de-atuacao');
    const header = document.querySelector('.site-header');
    window.scrollTo({ top: scrollY + section.getBoundingClientRect().top - header.getBoundingClientRect().bottom + 1, behavior: 'instant' });
  });
  await reachSection();
  await expect(floating).toBeVisible();
  await expect(floating).toHaveAttribute('href', 'https://wa.me/5551993869229');
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await expect(floating).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(floating).toBeHidden();

  // A taller Hero must move the activation point without changing the script.
  await page.locator('.hero').evaluate(e => e.style.paddingBottom = '30vh');
  await expect(floating).toBeHidden();
  await reachSection();
  await expect(floating).toBeVisible();
  await page.goto('/contato/');
  await expect(floating).toBeVisible();
});

test('Home HTML hides the floating button before scripts run', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.locator('.whatsapp-float')).toBeHidden();
  await expect(page.locator('.hero-actions .button')).toBeVisible();
  await context.close();
});
