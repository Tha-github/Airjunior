const form = document.querySelector('.contact-form');

if (form) {
  const controls = [...form.querySelectorAll('input, select, textarea')];
  const status = form.querySelector('[data-form-status]');
  const handoff = form.querySelector('.form-handoff');
  const handoffLink = form.querySelector('[data-whatsapp-handoff]');
  let attempted = false;

  function errorFor(field) {
    const value = field.value.trim();
    if (field.name === 'privacy') return field.checked ? '' : 'Confirme a leitura da Política de Privacidade para continuar.';
    if (field.required && !value) return ({ name: 'Informe seu nome.', phone: 'Informe seu telefone.', area: 'Selecione uma área jurídica.', message: 'Escreva uma breve mensagem.' })[field.name];
    if (field.name === 'phone') {
      const digits = value.replace(/\D/g, '');
      const national = digits.startsWith('55') && digits.length > 11 ? digits.slice(2) : digits;
      if (!/^[+\d\s().-]+$/.test(value) || !/^[1-9]\d{9,10}$/.test(national)) return 'Informe um telefone válido com DDD, por exemplo (51) 99386-9229.';
    }
    if (field.name === 'email' && value && field.validity.typeMismatch) return 'Informe um e-mail válido, como nome@exemplo.com.';
    if (field.maxLength > 0 && value.length > field.maxLength) return `Use no máximo ${field.maxLength} caracteres.`;
    return '';
  }

  function validate(field) {
    const message = errorFor(field);
    form.querySelector(`#${field.id}-error`).textContent = message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    return !message;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    attempted = true;
    handoff.hidden = true;
    handoffLink.removeAttribute('href');
    const invalid = controls.filter(field => !validate(field));
    if (invalid.length) {
      status.textContent = 'Revise os campos indicados antes de continuar.';
      status.dataset.state = 'error';
      invalid[0].focus();
      return;
    }
    const data = new FormData(form);
    const lines = ['Olá! Gostaria de orientação jurídica.', '', `Nome: ${data.get('name').trim()}`, `Telefone: ${data.get('phone').trim()}`];
    if (data.get('email').trim()) lines.push(`E-mail: ${data.get('email').trim()}`);
    lines.push(`Área jurídica: ${data.get('area')}`, '', data.get('message').trim());
    const url = new URL(form.dataset.whatsapp);
    url.searchParams.set('text', lines.join('\n'));
    handoffLink.href = url.href;
    handoff.hidden = false;
    status.textContent = 'Dados validados. Sua mensagem está pronta para revisão no WhatsApp.';
    status.dataset.state = 'ready';
    status.focus();
  });

  function onEdit(event) {
    if (!controls.includes(event.target)) return;
    handoff.hidden = true;
    handoffLink.removeAttribute('href');
    status.textContent = '';
    if (attempted) validate(event.target);
  }
  form.addEventListener('input', onEdit);
  form.addEventListener('change', onEdit);
  form.noValidate = true;
  form.querySelector('fieldset').disabled = false;
}

const mapButton = document.querySelector('[data-load-map]');
if (mapButton) {
  mapButton.hidden = false;
  mapButton.addEventListener('click', () => {
    const frame = document.querySelector('.map-frame');
    const placeholder = frame.querySelector('.map-placeholder');
    const status = frame.querySelector('.map-status');
    const iframe = document.createElement('iframe');
    iframe.title = 'Localização da AAFJ Advocacia em Porto Alegre no Google Maps';
    iframe.referrerPolicy = 'no-referrer';
    iframe.src = mapButton.dataset.mapSrc;
    iframe.allowFullscreen = true;
    placeholder.hidden = true;
    status.hidden = false;
    status.textContent = 'Carregando mapa. Se ele não aparecer, use o link Abrir no Google Maps.';
    frame.append(iframe);
    iframe.focus();
    iframe.addEventListener('load', () => { status.textContent = 'Mapa externo solicitado. Se não estiver disponível, use o link Abrir no Google Maps.'; }, { once: true });
  }, { once: true });
}
