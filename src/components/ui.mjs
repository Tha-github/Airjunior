export const icon = (name, className = '') => {
  const paths = {
    arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    northeast: '<path d="M6 18 18 6M6 6h12v12"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="1"/><path d="M8 7V3h8v4M3 12a24 24 0 0 0 18 0M10 13v3h4v-3"/>',
    document: '<path d="M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h6"/>',
    bank: '<path d="m3 8 9-5 9 5H3Zm2 3v6m5-6v6m4-6v6m5-6v6M3 21h18M4 18h16"/>',
    family: '<circle cx="8" cy="7" r="3"/><path d="M2 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 3a5 5 0 0 1 4 5v3"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5"/>',
    shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-5"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    whatsapp: '<path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.5L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.6Z"/><path d="M8 7.5c-.5 0-1 1-1 1.7 0 2.6 3.2 5.8 5.8 6.3.9.2 2.2-.6 2.5-1.4l-2.4-1.4-.9 1c-1.2-.5-2.7-2-3.2-3.2l.9-.8L8.5 7.5Z"/>',
  };
  return `<svg class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
};

export const brand = (footer = false) => `<a class="brand ${footer ? 'brand--footer' : ''}" href="/" aria-label="AAFJ Advocacia — Início"><span class="brand-mark" aria-hidden="true">A<span>F</span></span><span class="brand-wordmark">AAFJ<span>ADVOCACIA</span></span></a>`;

export const button = (label, href, secondary = false) => `<a class="button ${secondary ? 'button--secondary' : ''}" href="${href}">${label}${icon('arrow')}</a>`;

export const card = (title, href, number, detail = null) => detail
  ? `<a class="card card--detail" href="${href}" aria-label="Saiba mais sobre ${title}">
      ${icon(detail.iconName, 'card-area-icon')}
      <h3>${title}</h3>
      <p>${detail.description}</p>
      <span class="card-more">Saiba mais ${icon('northeast')}</span>
    </a>`
  : `<a class="card" href="${href}"><span class="card-number">${String(number).padStart(2, '0')}</span><h2>${title}</h2>${icon('northeast')}</a>`;
