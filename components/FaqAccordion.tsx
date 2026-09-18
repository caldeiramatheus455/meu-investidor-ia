const FAQ_ITEMS = [
  {
    question: "A Meu Investidor guarda meu dinheiro?",
    answer: "Não. O dinheiro fica sempre na sua corretora ou banco. A gente nunca tem acesso a ele.",
  },
  {
    question: "Vocês recomendam ações específicas?",
    answer:
      "Não. Orientamos sobre organização, reserva de emergência e alocação por classe de ativo, com foco em educação.",
  },
  {
    question: "Quanto vai custar?",
    answer:
      "Ainda estamos definindo. Quem entrar na lista terá condição especial de lançamento.",
  },
  {
    question: "Preciso saber investir?",
    answer: "Não. A Meu Investidor é feita para quem está começando agora.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Coletamos apenas o seu e-mail e usamos só para avisar do lançamento, conforme a LGPD.",
  },
];

export function FaqAccordion() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3">
      {FAQ_ITEMS.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-white/10 bg-white/5 px-5 py-4 open:bg-white/10"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-white marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-emerald-light sm:text-lg">
            {item.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-xl font-normal text-brand-emerald-light transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
