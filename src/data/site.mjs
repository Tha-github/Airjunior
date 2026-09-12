import { legalContent } from './legal-content.mjs';

export const site = {
  name: 'AAFJ Advocacia',
  lawyer: 'Air Alves Freitas Júnior',
  registration: 'OAB/RS 93.942',
  // Foto oficial futura: { src: '/images/air-alves-freitas-junior.webp', alt: 'Air Alves Freitas Júnior', width: 960, height: 1200 }.
  // Manter null enquanto o cliente não fornecer o arquivo e suas dimensões reais.
  portrait: null,
  // Foto específica da seção institucional, com src, alt, width e height reais.
  // Sem foto específica, a seção utiliza portrait quando ele estiver preenchido.
  officePhoto: null,
  company: 'AIR ALVES FREITAS JUNIOR SOCIEDADE INDIVIDUAL DE ADVOCACIA',
  companyRegistration: 'OAB/RS 9.410',
  phone: '(51) 99386-9229',
  phoneUrl: 'tel:+5551993869229',
  whatsapp: 'https://wa.me/5551993869229',
  email: 'Airjunior_adv@yahoo.com.br',
  address: ['Av. Baltazar de Oliveira Garcia, nº 950, sala 301', 'Bairro Sarandi · Porto Alegre – RS', 'CEP 91.130-000'],
  socials: [
    ['Instagram', 'https://www.instagram.com/aafjr_advocacia/'],
    ['Facebook', 'https://www.facebook.com/profile.php?id=100083234796826'],
    ['Threads', 'https://www.threads.com/@aafjr_advocacia'],
  ],
};

export const areas = [
  ['Direito Trabalhista', 'direito-trabalhista', 'Defesa dos direitos de trabalhadores e empresas.', 'briefcase'],
  ['Direito Cível e do Consumidor', 'direito-civel-e-do-consumidor', 'Soluções relacionadas a contratos, indenizações e relações de consumo.', 'document'],
  ['Direito Bancário', 'direito-bancario', 'Atuação relacionada a cobranças, financiamentos e contratos bancários.', 'bank'],
  ['Direito de Família e Sucessões', 'direito-de-familia-e-sucessoes', 'Divórcio, guarda, alimentos, inventários e partilhas.', 'family'],
  ['Direito Previdenciário', 'direito-previdenciario', 'Benefícios, aposentadorias e revisões perante o INSS.', 'calendar'],
  ['Direito Criminal', 'direito-criminal', 'Defesa técnica e acompanhamento nas diferentes fases do processo.', 'shield'],
].map(([name, slug, description, iconName]) => ({ name, slug, description, iconName, ...legalContent[slug], legacyHref: `/areas-de-atuacao/${slug}/`, href: `/${legalContent[slug].route}/` }));
