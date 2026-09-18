-- Meu Investidor — lista de espera
-- Rode este SQL no editor SQL do seu projeto Supabase (Supabase Dashboard > SQL Editor).

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  momento text,
  whatsapp text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  created_at timestamptz not null default now()
);

comment on table public.waitlist is 'Lista de espera da Meu Investidor';
comment on column public.waitlist.momento is 'Resposta de "Qual é o seu momento?" escolhida no formulário';
comment on column public.waitlist.whatsapp is 'WhatsApp opcional, usado só para avisar do lançamento';

-- Habilita Row Level Security. A API do site usa a chave "service role" no
-- servidor (nunca exposta ao navegador), que ignora RLS, então não é preciso
-- criar políticas de acesso público para inserir ou ler estes dados.
alter table public.waitlist enable row level security;
