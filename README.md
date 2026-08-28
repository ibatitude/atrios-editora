# Átrios Editora — site institucional

Site institucional da Átrios Editora: catálogo, autores, história e submissão de originais.

Next.js 16 (App Router) + React 19 + Tailwind 4 + TypeScript, exportado como site
**100% estático**. Cada página, cada livro e cada autor é uma rota pré-renderizada com
metadata própria.

## Por que estático

O site nasceu no Google AI Studio como SPA Vite sem roteamento: tudo vivia em `/`, com um
único `<title>` para as cinco páginas, e os livros eram modais em estado — nenhum podia ser
linkado, compartilhado ou ranqueado. A migração existe para resolver isso. Como o catálogo é
conteúdo fixo em arquivo (`lib/data.ts`) e não há área logada nem backend, `output: 'export'`
entrega todo o ganho de SEO sem custo de servidor.

## Rodando localmente

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | gera o site estático em `out/` (roda o `postbuild` automaticamente) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (flat config — o Next 16 removeu `next lint`) |

Para conferir o build estático como ele será servido em produção:

```bash
npm run build
npx serve out
```

`npm start` **não** se aplica: com `output: 'export'` não há servidor Next.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Todas são opcionais e todas são de build:

- `NEXT_PUBLIC_SITE_URL` — URL canônica pública, sem barra final. Alimenta
  `<link rel="canonical">`, as URLs absolutas de Open Graph e o `sitemap.xml`. Sem ela o
  build cai no fallback `https://atrioseditora.com.br`.
- `NEXT_PUBLIC_BASE_PATH` — subpasta em que o site é servido, com barra inicial e sem
  barra final. Só necessária em GitHub Pages de projeto. Vazia para servir na raiz.
- `NEXT_PUBLIC_NOINDEX` — qualquer valor marca o build inteiro como `noindex, nofollow`.
  Para endereços temporários.

## Deploy

Publicado no **GitHub Pages** pelo workflow `.github/workflows/deploy-pages.yml`,
que roda a cada push na `main`. Habilite uma vez em *Settings → Pages → Source:
GitHub Actions*.

URL atual: `https://ibatitude.github.io/atrios-editora` — uma *project page*, servida
em subpasta. Por isso o build define `basePath` e `trailingSlash`, e por isso o
`postbuild` grava `.nojekyll` (sem ele o Jekyll do Pages ignora `_next/` e o site vai
ao ar sem CSS nem JS).

**Este endereço está marcado como `noindex` de propósito.** É temporário: se o Google
indexar `github.io/atrios-editora` agora, essas URLs viram lixo quando o domínio
próprio entrar, e o GitHub Pages não oferece redirect 301 para consertar. Como o
objetivo inteiro da migração é ranquear, o certo é só abrir para indexação no
endereço definitivo.

### Migrar para domínio próprio ou Cloudflare

Três variáveis de ambiente, nenhuma mudança de código:

| Variável | GitHub Pages (hoje) | Domínio próprio |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://ibatitude.github.io/atrios-editora` | `https://atrioseditora.com.br` |
| `NEXT_PUBLIC_BASE_PATH` | `/atrios-editora` | *(vazio)* |
| `NEXT_PUBLIC_NOINDEX` | `1` | *(vazio)* |

O `out/` gerado é o mesmo artefato nos dois casos.

## Buscar dados de lojas externas

Se um dia o catálogo precisar de preço ou disponibilidade vindos de outras livrarias,
**isso não exige servidor**. Um `fetch()` em Server Component roda no *build* sob
`output: 'export'` e o resultado é assado no HTML estático — o que é melhor que buscar
em runtime, por dois motivos: o dado entra no HTML que o Google indexa (alimentando o
`schema.org/Offer` que já existe nas páginas de livro), e a chave de API fica no CI sem
nunca chegar ao browser. Para manter atualizado, basta um `schedule:` no workflow.

Servidor só passa a ser necessário para preço em tempo real sem rebuild — e mesmo aí a
saída seria um único Worker de proxy, não mover o site inteiro.

## Estrutura

```
app/                 rotas (App Router)
  page.tsx           Home
  catalogo/          catálogo com filtro por ?categoria=
  sobre/  autores/   páginas institucionais
  livros/[slug]/     página do livro   — JSON-LD Book
  autores/[slug]/    perfil do autor   — JSON-LD Person
  contato/           contato e submissão de originais
  sitemap.ts robots.ts not-found.tsx icon.svg
components/          componentes de UI (server por padrão; client onde há interação)
lib/
  data.ts            catálogo, autores, depoimentos + helpers de consulta
  types.ts seo.ts nav.ts contact.ts
scripts/             utilitários de build
public/              og-default.png
```

O campo `id` de cada livro e autor **é** o slug da rota (`o-legado-invisivel`,
`gabriel-vasconcelos`), então `generateStaticParams` mapeia direto de `lib/data.ts`.

## Publicar um livro ou autor novo

Edite `lib/data.ts` e rode o build. A rota, o sitemap e o JSON-LD saem de graça — não há
banco nem painel. Se um dia a editora precisar cadastrar sozinha, o caminho para um CMS fica
pavimentado, mas hoje rebuild no deploy resolve.

## Notas de arquitetura

**Capas usam `<img>`, não `next/image`.** A otimização nativa do `next/image` não roda em
`output: 'export'` sem um loader externo, e as capas já chegam redimensionadas do Unsplash
(`w=800&q=80`). A regra `@next/next/no-img-element` está desligada no ESLint por isso.

**O fallback do Suspense em `/catalogo` é o catálogo inteiro.** `CatalogBrowser` usa
`useSearchParams`, o que faz o Next renderizar apenas o fallback no HTML estático. Se o
fallback fosse um spinner, `/catalogo` iria para o ar sem nenhum link para `/livros/*` — que é
exatamente o oposto do objetivo da migração. Ver `app/catalogo/page.tsx`.

**`scripts/flatten-rsc-payloads.mjs` roda no `postbuild`.** O export do Next 16 grava os
payloads de prefetch como diretórios aninhados, mas o runtime os pede com os segmentos
separados por ponto. Em host estático isso gera 404 em todo `<Link>` visível e desliga o
prefetch. O script copia cada payload para o nome que o runtime pede.

**Os formulários de `/contato` ainda não têm backend.** Eles montam uma mensagem `mailto:`
pré-preenchida em vez de simular um envio — um autor nunca recebe confirmação de algo que não
foi enviado. O ponto de troca está isolado em `lib/contact.ts`: para plugar um serviço real
(Resend, Formspree), basta reescrever `buildContactMessage` / `buildManuscriptMessage`.
