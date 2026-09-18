import { Reveal } from "@/components/Reveal";

const PAINS = [
  {
    title: "Dinheiro parado na poupança",
    description: "Ele existe, mas você sabe que podia estar rendendo mais em outro lugar.",
  },
  {
    title: "Medo de errar e perder",
    description: "Tanta informação contraditória que fica mais fácil não fazer nada.",
  },
  {
    title: "Não sei nem por onde começar",
    description: "Corretora, Tesouro Direto, CDB... e por onde eu começo mesmo?",
  },
];

export function Problem() {
  return (
    <section className="bg-brand-darker py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Você quer investir, mas trava.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {PAINS.map((pain, index) => (
            <Reveal key={pain.title} delay={index * 100}>
              <div className="h-full rounded-2xl bg-white/5 p-6 text-center sm:text-left">
                <p className="font-heading text-lg font-semibold text-white">
                  {pain.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {pain.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
