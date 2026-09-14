# AAFJ Advocacia

Para atualizar os arquivos publicados na raiz do repositório:

```sh
npm ci
npm run build:pages
```

Envie também os arquivos gerados (HTML, `styles/`, JavaScript em `scripts/`,
`favicon.svg` e `.nojekyll`) ao GitHub. Em Settings → Pages, use a publicação
pela branch com a pasta `/ (root)`.

O comando usa `/` como prefixo para o domínio `https://aafjadvocacia.topsitebr.com.br/`.
Para publicar no endereço do GitHub sem domínio próprio, defina `BASE_PATH` e `SITE_URL`.
Exemplo no PowerShell:

```powershell
$env:BASE_PATH = '/aafjadvocacia/'
$env:SITE_URL = 'https://tha-github.github.io/aafjadvocacia/'
npm run build:pages
```

Edite os arquivos em `src/` e `public/` e gere novamente a publicação.
Para desenvolvimento local, execute `npm run dev`; `npm run build` gera apenas `dist/`.

A navegação principal usa as seções da Home. Os seis cards e o menu de áreas abrem o WhatsApp com a mensagem da área escolhida.
O build recria dist/ para não preservar páginas antigas. O sitemap inclui somente a Home; defina SITE_URL com a URL pública completa ao usar domínio próprio.
