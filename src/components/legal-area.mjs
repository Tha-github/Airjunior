import { site, areas } from '../data/site.mjs';
import { button, icon } from './ui.mjs';

export function legalArea(area) {
  return `<section class="legal-hero"><div class="container">
    <nav class="legal-breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Início</a></li><li><a href="/areas-de-atuacao/">Áreas de Atuação</a></li><li aria-current="page">${area.name}</li></ol></nav>
    <div class="legal-hero-grid"><div><p class="eyebrow"><span></span>ADVOCACIA EM PORTO ALEGRE</p><h1>${area.name}</h1><p class="legal-intro">${area.intro}</p></div><div class="legal-symbol" aria-hidden="true">${icon(area.iconName)}</div></div>
    <p class="legal-signature">${site.lawyer} <span>${site.registration}</span></p>
  </div></section>
  <div class="container legal-layout"><article class="legal-content">
    <section aria-labelledby="area-explanation"><h2 id="area-explanation">${area.heading}</h2><p>${area.explanation}</p><p>${area.approach}</p></section>
    <section aria-labelledby="area-topics"><p class="eyebrow">QUESTÕES QUE MERECEM ATENÇÃO</p><h2 id="area-topics">Principais assuntos relacionados</h2><dl class="legal-topics">${area.topics.map(([title, body]) => `<div><dt>${title}</dt><dd>${body}</dd></div>`).join('')}</dl></section>
    <section aria-labelledby="area-guidance"><h2 id="area-guidance">Quando procurar orientação jurídica</h2><p>${area.when}</p><p>${area.preparation}</p></section>
    <p class="legal-note">Este conteúdo é informativo. A orientação adequada depende da análise individual dos fatos e dos documentos.</p>
    <p class="legal-source">Referência para consulta: <a href="${area.source[1]}" target="_blank" rel="noopener noreferrer">${area.source[0]}</a>.</p>
  </article><aside class="legal-sidebar" aria-label="Atendimento e outras áreas">
    <div class="legal-contact"><p class="eyebrow">ATENDIMENTO INDIVIDUALIZADO</p><h2>Vamos compreender sua situação.</h2><p>Converse com nossa equipe para receber orientação sobre os próximos passos.</p>${button('Fale com nossa equipe', site.whatsapp)}<a class="text-link" href="/contato/">Outras formas de contato ${icon('northeast')}</a></div>
    <nav class="legal-other-areas" aria-label="Outras áreas de atuação"><h2>Outras áreas</h2>${areas.filter(other => other.href !== area.href).map(other => `<a href="${other.href}">${other.name}${icon('arrow')}</a>`).join('')}</nav>
  </aside></div>`;
}
