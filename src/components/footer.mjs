import { site } from '../data/site.mjs';
import { brand, icon } from './ui.mjs';

export function footer() {
  return `<footer class="site-footer">
    <div class="container footer-main">
      <div class="footer-identity">${brand(true)}<p class="footer-tagline">Proximidade no atendimento.<br>Seriedade em cada detalhe.</p><p>${site.lawyer}<br>${site.registration}</p></div>
      <div><h2>Onde estamos</h2><address>${site.address.map(line => `<span>${line}</span>`).join('')}</address><a class="text-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.join(', '))}" target="_blank" rel="noopener noreferrer">Ver localização ${icon('northeast')}</a></div>
      <div><h2>Fale conosco</h2><a class="footer-contact" href="${site.phoneUrl}">${site.phone}</a><a class="footer-email" href="mailto:${site.email}">${site.email}</a><div class="social-links" aria-label="Redes sociais">${site.socials.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}${icon('northeast')}</a>`).join('')}</div></div>
    </div>
    <div class="container footer-company"><p>${site.company}<br>${site.companyRegistration}</p><span>Porto Alegre · Rio Grande do Sul</span></div>
    <div class="container footer-bottom"><small>© ${new Date().getFullYear()} AAFJ Advocacia. Todos os direitos reservados.</small><nav aria-label="Informações de privacidade"><a href="/politica-de-privacidade/">Política de Privacidade</a><a href="/cookies/">Cookies</a></nav></div>
  </footer>
  <a class="whatsapp-float" href="${site.whatsapp}" aria-label="Fale pelo WhatsApp">${icon('whatsapp')}<span>Fale pelo WhatsApp</span></a>
  <aside class="cookie-notice" aria-label="Aviso de cookies" hidden><div><strong>Sua privacidade importa.</strong><p>Esta versão não utiliza cookies de análise ou publicidade. Guardamos apenas a confirmação deste aviso no seu navegador. <a href="/cookies/">Saiba mais</a></p></div><button class="button button--small" data-dismiss-cookies>Entendi</button></aside>`;
}
