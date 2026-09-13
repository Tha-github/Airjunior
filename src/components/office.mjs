import { site } from '../data/site.mjs';
import { button, icon } from './ui.mjs';

export function office({ standalone = false } = {}) {
  const heading = standalone ? 'h1' : 'h2';
  const photo = site.officePhoto || site.portrait;
  const visual = photo
    ? `<img src="${photo.src}" alt="${photo.alt}" width="${photo.width}" height="${photo.height}" loading="${standalone ? 'eager' : 'lazy'}" decoding="async">`
    : `<div class="office-photo-placeholder"><div class="office-art" aria-hidden="true"><span>AAFJ</span><span>ADVOCACIA</span></div><p>Fotografia institucional<br>em preparação</p></div>`;

  return `<section class="office-section" id="o-escritorio" aria-labelledby="office-title">
    <div class="container">
      ${standalone ? `<a class="breadcrumb" href="/">Início ${icon('arrow')}</a>` : ''}
      <div class="office-grid office-grid--institution">
        <header class="office-heading">
          <p class="eyebrow"><span></span>O ESCRITÓRIO</p>
          <${heading} id="office-title">AAFJ Advocacia.<br>Seriedade e proximidade.</${heading}>
        </header>
        <div class="office-copy">
          <div class="office-description">
            <p>Sediada em Porto Alegre/RS, a AAFJ Advocacia atende pessoas físicas e jurídicas com serviços jurídicos pautados pela ética, responsabilidade, transparência, excelência técnica e atendimento personalizado.</p>
            <p>Cada situação é compreendida individualmente, com atenção às necessidades de quem procura o escritório. O diálogo próximo e a orientação clara fazem parte da construção de uma estratégia adequada a cada caso.</p>
            <p>O acompanhamento abrange desde a orientação preventiva e extrajudicial até a defesa dos interesses perante o Poder Judiciário.</p>
          </div>
          <ul class="office-values" aria-label="Compromissos no atendimento">
            ${['Atendimento próximo', 'Orientação clara', 'Estratégia personalizada', 'Acompanhamento individualizado', 'Seriedade e responsabilidade'].map(value => `<li><span aria-hidden="true"></span>${value}</li>`).join('')}
          </ul>
          ${button('Converse com nossa equipe', site.whatsapp)}
        </div>
        <figure class="office-building">
          <img src="/images/escritorio.jpg" alt="Identificação do escritório AAFJ Advocacia" width="960" height="1280" loading="${standalone ? 'eager' : 'lazy'}" decoding="async">
        </figure>
      </div>
    </div>
  </section>
  <section class="office-section lawyer-section" id="air-alves-freitas-junior" aria-labelledby="lawyer-title">
    <div class="container office-grid">
      <header class="office-heading">
        <p class="eyebrow"><span></span>O ADVOGADO</p>
        <h2 id="lawyer-title">${site.lawyer}</h2>
        <p class="lawyer-registration-mobile">${site.registration}</p>
      </header>
        <figure class="office-figure">
          <div class="office-photo">${visual}</div>
          <figcaption class="office-lawyer"><span>${site.lawyer}</span><span>${site.registration}</span></figcaption>
          <p class="office-location">${icon('pin')}Porto Alegre · Rio Grande do Sul</p>
        </figure>
      <div class="office-copy">
          <div class="office-profile">
            <p class="office-profile-role">Advogado, fundador e CEO da AAFJ Advocacia</p>
            <p class="office-description">Atua na advocacia há mais de uma década, com experiência, estratégia e compromisso na defesa dos interesses de seus clientes.</p>
            <dl class="office-credentials">
              <div>
                <dt>Formação acadêmica</dt>
                <dd>Graduado em Direito pela FADERGS (2013).</dd>
                <dd>Pós-graduado em Direito e Processo do Trabalho, Direito Público e Direito Civil e Processo Civil.</dd>
              </div>
              <div>
                <dt>Participação institucional</dt>
                <dd>Membro da AGETRA – Associação Gaúcha dos Advogados Trabalhistas.</dd>
                <dd>Também integrou a Comissão Especial da Advocacia Trabalhista da OAB/RS.</dd>
              </div>
            </dl>
          </div>
          ${button('Converse com nossa equipe', site.whatsapp)}
      </div>
    </div>
  </section>`;
}
