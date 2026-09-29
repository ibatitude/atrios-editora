# Roadmap — Átrios Editora

> ## 📧 Conta oficial: **atrioseditora@gmail.com**
>
> **Toda conta deste projeto é criada e mantida com este e-mail** — Supabase, Cloudflare e,
> se for o caso, GitHub. Antes de criar qualquer coisa, confira no canto da tela se a sessão
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
> na URL de teste (`*.workers.dev`), na Fase 10.

## Fases

### ⬜ Fase 0 — Contas no e-mail da editora *(você)*
- [ ] Ativar a verificação em duas etapas no `atrioseditora@gmail.com`.
- [ ] Criar a conta no **Supabase** e o projeto `atrios-editora` (região São Paulo).
  Me passar a **URL do projeto** e a chave **anon**. A `service_role` não vai no chat.
- [ ] Criar a conta na **Cloudflare**.
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

### ⬜ Fase 8 — Deploy de teste em `workers.dev` *(conta Cloudflare da editora)*
- Subir o Worker na conta nova, numa URL `*.workers.dev`. **O domínio não muda nesta fase.**
- Configurar as variáveis. A `SUPABASE_SERVICE_ROLE_KEY` entra como secret, nunca no GitHub.

### ⬜ Fase 9 — Validação na URL de teste
1. **O teste que mais importa:** mudar um preço no painel e cronometrar até aparecer no site.
   O esperado é até cerca de 1 minuto, porque o cache KV demora esse tempo para propagar.
2. Comparar o visual lado a lado com o site atual, no computador e no celular.
3. Rodar Lighthouse, Rich Results Test (Google) e Facebook Sharing Debugger.

### ⬜ Fase 10 — Mudar o domínio para a conta da editora
Hoje o `editoraatrios.com.br` e o Worker do site estão na conta Cloudflare de
**`desenvolvimento@ibatitude.com.br`**, que também hospeda outros projetos, entre eles o
Impulso Pastoral. Por isso não dá para simplesmente trocar o e-mail dessa conta nem entregar a
conta inteira: os outros projetos iriam junto. A Cloudflare também não transfere um Worker
sozinho de uma conta para outra. O caminho é recriar só a Átrios na conta nova:
1. Adicionar o domínio na conta nova. A Cloudflare importa os registros de DNS.
   **Conferir o MX e os demais registros de e-mail antes de virar.**
2. Trocar os nameservers no **Registro.br** para os que a conta nova indicar. A propagação
   leva de algumas horas a um dia.
3. Ligar o domínio ao Worker novo como *custom domain* e fazer o merge da branch na `main`.
4. Só então desligar o Worker antigo.

> Nunca migrar o DNS e trocar o site no mesmo dia.

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
