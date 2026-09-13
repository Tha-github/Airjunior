import { areas, site } from '../data/site.mjs';
import { card, button } from './ui.mjs';

export function practiceAreas() {
  return `<section class="practice-areas" id="areas-de-atuacao" aria-labelledby="areas-title">
    <div class="container">
      <div class="areas-introduction">
        <div><p class="eyebrow"><span></span>ATUAÇÃO JURÍDICA</p><h2 id="areas-title">Áreas de Atuação</h2></div>
        <p class="areas-description">Atendimento jurídico personalizado para diferentes necessidades. Orientamos pessoas e empresas com atenção às particularidades de cada caso.</p>
      </div>
      <div class="cards-grid areas-grid">
        ${areas.map(area => card(area.name, area.whatsapp, null, area)).join('')}
      </div>
      <aside class="areas-contact" aria-labelledby="areas-contact-title">
        <div><h2 id="areas-contact-title">Precisa de orientação jurídica?</h2><p>Converse com nossa equipe sobre sua situação. Estamos à disposição para ouvir você e orientar os próximos passos.</p></div>
        ${button('Fale com nossa equipe', site.whatsapp)}
      </aside>
    </div>
  </section>`;
}
