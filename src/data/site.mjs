export const site = {
  name: 'AAFJ Advocacia',
  lawyer: 'Air Alves Freitas Júnior',
  registration: 'OAB/RS 93.942',
  portrait: { src: '/images/image2.jpg', alt: 'Air Alves Freitas Júnior', width: 768, height: 1376 },
  officePhoto: { src: '/images/image.jpg', alt: 'Air Alves Freitas Júnior', width: 1288, height: 1600 },
  company: 'Air Alves Freitas Júnior Sociedade Individual de Advocacia',
  companyRegistration: 'OAB/RS 9.410',
  phone: '(51) 99386-9229',
  phoneUrl: 'tel:+5551993869229',
  businessPhone: '(51) 3391-9251',
  businessPhoneUrl: 'tel:+555133919251',
  whatsapp: 'https://wa.me/5551993869229',
  email: 'contato@aafjadvocacia.com.br',
  address: ['Avenida Baltazar de Oliveira Garcia, 950', 'Sarandi, Porto Alegre/RS', 'CEP 91130-000', 'Brasil'],
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
].map(([name, slug, description, iconName]) => ({
  name, slug, description, iconName,
  whatsapp: `${site.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de atendimento em ${name}.`)}`,
}));
