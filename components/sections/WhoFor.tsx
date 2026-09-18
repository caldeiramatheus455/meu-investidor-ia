import { Reveal } from "@/components/Reveal";

const FOR = [
  "Quem nunca investiu na vida.",
  "Quem tem dinheiro parado na poupança e não sabe o próximo passo.",
  "Quem já começou, mas se sente perdido ou desorganizado.",
  "Quem quer organizar as finanças antes de investir.",
];

const NOT_FOR = [
  "Quem quer dica de \"ação que vai subir\".",
  "Quem faz day trade ou busca ganho rápido.",
  "Quem já tem um planejamento financeiro consolidado.",
];

export function WhoFor() {
  return (
    <section className="bg-brand-dark py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Para quem é (e para quem não é)
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl bg-brand-mint p-7 text-brand-darker">
              <p className="font-heading text-xl font-semibold">É para você se</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
                {FOR.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-brand-emerald">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7 text-white">
              <p className="font-heading text-xl font-semibold">Não é para você se</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/75 sm:text-base">
                {NOT_FOR.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-white/40">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
