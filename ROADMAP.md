# Roadmap — Átrios Editora

> ## 📧 Conta oficial: **atrioseditora@gmail.com**
>
> **Toda conta deste projeto é criada e mantida com este e-mail** — Supabase, Cloudflare e,
> se for o caso, GitHub. A Cloudflare é a exceção: não se cria conta nova, a atual passa
> para este e-mail (Fase 10). Antes de criar qualquer coisa, confira no canto da tela se a sessão
> aberta é a do `atrioseditora@gmail.com`, e não uma conta pessoal ou de outro projeto.
>
> Ative a verificação em duas etapas no Gmail e em cada serviço, e guarde os códigos de
> recuperação com mais de uma pessoa. Se a gente perder o acesso a esse e-mail, perde o acesso
> a tudo de uma vez.

## Objetivo

Hoje o catálogo fica escrito no código (`lib/data.ts`): para cadastrar ou mudar um livro,
alguém precisa editar o arquivo e publicar de novo. A meta é ter um **painel em `/admin`**
onde a editora cadastra livros e autores sozinha e vê a mudança no site em cerca de 1 minuto.

A arquitetura é a mesma do `impulso-next`:

| Peça | Onde roda | Para quê |
|---|---|---|
| Next.js 16 (modo servidor, não mais exportação estática) | Cloudflare Workers, via adaptador OpenNext | Site público + painel |
| Supabase (Postgres + Auth + Storage) | supabase.com | Livros, autores, login do admin e imagens |
| Cache KV + D1 da Cloudflare | Cloudflare | As páginas atualizam sozinhas depois de cada edição (`revalidatePath`) |

A venda continua na **Nuvemshop**. O site é a vitrine, e o botão de compra leva à loja.

> **Regra de segurança:** o site no ar sai da `main`, e cada push na `main` publica sozinho.
> Toda a obra acontece na branch `feat/supabase-admin` e só chega à `main` depois da validação
> na URL de teste (`*.workers.dev`), na Fase 9.

## Fases

### ⬜ Fase 0 — Contas no e-mail da editora *(você)*
- [ ] Ativar a verificação em duas etapas no `atrioseditora@gmail.com`.
- [ ] Criar a conta no **Supabase** e o projeto `atrios-editora` (região São Paulo).
  Me passar a **URL do projeto** e a chave **anon**. A `service_role` não vai no chat.
- [ ] Cloudflare: **não criar conta nova.** A conta atual passa para a Átrios na Fase 10.
- [ ] Decidir o **GitHub**: o repositório está em `ibatitude/atrios-editora`. Transferir para
  uma conta da editora ou só adicionar o e-mail como colaborador.

### ⬜ Fase 1 — Fundação
- Adaptador OpenNext + `wrangler.jsonc` com o cache KV e D1, igual ao Impulso.
- Clientes Supabase (`lib/supabase/`: browser, server, public e admin).
- Schemas Zod de livro e autor, usados pelo painel, pelo seed e pela renderização.

### ⬜ Fase 2 — Banco de dados
- Migrations: `authors`, `books` (com `status` rascunho/publicado e `is_featured`) e um bucket
  público `covers` para capas, mockups e fotos.
- Regras de acesso (RLS): o público só lê o que está publicado, e só o admin grava
  (`is_admin()`, igual ao Impulso).

### ⬜ Fase 3 — Migração dos dados atuais
- Script de seed que lê o `lib/data.ts` de hoje (2 livros e 1 autor), grava no Supabase e sobe
  as imagens de `public/assets/` para o Storage.

### ⬜ Fase 4 — Site público lendo do Supabase
- Home, catálogo, livro, autores, sitemap e JSON-LD passam a ler do banco, com páginas
  pré-geradas e atualizadas sob demanda.
- O `lib/data.ts` deixa de ser a fonte dos livros.

### ⬜ Fase 5 — Painel administrativo
- Login por e-mail e senha, com cadastro público desligado.
- **Livros:** criar, editar, publicar ou esconder, destacar na home, capa, mockup, preço e link
  da Nuvemshop.
- **Autores:** bio, foto, especialidades e livros.
- Modo de pré-visualização local, que abre o painel sem Supabase configurado.

### ⬜ Fase 6 — Verificação
- `tsc`, lint, testes e build verdes, e CI no GitHub Actions.

### ⬜ Fase 7 — Provisionar o Supabase real *(depende da Fase 0)*
1. Aplicar as migrations.
2. Desligar o cadastro público (Authentication → Sign In/Up).
3. Criar o usuário admin e promover via SQL (`raw_app_meta_data.role = 'admin'`).
4. Rodar o seed da Fase 3.

### ⬜ Fase 8 — Deploy de teste em `workers.dev` *(na conta Cloudflare atual)*
- Subir o Worker na conta nova, numa URL `*.workers.dev`. **O domínio não muda nesta fase.**
- Configurar as variáveis. A `SUPABASE_SERVICE_ROLE_KEY` entra como secret, nunca no GitHub.

### ⬜ Fase 9 — Validação na URL de teste
1. **O teste que mais importa:** mudar um preço no painel e cronometrar até aparecer no site.
   O esperado é até cerca de 1 minuto, porque o cache KV demora esse tempo para propagar.
2. Comparar o visual lado a lado com o site atual, no computador e no celular.
3. Rodar Lighthouse, Rich Results Test (Google) e Facebook Sharing Debugger.

### ⬜ Fase 10 — A conta Cloudflare atual passa a ser da Átrios *(sem mexer no domínio)*
Hoje o `editoraatrios.com.br` e o Worker do site estão na conta Cloudflare de
**`desenvolvimento@ibatitude.com.br`**, junto com outros projetos, entre eles o Impulso Pastoral.
Em vez de mudar a Átrios de conta, **quem sai são os outros projetos**, e a conta fica com a
editora. O domínio, o DNS e o Worker da Átrios continuam onde estão: **não há troca de
nameserver**.

1. **Levantar tudo o que existe na conta que não é da Átrios:** Workers, KV, D1, R2, Pages,
   domínios (zonas), tokens de API e integrações com o GitHub.
2. **Levar cada um desses projetos para uma conta própria**, um de cada vez:
   - Workers e Pages: publicar de novo na conta nova e recriar KV e D1, que não se transferem.
     Atualizar os secrets `CLOUDFLARE_ACCOUNT_ID` e `CLOUDFLARE_API_TOKEN` no CI de cada projeto.
   - Domínios de outros projetos: esses, sim, precisam de troca de nameserver. Fazer um por vez
     e conferir o e-mail de cada um antes.
   - Conferir que cada projeto funciona na conta nova e só então apagá-lo da conta antiga.
3. **Passar a conta para a Átrios:** em *Manage Account → Members*, convidar o
   `atrioseditora@gmail.com` como **Super Administrator**, aceitar pelo Gmail, ativar a
   verificação em duas etapas e só então remover o `desenvolvimento@`.
   Não trocar o e-mail de login do `desenvolvimento@`: esse usuário pode ser membro de outras
   contas, e a troca afetaria todas.
4. **Depois da troca:** refazer os tokens de API criados pelo `desenvolvimento@`, que deixam de
   valer quando ele sai. Se quiser, renomear a conta e o subdomínio `desenvolvimento-474.workers.dev`
   (a Cloudflare limita quantas vezes o subdomínio pode mudar).

> O site novo da Fase 8 já sobe nesta mesma conta. Por isso as Fases 8 e 9 não esperam a
> Fase 10: a conta muda de dono, mas os recursos ficam.

## Pendências e decisões em aberto

- 🟡 **Formulários de contato e de manuscrito**: hoje não salvam nada. Decidir se passam a
  gravar no Supabase (como os leads do Impulso) e se avisam por e-mail.
- 🟡 **Manhã com Deus**: a capa traz o logo da editora **Vida**. Confirmar se o livro é
  publicação da Átrios, porque o site o apresenta assim.
- 🟡 **Ficha técnica**: faltam páginas, ISBN, ano e acabamento dos dois livros. Com o painel
  pronto, a própria editora preenche.
- 🟡 **Parcelamento**: a Nuvemshop só cobra sem juros o pagamento à vista, e o site diz
  "Em até 12x no cartão". Se a loja passar a oferecer parcelas sem juros, atualizar o texto.
- ⚪ **Depoimentos e números da editora**: foram retirados por serem inventados. Podem voltar
  quando houver dados reais, e aí entram como conteúdo do painel.
