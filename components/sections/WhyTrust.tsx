import { Reveal } from "@/components/Reveal";

const DIFFERENTIALS = [
  {
    title: "Do zero ao primeiro aporte",
    description:
      "Te leva passo a passo até o primeiro investimento, na corretora que você já tem. Sem custódia: seu dinheiro nunca passa pela Meu Investidor.",
    highlight: true,
  },
  {
    title: "Não ganhamos comissão de nenhum produto",
    description:
      "Nossa monetização é por assinatura. Não temos motivo para te empurrar um produto financeiro específico.",
    highlight: true,
  },
  {
    title: "Linguagem simples, sem juridiquês",
    description:
      "Falamos a realidade brasileira: Selic, Tesouro Direto, CDB, FGC, come-cotas, IR. Do seu jeito, sem economês.",
    highlight: false,
  },
  {
    title: "Acompanha depois do primeiro aporte",
    description:
      "Continuamos com você, ajudando a não tomar decisões por pânico ou FOMO quando o mercado balança.",
    highlight: false,
  },
];

export function WhyTrust() {
  return (
    <section className="bg-brand-darker py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Por que confiar na Meu Investidor
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {DIFFERENTIALS.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <div
                className={`h-full rounded-2xl p-6 ${
                  item.highlight
                    ? "bg-brand-mint text-brand-darker"
                    : "bg-white/5 text-white"
                }`}
              >
                <p className="font-heading text-lg font-semibold">{item.title}</p>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    item.highlight ? "text-brand-darker/80" : "text-white/70"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
