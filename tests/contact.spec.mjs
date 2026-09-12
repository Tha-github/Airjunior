import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/contato/');
  await page.getByRole('button', { name: 'Entendi', exact: true }).click();
});

async function fillForm(page) {
  await page.getByLabel('Nome *', { exact: true }).fill('Pessoa de Teste');
  await page.getByLabel('Telefone *', { exact: true }).fill('(51) 99386-9229');
  await page.getByLabel('Área jurídica *', { exact: true }).selectOption('Direito Cível e do Consumidor');
  await page.getByLabel('Mensagem *', { exact: true }).fill('Dúvida de teste sobre contrato: A & B + C.');
}

test('triage validates fields and privacy with accessible errors', async ({ page }) => {
  await page.getByRole('button', { name: 'Enviar mensagem', exact: true }).click();
  await expect(page.getByLabel('Nome *', { exact: true })).toBeFocused();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(5);
  await fillForm(page);
  await page.getByLabel('Telefone *', { exact: true }).fill('123');
  await page.getByLabel('E-mail (opcional)', { exact: true }).fill('email-invalido');
  await page.getByRole('button', { name: 'Enviar mensagem', exact: true }).click();
  await expect(page.locator('#contact-phone-error')).toContainText('DDD');
  await expect(page.locator('#contact-email-error')).toContainText('e-mail válido');
  await expect(page.locator('#contact-privacy-error')).toContainText('Política de Privacidade');
  await expect(page.locator('.form-handoff')).toBeHidden();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});

test('valid input prepares a review link without sending or storing the message', async ({ page }) => {
  const external = [];
  page.on('request', req => { if (!req.url().startsWith('http://127.0.0.1:4321')) external.push(req.url()); });
  await fillForm(page);
  await page.getByLabel(/Li a Política de Privacidade/).check();
  await page.getByRole('button', { name: 'Enviar mensagem', exact: true }).click();
  const link = page.getByRole('link', { name: 'Continuar no WhatsApp' });
  await expect(link).toBeVisible();
  const url = new URL(await link.getAttribute('href'));
  expect(url.origin + url.pathname).toBe('https://wa.me/5551993869229');
  expect(url.searchParams.get('text')).toContain('Pessoa de Teste');
  expect(url.searchParams.get('text')).toContain('Dúvida de teste sobre contrato: A & B + C.');
  expect(url.searchParams.get('text')).not.toContain('E-mail:');
  await expect(page.locator('.form-handoff')).toContainText('ainda não foi enviada');
  await expect(page.locator('[data-form-status]')).toBeFocused();
  expect(external).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['aafj:privacy-notice:v1']);
  await page.getByLabel('Mensagem *', { exact: true }).fill('Mensagem corrigida.');
  await expect(link).toBeHidden();
  await page.getByRole('button', { name: 'Enviar mensagem', exact: true }).click();
  expect(new URL(await link.getAttribute('href')).searchParams.get('text')).toContain('Mensagem corrigida.');
  await page.getByLabel(/Li a Política de Privacidade/).uncheck();
  await expect(link).toBeHidden();
});

test('map connects only after explicit request and keeps external location link', async ({ page }) => {
  await expect(page.locator('.map-frame iframe')).toHaveCount(0);
  let requests = 0;
  await page.route('https://www.google.com/maps**', route => {
    requests++;
    return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><html lang="pt-BR"><title>Mapa de teste</title><body>Mapa de teste local</body></html>' });
  });
  await page.getByRole('button', { name: 'Carregar mapa' }).click();
  await expect(page.locator('.map-frame iframe')).toBeVisible();
  await expect.poll(() => requests).toBe(1);
  await expect(page.locator('.map-frame iframe')).toHaveAttribute('title', /AAFJ Advocacia/);
  await expect(page.getByRole('link', { name: 'Abrir no Google Maps' })).toBeVisible();
});

test('without JavaScript no form data can be submitted and direct contact remains usable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/contato/');
  await expect(page.getByRole('button', { name: 'Enviar mensagem', exact: true })).toBeDisabled();
  await expect(page.getByRole('link', { name: 'falar diretamente pelo WhatsApp' })).toBeVisible();
  await expect(page.locator('.contact-email')).toHaveAttribute('href', 'mailto:Airjunior_adv@yahoo.com.br');
  await context.close();
});
