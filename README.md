# AAFJ Advocacia

Para atualizar os arquivos publicados na raiz do repositório:

```sh
npm ci
npm run build:pages
```

Envie também os arquivos gerados (HTML, `styles/`, JavaScript em `scripts/`,
`favicon.svg` e `.nojekyll`) ao GitHub. Em Settings → Pages, use a publicação
pela branch com a pasta `/ (root)`.

O comando usa `/Airjunior/` como prefixo do site. Para domínio próprio ou outro
nome de repositório, defina `BASE_PATH` antes de executar o comando.
Exemplo no PowerShell para domínio próprio:

```powershell
$env:BASE_PATH = '/'
npm run build:pages
```

Edite os arquivos em `src/` e `public/` e gere novamente a publicação.
Para desenvolvimento local, execute `npm run dev`; `npm run build` gera apenas `dist/`.
