import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de Privacidade | Meu Investidor",
  description: "Como a Meu Investidor coleta e usa seus dados na lista de espera.",
};

export default function PrivacidadePage() {
  return (
    <LegalLayout title="Política de Privacidade" updatedAt="setembro de 2026">
      <p>
        Esta política explica, de forma simples, como a Meu Investidor trata os
        dados de quem entra na nossa lista de espera. Levamos a sua privacidade
        a sério e seguimos a Lei Geral de Proteção de Dados (LGPD).
      </p>

      <h2>Quais dados coletamos</h2>
      <ul>
        <li>Seu e-mail, para avisar sobre o lançamento.</li>
        <li>
          Opcionalmente, seu WhatsApp e a resposta sobre &quot;qual é o seu
          momento&quot; com os investimentos.
        </li>
        <li>
          Informações técnicas de origem do cadastro (como a página que te
          trouxe até aqui), para entendermos quais canais funcionam.
        </li>
      </ul>

      <h2>Para que usamos esses dados</h2>
      <p>
        Usamos seus dados apenas para avisar sobre o lançamento da Meu
        Investidor, entender o interesse no produto e, quando aplicável,
        entrar em contato sobre a condição especial de quem entrou na lista.
        Não vendemos nem compartilhamos seus dados com terceiros para fins de
        marketing.
      </p>

      <h2>Onde seus dados ficam guardados</h2>
      <p>
        Seus dados são armazenados de forma segura em um banco de dados
        (Supabase), com acesso restrito à equipe da Meu Investidor.
      </p>

      <h2>Seus direitos</h2>
      <p>
        Você pode pedir a qualquer momento para acessar, corrigir ou excluir
        os seus dados. Basta nos chamar pelo Instagram{" "}
        <a
          href="https://www.instagram.com/meuinvestidor.ia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-emerald-light underline underline-offset-2"
        >
          @meuinvestidor.ia
        </a>{" "}
        ou pelo e-mail de contato informado no nosso site.
      </p>

      <h2>Mudanças nesta política</h2>
      <p>
        Podemos atualizar esta política conforme o produto evolui. Sempre que
        isso acontecer, atualizaremos a data no topo desta página.
      </p>
    </LegalLayout>
  );
}
