document.documentElement.classList.add('js');

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-navigation');
const dropdown = document.querySelector('.areas-dropdown');
const desktop = window.matchMedia('(min-width: 64rem)');

function closeMenu(restoreFocus = false) {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  dropdown.open = false;
  if (restoreFocus) toggle.focus();
}

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  if (!open) return closeMenu(true);
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Fechar menu');
  nav.classList.add('is-open');
  document.body.classList.add('menu-open');
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (dropdown.open) {
      dropdown.open = false;
      dropdown.querySelector('summary').focus();
    } else if (nav.classList.contains('is-open')) closeMenu(true);
  }
  if (event.key === 'Tab' && !desktop.matches && nav.classList.contains('is-open')) {
    const focusable = [toggle, ...nav.querySelectorAll('a, summary')].filter(el => el.getClientRects().length);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

document.addEventListener('click', event => {
  if (!dropdown.contains(event.target)) dropdown.open = false;
  if (!document.querySelector('.site-header').contains(event.target) && nav.classList.contains('is-open')) closeMenu();
});
dropdown.addEventListener('focusout', () => {
  setTimeout(() => { if (!dropdown.contains(document.activeElement)) dropdown.open = false; }, 0);
});
desktop.addEventListener('change', () => {
  const focusWasInNav = nav.contains(document.activeElement);
  const focusWasToggle = document.activeElement === toggle;
  closeMenu();
  if (!desktop.matches && focusWasInNav) toggle.focus();
  if (desktop.matches && focusWasToggle) nav.querySelector('a').focus();
});

const notice = document.querySelector('.cookie-notice');
const storageKey = 'aafj:privacy-notice:v1';
let hasReadNotice = false;
try { hasReadNotice = localStorage.getItem(storageKey) === 'read'; } catch { /* Storage may be unavailable in private contexts. */ }
notice.hidden = hasReadNotice;
document.querySelector('[data-dismiss-cookies]').addEventListener('click', () => {
  try { localStorage.setItem(storageKey, 'read'); } catch { /* Dismiss for the current page even without storage. */ }
  notice.hidden = true;
  document.querySelector('#conteudo').focus({ preventScroll: true });
});
document.querySelector('[data-reset-cookies]')?.addEventListener('click', () => {
  try { localStorage.removeItem(storageKey); } catch { /* The notice can still be reopened. */ }
  notice.hidden = false;
  document.querySelector('[data-cookie-status]').textContent = 'O aviso foi exibido novamente.';
  notice.querySelector('button').focus();
});
