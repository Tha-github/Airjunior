let goldIconId = 0;
export const icon = (name, className = '') => {
  const paths = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5"/>',
    facebook: '<path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>',
    threads: '<path d="M6 18 18 6M6 6h12v12"/>',
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
    whatsapp: '<path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"/><path transform="translate(1.5 -.5)" d="m8.5 7.5 1.3 2.4-1 1a8.3 8.3 0 0 0 3.3 3.3l1-1 2.4 1.3c0 1.1-.8 2-1.9 2-3.6-.3-6.8-3.5-7.1-7.1 0-1.1.9-1.9 2-1.9Z"/>',
  };
  const gradientId = `gold-icon-${++goldIconId}`;
  return `<svg style="--icon-gold-stroke: url(#${gradientId})" class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><defs><linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="var(--gold)"/><stop offset="38%" stop-color="var(--gold-light)"/><stop offset="65%" stop-color="var(--gold)"/><stop offset="100%" stop-color="var(--gold-shadow)"/></linearGradient></defs>${paths[name] || paths.arrow}</svg>`;
};

export const brand = (footer = false) => `<a class="brand ${footer ? 'brand--footer' : ''}" href="/" aria-label="AAFJ Advocacia — Início"><img class="brand-logo" src="/aafjmarcadagua.png" alt="AAFJ Advocacia" width="724" height="300" decoding="async"></a>`;

export const button = (label, href, secondary = false) => `<a class="button ${secondary ? 'button--secondary' : ''}" href="${href}">${label}${icon('arrow')}</a>`;

export const card = (title, href, number, detail = null) => detail
  ? `<a class="card card--detail" href="${href}" aria-label="Saiba mais sobre ${title}">
      ${icon(detail.iconName, 'card-area-icon')}
      <h3>${title}</h3>
      <p>${detail.description}</p>
      <span class="card-more">Saiba mais ${icon('northeast')}</span>
    </a>`
  : `<a class="card" href="${href}"><span class="card-number">${String(number).padStart(2, '0')}</span><h2>${title}</h2>${icon('northeast')}</a>`;
