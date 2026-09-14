import { site } from '../data/site.mjs';
import { button, icon } from '../components/ui.mjs';
import { hero } from '../components/hero.mjs';
import { practiceAreas } from '../components/practice-areas.mjs';
import { office } from '../components/office.mjs';
import { contact } from '../components/contact.mjs';

const intro = (eyebrow, title, body) => `<section class="page-intro container"><a class="breadcrumb" href="/">Início ${icon('arrow')}</a><p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${body}</section>`;

export const pages = [
  {
    path: '/', title: 'AAFJ Advocacia | Advocacia em Porto Alegre',
    description: 'Atendimento próximo, orientação clara e estratégia personalizada. AAFJ Advocacia em Porto Alegre. Air Alves Freitas Júnior Sociedade Individual de Advocacia, OAB/RS 9.410.',
    content: hero() + practiceAreas() + office() + contact(),
  },
  { path: '/o-escritorio/', title: 'O Escritório | AAFJ Advocacia', description: 'Conheça a AAFJ Advocacia, em Porto Alegre. Atendimento personalizado a pessoas físicas e jurídicas, com ética, responsabilidade e transparência.', content: office({ standalone: true }) },
  { path: '/contato/', title: 'Contato | AAFJ Advocacia em Porto Alegre', description: 'Fale com a AAFJ Advocacia pelo telefone comercial (51) 3391-9251 ou WhatsApp (51) 99386-9229 ou visite o escritório no bairro Sarandi, Porto Alegre.', content: contact({ standalone: true }) },
  { path: '/politica-de-privacidade/', title: 'Política de Privacidade | AAFJ Advocacia', description: 'Informações de privacidade da versão inicial do site AAFJ Advocacia.', noindex: true, content: intro('PRIVACIDADE', 'Política de Privacidade', `<div class="prose"><p class="preparation-note">Política completa em preparação para publicação.</p><h2>Sobre esta versão</h2><p>Esta versão do site disponibiliza informações institucionais e links de contato. Não possui formulário de coleta de dados, ferramentas de análise ou publicidade incorporadas.</p><h2>Preferência no navegador</h2><p>Ao confirmar o aviso de cookies, o site armazena apenas essa confirmação localmente no seu navegador. Ela pode ser removida na página de <a href="/cookies/">Cookies</a>.</p><h2>Serviços externos</h2><p>Ao acessar WhatsApp, redes sociais ou mapas, você será direcionado a serviços externos, sujeitos às suas próprias políticas de privacidade.</p><h2>Contato</h2><p>Para questões de privacidade, entre em contato com ${site.company}, ${site.companyRegistration}, pelo e-mail <a href="mailto:${site.email}">${site.email}</a>.</p></div>`) },
  { path: '/cookies/', title: 'Cookies | AAFJ Advocacia', description: 'Informações sobre cookies e armazenamento local nesta versão do site.', content: intro('PRIVACIDADE', 'Cookies e preferências', `<div class="prose"><p>Esta versão do site não define cookies e não carrega ferramentas de análise ou publicidade.</p><h2>O que fica no seu navegador</h2><p>Usamos o armazenamento local, chamado localStorage, apenas para lembrar que você leu o aviso. A chave <code>aafj:privacy-notice:v1</code> guarda o valor <code>read</code>. Esse registro não é enviado pelo site a um servidor.</p><h2>Gerenciar sua preferência</h2><p>Você pode remover essa confirmação e exibir o aviso novamente.</p><button class="button" data-reset-cookies>Exibir aviso novamente ${icon('arrow')}</button><p role="status" data-cookie-status></p><h2>Links externos</h2><p>WhatsApp, mapas e redes sociais têm suas próprias práticas de cookies quando você acessa seus sites.</p></div>`) },
  { path: '/404/', title: 'Página não encontrada | AAFJ Advocacia', description: 'A página solicitada não foi encontrada.', noindex: true, content: intro('PÁGINA NÃO ENCONTRADA', 'Vamos encontrar o caminho.', `<p class="lead">O endereço acessado não está disponível.</p>${button('Voltar ao início', '/')}`) },
];
