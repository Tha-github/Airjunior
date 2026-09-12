import { site } from '../data/site.mjs';
import { button, icon } from './ui.mjs';

export function hero() {
  const portrait = site.portrait;
  const visual = portrait
    ? `<img class="hero-portrait" src="${portrait.src}" alt="${portrait.alt}" width="${portrait.width}" height="${portrait.height}" fetchpriority="high" decoding="async">`
    : `<div class="hero-monogram" aria-hidden="true">
        <span class="hero-art-label">AAFJ / ADVOCACIA</span>
        <span class="hero-art-mark">A<span>F</span></span>
        <span class="hero-art-rule"></span>
        <span class="hero-art-location">PORTO ALEGRE · RS</span>
      </div>`;

  return `<section class="hero" aria-labelledby="hero-title">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow"><span></span>ADVOCACIA EM PORTO ALEGRE</p>
        <h1 id="hero-title">Experiência, estratégia e compromisso com a <em>defesa dos seus direitos.</em></h1>
        <p class="hero-description">Atendimento próximo, orientação clara e estratégia personalizada para pessoas físicas e jurídicas em Porto Alegre e região.</p>
        <div class="intro-actions hero-actions">
          ${button('Fale com nossa equipe', site.whatsapp)}
          <a class="text-link" href="/areas-de-atuacao/">Conheça nossas áreas de atuação ${icon('northeast')}</a>
        </div>
      </div>
      <figure class="hero-profile">
        <div class="hero-visual${portrait ? ' hero-visual--portrait' : ''}">${visual}</div>
        <figcaption class="hero-identification"><span>${site.lawyer}</span><span>${site.registration}</span></figcaption>
      </figure>
    </div>
  </section>
  <div class="principles-band">
    <ul class="container principles-list" aria-label="Princípios do escritório">
      ${['Ética', 'Responsabilidade', 'Transparência', 'Atendimento personalizado'].map(value => `<li><span class="principle-mark" aria-hidden="true"></span>${value}</li>`).join('')}
    </ul>
  </div>`;
}
