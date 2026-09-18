# Meu Investidor — Landing Page

Landing page de validação da **Meu Investidor**, uma IA que ajuda iniciantes
brasileiros a dar o primeiro passo no mundo dos investimentos. O objetivo
desta página é captar e-mails em uma lista de espera antes do lançamento do
produto.

- Instagram: [@meuinvestidor.ia](https://www.instagram.com/meuinvestidor.ia)
- Domínio de produção: `meuinvestidor.com.br`

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (tema definido em `app/globals.css`)
- [Supabase](https://supabase.com) para armazenar a lista de espera
- Deploy na [Vercel](https://vercel.com)

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

**Você não precisa configurar nada para rodar em desenvolvimento.** Se as
variáveis do Supabase não estiverem definidas, o formulário de lista de
espera continua funcionando normalmente — ele só grava os cadastros no
console do terminal onde o `npm run dev` está rodando, em vez de salvar no
banco. Isso facilita testar o site sem depender de infraestrutura externa.

Outros comandos úteis:

```bash
npm run build   # build de produção
npm run start   # roda o build de produção localmente
npm run lint    # checagem de lint
```

## Configurando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Abra o **SQL Editor** do projeto e rode o conteúdo do arquivo
   [`supabase/schema.sql`](./supabase/schema.sql). Ele cria a tabela
   `waitlist` com as colunas:
   - `id` (uuid, gerado automaticamente)
   - `email` (obrigatório, único)
   - `momento` (o que a pessoa respondeu em "qual é o seu momento?")
   - `whatsapp` (opcional)
   - `utm_source`, `utm_medium`, `utm_campaign` (origem do cadastro)
   - `referrer` (página de onde a pessoa veio)
   - `created_at` (data do cadastro)
3. Em **Project Settings > API**, copie:
   - a **Project URL** → variável `SUPABASE_URL`
   - a chave **service_role** → variável `SUPABASE_SERVICE_ROLE_KEY`

A tabela é criada com Row Level Security (RLS) habilitado. Isso é
proposital: a aplicação só acessa o banco pelo servidor (dentro da API
route), usando a chave `service_role`, que ignora RLS. Assim não é preciso
criar nenhuma política pública de leitura/escrita — a chave `service_role`
**nunca** é exposta ao navegador.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha o que for necessário:

```bash
cp .env.example .env.local
```

| Variável | Obrigatória? | Descrição |
| --- | --- | --- |
| `SUPABASE_URL` | Não (modo dev funciona sem ela) | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Não (modo dev funciona sem ela) | Chave `service_role` do Supabase, usada só no servidor |
| `NEXT_PUBLIC_SITE_URL` | Recomendada | URL pública do site, usada em metadados/SEO |
| `NEXT_PUBLIC_META_PIXEL_ID` | Não | ID do Meta Pixel. Se preenchido, dispara o evento `Lead` a cada cadastro |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Não | ID de métricas do Google Analytics 4. Se preenchido, dispara `generate_lead` a cada cadastro |

## Como trocar o mascote

O mascote atual em `public/mascote.png` é um **placeholder** (uma
capivara ilustrada em SVG/PNG gerada programaticamente), só para a página
não ficar sem imagem enquanto a arte final não fica pronta.

Para trocar:

1. Substitua o arquivo `public/mascote.png` pela arte final — de
   preferência um PNG quadrado (ex: 1024×1024px) com fundo transparente.
2. Regenere os ícones do site a partir da nova imagem:
   - `app/icon.png` (256×256px) — favicon do site
   - `app/apple-icon.png` (180×180px, fundo sólido `#0B3D2E`) — ícone para
     iOS, que não suporta transparência
3. Rode `npm run dev` e confira o header, o hero, o CTA final e a aba do
   navegador.

Não é necessário mudar nenhum código — todos os componentes referenciam
`/public/mascote.png` pelo caminho, e o Next.js otimiza a imagem
automaticamente via `next/image`.

## Deploy na Vercel com o domínio meuinvestidor.com.br

1. Suba o projeto para um repositório no GitHub/GitLab/Bitbucket.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
   O Next.js é detectado automaticamente, não é preciso configurar build
   command nem output directory.
3. Antes do primeiro deploy, adicione as variáveis de ambiente do passo
   anterior em **Project Settings > Environment Variables** (pelo menos
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` e `NEXT_PUBLIC_SITE_URL`
   apontando para `https://meuinvestidor.com.br`).
4. Clique em **Deploy**. A Vercel vai gerar uma URL temporária
   (`algo.vercel.app`) — confirme que o site e o formulário funcionam nela
   antes de apontar o domínio.
5. Para conectar o domínio próprio:
   - Em **Project Settings > Domains**, adicione `meuinvestidor.com.br` e
     `www.meuinvestidor.com.br`.
   - A Vercel vai indicar os registros DNS a configurar (geralmente um
     registro `A` apontando para `76.76.21.21` no domínio raiz e um
     `CNAME` para `cname.vercel-dns.com` no `www`). Configure-os no painel
     do seu registrador de domínio.
   - Aguarde a propagação de DNS (pode levar de minutos a algumas horas).
     A Vercel emite o certificado HTTPS automaticamente assim que o DNS
     estiver correto.
6. Cada novo push na branch principal gera um novo deploy de produção
   automaticamente.

## Estrutura do projeto

```
app/
  layout.tsx        # layout raiz, fontes, metadados, scripts de analytics
  page.tsx           # monta as seções da landing page
  api/waitlist/       # API route que salva a lista de espera
  privacidade/, termos/  # páginas legais
components/
  sections/           # cada seção da landing page (Hero, FAQ, etc.)
  WaitlistForm.tsx     # formulário de lista de espera (2 etapas)
  ...
lib/
  supabase.ts          # cliente Supabase (server-only)
  waitlist.ts           # tipos e constantes compartilhadas
  analytics.ts           # helpers do Meta Pixel / GA
supabase/schema.sql        # SQL para criar a tabela waitlist
```

## Aviso legal

A Meu Investidor tem caráter educacional e informativo. Não é corretora
nem consultoria de valores mobiliários registrada, não custodia recursos
de clientes e não recomenda ativos específicos. Este texto está sempre
visível no rodapé do site.
