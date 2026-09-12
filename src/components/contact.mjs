import { site, areas } from '../data/site.mjs';
import { button, icon } from './ui.mjs';

export function contact({ standalone = false } = {}) {
  const heading = standalone ? 'h1' : 'h2';
  const mapQuery = encodeURIComponent(site.address.join(', '));
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  return `<section class="contact-section" id="contato" aria-labelledby="contact-title">
    <div class="container">
      ${standalone ? `<a class="breadcrumb" href="/">Início ${icon('arrow')}</a>` : ''}
      <div class="contact-heading"><p class="eyebrow"><span></span>VAMOS CONVERSAR</p><${heading} id="contact-title">Fale com a AAFJ Advocacia</${heading}><p>Conte-nos brevemente sua situação. Nossa equipe está à disposição para ouvir você e oferecer orientação jurídica.</p></div>
      <div class="contact-layout">
        <aside class="contact-channels" aria-label="Canais de atendimento">
          <div class="contact-whatsapp"><span class="contact-channel-label">${icon('whatsapp')} ATENDIMENTO PELO WHATSAPP</span><a class="contact-phone" href="${site.phoneUrl}" aria-label="Ligar para ${site.phone}">${site.phone}</a><p>Prefere conversar diretamente?<br>Entre em contato com nossa equipe.</p>${button('Fale pelo WhatsApp', site.whatsapp)}</div>
          <div class="contact-channel"><h3>E-mail</h3><a class="contact-email" href="mailto:${site.email}">${site.email}</a></div>
          <div class="contact-channel"><h3>Nosso endereço</h3><address>${site.address.map(line => `<span>${line}</span>`).join('')}</address><a class="text-link" href="${mapUrl}" target="_blank" rel="noopener noreferrer">Ver localização ${icon('northeast')}</a></div>
          <div class="contact-channel"><h3>Acompanhe o escritório</h3><div class="social-links">${site.socials.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}${icon('northeast')}</a>`).join('')}</div></div>
        </aside>
        <div class="contact-form-panel">
          <h3>Como podemos ajudar?</h3><p class="form-introduction" id="form-instructions">Preencha os campos abaixo para preparar sua mensagem. Você poderá revisá-la e confirmar o envio no WhatsApp.</p>
          <form class="contact-form" method="post" action="/contato/" data-whatsapp="${site.whatsapp}" aria-describedby="form-instructions">
            <fieldset disabled><legend class="visually-hidden">Dados para o primeiro contato</legend><p class="form-required">Campos com * são obrigatórios.</p>
              <div class="form-fields">
                <div class="form-field"><label for="contact-name">Nome *</label><input id="contact-name" name="name" autocomplete="name" required maxlength="100" aria-describedby="contact-name-error"><span class="field-error" id="contact-name-error"></span></div>
                <div class="form-field"><label for="contact-phone">Telefone *</label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="25" placeholder="(51) 99999-9999" aria-describedby="contact-phone-error"><span class="field-error" id="contact-phone-error"></span></div>
                <div class="form-field"><label for="contact-email">E-mail <span>(opcional)</span></label><input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" aria-describedby="contact-email-error"><span class="field-error" id="contact-email-error"></span></div>
                <div class="form-field"><label for="contact-area">Área jurídica *</label><select id="contact-area" name="area" required aria-describedby="contact-area-error"><option value="">Selecione uma área</option>${areas.map(area => `<option value="${area.name}">${area.name}</option>`).join('')}<option value="Outro">Outro</option></select><span class="field-error" id="contact-area-error"></span></div>
                <div class="form-field form-field--wide"><label for="contact-message">Mensagem *</label><textarea id="contact-message" name="message" rows="5" required maxlength="1000" aria-describedby="message-guidance contact-message-error"></textarea><small id="message-guidance">Descreva sua dúvida de forma breve (até 1.000 caracteres). Não inclua documentos, senhas, dados bancários ou informações sensíveis.</small><span class="field-error" id="contact-message-error"></span></div>
              </div>
              <div class="form-consent"><div><input id="contact-privacy" name="privacy" type="checkbox" required aria-describedby="contact-privacy-error"><label for="contact-privacy">Li a <a href="/politica-de-privacidade/" target="_blank" rel="noopener noreferrer">Política de Privacidade</a> e concordo com o uso dos dados informados para o atendimento desta solicitação.</label></div><span class="field-error" id="contact-privacy-error"></span></div>
              <p class="form-status" role="status" aria-live="polite" tabindex="-1" data-form-status></p>
              <button class="button" type="submit">Enviar mensagem ${icon('arrow')}</button>
              <div class="form-handoff" hidden><p>Mensagem preparada. Ela ainda não foi enviada. Continue no WhatsApp para revisar e enviar à equipe.</p><a class="button" data-whatsapp-handoff target="_blank" rel="noopener noreferrer">Continuar no WhatsApp ${icon('northeast')}</a></div>
            </fieldset>
          </form>
          <noscript><p>Para preparar a mensagem pelo formulário, ative o JavaScript. Você também pode <a href="${site.whatsapp}">falar diretamente pelo WhatsApp</a> ou <a href="mailto:${site.email}">enviar um e-mail</a>.</p></noscript>
        </div>
      </div>
      <div class="contact-map" aria-labelledby="map-title"><div class="map-copy"><p class="eyebrow">PORTO ALEGRE · RS</p><h3 id="map-title">Encontre o escritório</h3><p>Av. Baltazar de Oliveira Garcia, nº 950, sala 301<br>Bairro Sarandi · CEP 91.130-000</p><a class="text-link" href="${mapUrl}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${icon('northeast')}</a></div><div class="map-frame"><div class="map-placeholder">${icon('pin')}<p>Veja nossa localização no mapa.</p><small>Ao carregar, você acessa um serviço externo do Google, sujeito às suas práticas de privacidade e cookies.</small><button class="button button--secondary" type="button" data-load-map data-map-src="https://www.google.com/maps?q=${mapQuery}&output=embed" hidden>Carregar mapa ${icon('arrow')}</button><noscript><p>Utilize o link “Abrir no Google Maps” para ver a localização.</p></noscript></div><p class="map-status" role="status" hidden></p></div></div>
    </div>
  </section>`;
}
