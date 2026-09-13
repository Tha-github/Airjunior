import { site, areas } from '../data/site.mjs';
import { brand, button, icon } from './ui.mjs';

export function header(path) {
  const navLink = (name, href) => `<a href="${href}"${path === href ? ' aria-current="page"' : ''}>${name}</a>`;
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header">
    <div class="container header-inner">
      ${brand()}
      <button class="menu-toggle" aria-expanded="false" aria-controls="main-navigation" aria-label="Abrir menu"><span></span><span></span></button>
      <nav id="main-navigation" class="navigation" aria-label="Navegação principal">
        ${navLink('Início', '/')}
        ${navLink('O Escritório', '/#o-escritorio')}
        <details class="areas-dropdown">
          <summary>Áreas de Atuação ${icon('chevron')}</summary>
          <div class="dropdown-panel">
            <span class="dropdown-label">COMO PODEMOS ORIENTAR</span>
            ${areas.map(area => navLink(area.name, area.whatsapp)).join('')}
          </div>
        </details>
        ${navLink('Contato', '/#contato')}
        ${button('Fale com nossa equipe', site.whatsapp)}
      </nav>
    </div>
  </header>`;
}
