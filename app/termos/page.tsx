import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Termos de Uso | Meu Investidor",
  description: "Termos de uso da lista de espera e do produto Meu Investidor.",
};

export default function TermosPage() {
  return (
    <LegalLayout title="Termos de Uso" updatedAt="setembro de 2026">
      <p>
        Ao entrar na nossa lista de espera, você concorda com os termos
        descritos abaixo. Escrevemos em linguagem simples, sem juridiquês,
        porque é assim que a Meu Investidor se comunica.
      </p>

      <h2>Caráter educacional</h2>
      <p>
        A Meu Investidor tem caráter educacional e informativo. Não somos
        corretora nem consultoria de valores mobiliários registrada, não
        custodiamos recursos de clientes e não recomendamos ativos
        específicos. Investimentos envolvem riscos e rentabilidade passada não
        garante resultados futuros.
      </p>

      <h2>Sobre a lista de espera</h2>
      <ul>
        <li>Entrar na lista de espera é gratuito e não gera nenhuma cobrança.</li>
        <li>
          Entrar na lista não garante acesso antecipado nem qualquer condição
          específica — apenas a intenção de avisar você em primeira mão.
        </li>
        <li>
          Preços, prazos de lançamento e funcionalidades podem mudar até o
          lançamento oficial do produto.
        </li>
      </ul>

      <h2>O que a Meu Investidor não faz</h2>
      <p>
        Não recomendamos ações, fundos ou qualquer ativo específico. Não
        prometemos rentabilidade, ganho fácil ou qualquer resultado
        financeiro. Nosso papel é ajudar você a se organizar e a entender suas
        opções.
      </p>

      <h2>Alterações destes termos</h2>
      <p>
        Podemos atualizar estes termos conforme o produto evolui. A data da
        última atualização sempre estará no topo desta página.
      </p>

      <h2>Contato</h2>
      <p>
        Dúvidas? Fale com a gente pelo Instagram{" "}
        <a
          href="https://www.instagram.com/meuinvestidor.ia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-emerald-light underline underline-offset-2"
        >
          @meuinvestidor.ia
        </a>
        .
      </p>
    </LegalLayout>
  );
}
